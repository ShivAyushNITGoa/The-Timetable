import { registerSW } from 'virtual:pwa-register';

export function initPWA() {
  if (typeof window === 'undefined') return;

  // If inside an iframe (like AI Studio preview), skip service worker registration
  // to avoid cross-origin sandbox restrictions and dev server deadlocks
  try {
    const isInsideIframe = window.self !== window.top;
    if (isInsideIframe) {
      return;
    }
  } catch {
    // If accessing window.top throws due to cross-origin restriction, we are definitely in an iframe
    return;
  }

  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      registerSW({
        immediate: true,
        onNeedRefresh() {
          console.log('New content available, reloading...');
        },
        onOfflineReady() {
          console.log('App ready to work offline');
        },
      });
    } catch (err) {
      console.warn('PWA service worker registration skipped:', err);
    }
  }
}
