import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Calendar,
  Grid,
  CheckSquare,
  Award,
  GraduationCap,
  FileText,
  CalendarCheck,
  Palette,
  Download,
  MapPin,
  Clock,
  ArrowRight,
  X,
  CornerDownLeft,
} from 'lucide-react';
import { Course } from '../data/timetableData';
import { ActiveTab } from './Navbar';
import { useTheme } from '../utils/theme';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Record<string, Course>;
  onSelectCourse: (courseCode: string) => void;
  onSelectTab: (tab: ActiveTab) => void;
  onSelectDay: (day: any) => void;
  onOpenThemeSelector?: () => void;
  onExportCalendar: () => void;
  onOpenPwaGuide?: () => void;
}

interface SearchItem {
  id: string;
  category: 'Course' | 'View' | 'Day' | 'Action';
  title: string;
  subtitle: string;
  badge?: string;
  icon: React.ElementType;
  action: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  courses,
  onSelectCourse,
  onSelectTab,
  onSelectDay,
  onOpenThemeSelector,
  onExportCalendar,
  onOpenPwaGuide,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { config: themeConfig } = useTheme();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Construct search items pool
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // 1. Navigation Views
    items.push(
      {
        id: 'tab-day',
        category: 'View',
        title: 'Today & Day Schedule',
        subtitle: 'Hour-by-hour timeline, ongoing class tracker & attendance markers',
        badge: 'View',
        icon: Calendar,
        action: () => {
          onSelectTab('day');
          onClose();
        },
      },
      {
        id: 'tab-weekly',
        category: 'View',
        title: 'Weekly Master Matrix',
        subtitle: 'Comprehensive Monday to Friday interactive grid with lunch & lab slots',
        badge: 'View',
        icon: Grid,
        action: () => {
          onSelectTab('weekly');
          onClose();
        },
      },
      {
        id: 'tab-tests',
        category: 'View',
        title: 'Tests, Quizzes & Assignments',
        subtitle: 'Upcoming exam dates, syllabus checklists & reminders',
        badge: 'View',
        icon: CalendarCheck,
        action: () => {
          onSelectTab('tests');
          onClose();
        },
      },
      {
        id: 'tab-courses',
        category: 'View',
        title: 'Course Directory & Syllabi',
        subtitle: 'Official course codes, faculty coordinators & accredited credits',
        badge: 'View',
        icon: BookOpen,
        action: () => {
          onSelectTab('courses');
          onClose();
        },
      },
      {
        id: 'tab-attendance',
        category: 'View',
        title: '75% Attendance Tracker',
        subtitle: 'Safe bunk margin calculator & shortage warnings',
        badge: 'View',
        icon: CheckSquare,
        action: () => {
          onSelectTab('attendance');
          onClose();
        },
      },
      {
        id: 'tab-exams',
        category: 'View',
        title: 'Exam Slot Matrix',
        subtitle: 'Official Mid/End-Sem clash-free Slot A to G distribution',
        badge: 'View',
        icon: Award,
        action: () => {
          onSelectTab('exams');
          onClose();
        },
      },
      {
        id: 'tab-academic',
        category: 'View',
        title: 'SGPA Calculator & Academic Hub',
        subtitle: 'Grade points simulator, target SGPA projection & GPA tools',
        badge: 'View',
        icon: GraduationCap,
        action: () => {
          onSelectTab('academic');
          onClose();
        },
      },
      {
        id: 'tab-resources',
        category: 'View',
        title: 'Resources & Handbooks',
        subtitle: 'Official academic regulations, curriculum PDF & calendar',
        badge: 'View',
        icon: FileText,
        action: () => {
          onSelectTab('resources');
          onClose();
        },
      }
    );

    // 2. Days
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
    days.forEach((day) => {
      items.push({
        id: `day-${day.toLowerCase()}`,
        category: 'Day',
        title: `${day} Schedule`,
        subtitle: `Jump directly to ${day}'s lectures and lab sessions`,
        badge: 'Day',
        icon: Clock,
        action: () => {
          onSelectTab('day');
          onSelectDay(day);
          onClose();
        },
      });
    });

