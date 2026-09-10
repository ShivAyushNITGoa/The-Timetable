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
} from 'lucide-react';
import { ActiveTab } from './Navbar';
import { StudentProfile } from '../data/branchesData';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  testCount: number;
  profile?: StudentProfile;
  onOpenBranchSelector: () => void;
  onExportCalendar: () => void;
  onOpenCustomizer?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  testCount,
  profile,
  onOpenBranchSelector,
  onExportCalendar,
  onOpenCustomizer,
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const isMoreTabActive = ['courses', 'exams', 'academic'].includes(activeTab);

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
                <span className="text-sm font-bold text-white">Campus Portal Menu</span>
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
                <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
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
                className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 shadow-md active:scale-95 min-h-[44px]"
              >
                <Building2 className="w-4 h-4" />
                <span>Switch</span>
              </button>
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
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800/50 text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className={`w-5 h-5 ${activeTab === 'academic' ? 'text-slate-950' : 'text-amber-400'}`} />
                  <div>
                    <div>SGPA Calculator & Academic Hub</div>
                    <div className={`text-[11px] font-normal ${activeTab === 'academic' ? 'text-slate-800' : 'text-slate-400'}`}>
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
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800/50 text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className={`w-5 h-5 ${activeTab === 'courses' ? 'text-slate-950' : 'text-blue-400'}`} />
                  <div>
                    <div>Courses & Faculty Roster</div>
                    <div className={`text-[11px] font-normal ${activeTab === 'courses' ? 'text-slate-800' : 'text-slate-400'}`}>
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
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800/50 text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Award className={`w-5 h-5 ${activeTab === 'exams' ? 'text-slate-950' : 'text-purple-400'}`} />
                  <div>
                    <div>Master Exam Slots</div>
                    <div className={`text-[11px] font-normal ${activeTab === 'exams' ? 'text-slate-800' : 'text-slate-400'}`}>
                      Slot A–H timings & clash prevention
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              {onOpenCustomizer && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    onOpenCustomizer();
                  }}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span>Customize Class Schedule</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onExportCalendar();
                }}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Export to Google/Apple Calendar (.ics)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Ergonomic Bottom Dock for Mobile */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/90 sm:hidden shadow-2xl px-1.5 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] select-none"
        aria-label="Mobile Navigation"
      >
        <div className="grid grid-cols-5 gap-1 items-center max-w-md mx-auto w-full">
          {/* Day Schedule Tab */}
          <button
            type="button"
            onClick={() => handleSelectTab('day')}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-all duration-150 py-1 px-0.5 ${
              activeTab === 'day'
                ? 'text-amber-400 font-bold bg-amber-500/10'
                : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/40'
            }`}
          >
            <Calendar className={`w-5 h-5 transition-transform ${activeTab === 'day' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight truncate whitespace-nowrap">Today</span>
          </button>

          {/* Weekly Matrix Tab */}
          <button
            type="button"
            onClick={() => handleSelectTab('weekly')}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-all duration-150 py-1 px-0.5 ${
              activeTab === 'weekly'
                ? 'text-amber-400 font-bold bg-amber-500/10'
                : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/40'
            }`}
          >
            <Grid className={`w-5 h-5 transition-transform ${activeTab === 'weekly' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight truncate whitespace-nowrap">Week</span>
          </button>

          {/* Tests & Quizzes Tab with Badge */}
          <button
            type="button"
            onClick={() => handleSelectTab('tests')}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-all duration-150 py-1 px-0.5 relative ${
              activeTab === 'tests'
                ? 'text-amber-400 font-bold bg-amber-500/10'
                : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/40'
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
            onClick={() => handleSelectTab('attendance')}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-all duration-150 py-1 px-0.5 ${
              activeTab === 'attendance'
                ? 'text-amber-400 font-bold bg-amber-500/10'
                : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/40'
            }`}
          >
            <CheckSquare className={`w-5 h-5 transition-transform ${activeTab === 'attendance' ? 'scale-110 stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight truncate whitespace-nowrap">Attend</span>
          </button>

          {/* More Menu Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsMoreMenuOpen(true)}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-all duration-150 py-1 px-0.5 ${
              isMoreTabActive || isMoreMenuOpen
                ? 'text-amber-400 font-bold bg-amber-500/10'
                : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/40'
            }`}
          >
            <Menu className={`w-5 h-5 transition-transform ${isMoreTabActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight truncate whitespace-nowrap">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};
