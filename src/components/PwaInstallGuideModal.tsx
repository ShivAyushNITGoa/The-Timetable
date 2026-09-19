import React, { useState } from 'react';
import {
  Info,
  Download,
  Smartphone,
  Laptop,
  CheckCircle2,
  ShieldCheck,
  X,
  Zap,
  WifiOff,
  Share,
  PlusSquare,
  Monitor,
  HardDrive,
  Sparkles,
} from 'lucide-react';
import { BrandIcon } from './BrandLogo';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PwaInstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PwaInstallGuideModal: React.FC<PwaInstallGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isInstallable, isInstalled, isStandalone, isIOS, isInsideIframe, install } = usePWAInstall();
  const [activePlatform, setActivePlatform] = useState<'android' | 'ios' | 'desktop'>(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) return 'ios';
      if (/android/.test(ua)) return 'android';
    }
    return 'desktop';
  });

  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => {
        setInstallSuccess(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-modal-title"
    >
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-xl w-full p-4 sm:p-6 sm:p-7 shadow-2xl space-y-4 sm:space-y-5 animate-in fade-in zoom-in-95 duration-200 text-slate-100 max-h-[92vh] overflow-y-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Brand & Close Button */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <BrandIcon size={44} className="rounded-2xl shadow-md ring-1 ring-white/10 shrink-0" />
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Progressive Web App (PWA)
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  100% Offline
                </span>
              </div>
              <h2 id="pwa-modal-title" className="text-base sm:text-xl font-extrabold text-white tracking-tight">
                Install NIT Goa Timetable Locally
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 leading-normal">
                Run directly on your device like a native app with zero delay and full offline access.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition shrink-0 active:scale-95 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* What is a PWA? Informational Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-800/60 to-slate-900 border border-cyan-500/30 space-y-2">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>What is a Progressive Web App?</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            This app is built as a certified <strong className="text-white">Progressive Web App (PWA)</strong>. It combines the versatility of the web with the high performance and standalone experience of a native application. It does not require downloading from the Google Play Store or Apple App Store.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
              <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span className="block text-[11px] font-bold text-white">Instant Launch</span>
              <span className="text-[9px] text-slate-400">Zero loading delay</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
              <WifiOff className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <span className="block text-[11px] font-bold text-white">Works Offline</span>
              <span className="text-[9px] text-slate-400">No internet required</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
              <HardDrive className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <span className="block text-[11px] font-bold text-white">Local Storage</span>
              <span className="text-[9px] text-slate-400">Private on your device</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
              <Monitor className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
              <span className="block text-[11px] font-bold text-white">No Address Bar</span>
              <span className="text-[9px] text-slate-400">Clean fullscreen app</span>
            </div>
          </div>
        </div>

        {/* 1-Click Install Button (When Supported by Browser) */}
        {isInstallable && !isStandalone && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">1-Click Fast Install Available</div>
                <div className="text-[11px] text-slate-400">Your browser supports instant direct installation.</div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleInstallClick}
              className="w-full sm:w-auto min-h-[42px] px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-md shadow-amber-500/20"
            >
              {installSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                  <span>Installed!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Install App Now</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Standalone Status Indicator */}
        {isStandalone && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>You are currently running this app as an installed standalone Progressive Web App!</span>
          </div>
        )}

        {/* Iframe Notice for AI Studio Preview */}
        {isInsideIframe && !isStandalone && (
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-400 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-slate-300">Preview Mode Note:</strong> If testing in an embedded browser preview, open the app URL directly in a full browser tab to trigger the native browser install prompt or follow the quick steps below.
            </div>
          </div>
        )}

        {/* Step-by-Step Installation Guides by Platform */}
        <div className="space-y-3 pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <span>How to Install Locally:</span>
              </span>
              <span className="text-[10px] text-amber-400/90 font-medium sm:hidden">
                Tap your device below
              </span>
            </div>

            {/* Mobile-responsive segmented device selector */}
            <div
              id="pwa-device-selector"
              role="tablist"
              aria-label="Device platforms for local installation guide"
              className="grid grid-cols-3 gap-1 p-1 bg-slate-800/95 rounded-2xl border border-slate-700/80 w-full sm:w-auto shadow-inner"
            >
              <button
                type="button"
                id="pwa-tab-android"
                role="tab"
                aria-selected={activePlatform === 'android'}
                aria-controls="pwa-guide-android"
                onClick={() => setActivePlatform('android')}
                className={`min-h-[44px] sm:min-h-[36px] px-2 sm:px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95 text-center cursor-pointer select-none ${
                  activePlatform === 'android'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25 ring-1 ring-amber-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 active:bg-slate-700'
                }`}
              >
                <Smartphone className="w-4 h-4 shrink-0" />
                <span className="truncate">Android</span>
              </button>

              <button
                type="button"
                id="pwa-tab-ios"
                role="tab"
                aria-selected={activePlatform === 'ios'}
                aria-controls="pwa-guide-ios"
                onClick={() => setActivePlatform('ios')}
                className={`min-h-[44px] sm:min-h-[36px] px-2 sm:px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95 text-center cursor-pointer select-none ${
                  activePlatform === 'ios'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25 ring-1 ring-amber-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 active:bg-slate-700'
                }`}
              >
                <Share className="w-4 h-4 shrink-0" />
                <span className="truncate">iPhone / iPad</span>
              </button>

              <button
                type="button"
                id="pwa-tab-desktop"
                role="tab"
                aria-selected={activePlatform === 'desktop'}
                aria-controls="pwa-guide-desktop"
                onClick={() => setActivePlatform('desktop')}
                className={`min-h-[44px] sm:min-h-[36px] px-2 sm:px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95 text-center cursor-pointer select-none ${
                  activePlatform === 'desktop'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25 ring-1 ring-amber-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 active:bg-slate-700'
                }`}
              >
                <Laptop className="w-4 h-4 shrink-0" />
                <span className="truncate">PC / Mac</span>
              </button>
            </div>
          </div>

          {/* Android Guide */}
          {activePlatform === 'android' && (
            <div
              id="pwa-guide-android"
              role="tabpanel"
              aria-labelledby="pwa-tab-android"
              className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/70 space-y-2.5 text-xs text-slate-300 animate-in fade-in duration-150"
            >
              <div className="font-bold text-white flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Android (Chrome, Edge, Samsung Internet, Brave):</span>
              </div>
              <ol className="space-y-2 pl-4 list-decimal marker:text-amber-400 leading-relaxed">
                <li>
                  Open this link in <strong className="text-white">Google Chrome</strong> or your preferred Android browser.
                </li>
                <li>
                  Tap the <strong className="text-white">three dots menu (⋮)</strong> in the top-right corner of the browser.
                </li>
                <li>
                  Tap <strong className="text-white">"Install app"</strong> or <strong className="text-white">"Add to Home screen"</strong>.
                </li>
                <li>
                  Confirm by tapping <strong className="text-white">Install</strong>. The NIT Goa Timetable app icon will appear on your home screen and app drawer just like a native app.
                </li>
              </ol>
            </div>
          )}

          {/* iOS / iPhone Guide */}
          {activePlatform === 'ios' && (
            <div
              id="pwa-guide-ios"
              role="tabpanel"
              aria-labelledby="pwa-tab-ios"
              className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/70 space-y-2.5 text-xs text-slate-300 animate-in fade-in duration-150"
            >
              <div className="font-bold text-white flex items-center gap-1.5">
                <Share className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>iPhone / iPad (Apple Safari):</span>
              </div>
              <ol className="space-y-2 pl-4 list-decimal marker:text-cyan-400 leading-relaxed">
                <li>
                  Open this app in <strong className="text-white">Apple Safari</strong> (iOS requires Safari to install PWAs to the home screen).
                </li>
                <li>
                  Tap the <strong className="text-white">Share button</strong> (the square with an upward arrow <Share className="w-3.5 h-3.5 inline text-cyan-400" /> at the bottom toolbar).
                </li>
                <li>
                  Scroll down the share menu options and tap <strong className="text-white flex-inline items-center gap-1">"Add to Home Screen" <PlusSquare className="w-3.5 h-3.5 inline text-slate-300" /></strong>.
                </li>
                <li>
                  Tap <strong className="text-white">Add</strong> in the top-right corner. The app will launch in full screen with no Safari browser bars.
                </li>
              </ol>
            </div>
          )}

          {/* Desktop Guide */}
          {activePlatform === 'desktop' && (
            <div
              id="pwa-guide-desktop"
              role="tabpanel"
              aria-labelledby="pwa-tab-desktop"
              className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/70 space-y-2.5 text-xs text-slate-300 animate-in fade-in duration-150"
            >
              <div className="font-bold text-white flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Windows, Mac, or Linux (Chrome, Edge, Brave):</span>
              </div>
              <ol className="space-y-2 pl-4 list-decimal marker:text-amber-400 leading-relaxed">
                <li>
                  Open this page in <strong className="text-white">Google Chrome</strong> or <strong className="text-white">Microsoft Edge</strong>.
                </li>
                <li>
                  Look at the right side of the address bar for the <strong className="text-white">Install icon</strong> (a small monitor icon or <Download className="w-3.5 h-3.5 inline text-amber-400" />).
                </li>
                <li>
                  Or click the browser menu <strong className="text-white">(⋮)</strong> &gt; <strong className="text-white">"Save and share"</strong> &gt; <strong className="text-white">"Install NIT Goa Timetable"</strong>.
                </li>
                <li>
                  Click <strong className="text-white">Install</strong>. It will open in a separate window and can be pinned to your Taskbar or macOS Dock.
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Footer with Close Button */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 font-mono">
            NIT Goa PWA v3.4.0 • Zero Telemetry
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition active:scale-95 cursor-pointer"
          >
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
};
