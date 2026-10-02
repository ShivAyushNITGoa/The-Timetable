import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  Laptop,
  CheckCircle2,
  ShieldCheck,
  Zap,
  WifiOff,
  Share,
  PlusSquare,
  Calendar,
  Grid,
  BookOpen,
  GraduationCap,
  CheckSquare,
  Award,
  ArrowRight,
  LogIn,
  LogOut,
  Building2,
  ExternalLink,
  ChevronRight,
  Info,
  Layers,
  Cloud,
  RefreshCw,
  AlertCircle,
  AlertTriangle,
  Mail,
  Code,
} from 'lucide-react';
import { BrandIcon, BrandLogo } from './BrandLogo';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { User } from 'firebase/auth';

interface LandingPageProps {
  currentUser: User | null;
  isAdmin: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  onContinueToTimetable: () => void;
  onOpenAdminPanel?: () => void;
  authLoading: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentUser,
  isAdmin,
  onSignIn,
  onSignOut,
  onContinueToTimetable,
  onOpenAdminPanel,
  authLoading,
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [activePlatform, setActivePlatform] = useState<'android' | 'ios' | 'desktop'>('android');
  const [installSuccess, setInstallSuccess] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  const handleSignInClick = async () => {
    try {
      setSigningIn(true);
      setSignInError(null);
      await onSignIn();
    } catch (err: any) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setSignInError(err.message || 'Google sign-in was cancelled or failed. Please try again.');
      }
    } finally {
      setSigningIn(false);
    }
  };

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => setInstallSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600/20 selection:text-blue-900 pb-20">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandIcon size={36} className="rounded-lg shadow-xs ring-1 ring-slate-200 shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-slate-900 text-base sm:text-lg">NIT Goa Timetable</span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                National Institute of Technology Goa • Academic Timetable & Syllabi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-right hidden md:block">
                  <div className="text-xs font-bold text-slate-900 flex items-center justify-end gap-1.5">
                    <span>{currentUser.displayName || currentUser.email?.split('@')[0]}</span>
                    {isAdmin && (
                      <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] px-1.5 py-0.2 rounded font-black tracking-wide">
                        ADMIN
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[170px]">{currentUser.email}</div>
                </div>

                {/* Admin Panel Button (visible for ashivamone@gmail.com) */}
                {isAdmin && onOpenAdminPanel && (
                  <button
                    type="button"
                    onClick={onOpenAdminPanel}
                    className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold transition active:scale-95 shadow-xs shrink-0"
                    title="Open Administrator Control Panel"
                  >
                    <ShieldCheck className="w-4 h-4 shrink-0 text-blue-600" />
                    <span>Admin Panel</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onContinueToTimetable}
                  className="min-h-[38px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition active:scale-95 shadow-xs"
                >
                  <span>Open App</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onSignOut}
                  title="Sign Out"
                  className="min-h-[38px] min-w-[38px] p-2 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100 transition flex items-center justify-center border border-slate-200"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSignInClick}
                disabled={authLoading || signingIn}
                className="min-h-[38px] inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-semibold transition shadow-xs active:scale-95"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{signingIn ? 'Connecting...' : 'Sign In with Google'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-20 border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Accreditation Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6 max-w-full shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">NIT Goa • Academic Schedule & Handbooks Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight sm:leading-tight">
            Class Schedules, Attendance & Syllabi{' '}
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
              Synced to Cloud & Resilient Offline
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Engineered for NIT Goa students across all five engineering departments and first-year cycles. Track ongoing
            classes, monitor your mandatory 75% attendance criteria, and organize exam agendas with zero latency.
          </p>

          {/* Cloud & Cross-device Highlight Banner */}
          <div className="mt-6 max-w-2xl mx-auto p-4 rounded-lg bg-white border border-slate-200 text-left flex flex-col sm:flex-row items-start sm:items-center gap-3.5 shadow-xs">
            <div className="p-2 rounded-md bg-blue-50 text-blue-600 border border-blue-200 shrink-0">
              <Cloud className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-600">
              <strong className="text-slate-900 block text-sm font-semibold">
                Seamless Online Cloud Sync & Offline PWA Access
              </strong>
              <span className="mt-0.5 block leading-relaxed">
                All attendance updates, timetable preferences, and test records are securely saved on the cloud linked
                to your Google email. Access your up-to-date data anytime from any phone, laptop, or desktop. In
                lecture halls without signal, the app runs completely offline.
              </span>
            </div>
          </div>

          {signInError && (
            <div className="mt-4 max-w-md mx-auto p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{signInError}</span>
            </div>
          )}

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            {!currentUser ? (
              <button
                type="button"
                onClick={handleSignInClick}
                disabled={authLoading || signingIn}
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-sm active:scale-98 cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#ffffff"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#ffffff"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#ffffff"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#ffffff"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{signingIn ? 'Authenticating...' : 'Sign In with Email (Google)'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onContinueToTimetable}
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-xs active:scale-98"
              >
                <span>Open Timetable</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            {isAdmin && onOpenAdminPanel && (
              <button
                type="button"
                onClick={onOpenAdminPanel}
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition active:scale-95 shadow-xs"
              >
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <span>Open Admin Panel</span>
              </button>
            )}

            {isInstallable && (
              <button
                type="button"
                onClick={handleInstallClick}
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm transition active:scale-95 shadow-xs"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>{installSuccess ? 'App Installed!' : 'Install PWA App'}</span>
              </button>
            )}
          </div>

          {!currentUser && (
            <p className="mt-3 text-[11px] text-slate-500">
              * Guest mode is disabled. Sign-in with your Google account is required to safely synchronize and back up your academic records.
            </p>
          )}

          {/* Quick Metrics & Highlights */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <div className="text-blue-700 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-blue-600" /> Cloud Sync
              </div>
              <div className="text-xs text-slate-600 mt-1">Saves progress across any phone & PC</div>
            </div>
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <div className="text-emerald-700 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <WifiOff className="w-3.5 h-3.5 text-emerald-600" /> Offline PWA
              </div>
              <div className="text-xs text-slate-600 mt-1">Works in basement lecture halls</div>
            </div>
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <div className="text-blue-700 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" /> All Branches
              </div>
              <div className="text-xs text-slate-600 mt-1">CSE, ECE, EEE, ME, CVE & 1st Year</div>
            </div>
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <div className="text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Admin Panel
              </div>
              <div className="text-xs text-slate-600 mt-1">Protected admin overrides & notices</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Device Cloud & Offline Architecture Breakdown */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-semibold mb-2 shadow-2xs">
              <RefreshCw className="w-3.5 h-3.5 text-blue-600" /> Cloud & Offline Infrastructure
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Access Your Data Anywhere, Online or Offline
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              No more losing your attendance records when you clear browser cookies or switch devices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 sm:p-6 rounded-lg bg-white border border-slate-200 hover:border-slate-300 shadow-2xs transition">
              <div className="w-9 h-9 rounded-md bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mb-4">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Cloud Progress Backup</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                When you mark a class present or absent, log a test checklist item, or customize your schedule, data
                instantly synchronizes to secure cloud storage under your email address.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-lg bg-white border border-slate-200 hover:border-slate-300 shadow-2xs transition">
              <div className="w-9 h-9 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4">
                <WifiOff className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">True Offline Reliability</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Network drops or Wi-Fi logins won't lock you out of finding your lecture room. Full schedule data, faculty
                coordinators, and offline cache load in under 100 milliseconds without internet.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-lg bg-white border border-slate-200 hover:border-slate-300 shadow-2xs transition">
              <div className="w-9 h-9 rounded-md bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Central Admin Broadcasts</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Emergency classroom switches or extra lectures posted by administrator reflect live on all
                devices automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step PWA Installation Guide */}
      <section className="py-14 border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-2">
              <Download className="w-3.5 h-3.5 text-blue-600" /> Progressive Web App (PWA)
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Install Directly on Your Phone or PC
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              No app stores required. Fast, lightweight (&lt;3 MB), battery-friendly, and operates in full-screen mode.
            </p>
          </div>

          {/* Quick Install Banner */}
          {isInstallable && (
            <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-600 text-white">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">One-Click Install Supported</h3>
                  <p className="text-xs text-slate-600">Your current browser supports instant native installation.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleInstallClick}
                className="w-full sm:w-auto min-h-[42px] px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-xs active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{installSuccess ? 'App Installed!' : 'Install to Home Screen'}</span>
              </button>
            </div>
          )}

          {/* Platform Tab Switcher */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 rounded-lg bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setActivePlatform('android')}
                className={`min-h-[40px] flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition active:scale-95 ${
                  activePlatform === 'android'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Android (Chrome)</span>
              </button>
              <button
                type="button"
                onClick={() => setActivePlatform('ios')}
                className={`min-h-[40px] flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition active:scale-95 ${
                  activePlatform === 'ios'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>iOS (Safari)</span>
              </button>
              <button
                type="button"
                onClick={() => setActivePlatform('desktop')}
                className={`min-h-[40px] flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition active:scale-95 ${
                  activePlatform === 'desktop'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Laptop className="w-4 h-4" />
                <span>PC / Mac (Chrome/Edge)</span>
              </button>
            </div>
          </div>

          {/* Platform Step Cards */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-7">
            {activePlatform === 'android' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs mb-2.5">
                    1
                  </div>
                  <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">Open in Chrome</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Open this URL in Google Chrome or Brave on your Android smartphone.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs mb-2.5">
                    2
                  </div>
                  <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">Tap the Menu (⋮)</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Tap the three vertical dots located in the upper-right corner of Chrome.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs mb-2.5">
                    3
                  </div>
                  <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">Tap "Install App"</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>. An icon will appear on your launcher!
                  </p>
                </div>
              </div>
            )}

            {activePlatform === 'ios' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs mb-2.5">
                    1
                  </div>
                  <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">Open in Safari</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Apple iOS requires using native <strong>Safari</strong> for PWA installation.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs mb-2.5">
                    2
                  </div>
                  <h4 className="font-semibold text-slate-900 text-xs sm:text-sm flex items-center gap-1">
                    Tap Share <Share className="w-3.5 h-3.5 text-blue-600" />
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Tap the Share icon (square with upward arrow) in the bottom toolbar.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs mb-2.5">
                    3
                  </div>
                  <h4 className="font-semibold text-slate-900 text-xs sm:text-sm flex items-center gap-1">
                    Add to Home Screen <PlusSquare className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Scroll down and tap <strong>"Add to Home Screen"</strong>, then tap <strong>"Add"</strong> at the top right.
                  </p>
                </div>
              </div>
            )}

            {activePlatform === 'desktop' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs mb-2.5">
                    1
                  </div>
                  <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">Use Chrome or Edge</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Open this app on your desktop computer in Chrome, Edge, or Brave.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs mb-2.5">
                    2
                  </div>
                  <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">Check Address Bar</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Look for the install icon (monitor with down arrow) on the right side of the address bar.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs mb-2.5">
                    3
                  </div>
                  <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">Click "Install"</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Click Install. The timetable launches in a dedicated, distraction-free native desktop window!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Core Academic Features Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Academic Features Crafted for NIT Goa
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Everything you need for daily lectures, syllabus review, attendance compliance, and exam preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 sm:p-6 rounded-lg bg-white border border-slate-200 hover:border-slate-300 shadow-2xs transition">
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 w-fit mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Day & Weekly Timetables</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Real-time slot indicator, next lecture countdown, room numbers (Room 18, Room 5, Room 8/9, Room 30/31,
              Room 69, LH 01–04), and faculty coordinator details.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-lg bg-white border border-slate-200 hover:border-slate-300 shadow-2xs transition">
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 w-fit mb-4">
              <CheckSquare className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">75% Attendance Manager</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Stay ahead of NIT Goa's 75% attendance rule. Log classes attended vs. held with instant calculation of safe
              bunks or mandatory recovery classes.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-lg bg-white border border-slate-200 hover:border-slate-300 shadow-2xs transition">
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 w-fit mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Course Syllabi & Textbooks</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Detailed 4-module syllabus breakdowns, course credits, L-T-P patterns, reference books, and faculty
              research publications for each subject.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-lg bg-white border border-slate-200 hover:border-slate-300 shadow-2xs transition">
            <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 w-fit mb-4">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Master Exam Slot Directory</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Institute examination rotation mapping (Slots A through H + MLC Friday sessions) to prevent clashes during
              mid-semester and end-semester examinations.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-lg bg-white border border-slate-200 hover:border-slate-300 shadow-2xs transition">
            <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 w-fit mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Test & Quiz Calendar</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Track upcoming class tests, quiz dates, and viva assignments with interactive checklists and Google/Apple
              calendar (.ics) export.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-lg bg-white border border-slate-200 hover:border-slate-300 shadow-2xs transition">
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 w-fit mb-4">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Administrator Panel</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Secured for administrator (<code className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-mono text-[11px]">ashivamone@gmail.com</code>
              ) to update room shifts, faculty substitutions, and broadcast institute-wide announcements.
            </p>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-4">
        {/* Unofficial Disclaimer & Correction Email Alert Card */}
        <div className="w-full bg-white border border-slate-200 rounded-lg p-4 sm:p-4.5 flex flex-col gap-3 sm:gap-3.5 shadow-2xs text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 text-blue-600">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                    Notice
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    Independent Student Project for NIT Goa
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  This is not an official portal of NIT Goa. Report any mistake or schedule correction on email:
                </p>
              </div>
            </div>

            {/* Direct Mail Action Button */}
            <a
              href="mailto:shivshivamxyz@gmail.com?subject=NIT%20Goa%20Timetable%20Correction"
              className="w-full sm:w-auto min-h-[40px] px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-xs shrink-0 text-center"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span className="break-all">shivshivamxyz@gmail.com</span>
            </a>
          </div>

          {/* Architect & Developer Attribution Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left px-1 pt-3 border-t border-slate-100 w-full">
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Code className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Architect and developer:</span>
              </div>
              <span className="text-slate-900 font-bold text-xs bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                Ayush Kumar
              </span>
            </div>

            <div className="text-[11px] text-slate-500">
              Cuncolim Campus • All B.Tech Branches & Years
            </div>
          </div>
        </div>

        <div className="p-5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 space-y-2 shadow-2xs">
          <div className="flex items-center gap-2 text-blue-700 font-bold uppercase tracking-wider text-[11px]">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>National Institute of Technology Goa • Academic Reference</span>
          </div>
          <p className="leading-relaxed text-slate-600">
            Curriculum data, course codes, timetable slots, and credit distributions are sourced directly from the official NIT Goa 
            Senate ordinances and 2025 Handbooks. For administrative circulars and semester registrations, visit the main institute website at{' '}
            <a
              href="https://nitgoa.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-0.5 font-medium"
            >
              nitgoa.ac.in
              <ExternalLink className="w-3 h-3" />
            </a>
            .
          </p>
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>NIT Goa Academic Timetable • Permanent Campus, Cuncolim, Goa 403703</span>
            <span>Academic Database Edition 2025</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
