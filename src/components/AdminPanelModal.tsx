import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  ShieldCheck,
  Calendar,
  BookOpen,
  Bell,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  User as UserIcon,
  RefreshCw,
  ExternalLink,
  Info,
  Search,
  Filter,
  PlusCircle,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  BRANCH_SEMESTER_DATA,
  BRANCHES_LIST,
  BranchCode,
  getAllKnownCourses,
  getActiveBranchSemesterData,
} from '../data/branchesData';
import { Course, TimeSlot, DayOfWeek } from '../data/timetableData';
import {
  saveTimetableOverride,
  resetTimetableOverride,
  saveCourseOverride,
  resetCourseOverride,
  createAnnouncement,
  toggleAnnouncementActive,
  removeAnnouncement,
  AnnouncementDoc,
} from '../services/firestoreSync';

export interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  announcements?: AnnouncementDoc[];
  timetableOverrides?: Record<string, Record<DayOfWeek, TimeSlot[]>>;
  courseOverrides?: Record<string, Partial<Course>>;
  onOverridesUpdated?: () => void;
  onTimetableUpdated?: (branch: string, sem: number, day: DayOfWeek, slots: TimeSlot[]) => void;
  onCoursesUpdated?: (courseCode: string, override: Partial<Course>) => void;
}