    // 3. Quick Actions
    if (onOpenThemeSelector) {
      items.push({
        id: 'action-theme',
        category: 'Action',
        title: 'Color Themes & Appearance Mode',
        subtitle: 'Curated University Palette',
        badge: 'Customization',
        icon: Palette,
        action: () => {
          onClose();
          onOpenThemeSelector();
        },
      });
    }

    items.push(
      {
        id: 'action-export',
        category: 'Action',
        title: 'Export Timetable to Calendar (.ics)',
        subtitle: 'Sync schedule with Google Calendar, Apple Calendar or Outlook',
        badge: 'Download',
        icon: Download,
        action: () => {
          onClose();
          onExportCalendar();
        },
      }
    );

    if (onOpenPwaGuide) {
      items.push({
        id: 'action-pwa',
        category: 'Action',
        title: 'Install Offline PWA App',
        subtitle: 'Add to mobile home screen for 100% offline timetable access',
        badge: 'Install',
        icon: Download,
        action: () => {
          onClose();
          onOpenPwaGuide();
        },
      });
    }

    // 4. Courses
    (Object.entries(courses) as [string, Course][]).forEach(([code, c]) => {
      items.push({
        id: `course-${code}`,
        category: 'Course',
        title: `${c.code}: ${c.name}`,
        subtitle: `${c.coordinator || 'Faculty Coordinator'} • Slot ${c.teachingSlot || 'N/A'} • ${c.room || 'Classroom'}`,
        badge: (c.category || 'core').toUpperCase(),
        icon: BookOpen,
        action: () => {
          onSelectCourse(c.code);
          onClose();
        },
      });
    });

    return items;
  }, [courses, onSelectCourse, onSelectTab, onSelectDay, onOpenThemeSelector, onExportCalendar, onOpenPwaGuide, onClose]);

  // Filter items by search query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Prioritize Views and Actions by default
      return allItems.slice(0, 10);
    }
    return allItems
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.badge && item.badge.toLowerCase().includes(q))
        );
      })
      .slice(0, 15);
  }, [allItems, query]);

  // Keyboard navigation inside list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredItems.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Auto-scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLButtonElement>(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl bg-white border border-slate-200 rounded-t-xl sm:rounded-lg shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[80vh] overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Handle Bar */}
        <div className="sm:hidden w-10 h-1 bg-slate-300 rounded-full mx-auto my-2 shrink-0" />

        {/* Search Header Bar */}
        <div className="relative px-4 py-3 sm:py-3.5 border-b border-slate-200 flex items-center gap-3 shrink-0">
          <Search className="w-5 h-5 text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type course, faculty, slot, room, or jump to tab..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
            aria-label="Quick Command Search"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              <span>ESC</span>
            </div>
          )}
        </div>

        {/* Search Results List */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-slate-100"
          role="listbox"
        >
          {filteredItems.length === 0 ? (
            <div className="py-12 px-4 text-center">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-slate-800">No matching results found</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for a course code like "CS201", "Slot G", or "Attendance"</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === index;

              return (
                <button
                  key={item.id}
                  data-index={index}
                  type="button"
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left p-2.5 sm:p-3 rounded-lg flex items-center justify-between gap-3 transition-colors ${
                    isSelected
                      ? 'bg-slate-100 text-slate-900'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                  style={{
                    borderLeft: isSelected ? '3px solid #0f172a' : '3px solid transparent',
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 text-xs text-slate-500">
                    {isSelected && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-600">
                        <span>Select</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    )}
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5 text-slate-900' : ''}`} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Keyboard Hints */}
        <div className="hidden sm:flex items-center justify-between px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[10px] text-slate-700">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[10px] text-slate-700">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[10px] text-slate-700">↵</kbd>
              <span>Open</span>
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            NIT Goa Academic Directory
          </span>
        </div>
      </div>
    </div>
  );
};
