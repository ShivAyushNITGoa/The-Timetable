import React from 'react';
import { COURSES, Course } from '../data/timetableData';
import { getAllKnownCourses } from '../data/branchesData';
import { getOfficialCourseSyllabus } from '../data/officialSyllabusRegistry';
import {
  X,
  BookOpen,
  Clock,
  MapPin,
  Award,
  User,
  Mail,
  Sparkles,
  CheckCircle2,
  Globe,
  FileText,
  ExternalLink,
  Calendar,
  Download,
  Bookmark,
  CheckSquare,
  Plus,
  Trash2,
  Check,
  AlertCircle,
} from 'lucide-react';
import { EmbeddedPdfViewer } from './EmbeddedPdfViewer';

interface CourseTask {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
}

interface CourseModalProps {
  courseCode: string | null;
  courses?: Record<string, Course>;
  branch?: string;
  semester?: number;
  onClose: () => void;
  onTrackAttendance?: (courseCode: string) => void;
  onScheduleTest?: (courseCode: string) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  courseCode,
  courses,
  branch,
  semester,
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

  // Attendance state & sync
  const attendanceKey = branch && semester ? `nit_goa_attendance_${branch}_sem${semester}` : `nit_goa_attendance_default`;
  const [attendance, setAttendance] = React.useState<{ attended: number; total: number }>({ attended: 0, total: 0 });

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(attendanceKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed[courseCode]) {
          setAttendance(parsed[courseCode]);
        }
      }
    } catch {
      // ignore
    }
  }, [attendanceKey, courseCode]);

  const updateAttendance = (newAttended: number, newTotal: number) => {
    const validAttended = Math.max(0, newAttended);
    const validTotal = Math.max(0, newTotal);
    setAttendance({ attended: validAttended, total: validTotal });

    try {
      const stored = localStorage.getItem(attendanceKey);
      const parsed = stored ? JSON.parse(stored) : {};
      parsed[courseCode] = { attended: validAttended, total: validTotal };
      localStorage.setItem(attendanceKey, JSON.stringify(parsed));
      window.dispatchEvent(
        new CustomEvent('nit_goa_attendance_updated', {
          detail: { branch, semester, courseCode, attended: validAttended, total: validTotal },
        })
      );
    } catch {
      // ignore
    }
  };

  // Personal study tasks & notes state
  const taskKey = `nit_goa_tasks_${courseCode}`;
  const [tasks, setTasks] = React.useState<CourseTask[]>(() => {
    try {
      const saved = localStorage.getItem(taskKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [newTaskInput, setNewTaskInput] = React.useState('');

  const handleAddTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newTaskInput.trim();
    if (!trimmed) return;
    const newTask: CourseTask = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      text: trimmed,
      done: false,
      createdAt: new Date().toLocaleDateString(),
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    setNewTaskInput('');
    try {
      localStorage.setItem(taskKey, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleToggleTask = (id: string) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    setTasks(updated);
    try {
      localStorage.setItem(taskKey, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    try {
      localStorage.setItem(taskKey, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const attendancePct = attendance.total > 0 ? Math.round((attendance.attended / attendance.total) * 100) : null;
  const safeBunks = attendance.total > 0 ? Math.floor((attendance.attended - 0.75 * attendance.total) / 0.75) : 0;
  const neededClasses =
    attendance.total > 0 && attendancePct !== null && attendancePct < 75
      ? Math.ceil((0.75 * attendance.total - attendance.attended) / 0.25)
      : 0;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center ${viewTab === 'pdf' ? 'p-0 sm:p-3 md:p-4' : 'p-0 sm:p-4'} bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200`}
      onClick={onClose}
    >
      <div 
        className={`relative w-full ${
          viewTab === 'pdf'
            ? 'w-full h-full sm:h-[95vh] max-h-none sm:max-h-[96vh] sm:max-w-6xl rounded-none sm:rounded-2xl border-0 sm:border border-slate-700/80 shadow-2xl'
            : 'max-w-lg max-h-[94vh] rounded-t-3xl sm:rounded-3xl border border-slate-700/80 shadow-2xl'
        } bg-slate-900 overflow-hidden flex flex-col transition-all duration-200 animate-in slide-in-from-bottom duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        {viewTab === 'pdf' ? (
          <div className="px-4 py-2.5 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/25 shrink-0">
                {course.code}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white truncate">
                {course.name}
              </span>
              <span className="text-[11px] text-slate-400 hidden md:inline">
                • Slot {course.teachingSlot} ({course.room})
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setViewTab('details')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5 active:scale-95"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Overview Details</span>
                <span className="sm:hidden">Details</span>
              </button>
              <button 
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition active:scale-95 shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className={`p-5 sm:p-6 border-b shrink-0 ${isMinor ? 'bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/60 border-cyan-500/30' : 'bg-slate-800/60 border-slate-700/60'}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-md uppercase tracking-wider ${
                    isMinor 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs shadow-cyan-500/10' 
                      : course.category === 'core' 
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
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
        )}

        {/* In-App Tab Selector (Overview vs Official Embedded PDF) - Only show in details mode */}
        {officialSyllabus?.pdfPath && viewTab === 'details' && (
          <div className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-slate-900 border-b border-slate-800 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => setViewTab('details')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95 ${
                viewTab === 'details'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Course Details & Modules</span>
            </button>
            <button
              type="button"
              onClick={() => setViewTab('pdf')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95 bg-slate-800/80 text-blue-300 hover:text-blue-200 hover:bg-slate-800 border border-blue-500/30"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Official Embedded PDF Handbook</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-mono hidden sm:inline">
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
                <Clock className="w-3.5 h-3.5 text-blue-400" />
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
                <div className="text-xs text-blue-400 font-medium">
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
                  <span className="text-blue-400/90 font-medium">Research Areas: </span> {course.facultyResearch}
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
                    <FileText className="w-3.5 h-3.5 text-indigo-400" /> Key Research Publications
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
            <div className="p-3.5 bg-gradient-to-r from-blue-900/20 via-slate-900 to-indigo-950/30 border border-blue-500/30 rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                      NIT Goa Accredited Syllabus
                    </div>
                    <div className="text-xs text-slate-300 font-medium">
                      {officialSyllabus.branch === 'COMMON' || officialSyllabus.pdfName.includes('FIRST')
                        ? '1st Year Handbook (All Sections A, B, C, D)'
                        : `${officialSyllabus.branch} Handbook (2nd, 3rd & 4th Years)`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewTab('pdf')}
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-xs whitespace-nowrap"
                    title="Read official embedded PDF handbook inside webapp"
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span>Read Embedded PDF</span>
                  </button>
                  {officialSyllabus.sourceUrl && (
                    <a
                      href={officialSyllabus.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition shrink-0"
                      title="Open official PDF on NIT Goa website (nitgoa.ac.in)"
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  )}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-slate-400 truncate">File: {officialSyllabus.pdfName}</span>
                <span className="text-blue-300/80 font-mono shrink-0">Credits: {effectiveCredits} | LTP: {effectiveLtp}</span>
              </div>
            </div>
          )}

          {/* Syllabus Modules */}
          {course.modules && course.modules.length > 0 && (
            <div className="border-t border-slate-800 pt-4">
              <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" /> Syllabus Breakdown (Official Curriculum Scheme)
              </h4>
              <div className="space-y-2">
                {course.modules.map((mod, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200 leading-relaxed space-y-1">
                    <div className="font-semibold text-blue-300 flex items-center gap-1.5 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
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

          {/* Quick Attendance Card */}
          <div className="p-4 bg-slate-800/50 border border-slate-700/70 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white">Course Attendance</h4>
              </div>
              <span
                className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                  attendancePct === null
                    ? 'bg-slate-800 text-slate-400'
                    : attendancePct >= 75
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : attendancePct >= 65
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {attendancePct !== null ? `${attendancePct}%` : 'Not recorded'}
              </span>
            </div>

            {/* Attendance Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  Classes Attended: <strong className="text-white">{attendance.attended}</strong> / {attendance.total}
                </span>
                <span className="font-semibold text-slate-300">Target: 75%</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-300 ${
                    attendancePct === null
                      ? 'w-0'
                      : attendancePct >= 75
                      ? 'bg-emerald-500'
                      : attendancePct >= 65
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, attendancePct || 0)}%` }}
                />
              </div>
            </div>

            {/* Attendance Insight / Bunk Advice */}
            <div className="text-xs p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 flex items-center gap-2">
              {attendancePct === null ? (
                <span>Log your attendances below to track your 75% eligibility.</span>
              ) : attendancePct >= 75 ? (
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Safe zone! You can safely miss <strong>{safeBunks}</strong> upcoming {safeBunks === 1 ? 'class' : 'classes'} and stay above 75%.
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-rose-400 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Shortage warning! Attend the next <strong>{neededClasses}</strong> consecutive {neededClasses === 1 ? 'class' : 'classes'} to reach 75%.
                  </span>
                </div>
              )}
            </div>

            {/* Attendance Actions */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateAttendance(attendance.attended + 1, attendance.total + 1)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1 transition active:scale-95"
                  title="Record 1 class attended"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>+ Attended</span>
                </button>
                <button
                  type="button"
                  onClick={() => updateAttendance(attendance.attended, attendance.total + 1)}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 active:bg-rose-500/40 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1 transition active:scale-95"
                  title="Record 1 class missed"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>+ Missed</span>
                </button>
              </div>

              {attendance.total > 0 && (
                <button
                  type="button"
                  onClick={() => updateAttendance(0, 0)}
                  className="text-[11px] text-slate-500 hover:text-rose-400 transition"
                  title="Reset attendance for this course"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Personal Course Tasks & Study Notes */}
          <div className="p-4 bg-slate-800/50 border border-slate-700/70 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-indigo-400" />
                <h4 className="text-sm font-bold text-white">Study Tasks & Deadlines</h4>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {tasks.filter((t) => t.done).length}/{tasks.length} done
              </span>
            </div>

            {/* Add Task Input Form */}
            <form onSubmit={handleAddTask} className="flex items-center gap-2">
              <input
                type="text"
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                placeholder="Add assignment, viva prep, or reminder..."
                className="flex-1 bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!newTaskInput.trim()}
                className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1 transition active:scale-95 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>

            {/* Task List */}
            {tasks.length > 0 ? (
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-2 text-xs"
                  >
                    <button
                      type="button"
                      onClick={() => handleToggleTask(task.id)}
                      className="flex items-center gap-2 min-w-0 text-left flex-1"
                    >
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition ${
                          task.done
                            ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                            : 'border-slate-600 hover:border-blue-400'
                        }`}
                      >
                        {task.done && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={`truncate ${task.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {task.text}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded transition shrink-0"
                      title="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 italic">
                No active tasks logged yet for this course. Add lab submissions, viva reminders, or reading notes above!
              </p>
            )}
          </div>

          {/* External Study Help & Tools for this Course */}
          <div className="p-4 bg-slate-800/40 border border-slate-700/60 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Course Study Help & External Tools
                </h4>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">External Portals</span>
            </div>

            <p className="text-xs text-slate-300">
              One-click access to curated video lectures, research papers, and interactive simulators for <strong className="text-white">{course.name}</strong>:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              <a
                href={`https://nptel.ac.in/courses?keyword=${encodeURIComponent(course.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-between gap-1.5 transition group active:scale-95"
                title="Search NPTEL / SWAYAM video lectures by IIT & IISc faculty"
              >
                <div className="truncate">
                  <span className="text-[10px] text-emerald-400 block font-mono font-bold">NPTEL</span>
                  <span className="truncate block font-semibold">Video Lectures</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-300 shrink-0" />
              </a>

              <a
                href={`https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=${encodeURIComponent(course.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-between gap-1.5 transition group active:scale-95"
                title="Search IEEE Xplore digital library publications"
              >
                <div className="truncate">
                  <span className="text-[10px] text-blue-400 block font-mono font-bold">IEEE Xplore</span>
                  <span className="truncate block font-semibold">Research Papers</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-300 shrink-0" />
              </a>

              <a
                href={`https://www.wolframalpha.com/input?i=${encodeURIComponent(course.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-between gap-1.5 transition group active:scale-95"
                title="Wolfram Alpha computational knowledge engine"
              >
                <div className="truncate">
                  <span className="text-[10px] text-sky-400 block font-mono font-bold">Wolfram Alpha</span>
                  <span className="truncate block font-semibold">Math & Theory</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-300 shrink-0" />
              </a>

              <a
                href="https://www.vlab.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-between gap-1.5 transition group active:scale-95"
                title="Virtual Labs interactive simulations (Ministry of Education)"
              >
                <div className="truncate">
                  <span className="text-[10px] text-cyan-400 block font-mono font-bold">MHRD / MoE</span>
                  <span className="truncate block font-semibold">Virtual Labs</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 shrink-0" />
              </a>

              <a
                href={`https://scholar.google.com/scholar?q=${encodeURIComponent(course.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-between gap-1.5 transition group active:scale-95"
                title="Google Scholar citations and academic literature"
              >
                <div className="truncate">
                  <span className="text-[10px] text-indigo-400 block font-mono font-bold">Google</span>
                  <span className="truncate block font-semibold">Scholar Citations</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-300 shrink-0" />
              </a>

              <a
                href="https://www.overleaf.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white flex items-center justify-between gap-1.5 transition group active:scale-95"
                title="Overleaf online collaborative LaTeX editor for lab records & reports"
              >
                <div className="truncate">
                  <span className="text-[10px] text-pink-400 block font-mono font-bold">Overleaf</span>
                  <span className="truncate block font-semibold">LaTeX Reports</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-300 shrink-0" />
              </a>
            </div>
          </div>

          {course.notes && (
            <div className="text-xs text-slate-400 bg-slate-800/30 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-300 font-semibold">Note:</span> {course.notes}
            </div>
          )}
        </div>
      )}

        {/* Modal Footer - Only in Details view to maximize PDF viewing area */}
        {viewTab !== 'pdf' && (
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
                  className="min-h-[44px] flex-1 sm:flex-initial px-4 py-2.5 text-xs font-semibold rounded-xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-300 border border-blue-500/30 transition flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-blue-400" />
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
                className="min-h-[44px] px-6 py-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition shadow-md active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
