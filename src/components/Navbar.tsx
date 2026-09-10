import React from 'react';
import {
  Calendar,
  Grid,
  BookOpen,
  CheckSquare,
  Award,
  Download,
  Sparkles,
  GraduationCap,
  CalendarCheck,
  ChevronDown,
  Building2,
} from 'lucide-react';
import { StudentProfile, DEFAULT_STUDENT_PROFILE, BRANCHES_LIST } from '../data/branchesData';
import { BrandLogo, BrandIcon } from './BrandLogo';

export type ActiveTab = 'day' | 'weekly' | 'courses' | 'tests' | 'attendance' | 'exams' | 'academic';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  profile?: StudentProfile;
  onOpenBranchSelector: () => void;
  selectedElective: string;
  setSelectedElective: (elective: string) => void;
  selectedBatch: string;
  setSelectedBatch: (batch: string) => void;
  onExportCalendar: () => void;
  testCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  onOpenBranchSelector,
  selectedElective,
  setSelectedElective,
  selectedBatch,
  setSelectedBatch,
  onExportCalendar,
  testCount,
}) => {
  const safeProfile = profile && profile.branch ? profile : DEFAULT_STUDENT_PROFILE;
  const branchInfo = BRANCHES_LIST.find((b) => b.code === safeProfile.branch) || BRANCHES_LIST[0];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Mobile Header Bar (< sm screens): Compact, space-efficient, ergonomic */}
        <div className="sm:hidden py-2.5 flex items-center justify-between gap-2">
          {/* Brand & NIT Goa Tag */}
          <div className="flex items-center gap-2.5 min-w-0">
            <BrandIcon size={34} className="rounded-xl shadow-sm shrink-0 ring-1 ring-white/10" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-sm font-bold text-white tracking-tight">NIT Goa</span>
                <span className="text-slate-600">•</span>
                <span className={`text-xs font-bold ${branchInfo.iconColor} truncate`}>
                  {safeProfile.branch}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-none mt-1 truncate">
                Year {safeProfile.year} • Sem {safeProfile.semester}
              </p>
            </div>
          </div>

          {/* Quick Mobile Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick Branch & Year Switcher */}
            <button
              type="button"
              onClick={onOpenBranchSelector}
              className="min-h-[38px] px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-xs"
              title="Switch Branch or Academic Year"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Y{safeProfile.year} • S{safeProfile.semester}</span>
              <ChevronDown className="w-3 h-3 text-amber-400 shrink-0" />
            </button>

            {/* Quick Export .ics */}
            <button
              type="button"
              onClick={onExportCalendar}
              className="min-h-[38px] min-w-[38px] p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-amber-400 border border-slate-700 flex items-center justify-center active:scale-95 transition shadow-xs"
              title="Export Calendar (.ics)"
              aria-label="Export Calendar"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Elective & Lab Batch Strip (Only when EEE Sem 5 is active) */}
        {safeProfile.branch === 'EEE' && safeProfile.semester === 5 && (
          <div className="sm:hidden pb-2.5 pt-1 border-t border-slate-800/60 flex items-center justify-between gap-1.5 text-xs">
            {/* Elective Selector */}
            <div className="flex items-center gap-1 bg-slate-800/90 p-0.5 rounded-lg border border-slate-700/80">
              <span className="text-[10px] text-slate-400 font-semibold px-1">Elective:</span>
              <button
                type="button"
                onClick={() => setSelectedElective('EE541')}
                className={`min-h-[28px] px-2 py-0.5 rounded-md font-bold text-[11px] transition active:scale-95 ${
                  selectedElective === 'EE541'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="EE541 Embedded Systems Design"
              >
                EE541
              </button>
              <button
                type="button"
                onClick={() => setSelectedElective('EE545')}
                className={`min-h-[28px] px-2 py-0.5 rounded-md font-bold text-[11px] transition active:scale-95 ${
                  selectedElective === 'EE545'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="EE545 FPGA based Digital Design"
              >
                EE545
              </button>
            </div>

            {/* Batch Selector */}
            <div className="flex items-center gap-1 bg-slate-800/90 p-0.5 rounded-lg border border-slate-700/80">
              <span className="text-[10px] text-slate-400 font-semibold px-1">Batch:</span>
              <button
                type="button"
                onClick={() => setSelectedBatch('batch1')}
                className={`min-h-[28px] px-2 py-0.5 rounded-md font-bold text-[11px] transition active:scale-95 ${
                  selectedBatch === 'batch1'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                B1
              </button>
              <button
                type="button"
                onClick={() => setSelectedBatch('batch2')}
                className={`min-h-[28px] px-2 py-0.5 rounded-md font-bold text-[11px] transition active:scale-95 ${
                  selectedBatch === 'batch2'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                B2
              </button>
            </div>
          </div>
        )}

        {/* Desktop & Tablet Top Strip (>= sm screens) */}
        <div className="hidden sm:flex py-3 items-center justify-between gap-4 border-b border-slate-800/60">
          <div className="flex items-center gap-4">
            {/* The GDevelopers Official Brand Logo */}
            <BrandLogo
              iconSize={38}
              showText={true}
              className="shrink-0 transition hover:opacity-95"
              subtitle="Campus Portal"
            />

            <div className="h-8 w-px bg-slate-800 shrink-0" />

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>NIT Goa</span>
                  <span className="text-slate-600">•</span>
                  <span className={branchInfo.iconColor}>{branchInfo.name}</span>
                </h1>

                {/* Branch & Year Switcher Pill */}
                <button
                  type="button"
                  onClick={onOpenBranchSelector}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 shadow-xs transition hover:border-amber-400 group"
                  title="Click to switch Branch (EEE/CSE/ECE/ME/CVE) or Academic Year (1st to 4th / Sem 1-8)"
                >
                  <Building2 className="w-3 h-3 text-amber-400" />
                  <span>
                    Year {safeProfile.year} • Sem {safeProfile.semester} ({safeProfile.branch})
                  </span>
                  <ChevronDown className="w-3 h-3 text-amber-400 group-hover:translate-y-0.5 transition" />
                </button>

                {safeProfile.branch === 'EEE' && safeProfile.semester === 5 && safeProfile.hasMinor && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    CS300M Minor
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {branchInfo.department} • Cuncolim Campus
              </p>
            </div>
          </div>

          {/* Quick Config Strip: Electives, Batch, Export */}
          <div className="flex items-center gap-2 flex-wrap">
            {safeProfile.branch === 'EEE' && safeProfile.semester === 5 && (
              <>
                {/* Elective Selector */}
                <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80 text-xs">
                  <span className="text-slate-400 px-1 font-medium">Elective:</span>
                  <button
                    type="button"
                    onClick={() => setSelectedElective('EE541')}
                    className={`px-2 py-1 rounded-lg font-semibold transition text-[11px] ${
                      selectedElective === 'EE541'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="EE541: Embedded Systems Design"
                  >
                    EE541 (Embedded)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedElective('EE545')}
                    className={`px-2 py-1 rounded-lg font-semibold transition text-[11px] ${
                      selectedElective === 'EE545'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="EE545: FPGA based Digital Design"
                  >
                    EE545 (FPGA)
                  </button>
                </div>

                {/* Lab Batch Selector */}
                <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80 text-xs">
                  <span className="text-slate-400 px-1 font-medium">Batch:</span>
                  <button
                    type="button"
                    onClick={() => setSelectedBatch('batch1')}
                    className={`px-2 py-1 rounded-lg font-semibold transition text-[11px] ${
                      selectedBatch === 'batch1'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    B1
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedBatch('batch2')}
                    className={`px-2 py-1 rounded-lg font-semibold transition text-[11px] ${
                      selectedBatch === 'batch2'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    B2
                  </button>
                </div>
              </>
            )}

            {/* Switch Branch Button */}
            <button
              type="button"
              onClick={onOpenBranchSelector}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Change Branch</span>
            </button>

            {/* Calendar Export */}
            <button
              type="button"
              onClick={onExportCalendar}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition shadow-xs"
              title="Download .ics file with timetable & test dates for Google/Apple Calendar"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export Calendar (.ics)</span>
            </button>
          </div>
        </div>

        {/* Desktop & Tablet Navigation Tabs Bar (On mobile, ergonomic MobileBottomNav is used) */}
        <nav className="hidden sm:flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('day')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'day'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/15 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Day Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'weekly'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/15 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Weekly Matrix</span>
          </button>

          {/* NEW: Test Calendar & Exams Tab with Counter */}
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition relative ${
              activeTab === 'tests'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/15 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Tests & Quizzes</span>
            {testCount > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'tests'
                    ? 'bg-slate-950 text-amber-400'
                    : 'bg-rose-500 text-white'
                }`}
              >
                {testCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'courses'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/15 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses Roster</span>
          </button>

          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'attendance'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/15 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>75% Attendance Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('exams')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'exams'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/15 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Exam Slots</span>
          </button>

          <button
            onClick={() => setActiveTab('academic')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'academic'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/15 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>SGPA & Academic Hub</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
