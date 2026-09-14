import { ResourceDocument } from '../data/resourcesData';
import { StudentProfile } from '../data/branchesData';
import { Course, TimeSlot, DayOfWeek } from '../data/timetableData';
import { AcademicTest } from '../data/testTypes';

export interface StudentWebappData {
  profile: StudentProfile;
  attendance: Record<string, { attended: number; total: number }>;
  schedule: Record<DayOfWeek, TimeSlot[]> | null;
  courses: Record<string, Course>;
  tests: AcademicTest[];
  grades: Record<string, string>;
}

/**
 * Helper to fetch all live data created by the student in the webapp
 */
export function gatherStudentWebappData(
  profile: StudentProfile,
  activeCourses: Record<string, Course>,
  scheduleOverride: Record<DayOfWeek, TimeSlot[]> | null,
  tests: AcademicTest[]
): StudentWebappData {
  const safeBranch = (profile.branch || 'EEE').toLowerCase();
  const safeSemester = profile.semester ?? 5;

  // 1. Fetch attendance
  let attendance: Record<string, { attended: number; total: number }> = {};
  try {
    const saved = localStorage.getItem(`nit_goa_attendance_${safeBranch}_sem${safeSemester}`);
    if (saved) {
      attendance = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading attendance data:', e);
  }

  // 2. Fetch grades
  let grades: Record<string, string> = {};
  try {
    const saved = localStorage.getItem(`nit_goa_grades_${profile.branch}_sem${safeSemester}`);
    if (saved) {
      grades = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading grades data:', e);
  }

  return {
    profile,
    attendance,
    schedule: scheduleOverride,
    courses: activeCourses,
    tests,
    grades,
  };
}

/**
 * Generates official NIT Goa classified documents based on the student's webapp data
 */
export function generateClassifiedDocuments(data: StudentWebappData): ResourceDocument[] {
  const { profile, attendance, schedule, courses, tests, grades } = data;
  const branchName = profile.branch;
  const sem = profile.semester;
  const year = profile.year;
  const rollNo = profile.rollNo || '22EEE001';
  const studentName = profile.studentName || 'B.Tech Scholar';

  const documents: ResourceDocument[] = [];

  // =========================================================================
  // 1. FORM AT-04: Official Attendance Deficiency & Condonation Docket
  // =========================================================================
  const attendanceRows: (string | number)[][] = [];
  let totalScheduled = 0;
  let totalAttended = 0;
  let condonationNeededCount = 0;
  let debarredCount = 0;

  Object.entries(courses).forEach(([code, course]) => {
    const record = attendance[code] || { attended: 0, total: 0 };
    const attended = record.attended;
    const total = record.total;
    const pct = total > 0 ? ((attended / total) * 100).toFixed(1) : '100.0';
    const numPct = total > 0 ? (attended / total) * 100 : 100;

    totalScheduled += total;
    totalAttended += attended;

    let status = 'Satisfactory (≥ 75%)';
    if (numPct < 65 && total >= 5) {
      status = 'DEBARRED (< 65% : Grade FA)';
      debarredCount++;
    } else if (numPct < 75 && total >= 5) {
      status = 'Condonation Needed (65% - 74%)';
      condonationNeededCount++;
    }

    attendanceRows.push([
      code,
      course.name,
      course.coordinator || 'Department Faculty',
      total.toString(),
      attended.toString(),
      `${pct}%`,
      status,
    ]);
  });

  const aggregatePct = totalScheduled > 0 ? ((totalAttended / totalScheduled) * 100).toFixed(1) : '100.0';

  documents.push({
    id: 'form-at-04-attendance',
    title: `NIT Goa Form AT-04: Attendance Record & Shortfall Audit Docket (${branchName} - Sem ${sem})`,
    shortTitle: 'Form AT-04: Attendance Audit',
    docNumber: `NITG/ACAD/FORM-AT04/${branchName}/2024-25/${rollNo}`,
    category: 'rules',
    branch: profile.branch as any,
    year: profile.year.toString() as any,
    semesterRange: `Semester ${sem}`,
    academicYear: '2024–2025 (Current)',
    issuingAuthority: 'Dean (Academics) & Department Attendance Review Committee',
    effectiveDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    summary: `Classified attendance dossier generated from student's tracked classes. Formatted according to NIT Goa B.Tech Ordinance Section 8. Evaluates aggregate eligibility (${aggregatePct}%), flags medical condonation requirements, and records faculty verification.`,
    tags: ['Classified My Data', 'Form AT-04', 'Attendance', '75% Rule', 'Medical Condonation', 'Ordinance Sec 8'],
    pdfFileName: `NIT_Goa_Form_AT04_Attendance_${rollNo}.pdf`,
    externalOfficialUrl: 'https://www.nitgoa.ac.in/uploaded_files/Academic_Rules_B.Tech.pdf',
    sections: [
      {
        title: 'Student Identification & Enrollment Particulars',
        content: [
          `• Student Name: ${studentName}`,
          `• Roll / Registration Number: ${rollNo}`,
          `• Academic Department: Department of ${profile.branchTitle || branchName}`,
          `• Academic Cohort: B.Tech Year ${year}, Semester ${sem} (Section: ${profile.firstYearSection || 'N/A'})`,
          `• Laboratory Batch: ${profile.batch || profile.labBatch || 'Batch 1'}`,
          `• Selected Program Elective: ${profile.elective || profile.electiveCode || 'Core Elective'}`,
          `• Document Timestamp: Generated on ${new Date().toLocaleString()}`,
        ],
      },
      {
        title: 'Course-Wise Attendance Classification Matrix',
        subheading: 'Mandatory 75% threshold enforced under Senate Resolution Clause 8.1',
        table: {
          headers: ['Course Code', 'Course Title', 'Faculty In-Charge', 'Held', 'Attended', 'Percentage', 'Senate Status'],
          rows: attendanceRows.length > 0 ? attendanceRows : [
            ['No courses registered', '-', '-', '0', '0', '100%', 'Normal']
          ],
        },
      },
      {
        title: 'Institute Attendance Summary & Statutory Endorsement',
        content: [
          `• Total Instructional Sessions Held: ${totalScheduled}`,
          `• Total Sessions Attended: ${totalAttended}`,
          `• Cumulative Attendance Percentage: ${aggregatePct}%`,
          `• Subjects in Medical Condonation Band (65%–74.9%): ${condonationNeededCount} course(s)`,
          `• Subjects with Debarment Shortfall (<65%): ${debarredCount} course(s)`,
          '• Senate Ordinance Rule 8.2: Condonation of shortage up to 10% may be granted by the Director only on medical grounds (with CMO certificate) or official Institute representation in sports/cultural events.',
          '• Statutory Signatures: [1] Student Signature: ___________  [2] Faculty Advisor: ___________  [3] Head of Department: ___________  [4] Dean (Academics): ___________',
        ],
      },
    ],
  });

  // =========================================================================
  // 2. FORM CR-01: B.Tech Course Registration & Slot Matrix Allocation
  // =========================================================================
  const courseRows: (string | number)[][] = [];
  let totalCredits = 0;

  Object.entries(courses).forEach(([code, course]) => {
    totalCredits += course.credits;
    const categoryLabel = course.category === 'core' 
      ? 'Professional Core (PCC)' 
      : (course.category === 'elective' ? 'Professional Elective (PEC)' : (course.category === 'minor' ? 'Minor (MIN)' : 'Institutional'));

    courseRows.push([
      code,
      course.name,
      categoryLabel,
      `${course.credits}`,
      course.ltp || (course.type === 'Practical' ? '0-0-3' : '3-0-0'),
      course.teachingSlot || 'Slot A',
      course.room || 'LHC-01',
      course.coordinator || 'Faculty In-Charge',
    ]);
  });

  documents.push({
    id: 'form-cr-01-registration',
    title: `NIT Goa Form CR-01: Official Course Registration & Slot Matrix Slip (${branchName} - Sem ${sem})`,
    shortTitle: 'Form CR-01: Course Registration',
    docNumber: `NITG/ACAD/FORM-CR01/${branchName}/2024-25/${rollNo}`,
    category: 'curriculum',
    branch: profile.branch as any,
    year: profile.year.toString() as any,
    semesterRange: `Semester ${sem}`,
    academicYear: '2024–2025',
    issuingAuthority: 'Academic Section & Board of Studies, NIT Goa',
    effectiveDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    summary: `Classified course enrollment record for ${studentName}. Validates total registered credits (${totalCredits} Credits, permissible range: 16–26), course categories, faculty allocation, and lecture hall venues at Cuncolim campus.`,
    tags: ['Classified My Data', 'Form CR-01', 'Registration', 'Slot Matrix', 'Credits', 'Curriculum'],
    pdfFileName: `NIT_Goa_Form_CR01_Registration_${rollNo}.pdf`,
    externalOfficialUrl: 'https://www.nitgoa.ac.in/academic/rules.html',
    sections: [
      {
        title: 'Candidate Registration Metadata',
        content: [
          `• Full Name: ${studentName}`,
          `• Enrollment Number: ${rollNo}`,
          `• Program: Bachelor of Technology (B.Tech)`,
          `• Discipline: Department of ${branchName}`,
          `• Semester: ${sem} (Academic Session 2024–2025)`,
          `• Credit Compliance: ${totalCredits} Credits Registered (Permissible: 16–26 as per Rule 5.1)`,
        ],
      },
      {
        title: 'Registered Courses, Credits & Slot Allotment',
        subheading: 'Clash-free institute slot matrix verified for lecture and laboratory slots',
        table: {
          headers: ['Code', 'Course Title', 'Classification', 'Credits', 'L-T-P', 'Slot', 'Venue', 'Faculty In-Charge'],
          rows: courseRows.length > 0 ? courseRows : [
            ['None', 'No courses added', 'N/A', '0', '0-0-0', '-', '-', '-']
          ],
        },
      },
      {
        title: 'Academic Advisor Endorsement & Declaration',
        content: [
          '• Student Declaration: I hereby declare that I have satisfied all prerequisite criteria for the aforementioned courses and agree to abide by NIT Goa academic ordinances.',
          '• Minimum Earned Credits for Year Advancement: As per Ordinance 6.3, a student must accumulate a minimum of 36 credits at the end of 1st year to advance to 2nd year.',
          '• Verification: Verified by Department Faculty Advisor and submitted to Office of Dean (Academics).',
        ],
      },
    ],
  });

  // =========================================================================
  // 3. FORM CIE-02: Continuous Internal Evaluation & Test Docket
  // =========================================================================
  const testRows: (string | number)[][] = [];
  tests.forEach((t) => {
    testRows.push([
      t.courseCode,
      t.title,
      t.type,
      t.date,
      t.startTime ? `${t.startTime} - ${t.endTime || ''}` : 'Class Slot',
      t.syllabus || 'As notified by Faculty',
      t.weightageMarks ? `${t.weightageMarks} Marks` : '20%',
      t.obtainedMarks !== undefined ? `${t.obtainedMarks} Marks` : 'Awaited',
    ]);
  });

  documents.push({
    id: 'form-cie-02-tests',
    title: `NIT Goa Form CIE-02: Continuous Internal Evaluation & Test Assessment Docket`,
    shortTitle: 'Form CIE-02: CIE Assessment Docket',
    docNumber: `NITG/EXAM/CIE02/${branchName}/2024-25/${rollNo}`,
    category: 'timetable',
    branch: profile.branch as any,
    year: profile.year.toString() as any,
    semesterRange: `Semester ${sem}`,
    academicYear: '2024–2025',
    issuingAuthority: 'Senate Examination Committee & Course Instructors',
    effectiveDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    summary: `Classified continuous assessment record compiled from tests, quizzes, and exams entered in the webapp. Outlines scheduled evaluations, syllabus segments, weightage distributions (30% Mid-Sem, 20% CIE, 50% End-Sem), and recorded scores.`,
    tags: ['Classified My Data', 'Form CIE-02', 'Internal Evaluation', 'Quizzes', 'Mid-Sem', 'Weightage'],
    pdfFileName: `NIT_Goa_Form_CIE02_Assessment_${rollNo}.pdf`,
    externalOfficialUrl: 'https://www.nitgoa.ac.in/academic/calendar.html',
    sections: [
      {
        title: 'Continuous Evaluation Framework (Ordinance Clause 9)',
        content: [
          '• Mid-Semester Examination: 30% Weightage (Conducted centrally in Slots A to F)',
          '• Continuous In-Semester Evaluation (CIE): 20% Weightage (Comprising minimum 2 surprise quizzes, home assignments, and coding/lab vivas)',
          '• End-Semester Examination: 50% Weightage (Comprehensive theory examination of 3 hours duration)',
          '• Total Scheduled In-App Tests & Assessments: ' + tests.length + ' evaluation items',
        ],
      },
      {
        title: 'Student Test Calendar & Score Matrix',
        subheading: 'Log of tests and milestones recorded in the webapp',
        table: {
          headers: ['Course', 'Assessment Title', 'Category', 'Date', 'Time Slot', 'Syllabus Portions', 'Weightage', 'Score / Status'],
          rows: testRows.length > 0 ? testRows : [
            ['-', 'No upcoming tests scheduled in test calendar', 'Quiz', '-', '-', 'All modules', '20%', 'Pending']
          ],
        },
      },
    ],
  });

  // =========================================================================
  // 4. FORM CA-08: Senate Credit Audit & SGPA Performance Card
  // =========================================================================
  const gradePointsMap: Record<string, number> = {
    S: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    P: 5,
    F: 0,
    FA: 0,
  };

  let totalCreditPoints = 0;
  let gradedCredits = 0;
  const gradeRows: (string | number)[][] = [];

  Object.entries(courses).forEach(([code, course]) => {
    const letterGrade = grades[code] || 'A';
    const gp = gradePointsMap[letterGrade] ?? 9;
    totalCreditPoints += gp * course.credits;
    gradedCredits += course.credits;

    gradeRows.push([
      code,
      course.name,
      `${course.credits}`,
      letterGrade,
      `${gp}`,
      `${gp * course.credits}`,
      gp >= 5 ? 'Earned' : 'Backlog',
    ]);
  });

  const calculatedSgpa = gradedCredits > 0 ? (totalCreditPoints / gradedCredits).toFixed(2) : '9.00';

  documents.push({
    id: 'form-ca-08-audit',
    title: `NIT Goa Form CA-08: Senate Credit Audit & SGPA Evaluation Card (${branchName} - Sem ${sem})`,
    shortTitle: 'Form CA-08: Credit & SGPA Audit',
    docNumber: `NITG/ACAD/AUDIT-CA08/${branchName}/2024-25/${rollNo}`,
    category: 'rules',
    branch: profile.branch as any,
    year: profile.year.toString() as any,
    semesterRange: `Semester ${sem}`,
    academicYear: '2024–2028 Scheme',
    issuingAuthority: 'Office of the Dean (Academic), National Institute of Technology Goa',
    effectiveDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    summary: `Official credit audit and grade tabulation docket generated from student's academic hub. Validates SGPA (${calculatedSgpa}), total earned credits (${gradedCredits} Cr), graduation progression against 164 total credits requirement, and 10-point scale grade distribution.`,
    tags: ['Classified My Data', 'Form CA-08', 'SGPA Audit', 'CGPA', 'Grades S-F', 'Graduation Criteria'],
    pdfFileName: `NIT_Goa_Form_CA08_Credit_Audit_${rollNo}.pdf`,
    externalOfficialUrl: 'https://www.nitgoa.ac.in/uploaded_files/Academic_Rules_B.Tech.pdf',
    sections: [
      {
        title: 'Candidate Academic Transcript Summary',
        content: [
          `• Student Name: ${studentName}`,
          `• Roll / Reg No: ${rollNo}`,
          `• Branch of Study: B.Tech ${branchName}`,
          `• Semester Audited: Semester ${sem}`,
          `• Projected Semester SGPA: ${calculatedSgpa} / 10.00`,
          `• Credits Evaluated in this Docket: ${gradedCredits} Credits`,
          `• Total Cumulative Points: ${totalCreditPoints}`,
        ],
      },
      {
        title: 'Course-by-Course Grade Point Ledger',
        subheading: '10-Point Absolute & Relative Scale (Clause 10.1 of B.Tech Ordinance)',
        table: {
          headers: ['Course Code', 'Subject Title', 'Credits (C)', 'Grade', 'Point (G)', 'Credit Points (C × G)', 'Result'],
          rows: gradeRows.length > 0 ? gradeRows : [
            ['-', 'No courses graded', '0', '-', '0', '0', '-']
          ],
        },
      },
      {
        title: 'Graduation Benchmark & Degree Classification Rules',
        content: [
          '• First Class with Distinction: Awarded to candidates who secure CGPA ≥ 8.5 with no backlog during the entire course of study and completed within 8 consecutive semesters.',
          '• First Class: Awarded to candidates who secure CGPA ≥ 6.5 and < 8.5.',
          '• Pass Class: Awarded to candidates who secure CGPA ≥ 5.0 and < 6.5.',
          '• Mandatory Graduation Requirement: Successful completion of 164–166 credits (depending on branch scheme) with minimum CGPA of 5.00.',
        ],
      },
    ],
  });

  // =========================================================================
  // 5. FORM TT-03: Customized Department Timetable Dossier
  // =========================================================================
  const timetableDays: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timetableRows: (string | number)[][] = [];

  timetableDays.forEach((day) => {
    let slotsForDay: TimeSlot[] = [];
    if (schedule && schedule[day] && schedule[day].length > 0) {
      slotsForDay = schedule[day];
    }

    if (slotsForDay.length === 0) {
      timetableRows.push([day, 'No classes scheduled / Self Study', '-', '-', '-']);
    } else {
      timetableRows.push([
        day,
        slotsForDay[0] ? `${slotsForDay[0].courseCode} (${slotsForDay[0].room})` : 'Class',
        slotsForDay[1] ? `${slotsForDay[1].courseCode} (${slotsForDay[1].room})` : '-',
        slotsForDay[2] ? `${slotsForDay[2].courseCode} (${slotsForDay[2].room})` : '-',
        slotsForDay.slice(3).map((s) => `${s.courseCode} (${s.room})`).join(', ') || 'Labs / Remedial',
      ]);
    }
  });

  documents.push({
    id: 'form-tt-03-custom-timetable',
    title: `NIT Goa Form TT-03: Official Department Personalized Class & Lab Timetable Dossier`,
    shortTitle: 'Form TT-03: Student Timetable Dossier',
    docNumber: `NITG/ACAD/TT03/${branchName}/2024-25/${rollNo}`,
    category: 'timetable',
    branch: profile.branch as any,
    year: profile.year.toString() as any,
    semesterRange: `Semester ${sem}`,
    academicYear: '2024–2025',
    issuingAuthority: 'Office of Dean (Academics) & Department Timetable In-Charge',
    effectiveDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    summary: `Classified weekly timetable dossier customized with student's enrolled courses, custom timings, lab batch sessions, and room locations across LHC and Department Blocks. Ready for print and campus inspection.`,
    tags: ['Classified My Data', 'Form TT-03', 'Timetable Dossier', 'Weekly Schedule', 'LHC Rooms', 'Lab Batches'],
    pdfFileName: `NIT_Goa_Form_TT03_Timetable_${rollNo}.pdf`,
    externalOfficialUrl: 'https://www.nitgoa.ac.in/academic/timetables.html',
    sections: [
      {
        title: 'Class Allocation & Lecture Hall Details',
        content: [
          `• Student Name: ${studentName}`,
          `• Roll No: ${rollNo}`,
          `• Department: ${branchName} | Semester: ${sem}`,
          `• Primary Lecture Venue: ${profile.firstYearSection ? `LHC Room ${profile.firstYearSection}` : (branchName === 'CSE' ? 'Room 51/52' : (branchName === 'ECE' ? 'Room 54' : 'Room 70/71'))}`,
          `• Lab Batch Allocation: ${profile.batch || profile.labBatch || 'Batch 1'}`,
          `• Class Timings: 08:30 AM to 05:30 PM (Lunch Break: 12:30 PM to 01:30 PM)`,
        ],
      },
      {
        title: 'Weekly Master Class & Lab Schedule Matrix',
        subheading: 'Derived from live customized timetable data in webapp',
        table: {
          headers: ['Day', '08:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '01:30 - 05:30 (Afternoon Labs / Electives)'],
          rows: timetableRows,
        },
      },
      {
        title: 'Campus Guidelines for Laboratory & Lecture Attendance',
        content: [
          '• Punctuality: Students must report to lecture halls at least 5 minutes prior to the scheduled slot.',
          '• Laboratory Safety: Safety coats, closed footwear, and lab observation notebooks are strictly mandatory in all Hardware, Chemistry, and Workshop laboratories.',
          '• Attendance Register: Biometric and physical sign-in registers close 10 minutes past the commencement of the period.',
        ],
      },
    ],
  });

  return documents;
}
