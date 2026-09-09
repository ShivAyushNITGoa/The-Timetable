import { AcademicTest, TestType, TestPriority, PrepStatus } from '../data/testTypes';

const TESTS_STORAGE_KEY = 'nit_goa_academic_tests_v1';

export const DEFAULT_TESTS: AcademicTest[] = [
  {
    id: 'test-1',
    courseCode: 'EE300',
    courseName: 'Power Electronics',
    title: 'Surprise Quiz 1: SCR & Inverters',
    type: 'Quiz',
    date: '2026-09-15',
    startTime: '11:00',
    endTime: '11:55',
    room: '51/52',
    syllabus: 'Module 1: Power Semiconductor Devices, SCR firing circuits, MOSFET and IGBT switching characteristics.',
    weightageMarks: 15,
    obtainedMarks: undefined,
    priority: 'High',
    status: 'In Progress',
    checklist: [
      { id: 'c1', text: 'Revise SCR Two-Transistor Model', done: true },
      { id: 'c2', text: 'Derive Turn-off Time (tq) and snubber equations', done: false },
      { id: 'c3', text: 'Practice gate triggering circuit diagrams', done: false },
    ],
    notes: 'Calculators are allowed. Dr. Sreeraj announced 3 numericals + 2 conceptual questions.',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'test-2',
    courseCode: 'CS300M',
    courseName: 'Design and Analysis of Algorithms',
    title: 'Minor Test 1: Dynamic Programming & Graphs',
    type: 'Unit Test (T1/T2)',
    date: '2026-09-22',
    startTime: '12:00',
    endTime: '12:55',
    room: '74/75',
    syllabus: 'Divide & Conquer, Recurrence relations (Master Theorem), DP: 0/1 Knapsack, Bellman-Ford shortest paths.',
    weightageMarks: 20,
    obtainedMarks: undefined,
    priority: 'High',
    status: 'In Progress',
    checklist: [
      { id: 'c4', text: 'Solve 0/1 Knapsack tabular state transition', done: true },
      { id: 'c5', text: 'Practice negative edge cycle detection proof', done: false },
    ],
    notes: 'Exam Slot G with CSE department. Crucial for Minor certification.',
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'test-3',
    courseCode: 'EE302',
    courseName: 'Power Systems-I',
    title: 'Mid-Sem Examination: Transmission & Line Parameters',
    type: 'Mid-Semester Exam',
    date: '2026-10-06',
    startTime: '09:30',
    endTime: '11:30',
    room: 'Lecture Complex LH-01',
    syllabus: 'Full Modules 1 & 2: Line inductance, GMD/GMR calculation of bundled conductors, ABCD parameters, Ferranti effect.',
    weightageMarks: 30,
    obtainedMarks: undefined,
    priority: 'High',
    status: 'Not Started',
    checklist: [
      { id: 'c6', text: 'Derive GMD/GMR formulas for 3-phase bundled lines', done: false },
      { id: 'c7', text: 'Complete tutorial problems 1 to 14 from Dr. Mikkili', done: false },
      { id: 'c8', text: 'Memorize Nominal-Pi and Nominal-T ABCD matrices', done: false },
    ],
    notes: 'Institute Central Mid-Sem Slot E. Graph sheets and scientific calculators provided/permitted.',
    createdAt: Date.now(),
  },
  {
    id: 'test-4',
    courseCode: 'EE305',
    courseName: 'Microprocessor Laboratory',
    title: 'Mid-Term Lab Viva & Assembly Coding Exam',
    type: 'Lab Exam / Viva',
    date: '2026-10-12',
    startTime: '14:00',
    endTime: '17:00',
    room: 'Abdul Kalam Complex Lab',
    syllabus: '8086 Assembly: Array sorting (Bubble sort), String manipulation, 8255 PPI mode 0 interfacing.',
    weightageMarks: 25,
    obtainedMarks: undefined,
    priority: 'Medium',
    status: 'Not Started',
    checklist: [
      { id: 'c9', text: 'Verify MASM / TASM scripts on lab computer', done: false },
      { id: 'c10', text: 'Get lab record signed by Dr. Amritansh Sagar', done: false },
    ],
    notes: 'Bring stamped lab manual and blue book.',
    createdAt: Date.now(),
  },
];

