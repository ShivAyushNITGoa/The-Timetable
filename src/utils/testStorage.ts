import { AcademicTest, TestType, TestPriority, PrepStatus } from '../data/testTypes';

const TESTS_STORAGE_KEY = 'nit_goa_academic_tests_v1';

export const DEFAULT_TESTS: AcademicTest[] = [
  {
    id: 'test-cie-ee300-1',
    courseCode: 'EE300',
    courseName: 'Power Electronics',
    title: 'Unit Test (T1): Power Semiconductor Devices',
    type: 'Unit Test (T1/T2)',
    date: '2026-10-26',
    startTime: '11:00',
    endTime: '11:55',
    room: '51/52',
    syllabus: 'Module 1: Power Semiconductor Devices (SCR, MOSFET, IGBT, GTO) - characteristics & firing circuits, snubber circuits and commutation mechanisms.',
    weightageMarks: 15,
    obtainedMarks: undefined,
    priority: 'High',
    status: 'In Progress',
    checklist: [
      { id: 'c1', text: 'Revise SCR Two-Transistor Model and latching/holding current', done: true },
      { id: 'c2', text: 'Derive Turn-off Time (tq) and snubber design equations', done: false },
      { id: 'c3', text: 'Practice UJT relaxation oscillator and gate triggering waveforms', done: false },
    ],
    notes: 'Calculators are allowed. Dr. Sreeraj announced 3 numericals + 2 conceptual questions.',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'test-cie-ee301-2',
    courseCode: 'EE301',
    courseName: 'Electrical Machines-II',
    title: 'Quiz 2: Alternator Voltage Regulation',
    type: 'Quiz',
    date: '2026-10-30',
    startTime: '10:00',
    endTime: '10:55',
    room: '51/52',
    syllabus: 'Module 2: Synchronous Generators (Alternators) - Regulation methods (EMF, MMF, Potier), parallel operation and synchronizing power.',
    weightageMarks: 10,
    obtainedMarks: undefined,
    priority: 'Medium',
    status: 'Not Started',
    checklist: [
      { id: 'c4', text: 'Revise Potier triangle method and zero power factor characteristics', done: false },
      { id: 'c5', text: 'Solve synchronizing torque numericals for parallel alternators', done: false },
    ],
    notes: 'Single formula sheet permitted. Focus on phasor diagrams under lagging and leading power factors.',
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'test-cie-ee302-mid',
    courseCode: 'EE302',
    courseName: 'Control Systems',
    title: 'Mid-Semester Examination: Control Systems',
    type: 'Mid-Semester Exam',
    date: '2026-11-06',
    startTime: '09:30',
    endTime: '11:30',
    room: 'Lecture Hall 01',
    syllabus: 'Modules 1 & 2: Mathematical modeling of physical systems, block diagram reduction, signal flow graphs (Mason gain formula), time-domain specifications, steady-state error analysis, Routh-Hurwitz stability criterion.',
    weightageMarks: 30,
    obtainedMarks: undefined,
    priority: 'High',
    status: 'Not Started',
    checklist: [
      { id: 'c6', text: 'Practice Mason Gain Formula on multi-loop feedback diagrams', done: false },
      { id: 'c7', text: 'Solve 2nd order underdamped system step response equations', done: false },
      { id: 'c8', text: 'Construct Routh arrays for special cases with auxiliary polynomials', done: false },
    ],
    notes: 'Official institute Mid-Sem exam schedule. Graph sheets and calculators provided/permitted.',
    createdAt: Date.now(),
  },
  {
    id: 'test-cie-cs300m-1',
    courseCode: 'CS300M',
    courseName: 'Data Structures & Algorithms',
    title: 'Project Milestone: Balanced Search Trees',
    type: 'Assignment / Project',
    date: '2026-11-12',
    startTime: '14:00',
    endTime: '14:55',
    room: 'Room 74/75',
    syllabus: 'Module 2: Trees & Balanced Search Trees - Binary trees, traversals, Binary Search Trees (BST), AVL trees, rotations, and B-Trees.',
    weightageMarks: 15,
    obtainedMarks: undefined,
    priority: 'Medium',
    status: 'Not Started',
    checklist: [
      { id: 'c9', text: 'Practice single and double rotations (LL, RR, LR, RL) in AVL trees', done: false },
      { id: 'c10', text: 'Verify BST deletion algorithms and node successor replacement', done: false },
    ],
    notes: 'Code tracing questions on paper. Time and space complexity proofs required.',
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
    // Automatically purge legacy placeholder/demo tests and update to authentic assessments
    if (
      !Array.isArray(parsed) ||
      parsed.length === 0 ||
      parsed.some((t: any) => t.id === 'DEMO Test' || (t.title && t.title.toLowerCase().includes('demo test')))
    ) {
      localStorage.setItem(TESTS_STORAGE_KEY, JSON.stringify(DEFAULT_TESTS));
      return DEFAULT_TESTS;
    }
    return parsed;
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
