import React from 'react';
import {
  BRANCHES_LIST,
  BranchCode,
  StudentProfile,
  DEFAULT_STUDENT_PROFILE,
  FirstYearSection,
} from '../data/branchesData';
import { X, Check, GraduationCap, Building2, BookOpen, Layers, Users } from 'lucide-react';
import { BrandIcon } from './BrandLogo';

interface BranchYearSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: StudentProfile;
  currentProfile?: StudentProfile;
  onSaveProfile: (profile: StudentProfile) => void;
}

export const BranchYearSelector: React.FC<BranchYearSelectorProps> = ({
  isOpen,
  onClose,
  profile,
  currentProfile,
  onSaveProfile,
}) => {
  const activeProfile = profile || currentProfile || DEFAULT_STUDENT_PROFILE;

  const [selectedBranch, setSelectedBranch] = React.useState<BranchCode>(activeProfile?.branch || 'EEE');
  const [selectedYear, setSelectedYear] = React.useState<number>(activeProfile?.year || 3);
  const [selectedSemester, setSelectedSemester] = React.useState<number>(activeProfile?.semester || 5);
  const [selectedSection, setSelectedSection] = React.useState<FirstYearSection>(
    activeProfile?.firstYearSection || 'A'
  );
  const [labBatch, setLabBatch] = React.useState<string>(activeProfile?.labBatch || activeProfile?.batch || 'batch1');
  const [hasMinor, setHasMinor] = React.useState<boolean>(activeProfile?.hasMinor ?? true);

  // Sync state whenever the modal opens or the profile updates
  React.useEffect(() => {
    if (isOpen) {
      const p = profile || currentProfile || DEFAULT_STUDENT_PROFILE;
      setSelectedBranch(p.branch || 'EEE');
      setSelectedYear(p.year || 3);
      setSelectedSemester(p.semester || 5);
      setSelectedSection(p.firstYearSection || 'A');
      setLabBatch(p.labBatch || p.batch || 'batch1');
      setHasMinor(p.hasMinor ?? true);
    }
  }, [isOpen, profile, currentProfile]);

  if (!isOpen) return null;

  // When year changes, update semester sensibly
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    // Odd semester is typically autumn (1, 3, 5, 7)
    const defaultSem = year * 2 - 1;
    setSelectedSemester(defaultSem);
  };

  const handleSave = () => {
    const p = profile || currentProfile || DEFAULT_STUDENT_PROFILE;
    onSaveProfile({
      ...p,
      branch: selectedBranch,
      year: selectedYear,
      semester: selectedSemester,
      firstYearSection: selectedSection,
      labBatch,
      batch: labBatch,
      hasMinor: selectedBranch === 'EEE' && selectedSemester === 5 ? hasMinor : false,
      minorCode: hasMinor ? 'CS300M' : undefined,
    });
    onClose();
  };

  const isFirstYear = selectedYear === 1;
  const isOddSem = selectedSemester % 2 !== 0;

  // Determine cycle for display
  const getSectionCycle = (sec: FirstYearSection) => {
    const isPhysics = (isOddSem && (sec === 'A' || sec === 'B')) || (!isOddSem && (sec === 'C' || sec === 'D'));
    return isPhysics ? 'Physics Cycle' : 'Chemistry Cycle';
  };

  const activeBranchInfo = BRANCHES_LIST.find((b) => b.code === selectedBranch) || BRANCHES_LIST[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700/80 rounded-lg max-w-xl w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <BrandIcon size={44} className="shrink-0 rounded-lg shadow-md shadow-[#9EB81E]/15" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-[#9EB81E] tracking-wider">The GDevelopers Hub</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Select Branch & Academic Year</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Switch curriculum, slot schedules, and room allocations across all NIT Goa programs.
            </p>
          </div>
        </div>

        {/* Step 1: Select Engineering Branch */}
        <div className="space-y-2.5 mb-5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            1. Engineering Branch (Department)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BRANCHES_LIST.map((branch) => {
              const isSelected = selectedBranch === branch.code;
              return (
                <button
                  key={branch.code}
                  type="button"
                  onClick={() => setSelectedBranch(branch.code)}
                  className={`p-3 rounded-lg text-left border transition-all flex items-start justify-between gap-2 ${
                    isSelected
                      ? 'bg-slate-800 border-blue-500 shadow-xs ring-1 ring-blue-500/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-mono font-bold text-sm ${branch.iconColor}`}>
                        {branch.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-200">
                        {branch.name}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {branch.fullName}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Year of Study */}
        <div className="space-y-2.5 mb-5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            2. Year of Study
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((year) => {
              const isSelected = selectedYear === year;
              const yearName = ['1st', '2nd', '3rd', '4th'][year - 1];
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => handleYearChange(year)}
                  className={`min-h-[48px] py-2 px-2 rounded-lg border text-center transition-all flex flex-col items-center justify-center active:scale-95 ${
                    isSelected
                      ? 'bg-indigo-600/30 border-indigo-400 text-indigo-100 font-bold shadow-xs ring-1 ring-indigo-400'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="text-sm font-bold">{yearName}</div>
                  <div className="text-[10px] mt-0.5 opacity-80">Year {year}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Select Active Semester */}
        <div className="space-y-2.5 mb-5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            3. Semester (Odd / Even)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[selectedYear * 2 - 1, selectedYear * 2].map((sem) => {
              const isSelected = selectedSemester === sem;
              const isOdd = sem % 2 !== 0;
              return (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setSelectedSemester(sem)}
                  className={`min-h-[48px] p-2.5 rounded-lg border text-left transition-all flex items-center justify-between active:scale-[0.99] ${
                    isSelected
                      ? 'bg-emerald-600/25 border-emerald-500 text-emerald-100 font-bold shadow-xs ring-1 ring-emerald-400'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold">Semester {sem}</div>
                    <div className="text-[11px] text-slate-400">
                      {isOdd ? 'Odd Semester (July–Dec)' : 'Even Semester (Jan–May)'}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 4 (For 1st Year only): 4 Sections (Sections A, B, C, D) */}
        {isFirstYear && (
          <div className="space-y-2.5 mb-5 p-3.5 rounded-lg bg-slate-900 border border-slate-800">
            <div className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  1st Year Academic Section (NIT Goa Common Cycle)
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  In 1st Year, courses are section-wise rather than branch-wise.
                  <strong className="text-blue-300"> Sections A & B</strong> have the same course, and
                  <strong className="text-blue-300"> Sections C & D</strong> have the same course — they switch cycles between Semester 1 and Semester 2. After 1st year, students follow their respective branch syllabus.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {(['A', 'B', 'C', 'D'] as FirstYearSection[]).map((sec) => {
                const isSelected = selectedSection === sec;
                const cycle = getSectionCycle(sec);
                const room = sec === 'A' ? 'LH 01' : sec === 'B' ? 'LH 02' : sec === 'C' ? 'LH 03' : 'LH 04';
                return (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setSelectedSection(sec)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-400 text-white font-bold ring-1 ring-blue-400 shadow-xs'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">Section {sec}</span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-blue-400 text-slate-950 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Room {room}</div>
                    <div className="text-[10px] font-medium text-blue-300 mt-0.5">
                      {cycle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Optional: Lab Batch & CSE Minor toggle for EEE 5 */}
        <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2.5 mb-5">
          <div className="text-xs font-semibold text-slate-300">Preferences & Section:</div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs flex-wrap">
              <span className="text-slate-400">Lab Batch:</span>
              <button
                type="button"
                onClick={() => setLabBatch('batch1')}
                className={`min-h-[38px] px-3 py-1.5 rounded-md border text-xs font-semibold transition active:scale-95 ${
                  labBatch === 'batch1'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                Batch 1 (Roll 1-30)
              </button>
              <button
                type="button"
                onClick={() => setLabBatch('batch2')}
                className={`min-h-[38px] px-3 py-1.5 rounded-md border text-xs font-semibold transition active:scale-95 ${
                  labBatch === 'batch2'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                Batch 2 (Roll 31+)
              </button>
            </div>

            {selectedBranch === 'EEE' && selectedSemester === 5 && (
              <label className="flex items-center gap-2 cursor-pointer text-xs text-blue-300 font-medium min-h-[38px]">
                <input
                  type="checkbox"
                  checked={hasMinor}
                  onChange={(e) => setHasMinor(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500 w-4 h-4"
                />
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  CS300M (CSE Minor) Active
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Action Buttons - Sticky on mobile */}
        <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-md pt-3 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] border-t border-slate-800 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] px-4 py-2 rounded-lg text-slate-300 hover:text-white text-xs font-medium transition active:scale-95 text-center bg-slate-800/60 sm:bg-transparent"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="min-h-[40px] px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 active:scale-95"
          >
            <Check className="w-4 h-4 stroke-[3] shrink-0" />
            <span className="truncate">
              {isFirstYear
                ? `Apply (1st Year Sec ${selectedSection} • Sem ${selectedSemester})`
                : `Apply (${selectedBranch} Sem ${selectedSemester})`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