export function getStoredTests(): AcademicTest[] {
  try {
    const raw = localStorage.getItem(TESTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(DEFAULT_TESTS));
      return DEFAULT_TESTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_TESTS;
  } catch (err) {
    console.error('Failed to load academic tests:', err);
    return DEFAULT_TESTS;
  }
}

export function saveTests(tests: AcademicTest[]): void {
  try {
    localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(tests));
  } catch (err) {
    console.error('Failed to save academic tests:', err);
  }
}

export const saveStoredTests = saveTests;

export function addAcademicTest(newTest: Omit<AcademicTest, 'id' | 'createdAt'>): AcademicTest {
  const tests = getStoredTests();
  const test: AcademicTest = {
    ...newTest,
    id: `test-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: Date.now(),
  };
  tests.push(test);
  // Sort chronologically
  tests.sort((a, b) => new Date(`${a.date}T${a.startTime}`).getTime() - new Date(`${b.date}T${b.startTime}`).getTime());
  saveTests(tests);
  return test;
}

export function updateAcademicTest(updatedTest: AcademicTest): void {
  const tests = getStoredTests();
  const index = tests.findIndex((t) => t.id === updatedTest.id);
  if (index !== -1) {
    tests[index] = updatedTest;
    saveTests(tests);
  }
}

export function deleteAcademicTest(testId: string): void {
  const tests = getStoredTests().filter((t) => t.id !== testId);
  saveTests(tests);
}

export function getTestsForDate(dateStr: string): AcademicTest[] {
  const tests = getStoredTests();
  return tests.filter((t) => t.date === dateStr);
}

export function generateTestsICS(tests: AcademicTest[]): string {
  let icsEvents = '';

  const formatDate = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
  };

  for (const test of tests) {
    const [year, month, day] = test.date.split('-').map(Number);
    const [startHour, startMin] = test.startTime.split(':').map(Number);
    const [endHour, endMin] = test.endTime.split(':').map(Number);

    const dtStart = new Date(year, month - 1, day, startHour, startMin, 0);
    const dtEnd = new Date(year, month - 1, day, endHour, endMin, 0);

    const uid = `nitgoa-test-${test.id}-${Date.now()}@nitgoa.ac.in`;
    const summary = `[TEST] ${test.courseCode}: ${test.title}`;
    const description = `Type: ${test.type}\\nCourse: ${test.courseCode} - ${test.courseName}\\nWeightage: ${test.weightageMarks || 'N/A'} Marks\\nVenue: ${test.room}\\nSyllabus: ${test.syllabus || 'N/A'}${test.notes ? '\\nNotes: ' + test.notes : ''}`;

    icsEvents += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatDate(new Date())}Z
DTSTART;TZID=Asia/Kolkata:${formatDate(dtStart)}
DTEND;TZID=Asia/Kolkata:${formatDate(dtEnd)}
SUMMARY:${summary}
LOCATION:${test.room}
DESCRIPTION:${description}
PRIORITY:${test.priority === 'High' ? '1' : test.priority === 'Medium' ? '5' : '9'}
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Reminder: ${summary} starting in 30 minutes at ${test.room}
END:VALARM
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Tomorrow: ${summary} at ${test.startTime}
END:VALARM
END:VEVENT
`;
  }

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NIT Goa//Academic Tests and Exams Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:NIT Goa Tests & Exams
X-WR-TIMEZONE:Asia/Kolkata
${icsEvents}END:VCALENDAR`;
}

export function downloadTestsICS(tests: AcademicTest[]) {
  const icsData = generateTestsICS(tests);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'NIT_Goa_Academic_Tests.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
