import { useState, useEffect, useCallback } from 'react';

export type AppTheme = 'sapphire';

export type AppearanceMode = 'light' | 'dark';

export interface ThemeConfig {
  id: AppTheme;
  name: string;
  institution: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentBadge: string;
  previewClass: string;
  borderClass: string;
  bgLightClass: string;
  textClass: string;
}

/**
 * Curated University Palette:
 * Single, unified collegiate navy and crisp slate theme designed for maximum legibility,
 * distraction-free academic focus, and high contrast.
 */
export const APP_THEMES: ThemeConfig[] = [
  {
    id: 'sapphire',
    name: 'Curated University Palette',
    institution: 'National Institute of Technology Goa',
    description: 'Collegiate Navy & Crisp Slate — Authoritative, high-contrast, and distraction-free academic design',
    primaryColor: '#1e3a8a',
    secondaryColor: '#0f172a',
    accentBadge: 'bg-blue-900',
    previewClass: 'from-blue-900 to-slate-800',
    borderClass: 'border-slate-200',
    bgLightClass: 'bg-blue-50/60',
    textClass: 'text-blue-950',
  },
];

const THEME_STORAGE_KEY = 'nit_goa_app_theme';
const MODE_STORAGE_KEY = 'nit_goa_appearance_mode';

export function getActiveTheme(): AppTheme {
  return 'sapphire';
}

export function getAppearanceMode(): AppearanceMode {
  try {
    const saved = localStorage.getItem(MODE_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // ignore
  }
  return 'light';
}

export function setActiveTheme(_theme: string): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, 'sapphire');
    document.documentElement.setAttribute('data-theme', 'sapphire');
    window.dispatchEvent(new CustomEvent('nit_goa_theme_changed', { detail: { theme: 'sapphire' } }));
  } catch (e) {
    console.error('Error saving theme to storage:', e);
  }
}

export function applyAppearanceModeToDom(mode: AppearanceMode): void {
  try {
    document.documentElement.setAttribute('data-theme', 'sapphire');
    document.documentElement.setAttribute('data-mode', mode);
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    console.error('Error applying appearance mode to DOM:', e);
  }
}

export function setAppearanceMode(mode: AppearanceMode): void {
  try {
    localStorage.setItem(MODE_STORAGE_KEY, mode);
    applyAppearanceModeToDom(mode);
    window.dispatchEvent(new CustomEvent('nit_goa_mode_changed', { detail: { mode } }));
  } catch (e) {
    console.error('Error saving appearance mode to storage:', e);
  }
}

export function toggleAppearanceMode(): AppearanceMode {
  const current = getAppearanceMode();
  const next: AppearanceMode = current === 'dark' ? 'light' : 'dark';
  setAppearanceMode(next);
  return next;
}

export function initTheme(): { theme: AppTheme; mode: AppearanceMode } {
  const mode = getAppearanceMode();
  applyAppearanceModeToDom(mode);
  return { theme: 'sapphire', mode };
}

export function getThemeConfig(_themeId?: string): ThemeConfig {
  return APP_THEMES[0];
}

/**
 * React hook to read theme config and reactively toggle light/dark appearance mode
 */
export function useTheme() {
  const [theme] = useState<AppTheme>('sapphire');
  const [mode, setModeState] = useState<AppearanceMode>(() => getAppearanceMode());

  useEffect(() => {
    const handleModeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode: AppearanceMode }>;
      if (customEvent.detail?.mode) {
        setModeState(customEvent.detail.mode);
      } else {
        setModeState(getAppearanceMode());
      }
    };

    window.addEventListener('nit_goa_mode_changed', handleModeChange);
    return () => {
      window.removeEventListener('nit_goa_mode_changed', handleModeChange);
    };
  }, []);

  const toggleMode = useCallback(() => {
    const next = toggleAppearanceMode();
    setModeState(next);
  }, []);

  const changeMode = useCallback((newMode: AppearanceMode) => {
    setAppearanceMode(newMode);
    setModeState(newMode);
  }, []);

  return {
    theme,
    changeTheme: setActiveTheme,
    mode,
    changeMode,
    toggleMode,
    isDark: mode === 'dark',
    config: APP_THEMES[0],
    allThemes: APP_THEMES,
  };
}
