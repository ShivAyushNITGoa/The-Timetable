import React, { useState, useEffect } from 'react';
import { Clock, MapPin, ChevronRight, CheckCircle2, X } from 'lucide-react';
import { TimeSlot, Course, DayOfWeek } from '../data/timetableData';
import { useTheme } from '../utils/theme';

interface NextClassLiveBannerProps {
  schedule: Record<DayOfWeek, TimeSlot[]>;
  courses: Record<string, Course>;
  selectedElective: string;
  selectedBatch: string;
  onOpenCourseModal: (courseCode: string) => void;
  onNavigateToDay: (day: DayOfWeek) => void;
}

export const NextClassLiveBanner: React.FC<NextClassLiveBannerProps> = ({
  schedule,
  courses,
  selectedElective,
  selectedBatch,
  onOpenCourseModal,
  onNavigateToDay,
}) => {
  const { config: themeConfig } = useTheme();
  const [isDismissed, setIsDismissed] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  // Re-check current time every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const dayIndex = currentTime.getDay();
  const dayNames: DayOfWeek[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const todayName = dayNames[dayIndex];
  const todaySlots: TimeSlot[] = schedule[todayName] || [];

  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  // Find active slot
  const activeSlot = todaySlots.find((s) => {
    if (s.isLunch || s.isFree) return false;
    const [sh, sm] = s.startTime.split(':').map(Number);
    const [eh, em] = s.endTime.split(':').map(Number);
    const startTotal = sh * 60 + sm;
    const endTotal = eh * 60 + em;
    return currentMinutes >= startTotal && currentMinutes < endTotal;
  });

  // Find next upcoming slot today
  const nextSlot = !activeSlot
    ? todaySlots.find((s) => {
        if (s.isLunch || s.isFree) return false;
        const [sh, sm] = s.startTime.split(':').map(Number);
        const startTotal = sh * 60 + sm;
        return startTotal > currentMinutes;
      })
    : null;

  // Resolve course name and details
  const getSlotDetails = (slot: TimeSlot) => {
    let title = slot.slotName || '';
    let code = slot.courseCode || '';
    let room = slot.room || 'Classroom';

    if (slot.isElectiveChoice) {
      const elect = slot.electiveOptions?.find((e) => e.code === selectedElective) || slot.electiveOptions?.[0];
      if (elect) {
        title = elect.name;
        code = elect.code;
        room = elect.room;
      }
    } else if (slot.isLab && slot.labOptions) {
      const lab = selectedBatch === 'batch1' ? slot.labOptions.batch1 : slot.labOptions.batch2;
      title = lab.name;
      code = lab.code;
      room = lab.room;
    } else if (slot.courseCode && courses[slot.courseCode]) {
      const c = courses[slot.courseCode];
      title = c.name;
      code = c.code;
      room = slot.room || c.room;
    }

    return { title, code, room };
  };

  if (isDismissed) return null;

  // Nothing scheduled today (e.g. Sunday or holiday)
  if (todaySlots.length === 0 || (!activeSlot && !nextSlot)) {
    return null;
  }

  if (activeSlot) {
    const details = getSlotDetails(activeSlot);
    const [eh, em] = activeSlot.endTime.split(':').map(Number);
    const remainingMins = eh * 60 + em - currentMinutes;

    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-2 pb-1">
        <div
          className="rounded-lg p-2.5 sm:px-4 sm:py-2 flex items-center justify-between gap-3 text-xs border shadow-xs transition animate-in fade-in duration-150"
          style={{
            backgroundColor: `${themeConfig.primaryColor}12`,
            borderColor: `${themeConfig.primaryColor}35`,
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Live pulsing badge */}
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-white text-[10px] font-bold uppercase tracking-wider shrink-0"
              style={{ backgroundColor: themeConfig.primaryColor }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              Live
            </span>

            <div className="min-w-0 flex items-center gap-2 flex-wrap">
              <span className="font-bold text-white truncate text-xs sm:text-sm">
                {details.code ? `${details.code}: ` : ''}{details.title}
              </span>
              <span className="text-slate-400 hidden md:inline">•</span>
              <span className="text-slate-300 font-medium flex items-center gap-1 shrink-0">
                <MapPin className="w-3 h-3 text-slate-400" />
                {details.room}
              </span>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="font-mono font-bold text-slate-200 tabular-nums">
                {remainingMins}m remaining
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {details.code && (
              <button
                type="button"
                onClick={() => onOpenCourseModal(details.code)}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center gap-1 transition active:scale-95 shadow-xs"
              >
                <span>Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800/80 transition"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (nextSlot) {
    const details = getSlotDetails(nextSlot);
    const [sh, sm] = nextSlot.startTime.split(':').map(Number);
    const minsUntil = sh * 60 + sm - currentMinutes;

    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-2 pb-1">
        <div className="rounded-lg p-2.5 sm:px-4 sm:py-2 bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 text-xs shadow-xs transition animate-in fade-in duration-150">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-bold text-[10px] shrink-0">
              <Clock className="w-3 h-3 text-blue-400" style={{ color: themeConfig.primaryColor }} />
              In {minsUntil}m
            </span>

            <div className="min-w-0 flex items-center gap-2 flex-wrap">
              <span className="text-slate-400 text-xs">Next:</span>
              <span className="font-bold text-white truncate">
                {details.code ? `${details.code} - ` : ''}{details.title}
              </span>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="text-slate-300 font-medium flex items-center gap-1 shrink-0">
                <MapPin className="w-3 h-3 text-slate-400" />
                {details.room} ({nextSlot.startTime})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {details.code && (
              <button
                type="button"
                onClick={() => onOpenCourseModal(details.code)}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs border border-slate-700 flex items-center gap-1 transition active:scale-95"
              >
                <span>View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
