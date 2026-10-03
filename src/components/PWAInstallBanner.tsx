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
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <BrandIcon size={28} className="shrink-0 rounded-md shadow-xs" />
            <div>
              <span className="font-semibold text-slate-900">Install Timetable by The GDevelopers</span>
              <span className="hidden md:inline text-slate-500 ml-1.5">— Works offline anytime without internet connection.</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-md shadow-xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md transition"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS or Manual Instructions Modal */}
      {showIOSPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-lg max-w-sm w-full p-6 text-slate-800 relative shadow-xl">
            <button
              onClick={() => setShowIOSPrompt(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 flex justify-center">
              <BrandIcon size={64} className="rounded-lg shadow-md" />
            </div>

            <h3 className="text-lg font-bold text-center text-slate-900 mb-1.5">
              Install to Home Screen
            </h3>
            <p className="text-xs text-slate-500 text-center mb-5">
              Access your official NIT Goa timetable instantly, even when completely offline in lecture halls.
            </p>

            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div className="text-slate-700">
                  Tap the <strong className="text-slate-900 font-semibold">Share</strong> button <Share className="w-3.5 h-3.5 inline mx-1 text-blue-600" /> in browser bar.
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div className="text-slate-700">
                  Scroll down and tap <strong className="text-slate-900 font-semibold">Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-emerald-600" />.
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <div className="text-slate-700">
                  Tap <strong className="text-slate-900 font-semibold">Add</strong> in the top right to complete.
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSPrompt(false)}
              className="w-full mt-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
