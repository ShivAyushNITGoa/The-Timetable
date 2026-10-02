import { useState, useEffect } from 'react';

export type AppTheme = 
  | 'sapphire' 
  | 'slate' 
  | 'crimson';

export type AppearanceMode = 'slate' | 'oled' | 'light';

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
 * 3 Curated Academic Standards:
 * Minimal, high-legibility institutional colors for higher education
 */
export const APP_THEMES: ThemeConfig[] = [
  {
    id: 'sapphire',
    name: 'NIT Goa Navy',
    institution: 'Collegiate Navy & Royal Blue',
    description: 'Official institute navy — authoritative, high-contrast, structured and distraction-free',
    primaryColor: '#2563eb',
    secondaryColor: '#1d4ed8',
    accentBadge: 'bg-blue-600',
    previewClass: 'from-blue-700 to-slate-900',
    borderClass: 'border-blue-500/30',
    bgLightClass: 'bg-blue-600/10',
    textClass: 'text-blue-400',
  },
  {
    id: 'slate',
    name: 'Cambridge Slate',
    institution: 'Scholarly Steel & Graphite',
    description: 'Calm monochrome steel — optimized for long study sessions, catalog reading and reading comfort',
    primaryColor: '#64748b',
    secondaryColor: '#475569',
    accentBadge: 'bg-slate-600',
    previewClass: 'from-slate-600 to-zinc-800',
    borderClass: 'border-slate-500/30',
    bgLightClass: 'bg-slate-600/10',
    textClass: 'text-slate-300',
  },
  {
    id: 'crimson',
    name: 'Oxford Burgundy',
    institution: 'Traditional University Wine',
    description: 'Distinguished collegiate wine & deep cardinal — classic academic heritage and focus',
    primaryColor: '#b91c1c',
    secondaryColor: '#991b1b',
    accentBadge: 'bg-rose-700',
    previewClass: 'from-red-800 to-rose-950',
    borderClass: 'border-rose-500/30',
    bgLightClass: 'bg-rose-600/10',
    textClass: 'text-rose-400',
  },
];

const THEME_STORAGE_KEY = 'nit_goa_app_theme';
const MODE_STORAGE_KEY = 'nit_goa_appearance_mode_v3';

const THEME_FALLBACK_MAP: Record<string, AppTheme> = {
  sapphire: 'sapphire',
  slate: 'slate',
  crimson: 'crimson',
  // Graceful migration mappings
  emerald: 'slate',
  titanium: 'slate',
  indigo: 'sapphire',
  cyan: 'sapphire',
  amber: 'crimson',
  amethyst: 'sapphire',
};

const VALID_MODES = new Set<AppearanceMode>(['slate', 'oled', 'light']);

export function getActiveTheme(): AppTheme {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved && THEME_FALLBACK_MAP[saved]) {
      return THEME_FALLBACK_MAP[saved];
    }
  } catch (e) {
    console.error('Error reading theme from storage:', e);
  }
  return 'sapphire'; // Default professional NIT Goa theme
}

export function getAppearanceMode(): AppearanceMode {
  try {
    const saved = localStorage.getItem(MODE_STORAGE_KEY) as AppearanceMode;
    if (saved && VALID_MODES.has(saved)) {
      return saved;
    }
  } catch (e) {
    console.error('Error reading appearance mode from storage:', e);
  }
  return 'light'; // Default professional light theme as hardware-silicon-engineering-tracker.vercel.app
}

export function setActiveTheme(theme: AppTheme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
    window.dispatchEvent(new CustomEvent('nit_goa_theme_changed', { detail: { theme } }));
  } catch (e) {
    console.error('Error saving theme to storage:', e);
  }
}

export function setAppearanceMode(mode: AppearanceMode): void {
  try {
    localStorage.setItem(MODE_STORAGE_KEY, mode);
    document.documentElement.setAttribute('data-mode', mode);
    window.dispatchEvent(new CustomEvent('nit_goa_mode_changed', { detail: { mode } }));
  } catch (e) {
    console.error('Error saving appearance mode to storage:', e);
  }
}

export function initTheme(): { theme: AppTheme; mode: AppearanceMode } {
  const currentTheme = getActiveTheme();
  const currentMode = getAppearanceMode();
  try {
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-mode', currentMode);
  } catch (e) {
    console.error('Error initializing theme on document:', e);
  }
  return { theme: currentTheme, mode: currentMode };
}

export function getThemeConfig(themeId: AppTheme): ThemeConfig {
  return APP_THEMES.find((t) => t.id === themeId) || APP_THEMES[0];
}

/**
 * React hook to read and subscribe to theme & appearance changes across components
 */
export function useTheme() {
  const [theme, setThemeState] = useState<AppTheme>(getActiveTheme);
  const [mode, setModeState] = useState<AppearanceMode>(getAppearanceMode);

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: AppTheme }>;
      if (customEvent.detail?.theme) {
        setThemeState(customEvent.detail.theme);
      }
    };

    const handleModeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode: AppearanceMode }>;
      if (customEvent.detail?.mode) {
        setModeState(customEvent.detail.mode);
      }
    };

    window.addEventListener('nit_goa_theme_changed', handleThemeChange);
    window.addEventListener('nit_goa_mode_changed', handleModeChange);
    return () => {
      window.removeEventListener('nit_goa_theme_changed', handleThemeChange);
      window.removeEventListener('nit_goa_mode_changed', handleModeChange);
    };
  }, []);

  const changeTheme = (newTheme: AppTheme) => {
    setActiveTheme(newTheme);
    setThemeState(newTheme);
  };

  const changeMode = (newMode: AppearanceMode) => {
    setAppearanceMode(newMode);
    setModeState(newMode);
  };

  const config = getThemeConfig(theme);

  return {
    theme,
    changeTheme,
    mode,
    changeMode,
    config,
    allThemes: APP_THEMES,
  };
}
