import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Course, TimeSlot, DayOfWeek } from '../data/timetableData';

export interface TimetableOverrideDoc {
  branchSemesterKey: string;
  room?: string;
  scheduleJson: string; // JSON string of Record<DayOfWeek, TimeSlot[]>
  notes?: string;
  updatedBy: string;
  updatedAt: string;
}

export interface CourseOverrideDoc {
  code: string;
  name: string;
  credits: number;
  ltp: string;
  coordinator: string;
  shortName?: string;
  room: string;
  notes?: string;
  modulesJson: string; // JSON array of string
  textbooksJson: string; // JSON array of string
  updatedBy: string;
  updatedAt: string;
}

export interface AnnouncementDoc {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  active: boolean;
  authorEmail: string;
  authorName: string;
  createdAt: string;
}

// TIMETABLE OVERRIDES
export async function getTimetableOverride(branchSemesterKey: string): Promise<Record<DayOfWeek, TimeSlot[]> | null> {
  const path = `timetable_overrides/${branchSemesterKey}`;
  try {
    const docRef = doc(db, 'timetable_overrides', branchSemesterKey);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as TimetableOverrideDoc;
      const raw = data.scheduleJson || (data as any).scheduleData;
      if (raw) {
        return JSON.parse(raw);
      }
    }
  } catch (err: any) {
    if (err?.code === 'permission-denied') {
      handleFirestoreError(err, OperationType.GET, path);
    }
    console.warn(`Could not load timetable override for ${branchSemesterKey}:`, err?.message || err);
  }
  return null;
}

export async function getAllTimetableOverrides(): Promise<Record<string, Record<DayOfWeek, TimeSlot[]>>> {
  const path = 'timetable_overrides';
  const result: Record<string, Record<DayOfWeek, TimeSlot[]>> = {};
  try {
    const colRef = collection(db, 'timetable_overrides');
    const snap = await getDocs(colRef);
    snap.forEach((docSnap) => {
      const data = docSnap.data() as TimetableOverrideDoc;
      const raw = data.scheduleJson || (data as any).scheduleData;
      if (data.branchSemesterKey && raw) {
        try {
          result[data.branchSemesterKey] = JSON.parse(raw);
        } catch (e) {
          console.warn('Error parsing timetable override JSON for', data.branchSemesterKey, e);
        }
      }
    });
  } catch (err: any) {
    if (err?.code === 'permission-denied') {
      handleFirestoreError(err, OperationType.LIST, path);
    }
    console.warn('Could not fetch all timetable overrides:', err?.message || err);
  }
  return result;
}

