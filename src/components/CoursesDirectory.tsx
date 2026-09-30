import React, { useState } from 'react';
import { COURSES, Course, EEE_SEMESTER_INFO } from '../data/timetableData';
import { Search, BookOpen, User, Mail, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { getOfficialCourseSyllabus } from '../data/officialSyllabusRegistry';

interface CoursesDirectoryProps {
  onOpenCourseModal: (courseCode: string) => void;
  selectedElective: string;
  courses?: Record<string, Course>;
  branch?: string;
  semester?: number;
}

export const CoursesDirectory: React.FC<CoursesDirectoryProps> = ({
  onOpenCourseModal,
  selectedElective,
  courses = COURSES,
  branch = 'EEE',
  semester = 5,
}) => {
  const [filter, setFilter] = useState<'all' | 'core' | 'minor' | 'elective' | 'lab'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const coursesList = Object.values(courses) as Course[];

  const filteredCourses = coursesList.filter((course) => {
    // Category filter
    if (filter === 'core' && course.category !== 'core') return false;
    if (filter === 'minor' && course.category !== 'minor') return false;
    if (filter === 'elective' && course.category !== 'elective') return false;
    if (filter === 'lab' && course.category !== 'lab') return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        course.code.toLowerCase().includes(q) ||
        course.name.toLowerCase().includes(q) ||
        course.coordinator.toLowerCase().includes(q) ||
        course.shortName.toLowerCase().includes(q) ||
        course.room.toLowerCase().includes(q)
      );
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Info Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/30">
                Academic Curriculum • {branch}
              </span>
              {branch === 'EEE' && semester === 5 && (
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-blue-600/15 text-blue-300 font-semibold border border-blue-500/30 flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-blue-400" />
                  CSE Minor Option
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {branch} Semester {semester} Course Roster
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Faculty Coordinators, Examination Slots, Teaching Slots & Venue Directory ({coursesList.length} Courses Registered)
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div className="text-slate-400">Faculty Advisor</div>
              <div className="font-semibold text-white">{EEE_SEMESTER_INFO.facultyAdvisor.name}</div>
              <a href={`mailto:${EEE_SEMESTER_INFO.facultyAdvisor.email}`} className="text-blue-400 text-[11px] hover:underline">
                {EEE_SEMESTER_INFO.facultyAdvisor.email}
              </a>
            </div>

            {branch === 'EEE' && semester === 5 && (
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-blue-300 flex items-center gap-1.5 font-semibold">
                  <BookOpen className="w-3 h-3 text-blue-400" /> Minor Coordinator
                </div>
                <div className="font-semibold text-white">{EEE_SEMESTER_INFO.minorAdvisor.name}</div>
                <a href={`mailto:${EEE_SEMESTER_INFO.minorAdvisor.email}`} className="text-blue-400 text-[11px] hover:underline">
                  {EEE_SEMESTER_INFO.minorAdvisor.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="w-full max-w-full min-w-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="w-full sm:w-auto max-w-full min-w-0 flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto scrollbar-none touch-pan-x">
          {[
            { id: 'all', label: 'All Courses' },
            { id: 'core', label: 'Core Theory' },
            ...(branch === 'EEE' && semester === 5 ? [{ id: 'minor', label: 'CSE Minor (CS300M)' }] : []),
            { id: 'elective', label: 'Electives' },
            { id: 'lab', label: 'Laboratories' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition shrink-0 ${
                filter === tab.id
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64 sm:min-w-[220px] shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search code, faculty, room..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => {
          const isMinor = course.isMinor || course.code === 'CS300M';
          const isCurrentElective = course.code === selectedElective;

          return (
            <div
              key={course.code}
              onClick={() => onOpenCourseModal(course.code)}
              className={`group p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isMinor
                  ? 'bg-slate-900 border-blue-500/40 shadow-xs hover:border-blue-400'
                  : isCurrentElective
                  ? 'bg-slate-850 border-blue-500/50 hover:border-blue-400'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-md ${
                      isMinor
                        ? 'bg-blue-600/15 text-blue-300 border border-blue-500/30'
                        : course.category === 'core'
                        ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                        : course.category === 'elective'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : course.category === 'lab'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {isMinor ? 'Minor (CSE)' : course.type}
                  </span>

                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-md border border-slate-800">
                    {course.credits} Credits ({course.ltp})
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition flex items-center gap-2">
                  <span>{course.code}</span>
                  <span className="text-slate-500 font-normal">|</span>
                  <span className="text-slate-200">{course.name}</span>
                </h3>

                {/* Faculty */}
                <div className="mt-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <User className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate font-medium">
                      {course.coordinator} ({course.shortName})
                    </span>
                  </div>
                  {course.facultyDesignation && (
                    <div className="text-[11px] text-blue-300/90 pl-5.5 truncate">
                      {course.facultyDesignation}
                    </div>
                  )}
                  {course.email && (
                    <div className="text-[11px] text-slate-400 pl-5.5 truncate flex items-center gap-1 mt-0.5 font-mono">
                      <Mail className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                      <span>{course.email}</span>
                    </div>
                  )}
                </div>

                {/* Room */}
                <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{course.room}</span>
                </div>

                {/* Research & Syllabus Highlights */}
                {(() => {
                  const official = getOfficialCourseSyllabus(course.code);
                  const moduleCount = (official?.modules && official.modules.length > 0) ? official.modules.length : (course.modules?.length || 0);

                  return (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {official && (
                        <span 
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-600/15 text-blue-300 border border-blue-500/30 flex items-center gap-1"
                          title={`Accredited by NIT Goa (${official.pdfName})`}
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-blue-400" />
                          <span>NIT Goa Accredited</span>
                        </span>
                      )}
                      {course.patents && course.patents.length > 0 && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <Award className="w-2.5 h-2.5" /> Patent
                        </span>
                      )}
                      {course.papers && course.papers.length > 0 && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {course.papers.length} Publications
                        </span>
                      )}
                      {moduleCount > 0 && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/80 flex items-center gap-1">
                          <BookOpen className="w-2.5 h-2.5 text-blue-400" />
                          <span>{moduleCount} Modules</span>
                        </span>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Bottom Meta */}
              <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <span>
                    Teaching: <strong className="text-slate-300">{course.teachingSlot}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Exam: <strong className="text-indigo-300">Slot {course.examSlot}</strong>
                  </span>
                </div>
                <span className="text-xs text-blue-400 font-semibold group-hover:underline">
                  View Details →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
