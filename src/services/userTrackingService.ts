import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { User } from 'firebase/auth';

export type ActivityActionType =
  | 'session_start'
  | 'branch_change'
  | 'view_timetable'
  | 'view_syllabus'
  | 'attendance_update'
  | 'test_scheduled'
  | 'pwa_interaction'
  | 'auth_change';

export interface UserActivityLog {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  action: ActivityActionType;
  actionTitle: string;
  branch: string;
  semester: number;
  section?: string;
  device: string;
  details?: string;
  timestamp: string; // ISO 8601
}

export interface UserSummaryItem {
  id: string;
  email: string;
  displayName?: string;
  branch?: string;
  semester?: number;
  section?: string;
  device?: string;
  role?: string;
  lastActive: string;
  sessionCount?: number;
}

const LOCAL_STORAGE_ACTIVITY_CACHE = 'nit_goa_recent_activity_cache';

// Detect client device and environment details
export function getClientDeviceSummary(): string {
  if (typeof window === 'undefined') return 'Server';
  
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true;

  const width = window.innerWidth;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  
  let deviceName = 'Desktop';
  if (isMobile) deviceName = 'Mobile';
  else if (isTablet) deviceName = 'Tablet';

  if (isStandalone) {
    return `${deviceName} PWA App`;
  }

  const ua = navigator.userAgent.toLowerCase();
  let browser = 'Browser';
  if (ua.includes('chrome') && !ua.includes('edg')) browser = 'Chrome';
  else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari';
  else if (ua.includes('firefox')) browser = 'Firefox';
  else if (ua.includes('edg')) browser = 'Edge';

  return `${deviceName} (${browser})`;
}

// Local cache helper to keep recent logs in localStorage for logged-in user resilience
function cacheActivityLocally(log: UserActivityLog) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ACTIVITY_CACHE);
    const list: UserActivityLog[] = raw ? JSON.parse(raw) : [];
    // Keep max 100 entries, prepend new log
    const updated = [log, ...list.filter((item) => item.id !== log.id)].slice(0, 100);
    localStorage.setItem(LOCAL_STORAGE_ACTIVITY_CACHE, JSON.stringify(updated));
  } catch (e) {
    console.debug('Failed to write local activity cache:', e);
  }
}

export function getCachedLocalActivities(): UserActivityLog[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ACTIVITY_CACHE);
    if (!raw) return [];
    const list: UserActivityLog[] = JSON.parse(raw);
    // Only return activities from genuine logged-in users (filter out any demo/seed/guest artifacts)
    return list.filter(
      (a) =>
        a &&
        !a.id?.startsWith('seed_') &&
        a.userEmail &&
        a.userEmail.includes('@') &&
        !a.userEmail.includes('guest') &&
        !a.userId?.startsWith('guest_') &&
        !a.userId?.startsWith('uid_')
    );
  } catch {
    return [];
  }
}

// Check if a log entry represents a real authenticated user
export function isRealUserLog(a: UserActivityLog): boolean {
  if (!a || !a.userEmail) return false;
  if (a.id?.startsWith('seed_')) return false;
  if (a.userId?.startsWith('uid_') || a.userId?.startsWith('guest_')) return false;
  if (a.userEmail.toLowerCase().includes('guest')) return false;
  return a.userEmail.includes('@');
}

// Throttle mechanism to prevent flooding writes on rapid events
const lastTrackedMap = new Map<string, number>();

/**
 * Tracks a user interaction in Firestore and updates active presence.
 * CRITICAL REQUIREMENT: ONLY records for authenticated / logged-in users.
 * Does not track any demo, anonymous, or guest users.
 */
