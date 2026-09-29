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
  ShieldCheck,
  LogIn,
  LogOut,
  User as UserIcon,
  Palette,
  Search,
} from 'lucide-react';
import { StudentProfile, DEFAULT_STUDENT_PROFILE, BRANCHES_LIST } from '../data/branchesData';
import { BrandLogo, BrandIcon } from './BrandLogo';
import { User } from 'firebase/auth';
import { useTheme } from '../utils/theme';

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
  currentUser?: User | null;
  isAdmin?: boolean;
  onSignIn?: () => void;
  onSignOut?: () => void;
  onOpenAdmin?: () => void;
  onOpenLanding?: () => void;
  onOpenThemeSelector?: () => void;
  onOpenCommandPalette?: () => void;
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
  currentUser,
  isAdmin,
  onSignIn,
  onSignOut,
  onOpenAdmin,
  onOpenLanding,
  onOpenThemeSelector,
  onOpenCommandPalette,
}) => {
  const safeProfile = profile && profile.branch ? profile : DEFAULT_STUDENT_PROFILE;
  const branchInfo = BRANCHES_LIST.find((b) => b.code === safeProfile.branch) || BRANCHES_LIST[0];
  const { config: themeConfig } = useTheme();

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
            <div className="flex items-center gap-2 min-w-0">
              <BrandIcon size={32} className="rounded-xl shadow-sm shrink-0 ring-1 ring-white/10" />
              <div className="min-w-0">
                <div className="flex items-center gap-1 leading-none">
                  <span className="text-sm font-bold text-white tracking-tight whitespace-nowrap">NIT Goa</span>
                  <span className="text-slate-600 text-xs">•</span>
                  <span className="text-xs font-bold text-blue-400">Timetable</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                  Cuncolim Campus
                </p>
              </div>
            </div>

            {/* Mobile Top Actions */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {/* Quick Command Search */}
              {onOpenCommandPalette && (
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  className="min-h-[38px] min-w-[38px] p-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 border border-slate-700 flex items-center justify-center active:scale-95 transition shadow-xs"
                  title="Quick Command Search (Ctrl+K)"
                  aria-label="Quick Search"
                >
                  <Search className="w-4 h-4 text-slate-300" />
                </button>
              )}

              {/* Theme Palette Switcher */}
              {onOpenThemeSelector && (
                <button
                  type="button"
                  onClick={onOpenThemeSelector}
                  className="min-h-[38px] min-w-[38px] p-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 border border-slate-700 flex items-center justify-center active:scale-95 transition shadow-xs relative"
                  title={`Current Theme: ${themeConfig.name}. Tap to change palette.`}
                  aria-label="Select Color Theme"
                >
                  <Palette className="w-4 h-4" style={{ color: themeConfig.primaryColor }} />
                  <span
                    className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full ring-1 ring-slate-900 shadow-xs"
                    style={{ backgroundColor: themeConfig.primaryColor }}
                  />
                </button>
              )}

              {/* Admin Panel Button */}
              {isAdmin && onOpenAdmin && (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="min-h-[38px] px-2 sm:px-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 active:scale-95 transition shadow-xs"
                  title="Admin Control Panel"
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span className="hidden min-[380px]:inline">Admin</span>
                </button>
              )}

              {/* Landing & About */}
              {onOpenLanding && (
                <button
                  type="button"
                  onClick={onOpenLanding}
                  className="min-h-[38px] min-w-[38px] px-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center justify-center active:scale-95 transition"
                  title="About & PWA Download"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Export Calendar .ics */}
              <button
                type="button"
                onClick={onExportCalendar}
                className="min-h-[38px] min-w-[38px] p-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-blue-400 border border-slate-700 flex items-center justify-center active:scale-95 transition shadow-xs"
                title="Export Calendar (.ics)"
                aria-label="Export Calendar (.ics)"
              >
                <Download className="w-4 h-4" />
              </button>

              {/* User Sign In / Out */}
              {currentUser ? (
                <button
                  type="button"
                  onClick={onSignOut}
                  className="min-h-[38px] min-w-[38px] p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center transition"
                  title={`Signed in as ${currentUser.email}. Click to sign out.`}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              ) : onSignIn ? (
                <button
                  type="button"
                  onClick={onSignIn}
                  className="min-h-[38px] px-2 sm:px-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs flex items-center gap-1 transition shadow-xs"
                  title="Sign In with Google"
                >
                  <LogIn className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="hidden min-[380px]:inline">Login</span>
                </button>
              ) : null}
            </div>
          </div>

          {/* Dedicated Ultra-Prominent Branch & Semester Active Status Banner */}
          <button
            type="button"
            onClick={onOpenBranchSelector}
            className="w-full mt-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600/15 via-slate-800 to-slate-800/95 border border-blue-500/40 hover:border-blue-400 active:border-blue-300 flex items-center justify-between gap-2.5 transition active:scale-[0.99] text-left shadow-md group"
            aria-label="Switch Branch, Year, or Semester"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-blue-600 text-white tracking-wider shadow-xs shrink-0">
                {safeProfile.branch}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-black text-blue-200">
                    {safeProfile.semester <= 2
                      ? `Sem ${safeProfile.semester} • Section ${safeProfile.firstYearSection || 'A'}`
                      : `Semester ${safeProfile.semester} • Year ${safeProfile.year}`}
                  </span>
                  {safeProfile.branch === 'EEE' && safeProfile.semester === 5 && safeProfile.hasMinor && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
                      CS300M Minor
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 font-medium truncate mt-0.5">
                  {safeProfile.semester <= 2
                    ? `${safeProfile.firstYearSection === 'A' || safeProfile.firstYearSection === 'B' ? 'Physics' : 'Chemistry'} Cycle Curriculum`
                    : branchInfo.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-white bg-blue-600 group-hover:bg-blue-500 px-2.5 py-1.5 rounded-lg shrink-0 transition shadow-xs">
              <span>Change</span>
              <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Mobile Elective & Lab Batch Strip (Always visible when semester has batches) */}
        <div className="sm:hidden pb-2 pt-1 border-t border-slate-800/60 flex items-center justify-between gap-1.5 text-xs flex-wrap">
          {/* Lab Batch Selector */}
          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
            <span className="text-[10px] text-blue-300 font-bold px-1.5">Lab Batch:</span>
            <button
              type="button"
              onClick={() => setSelectedBatch('batch1')}
              className={`min-h-[32px] px-3 py-0.5 rounded-lg font-bold text-xs transition active:scale-95 ${
                selectedBatch === 'batch1'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Batch 1
            </button>
            <button
              type="button"
              onClick={() => setSelectedBatch('batch2')}
              className={`min-h-[32px] px-3 py-0.5 rounded-lg font-bold text-xs transition active:scale-95 ${
                selectedBatch === 'batch2'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Batch 2
            </button>
          </div>

          {/* Elective Selector (when EEE Sem 5 is active) */}
          {safeProfile.branch === 'EEE' && safeProfile.semester === 5 && (
            <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
              <span className="text-[10px] text-slate-400 font-semibold px-1">Elective:</span>
              <button
                type="button"
                onClick={() => setSelectedElective('EE541')}
                className={`min-h-[32px] px-2.5 py-0.5 rounded-lg font-bold text-xs transition active:scale-95 ${
                  selectedElective === 'EE541'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="EE541 Embedded Systems Design"
              >
                EE541
              </button>
              <button
                type="button"
                onClick={() => setSelectedElective('EE545')}
                className={`min-h-[32px] px-2.5 py-0.5 rounded-lg font-bold text-xs transition active:scale-95 ${
                  selectedElective === 'EE545'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="EE545 FPGA based Digital Design"
              >
                EE545
              </button>
            </div>
          )}
        </div>

        {/* Desktop & Tablet Top Strip (>= sm screens): Responsive, zero-overlap layout */}
        <div className="hidden sm:flex py-2.5 items-center justify-between gap-x-3 gap-y-2 border-b border-slate-800/60 flex-wrap">
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* The GDevelopers Official Brand Logo */}
            <BrandLogo
              iconSize={36}
              showText={true}
              className="shrink-0 transition hover:opacity-95"
            />

            <div className="h-7 w-px bg-slate-800 shrink-0" />

            {/* High-Visibility Primary Branch & Semester Selector Button */}
            <button
              type="button"
              onClick={onOpenBranchSelector}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-blue-500/30 hover:border-blue-400 text-left transition shadow-sm group active:scale-[0.98] shrink-0"
              title="Click to switch Branch, Year, or Semester"
            >
              <span className="px-2 py-0.5 rounded-md text-xs font-black bg-blue-600 text-white tracking-wider shadow-xs shrink-0">
                {safeProfile.branch}
              </span>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs md:text-sm font-bold text-blue-200 whitespace-nowrap">
                    {safeProfile.semester <= 2
                      ? `Sem ${safeProfile.semester} (Sec ${safeProfile.firstYearSection || 'A'})`
                      : `Sem ${safeProfile.semester} • Year ${safeProfile.year}`}
                  </span>
                  {safeProfile.branch === 'EEE' && safeProfile.semester === 5 && safeProfile.hasMinor && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
                      CS300M
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 font-medium truncate max-w-[130px] md:max-w-[180px] lg:max-w-[240px]">
                  {safeProfile.semester <= 2
                    ? `${safeProfile.firstYearSection === 'A' || safeProfile.firstYearSection === 'B' ? 'Physics' : 'Chemistry'} Cycle`
                    : branchInfo.name}
                </span>
              </div>

              <div className="flex items-center text-[11px] font-bold text-white bg-blue-600 group-hover:bg-blue-500 px-2 py-1 rounded-lg ml-1 shrink-0 transition shadow-xs">
                <span>Switch</span>
                <ChevronDown className="w-3.5 h-3.5 ml-0.5 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>

          {/* Quick Config Strip: Batch Selector & Action Buttons (wraps cleanly when space is tight) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-wrap justify-end ml-auto">
            {/* Lab Batch Selector - Visible for all semesters with laboratory sessions */}
            <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 text-xs">
              <span className="text-slate-300 px-1.5 font-bold hidden lg:inline">Lab Batch:</span>
              <span className="text-slate-300 px-1 font-bold lg:hidden">Batch:</span>
              <button
                type="button"
                onClick={() => setSelectedBatch('batch1')}
                className={`px-2.5 py-1 rounded-lg font-bold transition text-xs active:scale-95 ${
                  selectedBatch === 'batch1'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Select Batch 1 for laboratory sessions"
              >
                Batch 1
              </button>
              <button
                type="button"
                onClick={() => setSelectedBatch('batch2')}
                className={`px-2.5 py-1 rounded-lg font-bold transition text-xs active:scale-95 ${
                  selectedBatch === 'batch2'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Select Batch 2 for laboratory sessions"
              >
                Batch 2
              </button>
            </div>

            {/* Elective Selector (when EEE Sem 5 is active) */}
            {safeProfile.branch === 'EEE' && safeProfile.semester === 5 && (
              <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 text-xs">
                <span className="text-slate-400 px-1 font-medium hidden xl:inline">Elective:</span>
                <button
                  type="button"
                  onClick={() => setSelectedElective('EE541')}
                  className={`px-2 py-1 rounded-lg font-semibold transition text-xs active:scale-95 ${
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
                  className={`px-2 py-1 rounded-lg font-semibold transition text-xs active:scale-95 ${
                    selectedElective === 'EE545'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="EE545: FPGA based Digital Design"
                >
                  EE545
                </button>
              </div>
            )}

            {/* Quick Command Search (Ctrl+K) */}
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 text-xs font-medium transition active:scale-95 shadow-xs"
                title="Search courses, venues & tools (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden lg:inline">Search...</span>
                <kbd className="hidden xl:inline-block px-1.5 py-0.2 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-400">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Calendar Export */}
            <button
              type="button"
              onClick={onExportCalendar}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition active:scale-95 shadow-xs"
              title="Download .ics file with timetable & test dates for Google/Apple Calendar"
            >
              <Download className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="hidden xl:inline">Export Calendar (.ics)</span>
              <span className="hidden md:inline xl:hidden">Export (.ics)</span>
              <span className="md:hidden">Export</span>
            </button>

            {/* Theme Selector Button */}
            {onOpenThemeSelector && (
              <button
                type="button"
                onClick={onOpenThemeSelector}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs font-semibold transition active:scale-95 shadow-xs shrink-0"
                title={`Color Theme: ${themeConfig.name} (Click to change)`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs ring-1 ring-white/20"
                  style={{ backgroundColor: themeConfig.primaryColor }}
                />
                <Palette className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="hidden lg:inline">{themeConfig.name.replace('NIT Goa ', '')}</span>
              </button>
            )}

            {/* About & PWA Guide */}
            {onOpenLanding && (
              <button
                type="button"
                onClick={onOpenLanding}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs font-semibold transition active:scale-95 shadow-xs shrink-0"
                title="NIT Goa Info & PWA Download"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="hidden xl:inline">About & Install</span>
                <span className="xl:hidden">About</span>
              </button>
            )}

            {/* Admin Panel Button (Visible for ashivamone@gmail.com) */}
            {isAdmin && onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition active:scale-95 shadow-md shadow-blue-600/20 shrink-0"
                title="Open Administrator Control Panel"
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden xl:inline">Admin Panel</span>
                <span className="xl:hidden">Admin</span>
              </button>
            )}

            {/* Google Authentication Status */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800 shrink-0">
                <div className="text-right hidden xl:block">
                  <div className="text-[11px] font-bold text-white leading-tight">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight truncate max-w-[130px]">
                    {currentUser.email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : onSignIn ? (
              <button
                type="button"
                onClick={onSignIn}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition active:scale-95 shadow-xs shrink-0"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign In</span>
              </button>
            ) : null}
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
              <ChevronLeft className="w-4 h-4 text-blue-400" />
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
                  className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0 select-none ${
                    isActive
                      ? 'text-white font-bold shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
                  }`}
                  style={{
                    backgroundColor: isActive ? themeConfig.primaryColor : undefined,
                    boxShadow: isActive ? `0 4px 14px 0 ${themeConfig.primaryColor}40` : undefined,
                  }}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  <span className="hidden xl:inline">{tab.label}</span>
                  <span className="hidden md:inline xl:hidden">{tab.medLabel}</span>
                  <span className="md:hidden">{tab.shortLabel}</span>

                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-black leading-tight ${
                        isActive
                          ? 'bg-slate-900 text-white'
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
              <ChevronRight className="w-4 h-4 text-blue-400" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
