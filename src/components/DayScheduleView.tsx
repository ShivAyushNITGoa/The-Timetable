import React, { useState, useEffect } from 'react';
import { TimeSlot, Course, DayOfWeek } from '../data/timetableData';
import { AcademicTest } from '../data/testTypes';
import {
  Clock,
  MapPin,
  User,
  Bookmark,
  BookOpen,
  AlertCircle,
  Coffee,
  Check,
  X,
  Beaker,
  ChevronRight,
  ChevronLeft,
  Edit3,
  CalendarCheck,
  Plus,
  Bell,
  BellRing,
  Calendar,
  CheckSquare,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

interface DayScheduleViewProps {
  selectedDay: DayOfWeek;
  onSelectDay: (day: DayOfWeek) => void;
  selectedElective: string;
  selectedBatch: string;
  onOpenCourseModal: (courseCode: string) => void;
  schedule: Record<DayOfWeek, TimeSlot[]>;
  courses: Record<string, Course>;
  branch?: string;
  semester?: number;
  tests?: AcademicTest[];
  onOpenCustomizer?: () => void;
  onNavigateToTests?: () => void;
  onScheduleTest?: (courseCode?: string) => void;
  isAdmin?: boolean;
  onAdminEditSlot?: (slot: TimeSlot, day: DayOfWeek) => void;
  onAdminAddSlot?: (day: DayOfWeek) => void;
}

export const DayScheduleView: React.FC<DayScheduleViewProps> = ({
  selectedDay,
  onSelectDay,
  selectedElective,
  selectedBatch,
  onOpenCourseModal,
  schedule,
  courses,
  branch = 'EEE',
  semester = 5,
  tests = [],
  onOpenCustomizer,
  onNavigateToTests,
  onScheduleTest,
  isAdmin = false,
  onAdminEditSlot,
  onAdminAddSlot,
}) => {
  const slots: TimeSlot[] = schedule[selectedDay] || [];

  const days: DayOfWeek[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  // Current day and time detection
  const now = new Date();
  const dayIndex = now.getDay(); // 0 Sun, 1 Mon, 2 Tue...
  const currentDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex];
  const isSelectedDayToday = currentDayName === selectedDay;

  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeMinutes = currentHours * 60 + currentMinutes;

  const isSlotActive = (startTime: string, endTime: string) => {
    if (!isSelectedDayToday) return false;
    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    const startTotal = sh * 60 + sm;
    const endTotal = eh * 60 + em;
    return currentTimeMinutes >= startTotal && currentTimeMinutes < endTotal;
  };

  const isSlotPassed = (endTime: string) => {
    if (!isSelectedDayToday) return false;
    const [eh, em] = endTime.split(':').map(Number);
    const endTotal = eh * 60 + em;
    return currentTimeMinutes >= endTotal;
  };

  // Attendance sync
  const safeBranch = (branch || 'EEE').toLowerCase();
  const safeSemester = semester ?? 5;
  const attendanceStorageKey = `nit_goa_attendance_${safeBranch}_sem${safeSemester}`;

  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, { attended: number; total: number }>>(() => {
    try {
      const saved = localStorage.getItem(attendanceStorageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const handleAttendanceUpdate = (e: any) => {
      if (e.detail?.storageKey === attendanceStorageKey && e.detail?.attendance) {
        setAttendanceRecords(e.detail.attendance);
      }
    };
    window.addEventListener('nit_goa_attendance_updated', handleAttendanceUpdate);
    return () => window.removeEventListener('nit_goa_attendance_updated', handleAttendanceUpdate);
  }, [attendanceStorageKey]);

  const handleLogAttendance = (targetCourseCode: string, isPresent: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    const current = attendanceRecords[targetCourseCode] || { attended: 0, total: 0 };
    const updated = {
      ...attendanceRecords,
      [targetCourseCode]: {
        attended: isPresent ? current.attended + 1 : current.attended,
        total: current.total + 1,
      },
    };
    setAttendanceRecords(updated);
    try {
      localStorage.setItem(attendanceStorageKey, JSON.stringify(updated));
      window.dispatchEvent(
        new CustomEvent('nit_goa_attendance_updated', {
          detail: { storageKey: attendanceStorageKey, attendance: updated },
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const [notificationActive, setNotificationActive] = useState(() => {
    try {
      return 'Notification' in window && Notification.permission === 'granted';
    } catch {
      return false;
    }
  });

  const handleRequestNotifications = async () => {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
      new Notification('NIT Goa Timetable Reminders', {
        body: 'Timetable alerts are active for all scheduled sessions.',
        icon: '/favicon.svg',
      });
      setNotificationActive(true);
    } else if (Notification.permission !== 'denied') {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        setNotificationActive(true);
        new Notification('NIT Goa Timetable Reminders', {
          body: 'Class alerts enabled! You will receive timely reminders before lectures.',
          icon: '/favicon.svg',
        });
      }
    }
  };

  // Day summary calculations
  const totalClasses = slots.filter((s) => !s.isLunch && !s.isFree).length;
  const hasMinor = slots.some((s) => s.isMinor || s.courseCode === 'CS300M');
  const hasLab = slots.some((s) => s.isLab);

  // Active session and upcoming session calculations
  const activeSlot = isSelectedDayToday
    ? slots.find((s) => !s.isLunch && !s.isFree && isSlotActive(s.startTime, s.endTime))
    : null;

  const nextSlot = isSelectedDayToday
    ? slots.find((s) => {
        if (s.isLunch || s.isFree) return false;
        const [sh, sm] = s.startTime.split(':').map(Number);
        return sh * 60 + sm > currentTimeMinutes;
      })
    : null;

  const minutesUntilNext = nextSlot
    ? (() => {
        const [sh, sm] = nextSlot.startTime.split(':').map(Number);
        return sh * 60 + sm - currentTimeMinutes;
      })()
    : null;

  const minutesRemainingInActive = activeSlot
    ? (() => {
        const [eh, em] = activeSlot.endTime.split(':').map(Number);
        return eh * 60 + em - currentTimeMinutes;
      })()
    : null;

  const completedClassesToday = isSelectedDayToday
    ? slots.filter((s) => !s.isLunch && !s.isFree && isSlotPassed(s.endTime)).length
    : 0;

  const freeSlots = slots.filter((s) => s.isFree || s.isLunch);

  // Check if any scheduled tests fall on the current calendar date if today is selected
  const todayDateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const todaysTests = isSelectedDayToday ? tests.filter((t) => t.date === todayDateStr) : [];

  // Helper to find any active upcoming test for a course
  const getCourseUpcomingTest = (courseCode?: string) => {
    if (!courseCode) return undefined;
    return tests.find(
      (t) => t.courseCode.toUpperCase() === courseCode.toUpperCase() && t.status !== 'Completed'
    );
  };

  const currentDayIndexInDays = days.indexOf(selectedDay);
  const goToPrevDay = () => {
    const prevIdx = (currentDayIndexInDays - 1 + days.length) % days.length;
    onSelectDay(days[prevIdx]);
  };
  const goToNextDay = () => {
    const nextIdx = (currentDayIndexInDays + 1) % days.length;
    onSelectDay(days[nextIdx]);
  };

  return (
    <div className="space-y-6">
      {/* Day Selector Pills */}
      <div className="grid grid-cols-7 gap-1 sm:flex sm:overflow-x-auto pb-1 sm:pb-2 scrollbar-none">
        {days.map((day) => {
          const isToday = currentDayName === day;
          const isSelected = selectedDay === day;
          const isWeekend = day === 'Saturday' || day === 'Sunday';
          const dayMinor = (schedule[day] || []).some((s) => s.isMinor || s.courseCode === 'CS300M');
          const shortDay = day.slice(0, 3);

          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelectDay(day)}
              className={`min-h-[44px] sm:min-h-[48px] py-1.5 px-0.5 sm:px-4 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-0.5 sm:gap-2 transition-all active:scale-95 ${
                isSelected
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : isWeekend
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden text-xs font-bold">{shortDay}</span>
              {isToday ? (
                <span
                  className={`text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-md font-bold uppercase tracking-wider ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  Today
                </span>
              ) : isWeekend ? (
                <span className="sm:hidden text-[8px] text-slate-400">wknd</span>
              ) : null}
              {dayMinor && !isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" title="Has CS300M Minor Class" />
              )}
            </button>
          );
        })}
      </div>

      {/* Alert banner if test scheduled today */}
      {todaysTests.length > 0 && (
        <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold shrink-0">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                ⚡ Scheduled Test / Exam Today!
              </div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                {todaysTests.map((t) => `${t.courseCode}: ${t.title} (${t.startTime} in ${t.room})`).join(' • ')}
              </div>
            </div>
          </div>

          {onNavigateToTests && (
            <button
              type="button"
              onClick={onNavigateToTests}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto shrink-0 shadow-xs active:scale-95"
            >
              <span>View Agenda & Tasks</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Jump to Today banner when browsing another day */}
      {!isSelectedDayToday && (
        <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-xs text-slate-600">
              Viewing <strong>{selectedDay}</strong>'s schedule. Today is <strong>{currentDayName}</strong>.
            </span>
          </div>
          <button
            type="button"
            onClick={() => onSelectDay(currentDayName as DayOfWeek)}
            className="min-h-[38px] px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-xs shrink-0"
          >
            <span>Jump to Today ({currentDayName.slice(0, 3)})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Live Academic Status & Next Class Countdown Hero */}
      {isSelectedDayToday && (
        <div className="p-4 sm:p-5 rounded-lg bg-white border border-slate-200 shadow-2xs space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold shrink-0 ${
                  activeSlot
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 animate-pulse'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {activeSlot ? <Clock className="w-4 h-4 text-blue-600" /> : <TrendingUp className="w-4 h-4 text-slate-500" />}
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-2">
                  {activeSlot ? (
                    <span className="text-blue-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping inline-block" />
                      Class Happening Right Now
                    </span>
                  ) : nextSlot ? (
                    <span className="text-blue-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      Next Upcoming Session
                    </span>
                  ) : (
                    <span className="text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      All Scheduled Lectures Done
                    </span>
                  )}
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                  {activeSlot ? (
                    <span>
                      {courses[activeSlot.courseCode]?.name || activeSlot.slotName} ({activeSlot.courseCode}) •{' '}
                      {minutesRemainingInActive !== null && minutesRemainingInActive > 0
                        ? `${minutesRemainingInActive} mins remaining`
                        : 'Concluding now'}
                    </span>
                  ) : nextSlot ? (
                    <span>
                      {courses[nextSlot.courseCode]?.name || nextSlot.slotName} ({nextSlot.courseCode}) at {nextSlot.startTime}{' '}
                      {minutesUntilNext !== null && (
                        <span className="text-blue-700 font-semibold">(Starts in {minutesUntilNext} mins)</span>
                      )}
                    </span>
                  ) : (
                    <span>All classes for today have concluded! You are free for the day.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Class Notification Toggle */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                type="button"
                onClick={handleRequestNotifications}
                className={`min-h-[38px] px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 ${
                  notificationActive
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
                title="Enable web alerts before your classes"
              >
                {notificationActive ? (
                  <BellRing className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Bell className="w-3.5 h-3.5 text-slate-500" />
                )}
                <span>{notificationActive ? 'Class Alerts Active' : 'Enable Class Alerts'}</span>
              </button>
            </div>
          </div>

          {/* Daily Progress & Breaks */}
          <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-slate-500">
            <div className="flex items-center gap-2.5">
              <span className="text-slate-600 font-medium">Daily Progress:</span>
              <span className="font-bold text-slate-900">
                {completedClassesToday} of {totalClasses} classes completed
              </span>
              <div className="w-24 h-2 bg-slate-100 rounded overflow-hidden inline-block">
                <div
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${totalClasses > 0 ? (completedClassesToday / totalClasses) * 100 : 0}%` }}
                />
              </div>
            </div>
            {freeSlots.length > 0 && (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Coffee className="w-3.5 h-3.5 text-blue-600" />
                <span>Free/Break slots: {freeSlots.map((s) => s.startTime + '–' + s.endTime).join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Day Header & Briefing Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {selectedDay}'s Timetable
              </h2>
              {isSelectedDayToday && (
                <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Live Today
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {branch} Semester {semester} • NIT Goa Campus
            </p>
          </div>

          {/* Quick Prev / Next Day navigation buttons for mobile thumb */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={goToPrevDay}
              className="min-h-[40px] min-w-[40px] rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center border border-slate-200 active:scale-95 transition shadow-xs"
              aria-label="Previous day"
              title="Previous day"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goToNextDay}
              className="min-h-[40px] min-w-[40px] rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center border border-slate-200 active:scale-95 transition shadow-xs"
              aria-label="Next day"
              title="Next day"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Badges for Day & Customize / Test Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs text-slate-700">
            <strong className="text-slate-900">{totalClasses}</strong> Sessions
          </div>
          {hasMinor && (
            <div className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs text-blue-800 flex items-center gap-1.5 shadow-2xs">
              <Bookmark className="w-3.5 h-3.5 text-blue-600" />
              <span>Includes <strong>CS300M Minor</strong></span>
            </div>
          )}
          {hasLab && (
            <div className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-1.5">
              <Beaker className="w-3.5 h-3.5 text-emerald-600" />
              <span>3-Hour Lab Session</span>
            </div>
          )}

          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              className="px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-xs text-blue-700 border border-slate-200 font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-2xs"
              title="Customize timing or add extra slots to this day"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Day Schedule</span>
            </button>
          )}

          {isAdmin && onAdminAddSlot && (
            <button
              onClick={() => onAdminAddSlot(selectedDay)}
              className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-xs"
              title="Admin: Add a new slot to this day"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Slot (Admin)</span>
            </button>
          )}
        </div>
      </div>

      {/* Timetable Cards List */}
      <div className="space-y-3.5">
        {slots.map((slot, index) => {
          const active = isSlotActive(slot.startTime, slot.endTime);
          const passed = isSlotPassed(slot.endTime);

          // Handle lunch
          if (slot.isLunch) {
            return (
              <div
                key={slot.id || `lunch-${index}`}
                className="py-3 px-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-slate-600 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Coffee className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-slate-800">LUNCH BREAK</span>
                  <span className="text-slate-500">• Institute Dining / Refreshment</span>
                </div>
                <div className="font-mono text-xs text-slate-500">
                  {slot.startTime} – {slot.endTime}
                </div>
              </div>
            );
          }

          // Handle free period
          if (slot.isFree) {
            return (
              <div
                key={slot.id || `free-${index}`}
                className="py-3.5 px-4 rounded-lg bg-slate-50/70 border border-dashed border-slate-200 flex items-center justify-between text-slate-600 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <div>
                    <span className="font-semibold text-slate-800">{slot.slotName}</span>
                    <span className="text-slate-500 text-xs block sm:inline sm:ml-2">
                      {slot.notes || 'Open Slot — Self-Study / Library Period'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="font-mono text-xs text-slate-500 shrink-0">
                    {slot.startTime} – {slot.endTime}
                  </div>
                  {isAdmin && onAdminEditSlot && (
                    <button
                      type="button"
                      onClick={() => onAdminEditSlot(slot, selectedDay)}
                      className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition active:scale-95"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  )}
                </div>
              </div>
            );
          }

          // Handle Elective Choice (EE541 vs EE545)
          if (slot.isElectiveChoice) {
            const chosenOption =
              slot.electiveOptions?.find((opt) => opt.code === selectedElective) || slot.electiveOptions?.[0];
            const otherOption = slot.electiveOptions?.find((opt) => opt.code !== chosenOption?.code);
            const courseDetails = courses[chosenOption?.code || 'EE541'];

            return (
              <div
                key={slot.id || `elective-${index}`}
                onClick={() => onOpenCourseModal(chosenOption?.code || 'EE541')}
                className={`group relative p-4 sm:p-5 rounded-lg border transition-all cursor-pointer shadow-2xs ${
                  active
                    ? 'bg-blue-50/30 border-blue-500 ring-2 ring-blue-500/20'
                    : passed
                    ? 'bg-slate-50/60 border-slate-200 opacity-75 hover:opacity-100 hover:border-slate-300'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
                      {slot.slotName}
                    </span>
                    <span className="font-mono text-xs text-slate-700 font-semibold whitespace-nowrap">
                      {slot.startTime} – {slot.endTime}
                    </span>
                    <span className="text-xs text-slate-500 whitespace-nowrap">(55 mins)</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 min-w-0">
                    {active && (
                      <span className="shrink-0 whitespace-nowrap px-2.5 py-1 rounded-md bg-blue-600 text-white font-extrabold text-[9px] sm:text-[10px] tracking-wider uppercase animate-pulse shadow-sm">
                        HAPPENING NOW
                      </span>
                    )}

                    <div className="flex items-center gap-1.5 text-xs text-slate-600 min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate max-w-[180px] sm:max-w-[240px]">Room {slot.room}</span>
                    </div>

                    {isAdmin && onAdminEditSlot && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdminEditSlot(slot, selectedDay);
                        }}
                        className="shrink-0 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition active:scale-95"
                        title="Admin: Edit Slot & Syllabus"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit Slot</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition flex items-center gap-2">
                      <span>{chosenOption?.code}</span>
                      <span className="text-slate-400 font-normal">•</span>
                      <span>{chosenOption?.name}</span>
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      <span>
                        Coordinator: <strong className="text-slate-800">{courseDetails?.coordinator || chosenOption?.faculty}</strong>
                      </span>
                    </p>
                    {otherOption && (
                      <p className="text-[11px] text-slate-600 mt-2 bg-slate-50 px-2.5 py-1 rounded-lg inline-block border border-slate-200">
                        Elective Choice Active: <span className="text-indigo-700 font-semibold">{chosenOption?.code}</span> (Parallel: {otherOption.code})
                      </p>
                    )}

                    {(() => {
                      const courseTest = getCourseUpcomingTest(chosenOption?.code);
                      if (!courseTest) return null;
                      return (
                        <div className="mt-2.5 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs text-blue-700">
                          <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{courseTest.type}: <strong>{courseTest.title}</strong> ({courseTest.date})</span>
                        </div>
                      );
                    })()}
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition shrink-0 self-center" />
                </div>

                {/* Inline Attendance Action & Status Bar */}
                {chosenOption?.code && (
                  <div
                    className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-xs text-slate-600 font-medium">Attendance:</span>
                      {(() => {
                        const rec = attendanceRecords[chosenOption.code] || { attended: 0, total: 0 };
                        const pct = rec.total > 0 ? Math.round((rec.attended / rec.total) * 100) : null;
                        return (
                          <span
                            className={`text-xs font-bold font-mono ${
                              pct === null ? 'text-slate-400' : pct >= 75 ? 'text-emerald-700' : 'text-rose-700'
                            }`}
                          >
                            {pct !== null ? `${pct}% (${rec.attended}/${rec.total})` : 'Not logged yet'}
                          </span>
                        );
                      })()}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => handleLogAttendance(chosenOption.code, true, e)}
                        className="min-h-[34px] px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1 transition active:scale-95 shadow-2xs"
                        title={`Mark +1 Present for ${chosenOption.code}`}
                      >
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>+ Present</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleLogAttendance(chosenOption.code, false, e)}
                        className="min-h-[34px] px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold flex items-center gap-1 transition active:scale-95 shadow-2xs"
                        title={`Mark +1 Absent for ${chosenOption.code}`}
                      >
                        <X className="w-3 h-3 text-rose-600" />
                        <span>+ Absent</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          }

          // Handle Lab Session
          if (slot.isLab && slot.labOptions) {
            const currentLab = selectedBatch === 'batch1' ? slot.labOptions.batch1 : slot.labOptions.batch2;
            const alternateLab = selectedBatch === 'batch1' ? slot.labOptions.batch2 : slot.labOptions.batch1;

            return (
              <div
                key={slot.id || `lab-${index}`}
                onClick={() => onOpenCourseModal(currentLab.code)}
                className={`group relative p-4 sm:p-5 rounded-lg border transition-all cursor-pointer shadow-2xs ${
                  active
                    ? 'bg-emerald-50/40 border-emerald-500 ring-2 ring-emerald-500/20'
                    : passed
                    ? 'bg-slate-50/60 border-slate-200 opacity-75 hover:opacity-100 hover:border-slate-300'
                    : 'bg-emerald-50/30 border-emerald-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1">
                      <Beaker className="w-3 h-3" />
                      {slot.slotName}
                    </span>
                    <span className="font-mono text-xs text-slate-700 font-semibold whitespace-nowrap">
                      {slot.startTime} – {slot.endTime}
                    </span>
                    <span className="text-xs text-slate-500 whitespace-nowrap">(2 Hrs 55 Mins)</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 min-w-0">
                    {active && (
                      <span className="shrink-0 whitespace-nowrap px-2.5 py-1 rounded-md bg-emerald-600 text-white font-extrabold text-[9px] sm:text-[10px] tracking-wider uppercase animate-pulse shadow-sm">
                        HAPPENING NOW
                      </span>
                    )}

                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 min-w-0">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate max-w-[180px] sm:max-w-[240px]">{slot.room}</span>
                    </div>

                    {isAdmin && onAdminEditSlot && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdminEditSlot(slot, selectedDay);
                        }}
                        className="shrink-0 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition active:scale-95"
                        title="Admin: Edit Slot & Syllabus"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit Slot</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition flex items-center gap-2">
                      <span>{currentLab.code}</span>
                      <span className="text-slate-400 font-normal">•</span>
                      <span>{currentLab.name}</span>
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      <span>
                        Faculty: <strong className="text-slate-800">{currentLab.faculty}</strong>
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-600 mt-2 bg-slate-50 px-2.5 py-1 rounded-lg inline-block border border-slate-200">
                      Batch Selection: <strong className="text-emerald-800">{selectedBatch === 'batch1' ? 'Batch 1' : 'Batch 2'}</strong> • Alternate batch: {alternateLab.code}
                    </p>

                    {(() => {
                      const labTest = getCourseUpcomingTest(currentLab.code);
                      if (!labTest) return null;
                      return (
                        <div className="mt-2.5 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs text-blue-700">
                          <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{labTest.type}: <strong>{labTest.title}</strong> ({labTest.date})</span>
                          {onNavigateToTests && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigateToTests();
                              }}
                              className="ml-1 text-[11px] underline font-bold hover:text-blue-900"
                            >
                              Agenda
                            </button>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition shrink-0 self-center" />
                </div>

                {/* Inline Attendance Action & Status Bar */}
                {currentLab?.code && (
                  <div
                    className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-xs text-slate-600 font-medium">Lab Attendance:</span>
                      {(() => {
                        const rec = attendanceRecords[currentLab.code] || { attended: 0, total: 0 };
                        const pct = rec.total > 0 ? Math.round((rec.attended / rec.total) * 100) : null;
                        return (
                          <span
                            className={`text-xs font-bold font-mono ${
                              pct === null ? 'text-slate-400' : pct >= 75 ? 'text-emerald-700' : 'text-rose-700'
                            }`}
                          >
                            {pct !== null ? `${pct}% (${rec.attended}/${rec.total})` : 'Not logged yet'}
                          </span>
                        );
                      })()}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => handleLogAttendance(currentLab.code, true, e)}
                        className="min-h-[34px] px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1 transition active:scale-95 shadow-2xs"
                        title={`Mark +1 Present for ${currentLab.code}`}
                      >
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>+ Present</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleLogAttendance(currentLab.code, false, e)}
                        className="min-h-[34px] px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-800 border border-rose-200 text-xs font-bold flex items-center gap-1 transition active:scale-95 shadow-2xs"
                        title={`Mark +1 Absent for ${currentLab.code}`}
                      >
                        <X className="w-3 h-3 text-rose-600" />
                        <span>+ Absent</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          }

          // Handle Regular Classes (Core, Minor, Lab, MLC)
          const course = courses[slot.courseCode];
          const isMinor = slot.isMinor || slot.courseCode === 'CS300M';

          return (
            <div
              key={slot.id || `slot-${index}`}
              onClick={() => onOpenCourseModal(slot.courseCode)}
              className={`group relative p-4 sm:p-5 rounded-lg border transition-all cursor-pointer shadow-2xs ${
                isMinor
                  ? 'bg-blue-50/40 border-blue-200 hover:border-blue-300'
                  : active
                  ? 'bg-blue-50/30 border-blue-500 ring-2 ring-blue-500/20'
                  : passed
                  ? 'bg-slate-50/60 border-slate-200 opacity-75 hover:opacity-100 hover:border-slate-300'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                {/* Left: slot name + time */}
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                      isMinor
                        ? 'bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1 shadow-2xs'
                        : course?.category === 'lab' || slot.isLab
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : course?.category === 'mlc'
                        ? 'bg-slate-100 text-slate-700 border border-slate-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {isMinor && <BookOpen className="w-3 h-3 text-blue-600" />}
                    {slot.slotName}
                  </span>
                  <span className="font-mono text-xs text-slate-700 font-semibold whitespace-nowrap">
                    {slot.startTime} – {slot.endTime}
                  </span>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    ({slot.isLab ? '2 Hrs 55 Mins' : '55 Mins'})
                  </span>
                </div>

                {/* Right: status + room + admin action */}
                <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 min-w-0">
                  {active && (
                    <span className="shrink-0 whitespace-nowrap px-2.5 py-1 rounded-md bg-blue-600 text-white font-extrabold text-[9px] sm:text-[10px] tracking-wider uppercase animate-pulse shadow-sm">
                      HAPPENING NOW
                    </span>
                  )}

                  <div className="flex items-center gap-1.5 text-xs font-medium min-w-0 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate max-w-[180px] sm:max-w-[240px]">
                      Room {slot.room || course?.room}
                    </span>
                  </div>

                  {isAdmin && onAdminEditSlot && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdminEditSlot(slot, selectedDay);
                      }}
                      className="shrink-0 px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition active:scale-95"
                      title="Admin: Edit Slot & Syllabus"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit Slot</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight transition flex items-center gap-2 text-slate-900 group-hover:text-blue-700">
                    <span>{course?.code || slot.courseCode}</span>
                    <span className="text-slate-400 font-normal">•</span>
                    <span>{course?.name || slot.slotName}</span>
                  </h3>

                  {course?.coordinator && (
                    <p className="text-xs text-slate-600 mt-1 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      <span>
                        Coordinator: <strong className="text-slate-800">{course.coordinator} ({course.shortName})</strong>
                      </span>
                    </p>
                  )}

                  {isMinor && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-[11px] text-blue-800">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>Special: CSE Minor Course • Coordinated by Dr. Pravati Swain</span>
                    </div>
                  )}

                  {slot.notes && !isMinor && (
                    <p className="text-[11px] text-slate-500 mt-1.5 italic">{slot.notes}</p>
                  )}

                  {(() => {
                    const regularTest = getCourseUpcomingTest(course?.code || slot.courseCode);
                    if (!regularTest) return null;
                    return (
                      <div className="mt-2.5 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs text-blue-700">
                        <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{regularTest.type}: <strong>{regularTest.title}</strong> ({regularTest.date})</span>
                      </div>
                    );
                  })()}
                </div>

                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition shrink-0 self-center" />
              </div>

              {/* Inline Attendance Action & Status Bar */}
              {(course?.code || slot.courseCode) && (
                <div
                  className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs text-slate-600 font-medium">Attendance:</span>
                    {(() => {
                      const code = course?.code || slot.courseCode;
                      const rec = attendanceRecords[code] || { attended: 0, total: 0 };
                      const pct = rec.total > 0 ? Math.round((rec.attended / rec.total) * 100) : null;
                      return (
                        <span
                          className={`text-xs font-bold font-mono ${
                            pct === null ? 'text-slate-400' : pct >= 75 ? 'text-emerald-700' : 'text-rose-700'
                          }`}
                        >
                          {pct !== null ? `${pct}% (${rec.attended}/${rec.total})` : 'Not logged yet'}
                        </span>
                      );
                    })()}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleLogAttendance(course?.code || slot.courseCode, true, e)}
                      className="min-h-[34px] px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1 transition active:scale-95 shadow-2xs"
                      title={`Mark +1 Present for ${course?.code || slot.courseCode}`}
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>+ Present</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleLogAttendance(course?.code || slot.courseCode, false, e)}
                      className="min-h-[34px] px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-800 border border-rose-200 text-xs font-bold flex items-center gap-1 transition active:scale-95 shadow-2xs"
                      title={`Mark +1 Absent for ${course?.code || slot.courseCode}`}
                    >
                      <X className="w-3 h-3 text-rose-600" />
                      <span>+ Absent</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isAdmin && onAdminAddSlot && (
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onAdminAddSlot(selectedDay)}
            className="w-full py-3 rounded-lg bg-blue-50 hover:bg-blue-100 border border-dashed border-blue-300 text-blue-700 font-semibold text-xs flex items-center justify-center gap-2 transition active:scale-98 shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Slot for {selectedDay} (Admin)</span>
          </button>
        </div>
      )}
    </div>
  );
};
