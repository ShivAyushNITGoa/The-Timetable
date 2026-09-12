import React, { useState, useMemo, useEffect } from 'react';
import { AcademicTest, TestType, TestPriority, PrepStatus } from '../data/testTypes';
import { Course } from '../data/timetableData';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Plus,
  Trash2,
  Pencil,
  CheckCircle2,
  AlertCircle,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Sparkles,
  Tag,
  Check,
  X,
  FileText,
  ListTodo,
} from 'lucide-react';
import { downloadTestsICS } from '../utils/testStorage';

interface TestCalendarViewProps {
  tests: AcademicTest[];
  courses: Record<string, Course>;
  onAddTest: (test: Omit<AcademicTest, 'id' | 'createdAt'>) => void;
  onUpdateTest: (test: AcademicTest) => void;
  onDeleteTest: (testId: string) => void;
  onExportCalendar?: () => void;
  onOpenCourseModal?: (courseCode: string) => void;
  branch?: string;
  semester?: number;
  initialCourseCode?: string | null;
  onClearInitialCourseCode?: () => void;
}

export const TestCalendarView: React.FC<TestCalendarViewProps> = ({
  tests,
  courses,
  onAddTest,
  onUpdateTest,
  onDeleteTest,
  onExportCalendar,
  onOpenCourseModal,
  initialCourseCode,
  onClearInitialCourseCode,
}) => {
  // Calendar month state (default to current date)
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 8, 8)); // September 2026 as per base
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  // Filter state
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCourse, setFilterCourse] = useState<string>('all');

  // Add Test Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCourseCode, setNewCourseCode] = useState<string>(Object.keys(courses)[0] || 'EE300');
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<TestType>('Quiz');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newStartTime, setNewStartTime] = useState('10:00');
  const [newEndTime, setNewEndTime] = useState('11:00');
  const [newRoom, setNewRoom] = useState('LH 51/52');
  const [newSyllabus, setNewSyllabus] = useState('');
  const [newWeightage, setNewWeightage] = useState<number>(20);
  const [newPriority, setNewPriority] = useState<TestPriority>('High');
  const [newNotes, setNewNotes] = useState('');

  // Edit Test Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTestId, setEditingTestId] = useState<string | null>(null);
  const [editCourseCode, setEditCourseCode] = useState<string>('');
  const [editTitle, setEditTitle] = useState('');
  const [editType, setEditType] = useState<TestType>('Quiz');
  const [editDate, setEditDate] = useState('');
  const [editStartTime, setEditStartTime] = useState('10:00');
  const [editEndTime, setEditEndTime] = useState('11:00');
  const [editRoom, setEditRoom] = useState('');
  const [editSyllabus, setEditSyllabus] = useState('');
  const [editWeightage, setEditWeightage] = useState<number>(20);
  const [editPriority, setEditPriority] = useState<TestPriority>('High');
  const [editStatus, setEditStatus] = useState<PrepStatus>('Not Started');
  const [editNotes, setEditNotes] = useState('');

  // Selected test for viewing detail checklist / editing marks
  const [activeTestDetail, setActiveTestDetail] = useState<AcademicTest | null>(null);
  const [newChecklistText, setNewChecklistText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskText, setEditingTaskText] = useState<string>('');

  // Delete confirmation modal state (safe in iframe)
  const [testToDelete, setTestToDelete] = useState<AcademicTest | null>(null);

  // Auto-fill and open Add Modal if initialCourseCode passed from another view
  useEffect(() => {
    if (initialCourseCode && courses[initialCourseCode]) {
      setNewCourseCode(initialCourseCode);
      const course = courses[initialCourseCode];
      if (course?.room) setNewRoom(course.room);
      setIsAddModalOpen(true);
      onClearInitialCourseCode?.();
    }
  }, [initialCourseCode, courses, onClearInitialCourseCode]);

  // Quick cycle test status directly from card or agenda
  const handleCycleStatus = (e: React.MouseEvent, test: AcademicTest) => {
    e.stopPropagation();
    const statuses: PrepStatus[] = ['Not Started', 'In Progress', 'Prepared', 'Completed'];
    const currentIndex = statuses.indexOf(test.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    onUpdateTest({ ...test, status: nextStatus });
    if (activeTestDetail && activeTestDetail.id === test.id) {
      setActiveTestDetail({ ...activeTestDetail, status: nextStatus });
    }
  };

  // Month navigation
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = [];

    // Fill days of current month
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const monthPadded = String(currentMonth + 1).padStart(2, '0');
      const dayPadded = String(day).padStart(2, '0');
      const dateStr = `${currentYear}-${monthPadded}-${dayPadded}`;
      days.push({
        dayNumber: day,
        dateStr,
        isCurrentMonth: true,
      });
    }

    return { firstDayIndex, days };
  }, [currentYear, currentMonth]);

  // Filtered tests
  const filteredTests = useMemo(() => {
    return tests.filter((t) => {
      const matchesType = filterType === 'all' || t.type === filterType;
      const matchesCourse = filterCourse === 'all' || t.courseCode === filterCourse;
      return matchesType && matchesCourse;
    });
  }, [tests, filterType, filterCourse]);

  // Today string
  const todayStr = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }, []);

  // Tests for the selected calendar day
  const testsForSelectedDate = useMemo(() => {
    if (!selectedDateStr) return [];
    return filteredTests.filter((t) => t.date === selectedDateStr);
  }, [filteredTests, selectedDateStr]);

  // Type styling helpers
  const getTypeBadgeStyle = (type: TestType) => {
    switch (type) {
      case 'Quiz':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Mid-Semester Exam':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'End-Semester Exam':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'Unit Test (T1/T2)':
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      case 'Lab Exam / Viva':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Assignment / Project':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    }
  };

  const getPriorityStyle = (priority: TestPriority) => {
    switch (priority) {
      case 'High':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Low':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  const getCountdownText = (dateStr: string) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const [y, m, d] = dateStr.split('-').map(Number);
    const target = new Date(y, m - 1, d);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today!';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 1) return `In ${diffDays} days`;
    if (diffDays === -1) return 'Yesterday';
    return `${Math.abs(diffDays)} days ago`;
  };

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    const course = courses[newCourseCode];
    onAddTest({
      courseCode: newCourseCode,
      courseName: course?.name || newCourseCode,
      title: newTitle || `${newType} - ${newCourseCode}`,
      type: newType,
      date: newDate,
      startTime: newStartTime,
      endTime: newEndTime,
      room: newRoom,
      syllabus: newSyllabus,
      weightageMarks: Number(newWeightage) || 20,
      priority: newPriority,
      status: 'Not Started',
      notes: newNotes,
      checklist: newSyllabus ? [{ id: 'item-1', text: 'Revise syllabus topics', done: false }] : [],
    });

    // Reset & close
    setNewTitle('');
    setNewSyllabus('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (test: AcademicTest) => {
    setEditingTestId(test.id);
    setEditCourseCode(test.courseCode);
    setEditTitle(test.title);
    setEditType(test.type);
    setEditDate(test.date);
    setEditStartTime(test.startTime);
    setEditEndTime(test.endTime);
    setEditRoom(test.room);
    setEditSyllabus(test.syllabus || '');
    setEditWeightage(test.weightageMarks || 20);
    setEditPriority(test.priority);
    setEditStatus(test.status);
    setEditNotes(test.notes || '');
    setIsEditModalOpen(true);
  };

  const handleSaveEditedTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestId) return;
    const existing = tests.find((t) => t.id === editingTestId);
    if (!existing) return;

    const course = courses[editCourseCode];
    const updated: AcademicTest = {
      ...existing,
      courseCode: editCourseCode,
      courseName: course?.name || editCourseCode,
      title: editTitle || `${editType} - ${editCourseCode}`,
      type: editType,
      date: editDate,
      startTime: editStartTime,
      endTime: editEndTime,
      room: editRoom,
      syllabus: editSyllabus,
      weightageMarks: Number(editWeightage) || 20,
      priority: editPriority,
      status: editStatus,
      notes: editNotes,
    };

    onUpdateTest(updated);
    if (activeTestDetail?.id === editingTestId) {
      setActiveTestDetail(updated);
    }
    setIsEditModalOpen(false);
    setEditingTestId(null);
  };

  const handleToggleChecklist = (test: AcademicTest, itemId: string) => {
    const updated = {
      ...test,
      checklist: (test.checklist || []).map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item
      ),
    };
    onUpdateTest(updated);
    if (activeTestDetail?.id === test.id) {
      setActiveTestDetail(updated);
    }
  };

  const handleAddChecklistItem = (test: AcademicTest) => {
    if (!newChecklistText.trim()) return;
    const newItem = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      text: newChecklistText.trim(),
      done: false,
    };
    const updated = {
      ...test,
      checklist: [...(test.checklist || []), newItem],
    };
    onUpdateTest(updated);
    if (activeTestDetail?.id === test.id) {
      setActiveTestDetail(updated);
    }
    setNewChecklistText('');
  };

  const handleStartEditTask = (itemId: string, currentText: string) => {
    setEditingTaskId(itemId);
    setEditingTaskText(currentText);
  };

  const handleSaveEditTask = (test: AcademicTest, itemId: string) => {
    if (!editingTaskText.trim()) return;
    const updated = {
      ...test,
      checklist: (test.checklist || []).map((item) =>
        item.id === itemId ? { ...item, text: editingTaskText.trim() } : item
      ),
    };
    onUpdateTest(updated);
    if (activeTestDetail?.id === test.id) {
      setActiveTestDetail(updated);
    }
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  const handleDeleteChecklistItem = (test: AcademicTest, itemId: string) => {
    const updated = {
      ...test,
      checklist: (test.checklist || []).filter((item) => item.id !== itemId),
    };
    onUpdateTest(updated);
    if (activeTestDetail?.id === test.id) {
      setActiveTestDetail(updated);
    }
    if (editingTaskId === itemId) {
      setEditingTaskId(null);
      setEditingTaskText('');
    }
  };

  const handleUpdateStatus = (test: AcademicTest, status: PrepStatus) => {
    const updated = { ...test, status };
    onUpdateTest(updated);
    if (activeTestDetail?.id === test.id) {
      setActiveTestDetail(updated);
    }
  };

  const handleUpdateMarks = (test: AcademicTest, marks: number | undefined) => {
    const updated = { ...test, obtainedMarks: marks };
    onUpdateTest(updated);
    if (activeTestDetail?.id === test.id) {
      setActiveTestDetail(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions Bar */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5" />
                Continuous Assessment & Exam Calendar
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {filteredTests.length} Tests Scheduled
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Tests, Tasks & Assessment Planner
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Schedule surprise quizzes, mid-sem exam slots, practical lab vivas, and assignment deadlines with preparation task checklists. Sync directly to Google Calendar or Apple Calendar with alarms.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Test / Quiz</span>
            </button>

            <button
              onClick={() => downloadTestsICS(tests)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs sm:text-sm font-semibold transition"
              title="Download .ics file to sync tests with your phone or computer calendar"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Export Tests (.ics)</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Strip */}
        <div className="mt-4 pt-3.5 border-t border-slate-700/60 w-full max-w-full min-w-0 space-y-2.5">
          <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-semibold text-slate-300">Filter Schedule:</span>
            </div>
            {(filterType !== 'all' || filterCourse !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setFilterType('all');
                  setFilterCourse('all');
                }}
                className="text-xs text-amber-400 hover:text-amber-300 hover:underline font-semibold"
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-full min-w-0">
            {/* Test Type Filter */}
            <div className="w-full min-w-0">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full max-w-full min-w-0 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 truncate"
                aria-label="Filter by test type"
              >
                <option value="all">All Test Types</option>
                <option value="Quiz">Quizzes</option>
                <option value="Unit Test (T1/T2)">Unit Tests (T1/T2)</option>
                <option value="Mid-Semester Exam">Mid-Semester Exam</option>
                <option value="End-Semester Exam">End-Semester Exam</option>
                <option value="Lab Exam / Viva">Lab Vivas & Practicals</option>
                <option value="Assignment / Project">Assignments</option>
              </select>
            </div>

            {/* Course Filter */}
            <div className="w-full min-w-0">
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="w-full max-w-full min-w-0 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 truncate"
                aria-label="Filter by course"
              >
                <option value="all">All Registered Courses</option>
                {Object.keys(courses).map((code) => (
                  <option key={code} value={code}>
                    {code}: {courses[code]?.shortName || courses[code]?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Calendar on Left/Top, Upcoming Test Cards on Right/Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar View Container (7 cols on lg) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          {/* Month Header Navigation */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <button
                onClick={handleToday}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-amber-400 border border-slate-700 transition"
              >
                Today
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                aria-label="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-slate-400 uppercase tracking-wider py-1 border-b border-slate-800">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Calendar Grid Cells */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Empty slots for month start offset */}
            {Array.from({ length: calendarDays.firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[52px] sm:min-h-[72px] rounded-xl bg-slate-950/20 opacity-30" />
            ))}

            {/* Actual month days */}
            {calendarDays.days.map((item) => {
              const dayTests = filteredTests.filter((t) => t.date === item.dateStr);
              const isToday = item.dateStr === todayStr;
              const isSelected = item.dateStr === selectedDateStr;

              return (
                <div
                  key={item.dateStr}
                  onClick={() => {
                    setSelectedDateStr(item.dateStr === selectedDateStr ? null : item.dateStr);
                  }}
                  className={`min-h-[52px] sm:min-h-[72px] p-1 sm:p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 shadow-md shadow-amber-500/10 ring-1 ring-amber-500'
                      : isToday
                      ? 'bg-slate-800 border-amber-500/50'
                      : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold leading-none ${
                        isToday
                          ? 'w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black'
                          : 'text-slate-300'
                      }`}
                    >
                      {item.dayNumber}
                    </span>

                    {dayTests.length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    )}
                  </div>

                  {/* Badges preview */}
                  <div className="mt-1 space-y-1 overflow-hidden">
                    {dayTests.slice(0, 2).map((t) => (
                      <div
                        key={t.id}
                        className={`text-[9px] sm:text-[10px] font-semibold px-1 py-0.5 rounded truncate border leading-tight ${getTypeBadgeStyle(
                          t.type
                        )}`}
                        title={`${t.courseCode}: ${t.title}`}
                      >
                        {t.courseCode}
                      </div>
                    ))}
                    {dayTests.length > 2 && (
                      <div className="text-[9px] text-slate-400 font-mono pl-0.5">
                        +{dayTests.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Day selection prompt or details */}
          {selectedDateStr && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                  Tests on {selectedDateStr}:
                </span>
                <button
                  onClick={() => {
                    setNewDate(selectedDateStr);
                    setIsAddModalOpen(true);
                  }}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Plus className="w-3 h-3" />
                  Add test on this day
                </button>
              </div>

              {testsForSelectedDate.length === 0 ? (
                <p className="text-xs text-slate-400">No tests scheduled on this date.</p>
              ) : (
                <div className="space-y-2">
                  {testsForSelectedDate.map((test) => (
                    <div
                      key={test.id}
                      onClick={() => setActiveTestDetail(test)}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-white">{test.courseCode}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${getTypeBadgeStyle(test.type)}`}>
                            {test.type}
                          </span>
                          {test.checklist && test.checklist.length > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 flex items-center gap-1 border border-slate-700">
                              <ListTodo className="w-3 h-3 text-amber-400" />
                              {test.checklist.filter(c => c.done).length}/{test.checklist.length} tasks
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-300 font-medium mt-1 truncate">{test.title}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {test.startTime} - {test.endTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {test.room}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditModal(test);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 border border-slate-700/60"
                          title="Edit test details"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTestToDelete(test);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 border border-slate-700/60"
                          title="Delete test"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Upcoming Tests & Timeline List (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                    Upcoming Test Agenda
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {filteredTests.length} {filteredTests.length === 1 ? 'assessment' : 'assessments'} listed
                  </span>
                </div>
              </div>

              {/* Direct Add Test Button in Agenda Header */}
              <button
                type="button"
                onClick={() => {
                  setSelectedDateStr(null);
                  setIsAddModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition"
                title="Schedule a new test or quiz"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>+ Add Test</span>
              </button>
            </div>

            {/* Quick Agenda Control Bar / Hint */}
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 truncate">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Tap any assessment to view syllabus & manage tasks • ✏️ Edit Test • 🗑️ Delete • ↻ Tap status to cycle</span>
              </span>
            </div>

            {filteredTests.length === 0 ? (
              <div className="text-center py-10 px-4 space-y-3 bg-slate-950/40 rounded-2xl border border-slate-800">
                <Award className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm font-medium text-slate-300">No upcoming tests matching filter.</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click below to schedule your upcoming unit test, quiz, or lab exam.
                </p>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 shadow-md transition active:scale-95"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add First Test / Quiz</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
                {filteredTests.map((test) => {
                  const countdown = getCountdownText(test.date);
                  const isUrgent = countdown === 'Today!' || countdown === 'Tomorrow';

                  return (
                    <div
                      key={test.id}
                      onClick={() => setActiveTestDetail(test)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer hover:-translate-y-0.5 ${
                        isUrgent
                          ? 'bg-rose-950/20 border-rose-500/40 hover:border-rose-400'
                          : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-mono font-bold text-amber-400">
                              {test.courseCode}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${getTypeBadgeStyle(test.type)}`}>
                              {test.type}
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded border font-semibold ${getPriorityStyle(test.priority)}`}>
                              {test.priority}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white mt-1.5">
                            {test.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {test.courseName}
                          </p>
                        </div>

                        {/* Countdown Badge */}
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border shrink-0 ${
                            isUrgent
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {countdown}
                        </span>
                      </div>

                      {/* Date & Room Details */}
                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                        <span className="flex items-center gap-1 text-slate-300 font-medium">
                          <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                          {test.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {test.startTime} - {test.endTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {test.room}
                        </span>
                      </div>

                      {/* Weightage & Prep Status & Tasks */}
                      <div className="mt-2.5 flex flex-wrap items-center justify-between text-xs gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-slate-400">
                            Weight: <strong className="text-slate-200">{test.weightageMarks || 20} Marks</strong>
                          </span>

                          {/* Interactive Status Cycler Button */}
                          <button
                            type="button"
                            onClick={(e) => handleCycleStatus(e, test)}
                            title="Click to cycle status: Not Started → In Progress → Prepared → Completed"
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border transition hover:opacity-80 active:scale-95 cursor-pointer ${
                              test.status === 'Completed'
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                : test.status === 'Prepared'
                                ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                                : test.status === 'In Progress'
                                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            {test.status} ↻
                          </button>

                          {test.checklist && test.checklist.length > 0 && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              {test.checklist.filter(c => c.done).length}/{test.checklist.length} Tasks
                            </span>
                          )}
                        </div>

                        {/* Card quick actions: Edit Test, Delete */}
                        <div className="flex items-center gap-1.5 ml-auto">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEditModal(test);
                            }}
                            className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl text-slate-300 hover:text-amber-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1 transition text-xs font-semibold active:scale-95"
                            title="Edit test date, syllabus, or venue"
                          >
                            <Pencil className="w-3.5 h-3.5 text-amber-400" />
                            <span className="hidden sm:inline">Edit Test</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTestToDelete(test);
                            }}
                            className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl text-slate-400 hover:text-rose-300 bg-slate-800 hover:bg-rose-500/10 border border-slate-700 hover:border-rose-500/30 flex items-center gap-1 transition text-xs font-semibold active:scale-95"
                            title="Delete test"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Test Detail / Checklist / Score Modal */}
      {activeTestDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setActiveTestDetail(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Test Header */}
            <div className="flex items-start justify-between gap-3 pr-8">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {activeTestDetail.courseCode}
                  </span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-md border font-semibold ${getTypeBadgeStyle(activeTestDetail.type)}`}>
                    {activeTestDetail.type}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${getPriorityStyle(activeTestDetail.priority)}`}>
                    {activeTestDetail.priority} Priority
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">
                  {activeTestDetail.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeTestDetail.courseName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenEditModal(activeTestDetail)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 flex items-center gap-1.5 text-xs font-semibold shrink-0 transition hover:border-amber-500/50"
                title="Edit test parameters"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit Test Details</span>
              </button>
            </div>

            {/* Logistics Info Card */}
            <div className="grid grid-cols-2 gap-2 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Date & Time</span>
                <span className="font-semibold text-slate-200">
                  {activeTestDetail.date} ({activeTestDetail.startTime} - {activeTestDetail.endTime})
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Venue / Room</span>
                <span className="font-semibold text-slate-200">{activeTestDetail.room}</span>
              </div>
              <div className="mt-1">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Weightage</span>
                <span className="font-semibold text-amber-400">{activeTestDetail.weightageMarks || 20} Marks</span>
              </div>
              <div className="mt-1">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Countdown</span>
                <span className="font-semibold text-rose-400">{getCountdownText(activeTestDetail.date)}</span>
              </div>
            </div>

            {/* Syllabus & Coverage */}
            {activeTestDetail.syllabus && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  Syllabus / Modules Covered
                </h4>
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {activeTestDetail.syllabus}
                </div>
              </div>
            )}

            {/* Preparation Tasks & Checklist */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Preparation Tasks & Checklist
                </h4>
                {activeTestDetail.checklist && activeTestDetail.checklist.length > 0 && (
                  <span className="text-[11px] font-semibold text-slate-400">
                    {activeTestDetail.checklist.filter((i) => i.done).length} / {activeTestDetail.checklist.length} done
                  </span>
                )}
              </div>

              {/* Progress bar */}
              {activeTestDetail.checklist && activeTestDetail.checklist.length > 0 && (
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (activeTestDetail.checklist.filter((i) => i.done).length /
                          activeTestDetail.checklist.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              )}

              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {(!activeTestDetail.checklist || activeTestDetail.checklist.length === 0) ? (
                  <div className="p-3 text-center text-xs text-slate-500 rounded-xl bg-slate-950/40 border border-slate-800/60">
                    No tasks added yet. Add a study topic or revision task below!
                  </div>
                ) : (
                  activeTestDetail.checklist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:bg-slate-800/40 text-xs group transition"
                    >
                      {editingTaskId === item.id ? (
                        <div className="flex items-center gap-1.5 flex-1">
                          <input
                            type="text"
                            value={editingTaskText}
                            onChange={(e) => setEditingTaskText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveEditTask(activeTestDetail, item.id);
                              if (e.key === 'Escape') setEditingTaskId(null);
                            }}
                            autoFocus
                            className="flex-1 bg-slate-900 border border-amber-500/80 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveEditTask(activeTestDetail, item.id)}
                            className="p-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold"
                            title="Save task"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingTaskId(null)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div
                            onClick={() => handleToggleChecklist(activeTestDetail, item.id)}
                            className="flex items-center gap-2.5 flex-1 cursor-pointer select-none"
                          >
                            <div
                              className={`w-4 h-4 rounded-md flex items-center justify-center border transition shrink-0 ${
                                item.done
                                  ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                                  : 'border-slate-600 bg-slate-900 group-hover:border-slate-500'
                              }`}
                            >
                              {item.done && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={`break-words ${item.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                              {item.text}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartEditTask(item.id, item.text);
                              }}
                              className="p-1 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition"
                              title="Edit task"
                              aria-label="Edit task"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteChecklistItem(activeTestDetail, item.id);
                              }}
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                              title="Delete task"
                              aria-label="Delete task"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Add checklist item */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add study task (e.g. Solve tutorial 3, revise formulas)..."
                  value={newChecklistText}
                  onChange={(e) => setNewChecklistText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddChecklistItem(activeTestDetail)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddChecklistItem(activeTestDetail)}
                  disabled={!newChecklistText.trim()}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-xs font-bold text-slate-950 transition flex items-center gap-1 shrink-0"
                  title="Add task to preparation checklist"
                  aria-label="Add task"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Task</span>
                </button>
              </div>
            </div>

            {/* Preparation Status & Marks Recorded */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Status:</label>
                <select
                  value={activeTestDetail.status}
                  onChange={(e) => handleUpdateStatus(activeTestDetail, e.target.value as PrepStatus)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Prepared">Prepared / Ready</option>
                  <option value="Completed">Test Completed</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Marks Obtained (out of {activeTestDetail.weightageMarks || 20}):
                </label>
                <input
                  type="number"
                  placeholder="e.g. 18"
                  value={activeTestDetail.obtainedMarks ?? ''}
                  onChange={(e) =>
                    handleUpdateMarks(
                      activeTestDetail,
                      e.target.value === '' ? undefined : Number(e.target.value)
                    )
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Actions: Delete test & close */}
            <div className="flex items-center justify-between pt-3 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] border-t border-slate-800 text-xs gap-3">
              <button
                type="button"
                onClick={() => setTestToDelete(activeTestDetail)}
                className="min-h-[44px] px-3.5 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 flex items-center gap-1.5 font-semibold transition active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Test</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTestDetail(null)}
                className="min-h-[44px] px-6 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition active:scale-95 shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (Safe and works in iframe) */}
      {testToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Delete Test / Quiz?</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Are you sure you want to remove <strong className="text-slate-200">"{testToDelete.title}"</strong> ({testToDelete.courseCode}) from your calendar? All associated tasks and checklist items will also be removed.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setTestToDelete(null)}
                className="flex-1 min-h-[42px] px-4 py-2 rounded-xl text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteTest(testToDelete.id);
                  if (activeTestDetail?.id === testToDelete.id) {
                    setActiveTestDetail(null);
                  }
                  setTestToDelete(null);
                }}
                className="flex-1 min-h-[42px] px-4 py-2 rounded-xl text-white bg-rose-600 hover:bg-rose-500 text-xs font-bold transition shadow-lg shadow-rose-600/20"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Existing Test Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/90 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setEditingTestId(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Pencil className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Edit Test / Quiz</h3>
                <p className="text-xs text-slate-400">Update course, date, time, venue, weightage, or topics.</p>
              </div>
            </div>

            <form onSubmit={handleSaveEditedTest} className="space-y-4 text-xs">
              {/* Course Selection */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">Select Registered Course *</label>
                <select
                  value={editCourseCode}
                  onChange={(e) => {
                    setEditCourseCode(e.target.value);
                    const course = courses[e.target.value];
                    if (course?.room && !editRoom) setEditRoom(course.room);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500 font-medium"
                >
                  {Object.keys(courses).map((code) => (
                    <option key={code} value={code}>
                      {code}: {courses[code]?.name} ({courses[code]?.coordinator})
                    </option>
                  ))}
                </select>
              </div>

              {/* Test Type & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Assessment Type *</label>
                  <select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value as TestType)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Quiz">Surprise / Scheduled Quiz</option>
                    <option value="Unit Test (T1/T2)">Unit Test (T1 or T2)</option>
                    <option value="Mid-Semester Exam">Mid-Semester Exam</option>
                    <option value="End-Semester Exam">End-Semester Exam</option>
                    <option value="Lab Exam / Viva">Practical Lab Exam / Viva</option>
                    <option value="Assignment / Project">Assignment / Project Deadline</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Title / Topic *</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Date & Room */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Room / Venue *</label>
                  <input
                    type="text"
                    required
                    value={editRoom}
                    onChange={(e) => setEditRoom(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Start Time</label>
                  <input
                    type="time"
                    value={editStartTime}
                    onChange={(e) => setEditStartTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">End Time</label>
                  <input
                    type="time"
                    value={editEndTime}
                    onChange={(e) => setEditEndTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Weightage & Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Weightage (Marks)</label>
                  <input
                    type="number"
                    value={editWeightage}
                    onChange={(e) => setEditWeightage(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Priority</label>
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value as TestPriority)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as PrepStatus)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Prepared">Prepared</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Syllabus */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">Syllabus & Key Topics</label>
                <textarea
                  rows={2}
                  value={editSyllabus}
                  onChange={(e) => setEditSyllabus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">Notes / Instructions</label>
                <input
                  type="text"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. Scientific calculators allowed, open notes"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 sm:gap-3 pt-3 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingTestId(null);
                  }}
                  className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-800/70 sm:bg-transparent transition active:scale-95 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition active:scale-95 text-center"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Test Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/90 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Schedule New Test / Exam</h3>
                <p className="text-xs text-slate-400">Add surprise quizzes, unit tests, or lab viva slots.</p>
              </div>
            </div>

            <form onSubmit={handleCreateTest} className="space-y-4 text-xs">
              {/* Course Selection */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">Select Registered Course *</label>
                <select
                  value={newCourseCode}
                  onChange={(e) => {
                    setNewCourseCode(e.target.value);
                    const course = courses[e.target.value];
                    if (course?.room) setNewRoom(course.room);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500 font-medium"
                >
                  {Object.keys(courses).map((code) => (
                    <option key={code} value={code}>
                      {code}: {courses[code]?.name} ({courses[code]?.coordinator})
                    </option>
                  ))}
                </select>
              </div>

              {/* Test Type & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Assessment Type *</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as TestType)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Quiz">Surprise / Scheduled Quiz</option>
                    <option value="Unit Test (T1/T2)">Unit Test (T1 or T2)</option>
                    <option value="Mid-Semester Exam">Mid-Semester Exam</option>
                    <option value="End-Semester Exam">End-Semester Exam</option>
                    <option value="Lab Exam / Viva">Practical Lab Exam / Viva</option>
                    <option value="Assignment / Project">Assignment / Project Deadline</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Title / Topic *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Quiz 2: Buck Converters"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Date & Room */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Room / Venue *</label>
                  <input
                    type="text"
                    required
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    placeholder="e.g. LH 51/52"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Start Time</label>
                  <input
                    type="time"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">End Time</label>
                  <input
                    type="time"
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Weightage & Priority */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Total Marks / Weight</label>
                  <input
                    type="number"
                    value={newWeightage}
                    onChange={(e) => setNewWeightage(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as TestPriority)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              {/* Syllabus */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">Syllabus & Key Topics (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Modules 1 & 2: SCR characteristics, Gate triggering, Buck converter..."
                  value={newSyllabus}
                  onChange={(e) => setNewSyllabus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 sm:gap-3 pt-3 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-800/70 sm:bg-transparent transition active:scale-95 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition active:scale-95 text-center"
                >
                  Save Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
