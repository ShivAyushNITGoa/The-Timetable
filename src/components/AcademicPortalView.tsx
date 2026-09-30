import React, { useState, useEffect, useRef } from 'react';
import { 
  COURSES,
  Course,
  CAMPUS_FACILITIES, 
  NIT_GOA_GRADING_RULES, 
  NIT_GOA_PORTALS, 
  NIT_GOA_FACULTY_PROFILES,
  FacultyProfile 
} from '../data/timetableData';
import { 
  Calculator, 
  MapPin, 
  BookOpen, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  Building2, 
  Info, 
  Globe, 
  Zap, 
  FileText,
  User,
  Mail,
  Copy,
  Check,
  Search,
  RotateCcw,
  SlidersHorizontal,
  Award,
  HardDrive,
  Download,
  Upload,
  Trash2,
  Database,
  ShieldCheck,
} from 'lucide-react';
import { BrandLogo, BrandIcon } from './BrandLogo';
import { StudentToolsHub } from './StudentToolsHub';
import { 
  getLocalStorageStats, 
  downloadLocalBackupFile, 
  importLocalData, 
  clearAllPortalLocalData, 
  LocalStorageStats 
} from '../utils/localStorageManager';

interface AcademicPortalViewProps {
  selectedElective: string;
  onOpenCourseModal: (courseCode: string) => void;
  courses?: Record<string, Course>;
  branch?: string;
  semester?: number;
  onOpenPwaGuide?: () => void;
}