type AdminTab = 'timetable' | 'syllabus' | 'announcements' | 'diagnostics';

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  announcements = [],
  timetableOverrides = {},
  courseOverrides = {},
  onOverridesUpdated,
  onTimetableUpdated,
  onCoursesUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('timetable');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmResetTimetable, setConfirmResetTimetable] = useState(false);
  const [confirmResetCourse, setConfirmResetCourse] = useState(false);

  // Timetable Editor State
  const [selectedBranch, setSelectedBranch] = useState<BranchCode>('CSE');
  const [selectedSemester, setSelectedSemester] = useState<number>(7);
  const [selectedSection, setSelectedSection] = useState<'A' | 'B' | 'C' | 'D'>('C');
  const [editingSchedule, setEditingSchedule] = useState<Record<DayOfWeek, TimeSlot[]>>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');

  // Syllabus & Course Manager State
  const [allCourses, setAllCourses] = useState<Record<string, Course>>({});
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>('CS200');
  const [editingCourse, setEditingCourse] = useState<Partial<Course>>({});
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  const [courseDeptFilter, setCourseDeptFilter] = useState<string>('ALL');
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<string>('ALL');
  const [confirmDeleteCourse, setConfirmDeleteCourse] = useState(false);
  const [newModuleText, setNewModuleText] = useState('');
  const [newBookText, setNewBookText] = useState('');

  // Announcements State
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');
  const [newAnnouncementType, setNewAnnouncementType] = useState<'info' | 'warning' | 'success' | 'urgent'>('info');

  // Initialize course catalog
  useEffect(() => {
    const courses = getAllKnownCourses();
    setAllCourses(courses);
  }, []);

  // Compute key for timetable
  const timetableKey =
    selectedSemester <= 2
      ? `SEC-${selectedSection}-${selectedSemester}`
      : `${selectedBranch}-${selectedSemester}`;

  // Load schedule when selection changes
  useEffect(() => {
    if (timetableOverrides && timetableOverrides[timetableKey]) {
      setEditingSchedule(JSON.parse(JSON.stringify(timetableOverrides[timetableKey])));
    } else {
      const defaultData = getActiveBranchSemesterData(
        selectedBranch,
        selectedSemester,
        selectedSection
      );
      if (defaultData && defaultData.schedule) {
        setEditingSchedule(JSON.parse(JSON.stringify(defaultData.schedule)));
      }
    }
  }, [selectedBranch, selectedSemester, selectedSection, timetableOverrides, timetableKey]);

  // Load course details when selectedCourseCode changes
  useEffect(() => {
    if (!selectedCourseCode) return;
    const base = allCourses[selectedCourseCode] || {
      code: selectedCourseCode,
      name: '',
      credits: 3,
      ltp: '3-0-0',
      coordinator: '',
      room: '',
      category: 'core',
      modules: [],
      textbooks: [],
    };
    const override = (courseOverrides && courseOverrides[selectedCourseCode]) || {};
    setEditingCourse({
      ...base,
      ...override,
      modules: override.modules || base.modules || [],
      textbooks: override.textbooks || base.textbooks || [],
    });
  }, [selectedCourseCode, allCourses, courseOverrides]);

  if (!isOpen) return null;

  // Handlers for Timetable Editor
  const handleSlotChange = (day: DayOfWeek, index: number, field: keyof TimeSlot, value: any) => {
    setEditingSchedule((prev) => {
      const nextDaySlots = [...(prev[day] || [])];
      nextDaySlots[index] = {
        ...nextDaySlots[index],
        [field]: value,
      };
      return {
        ...prev,
        [day]: nextDaySlots,
      };
    });
  };

  const handleAddSlot = (day: DayOfWeek) => {
    const newSlot: TimeSlot = {
      id: `${timetableKey}-${day.toLowerCase().slice(0, 3)}-custom-${Date.now()}`,
      day,
      startTime: '14:00',
      endTime: '14:55',
      slotName: 'Custom Slot',
      courseCode: 'CS200',
      room: 'Room 18',
    };
    setEditingSchedule((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), newSlot],
    }));
  };

  const handleDeleteSlot = (day: DayOfWeek, index: number) => {
    setEditingSchedule((prev) => {
      const nextDaySlots = (prev[day] || []).filter((_, i) => i !== index);
      return {
        ...prev,
        [day]: nextDaySlots,
      };
    });
  };

  const handleSaveTimetable = async () => {
    if (!currentUser?.email) return;
    try {
      setIsSaving(true);
      setSaveStatus(null);
      await saveTimetableOverride(
        timetableKey,
        editingSchedule,
        currentUser.email,
        editingSchedule.Monday?.[0]?.room || ''
      );
      onOverridesUpdated?.();
      if (onTimetableUpdated) {
        DAYS.forEach((day) => {
          onTimetableUpdated(selectedBranch, selectedSemester, day, editingSchedule[day] || []);
        });
      }
      setSaveStatus('Timetable override saved to Firestore successfully!');
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) {
      console.error(err);
      setSaveStatus(`Failed to save: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetTimetable = async () => {
    if (!confirmResetTimetable) {
      setConfirmResetTimetable(true);
      setSaveStatus(`Click Reset again within 4 seconds to confirm resetting ${timetableKey} baseline.`);
      setTimeout(() => setConfirmResetTimetable(false), 4000);
      return;
    }
    setConfirmResetTimetable(false);
    try {
      setIsSaving(true);
      await resetTimetableOverride(timetableKey);
      onOverridesUpdated?.();
      const defaultData = getActiveBranchSemesterData(
        selectedBranch,
        selectedSemester,
        selectedSection
      );
      setEditingSchedule(JSON.parse(JSON.stringify(defaultData.schedule)));
      setSaveStatus('Reset timetable to Master Timetable baseline.');
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) {
      setSaveStatus(`Reset failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Filtered courses for management catalog
  const filteredCourseCodes = useMemo(() => {
    const query = courseSearchQuery.trim().toLowerCase();
    return Object.keys(allCourses)
      .filter((code) => {
        const c = allCourses[code];
        if (!c) return false;
        // Search term matching
        if (query) {
          const matchCode = code.toLowerCase().includes(query);
          const matchName = c.name ? c.name.toLowerCase().includes(query) : false;
          const matchCoord = c.coordinator ? c.coordinator.toLowerCase().includes(query) : false;
          if (!matchCode && !matchName && !matchCoord) return false;
        }
        // Category matching
        if (courseCategoryFilter !== 'ALL' && c.category !== courseCategoryFilter) {
          return false;
        }
        // Department / Branch matching
        if (courseDeptFilter !== 'ALL') {
          if (courseDeptFilter === 'MINOR') {
            if (!c.isMinor && !code.endsWith('M')) return false;
          } else if (courseDeptFilter === 'FIRST_YEAR') {
            const firstYearCodes = [
              'MA100', 'PH100', 'CY100', 'ME100', 'EE100', 'CS100', 'HS100',
              'MA150', 'PH150', 'CY150', 'ME150', 'EE150', 'CS150', 'HS150',
            ];
            if (!firstYearCodes.includes(code)) return false;
          } else if (!code.startsWith(courseDeptFilter)) {
            return false;
          }
        }
        return true;
      })
      .sort();
  }, [allCourses, courseSearchQuery, courseDeptFilter, courseCategoryFilter]);

  // Handlers for Course Management & Syllabus Editor
  const handleCreateNewCourse = () => {
    const prefix = courseDeptFilter !== 'ALL' && courseDeptFilter !== 'FIRST_YEAR' && courseDeptFilter !== 'MINOR'
      ? courseDeptFilter
      : 'CS';
    const newCode = `${prefix}${Math.floor(200 + Math.random() * 600)}`;
    const newCourse: Course = {
      code: newCode,
      name: 'New Academic Course',
      shortName: 'New Course',
      credits: 3,
      ltp: '3-0-0',
      coordinator: 'Department Faculty',
      room: 'Room 18',
      category: 'core',
      type: 'Theory',
      teachingSlot: 'A',
      examSlot: 'Slot A',
      modules: ['Module 1: Fundamental Principles & Core Concepts'],
      textbooks: ['Standard Course Reference Book, 2024 Edition'],
      notes: 'Added via Academic Administrator Console',
      isMinor: false,
    };
    setAllCourses((prev) => ({ ...prev, [newCode]: newCourse }));
    setSelectedCourseCode(newCode);
    setEditingCourse(newCourse);
    setSaveStatus(`Created new course template (${newCode}). Fill in course details and click "Save Course to Cloud".`);
    setTimeout(() => setSaveStatus(null), 5000);
  };

  const handleSaveCourse = async () => {
    if (!currentUser?.email || !editingCourse.code) return;
    try {
      setIsSaving(true);
      setSaveStatus(null);
      const cleanCode = editingCourse.code.trim().toUpperCase();
      const courseToSave: Course = {
        ...(editingCourse as Course),
        code: cleanCode,
      };
      await saveCourseOverride(courseToSave, currentUser.email);
      setAllCourses((prev) => ({
        ...prev,
        [cleanCode]: courseToSave,
      }));
      onOverridesUpdated?.();
      if (onCoursesUpdated) {
        onCoursesUpdated(cleanCode, courseToSave);
      }
      setSelectedCourseCode(cleanCode);
      setSaveStatus(`Course ${cleanCode} saved to Firestore successfully!`);
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) {
      setSaveStatus(`Failed to save course: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetCourse = async () => {
    if (!editingCourse.code) return;
    if (!confirmResetCourse) {
      setConfirmResetCourse(true);
      setSaveStatus(`Click Reset again within 4 seconds to revert ${editingCourse.code} to baseline.`);
      setTimeout(() => setConfirmResetCourse(false), 4000);
      return;
    }
    setConfirmResetCourse(false);
    try {
      setIsSaving(true);
      await resetCourseOverride(editingCourse.code);
      onOverridesUpdated?.();
      const base = allCourses[editingCourse.code];
      if (base) {
        setEditingCourse(JSON.parse(JSON.stringify(base)));
      }
      setSaveStatus(`Reverted ${editingCourse.code} to master curriculum syllabus.`);
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) {
      setSaveStatus(`Revert failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (!editingCourse.code) return;
    const targetCode = editingCourse.code;
    if (!confirmDeleteCourse) {
      setConfirmDeleteCourse(true);
      setSaveStatus(`Click Delete again within 4s to confirm removing ${targetCode} from catalog.`);
      setTimeout(() => setConfirmDeleteCourse(false), 4000);
      return;
    }
    setConfirmDeleteCourse(false);
    try {
      setIsSaving(true);
      await resetCourseOverride(targetCode);
      setAllCourses((prev) => {
        const copy = { ...prev };
        delete copy[targetCode];
        return copy;
      });
      onOverridesUpdated?.();
      setSaveStatus(`Course ${targetCode} removed from active catalog.`);
      const remaining = Object.keys(allCourses).filter((c) => c !== targetCode);
      if (remaining.length > 0) {
        setSelectedCourseCode(remaining[0]);
      }
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) {
      setSaveStatus(`Delete failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Announcements Handlers
  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncementTitle.trim() || !newAnnouncementContent.trim() || !currentUser?.email) return;
    try {
      setIsSaving(true);
      await createAnnouncement(
        newAnnouncementTitle.trim(),
        newAnnouncementContent.trim(),
        newAnnouncementType,
        currentUser.email,
        currentUser.displayName || 'Academic Admin'
      );
      setNewAnnouncementTitle('');
      setNewAnnouncementContent('');
      setSaveStatus('Announcement published live to students!');
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) {
      setSaveStatus(`Failed to post announcement: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Academic Administrator Control Panel
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  SUPERUSER
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Verified Admin: <span className="text-slate-200 font-mono">{currentUser?.email}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 border-b border-slate-800 bg-slate-900 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('timetable')}
            className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'timetable'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar size={15} />
            Timetable Editor
          </button>
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'syllabus'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen size={15} />
            Course Syllabus & LTP
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'announcements'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bell size={15} />
            Broadcast Notices ({announcements.length})
          </button>
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'diagnostics'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck size={15} />
            System & Cloud Status
          </button>
        </div>

        {/* Status Toast / Banner */}
        {saveStatus && (
          <div className="mx-5 mt-4 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info size={16} />
              <span>{saveStatus}</span>
            </div>
            <button onClick={() => setSaveStatus(null)} className="text-slate-400 hover:text-white">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto flex-1 text-slate-200">
          {/* TAB 1: TIMETABLE EDITOR */}
          {activeTab === 'timetable' && (
            <div className="space-y-6">
              {/* Selector Bar */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Semester
                  </label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Semester {s} {s <= 2 ? '(First Year)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedSemester <= 2 ? (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Section
                    </label>
                    <select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="A">Section A (Physics Cycle)</option>
                      <option value="B">Section B (Physics Cycle)</option>
                      <option value="C">Section C (Chemistry Cycle - LH 03)</option>
                      <option value="D">Section D (Chemistry Cycle - LH 04)</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Department Branch
                    </label>
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value as BranchCode)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      {BRANCHES_LIST.map((b) => (
                        <option key={b.code} value={b.code}>
                          {b.code} - {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Editing Target
                  </label>
                  <div className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-indigo-300">
                    {timetableKey}
                  </div>
                </div>

                <div className="flex items-end gap-2">
                  <button
                    onClick={handleSaveTimetable}
                    disabled={isSaving}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow"
                  >
                    <Save size={14} />
                    {isSaving ? 'Saving...' : 'Save Cloud'}
                  </button>
                  <button
                    onClick={handleResetTimetable}
                    disabled={isSaving}
                    title="Reset to Master Timetable baseline"
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>

              {/* Day Selector */}
              <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2">
                {DAYS.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      selectedDay === day
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {day} ({(editingSchedule[day] || []).length})
                  </button>
                ))}
                <button
                  onClick={() => handleAddSlot(selectedDay)}
                  className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-400 text-xs font-semibold transition"
                >
                  <Plus size={14} />
                  Add Slot
                </button>
              </div>

              {/* Slots Table */}
              <div className="space-y-3">
                {(editingSchedule[selectedDay] || []).length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    No slots configured for {selectedDay}. Click "+ Add Slot" above to insert a lecture or lab.
                  </div>
                ) : (
                  (editingSchedule[selectedDay] || []).map((slot, index) => (
                    <div
                      key={slot.id || index}
                      className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/90 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
                    >
                      <div className="md:col-span-2">
                        <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Timing</label>
                        <div className="flex items-center gap-1 text-xs">
                          <input
                            type="text"
                            value={slot.startTime}
                            onChange={(e) => handleSlotChange(selectedDay, index, 'startTime', e.target.value)}
                            className="w-14 bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-center font-mono text-white text-xs"
                          />
                          <span className="text-slate-500">-</span>
                          <input
                            type="text"
                            value={slot.endTime}
                            onChange={(e) => handleSlotChange(selectedDay, index, 'endTime', e.target.value)}
                            className="w-14 bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-center font-mono text-white text-xs"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Slot Name</label>
                        <input
                          type="text"
                          value={slot.slotName || ''}
                          onChange={(e) => handleSlotChange(selectedDay, index, 'slotName', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                          placeholder="Slot A, Slot B, Lab..."
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Course Code</label>
                        <input
                          type="text"
                          value={slot.courseCode || ''}
                          onChange={(e) => handleSlotChange(selectedDay, index, 'courseCode', e.target.value.toUpperCase())}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-amber-300 font-mono text-xs font-bold"
                          placeholder="EE201, FREE, LUNCH..."
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Room Location</label>
                        <input
                          type="text"
                          value={slot.room || ''}
                          onChange={(e) => handleSlotChange(selectedDay, index, 'room', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                          placeholder="Room 18, Room 69..."
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Faculty / Notes</label>
                        <input
                          type="text"
                          value={slot.notes || ''}
                          onChange={(e) => handleSlotChange(selectedDay, index, 'notes', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-300 text-xs"
                          placeholder="Faculty name or details"
                        />
                      </div>

                      <div className="md:col-span-1 flex justify-end">
                        <button
                          onClick={() => handleDeleteSlot(selectedDay, index)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                          title="Delete slot"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: COURSE MANAGEMENT & SYLLABUS */}
          {activeTab === 'syllabus' && (
            <div className="space-y-6">
              {/* Course Catalog Search & Filter Controls */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Search Bar */}
                  <div className="relative flex-1">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={courseSearchQuery}
                      onChange={(e) => setCourseSearchQuery(e.target.value)}
                      placeholder="Search by code (e.g. CS200, EE301), title, or faculty..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    {courseSearchQuery && (
                      <button
                        onClick={() => setCourseSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>

                  {/* Actions & Course Count */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono text-slate-400 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
                      {filteredCourseCodes.length} / {Object.keys(allCourses).length} courses
                    </span>
                    <button
                      onClick={handleCreateNewCourse}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow"
                    >
                      <PlusCircle size={14} />
                      New Course
                    </button>
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                    <Filter size={12} /> Dept:
                  </span>
                  {[
                    { id: 'ALL', label: 'All Depts' },
                    { id: 'CS', label: 'CSE' },
                    { id: 'EC', label: 'ECE' },
                    { id: 'EE', label: 'EEE' },
                    { id: 'ME', label: 'ME' },
                    { id: 'CV', label: 'Civil' },
                    { id: 'FIRST_YEAR', label: '1st Year Common' },
                    { id: 'MINOR', label: 'Minor CSE' },
                  ].map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => setCourseDeptFilter(dept.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
                        courseDeptFilter === dept.id
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {dept.label}
                    </button>
                  ))}

                  <div className="h-4 w-[1px] bg-slate-800 mx-1 hidden sm:block" />

                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Type:</span>
                  {[
                    { id: 'ALL', label: 'All' },
                    { id: 'core', label: 'Core' },
                    { id: 'elective', label: 'Elective' },
                    { id: 'lab', label: 'Lab' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCourseCategoryFilter(cat.id)}
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold transition ${
                        courseCategoryFilter === cat.id
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Course Selector & Save / Revert Actions */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Selected Course to Manage
                    </label>
                    {courseOverrides && courseOverrides[selectedCourseCode] && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                        <ShieldCheck size={10} /> Active Cloud Override
                      </span>
                    )}
                  </div>
                  <select
                    value={selectedCourseCode}
                    onChange={(e) => setSelectedCourseCode(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  >
                    {filteredCourseCodes.length === 0 ? (
                      <option value="">No courses matching current filters</option>
                    ) : (
                      filteredCourseCodes.map((code) => {
                        const c = allCourses[code];
                        const isOverridden = courseOverrides && courseOverrides[code];
                        return (
                          <option key={code} value={code}>
                            {code} - {c?.name ? c.name.slice(0, 48) : 'Course'} {isOverridden ? '⚡ (Overridden)' : ''}
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-2 md:pt-4">
                  <button
                    onClick={handleSaveCourse}
                    disabled={isSaving || !editingCourse.code}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold transition shadow"
                  >
                    <Save size={14} />
                    {isSaving ? 'Saving...' : 'Save Course to Cloud'}
                  </button>
                  <button
                    onClick={handleResetCourse}
                    disabled={isSaving || !editingCourse.code}
                    title="Revert to default curriculum syllabus"
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button
                    onClick={handleDeleteCourse}
                    disabled={isSaving || !editingCourse.code}
                    title="Delete course from catalog"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 text-xs transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Course Form Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-lg bg-slate-950 border border-slate-800">
                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">Course Code</label>
                  <input
                    type="text"
                    value={editingCourse.code || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, code: e.target.value.toUpperCase() })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-amber-300 font-mono font-bold"
                    placeholder="e.g. CS200, EE301"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">Course Title / Name</label>
                  <input
                    type="text"
                    value={editingCourse.name || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-semibold"
                    placeholder="e.g. Data Structures and Algorithms"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">Category</label>
                  <select
                    value={editingCourse.category || 'core'}
                    onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  >
                    <option value="core">Core</option>
                    <option value="elective">Elective</option>
                    <option value="lab">Lab</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">Credits</label>
                  <input
                    type="number"
                    value={editingCourse.credits || 0}
                    onChange={(e) => setEditingCourse({ ...editingCourse, credits: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">L-T-P Ratio</label>
                  <input
                    type="text"
                    value={editingCourse.ltp || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, ltp: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                    placeholder="3-0-0"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">Course Type</label>
                  <select
                    value={editingCourse.type || 'Theory'}
                    onChange={(e) => setEditingCourse({ ...editingCourse, type: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  >
                    <option value="Theory">Theory</option>
                    <option value="Practical">Practical (Lab)</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Elective">Elective</option>
                    <option value="Open Elective">Open Elective</option>
                    <option value="Minor">Minor</option>
                    <option value="MLC">MLC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">Teaching Slot</label>
                  <input
                    type="text"
                    value={editingCourse.teachingSlot || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, teachingSlot: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-indigo-300 font-mono font-bold"
                    placeholder="Slot A, Slot B, Lab..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">Classroom / Lab Location</label>
                  <input
                    type="text"
                    value={editingCourse.room || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, room: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    placeholder="Room 18, Room 8/9, Networks Lab..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">Course Coordinator / Faculty</label>
                  <input
                    type="text"
                    value={editingCourse.coordinator || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, coordinator: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    placeholder="Faculty Name(s)"
                  />
                </div>

                <div className="sm:col-span-4 flex items-center gap-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={!!editingCourse.isMinor}
                      onChange={(e) => setEditingCourse({ ...editingCourse, isMinor: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Mark as Minor Degree Specialization Course (Minor in CSE)</span>
                  </label>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">Course Overview & Notes</label>
                  <textarea
                    rows={2}
                    value={editingCourse.notes || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, notes: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300"
                    placeholder="Overview, prerequisites, or official curriculum handbook notes..."
                  />
                </div>
              </div>

              {/* Modules List */}
              <div className="p-5 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Syllabus Modules ({(editingCourse.modules || []).length})
                  </h3>
                </div>

                {(editingCourse.modules || []).map((mod, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-xs font-bold text-indigo-400 pt-2 shrink-0">{idx + 1}.</span>
                    <textarea
                      rows={2}
                      value={mod}
                      onChange={(e) => {
                        const updated = [...(editingCourse.modules || [])];
                        updated[idx] = e.target.value;
                        setEditingCourse({ ...editingCourse, modules: updated });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                    />
                    <button
                      onClick={() => {
                        const updated = (editingCourse.modules || []).filter((_, i) => i !== idx);
                        setEditingCourse({ ...editingCourse, modules: updated });
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newModuleText}
                    onChange={(e) => setNewModuleText(e.target.value)}
                    placeholder="Module N: Topic details..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                  <button
                    onClick={() => {
                      if (!newModuleText.trim()) return;
                      setEditingCourse({
                        ...editingCourse,
                        modules: [...(editingCourse.modules || []), newModuleText.trim()],
                      });
                      setNewModuleText('');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-400 text-xs font-semibold"
                  >
                    Add Module
                  </button>
                </div>
              </div>

              {/* Textbooks List */}
              <div className="p-5 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Prescribed Textbooks & References ({(editingCourse.textbooks || []).length})
                </h3>

                {(editingCourse.textbooks || []).map((book, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">[{idx + 1}]</span>
                    <input
                      type="text"
                      value={book}
                      onChange={(e) => {
                        const updated = [...(editingCourse.textbooks || [])];
                        updated[idx] = e.target.value;
                        setEditingCourse({ ...editingCourse, textbooks: updated });
                      }}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200"
                    />
                    <button
                      onClick={() => {
                        const updated = (editingCourse.textbooks || []).filter((_, i) => i !== idx);
                        setEditingCourse({ ...editingCourse, textbooks: updated });
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newBookText}
                    onChange={(e) => setNewBookText(e.target.value)}
                    placeholder="Author, 'Book Title', Publisher"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                  <button
                    onClick={() => {
                      if (!newBookText.trim()) return;
                      setEditingCourse({
                        ...editingCourse,
                        textbooks: [...(editingCourse.textbooks || []), newBookText.trim()],
                      });
                      setNewBookText('');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-400 text-xs font-semibold"
                  >
                    Add Book
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <div className="space-y-6">
              {/* Post New Announcement */}
              <form onSubmit={handlePostAnnouncement} className="p-5 rounded-lg bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Bell size={14} className="text-amber-400" />
                  Broadcast Live Academic Notice
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">Notice Title</label>
                    <input
                      type="text"
                      required
                      value={newAnnouncementTitle}
                      onChange={(e) => setNewAnnouncementTitle(e.target.value)}
                      placeholder="e.g. Schedule Change: Slot E cancelled on Friday"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">Notice Type</label>
                    <select
                      value={newAnnouncementType}
                      onChange={(e) => setNewAnnouncementType(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    >
                      <option value="info">Information (Blue)</option>
                      <option value="warning">Warning / Alert (Amber)</option>
                      <option value="urgent">Urgent / Important (Red)</option>
                      <option value="success">Event / Good News (Green)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">Notice Details</label>
                  <textarea
                    rows={3}
                    required
                    value={newAnnouncementContent}
                    onChange={(e) => setNewAnnouncementContent(e.target.value)}
                    placeholder="Enter message for students and faculty..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-200"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow flex items-center gap-2"
                  >
                    <Bell size={14} />
                    Publish Broadcast Notice
                  </button>
                </div>
              </form>

              {/* List of Announcements */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Active & Past Broadcasts ({announcements.length})
                </h3>

                {announcements.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs bg-slate-950 rounded-lg border border-slate-800">
                    No announcements published yet. Post one above to show on student screens.
                  </div>
                ) : (
                  announcements.map((ann) => (
                    <div
                      key={ann.id}
                      className={`p-4 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        ann.active
                          ? 'bg-slate-950 border-slate-800'
                          : 'bg-slate-950/40 border-slate-800/40 opacity-60'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              ann.type === 'urgent'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : ann.type === 'warning'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : ann.type === 'success'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            }`}
                          >
                            {ann.type}
                          </span>
                          <h4 className="text-sm font-semibold text-white">{ann.title}</h4>
                        </div>
                        <p className="text-xs text-slate-300">{ann.content}</p>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2">
                          <span>By: {ann.authorName}</span>
                          <span>•</span>
                          <span>{new Date(ann.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => toggleAnnouncementActive(ann.id, ann.active)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                            ann.active
                              ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {ann.active ? 'Disable' : 'Enable'}
                        </button>
                        <button
                          onClick={() => removeAnnouncement(ann.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: DIAGNOSTICS */}
          {activeTab === 'diagnostics' && (
            <div className="space-y-6">
              <div className="p-5 rounded-lg bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  Cloud Firebase Security & Storage Status
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-slate-400">Firebase Project ID</div>
                    <div className="text-white font-mono font-bold mt-1">nifty-cursor-gjlsj</div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-slate-400">Firestore Database ID</div>
                    <div className="text-white font-mono font-bold mt-1 text-[11px] truncate">
                      ai-studio-thetimetable-bbc64c6a-3ecd-43a7-992a-0f1184c7b5a4
                    </div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-slate-400">Authorized Admin Email</div>
                    <div className="text-amber-300 font-mono font-bold mt-1">ashivamone@gmail.com</div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-slate-400">Security Rules Status</div>
                    <div className="text-emerald-400 font-bold mt-1 flex items-center gap-1.5">
                      <CheckCircle2 size={14} /> Deployed & Hardened
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                  <div className="font-semibold text-slate-200">Active Live Overrides Summary:</div>
                  <div className="flex gap-4 text-slate-400">
                    <div>
                      Custom Timetables in Firestore:{' '}
                      <strong className="text-white">{Object.keys(timetableOverrides || {}).length}</strong>
                    </div>
                    <div>
                      Custom Course Syllabi:{' '}
                      <strong className="text-white">{Object.keys(courseOverrides || {}).length}</strong>
                    </div>
                    <div>
                      Announcements:{' '}
                      <strong className="text-white">{(announcements || []).length}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-500">
          <div>Changes saved to Firestore reflect live across all connected student sessions.</div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
