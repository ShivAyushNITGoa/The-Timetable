/**
 * NIT Goa Academic Notification Service
 * Handles Web Notifications, Service Worker push alerts, in-app audio chimes,
 * and background scheduling for upcoming classes, labs, and exams.
 */

import { TimeSlot, DayOfWeek, Course } from '../data/timetableData';
import { AcademicTest } from '../data/testTypes';

const NOTIF_STORAGE_KEY = 'nit_goa_notifications_enabled';
const ALERT_LOG_KEY = 'nit_goa_alerted_sessions';

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isNotificationSupported()) return 'unsupported';
  try {
    return Notification.permission;
  } catch {
    return 'default';
  }
}

export function isNotificationEnabled(): boolean {
  if (!isNotificationSupported()) return false;
  const pref = localStorage.getItem(NOTIF_STORAGE_KEY);
  if (pref === 'false') return false;
  return Notification.permission === 'granted';
}

export function setNotificationEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(NOTIF_STORAGE_KEY, enabled ? 'true' : 'false');
  } catch (e) {
    console.error(e);
  }
}

/**
 * Play a pleasant, non-intrusive notification chime using Web Audio API
 */
export function playNotificationTone(): void {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Two-tone chime (F5 -> C6)
    osc.frequency.setValueAtTime(698.46, ctx.currentTime);
    osc.frequency.setValueAtTime(1046.5, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch {
    // Ignore audio autoplay restrictions
  }
}

/**
 * Request permission from the user quietly without test popups
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) {
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setNotificationEnabled(true);
      return true;
    } else {
      setNotificationEnabled(false);
      return false;
    }
  } catch (err) {
    console.warn('Error requesting notification permission:', err);
    return false;
  }
}

/**
 * User-based toggle: Turn class & exam notifications ON or OFF
 */
export async function toggleNotification(targetState?: boolean): Promise<boolean> {
  const current = isNotificationEnabled();
  const next = targetState !== undefined ? targetState : !current;

  if (next) {
    if (!isNotificationSupported()) {
      return false;
    }
    if (Notification.permission !== 'granted') {
      const granted = await requestNotificationPermission();
      return granted;
    }
    setNotificationEnabled(true);
    return true;
  } else {
    setNotificationEnabled(false);
    return false;
  }
}

/**
 * Deliver a notification via Web Notification or ServiceWorker
 */
export function sendBrowserNotification(title: string, options?: NotificationOptions): void {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return;
  }

  try {
    // Attempt standard Notification first
    const notif = new Notification(title, {
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: 'nit-goa-timetable',
      ...options,
    });

    notif.onclick = () => {
      window.focus();
      notif.close();
    };
  } catch {
    // Fallback to service worker showNotification if available (e.g. mobile Chrome / PWA standalone)
    try {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.showNotification(title, {
            icon: '/favicon.svg',
            badge: '/favicon.svg',
            ...options,
          });
        });
      }
    } catch (e) {
      console.warn('Could not display service worker notification:', e);
    }
  }
}

export interface InAppAlertDetail {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'urgent';
  timestamp: number;
}

/**
 * Dispatches an event for in-app floating toast alerts
 */
export function dispatchInAppAlert(title: string, message: string, type: 'info' | 'success' | 'warning' | 'urgent' = 'info'): void {
  const detail: InAppAlertDetail = {
    title,
    message,
    type,
    timestamp: Date.now(),
  };
  window.dispatchEvent(new CustomEvent('nit_goa_inapp_alert', { detail }));
}

/**
 * Legacy test trigger retained for compatibility (silent, no test popup)
 */
export function triggerTestNotification(): void {
  // Silent - popups disabled per user request
}

/**
 * Check alerted sessions in sessionStorage so we don't alert twice for the same class on the same day
 */
function hasAlertedToday(alertKey: string): boolean {
  try {
    const raw = sessionStorage.getItem(ALERT_LOG_KEY);
    if (!raw) return false;
    const list: string[] = JSON.parse(raw);
    return list.includes(alertKey);
  } catch {
    return false;
  }
}

function markAlertedToday(alertKey: string): void {
  try {
    const raw = sessionStorage.getItem(ALERT_LOG_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(alertKey)) {
      list.push(alertKey);
      sessionStorage.setItem(ALERT_LOG_KEY, JSON.stringify(list));
    }
  } catch {
    // ignore
  }
}

/**
 * Active background scheduler: inspects upcoming slots and exams, sending timely alerts
 */
export function runScheduleNotificationCheck(
  schedule: Record<DayOfWeek, TimeSlot[]>,
  tests: AcademicTest[],
  courses: Record<string, Course>
): void {
  if (!isNotificationEnabled()) return;

  const now = new Date();
  const dayIndex = now.getDay();
  const daysMap: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDayName = daysMap[dayIndex];
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // 1. Check today's time slots
  const todaySlots = schedule[todayDayName] || [];
  for (const slot of todaySlots) {
    if (slot.isLunch || slot.isFree) continue;

    const [sh, sm] = slot.startTime.split(':').map(Number);
    const startTotal = sh * 60 + sm;
    const minutesUntilStart = startTotal - currentMinutes;

    // Trigger alert if class starts within 10 minutes
    if (minutesUntilStart > 0 && minutesUntilStart <= 10) {
      const alertKey = `class_${todayDayName}_${slot.id || slot.startTime}_${dateStr}`;
      if (!hasAlertedToday(alertKey)) {
        markAlertedToday(alertKey);

        const course = courses[slot.courseCode];
        const courseName = course?.name || slot.slotName || slot.courseCode;
        const room = slot.room || course?.room || 'Assigned Room';

        playNotificationTone();
        sendBrowserNotification(`Upcoming Class in ${minutesUntilStart} min${minutesUntilStart > 1 ? 's' : ''}`, {
          body: `${courseName} (${slot.courseCode}) starts at ${slot.startTime} in Room ${room}.`,
          icon: '/favicon.svg',
        });
        dispatchInAppAlert(
          `Upcoming: ${courseName}`,
          `Class starts in ${minutesUntilStart} min at ${slot.startTime} (Room ${room})`,
          'info'
        );
      }
    }
  }

  // 2. Check scheduled exams/tests for today
  for (const test of tests) {
    if (test.date !== dateStr) continue;

    const [th, tm] = test.startTime.split(':').map(Number);
    const testStartTotal = th * 60 + tm;
    const minutesUntilTest = testStartTotal - currentMinutes;

    // Trigger reminder 30 minutes before test or first check of the day
    if (minutesUntilTest > 0 && minutesUntilTest <= 30) {
      const testAlertKey = `test_prep_${test.id}_${dateStr}`;
      if (!hasAlertedToday(testAlertKey)) {
        markAlertedToday(testAlertKey);

        playNotificationTone();
        sendBrowserNotification(`Exam Alert: ${test.title}`, {
          body: `${test.courseCode} assessment starting at ${test.startTime} in ${test.room}. Bring ID card & materials.`,
          icon: '/favicon.svg',
        });
        dispatchInAppAlert(
          `Exam Alert: ${test.title}`,
          `Starts in ${minutesUntilTest} mins (${test.startTime}) at ${test.room}`,
          'urgent'
        );
      }
    }
  }
}
