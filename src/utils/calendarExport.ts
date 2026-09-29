import { TimeSlot, Course, DayOfWeek } from '../data/timetableData';
import { AcademicTest } from '../data/testTypes';

interface ExportCalendarOptions {
  schedule: Record<DayOfWeek, TimeSlot[]>;
  courses: Record<string, Course>;
  selectedElective?: string;
  elective?: string;
  selectedBatch?: string;
  batch?: string;
  branchName?: string;
  branch?: string;
  semester?: number;
  tests?: AcademicTest[];
}

export function generateICS(options: ExportCalendarOptions): string {
  const {
    schedule,
    courses,
    selectedElective = options.elective || 'EE541',
    selectedBatch = options.batch || 'batch1',
    branchName = options.branch || 'EEE',
    semester = 5,
    tests = [],
  } = options;

  const dayOffsetMap: Record<DayOfWeek, number> = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };

  // Base Monday in the semester: Monday, August 24, 2026
  const baseDate = new Date(2026, 7, 24); // Aug is 7 (0-indexed)

  let icsEvents = '';

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const formatDate = (d: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  };

  // 1. Weekly Class Schedule Events
  for (const day of days) {
    const slots = schedule[day] || [];
    const dayOffset = dayOffsetMap[day];

    const eventDate = new Date(baseDate);
    eventDate.setDate(baseDate.getDate() + dayOffset);

    for (const slot of slots) {
      if (slot.isLunch || slot.isFree) continue;

      let title = '';
      let room = slot.room;
      let faculty = '';
      let description = '';

      if (slot.isElectiveChoice) {
        const elect = slot.electiveOptions?.find((e) => e.code === selectedElective) || slot.electiveOptions?.[0];
        if (elect) {
          title = `${elect.code}: ${elect.name}`;
          faculty = elect.faculty;
          room = elect.room;
          description = `Faculty: ${elect.faculty}\\nRoom: ${elect.room}\\nElective Slot`;
        }
      } else if (slot.isLab && slot.labOptions) {
        const lab = selectedBatch === 'batch1' ? slot.labOptions.batch1 : slot.labOptions.batch2;
        title = `${lab.code}: ${lab.name}`;
        faculty = lab.faculty;
        room = lab.room;
        description = `Lab Session (${selectedBatch.toUpperCase()})\\nFaculty: ${lab.faculty}\\nRoom: ${lab.room}`;
      } else if (slot.courseCode) {
        const course = courses[slot.courseCode];
        if (course) {
          title = `${course.code}: ${course.name}`;
          faculty = course.coordinator;
          room = slot.room || course.room;
          description = `${course.category.toUpperCase()} | Slot: ${course.teachingSlot}\\nFaculty: ${course.coordinator}\\nRoom: ${room}${course.notes ? '\\nNote: ' + course.notes : ''}`;
        } else {
          title = `${slot.courseCode} (${slot.slotName})`;
        }
      }

      if (!title) continue;

      const [startHour, startMin] = slot.startTime.split(':').map(Number);
      const [endHour, endMin] = slot.endTime.split(':').map(Number);

      const dtStart = new Date(eventDate);
      dtStart.setHours(startHour, startMin, 0, 0);

      const dtEnd = new Date(eventDate);
      dtEnd.setHours(endHour, endMin, 0, 0);

      const uid = `nitgoa-${branchName}-${semester}-${slot.id}-${Date.now()}@nitgoa.ac.in`;
      const byDay = day.substring(0, 2).toUpperCase(); // MO, TU, WE, TH, FR

      icsEvents += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatDate(new Date())}Z
DTSTART;TZID=Asia/Kolkata:${formatDate(dtStart)}
DTEND;TZID=Asia/Kolkata:${formatDate(dtEnd)}
RRULE:FREQ=WEEKLY;UNTIL=20261215T235959Z;BYDAY=${byDay}
SUMMARY:${title}
LOCATION:${room}
DESCRIPTION:${description}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Upcoming Class: ${title} at ${room}
END:VALARM
END:VEVENT
`;
    }
  }

  // 2. Individual Scheduled Academic Tests (Quizzes, Mid-Sem, Vivas, etc.)
  for (const test of tests) {
    const [year, month, day] = test.date.split('-').map(Number);
    const [startHour, startMin] = test.startTime.split(':').map(Number);
    const [endHour, endMin] = test.endTime.split(':').map(Number);

    const dtStart = new Date(year, month - 1, day, startHour, startMin, 0);
    const dtEnd = new Date(year, month - 1, day, endHour, endMin, 0);

    const uid = `nitgoa-test-${test.id}-${Date.now()}@nitgoa.ac.in`;
    const summary = `[TEST] ${test.courseCode}: ${test.title}`;
    const desc = `Type: ${test.type}\\nCourse: ${test.courseCode} - ${test.courseName}\\nWeightage: ${test.weightageMarks || 'N/A'} Marks\\nVenue: ${test.room}\\nSyllabus: ${test.syllabus || 'N/A'}${test.notes ? '\\nNotes: ' + test.notes : ''}`;

    icsEvents += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatDate(new Date())}Z
DTSTART;TZID=Asia/Kolkata:${formatDate(dtStart)}
DTEND;TZID=Asia/Kolkata:${formatDate(dtEnd)}
SUMMARY:${summary}
LOCATION:${test.room}
DESCRIPTION:${desc}
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
PRODID:-//NIT Goa//${branchName} Sem ${semester} Timetable & Tests//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:NIT Goa ${branchName} Sem ${semester}
X-WR-TIMEZONE:Asia/Kolkata
${icsEvents}END:VCALENDAR`;
}

export function downloadICS(options: ExportCalendarOptions) {
  const icsData = generateICS(options);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = `NIT_Goa_${options.branchName || 'EEE'}_Sem${options.semester || 5}_Timetable.ics`;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
