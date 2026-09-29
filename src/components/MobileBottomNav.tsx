import React, { useState } from 'react';
import {
  Calendar,
  Grid,
  CalendarCheck,
  CheckSquare,
  Menu,
  X,
  BookOpen,
  Award,
  GraduationCap,
  Building2,
  Download,
  Sliders,
  ChevronRight,
  Mail,
  Info,
  FileText,
  ShieldCheck,
  Cloud,
  LogOut,
  LogIn,
  Sparkles,
  Palette,
} from 'lucide-react';
import { ActiveTab } from './Navbar';
import { StudentProfile } from '../data/branchesData';
import { User } from 'firebase/auth';
import { useTheme } from '../utils/theme';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  testCount: number;
  profile?: StudentProfile;
  onOpenBranchSelector: () => void;
  onExportCalendar: () => void;
  onOpenCustomizer?: () => void;
  onOpenPwaGuide?: () => void;
  currentUser?: User | null;
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
  onSignIn?: () => void;
  onSignOut?: () => void;
  onOpenLanding?: () => void;
  onOpenThemeSelector?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  testCount,
  profile,
  onOpenBranchSelector,
  onExportCalendar,
  onOpenCustomizer,
  onOpenPwaGuide,
  currentUser,
  isAdmin,
  onOpenAdmin,
  onSignIn,
  onSignOut,
  onOpenLanding,
  onOpenThemeSelector,
}) => {
  const { config: themeConfig } = useTheme();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const isMoreTabActive = ['courses', 'exams', 'academic', 'resources'].includes(activeTab);

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMoreMenuOpen(false);
  };

  return (
    <>
      {/* "More" Drawer / Action Sheet for Mobile */}
      {isMoreMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm sm:hidden flex flex-col justify-end animate-in fade-in duration-200"
          onClick={() => setIsMoreMenuOpen(false)}
        >
          <div
            className="bg-slate-900 border-t border-slate-700/80 rounded-t-3xl p-5 pb-[max(1.75rem,env(safe-area-inset-bottom,0px))] max-h-[85vh] overflow-y-auto shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle & Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-slate-700 rounded-full mx-auto" />
                <span className="text-sm font-bold text-white">Academic Navigation</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMoreMenuOpen(false)}
                className="w-11 h-11 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Profile Summary & Switch */}
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/70 flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
                  Active Department
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {profile?.branch || 'EEE'} • Year {profile?.year || 3} • Sem {profile?.semester || 5}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onOpenBranchSelector();
                }}
                className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md active:scale-95 min-h-[44px]"
              >
                <Building2 className="w-4 h-4" />
                <span>Switch</span>
              </button>
            </div>

            {/* Admin Panel Button (Authorized for ashivamone@gmail.com) */}
            {isAdmin && onOpenAdmin && (
              <button
                type="button"
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-between shadow-lg shadow-blue-500/20 active:scale-[0.98] transition border border-blue-400/40"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-slate-950 text-blue-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-black text-xs text-white">Administrator Control Panel</div>
                    <div className="text-[10px] text-blue-100 font-semibold">
                      Live sync timetable slots, syllabi & notices
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white opacity-90" />
              </button>
            )}

            {/* User Account & Cloud Sync Card */}
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/70 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-blue-400 text-[11px] font-bold">
                  <Cloud className="w-3.5 h-3.5" />
                  <span>Cloud & Offline Progress Sync</span>
                </div>
                {currentUser ? (
                  <div className="text-xs text-slate-200 mt-0.5 truncate font-medium">
                    {currentUser.email}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 mt-0.5">
                    Sign in to backup progress
                  </div>
                )}
              </div>
              {currentUser ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    onSignOut?.();
                  }}
                  className="min-h-[40px] px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              ) : onSignIn ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    onSignIn();
                  }}
                  className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-white text-slate-950 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-sm shrink-0"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              ) : null}
            </div>

            {/* Quick Navigation: Primary Views */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                Primary Views
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectTab('day')}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition active:scale-95 ${
                    activeTab === 'day'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-800/80 text-slate-200 hover:bg-slate-800 border border-slate-700/60'
                  }`}
                >
                  <Calendar className={`w-4 h-4 shrink-0 ${activeTab === 'day' ? 'text-white' : 'text-blue-400'}`} />
                  <span className="truncate">Day Schedule</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectTab('weekly')}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition active:scale-95 ${
                    activeTab === 'weekly'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-800/80 text-slate-200 hover:bg-slate-800 border border-slate-700/60'
                  }`}
                >
                  <Grid className={`w-4 h-4 shrink-0 ${activeTab === 'weekly' ? 'text-white' : 'text-blue-400'}`} />
                  <span className="truncate">Weekly Matrix</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectTab('tests')}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between gap-1.5 transition active:scale-95 ${
                    activeTab === 'tests'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-800/80 text-slate-200 hover:bg-slate-800 border border-slate-700/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <CalendarCheck className={`w-4 h-4 shrink-0 ${activeTab === 'tests' ? 'text-white' : 'text-blue-400'}`} />
                    <span className="truncate">Tests & Tasks</span>
                  </div>
                  {testCount > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 bg-rose-500 text-white rounded-full font-black">
                      {testCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectTab('attendance')}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition active:scale-95 ${
                    activeTab === 'attendance'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-800/80 text-slate-200 hover:bg-slate-800 border border-slate-700/60'
                  }`}
                >
                  <CheckSquare className={`w-4 h-4 shrink-0 ${activeTab === 'attendance' ? 'text-white' : 'text-blue-400'}`} />
                  <span className="truncate">Attendance</span>
                </button>
              </div>
            </div>

            {/* Navigation Options */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                More Academic Views
              </div>

              <button
                type="button"
                onClick={() => handleSelectTab('academic')}
                className={`w-full min-h-[48px] px-4 py-3 rounded-2xl text-left font-semibold text-sm flex items-center justify-between transition active:scale-[0.98] ${
                  activeTab === 'academic'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                    : 'bg-slate-800/50 text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className={`w-5 h-5 ${activeTab === 'academic' ? 'text-white' : 'text-blue-400'}`} />
                  <div>
                    <div>SGPA Calculator & Academic Hub</div>
                    <div className={`text-[11px] font-normal ${activeTab === 'academic' ? 'text-blue-100' : 'text-slate-400'}`}>
                      Target GPA, campus labs & facilities
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                type="button"
                onClick={() => handleSelectTab('courses')}
                className={`w-full min-h-[48px] px-4 py-3 rounded-2xl text-left font-semibold text-sm flex items-center justify-between transition active:scale-[0.98] ${
                  activeTab === 'courses'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                    : 'bg-slate-800/50 text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className={`w-5 h-5 ${activeTab === 'courses' ? 'text-white' : 'text-blue-400'}`} />
                  <div>
                    <div>Courses & Faculty Roster</div>
                    <div className={`text-[11px] font-normal ${activeTab === 'courses' ? 'text-blue-100' : 'text-slate-400'}`}>
                      Credits, textbooks, syllabi & coordinators
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                type="button"
                onClick={() => handleSelectTab('exams')}
                className={`w-full min-h-[48px] px-4 py-3 rounded-2xl text-left font-semibold text-sm flex items-center justify-between transition active:scale-[0.98] ${
                  activeTab === 'exams'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                    : 'bg-slate-800/50 text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Award className={`w-5 h-5 ${activeTab === 'exams' ? 'text-white' : 'text-indigo-400'}`} />
                  <div>
                    <div>Master Exam Slots</div>
                    <div className={`text-[11px] font-normal ${activeTab === 'exams' ? 'text-blue-100' : 'text-slate-400'}`}>
                      Slot A–H timings & clash prevention
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                type="button"
                onClick={() => handleSelectTab('resources')}
                className={`w-full min-h-[48px] px-4 py-3 rounded-2xl text-left font-semibold text-sm flex items-center justify-between transition active:scale-[0.98] ${
                  activeTab === 'resources'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                    : 'bg-slate-800/50 text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className={`w-5 h-5 ${activeTab === 'resources' ? 'text-white' : 'text-blue-400'}`} />
                  <div>
                    <div>Official Resources & Syllabi</div>
                    <div className={`text-[11px] font-normal ${activeTab === 'resources' ? 'text-blue-100' : 'text-slate-400'}`}>
                      Open timetables, syllabus books & ordinances
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              {onOpenThemeSelector && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    onOpenThemeSelector();
                  }}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-between transition active:scale-95 shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full shadow-xs ring-1 ring-white/20"
                      style={{ backgroundColor: themeConfig.primaryColor }}
                    />
                    <Palette className="w-4 h-4 text-slate-400" />
                    <span>Colour Theme: <strong className="text-white">{themeConfig.name}</strong></span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Change ↻</span>
                </button>
              )}

              {onOpenCustomizer && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    onOpenCustomizer();
                  }}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <Sliders className="w-4 h-4 text-blue-400" />
                  <span>Customize Class Schedule</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onExportCalendar();
                }}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Export to Google/Apple Calendar (.ics)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onOpenPwaGuide?.();
                }}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95"
              >
                <Info className="w-4 h-4 text-cyan-400" />
                <span>PWA App & Local Install Guide</span>
              </button>

              {onOpenLanding && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    onOpenLanding();
                  }}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-300 border border-blue-500/30 text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>About NIT Goa Timetable & PWA</span>
                </button>
              )}
            </div>

            {/* Mobile Drawer Bottom Disclaimer & Developer */}
            <div className="pt-3 border-t border-slate-800 text-[11px] space-y-2">
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-slate-300">
                <div className="flex items-center gap-1.5 text-blue-300 font-bold text-[10px] uppercase tracking-wide">
                  <span>ℹ️ Notice</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Independent student academic schedule project for NIT Goa. Report any mistake/correction on email:
                </p>
                <a
                  href="mailto:shivshivamxyz@gmail.com?subject=NIT%20Goa%20Timetable%20Correction"
                  className="mt-2 min-h-[38px] px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 font-medium text-xs break-all shadow-sm transition"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>shivshivamxyz@gmail.com</span>
                </a>
              </div>
              <div className="text-center text-[10px] text-slate-500">
                Architect and developer: <strong className="text-slate-300">Ayush Kumar</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Ergonomic Bottom Dock for Mobile */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/90 sm:hidden shadow-2xl px-1 py-1 pb-[max(0.6rem,env(safe-area-inset-bottom,0px))] select-none"
        aria-label="Mobile Navigation"
        role="tablist"
      >
        <div className="grid grid-cols-5 gap-0.5 items-center max-w-md mx-auto w-full">
          {/* Day Schedule Tab */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'day'}
            aria-label="Today Schedule"
            onClick={() => handleSelectTab('day')}
            className={`min-h-[48px] w-full flex flex-col items-center justify-center rounded-xl transition-all duration-150 py-1.5 px-0.5 active:scale-90 ${
              activeTab === 'day'
                ? 'text-blue-400 font-bold bg-blue-500/15 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/50'
            }`}
          >
            <Calendar className={`w-5 h-5 transition-transform ${activeTab === 'day' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight truncate whitespace-nowrap">Today</span>
          </button>

          {/* Weekly Matrix Tab */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'weekly'}
            aria-label="Weekly Timetable Matrix"
            onClick={() => handleSelectTab('weekly')}
            className={`min-h-[48px] w-full flex flex-col items-center justify-center rounded-xl transition-all duration-150 py-1.5 px-0.5 active:scale-90 ${
              activeTab === 'weekly'
                ? 'text-blue-400 font-bold bg-blue-500/15 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/50'
            }`}
          >
            <Grid className={`w-5 h-5 transition-transform ${activeTab === 'weekly' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight truncate whitespace-nowrap">Weekly</span>
          </button>

          {/* Tests & Quizzes Tab with Badge */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'tests'}
            aria-label={`Tests and Tasks Planner${testCount > 0 ? `, ${testCount} tests scheduled` : ''}`}
            onClick={() => handleSelectTab('tests')}
            className={`min-h-[48px] w-full flex flex-col items-center justify-center rounded-xl transition-all duration-150 py-1.5 px-0.5 relative active:scale-90 ${
              activeTab === 'tests'
                ? 'text-blue-400 font-bold bg-blue-500/15 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/50'
            }`}
          >
            <div className="relative">
              <CalendarCheck className={`w-5 h-5 transition-transform ${activeTab === 'tests' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.75]'}`} />
              {testCount > 0 && (
                <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[9px] font-black leading-tight border border-slate-900 pointer-events-none">
                  {testCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate whitespace-nowrap">Tests</span>
          </button>

          {/* Attendance Tracker Tab */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'attendance'}
            aria-label="75 Percent Attendance Tracker"
            onClick={() => handleSelectTab('attendance')}
            className={`min-h-[48px] w-full flex flex-col items-center justify-center rounded-xl transition-all duration-150 py-1.5 px-0.5 active:scale-90 ${
              activeTab === 'attendance'
                ? 'text-blue-400 font-bold bg-blue-500/15 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/50'
            }`}
          >
            <CheckSquare className={`w-5 h-5 transition-transform ${activeTab === 'attendance' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight truncate whitespace-nowrap">
              <span className="hidden min-[360px]:inline">Attendance</span>
              <span className="min-[360px]:hidden">Attend</span>
            </span>
          </button>

          {/* More Menu Drawer Trigger */}
          <button
            type="button"
            role="button"
            aria-haspopup="dialog"
            aria-expanded={isMoreMenuOpen}
            aria-label="More navigation options and menu"
            onClick={() => setIsMoreMenuOpen(true)}
            className={`min-h-[48px] w-full flex flex-col items-center justify-center rounded-xl transition-all duration-150 py-1.5 px-0.5 active:scale-90 relative ${
              isMoreTabActive || isMoreMenuOpen
                ? 'text-blue-400 font-bold bg-blue-500/15 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/50'
            }`}
          >
            <div className="relative">
              <Menu className={`w-5 h-5 transition-transform ${isMoreTabActive || isMoreMenuOpen ? 'scale-110 stroke-[2.5]' : 'stroke-[1.75]'}`} />
              {isAdmin ? (
                <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-blue-600 text-white rounded-full text-[8px] font-black leading-none border border-slate-900 pointer-events-none shadow-xs">
                  ADMIN
                </span>
              ) : isMoreTabActive ? (
                <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-slate-900" />
              ) : null}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate whitespace-nowrap">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};
