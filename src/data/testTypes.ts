export type TestType = 
  | 'Quiz'
  | 'Mid-Semester Exam'
  | 'End-Semester Exam'
  | 'Unit Test (T1/T2)'
  | 'Lab Exam / Viva'
  | 'Assignment / Project'
  | 'Surprise Test';

export type TestPriority = 'High' | 'Medium' | 'Low';
export type PrepStatus = 'Not Started' | 'In Progress' | 'Prepared' | 'Completed';

export interface AcademicTest {
  id: string;
  courseCode: string;
  courseName: string;
  title: string;
  type: TestType;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm (24h)
  endTime: string; // HH:mm (24h)
  room: string;
  syllabus?: string;
  weightageMarks?: number;
  obtainedMarks?: number;
  priority: TestPriority;
  status: PrepStatus;
  checklist?: { id: string; text: string; done: boolean }[];
  notes?: string;
  createdAt: number;
}
