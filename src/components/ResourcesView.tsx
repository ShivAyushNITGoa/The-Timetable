import React, { useState, useMemo } from 'react';
import {
  FileText,
  Download,
  Printer,
  Search,
  ExternalLink,
  BookOpen,
  Calendar,
  Layers,
  GraduationCap,
  ShieldCheck,
  Building2,
  SlidersHorizontal,
  ChevronRight,
  Eye,
  CheckCircle,
  Sparkles,
  Compass,
  FileCheck2,
  AlertTriangle,
  FolderDown,
  Award,
  Clock,
  Send,
} from 'lucide-react';
import {
  NIT_GOA_RESOURCES,
  ResourceDocument,
  DocumentCategory,
  BranchFilter,
  YearFilter,
} from '../data/resourcesData';
import { StudentProfile, BRANCHES_LIST, DEFAULT_STUDENT_PROFILE } from '../data/branchesData';
import { Course, TimeSlot, DayOfWeek } from '../data/timetableData';
import { AcademicTest } from '../types';
import { DocumentReaderModal } from './DocumentReaderModal';
import { gatherStudentWebappData, generateClassifiedDocuments } from '../utils/classifiedDocumentsGenerator';

interface ResourcesViewProps {
  profile?: StudentProfile;
  courses?: Record<string, Course>;
  scheduleOverride?: Record<DayOfWeek, TimeSlot[]> | null;
  tests?: AcademicTest[];
  onSelectBranchYear?: (branch: string, year: number, semester: number) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  profile = DEFAULT_STUDENT_PROFILE,
  courses = {},
  scheduleOverride = null,
  tests = [],
}) => {
  const [viewMode, setViewMode] = useState<'institute' | 'classified'>('institute');
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'ALL'>('ALL');
  const [selectedBranch, setSelectedBranch] = useState<BranchFilter>('ALL');
  const [selectedYear, setSelectedYear] = useState<YearFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDocument, setActiveDocument] = useState<ResourceDocument | null>(null);

  const safeProfile = profile || DEFAULT_STUDENT_PROFILE;

  // --------------------------------------------------------------------------
  // Mode A: Official Institute Files from NIT Goa
  // --------------------------------------------------------------------------
  const filteredDocuments = useMemo(() => {
    return NIT_GOA_RESOURCES.filter((doc) => {
      if (selectedCategory !== 'ALL' && doc.category !== selectedCategory) {
        return false;
      }
      if (selectedBranch !== 'ALL') {
        if (doc.branch !== 'ALL' && doc.branch !== selectedBranch) {
          return false;
        }
      }
      if (selectedYear !== 'ALL') {
        if (doc.year !== 'ALL' && doc.year !== selectedYear) {
          return false;
        }
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const inTitle = doc.title.toLowerCase().includes(query);
        const inShort = doc.shortTitle.toLowerCase().includes(query);
        const inSummary = doc.summary.toLowerCase().includes(query);
        const inTags = doc.tags.some((t) => t.toLowerCase().includes(query));
        const inDocNum = doc.docNumber.toLowerCase().includes(query);
        const inSections = doc.sections.some(
          (s) =>
            s.title.toLowerCase().includes(query) ||
            (s.content && s.content.some((c) => c.toLowerCase().includes(query)))
        );

        if (!inTitle && !inShort && !inSummary && !inTags && !inDocNum && !inSections) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedBranch, selectedYear, searchQuery]);

  // Current student recommendations for authentic files
  const activeBranchDoc = useMemo(() => {
    const branchCode = safeProfile.branch;
    return NIT_GOA_RESOURCES.find(
      (d) => d.category === 'timetable' && (d.branch === branchCode || (safeProfile.semester <= 2 && d.branch === 'COMMON'))
    );
  }, [safeProfile]);

  const activeSyllabusDoc = useMemo(() => {
    const branchCode = safeProfile.branch;
    return NIT_GOA_RESOURCES.find(
      (d) => d.category === 'syllabus' && (d.branch === branchCode || (safeProfile.semester <= 2 && d.branch === 'COMMON'))
    );
  }, [safeProfile]);

  const activeSchemeDoc = useMemo(() => {
    const branchCode = safeProfile.branch;
    return NIT_GOA_RESOURCES.find(
      (d) => d.category === 'curriculum' && (d.branch === branchCode || (safeProfile.semester <= 2 && d.branch === 'COMMON'))
    );
  }, [safeProfile]);

  // --------------------------------------------------------------------------
  // Mode B: Classified Documents generated from user's live webapp data
  // --------------------------------------------------------------------------
  const webappStudentData = useMemo(() => {
    return gatherStudentWebappData(safeProfile, courses, scheduleOverride, tests);
  }, [safeProfile, courses, scheduleOverride, tests]);

  const classifiedDocs = useMemo(() => {
    return generateClassifiedDocuments(webappStudentData);
  }, [webappStudentData]);

  // Quick stats computed from student's webapp data
  const webappStats = useMemo(() => {
    let totalClasses = 0;
    let attendedClasses = 0;
    let subCount = Object.keys(courses).length;
    let totalCredits = 0;

    Object.entries(courses).forEach(([code, course]) => {
      const c = course as Course;
      totalCredits += c.credits;
      const rec = webappStudentData.attendance[code];
      if (rec) {
        totalClasses += rec.total;
        attendedClasses += rec.attended;
      }
    });

    const avgAttendance = totalClasses > 0 ? ((attendedClasses / totalClasses) * 100).toFixed(1) : '100.0';

    return {
      courseCount: subCount,
      totalCredits,
      totalClasses,
      attendedClasses,
      attendancePct: avgAttendance,
      testCount: tests.length,
    };
  }, [courses, webappStudentData.attendance, tests]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide uppercase">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>NIT Goa Official Academic Documents & Data Classification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Resources & Classified Documents Repository
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Explore authentic official circulars, timetables, and 4-module syllabus books from NIT Goa, or classify 
              and export the personalized schedule, attendance, and exam data you created in this webapp into Senate-compliant forms.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 shrink-0">
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-xl font-black text-amber-400">{NIT_GOA_RESOURCES.length}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Institute Docs</div>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-xl font-black text-emerald-400">{classifiedDocs.length}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Classified Forms</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-black text-cyan-400">5</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">B.Tech Depts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Section Switcher: Authentic Institute Files vs. Classify My Webapp Data */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 shadow-lg">
        <button
          type="button"
          onClick={() => setViewMode('institute')}
          className={`w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition active:scale-[0.98] ${
            viewMode === 'institute'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Authentic NIT Goa Files & Syllabi ({NIT_GOA_RESOURCES.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('classified')}
          className={`w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition active:scale-[0.98] ${
            viewMode === 'classified'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Classify My Webapp Data into Official NIT Goa Documents ({classifiedDocs.length})</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
            Live
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODE B: CLASSIFY USER'S WEBAPP DATA INTO OFFICIAL FORMS                   */}
      {/* ========================================================================= */}
      {viewMode === 'classified' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Live Data Classification Banner */}
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Official Document Classifier for Your Tracked Data</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                      {safeProfile.branch} • Sem {safeProfile.semester}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Your tracked timetable, attendance percentages, tests, and course registrations are automatically formatted 
                    into statutory NIT Goa Senate forms. Open, print, or download them below.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveDocument(classifiedDocs[0])}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-md"
                >
                  <Eye className="w-4 h-4" />
                  <span>Open Primary Audit (Form AT-04)</span>
                </button>
              </div>
            </div>

            {/* Quick Live KPI Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 font-semibold uppercase">Overall Attendance</div>
                <div className="text-lg font-black text-amber-400 mt-0.5 flex items-center gap-1.5">
                  <span>{webappStats.attendancePct}%</span>
                  {Number(webappStats.attendancePct) >= 75 ? (
                    <span className="text-[10px] text-emerald-400 font-normal">Eligible</span>
                  ) : (
                    <span className="text-[10px] text-rose-400 font-normal">Shortage</span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {webappStats.attendedClasses} / {webappStats.totalClasses} classes attended
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 font-semibold uppercase">Enrolled Courses</div>
                <div className="text-lg font-black text-white mt-0.5">
                  {webappStats.courseCount} Subjects
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {webappStats.totalCredits} Registered Credits
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 font-semibold uppercase">Scheduled Tests</div>
                <div className="text-lg font-black text-cyan-400 mt-0.5">
                  {webappStats.testCount} Evaluations
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Quizzes, Mid-Sem & CIE
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 font-semibold uppercase">Candidate Profile</div>
                <div className="text-sm font-bold text-slate-200 mt-0.5 truncate">
                  {safeProfile.studentName || 'B.Tech Student'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {safeProfile.rollNo || 'Roll Number'}
                </div>
              </div>
            </div>
          </div>

          {/* Classified Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {classifiedDocs.map((doc) => {
              return (
                <div
                  key={doc.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide border flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>Classified NIT Goa Form</span>
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {doc.docNumber.split('/')[2] || 'FORM'}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                        {doc.title}
                      </h3>
                      <div className="text-[11px] text-slate-400 font-mono mt-1">
                        {doc.docNumber}
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {doc.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {doc.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-medium border border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveDocument(doc)}
                      className="flex-1 min-h-[40px] px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Open Classified Form</span>
                    </button>

                    <a
                      href={doc.externalOfficialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 transition"
                      title="View Official NIT Goa Statutory Ordinance"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE A: AUTHENTIC NIT GOA OFFICIAL FILES & NOTIFICATIONS                  */}
      {/* ========================================================================= */}
      {viewMode === 'institute' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Active Profile Personalized Quick Action Strip */}
          {safeProfile && (
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Fast Access for Your Active Profile</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-mono border border-amber-500/30">
                        {safeProfile.branch} • Year {safeProfile.year} • Sem {safeProfile.semester}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Direct access to your department's official schedule, 4-module syllabus guide, and credit matrix.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {activeBranchDoc && (
                  <button
                    type="button"
                    onClick={() => setActiveDocument(activeBranchDoc)}
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 text-left transition group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 truncate">
                          {activeBranchDoc.shortTitle}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">Official Class Timetable</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0 ml-2" />
                  </button>
                )}

                {activeSyllabusDoc && (
                  <button
                    type="button"
                    onClick={() => setActiveDocument(activeSyllabusDoc)}
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 text-left transition group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 truncate">
                          {activeSyllabusDoc.shortTitle}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">Complete Syllabus Book</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0 ml-2" />
                  </button>
                )}

                {activeSchemeDoc && (
                  <button
                    type="button"
                    onClick={() => setActiveDocument(activeSchemeDoc)}
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 text-left transition group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate">
                          {activeSchemeDoc.shortTitle}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">Curriculum Scheme & Credits</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-2" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Official 2025 NIT Goa Accredited Handbooks Showcase */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Official 2025 B.Tech Syllabus Handbooks (NIT Goa)</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-mono border border-emerald-500/40">
                      nitgoa.ac.in
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Official accredited course syllabi and degree regulations directly downloaded from NIT Goa for all branches (Sem 1 to 8).
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
              {[
                {
                  code: 'EEE',
                  name: 'Electrical & Electronics',
                  pdfName: 'EEE2025.pdf',
                  pdfUrl: '/syllabi/EEE2025.pdf',
                  docId: 'syl-eee-official-2025',
                  officialUrl: 'https://nitgoa.ac.in/uploads/EEE2025.pdf',
                  color: 'from-amber-500/20 to-amber-600/10 border-amber-500/40 text-amber-300',
                },
                {
                  code: 'ECE',
                  name: 'Electronics & Comm.',
                  pdfName: 'ECE2025.pdf',
                  pdfUrl: '/syllabi/ECE2025.pdf',
                  docId: 'syl-ece-official-2025',
                  officialUrl: 'https://nitgoa.ac.in/uploads/ECE2025.pdf',
                  color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/40 text-indigo-300',
                },
                {
                  code: 'CSE',
                  name: 'Computer Science & Engg.',
                  pdfName: 'CSE2025.pdf',
                  pdfUrl: '/syllabi/CSE2025.pdf',
                  docId: 'syl-cse-official-2025',
                  officialUrl: 'https://nitgoa.ac.in/uploads/CSE2025.pdf',
                  color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/40 text-cyan-300',
                },
                {
                  code: 'ME / MCE',
                  name: 'Mechanical Engineering',
                  pdfName: 'MCE2025.pdf',
                  pdfUrl: '/syllabi/MCE2025.pdf',
                  docId: 'syl-me-official-2025',
                  officialUrl: 'https://nitgoa.ac.in/uploads/MCE2025.pdf',
                  color: 'from-rose-500/20 to-rose-600/10 border-rose-500/40 text-rose-300',
                },
                {
                  code: 'CVE',
                  name: 'Civil Engineering',
                  pdfName: 'CVE2025.pdf',
                  pdfUrl: '/syllabi/CVE2025.pdf',
                  docId: 'syl-cve-official-2025',
                  officialUrl: 'https://nitgoa.ac.in/uploads/CVE2025.pdf',
                  color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/40 text-emerald-300',
                },
              ].map((item) => {
                const targetDoc = NIT_GOA_RESOURCES.find((d) => d.id === item.docId);
                return (
                  <div
                    key={item.code}
                    className={`p-3.5 rounded-xl bg-gradient-to-b ${item.color} border flex flex-col justify-between space-y-3`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm tracking-wide text-white">{item.code}</span>
                        <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-950/60 text-slate-300">
                          2025
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 font-medium mt-1 leading-tight line-clamp-2">
                        {item.name}
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (targetDoc) {
                            setActiveDocument(targetDoc);
                          } else {
                            window.open(item.pdfUrl, '_blank');
                          }
                        }}
                        className="w-full py-1.5 px-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center justify-center gap-1 transition active:scale-95 shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Read PDF</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <a
                          href={item.pdfUrl}
                          download={item.pdfName}
                          className="flex-1 py-1 px-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-[10px] font-semibold flex items-center justify-center gap-1 border border-slate-700/60 transition"
                        >
                          <Download className="w-3 h-3 text-amber-400" />
                          <span>Download</span>
                        </a>
                        <a
                          href={item.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition"
                          title="Official Link on nitgoa.ac.in"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
            {/* Top Row: Search and Category Pills */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search authentic files by branch, course title, code (e.g. CS200, Room 51, Holidays, Bus, Fee)..."
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0 shrink-0">
                {[
                  { key: 'ALL', label: 'All Files' },
                  { key: 'timetable', label: '📅 Timetables' },
                  { key: 'syllabus', label: '📚 Syllabi' },
                  { key: 'curriculum', label: '📋 Curricula' },
                  { key: 'calendar', label: '🗓️ Calendars & Holidays' },
                  { key: 'rules', label: '⚖️ Ordinances & Bylaws' },
                  { key: 'circular', label: '📢 Fee Circulars' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setSelectedCategory(tab.key as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition min-h-[42px] sm:min-h-[38px] flex items-center active:scale-95 ${
                      selectedCategory === tab.key
                        ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 active:bg-slate-750'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Row: Branch & Year Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
              {/* Branch Selector Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Department:</span>
                </span>
                {[
                  { code: 'ALL', label: 'All' },
                  { code: 'COMMON', label: '1st Year' },
                  { code: 'CSE', label: 'CSE' },
                  { code: 'ECE', label: 'ECE' },
                  { code: 'EEE', label: 'EEE' },
                  { code: 'ME', label: 'ME' },
                  { code: 'CVE', label: 'Civil' },
                ].map((b) => (
                  <button
                    key={b.code}
                    type="button"
                    onClick={() => setSelectedBranch(b.code as BranchFilter)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                      selectedBranch === b.code
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                        : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              {/* Academic Year Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Year:</span>
                </span>
                {[
                  { val: 'ALL', label: 'All' },
                  { val: '1', label: '1st Yr' },
                  { val: '2', label: '2nd Yr' },
                  { val: '3', label: '3rd Yr' },
                  { val: '4', label: '4th Yr' },
                ].map((y) => (
                  <button
                    key={y.val}
                    type="button"
                    onClick={() => setSelectedYear(y.val as YearFilter)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                      selectedYear === y.val
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                        : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {y.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Document Results Count Strip */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <div>
              Showing <strong className="text-white">{filteredDocuments.length}</strong> authentic NIT Goa documents
              {selectedBranch !== 'ALL' && <span> for {selectedBranch}</span>}
              {selectedYear !== 'ALL' && <span> (Year {selectedYear})</span>}
            </div>
            {(selectedCategory !== 'ALL' || selectedBranch !== 'ALL' || selectedYear !== 'ALL' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedBranch('ALL');
                  setSelectedYear('ALL');
                  setSearchQuery('');
                }}
                className="text-amber-400 hover:text-amber-300 font-semibold"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Document Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredDocuments.map((doc) => {
              const categoryColors: Record<DocumentCategory, { badge: string; text: string; icon: any }> = {
                timetable: {
                  badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                  text: 'Timetable',
                  icon: Calendar,
                },
                syllabus: {
                  badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                  text: 'Syllabus Book',
                  icon: BookOpen,
                },
                curriculum: {
                  badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
                  text: 'Curriculum Scheme',
                  icon: Layers,
                },
                calendar: {
                  badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
                  text: 'Academic Calendar',
                  icon: Calendar,
                },
                rules: {
                  badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
                  text: 'Senate Ordinance',
                  icon: ShieldCheck,
                },
                circular: {
                  badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
                  text: 'Official Circular',
                  icon: FileText,
                },
              };

              const catInfo = categoryColors[doc.category] || categoryColors.rules;
              const CategoryIcon = catInfo.icon;

              return (
                <div
                  key={doc.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 group"
                >
                  {/* Card Header */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide border flex items-center gap-1.5 ${catInfo.badge}`}
                      >
                        <CategoryIcon className="w-3.5 h-3.5" />
                        <span>{catInfo.text}</span>
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {doc.year === 'ALL' ? 'All Years' : `Year ${doc.year}`}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                        {doc.title}
                      </h3>
                      <div className="text-[11px] text-slate-400 font-mono mt-1">
                        {doc.docNumber}
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {doc.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {doc.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-medium border border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                      {doc.tags.length > 3 && (
                        <span className="text-[10px] text-slate-400 self-center">
                          +{doc.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveDocument(doc)}
                      className="flex-1 min-h-[40px] px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Read Embedded PDF</span>
                    </button>

                    <a
                      href={doc.externalOfficialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 transition"
                      title="Open official PDF on NIT Goa website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredDocuments.length === 0 && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <FileText className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No documents matched your criteria</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Try adjusting your department, year, or search query to explore other authentic NIT Goa academic resources.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedBranch('ALL');
                  setSelectedYear('ALL');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* In-App Document Reader Modal */}
      <DocumentReaderModal
        document={activeDocument}
        isOpen={Boolean(activeDocument)}
        onClose={() => setActiveDocument(null)}
      />
    </div>
  );
};
