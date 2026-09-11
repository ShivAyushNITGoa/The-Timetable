import { Course, TimeSlot, DayOfWeek, WEEKLY_SCHEDULE as EEE5_WEEKLY_SCHEDULE, COURSES as EEE5_COURSES } from './timetableData';
import {
  COMMON_1,
  COMMON_2,
  getFirstYearData,
  FirstYearSection,
  PHYSICS_CYCLE_COURSES,
  CHEMISTRY_CYCLE_COURSES,
} from './semesters/semester1And2';
import { CSE_3, ECE_3, EEE_3, ME_3, CVE_3 } from './semesters/semester3Data';
import { CSE_4, ECE_4, EEE_4, ME_4, CVE_4 } from './semesters/semester4Data';
import { CSE_5, ECE_5, EEE_5, ME_5, CVE_5 } from './semesters/semester5Data';
import { CSE_6, ECE_6, EEE_6, ME_6, CVE_6 } from './semesters/semester6Data';
import {
  CSE_7,
  ECE_7,
  EEE_7,
  ME_7,
  CVE_7,
  CSE_8,
  ECE_8,
  EEE_8,
  ME_8,
  CVE_8,
} from './semesters/semester7And8Data';

export type BranchCode = 'EEE' | 'CSE' | 'ECE' | 'ME' | 'CVE';
export type { FirstYearSection };

export interface BranchInfo {
  code: BranchCode;
  name: string;
  fullName: string;
  department: string;
  iconColor: string;
  badgeBg: string;
  headOfDepartment: string;
}

export const BRANCHES_LIST: BranchInfo[] = [
  {
    code: 'EEE',
    name: 'Electrical & Electronics',
    fullName: 'Electrical and Electronics Engineering',
    department: 'Department of Electrical & Electronics Engineering',
    iconColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    headOfDepartment: 'Dr. Suresh Mikkili',
  },
  {
    code: 'CSE',
    name: 'Computer Science',
    fullName: 'Computer Science and Engineering',
    department: 'Department of Computer Science & Engineering',
    iconColor: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    headOfDepartment: 'Dr. Pravati Swain',
  },
  {
    code: 'ECE',
    name: 'Electronics & Comm.',
    fullName: 'Electronics and Communication Engineering',
    department: 'Department of Electronics & Communication Engineering',
    iconColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    headOfDepartment: 'Dr. C. Vyjayanthi',
  },
  {
    code: 'ME',
    name: 'Mechanical Engg.',
    fullName: 'Mechanical Engineering',
    department: 'Department of Mechanical Engineering',
    iconColor: 'text-orange-400',
    badgeBg: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    headOfDepartment: 'Dr. Sachin D. Kore',
  },
  {
    code: 'CVE',
    name: 'Civil Engineering',
    fullName: 'Civil Engineering',
    department: 'Department of Civil Engineering',
    iconColor: 'text-blue-400',
    badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    headOfDepartment: 'Dr. Harikumar M.',
  },
];

export interface StudentProfile {
  branch: BranchCode;
  year: number; // 1, 2, 3, 4
  semester: number; // 1 to 8
  firstYearSection?: FirstYearSection; // 'A' | 'B' | 'C' | 'D'
  labBatch: string; // 'batch1' | 'batch2'
  batch?: string;
  electiveCode?: string;
  elective?: string;
  hasMinor: boolean;
  minorCode?: string;
  customSchedule?: Record<DayOfWeek, TimeSlot[]>;
}

export const DEFAULT_PROFILE: StudentProfile = {
  branch: 'EEE',
  year: 3,
  semester: 5,
  firstYearSection: 'A',
  labBatch: 'batch1',
  batch: 'batch1',
  electiveCode: 'EE541',
  elective: 'EE541',
  hasMinor: true,
  minorCode: 'CS300M',
};

export const DEFAULT_STUDENT_PROFILE = DEFAULT_PROFILE;

// Unified dictionary of branch-semester curricula
export const BRANCH_SEMESTER_DATA: Record<
  string,
  { courses: Record<string, Course>; schedule: Record<DayOfWeek, TimeSlot[]> }
