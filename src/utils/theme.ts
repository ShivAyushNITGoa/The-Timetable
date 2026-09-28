export type AppTheme = 'sapphire' | 'indigo' | 'emerald' | 'titanium';

export interface ThemeConfig {
  id: AppTheme;
  name: string;
  description: string;
  primaryColor: string;
  accentBadge: string;
  previewClass: string;
}

export const APP_THEMES: ThemeConfig[] = [
  {
    id: 'sapphire',
    name: 'NIT Goa Sapphire',
    description: 'Premier collegiate blue & navy — authoritative, high-contrast, official',
    primaryColor: '#2563eb',
    accentBadge: 'bg-blue-600',
    previewClass: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'indigo',
    name: 'Electric Indigo',
    description: 'Deep high-tech violet & indigo — modern engineering aesthetic',
    primaryColor: '#4f46e5',
    accentBadge: 'bg-indigo-600',
    previewClass: 'from-indigo-600 to-purple-700',
  },
  {
    id: 'emerald',
    name: 'Academic Emerald',
    description: 'Classical institutional botanical green & deep slate',
    primaryColor: '#059669',
    accentBadge: 'bg-emerald-600',
    previewClass: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'titanium',
    name: 'Executive Titanium',
    description: 'Minimalist monochrome steel & precision slate',
    primaryColor: '#475569',
    accentBadge: 'bg-slate-600',
    previewClass: 'from-slate-600 to-zinc-700',
  },
];

const THEME_STORAGE_KEY = 'nit_goa_app_theme';

export function getActiveTheme(): AppTheme {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved && (saved === 'sapphire' || saved === 'indigo' || saved === 'emerald' || saved === 'titanium')) {
      return saved as AppTheme;
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
