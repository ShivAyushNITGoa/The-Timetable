import React, { useState, useEffect, useMemo } from 'react';
import { Course } from '../data/timetableData';
import {
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  Plus,
  Minus,
  RotateCcw,
  ShieldCheck,
  Pencil,
  Check,
  X,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { useTheme } from '../utils/theme';

interface AttendanceRecord {
  attended: number;
  total: number;
}

interface AttendanceTrackerProps {
  courses: Record<string, Course>;
  selectedElective: string;
  branch?: string;
  semester?: number;
}

export const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({
  courses,
  selectedElective,
  branch = 'EEE',
  semester = 5,
}) => {
  const safeBranch = (branch || 'EEE').toLowerCase();
  const safeSemester = semester ?? 5;
  const STORAGE_KEY = `nit_goa_attendance_${safeBranch}_sem${safeSemester}`;
  const { config: themeConfig } = useTheme();

  // Initialize records from localStorage or defaults
  const [attendance, setAttendance] = useState<Record<string, AttendanceRecord>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }

    const initial: Record<string, AttendanceRecord> = {};
    Object.keys(courses).forEach((code) => {
      initial[code] = { attended: 0, total: 0 };
    });
    return initial;
  });

  // Re-sync whenever branch or semester changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setAttendance(JSON.parse(saved));
      } else {
        const initial: Record<string, AttendanceRecord> = {};
        Object.keys(courses).forEach((code) => {
          initial[code] = { attended: 0, total: 0 };
        });
        setAttendance(initial);
      }
    } catch (e) {
      console.error(e);
    }
  }, [STORAGE_KEY, courses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(attendance));
      window.dispatchEvent(
        new CustomEvent('nit_goa_attendance_updated', {
          detail: { storageKey: STORAGE_KEY, attendance },
        })
      );
    } catch (e) {
      console.error(e);
    }
  }, [attendance, STORAGE_KEY]);

  const updateAttendance = (code: string, attendedDelta: number, totalDelta: number) => {
    setAttendance((prev) => {
      const current = prev[code] || { attended: 0, total: 0 };
      const newAttended = Math.max(0, current.attended + attendedDelta);
      const newTotal = Math.max(newAttended, current.total + totalDelta);
      return {
        ...prev,
        [code]: { attended: newAttended, total: newTotal },
      };
    });
  };

  const markClassPresent = (code: string) => {
    updateAttendance(code, 1, 1);
  };

  const markClassAbsent = (code: string) => {
    updateAttendance(code, 0, 1);
  };

  const resetCourse = (code: string) => {
    setAttendance((prev) => ({
      ...prev,
      [code]: { attended: 0, total: 0 },
    }));
  };

  // Direct editing state for attendance values
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [editAttended, setEditAttended] = useState<number>(0);
  const [editTotal, setEditTotal] = useState<number>(0);

  const startEditing = (code: string) => {
    const current = attendance[code] || { attended: 0, total: 0 };
    setEditingCode(code);
    setEditAttended(current.attended);
    setEditTotal(current.total);
  };

  const saveDirectAttendance = (code: string) => {
    const safeAttended = Math.max(0, Number(editAttended) || 0);
    const safeTotal = Math.max(safeAttended, Number(editTotal) || 0);
    setAttendance((prev) => ({
      ...prev,
      [code]: { attended: safeAttended, total: safeTotal },
    }));
    setEditingCode(null);
  };

  // Filter out unselected elective
  const activeCodes = Object.keys(courses).filter((c) => {
    if (selectedElective === 'EE541' && c === 'EE545') return false;
    if (selectedElective === 'EE545' && c === 'EE541') return false;
    return true;
  });

  // Calculate semester aggregates
  const stats = useMemo(() => {
    let totalAttended = 0;
    let totalHeld = 0;
    let coursesBelow75 = 0;
    let coursesAbove75 = 0;

    activeCodes.forEach((code) => {
      const rec = attendance[code] || { attended: 0, total: 0 };
      totalAttended += rec.attended;
      totalHeld += rec.total;
      if (rec.total > 0) {
        const pct = (rec.attended / rec.total) * 100;
        if (pct < 75) coursesBelow75++;
        else coursesAbove75++;
      }
    });

    const overallPct = totalHeld > 0 ? (totalAttended / totalHeld) * 100 : 100;
    return {
      totalAttended,
      totalHeld,
      coursesBelow75,
      coursesAbove75,
      overallPct,
      isOverallSafe: overallPct >= 75,
    };
  }, [activeCodes, attendance]);

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                NIT Goa 75% Rule Compliance ({branch} Sem {semester})
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono border border-slate-200 dark:border-slate-700">
                Offline PWA Storage Active
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Subject-Wise Attendance Manager
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Calculate safe bunk allowances and required makeup classes to guarantee end-sem exam eligibility.
            </p>
          </div>

          {/* Quick Criteria Pill */}
          <div className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold mb-0.5">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>NIT Goa Master Policy</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Minimum <strong className="text-slate-900 dark:text-white">75.0%</strong> required. Shortage below 75% results in grade penalty or exam debarment.
            </p>
          </div>
        </div>

        {/* Global Summary KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4 pt-3.5 sm:mt-5 sm:pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-850 p-2.5 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">Overall Percentage</span>
            <div
              className={`text-lg sm:text-xl font-bold font-mono tabular-nums ${
                stats.totalHeld === 0
                  ? 'text-slate-500 dark:text-slate-400'
                  : stats.isOverallSafe
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400 font-black'
              }`}
            >
              {stats.totalHeld === 0 ? '100%' : `${stats.overallPct.toFixed(1)}%`}
            </div>
            <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Across all subjects</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-850 p-2.5 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">Classes Attended</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {stats.totalAttended} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ {stats.totalHeld}</span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Total sessions logged</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-850 p-2.5 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">Safe Subjects</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
              {stats.coursesAbove75}
            </div>
            <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">&ge; 75% attendance</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-850 p-2.5 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">At Risk / Shortage</span>
            <div
              className={`text-lg sm:text-xl font-bold font-mono tabular-nums ${
                stats.coursesBelow75 > 0 ? 'text-rose-600 dark:text-rose-400 font-black' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {stats.coursesBelow75}
            </div>
            <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Need attention (&lt;75%)</span>
          </div>
        </div>
      </div>

      {/* Course Attendance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeCodes.map((code) => {
          const course = courses[code];
          const record = attendance[code] || { attended: 0, total: 0 };
          const percentage = record.total > 0 ? (record.attended / record.total) * 100 : 100;
          const isSafe = percentage >= 75;
          const isMinor = code === 'CS300M';

          const safeBunks =
            record.total > 0 ? Math.floor((record.attended - 0.75 * record.total) / 0.75) : 0;

          const requiredClasses =
            record.total > 0 && !isSafe ? Math.ceil(3 * record.total - 4 * record.attended) : 0;

          return (
            <div
              key={code}
              className={`p-3.5 sm:p-5 rounded-xl border transition-all duration-150 ${
                isMinor
                  ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-850 shadow-2xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      {code}
                    </span>
                    {course?.teachingSlot && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
                        Slot {course.teachingSlot}
                      </span>
                    )}
                    {isMinor && (
                      <span className="text-[10px] px-2 py-0.2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded font-semibold border border-blue-200 dark:border-blue-700 flex items-center gap-1">
                        <Bookmark className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" /> CSE Minor
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[240px]">
                    {course?.name || code}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {course?.coordinator || 'Faculty Coordinator'}
                  </p>
                </div>

                {/* Percentage Badge */}
                <div className="text-right shrink-0">
                  <div
                    className={`text-xl font-mono font-black tabular-nums ${
                      record.total === 0 ? 'text-slate-500 dark:text-slate-400' : isSafe ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {record.total === 0 ? '100%' : `${percentage.toFixed(1)}%`}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                    {record.attended} / {record.total} attended
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden mb-3 border border-slate-200/80 dark:border-slate-700">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    record.total === 0
                      ? 'bg-slate-300 dark:bg-slate-600 w-full'
                      : isSafe
                      ? 'bg-emerald-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
                />
              </div>

              {/* Smart Bunk / Shortage Indicator Box */}
              <div className="rounded-lg mb-3.5 text-xs">
                {record.total === 0 ? (
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px] bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
                    <span>No classes conducted yet. Tap "+1 Present" as lectures start.</span>
                  </div>
                ) : isSafe ? (
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 text-[11px] bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="font-medium">
                      {safeBunks > 0 ? (
                        <>
                          Safe Margin: You can miss{' '}
                          <strong className="text-emerald-950 dark:text-emerald-100 font-bold underline decoration-emerald-500/50">
                            {safeBunks} more {safeBunks === 1 ? 'class' : 'classes'}
                          </strong>{' '}
                          and remain &ge; 75%.
                        </>
                      ) : (
                        'Borderline: Exactly at 75.0% cutoff (do not miss the next lecture).'
                      )}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-rose-800 dark:text-rose-200 text-[11px] bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-lg border border-rose-200 dark:border-rose-800/60 animate-in fade-in">
                    <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                    <span className="font-medium">
                      Shortage Warning: Attend next{' '}
                      <strong className="text-rose-950 dark:text-rose-100 font-bold underline decoration-rose-500/50">
                        {requiredClasses} {requiredClasses === 1 ? 'class' : 'classes'}
                      </strong>{' '}
                      consecutively to reach 75%.
                    </span>
                  </div>
                )}
              </div>

              {/* Direct Edit Mode vs Quick Action Buttons */}
              {editingCode === code ? (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 animate-in fade-in">
                  <div className="text-[11px] font-bold flex items-center justify-between text-blue-600 dark:text-blue-400">
                    <span>Edit Attendance Counts</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Attended &le; Total</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5 font-medium">Attended</label>
                      <input
                        type="number"
                        min="0"
                        value={editAttended}
                        onChange={(e) => setEditAttended(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 font-mono shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5 font-medium">Total Conducted</label>
                      <input
                        type="number"
                        min={editAttended}
                        value={editTotal}
                        onChange={(e) => setEditTotal(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 font-mono shadow-2xs"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => saveDirectAttendance(code)}
                      className="flex-1 min-h-[36px] px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Save Numbers</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingCode(null)}
                      className="min-h-[36px] px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition active:scale-95 border border-slate-200 dark:border-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 flex-1">
                    <button
                      type="button"
                      onClick={() => markClassPresent(code)}
                      className="min-h-[36px] flex-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 transition flex items-center justify-center gap-1.5 active:scale-98 shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                      <span>Present (+1)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => markClassAbsent(code)}
                      className="min-h-[36px] flex-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 transition flex items-center justify-center gap-1.5 active:scale-98 shadow-2xs"
                    >
                      <Minus className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 stroke-[2.5]" />
                      <span>Absent (+1)</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditing(code)}
                      className="min-h-[36px] min-w-[36px] px-2 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition active:scale-95 border border-slate-200 dark:border-slate-700 shadow-2xs"
                      title="Directly edit attendance numbers"
                      aria-label={`Edit numbers for ${code}`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => resetCourse(code)}
                      className="min-h-[36px] min-w-[36px] px-2 flex items-center justify-center text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition active:scale-95 border border-slate-200 dark:border-slate-700 shadow-2xs"
                      title="Reset counter"
                      aria-label={`Reset attendance counter for ${code}`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
