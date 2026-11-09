import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  ChevronUp,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Download,
  ExternalLink,
  Search,
  FileText,
  AlertCircle,
  Loader2,
  BookOpen,
  Layers,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowUp,
  RotateCcw,
} from 'lucide-react';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  } catch {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  }
}

export interface EmbeddedPdfViewerProps {
  pdfUrl: string;
  pdfFileName?: string;
  title?: string;
  sourceUrl?: string;
  initialPage?: number;
  courseModules?: string[];
  courseCode?: string;
  onClose?: () => void;
  className?: string;
}

// Subcomponent: Individual Continuous Scroll PDF Page
interface PdfPageCardProps {
  pdfDoc: any;
  pageNumber: number;
  scale: number;
  baseWidth: number;
  baseHeight: number;
  isMatch?: boolean;
  totalCount: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const PdfPageCard = memo(
  ({
    pdfDoc,
    pageNumber,
    scale,
    baseWidth,
    baseHeight,
    isMatch = false,
    totalCount,
    containerRef,
  }: PdfPageCardProps) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const renderTaskRef = useRef<any>(null);

    const [isInView, setIsInView] = useState<boolean>(false);
    const [isRendered, setIsRendered] = useState<boolean>(false);
    const [pageError, setPageError] = useState<string | null>(null);

    // Exact dimensions for this page card based on baseWidth and scale
    const computedWidth = Math.max(Math.floor(baseWidth * scale), 260);
    const computedHeight = Math.max(Math.floor(baseHeight * scale), 360);

    // Pre-rendering Intersection Observer:
    // Uses generous rootMargin (800px) to render pages slightly before they enter the screen,
    // eliminating white flashes while maintaining low memory consumption.
    useEffect(() => {
      const el = cardRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            // When far off-screen, unload canvas bitmap to conserve RAM on mobile devices
            setIsInView(false);
          }
        },
        {
          root: containerRef.current || null,
          rootMargin: '800px 0px 800px 0px',
          threshold: 0.01,
        }
      );

