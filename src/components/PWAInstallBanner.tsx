import React, { useEffect, useState } from 'react';
import { Download, Share, PlusSquare, X, Check, Smartphone } from 'lucide-react';
import { BrandIcon, BrandLogo } from './BrandLogo';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (isIOS && !window.matchMedia('(display-mode: standalone)').matches) {
      // Allow user to trigger iOS instructions
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // If iOS or browser doesn't support direct prompt, show instruction modal
      setShowIOSPrompt(true);
    }
  };

  if (isInstalled || isDismissed) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-amber-500/15 via-cyan-500/10 to-indigo-500/15 border-b border-amber-500/30 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <BrandIcon size={28} className="shrink-0 rounded-lg shadow-sm" />
            <div>
              <span className="font-semibold text-slate-100">Install Timetable by The GDevelopers</span>
              <span className="hidden md:inline text-slate-400 ml-1.5">— Works offline anytime without internet connection.</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 text-slate-400 hover:text-slate-200 rounded-md transition"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS or Manual Instructions Modal */}
      {showIOSPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 text-slate-200 relative shadow-2xl">
            <button
              onClick={() => setShowIOSPrompt(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 flex justify-center">
              <BrandIcon size={64} className="rounded-2xl shadow-xl shadow-[#9EB81E]/20" />
            </div>

            <h3 className="text-lg font-bold text-center text-white mb-2">
              Install to Home Screen
            </h3>
            <p className="text-xs text-slate-400 text-center mb-5">
              Access your 5th Sem EEE + CS300M Minor schedule instantly, even when completely offline in lecture halls.
            </p>

            <div className="space-y-3 text-xs bg-slate-800/60 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-bold text-amber-400 shrink-0">
                  1
                </div>
                <div>
                  Tap the <strong className="text-white">Share</strong> button <Share className="w-3.5 h-3.5 inline mx-1 text-cyan-400" /> in browser bar.
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-bold text-amber-400 shrink-0">
                  2
                </div>
                <div>
                  Scroll down and tap <strong className="text-white">Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-emerald-400" />.
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-bold text-amber-400 shrink-0">
                  3
                </div>
                <div>
                  Tap <strong className="text-white">Add</strong> in the top right to complete.
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSPrompt(false)}
              className="w-full mt-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
