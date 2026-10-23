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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl max-w-xl w-full shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pinned Modal Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3.5 pr-6">
            <BrandIcon size={42} className="shrink-0 rounded-lg shadow-xs ring-1 ring-slate-200 dark:ring-slate-700/60" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400 tracking-wider">The GDevelopers Hub</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">Select Branch & Academic Year</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Switch curriculum, slot schedules, and room allocations across NIT Goa.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body along Y-axis */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 scrollbar-thin">
          {/* Step 1: Select Engineering Branch */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
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
                    className={`p-3 rounded-lg text-left border transition-all flex items-start justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold text-sm ${isSelected ? 'text-white' : branch.iconColor}`}>
                          {branch.code}
                        </span>
                        <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                          {branch.name}
                        </span>
                      </div>
                      <div className={`text-[11px] mt-0.5 line-clamp-1 ${isSelected ? 'text-slate-200 dark:text-blue-100 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                        {branch.fullName}
                      </div>
                    </div>
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-white text-slate-900 dark:text-blue-900 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Year of Study */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
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
                    className={`min-h-[48px] py-2 px-2 rounded-lg border text-center transition-all flex flex-col items-center justify-center active:scale-95 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-600 text-white font-bold shadow-xs'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="text-sm font-bold">{yearName}</div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-200 dark:text-blue-100 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>Year {year}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Select Active Semester */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
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
                    className={`min-h-[48px] p-2.5 rounded-lg border text-left transition-all flex items-center justify-between active:scale-[0.99] cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-600 text-white font-bold shadow-xs'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold">Semester {sem}</div>
                      <div className={`text-[11px] ${isSelected ? 'text-slate-200 dark:text-blue-100 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                        {isOdd ? 'Odd Semester (July–Dec)' : 'Even Semester (Jan–May)'}
                      </div>
                    </div>
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-white text-slate-900 dark:text-blue-900 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4 (For 1st Year only): 4 Sections */}
          {isFirstYear && (
            <div className="space-y-2.5 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    1st Year Academic Section (NIT Goa Common Cycle)
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    In 1st Year, courses are section-wise rather than branch-wise.
                    <strong className="text-slate-900 dark:text-slate-100"> Sections A & B</strong> have the same course, and
                    <strong className="text-slate-900 dark:text-slate-100"> Sections C & D</strong> have the same course — they switch cycles between Semester 1 and Semester 2.
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
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-600 text-white font-bold shadow-xs'
                          : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">Section {sec}</span>
                        {isSelected ? (
                          <div className="w-4 h-4 rounded-full bg-white text-slate-900 dark:text-blue-900 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center" />
                        )}
                      </div>
                      <div className={`text-[10px] mt-1 ${isSelected ? 'text-slate-200 dark:text-blue-100 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>Room {room}</div>
                      <div className={`text-[10px] font-medium mt-0.5 ${isSelected ? 'text-slate-200 dark:text-blue-100' : 'text-slate-600 dark:text-slate-400'}`}>
                        {cycle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Optional: Lab Batch & CSE Minor toggle for EEE 5 */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-lg space-y-2.5">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Preferences & Section:</div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs flex-wrap">
                <span className="text-slate-600 dark:text-slate-400">Lab Batch:</span>
                <button
                  type="button"
                  onClick={() => setLabBatch('batch1')}
                  className={`min-h-[38px] px-3 py-1.5 rounded-md border text-xs font-semibold transition active:scale-95 cursor-pointer ${
                    labBatch === 'batch1'
                      ? 'bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-600 shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Batch 1 (Roll 1-30)
                </button>
                <button
                  type="button"
                  onClick={() => setLabBatch('batch2')}
                  className={`min-h-[38px] px-3 py-1.5 rounded-md border text-xs font-semibold transition active:scale-95 cursor-pointer ${
                    labBatch === 'batch2'
                      ? 'bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-600 shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Batch 2 (Roll 31+)
                </button>
              </div>

              {selectedBranch === 'EEE' && selectedSemester === 5 && (
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800 dark:text-slate-200 font-medium min-h-[38px]">
                  <input
                    type="checkbox"
                    checked={hasMinor}
                    onChange={(e) => setHasMinor(e.target.checked)}
                    className="rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    CS300M (CSE Minor) Active
                  </span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Pinned Bottom Action Footer - Edge-to-Edge, Theme unified, Zero White Bleed */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-slate-50/95 dark:bg-slate-950/95 border-t border-slate-200 dark:border-slate-800 backdrop-blur-md flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-2.5 shrink-0 pb-[max(0.875rem,env(safe-area-inset-bottom,0px))]">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[42px] px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition active:scale-95 text-center bg-white sm:bg-transparent border border-slate-200 sm:border-transparent dark:border-slate-700 sm:dark:border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="min-h-[42px] px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
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
