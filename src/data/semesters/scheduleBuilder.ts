import { DayOfWeek, TimeSlot } from '../timetableData';

export interface InstituteScheduleParams {
  prefix: string;
  room: string;
  slotA?: string;
  slotB?: string;
  slotC?: string;
  slotD?: string;
  slotE?: string;
  slotF?: string;
  slotG_Minor?: string;
  slotH_OpenElective?: string;
  mlcFriday?: string; // 1-credit course on Friday 16:00-16:55 (e.g. ES300, HS350, IKS351)
  labMon?: { code: string; name: string; room: string };
  labTue?: { code: string; name: string; room: string };
  labWed?: { code: string; name: string; room: string };
  labThu?: { code: string; name: string; room: string };
  labFri?: { code: string; name: string; room: string };
  notesMonLab?: string;
  notesTueLab?: string;
  notesWedLab?: string;
  notesThuLab?: string;
  notesFriLab?: string;
  customSaturdayFocus?: string;
}

// Backward compatibility alias
export interface ScheduleBuilderParams {
  prefix: string;
  room: string;
  slotA: string;
  slotB: string;
  slotC: string;
  slotD: string;
  slotE: string;
  slotF?: string;
  slotG?: string;
  slotH?: string;
  mlcFriday?: string;
  labMon?: { code: string; name: string; room: string };
  labTue?: { code: string; name: string; room: string };
  labWed?: { code: string; name: string; room: string };
  labThu?: { code: string; name: string; room: string };
  labFri?: { code: string; name: string; room: string };
  saturdayFocus?: string;
}

/**
 * Builds the official NIT Goa Institute-level master timetable schedule
 * based on Page 1 slot matrix from Master Time table @Institute Level (July-Dec 2026):
 *
 * Monday:
 *   09:00 - 09:55: Slot A
 *   10:00 - 10:55: Slot B
 *   11:00 - 11:55: Slot C
 *   12:00 - 12:55: Slot D
 *   12:55 - 14:00: LUNCH
 *   14:00 - 16:55: Lab 1 (B2) / Lab 3 (B1) / Afternoon Session
 *
 * Tuesday:
 *   09:00 - 09:55: Slot E
 *   10:00 - 10:55: Slot F
 *   11:00 - 11:55: Slot A
 *   12:00 - 12:55: Minor (Slot G)
 *   12:55 - 14:00: LUNCH
 *   14:00 - 16:55: Lab 2 (B1) / Lab 3 (B2) / Afternoon Session
 *
 * Wednesday:
 *   09:00 - 09:55: Slot B
 *   10:00 - 10:55: Slot C
 *   11:00 - 11:55: Slot D
 *   12:00 - 12:55: Slot E
 *   12:55 - 14:00: LUNCH
 *   14:00 - 14:55: Minor (Slot G)
 *   15:00 - 15:55: Open Elective (Slot H)
 *   16:00 - 16:55: Tutorial
 *
 * Thursday:
 *   09:00 - 09:55: Slot F
 *   10:00 - 10:55: Slot A
 *   11:00 - 11:55: Slot B
 *   12:00 - 12:55: Open Elective (Slot H)
 *   12:55 - 14:00: LUNCH
 *   14:00 - 16:55: Lab 1 (B1) / Lab 2 (B2) / Afternoon Session
 *
 * Friday:
 *   09:00 - 09:55: Slot C
 *   10:00 - 10:55: Slot D
 *   11:00 - 11:55: Slot E
 *   12:00 - 12:55: Slot F
 *   12:55 - 14:00: LUNCH
 *   14:00 - 14:55: Minor (Slot G)
 *   15:00 - 15:55: Open Elective (Slot H)
 *   16:00 - 16:55: 1 Credit Course (MLC) / ES300
 */
