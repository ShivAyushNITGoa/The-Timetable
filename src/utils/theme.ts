import { useState, useEffect } from 'react';

export type AppTheme = 'sapphire';

export type AppearanceMode = 'light';

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
const MODE_STORAGE_KEY = 'nit_goa_appearance_mode_v3';

export function getActiveTheme(): AppTheme {
  return 'sapphire';
}

export function getAppearanceMode(): AppearanceMode {
  return 'light';
}

export function setActiveTheme(_theme: string): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, 'sapphire');
    document.documentElement.setAttribute('data-theme', 'sapphire');
    document.documentElement.setAttribute('data-mode', 'light');
    window.dispatchEvent(new CustomEvent('nit_goa_theme_changed', { detail: { theme: 'sapphire' } }));
  } catch (e) {
    console.error('Error saving theme to storage:', e);
  }
}

export function setAppearanceMode(_mode: string): void {
  try {
    localStorage.setItem(MODE_STORAGE_KEY, 'light');
    document.documentElement.setAttribute('data-mode', 'light');
    window.dispatchEvent(new CustomEvent('nit_goa_mode_changed', { detail: { mode: 'light' } }));
  } catch (e) {
    console.error('Error saving appearance mode to storage:', e);
  }
}

export function initTheme(): { theme: AppTheme; mode: AppearanceMode } {
  try {
    document.documentElement.setAttribute('data-theme', 'sapphire');
    document.documentElement.setAttribute('data-mode', 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  } catch (e) {
    console.error('Error initializing theme on document:', e);
  }
  return { theme: 'sapphire', mode: 'light' };
}

export function getThemeConfig(_themeId?: string): ThemeConfig {
  return APP_THEMES[0];
}

/**
 * React hook to read theme config (unified university palette)
 */
export function useTheme() {
  const [theme] = useState<AppTheme>('sapphire');
  const [mode] = useState<AppearanceMode>('light');

  const config = APP_THEMES[0];

  return {
    theme,
    changeTheme: setActiveTheme,
    mode,
    changeMode: setAppearanceMode,
    config,
    allThemes: APP_THEMES,
  };
}
