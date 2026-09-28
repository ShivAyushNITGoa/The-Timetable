import React from 'react';
import { X, Check, Palette, Sparkles, ShieldCheck } from 'lucide-react';
import { APP_THEMES, AppTheme, getActiveTheme, setActiveTheme } from '../utils/theme';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Institutional Colour Theme</h3>
              <p className="text-xs text-slate-400">Select your preferred professional interface palette</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition active:scale-95"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Theme Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {APP_THEMES.map((theme) => {
            const isSelected = currentTheme === theme.id;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => {
                  onSelectTheme(theme.id);
                  onClose();
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-150 active:scale-98 flex flex-col justify-between gap-3 group ${
                  isSelected
                    ? 'bg-slate-800/90 border-blue-500 ring-2 ring-blue-500/40 shadow-lg'
                    : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${theme.previewClass} shadow-xs ring-1 ring-white/20`}
                    />
                    <span className="text-sm font-bold text-white group-hover:text-blue-200 transition">
                      {theme.name}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{theme.description}</p>

                {theme.id === 'sapphire' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-300 uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3" />
                    Official NIT Goa Standard
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-2 text-center text-xs text-slate-500">
          Theme preferences are saved automatically across sessions on this device.
        </div>
      </div>
    </div>
  );
};
