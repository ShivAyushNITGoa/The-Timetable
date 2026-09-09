import React, { useState } from 'react';
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
  Sparkles, 
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
  Award
} from 'lucide-react';
import { BrandLogo, BrandIcon } from './BrandLogo';

interface AcademicPortalViewProps {
  selectedElective: string;
  onOpenCourseModal: (courseCode: string) => void;
  courses?: Record<string, Course>;
  branch?: string;
  semester?: number;
}

export const AcademicPortalView: React.FC<AcademicPortalViewProps> = ({
  selectedElective,
  onOpenCourseModal,
  courses = COURSES,
  branch = 'EEE',
  semester = 5,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'calculator' | 'faculty' | 'venues' | 'ordinances' | 'portals'>('faculty');
  const [facultySearch, setFacultySearch] = useState('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Cumulative CGPA calculator inputs (clean, no demo values)
  const [prevCredits, setPrevCredits] = useState<string>('');
  const [prevCGPA, setPrevCGPA] = useState<string>('');

  // Registered courses list for the current branch and semester
  const eligibleCourseCodes = Object.keys(courses).filter((code) => {
    if (selectedElective === 'EE541' && code === 'EE545') return false;
    if (selectedElective === 'EE545' && code === 'EE541') return false;
    return true;
  });

  // Grade state initialized empty - NO hardcoded demo CGPA values
  const [predictedGrades, setPredictedGrades] = useState<Record<string, number>>({});

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
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5" id="academic-header">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                Official NIT Goa Resources
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
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
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto scrollbar-none" id="subtab-navigation">
            <button
              id="subtab-faculty-btn"
              onClick={() => setActiveSubTab('faculty')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
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
              onClick={() => setActiveSubTab('calculator')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
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
              onClick={() => setActiveSubTab('venues')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
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
              onClick={() => setActiveSubTab('ordinances')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
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
              onClick={() => setActiveSubTab('portals')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
                activeSubTab === 'portals'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Institute Links</span>
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
                className="bg-slate-800/50 border border-slate-700/70 hover:border-slate-600 rounded-2xl p-5 flex flex-col justify-between transition-all"
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
                      className="text-xs px-2.5 py-1 rounded-lg bg-cyan-950/50 border border-cyan-800/60 text-cyan-300 hover:bg-cyan-900/60 transition flex items-center gap-1.5 font-mono"
                    >
                      <Mail className="w-3 h-3 text-cyan-400" />
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
                    <div className="mt-3.5 p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40">
                      <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
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
          <div className="lg:col-span-1 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
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
                    <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
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
                        className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-white placeholder-slate-400 focus:outline-hidden focus:border-cyan-500 font-mono"
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
                        className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-white placeholder-slate-400 focus:outline-hidden focus:border-cyan-500 font-mono"
                      />
                    </div>
                  </div>

                  {updatedCumulativeCGPA !== null && (
                    <div className="mt-2.5 p-2 bg-cyan-950/30 border border-cyan-800/50 rounded-lg flex items-center justify-between text-xs">
                      <span className="text-cyan-300">New Overall CGPA:</span>
                      <span className="text-base font-bold font-mono text-cyan-300">
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
          <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5" id="grade-selection-table">
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
                    className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isMinor
                        ? 'bg-cyan-950/30 border-cyan-500/40'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div
                      className="cursor-pointer group flex-1"
                      onClick={() => onOpenCourseModal(code)}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold font-mono ${isMinor ? 'text-cyan-300' : 'text-amber-400'}`}>
                          {code}
                        </span>
                        <span className="text-xs text-slate-400">({course.credits} Credits)</span>
                        {isMinor && (
                          <span className="text-[10px] px-1.5 py-0.2 bg-cyan-500/20 text-cyan-300 rounded font-semibold">
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
              className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-600 transition"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-700/60 text-slate-300">
                    {facility.type}
                  </span>
                  <span className="text-[11px] text-amber-400 font-medium">
                    {facility.block}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
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
                className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-5"
              >
                <h4 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-400 shrink-0" />
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Official Letter Grade Table */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5">
            <h4 className="text-sm font-bold text-white mb-3">
              Official NIT Goa 10-Point Letter Grading Scale
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {NIT_GOA_GRADING_RULES.scale.map((item) => (
                <div
                  key={item.grade}
                  className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between"
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

      {/* SUB-TAB 5: INSTITUTE PORTALS */}
      {activeSubTab === 'portals' && (
        <div className="space-y-4" id="portals-section">
          {/* The GDevelopers Official Creator Card */}
          <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-[#9EB81E]/40 rounded-2xl shadow-xl shadow-[#9EB81E]/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <BrandIcon size={56} className="shrink-0 rounded-2xl shadow-lg shadow-[#9EB81E]/20" />
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#9EB81E]/20 text-[#9EB81E] border border-[#9EB81E]/40">
                    Official Developer
                  </span>
                  <span className="text-xs text-slate-400 font-mono">v3.4 Production</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center justify-center sm:justify-start gap-1.5">
                  <span className="text-[#9EB81E]">The</span>
                  <span className="text-slate-100">GDevelopers</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 max-w-xl leading-relaxed">
                  Engineered with meticulous care for students and faculty across all NIT Goa engineering disciplines. Providing zero-latency offline access, automated attendance tracking, and calendar synchronization.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-2 rounded-xl bg-slate-800/90 border border-slate-700/80 text-center">
                <span className="block text-xs font-bold text-[#9EB81E]">100% Offline</span>
                <span className="text-[10px] text-slate-400">PWA Ready</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-800/90 border border-slate-700/80 text-center">
                <span className="block text-xs font-bold text-cyan-400">All 5 Branches</span>
                <span className="text-[10px] text-slate-400">Sem 1 to 8</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NIT_GOA_PORTALS.map((portal) => (
            <a
              key={portal.name}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 bg-slate-800/50 border border-slate-700/70 hover:border-amber-500/50 rounded-2xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> Verified Resource
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                  {portal.name}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {portal.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-cyan-400 flex items-center gap-1 font-mono">
                {portal.url}
              </div>
            </a>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};
