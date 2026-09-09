import React, { useState } from 'react';
import { TimeSlot, Course, DayOfWeek } from '../data/timetableData';
import { X, Plus, Trash2, Edit3, Clock, MapPin, Check, Sparkles } from 'lucide-react';

interface ScheduleCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: DayOfWeek;
  slots: TimeSlot[];
  courses: Record<string, Course>;
  onUpdateDaySlots: (day: DayOfWeek, newSlots: TimeSlot[]) => void;
  onResetToDefaults: (day: DayOfWeek) => void;
}

export const ScheduleCustomizerModal: React.FC<ScheduleCustomizerModalProps> = ({
  isOpen,
  onClose,
  day,
  slots,
  courses,
  onUpdateDaySlots,
  onResetToDefaults,
}) => {
  const [editingSlots, setEditingSlots] = useState<TimeSlot[]>(slots);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New slot form state
  const [newStartTime, setNewStartTime] = useState('17:00');
  const [newEndTime, setNewEndTime] = useState('17:55');
  const [newSlotName, setNewSlotName] = useState('Remedial / Extra Class');
  const [newCourseCode, setNewCourseCode] = useState(Object.keys(courses)[0] || 'EE300');
  const [newRoom, setNewRoom] = useState('LH 51/52');
  const [newNotes, setNewNotes] = useState('');

  if (!isOpen) return null;

  const handleRemoveSlot = (index: number) => {
    const updated = editingSlots.filter((_, i) => i !== index);
    setEditingSlots(updated);
  };

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot: TimeSlot = {
      id: `custom-${Date.now()}`,
      day,
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
    onUpdateDaySlots(day, editingSlots);
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
              Customize {day} Schedule
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
              onClick={() => setIsAddingNew(true)}
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

                <button
                  onClick={() => handleRemoveSlot(index)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/15 hover:text-rose-300 transition"
                  title="Remove slot"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

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
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
          <button
            onClick={() => {
              if (confirm(`Reset ${day}'s timetable to institute defaults?`)) {
                onResetToDefaults(day);
                onClose();
              }
            }}
            className="text-slate-400 hover:text-white"
          >
            Reset to Institute Defaults
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
            >
              Save Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
