import React, { useState, useEffect } from 'react';
import { Course } from '../data/timetableData';
import { CheckCircle2, AlertTriangle, Sparkles, Plus, Minus, RotateCcw, ShieldCheck, Pencil, Check, X } from 'lucide-react';

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

  // Initialize records from localStorage or defaults
  const [attendance, setAttendance] = useState<Record<string, AttendanceRecord>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }

    // Default starting state
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

  // Filter out the unselected elective if relevant
  const activeCodes = Object.keys(courses).filter((c) => {
    if (selectedElective === 'EE541' && c === 'EE545') return false;
    if (selectedElective === 'EE545' && c === 'EE541') return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                NIT Goa 75% Rule Compliance ({branch} Sem {semester})
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Subject-Wise Attendance Manager
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Data is saved offline automatically in your PWA. Track classes to prevent attendance shortages.
            </p>
          </div>

          <div className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-semibold">Criteria:</span> Minimum <strong className="text-white">75.0%</strong> required to appear in End-Semester Examinations.
          </div>
        </div>
      </div>

      {/* Course Attendance List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeCodes.map((code) => {
          const course = courses[code];
          const record = attendance[code] || { attended: 0, total: 0 };
          const percentage = record.total > 0 ? (record.attended / record.total) * 100 : 100;
          const isSafe = percentage >= 75;
          const isMinor = code === 'CS300M';

          // Bunk / Makeup calculation
          const safeBunks =
            record.total > 0 ? Math.floor((record.attended - 0.75 * record.total) / 0.75) : 0;

          const requiredClasses =
            record.total > 0 && !isSafe ? Math.ceil(3 * record.total - 4 * record.attended) : 0;

          return (
            <div
              key={code}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isMinor
                  ? 'bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-850 border-cyan-500/50'
                  : 'bg-slate-800/50 border-slate-700/70'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${isMinor ? 'text-cyan-300' : 'text-amber-400'}`}>
                      {code}
                    </span>
                    {isMinor && (
                      <span className="text-[10px] px-2 py-0.2 bg-cyan-500/20 text-cyan-300 rounded-md font-semibold border border-cyan-500/30 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> CSE Minor
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-white mt-0.5 truncate max-w-[220px]">
                    {course?.name || code}
                  </h4>
                </div>

                {/* Percentage Pill */}
                <div className="text-right">
                  <div
                    className={`text-lg font-mono font-bold ${
                      record.total === 0 ? 'text-slate-400' : isSafe ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {record.total === 0 ? '100%' : `${percentage.toFixed(1)}%`}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {record.attended} / {record.total} attended
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden mb-3 border border-slate-800">
                <div
                  className={`h-full transition-all duration-300 ${
                    record.total === 0
                      ? 'bg-slate-600 w-full'
                      : isSafe
                      ? 'bg-emerald-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
                />
              </div>

              {/* Status Note */}
              <div className="text-xs mb-4 min-h-[22px] flex items-center">
                {record.total === 0 ? (
                  <span className="text-slate-500 text-[11px]">No classes logged yet</span>
                ) : isSafe ? (
                  <span className="text-emerald-400 text-[11px] flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {safeBunks > 0
                      ? `On track: You can safely miss ${safeBunks} more ${safeBunks === 1 ? 'class' : 'classes'}`
                      : 'On track: Exactly at cutoff (cannot miss next class)'}
                  </span>
                ) : (
                  <span className="text-rose-400 text-[11px] flex items-center gap-1.5 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Shortage: Attend next {requiredClasses} {requiredClasses === 1 ? 'class' : 'classes'} consecutively to reach 75%
                  </span>
                )}
              </div>

              {/* Direct Edit Mode or Quick Action Buttons */}
              {editingCode === code ? (
                <div className="pt-3 border-t border-slate-800/80 space-y-2 animate-in fade-in">
                  <div className="text-[11px] font-bold text-amber-400 flex items-center justify-between">
                    <span>Direct Edit Class Counts</span>
                    <span className="text-[10px] text-slate-400 font-normal">Attended ≤ Total</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Attended</label>
                      <input
                        type="number"
                        min="0"
                        value={editAttended}
                        onChange={(e) => setEditAttended(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Total Held</label>
                      <input
                        type="number"
                        min={editAttended}
                        value={editTotal}
                        onChange={(e) => setEditTotal(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => saveDirectAttendance(code)}
                      className="flex-1 min-h-[36px] px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Save Numbers</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingCode(null)}
                      className="min-h-[36px] px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 flex-1">
                    <button
                      type="button"
                      onClick={() => markClassPresent(code)}
                      className="min-h-[44px] flex-1 px-3 py-2.5 text-xs font-bold rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 text-emerald-300 border border-emerald-500/30 transition flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Present (+1)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => markClassAbsent(code)}
                      className="min-h-[44px] flex-1 px-3 py-2.5 text-xs font-bold rounded-xl bg-rose-500/20 hover:bg-rose-500/30 active:bg-rose-500/40 text-rose-300 border border-rose-500/30 transition flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                      <span>Absent (+1)</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditing(code)}
                      className="min-h-[44px] min-w-[40px] px-2 flex items-center justify-center text-slate-400 hover:text-amber-300 rounded-xl hover:bg-slate-800 transition active:scale-95 border border-transparent hover:border-slate-700"
                      title="Directly edit attendance numbers"
                      aria-label={`Edit numbers for ${code}`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => resetCourse(code)}
                      className="min-h-[44px] min-w-[40px] px-2 flex items-center justify-center text-slate-500 hover:text-rose-300 rounded-xl hover:bg-slate-800 transition active:scale-95"
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
