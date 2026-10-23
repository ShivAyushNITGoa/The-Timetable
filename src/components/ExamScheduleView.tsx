import React from 'react';
import { Course } from '../data/timetableData';
import { Award, BookOpen } from 'lucide-react';

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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                Institute Slot-Wise Exam Scheme
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {branch} Semester {semester} Examination Slots
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Mid-Semester and End-Semester exams follow these institute master slots without time clashes.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 sm:max-w-xs">
            <span className="text-blue-600 dark:text-blue-400 font-semibold">Master Policy:</span> Slot G is designated for Minor courses, guaranteeing no clash with department slots A–F.
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
              className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer hover:shadow-xs shadow-2xs ${
                isMinor
                  ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-850 hover:border-blue-300 dark:hover:border-blue-700'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`px-2.5 py-0.5 text-xs font-bold rounded-md ${
                    isMinor
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Exam Slot {course.examSlot || 'A'}
                </span>

                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {course.credits} Credits ({course.ltp})
                </span>
              </div>

              <div className="mt-2">
                <h3 className="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  <span>{course.code}</span>
                  <span className="text-slate-300 dark:text-slate-600 font-normal">·</span>
                  <span className="text-slate-800 dark:text-slate-200">{course.name}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Coordinator: <strong className="text-slate-800 dark:text-slate-200">{course.coordinator} ({course.shortName})</strong>
                </p>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Venue: {course.room}
                </div>
              </div>

              {isMinor && (
                <div className="mt-3 p-2 rounded-lg bg-blue-100/60 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 text-[11px] text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
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
