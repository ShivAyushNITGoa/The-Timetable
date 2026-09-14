import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Building2,
  Mail,
  AlertCircle,
  Info,
  FileText,
} from 'lucide-react';
import { StudentProfile, DEFAULT_STUDENT_PROFILE, BRANCHES_LIST } from '../data/branchesData';
import { BrandLogo, BrandIcon } from './BrandLogo';

export type ActiveTab = 'day' | 'weekly' | 'courses' | 'tests' | 'attendance' | 'exams' | 'academic' | 'resources';

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
  onOpenPwaGuide?: () => void;
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
  onOpenPwaGuide,
}) => {
  const safeProfile = profile && profile.branch ? profile : DEFAULT_STUDENT_PROFILE;
  const branchInfo = BRANCHES_LIST.find((b) => b.code === safeProfile.branch) || BRANCHES_LIST[0];

  // Desktop/Tablet horizontal scroll controls
  const navRef = useRef<HTMLElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkNavScroll = useCallback(() => {
    if (!navRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    checkNavScroll();
    const el = navRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkNavScroll, { passive: true });
    window.addEventListener('resize', checkNavScroll);
    return () => {
      el.removeEventListener('scroll', checkNavScroll);
      window.removeEventListener('resize', checkNavScroll);
    };
  }, [checkNavScroll]);

  // Smoothly center the active tab inside the desktop nav bar
  useEffect(() => {
    if (!navRef.current) return;
    const activeBtn = navRef.current.querySelector<HTMLButtonElement>(`[data-tab="${activeTab}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  const handleScrollNav = (direction: 'left' | 'right') => {
    if (!navRef.current) return;
    const scrollOffset = direction === 'left' ? -220 : 220;
    navRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
  };

  const navTabsConfig = [
    {
      id: 'day' as const,
      label: 'Day Schedule',
      medLabel: 'Day Schedule',
      shortLabel: 'Day',
      icon: Calendar,
    },
    {
      id: 'weekly' as const,
      label: 'Weekly Matrix',
      medLabel: 'Weekly Matrix',
      shortLabel: 'Weekly',
      icon: Grid,
    },
    {
      id: 'tests' as const,
      label: 'Tests & Tasks',
      medLabel: 'Tests & Tasks',
      shortLabel: 'Tests',
      icon: CalendarCheck,
      badge: testCount,
    },
    {
      id: 'courses' as const,
      label: 'Courses Roster',
      medLabel: 'Courses',
      shortLabel: 'Courses',
      icon: BookOpen,
    },
    {
      id: 'attendance' as const,
      label: '75% Attendance Tracker',
      medLabel: 'Attendance Tracker',
      shortLabel: 'Attendance',
      icon: CheckSquare,
    },
    {
      id: 'exams' as const,
      label: 'Exam Slots',
      medLabel: 'Exam Slots',
      shortLabel: 'Exams',
      icon: Award,
    },
    {
      id: 'academic' as const,
      label: 'SGPA & Academic Hub',
      medLabel: 'Academic Hub',
      shortLabel: 'SGPA Hub',
      icon: GraduationCap,
    },
    {
      id: 'resources' as const,
      label: 'Resources & Syllabi',
      medLabel: 'Resources',
      shortLabel: 'Resources',
      icon: FileText,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Mobile Header Bar (< sm screens): Compact, space-efficient, touch-friendly 44px targets */}
        <div className="sm:hidden pt-2 pb-1.5">
          <div className="flex items-center justify-between gap-2">
            {/* Brand & NIT Goa Tag */}
            <div className="flex items-center gap-2.5 min-w-0">
              <BrandIcon size={34} className="rounded-xl shadow-sm shrink-0 ring-1 ring-white/10" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-sm font-bold text-white tracking-tight whitespace-nowrap">NIT Goa</span>
                  <span className="text-slate-600 text-xs">•</span>
                  <span className="text-xs font-medium text-slate-300 truncate">Portal</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                  Cuncolim Campus
                </p>
              </div>
            </div>

            {/* Mobile Top Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Export Calendar .ics */}
              <button
                type="button"
                onClick={onExportCalendar}
                className="min-h-[40px] min-w-[40px] p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:bg-slate-600 text-amber-400 border border-slate-700 flex items-center justify-center active:scale-95 transition shadow-xs"
                title="Export Calendar (.ics)"
                aria-label="Export Calendar (.ics)"
              >
                <Download className="w-4 h-4" />
              </button>

              {/* PWA Info & Install Guide Button */}
              <button
                type="button"
                onClick={onOpenPwaGuide}
                className="min-h-[40px] min-w-[40px] p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 active:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 flex items-center justify-center active:scale-95 transition shadow-xs"
                title="PWA Info & Local Install Guide"
                aria-label="PWA Information and Local Installation Guide"
              >
                <Info className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Dedicated High-Visibility Branch & Semester Active Status Card */}
          <button
            type="button"
            onClick={onOpenBranchSelector}
            className="w-full mt-2 px-3 py-2 rounded-xl bg-gradient-to-r from-slate-800/95 via-slate-800/90 to-slate-850 border border-slate-700/80 hover:border-amber-500/40 active:border-amber-500/60 flex items-center justify-between gap-2.5 transition active:scale-[0.99] text-left shadow-xs group"
            aria-label="Switch Branch, Year, or Semester"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${branchInfo.badgeBg || 'bg-amber-500/10 border-amber-500/30'}`}>
                <Building2 className={`w-4 h-4 ${branchInfo.iconColor || 'text-amber-400'}`} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wide shrink-0">
                    {safeProfile.branch}
                  </span>
                  <span className="text-xs font-bold text-white truncate">
                    {safeProfile.semester <= 2
                      ? `Year 1 • Sec ${safeProfile.firstYearSection || 'A'} (Sem ${safeProfile.semester})`
                      : `Sem ${safeProfile.semester} • Year ${safeProfile.year}`}
                  </span>
                  {safeProfile.branch === 'EEE' && safeProfile.semester === 5 && safeProfile.hasMinor && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
                      CS300M Minor
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                  {safeProfile.semester <= 2
                    ? `${safeProfile.firstYearSection === 'A' ? 'Physics' : 'Chemistry'} Cycle Curriculum`
                    : branchInfo.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/10 group-hover:bg-amber-500/20 px-2.5 py-1.5 rounded-lg border border-amber-500/30 shrink-0 transition">
              <span>Switch</span>
              <ChevronDown className="w-3.5 h-3.5 text-amber-400 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Mobile Elective & Lab Batch Strip (Only when EEE Sem 5 is active) */}
        {safeProfile.branch === 'EEE' && safeProfile.semester === 5 && (
          <div className="sm:hidden pb-2 pt-1 border-t border-slate-800/60 flex items-center justify-between gap-1.5 text-xs">
            {/* Elective Selector */}
            <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
              <span className="text-[10px] text-slate-400 font-semibold px-1">Elective:</span>
              <button
                type="button"
                onClick={() => setSelectedElective('EE541')}
                className={`min-h-[36px] px-2.5 py-1 rounded-lg font-bold text-xs transition active:scale-95 ${
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
                className={`min-h-[36px] px-2.5 py-1 rounded-lg font-bold text-xs transition active:scale-95 ${
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
            <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
              <span className="text-[10px] text-slate-400 font-semibold px-1">Batch:</span>
              <button
                type="button"
                onClick={() => setSelectedBatch('batch1')}
                className={`min-h-[36px] px-2.5 py-1 rounded-lg font-bold text-xs transition active:scale-95 ${
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
                className={`min-h-[36px] px-2.5 py-1 rounded-lg font-bold text-xs transition active:scale-95 ${
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
        <div className="hidden sm:flex py-3 items-center justify-between gap-3 border-b border-slate-800/60">
          <div className="flex items-center gap-3 min-w-0">
            {/* The GDevelopers Official Brand Logo */}
            <BrandLogo
              iconSize={38}
              showText={true}
              className="shrink-0 transition hover:opacity-95"
              subtitle="Campus Portal"
            />

            <div className="h-8 w-px bg-slate-800 shrink-0 hidden md:block" />

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-sm md:text-base font-bold text-white tracking-tight flex items-center gap-1.5 shrink-0">
                  <span>NIT Goa</span>
                  <span className="text-slate-600">•</span>
                  <span className="px-2 py-0.5 rounded text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {safeProfile.branch}
                  </span>
                  <span className={`text-xs md:text-sm font-semibold truncate ${branchInfo.iconColor}`}>
                    {branchInfo.name}
                  </span>
                </h1>

                {/* Branch & Year Switcher Pill */}
                <button
                  type="button"
                  onClick={onOpenBranchSelector}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-amber-300 border border-amber-500/30 shadow-xs transition hover:border-amber-400 group shrink-0 active:scale-95"
                  title="Click to switch Branch or Academic Year"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="hidden lg:inline">
                    {safeProfile.semester <= 2
                      ? `Year 1 • Sec ${safeProfile.firstYearSection || 'A'} (Sem ${safeProfile.semester})`
                      : `Year ${safeProfile.year} • Sem ${safeProfile.semester}`}
                  </span>
                  <span className="lg:hidden">
                    Sem {safeProfile.semester} (Y{safeProfile.year})
                  </span>
                  <ChevronDown className="w-3 h-3 text-amber-400 group-hover:translate-y-0.5 transition shrink-0" />
                </button>

                {safeProfile.branch === 'EEE' && safeProfile.semester === 5 && safeProfile.hasMinor && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs shrink-0">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span className="hidden md:inline">CS300M Minor</span>
                    <span className="md:hidden">Minor</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 truncate hidden lg:block">
                {branchInfo.department} • Cuncolim Campus
              </p>
            </div>
          </div>

          {/* Quick Config Strip: Responsive buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {safeProfile.branch === 'EEE' && safeProfile.semester === 5 && (
              <>
                {/* Elective Selector */}
                <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80 text-xs">
                  <span className="text-slate-400 px-1 font-medium hidden xl:inline">Elective:</span>
                  <button
                    type="button"
                    onClick={() => setSelectedElective('EE541')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition text-xs active:scale-95 ${
                      selectedElective === 'EE541'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="EE541: Embedded Systems Design"
                  >
                    EE541
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedElective('EE545')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition text-xs active:scale-95 ${
                      selectedElective === 'EE545'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="EE545: FPGA based Digital Design"
                  >
                    EE545
                  </button>
                </div>

                {/* Lab Batch Selector */}
                <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80 text-xs">
                  <span className="text-slate-400 px-1 font-medium hidden xl:inline">Batch:</span>
                  <button
                    type="button"
                    onClick={() => setSelectedBatch('batch1')}
                    className={`px-2 py-1 rounded-lg font-semibold transition text-xs active:scale-95 ${
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
                    className={`px-2 py-1 rounded-lg font-semibold transition text-xs active:scale-95 ${
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition active:scale-95 shadow-xs"
              title="Change Branch or Semester"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden md:inline">Change Branch</span>
              <span className="md:hidden">Branch</span>
            </button>

            {/* Calendar Export */}
            <button
              type="button"
              onClick={onExportCalendar}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition active:scale-95 shadow-xs"
              title="Download .ics file with timetable & test dates for Google/Apple Calendar"
            >
              <Download className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden xl:inline">Export Calendar (.ics)</span>
              <span className="hidden md:inline xl:hidden">Export (.ics)</span>
              <span className="md:hidden">Export</span>
            </button>

            {/* PWA Info & Local Install Guide Button */}
            <button
              type="button"
              onClick={onOpenPwaGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition active:scale-95 shadow-xs"
              title="Progressive Web App guide & local installation"
            >
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="hidden md:inline">PWA Guide</span>
              <span className="md:hidden">Guide</span>
            </button>
          </div>
        </div>

        {/* Desktop & Tablet Navigation Tabs Bar: Responsive, smooth-scrolling with chevron arrows */}
        <div className="hidden sm:block relative group/nav py-1.5">
          {/* Left scroll chevron button */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => handleScrollNav('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-800/95 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/90 shadow-lg flex items-center justify-center transition active:scale-90"
              aria-label="Scroll navigation tabs left"
            >
              <ChevronLeft className="w-4 h-4 text-amber-400" />
            </button>
          )}

          {/* Left edge fade gradient */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent pointer-events-none z-10" />
          )}

          {/* Nav tabs list */}
          <nav
            ref={navRef}
            className="flex items-center gap-1.5 overflow-x-auto py-1 scroll-smooth scrollbar-none px-1"
            aria-label="Desktop Navigation Tabs"
          >
            {navTabsConfig.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  data-tab={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shrink-0 select-none ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  <span className="hidden xl:inline">{tab.label}</span>
                  <span className="hidden md:inline xl:hidden">{tab.medLabel}</span>
                  <span className="md:hidden">{tab.shortLabel}</span>

                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-black leading-tight ${
                        isActive
                          ? 'bg-slate-950 text-amber-400'
                          : 'bg-rose-500 text-white'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right edge fade gradient */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent pointer-events-none z-10" />
          )}

          {/* Right scroll chevron button */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => handleScrollNav('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-800/95 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/90 shadow-lg flex items-center justify-center transition active:scale-90"
              aria-label="Scroll navigation tabs right"
            >
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
