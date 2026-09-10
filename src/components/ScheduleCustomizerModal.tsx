import React, { useState, useEffect } from 'react';
import { TimeSlot, Course, DayOfWeek } from '../data/timetableData';
import { X, Plus, Trash2, Edit3, Clock, MapPin, Check, Sparkles, Pencil } from 'lucide-react';

interface ScheduleCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  day?: DayOfWeek;
  selectedDay?: DayOfWeek;
  slots?: TimeSlot[];
  currentSlots?: TimeSlot[];
  courses: Record<string, Course>;
  onUpdateDaySlots?: (day: DayOfWeek, newSlots: TimeSlot[]) => void;
  onSaveSlots?: (slots: TimeSlot[]) => void;
  onResetToDefaults?: (day: DayOfWeek) => void;
  onResetSchedule?: () => void;
}

export const ScheduleCustomizerModal: React.FC<ScheduleCustomizerModalProps> = ({
  isOpen,
  onClose,
  day,
  selectedDay,
  slots,
  currentSlots,
  courses,
  onUpdateDaySlots,
  onSaveSlots,
  onResetToDefaults,
  onResetSchedule,
}) => {
  const activeDay: DayOfWeek = selectedDay || day || 'Monday';
  const initialSlots: TimeSlot[] = currentSlots || slots || [];
  const [editingSlots, setEditingSlots] = useState<TimeSlot[]>(initialSlots);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Sync state when modal opens or day/slots change
  useEffect(() => {
    setEditingSlots(currentSlots || slots || []);
    setIsAddingNew(false);
    setEditingSlotIndex(null);
  }, [isOpen, activeDay, currentSlots, slots]);

  // Edit existing slot state
  const [editingSlotIndex, setEditingSlotIndex] = useState<number | null>(null);
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [editCourseCode, setEditCourseCode] = useState('');
  const [editRoom, setEditRoom] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // New slot form state
  const [newStartTime, setNewStartTime] = useState('17:00');
  const [newEndTime, setNewEndTime] = useState('17:55');
  const [newSlotName, setNewSlotName] = useState('Remedial / Extra Class');
  const [newCourseCode, setNewCourseCode] = useState(Object.keys(courses)[0] || 'EE300');
  const [newRoom, setNewRoom] = useState('LH 51/52');
  const [newNotes, setNewNotes] = useState('');

  if (!isOpen) return null;

  const handleStartEditSlot = (index: number) => {
    const slot = editingSlots[index];
    if (!slot) return;
    setEditingSlotIndex(index);
    setEditStartTime(slot.startTime);
    setEditEndTime(slot.endTime);
    setEditCourseCode(slot.courseCode || Object.keys(courses)[0] || '');
    setEditRoom(slot.room || '');
    setEditNotes(slot.notes || '');
    setIsAddingNew(false);
  };

  const handleSaveEditedSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSlotIndex === null) return;
    const current = editingSlots[editingSlotIndex];
    const updatedSlot: TimeSlot = {
      ...current,
      startTime: editStartTime,
      endTime: editEndTime,
      courseCode: editCourseCode,
      room: editRoom,
      notes: editNotes,
    };
    const updated = [...editingSlots];
    updated[editingSlotIndex] = updatedSlot;
    // Sort by start time
    updated.sort((a, b) => {
      const [ah, am] = a.startTime.split(':').map(Number);
      const [bh, bm] = b.startTime.split(':').map(Number);
      return ah * 60 + am - (bh * 60 + bm);
    });
    setEditingSlots(updated);
    setEditingSlotIndex(null);
  };

  const handleRemoveSlot = (index: number) => {
    const updated = editingSlots.filter((_, i) => i !== index);
    setEditingSlots(updated);
    if (editingSlotIndex === index) {
      setEditingSlotIndex(null);
    }
  };

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot: TimeSlot = {
      id: `custom-${Date.now()}`,
      day: activeDay,
      startTime: newStartTime,
      endTime: newEndTime,
      slotName: newSlotName,
      courseCode: newCourseCode,
      room: newRoom,
      notes: newNotes,
    };
    const updated = [...editingSlots, newSlot].sort((a, b) => {
      const [ah, am] = a.startTime.split(':').map(Number);
      const [bh, bm] = b.startTime.split(':').map(Number);
      return ah * 60 + am - (bh * 60 + bm);
    });
    setEditingSlots(updated);
    setIsAddingNew(false);
    setNewNotes('');
  };

  const handleSave = () => {
    if (onSaveSlots) {
      onSaveSlots(editingSlots);
    } else if (onUpdateDaySlots) {
      onUpdateDaySlots(activeDay, editingSlots);
    }
    onClose();
  };

  const handleReset = () => {
    if (onResetSchedule) {
      onResetSchedule();
    } else if (onResetToDefaults) {
      onResetToDefaults(activeDay);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-5">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Customize {activeDay} Schedule
            </h3>
            <p className="text-xs text-slate-400">
              Rearrange periods, change classrooms, or add remedial & tutorial classes.
            </p>
          </div>
        </div>

        {/* Existing Slots List */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Scheduled Periods ({editingSlots.length})</span>
            <button
              onClick={() => {
                setIsAddingNew(true);
                setEditingSlotIndex(null);
              }}
              className="text-amber-400 hover:underline flex items-center gap-1 normal-case font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Extra Slot
            </button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {editingSlots.map((slot, index) => (
              <div
                key={slot.id || index}
                className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="font-mono text-slate-400 font-medium">
                    {slot.startTime} - {slot.endTime}
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{slot.courseCode || slot.slotName}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({slot.slotName})
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Room: {slot.room} {slot.notes && `• ${slot.notes}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleStartEditSlot(index)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition"
                    title="Edit slot details"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(index)}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/15 hover:text-rose-300 transition"
                    title="Remove slot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit slot sub-form */}
        {editingSlotIndex !== null && (
          <form
            onSubmit={handleSaveEditedSlot}
            className="p-4 rounded-2xl bg-slate-950 border border-amber-500/50 space-y-3 animate-in fade-in"
          >
            <div className="text-xs font-bold text-amber-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Pencil className="w-3.5 h-3.5" />
                Edit Scheduled Slot
              </span>
              <button
                type="button"
                onClick={() => setEditingSlotIndex(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Start Time</label>
                <input
                  type="time"
                  value={editStartTime}
                  onChange={(e) => setEditStartTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white"
                  required
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">End Time</label>
                <input
                  type="time"
                  value={editEndTime}
                  onChange={(e) => setEditEndTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Course Code</label>
                <select
                  value={editCourseCode}
                  onChange={(e) => setEditCourseCode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white"
                >
                  {Object.keys(courses).map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                  <option value="TUTORIAL">TUTORIAL</option>
                  <option value="CLUB">CLUB / SEMINAR</option>
                  <option value="LIBRARY">LIBRARY</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Room / Venue</label>
                <input
                  type="text"
                  value={editRoom}
                  onChange={(e) => setEditRoom(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="text-slate-400 block mb-1">Label / Notes</label>
              <input
                type="text"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white"
                placeholder="e.g. Remedial or tutorial batch"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setEditingSlotIndex(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                Update Slot
              </button>
            </div>
          </form>
        )}

        {/* Add slot sub-form */}
        {isAddingNew && (
          <form
            onSubmit={handleAddSlot}
            className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-3 animate-in fade-in"
          >
            <div className="text-xs font-bold text-amber-300 flex items-center justify-between">
              <span>Add Custom Slot</span>
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Start Time</label>
                <input
                  type="time"
                  value={newStartTime}
                  onChange={(e) => setNewStartTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">End Time</label>
                <input
                  type="time"
                  value={newEndTime}
                  onChange={(e) => setNewEndTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Course Code</label>
                <select
                  value={newCourseCode}
                  onChange={(e) => setNewCourseCode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white"
                >
                  {Object.keys(courses).map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                  <option value="TUTORIAL">TUTORIAL</option>
                  <option value="CLUB">CLUB / SEMINAR</option>
                  <option value="LIBRARY">LIBRARY</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Room / Venue</label>
                <input
                  type="text"
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="text-slate-400 block mb-1">Label / Notes</label>
              <input
                type="text"
                placeholder="e.g. Remedial lecture by Dr. Sreeraj"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Insert Slot
              </button>
            </div>
          </form>
        )}

        {/* Modal footer */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-3 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] border-t border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => {
              if (confirm(`Reset ${activeDay}'s timetable to institute defaults?`)) {
                handleReset();
              }
            }}
            className="text-slate-400 hover:text-white py-2 text-center sm:text-left transition"
          >
            Reset to Institute Defaults
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition active:scale-95"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 sm:flex-initial min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 transition active:scale-95 text-center"
            >
              Save Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
