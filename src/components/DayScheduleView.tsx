import React from 'react';
import { TimeSlot, Course, DayOfWeek } from '../data/timetableData';
import { AcademicTest } from '../data/testTypes';
import {
  Clock,
  MapPin,
  User,
  Sparkles,
  AlertCircle,
  Coffee,
  Check,
  Beaker,
  ChevronRight,
  ChevronLeft,
  Edit3,
  CalendarCheck,
  Plus,
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

  // Day summary calculations
  const totalClasses = slots.filter((s) => !s.isLunch && !s.isFree).length;
  const hasMinor = slots.some((s) => s.isMinor || s.courseCode === 'CS300M');
  const hasLab = slots.some((s) => s.isLab);

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
              className={`min-h-[44px] sm:min-h-[48px] py-1.5 px-0.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-0.5 sm:gap-2 transition-all active:scale-95 ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : isWeekend
                  ? 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/50'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden text-xs font-bold">{shortDay}</span>
              {isToday ? (
                <span
                  className={`text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-md font-bold uppercase tracking-wider ${
                    isSelected
                      ? 'bg-slate-950/20 text-slate-950'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  Today
                </span>
              ) : isWeekend ? (
                <span className="sm:hidden text-[8px] text-slate-500">wknd</span>
              ) : null}
              {dayMinor && !isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" title="Has CS300M Minor Class" />
              )}
            </button>
          );
        })}
      </div>

      {/* Alert banner if test scheduled today */}
      {todaysTests.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/80 to-amber-950/60 border border-rose-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold shrink-0">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                ⚡ Scheduled Test / Exam Today!
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                {todaysTests.map((t) => `${t.courseCode}: ${t.title} (${t.startTime} in ${t.room})`).join(' • ')}
              </div>
            </div>
          </div>

          {onNavigateToTests && (
            <button
              type="button"
              onClick={onNavigateToTests}
              className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto shrink-0"
            >
              <span>View Agenda & Tasks</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Day Header & Briefing Bar */}
      <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {selectedDay}'s Timetable
              </h2>
              {isSelectedDayToday && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                  Live Today
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {branch} Semester {semester} • NIT Goa Campus
            </p>
          </div>

          {/* Quick Prev / Next Day navigation buttons for mobile thumb */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={goToPrevDay}
              className="min-h-[44px] min-w-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700/80 active:scale-95 transition shadow-xs"
              aria-label="Previous day"
              title="Previous day"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goToNextDay}
              className="min-h-[44px] min-w-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700/80 active:scale-95 transition shadow-xs"
              aria-label="Next day"
              title="Next day"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Badges for Day & Customize / Test Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
            <strong className="text-white">{totalClasses}</strong> Sessions
          </div>
          {hasMinor && (
            <div className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs text-cyan-300 flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Includes <strong>CS300M Minor</strong></span>
            </div>
          )}
          {hasLab && (
            <div className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-1.5">
              <Beaker className="w-3.5 h-3.5 text-emerald-400" />
              <span>3-Hour Lab Session</span>
            </div>
          )}

          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1.5 transition active:scale-95"
              title="Customize timing or add extra slots to this day"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Day Schedule</span>
            </button>
          )}

          {isAdmin && onAdminAddSlot && (
            <button
              onClick={() => onAdminAddSlot(selectedDay)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm"
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
                className="py-3 px-4 rounded-xl bg-slate-800/30 border border-dashed border-slate-700/60 flex items-center justify-between text-slate-400 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Coffee className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-slate-300">LUNCH BREAK</span>
                  <span className="text-slate-500">• Institute Dining / Refreshment</span>
                </div>
                <div className="font-mono text-xs text-slate-400">
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
                className="py-3.5 px-4 rounded-xl bg-slate-800/20 border border-dashed border-slate-700/40 flex items-center justify-between text-slate-400 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  <div>
                    <span className="font-semibold text-slate-300">{slot.slotName}</span>
                    <span className="text-slate-500 text-xs block sm:inline sm:ml-2">
                      {slot.notes || 'Open Slot — Self-Study / Library Period'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="font-mono text-xs text-slate-400 shrink-0">
                    {slot.startTime} – {slot.endTime}
                  </div>
                  {isAdmin && onAdminEditSlot && (
                    <button
                      type="button"
                      onClick={() => onAdminEditSlot(slot, selectedDay)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm transition active:scale-95"
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
                className={`group relative p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-amber-500/15 via-slate-800/90 to-slate-800 border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : passed
                    ? 'bg-slate-900/60 border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-700'
                    : 'bg-slate-800/70 border-slate-700/70 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                {active && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-bold text-[10px] tracking-wider uppercase animate-pulse">
                    Happening Now
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
                      {slot.slotName}
                    </span>
                    <span className="font-mono text-xs text-slate-300 font-semibold">
                      {slot.startTime} – {slot.endTime}
                    </span>
                    <span className="text-xs text-slate-400">(55 mins)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Room {slot.room}</span>
                    </div>
                    {isAdmin && onAdminEditSlot && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdminEditSlot(slot, selectedDay);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm transition active:scale-95"
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
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition flex items-center gap-2">
                      <span>{chosenOption?.code}</span>
                      <span className="text-slate-500 font-normal">•</span>
                      <span>{chosenOption?.name}</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-blue-400" />
                      <span>
                        Coordinator: <strong className="text-slate-200">{courseDetails?.coordinator || chosenOption?.faculty}</strong>
                      </span>
                    </p>
                    {otherOption && (
                      <p className="text-[11px] text-slate-400 mt-2 bg-slate-900/60 px-2.5 py-1 rounded-lg inline-block border border-slate-800">
                        Elective Choice Active: <span className="text-indigo-300 font-semibold">{chosenOption?.code}</span> (Parallel: {otherOption.code})
                      </p>
                    )}

                    {(() => {
                      const courseTest = getCourseUpcomingTest(chosenOption?.code);
                      if (!courseTest) return null;
                      return (
                        <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-300">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{courseTest.type}: <strong>{courseTest.title}</strong> ({courseTest.date})</span>
                        </div>
                      );
                    })()}
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition shrink-0 self-center" />
                </div>
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
                className={`group relative p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-emerald-500/15 via-slate-800/90 to-slate-800 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                    : passed
                    ? 'bg-slate-900/60 border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-700'
                    : 'bg-slate-800/70 border-emerald-500/30 hover:border-emerald-500/60 hover:bg-slate-800'
                }`}
              >
                {active && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 font-bold text-[10px] tracking-wider uppercase animate-pulse">
                    Happening Now
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1">
                      <Beaker className="w-3 h-3" />
                      {slot.slotName}
                    </span>
                    <span className="font-mono text-xs text-slate-300 font-semibold">
                      {slot.startTime} – {slot.endTime}
                    </span>
                    <span className="text-xs text-slate-400">(2 Hrs 55 Mins)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{slot.room}</span>
                    </div>
                    {isAdmin && onAdminEditSlot && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdminEditSlot(slot, selectedDay);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm transition active:scale-95"
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
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition flex items-center gap-2">
                      <span>{currentLab.code}</span>
                      <span className="text-slate-500 font-normal">•</span>
                      <span>{currentLab.name}</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-blue-400" />
                      <span>
                        Faculty: <strong className="text-slate-200">{currentLab.faculty}</strong>
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-2 bg-slate-900/60 px-2.5 py-1 rounded-lg inline-block border border-slate-800">
                      Batch Selection: <strong className="text-emerald-300">{selectedBatch === 'batch1' ? 'Batch 1' : 'Batch 2'}</strong> • Alternate batch: {alternateLab.code}
                    </p>

                    {(() => {
                      const labTest = getCourseUpcomingTest(currentLab.code);
                      if (!labTest) return null;
                      return (
                        <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-300">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{labTest.type}: <strong>{labTest.title}</strong> ({labTest.date})</span>
                          {onNavigateToTests && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigateToTests();
                              }}
                              className="ml-1 text-[11px] underline font-bold hover:text-white"
                            >
                              Agenda
                            </button>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition shrink-0 self-center" />
                </div>
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
              className={`group relative p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                isMinor
                  ? 'bg-gradient-to-r from-cyan-950/50 via-slate-800 to-indigo-950/40 border-cyan-500/50 shadow-md shadow-cyan-500/10 hover:border-cyan-400'
                  : active
                  ? 'bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-800 border-amber-500/60 shadow-lg shadow-amber-500/10'
                  : passed
                  ? 'bg-slate-900/60 border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-700'
                  : 'bg-slate-800/70 border-slate-700/70 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              {active && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-bold text-[10px] tracking-wider uppercase animate-pulse">
                  Happening Now
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                      isMinor
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1 shadow-xs'
                        : course?.category === 'lab' || slot.isLab
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : course?.category === 'mlc'
                        ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                        : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {isMinor && <Sparkles className="w-3 h-3 text-cyan-400" />}
                    {slot.slotName}
                  </span>
                  <span className="font-mono text-xs text-slate-300 font-semibold">
                    {slot.startTime} – {slot.endTime}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({slot.isLab ? '2 Hrs 55 Mins' : '55 Mins'})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1.5 text-xs font-medium ${isMinor ? 'text-cyan-300' : 'text-slate-300'}`}>
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Room {slot.room || course?.room}</span>
                  </div>
                  {isAdmin && onAdminEditSlot && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdminEditSlot(slot, selectedDay);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm transition active:scale-95"
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
                  <h3
                    className={`text-base sm:text-lg font-bold tracking-tight transition flex items-center gap-2 ${
                      isMinor
                        ? 'text-cyan-200 group-hover:text-cyan-100'
                        : 'text-white group-hover:text-amber-400'
                    }`}
                  >
                    <span>{course?.code || slot.courseCode}</span>
                    <span className="text-slate-500 font-normal">•</span>
                    <span>{course?.name || slot.slotName}</span>
                  </h3>

                  {course?.coordinator && (
                    <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-blue-400" />
                      <span>
                        Coordinator: <strong className="text-slate-200">{course.coordinator} ({course.shortName})</strong>
                      </span>
                    </p>
                  )}

                  {isMinor && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-900/40 border border-cyan-500/30 text-[11px] text-cyan-200">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>Special: CSE Minor Course • Coordinated by Dr. Pravati Swain</span>
                    </div>
                  )}

                  {slot.notes && !isMinor && (
                    <p className="text-[11px] text-slate-400 mt-1.5 italic">{slot.notes}</p>
                  )}

                  {(() => {
                    const regularTest = getCourseUpcomingTest(course?.code || slot.courseCode);
                    if (!regularTest) return null;
                    return (
                      <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-300">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{regularTest.type}: <strong>{regularTest.title}</strong> ({regularTest.date})</span>
                      </div>
                    );
                  })()}
                </div>

                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition shrink-0 self-center" />
              </div>
            </div>
          );
        })}
      </div>

      {isAdmin && onAdminAddSlot && (
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onAdminAddSlot(selectedDay)}
            className="w-full py-3.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-dashed border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-98 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Slot for {selectedDay} (Admin)</span>
          </button>
        </div>
      )}
    </div>
  );
};
