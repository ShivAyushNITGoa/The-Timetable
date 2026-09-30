import React, { useState, useEffect } from 'react';
import { TimeSlot, Course, DayOfWeek } from '../data/timetableData';
import {
  X,
  Clock,
  MapPin,
  User,
  BookOpen,
  Plus,
  Trash2,
  Save,
  CheckCircle,
  AlertCircle,
  Beaker,
  Bookmark,
  Coffee,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';

interface AdminSlotEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: TimeSlot | null; // null when creating a new slot
  day: DayOfWeek;
  branch: string;
  semester: number;
  firstYearSection?: string;
  allCourses: Record<string, Course>;
  onSaveSlot: (slotData: TimeSlot, courseData?: Course) => Promise<void>;
  onDeleteSlot?: (slotId: string) => Promise<void>;
  currentUserEmail?: string;
}

const COMMON_ROOMS = [
  'Room 18',
  'Room 5',
  'Room 8/9',
  'Room 30/31',
  'Room 69',
  'LH 01',
  'LH 02',
  'LH 03',
  'LH 04',
  'Hardware Lab',
  'Software Lab 1',
  'Software Lab 2',
  'Electronics Lab',
  'Machines Lab',
  'Workshop',
];

const STANDARD_PERIODS = [
  { name: 'Slot A (Period 1)', start: '09:00', end: '09:55' },
  { name: 'Slot B (Period 2)', start: '10:00', end: '10:55' },
  { name: 'Slot C (Period 3)', start: '11:00', end: '11:55' },
  { name: 'Slot D (Period 4)', start: '12:00', end: '12:55' },
  { name: 'Lunch Break', start: '13:00', end: '14:00' },
  { name: 'Slot E (Period 5)', start: '14:00', end: '14:55' },
  { name: 'Slot F (Period 6)', start: '15:00', end: '15:55' },
  { name: 'Slot G (Period 7)', start: '16:00', end: '16:55' },
  { name: 'Lab Afternoon (P5-P7)', start: '14:00', end: '16:55' },
];

