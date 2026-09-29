import React, { useState, useEffect } from 'react';
import { X, Check, Palette, Sparkles, ShieldCheck } from 'lucide-react';
import { APP_THEMES, AppTheme, getActiveTheme, setActiveTheme, getThemeConfig } from '../utils/theme';

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
  const [activeTheme, setActiveThemeLocal] = useState<AppTheme>(() => propCurrentTheme || getActiveTheme());
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Collegiate' | 'Tech' | 'Natural' | 'Executive'>('all');

  useEffect(() => {
    if (isOpen) {
      setActiveThemeLocal(propCurrentTheme || getActiveTheme());
    }
  }, [isOpen, propCurrentTheme]);

  if (!isOpen) return null;

  const currentConfig = getThemeConfig(activeTheme);

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
    setActiveTheme(themeId);
    setActiveThemeLocal(themeId);
    onSelectTheme?.(themeId);
    onThemeChange?.(themeId);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-5 sm:p-7 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm ring-1 ring-white/10"
              style={{ backgroundColor: currentConfig.primaryColor }}
            >
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Institutional Theme Studio</h3>
                <span
                  className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: `${currentConfig.primaryColor}25`,
                    color: currentConfig.primaryColor,
                    borderColor: `${currentConfig.primaryColor}40`,
                  }}
                >
                  {currentConfig.name}
                </span>
              </div>
              <p className="text-xs text-slate-400">Choose a professional color theme for your NIT Goa workspace</p>
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

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
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
            const isSelected = activeTheme === theme.id;

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
            Theme changes apply immediately across all modules, matrix grids, and mobile navigation.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl text-white font-semibold transition active:scale-95 shadow-md"
            style={{ backgroundColor: currentConfig.primaryColor }}
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
