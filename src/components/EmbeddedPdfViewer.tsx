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
} from 'lucide-react';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  // Use public worker or CDN fallback
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
  const renderTaskRef = useRef<any>(null);

  // PDF Document state
  const [pdfDoc, setPdfDoc] = useState<any | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [scale, setScale] = useState<number>(1.2);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewerMode, setViewerMode] = useState<'canvas' | 'native'>('canvas');

  // Search state
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(courseCode || '');
  const [searchMatches, setSearchMatches] = useState<number[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0);
  const [searching, setSearching] = useState<boolean>(false);

  // Jump page input
  const [jumpPageInput, setJumpPageInput] = useState<string>(String(initialPage));

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
        setCurrentPage(initialPage > 0 && initialPage <= doc.numPages ? initialPage : 1);
        setJumpPageInput(String(initialPage > 0 && initialPage <= doc.numPages ? initialPage : 1));
        setLoading(false);
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
          setLoading(false);
        } catch (bufferErr: any) {
          console.error('All PDF load methods failed:', bufferErr);
          if (isCancelled) return;
          setError('Could not load PDF in Canvas engine. You can toggle Native Browser Mode or download directly.');
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

        // Account for high-density displays (Retina/4K)
        const pixelRatio = window.devicePixelRatio || 1;
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
  }, [pdfDoc, currentPage, scale, viewerMode, renderPage]);

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
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));
  const resetZoom = () => setScale(1.2);
  const fitWidth = () => {
    if (!containerRef.current || !pdfDoc) return;
    const containerWidth = containerRef.current.clientWidth - 48;
    // Standard PDF page width is ~595pt
    const newScale = Math.max(0.6, Math.min(containerWidth / 612, 2.5));
    setScale(newScale);
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

  // Escape key exits fullscreen
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else if (onClose) {
          onClose();
        }
      } else if (e.key === 'ArrowLeft' && !showSearch) {
        goToPrevPage();
      } else if (e.key === 'ArrowRight' && !showSearch) {
        goToNextPage();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFullscreen, currentPage, numPages, showSearch, onClose]);

  return (
    <div
      ref={containerRef}
      className={`${
        isFullscreen
          ? 'fixed inset-0 z-[9999] w-screen h-screen rounded-none'
          : 'relative w-full h-full min-h-[560px] rounded-2xl'
      } bg-slate-950 border border-slate-800 flex flex-col overflow-hidden shadow-2xl transition-all ${className}`}
    >
      {/* Top Header Bar */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Title & Document Badge */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
                {title}
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                Official PDF
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[220px] sm:max-w-sm">
              {pdfFileName} • Permanent Campus Accreditation
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
                ? 'bg-amber-500 text-slate-950 font-bold'
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
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="HTML5 Canvas Engine (guaranteed rendering in all browsers/iframes)"
            >
              Canvas View
            </button>
            <button
              type="button"
              onClick={() => setViewerMode('native')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                viewerMode === 'native'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Native Browser Plugin"
            >
              Native Plugin
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
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs focus:outline-hidden focus:border-amber-500"
              />
            </div>
            <button
              type="submit"
              disabled={searching || !searchQuery.trim()}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs disabled:opacity-50 transition"
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

      {/* Course Modules Quick Strip (if available) */}
      {courseModules && courseModules.length > 0 && (
        <div className="bg-slate-950 px-4 py-2 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs shrink-0 no-scrollbar">
          <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1 shrink-0">
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
                className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-medium whitespace-nowrap transition shrink-0"
                title={mod}
              >
                {modLabel}
              </button>
            );
          })}
        </div>
      )}

      {/* Canvas Controls Toolbar (Only active in Canvas Mode) */}
      {viewerMode === 'canvas' && (
        <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          {/* Page Navigation */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPrevPage}
              disabled={currentPage <= 1 || loading}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5">
              <span className="text-slate-400 text-xs">Page</span>
              <input
                type="text"
                value={jumpPageInput}
                onChange={(e) => setJumpPageInput(e.target.value)}
                onBlur={() => setJumpPageInput(String(currentPage))}
                className="w-12 text-center py-1 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-hidden focus:border-amber-500"
              />
              <span className="text-slate-400 text-xs">of {numPages || '...'}</span>
            </form>

            <button
              type="button"
              onClick={goToNextPage}
              disabled={currentPage >= numPages || loading}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={zoomOut}
              disabled={scale <= 0.6 || loading}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 border border-slate-700 transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={resetZoom}
              className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-medium border border-slate-700 transition"
              title="Reset Zoom to 100%"
            >
              {Math.round(scale * 100)}%
            </button>

            <button
              type="button"
              onClick={zoomIn}
              disabled={scale >= 3.0 || loading}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 border border-slate-700 transition"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={fitWidth}
              className="hidden sm:inline-flex px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
              title="Fit to Container Width"
            >
              Fit Width
            </button>
          </div>
        </div>
      )}

      {/* Main Document Body */}
      <div className="flex-1 w-full h-full min-h-0 relative bg-slate-950 overflow-auto flex flex-col items-center justify-start p-3 sm:p-6">
        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <p className="text-sm font-semibold text-slate-200">Loading Official PDF Handbook...</p>
            <p className="text-xs text-slate-400">Rendering high-resolution curriculum handbook pages</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md my-auto p-6 rounded-2xl bg-slate-900 border border-amber-500/30 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Browser Display Notice</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{error}</p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <a
                href={pdfUrl}
                download={pdfFileName}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF File</span>
              </a>
              <button
                type="button"
                onClick={() => setViewerMode('native')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition border border-slate-700"
              >
                Try Native Plugin
              </button>
            </div>
          </div>
        )}

        {/* View Mode 1: Canvas Rendering Engine (100% reliable inside iframes/browsers) */}
        {viewerMode === 'canvas' && !error && (
          <div className="flex flex-col items-center my-auto shadow-2xl rounded-lg overflow-hidden border border-slate-800/80 bg-white">
            <canvas ref={canvasRef} className="block max-w-full" />
          </div>
        )}

        {/* View Mode 2: Native Browser Object / Iframe Embed */}
        {viewerMode === 'native' && (
          <div className="w-full h-full min-h-[480px] flex-1 flex flex-col">
            <object
              data={`${pdfUrl}#toolbar=1&navpanes=1`}
              type="application/pdf"
              className="w-full h-full flex-1 rounded-xl border border-slate-800 bg-slate-900 shadow-inner"
            >
              {/* Fallback inside object tag if browser lacks native plugin */}
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-900 rounded-xl">
                <FileText className="w-10 h-10 text-amber-400" />
                <h4 className="text-base font-bold text-white">Embedded PDF Reader</h4>
                <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                  Your current browser configuration or sandbox blocks the native PDF plugin. Switch back to Canvas View or download the official handbook.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setViewerMode('canvas')}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
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
              className="text-amber-400 hover:underline inline-flex items-center gap-1"
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
