import React from 'react';
import { X, Check, Palette, ShieldCheck, Sun, Moon, Smartphone } from 'lucide-react';
import {
  APP_THEMES,
  AppTheme,
  AppearanceMode,
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
  onSelectTheme,
  onThemeChange,
}) => {
  const { theme: hookTheme, changeTheme, mode, changeMode, config: activeConfig } = useTheme();

  if (!isOpen) return null;

  const handleApplyTheme = (themeId: AppTheme) => {
    changeTheme(themeId);
    onSelectTheme?.(themeId);
    onThemeChange?.(themeId);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl bg-white border border-slate-200 rounded-t-xl sm:rounded-lg shadow-2xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom sm:zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Handle */}
        <div className="sm:hidden w-8 h-1 bg-slate-300 rounded mx-auto my-1 shrink-0" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center text-white shadow-xs"
              style={{ backgroundColor: activeConfig.primaryColor }}
            >
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Institutional Theme Studio</h3>
                <span
                  className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded border"
                  style={{
                    backgroundColor: `${activeConfig.primaryColor}15`,
                    color: activeConfig.primaryColor,
                    borderColor: `${activeConfig.primaryColor}30`,
                  }}
                >
                  {activeConfig.name}
                </span>
              </div>
              <p className="text-xs text-slate-500">Curated university palettes & contrast settings</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition active:scale-95 shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Display Appearance Modes */}
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Display Appearance</span>
            <span className="text-[11px] text-slate-500">Live contrast</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => changeMode('light')}
              className={`p-2.5 rounded-md border flex flex-col items-center gap-1 transition active:scale-98 ${
                mode === 'light'
                  ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold">Academic Light</span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">Professional</span>
            </button>

            <button
              type="button"
              onClick={() => changeMode('slate')}
              className={`p-2.5 rounded-md border flex flex-col items-center gap-1 transition active:scale-98 ${
                mode === 'slate'
                  ? 'bg-slate-800 border-blue-500/50 text-white shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Moon className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold">Collegiate Slate</span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">Midnight Navy</span>
            </button>

            <button
              type="button"
              onClick={() => changeMode('oled')}
              className={`p-2.5 rounded-md border flex flex-col items-center gap-1 transition active:scale-98 ${
                mode === 'oled'
                  ? 'bg-black border-slate-700 text-white shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Smartphone className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-semibold">OLED Black</span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">Pure Dark</span>
            </button>
          </div>
        </div>

        {/* 3 Professional Academic Palettes */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-xs font-semibold text-slate-700">Curated University Palettes</span>
            <span className="text-[11px] text-slate-500">3 Institutional Standards</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {APP_THEMES.map((theme) => {
              const isSelected = hookTheme === theme.id;

              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleApplyTheme(theme.id)}
                  className={`p-3 rounded-lg border text-left transition-all duration-120 active:scale-98 flex flex-col justify-between gap-2 relative overflow-hidden ${
                    isSelected
                      ? 'bg-slate-50 shadow-xs ring-1'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                  style={{
                    borderColor: isSelected ? theme.primaryColor : undefined,
                  }}
                >
                  {/* Subtle active top stripe indicator */}
                  {isSelected && (
                    <div
                      className="absolute left-0 top-0 right-0 h-1"
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                  )}

                  <div className="flex items-start justify-between gap-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded flex items-center justify-center shrink-0 shadow-xs"
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        <div className="w-1 h-1 rounded-full bg-white/90" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          {theme.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 font-medium block">
                          {theme.institution}
                        </span>
                      </div>
                    </div>

                    {isSelected ? (
                      <div
                        className="w-4 h-4 rounded-full text-white flex items-center justify-center shrink-0"
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400">
                        Use
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">{theme.description}</p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                    <span className="font-mono text-slate-500">{theme.primaryColor}</span>
                    {theme.id === 'sapphire' && (
                      <span className="text-blue-600 font-semibold flex items-center gap-1 text-[10px]">
                        <ShieldCheck className="w-3 h-3" /> Default
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info & Done action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs text-slate-600">
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Persisted locally across all academic modules
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-md text-white font-semibold transition active:scale-95 text-xs shadow-xs"
            style={{ backgroundColor: activeConfig.primaryColor }}
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
