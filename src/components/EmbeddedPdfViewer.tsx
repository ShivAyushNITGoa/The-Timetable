import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Download,
  ExternalLink,
  Search,
  FileText,
  AlertCircle,
  Loader2,
  BookOpen,
  ArrowRight,
  Layers,
  Move,
  Check,
  X,
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const renderTaskRef = useRef<any>(null);

  // PDF Document state
  const [pdfDoc, setPdfDoc] = useState<any | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewerMode, setViewerMode] = useState<'canvas' | 'native'>('canvas');
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const panStartRef = useRef<{ x: number; y: number; scrollLeft: number; scrollTop: number } | null>(null);

  // Search state
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(courseCode || '');
  const [searchMatches, setSearchMatches] = useState<number[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0);
  const [searching, setSearching] = useState<boolean>(false);

  // Jump page input
  const [jumpPageInput, setJumpPageInput] = useState<string>(String(initialPage));

  // Auto-calculate optimal fit scale based on viewport width
  const fitWidth = useCallback(
    async (docToUse?: any, pageToMeasure?: number) => {
      const activeDoc = docToUse || pdfDoc;
      if (!activeDoc || !containerRef.current) return;
      try {
        const page = await activeDoc.getPage(pageToMeasure || currentPage || 1);
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const containerWidth = containerRef.current.clientWidth;
        
        // Mobile padding is smaller than desktop
        const padding = containerWidth < 640 ? 20 : 48;
        const availableWidth = Math.max(containerWidth - padding, 280);
        const fitRatio = availableWidth / unscaledViewport.width;
        
        // Clamp scale nicely between 0.45 and 2.5
        const targetScale = Math.min(Math.max(Number(fitRatio.toFixed(2)), 0.45), 2.5);
        setScale(targetScale);
      } catch (err) {
        console.warn('Auto fit scale calculation error:', err);
      }
    },
    [pdfDoc, currentPage]
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
        const startPage = initialPage > 0 && initialPage <= doc.numPages ? initialPage : 1;
        setCurrentPage(startPage);
        setJumpPageInput(String(startPage));
        setLoading(false);

        // Auto fit width on load
        fitWidth(doc, startPage);
      } catch (err: any) {
        console.warn('Canvas PDF engine load error, attempting fallback:', err);
        if (isCancelled) return;

        // Try direct ArrayBuffer fetch fallback
        try {
          const response = await fetch(pdfUrl);
          if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch PDF`);
          const buffer = await response.arrayBuffer();
          const doc = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) }).promise;

          if (isCancelled) return;
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setCurrentPage(1);
          setJumpPageInput('1');
          setLoading(false);
          fitWidth(doc, 1);
        } catch (bufferErr: any) {
          console.error('All PDF load methods failed:', bufferErr);
          if (isCancelled) return;
          setError('Could not render document in HTML5 Canvas. You can switch to Native Browser Mode or download directly.');
          setViewerMode('native');
          setLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {}
      }
    };
  }, [pdfUrl, initialPage]);

  // Handle Window Resize to maintain fit-width
  useEffect(() => {
    const handleResize = () => {
      // Debounce slightly
      fitWidth();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fitWidth]);

  // Render Page on Canvas
  const renderPage = useCallback(
    async (pageNum: number) => {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch {}
        }

        const page = await pdfDoc.getPage(pageNum);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        // Account for high-density displays (Retina/4K), capped at 2 for performance
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

        // Reset scroll position to top whenever a new page renders
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('Page render error:', err);
        }
      }
    },
    [pdfDoc, scale]
  );

  useEffect(() => {
    if (viewerMode === 'canvas' && pdfDoc && currentPage >= 1 && currentPage <= numPages) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, scale, viewerMode, renderPage, numPages]);

  // Handle Page navigation
  const goToPrevPage = () => {
    if (currentPage > 1) {
      const nextP = currentPage - 1;
      setCurrentPage(nextP);
      setJumpPageInput(String(nextP));
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      const nextP = currentPage + 1;
      setCurrentPage(nextP);
      setJumpPageInput(String(nextP));
    }
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= numPages) {
      setCurrentPage(pageNum);
    } else {
      setJumpPageInput(String(currentPage));
    }
  };

  // Zoom controls
  const zoomIn = () => setScale((prev) => Math.min(Number((prev + 0.15).toFixed(2)), 3.0));
  const zoomOut = () => setScale((prev) => Math.max(Number((prev - 0.15).toFixed(2)), 0.4));
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

  // Mouse drag-to-pan when canvas is wider/taller than container
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only on primary button click
    if (e.button !== 0 || !scrollContainerRef.current) return;
    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: scrollContainerRef.current.scrollLeft,
      scrollTop: scrollContainerRef.current.scrollTop,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning || !panStartRef.current || !scrollContainerRef.current) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    scrollContainerRef.current.scrollLeft = panStartRef.current.scrollLeft - dx;
    scrollContainerRef.current.scrollTop = panStartRef.current.scrollTop - dy;
  };

  const handleMouseUpOrLeave = () => {
    setIsPanning(false);
    panStartRef.current = null;
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
        const pageText = textContent.items.map((item: any) => item.str).join(' ').toLowerCase();
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
      setCurrentPage(matches[0]);
      setJumpPageInput(String(matches[0]));
    }
  };

  const nextMatch = () => {
    if (searchMatches.length === 0) return;
    const nextIdx = (currentMatchIndex + 1) % searchMatches.length;
    setCurrentMatchIndex(nextIdx);
    setCurrentPage(searchMatches[nextIdx]);
    setJumpPageInput(String(searchMatches[nextIdx]));
  };

  const prevMatch = () => {
    if (searchMatches.length === 0) return;
    const prevIdx = (currentMatchIndex - 1 + searchMatches.length) % searchMatches.length;
    setCurrentMatchIndex(prevIdx);
    setCurrentPage(searchMatches[prevIdx]);
    setJumpPageInput(String(searchMatches[prevIdx]));
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
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevPage();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFullscreen, currentPage, numPages, onClose]);

  return (
    <div
      ref={containerRef}
      className={`${
        isFullscreen
          ? 'fixed inset-0 z-[9999] w-screen h-screen rounded-none'
          : 'relative w-full h-full min-h-[540px] rounded-xl'
      } bg-slate-950 border border-slate-800 flex flex-col overflow-hidden shadow-2xl transition-all ${className}`}
    >
      {/* Top Header Bar */}
      <div className="bg-slate-900 px-4 py-2.5 sm:py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 shrink-0">
        {/* Title & Document Badge */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[180px] sm:max-w-md">
                {title}
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-blue-300 border border-slate-700">
                Official PDF
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-sm">
              {pdfFileName} • Permanent Campus Handbooks
            </p>
          </div>
        </div>

        {/* Global Reader Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
          {/* Search Toggle */}
          <button
            type="button"
            onClick={() => setShowSearch((prev) => !prev)}
            className={`min-h-[36px] px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              showSearch
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
            }`}
            title="Search text in PDF"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Find</span>
          </button>

          {/* Viewer Mode Toggle (Canvas vs Native) */}
          <div className="hidden sm:flex items-center p-0.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px]">
            <button
              type="button"
              onClick={() => setViewerMode('canvas')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                viewerMode === 'canvas'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="HTML5 Canvas Engine (Interactive zoom, pan & jump)"
            >
              Canvas View
            </button>
            <button
              type="button"
              onClick={() => setViewerMode('native')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                viewerMode === 'native'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
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
            className="min-h-[36px] px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
            title="Open original file in new browser tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Tab</span>
          </a>

          {/* Download PDF */}
          <a
            href={pdfUrl}
            download={pdfFileName}
            className="min-h-[36px] px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            title="Download PDF to device"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="min-h-[36px] p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand to Fullscreen Container'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="min-h-[36px] p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 transition ml-0.5"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search Bar Drawer */}
      {showSearch && (
        <div className="bg-slate-900/95 px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0 animate-in slide-in-from-top-1">
          <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search course code or topic in handbook..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={searching || !searchQuery.trim()}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs disabled:opacity-50 transition"
            >
              {searching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Search'}
            </button>
          </form>

          {searchMatches.length > 0 && (
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-[11px] font-mono">
                Match {currentMatchIndex + 1} of {searchMatches.length} (Page {searchMatches[currentMatchIndex]})
              </span>
              <button
                type="button"
                onClick={prevMatch}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                title="Previous match"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={nextMatch}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                title="Next match"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {searchMatches.length === 0 && !searching && searchQuery && (
            <span className="text-[11px] text-slate-400 italic">No matches found in document</span>
          )}
        </div>
      )}

      {/* Course Modules Quick Strip */}
      {courseModules && courseModules.length > 0 && (
        <div className="bg-slate-950 px-4 py-2 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs shrink-0 no-scrollbar">
          <span className="text-[11px] font-semibold text-blue-400 flex items-center gap-1 shrink-0">
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
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-medium whitespace-nowrap transition shrink-0"
                title={mod}
              >
                {modLabel}
              </button>
            );
          })}
        </div>
      )}

      {/* Canvas Controls Toolbar (Active in Canvas Mode) */}
      {viewerMode === 'canvas' && (
        <div className="bg-slate-900/95 px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          {/* Page Navigation */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={goToPrevPage}
              disabled={currentPage <= 1 || loading}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 border border-slate-700 transition active:scale-95"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5">
              <span className="text-slate-400 text-xs hidden sm:inline">Page</span>
              <input
                type="text"
                value={jumpPageInput}
                onChange={(e) => setJumpPageInput(e.target.value)}
                onBlur={handleJumpSubmit}
                className="w-12 text-center py-1 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-hidden focus:border-blue-500"
              />
              <span className="text-slate-400 text-xs">of {numPages || '...'}</span>
            </form>

            <button
              type="button"
              onClick={goToNextPage}
              disabled={currentPage >= numPages || loading}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 border border-slate-700 transition active:scale-95"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom & Fit Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={zoomOut}
              disabled={scale <= 0.45 || loading}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 border border-slate-700 transition active:scale-95"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={resetZoom}
              className="px-2 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-medium border border-slate-700 transition"
              title="Reset Zoom to 100%"
            >
              {Math.round(scale * 100)}%
            </button>

            <button
              type="button"
              onClick={zoomIn}
              disabled={scale >= 3.0 || loading}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 border border-slate-700 transition active:scale-95"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => fitWidth()}
              className="px-2.5 py-1 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-300 border border-blue-500/30 text-xs font-semibold transition active:scale-95"
              title="Auto-Fit Page to Window Width"
            >
              Fit Width
            </button>
          </div>
        </div>
      )}

      {/* Main Document Body - Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        tabIndex={0}
        className={`flex-1 w-full h-full min-h-0 relative bg-slate-950 overflow-y-auto overflow-x-auto select-text scroll-smooth focus:outline-hidden ${
          isPanning ? 'cursor-grabbing' : 'cursor-default'
        }`}
      >
        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <p className="text-sm font-semibold text-slate-200">Loading Official PDF Handbook...</p>
            <p className="text-xs text-slate-400">Rendering high-resolution curriculum handbook pages</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto my-12 p-6 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-blue-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Browser Display Notice</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{error}</p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <a
                href={pdfUrl}
                download={pdfFileName}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF File</span>
              </a>
              <button
                type="button"
                onClick={() => setViewerMode('native')}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition border border-slate-700"
              >
                Try Native Plugin
              </button>
            </div>
          </div>
        )}

        {/* View Mode 1: Canvas Rendering Engine (CRITICAL: No my-auto to prevent flex overflow clipping!) */}
        {viewerMode === 'canvas' && !error && (
          <div className="w-full min-h-full flex flex-col items-center justify-start p-2 sm:p-5">
            {/* Canvas wrapper card */}
            <div className="shadow-2xl rounded-lg overflow-hidden border border-slate-700/80 bg-white mb-6">
              <canvas ref={canvasRef} className="block select-none" />
            </div>

            {/* Quick Page Turning Navigation Bar right below canvas */}
            {numPages > 1 && (
              <div className="w-full max-w-sm flex items-center justify-between gap-3 p-2.5 sm:p-3 bg-slate-900/95 border border-slate-800 rounded-xl text-xs text-slate-300 backdrop-blur-md shadow-xl mb-6 shrink-0">
                <button
                  type="button"
                  onClick={goToPrevPage}
                  disabled={currentPage <= 1 || loading}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 font-semibold flex items-center gap-1.5 transition active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1 font-mono text-xs">
                  <span className="text-slate-400">Page</span>
                  <span className="text-white font-bold px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                    {currentPage}
                  </span>
                  <span className="text-slate-400">of {numPages}</span>
                </div>

                <button
                  type="button"
                  onClick={goToNextPage}
                  disabled={currentPage >= numPages || loading}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold flex items-center gap-1.5 transition shadow-sm active:scale-95"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* View Mode 2: Native Browser Object / Iframe Embed */}
        {viewerMode === 'native' && (
          <div className="w-full h-full min-h-[480px] flex-1 flex flex-col p-2">
            <object
              data={`${pdfUrl}#toolbar=1&navpanes=1`}
              type="application/pdf"
              className="w-full h-full flex-1 rounded-xl border border-slate-800 bg-slate-900 shadow-inner min-h-[500px]"
            >
              {/* Fallback inside object tag if browser lacks native plugin */}
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-900 rounded-xl">
                <FileText className="w-10 h-10 text-blue-400" />
                <h4 className="text-base font-bold text-white">Embedded PDF Reader</h4>
                <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                  Your current browser configuration or sandbox blocks the native PDF plugin. Switch back to Canvas View or download the official handbook.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setViewerMode('canvas')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                  >
                    Switch to Canvas View
                  </button>
                  <a
                    href={pdfUrl}
                    download={pdfFileName}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 inline-flex items-center gap-1.5"
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
      <div className="bg-slate-900/90 px-4 py-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Official NIT Goa 2025 Handbooks & Syllabus</span>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline inline-flex items-center gap-1"
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