export async function saveTimetableOverride(
  branchSemesterKey: string,
  schedule: Record<DayOfWeek, TimeSlot[]>,
  userEmail: string,
  room?: string,
  notes?: string
): Promise<void> {
  const path = `timetable_overrides/${branchSemesterKey}`;
  const docRef = doc(db, 'timetable_overrides', branchSemesterKey);
  const jsonStr = JSON.stringify(schedule);
  const payload: TimetableOverrideDoc & { scheduleData: string } = {
    branchSemesterKey,
    room: room || '',
    scheduleJson: jsonStr,
    scheduleData: jsonStr,
    notes: notes || '',
    updatedBy: userEmail,
    updatedAt: new Date().toISOString(),
  };
  try {
    await setDoc(docRef, payload);
  } catch (err: any) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function resetTimetableOverride(branchSemesterKey: string): Promise<void> {
  const path = `timetable_overrides/${branchSemesterKey}`;
  const docRef = doc(db, 'timetable_overrides', branchSemesterKey);
  try {
    await deleteDoc(docRef);
  } catch (err: any) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// COURSE OVERRIDES
export async function getAllCourseOverrides(): Promise<Record<string, Partial<Course>>> {
  const path = 'course_overrides';
  const overrides: Record<string, Partial<Course>> = {};
  try {
    const colRef = collection(db, 'course_overrides');
    const snap = await getDocs(colRef);
    snap.forEach((d) => {
      const data = d.data() as CourseOverrideDoc;
      try {
        const rawModules = data.modulesJson || (data as any).modules;
        const rawTextbooks = data.textbooksJson || (data as any).textbooks;
        overrides[data.code] = {
          code: data.code,
          name: data.name,
          credits: data.credits,
          ltp: data.ltp,
          coordinator: data.coordinator,
          shortName: data.shortName,
          room: data.room,
          notes: data.notes,
          modules: rawModules ? (typeof rawModules === 'string' ? JSON.parse(rawModules) : rawModules) : undefined,
          textbooks: rawTextbooks ? (typeof rawTextbooks === 'string' ? JSON.parse(rawTextbooks) : rawTextbooks) : undefined,
        };
      } catch (parseErr) {
        console.warn('Error parsing course override for', data.code, parseErr);
      }
    });
  } catch (err: any) {
    if (err?.code === 'permission-denied') {
      handleFirestoreError(err, OperationType.LIST, path);
    }
    console.warn('Could not fetch course overrides:', err?.message || err);
  }
  return overrides;
}

export async function saveCourseOverride(
  course: Course,
  userEmail: string
): Promise<void> {
  const path = `course_overrides/${course.code}`;
  const docRef = doc(db, 'course_overrides', course.code);
  const modulesStr = JSON.stringify(course.modules || []);
  const textbooksStr = JSON.stringify(course.textbooks || []);
  const payload: CourseOverrideDoc & { modules: string; textbooks: string } = {
    code: course.code,
    name: course.name,
    credits: course.credits,
    ltp: course.ltp,
    coordinator: course.coordinator,
    shortName: course.shortName || '',
    room: course.room,
    notes: course.notes || '',
    modulesJson: modulesStr,
    modules: modulesStr,
    textbooksJson: textbooksStr,
    textbooks: textbooksStr,
    updatedBy: userEmail,
    updatedAt: new Date().toISOString(),
  };
  try {
    await setDoc(docRef, payload);
  } catch (err: any) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function resetCourseOverride(courseCode: string): Promise<void> {
  const path = `course_overrides/${courseCode}`;
  const docRef = doc(db, 'course_overrides', courseCode);
  try {
    await deleteDoc(docRef);
  } catch (err: any) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// ANNOUNCEMENTS
export function subscribeToAnnouncements(callback: (announcements: AnnouncementDoc[]) => void) {
  const path = 'institute_announcements';
  try {
    const colRef = collection(db, 'institute_announcements');
    return onSnapshot(
      colRef,
      (snapshot) => {
        const list: AnnouncementDoc[] = [];
        snapshot.forEach((d) => {
          list.push({ id: d.id, ...(d.data() as Omit<AnnouncementDoc, 'id'>) });
        });
        // Sort newest first
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        callback(list);
      },
      (err: any) => {
        if (err?.code === 'permission-denied') {
          handleFirestoreError(err, OperationType.LIST, path);
        }
        console.warn('Notice listening to announcements (offline or reconnecting):', err?.message || err);
        callback([]);
      }
    );
  } catch (e: any) {
    console.warn('Announcements subscription error:', e);
    callback([]);
    return () => {};
  }
}

export async function createAnnouncement(
  title: string,
  content: string,
  type: 'info' | 'warning' | 'success' | 'urgent',
  authorEmail: string,
  authorName: string
): Promise<void> {
  const id = `announcement_${Date.now()}`;
  const path = `institute_announcements/${id}`;
  const docRef = doc(db, 'institute_announcements', id);
  try {
    await setDoc(docRef, {
      title,
      content,
      type,
      active: true,
      authorEmail,
      authorName: authorName || 'Academic Admin',
      createdAt: new Date().toISOString(),
    });
  } catch (err: any) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function toggleAnnouncementActive(id: string, currentStatus: boolean): Promise<void> {
  const path = `institute_announcements/${id}`;
  const docRef = doc(db, 'institute_announcements', id);
  try {
    await setDoc(docRef, { active: !currentStatus }, { merge: true });
  } catch (err: any) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export async function removeAnnouncement(id: string): Promise<void> {
  const path = `institute_announcements/${id}`;
  const docRef = doc(db, 'institute_announcements', id);
  try {
    await deleteDoc(docRef);
  } catch (err: any) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// USER PROGRESS CLOUD SYNCHRONIZATION
export interface UserCloudSyncData {
  profile?: any;
  attendance?: Record<string, { attended: number; total: number }>;
  tests?: any[];
  scheduleOverrides?: Record<string, Record<DayOfWeek, TimeSlot[]>>;
  selectedElective?: string;
  selectedBatch?: string;
  email?: string;
  lastSyncedAt?: string;
}

export async function getUserCloudData(userId: string): Promise<UserCloudSyncData | null> {
  const path = `users/${userId}`;
  try {
    const docRef = doc(db, 'users', userId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as UserCloudSyncData;
    }
  } catch (err: any) {
    console.warn(`Could not load user cloud data for ${userId} (operating in offline mode):`, err?.message || err);
  }
  return null;
}

export async function saveUserCloudData(userId: string, data: Partial<UserCloudSyncData>): Promise<void> {
  const path = `users/${userId}`;
  try {
    const docRef = doc(db, 'users', userId);
    await setDoc(
      docRef,
      {
        ...data,
        lastSyncedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err: any) {
    console.warn(`Could not save user cloud data for ${userId} (saved to local cache):`, err?.message || err);
  }
}