      observer.observe(el);
      return () => {
        observer.disconnect();
      };
    }, [containerRef]);

    // Canvas render logic
    useEffect(() => {
      if (!isInView || !pdfDoc) return;
      let isCancelled = false;

      const render = async () => {
        try {
          if (renderTaskRef.current) {
            try {
              renderTaskRef.current.cancel();
            } catch {}
          }

          const page = await pdfDoc.getPage(pageNumber);
          if (isCancelled || !canvasRef.current) return;

          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d', { alpha: false });
          if (!ctx) return;

          // Limit pixel ratio to 2 for optimal Retina sharpness without memory bloat
          const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
          const viewport = page.getViewport({ scale });

          canvas.width = Math.floor(viewport.width * pixelRatio);
          canvas.height = Math.floor(viewport.height * pixelRatio);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;

          ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

          const renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };

          const renderTask = page.render(renderContext);
          renderTaskRef.current = renderTask;
          await renderTask.promise;

          if (!isCancelled) {
            setIsRendered(true);
            setPageError(null);
          }
        } catch (err: any) {
          if (err?.name !== 'RenderingCancelledException') {
            console.warn(`Error rendering page ${pageNumber}:`, err);
            if (!isCancelled) {
              setPageError('Failed to render page');
            }
          }
        }
      };

      render();

      return () => {
        isCancelled = true;
        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch {}
        }
      };
    }, [isInView, pdfDoc, pageNumber, scale]);

    return (
      <div
        id={`pdf-page-${pageNumber}`}
        ref={cardRef}
        data-page-number={pageNumber}
        className="w-full flex flex-col items-center justify-start my-3 sm:my-4 select-text"
        style={{ minHeight: `${computedHeight + 36}px` }}
      >
        {/* Page Top Label & Match Marker */}
        <div
          className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-1.5 px-1 select-none"
          style={{ width: `${computedWidth}px`, maxWidth: '100%' }}
        >
          <span className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isMatch ? 'bg-amber-500 ring-2 ring-amber-200' : 'bg-blue-600'
              }`}
            />
            <span className="font-semibold text-slate-700">Page {pageNumber}</span>
            <span className="text-slate-400">/ {totalCount}</span>
          </span>

          {isMatch && (
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-sans font-bold text-[10px] animate-pulse">
              Search Match
            </span>
          )}
        </div>

        {/* Paper Sheet Container */}
        <div
          className={`bg-white rounded-sm shadow-md border ${
            isMatch ? 'border-amber-400 ring-2 ring-amber-200' : 'border-slate-300'
          } overflow-hidden relative flex items-center justify-center transition-shadow hover:shadow-lg`}
          style={{
            width: `${computedWidth}px`,
            maxWidth: '100%',
            height: `${computedHeight}px`,
          }}
        >
          {isInView ? (
            <canvas ref={canvasRef} className="block select-none" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-400">
              <span className="text-xs font-mono">Page {pageNumber}</span>
            </div>
          )}

          {/* Loading indicator when page enters viewport before render completes */}
          {isInView && !isRendered && !pageError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-2xs text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600 mb-2" />
              <span className="text-xs font-medium">Rendering page {pageNumber}...</span>
            </div>
          )}

          {pageError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-rose-50 text-rose-700 text-center">
              <AlertCircle className="w-5 h-5 mb-1 text-rose-600" />
              <span className="text-xs font-medium">{pageError}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
PdfPageCard.displayName = 'PdfPageCard';

export const EmbeddedPdfViewer: React.FC<EmbeddedPdfViewerProps> = ({
  pdfUrl,
  pdfFileName = 'Curriculum_Handbook.pdf',
  title = 'Official NIT Goa Curriculum Handbook',
  sourceUrl,
  initialPage = 1,
  courseModules,
  courseCode,
  onClose,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<{ [key: number]: HTMLElement | null }>({});

  // PDF Document state
  const [pdfDoc, setPdfDoc] = useState<any | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [scale, setScale] = useState<number>(1.0);
  const [baseDimensions, setBaseDimensions] = useState<{ width: number; height: number }>({
    width: 595.28,
    height: 841.89, // Standard A4 points
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewerMode, setViewerMode] = useState<'canvas' | 'native'>('canvas');
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);

  // Search state
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(courseCode || '');
  const [searchMatches, setSearchMatches] = useState<number[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0);
  const [searching, setSearching] = useState<boolean>(false);

  // Jump page input
  const [jumpPageInput, setJumpPageInput] = useState<string>(String(initialPage));

  // Scroll to a specific page smoothly inside continuous scroll container
  const scrollToPage = useCallback(
    (pageNum: number, behavior: ScrollBehavior = 'smooth') => {
      const targetPage = Math.max(1, Math.min(pageNum, numPages || 1));
      const el = document.getElementById(`pdf-page-${targetPage}`);
      if (el && scrollContainerRef.current) {
        el.scrollIntoView({ behavior, block: 'start' });
        setCurrentPage(targetPage);
        setJumpPageInput(String(targetPage));
      }
    },
    [numPages]
  );

  // Auto-calculate optimal fit scale based on viewport width
  const fitWidth = useCallback(
    (docToUse?: any, customBaseWidth?: number) => {
      if (!scrollContainerRef.current) return;
      try {
        const containerWidth = scrollContainerRef.current.clientWidth;
        // On mobile leave 24px padding, on desktop leave 48px
        const padding = containerWidth < 640 ? 24 : 48;
        const availableWidth = Math.max(containerWidth - padding, 260);
        const unscaledWidth = customBaseWidth || baseDimensions.width || 595;

        const fitRatio = availableWidth / unscaledWidth;
        const targetScale = Math.min(Math.max(Number(fitRatio.toFixed(2)), 0.45), 2.5);
        setScale(targetScale);
      } catch (err) {
        console.warn('Auto fit scale calculation error:', err);
      }
    },
    [baseDimensions]
  );

  // Load PDF Document
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          withCredentials: false,
          cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/cmaps/',
          cMapPacked: true,
        });

        const doc = await loadingTask.promise;
        if (isCancelled) return;

        setPdfDoc(doc);
        setNumPages(doc.numPages);

        // Fetch page 1 to measure natural unscaled aspect ratio
        try {
          const firstPage = await doc.getPage(1);
          const unscaledViewport = firstPage.getViewport({ scale: 1.0 });
          const newBase = {
            width: unscaledViewport.width,
            height: unscaledViewport.height,
          };
          setBaseDimensions(newBase);

          // Calculate fit width scale based on first page's natural width
          fitWidth(doc, newBase.width);
        } catch {
          fitWidth(doc);
        }

        const startPage = initialPage > 0 && initialPage <= doc.numPages ? initialPage : 1;
        setCurrentPage(startPage);
        setJumpPageInput(String(startPage));
        setLoading(false);

        // Smooth scroll to initial page after initial mount
        if (startPage > 1) {
          setTimeout(() => {
            scrollToPage(startPage, 'auto');
          }, 350);
        }
      } catch (err: any) {
        console.warn('Canvas PDF engine load error, attempting fallback fetch:', err);
        if (isCancelled) return;

        try {
          const response = await fetch(pdfUrl);
          if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch PDF`);
          const buffer = await response.arrayBuffer();
          const doc = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) }).promise;

          if (isCancelled) return;
          setPdfDoc(doc);
          setNumPages(doc.numPages);

          try {
            const firstPage = await doc.getPage(1);
            const unscaledViewport = firstPage.getViewport({ scale: 1.0 });
            setBaseDimensions({
              width: unscaledViewport.width,
              height: unscaledViewport.height,
            });
            fitWidth(doc, unscaledViewport.width);
          } catch {
            fitWidth(doc);
          }

          setCurrentPage(1);
          setJumpPageInput('1');
          setLoading(false);
        } catch (bufferErr: any) {
          console.error('All PDF load methods failed:', bufferErr);
          if (isCancelled) return;
          setError(
            'Could not render document in HTML5 Canvas. You can switch to Native Browser Mode or download directly.'
          );
          setViewerMode('native');
          setLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      isCancelled = true;
    };
  }, [pdfUrl, initialPage, fitWidth, scrollToPage]);

  // Window Resize listener to maintain responsive page width
  useEffect(() => {
    let resizeTimer: any;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        fitWidth();
      }, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [fitWidth]);

  // Scroll listener: dynamically updates active page indicator as the user scrolls through the document
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || numPages === 0) return;
    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const probeY = containerRect.top + container.clientHeight * 0.35; // Page at 35% viewport depth

    let detectedPage = 1;
    for (let p = 1; p <= numPages; p++) {
      const el = document.getElementById(`pdf-page-${p}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY) {
          detectedPage = p;
        } else {
          break;
        }
      }
    }

    if (detectedPage !== currentPage) {
      setCurrentPage(detectedPage);
      setJumpPageInput(String(detectedPage));
    }
  }, [numPages, currentPage]);

  // Page jump submit
  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= numPages) {
      scrollToPage(pageNum, 'smooth');
    } else {
      setJumpPageInput(String(currentPage));
    }
  };

  // Zoom controls
  const zoomIn = () => setScale((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 3.0));
  const zoomOut = () => setScale((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.45));
  const resetZoom = () => setScale(1.0);

  // Mouse wheel zoom with Ctrl/Meta key
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    }
  };

  // Text Search across document
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pdfDoc || !searchQuery.trim()) return;

    setSearching(true);
    const query = searchQuery.trim().toLowerCase();
    const matches: number[] = [];

    for (let p = 1; p <= numPages; p++) {
      try {
        const page = await pdfDoc.getPage(p);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ')
          .toLowerCase();
        if (pageText.includes(query)) {
          matches.push(p);
        }
      } catch (err) {
        console.warn(`Error reading text on page ${p}:`, err);
      }
    }

    setSearchMatches(matches);
    setCurrentMatchIndex(0);
    setSearching(false);

    if (matches.length > 0) {
      scrollToPage(matches[0], 'smooth');
    }
  };

  const nextMatch = () => {
    if (searchMatches.length === 0) return;
    const nextIdx = (currentMatchIndex + 1) % searchMatches.length;
    setCurrentMatchIndex(nextIdx);
    scrollToPage(searchMatches[nextIdx], 'smooth');
  };

  const prevMatch = () => {
    if (searchMatches.length === 0) return;
    const prevIdx = (currentMatchIndex - 1 + searchMatches.length) % searchMatches.length;
    setCurrentMatchIndex(prevIdx);
    scrollToPage(searchMatches[prevIdx], 'smooth');
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else if (onClose) {
          onClose();
        }
      } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentPage < numPages) {
          scrollToPage(currentPage + 1, 'smooth');
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentPage > 1) {
          scrollToPage(currentPage - 1, 'smooth');
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFullscreen, currentPage, numPages, onClose, scrollToPage]);

  // Generate page list array 1..numPages
  const pagesList = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <div
      ref={containerRef}
      className={`${
        isFullscreen
          ? 'fixed inset-0 z-[9999] w-screen h-screen rounded-none'
          : 'relative w-full h-full min-h-[560px] rounded-lg'
      } bg-white border border-slate-200 flex flex-col overflow-hidden shadow-xl transition-all ${className}`}
    >
      {/* Top Header Bar */}
      <div className="bg-white px-3 sm:px-4 py-2 sm:py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
        {/* Title & Document Badge */}
        <div className="flex items-center gap-2 min-w-0">
          {/* Thumbnails Sidebar Toggle */}
          {viewerMode === 'canvas' && numPages > 1 && (
            <button
              type="button"
              onClick={() => setShowThumbnails((prev) => !prev)}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center transition border ${
                showThumbnails
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title={showThumbnails ? 'Hide page list' : 'Show page list'}
              aria-label="Toggle page list"
            >
              {showThumbnails ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <PanelLeftOpen className="w-4 h-4" />
              )}
            </button>
          )}

          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-[170px] sm:max-w-md">
                {title}
              </span>
              <span className="hidden md:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Continuous Scroll
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate max-w-[190px] sm:max-w-sm">
              {pdfFileName} • {numPages > 0 ? `${numPages} Pages` : 'Curriculum Handbook'}
            </p>
          </div>
        </div>

        {/* Global Reader Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
          {/* Search Toggle */}
          <button
            type="button"
            onClick={() => setShowSearch((prev) => !prev)}
            className={`min-h-[34px] px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              showSearch
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
            title="Search text in document"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Find</span>
          </button>

          {/* Viewer Mode Toggle (Canvas vs Native) */}
          <div className="hidden lg:flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-[11px]">
            <button
              type="button"
              onClick={() => setViewerMode('canvas')}
              className={`px-2 py-1 rounded-md font-bold transition ${
                viewerMode === 'canvas'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Continuous Scroll Canvas View"
            >
              Scroll View
            </button>
            <button
              type="button"
              onClick={() => setViewerMode('native')}
              className={`px-2 py-1 rounded-md font-bold transition ${
                viewerMode === 'native'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Native Browser PDF Plugin"
            >
              Native
            </button>
          </div>

          {/* Open Direct Tab */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[34px] px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 transition"
            title="Open original file in new browser tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Tab</span>
          </a>

          {/* Download PDF */}
          <a
            href={pdfUrl}
            download={pdfFileName}
            className="min-h-[34px] px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            title="Download PDF to device"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </a>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="min-h-[34px] p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand to Fullscreen Container'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="min-h-[34px] p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 transition ml-0.5"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search Bar Drawer */}
      {showSearch && (
        <div className="bg-slate-50 px-3 sm:px-4 py-2 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5 text-xs shrink-0 animate-in slide-in-from-top-1">
          <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search course code or topic in handbook..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-hidden focus:border-blue-600"
              />
            </div>
            <button
              type="submit"
              disabled={searching || !searchQuery.trim()}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs disabled:opacity-50 transition"
            >
              {searching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Search'}
            </button>
          </form>

          {searchMatches.length > 0 && (
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-[11px] font-mono">
                Match {currentMatchIndex + 1} of {searchMatches.length} (Page {searchMatches[currentMatchIndex]})
              </span>
              <button
                type="button"
                onClick={prevMatch}
                className="p-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                title="Previous match"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={nextMatch}
                className="p-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                title="Next match"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {searchMatches.length === 0 && !searching && searchQuery && (
            <span className="text-[11px] text-slate-500 italic">No matches found in document</span>
          )}
        </div>
      )}

      {/* Course Modules Quick Strip */}
      {courseModules && courseModules.length > 0 && (
        <div className="bg-slate-50 px-3 sm:px-4 py-2 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs shrink-0 no-scrollbar">
          <span className="text-[11px] font-semibold text-blue-700 flex items-center gap-1 shrink-0">
            <Layers className="w-3.5 h-3.5" />
            <span>Modules:</span>
          </span>
          {courseModules.map((mod, idx) => {
            const modLabel = mod.split(':')[0] || `Module ${idx + 1}`;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSearchQuery(modLabel);
                  setShowSearch(true);
                  handleSearch();
                }}
                className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium whitespace-nowrap transition shrink-0 shadow-2xs"
                title={mod}
              >
                {modLabel}
              </button>
            );
          })}
        </div>
      )}

      {/* Interactive Controls Toolbar (Zoom, Page Jump, Fit Width) */}
      {viewerMode === 'canvas' && (
        <div className="bg-white px-3 sm:px-4 py-1.5 sm:py-2 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs">
          {/* Continuous Page Indicator & Fast Jump Input */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => scrollToPage(currentPage - 1, 'smooth')}
              disabled={currentPage <= 1 || loading}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 text-slate-700 border border-slate-200 transition active:scale-95"
              title="Scroll Up to Previous Page"
            >
              <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5">
              <span className="text-slate-500 text-xs hidden sm:inline">Page</span>
              <input
                type="text"
                value={jumpPageInput}
                onChange={(e) => setJumpPageInput(e.target.value)}
                onBlur={handleJumpSubmit}
                className="w-11 sm:w-12 text-center py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs focus:outline-hidden focus:border-blue-600"
                title="Type page number and press Enter"
              />
              <span className="text-slate-500 text-xs">of {numPages || '...'}</span>
            </form>

            <button
              type="button"
              onClick={() => scrollToPage(currentPage + 1, 'smooth')}
              disabled={currentPage >= numPages || loading}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 text-slate-700 border border-slate-200 transition active:scale-95"
              title="Scroll Down to Next Page"
            >
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Zoom & Fit Width Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 ml-auto sm:ml-0">
            <button
              type="button"
              onClick={zoomOut}
              disabled={scale <= 0.45 || loading}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 border border-slate-200 transition active:scale-95"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={resetZoom}
              className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-medium border border-slate-200 transition"
              title="Reset Zoom to 100%"
            >
              {Math.round(scale * 100)}%
            </button>

            <button
              type="button"
              onClick={zoomIn}
              disabled={scale >= 3.0 || loading}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 border border-slate-200 transition active:scale-95"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => fitWidth()}
              className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold transition active:scale-95"
              title="Auto-Fit Document to Screen Width"
            >
              Fit Width
            </button>
          </div>
        </div>
      )}

      {/* Main Document Body Layout (Sidebar + Continuous Scroll Container) */}
      <div className="flex-1 w-full h-full min-h-0 flex relative overflow-hidden bg-slate-200/70">
        {/* Collapsible Page Navigation Sidebar */}
        {viewerMode === 'canvas' && showThumbnails && numPages > 0 && (
          <aside className="w-44 sm:w-52 h-full bg-slate-50 border-r border-slate-200 flex flex-col shrink-0 z-10 animate-in slide-in-from-left-2 duration-150">
            <div className="p-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Handbook Pages</span>
              <span className="text-[11px] font-normal text-slate-500 font-mono">
                {numPages} total
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5 select-none">
              {pagesList.map((p) => {
                const isActive = currentPage === p;
                const isMatch = searchMatches.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => scrollToPage(p, 'smooth')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition flex items-center justify-between ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : isMatch
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span>Page {p}</span>
                    {isMatch && !isActive && (
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Viewport 1: Continuous Page-Scrollable HTML5 Canvas PDF Container */}
        {viewerMode === 'canvas' && !error && (
          <div
            ref={scrollContainerRef}
            onWheel={handleWheel}
            onScroll={handleScroll}
            tabIndex={0}
            className="flex-1 w-full h-full min-h-0 relative overflow-y-auto overflow-x-auto select-text scroll-smooth focus:outline-hidden p-2 sm:p-5"
          >
            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
                <p className="text-sm font-semibold text-slate-800">Loading Official PDF Handbook...</p>
                <p className="text-xs text-slate-500">Preparing continuous page scroll viewer</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="max-w-md mx-auto my-12 p-6 rounded-lg bg-white border border-slate-200 text-center space-y-3 shadow-md">
                <AlertCircle className="w-8 h-8 text-blue-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">Browser Display Notice</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{error}</p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <a
                    href={pdfUrl}
                    download={pdfFileName}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF File</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setViewerMode('native')}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition border border-slate-200"
                  >
                    Try Native Plugin
                  </button>
                </div>
              </div>
            )}

            {/* Stacked Continuous Pages (1 to numPages) */}
            {!loading && numPages > 0 && (
              <div className="w-full flex flex-col items-center justify-start pb-16">
                {pagesList.map((pageNum) => (
                  <PdfPageCard
                    key={pageNum}
                    pdfDoc={pdfDoc}
                    pageNumber={pageNum}
                    scale={scale}
                    baseWidth={baseDimensions.width}
                    baseHeight={baseDimensions.height}
                    isMatch={searchMatches.includes(pageNum)}
                    totalCount={numPages}
                    containerRef={scrollContainerRef}
                  />
                ))}

                {/* Document End Footer */}
                <div className="mt-8 mb-4 flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="w-8 h-px bg-slate-300"></span>
                  <span>End of Official NIT Goa Curriculum Handbook</span>
                  <span className="w-8 h-px bg-slate-300"></span>
                </div>
              </div>
            )}

            {/* Floating Quick Action Badge on Bottom Right */}
            {numPages > 1 && !loading && (
              <div className="fixed sm:absolute bottom-11 sm:bottom-4 right-4 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs border border-slate-300 shadow-lg px-2.5 py-1.5 rounded-full text-xs font-mono text-slate-700">
                <span className="font-bold text-blue-700">
                  {currentPage}
                  <span className="text-slate-400 font-normal"> / {numPages}</span>
                </span>
                <span className="w-px h-3.5 bg-slate-200 mx-0.5"></span>
                <button
                  type="button"
                  onClick={() => scrollToPage(currentPage - 1, 'smooth')}
                  disabled={currentPage <= 1}
                  className="p-1 rounded-full hover:bg-slate-100 disabled:opacity-30 text-slate-600 transition"
                  title="Previous Page"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToPage(currentPage + 1, 'smooth')}
                  disabled={currentPage >= numPages}
                  className="p-1 rounded-full hover:bg-slate-100 disabled:opacity-30 text-slate-600 transition"
                  title="Next Page"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <span className="w-px h-3.5 bg-slate-200 mx-0.5"></span>
                <button
                  type="button"
                  onClick={() => scrollToPage(1, 'smooth')}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-600 transition"
                  title="Back to Top"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Viewport 2: Native Browser Object / Iframe Embed */}
        {viewerMode === 'native' && (
          <div className="w-full h-full min-h-[480px] flex-1 flex flex-col p-2 bg-slate-100">
            <object
              data={`${pdfUrl}#toolbar=1&navpanes=1`}
              type="application/pdf"
              className="w-full h-full flex-1 rounded-lg border border-slate-200 bg-white shadow-inner min-h-[500px]"
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-white border border-slate-200 rounded-lg">
                <FileText className="w-10 h-10 text-blue-600" />
                <h4 className="text-base font-bold text-slate-900">Embedded PDF Reader</h4>
                <p className="text-xs text-slate-600 max-w-md leading-relaxed">
                  Your browser configuration or sandbox blocks the native PDF plugin. Switch back to Scroll View or download the handbook directly.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setViewerMode('canvas')}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                  >
                    Switch to Scroll View
                  </button>
                  <a
                    href={pdfUrl}
                    download={pdfFileName}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 inline-flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File</span>
                  </a>
                </div>
              </div>
            </object>
          </div>
        )}
      </div>

      {/* Bottom Footer Info Strip */}
      <div className="bg-white px-3 sm:px-4 py-1.5 sm:py-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Official NIT Goa 2025 Handbooks & Syllabus</span>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              <span>Verify on nitgoa.ac.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <span>Permanent Campus, Cuncolim</span>
        </div>
      </div>
    </div>
  );
};
