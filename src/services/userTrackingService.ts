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

const LOCAL_STORAGE_CLIENT_ID_KEY = 'nit_goa_anonymous_client_id';
const LOCAL_STORAGE_ACTIVITY_CACHE = 'nit_goa_recent_activity_cache';

// Retrieve or generate a persistent anonymous device client ID
export function getOrCreateClientId(): string {
  try {
    let clientId = localStorage.getItem(LOCAL_STORAGE_CLIENT_ID_KEY);
    if (!clientId) {
      clientId = 'guest_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36).slice(-4);
      localStorage.setItem(LOCAL_STORAGE_CLIENT_ID_KEY, clientId);
    }
    return clientId;
  } catch {
    return 'guest_' + Math.random().toString(36).substring(2, 9);
  }
}

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

// Local cache helper to keep recent logs in localStorage for resilience
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
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Throttle mechanism to prevent flooding writes on rapid events
const lastTrackedMap = new Map<string, number>();

/**
 * Tracks a user interaction in Firestore and updates active presence
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
  const now = Date.now();
  const throttleKey = `${action}_${context.branch}_${context.semester}`;
  const lastTime = lastTrackedMap.get(throttleKey) || 0;

  // Throttle same action within 15 seconds to conserve quota
  if (now - lastTime < 15000 && action !== 'attendance_update' && action !== 'test_scheduled') {
    return;
  }
  lastTrackedMap.set(throttleKey, now);

  const clientId = getOrCreateClientId();
  const user = context.currentUser;
  const userId = user?.uid || clientId;
  const userEmail = user?.email || `Student (${clientId.slice(0, 10)})`;
  const userName = user?.displayName || (user?.email ? user.email.split('@')[0] : 'NIT Goa Student');
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

  // Cache locally right away
  cacheActivityLocally(activityLog);

  // Sync to Firestore asynchronously
  const path = `user_activity/${activityId}`;
  try {
    const docRef = doc(db, 'user_activity', activityId);
    await setDoc(docRef, activityLog);
  } catch (err: any) {
    // Fail silently in guest / offline conditions
    console.debug('User activity queued locally (Firestore sync deferred):', err?.message || err);
  }

  // Also update user's presence document in /users/{userId} if authenticated
  if (user && user.uid) {
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(
        userRef,
        {
          email: user.email || '',
          displayName: user.displayName || '',
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
}

/**
 * Subscribes to real-time user activity logs for the Administrator
 */
export function subscribeToUserActivities(
  limitCount: number = 60,
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
          logs.push({
            ...data,
            id: docSnap.id,
          });
        });

        // Merge with any fresh local items
        const local = getCachedLocalActivities();
        const mergedMap = new Map<string, UserActivityLog>();
        
        logs.forEach((item) => mergedMap.set(item.id, item));
        local.forEach((item) => {
          if (!mergedMap.has(item.id)) {
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
        // Fallback to local activities cache
        const local = getCachedLocalActivities();
        onUpdate(local);
        if (onError) onError(err);
      }
    );
  } catch (err: any) {
    console.warn('Failed to subscribe to user activity:', err);
    onUpdate(getCachedLocalActivities());
    return () => {};
  }
}

/**
 * Fetches all registered or recently active users from Firestore
 */
