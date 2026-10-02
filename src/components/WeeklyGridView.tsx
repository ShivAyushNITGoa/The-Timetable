import React, { useState } from 'react';
import { MASTER_SLOT_TIMINGS, TimeSlot, Course, DayOfWeek } from '../data/timetableData';
import { Bookmark, MapPin, Beaker, Info, LayoutGrid, Calendar, ChevronRight, Clock, User, Edit3, Plus } from 'lucide-react';

interface WeeklyGridViewProps {
  schedule: Record<DayOfWeek, TimeSlot[]>;
  courses: Record<string, Course>;
  selectedElective: string;
  selectedBatch: string;
  onOpenCourseModal: (courseCode: string) => void;
  branch?: string;
  semester?: number;
  isAdmin?: boolean;
  onAdminEditSlot?: (slot: TimeSlot, day: DayOfWeek) => void;
  onAdminAddSlot?: (day: DayOfWeek) => void;
}

export const WeeklyGridView: React.FC<WeeklyGridViewProps> = ({
  schedule,
  courses,
  selectedElective,
  selectedBatch,
  onOpenCourseModal,
  branch = 'EEE',
  semester = 5,
  isAdmin = false,
  onAdminEditSlot,
  onAdminAddSlot,
}) => {
  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const now = new Date();
  const currentDayIndex = now.getDay();
  const currentDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDayIndex] as DayOfWeek;

  // Default to day card view on smaller screens, matrix on desktop
  const [mobileMode, setMobileMode] = useState<'cards' | 'matrix'>('cards');
  const [selectedMobileDay, setSelectedMobileDay] = useState<DayOfWeek>(() => {
    if (days.includes(currentDayName)) {
      return currentDayName;
    }
    return 'Monday';
  });

  // Map each day to period slots based on the provided dynamic schedule
  const getSlotForPeriod = (day: DayOfWeek, periodId: string): TimeSlot | null => {
    const daySlots = schedule[day] || [];

    switch (periodId) {
      case 'p1':
        return daySlots.find((s) => s.startTime === '09:00') || null;
      case 'p2':
        return daySlots.find((s) => s.startTime === '10:00') || null;
      case 'p3':
        return daySlots.find((s) => s.startTime === '11:00') || null;
      case 'p4':
        return daySlots.find((s) => s.startTime === '12:00') || null;
      case 'lunch':
        return daySlots.find((s) => s.isLunch) || null;
      case 'p5':
        return daySlots.find((s) => s.startTime === '14:00') || null;
      case 'p6': {
        const directP6 = daySlots.find((s) => s.startTime === '15:00');
        if (directP6) return directP6;
        const labSlot = daySlots.find((s) => s.isLab && s.startTime === '14:00');
        return labSlot || null;
      }
      case 'p7': {
        const directP7 = daySlots.find((s) => s.startTime === '16:00');
        if (directP7) return directP7;
        const labSlotP7 = daySlots.find((s) => s.isLab && s.startTime === '14:00');
        return labSlotP7 || null;
      }
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Legend & Responsive View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 bg-slate-800/60 border border-slate-700/60 rounded-lg text-xs">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-400" /> Legend:
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-600/20 text-blue-300 border border-blue-500/30 font-semibold">
            {branch} Sem {semester} Core
          </span>
          {branch === 'EEE' && semester === 5 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-950/60 text-blue-300 border border-blue-500/40 font-semibold shadow-xs">
              CS300M Minor
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Beaker className="w-3 h-3" /> Lab
          </span>
        </div>

        {/* View Switcher: Day Cards vs Full Matrix (Ideal for Mobile) */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-700/80 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMobileMode('cards')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition min-h-[36px] sm:min-h-0 ${
              mobileMode === 'cards'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Day Cards</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileMode('matrix')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition min-h-[36px] sm:min-h-0 ${
              mobileMode === 'matrix'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Full Matrix</span>
          </button>
        </div>
      </div>

      {/* MOBILE-OPTIMIZED DAY CARDS VIEW */}
      {mobileMode === 'cards' && (
        <div className="space-y-4">
          {/* Day selection tabs */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {days.map((day) => {
              const isToday = currentDayName === day;
              const isSelected = selectedMobileDay === day;
              const shortDay = day.slice(0, 3);
              const isWeekend = day === 'Saturday' || day === 'Sunday';
              const dayMinor = (schedule[day] || []).some((s) => s.isMinor || s.courseCode === 'CS300M');

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedMobileDay(day)}
                  className={`min-h-[44px] py-1.5 px-0.5 sm:px-1 rounded-lg border text-center transition flex flex-col items-center justify-center relative active:scale-95 ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold border-blue-400 shadow-md shadow-blue-600/25'
                      : isWeekend
                      ? 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-700/80'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700/70 hover:bg-slate-700/80'
                  }`}
                >
                  <span className="text-[11px] sm:text-sm font-bold">{shortDay}</span>
                  {isToday ? (
                    <span
                      className={`text-[8px] sm:text-[9px] px-1 rounded uppercase tracking-wider font-extrabold ${
                        isSelected ? 'bg-slate-950/20 text-white' : 'text-blue-400'
                      }`}
                    >
                      Today
                    </span>
                  ) : isWeekend ? (
                    <span className="text-[8px] text-slate-500 font-medium">wknd</span>
                  ) : null}
                  {dayMinor && !isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 absolute top-1 right-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Cards List for Selected Day */}
          <div className="space-y-2.5">
            {(schedule[selectedMobileDay] || []).map((slot, idx) => {
              if (slot.isLunch) {
                return (
                  <div
                    key={`lunch-${idx}`}
                    className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs text-slate-300"
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <span>Lunch Break & Rest</span>
                    </div>
                    <span className="font-mono text-slate-400">13:00 – 14:00</span>
                  </div>
                );
              }

              if (slot.isFree) {
                return (
                  <div
                    key={`free-${idx}`}
                    className="p-3 rounded-lg bg-slate-900/50 border border-dashed border-slate-800 text-slate-500 text-xs flex items-center justify-between"
                  >
                    <span>{slot.slotName || 'Study Slot'}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{slot.startTime} – {slot.endTime}</span>
                      {isAdmin && onAdminEditSlot && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdminEditSlot(slot, selectedMobileDay);
                          }}
                          className="px-2 py-0.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] flex items-center gap-1 active:scale-95 transition"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              }

              // Elective slot
              if (slot.isElectiveChoice) {
                const chosenOption =
                  slot.electiveOptions?.find((opt) => opt.code === selectedElective) || slot.electiveOptions?.[0];
                const code = chosenOption?.code || 'EE541';

                return (
                  <div
                    key={`elective-${idx}`}
                    onClick={() => onOpenCourseModal(code)}
                    className="p-4 rounded-lg bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 transition cursor-pointer active:scale-[0.99] flex items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-600/20 text-blue-300 border border-blue-500/30 font-bold uppercase">
                          {slot.slotName}
                        </span>
                        <span className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" /> {slot.startTime} – {slot.endTime}
                        </span>
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Room {slot.room}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-white">
                        {code}: {chosenOption?.name}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>Faculty: {chosenOption?.faculty}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isAdmin && onAdminEditSlot && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdminEditSlot(slot, selectedMobileDay);
                          }}
                          className="p-1.5 px-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition active:scale-95"
                          title="Admin: Edit Slot & Syllabus"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      )}
                      <ChevronRight className="w-5 h-5 text-slate-500 shrink-0" />
                    </div>
                  </div>
                );
              }

              // Lab slot
              if (slot.isLab) {
                const labCode = slot.labOptions
                  ? (selectedBatch === 'batch1' ? slot.labOptions.batch1.code : slot.labOptions.batch2.code)
                  : slot.courseCode;
                const labName = slot.labOptions
                  ? (selectedBatch === 'batch1' ? slot.labOptions.batch1.name : slot.labOptions.batch2.name)
                  : (courses[slot.courseCode]?.name || 'Laboratory');
                const labFaculty = slot.labOptions
                  ? (selectedBatch === 'batch1' ? slot.labOptions.batch1.faculty : slot.labOptions.batch2.faculty)
                  : (courses[slot.courseCode]?.coordinator || '');
                const labRoom = slot.labOptions
                  ? (selectedBatch === 'batch1' ? slot.labOptions.batch1.room : slot.labOptions.batch2.room)
                  : slot.room;

                return (
                  <div
                    key={`lab-${idx}`}
                    onClick={() => onOpenCourseModal(labCode)}
                    className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-500/50 transition cursor-pointer active:scale-[0.99] flex items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1 uppercase">
                          <Beaker className="w-3 h-3" /> Practical Lab
                        </span>
                        <span className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" /> {slot.startTime} – {slot.endTime}
                        </span>
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {labRoom}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-white">
                        {labCode}: {labName}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>Faculty: {labFaculty} ({selectedBatch.toUpperCase()})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isAdmin && onAdminEditSlot && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdminEditSlot(slot, selectedMobileDay);
                          }}
                          className="p-1.5 px-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition active:scale-95"
                          title="Admin: Edit Slot & Syllabus"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      )}
                      <ChevronRight className="w-5 h-5 text-emerald-400 shrink-0" />
                    </div>
                  </div>
                );
              }

              // Standard course / Minor
              const isMinor = slot.isMinor || slot.courseCode === 'CS300M';
              const course = courses[slot.courseCode];

              return (
                <div
                  key={`std-${idx}`}
                  onClick={() => onOpenCourseModal(slot.courseCode)}
                  className={`p-4 rounded-lg border transition cursor-pointer active:scale-[0.99] flex items-center justify-between gap-3 shadow-sm ${
                    isMinor
                      ? 'bg-blue-950/25 border-blue-500/40 hover:border-blue-400'
                      : 'bg-slate-800/80 border-slate-700/70 hover:border-slate-600'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${
                          isMinor
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1'
                            : 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                        }`}
                      >
                        {slot.slotName}
                      </span>
                      <span className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> {slot.startTime} – {slot.endTime}
                      </span>
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Room {slot.room || course?.room}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white">
                      {slot.courseCode}: {course?.name || slot.slotName}
                    </div>
                    {course?.coordinator && (
                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>Faculty: {course.coordinator}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isAdmin && onAdminEditSlot && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdminEditSlot(slot, selectedMobileDay);
                        }}
                        className="p-1.5 px-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition active:scale-95"
                        title="Admin: Edit Slot & Syllabus"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                    )}
                    <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>

          {isAdmin && onAdminAddSlot && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onAdminAddSlot(selectedMobileDay)}
                className="w-full py-2.5 rounded-lg bg-blue-600/15 hover:bg-blue-600/25 border border-dashed border-blue-500/40 text-blue-300 font-semibold text-xs flex items-center justify-center gap-2 transition active:scale-98"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Slot for {selectedMobileDay} (Admin)</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* FULL MATRIX GRID (WITH HORIZONTAL SCROLL & STICKY DAY COLUMN) */}
      {mobileMode === 'matrix' && (
        <div className="space-y-2">
          <div className="text-[11px] text-blue-400 flex items-center justify-between px-1">
            <span>← Swipe horizontally to view afternoon periods & labs →</span>
            <span className="text-slate-400 font-mono">8 Periods</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-700/80 bg-slate-900 shadow-xl touch-pan-x">
            <table className="w-full text-left border-collapse min-w-[760px] sm:min-w-[920px]">
              <thead>
                <tr className="bg-slate-800/90 border-b border-slate-700">
                  <th className="px-1.5 py-2.5 sm:p-3.5 text-xs font-bold text-slate-300 uppercase tracking-wider w-14 sm:w-28 sticky left-0 bg-slate-800 z-20 shadow-md text-center sm:text-left">
                    <span className="sm:hidden text-[10px]">Day</span>
                    <span className="hidden sm:inline">Day / Period</span>
                  </th>
                  {MASTER_SLOT_TIMINGS.map((slot) => (
                    <th
                      key={slot.id}
                      className={`p-2 sm:p-3 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-center border-l border-slate-700/60 ${
                        slot.id === 'lunch' ? 'bg-slate-800/40 w-16 sm:w-24 text-blue-300' : 'text-slate-300'
                      }`}
                    >
                      <div>{slot.label}</div>
                      <div className="font-mono text-[9px] sm:text-[10px] text-slate-400 font-normal lowercase">{slot.time}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900">
                {days.map((day) => {
                  const isToday = currentDayName === day;
                  const isWeekend = day === 'Saturday' || day === 'Sunday';
                  const hasLabSession = (schedule[day] || []).some((s) => s.isLab && s.startTime === '14:00');

                  return (
                    <tr
                      key={day}
                      className={`transition-colors ${
                        isToday
                          ? 'bg-slate-800/90 ring-1 ring-inset ring-blue-500/40'
                          : isWeekend
                          ? 'bg-slate-900/60 hover:bg-slate-800/40'
                          : 'hover:bg-slate-800/30'
                      }`}
                    >
                      {/* Day Label - Sticky column: compact width (w-14 / ~56px) on mobile, w-28 on desktop */}
                      <td
                        className={`px-1.5 py-2 sm:p-3.5 font-semibold text-xs sticky left-0 z-20 border-r border-slate-700/60 shadow-md w-14 sm:w-28 ${
                          isToday
                            ? 'bg-slate-800 text-blue-300 font-bold border-l-2 sm:border-l-4 border-l-blue-400'
                            : 'bg-slate-900 text-slate-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 text-center sm:text-left">
                          <span className="sm:hidden text-[11px] font-bold uppercase tracking-tight">{day.slice(0, 3)}</span>
                          <span className="hidden sm:inline">{day}</span>
                          {isToday && (
                            <span className="text-[8px] sm:text-[9px] px-1 py-0.2 sm:py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded font-mono uppercase">
                              Today
                            </span>
                          )}
                          {isWeekend && !isToday && (
                            <span className="sm:hidden text-[8px] text-slate-500">wknd</span>
                          )}
                        </div>
                      </td>

                      {/* Period 1 (09:00 - 09:55) */}
                      <td className="p-1.5 sm:p-2 border-l border-slate-800 w-28 sm:w-36">
                        {renderCell(getSlotForPeriod(day, 'p1'), courses, selectedElective, selectedBatch, onOpenCourseModal, false, day, isAdmin, onAdminEditSlot, onAdminAddSlot)}
                      </td>

                      {/* Period 2 (10:00 - 10:55) */}
                      <td className="p-1.5 sm:p-2 border-l border-slate-800 w-28 sm:w-36">
                        {renderCell(getSlotForPeriod(day, 'p2'), courses, selectedElective, selectedBatch, onOpenCourseModal, false, day, isAdmin, onAdminEditSlot, onAdminAddSlot)}
                      </td>

                      {/* Period 3 (11:00 - 11:55) */}
                      <td className="p-1.5 sm:p-2 border-l border-slate-800 w-28 sm:w-36">
                        {renderCell(getSlotForPeriod(day, 'p3'), courses, selectedElective, selectedBatch, onOpenCourseModal, false, day, isAdmin, onAdminEditSlot, onAdminAddSlot)}
                      </td>

                      {/* Period 4 (12:00 - 12:55) */}
                      <td className="p-1.5 sm:p-2 border-l border-slate-800 w-28 sm:w-36">
                        {renderCell(getSlotForPeriod(day, 'p4'), courses, selectedElective, selectedBatch, onOpenCourseModal, false, day, isAdmin, onAdminEditSlot, onAdminAddSlot)}
                      </td>

                      {/* Lunch Break (13:00 - 14:00) */}
                      <td className="p-1.5 sm:p-2 border-l border-slate-800 text-center bg-slate-950/40 w-16 sm:w-24">
                        <div className="h-16 flex flex-col items-center justify-center text-blue-400/90 text-xs font-semibold gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          <span className="text-[11px] sm:text-xs">Lunch</span>
                          <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono">1–2 PM</span>
                        </div>
                      </td>

                      {/* Afternoon Sessions: If Lab spans P5, P6, P7 */}
                      {hasLabSession ? (
                        <td colSpan={3} className="p-1.5 sm:p-2 border-l border-slate-800">
                          {renderCell(getSlotForPeriod(day, 'p5'), courses, selectedElective, selectedBatch, onOpenCourseModal, true, day, isAdmin, onAdminEditSlot, onAdminAddSlot)}
                        </td>
                      ) : (
                        <>
                          {/* Period 5 (14:00 - 14:55) */}
                          <td className="p-1.5 sm:p-2 border-l border-slate-800 w-28 sm:w-36">
                            {renderCell(getSlotForPeriod(day, 'p5'), courses, selectedElective, selectedBatch, onOpenCourseModal, false, day, isAdmin, onAdminEditSlot, onAdminAddSlot)}
                          </td>
                          {/* Period 6 (15:00 - 15:55) */}
                          <td className="p-1.5 sm:p-2 border-l border-slate-800 w-28 sm:w-36">
                            {renderCell(getSlotForPeriod(day, 'p6'), courses, selectedElective, selectedBatch, onOpenCourseModal, false, day, isAdmin, onAdminEditSlot, onAdminAddSlot)}
                          </td>
                          {/* Period 7 (16:00 - 16:55) */}
                          <td className="p-1.5 sm:p-2 border-l border-slate-800 w-28 sm:w-36">
                            {renderCell(getSlotForPeriod(day, 'p7'), courses, selectedElective, selectedBatch, onOpenCourseModal, false, day, isAdmin, onAdminEditSlot, onAdminAddSlot)}
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

function renderCell(
  slot: TimeSlot | null,
  courses: Record<string, Course>,
  selectedElective: string,
  selectedBatch: string,
  onOpenCourseModal: (courseCode: string) => void,
  isSpannedLab: boolean = false,
  day: DayOfWeek = 'Monday',
  isAdmin: boolean = false,
  onAdminEditSlot?: (slot: TimeSlot, day: DayOfWeek) => void,
  onAdminAddSlot?: (day: DayOfWeek) => void
) {
  if (!slot) {
    if (isAdmin && onAdminAddSlot) {
      return (
        <button
          type="button"
          onClick={() => onAdminAddSlot(day)}
          className="h-16 w-full rounded-lg bg-slate-900/60 hover:bg-blue-500/10 border border-dashed border-slate-800 hover:border-blue-500/40 text-[11px] text-slate-500 hover:text-blue-300 flex flex-col items-center justify-center gap-1 transition group"
          title={`Admin: Add slot for ${day}`}
        >
          <Plus className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
          <span className="text-[10px]">Add Slot</span>
        </button>
      );
    }
    return (
      <div className="h-16 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center justify-center text-[11px] text-slate-500 italic">
        Free
      </div>
    );
  }

  if (slot.isFree) {
    return (
      <div className="h-16 rounded-lg bg-slate-900/90 border border-dashed border-slate-700/60 p-2 flex flex-col justify-between relative group">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-slate-300">{slot.slotName}</span>
          {isAdmin && onAdminEditSlot && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAdminEditSlot(slot, day);
              }}
              className="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white transition active:scale-90 shadow-xs"
              title="Admin: Edit Slot"
            >
              <Edit3 className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
        <span className="text-[10px] text-slate-400">Free / Study</span>
      </div>
    );
  }

  // Elective Choice (EE541 / EE545)
  if (slot.isElectiveChoice) {
    const chosenOption =
      slot.electiveOptions?.find((opt) => opt.code === selectedElective) || slot.electiveOptions?.[0];
    const code = chosenOption?.code || 'EE541';

    return (
      <button
        onClick={() => onOpenCourseModal(code)}
        className="w-full text-left h-16 p-2 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/40 transition flex flex-col justify-between group active:scale-[0.98]"
      >
        <div className="flex items-center justify-between w-full">
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-semibold uppercase">
            Slot F
          </span>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
              <MapPin className="w-2.5 h-2.5 text-emerald-400" /> {slot.room}
            </span>
            {isAdmin && onAdminEditSlot && (
              <span
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdminEditSlot(slot, day);
                }}
                className="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white transition active:scale-90 shadow-xs"
                title="Admin: Edit Slot & Syllabus"
              >
                <Edit3 className="w-2.5 h-2.5" />
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold text-white group-hover:text-indigo-300 truncate">
            {code}: {chosenOption?.name}
          </div>
          <div className="text-[10px] text-slate-400 truncate">{chosenOption?.faculty}</div>
        </div>
      </button>
    );
  }

  // 3-Hour Lab Session
  if (slot.isLab) {
    let labCode = slot.courseCode;
    let labName = 'Laboratory';
    let faculty = '';
    let room = slot.room;

    if (slot.labOptions) {
      const chosenLab = selectedBatch === 'batch1' ? slot.labOptions.batch1 : slot.labOptions.batch2;
      labCode = chosenLab.code;
      labName = chosenLab.name;
      faculty = chosenLab.faculty;
      room = chosenLab.room;
    } else {
      const course = courses[slot.courseCode];
      labCode = slot.courseCode;
      labName = course?.name || 'Lab';
      faculty = course?.coordinator || '';
      room = course?.room || slot.room;
    }

    return (
      <button
        onClick={() => onOpenCourseModal(labCode)}
        className="w-full text-left p-2.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 transition flex flex-col justify-between group h-16 active:scale-[0.98]"
      >
        <div className="flex items-center justify-between w-full">
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold flex items-center gap-1">
            <Beaker className="w-2.5 h-2.5" /> 3-Hour Practical (14:00 – 16:55)
          </span>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
              <MapPin className="w-2.5 h-2.5" /> {room}
            </span>
            {isAdmin && onAdminEditSlot && (
              <span
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdminEditSlot(slot, day);
                }}
                className="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white transition active:scale-90 shadow-xs"
                title="Admin: Edit Slot & Syllabus"
              >
                <Edit3 className="w-2.5 h-2.5" />
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold text-white group-hover:text-emerald-300 truncate">
            {labCode}: {labName}
          </div>
          <div className="text-[10px] text-slate-400 truncate">
            {faculty} {slot.labOptions ? `(${selectedBatch.toUpperCase()})` : ''}
          </div>
        </div>
      </button>
    );
  }

  // Regular Course or Minor
  const isMinor = slot.isMinor || slot.courseCode === 'CS300M';
  const course = courses[slot.courseCode];

  return (
    <button
      onClick={() => onOpenCourseModal(slot.courseCode)}
      className={`w-full text-left h-16 p-2 rounded-lg transition flex flex-col justify-between group active:scale-[0.98] ${
        isMinor
          ? 'bg-slate-800/90 border border-blue-500/50 hover:border-blue-400 shadow-xs'
          : course?.category === 'mlc'
          ? 'bg-slate-800/90 border border-slate-700/80 hover:border-slate-600'
          : 'bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 hover:border-slate-600'
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <span
          className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
            isMinor
              ? 'bg-blue-900/40 text-blue-200 border border-blue-400/40 flex items-center gap-1 font-bold'
              : course?.category === 'mlc'
              ? 'bg-slate-700/60 text-slate-200'
              : 'bg-blue-600/20 text-blue-300'
          }`}
        >
          {isMinor && <Bookmark className="w-2.5 h-2.5 text-blue-300" />}
          {slot.slotName}
        </span>
        <div className="flex items-center gap-1">
          <span
            className={`text-[10px] flex items-center gap-0.5 ${
              isMinor ? 'text-blue-300 font-semibold' : 'text-slate-400'
            }`}
          >
            <MapPin className="w-2.5 h-2.5 text-emerald-400" /> {slot.room || course?.room}
          </span>
          {isAdmin && onAdminEditSlot && (
            <span
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                onAdminEditSlot(slot, day);
              }}
              className="p-1 rounded bg-blue-600 hover:bg-blue-500 text-white transition active:scale-90 shadow-xs"
              title="Admin: Edit Slot & Syllabus"
            >
              <Edit3 className="w-2.5 h-2.5" />
            </span>
          )}
        </div>
      </div>
      <div>
        <div
          className={`text-xs font-bold truncate ${
            isMinor ? 'text-blue-200 group-hover:text-blue-100' : 'text-white group-hover:text-blue-300'
          }`}
        >
          {course?.code || slot.courseCode}: {course?.name || slot.slotName}
        </div>
        <div className="text-[10px] text-slate-400 truncate">{course?.coordinator || ''}</div>
      </div>
    </button>
  );
}