export async function trackUserActivity(
  action: ActivityActionType,
  actionTitle: string,
  context: {
    branch?: string;
    semester?: number;
    section?: string;
    details?: string;
    currentUser?: User | null;
  }
): Promise<void> {
  const user = context.currentUser;

  // STRICT REQUIREMENT: Only track authenticated / logged-in users
  if (!user || !user.email) {
    return;
  }

  const now = Date.now();
  const throttleKey = `${user.uid}_${action}_${context.branch}_${context.semester}`;
  const lastTime = lastTrackedMap.get(throttleKey) || 0;

  // Throttle same action within 15 seconds to conserve Firestore quota
  if (now - lastTime < 15000 && action !== 'attendance_update' && action !== 'test_scheduled') {
    return;
  }
  lastTrackedMap.set(throttleKey, now);

  const userId = user.uid;
  const userEmail = user.email;
  const userName = user.displayName || user.email.split('@')[0] || 'Logged Student';
  const branch = context.branch || 'EEE';
  const semester = context.semester || 5;
  const section = context.section || '';
  const device = getClientDeviceSummary();
  const timestamp = new Date().toISOString();

  const activityId = `act_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const activityLog: UserActivityLog = {
    id: activityId,
    userId,
    userEmail,
    userName,
    action,
    actionTitle,
    branch,
    semester,
    section,
    device,
    details: context.details || '',
    timestamp,
  };

  // Cache locally
  cacheActivityLocally(activityLog);

  // Sync to Firestore
  const path = `user_activity/${activityId}`;
  try {
    const docRef = doc(db, 'user_activity', activityId);
    await setDoc(docRef, activityLog);
  } catch (err: any) {
    console.debug('User activity queued locally:', err?.message || err);
  }

  // Update user's presence document in /users/{userId}
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(
      userRef,
      {
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || '',
        branch,
        semester,
        section,
        device,
        lastActive: timestamp,
        lastAction: actionTitle,
      },
      { merge: true }
    );
  } catch (err: any) {
    console.debug('User presence update deferred:', err?.message || err);
  }
}

/**
 * Subscribes to real-time user activity logs for the Administrator.
 * Filters strictly to real authenticated logged-in users only.
 */
export function subscribeToUserActivities(
  limitCount: number = 80,
  onUpdate: (logs: UserActivityLog[]) => void,
  onError?: (err: Error) => void
): () => void {
  const path = 'user_activity';
  try {
    const colRef = collection(db, 'user_activity');
    const q = query(colRef, orderBy('timestamp', 'desc'), limit(limitCount));

    return onSnapshot(
      q,
      (snapshot) => {
        const logs: UserActivityLog[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as UserActivityLog;
          const logItem: UserActivityLog = {
            ...data,
            id: docSnap.id,
          };
          if (isRealUserLog(logItem)) {
            logs.push(logItem);
          }
        });

        // Merge with any fresh local items from real logged-in users
        const local = getCachedLocalActivities();
        const mergedMap = new Map<string, UserActivityLog>();
        
        logs.forEach((item) => mergedMap.set(item.id, item));
        local.forEach((item) => {
          if (isRealUserLog(item) && !mergedMap.has(item.id)) {
            mergedMap.set(item.id, item);
          }
        });

        const sorted = Array.from(mergedMap.values()).sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        onUpdate(sorted.slice(0, limitCount));
      },
      (err: any) => {
        console.warn('Notice listening to user activity (fallback to local cache):', err?.message || err);
        const local = getCachedLocalActivities().filter(isRealUserLog);
        onUpdate(local);
        if (onError) onError(err);
      }
    );
  } catch (err: any) {
    console.warn('Failed to subscribe to user activity:', err);
    onUpdate(getCachedLocalActivities().filter(isRealUserLog));
    return () => {};
  }
}

/**
 * Fetches all real registered and logged-in users from Firestore.
 * Excludes any demo or anonymous mock accounts.
 */
export async function fetchAllTrackedUsers(): Promise<UserSummaryItem[]> {
  const path = 'users';
  const list: UserSummaryItem[] = [];
  try {
    const colRef = collection(db, 'users');
    const snapshot = await getDocs(colRef);
    snapshot.forEach((d) => {
      const data = d.data() as any;
      const email = data.email || '';
      // Exclude demo / anonymous users
      if (
        email &&
        email.includes('@') &&
        !email.toLowerCase().includes('guest') &&
        !d.id.startsWith('uid_') &&
        !d.id.startsWith('guest_')
      ) {
        list.push({
          id: d.id,
          email,
          displayName: data.displayName || data.name || email.split('@')[0],
          branch: data.branch || 'EEE',
          semester: data.semester || 5,
          section: data.section || '',
          device: data.device || 'Mobile PWA',
          role: data.role || (email === 'ashivamone@gmail.com' ? 'admin' : 'student'),
          lastActive: data.lastActive || data.lastLogin || new Date().toISOString(),
        });
      }
    });
    // Sort newest active first
    list.sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());
  } catch (err: any) {
    console.warn('Could not fetch all users:', err?.message || err);
  }
  return list;
}

/**
 * Clear an activity log by ID
 */
export async function deleteUserActivityLog(activityId: string): Promise<void> {
  const path = `user_activity/${activityId}`;
  try {
    const docRef = doc(db, 'user_activity', activityId);
    await deleteDoc(docRef);
  } catch (err: any) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }

  // Also remove from local cache
  try {
    const local = getCachedLocalActivities().filter((a) => a.id !== activityId);
    localStorage.setItem(LOCAL_STORAGE_ACTIVITY_CACHE, JSON.stringify(local));
  } catch {}
}

/**
 * Export real logs to CSV file for download
 */
export function exportActivitiesToCSV(activities: UserActivityLog[]) {
  const realLogs = (activities || []).filter(isRealUserLog);
  if (realLogs.length === 0) return;

  const headers = ['Timestamp', 'User Email', 'User Name', 'Action Type', 'Action Title', 'Branch', 'Semester', 'Section', 'Device', 'Details'];
  const rows = realLogs.map((a) => [
    `"${a.timestamp}"`,
    `"${a.userEmail}"`,
    `"${a.userName || ''}"`,
    `"${a.action}"`,
    `"${(a.actionTitle || '').replace(/"/g, '""')}"`,
    `"${a.branch}"`,
    `"${a.semester}"`,
    `"${a.section || ''}"`,
    `"${a.device}"`,
    `"${(a.details || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `nit_goa_user_tracking_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
