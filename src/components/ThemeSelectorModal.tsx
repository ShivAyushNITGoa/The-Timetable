import React, { useState, useEffect } from 'react';
import { X, Check, Palette, Sparkles, ShieldCheck, Sun, Moon, Smartphone } from 'lucide-react';
import {
  APP_THEMES,
  AppTheme,
  AppearanceMode,
  getActiveTheme,
  setActiveTheme,
  getAppearanceMode,
  setAppearanceMode,
  getThemeConfig,
  useTheme,
} from '../utils/theme';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme?: AppTheme;
  onSelectTheme?: (theme: AppTheme) => void;
  onThemeChange?: (theme: AppTheme) => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTheme: propCurrentTheme,
  onSelectTheme,
  onThemeChange,
}) => {
  const { theme: hookTheme, changeTheme, mode, changeMode, config: activeConfig } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Collegiate' | 'Tech' | 'Natural' | 'Executive'>('all');

  if (!isOpen) return null;

  const categories: Array<'all' | 'Collegiate' | 'Tech' | 'Natural' | 'Executive'> = [
    'all',
    'Collegiate',
    'Tech',
    'Natural',
    'Executive',
  ];

  const filteredThemes = selectedCategory === 'all'
    ? APP_THEMES
    : APP_THEMES.filter((t) => t.category === selectedCategory);

  const handleApplyTheme = (themeId: AppTheme) => {
    changeTheme(themeId);
    onSelectTheme?.(themeId);
    onThemeChange?.(themeId);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-7 space-y-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Grab Handle */}
        <div className="sm:hidden w-12 h-1 bg-slate-600/70 rounded-full mx-auto my-1 shrink-0" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm ring-1 ring-white/10"
              style={{ backgroundColor: activeConfig.primaryColor }}
            >
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Institutional Theme Studio</h3>
                <span
                  className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: `${activeConfig.primaryColor}25`,
                    color: activeConfig.primaryColor,
                    borderColor: `${activeConfig.primaryColor}40`,
                  }}
                >
                  {activeConfig.name}
                </span>
              </div>
              <p className="text-xs text-slate-400">Personalize color accents and display contrast</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition active:scale-95 shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Appearance Mode Selector (Slate, OLED Black, Crisp Light) */}
        <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">Display Appearance</span>
            <span className="text-[11px] text-slate-500 font-medium">Applied immediately</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => changeMode('slate')}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition active:scale-95 ${
                mode === 'slate'
                  ? 'bg-slate-800 border-blue-500/50 text-white shadow-md'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold">Collegiate Slate</span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">Rich dark navy</span>
            </button>

            <button
              type="button"
              onClick={() => changeMode('oled')}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition active:scale-95 ${
                mode === 'oled'
                  ? 'bg-black border-slate-600 text-white shadow-md ring-1 ring-white/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold">OLED Black</span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">Battery saver</span>
            </button>

            <button
              type="button"
              onClick={() => changeMode('light')}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition active:scale-95 ${
                mode === 'light'
                  ? 'bg-slate-100 border-slate-300 text-slate-900 shadow-md ring-1 ring-slate-400'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold">Academic Light</span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">Classroom read</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition active:scale-95 capitalize whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-750'
              }`}
            >
              {cat === 'all' ? 'All Palettes (8)' : cat}
            </button>
          ))}
        </div>

        {/* Theme Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredThemes.map((theme) => {
            const isSelected = hookTheme === theme.id;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleApplyTheme(theme.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-150 active:scale-98 flex flex-col justify-between gap-2.5 group relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-850 shadow-xl ring-2'
                    : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600'
                }`}
                style={{
                  borderColor: isSelected ? theme.primaryColor : undefined,
                  boxShadow: isSelected ? `0 0 25px -4px ${theme.primaryColor}40` : undefined,
                }}
              >
                {/* Subtle side glow stripe */}
                {isSelected && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1.5"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                )}

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    {/* Color Swatch Dot */}
                    <div
                      className={`w-7 h-7 rounded-xl bg-gradient-to-tr ${theme.previewClass} shadow-md ring-1 ring-white/20 flex items-center justify-center`}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-white/90" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white group-hover:text-slate-100 transition">
                          {theme.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        {theme.category}
                      </span>
                    </div>
                  </div>

                  {isSelected ? (
                    <div
                      className="w-6 h-6 rounded-full text-white flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-500 group-hover:text-slate-300 transition">
                      Select
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pr-2">{theme.description}</p>

                {/* Badges / Accents */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                    <span className="font-mono text-slate-400">{theme.primaryColor}</span>
                  </div>

                  {theme.id === 'sapphire' && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-400">
                      <ShieldCheck className="w-3 h-3" />
                      Default
                    </span>
                  )}
                  {theme.id === 'amber' && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400">
                      <Sparkles className="w-3 h-3" />
                      Warm
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info & Done action */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            Theme choices persist across sessions and sync with all academic schedules and modules.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-white font-semibold transition active:scale-95 shadow-md"
            style={{ backgroundColor: activeConfig.primaryColor }}
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
