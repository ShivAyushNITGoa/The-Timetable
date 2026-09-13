import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { DayScheduleView } from './components/DayScheduleView';
import { WeeklyGridView } from './components/WeeklyGridView';
import { CoursesDirectory } from './components/CoursesDirectory';
import { AttendanceTracker } from './components/AttendanceTracker';
import { ExamScheduleView } from './components/ExamScheduleView';
import { AcademicPortalView } from './components/AcademicPortalView';
import { ResourcesView } from './components/ResourcesView';
import { TestCalendarView } from './components/TestCalendarView';
import { BranchYearSelector } from './components/BranchYearSelector';
import { ScheduleCustomizerModal } from './components/ScheduleCustomizerModal';
import { CourseModal } from './components/CourseModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { BrandLogo } from './components/BrandLogo';
import {
  StudentProfile,
  DEFAULT_STUDENT_PROFILE,
  getActiveBranchSemesterData,
  BRANCHES_LIST,
} from './data/branchesData';
import { AcademicTest } from './data/testTypes';
import {
  getStoredTests,
  saveStoredTests,
  addAcademicTest,
  updateAcademicTest,
  deleteAcademicTest,
} from './utils/testStorage';
import { downloadICS } from './utils/calendarExport';
import { TimeSlot, DayOfWeek } from './data/timetableData';
import { initPWA } from './pwa';
import {
  Sparkles,
  CalendarCheck,
  Building2,
  CheckCircle,
  Sliders,
  ChevronRight,
  Plus,
  Mail,
  AlertTriangle,
  Code,
  Info,
} from 'lucide-react';
import { PwaInstallGuideModal } from './components/PwaInstallGuideModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    try {
      const saved = localStorage.getItem('nit_goa_active_tab') as ActiveTab;
      if (saved && ['day', 'weekly', 'courses', 'tests', 'attendance', 'exams', 'academic', 'resources'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.error(e);
    }
    return 'day';
  });

  const handleSetActiveTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    try {
      localStorage.setItem('nit_goa_active_tab', tab);
    } catch (e) {
      console.error(e);
    }
  };

  // Universal Student Profile (Branch, Year, Semester, Batch, Elective, Minor)
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('nit_goa_student_profile');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.branch) {
          return {
            ...DEFAULT_STUDENT_PROFILE,
            ...parsed,
          };
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_STUDENT_PROFILE;
  });

  const safeProfile: StudentProfile = profile && profile.branch ? profile : DEFAULT_STUDENT_PROFILE;

  // Active Branch & Semester Dataset
  const activeBranchData = getActiveBranchSemesterData(
    safeProfile.branch,
    safeProfile.semester,
    safeProfile.firstYearSection
  );

  // Determine default day based on saved day or today's date
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(() => {
    try {
      const saved = localStorage.getItem('nit_goa_selected_day') as DayOfWeek;
      const validDays: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      if (saved && validDays.includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.error(e);
    }
    const day = new Date().getDay();
    const daysMap: Record<number, DayOfWeek> = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    };
    return daysMap[day] || 'Monday';
  });

  const handleSelectDay = (day: DayOfWeek) => {
    setSelectedDay(day);
    try {
      localStorage.setItem('nit_goa_selected_day', day);
    } catch (e) {
      console.error(e);
    }
  };

  // Elective Choice (EE541 vs EE545 for EEE, or from profile)
  const [selectedElective, setSelectedElective] = useState<string>(() => {
    return safeProfile.elective || safeProfile.electiveCode || 'EE541';
  });

  const handleUpdateElective = (elective: string) => {
    setSelectedElective(elective);
    setProfile((prev) => {
      const updated = {
        ...prev,
        elective,
        electiveCode: elective,
      };
      try {
        localStorage.setItem('nit_goa_student_profile', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Lab Batch Choice (batch1 vs batch2)
  const [selectedBatch, setSelectedBatch] = useState<string>(() => {
    return safeProfile.batch || safeProfile.labBatch || 'batch1';
  });

  const handleUpdateBatch = (batch: string) => {
    setSelectedBatch(batch);
    setProfile((prev) => {
      const updated = {
        ...prev,
        batch,
        labBatch: batch,
      };
      try {
        localStorage.setItem('nit_goa_student_profile', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Customized Schedule Override (persisted per branch/sem)
  const [scheduleOverride, setScheduleOverride] = useState<
    Record<DayOfWeek, TimeSlot[]> | null
  >(() => {
    try {
      const key = `nit_goa_schedule_${safeProfile.branch}_${safeProfile.semester}`;
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  // Academic Tests List
  const [tests, setTests] = useState<AcademicTest[]>(() => {
    return getStoredTests();
  });

  // Modal states
  const [isBranchSelectorOpen, setIsBranchSelectorOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isPwaModalOpen, setIsPwaModalOpen] = useState(false);
  const [activeModalCourse, setActiveModalCourse] = useState<string | null>(null);
  const [scheduleTestCourseCode, setScheduleTestCourseCode] = useState<string | null>(null);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // PWA initialization
  useEffect(() => {
    initPWA();
  }, []);

  // Save profile to localStorage
  useEffect(() => {
    try {
      if (profile && profile.branch) {
        localStorage.setItem('nit_goa_student_profile', JSON.stringify(profile));
      }
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  // Sync tests from localStorage
  const refreshTests = () => {
    setTests(getStoredTests());
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Profile save handler from modal
  const handleSaveProfile = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    if (newProfile.elective) setSelectedElective(newProfile.elective);
    else if (newProfile.electiveCode) setSelectedElective(newProfile.electiveCode);
    if (newProfile.batch) setSelectedBatch(newProfile.batch);
    else if (newProfile.labBatch) setSelectedBatch(newProfile.labBatch);

    // Reset schedule override if branch/sem changed
    const key = `nit_goa_schedule_${newProfile.branch}_${newProfile.semester}`;
    const saved = localStorage.getItem(key);
    setScheduleOverride(saved ? JSON.parse(saved) : null);

    showToast(
      `Switched to Year ${newProfile.year} • Semester ${newProfile.semester} (${newProfile.branch})`
    );
  };

  // Schedule customization save handler
  const handleSaveScheduleDay = (
    day: DayOfWeek,
    slots: TimeSlot[]
  ) => {
    const currentSchedule = scheduleOverride || activeBranchData.schedule;
    const updated = {
      ...currentSchedule,
      [day]: slots,
    };
    setScheduleOverride(updated);
    try {
      localStorage.setItem(
        `nit_goa_schedule_${safeProfile.branch}_${safeProfile.semester}`,
        JSON.stringify(updated)
      );
    } catch (e) {
      console.error(e);
    }
    showToast(`Saved customized timetable for ${day}`);
  };

  const handleResetSchedule = () => {
    setScheduleOverride(null);
    try {
      localStorage.removeItem(`nit_goa_schedule_${safeProfile.branch}_${safeProfile.semester}`);
    } catch (e) {
      console.error(e);
    }
    showToast('Reset timetable to official institute master schedule');
  };

  // Test operations
  const handleAddTest = (newTest: Omit<AcademicTest, 'id' | 'createdAt'>) => {
    addAcademicTest(newTest);
    refreshTests();
    showToast(`Added test for ${newTest.courseCode}: ${newTest.title}`);
  };

  const handleUpdateTest = (updatedTest: AcademicTest) => {
    updateAcademicTest(updatedTest);
    refreshTests();
    showToast(`Updated: ${updatedTest.title}`);
  };

  const handleDeleteTest = (id: string) => {
    deleteAcademicTest(id);
    refreshTests();
    showToast('Test removed from calendar');
  };

  // Export calendar handler
  const handleExportCalendar = () => {
    const effectiveSchedule = scheduleOverride || activeBranchData.schedule;
    downloadICS({
      branch: safeProfile.branch,
      semester: safeProfile.semester,
      schedule: effectiveSchedule,
      courses: activeBranchData.courses,
      tests,
      elective: selectedElective,
      batch: selectedBatch,
    });
    showToast('Timetable & scheduled tests exported as .ics calendar file!');
  };

  const effectiveSchedule = scheduleOverride || activeBranchData.schedule;
  const branchInfo = BRANCHES_LIST.find((b) => b.code === safeProfile.branch) || BRANCHES_LIST[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Main Navigation Header with Branch Switcher & Test Tab */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
        profile={safeProfile}
        onOpenBranchSelector={() => setIsBranchSelectorOpen(true)}
        selectedElective={selectedElective}
        setSelectedElective={handleUpdateElective}
        selectedBatch={selectedBatch}
        setSelectedBatch={handleUpdateBatch}
        onExportCalendar={handleExportCalendar}
        testCount={tests.length}
        onOpenPwaGuide={() => setIsPwaModalOpen(true)}
      />

      {/* Universal Student Profile Context Strip (Hidden on mobile to preserve vertical screen estate) */}
      <div className="hidden sm:block bg-slate-900/70 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>
              Active Curriculum:{' '}
              <strong className="text-white">
                {safeProfile.semester <= 2
                  ? `B.Tech 1st Year (Section ${safeProfile.firstYearSection || 'A'}) • Sem ${safeProfile.semester} (${
                      (safeProfile.firstYearSection === 'C' || safeProfile.firstYearSection === 'D')
                        ? (safeProfile.semester === 1 ? 'Chemistry Cycle' : 'Physics Cycle')
                        : (safeProfile.semester === 1 ? 'Physics Cycle' : 'Chemistry Cycle')
                    } • ${safeProfile.branch})`
                  : `B.Tech ${safeProfile.year}${
                      safeProfile.year === 2 ? 'nd' : safeProfile.year === 3 ? 'rd' : 'th'
                    } Year • Sem ${safeProfile.semester} (${safeProfile.branch} - ${branchInfo.name})`}
              </strong>
            </span>

            {safeProfile.branch === 'EEE' && safeProfile.semester === 5 && safeProfile.hasMinor && (
              <>
                <span className="text-slate-600">•</span>
                <span className="text-cyan-300 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  CS300M (CSE Minor) Active
                </span>
              </>
            )}

            {scheduleOverride && (
              <span className="px-2 py-0.2 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                Custom Schedule Active
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            {/* Quick Test reminder badge */}
            <button
              onClick={() => setActiveTab('tests')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 transition text-[11px] font-semibold border border-slate-700"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{tests.length} Tests in Calendar</span>
            </button>

            {/* Change Profile CTA */}
            <button
              onClick={() => setIsBranchSelectorOpen(true)}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-amber-400 transition"
              title="Change your branch or academic year"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="underline decoration-slate-700">Switch Branch / Year</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))] sm:pb-8">
        {/* Day Schedule Tab */}
        {activeTab === 'day' && (
          <DayScheduleView
            selectedDay={selectedDay}
            onSelectDay={handleSelectDay}
            selectedElective={selectedElective}
            selectedBatch={selectedBatch}
            onOpenCourseModal={setActiveModalCourse}
            schedule={effectiveSchedule}
            courses={activeBranchData.courses}
            branch={safeProfile.branch}
            semester={safeProfile.semester}
            tests={tests}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
            onNavigateToTests={() => setActiveTab('tests')}
            onScheduleTest={(courseCode) => {
              if (courseCode) setScheduleTestCourseCode(courseCode);
              setActiveTab('tests');
            }}
          />
        )}

        {/* Weekly Matrix Grid Tab */}
        {activeTab === 'weekly' && (
          <WeeklyGridView
            schedule={effectiveSchedule}
            courses={activeBranchData.courses}
            selectedElective={selectedElective}
            selectedBatch={selectedBatch}
            onOpenCourseModal={setActiveModalCourse}
            branch={safeProfile.branch}
            semester={safeProfile.semester}
          />
        )}

        {/* Tests & Quizzes Calendar Tab */}
        {activeTab === 'tests' && (
          <TestCalendarView
            tests={tests}
            onAddTest={handleAddTest}
            onUpdateTest={handleUpdateTest}
            onDeleteTest={handleDeleteTest}
            onExportCalendar={handleExportCalendar}
            courses={activeBranchData.courses}
            branch={safeProfile.branch}
            semester={safeProfile.semester}
            initialCourseCode={scheduleTestCourseCode}
            onClearInitialCourseCode={() => setScheduleTestCourseCode(null)}
          />
        )}

        {/* Courses Directory Tab */}
        {activeTab === 'courses' && (
          <CoursesDirectory
            onOpenCourseModal={setActiveModalCourse}
            selectedElective={selectedElective}
            courses={activeBranchData.courses}
            branch={safeProfile.branch}
            semester={safeProfile.semester}
          />
        )}

        {/* 75% Attendance Tracker Tab */}
        {activeTab === 'attendance' && (
          <AttendanceTracker
            courses={activeBranchData.courses}
            selectedElective={selectedElective}
            branch={safeProfile.branch}
            semester={safeProfile.semester}
          />
        )}

        {/* Exam Slots Tab */}
        {activeTab === 'exams' && (
          <ExamScheduleView
            courses={activeBranchData.courses}
            selectedElective={selectedElective}
            onOpenCourseModal={setActiveModalCourse}
            branch={safeProfile.branch}
            semester={safeProfile.semester}
          />
        )}

        {/* SGPA & Academic Hub Tab */}
        {activeTab === 'academic' && (
          <AcademicPortalView
            courses={activeBranchData.courses}
            selectedElective={selectedElective}
            onOpenCourseModal={setActiveModalCourse}
            branch={safeProfile.branch}
            semester={safeProfile.semester}
            onOpenPwaGuide={() => setIsPwaModalOpen(true)}
          />
        )}

        {/* Resources & Official Documents Repository Tab */}
        {activeTab === 'resources' && (
          <ResourcesView
            profile={safeProfile}
          />
        )}
      </main>

      {/* Universal Branch & Year Selection Modal */}
      <BranchYearSelector
        isOpen={isBranchSelectorOpen}
        onClose={() => setIsBranchSelectorOpen(false)}
        profile={safeProfile}
        currentProfile={safeProfile}
        onSaveProfile={handleSaveProfile}
      />

      {/* Schedule Customizer Modal */}
      <ScheduleCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        selectedDay={selectedDay}
        currentSlots={effectiveSchedule[selectedDay] || []}
        courses={activeBranchData.courses}
        onSaveSlots={(slots) => handleSaveScheduleDay(selectedDay, slots)}
        onResetSchedule={handleResetSchedule}
      />

      {/* Course Detail Modal */}
      <CourseModal
        courseCode={activeModalCourse}
        courses={activeBranchData.courses}
        onClose={() => setActiveModalCourse(null)}
        onTrackAttendance={() => {
          setActiveTab('attendance');
          showToast(`Switched to Attendance Tracker for ${activeModalCourse}`);
        }}
        onScheduleTest={(courseCode) => {
          setScheduleTestCourseCode(courseCode);
          setActiveTab('tests');
          showToast(`Scheduling new assessment for ${courseCode}`);
        }}
      />

      {/* PWA Information & Local Installation Guide Modal */}
      <PwaInstallGuideModal
        isOpen={isPwaModalOpen}
        onClose={() => setIsPwaModalOpen(false)}
      />

      {/* Mobile Bottom Navigation Bar (Docked on < sm screens) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
        testCount={tests.length}
        profile={safeProfile}
        onOpenBranchSelector={() => setIsBranchSelectorOpen(true)}
        onExportCalendar={handleExportCalendar}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenPwaGuide={() => setIsPwaModalOpen(true)}
      />

      {/* Floating Action Toast Notification (positioned cleanly above mobile nav) */}
      {toastMessage && (
        <div className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] sm:bottom-6 right-4 sm:right-6 z-50 bg-slate-900/95 backdrop-blur-md border border-amber-500/40 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 max-w-[calc(100vw-2rem)]">
          <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs sm:text-sm font-medium truncate">{toastMessage}</span>
        </div>
      )}

      {/* Institutional Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-900/90 py-8 text-xs text-slate-400 pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))] sm:pb-8 overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-6 w-full">
          {/* Main Footer Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left max-w-full w-full">
              {/* The GDevelopers Brand Logo in Footer */}
              <BrandLogo
                iconSize={36}
                showText={true}
                variant="dark"
                subtitle="Engineering Student Solutions"
                className="justify-center sm:justify-start max-w-full"
              />

              <div className="h-10 w-px bg-slate-800 hidden sm:block shrink-0" />

              <div className="max-w-full">
                <div className="text-slate-200 font-semibold break-words">
                  National Institute of Technology Goa • राष्ट्रीय प्रौद्योगिकी संस्थान गोवा
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 break-words">
                  B.Tech Timetable Portal • Cuncolim Campus
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] text-slate-400 max-w-full">
              <div className="text-center sm:text-right">
                <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Academics</span>
                <span className="text-slate-300">Dr. Mini (Dean)</span> • <span className="text-slate-300">Dr. Suresh Mikkili (Timetable)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#9EB81E] animate-pulse"></span>
                <span className="text-slate-300 font-medium text-[11px]">Powered by The GDevelopers</span>
              </div>

              {/* Small PWA i-button in Footer */}
              <button
                type="button"
                onClick={() => setIsPwaModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold transition active:scale-95 shrink-0"
                title="This is a Progressive Web App. Click for offline installation guide."
              >
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>PWA • Install Locally</span>
              </button>
            </div>
          </div>

          {/* Credits & Official Disclaimer Strip (Responsive Mobile-First) */}
          <div className="pt-5 border-t border-slate-800/80 flex flex-col gap-3.5 w-full">
            {/* Unofficial Disclaimer & Correction Email Alert Card */}
            <div className="w-full bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-sm">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Disclaimer
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-amber-200">
                      This is not an official portal of NIT Goa
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Report any mistake or schedule correction on email:
                  </p>
                </div>
              </div>

              {/* Direct Mail Action Button (Optimized 44px+ touch target on mobile) */}
              <a
                href="mailto:shivshivamxyz@gmail.com?subject=NIT%20Goa%20Timetable%20Correction"
                className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-md shadow-amber-500/15 shrink-0 text-center"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span className="break-all">shivshivamxyz@gmail.com</span>
              </a>
            </div>

            {/* Architect & Developer Attribution Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left px-1">
              <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Code className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Architect and developer of this portal:</span>
                </div>
                <span className="text-slate-100 font-bold text-xs bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-700/80">
                  Ayush Kumar
                </span>
              </div>

              <div className="text-[11px] text-slate-500">
                Cuncolim Campus • All B.Tech Branches & Years
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
