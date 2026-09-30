import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Download,
  Printer,
  Search,
  ExternalLink,
  FileText,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Calendar,
  Building2,
  BookOpen,
  Award,
  ChevronRight,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { ResourceDocument } from '../data/resourcesData';
import { EmbeddedPdfViewer } from './EmbeddedPdfViewer';

interface DocumentReaderModalProps {
  document: ResourceDocument | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentReaderModal: React.FC<DocumentReaderModalProps> = ({
  document,
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'pdf' | 'text'>('pdf');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, onClose]);

  // Reset search, zoom, and tab when document changes
  useEffect(() => {
    if (document) {
      setSearchQuery('');
      setZoomLevel(100);
      setActiveSectionIndex(0);
      setActiveTab(document.pdfUrl ? 'pdf' : 'text');
    }
  }, [document?.id]);

  if (!isOpen || !document) return null;

  const handlePrint = () => {
    if (document.pdfUrl && activeTab === 'pdf') {
      window.open(document.pdfUrl, '_blank');
      return;
    }
    window.print();
  };

  const handleCopyText = () => {
    let fullText = `${document.title}\nDoc Ref: ${document.docNumber}\nAuthority: ${document.issuingAuthority}\nAcademic Year: ${document.academicYear}\n\n`;
    document.sections.forEach((sec) => {
      fullText += `=== ${sec.title} ===\n`;
      if (sec.subheading) fullText += `${sec.subheading}\n`;
      if (sec.content) {
        fullText += sec.content.join('\n') + '\n\n';
      }
      if (sec.table) {
        fullText += sec.table.headers.join(' | ') + '\n';
        sec.table.rows.forEach((row) => {
          fullText += row.join(' | ') + '\n';
        });
        fullText += '\n';
      }
    });

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadFile = () => {
    if (document.pdfUrl) {
      const link = window.document.createElement('a');
      link.href = document.pdfUrl;
      link.download = document.pdfFileName || `${document.title}.pdf`;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      return;
    }

    const element = window.document.createElement('a');

    let htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${document.title}</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #0f172a; max-width: 900px; margin: 40px auto; padding: 0 20px; }
    .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px; }
    .title { font-size: 20px; font-weight: bold; margin: 8px 0; }
    .meta { font-size: 13px; color: #475569; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
    th { background: #f1f5f9; font-weight: 600; }
    .section-title { font-size: 16px; font-weight: bold; margin-top: 24px; color: #0f172a; border-left: 4px solid #d97706; padding-left: 8px; }
  </style>
</head>
<body>
  <div class="header">
    <div style="font-size: 14px; font-weight: bold; letter-spacing: 0.05em; color: #64748b;">NATIONAL INSTITUTE OF TECHNOLOGY GOA</div>
    <div style="font-size: 12px; color: #64748b;">Cuncolim, South Goa - 403703, India</div>
    <div class="title">${document.title}</div>
    <div class="meta">Ref: ${document.docNumber} | Year: ${document.academicYear} | Effective: ${document.effectiveDate}</div>
  </div>
`;

    document.sections.forEach((sec) => {
      htmlContent += `<div class="section-title">${sec.title}</div>`;
      if (sec.subheading) {
        htmlContent += `<p style="font-size: 13px; color: #64748b; margin-top: 4px;">${sec.subheading}</p>`;
      }
      if (sec.content) {
        htmlContent += '<ul>';
        sec.content.forEach((line) => {
          htmlContent += `<li style="margin-bottom: 6px;">${line}</li>`;
        });
        htmlContent += '</ul>';
      }
      if (sec.table) {
        htmlContent += '<table><thead><tr>';
        sec.table.headers.forEach((h) => {
          htmlContent += `<th>${h}</th>`;
        });
        htmlContent += '</tr></thead><tbody>';
        sec.table.rows.forEach((row) => {
          htmlContent += '<tr>';
          row.forEach((cell) => {
            htmlContent += `<td>${cell}</td>`;
          });
          htmlContent += '</tr>';
        });
        htmlContent += '</tbody></table>';
      }
    });

    htmlContent += `
  <div style="margin-top: 40px; padding-top: 16px; border-top: 1px solid #cbd5e1; font-size: 11px; color: #94a3b8; text-align: center;">
    Official Academic Document Archival Copy • National Institute of Technology Goa
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    element.href = url;
    element.download = `${document.pdfFileName.replace('.pdf', '')}.html`;
    element.click();
    URL.revokeObjectURL(url);
  };

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'in') setZoomLevel((prev) => Math.min(prev + 15, 160));
    else if (direction === 'out') setZoomLevel((prev) => Math.max(prev - 15, 80));
    else setZoomLevel(100);
  };

  const scrollToSection = (idx: number) => {
    setActiveSectionIndex(idx);
    const targetElement = window.document.getElementById(`doc-sec-${idx}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl flex flex-col overflow-hidden text-slate-100 transition-all duration-200 ${
          isFullscreen
            ? 'w-full h-full rounded-none border-0 fixed inset-0'
            : 'w-full max-w-6xl max-h-[92vh] h-[92vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar / Toolbar */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Left: Document Badge & Title Summary */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 border border-slate-700 text-blue-400">
                  {document.category.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline truncate">
                  {document.docNumber}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-md sm:max-w-xl">
                {document.shortTitle}
              </h2>
            </div>
          </div>

          {/* Center/Right Toolbar Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap ml-auto">
            {/* Search Input */}
            <div className="relative hidden md:block">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find in document..."
                className="bg-slate-800/80 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 w-36 lg:w-48 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-slate-800/80 border border-slate-700 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => handleZoom('out')}
                disabled={zoomLevel <= 80}
                className="p-1.5 text-slate-300 hover:text-white disabled:opacity-40 rounded hover:bg-slate-700/60"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleZoom('reset')}
                className="px-2 py-1 text-[11px] font-mono text-slate-300 hover:text-amber-400"
                title="Reset Zoom"
              >
                {zoomLevel}%
              </button>
              <button
                type="button"
                onClick={() => handleZoom('in')}
                disabled={zoomLevel >= 160}
                className="p-1.5 text-slate-300 hover:text-white disabled:opacity-40 rounded hover:bg-slate-700/60"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopyText}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 border border-slate-700 transition"
              title="Copy all document text"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 border border-slate-700 transition"
              title="Print document or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            {/* Download Button */}
            <button
              type="button"
              onClick={handleDownloadFile}
              className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition shadow active:scale-95"
              title="Save document copy"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700 transition"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition ml-1"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-header / Mode switcher when PDF is available */}
        {document.pdfUrl && (
          <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab('pdf')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  activeTab === 'pdf'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Official PDF View</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  activeTab === 'text'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Course Modules & Outline</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={document.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Tab</span>
              </a>
              <a
                href={document.pdfUrl}
                download={document.pdfFileName}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        )}

        {/* Navigation Quick Jump Pills (when in text mode or non-pdf docs) */}
        {(!document.pdfUrl || activeTab === 'text') && (
          <div className="bg-slate-950/60 px-4 py-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs shrink-0 no-scrollbar">
            <span className="text-[11px] font-semibold text-slate-400 shrink-0 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Sections:</span>
            </span>
            {document.sections.map((sec, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToSection(idx)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition shrink-0 ${
                  activeSectionIndex === idx
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {sec.title.split(':')[0].substring(0, 30)}
              </button>
            ))}

            <a
              href={document.externalOfficialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 shrink-0 whitespace-nowrap px-2.5 py-1 bg-blue-900/20 rounded-md border border-blue-500/30"
            >
              <span>Official Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* PDF Viewer Mode */}
        {document.pdfUrl && activeTab === 'pdf' ? (
          <div className="flex-1 w-full h-full bg-slate-950 flex flex-col min-h-0">
            <EmbeddedPdfViewer
              pdfUrl={document.pdfUrl}
              pdfFileName={document.pdfFileName}
              title={document.title}
              sourceUrl={document.externalOfficialUrl}
              className="rounded-none border-0 h-full"
            />
          </div>
        ) : (
          /* Document Body Viewport (Simulating official academic publication) */
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950 flex justify-center"
          >
          <div
            className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-lg p-6 sm:p-10 shadow-xl transition-all duration-150 relative print:bg-white print:text-black print:border-0 print:p-0"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Official Academic Institute Header */}
            <div className="border-b-2 border-slate-800 pb-6 mb-8 text-center print:border-black">
              {/* Emblem Text / Title */}
              <div className="text-[11px] sm:text-xs tracking-widest text-slate-400 uppercase font-semibold">
                राष्ट्रीय प्रौद्योगिकी संस्थान गोवा
              </div>
              <div className="text-sm sm:text-lg font-black text-blue-400 tracking-wide mt-1 uppercase print:text-black">
                NATIONAL INSTITUTE OF TECHNOLOGY GOA
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                (An Institute of National Importance under Ministry of Education, Govt. of India)
              </div>
              <div className="text-xs text-slate-400">
                Permanent Campus: Cuncolim, South Goa – 403703, Goa, India | Web: www.nitgoa.ac.in
              </div>

              {/* Document Specific Title */}
              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-950/60 text-blue-300 border border-blue-500/40 print:border-black print:text-black">
                  {document.category.toUpperCase()} BULLETIN • {document.academicYear}
                </div>
                <h1 className="text-lg sm:text-2xl font-black text-white mt-2 leading-snug print:text-black">
                  {document.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl mx-auto leading-relaxed">
                  {document.summary}
                </p>
              </div>

              {/* Official Metadata Grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 text-left bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Ref Number</div>
                  <div className="font-mono text-slate-200 mt-0.5 font-bold truncate">
                    {document.docNumber}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Branch & Cohort</div>
                  <div className="text-slate-200 mt-0.5 font-bold">
                    {document.branch === 'ALL'
                      ? 'All Disciplines'
                      : document.branch === 'COMMON'
                      ? '1st Year Foundation'
                      : document.branch}{' '}
                    • Year {document.year}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Issuing Office</div>
                  <div className="text-slate-200 mt-0.5 font-bold truncate">
                    {document.issuingAuthority}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Effective Period</div>
                  <div className="text-emerald-400 mt-0.5 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{document.effectiveDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Sections Content */}
            <div className="space-y-8">
              {document.sections.map((section, sIdx) => {
                const isMatch =
                  searchQuery.trim() === '' ||
                  section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (section.subheading && section.subheading.toLowerCase().includes(searchQuery.toLowerCase())) ||
                  (section.content && section.content.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())));

                if (!isMatch) return null;

                return (
                  <section
                    key={sIdx}
                    id={`doc-sec-${sIdx}`}
                    className="scroll-mt-6 border-b border-slate-800/70 pb-8 last:border-b-0"
                  >
                    {/* Section Header */}
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-500/30">
                        {sIdx + 1}
                      </span>
                      <div className="min-w-0">
                        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {section.title}
                        </h2>
                        {section.subheading && (
                          <div className="text-xs text-slate-400 mt-0.5 font-medium">
                            {section.subheading}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Table Render (if present) */}
                    {section.table && (
                      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                              {section.table.headers.map((h, hIdx) => (
                                <th
                                  key={hIdx}
                                  className="px-3.5 py-2.5 font-bold tracking-wider uppercase text-[11px] whitespace-nowrap"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800 text-slate-300">
                            {section.table.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className="hover:bg-slate-800/40 transition-colors duration-75"
                              >
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`px-3.5 py-2.5 leading-relaxed ${
                                      cIdx === 0 ? 'font-semibold text-white' : ''
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Content Bullets / Paragraphs */}
                    {section.content && section.content.length > 0 && (
                      <div className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1">
                        {section.content.map((line, lIdx) => (
                          <div key={lIdx} className="flex items-start gap-2">
                            <span className="text-amber-400 mt-0.5 shrink-0 text-xs">▪</span>
                            <p className="flex-1">{line}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            {/* Official Certification Footer */}
            <div className="mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-400 space-y-2">
              <div className="flex items-center justify-center gap-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Certified Official Curriculum Archive • National Institute of Technology Goa</span>
              </div>
              <p className="text-[11px] text-slate-400">
                All course syllabi, schemes, and timetable parameters are regulated under the ordinances of the Senate of NIT Goa.
              </p>
            </div>
          </div>
        </div>
        )}

        {/* Reader Bottom Status Strip - Hide when viewing embedded PDF */}
        {activeTab !== 'pdf' && (
          <div className="bg-slate-900 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="truncate">Loaded: {document.pdfFileName}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden sm:inline">Press Esc to exit</span>
              <button
                type="button"
                onClick={onClose}
                className="text-amber-400 hover:text-amber-300 font-bold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
