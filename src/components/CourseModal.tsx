import React from 'react';
import { COURSES, Course } from '../data/timetableData';
import { getAllKnownCourses } from '../data/branchesData';
import { getOfficialCourseSyllabus } from '../data/officialSyllabusRegistry';
import { X, BookOpen, Clock, MapPin, Award, User, Mail, Sparkles, CheckCircle2, Globe, FileText, ExternalLink, Calendar, Download, Bookmark } from 'lucide-react';
import { EmbeddedPdfViewer } from './EmbeddedPdfViewer';

interface CourseModalProps {
  courseCode: string | null;
  courses?: Record<string, Course>;
  onClose: () => void;
  onTrackAttendance?: (courseCode: string) => void;
  onScheduleTest?: (courseCode: string) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  courseCode,
  courses,
  onClose,
  onTrackAttendance,
  onScheduleTest,
}) => {
  if (!courseCode) return null;

  const allKnown = getAllKnownCourses();
  const officialSyllabus = getOfficialCourseSyllabus(courseCode);

  const courseBase: Course =
    courses?.[courseCode] ||
    allKnown[courseCode] ||
    COURSES[courseCode] || {
      code: courseCode,
      name: officialSyllabus?.name || `Course ${courseCode}`,
      type: (courseCode.includes('Lab') || officialSyllabus?.name.toLowerCase().includes('lab')) ? 'Lab' : 'Theory',
      credits: officialSyllabus?.credits || 3,
      ltp: officialSyllabus?.ltp || '3-0-0',
      teachingSlot: 'Core',
      examSlot: 'Core',
      coordinator: 'Faculty Coordinator',
      shortName: 'FC',
      room: 'Lecture Hall',
      category: 'core',
      notes: 'Course details retrieved from academic curriculum.',
    };

  // Combine static and official registry details - Accredited official syllabus takes precedence
  const effectiveCredits = officialSyllabus?.credits || courseBase.credits || 3;
  const effectiveLtp = officialSyllabus?.ltp || (courseBase.ltp && courseBase.ltp !== '3-0-0' ? courseBase.ltp : '3-0-0');
  const effectiveModules = (officialSyllabus?.modules && officialSyllabus.modules.length > 0) 
    ? officialSyllabus.modules 
    : (courseBase.modules || []);
  const effectiveTextbooks = (officialSyllabus?.textbooks && officialSyllabus.textbooks.length > 0) 
    ? officialSyllabus.textbooks 
    : (courseBase.textbooks || []);

  const course: Course = {
    ...courseBase,
    name: courseBase.name && !courseBase.name.startsWith('Course ') ? courseBase.name : (officialSyllabus?.name || courseBase.name),
    credits: effectiveCredits,
    ltp: effectiveLtp,
    modules: effectiveModules,
    textbooks: effectiveTextbooks,
  };

  const isMinor = course.isMinor || courseCode === 'CS300M';
  const [viewTab, setViewTab] = React.useState<'details' | 'pdf'>('details');

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full ${viewTab === 'pdf' ? 'max-w-6xl h-[92vh] max-h-[96vh]' : 'max-w-lg max-h-[94vh]'} bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-200 animate-in slide-in-from-bottom duration-200`}
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

        {/* In-App Tab Selector (Overview vs Official Embedded PDF) */}
        {officialSyllabus?.pdfPath && (
          <div className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-slate-900 border-b border-slate-800 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => setViewTab('details')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95 ${
                viewTab === 'details'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Course Details & Modules</span>
            </button>
            <button
              type="button"
              onClick={() => setViewTab('pdf')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95 ${
                viewTab === 'pdf'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800/80 text-amber-300 hover:text-amber-200 hover:bg-slate-800 border border-amber-500/30'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Official Embedded PDF Handbook</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono hidden sm:inline">
                Inside Webapp
              </span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        {viewTab === 'pdf' && officialSyllabus?.pdfPath ? (
          <div className="flex-1 w-full h-full min-h-0 flex flex-col overflow-hidden">
            <EmbeddedPdfViewer
              pdfUrl={officialSyllabus.pdfPath}
              pdfFileName={officialSyllabus.pdfName}
              title={`${course.code}: ${course.name} - NIT Goa Official Syllabus`}
              sourceUrl={officialSyllabus.sourceUrl}
              courseModules={officialSyllabus.modules}
              courseCode={course.code}
              onClose={() => setViewTab('details')}
              className="rounded-none border-0 h-full"
            />
          </div>
        ) : (
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

          {/* Official Accreditation Badge */}
          {officialSyllabus && (
            <div className="p-3.5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      NIT Goa Accredited Syllabus
                    </div>
                    <div className="text-xs text-slate-300 truncate font-medium">
                      {officialSyllabus.branch === 'COMMON' || officialSyllabus.pdfName.includes('FIRST')
                        ? '1st Year Handbook (All Sections A, B, C, D)'
                        : `${officialSyllabus.branch} Handbook (2nd, 3rd & 4th Years)`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewTab('pdf')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-xs"
                    title="Read official embedded PDF handbook inside webapp"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Read Embedded PDF</span>
                  </button>
                  {officialSyllabus.sourceUrl && (
                    <a
                      href={officialSyllabus.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                      title="Open official PDF on NIT Goa website (nitgoa.ac.in)"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-1.5 flex items-center justify-between">
                <span className="font-mono text-slate-400">File: {officialSyllabus.pdfName}</span>
                <span className="text-amber-300/80 font-mono">Credits: {effectiveCredits} | LTP: {effectiveLtp}</span>
              </div>
            </div>
          )}

          {/* Syllabus Modules */}
          {course.modules && course.modules.length > 0 && (
            <div className="border-t border-slate-800 pt-4">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Syllabus Breakdown (Official Curriculum Scheme)
              </h4>
              <div className="space-y-2">
                {course.modules.map((mod, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200 leading-relaxed space-y-1">
                    <div className="font-semibold text-amber-300 flex items-center gap-1.5 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{mod.includes(':') ? mod.split(':')[0] : `Unit / Module ${idx + 1}`}</span>
                    </div>
                    <div className="text-slate-300 pl-3">
                      {mod.includes(':') ? mod.substring(mod.indexOf(':') + 1).trim() : mod}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Course Objectives */}
          {officialSyllabus?.objectives && officialSyllabus.objectives.length > 0 && (
            <div className="border-t border-slate-800 pt-4">
              <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Course Objectives
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {officialSyllabus.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-800/30 p-2 rounded-lg border border-slate-800/60">
                    <span className="text-cyan-400 font-mono font-bold">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Course Outcomes */}
          {officialSyllabus?.outcomes && officialSyllabus.outcomes.length > 0 && (
            <div className="border-t border-slate-800 pt-4">
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Course Outcomes (COs)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {officialSyllabus.outcomes.map((co, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-800/30 p-2 rounded-lg border border-slate-800/60">
                    <span className="text-emerald-400 font-mono font-bold">CO{idx + 1}:</span>
                    <span>{co}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Textbooks */}
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
      )}

        {/* Modal Footer */}
        <div className="p-4 bg-slate-800/80 border-t border-slate-800 flex items-center justify-between gap-2 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
          <span className="text-xs text-slate-400 hidden sm:inline">
            NIT Goa Academic Curriculum
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
            {onScheduleTest && (
              <button
                type="button"
                onClick={() => {
                  onScheduleTest(course.code);
                  onClose();
                }}
                className="min-h-[44px] flex-1 sm:flex-initial px-4 py-2.5 text-xs font-semibold rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Schedule Test</span>
              </button>
            )}
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