export const AcademicPortalView: React.FC<AcademicPortalViewProps> = ({
  selectedElective,
  onOpenCourseModal,
  courses = COURSES,
  branch = 'EEE',
  semester = 5,
  onOpenPwaGuide,
}) => {
  const safeBranch = (branch || 'EEE').toLowerCase();
  const safeSemester = semester ?? 5;
  const CALC_STORAGE_KEY = `nit_goa_calc_${safeBranch}_sem${safeSemester}`;

  // Persisted Active Sub-Tab
  const [activeSubTab, setActiveSubTab] = useState<'calculator' | 'faculty' | 'venues' | 'ordinances' | 'portals'>(() => {
    try {
      const saved = localStorage.getItem('nit_goa_academic_subtab');
      if (saved && ['calculator', 'faculty', 'venues', 'ordinances', 'portals'].includes(saved)) {
        return saved as any;
      }
    } catch {
      // ignore
    }
    return 'faculty';
  });

  const handleSubTabChange = (tab: 'calculator' | 'faculty' | 'venues' | 'ordinances' | 'portals') => {
    setActiveSubTab(tab);
    try {
      localStorage.setItem('nit_goa_academic_subtab', tab);
    } catch {
      // ignore
    }
  };

  const [facultySearch, setFacultySearch] = useState('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Local storage management state
  const [storageStats, setStorageStats] = useState<LocalStorageStats>(() => getLocalStorageStats());
  const [storageMessage, setStorageMessage] = useState<string | null>(null);
  const [confirmClearData, setConfirmClearData] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshStorageStats = () => {
    setStorageStats(getLocalStorageStats());
  };

  // Cumulative CGPA calculator inputs (persisted in localStorage)
  const [prevCredits, setPrevCredits] = useState<string>(() => {
    try {
      return localStorage.getItem(`${CALC_STORAGE_KEY}_prevCredits`) || '';
    } catch {
      return '';
    }
  });

  const [prevCGPA, setPrevCGPA] = useState<string>(() => {
    try {
      return localStorage.getItem(`${CALC_STORAGE_KEY}_prevCGPA`) || '';
    } catch {
      return '';
    }
  });

  // Grade state initialized from localStorage
  const [predictedGrades, setPredictedGrades] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(`${CALC_STORAGE_KEY}_predictedGrades`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  // Re-sync calculator inputs whenever branch or semester changes
  useEffect(() => {
    try {
      const savedCredits = localStorage.getItem(`${CALC_STORAGE_KEY}_prevCredits`) || '';
      const savedCGPA = localStorage.getItem(`${CALC_STORAGE_KEY}_prevCGPA`) || '';
      const savedGrades = localStorage.getItem(`${CALC_STORAGE_KEY}_predictedGrades`);
      setPrevCredits(savedCredits);
      setPrevCGPA(savedCGPA);
      setPredictedGrades(savedGrades ? JSON.parse(savedGrades) : {});
      refreshStorageStats();
    } catch (e) {
      console.error(e);
    }
  }, [CALC_STORAGE_KEY]);

  // Persist calculator values automatically
  useEffect(() => {
    try {
      localStorage.setItem(`${CALC_STORAGE_KEY}_prevCredits`, prevCredits);
      refreshStorageStats();
    } catch (e) {
      console.error(e);
    }
  }, [prevCredits, CALC_STORAGE_KEY]);

  useEffect(() => {
    try {
      localStorage.setItem(`${CALC_STORAGE_KEY}_prevCGPA`, prevCGPA);
      refreshStorageStats();
    } catch (e) {
      console.error(e);
    }
  }, [prevCGPA, CALC_STORAGE_KEY]);

  useEffect(() => {
    try {
      localStorage.setItem(`${CALC_STORAGE_KEY}_predictedGrades`, JSON.stringify(predictedGrades));
      refreshStorageStats();
    } catch (e) {
      console.error(e);
    }
  }, [predictedGrades, CALC_STORAGE_KEY]);

  // Registered courses list for the current branch and semester
  const eligibleCourseCodes = Object.keys(courses).filter((code) => {
    if (selectedElective === 'EE541' && code === 'EE545') return false;
    if (selectedElective === 'EE545' && code === 'EE541') return false;
    return true;
  });

  // Compute total credits & SGPA based on user selections
  const gradedCourseCount = Object.keys(predictedGrades).length;
  let gradedCredits = 0;
  let totalGradePoints = 0;
  let totalRegisteredCredits = 0;

  eligibleCourseCodes.forEach((code) => {
    const course = courses[code] || COURSES[code];
    if (course) {
      totalRegisteredCredits += course.credits;
      if (predictedGrades[code] !== undefined) {
        gradedCredits += course.credits;
        totalGradePoints += course.credits * predictedGrades[code];
      }
    }
  });

  const calculatedSGPA = gradedCredits > 0 ? totalGradePoints / gradedCredits : null;
  // Official NIT Goa percentage formula: (SGPA - 0.5) * 10
  const equivalentPercentage = calculatedSGPA !== null ? Math.max(0, (calculatedSGPA - 0.5) * 10) : null;

  // Cumulative CGPA calculation
  const parsedPrevCredits = parseFloat(prevCredits);
  const parsedPrevCGPA = parseFloat(prevCGPA);
  let updatedCumulativeCGPA: number | null = null;
  if (
    !isNaN(parsedPrevCredits) && 
    parsedPrevCredits > 0 && 
    !isNaN(parsedPrevCGPA) && 
    parsedPrevCGPA >= 0 && 
    calculatedSGPA !== null
  ) {
    const totalSemCredits = parsedPrevCredits + gradedCredits;
    const combinedPoints = (parsedPrevCredits * parsedPrevCGPA) + totalGradePoints;
    updatedCumulativeCGPA = combinedPoints / totalSemCredits;
  }

  const handleGradeChange = (code: string, points: number) => {
    setPredictedGrades((prev) => ({
      ...prev,
      [code]: points,
    }));
  };

  const handleFillAll = (points: number) => {
    const next: Record<string, number> = {};
    eligibleCourseCodes.forEach((code) => {
      next[code] = points;
    });
    setPredictedGrades(next);
  };

  const handleClearAll = () => {
    setPredictedGrades({});
    setPrevCredits('');
    setPrevCGPA('');
    try {
      localStorage.removeItem(`${CALC_STORAGE_KEY}_prevCredits`);
      localStorage.removeItem(`${CALC_STORAGE_KEY}_prevCGPA`);
      localStorage.removeItem(`${CALC_STORAGE_KEY}_predictedGrades`);
      refreshStorageStats();
    } catch {
      // ignore
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };

  const filteredFaculty = NIT_GOA_FACULTY_PROFILES.filter((f) => {
    if (!facultySearch.trim()) return true;
    const q = facultySearch.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      f.shortName.toLowerCase().includes(q) ||
      f.designation.toLowerCase().includes(q) ||
      f.department.toLowerCase().includes(q) ||
      f.email.toLowerCase().includes(q) ||
      f.researchInterests.some((ri) => ri.toLowerCase().includes(q)) ||
      (f.patents && f.patents.some((p) => p.toLowerCase().includes(q))) ||
      (f.prominentPapers && f.prominentPapers.some((paper) => paper.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="space-y-6" id="academic-portal-container">
      {/* Header Overview */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5" id="academic-header">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-700/50 text-slate-300 font-medium border border-slate-600/60">
                Official NIT Goa Resources
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-blue-600/15 text-blue-300 font-medium border border-blue-500/30 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                Cuncolim Campus Directory
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Academic Hub & Faculty Research
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Faculty profiles, research papers, patents, SGPA simulator, and campus facilities.
            </p>
          </div>

          {/* Sub-tab navigation */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto scrollbar-none w-full md:w-auto" id="subtab-navigation">
            <button
              id="subtab-faculty-btn"
              onClick={() => handleSubTabChange('faculty')}
              className={`min-h-[40px] sm:min-h-0 px-3.5 py-2 sm:py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                activeSubTab === 'faculty'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Faculty & Research</span>
            </button>

            <button
              id="subtab-calculator-btn"
              onClick={() => handleSubTabChange('calculator')}
              className={`min-h-[40px] sm:min-h-0 px-3.5 py-2 sm:py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                activeSubTab === 'calculator'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>SGPA Simulator</span>
            </button>

            <button
              id="subtab-venues-btn"
              onClick={() => handleSubTabChange('venues')}
              className={`min-h-[40px] sm:min-h-0 px-3.5 py-2 sm:py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                activeSubTab === 'venues'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Campus Venues</span>
            </button>

            <button
              id="subtab-ordinances-btn"
              onClick={() => handleSubTabChange('ordinances')}
              className={`min-h-[40px] sm:min-h-0 px-3.5 py-2 sm:py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                activeSubTab === 'ordinances'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Ordinances & Rules</span>
            </button>

            <button
              id="subtab-portals-btn"
              onClick={() => handleSubTabChange('portals')}
              className={`min-h-[40px] sm:min-h-0 px-3.5 py-2 sm:py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                activeSubTab === 'portals'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Student Tools & Portals</span>
              <span
                className={`text-[10px] font-bold font-mono px-1.5 py-0.2 rounded-full ${
                  activeSubTab === 'portals'
                    ? 'bg-slate-950/20 text-slate-950'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                35+
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: FACULTY & RESEARCH DIRECTORY */}
      {activeSubTab === 'faculty' && (
        <div className="space-y-6" id="faculty-directory-section">
          {/* Search bar & statistics */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-800/40 p-4 rounded-xl border border-slate-700/60">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                id="faculty-search-input"
                type="text"
                placeholder="Search faculty, email, research, patent..."
                value={facultySearch}
                onChange={(e) => setFacultySearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-amber-500"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 self-end sm:self-auto">
              <span>Showing <strong>{filteredFaculty.length}</strong> Faculty Members</span>
              {facultySearch && (
                <button
                  onClick={() => setFacultySearch('')}
                  className="text-amber-400 hover:underline text-xs"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>

          {/* Faculty Profiles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5" id="faculty-cards-grid">
            {filteredFaculty.map((faculty) => (
              <div
                key={faculty.id}
                id={`faculty-card-${faculty.id}`}
                className="bg-slate-800/50 border border-slate-700/70 hover:border-slate-600 rounded-xl p-5 flex flex-col justify-between transition-all"
              >
                <div>
                  {/* Top line: Designation & Short Name badge */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white tracking-tight">
                          {faculty.name}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono font-bold border border-amber-500/30">
                          {faculty.shortName}
                        </span>
                      </div>
                      <div className="text-xs text-amber-400 font-medium mt-0.5">
                        {faculty.designation}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {faculty.department} • {faculty.cabin}
                      </div>
                    </div>
                  </div>

                  {/* Email & Profile Action Buttons */}
                  <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:${faculty.email}`}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-blue-300 hover:text-blue-200 transition flex items-center gap-1.5 font-mono"
                    >
                      <Mail className="w-3 h-3 text-blue-400" />
                      <span>{faculty.email}</span>
                    </a>

                    <button
                      onClick={() => handleCopyEmail(faculty.email)}
                      className="text-xs px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1"
                      title="Copy email address"
                    >
                      {copiedEmail === faculty.email ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    {faculty.website && (
                      <a
                        href={faculty.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1"
                      >
                        <Globe className="w-3 h-3 text-amber-400" />
                        <span>Official Profile</span>
                        <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                      </a>
                    )}

                    {faculty.scholarUrl && (
                      <a
                        href={faculty.scholarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-2.5 py-1 rounded-lg bg-indigo-950/50 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-800/50 transition flex items-center gap-1"
                      >
                        <Award className="w-3 h-3 text-indigo-400" />
                        <span>Google Scholar</span>
                        <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                      </a>
                    )}
                  </div>

                  {/* Research Interests Tags */}
                  <div className="mt-3.5">
                    <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
                      Research Specializations:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {faculty.researchInterests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800 leading-snug"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Patents Section (if any) */}
                  {faculty.patents && faculty.patents.length > 0 && (
                    <div className="mt-3.5 p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40">
                      <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Granted Patents & Innovations</span>
                      </div>
                      <ul className="text-xs text-emerald-200/90 space-y-1">
                        {faculty.patents.map((patent, pIdx) => (
                          <li key={pIdx} className="leading-snug">
                            • {patent}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Books Section (if any) */}
                  {faculty.books && faculty.books.length > 0 && (
                    <div className="mt-3 p-3 rounded-xl bg-amber-950/20 border border-amber-800/40">
                      <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 mb-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                        <span>Authored Books & Textbooks</span>
                      </div>
                      <ul className="text-xs text-amber-200/90 space-y-1">
                        {faculty.books.map((book, bIdx) => (
                          <li key={bIdx} className="leading-snug">
                            • {book}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Prominent Research Papers */}
                  {faculty.prominentPapers && faculty.prominentPapers.length > 0 && (
                    <div className="mt-3.5 p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
                      <div className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Prominent Research Publications</span>
                      </div>
                      <ul className="text-xs text-slate-300 space-y-1.5">
                        {faculty.prominentPapers.map((paper, paperIdx) => (
                          <li key={paperIdx} className="leading-relaxed">
                            <span className="text-indigo-400 font-mono mr-1">•</span>
                            {paper}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Courses Taught in 5th Sem */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span>5th Sem Course:</span>
                    {faculty.coursesTaught.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => onOpenCourseModal(c.code)}
                        className="font-mono font-bold text-amber-300 hover:underline bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20"
                        title={`${c.name} (${c.role})`}
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    NIT Goa Faculty Directory
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SGPA / CGPA CALCULATOR (Clean - No hardcoded demo values) */}
      {activeSubTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="sgpa-calculator-section">
          {/* Result Card */}
          <div className="lg:col-span-1 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800/80 border border-slate-700/80 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Projected 5th Sem SGPA
                </div>
                {gradedCourseCount > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              {calculatedSGPA !== null ? (
                <div>
                  <div className="text-4xl font-black text-white font-mono">
                    {calculatedSGPA.toFixed(2)}
                    <span className="text-lg font-normal text-slate-400"> / 10.0</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    Calculated for <strong className="text-white">{gradedCredits} Credits</strong> across {gradedCourseCount} of {eligibleCourseCodes.length} registered courses.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-3xl font-bold text-slate-400 font-mono">
                    -- <span className="text-sm font-normal text-slate-400">/ 10.0</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Select your expected grade targets in the table below to simulate your 5th Sem SGPA.
                  </p>
                </div>
              )}

              {/* NIT Goa Percentage Equivalent */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">NIT Goa Equivalent %:</span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    {equivalentPercentage !== null ? `${equivalentPercentage.toFixed(1)}%` : '--'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-amber-300 font-medium">Official Formula:</span> (SGPA - 0.5) × 10
                  <br />
                  <span className="text-slate-400">Per NIT Goa B.Tech Ordinance Section 8.3</span>
                </div>

                {/* Quick Presets */}
                <div className="pt-2">
                  <div className="text-[11px] font-semibold text-slate-400 mb-1.5">Quick Presets:</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFillAll(10)}
                      className="flex-1 py-1 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition"
                    >
                      All S (10.0)
                    </button>
                    <button
                      onClick={() => handleFillAll(9)}
                      className="flex-1 py-1 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 transition"
                    >
                      All A (9.0)
                    </button>
                    <button
                      onClick={handleClearAll}
                      className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-400 transition"
                      title="Clear all selections"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Cumulative CGPA Estimator (Optional) */}
                <div className="mt-4 pt-4 border-t border-slate-800/80">
                  <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                    <span>Cumulative CGPA Predictor</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Sem 1-4 Credits</label>
                      <input
                        type="number"
                        placeholder="e.g. 84"
                        value={prevCredits}
                        onChange={(e) => setPrevCredits(e.target.value)}
                        className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Previous CGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="e.g. 8.50"
                        value={prevCGPA}
                        onChange={(e) => setPrevCGPA(e.target.value)}
                        className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500 font-mono"
                      />
                    </div>
                  </div>

                  {updatedCumulativeCGPA !== null && (
                    <div className="mt-2.5 p-2 bg-blue-950/30 border border-blue-800/50 rounded-lg flex items-center justify-between text-xs">
                      <span className="text-blue-300">New Overall CGPA:</span>
                      <span className="text-base font-bold font-mono text-blue-300">
                        {updatedCumulativeCGPA.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
              * Non-credit Mandatory Course <strong>ES300</strong> requires Satisfactory (SA) evaluation but does not carry grade points.
            </div>
          </div>

          {/* Grade Selectors Table */}
          <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/60 rounded-xl p-5" id="grade-selection-table">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center justify-between">
              <span>5th Sem Course Grade Targets</span>
              <span className="text-xs text-slate-400 font-normal">
                {gradedCourseCount} of {eligibleCourseCodes.length} graded
              </span>
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Click a letter grade (S, A, B, C, D, P) to assign your expected grade point for that course.
            </p>

            <div className="space-y-2.5">
              {eligibleCourseCodes.map((code) => {
                const course = courses[code] || COURSES[code];
                if (!course) return null;
                const currentPoints = predictedGrades[code];
                const isMinor = code === 'CS300M';

                return (
                  <div
                    key={code}
                    id={`grade-row-${code}`}
                    className={`p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isMinor
                        ? 'bg-blue-950/20 border-blue-500/30'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div
                      className="cursor-pointer group flex-1"
                      onClick={() => onOpenCourseModal(code)}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold font-mono ${isMinor ? 'text-blue-300' : 'text-blue-400'}`}>
                          {code}
                        </span>
                        <span className="text-xs text-slate-400">({course.credits} Credits)</span>
                        {isMinor && (
                          <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded font-semibold">
                            CSE Minor
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-medium text-slate-200 group-hover:text-amber-300 transition truncate max-w-sm">
                        {course.name}
                      </div>
                    </div>

                    {/* Grade Selector Buttons */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                      {[
                        { grade: 'S', pts: 10 },
                        { grade: 'A', pts: 9 },
                        { grade: 'B', pts: 8 },
                        { grade: 'C', pts: 7 },
                        { grade: 'D', pts: 6 },
                        { grade: 'P', pts: 5 },
                      ].map((item) => (
                        <button
                          key={item.grade}
                          id={`grade-btn-${code}-${item.grade}`}
                          onClick={() => handleGradeChange(code, item.pts)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                            currentPoints === item.pts
                              ? item.pts === 10
                                ? 'bg-amber-400 text-slate-950 shadow-xs ring-2 ring-amber-300'
                                : 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-400'
                              : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                          }`}
                          title={`${item.grade} Grade (${item.pts} Grade Points)`}
                        >
                          {item.grade}
                        </button>
                      ))}

                      {currentPoints !== undefined && (
                        <button
                          onClick={() => {
                            const next = { ...predictedGrades };
                            delete next[code];
                            setPredictedGrades(next);
                          }}
                          className="w-6 h-7 text-[11px] text-slate-500 hover:text-slate-300 ml-1"
                          title="Clear grade"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CAMPUS VENUES */}
      {activeSubTab === 'venues' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="campus-venues-grid">
          {CAMPUS_FACILITIES.map((facility) => (
            <div
              key={facility.id}
              id={`venue-${facility.id}`}
              className="bg-slate-800/50 border border-slate-700/70 rounded-xl p-5 flex flex-col justify-between hover:border-slate-600 transition"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-700/60 text-slate-300">
                    {facility.type}
                  </span>
                  <span className="text-[11px] text-blue-400 font-medium">
                    {facility.block}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
                  {facility.name}
                </h3>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  {facility.description}
                </p>

                {/* Features Pill */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] font-semibold text-slate-400">Key Features:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {facility.features.map((feat, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Associated Courses */}
              <div className="pt-3 border-t border-slate-800">
                <div className="text-[11px] text-slate-400">Scheduled Courses:</div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {facility.associatedCourses.map((c) => {
                    const hasCourse = Boolean(courses[c] || COURSES[c]);
                    return (
                      <span
                        key={c}
                        onClick={() => hasCourse && onOpenCourseModal(c)}
                        className={`text-[11px] px-2 py-0.5 rounded-md font-mono font-semibold ${
                          hasCourse
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20 cursor-pointer hover:bg-amber-500/20'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {c}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 4: ORDINANCES & RULES */}
      {activeSubTab === 'ordinances' && (
        <div className="space-y-6" id="ordinances-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NIT_GOA_GRADING_RULES.ordinanceHighlights.map((item, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700/70 rounded-xl p-5"
              >
                <h4 className="text-sm font-bold text-blue-400 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400 shrink-0" />
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Official Letter Grade Table */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-3">
              Official NIT Goa 10-Point Letter Grading Scale
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {NIT_GOA_GRADING_RULES.scale.map((item) => (
                <div
                  key={item.grade}
                  className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold font-mono text-sm">
                      {item.grade}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-white">{item.description}</div>
                      <div className="text-[11px] text-slate-400">Grade Points: {item.points}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: STUDENT TOOLS & PORTALS */}
      {activeSubTab === 'portals' && (
        <div className="space-y-6" id="portals-section">
          {/* Comprehensive Student Tools, Sites & External Help Hub */}
          <StudentToolsHub
            onOpenPwaGuide={onOpenPwaGuide}
            branch={safeBranch.toUpperCase()}
            semester={safeSemester}
          />

          {/* Ayush Kumar & The GDevelopers Creator Card */}
          <div className="p-6 bg-slate-900/90 border border-slate-700/80 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <BrandIcon size={52} className="shrink-0 rounded-lg shadow-sm" />
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-600/15 text-blue-300 border border-blue-500/30">
                    Architect & Developer
                  </span>
                  <span className="text-xs text-slate-400 font-mono">v3.4 Production</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                  <span>Ayush Kumar</span>
                  <span className="text-slate-500 font-normal text-sm sm:text-base">•</span>
                  <span className="text-blue-400">The GDevelopers</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 max-w-xl leading-relaxed">
                  Architected and developed by <strong className="text-white font-semibold">Ayush Kumar</strong> with meticulous care for students and faculty across all NIT Goa engineering disciplines. Providing zero-latency offline access, automated attendance tracking, and calendar synchronization.
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/80">
                    <User className="w-3 h-3 text-blue-400" />
                    Ayush Kumar (Lead Architect & Developer)
                  </span>
                  <a
                    href="mailto:shivshivamxyz@gmail.com"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 px-2.5 py-1 rounded-md border border-blue-500/30 transition"
                  >
                    <Mail className="w-3 h-3 text-blue-400" />
                    shivshivamxyz@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenPwaGuide}
                className="px-4 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 hover:border-blue-500/50 text-center transition active:scale-95 group cursor-pointer"
                title="This application is a Progressive Web App (PWA). Click to open local install guide."
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="block text-xs font-semibold text-white">100% Offline</span>
                  <Info className="w-3 h-3 text-blue-400 group-hover:scale-110 transition" />
                </div>
                <span className="text-[10px] text-blue-300 font-medium">PWA Guide</span>
              </button>
              <div className="px-4 py-2 rounded-lg bg-slate-800/90 border border-slate-700/80 text-center">
                <span className="block text-xs font-semibold text-blue-400">All 5 Branches</span>
                <span className="text-[10px] text-slate-400">Sem 1 to 8</span>
              </div>
            </div>
          </div>

          {/* Client-Side Local Storage & Privacy Vault Card */}
          <div className="p-6 bg-slate-900/90 border border-slate-700/80 rounded-xl shadow-lg space-y-4" id="local-storage-vault-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <HardDrive className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">Local Data & Privacy Vault</h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      100% On-Device
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Your timetable customizations, attendance logs, tests, and CGPA calculations are strictly stored in your browser's private local storage.
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-400 font-mono bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 shrink-0 text-center sm:text-right">
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Storage Footprint</span>
                <strong className="text-blue-300">~{(storageStats.totalBytes / 1024).toFixed(1)} KB</strong> on device
              </div>
            </div>

            {/* Storage Item Breakdown Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Student Profile</span>
                <span className="text-xs font-bold text-white">{storageStats.profileFound ? `${branch} • Sem ${semester}` : 'Default'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Schedule Tweaks</span>
                <span className="text-xs font-bold text-blue-300">{storageStats.scheduleOverridesCount} Days Modified</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Attendance Logs</span>
                <span className="text-xs font-bold text-emerald-300">{storageStats.attendanceRecordsCount} Semesters Tracked</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Upcoming Tests</span>
                <span className="text-xs font-bold text-slate-200">{storageStats.testCount} Scheduled</span>
              </div>
            </div>

            {/* Storage status feedback message */}
            {storageMessage && (
              <div className="px-3.5 py-2 rounded-lg bg-slate-800 border border-blue-500/40 text-blue-300 text-xs flex items-center justify-between gap-2">
                <span>{storageMessage}</span>
                <button
                  type="button"
                  onClick={() => setStorageMessage(null)}
                  className="text-slate-400 hover:text-white text-xs font-bold px-1"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Local Data Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    downloadLocalBackupFile();
                    setStorageMessage('Exported complete local backup JSON file successfully!');
                    refreshStorageStats();
                  }}
                  className="min-h-[44px] px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Backup (JSON)</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="min-h-[44px] px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <Upload className="w-3.5 h-3.5 text-blue-400" />
                  <span>Restore from Backup</span>
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const content = event.target?.result as string;
                      if (content) {
                        const res = importLocalData(content);
                        if (res.success) {
                          setStorageMessage(`${res.message} Reloading view...`);
                          refreshStorageStats();
                          setTimeout(() => window.location.reload(), 800);
                        } else {
                          setStorageMessage(res.message);
                        }
                      }
                    };
                    reader.readAsText(file);
                    e.target.value = '';
                  }}
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!confirmClearData) {
                    setConfirmClearData(true);
                    setStorageMessage('Click "Confirm Reset" again within 4 seconds to clear all local data.');
                    setTimeout(() => setConfirmClearData(false), 4000);
                    return;
                  }
                  setConfirmClearData(false);
                  clearAllPortalLocalData();
                  setStorageMessage('All local data cleared successfully. Reloading view...');
                  refreshStorageStats();
                  setTimeout(() => window.location.reload(), 600);
                }}
                className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95 w-full sm:w-auto ${
                  confirmClearData
                    ? 'bg-rose-600 hover:bg-rose-500 text-white border border-rose-400 shadow-md shadow-rose-900/30 animate-pulse'
                    : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{confirmClearData ? 'Click Again to Confirm Reset' : 'Reset All Local Data'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
