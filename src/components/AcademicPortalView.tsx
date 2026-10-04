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
  GraduationCap,
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
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-2xs" id="academic-header">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold border border-slate-300">
                Official NIT Goa Resources
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold border border-slate-300 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-600" />
                Cuncolim Campus Directory
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Academic Hub & Faculty Research
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Faculty profiles, research papers, patents, SGPA simulator, and campus facilities.
            </p>
          </div>

          {/* Sub-tab navigation */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 overflow-x-auto scrollbar-none w-full md:w-auto" id="subtab-navigation">
            <button
              id="subtab-faculty-btn"
              onClick={() => handleSubTabChange('faculty')}
              className={`min-h-[40px] sm:min-h-0 px-3.5 py-2 sm:py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                activeSubTab === 'faculty'
                  ? 'bg-slate-900 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
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
                  ? 'bg-slate-900 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
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
                  ? 'bg-slate-900 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
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
                  ? 'bg-slate-900 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
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
                  ? 'bg-slate-900 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Student Tools & Portals</span>
              <span
                className={`text-[10px] font-bold font-mono px-1.5 py-0.2 rounded ${
                  activeSubTab === 'portals'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-200 text-slate-800'
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
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                id="faculty-search-input"
                type="text"
                placeholder="Search faculty, email, research, patent..."
                value={facultySearch}
                onChange={(e) => setFacultySearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-slate-800"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 self-end sm:self-auto">
              <span>Showing <strong>{filteredFaculty.length}</strong> Faculty Members</span>
              {facultySearch && (
                <button
                  onClick={() => setFacultySearch('')}
                  className="text-slate-800 hover:underline text-xs font-semibold"
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
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-5 flex flex-col justify-between shadow-2xs transition-all"
              >
                <div>
                  {/* Top line: Designation & Short Name badge */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-slate-900 tracking-tight">
                          {faculty.name}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono font-bold border border-slate-300">
                          {faculty.shortName}
                        </span>
                      </div>
                      <div className="text-xs text-blue-900 font-semibold mt-0.5">
                        {faculty.designation}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {faculty.department} • {faculty.cabin}
                      </div>
                    </div>
                  </div>

                  {/* Email & Profile Action Buttons */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:${faculty.email}`}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition flex items-center gap-1.5 font-mono"
                    >
                      <Mail className="w-3 h-3 text-slate-500" />
                      <span>{faculty.email}</span>
                    </a>

                    <button
                      onClick={() => handleCopyEmail(faculty.email)}
                      className="text-xs px-2 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition flex items-center gap-1"
                      title="Copy email address"
                    >
                      {copiedEmail === faculty.email ? (
                        <>
                          <Check className="w-3 h-3 text-slate-900" />
                          <span className="text-slate-900 font-bold">Copied</span>
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
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition flex items-center gap-1"
                      >
                        <Globe className="w-3 h-3 text-slate-500" />
                        <span>Official Profile</span>
                        <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                      </a>
                    )}

                    {faculty.scholarUrl && (
                      <a
                        href={faculty.scholarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition flex items-center gap-1"
                      >
                        <Award className="w-3 h-3 text-slate-500" />
                        <span>Google Scholar</span>
                        <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                      </a>
                    )}
                  </div>

                  {/* Research Interests Tags */}
                  <div className="mt-3.5">
                    <div className="text-[11px] font-semibold text-slate-700 mb-1.5">
                      Research Specializations:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {faculty.researchInterests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200 leading-snug"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Patents Section (if any) */}
                  {faculty.patents && faculty.patents.length > 0 && (
                    <div className="mt-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-xs font-semibold text-slate-900 flex items-center gap-1.5 mb-1.5">
                        <Award className="w-3.5 h-3.5 text-slate-600" />
                        <span>Granted Patents & Innovations</span>
                      </div>
                      <ul className="text-xs text-slate-700 space-y-1">
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
                    <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-xs font-semibold text-slate-900 flex items-center gap-1.5 mb-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                        <span>Authored Books & Textbooks</span>
                      </div>
                      <ul className="text-xs text-slate-700 space-y-1">
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
                    <div className="mt-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-600" />
                        <span>Prominent Research Publications</span>
                      </div>
                      <ul className="text-xs text-slate-700 space-y-1.5">
                        {faculty.prominentPapers.map((paper, paperIdx) => (
                          <li key={paperIdx} className="leading-relaxed">
                            <span className="text-slate-500 font-mono mr-1">•</span>
                            {paper}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Courses Taught in 5th Sem */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span>5th Sem Course:</span>
                    {faculty.coursesTaught.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => onOpenCourseModal(c.code)}
                        className="font-mono font-bold text-slate-900 hover:underline bg-slate-100 px-2 py-0.5 rounded border border-slate-300"
                        title={`${c.name} (${c.role})`}
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">
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
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-lg p-5 sm:p-6 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Projected 5th Sem SGPA
                </div>
                {gradedCourseCount > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 transition"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              {calculatedSGPA !== null ? (
                <div>
                  <div className="text-4xl font-black text-slate-900 font-mono">
                    {calculatedSGPA.toFixed(2)}
                    <span className="text-lg font-normal text-slate-500"> / 10.0</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">
                    Calculated for <strong className="text-slate-900">{gradedCredits} Credits</strong> across {gradedCourseCount} of {eligibleCourseCodes.length} registered courses.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-3xl font-bold text-slate-400 font-mono">
                    -- <span className="text-sm font-normal text-slate-400">/ 10.0</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Select your expected grade targets in the table below to simulate your 5th Sem SGPA.
                  </p>
                </div>
              )}

              {/* NIT Goa Percentage Equivalent */}
              <div className="mt-5 pt-4 border-t border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600">NIT Goa Equivalent %:</span>
                  <span className="text-base font-bold font-mono text-slate-900">
                    {equivalentPercentage !== null ? `${equivalentPercentage.toFixed(1)}%` : '--'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-900 font-semibold">Official Formula:</span> (SGPA - 0.5) × 10
                  <br />
                  <span className="text-slate-500">Per NIT Goa B.Tech Ordinance Section 8.3</span>
                </div>

                {/* Quick Presets */}
                <div className="pt-2">
                  <div className="text-[11px] font-semibold text-slate-600 mb-1.5">Quick Presets:</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFillAll(10)}
                      className="flex-1 py-1.5 text-xs font-semibold rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition"
                    >
                      All S (10.0)
                    </button>
                    <button
                      onClick={() => handleFillAll(9)}
                      className="flex-1 py-1.5 text-xs font-semibold rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition"
                    >
                      All A (9.0)
                    </button>
                    <button
                      onClick={handleClearAll}
                      className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 transition"
                      title="Clear all selections"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Cumulative CGPA Estimator (Optional) */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="text-xs font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
                    <span>Cumulative CGPA Predictor</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Sem 1-4 Credits</label>
                      <input
                        type="number"
                        placeholder="e.g. 84"
                        value={prevCredits}
                        onChange={(e) => setPrevCredits(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-slate-800 font-mono shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Previous CGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="e.g. 8.50"
                        value={prevCGPA}
                        onChange={(e) => setPrevCGPA(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-slate-800 font-mono shadow-2xs"
                      />
                    </div>
                  </div>

                  {updatedCumulativeCGPA !== null && (
                    <div className="mt-2.5 p-2.5 bg-slate-50 border border-slate-300 rounded-lg flex items-center justify-between text-xs">
                      <span className="text-slate-700 font-medium">New Overall CGPA:</span>
                      <span className="text-base font-bold font-mono text-slate-900">
                        {updatedCumulativeCGPA.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500">
              * Non-credit Mandatory Course <strong>ES300</strong> requires Satisfactory (SA) evaluation but does not carry grade points.
            </div>
          </div>

          {/* Grade Selectors Table */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-5 shadow-2xs" id="grade-selection-table">
            <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center justify-between">
              <span>5th Sem Course Grade Targets</span>
              <span className="text-xs text-slate-500 font-normal">
                {gradedCourseCount} of {eligibleCourseCodes.length} graded
              </span>
            </h3>
            <p className="text-xs text-slate-500 mb-3">
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
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    <div
                      className="cursor-pointer group flex-1"
                      onClick={() => onOpenCourseModal(code)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-slate-900">
                          {code}
                        </span>
                        <span className="text-xs text-slate-500">({course.credits} Credits)</span>
                        {isMinor && (
                          <span className="text-[10px] px-1.5 py-0.2 bg-slate-200 text-slate-800 rounded font-semibold border border-slate-300">
                            CSE Minor
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-medium text-slate-700 group-hover:text-blue-900 transition truncate max-w-sm mt-0.5">
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
                          className={`w-7 h-7 rounded-md text-xs font-bold transition flex items-center justify-center ${
                            currentPoints === item.pts
                              ? 'bg-slate-900 text-white shadow-2xs ring-2 ring-slate-800'
                              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 hover:text-slate-900'
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
                          className="w-6 h-7 text-[11px] text-slate-400 hover:text-slate-700 ml-1"
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
              className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between hover:border-slate-300 transition shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                    {facility.type}
                  </span>
                  <span className="text-[11px] text-slate-600 font-medium">
                    {facility.block}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                  {facility.name}
                </h3>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {facility.description}
                </p>

                {/* Features Pill */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] font-semibold text-slate-700">Key Features:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {facility.features.map((feat, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Associated Courses */}
              <div className="pt-3 border-t border-slate-100">
                <div className="text-[11px] text-slate-500">Scheduled Courses:</div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {facility.associatedCourses.map((c) => {
                    const hasCourse = Boolean(courses[c] || COURSES[c]);
                    return (
                      <span
                        key={c}
                        onClick={() => hasCourse && onOpenCourseModal(c)}
                        className={`text-[11px] px-2 py-0.5 rounded-md font-mono font-semibold ${
                          hasCourse
                            ? 'bg-slate-100 text-slate-900 border border-slate-300 cursor-pointer hover:bg-slate-200'
                            : 'bg-slate-50 text-slate-600 border border-slate-200'
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
                className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs"
              >
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-500 shrink-0" />
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Official Letter Grade Table */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
            <h4 className="text-sm font-bold text-slate-900 mb-3">
              Official NIT Goa 10-Point Letter Grading Scale
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {NIT_GOA_GRADING_RULES.scale.map((item) => (
                <div
                  key={item.grade}
                  className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-900 border border-slate-300 flex items-center justify-center font-bold font-mono text-sm">
                      {item.grade}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{item.description}</div>
                      <div className="text-[11px] text-slate-500">Grade Points: {item.points}</div>
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
          <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <BrandIcon size={52} className="shrink-0 rounded-lg shadow-xs" />
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-300">
                    Architect & Developer
                  </span>
                  <span className="text-xs text-slate-500 font-mono">v3.4 Production</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                  <span>Ayush Kumar</span>
                  <span className="text-slate-400 font-normal text-sm sm:text-base">•</span>
                  <span className="text-[#b0b91a]">The GDevelopers</span>
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 max-w-xl leading-relaxed">
                  Architected and developed by <strong className="text-slate-900 font-semibold">Ayush Kumar</strong> with meticulous care for students and faculty across all NIT Goa engineering disciplines. Providing zero-latency offline access, automated attendance tracking, and calendar synchronization.
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                    <User className="w-3 h-3 text-slate-500" />
                    Ayush Kumar (Lead Architect & Developer)
                  </span>
                  <a
                    href="mailto:shivshivamxyz@gmail.com"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 transition"
                  >
                    <Mail className="w-3 h-3 text-slate-500" />
                    shivshivamxyz@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenPwaGuide}
                className="px-4 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-center transition active:scale-95 group cursor-pointer shadow-2xs"
                title="This application is a Progressive Web App (PWA). Click to open local install guide."
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="block text-xs font-semibold text-slate-900">100% Offline</span>
                  <Info className="w-3 h-3 text-slate-500 group-hover:scale-110 transition" />
                </div>
                <span className="text-[10px] text-slate-500 font-medium">PWA Guide</span>
              </button>
              <div className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="block text-xs font-semibold text-slate-900">All 5 Branches</span>
                <span className="text-[10px] text-slate-500">Sem 1 to 8</span>
              </div>
            </div>
          </div>

          {/* Client-Side Local Storage & Privacy Vault Card */}
          <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-2xs space-y-4" id="local-storage-vault-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  <HardDrive className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">Local Data & Privacy Vault</h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-300 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-slate-600" />
                      100% On-Device
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your timetable customizations, attendance logs, tests, and CGPA calculations are strictly stored in your browser's private local storage.
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-600 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0 text-center sm:text-right">
                <span className="text-slate-400 block text-[10px] uppercase font-sans">Storage Footprint</span>
                <strong className="text-slate-900">~{(storageStats.totalBytes / 1024).toFixed(1)} KB</strong> on device
              </div>
            </div>

            {/* Storage Item Breakdown Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Student Profile</span>
                <span className="text-xs font-bold text-slate-900">{storageStats.profileFound ? `${branch} • Sem ${semester}` : 'Default'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Schedule Tweaks</span>
                <span className="text-xs font-bold text-slate-900">{storageStats.scheduleOverridesCount} Days Modified</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Attendance Logs</span>
                <span className="text-xs font-bold text-slate-900">{storageStats.attendanceRecordsCount} Semesters Tracked</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 block uppercase">Upcoming Tests</span>
                <span className="text-xs font-bold text-slate-900">{storageStats.testCount} Scheduled</span>
              </div>
            </div>

            {/* Storage status feedback message */}
            {storageMessage && (
              <div className="px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 text-xs flex items-center justify-between gap-2">
                <span>{storageMessage}</span>
                <button
                  type="button"
                  onClick={() => setStorageMessage(null)}
                  className="text-slate-500 hover:text-slate-900 text-xs font-bold px-1"
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
                  className="min-h-[44px] px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Backup (JSON)</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="min-h-[44px] px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
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
                className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95 w-full sm:w-auto ${
                  confirmClearData
                    ? 'bg-rose-700 hover:bg-rose-800 text-white border border-rose-800 shadow-md animate-pulse'
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
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
