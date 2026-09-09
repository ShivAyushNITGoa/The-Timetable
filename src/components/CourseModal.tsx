import React from 'react';
import { COURSES, Course } from '../data/timetableData';
import { getAllKnownCourses } from '../data/branchesData';
import { X, BookOpen, Clock, MapPin, Award, User, Mail, Sparkles, CheckCircle2, Globe, FileText, ExternalLink } from 'lucide-react';

interface CourseModalProps {
  courseCode: string | null;
  courses?: Record<string, Course>;
  onClose: () => void;
  onTrackAttendance?: (courseCode: string) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  courseCode,
  courses,
  onClose,
  onTrackAttendance,
}) => {
  if (!courseCode) return null;

  const allKnown = getAllKnownCourses();
  const course: Course =
    courses?.[courseCode] ||
    allKnown[courseCode] ||
    COURSES[courseCode] || {
      code: courseCode,
      name: `Course ${courseCode}`,
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'Core',
      examSlot: 'Core',
      coordinator: 'Faculty Coordinator',
      shortName: 'FC',
      room: 'Lecture Hall',
      category: 'core',
      notes: 'Course details retrieved from academic curriculum.',
    };

  const isMinor = course.isMinor || courseCode === 'CS300M';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`p-5 sm:p-6 border-b shrink-0 ${isMinor ? 'bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/60 border-cyan-500/30' : 'bg-slate-800/60 border-slate-700/60'}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-md uppercase tracking-wider ${
                  isMinor 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs shadow-cyan-500/10' 
                    : course.category === 'core' 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                    : course.category === 'elective'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : course.category === 'lab'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-700 text-slate-300'
                }`}>
                  {isMinor ? 'CSE Minor Special' : course.type}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  {course.credits} {course.credits === 1 ? 'Credit' : 'Credits'} (L-T-P: {course.ltp})
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>{course.code}</span>
                <span className="text-slate-400 font-normal">|</span>
                <span className={isMinor ? 'text-cyan-300' : 'text-slate-100'}>{course.name}</span>
              </h3>
            </div>
            <button 
              type="button"
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition active:scale-95 shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {isMinor && (
            <div className="p-3.5 bg-cyan-950/40 border border-cyan-500/30 rounded-xl flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-200">
                <strong className="text-cyan-300 font-semibold block text-sm mb-0.5">Computer Science Minor Course</strong>
                This course is coordinated by the CSE Department specifically for students pursuing Minor in CSE. 
                All classes are conducted during the dedicated Institute Minor Slot (Slot G).
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-800/40 border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Teaching Slot
              </div>
              <div className="text-sm font-semibold text-slate-200">
                Slot {course.teachingSlot}
              </div>
            </div>

            <div className="p-3 bg-slate-800/40 border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                Exam Slot
              </div>
              <div className="text-sm font-semibold text-slate-200">
                Slot {course.examSlot}
              </div>
            </div>

            <div className="p-3 bg-slate-800/40 border border-slate-800 rounded-xl col-span-2">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Classroom / Venue
              </div>
              <div className="text-sm font-medium text-slate-200">
                {course.room}
              </div>
            </div>

            <div className="p-3.5 bg-slate-800/40 border border-slate-800 rounded-xl col-span-2 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  Course Coordinator & Faculty
                </div>
                <div className="flex items-center gap-2">
                  {course.facultyWebsite && (
                    <a 
                      href={course.facultyWebsite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[11px] flex items-center gap-1 text-cyan-400 hover:text-cyan-300 hover:underline bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40"
                    >
                      <Globe className="w-3 h-3" /> Profile <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                  {course.facultyScholar && (
                    <a 
                      href={course.facultyScholar} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[11px] flex items-center gap-1 text-indigo-300 hover:text-indigo-200 hover:underline bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-800/40"
                    >
                      Scholar <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                {course.coordinator} <span className="text-xs font-mono text-slate-400 font-normal">({course.shortName})</span>
              </div>

              {course.facultyDesignation && (
                <div className="text-xs text-amber-400 font-medium">
                  {course.facultyDesignation}
                </div>
              )}

              {course.email && (
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${course.email}`} className="text-cyan-400 hover:underline font-mono">
                    {course.email}
                  </a>
                </div>
              )}

              {course.facultyResearch && (
                <div className="text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80 leading-relaxed">
                  <span className="text-amber-400/90 font-medium">Research Areas: </span> {course.facultyResearch}
                </div>
              )}

              {course.patents && course.patents.length > 0 && (
                <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
                  <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3 h-3" /> Granted Patent
                  </div>
                  <ul className="text-[11px] text-emerald-200/90 space-y-1">
                    {course.patents.map((pat, pIdx) => (
                      <li key={pIdx}>• {pat}</li>
                    ))}
                  </ul>
                </div>
              )}

              {course.papers && course.papers.length > 0 && (
                <div className="p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-800/30 space-y-1.5">
                  <div className="text-[11px] font-semibold text-indigo-300 flex items-center gap-1.5">
                    <FileText className="w-3 h-3 text-indigo-400" /> Key Research Publications
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1">
                    {course.papers.map((paper, paperIdx) => (
                      <li key={paperIdx} className="leading-snug">
                        <span className="text-indigo-400 font-mono mr-1">•</span>
                        {paper}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Syllabus Modules */}
          {course.modules && course.modules.length > 0 && (
            <div className="border-t border-slate-800 pt-4">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Syllabus Breakdown
              </h4>
              <div className="space-y-2">
                {course.modules.map((mod, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    {mod}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Textbooks & References */}
          {course.textbooks && course.textbooks.length > 0 && (
            <div className="border-t border-slate-800 pt-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-indigo-400" /> Prescribed Textbooks & References
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {course.textbooks.map((tb, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-800/30 p-2 rounded-lg border border-slate-800/60">
                    <span className="text-amber-400 font-mono font-bold">•</span>
                    <span>{tb}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Schedule Occurrences */}
          <div className="border-t border-slate-800 pt-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Weekly Lecture Hours
            </h4>
            <div className="space-y-1.5 text-xs">
              {courseCode === 'CS300M' && (
                <>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Tuesday</span>
                    <span className="text-cyan-300">12:00 – 12:55 (Room 74/75)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Wednesday</span>
                    <span className="text-cyan-300">14:00 – 14:55 (Room 56/57)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Friday</span>
                    <span className="text-cyan-300">14:00 – 14:55 (Room 56/57)</span>
                  </div>
                </>
              )}
              {courseCode === 'EE300' && (
                <>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Monday</span>
                    <span>11:00 – 11:55 (Room 51/52)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Wednesday</span>
                    <span>10:00 – 10:55 (Room 51/52)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Friday</span>
                    <span>09:00 – 09:55 (Room 51/52)</span>
                  </div>
                </>
              )}
              {courseCode === 'EE301' && (
                <>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Monday</span>
                    <span>10:00 – 10:55 (Room 51/52)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Wednesday</span>
                    <span>09:00 – 09:55 (Room 51/52)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Thursday</span>
                    <span>11:00 – 11:55 (Room 51/52)</span>
                  </div>
                </>
              )}
              {courseCode === 'EE302' && (
                <>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Tuesday</span>
                    <span>09:00 – 09:55 (Room 51/52)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Wednesday</span>
                    <span>12:00 – 12:55 (Room 51/52)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Wednesday (Tutorial)</span>
                    <span>16:00 – 16:55 (Room 51/52)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Friday</span>
                    <span>11:00 – 11:55 (Room 51/52)</span>
                  </div>
                </>
              )}
              {courseCode === 'EE303' && (
                <>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Monday</span>
                    <span>09:00 – 09:55 (Room 51/52)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Tuesday</span>
                    <span>11:00 – 11:55 (Room 51/52)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Thursday</span>
                    <span>10:00 – 10:55 (Room 51/52)</span>
                  </div>
                </>
              )}
              {courseCode === 'EE530' && (
                <>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Monday</span>
                    <span>12:00 – 12:55 (Room 51/52)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Wednesday</span>
                    <span>11:00 – 11:55 (Room 51/52)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Friday</span>
                    <span>10:00 – 10:55 (Room 51/52)</span>
                  </div>
                </>
              )}
              {(courseCode === 'EE541' || courseCode === 'EE545') && (
                <>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Tuesday</span>
                    <span>10:00 – 10:55 (Room 51/52)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Thursday</span>
                    <span>09:00 – 09:55 (Room 51/52)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                    <span className="font-medium text-white">Friday</span>
                    <span>12:00 – 12:55 (Room 51/52)</span>
                  </div>
                </>
              )}
              {courseCode === 'ES300' && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                  <span className="font-medium text-white">Friday (MLC)</span>
                  <span>16:00 – 16:55 (Room 70/71)</span>
                </div>
              )}
              {courseCode === 'EE304' && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                  <span className="font-medium text-white">Thursday Lab</span>
                  <span>14:00 – 16:55 (Workshop Complex)</span>
                </div>
              )}
              {(courseCode === 'EE305' || courseCode === 'EE306') && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 text-slate-300">
                  <span className="font-medium text-white">Monday / Tuesday (by Batch)</span>
                  <span>14:00 – 16:55 (Abdul Kalam Complex)</span>
                </div>
              )}
            </div>
          </div>

          {course.notes && (
            <div className="text-xs text-slate-400 bg-slate-800/30 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-300 font-semibold">Note:</span> {course.notes}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {/* Modal Footer */}
        <div className="p-4 bg-slate-800/80 border-t border-slate-800 flex items-center justify-between gap-2 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <span className="text-xs text-slate-400 hidden sm:inline">
            NIT Goa Academic Curriculum
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {onTrackAttendance && (
              <button
                type="button"
                onClick={() => {
                  onTrackAttendance(course.code);
                  onClose();
                }}
                className="min-h-[44px] flex-1 sm:flex-initial px-4 py-2.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center gap-1.5 active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Track Attendance</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-6 py-2.5 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-md active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
