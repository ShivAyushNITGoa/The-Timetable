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
} from 'lucide-react';
import {
  NIT_GOA_RESOURCES,
  ResourceDocument,
  DocumentCategory,
  BranchFilter,
  YearFilter,
} from '../data/resourcesData';
import { StudentProfile, BRANCHES_LIST } from '../data/branchesData';
import { DocumentReaderModal } from './DocumentReaderModal';

interface ResourcesViewProps {
  profile?: StudentProfile;
  onSelectBranchYear?: (branch: string, year: number, semester: number) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ profile }) => {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'ALL'>('ALL');
  const [selectedBranch, setSelectedBranch] = useState<BranchFilter>('ALL');
  const [selectedYear, setSelectedYear] = useState<YearFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDocument, setActiveDocument] = useState<ResourceDocument | null>(null);

  // Filter documents based on controls
  const filteredDocuments = useMemo(() => {
    return NIT_GOA_RESOURCES.filter((doc) => {
      // Category filter
      if (selectedCategory !== 'ALL' && doc.category !== selectedCategory) {
        return false;
      }
      // Branch filter
      if (selectedBranch !== 'ALL') {
        if (doc.branch !== 'ALL' && doc.branch !== selectedBranch) {
          return false;
        }
      }
      // Year filter
      if (selectedYear !== 'ALL') {
        if (doc.year !== 'ALL' && doc.year !== selectedYear) {
          return false;
        }
      }
      // Search query
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

  // Current student recommendations
  const activeBranchDoc = useMemo(() => {
    if (!profile) return null;
    const branchCode = profile.branch;
    return NIT_GOA_RESOURCES.find(
      (d) => d.category === 'timetable' && (d.branch === branchCode || (profile.semester <= 2 && d.branch === 'COMMON'))
    );
  }, [profile]);

  const activeSyllabusDoc = useMemo(() => {
    if (!profile) return null;
    const branchCode = profile.branch;
    return NIT_GOA_RESOURCES.find(
      (d) => d.category === 'syllabus' && (d.branch === branchCode || (profile.semester <= 2 && d.branch === 'COMMON'))
    );
  }, [profile]);

  const activeSchemeDoc = useMemo(() => {
    if (!profile) return null;
    const branchCode = profile.branch;
    return NIT_GOA_RESOURCES.find(
      (d) => d.category === 'curriculum' && (d.branch === branchCode || (profile.semester <= 2 && d.branch === 'COMMON'))
    );
  }, [profile]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide uppercase">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Academic Repository & Bulletins</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              NIT Goa Academic Resources & Syllabi
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Access and open official time tables, comprehensive 4-module syllabus books, 
              curriculum credit schemes, and Senate ordinances directly inside the web application for all branches and years.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 shrink-0">
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-xl font-black text-amber-400">{NIT_GOA_RESOURCES.length}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Official Docs</div>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-xl font-black text-emerald-400">5</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Branches</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-black text-cyan-400">4</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Years (1-8 Sem)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Profile Personalized Quick Action Strip */}
      {profile && (
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Fast Access for Your Current Profile</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-mono border border-amber-500/30">
                    {profile.branch} • Year {profile.year} • Sem {profile.semester}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Direct links to your department's official schedule, 4-module syllabus guide, and credit matrix.
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
              placeholder="Search by branch, course title, code (e.g. CS200, Room 51, 75% rule)..."
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
              { key: 'ALL', label: 'All Documents' },
              { key: 'timetable', label: '📅 Timetables' },
              { key: 'syllabus', label: '📚 Syllabi' },
              { key: 'curriculum', label: '📋 Curricula' },
              { key: 'calendar', label: '🗓️ Calendars' },
              { key: 'rules', label: '⚖️ Ordinances' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedCategory(tab.key as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition min-h-[38px] ${
                  selectedCategory === tab.key
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
          Showing <strong className="text-white">{filteredDocuments.length}</strong> official resources
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
          };

          const catInfo = categoryColors[doc.category];
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
                  <span>Open inside App</span>
                </button>

                <a
                  href={doc.externalOfficialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 transition"
                  title="Open official page on NIT Goa portal"
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
            Try adjusting your department, year, or search query to explore other official NIT Goa academic resources.
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

      {/* In-App Document Reader Modal */}
      <DocumentReaderModal
        document={activeDocument}
        isOpen={Boolean(activeDocument)}
        onClose={() => setActiveDocument(null)}
      />
    </div>
  );
};