export async function fetchAllTrackedUsers(): Promise<UserSummaryItem[]> {
  const path = 'users';
  const list: UserSummaryItem[] = [];
  try {
    const colRef = collection(db, 'users');
    const snapshot = await getDocs(colRef);
    snapshot.forEach((d) => {
      const data = d.data() as any;
      list.push({
        id: d.id,
        email: data.email || 'student@nitgoa.ac.in',
        displayName: data.displayName || data.name || 'NIT Goa Student',
        branch: data.branch || 'EEE',
        semester: data.semester || 5,
        section: data.section || '',
        device: data.device || 'Mobile PWA',
        role: data.role || 'student',
        lastActive: data.lastActive || data.lastLogin || new Date().toISOString(),
      });
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
 * Export logs to CSV file for download
 */
export function exportActivitiesToCSV(activities: UserActivityLog[]) {
  if (!activities || activities.length === 0) return;

  const headers = ['Timestamp', 'User Email / ID', 'User Name', 'Action Type', 'Action Title', 'Branch', 'Semester', 'Section', 'Device', 'Details'];
  const rows = activities.map((a) => [
    `"${a.timestamp}"`,
    `"${a.userEmail || a.userId}"`,
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

/**
 * Seed realistic telemetry events if starting fresh or previewing
 */
export function getInitialSampleActivities(): UserActivityLog[] {
  const now = Date.now();
  const sampleActions: Array<{
    email: string;
    name: string;
    action: ActivityActionType;
    title: string;
    branch: string;
    sem: number;
    sec?: string;
    device: string;
    offsetMinutes: number;
    details: string;
  }> = [
    {
      email: 'student.22eee014@nitgoa.ac.in',
      name: 'Aditya S.',
      action: 'view_timetable',
      title: 'Viewed EEE 5th Sem Timetable',
      branch: 'EEE',
      sem: 5,
      device: 'Mobile PWA App',
      offsetMinutes: 2,
      details: 'Checked Tuesday afternoon Microprocessors Slot B',
    },
    {
      email: 'shivam.cse@nitgoa.ac.in',
      name: 'Shivam K.',
      action: 'view_syllabus',
      title: 'Opened Embedded Syllabus PDF',
      branch: 'CSE',
      sem: 7,
      device: 'Desktop (Chrome)',
      offsetMinutes: 7,
      details: 'Viewed CS400 Cloud Computing page 42 in continuous reader',
    },
    {
      email: 'priya.ece23@nitgoa.ac.in',
      name: 'Priya R.',
      action: 'attendance_update',
      title: 'Logged Attendance for Signals & Systems',
      branch: 'ECE',
      sem: 4,
      device: 'Mobile (Safari)',
      offsetMinutes: 14,
      details: 'Attendance marked 18/20 (90%) in EC250',
    },
    {
      email: 'rahul.me@nitgoa.ac.in',
      name: 'Rahul M.',
      action: 'session_start',
      title: 'Started Session on Mobile',
      branch: 'ME',
      sem: 6,
      device: 'Mobile PWA App',
      offsetMinutes: 28,
      details: 'Opened Day Schedule directly on today timetable',
    },
    {
      email: 'neha.cve@nitgoa.ac.in',
      name: 'Neha P.',
      action: 'test_scheduled',
      title: 'Added Academic Test Reminder',
      branch: 'CVE',
      sem: 4,
      device: 'Desktop (Firefox)',
      offsetMinutes: 45,
      details: 'Scheduled Mid-Sem countdown for Fluid Mechanics',
    },
    {
      email: 'ashivamone@gmail.com',
      name: 'Academic Administrator',
      action: 'auth_change',
      title: 'Admin Console Access',
      branch: 'EEE',
      sem: 4,
      device: 'Desktop (Chrome)',
      offsetMinutes: 62,
      details: 'Verified EEE 4th Sem syllabus & Table 1.3 mapping',
    },
    {
      email: 'firstyear.sec_c@nitgoa.ac.in',
      name: 'Aryan T.',
      action: 'branch_change',
      title: 'Selected 1st Year Chemistry Cycle',
      branch: 'CSE',
      sem: 1,
      sec: 'C',
      device: 'Mobile (Chrome)',
      offsetMinutes: 80,
      details: 'Switched to Section C (LH 03) Schedule',
    },
  ];

  return sampleActions.map((s, idx) => ({
    id: `seed_act_${idx}`,
    userId: `uid_${idx}`,
    userEmail: s.email,
    userName: s.name,
    action: s.action,
    actionTitle: s.title,
    branch: s.branch,
    semester: s.sem,
    section: s.sec,
    device: s.device,
    details: s.details,
    timestamp: new Date(now - s.offsetMinutes * 60 * 1000).toISOString(),
  }));
}
