import { useState, useEffect } from 'react';

export type AppTheme = 
  | 'sapphire' 
  | 'indigo' 
  | 'emerald' 
  | 'cyan' 
  | 'amber' 
  | 'crimson' 
  | 'amethyst' 
  | 'titanium';

export interface ThemeConfig {
  id: AppTheme;
  name: string;
  category: 'Collegiate' | 'Tech' | 'Natural' | 'Executive';
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentBadge: string;
  previewClass: string;
  borderClass: string;
  bgLightClass: string;
  textClass: string;
}

export const APP_THEMES: ThemeConfig[] = [
  {
    id: 'sapphire',
    name: 'NIT Goa Sapphire',
    category: 'Collegiate',
    description: 'Collegiate sapphire blue & deep navy — crisp, authoritative & official',
    primaryColor: '#2563eb',
    secondaryColor: '#1d4ed8',
    accentBadge: 'bg-blue-600',
    previewClass: 'from-blue-600 to-indigo-700',
    borderClass: 'border-blue-500/30',
    bgLightClass: 'bg-blue-600/10',
    textClass: 'text-blue-400',
  },
  {
    id: 'indigo',
    name: 'Electric Indigo',
    category: 'Tech',
    description: 'High-tech violet & indigo — modern engineering & futuristic design',
    primaryColor: '#4f46e5',
    secondaryColor: '#4338ca',
    accentBadge: 'bg-indigo-600',
    previewClass: 'from-indigo-600 to-violet-700',
    borderClass: 'border-indigo-500/30',
    bgLightClass: 'bg-indigo-600/10',
    textClass: 'text-indigo-400',
  },
  {
    id: 'emerald',
    name: 'Academic Emerald',
    category: 'Natural',
    description: 'Botanical collegiate emerald & forest slate — focused & harmonious',
    primaryColor: '#059669',
    secondaryColor: '#047857',
    accentBadge: 'bg-emerald-600',
    previewClass: 'from-emerald-600 to-teal-700',
    borderClass: 'border-emerald-500/30',
    bgLightClass: 'bg-emerald-600/10',
    textClass: 'text-emerald-400',
  },
  {
    id: 'cyan',
    name: 'Oceanic Cyan',
    category: 'Tech',
    description: 'Vibrant Goa coastal cyan & marine teal — clean, breezy & high contrast',
    primaryColor: '#0891b2',
    secondaryColor: '#0e7490',
    accentBadge: 'bg-cyan-600',
    previewClass: 'from-cyan-500 to-blue-600',
    borderClass: 'border-cyan-500/30',
    bgLightClass: 'bg-cyan-600/10',
    textClass: 'text-cyan-400',
  },
  {
    id: 'amber',
    name: 'Golden Amber',
    category: 'Collegiate',
    description: 'Warm harvest bronze & solar amber — energetic, prestigious & inviting',
    primaryColor: '#d97706',
    secondaryColor: '#b45309',
    accentBadge: 'bg-amber-600',
    previewClass: 'from-amber-500 to-orange-600',
    borderClass: 'border-amber-500/30',
    bgLightClass: 'bg-amber-600/10',
    textClass: 'text-amber-400',
  },
  {
    id: 'crimson',
    name: 'Obsidian Crimson',
    category: 'Collegiate',
    description: 'Distinguished cardinal red & velvet ruby — bold, executive & regal',
    primaryColor: '#dc2626',
    secondaryColor: '#b91c1c',
    accentBadge: 'bg-rose-600',
    previewClass: 'from-rose-600 to-red-700',
    borderClass: 'border-rose-500/30',
    bgLightClass: 'bg-rose-600/10',
    textClass: 'text-rose-400',
  },
  {
    id: 'amethyst',
    name: 'Royal Amethyst',
    category: 'Tech',
    description: 'Deep scholar purple & ultraviolet — creative, sleek & distinguished',
    primaryColor: '#7c3aed',
    secondaryColor: '#6d28d9',
    accentBadge: 'bg-purple-600',
    previewClass: 'from-purple-600 to-fuchsia-700',
    borderClass: 'border-purple-500/30',
    bgLightClass: 'bg-purple-600/10',
    textClass: 'text-purple-400',
  },
  {
    id: 'titanium',
    name: 'Executive Titanium',
    category: 'Executive',
    description: 'Precision monochrome steel & obsidian slate — distraction-free minimalism',
    primaryColor: '#64748b',
    secondaryColor: '#475569',
    accentBadge: 'bg-slate-600',
    previewClass: 'from-slate-600 to-zinc-700',
    borderClass: 'border-slate-500/30',
    bgLightClass: 'bg-slate-600/10',
    textClass: 'text-slate-300',
  },
];

const THEME_STORAGE_KEY = 'nit_goa_app_theme';

const VALID_THEMES = new Set<AppTheme>([
  'sapphire',
  'indigo',
  'emerald',
  'cyan',
  'amber',
  'crimson',
  'amethyst',
  'titanium',
]);

export function getActiveTheme(): AppTheme {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as AppTheme;
    if (saved && VALID_THEMES.has(saved)) {
      return saved;
    }
  } catch (e) {
    console.error('Error reading theme from storage:', e);
  }
  return 'sapphire'; // Default professional theme
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

export function initTheme(): AppTheme {
  const current = getActiveTheme();
  try {
    document.documentElement.setAttribute('data-theme', current);
  } catch (e) {
    console.error('Error initializing theme on document:', e);
  }
  return current;
}

export function getThemeConfig(themeId: AppTheme): ThemeConfig {
  return APP_THEMES.find((t) => t.id === themeId) || APP_THEMES[0];
}

/**
 * React hook to read and subscribe to theme changes in components
 */
export function useTheme() {
  const [theme, setThemeState] = useState<AppTheme>(getActiveTheme);

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: AppTheme }>;
      if (customEvent.detail?.theme) {
        setThemeState(customEvent.detail.theme);
      }
    };

    window.addEventListener('nit_goa_theme_changed', handleThemeChange);
    return () => {
      window.removeEventListener('nit_goa_theme_changed', handleThemeChange);
    };
  }, []);

  const changeTheme = (newTheme: AppTheme) => {
    setActiveTheme(newTheme);
    setThemeState(newTheme);
  };

  const config = getThemeConfig(theme);

  return {
    theme,
    changeTheme,
    config,
    allThemes: APP_THEMES,
  };
}
