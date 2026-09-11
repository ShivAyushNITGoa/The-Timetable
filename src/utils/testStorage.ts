import { AcademicTest, TestType, TestPriority, PrepStatus } from '../data/testTypes';

const TESTS_STORAGE_KEY = 'nit_goa_academic_tests_v1';



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
