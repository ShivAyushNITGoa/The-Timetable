import { useEffect, useRef, useCallback } from 'react';
import { ActiveTab } from '../components/Navbar';
import { DayOfWeek } from '../data/timetableData';

interface HistoryNavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedDay: DayOfWeek;
  setSelectedDay: (day: DayOfWeek) => void;
  todayDay: DayOfWeek;
  activeModalCourse: string | null;
  setActiveModalCourse: (course: string | null) => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  isBranchSelectorOpen: boolean;
  setIsBranchSelectorOpen: (open: boolean) => void;
  isPwaModalOpen: boolean;
  setIsPwaModalOpen: (open: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isSlotEditorOpen: boolean;
  setIsSlotEditorOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
}

export function useMobilePWAHistory({
  activeTab,
  setActiveTab,
  selectedDay,
  setSelectedDay,
  todayDay,
  activeModalCourse,
  setActiveModalCourse,
  isCustomizerOpen,
  setIsCustomizerOpen,
  isBranchSelectorOpen,
  setIsBranchSelectorOpen,
  isPwaModalOpen,
  setIsPwaModalOpen,
  isAdminModalOpen,
  setIsAdminModalOpen,
  isSlotEditorOpen,
  setIsSlotEditorOpen,
  isCommandPaletteOpen,
  setIsCommandPaletteOpen,
}: HistoryNavigationProps) {
  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Check if any modal is currently open
  const isAnyModalOpen =
    Boolean(activeModalCourse) ||
    isCustomizerOpen ||
    isBranchSelectorOpen ||
    isPwaModalOpen ||
    isAdminModalOpen ||
    isSlotEditorOpen ||
    isCommandPaletteOpen;

  const closeAllModals = useCallback(() => {
    if (activeModalCourse) setActiveModalCourse(null);
    if (isCustomizerOpen) setIsCustomizerOpen(false);
    if (isBranchSelectorOpen) setIsBranchSelectorOpen(false);
    if (isPwaModalOpen) setIsPwaModalOpen(false);
    if (isAdminModalOpen) setIsAdminModalOpen(false);
    if (isSlotEditorOpen) setIsSlotEditorOpen(false);
    if (isCommandPaletteOpen) setIsCommandPaletteOpen(false);
  }, [
    activeModalCourse,
    setActiveModalCourse,
    isCustomizerOpen,
    setIsCustomizerOpen,
    isBranchSelectorOpen,
    setIsBranchSelectorOpen,
    isPwaModalOpen,
    setIsPwaModalOpen,
    isAdminModalOpen,
    setIsAdminModalOpen,
    isSlotEditorOpen,
    setIsSlotEditorOpen,
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
  ]);

  // Handle hardware / browser Back action
  const handleBack = useCallback(() => {
    if (isAnyModalOpen) {
      closeAllModals();
      return true;
    }
    if (activeTab !== 'day') {
      setActiveTab('day');
      return true;
    }
    if (selectedDay !== todayDay) {
      setSelectedDay(todayDay);
      return true;
    }
    return false;
  }, [isAnyModalOpen, closeAllModals, activeTab, setActiveTab, selectedDay, setSelectedDay, todayDay]);

  // Synchronize history state for back button and edge swipes
  useEffect(() => {
    // Push dummy history entry on mount if not already present
    if (typeof window !== 'undefined' && window.history && window.history.state?.nitGoa !== true) {
      window.history.replaceState({ nitGoa: true, depth: 0 }, '');
    }

    const onPopState = (e: PopStateEvent) => {
      // Intercept the browser back button or edge swipe
      if (isAnyModalOpen) {
        closeAllModals();
        // Push a state back so the next back press also stays in app
        window.history.pushState({ nitGoa: true, depth: 1 }, '');
      } else if (activeTab !== 'day') {
        setActiveTab('day');
        window.history.pushState({ nitGoa: true, depth: 1 }, '');
      } else if (selectedDay !== todayDay) {
        setSelectedDay(todayDay);
        window.history.pushState({ nitGoa: true, depth: 1 }, '');
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [isAnyModalOpen, closeAllModals, activeTab, setActiveTab, selectedDay, setSelectedDay, todayDay]);

  // Whenever a modal opens or tab changes, push a history state
  useEffect(() => {
    if (isAnyModalOpen || activeTab !== 'day' || selectedDay !== todayDay) {
      window.history.pushState({ nitGoa: true, depth: 1 }, '');
    }
  }, [isAnyModalOpen, activeTab, selectedDay, todayDay]);

  // Touch Swipe Gesture Detection (Swipe Right to go Back / Prev Day, Swipe Left for Next Day)
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: Date.now(),
        };
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current || e.changedTouches.length === 0) return;

      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
      const deltaTime = Date.now() - touchStartRef.current.time;
      touchStartRef.current = null;

      // Only respond to intentional horizontal swipes (< 500ms, abs(deltaX) > 75, abs(deltaY) < 60)
      if (deltaTime > 500) return;
      if (Math.abs(deltaY) > 65) return;

      // 1. SWIPE RIGHT (Slide back feature)
      if (deltaX > 75) {
        if (isAnyModalOpen) {
          closeAllModals();
        } else if (activeTab !== 'day') {
          setActiveTab('day');
        } else {
          // Go to previous day
          const currentIdx = days.indexOf(selectedDay);
          const prevIdx = (currentIdx - 1 + days.length) % days.length;
          setSelectedDay(days[prevIdx]);
        }
      }

      // 2. SWIPE LEFT (Advance day if in day view)
      if (deltaX < -75 && !isAnyModalOpen && activeTab === 'day') {
        const currentIdx = days.indexOf(selectedDay);
        const nextIdx = (currentIdx + 1) % days.length;
        setSelectedDay(days[nextIdx]);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isAnyModalOpen, closeAllModals, activeTab, setActiveTab, selectedDay, setSelectedDay, days]);

  const canGoBack = isAnyModalOpen || activeTab !== 'day' || selectedDay !== todayDay;

  return {
    canGoBack,
    handleBack,
    closeAllModals,
  };
}