export function buildInstituteMasterSchedule(p: InstituteScheduleParams): Record<DayOfWeek, TimeSlot[]> {
  const {
    prefix,
    room,
    slotA,
    slotB,
    slotC,
    slotD,
    slotE,
    slotF,
    slotG_Minor,
    slotH_OpenElective,
    mlcFriday,
    labMon,
    labTue,
    labWed,
    labThu,
    labFri,
    notesMonLab,
    notesTueLab,
    notesWedLab,
    notesThuLab,
    notesFriLab,
    customSaturdayFocus,
  } = p;

  return {
    Monday: [
      slotA
        ? { id: `${prefix}-m1`, day: 'Monday', startTime: '09:00', endTime: '09:55', slotName: 'Slot A', courseCode: slotA, room }
        : { id: `${prefix}-m1`, day: 'Monday', startTime: '09:00', endTime: '09:55', slotName: 'Slot A', courseCode: 'FREE', room, isFree: true },
      slotB
        ? { id: `${prefix}-m2`, day: 'Monday', startTime: '10:00', endTime: '10:55', slotName: 'Slot B', courseCode: slotB, room }
        : { id: `${prefix}-m2`, day: 'Monday', startTime: '10:00', endTime: '10:55', slotName: 'Slot B', courseCode: 'FREE', room, isFree: true },
      slotC
        ? { id: `${prefix}-m3`, day: 'Monday', startTime: '11:00', endTime: '11:55', slotName: 'Slot C', courseCode: slotC, room }
        : { id: `${prefix}-m3`, day: 'Monday', startTime: '11:00', endTime: '11:55', slotName: 'Slot C', courseCode: 'FREE', room, isFree: true },
      slotD
        ? { id: `${prefix}-m4`, day: 'Monday', startTime: '12:00', endTime: '12:55', slotName: 'Slot D', courseCode: slotD, room }
        : { id: `${prefix}-m4`, day: 'Monday', startTime: '12:00', endTime: '12:55', slotName: 'Slot D', courseCode: 'FREE', room, isFree: true },
      { id: `${prefix}-ml`, day: 'Monday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      labMon
        ? { id: `${prefix}-m5`, day: 'Monday', startTime: '14:00', endTime: '16:55', slotName: 'LAB Session (3 Hrs)', courseCode: labMon.code, room: labMon.room, isLab: true, notes: notesMonLab || labMon.name }
        : { id: `${prefix}-m5`, day: 'Monday', startTime: '14:00', endTime: '16:55', slotName: 'Project / Department Seminar', courseCode: 'FREE', room: 'Department Labs', isFree: true },
    ],
    Tuesday: [
      slotE
        ? { id: `${prefix}-t1`, day: 'Tuesday', startTime: '09:00', endTime: '09:55', slotName: 'Slot E', courseCode: slotE, room }
        : { id: `${prefix}-t1`, day: 'Tuesday', startTime: '09:00', endTime: '09:55', slotName: 'Slot E', courseCode: 'FREE', room, isFree: true },
      slotF
        ? { id: `${prefix}-t2`, day: 'Tuesday', startTime: '10:00', endTime: '10:55', slotName: 'Slot F', courseCode: slotF, room }
        : { id: `${prefix}-t2`, day: 'Tuesday', startTime: '10:00', endTime: '10:55', slotName: 'Slot F', courseCode: 'FREE', room, isFree: true },
      slotA
        ? { id: `${prefix}-t3`, day: 'Tuesday', startTime: '11:00', endTime: '11:55', slotName: 'Slot A', courseCode: slotA, room }
        : { id: `${prefix}-t3`, day: 'Tuesday', startTime: '11:00', endTime: '11:55', slotName: 'Slot A', courseCode: 'FREE', room, isFree: true },
      slotG_Minor
        ? { id: `${prefix}-t4`, day: 'Tuesday', startTime: '12:00', endTime: '12:55', slotName: 'Minor (Slot G)', courseCode: slotG_Minor, room, notes: 'Minor Course' }
        : { id: `${prefix}-t4`, day: 'Tuesday', startTime: '12:00', endTime: '12:55', slotName: 'Minor Slot (G)', courseCode: 'FREE', room, isFree: true },
      { id: `${prefix}-tl`, day: 'Tuesday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      labTue
        ? { id: `${prefix}-t5`, day: 'Tuesday', startTime: '14:00', endTime: '16:55', slotName: 'LAB Session (3 Hrs)', courseCode: labTue.code, room: labTue.room, isLab: true, notes: notesTueLab || labTue.name }
        : { id: `${prefix}-t5`, day: 'Tuesday', startTime: '14:00', endTime: '16:55', slotName: 'Library & Mentorship Slot', courseCode: 'FREE', room: 'Central Library', isFree: true },
    ],
    Wednesday: [
      slotB
        ? { id: `${prefix}-w1`, day: 'Wednesday', startTime: '09:00', endTime: '09:55', slotName: 'Slot B', courseCode: slotB, room }
        : { id: `${prefix}-w1`, day: 'Wednesday', startTime: '09:00', endTime: '09:55', slotName: 'Slot B', courseCode: 'FREE', room, isFree: true },
      slotC
        ? { id: `${prefix}-w2`, day: 'Wednesday', startTime: '10:00', endTime: '10:55', slotName: 'Slot C', courseCode: slotC, room }
        : { id: `${prefix}-w2`, day: 'Wednesday', startTime: '10:00', endTime: '10:55', slotName: 'Slot C', courseCode: 'FREE', room, isFree: true },
      slotD
        ? { id: `${prefix}-w3`, day: 'Wednesday', startTime: '11:00', endTime: '11:55', slotName: 'Slot D', courseCode: slotD, room }
        : { id: `${prefix}-w3`, day: 'Wednesday', startTime: '11:00', endTime: '11:55', slotName: 'Slot D', courseCode: 'FREE', room, isFree: true },
      slotE
        ? { id: `${prefix}-w4`, day: 'Wednesday', startTime: '12:00', endTime: '12:55', slotName: 'Slot E', courseCode: slotE, room }
        : { id: `${prefix}-w4`, day: 'Wednesday', startTime: '12:00', endTime: '12:55', slotName: 'Slot E', courseCode: 'FREE', room, isFree: true },
      { id: `${prefix}-wl`, day: 'Wednesday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      slotG_Minor
        ? { id: `${prefix}-w5`, day: 'Wednesday', startTime: '14:00', endTime: '14:55', slotName: 'Minor (Slot G)', courseCode: slotG_Minor, room, notes: 'Minor Course' }
        : { id: `${prefix}-w5`, day: 'Wednesday', startTime: '14:00', endTime: '14:55', slotName: 'Minor Slot (G)', courseCode: 'FREE', room, isFree: true },
      slotH_OpenElective
        ? { id: `${prefix}-w6`, day: 'Wednesday', startTime: '15:00', endTime: '15:55', slotName: 'Open Elective (Slot H)', courseCode: slotH_OpenElective, room, notes: 'Institute Open Elective' }
        : { id: `${prefix}-w6`, day: 'Wednesday', startTime: '15:00', endTime: '15:55', slotName: 'Open Elective (Slot H)', courseCode: 'FREE', room, isFree: true },
      labWed
        ? { id: `${prefix}-w7`, day: 'Wednesday', startTime: '16:00', endTime: '16:55', slotName: 'Laboratory / Tutorial', courseCode: labWed.code, room: labWed.room, isLab: true, notes: notesWedLab || labWed.name }
        : { id: `${prefix}-w7`, day: 'Wednesday', startTime: '16:00', endTime: '16:55', slotName: 'Tutorial / Remedial', courseCode: 'FREE', room, isFree: true },
    ],
    Thursday: [
      slotF
        ? { id: `${prefix}-th1`, day: 'Thursday', startTime: '09:00', endTime: '09:55', slotName: 'Slot F', courseCode: slotF, room }
        : { id: `${prefix}-th1`, day: 'Thursday', startTime: '09:00', endTime: '09:55', slotName: 'Slot F', courseCode: 'FREE', room, isFree: true },
      slotA
        ? { id: `${prefix}-th2`, day: 'Thursday', startTime: '10:00', endTime: '10:55', slotName: 'Slot A', courseCode: slotA, room }
        : { id: `${prefix}-th2`, day: 'Thursday', startTime: '10:00', endTime: '10:55', slotName: 'Slot A', courseCode: 'FREE', room, isFree: true },
      slotB
        ? { id: `${prefix}-th3`, day: 'Thursday', startTime: '11:00', endTime: '11:55', slotName: 'Slot B', courseCode: slotB, room }
        : { id: `${prefix}-th3`, day: 'Thursday', startTime: '11:00', endTime: '11:55', slotName: 'Slot B', courseCode: 'FREE', room, isFree: true },
      slotH_OpenElective
        ? { id: `${prefix}-th4`, day: 'Thursday', startTime: '12:00', endTime: '12:55', slotName: 'Open Elective (Slot H)', courseCode: slotH_OpenElective, room, notes: 'Institute Open Elective' }
        : { id: `${prefix}-th4`, day: 'Thursday', startTime: '12:00', endTime: '12:55', slotName: 'Open Elective (Slot H)', courseCode: 'FREE', room, isFree: true },
      { id: `${prefix}-thl`, day: 'Thursday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      labThu
        ? { id: `${prefix}-th5`, day: 'Thursday', startTime: '14:00', endTime: '16:55', slotName: 'LAB Session (3 Hrs)', courseCode: labThu.code, room: labThu.room, isLab: true, notes: notesThuLab || labThu.name }
        : { id: `${prefix}-th5`, day: 'Thursday', startTime: '14:00', endTime: '16:55', slotName: 'Project Research Slot', courseCode: 'FREE', room: 'Computing Lab', isFree: true },
    ],
    Friday: [
      slotC
        ? { id: `${prefix}-f1`, day: 'Friday', startTime: '09:00', endTime: '09:55', slotName: 'Slot C', courseCode: slotC, room }
        : { id: `${prefix}-f1`, day: 'Friday', startTime: '09:00', endTime: '09:55', slotName: 'Slot C', courseCode: 'FREE', room, isFree: true },
      slotD
        ? { id: `${prefix}-f2`, day: 'Friday', startTime: '10:00', endTime: '10:55', slotName: 'Slot D', courseCode: slotD, room }
        : { id: `${prefix}-f2`, day: 'Friday', startTime: '10:00', endTime: '10:55', slotName: 'Slot D', courseCode: 'FREE', room, isFree: true },
      slotE
        ? { id: `${prefix}-f3`, day: 'Friday', startTime: '11:00', endTime: '11:55', slotName: 'Slot E', courseCode: slotE, room }
        : { id: `${prefix}-f3`, day: 'Friday', startTime: '11:00', endTime: '11:55', slotName: 'Slot E', courseCode: 'FREE', room, isFree: true },
      slotF
        ? { id: `${prefix}-f4`, day: 'Friday', startTime: '12:00', endTime: '12:55', slotName: 'Slot F', courseCode: slotF, room }
        : { id: `${prefix}-f4`, day: 'Friday', startTime: '12:00', endTime: '12:55', slotName: 'Slot F', courseCode: 'FREE', room, isFree: true },
      { id: `${prefix}-fl`, day: 'Friday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      slotG_Minor
        ? { id: `${prefix}-f5`, day: 'Friday', startTime: '14:00', endTime: '14:55', slotName: 'Minor (Slot G)', courseCode: slotG_Minor, room, notes: 'Minor Course' }
        : { id: `${prefix}-f5`, day: 'Friday', startTime: '14:00', endTime: '14:55', slotName: 'Minor Slot (G)', courseCode: 'FREE', room, isFree: true },
      slotH_OpenElective
        ? { id: `${prefix}-f6`, day: 'Friday', startTime: '15:00', endTime: '15:55', slotName: 'Open Elective (Slot H)', courseCode: slotH_OpenElective, room, notes: 'Institute Open Elective' }
        : { id: `${prefix}-f6`, day: 'Friday', startTime: '15:00', endTime: '15:55', slotName: 'Open Elective (Slot H)', courseCode: 'FREE', room, isFree: true },
      mlcFriday
        ? { id: `${prefix}-f7`, day: 'Friday', startTime: '16:00', endTime: '16:55', slotName: '1-Credit Course (MLC)', courseCode: mlcFriday, room, notes: 'Mandatory Learning Course' }
        : { id: `${prefix}-f7`, day: 'Friday', startTime: '16:00', endTime: '16:55', slotName: 'Faculty Consultation', courseCode: 'FREE', room, isFree: true },
    ],
    Saturday: [
      { id: `${prefix}-sat1`, day: 'Saturday', startTime: '09:00', endTime: '10:55', slotName: 'Core Subject Clinic', courseCode: slotA || 'CORE', room, notes: customSaturdayFocus || 'Numerical problem solving & theory doubts' },
      { id: `${prefix}-sat2`, day: 'Saturday', startTime: '11:00', endTime: '12:55', slotName: 'Tutorial Practice Session', courseCode: slotB || 'CORE', room, notes: 'Doubt clearing and test problem solving' },
      { id: `${prefix}-satl`, day: 'Saturday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      { id: `${prefix}-sat3`, day: 'Saturday', startTime: '14:00', endTime: '16:55', slotName: 'Technical Clubs & Society Projects', courseCode: 'FREE', room: 'SAC Complex', isFree: true },
    ],
    Sunday: [
      { id: `${prefix}-sun1`, day: 'Sunday', startTime: '09:00', endTime: '12:55', slotName: 'Central Library Self-Study', courseCode: 'FREE', room: 'Central Library', isFree: true },
      { id: `${prefix}-sunl`, day: 'Sunday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      { id: `${prefix}-sun2`, day: 'Sunday', startTime: '14:00', endTime: '16:55', slotName: 'Campus Sports & Recreation', courseCode: 'FREE', room: 'SAC Sports Ground', isFree: true },
    ],
  };
}

// Retain backward-compatible function signature
export function buildStandardWeeklySchedule(p: ScheduleBuilderParams): Record<DayOfWeek, TimeSlot[]> {
  return buildInstituteMasterSchedule({
    prefix: p.prefix,
    room: p.room,
    slotA: p.slotA,
    slotB: p.slotB,
    slotC: p.slotC,
    slotD: p.slotD,
    slotE: p.slotE,
    slotF: p.slotF,
    slotG_Minor: p.slotG,
    slotH_OpenElective: p.slotH,
    mlcFriday: p.mlcFriday,
    labMon: p.labMon,
    labTue: p.labTue,
    labWed: p.labWed,
    labThu: p.labThu,
    labFri: p.labFri,
    customSaturdayFocus: p.saturdayFocus,
  });
}