export const AdminSlotEditorModal: React.FC<AdminSlotEditorModalProps> = ({
  isOpen,
  onClose,
  slot,
  day,
  branch,
  semester,
  firstYearSection,
  allCourses,
  onSaveSlot,
  onDeleteSlot,
  currentUserEmail = 'ashivamone@gmail.com',
}) => {
  const isNewSlot = !slot;

  // Slot Fields State
  const [slotName, setSlotName] = useState('Slot A');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('09:55');
  const [room, setRoom] = useState('Room 18');
  const [courseCode, setCourseCode] = useState('');
  const [isLab, setIsLab] = useState(false);
  const [isLunch, setIsLunch] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [isMinor, setIsMinor] = useState(false);
  const [notes, setNotes] = useState('');

  // Course & Syllabus Fields State
  const [courseName, setCourseName] = useState('');
  const [coordinator, setCoordinator] = useState('');
  const [credits, setCredits] = useState<number>(3);
  const [ltp, setLtp] = useState('3-0-0');
  const [category, setCategory] = useState<Course['category']>('core');
  const [modules, setModules] = useState<string[]>([]);
  const [textbooks, setTextbooks] = useState<string[]>([]);

  // UI State
  const [activeTab, setActiveTab] = useState<'slot' | 'syllabus'>('slot');
  const [newModuleText, setNewModuleText] = useState('');
  const [newBookText, setNewBookText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Initialize values when modal opens or slot changes
  useEffect(() => {
    if (!isOpen) return;

    setStatusMessage(null);
    setActiveTab('slot');

    if (slot) {
      setSlotName(slot.slotName || 'Slot A');
      setStartTime(slot.startTime || '09:00');
      setEndTime(slot.endTime || '09:55');
      setRoom(slot.room || 'Room 18');
      setCourseCode(slot.courseCode || '');
      setIsLab(Boolean(slot.isLab));
      setIsLunch(Boolean(slot.isLunch));
      setIsFree(Boolean(slot.isFree));
      setIsMinor(Boolean(slot.isMinor));
      setNotes(slot.notes || '');

      // Load matching course details
      const c = allCourses[slot.courseCode];
      if (c) {
        setCourseName(c.name || '');
        setCoordinator(c.coordinator || '');
        setCredits(c.credits ?? 3);
        setLtp(c.ltp || '3-0-0');
        setCategory(c.category || (slot.isLab ? 'lab' : 'core'));
        setModules(c.modules ? [...c.modules] : []);
        setTextbooks(c.textbooks ? [...c.textbooks] : []);
      } else {
        setCourseName(slot.slotName || '');
        setCoordinator('');
        setCredits(3);
        setLtp('3-0-0');
        setCategory(slot.isLab ? 'lab' : 'core');
        setModules([]);
        setTextbooks([]);
      }
    } else {
      // Defaults for brand new slot
      setSlotName('Slot A');
      setStartTime('09:00');
      setEndTime('09:55');
      setRoom('Room 18');
      setCourseCode('');
      setIsLab(false);
      setIsLunch(false);
      setIsFree(false);
      setIsMinor(false);
      setNotes('');
      setCourseName('');
      setCoordinator('');
      setCredits(3);
      setLtp('3-0-0');
      setCategory('core');
      setModules([]);
      setTextbooks([]);
    }
  }, [isOpen, slot, allCourses]);

  // When course code is picked or changed by user, prefill known data if empty
  const handleCourseCodeSelect = (selectedCode: string) => {
    setCourseCode(selectedCode);
    const existing = allCourses[selectedCode];
    if (existing) {
      if (!courseName) setCourseName(existing.name || '');
      if (!coordinator) setCoordinator(existing.coordinator || '');
      if (existing.room && (!room || room === 'Room 18')) setRoom(existing.room);
      setCredits(existing.credits ?? 3);
      setLtp(existing.ltp || '3-0-0');
      setCategory(existing.category || 'core');
      if (existing.modules && existing.modules.length > 0) {
        setModules([...existing.modules]);
      }
      if (existing.textbooks && existing.textbooks.length > 0) {
        setTextbooks([...existing.textbooks]);
      }
    }
  };

  const handleApplyPreset = (preset: { name: string; start: string; end: string }) => {
    setSlotName(preset.name.split(' (')[0]);
    setStartTime(preset.start);
    setEndTime(preset.end);
    if (preset.name.includes('Lunch')) {
      setIsLunch(true);
      setIsLab(false);
      setIsFree(false);
    } else if (preset.name.includes('Lab')) {
      setIsLab(true);
      setIsLunch(false);
      setIsFree(false);
    } else {
      setIsLunch(false);
      setIsLab(false);
      setIsFree(false);
    }
  };

  const handleAddModule = () => {
    const trimmed = newModuleText.trim();
    if (!trimmed) return;
    setModules((prev) => [...prev, trimmed]);
    setNewModuleText('');
  };

  const handleRemoveModule = (index: number) => {
    setModules((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddTextbook = () => {
    const trimmed = newBookText.trim();
    if (!trimmed) return;
    setTextbooks((prev) => [...prev, trimmed]);
    setNewBookText('');
  };

  const handleRemoveTextbook = (index: number) => {
    setTextbooks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const generatedId =
        slot?.id ||
        `slot-${branch}-${semester}-${day.toLowerCase().slice(0, 3)}-${startTime.replace(':', '')}-${Date.now()}`;

      const updatedSlot: TimeSlot = {
        id: generatedId,
        day,
        startTime,
        endTime,
        slotName: slotName.trim() || 'Period',
        courseCode: courseCode.trim().toUpperCase(),
        room: room.trim() || 'TBA',
        isLab,
        isLunch,
        isFree,
        isMinor,
        notes: notes.trim() || undefined,
      };

      let updatedCourse: Course | undefined;
      const cleanCode = courseCode.trim().toUpperCase();

      if (cleanCode && !isLunch && !isFree) {
        const base = allCourses[cleanCode] || {};
        updatedCourse = {
          code: cleanCode,
          name: courseName.trim() || cleanCode,
          type: isLab ? 'Practical' : isMinor ? 'Minor' : 'Theory',
          credits: Number(credits) || 3,
          ltp: ltp.trim() || '3-0-0',
          teachingSlot: slotName,
          examSlot: (base as any).examSlot || slotName.replace('Slot ', '') || 'A',
          coordinator: coordinator.trim() || 'Department Faculty',
          shortName: (base as any).shortName || cleanCode,
          room: room.trim() || 'Room 18',
          isMinor,
          category,
          modules: modules.length > 0 ? modules : undefined,
          textbooks: textbooks.length > 0 ? textbooks : undefined,
          notes: notes.trim() || undefined,
        };
      }

      await onSaveSlot(updatedSlot, updatedCourse);
      setStatusMessage({ type: 'success', text: 'Slot & Syllabus saved to Cloud Firestore!' });

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save to cloud' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!slot?.id || !onDeleteSlot) return;
    if (!window.confirm(`Are you sure you want to delete this slot (${slot.slotName} • ${slot.startTime}-${slot.endTime})?`)) {
      return;
    }

    setIsDeleting(true);
    setStatusMessage(null);
    try {
      await onDeleteSlot(slot.id);
      setStatusMessage({ type: 'success', text: 'Slot deleted successfully!' });
      setTimeout(() => {
        onClose();
      }, 900);
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete slot' });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600 text-white font-bold shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-white text-base sm:text-lg">
                  {isNewSlot ? 'Add New Timetable Slot' : `Edit Slot: ${slot?.slotName || 'Period'}`}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-900/30 text-blue-300 border border-blue-500/30 font-bold uppercase">
                  Admin Edit
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {semester <= 2
                  ? `1st Year Sec ${firstYearSection || 'A'} • Sem ${semester} • ${day}`
                  : `${branch} Engineering • Sem ${semester} • ${day}`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Slot Scheduling vs. Course Syllabus */}
        <div className="px-5 pt-3 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between shrink-0">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('slot')}
              className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'slot'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>1. Slot Logistics & Time</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('syllabus')}
              className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'syllabus'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>2. Course Syllabus & Faculty</span>
              {modules.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-amber-300 font-mono">
                  {modules.length} modules
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Status notification */}
        {statusMessage && (
          <div
            className={`mx-5 mt-3 p-3 rounded-xl text-xs flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSave} className="overflow-y-auto p-5 space-y-5 flex-1">
          {activeTab === 'slot' && (
            <div className="space-y-4">
              {/* Quick Period Presets */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Standard Timing Presets (NIT Goa Matrix)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {STANDARD_PERIODS.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => handleApplyPreset(p)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 hover:text-white border border-slate-700/60 transition active:scale-95"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot Name & Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Slot Label / Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={slotName}
                    onChange={(e) => setSlotName(e.target.value)}
                    placeholder="e.g. Slot A, Practical Lab"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Start Time (24h)</label>
                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">End Time (24h)</label>
                  <input
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Course Code & Room */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Subject / Course Code
                    </label>
                    <span className="text-[10px] text-slate-400">e.g. CS200, EE301</span>
                  </div>
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => handleCourseCodeSelect(e.target.value.toUpperCase())}
                    placeholder="Type or pick code..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs uppercase font-mono font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Classroom / Venue
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      placeholder="e.g. Room 18, LH 01"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  {/* Quick Room Suggestions */}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {['Room 18', 'Room 5', 'LH 01', 'Hardware Lab', 'Room 8/9'].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRoom(r)}
                        className={`text-[10px] px-1.5 py-0.5 rounded border transition ${
                          room === r
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slot Flags / Checkboxes */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Slot Characteristics
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isLab}
                      onChange={(e) => {
                        setIsLab(e.target.checked);
                        if (e.target.checked) {
                          setIsLunch(false);
                          setIsFree(false);
                          if (slotName.startsWith('Slot')) setSlotName('Practical Lab');
                        }
                      }}
                      className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0"
                    />
                    <Beaker className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Practical Lab</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isLunch}
                      onChange={(e) => {
                        setIsLunch(e.target.checked);
                        if (e.target.checked) {
                          setIsLab(false);
                          setIsFree(false);
                          setSlotName('LUNCH BREAK');
                        }
                      }}
                      className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0"
                    />
                    <Coffee className="w-3.5 h-3.5 text-amber-400" />
                    <span>Lunch Break</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isFree}
                      onChange={(e) => {
                        setIsFree(e.target.checked);
                        if (e.target.checked) {
                          setIsLab(false);
                          setIsLunch(false);
                          setSlotName('Free Period');
                        }
                      }}
                      className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0"
                    />
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Free Period</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isMinor}
                      onChange={(e) => setIsMinor(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0"
                    />
                    <Bookmark className="w-3.5 h-3.5 text-blue-400" />
                    <span>Minor Subject</span>
                  </label>
                </div>
              </div>

              {/* Administrative Notes */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Slot Notes / Specific Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Alternate weeks with Lab B, or Special Lecture"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Quick tip to edit syllabus */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Want to adjust the course title, faculty coordinator, or module syllabus topics?</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('syllabus')}
                  className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] shrink-0 transition"
                >
                  Edit Syllabus →
                </button>
              </div>
            </div>
          )}

          {activeTab === 'syllabus' && (
            <div className="space-y-4">
              {/* Course Title & Faculty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Course Full Name / Title
                  </label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g. Operating Systems"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Faculty Coordinator / Instructor
                  </label>
                  <input
                    type="text"
                    value={coordinator}
                    onChange={(e) => setCoordinator(e.target.value)}
                    placeholder="e.g. Dr. Damodar Reddy"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Credits, LTP & Category */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Credits</label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={credits}
                    onChange={(e) => setCredits(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">L-T-P Structure</label>
                  <input
                    type="text"
                    value={ltp}
                    onChange={(e) => setLtp(e.target.value)}
                    placeholder="3-0-0"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="core">Core</option>
                    <option value="elective">Elective</option>
                    <option value="minor">Minor</option>
                    <option value="lab">Lab / Practical</option>
                    <option value="mlc">MLC</option>
                  </select>
                </div>
              </div>

              {/* Syllabus Modules Manager */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">Syllabus Modules Breakdown</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{modules.length} Modules Defined</span>
                </div>

                {/* Modules List */}
                <div className="space-y-2">
                  {modules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1 flex-1">
                        <span className="font-bold text-amber-300">Module {idx + 1}:</span>
                        <p className="text-slate-300 whitespace-pre-wrap">{mod}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveModule(idx)}
                        className="p-1 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition shrink-0"
                        title="Delete this module"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {modules.length === 0 && (
                    <p className="text-xs text-slate-500 italic py-1">
                      No custom modules configured yet. Add modules below to appear in the course modal.
                    </p>
                  )}
                </div>

                {/* Add Module Input */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <textarea
                    rows={2}
                    value={newModuleText}
                    onChange={(e) => setNewModuleText(e.target.value)}
                    placeholder="Enter module topics (e.g. 'Module 1: Introduction to Data Structures, Arrays, Stacks and Queues')..."
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleAddModule}
                      disabled={!newModuleText.trim()}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Module</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Textbooks & References */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Recommended Reference Books</span>
                  <span className="text-[11px] text-slate-400">{textbooks.length} Books</span>
                </div>

                <div className="space-y-1.5">
                  {textbooks.map((book, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2 text-xs text-slate-300"
                    >
                      <span className="truncate">{book}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTextbook(idx)}
                        className="p-1 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition shrink-0"
                        title="Remove book"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {textbooks.length === 0 && (
                    <p className="text-xs text-slate-500 italic py-1">No reference books entered yet.</p>
                  )}
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-800/80">
                  <input
                    type="text"
                    value={newBookText}
                    onChange={(e) => setNewBookText(e.target.value)}
                    placeholder="Author: Title of Book, Publisher, Edition..."
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddTextbook}
                    disabled={!newBookText.trim()}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-amber-300 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              {!isNewSlot && onDeleteSlot && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting || isSaving}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{isDeleting ? 'Deleting...' : 'Delete Slot'}</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving || isDeleting}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving || isDeleting}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving to Cloud...' : 'Save Slot & Syllabus'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
