/**
 * Local Data Storage Manager for NIT Goa Academic Portal
 * Guarantees 100% client-side privacy and offline data persistence.
 * Zero data sent to external servers.
 */

export const STORAGE_KEYS = {
  PROFILE: 'nit_goa_student_profile',
  ACTIVE_TAB: 'nit_goa_active_tab',
  SELECTED_DAY: 'nit_goa_selected_day',
  TESTS: 'nit_goa_academic_tests_v1',
  SUB_TAB: 'nit_goa_academic_subtab',
} as const;

export interface LocalStorageStats {
  profileFound: boolean;
  scheduleOverridesCount: number;
  attendanceRecordsCount: number;
  testCount: number;
  calcRecordsCount: number;
  totalBytes: number;
}

/**
 * Scan localStorage and calculate total size and stored items
 */
export function getLocalStorageStats(): LocalStorageStats {
  let scheduleOverridesCount = 0;
  let attendanceRecordsCount = 0;
  let calcRecordsCount = 0;
  let testCount = 0;
  let totalBytes = 0;

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      const value = localStorage.getItem(key) || '';
      totalBytes += (key.length + value.length) * 2; // UTF-16 approx bytes

      if (key.startsWith('nit_goa_schedule_')) {
        scheduleOverridesCount++;
      } else if (key.startsWith('nit_goa_attendance_')) {
        attendanceRecordsCount++;
      } else if (key.startsWith('nit_goa_calc_')) {
        calcRecordsCount++;
      } else if (key === STORAGE_KEYS.TESTS) {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) testCount = parsed.length;
        } catch {
          // ignore
        }
      }
    }
  } catch (err) {
    console.error('Failed to calculate localStorage stats:', err);
  }

  const profileFound = Boolean(localStorage.getItem(STORAGE_KEYS.PROFILE));

  return {
    profileFound,
    scheduleOverridesCount,
    attendanceRecordsCount,
    testCount,
    calcRecordsCount,
    totalBytes,
  };
}

/**
 * Export all NIT Goa portal user data stored in localStorage as a downloadable JSON object
 */
export function exportAllLocalData(): string {
  const backup: Record<string, any> = {
    _exportDate: new Date().toISOString(),
    _version: '3.4.0',
    _portal: 'NIT Goa Academic Timetable & Attendance Portal',
    _architect: 'Ayush Kumar',
    data: {},
  };

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.startsWith('nit_goa_')) {
        const value = localStorage.getItem(key);
        try {
          backup.data[key] = value ? JSON.parse(value) : value;
        } catch {
          backup.data[key] = value;
        }
      }
    }
  } catch (err) {
    console.error('Failed to export local data:', err);
  }

  return JSON.stringify(backup, null, 2);
}

/**
 * Trigger file download of backup JSON
 */
export function downloadLocalBackupFile(): void {
  const json = exportAllLocalData();
  const dateStr = new Date().toISOString().split('T')[0];
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `NIT_Goa_My_Local_Data_${dateStr}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Import and restore all NIT Goa portal user data from a JSON backup string
 */
export function importLocalData(jsonString: string): { success: boolean; message: string; count: number } {
  try {
    const parsed = JSON.parse(jsonString);
    const data = parsed.data || parsed;
    let count = 0;

    for (const key of Object.keys(data)) {
      if (key.startsWith('nit_goa_')) {
        const val = data[key];
        localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
        count++;
      }
    }

    return {
      success: true,
      message: `Successfully restored ${count} local data records.`,
      count,
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Import failed: ${err?.message || 'Invalid JSON format'}`,
      count: 0,
    };
  }
}

/**
 * Clear all NIT Goa portal user data stored in localStorage
 */
export function clearAllPortalLocalData(): void {
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('nit_goa_')) {
      keysToRemove.push(key);
    }
  }
  for (const k of keysToRemove) {
    localStorage.removeItem(k);
  }
}
