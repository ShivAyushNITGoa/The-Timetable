import React from 'react';
import { Course } from '../data/timetableData';
import { Award, Sparkles, Calendar, Clock, AlertCircle } from 'lucide-react';

interface ExamScheduleViewProps {
  courses: Record<string, Course>;
  selectedElective: string;
  onOpenCourseModal: (courseCode: string) => void;
  branch?: string;
  semester?: number;
}

export const ExamScheduleView: React.FC<ExamScheduleViewProps> = ({
  courses,
  selectedElective,
  onOpenCourseModal,
  branch = 'EEE',
  semester = 5,
}) => {
  // Sort courses by examSlot
  const courseList = (Object.values(courses) as Course[]).filter((c) => {
    // Filter elective if needed
    if (selectedElective === 'EE541' && c.code === 'EE545') return false;
    if (selectedElective === 'EE545' && c.code === 'EE541') return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                Institute Slot-Wise Exam Scheme
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {branch} Semester {semester} Examination Slots
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Mid-Semester and End-Semester exams follow these institute master slots without time clashes.
            </p>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300">
            <span className="text-blue-400 font-semibold">Master Policy:</span> Slot G is designated for Minor courses, guaranteeing no clash with department slots A–F.
          </div>
        </div>
      </div>

      {/* Exam Slots Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courseList.map((course) => {
          const isMinor = course.isMinor || course.code === 'CS300M';

          return (
            <div
              key={course.code}
              onClick={() => onOpenCourseModal(course.code)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer hover:-translate-y-0.5 ${
                isMinor
                  ? 'bg-gradient-to-br from-cyan-950/60 via-slate-900 to-indigo-950/40 border-cyan-500/50 shadow-md shadow-cyan-500/10 hover:border-cyan-400'
                  : 'bg-slate-800/50 border-slate-700/70 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`px-2.5 py-0.5 text-xs font-bold rounded-md ${
                    isMinor
                      ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50 shadow-xs'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}
                >
                  Exam Slot {course.examSlot || 'A'}
                </span>

                <span className="text-xs font-mono text-slate-400">
                  {course.credits} Credits ({course.ltp})
                </span>
              </div>

              <div className="mt-2">
                <h3 className={`text-base font-bold flex items-center gap-2 ${isMinor ? 'text-cyan-200' : 'text-white'}`}>
                  <span>{course.code}</span>
                  <span className="text-slate-500">•</span>
                  <span>{course.name}</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Coordinator: <strong className="text-slate-100">{course.coordinator} ({course.shortName})</strong>
                </p>
                <div className="text-xs text-slate-400 mt-1">
                  Venue: {course.room}
                </div>
              </div>

              {isMinor && (
                <div className="mt-3 p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-[11px] text-cyan-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Exam conducted in Minor Slot G by CSE Department</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