> = {
  // 1st Year Cycle defaults (Common)
  'COMMON-1': COMMON_1,
  'COMMON-2': COMMON_2,

  // 1st Year Sections (Sem 1 & Sem 2)
  'SEC-A-1': getFirstYearData('A', 1),
  'SEC-B-1': getFirstYearData('B', 1),
  'SEC-C-1': getFirstYearData('C', 1),
  'SEC-D-1': getFirstYearData('D', 1),

  'SEC-A-2': getFirstYearData('A', 2),
  'SEC-B-2': getFirstYearData('B', 2),
  'SEC-C-2': getFirstYearData('C', 2),
  'SEC-D-2': getFirstYearData('D', 2),

  // Fallback 1st year aliases for branch selectors
  'CSE-1': COMMON_1,
  'ECE-1': COMMON_1,
  'EEE-1': COMMON_1,
  'ME-1': COMMON_1,
  'CVE-1': COMMON_1,

  'CSE-2': COMMON_2,
  'ECE-2': COMMON_2,
  'EEE-2': COMMON_2,
  'ME-2': COMMON_2,
  'CVE-2': COMMON_2,

  // 2nd Year Odd (Semester 3)
  'CSE-3': CSE_3,
  'ECE-3': ECE_3,
  'EEE-3': EEE_3,
  'ME-3': ME_3,
  'CVE-3': CVE_3,

  // 2nd Year Even (Semester 4)
  'CSE-4': CSE_4,
  'ECE-4': ECE_4,
  'EEE-4': EEE_4,
  'ME-4': ME_4,
  'CVE-4': CVE_4,

  // 3rd Year Odd (Semester 5)
  'EEE-5': EEE_5,
  'CSE-5': CSE_5,
  'ECE-5': ECE_5,
  'ME-5': ME_5,
  'CVE-5': CVE_5,

  // 3rd Year Even (Semester 6)
  'CSE-6': CSE_6,
  'ECE-6': ECE_6,
  'EEE-6': EEE_6,
  'ME-6': ME_6,
  'CVE-6': CVE_6,

  // 4th Year Odd (Semester 7)
  'CSE-7': CSE_7,
  'ECE-7': ECE_7,
  'EEE-7': EEE_7,
  'ME-7': ME_7,
  'CVE-7': CVE_7,

  // 4th Year Even (Semester 8 - Capstone)
  'CSE-8': CSE_8,
  'ECE-8': ECE_8,
  'EEE-8': EEE_8,
  'ME-8': ME_8,
  'CVE-8': CVE_8,
};

/**
 * Returns curriculum and timetable for active branch and semester.
 * Notice: For 1st year (Semester 1 & 2), NIT Goa uses 4 common sections:
 * - Sections A & B: Same course (Physics in Sem 1, Chemistry in Sem 2)
 * - Sections C & D: Same course (Chemistry in Sem 1, Physics in Sem 2)
 * After 1st year (Semesters 3-8), students study their branch-specific syllabus.
 */
export function getActiveBranchSemesterData(
  branch?: BranchCode,
  semester?: number,
  firstYearSection?: FirstYearSection
) {
  const safeSemester = semester ?? 5;
  const safeBranch = branch || 'EEE';

  // 1st Year (Semester 1 and 2): 4-section model (Sections A, B, C, D)
  if (safeSemester === 1 || safeSemester === 2) {
    const sec: FirstYearSection = firstYearSection || 'A';
    return getFirstYearData(sec, safeSemester);
  }

  // After 1st year (Semester 3 to 8): Branch-wise syllabus
  const key = `${safeBranch}-${safeSemester}`;
  if (BRANCH_SEMESTER_DATA[key]) {
    return BRANCH_SEMESTER_DATA[key];
  }

  // Fallback to branch 5th semester
  const fallbackKey = `${safeBranch}-5`;
  if (BRANCH_SEMESTER_DATA[fallbackKey]) {
    return BRANCH_SEMESTER_DATA[fallbackKey];
  }

  // Final fallback to EEE-5
  return BRANCH_SEMESTER_DATA['EEE-5'];
}

export function getAllKnownCourses(): Record<string, Course> {
  const map: Record<string, Course> = { ...EEE5_COURSES };

  // Add 1st year courses
  Object.assign(map, PHYSICS_CYCLE_COURSES);
  Object.assign(map, CHEMISTRY_CYCLE_COURSES);

  // Add all semester courses
  Object.values(BRANCH_SEMESTER_DATA).forEach((branchSem) => {
    if (branchSem && branchSem.courses) {
      Object.assign(map, branchSem.courses);
    }
  });

  return map;
}
