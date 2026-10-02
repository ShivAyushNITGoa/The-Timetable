import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Globe,
  ExternalLink,
  Copy,
  Check,
  Star,
  Building2,
  BookOpen,
  Cpu,
  FileText,
  Terminal,
  GraduationCap,
  HeartHandshake,
  Phone,
  Info,
  SlidersHorizontal,
  Zap,
  ArrowUpRight,
  Bookmark,
  ShieldAlert,
  Mail,
} from 'lucide-react';
import {
  STUDENT_EXTERNAL_TOOLS,
  TOOL_CATEGORIES_CONFIG,
  ExternalStudentTool,
  ToolCategory,
} from '../data/studentToolsData';
import { BrandIcon } from './BrandLogo';

interface StudentToolsHubProps {
  onOpenPwaGuide?: () => void;
  branch?: string;
  semester?: number;
}

export const StudentToolsHub: React.FC<StudentToolsHubProps> = ({
  onOpenPwaGuide,
  branch = 'EEE',
  semester = 5,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pinned / favorite tools in localStorage
  const [pinnedToolIds, setPinnedToolIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nit_goa_pinned_tools');
      return saved ? JSON.parse(saved) : ['nitgoa-mis', 'nptel-main', 'wolfram-alpha', 'ieee-xplore', 'github-student-pack'];
    } catch {
      return ['nitgoa-mis', 'nptel-main', 'wolfram-alpha', 'ieee-xplore', 'github-student-pack'];
    }
  });

  const togglePinTool = (id: string) => {
    setPinnedToolIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('nit_goa_pinned_tools', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleCopyUrl = (tool: ExternalStudentTool) => {
    navigator.clipboard.writeText(tool.url);
    setCopiedId(tool.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered tools
  const filteredTools = useMemo(() => {
    return STUDENT_EXTERNAL_TOOLS.filter((tool) => {
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }
      if (onlyPopular && !tool.isPopular) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const inName = tool.name.toLowerCase().includes(q);
        const inDesc = tool.description.toLowerCase().includes(q);
        const inTags = tool.tags.some((t) => t.toLowerCase().includes(q));
        const inBadge = tool.badge.toLowerCase().includes(q);
        if (!inName && !inDesc && !inTags && !inBadge) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, onlyPopular, searchQuery]);

  // Pinned tools list (when in 'all' or default view)
  const pinnedTools = useMemo(() => {
    return STUDENT_EXTERNAL_TOOLS.filter((tool) => pinnedToolIds.includes(tool.id));
  }, [pinnedToolIds]);

  const getCategoryIcon = (catId: ToolCategory) => {
    switch (catId) {
      case 'nitgoa':
        return <Building2 className="w-4 h-4 text-blue-400" />;
      case 'national':
        return <BookOpen className="w-4 h-4 text-emerald-400" />;
      case 'simulation':
        return <Cpu className="w-4 h-4 text-blue-400" />;
      case 'research':
        return <FileText className="w-4 h-4 text-blue-400" />;
      case 'coding':
        return <Terminal className="w-4 h-4 text-slate-300" />;
      case 'student_perks':
        return <GraduationCap className="w-4 h-4 text-blue-400" />;
      case 'gate':
        return <GraduationCap className="w-4 h-4 text-indigo-400" />;
      case 'support':
        return <HeartHandshake className="w-4 h-4 text-rose-400" />;
      default:
        return <Globe className="w-4 h-4 text-indigo-400" />;
    }
  };

  const getBadgeStyle = (type: ExternalStudentTool['badgeType']) => {
    switch (type) {
      case 'official':
        return 'bg-blue-600/15 text-blue-300 border-blue-500/30';
      case 'govt':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'free':
        return 'bg-blue-600/15 text-blue-300 border-blue-500/30';
      case 'research':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'code':
        return 'bg-slate-700/40 text-slate-300 border-slate-600/50';
      case 'perk':
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      case 'helpline':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  // Popular quick-search tags
  const quickTags = [
    'Calculus',
    'Circuits',
    'DSA',
    'IEEE',
    'NPTEL',
    'GATE PYQ',
    'Free Cloud',
    'Hostels & Mess',
    'Scholarships',
    'Mental Health',
  ];

  return (
    <div className="space-y-6" id="student-tools-hub">
      {/* Hero Banner: Student Resource & External Help Gateway */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-lg shadow-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <Globe className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/40">
                Curated Student Directory
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {STUDENT_EXTERNAL_TOOLS.length} Verified Portals & Tools
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              External Tools, Sites & Student Help
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Fast, verified access to official NIT Goa academic portals, NPTEL video courses, interactive circuit & math simulators, IEEE research gateways, coding platforms, and 24/7 student wellness helplines.
            </p>
          </div>
        </div>

        {/* Quick Category Stat Chips */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 self-stretch sm:self-auto">
          <div className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-slate-800/80 border border-slate-700/80 text-center">
            <span className="text-[10px] uppercase text-slate-400 block font-medium">NIT Goa Sites</span>
            <strong className="text-xs font-bold text-blue-400">
              {STUDENT_EXTERNAL_TOOLS.filter((t) => t.category === 'nitgoa').length} Portals
            </strong>
          </div>
          <div className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-slate-800/80 border border-slate-700/80 text-center">
            <span className="text-[10px] uppercase text-slate-400 block font-medium">Free Simulators</span>
            <strong className="text-xs font-bold text-blue-400">
              {STUDENT_EXTERNAL_TOOLS.filter((t) => t.category === 'simulation').length} Tools
            </strong>
          </div>
          <div className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-slate-800/80 border border-slate-700/80 text-center">
            <span className="text-[10px] uppercase text-slate-400 block font-medium">Govt. Learning</span>
            <strong className="text-xs font-bold text-emerald-400">
              {STUDENT_EXTERNAL_TOOLS.filter((t) => t.category === 'national').length} Repos
            </strong>
          </div>
        </div>
      </div>

      {/* Emergency Student Helplines Notice Ribbon */}
      <div className="p-3.5 sm:p-4 rounded-lg bg-slate-900 border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-rose-300">24x7 Student Wellness & Support Helplines</span>
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Toll-Free
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Need mental health support, exam stress assistance, or grievance redressal? Certified counselors are available 24/7 free of charge.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto shrink-0">
          <a
            href="tel:14416"
            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-xs"
            title="Call Tele-MANAS Toll-Free (Govt. of India)"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Tele-MANAS: 14416</span>
          </a>
          <a
            href="tel:18005990019"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 font-semibold text-xs flex items-center gap-1.5 transition active:scale-95"
            title="Call KIRAN Mental Health Helpline"
          >
            <span>KIRAN: 1800-599-0019</span>
          </a>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              id="student-tools-search-input"
              type="text"
              placeholder="Search tools, simulators, IEEE, GATE, NPTEL, scholarships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              type="button"
              onClick={() => setOnlyPopular(!onlyPopular)}
              className={`min-h-[38px] px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition active:scale-95 ${
                onlyPopular
                  ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyPopular ? 'fill-white' : 'text-blue-400'}`} />
              <span>Popular & Essential Only</span>
            </button>

            <span className="text-xs text-slate-400 font-mono">
              Showing <strong>{filteredTools.length}</strong> tools
            </span>
          </div>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-400 text-[11px] font-medium shrink-0 flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3 h-3 text-slate-500" />
            Quick tags:
          </span>
          {quickTags.map((tag) => {
            const isActive = searchQuery.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(isActive ? '' : tag)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0 transition active:scale-95 ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-slate-800">
        {TOOL_CATEGORIES_CONFIG.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count =
            cat.id === 'all'
              ? STUDENT_EXTERNAL_TOOLS.length
              : STUDENT_EXTERNAL_TOOLS.filter((t) => t.category === cat.id).length;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition shrink-0 active:scale-95 ${
                isSelected
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.shortLabel}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono font-bold ${
                  isSelected ? 'bg-slate-950/20 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Pinned / Starred Quick Access Tray (if in 'all' view and pins exist) */}
      {selectedCategory === 'all' && !searchQuery && pinnedTools.length > 0 && (
        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Your Pinned Shortcuts ({pinnedTools.length})
              </h3>
            </div>
            <span className="text-[11px] text-slate-500">Click the star on any card to pin/unpin</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {pinnedTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-blue-500/50 transition flex items-center justify-between gap-2 group"
              >
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-slate-400 block truncate font-mono">{tool.badge}</span>
                  <span className="text-xs font-bold text-white group-hover:text-blue-300 truncate block">
                    {tool.name}
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white shrink-0 transition" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Tool Cards Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="tools-cards-grid">
          {filteredTools.map((tool) => {
            const isPinned = pinnedToolIds.includes(tool.id);
            const isCopied = copiedId === tool.id;

            return (
              <div
                key={tool.id}
                className="group p-4 sm:p-5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-all flex flex-col justify-between hover:shadow-md relative"
              >
                <div>
                  {/* Top Bar: Badge, Popular Star & Pin Action */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border flex items-center gap-1.5 ${getBadgeStyle(
                        tool.badgeType
                      )}`}
                    >
                      {getCategoryIcon(tool.category)}
                      <span>{tool.badge}</span>
                    </span>

                    <div className="flex items-center gap-1">
                      {tool.isPopular && (
                        <span
                          className="p-1 text-blue-400"
                          title="Essential / Frequently used student resource"
                        >
                          <Star className="w-3.5 h-3.5 fill-blue-400" />
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => togglePinTool(tool.id)}
                        className={`p-1 rounded-lg transition active:scale-95 ${
                          isPinned
                            ? 'text-blue-400 bg-blue-500/10'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                        }`}
                        title={isPinned ? 'Unpin from quick access' : 'Pin to quick access'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isPinned ? 'fill-blue-400' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Tool Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition line-clamp-2">
                    {tool.name}
                  </h3>

                  {/* Tool Description */}
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>

                  {/* Special Notes / Helplines Info if present */}
                  {tool.notes && (
                    <div className="mt-2.5 p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-blue-300 font-medium">
                      {tool.notes}
                    </div>
                  )}

                  {/* Search / Topic Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {tool.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        onClick={() => setSearchQuery(t)}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-400 hover:text-blue-300 cursor-pointer border border-slate-800 transition"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-blue-400 font-mono truncate max-w-[150px]">
                    {tool.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(tool)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition active:scale-95 border border-slate-700/60"
                      title="Copy URL to clipboard"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </button>

                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[34px] px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-xs"
                      title={`Open ${tool.name} in a new tab`}
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900/60 rounded-lg border border-slate-800">
          <Globe className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No tools match your filter</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or switch category filter to "All Tools & Sites".
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setOnlyPopular(false);
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Official Notice & Disclaimer Card */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            <ShieldAlert className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/40">
                Verified Directory
              </span>
              <span className="text-xs text-slate-400">External Links & Resources</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              Student Help & Academic Resources
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              All external portals and tools are independently operated by their respective authorities (Government of India, NIT Goa administration, IEEE, IITs, or tool creators). For discrepancies, link updates, or to suggest a helpful student tool, reach out to the developer:
            </p>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-col items-stretch gap-2 shrink-0 w-full sm:w-auto">
          <a
            href="mailto:shivshivamxyz@gmail.com?subject=Suggest%20Student%20Tool%20or%20Portal&body=Hi%20Ayush,%0D%0A%0D%0AI%20would%20like%20to%20suggest%20the%20following%20tool/portal%20for%20NIT%20Goa%20students:%0D%0A"
            className="w-full sm:w-auto min-h-[42px] px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-blue-600/20 active:scale-95 text-center"
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span>Suggest a Tool / Report Link</span>
          </a>
        </div>
      </div>
    </div>
  );
};
