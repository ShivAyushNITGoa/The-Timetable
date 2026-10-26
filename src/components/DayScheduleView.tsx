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
import {
  isNotificationEnabled,
  requestNotificationPermission,
  triggerTestNotification,
} from '../utils/notificationService';

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

  const [notificationActive, setNotificationActive] = useState(() => isNotificationEnabled());

  const handleRequestNotifications = async () => {
    if (!notificationActive) {
      const granted = await requestNotificationPermission();
      setNotificationActive(granted);
    } else {
      triggerTestNotification();
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
    <div className="space-y-3 sm:space-y-5">
      {/* Day Selector: 7-col grid on all screens, zero slider, all 7 days visible at once */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 w-full select-none">
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
              className={`w-full h-10 sm:h-11 rounded-lg border text-center transition-all flex flex-col items-center justify-center relative cursor-pointer active:scale-95 ${
                isSelected
                  ? 'bg-blue-600 dark:bg-blue-600 text-white font-bold border-blue-600 shadow-xs ring-2 ring-blue-600/25'
                  : isToday
                  ? 'bg-white dark:bg-slate-900 border-blue-400 dark:border-blue-600 text-slate-800 dark:text-slate-200 hover:bg-blue-50/50 dark:hover:bg-blue-950/30'
                  : isWeekend
                  ? 'bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="text-[11px] sm:text-xs font-bold leading-none">{shortDay}</span>
              {isToday ? (
                <span
                  className={`text-[7px] sm:text-[8px] font-extrabold uppercase tracking-tight px-1 py-0.2 rounded leading-none mt-1 ${
                    isSelected
                      ? 'bg-white/25 text-white'
                      : 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300'
                  }`}
                >
                  Today
                </span>
              ) : isWeekend ? (
                <span className={`text-[7px] sm:text-[8px] font-medium uppercase tracking-tight leading-none mt-1 ${isSelected ? 'text-white/75' : 'text-slate-400 dark:text-slate-500'}`}>
                  wknd
                </span>
              ) : dayMinor ? (
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-amber-300' : 'bg-blue-500 dark:bg-blue-400'}`}
                  title="CSE Minor (CS300M)"
                />
              ) : (
                <span className="w-1.5 h-1.5 mt-1 opacity-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Alert banner if test scheduled today */}
      {todaysTests.length > 0 && (
        <div className="p-2 sm:p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 shadow-2xs flex items-center justify-between gap-2 animate-in fade-in">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold shrink-0">
              <CalendarCheck className="w-3 h-3" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider block">
                Exam / Test Today
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                {todaysTests.map((t) => `${t.courseCode}: ${t.title} (${t.startTime})`).join(' • ')}
              </span>
            </div>
          </div>
          {onNavigateToTests && (
            <button
              type="button"
              onClick={onNavigateToTests}
              className="h-6 px-2 rounded-md bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold flex items-center gap-1 shrink-0 active:scale-95"
            >
              <span>Agenda</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* 1. Mobile-Optimized Compact Header (< sm screens): Ultra sleek, zero vertical congestion */}
      <div className="sm:hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 shadow-2xs space-y-2">
        {/* Top Row: Live Status & Day controls */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            {isSelectedDayToday ? (
              activeSlot ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold text-[10px] truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 animate-pulse" />
                  <span className="truncate">Live: {courses[activeSlot.courseCode]?.shortName || activeSlot.courseCode}</span>
                </span>
              ) : nextSlot ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-[10px] truncate">
                  <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="truncate">Next: {courses[nextSlot.courseCode]?.shortName || nextSlot.courseCode} ({nextSlot.startTime})</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold text-[10px]">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>Done for Day</span>
                </span>
              )
            ) : (
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                {selectedDay} Schedule
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {!isSelectedDayToday && (
              <button
                type="button"
                onClick={() => onSelectDay(currentDayName as DayOfWeek)}
                className="h-6 px-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] flex items-center gap-1 transition active:scale-95 shadow-2xs shrink-0 cursor-pointer"
                title={`Jump to Today (${currentDayName})`}
              >
                <span>Today</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
            {isSelectedDayToday && (
              <button
                type="button"
                onClick={handleRequestNotifications}
                className={`w-6 h-6 rounded-md border flex items-center justify-center transition active:scale-95 cursor-pointer ${
                  notificationActive
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
                }`}
                title={notificationActive ? 'Class Alerts Active' : 'Enable Class Alerts'}
                aria-label="Toggle class alerts"
              >
                {notificationActive ? <BellRing className="w-3 h-3 text-blue-600 dark:text-blue-400" /> : <Bell className="w-3 h-3" />}
              </button>
            )}
            <button
              type="button"
              onClick={goToPrevDay}
              className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center active:scale-95 transition cursor-pointer"
              aria-label="Previous day"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={goToNextDay}
              className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center active:scale-95 transition cursor-pointer"
              aria-label="Next day"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Middle Row: Day Title & Quick Info */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <span>{selectedDay}</span>
              {isSelectedDayToday && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-blue-600 text-white font-bold leading-tight">
                  Today
                </span>
              )}
            </h2>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
              <span>{totalClasses} Classes</span>
              {hasMinor && <span>· CS300M</span>}
              {hasLab && <span>· Lab</span>}
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {onOpenCustomizer && (
              <button
                type="button"
                onClick={onOpenCustomizer}
                className="h-6 px-2 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-semibold border border-slate-200 dark:border-slate-700 flex items-center gap-1 transition active:scale-95 cursor-pointer"
              >
                <Edit3 className="w-3 h-3 text-slate-500" />
                <span>Edit</span>
              </button>
            )}
            {isAdmin && onAdminAddSlot && (
              <button
                type="button"
                onClick={() => onAdminAddSlot(selectedDay)}
                className="h-6 px-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-semibold flex items-center gap-1 transition active:scale-95 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Row: Progress Bar on Today */}
        {isSelectedDayToday && totalClasses > 0 && (
          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-[10px] text-slate-500 dark:text-slate-400">
            <span>{completedClassesToday}/{totalClasses} done</span>
            <div className="w-24 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(completedClassesToday / totalClasses) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Desktop Header Bar (>= sm screens): Full expansive presence */}
      <div className="hidden sm:block space-y-4">
        {/* Live Academic Status & Next Class Countdown Hero */}
        {isSelectedDayToday && (
          <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold shrink-0 ${
                    activeSlot
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {activeSlot ? <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" /> : <TrendingUp className="w-4 h-4 text-slate-500 dark:text-slate-400" />}
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-2">
                    {activeSlot ? (
                      <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1.5 font-bold">
                        <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 inline-block" />
                        Class In Progress
                      </span>
                    ) : nextSlot ? (
                      <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                        Next Upcoming Session
                      </span>
                    ) : (
                      <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        All Scheduled Lectures Done
                      </span>
                    )}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {activeSlot ? (
                      <span>
                        {courses[activeSlot.courseCode]?.name || activeSlot.slotName} ({activeSlot.courseCode}) ·{' '}
                        {minutesRemainingInActive !== null && minutesRemainingInActive > 0
                          ? `${minutesRemainingInActive} mins remaining`
                          : 'Concluding now'}
                      </span>
                    ) : nextSlot ? (
                      <span>
                        {courses[nextSlot.courseCode]?.name || nextSlot.slotName} ({nextSlot.courseCode}) at {nextSlot.startTime}{' '}
                        {minutesUntilNext !== null && (
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">(Starts in {minutesUntilNext} mins)</span>
                        )}
                      </span>
                    ) : (
                      <span>All classes for today have concluded. You are free for the day.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Class Notification Toggle */}
              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  type="button"
                  onClick={handleRequestNotifications}
                  className={`min-h-[36px] px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
                    notificationActive
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                      : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                  title={notificationActive ? 'Alerts active — click to test on this device' : 'Enable web alerts before your classes'}
                >
                  {notificationActive ? (
                    <BellRing className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Bell className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>{notificationActive ? 'Class Alerts Active (Click to Test)' : 'Enable Class Alerts'}</span>
                </button>
              </div>
            </div>

            {/* Daily Progress & Breaks */}
            <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2.5">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Daily Progress:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {completedClassesToday} of {totalClasses} classes completed
                </span>
                <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden inline-block">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${totalClasses > 0 ? (completedClassesToday / totalClasses) * 100 : 0}%` }}
                  />
                </div>
              </div>
              {freeSlots.length > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <Coffee className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>Free slots: {freeSlots.map((s) => s.startTime + '–' + s.endTime).join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Day Header & Briefing Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center justify-between w-full sm:w-auto gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {selectedDay}'s Timetable
                </h2>
                {isSelectedDayToday && (
                  <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    Live Today
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {branch} Semester {semester} · NIT Goa Campus
              </p>
            </div>
          </div>

          {/* Badges for Day & Customize / Test Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">{totalClasses}</strong> Sessions
            </div>
            {hasMinor && (
              <div className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-300 flex items-center gap-1.5 shadow-2xs">
                <Bookmark className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Includes <strong>CS300M Minor</strong></span>
              </div>
            )}
            {hasLab && (
              <div className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Beaker className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span>3-Hour Lab Session</span>
              </div>
            )}

            {onOpenCustomizer && (
              <button
                type="button"
                onClick={onOpenCustomizer}
                className="px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-2xs cursor-pointer"
                title="Customize timing or add extra slots to this day"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>Edit Day Schedule</span>
              </button>
            )}

            {isAdmin && onAdminAddSlot && (
              <button
                type="button"
                onClick={() => onAdminAddSlot(selectedDay)}
                className="px-3 py-1.5 rounded-md bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-semibold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-xs cursor-pointer"
                title="Admin: Add a new slot to this day"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Slot (Admin)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Timetable Cards List */}
      <div className="space-y-2.5 sm:space-y-3">
        {slots.map((slot, index) => {
          const active = isSlotActive(slot.startTime, slot.endTime);
          const passed = isSlotPassed(slot.endTime);

          // Handle lunch
          if (slot.isLunch) {
            return (
              <div
                key={slot.id || `lunch-${index}`}
                className="py-2 px-3 sm:py-2.5 sm:px-4 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs"
              >
                <div className="flex items-center gap-2">
                  <Coffee className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">LUNCH BREAK</span>
                  <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">· Dining & Refreshment</span>
                </div>
                <div className="font-mono text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
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
                className="py-2 px-3 sm:py-2.5 sm:px-4 rounded-lg bg-slate-50/60 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{slot.slotName}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] hidden sm:inline sm:ml-2">
                      {slot.notes || 'Open Slot — Self-Study / Library Period'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-mono text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 shrink-0">
                    {slot.startTime} – {slot.endTime}
                  </div>
                  {isAdmin && onAdminEditSlot && (
                    <button
                      type="button"
                      onClick={() => onAdminEditSlot(slot, selectedDay)}
                      className="h-6 px-2 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-[10px] flex items-center gap-1 border border-slate-200 dark:border-slate-700 shadow-2xs transition active:scale-95"
                    >
                      <Edit3 className="w-2.5 h-2.5" />
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
                className={`group relative p-3 sm:p-4 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                  active
                    ? 'bg-white dark:bg-slate-900 border-blue-500/80 dark:border-blue-500/70 ring-1 ring-blue-500/20 shadow-xs'
                    : passed
                    ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-75 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-700'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-2 mb-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
                    <span className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      {slot.slotName}
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-semibold whitespace-nowrap">
                      {slot.startTime} – {slot.endTime}
                    </span>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">(55m)</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-start sm:justify-end gap-1.5 min-w-0">
                    {active && (
                      <span className="shrink-0 whitespace-nowrap px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[9px] tracking-wider uppercase shadow-xs">
                        LIVE
                      </span>
                    )}

                    <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 min-w-0">
                      <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span className="truncate max-w-[160px] sm:max-w-[220px]">Room {slot.room}</span>
                    </div>

                    {isAdmin && onAdminEditSlot && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdminEditSlot(slot, selectedDay);
                        }}
                        className="shrink-0 h-6 px-2 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-[10px] flex items-center gap-1 border border-slate-200 dark:border-slate-700 shadow-2xs transition active:scale-95"
                        title="Admin: Edit Slot & Syllabus"
                      >
                        <Edit3 className="w-2.5 h-2.5" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition flex items-center gap-1.5 truncate">
                      <span>{chosenOption?.code}</span>
                      <span className="text-slate-400 font-normal">·</span>
                      <span className="truncate">{chosenOption?.name}</span>
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-0.5 flex items-center gap-1.5 truncate">
                      <User className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span className="truncate">
                        Coordinator: <strong className="text-slate-800 dark:text-slate-200">{courseDetails?.coordinator || chosenOption?.faculty}</strong>
                      </span>
                    </p>
                    {otherOption && (
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 bg-slate-50 dark:bg-slate-800/60 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 inline-block">
                        Active: <span className="text-slate-900 dark:text-white font-semibold">{chosenOption?.code}</span> (Parallel: {otherOption.code})
                      </p>
                    )}

                    {(() => {
                      const courseTest = getCourseUpcomingTest(chosenOption?.code);
                      if (!courseTest) return null;
                      return (
                        <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-900 dark:text-amber-200">
                          <Calendar className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>{courseTest.type}: <strong>{courseTest.title}</strong> ({courseTest.date})</span>
                        </div>
                      );
                    })()}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition shrink-0 self-center" />
                </div>

                {/* Inline Attendance Action & Status Bar */}
                {chosenOption?.code && (
                  <div
                    className="mt-2 pt-1.5 sm:mt-2.5 sm:pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <CheckSquare className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium hidden sm:inline">Attendance:</span>
                      {(() => {
                        const rec = attendanceRecords[chosenOption.code] || { attended: 0, total: 0 };
                        const pct = rec.total > 0 ? Math.round((rec.attended / rec.total) * 100) : null;
                        return (
                          <span
                            className={`text-[11px] font-bold font-mono whitespace-nowrap ${
                              pct === null ? 'text-slate-400 dark:text-slate-500' : pct >= 75 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            {pct !== null ? `${pct}% (${rec.attended}/${rec.total})` : 'Unlogged'}
                          </span>
                        );
                      })()}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleLogAttendance(chosenOption.code, true, e)}
                        className="h-6 sm:h-7 px-2 sm:px-2.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 transition active:scale-95 cursor-pointer shadow-2xs"
                        title={`Mark +1 Present for ${chosenOption.code}`}
                      >
                        <Check className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                        <span>+ Present</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleLogAttendance(chosenOption.code, false, e)}
                        className="h-6 sm:h-7 px-2 sm:px-2.5 rounded-md bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 transition active:scale-95 cursor-pointer shadow-2xs"
                        title={`Mark +1 Absent for ${chosenOption.code}`}
                      >
                        <X className="w-2.5 h-2.5 text-rose-600 dark:text-rose-400 stroke-[2.5]" />
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
                className={`group relative p-3 sm:p-4 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                  active
                    ? 'bg-white dark:bg-slate-900 border-blue-500/80 dark:border-blue-500/70 ring-1 ring-blue-500/20 shadow-xs'
                    : passed
                    ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-75 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-700'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-2 mb-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
                    <span className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                      <Beaker className="w-2.5 h-2.5 text-slate-500 dark:text-slate-400" />
                      {slot.slotName}
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-semibold whitespace-nowrap">
                      {slot.startTime} – {slot.endTime}
                    </span>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">(2h 55m)</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-start sm:justify-end gap-1.5 min-w-0">
                    {active && (
                      <span className="shrink-0 whitespace-nowrap px-2 py-0.5 rounded bg-blue-600 dark:bg-blue-600 text-white font-bold text-[9px] tracking-wider uppercase shadow-xs">
                        LIVE
                      </span>
                    )}

                    <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 min-w-0">
                      <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span className="truncate max-w-[160px] sm:max-w-[220px]">{slot.room}</span>
                    </div>

                    {isAdmin && onAdminEditSlot && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdminEditSlot(slot, selectedDay);
                        }}
                        className="shrink-0 h-6 px-2 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-[10px] flex items-center gap-1 border border-slate-200 dark:border-slate-700 shadow-2xs transition active:scale-95"
                        title="Admin: Edit Slot & Syllabus"
                      >
                        <Edit3 className="w-2.5 h-2.5" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition flex items-center gap-1.5 truncate">
                      <span>{currentLab.code}</span>
                      <span className="text-slate-400 font-normal">·</span>
                      <span className="truncate">{currentLab.name}</span>
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-0.5 flex items-center gap-1.5 truncate">
                      <User className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span className="truncate">
                        Faculty: <strong className="text-slate-800 dark:text-slate-200">{currentLab.faculty}</strong>
                      </span>
                    </p>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 bg-slate-50 dark:bg-slate-800/60 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 inline-block">
                      Batch: <strong className="text-slate-900 dark:text-white">{selectedBatch === 'batch1' ? 'Batch 1' : 'Batch 2'}</strong> · Alt: {alternateLab.code}
                    </p>

                    {(() => {
                      const labTest = getCourseUpcomingTest(currentLab.code);
                      if (!labTest) return null;
                      return (
                        <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-900 dark:text-amber-200">
                          <Calendar className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>{labTest.type}: <strong>{labTest.title}</strong> ({labTest.date})</span>
                          {onNavigateToTests && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigateToTests();
                              }}
                              className="ml-1 text-[10px] underline font-bold hover:text-slate-900 dark:hover:text-white"
                            >
                              Agenda
                            </button>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition shrink-0 self-center" />
                </div>

                {/* Inline Attendance Action & Status Bar */}
                {currentLab?.code && (
                  <div
                    className="mt-2 pt-1.5 sm:mt-2.5 sm:pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <CheckSquare className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium hidden sm:inline">Lab Attendance:</span>
                      {(() => {
                        const rec = attendanceRecords[currentLab.code] || { attended: 0, total: 0 };
                        const pct = rec.total > 0 ? Math.round((rec.attended / rec.total) * 100) : null;
                        return (
                          <span
                            className={`text-[11px] font-bold font-mono whitespace-nowrap ${
                              pct === null ? 'text-slate-400 dark:text-slate-500' : pct >= 75 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            {pct !== null ? `${pct}% (${rec.attended}/${rec.total})` : 'Unlogged'}
                          </span>
                        );
                      })()}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleLogAttendance(currentLab.code, true, e)}
                        className="h-6 sm:h-7 px-2 sm:px-2.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 transition active:scale-95 cursor-pointer shadow-2xs"
                        title={`Mark +1 Present for ${currentLab.code}`}
                      >
                        <Check className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                        <span>+ Present</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleLogAttendance(currentLab.code, false, e)}
                        className="h-6 sm:h-7 px-2 sm:px-2.5 rounded-md bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 transition active:scale-95 cursor-pointer shadow-2xs"
                        title={`Mark +1 Absent for ${currentLab.code}`}
                      >
                        <X className="w-2.5 h-2.5 text-rose-600 dark:text-rose-400 stroke-[2.5]" />
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
              className={`group relative p-3 sm:p-4 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                active
                  ? 'bg-white dark:bg-slate-900 border-blue-500/80 dark:border-blue-500/70 ring-1 ring-blue-500/20 shadow-xs'
                  : passed
                  ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-75 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-700'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-2 mb-2">
                {/* Left: slot name + time */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                      isMinor
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1 shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isMinor && <BookOpen className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />}
                    {slot.slotName}
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-semibold whitespace-nowrap">
                    {slot.startTime} – {slot.endTime}
                  </span>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">
                    ({slot.isLab ? '2h 55m' : '55m'})
                  </span>
                </div>

                {/* Right: status + room + admin action */}
                <div className="flex flex-wrap items-center justify-start sm:justify-end gap-1.5 min-w-0">
                  {active && (
                    <span className="shrink-0 whitespace-nowrap px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[9px] tracking-wider uppercase shadow-xs">
                      LIVE
                    </span>
                  )}

                  <div className="flex items-center gap-1 text-[11px] sm:text-xs font-medium min-w-0 text-slate-600 dark:text-slate-400">
                    <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                    <span className="truncate max-w-[160px] sm:max-w-[220px]">
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
                      className="shrink-0 h-6 px-2 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-[10px] flex items-center gap-1 border border-slate-200 dark:border-slate-700 shadow-2xs transition active:scale-95"
                      title="Admin: Edit Slot & Syllabus"
                    >
                      <Edit3 className="w-2.5 h-2.5" />
                      <span>Edit</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold tracking-tight transition flex items-center gap-1.5 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                    <span>{course?.code || slot.courseCode}</span>
                    <span className="text-slate-400 font-normal">·</span>
                    <span className="truncate">{course?.name || slot.slotName}</span>
                  </h3>

                  {course?.coordinator && (
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-0.5 flex items-center gap-1.5 truncate">
                      <User className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span className="truncate">
                        Coordinator: <strong className="text-slate-800 dark:text-slate-200">{course.coordinator} ({course.shortName})</strong>
                      </span>
                    </p>
                  )}

                  {isMinor && (
                    <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-[10px] text-blue-800 dark:text-blue-300">
                      <BookOpen className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      <span>Special: CSE Minor Course · Dr. Pravati Swain</span>
                    </div>
                  )}

                  {slot.notes && !isMinor && (
                    <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">{slot.notes}</p>
                  )}

                  {(() => {
                    const regularTest = getCourseUpcomingTest(course?.code || slot.courseCode);
                    if (!regularTest) return null;
                    return (
                      <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-900 dark:text-amber-200">
                        <Calendar className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>{regularTest.type}: <strong>{regularTest.title}</strong> ({regularTest.date})</span>
                      </div>
                    );
                  })()}
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition shrink-0 self-center" />
              </div>

              {/* Inline Attendance Action & Status Bar */}
              {(course?.code || slot.courseCode) && (
                <div
                  className="mt-2 pt-1.5 sm:mt-2.5 sm:pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <CheckSquare className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium hidden sm:inline">Attendance:</span>
                    {(() => {
                      const code = course?.code || slot.courseCode;
                      const rec = attendanceRecords[code] || { attended: 0, total: 0 };
                      const pct = rec.total > 0 ? Math.round((rec.attended / rec.total) * 100) : null;
                      return (
                        <span
                          className={`text-[11px] font-bold font-mono whitespace-nowrap ${
                            pct === null ? 'text-slate-400 dark:text-slate-500' : pct >= 75 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {pct !== null ? `${pct}% (${rec.attended}/${rec.total})` : 'Unlogged'}
                        </span>
                      );
                    })()}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleLogAttendance(course?.code || slot.courseCode, true, e)}
                      className="h-6 sm:h-7 px-2 sm:px-2.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 transition active:scale-95 cursor-pointer shadow-2xs"
                      title={`Mark +1 Present for ${course?.code || slot.courseCode}`}
                    >
                      <Check className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                      <span>+ Present</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleLogAttendance(course?.code || slot.courseCode, false, e)}
                      className="h-6 sm:h-7 px-2 sm:px-2.5 rounded-md bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 transition active:scale-95 cursor-pointer shadow-2xs"
                      title={`Mark +1 Absent for ${course?.code || slot.courseCode}`}
                    >
                      <X className="w-2.5 h-2.5 text-rose-600 dark:text-rose-400 stroke-[2.5]" />
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
        <div className="pt-1">
          <button
            type="button"
            onClick={() => onAdminAddSlot(selectedDay)}
            className="w-full py-2 sm:py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-dashed border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-98 shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Slot for {selectedDay} (Admin)</span>
          </button>
        </div>
      )}
    </div>
  );
};
