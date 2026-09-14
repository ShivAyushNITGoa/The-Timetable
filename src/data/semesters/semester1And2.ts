import { Course, TimeSlot, DayOfWeek } from '../timetableData';

export interface SemesterData {
  courses: Record<string, Course>;
  schedule: Record<DayOfWeek, TimeSlot[]>;
}

export type FirstYearSection = 'A' | 'B' | 'C' | 'D';

// ==========================================
// 1st Year Physics Cycle Courses (NIT Goa Master Timetable July-Dec 2026)
// Sections A & B follow Physics Cycle in Sem 1 (Odd Sem)
// ==========================================
export const PHYSICS_CYCLE_COURSES: Record<string, Course> = {
  'MA100': {
    code: 'MA100',
    name: 'Matrices and Advanced Calculus',
    type: 'Theory',
    credits: 4,
    ltp: '3-1-0',
    teachingSlot: 'G / E',
    examSlot: 'G / E',
    coordinator: 'Dr. G. Shiva Kumar Reddy (Sec A) / Dr. Ragoju Ravi (Sec B)',
    shortName: 'GSK / RR',
    facultyDesignation: 'Assistant Professor (Department of Applied Sciences / Mathematics)',
    facultyResearch: 'Differential Equations, Fluid Dynamics, Numerical Methods, Linear Algebra',
    email: 'gshivakumarreddy913@nitgoa.ac.in',
    facultyWebsite: 'https://www.nitgoa.ac.in/department/appliedsciences',
    room: 'LH 01 (45/46) / LH 02 (43/44)',
    category: 'core',
    notes: 'Sec A: Dr. G. Shiva Kumar Reddy (Slot G, Room 45/46). Sec B: Dr. Ragoju Ravi (Slot E, Room 43/44). Tutorial included.',
    modules: [
      'Module 1: Matrices & Linear Systems - Rank of matrices, Echelon form, Consistency of linear systems, Gauss elimination, Eigenvalues and Eigenvectors, Cayley-Hamilton Theorem, Diagonalization.',
      'Module 2: Multivariable Calculus - Functions of several variables, Partial derivatives, Total differential, Euler Theorem, Taylor series for multivariable functions, Jacobians, Lagrange multipliers.',
      'Module 3: Multiple Integrals - Double and triple integrals in Cartesian and polar coordinates, Change of order of integration, Change of variables, Volume and surface area calculations.',
      'Module 4: Vector Calculus - Gradient, directional derivative, divergence, curl, line and surface integrals, Green Theorem in plane, Stokes Theorem, Gauss Divergence Theorem.'
    ],
    textbooks: [
      'Erwin Kreyszig, "Advanced Engineering Mathematics", 10th Edition, John Wiley & Sons',
      'B. S. Grewal, "Higher Engineering Mathematics", 44th Edition, Khanna Publishers'
    ]
  },
  'PH100': {
    code: 'PH100',
    name: 'Engineering Physics',
    type: 'Theory',
    credits: 3,
    ltp: '3-0-0',
    teachingSlot: 'A (Sec A) / F (Sec B)',
    examSlot: 'A / F',
    coordinator: 'Dr. Saidi Reddy Parne',
    shortName: 'SRP',
    facultyDesignation: 'Associate Professor & 1st Year Sec A Faculty Advisor (Physics)',
    facultyResearch: 'Condensed Matter Physics, Dielectrics, Functional Nanomaterials, Energy Storage Devices',
    email: 'psreddy@nitgoa.ac.in',
    facultyWebsite: 'https://www.nitgoa.ac.in/department/appliedsciences',
    room: 'LH 01 (45/46) / LH 02 (43/44)',
    category: 'core',
    notes: 'Sec A: Slot A (Room 45/46). Sec B: Slot F (Room 43/44). Wave optics, lasers, quantum mechanics, and solid-state physics.',
    modules: [
      'Module 1: Wave Optics - Interference by division of wavefront/amplitude, Newton rings, thin film interference, Fresnel and Fraunhofer diffraction, diffraction gratings, resolving power.',
      'Module 2: Lasers & Fiber Optics - Spontaneous and stimulated emission, population inversion, Einstein coefficients, He-Ne laser, optical fibers, numerical aperture, attenuation mechanisms.',
      'Module 3: Quantum Mechanics - De Broglie hypothesis, Heisenberg uncertainty principle, Time-dependent and time-independent Schrodinger wave equation, particle in a 1D box.',
      'Module 4: Semiconductor Physics & Superconductivity - Intrinsic and extrinsic semiconductors, carrier concentration, Fermi-Dirac distribution, Hall effect, BCS theory basics, Meissner effect.'
    ],
    textbooks: [
      'David J. Griffiths, "Introduction to Electrodynamics", 4th Edition, Cambridge University Press',
      'H. K. Malik, A. K. Singh, "Engineering Physics", McGraw-Hill Education',
      'Ajoy Ghatak, "Optics", 7th Edition, McGraw-Hill'
    ]
  },
  'EE100': {
    code: 'EE100',
    name: 'Basics of Electrical Engineering',
    type: 'Theory',
    credits: 2,
    ltp: '2-0-0',
    teachingSlot: 'B (Sec A) / D (Sec B)',
    examSlot: 'B / D',
    coordinator: 'Dr. Amol D Rahulkar',
    shortName: 'ADR',
    facultyDesignation: 'Associate Professor (EEE)',
    facultyResearch: 'Control Systems, Power Electronics, Electric Drives, Smart Grid',
    email: 'amol.rahulkar@nitgoa.ac.in',
    facultyWebsite: 'https://www.nitgoa.ac.in/department/eee',
    room: 'LH 01 (45/46) / LH 02 (43/44)',
    category: 'core',
    notes: 'Sec A: Slot B (Room 45/46). Sec B: Slot D (Room 43/44). DC circuits, single phase and three-phase AC systems, and magnetic circuits.',
    modules: [
      'Module 1: DC Circuit Analysis - Nodal and mesh analysis, Superposition, Thevenin, Norton, and Maximum Power Transfer theorems, star-delta transformations.',
      'Module 2: AC Fundamentals - Sinusoidal waveforms, phasor representations, series and parallel RLC resonance, active, reactive, and apparent power, power factor correction.',
      'Module 3: Three-Phase Circuits - Balanced star and delta systems, line and phase voltages/currents, power measurement using two-wattmeter method.',
      'Module 4: Magnetic Circuits & Transformers - Magnetomotive force, magnetic flux, reluctance, BH curve, single-phase transformer construction, EMF equation, equivalent circuit.'
    ],
    textbooks: [
      'Vincent Del Toro, "Electrical Engineering Fundamentals", 2nd Edition, Prentice Hall',
      'D. P. Kothari, I. J. Nagrath, "Basic Electrical Engineering", McGraw-Hill Education'
    ]
  },
  'ME100': {
    code: 'ME100',
    name: 'Engineering Mechanics',
    type: 'Theory',
    credits: 3,
    ltp: '3-0-0',
    teachingSlot: 'E (Sec A) / C (Sec B)',
    examSlot: 'E / C',
    coordinator: 'Dr. Darrius Diogo Barreto (Sec A) / Dr. Sanjeev Singh (Sec B)',
    shortName: 'DDB / SS',
    facultyDesignation: 'Faculty (Mechanical Engineering)',
    facultyResearch: 'Applied Mechanics, Structural Analysis, Finite Element Methods, Vibration Analysis',
    email: 'darrius@nitgoa.ac.in',
    facultyWebsite: 'https://www.nitgoa.ac.in/department/me',
    room: 'LH 01 (45/46) / LH 02 (43/44)',
    category: 'core',
    notes: 'Sec A: Dr. Darrius Diogo Barreto (Slot E, Room 45/46). Sec B: Dr. Sanjeev Singh (Slot C, Room 43/44). Statics, equilibrium, trusses, friction, and dynamics.',
    modules: [
      'Module 1: Statics of Particles & Rigid Bodies - Force systems, Varignon theorem, Free body diagrams, Equations of equilibrium, Resultant of concurrent and non-concurrent forces.',
      'Module 2: Trusses & Friction - Method of joints and method of sections for plane trusses, Laws of dry friction, wedge friction, ladder friction, belt friction.',
      'Module 3: Centroid & Moment of Inertia - Centroid of composite plane areas, Pappus-Guldinus theorem, Area moment of inertia, Parallel and perpendicular axis theorems.',
      'Module 4: Dynamics of Particles - Rectilinear and curvilinear motion, Newton second law, D Alembert principle, Work-energy principle, Impulse and momentum.'
    ],
    textbooks: [
      'J. L. Meriam, L. G. Kraige, "Engineering Mechanics: Statics and Dynamics", 8th Edition, Wiley',
      'S. Timoshenko, D. H. Young, J. V. Rao, "Engineering Mechanics", 5th Edition, McGraw-Hill'
    ]
  },
  'CS100': {
    code: 'CS100',
    name: 'Computer Programming and Problem Solving',
    type: 'Theory',
    credits: 3,
    ltp: '3-0-0',
    teachingSlot: 'F (Sec A) / B (Sec B)',
    examSlot: 'F / B',
    coordinator: 'Dr. Keshavamurthy B N',
    shortName: 'BNK / KBN',
    facultyDesignation: 'Associate Professor (CSE)',
    facultyResearch: 'Computer Vision, Pattern Recognition, Cryptography, Algorithmic Optimization',
    email: 'bnkeshav.fcse@nitgoa.ac.in',
    facultyWebsite: 'https://www.nitgoa.ac.in/department/cse',
    room: 'LH 01 (45/46) / LH 02 (43/44)',
    category: 'core',
    notes: 'Sec A: Slot F (Room 45/46). Sec B: Slot B (Room 43/44). Problem solving, algorithms, C programming language constructs.',
    modules: [
      'Module 1: Problem Solving Foundations - Algorithms, flowcharts, pseudocode, structure of C program, variables, data types, operators, formatted input/output.',
      'Module 2: Control Structures & Modularization - Branching (if, switch), loops (for, while, do-while), functions, recursion, storage classes (auto, static, extern, register).',
      'Module 3: Arrays, Strings & Pointers - 1D and 2D arrays, string operations, pointer basics, pointer arithmetic, pointers and arrays, dynamic memory allocation (malloc, calloc, free).',
      'Module 4: Structures, Unions & File I/O - Struct definitions, nested structures, array of structures, unions, file pointers, sequential and binary file handling.'
    ],
    textbooks: [
      'Brian W. Kernighan, Dennis M. Ritchie, "The C Programming Language", 2nd Edition, Prentice Hall',
      'E. Balagurusamy, "Programming in ANSI C", 8th Edition, McGraw-Hill'
    ]
  },
  'HU100': {
    code: 'HU100',
    name: 'Liberal Arts',
    type: 'Theory',
    credits: 1,
    ltp: '0-0-2',
    teachingSlot: 'Wed (Sec A) / Tue (Sec B)',
    examSlot: 'Wed / Tue',
    coordinator: 'Dr Unais K T (Sec A) / Dr. Sarani Ghosal Mondal (Sec B)',
    shortName: 'UKT / SGM',
    facultyDesignation: 'Faculty (Humanities and Social Sciences)',
    facultyResearch: 'Liberal Studies, Cultural Philosophy, Critical Thinking, Creative Expression',
    email: 'unaiskt@nitgoa.ac.in',
    facultyWebsite: 'https://www.nitgoa.ac.in/department/humanities',
    room: 'Room 37 (CV Raman Block)',
    category: 'mlc',
    notes: 'Sec A: Wednesday 10:00-10:55 (Dr. Unais K T). Sec B: Tuesday 11:00-11:55 (Dr. Sarani Ghosal Mondal). Interdisciplinary liberal arts exploration.',
    modules: [
      'Module 1: Critical Inquiries - Introduction to philosophical thought, ethics in science & engineering, logic and argumentation.',
      'Module 2: Literature & Creative Expression - Classical and modern literature selections, narrative structures, creative writing and critical appreciation.',
      'Module 3: Visual Arts & Aesthetic Perception - Art movements, visual composition, Indian classical arts and architecture.',
      'Module 4: Culture, Society & Technology - Societal impact of technology, sustainable living, cultural preservation in a digital era.'
    ],
    textbooks: [
      'Selected Readings in Liberal Arts & Philosophy, NIT Goa HSS Course Pack',
      'Martha C. Nussbaum, "Cultivating Humanity: A Classical Defense of Reform in Liberal Education", Harvard University Press'
    ]
  },
  'PH101': {
    code: 'PH101',
    name: 'Engineering Physics Lab',
    type: 'Practical',
    credits: 2,
    ltp: '0-0-3',
    teachingSlot: 'Mon/Tue (Sec A) / Wed/Thu (Sec B)',
    examSlot: 'Practical',
    coordinator: 'Dr. Saidi Reddy Parne (Sec A) / Dr. Karuna Umakant Korgaonkar (Sec B)',
    shortName: 'SRP / KUK',
    facultyDesignation: 'Faculty (Physics)',
    facultyResearch: 'Experimental Physics, Optics, Solid State Laboratory',
    email: 'psreddy@nitgoa.ac.in',
    room: 'Physics Lab (Room 33/38)',
    category: 'lab',
    notes: 'Sec A: Mon/Tue 14:00-16:55 (SRP). Sec B: Wed/Thu 14:00-16:55 (KUK). Newton rings, diffraction, energy bandgap, Hall effect.',
    modules: [
      'Experiment 1: Determination of radius of curvature and light wavelength using Newton Rings apparatus.',
      'Experiment 2: Measurement of wavelength of spectral lines of mercury source using diffraction grating.',
      'Experiment 3: Determination of energy bandgap of semiconductor PN junction diode.',
      'Experiment 4: Measurement of Hall coefficient and carrier concentration in semiconductor crystal.',
      'Experiment 5: Determination of numerical aperture and fiber attenuation in optical waveguide.'
    ],
    textbooks: [
      'C. L. Arora, "Practical Physics", S. Chand & Company',
      'G. L. Squires, "Practical Physics", 4th Edition, Cambridge University Press'
    ]
  },
  'ME101': {
    code: 'ME101',
    name: 'Engineering Drawing',
    type: 'Practical',
    credits: 3,
    ltp: '1-0-3',
    teachingSlot: 'Mon/Tue/Thu',
    examSlot: 'Practical',
    coordinator: 'Dr. Gurkirat Singh / Dr. Siba Prasad Choudhury (Sec A) | Dr. Chaitanya Vundru / Dr. Srikumar Warrier (Sec B)',
    shortName: 'GS/SPC (Sec A) | CV/SW (Sec B)',
    facultyDesignation: 'Faculty (Mechanical Engineering)',
    facultyResearch: 'Computer Aided Engineering Drawing, Geometric Dimensioning and Tolerancing',
    email: 'gurkirat@nitgoa.ac.in',
    room: 'Drawing Hall (Room 33/38 / 45/46 / 43/44)',
    category: 'lab',
    notes: 'Orthographic projections, isometric views, section of solids, drafting standards.',
    modules: [
      'Module 1: Drawing Principles & Scales - Sheet layouts, lettering, dimensioning, conic sections, Plain and diagonal scales.',
      'Module 2: Projections of Points, Lines & Planes - Projections on reference planes, true length and true inclination of lines, traces of lines, projections of regular plane surfaces.',
      'Module 3: Projections & Sections of Solids - Polyhedra, prisms, pyramids, cylinders, cones inclined to reference planes, section planes and true shape of sections.',
      'Module 4: Isometric Projections & CAD Drafting - Isometric scale, isometric views of composite solids, conversion between orthographic and isometric, 2D CAD drafting.'
    ],
    textbooks: [
      'N. D. Bhatt, "Engineering Drawing", 53rd Edition, Charotar Publishing House',
      'K. Venugopal, "Engineering Graphics", New Age International'
    ]
  },
  'EE101': {
    code: 'EE101',
    name: 'Basics of Electrical Engineering Lab',
    type: 'Practical',
    credits: 1,
    ltp: '0-0-3',
    teachingSlot: 'Wed/Thu (Sec A) / Mon/Tue (Sec B)',
    examSlot: 'Practical',
    coordinator: 'Ms. Shefali Painuli (Sec A) / Dr. Mahi Teja Talluri (Sec B)',
    shortName: 'SP / MTT',
    facultyDesignation: 'Faculty (EEE)',
    facultyResearch: 'Electrical Machines, Measurement, Power Systems',
    email: 'shefali@nitgoa.ac.in',
    room: 'Electrical Machines & Circuits Lab',
    category: 'lab',
    notes: 'Sec A: Ms. Shefali Painuli (SP). Sec B: Dr. Mahi Teja Talluri (MTT). Verification of network theorems, 3-phase power measurement.',
    modules: [
      'Experiment 1: Verification of Thevenin and Norton Theorems in resistive circuits.',
      'Experiment 2: Verification of Superposition and Maximum Power Transfer Theorems.',
      'Experiment 3: Series and parallel RLC resonance circuit characteristics and bandwidth.',
      'Experiment 4: Three-phase active and reactive power measurement using two-wattmeter method.',
      'Experiment 5: Open circuit and short circuit tests on single-phase transformer for efficiency determination.'
    ],
    textbooks: [
      'Laboratory Manual for Basics of Electrical Engineering, Department of EEE, NIT Goa'
    ]
  },
  'CS101': {
    code: 'CS101',
    name: 'Computer Programing Lab',
    type: 'Practical',
    credits: 1,
    ltp: '0-0-2',
    teachingSlot: 'Wed/Thu (Sec A) / Mon/Tue (Sec B)',
    examSlot: 'Practical',
    coordinator: 'Contract Faculty 1',
    shortName: 'CF1',
    facultyDesignation: 'Contract Faculty (Department of CSE)',
    facultyResearch: 'Software Engineering, Algorithmic Implementation, Systems Programming',
    email: 'cf1.cse@nitgoa.ac.in',
    room: 'Computing Lab',
    category: 'lab',
    notes: 'Hands-on programming in C: iterative logic, recursion, dynamic pointers, structures, file I/O.',
    modules: [
      'Experiment 1: Basic arithmetic programs, quadratic roots, primes, leap year checking.',
      'Experiment 2: Matrix arithmetic (addition, multiplication, transpose, determinant).',
      'Experiment 3: String manipulation without library functions, palindrome, substring matching.',
      'Experiment 4: Pointers and dynamic memory allocation, array reversal, dynamic matrices.',
      'Experiment 5: Structure and file handlers: student mark-sheet records database creation and querying.'
    ],
    textbooks: [
      'Yashavant Kanetkar, "Let Us C", 18th Edition, BPB Publications'
    ]
  }
};

// ==========================================
// 1st Year Chemistry Cycle Courses (NIT Goa Master Timetable July-Dec 2026)
// Sections C & D follow Chemistry Cycle in Sem 1 (Odd Sem)
// ==========================================
export const CHEMISTRY_CYCLE_COURSES: Record<string, Course> = {
  'MA100': {
    code: 'MA100',
    name: 'Matrices and Advanced Calculus',
    type: 'Theory',
    credits: 4,
    ltp: '3-1-0',
    teachingSlot: 'B (Sec C & D)',
    examSlot: 'B',
    coordinator: 'Dr. L. Shangerganesh (Sec C) / Dr. Ravi Prasad K. J. (Sec D)',
    shortName: 'LSG / RPJ',
    facultyDesignation: 'Faculty & 1st Year Faculty Advisors (Mathematics)',
    facultyResearch: 'Partial Differential Equations, Mathematical Modeling, Optimization',
    email: 'shangerganesh@nitgoa.ac.in',
    facultyWebsite: 'https://www.nitgoa.ac.in/department/appliedsciences',
    room: 'LH 03 (40/41) / LH 04 (27/28)',
    category: 'core',
    notes: 'Sec C: Dr. L. Shangerganesh (Slot B, Room 40/41). Sec D: Dr. Ravi Prasad K. J. (Slot B, Room 27/28). Matrix calculus, multivariable analysis, vector fields.',
    modules: [
      'Module 1: Matrices & Eigenvalues - Rank of matrices, System of linear equations, Gauss-Jordan reduction, Eigenvalues, Eigenvectors, Cayley-Hamilton theorem, Quadratic forms.',
      'Module 2: Multivariable Differential Calculus - Partial derivatives, Euler theorem for homogeneous functions, Jacobians, Maxima and minima, Lagrange multipliers method.',
      'Module 3: Multiple Integrals - Double and triple integrals in Cartesian and polar coordinates, Change of variables, Areas and volumes of solids of revolution.',
      'Module 4: Vector Calculus & Field Theorems - Gradient, divergence, curl, line, surface, volume integrals, Green theorem, Stokes theorem, Gauss Divergence theorem.'
    ],
    textbooks: [
      'Erwin Kreyszig, "Advanced Engineering Mathematics", 10th Edition, John Wiley & Sons',
      'B. S. Grewal, "Higher Engineering Mathematics", 44th Edition, Khanna Publishers'
    ]
  },
  'CY150': {
    code: 'CY150',
    name: 'Engineering Chemistry',
    type: 'Theory',
    credits: 3,
    ltp: '3-0-0',
    teachingSlot: 'A (Sec C) / E (Sec D)',
    examSlot: 'A / E',
    coordinator: 'Dr. Velavan Kathirvelu (Sec C) / Dr Lasitha P (Sec D)',
    shortName: 'VK / LP',
    facultyDesignation: 'Faculty & Faculty Advisors (Chemistry)',
    facultyResearch: 'Electron Paramagnetic Resonance (EPR), Green Energy Materials, Polymers, Electrochemistry',
    email: 'velavan@nitgoa.ac.in',
    facultyWebsite: 'https://www.nitgoa.ac.in/department/appliedsciences',
    room: 'LH 03 (40/41) / LH 04 (27/28)',
    category: 'core',
    notes: 'Sec C: Dr. Velavan Kathirvelu (Slot A, Room 40/41). Sec D: Dr Lasitha P (Slot E, Room 27/28). Energy storage, corrosion, polymers, water chemistry.',
    modules: [
      'Module 1: Electrochemistry & Battery Technologies - Nernst equation, reference electrodes, lead-acid batteries, Lithium-ion batteries, fuel cells (H2-O2).',
      'Module 2: Corrosion Science & Mitigation - Galvanic, pitting, and stress corrosion mechanisms, cathodic protection, sacrificial anode, metallic and organic coatings.',
      'Module 3: Polymers & Advanced Materials - Thermoplastics and thermosets, conducting polymers, synthesis and uses of Bakelite, Kevlar, carbon nanotubes and nanomaterials.',
      'Module 4: Water Quality & Environmental Chemistry - Hardness determination by EDTA, boiler sludge and scale, reverse osmosis desalination, green chemistry metrics.'
    ],
    textbooks: [
      'P. C. Jain, Monika Jain, "Engineering Chemistry", 17th Edition, Dhanpat Rai Publishing',
      'Shashi Chawla, "A Textbook of Engineering Chemistry", Dhanpat Rai & Co.'
    ]
  },
  'HU150': {
    code: 'HU150',
    name: 'Professional Communication',
    type: 'Theory',
    credits: 4,
    ltp: '2-0-3',
    teachingSlot: 'E (Sec C) / C (Sec D)',
    examSlot: 'E / C',
    coordinator: 'Dr Unais K T (Sec C) / Dr. Sarani Ghosal Mondal (Sec D)',
    shortName: 'UKT / SGM',
    facultyDesignation: 'Associate Professor / Assistant Professor (Humanities)',
    facultyResearch: 'Technical Communication, Professional Writing, Phonetics, Corporate Discourse',
    email: 'unaiskt@nitgoa.ac.in',
    facultyWebsite: 'https://www.nitgoa.ac.in/department/humanities',
    room: 'LH 03 (40/41) / LH 04 (27/28)',
    category: 'core',
    notes: 'Theory cum practical (2-0-3, 4 credits). Sec C: Dr Unais K T (Slot E). Sec D: Dr. Sarani Ghosal Mondal (Slot C).',
    modules: [
      'Module 1: Phonetics & Spoken Discourse - English phonetics, IPA symbols, word stress, intonation patterns, overcoming mother tongue influence, public speaking.',
      'Module 2: Technical Writing & Reports - Mechanics of formal reports, executive summaries, technical proposals, research paper abstracts and structuring.',
      'Module 3: Professional Correspondence - Formal emails, official memoranda, curriculum vitae, cover letters, minutes of meetings, business etiquette.',
      'Module 4: Group Discussion & Interview Skills - Group dynamics, leadership qualities, persuasive articulation, body language, mock interview sessions.'
    ],
    textbooks: [
      'Meenakshi Raman, Sangeeta Sharma, "Technical Communication: Principles and Practice", 3rd Edition, Oxford University Press',
      'Andrea J. Rutherfoord, "Basic Communication Skills for Technology", 2nd Edition, Pearson'
    ]
  },
  'EC150': {
    code: 'EC150',
    name: 'Basics of Electronics Engineering',
    type: 'Theory',
    credits: 2,
    ltp: '2-0-0',
    teachingSlot: 'F (Sec C) / D (Sec D)',
    examSlot: 'F / D',
    coordinator: 'Dr. Lalat Indu Giri',
    shortName: 'LIG',
    facultyDesignation: 'Assistant Professor (Department of ECE)',
    facultyResearch: 'Optoelectronics, Biomedical Imaging, Semiconductor Devices, Sensors',
    email: 'lig@nitgoa.ac.in',
    facultyWebsite: 'https://www.nitgoa.ac.in/department/ece',
    room: 'LH 03 (40/41) / LH 04 (27/28)',
    category: 'core',
    notes: 'Sec C: Slot F (Room 40/41). Sec D: Slot D (Room 27/28). Semiconductor diodes, transistors, op-amps, and digital logic circuits.',
    modules: [
      'Module 1: Semiconductor Diodes & Applications - PN junction under forward/reverse bias, Zener diode, half-wave and full-wave rectifiers with filter circuits.',
      'Module 2: Transistors (BJT & MOSFET) - BJT configurations (CE, CB, CC), DC load line and Q-point, BJT as switch and amplifier, MOSFET operation.',
      'Module 3: Operational Amplifiers - Ideal op-amp characteristics, inverting and non-inverting amplifier circuits, summer, differentiator, integrator, comparator.',
      'Module 4: Digital Electronics - Boolean algebra, logic gates, truth tables, combinational logic design, adders, multiplexers, basic flip-flops.'
    ],
    textbooks: [
      'Robert L. Boylestad, Louis Nashelsky, "Electronic Devices and Circuit Theory", 11th Edition, Pearson',
      'Albert Malvino, David J. Bates, "Electronic Principles", 8th Edition, McGraw-Hill'
    ]
  },
  'ME150': {
    code: 'ME150',
    name: 'Basics of Mechanical and Civil Engineering',
    type: 'Theory',
    credits: 3,
    ltp: '3-0-0',
    teachingSlot: 'C (Sec C) / A (Sec D)',
    examSlot: 'C / A',
    coordinator: 'Dr. Prasenjit Dey (Sec C) / Dr. Samar Singhal (Sec D)',
    shortName: 'PD / SS',
    facultyDesignation: 'Assistant Professor (Department of Mechanical Engineering)',
    facultyResearch: 'Thermal Engineering, Fluid Systems, Civil Infrastructure, Energy Systems',
    email: 'prasenjit@nitgoa.ac.in',
    facultyWebsite: 'https://www.nitgoa.ac.in/department/me',
    room: 'LH 03 (40/41) / LH 04 (27/28)',
    category: 'core',
    notes: 'Sec C: Dr. Prasenjit Dey (Slot C, Room 40/41). Sec D: Dr. Samar Singhal (Slot A, Room 27/28). Mechanical systems & civil construction basics.',
    modules: [
      'Module 1: Thermodynamics & Energy Systems - Laws of thermodynamics, Carnot cycle, steam generation, boilers, IC engines (2-stroke/4-stroke petrol & diesel).',
      'Module 2: Power Transmission & Manufacturing - Belt, rope, and gear drives, clutches, brakes, primary manufacturing processes (casting, welding, machining).',
      'Module 3: Civil Construction Materials - Stones, bricks, cement, mortar, concrete, structural steel, foundation types, smart building materials.',
      'Module 4: Surveying & Structural Basics - Chain surveying, compass surveying, levelling, basics of bridges, dams, roads, and green buildings.'
    ],
    textbooks: [
      'P. K. Nag, "Basic and Applied Thermodynamics", 2nd Edition, McGraw-Hill',
      'S. Ramamrutham, "Basic Civil Engineering", Dhanpat Rai Publishing'
    ]
  },
  'HU151': {
    code: 'HU151',
    name: 'Health & Happiness',
    type: 'Theory',
    credits: 2,
    ltp: '2-0-0',
    teachingSlot: 'Friday 15:00 - 15:55 (Sec C) / 16:00 - 16:55 (Sec D)',
    examSlot: 'Friday',
    coordinator: 'Dr. Madhavilata Upendra Dixit',
    shortName: 'MUD',
    facultyDesignation: 'Faculty (Humanities & Value Education)',
    facultyResearch: 'Mindfulness, Mental Wellbeing, Holistic Health, Stress Management',
    email: 'madhavilata@nitgoa.ac.in',
    room: 'LH 03 (40/41) / LH 04 (27/28)',
    category: 'mlc',
    notes: 'Sec C: Friday 15:00-15:55 (Room 40/41). Sec D: Friday 16:00-16:55 (Room 27/28). Value education, mental wellbeing, yoga, nutrition, and lifestyle science.',
    modules: [
      'Module 1: Holistic Health Science - Physical fitness, circadian rhythms, balanced nutrition, hydration, and sleep hygiene.',
      'Module 2: Mental Wellbeing & Mindfulness - Stress reduction techniques, breathwork (pranayama), cognitive reframing, emotional resilience.',
      'Module 3: Interpersonal Relationships - Empathy, active listening, conflict resolution, cultivating supportive campus communities.',
      'Module 4: Purpose & Meaningful Living - Values alignment, gratitude practice, digital detox, service-learning and environmental harmony.'
    ],
    textbooks: [
      'R. R. Gaur, R. Sangal, G. P. Bagaria, "A Foundation Course in Human Values and Professional Ethics", Excel Books'
    ]
  },
  'CY151': {
    code: 'CY151',
    name: 'Engineering Chemistry Lab',
    type: 'Practical',
    credits: 2,
    ltp: '0-0-3',
    teachingSlot: 'Mon/Tue (Sec C) / Wed/Thu (Sec D)',
    examSlot: 'Practical',
    coordinator: 'Dr Lasitha P',
    shortName: 'LP',
    facultyDesignation: 'Assistant Professor (Department of Chemistry)',
    facultyResearch: 'Analytical Chemistry, Nanomaterials, Electrochemical Sensors',
    email: 'lasitha@nitgoa.ac.in',
    room: 'Chemistry Laboratory',
    category: 'lab',
    notes: 'EDTA water hardness titration, conductometric acid-base titration, Ostwald viscosity, and dissolved oxygen testing.',
    modules: [
      'Experiment 1: Determination of total, permanent, and temporary hardness of water by EDTA method.',
      'Experiment 2: Conductometric titration of strong acid with strong base.',
      'Experiment 3: Determination of viscosity coefficient of organic liquids using Ostwald viscometer.',
      'Experiment 4: Potentiometric titration of ferrous ion with standard potassium dichromate.',
      'Experiment 5: Estimation of dissolved oxygen in tap water by Winkler method.'
    ],
    textbooks: [
      'J. Mendham, "Vogel Quantitative Chemical Analysis", 6th Edition, Pearson'
    ]
  },
  'EC151': {
    code: 'EC151',
    name: 'Basics of Electronics Engineering Lab',
    type: 'Practical',
    credits: 1,
    ltp: '0-0-3',
    teachingSlot: 'Wed/Thu (Sec C) / Mon/Tue (Sec D)',
    examSlot: 'Practical',
    coordinator: 'Dr. Lalat Indu Giri (Sec C) / Dr. Trilochan Panigrahi (Sec D)',
    shortName: 'LIG / TP',
    facultyDesignation: 'Faculty (ECE)',
    facultyResearch: 'Circuits, Signal Processing, Optoelectronics',
    email: 'lig@nitgoa.ac.in',
    room: 'Basic Electronics Lab',
    category: 'lab',
    notes: 'Diode VI characteristics, rectifiers with filters, BJT input/output curves, and op-amp inverting/non-inverting circuits.',
    modules: [
      'Experiment 1: PN junction diode forward and reverse bias characteristics.',
      'Experiment 2: Half-wave and full-wave bridge rectifier circuits with capacitor filter.',
      'Experiment 3: BJT common emitter input and output characteristics.',
      'Experiment 4: Op-Amp inverting and non-inverting voltage amplifier design.',
      'Experiment 5: Verification of truth tables of basic and universal logic gates.'
    ],
    textbooks: [
      'Laboratory Manual for Basic Electronics, Department of ECE, NIT Goa'
    ]
  },
  'ME151': {
    code: 'ME151',
    name: 'Workshop Practices',
    type: 'Practical',
    credits: 2,
    ltp: '0-0-3',
    teachingSlot: 'Mon/Tue (Sec C) / Wed/Thu (Sec D)',
    examSlot: 'Practical',
    coordinator: 'Dr. Prasenjit Dey / Dr. Sanjeev Singh / Dr. Srikumar Warrier (Sec C) | Dr. Abhijit Sarkar / Dr. Siba Prasad Choudhury / Dr. Gurkirat Singh (Sec D)',
    shortName: 'PD/DSS/SW (Sec C) | AS/SPC/GS (Sec D)',
    facultyDesignation: 'Faculty (Mechanical Engineering)',
    facultyResearch: 'Manufacturing Processes, Machining, Welding, Fitting',
    email: 'prasenjit@nitgoa.ac.in',
    room: 'Central Workshop Complex',
    category: 'lab',
    notes: 'Hands-on training in Fitting, Carpentry, Welding, Sheet Metal, and House Wiring.',
    modules: [
      'Trade 1: Fitting Shop - V-groove and stepped fitting using hacksaw, files, and chisels.',
      'Trade 2: Carpentry Shop - Mortise and tenon joint, dovetail joint using woodworking tools.',
      'Trade 3: Welding Shop - Manual metal arc welding for butt and lap joints.',
      'Trade 4: Sheet Metal & Plumbing - Funnel fabrication, GI pipe cutting and threading.'
    ],
    textbooks: [
      'K. Venkat Reddy, "Workshop Practice Manual", BS Publications'
    ]
  },
  'PE150': {
    code: 'PE150',
    name: 'Physical Education',
    type: 'Practical',
    credits: 0,
    ltp: '1-0-2',
    teachingSlot: 'Mon/Wed/Thu 12:00 / 17:00',
    examSlot: 'Practical',
    coordinator: 'Mr. Akhilesh Maravi',
    shortName: 'AM',
    facultyDesignation: 'Sports Officer & Physical Education In-charge',
    facultyResearch: 'Physical Conditioning, Athletic Training, Sports Science',
    email: 'sports@nitgoa.ac.in',
    room: 'SAC Sports Complex / Playing Grounds',
    category: 'mlc',
    notes: 'Physical fitness, endurance drills, games (volleyball, badminton, basketball, football, athletics) and yogic asanas.',
    modules: [
      'Module 1: Physical Fitness Conditioning - Warmup drills, aerobic conditioning, strength and flexibility routines.',
      'Module 2: Major Sports Skills - Rules, skills, and gameplay for badminton, volleyball, football, cricket, and table tennis.',
      'Module 3: Yogic Asanas & Pranayama - Surya Namaskar, standing/sitting postures, deep breathing, stress mitigation.',
      'Module 4: Health Metrics & Sports Ethics - Body Mass Index (BMI), sportsmanship, teamwork and injury first-aid.'
    ],
    textbooks: [
      'NIT Goa Physical Fitness & Sports Conditioning Handbook'
    ]
  },
  'MA400M': {
    code: 'MA400M',
    name: 'Optimization (Minor in Computational Math)',
    type: 'Minor',
    credits: 3,
    ltp: '2-1-0',
    teachingSlot: 'Minor Slot (G)',
    examSlot: 'G',
    coordinator: 'Dr. Ravi Prasad K. J.',
    shortName: 'RPJ',
    facultyDesignation: 'Associate Professor (Mathematics)',
    facultyResearch: 'Mathematical Programming, Operations Research, Convex Optimization',
    email: 'k.j.raviprasad@nitgoa.ac.in',
    room: 'Room 40/41',
    category: 'minor',
    notes: 'Linear programming, Simplex algorithm, Duality, Non-linear optimization, Kuhn-Tucker conditions.',
    modules: [
      'Module 1: Linear Programming - Formulation, Graphical method, Simplex method, Two-phase simplex, Big-M method.',
      'Module 2: Duality & Sensitivity - Dual problem formulation, Duality theorems, Dual simplex, Sensitivity analysis.',
      'Module 3: Transportation & Assignment - Initial basic feasible solutions (North-West, Vogel), MODI method, Hungarian assignment.',
      'Module 4: Non-Linear Optimization - Unconstrained optimization, Gradient descent, Newton method, Karush-Kuhn-Tucker (KKT) optimality conditions.'
    ],
    textbooks: [
      'Hamdy A. Taha, "Operations Research: An Introduction", 10th Edition, Pearson',
      'Singiresu S. Rao, "Engineering Optimization: Theory and Practice", John Wiley & Sons'
    ]
  }
};

// =========================================================================
// Exact Master Timetable Day-by-Day Schedules for Sections A, B, C, D
// Extracted from Pages 2, 3, 4, 5, 6 of Master Time table @Institute Level
// =========================================================================

export function getSectionSchedule(section: FirstYearSection): Record<DayOfWeek, TimeSlot[]> {
  if (section === 'A') {
    return {
      Monday: [
        { id: 'secA-m1', day: 'Monday', startTime: '09:00', endTime: '09:55', slotName: 'Slot A', courseCode: 'PH100', room: 'LH 01 (45/46)' },
        { id: 'secA-m2', day: 'Monday', startTime: '10:00', endTime: '10:55', slotName: 'Slot B', courseCode: 'FREE', room: 'LH 01', isFree: true },
        { id: 'secA-m3', day: 'Monday', startTime: '11:00', endTime: '11:55', slotName: 'Slot C', courseCode: 'MA100', room: 'LH 01 (45/46)', notes: 'MA100 Tutorial: Dr. GSK' },
        { id: 'secA-m4', day: 'Monday', startTime: '12:00', endTime: '12:55', slotName: 'Slot D', courseCode: 'ME101', room: 'LH 01 (45/46)', notes: 'ME101: GS/SPC' },
        { id: 'secA-ml', day: 'Monday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        {
          id: 'secA-m5',
          day: 'Monday',
          startTime: '14:00',
          endTime: '16:55',
          slotName: 'LAB 1 (A1) / LAB 2 (A2)',
          courseCode: 'PH101',
          room: 'Physics / Drawing Hall (33/38)',
          isLab: true,
          labOptions: {
            batch1: { code: 'PH101', name: 'Engineering Physics Lab (A1)', faculty: 'Dr. Saidi Reddy Parne (SRP)', room: 'Physics Lab' },
            batch2: { code: 'ME101', name: 'Engineering Drawing (A2)', faculty: 'Dr. Gurkirat Singh (GS)', room: 'Drawing Hall (33/38)' }
          },
          notes: 'Batch A1: PH101 (Dr. SRP) | Batch A2: ME101 (Dr. GS)'
        },
      ],
      Tuesday: [
        { id: 'secA-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:55', slotName: 'Slot E', courseCode: 'ME100', room: 'LH 01 (45/46)', notes: 'Dr. Darrius Diogo Barreto (DDB)' },
        { id: 'secA-t2', day: 'Tuesday', startTime: '10:00', endTime: '10:55', slotName: 'Slot F', courseCode: 'CS100', room: 'LH 01 (45/46)', notes: 'Dr. Keshavamurthy B N (BNK)' },
        { id: 'secA-t3', day: 'Tuesday', startTime: '11:00', endTime: '11:55', slotName: 'Slot A', courseCode: 'PH100', room: 'LH 01 (45/46)', notes: 'Dr. Saidi Reddy Parne (SRP)' },
        { id: 'secA-t4', day: 'Tuesday', startTime: '12:00', endTime: '12:55', slotName: 'Minor / Math Slot (G)', courseCode: 'MA100', room: 'LH 01 (45/46)', notes: 'Dr. G. Shiva Kumar Reddy (GSK)' },
        { id: 'secA-tl', day: 'Tuesday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        {
          id: 'secA-t5',
          day: 'Tuesday',
          startTime: '14:00',
          endTime: '16:55',
          slotName: 'LAB 2 (A1) / LAB 1 (A2)',
          courseCode: 'ME101',
          room: 'Drawing Hall (33/38) / Physics Lab',
          isLab: true,
          labOptions: {
            batch1: { code: 'ME101', name: 'Engineering Drawing (A1)', faculty: 'Dr. Siba Prasad Choudhury (SPC)', room: 'Drawing Hall (33/38)' },
            batch2: { code: 'PH101', name: 'Engineering Physics Lab (A2)', faculty: 'Dr. Saidi Reddy Parne (SRP)', room: 'Physics Lab' }
          },
          notes: 'Batch A1: ME101 (Dr. SPC) | Batch A2: PH101 (Dr. SRP)'
        },
      ],
      Wednesday: [
        { id: 'secA-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:55', slotName: 'Slot B', courseCode: 'EE100', room: 'LH 01 (45/46)', notes: 'Dr. Amol D Rahulkar (ADR)' },
        { id: 'secA-w2', day: 'Wednesday', startTime: '10:00', endTime: '10:55', slotName: 'Liberal Arts', courseCode: 'HU100', room: 'Room 37 (CV Raman)', notes: 'Liberal Arts: Dr. Unais K T' },
        { id: 'secA-w3', day: 'Wednesday', startTime: '11:00', endTime: '11:55', slotName: 'Slot D', courseCode: 'FREE', room: 'LH 01', isFree: true },
        { id: 'secA-w4', day: 'Wednesday', startTime: '12:00', endTime: '12:55', slotName: 'Slot E', courseCode: 'ME100', room: 'LH 01 (45/46)', notes: 'Dr. Darrius Diogo Barreto (DDB)' },
        { id: 'secA-wl', day: 'Wednesday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        { id: 'secA-w5', day: 'Wednesday', startTime: '14:00', endTime: '14:55', slotName: 'Minor / Math Slot (G)', courseCode: 'MA100', room: 'LH 01 (45/46)', notes: 'Dr. GSK' },
        {
          id: 'secA-w6',
          day: 'Wednesday',
          startTime: '15:00',
          endTime: '16:55',
          slotName: 'LAB 3 (A1) / LAB 4 (A2)',
          courseCode: 'EE101',
          room: 'EE / Computing Lab',
          isLab: true,
          labOptions: {
            batch1: { code: 'EE101', name: 'Basics of Electrical Engg Lab (A1)', faculty: 'Ms. Shefali Painuli (SP)', room: 'Electrical Lab' },
            batch2: { code: 'CS101', name: 'Computer Programming Lab (A2)', faculty: 'Contract Faculty 1 (CF1)', room: 'Computing Lab' }
          },
          notes: 'Batch A1: EE101 (SP) | Batch A2: CS101 (CF1)'
        },
      ],
      Thursday: [
        { id: 'secA-th1', day: 'Thursday', startTime: '09:00', endTime: '09:55', slotName: 'Slot F', courseCode: 'CS100', room: 'LH 01 (45/46)', notes: 'Dr. Keshavamurthy B N (BNK)' },
        { id: 'secA-th2', day: 'Thursday', startTime: '10:00', endTime: '10:55', slotName: 'Slot A', courseCode: 'PH100', room: 'LH 01 (45/46)', notes: 'Dr. Saidi Reddy Parne (SRP)' },
        { id: 'secA-th3', day: 'Thursday', startTime: '11:00', endTime: '11:55', slotName: 'Slot B', courseCode: 'EE100', room: 'LH 01 (45/46)', notes: 'Dr. Amol D Rahulkar (ADR)' },
        { id: 'secA-th4', day: 'Thursday', startTime: '12:00', endTime: '12:55', slotName: 'Slot H', courseCode: 'FREE', room: 'LH 01', isFree: true },
        { id: 'secA-thl', day: 'Thursday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        {
          id: 'secA-th5',
          day: 'Thursday',
          startTime: '14:00',
          endTime: '16:55',
          slotName: 'LAB 4 (A1) / LAB 3 (A2)',
          courseCode: 'CS101',
          room: 'Computing / EE Lab',
          isLab: true,
          labOptions: {
            batch1: { code: 'CS101', name: 'Computer Programming Lab (A1)', faculty: 'Contract Faculty 1 (CF1)', room: 'Computing Lab' },
            batch2: { code: 'EE101', name: 'Basics of Electrical Engg Lab (A2)', faculty: 'Ms. Shefali Painuli (SP)', room: 'Electrical Lab' }
          },
          notes: 'Batch A1: CS101 (CF1) | Batch A2: EE101 (SP)'
        },
      ],
      Friday: [
        { id: 'secA-f1', day: 'Friday', startTime: '09:00', endTime: '09:55', slotName: 'Slot C', courseCode: 'FREE', room: 'LH 01', isFree: true },
        { id: 'secA-f2', day: 'Friday', startTime: '10:00', endTime: '10:55', slotName: 'Slot D', courseCode: 'FREE', room: 'LH 01', isFree: true },
        { id: 'secA-f3', day: 'Friday', startTime: '11:00', endTime: '11:55', slotName: 'Slot E', courseCode: 'ME100', room: 'LH 01 (45/46)', notes: 'Dr. Darrius Diogo Barreto (DDB)' },
        { id: 'secA-f4', day: 'Friday', startTime: '12:00', endTime: '12:55', slotName: 'Slot F', courseCode: 'CS100', room: 'LH 01 (45/46)', notes: 'Dr. Keshavamurthy B N (BNK)' },
        { id: 'secA-fl', day: 'Friday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        { id: 'secA-f5', day: 'Friday', startTime: '14:00', endTime: '14:55', slotName: 'Minor / Math Slot (G)', courseCode: 'MA100', room: 'LH 01 (45/46)', notes: 'Dr. G. Shiva Kumar Reddy (GSK)' },
        { id: 'secA-f6', day: 'Friday', startTime: '15:00', endTime: '16:55', slotName: 'Remedial & Library Slot', courseCode: 'FREE', room: 'Central Library', isFree: true },
      ],
      Saturday: [
        { id: 'secA-sat1', day: 'Saturday', startTime: '09:00', endTime: '10:55', slotName: 'Mathematics & Mechanics Clinic', courseCode: 'MA100', room: 'LH 01 (45/46)', notes: 'Subject problem solving & numerical practice' },
        { id: 'secA-sat2', day: 'Saturday', startTime: '11:00', endTime: '12:55', slotName: 'C Programming & Physics Doubt Clearing', courseCode: 'CS100', room: 'Computing Center', notes: 'Doubt clearing and logic debugging' },
        { id: 'secA-satl', day: 'Saturday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        { id: 'secA-sat3', day: 'Saturday', startTime: '14:00', endTime: '16:55', slotName: 'Engineering Society & Student Clubs', courseCode: 'FREE', room: 'Student Activity Center', isFree: true },
      ],
      Sunday: [
        { id: 'secA-sun1', day: 'Sunday', startTime: '09:00', endTime: '12:55', slotName: 'Central Library Self-Study', courseCode: 'FREE', room: 'Central Library', isFree: true },
        { id: 'secA-sunl', day: 'Sunday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        { id: 'secA-sun2', day: 'Sunday', startTime: '14:00', endTime: '16:55', slotName: 'Campus Sports & Recreation', courseCode: 'FREE', room: 'SAC Sports Ground', isFree: true },
      ],
    };
  }

  if (section === 'B') {
    return {
      Monday: [
        { id: 'secB-m1', day: 'Monday', startTime: '09:00', endTime: '09:55', slotName: 'Slot A', courseCode: 'FREE', room: 'LH 02 (43/44)', isFree: true },
        { id: 'secB-m2', day: 'Monday', startTime: '10:00', endTime: '10:55', slotName: 'Slot B', courseCode: 'CS100', room: 'LH 02 (43/44)', notes: 'Dr. Keshavamurthy B N (KBN)' },
        { id: 'secB-m3', day: 'Monday', startTime: '11:00', endTime: '11:55', slotName: 'Slot C', courseCode: 'ME100', room: 'LH 02 (43/44)', notes: 'Dr. Sanjeev Singh (SS)' },
        { id: 'secB-m4', day: 'Monday', startTime: '12:00', endTime: '12:55', slotName: 'Slot D', courseCode: 'MA100', room: 'LH 02 (43/44)', notes: 'MA100 Tutorial' },
        { id: 'secB-ml', day: 'Monday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        {
          id: 'secB-m5',
          day: 'Monday',
          startTime: '14:00',
          endTime: '16:55',
          slotName: 'LAB 3 (B1) / LAB 4 (B2)',
          courseCode: 'EE101',
          room: 'Electrical / Computing Lab',
          isLab: true,
          labOptions: {
            batch1: { code: 'EE101', name: 'Basics of Electrical Engg Lab (B1)', faculty: 'Ms. Shefali Painuli (SP)', room: 'Electrical Lab' },
            batch2: { code: 'CS101', name: 'Computer Programming Lab (B2)', faculty: 'Contract Faculty 1 (CF1)', room: 'Computing Lab' }
          },
          notes: 'Batch B1: EE101 (SP) | Batch B2: CS101 (CF1)'
        },
      ],
      Tuesday: [
        { id: 'secB-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:55', slotName: 'Slot E', courseCode: 'MA100', room: 'LH 02 (43/44)', notes: 'Dr. Ragoju Ravi (RR)' },
        { id: 'secB-t2', day: 'Tuesday', startTime: '10:00', endTime: '10:55', slotName: 'Slot F', courseCode: 'PH100', room: 'LH 02 (43/44)', notes: 'Dr. Saidi Reddy Parne (SRP)' },
        { id: 'secB-t3', day: 'Tuesday', startTime: '11:00', endTime: '11:55', slotName: 'Liberal Arts', courseCode: 'HU100', room: 'Room 37 (CV Raman)', notes: 'Liberal Arts: Dr. Sarani Ghosal Mondal' },
        { id: 'secB-t4', day: 'Tuesday', startTime: '12:00', endTime: '12:55', slotName: 'Slot G', courseCode: 'FREE', room: 'LH 02', isFree: true },
        { id: 'secB-tl', day: 'Tuesday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        {
          id: 'secB-t5',
          day: 'Tuesday',
          startTime: '14:00',
          endTime: '16:55',
          slotName: 'LAB 4 (B1) / LAB 3 (B2)',
          courseCode: 'CS101',
          room: 'Computing / Electrical Lab',
          isLab: true,
          labOptions: {
            batch1: { code: 'CS101', name: 'Computer Programming Lab (B1)', faculty: 'Contract Faculty 1 (CF1)', room: 'Computing Lab' },
            batch2: { code: 'EE101', name: 'Basics of Electrical Engg Lab (B2)', faculty: 'Ms. Shefali Painuli (SP)', room: 'Electrical Lab' }
          },
          notes: 'Batch B1: CS101 (CF1) | Batch B2: EE101 (SP)'
        },
      ],
      Wednesday: [
        { id: 'secB-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:55', slotName: 'Slot B', courseCode: 'CS100', room: 'LH 02 (43/44)', notes: 'Dr. Keshavamurthy B N (KBN)' },
        { id: 'secB-w2', day: 'Wednesday', startTime: '10:00', endTime: '10:55', slotName: 'Slot C', courseCode: 'ME100', room: 'LH 02 (43/44)', notes: 'Dr. Sanjeev Singh (SS)' },
        { id: 'secB-w3', day: 'Wednesday', startTime: '11:00', endTime: '11:55', slotName: 'Slot D', courseCode: 'EE100', room: 'LH 02 (43/44)', notes: 'Dr. Amol D Rahulkar (ADR)' },
        { id: 'secB-w4', day: 'Wednesday', startTime: '12:00', endTime: '12:55', slotName: 'Slot E', courseCode: 'MA100', room: 'LH 02 (43/44)', notes: 'Dr. Ragoju Ravi (RR)' },
        { id: 'secB-wl', day: 'Wednesday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        {
          id: 'secB-w5',
          day: 'Wednesday',
          startTime: '14:00',
          endTime: '16:55',
          slotName: 'LAB 1 (B1) / LAB 2 (B2)',
          courseCode: 'PH101',
          room: 'Physics / Drawing Hall (33/38)',
          isLab: true,
          labOptions: {
            batch1: { code: 'PH101', name: 'Engineering Physics Lab (B1)', faculty: 'Dr. Karuna Umakant Korgaonkar (KUK)', room: 'Physics Lab' },
            batch2: { code: 'ME101', name: 'Engineering Drawing (B2)', faculty: 'Dr. Srikumar Warrier (SW)', room: 'Drawing Hall (33/38)' }
          },
          notes: 'Batch B1: PH101 (Dr. KUK) | Batch B2: ME101 (Dr. SW)'
        },
      ],
      Thursday: [
        { id: 'secB-th1', day: 'Thursday', startTime: '09:00', endTime: '09:55', slotName: 'Slot F', courseCode: 'PH100', room: 'LH 02 (43/44)', notes: 'Dr. Saidi Reddy Parne (SRP)' },
        { id: 'secB-th2', day: 'Thursday', startTime: '10:00', endTime: '10:55', slotName: 'Slot A', courseCode: 'CS100', room: 'LH 02 (43/44)', notes: 'Dr. Keshavamurthy B N (KBN)' },
        { id: 'secB-th3', day: 'Thursday', startTime: '11:00', endTime: '11:55', slotName: 'Slot B', courseCode: 'ME101', room: 'LH 02 (43/44)', notes: 'ME101: CV/SW' },
        { id: 'secB-th4', day: 'Thursday', startTime: '12:00', endTime: '12:55', slotName: 'Slot H', courseCode: 'FREE', room: 'LH 02', isFree: true },
        { id: 'secB-thl', day: 'Thursday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        {
          id: 'secB-th5',
          day: 'Thursday',
          startTime: '14:00',
          endTime: '16:55',
          slotName: 'LAB 2 (B1) / LAB 1 (B2)',
          courseCode: 'ME101',
          room: 'Drawing Hall (33/38) / Physics Lab',
          isLab: true,
          labOptions: {
            batch1: { code: 'ME101', name: 'Engineering Drawing (B1)', faculty: 'Dr. Chaitanya Vundru (CV)', room: 'Drawing Hall (33/38)' },
            batch2: { code: 'PH101', name: 'Engineering Physics Lab (B2)', faculty: 'Dr. Karuna Umakant Korgaonkar (KUK)', room: 'Physics Lab' }
          },
          notes: 'Batch B1: ME101 (Dr. CV) | Batch B2: PH101 (Dr. KUK)'
        },
      ],
      Friday: [
        { id: 'secB-f1', day: 'Friday', startTime: '09:00', endTime: '09:55', slotName: 'Slot C', courseCode: 'ME100', room: 'LH 02 (43/44)', notes: 'Dr. Sanjeev Singh (SS)' },
        { id: 'secB-f2', day: 'Friday', startTime: '10:00', endTime: '10:55', slotName: 'Slot D', courseCode: 'EE100', room: 'LH 02 (43/44)', notes: 'Dr. Amol D Rahulkar (ADR)' },
        { id: 'secB-f3', day: 'Friday', startTime: '11:00', endTime: '11:55', slotName: 'Slot E', courseCode: 'MA100', room: 'LH 02 (43/44)', notes: 'Dr. Ragoju Ravi (RR)' },
        { id: 'secB-f4', day: 'Friday', startTime: '12:00', endTime: '12:55', slotName: 'Slot F', courseCode: 'PH100', room: 'LH 02 (43/44)', notes: 'Dr. Saidi Reddy Parne (SRP)' },
        { id: 'secB-fl', day: 'Friday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        { id: 'secB-f5', day: 'Friday', startTime: '14:00', endTime: '16:55', slotName: 'Library & Review Session', courseCode: 'FREE', room: 'Central Library', isFree: true },
      ],
      Saturday: [
        { id: 'secB-sat1', day: 'Saturday', startTime: '09:00', endTime: '10:55', slotName: 'Calculus & Mechanics Clinic', courseCode: 'MA100', room: 'LH 02 (43/44)' },
        { id: 'secB-sat2', day: 'Saturday', startTime: '11:00', endTime: '12:55', slotName: 'C Coding & EE Fundamentals Practice', courseCode: 'CS100', room: 'Computing Center' },
        { id: 'secB-satl', day: 'Saturday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        { id: 'secB-sat3', day: 'Saturday', startTime: '14:00', endTime: '16:55', slotName: 'Campus Activities & Societies', courseCode: 'FREE', room: 'SAC', isFree: true },
      ],
      Sunday: [
        { id: 'secB-sun1', day: 'Sunday', startTime: '09:00', endTime: '12:55', slotName: 'Central Library Self-Study', courseCode: 'FREE', room: 'Central Library', isFree: true },
        { id: 'secB-sunl', day: 'Sunday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        { id: 'secB-sun2', day: 'Sunday', startTime: '14:00', endTime: '16:55', slotName: 'Campus Sports & Fitness Drills', courseCode: 'FREE', room: 'SAC Ground', isFree: true },
      ],
    };
  }

  if (section === 'C') {
    return {
      Monday: [
        { id: 'secC-m1', day: 'Monday', startTime: '09:00', endTime: '09:55', slotName: 'Slot A', courseCode: 'CY150', room: 'LH 03 (40/41)', notes: 'Dr. Velavan Kathirvelu (VK)' },
        { id: 'secC-m2', day: 'Monday', startTime: '10:00', endTime: '10:55', slotName: 'Slot B', courseCode: 'MA100', room: 'LH 03 (40/41)', notes: 'Dr. L. Shangerganesh (LSG)' },
        { id: 'secC-m3', day: 'Monday', startTime: '11:00', endTime: '11:55', slotName: 'Slot C', courseCode: 'ME150', room: 'LH 03 (40/41)', notes: 'Dr. Prasenjit Dey (PD)' },
        { id: 'secC-m4', day: 'Monday', startTime: '12:00', endTime: '12:55', slotName: 'Physical Education Slot', courseCode: 'PE150', room: 'LH 03 (40/41)', notes: 'Mr. Akhilesh Maravi (AM)' },
        { id: 'secC-ml', day: 'Monday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        {
          id: 'secC-m5',
          day: 'Monday',
          startTime: '14:00',
          endTime: '16:55',
          slotName: 'LAB 1 (C1) / LAB 2 (C2)',
          courseCode: 'CY151',
          room: 'Chemistry / Workshop Complex',
          isLab: true,
          labOptions: {
            batch1: { code: 'CY151', name: 'Engineering Chemistry Lab (C1)', faculty: 'Dr. Lasitha P (LP)', room: 'Chemistry Lab' },
            batch2: { code: 'ME151', name: 'Workshop Practices (C2)', faculty: 'Dr. Prasenjit Dey / Dr. Srikumar Warrier (PD/SW)', room: 'Workshop Complex' }
          },
          notes: 'Batch C1: CY151 (Dr. LP) | Batch C2: ME151 (Dr. PD/SW)'
        },
        { id: 'secC-m6', day: 'Monday', startTime: '17:00', endTime: '17:55', slotName: 'Physical Education Ground', courseCode: 'PE150', room: 'SAC Ground', notes: 'PE Drills' },
      ],
      Tuesday: [
        { id: 'secC-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:55', slotName: 'Slot E', courseCode: 'HU150', room: 'LH 03 (40/41)', notes: 'Professional Communication: Dr. Unais K T' },
        { id: 'secC-t2', day: 'Tuesday', startTime: '10:00', endTime: '10:55', slotName: 'Slot F', courseCode: 'EC150', room: 'LH 03 (40/41)', notes: 'Dr. Lalat Indu Giri (LIG)' },
        { id: 'secC-t3', day: 'Tuesday', startTime: '11:00', endTime: '11:55', slotName: 'Slot A', courseCode: 'CY150', room: 'LH 03 (40/41)', notes: 'Dr. Velavan Kathirvelu (VK)' },
        { id: 'secC-t4', day: 'Tuesday', startTime: '12:00', endTime: '12:55', slotName: 'Minor Slot (G)', courseCode: 'MA400M', room: 'LH 03 (40/41)', notes: 'Optimization: Dr. RPJ' },
        { id: 'secC-tl', day: 'Tuesday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        {
          id: 'secC-t5',
          day: 'Tuesday',
          startTime: '14:00',
          endTime: '16:55',
          slotName: 'LAB 2 (C1) / LAB 1 (C2)',
          courseCode: 'ME151',
          room: 'Workshop Complex / Chemistry Lab',
          isLab: true,
          labOptions: {
            batch1: { code: 'ME151', name: 'Workshop Practices (C1)', faculty: 'Dr. Prasenjit Dey / Dr. Sanjeev Singh (PD/DSS)', room: 'Workshop Complex' },
            batch2: { code: 'CY151', name: 'Engineering Chemistry Lab (C2)', faculty: 'Dr. Lasitha P (LP)', room: 'Chemistry Lab' }
          },
          notes: 'Batch C1: ME151 (Dr. PD/DSS) | Batch C2: CY151 (Dr. LP)'
        },
      ],
      Wednesday: [
        { id: 'secC-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:55', slotName: 'Slot B', courseCode: 'MA100', room: 'LH 03 (40/41)', notes: 'Dr. L. Shangerganesh (LSG)' },
        { id: 'secC-w2', day: 'Wednesday', startTime: '10:00', endTime: '10:55', slotName: 'Slot C', courseCode: 'ME150', room: 'LH 03 (40/41)', notes: 'Dr. Prasenjit Dey (PD)' },
        { id: 'secC-w3', day: 'Wednesday', startTime: '11:00', endTime: '11:55', slotName: 'Slot E', courseCode: 'HU150', room: 'LH 03 (40/41)', notes: 'Dr. Unais K T' },
        { id: 'secC-w4', day: 'Wednesday', startTime: '12:00', endTime: '12:55', slotName: 'Slot E', courseCode: 'FREE', room: 'LH 03', isFree: true },
        { id: 'secC-wl', day: 'Wednesday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        {
          id: 'secC-w5',
          day: 'Wednesday',
          startTime: '14:00',
          endTime: '16:55',
          slotName: 'LAB 3 (C1) / LAB 4 (C2)',
          courseCode: 'EC151',
          room: 'Electronics / Language Lab',
          isLab: true,
          labOptions: {
            batch1: { code: 'EC151', name: 'Basics of Electronics Engg Lab (C1)', faculty: 'Dr. Lalat Indu Giri (LIG)', room: 'Electronics Lab' },
            batch2: { code: 'HU150', name: 'Professional Communication Lab (C2)', faculty: 'Dr. Unais K T (UKT)', room: 'Language Lab' }
          },
          notes: 'Batch C1: EC151 (Dr. LIG) | Batch C2: HU150 (Dr. UKT)'
        },
        { id: 'secC-w6', day: 'Wednesday', startTime: '17:00', endTime: '17:55', slotName: 'Physical Education Ground', courseCode: 'PE150', room: 'SAC Ground' },
      ],
      Thursday: [
        { id: 'secC-th1', day: 'Thursday', startTime: '09:00', endTime: '09:55', slotName: 'Slot F', courseCode: 'FREE', room: 'LH 03', isFree: true },
        { id: 'secC-th2', day: 'Thursday', startTime: '10:00', endTime: '10:55', slotName: 'Slot A', courseCode: 'CY150', room: 'LH 03 (40/41)', notes: 'Dr. Velavan Kathirvelu (VK)' },
        { id: 'secC-th3', day: 'Thursday', startTime: '11:00', endTime: '11:55', slotName: 'Slot B', courseCode: 'MA100', room: 'LH 03 (40/41)', notes: 'Dr. L. Shangerganesh (LSG)' },
        { id: 'secC-th4', day: 'Thursday', startTime: '12:00', endTime: '12:55', slotName: 'Slot H', courseCode: 'FREE', room: 'LH 03', isFree: true },
        { id: 'secC-thl', day: 'Thursday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        {
          id: 'secC-th5',
          day: 'Thursday',
          startTime: '14:00',
          endTime: '16:55',
          slotName: 'LAB 4 (C1) / LAB 3 (C2)',
          courseCode: 'HU150',
          room: 'Language / Electronics Lab',
          isLab: true,
          labOptions: {
            batch1: { code: 'HU150', name: 'Professional Communication Lab (C1)', faculty: 'Dr. Unais K T (UKT)', room: 'Language Lab' },
            batch2: { code: 'EC151', name: 'Basics of Electronics Engg Lab (C2)', faculty: 'Dr. Lalat Indu Giri (LIG)', room: 'Electronics Lab' }
          },
          notes: 'Batch C1: HU150 (Dr. UKT) | Batch C2: EC151 (Dr. LIG)'
        },
      ],
      Friday: [
        { id: 'secC-f1', day: 'Friday', startTime: '09:00', endTime: '09:55', slotName: 'Slot C', courseCode: 'ME150', room: 'LH 03 (40/41)', notes: 'Dr. Prasenjit Dey (PD)' },
        { id: 'secC-f2', day: 'Friday', startTime: '10:00', endTime: '10:55', slotName: 'Slot D', courseCode: 'FREE', room: 'LH 03', isFree: true },
        { id: 'secC-f3', day: 'Friday', startTime: '11:00', endTime: '11:55', slotName: 'Slot E', courseCode: 'MA100', room: 'LH 03 (40/41)', notes: 'MA100 Tutorial: Dr. LSG' },
        { id: 'secC-f4', day: 'Friday', startTime: '12:00', endTime: '12:55', slotName: 'Slot F', courseCode: 'EC150', room: 'LH 03 (40/41)', notes: 'Dr. Lalat Indu Giri (LIG)' },
        { id: 'secC-fl', day: 'Friday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        { id: 'secC-f5', day: 'Friday', startTime: '15:00', endTime: '15:55', slotName: 'Health & Happiness', courseCode: 'HU151', room: 'LH 03 (40/41)', notes: 'Dr. Madhavilata Upendra Dixit' },
        { id: 'secC-f6', day: 'Friday', startTime: '16:00', endTime: '16:55', slotName: 'Library & Reading Room', courseCode: 'FREE', room: 'Central Library', isFree: true },
      ],
      Saturday: [
        { id: 'secC-sat1', day: 'Saturday', startTime: '09:00', endTime: '10:55', slotName: 'Advanced Calculus Problem Session', courseCode: 'MA100', room: 'LH 03 (40/41)' },
        { id: 'secC-sat2', day: 'Saturday', startTime: '11:00', endTime: '12:55', slotName: 'Chemistry & Electronics Clinic', courseCode: 'CY150', room: 'Science Block' },
        { id: 'secC-satl', day: 'Saturday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        { id: 'secC-sat3', day: 'Saturday', startTime: '14:00', endTime: '16:55', slotName: 'Clubs & Technical Society Activities', courseCode: 'FREE', room: 'SAC', isFree: true },
      ],
      Sunday: [
        { id: 'secC-sun1', day: 'Sunday', startTime: '09:00', endTime: '12:55', slotName: 'Central Library Self-Study', courseCode: 'FREE', room: 'Central Library', isFree: true },
        { id: 'secC-sunl', day: 'Sunday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
        { id: 'secC-sun2', day: 'Sunday', startTime: '14:00', endTime: '16:55', slotName: 'Sports Drills & Health Fitness', courseCode: 'FREE', room: 'SAC Ground', isFree: true },
      ],
    };
  }

  // Section D
  return {
    Monday: [
      { id: 'secD-m1', day: 'Monday', startTime: '09:00', endTime: '09:55', slotName: 'Slot A', courseCode: 'FREE', room: 'LH 04 (27/28)', isFree: true },
      { id: 'secD-m2', day: 'Monday', startTime: '10:00', endTime: '10:55', slotName: 'Slot B', courseCode: 'ME150', room: 'LH 04 (27/28)', notes: 'Dr. Samar Singhal (SS)' },
      { id: 'secD-m3', day: 'Monday', startTime: '11:00', endTime: '11:55', slotName: 'Slot C', courseCode: 'MA100', room: 'LH 04 (27/28)', notes: 'Dr. Ravi Prasad K. J. (RPJ)' },
      { id: 'secD-m4', day: 'Monday', startTime: '12:00', endTime: '12:55', slotName: 'Slot D', courseCode: 'HU150', room: 'LH 04 (27/28)', notes: 'Dr. Sarani Ghosal Mondal (SGM)' },
      { id: 'secD-ml', day: 'Monday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      {
        id: 'secD-m5',
        day: 'Monday',
        startTime: '14:00',
        endTime: '16:55',
        slotName: 'LAB 3 (D1) / LAB 4 (D2)',
        courseCode: 'EC151',
        room: 'Electronics / Language Lab',
        isLab: true,
        labOptions: {
          batch1: { code: 'EC151', name: 'Basics of Electronics Engg Lab (D1)', faculty: 'Dr. Trilochan Panigrahi (TP)', room: 'Electronics Lab' },
          batch2: { code: 'HU150', name: 'Professional Communication Lab (D2)', faculty: 'Dr. Sarani Ghosal Mondal (SGM)', room: 'Language Lab' }
        },
        notes: 'Batch D1: EC151 (Dr. TP) | Batch D2: HU150 (Dr. SGM)'
      },
    ],
    Tuesday: [
      { id: 'secD-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:55', slotName: 'Slot E', courseCode: 'CY150', room: 'LH 04 (27/28)', notes: 'Dr Lasitha P (LP)' },
      { id: 'secD-t2', day: 'Tuesday', startTime: '10:00', endTime: '10:55', slotName: 'Slot F', courseCode: 'FREE', room: 'LH 04', isFree: true },
      { id: 'secD-t3', day: 'Tuesday', startTime: '11:00', endTime: '11:55', slotName: 'Slot A', courseCode: 'ME150', room: 'LH 04 (27/28)', notes: 'Dr. Samar Singhal (SS)' },
      { id: 'secD-t4', day: 'Tuesday', startTime: '12:00', endTime: '12:55', slotName: 'Physical Education Slot', courseCode: 'PE150', room: 'LH 04 (27/28)', notes: 'Mr. Akhilesh Maravi (AM)' },
      { id: 'secD-tl', day: 'Tuesday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      {
        id: 'secD-t5',
        day: 'Tuesday',
        startTime: '14:00',
        endTime: '16:55',
        slotName: 'LAB 4 (D1) / LAB 3 (D2)',
        courseCode: 'HU150',
        room: 'Language / Electronics Lab',
        isLab: true,
        labOptions: {
          batch1: { code: 'HU150', name: 'Professional Communication Lab (D1)', faculty: 'Dr. Sarani Ghosal Mondal (SGM)', room: 'Language Lab' },
          batch2: { code: 'EC151', name: 'Basics of Electronics Engg Lab (D2)', faculty: 'Dr. Trilochan Panigrahi (TP)', room: 'Electronics Lab' }
        },
        notes: 'Batch D1: HU150 (Dr. SGM) | Batch D2: EC151 (Dr. TP)'
      },
    ],
    Wednesday: [
      { id: 'secD-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:55', slotName: 'Slot B', courseCode: 'MA100', room: 'LH 04 (27/28)', notes: 'Dr. Ravi Prasad K. J. (RPJ)' },
      { id: 'secD-w2', day: 'Wednesday', startTime: '10:00', endTime: '10:55', slotName: 'Slot C', courseCode: 'HU150', room: 'LH 04 (27/28)', notes: 'Dr. Sarani Ghosal Mondal (SGM)' },
      { id: 'secD-w3', day: 'Wednesday', startTime: '11:00', endTime: '11:55', slotName: 'Slot D', courseCode: 'EC150', room: 'LH 04 (27/28)', notes: 'Dr. Lalat Indu Giri (LIG)' },
      { id: 'secD-w4', day: 'Wednesday', startTime: '12:00', endTime: '12:55', slotName: 'Slot E', courseCode: 'CY150', room: 'LH 04 (27/28)', notes: 'Dr Lasitha P (LP)' },
      { id: 'secD-wl', day: 'Wednesday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      {
        id: 'secD-w5',
        day: 'Wednesday',
        startTime: '14:00',
        endTime: '16:55',
        slotName: 'LAB 1 (D1) / LAB 2 (D2)',
        courseCode: 'CY151',
        room: 'Chemistry / Workshop Complex',
        isLab: true,
        labOptions: {
          batch1: { code: 'CY151', name: 'Engineering Chemistry Lab (D1)', faculty: 'Dr. Lasitha P (LP)', room: 'Chemistry Lab' },
          batch2: { code: 'ME151', name: 'Workshop Practices (D2)', faculty: 'Dr. Aniruddha Samanta / Dr. Gurkirat Singh (AS/GS)', room: 'Workshop Complex' }
        },
        notes: 'Batch D1: CY151 (Dr. LP) | Batch D2: ME151 (Dr. AS/GS)'
      },
    ],
    Thursday: [
      { id: 'secD-th1', day: 'Thursday', startTime: '09:00', endTime: '09:55', slotName: 'Slot F', courseCode: 'ME150', room: 'LH 04 (27/28)', notes: 'Dr. Samar Singhal (SS)' },
      { id: 'secD-th2', day: 'Thursday', startTime: '10:00', endTime: '10:55', slotName: 'Slot A', courseCode: 'FREE', room: 'LH 04', isFree: true },
      { id: 'secD-th3', day: 'Thursday', startTime: '11:00', endTime: '11:55', slotName: 'Slot B', courseCode: 'MA100', room: 'LH 04 (27/28)', notes: 'Dr. Ravi Prasad K. J. (RPJ)' },
      { id: 'secD-th4', day: 'Thursday', startTime: '12:00', endTime: '12:55', slotName: 'Slot H', courseCode: 'FREE', room: 'LH 04', isFree: true },
      { id: 'secD-thl', day: 'Thursday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      {
        id: 'secD-th5',
        day: 'Thursday',
        startTime: '14:00',
        endTime: '16:55',
        slotName: 'LAB 2 (D1) / LAB 1 (D2)',
        courseCode: 'ME151',
        room: 'Workshop Complex / Chemistry Lab',
        isLab: true,
        labOptions: {
          batch1: { code: 'ME151', name: 'Workshop Practices (D1)', faculty: 'Dr. Aniruddha Samanta / Dr. Siba Prasad Choudhury (AS/SPC)', room: 'Workshop Complex' },
          batch2: { code: 'CY151', name: 'Engineering Chemistry Lab (D2)', faculty: 'Dr. Lasitha P (LP)', room: 'Chemistry Lab' }
        },
        notes: 'Batch D1: ME151 (Dr. AS/SPC) | Batch D2: CY151 (Dr. LP)'
      },
      { id: 'secD-th6', day: 'Thursday', startTime: '17:00', endTime: '17:55', slotName: 'Physical Education Ground', courseCode: 'PE150', room: 'SAC Ground' },
    ],
    Friday: [
      { id: 'secD-f1', day: 'Friday', startTime: '09:00', endTime: '09:55', slotName: 'Slot C', courseCode: 'FREE', room: 'LH 04', isFree: true },
      { id: 'secD-f2', day: 'Friday', startTime: '10:00', endTime: '10:55', slotName: 'Slot D', courseCode: 'EC150', room: 'LH 04 (27/28)', notes: 'Dr. Lalat Indu Giri (LIG)' },
      { id: 'secD-f3', day: 'Friday', startTime: '11:00', endTime: '11:55', slotName: 'Slot E', courseCode: 'CY150', room: 'LH 04 (27/28)', notes: 'Dr Lasitha P (LP)' },
      { id: 'secD-f4', day: 'Friday', startTime: '12:00', endTime: '12:55', slotName: 'Slot F', courseCode: 'MA100', room: 'LH 04 (27/28)', notes: 'MA100 Tutorial: Dr. RPJ' },
      { id: 'secD-fl', day: 'Friday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      { id: 'secD-f5', day: 'Friday', startTime: '14:00', endTime: '15:55', slotName: 'Self-Study & Review', courseCode: 'FREE', room: 'Central Library', isFree: true },
      { id: 'secD-f6', day: 'Friday', startTime: '16:00', endTime: '16:55', slotName: 'Health & Happiness', courseCode: 'HU151', room: 'LH 04 (27/28)', notes: 'Dr. Madhavilata Upendra Dixit' },
    ],
    Saturday: [
      { id: 'secD-sat1', day: 'Saturday', startTime: '09:00', endTime: '10:55', slotName: 'Calculus & Mechanical Analysis Clinic', courseCode: 'MA100', room: 'LH 04 (27/28)' },
      { id: 'secD-sat2', day: 'Saturday', startTime: '11:00', endTime: '12:55', slotName: 'Chemistry & Communication Practice', courseCode: 'CY150', room: 'Science Block' },
      { id: 'secD-satl', day: 'Saturday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      { id: 'secD-sat3', day: 'Saturday', startTime: '14:00', endTime: '16:55', slotName: 'Campus Activities & Sports Club', courseCode: 'FREE', room: 'SAC', isFree: true },
    ],
    Sunday: [
      { id: 'secD-sun1', day: 'Sunday', startTime: '09:00', endTime: '12:55', slotName: 'Central Library Self-Study', courseCode: 'FREE', room: 'Central Library', isFree: true },
      { id: 'secD-sunl', day: 'Sunday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      { id: 'secD-sun2', day: 'Sunday', startTime: '14:00', endTime: '16:55', slotName: 'Outdoor Sports & Conditioning', courseCode: 'FREE', room: 'SAC Ground', isFree: true },
    ],
  };
}

export function getSectionCycle(section: FirstYearSection): 'Physics Cycle' | 'Chemistry Cycle' {
  return section === 'A' || section === 'B' ? 'Physics Cycle' : 'Chemistry Cycle';
}

export function getFirstYearData(section: FirstYearSection, semester: number = 1): SemesterData {
  // In Sem 1 (Odd Term July-Dec 2026):
  // Sec A & B are Physics Cycle
  // Sec C & D are Chemistry Cycle
  const isPhysCycle = semester === 1 ? (section === 'A' || section === 'B') : (section === 'C' || section === 'D');
  const courses = isPhysCycle ? PHYSICS_CYCLE_COURSES : CHEMISTRY_CYCLE_COURSES;
  const schedule = getSectionSchedule(section);

  return { courses, schedule };
}

// Fallback aliases for generic 1st-year references
export const COMMON_1: SemesterData = getFirstYearData('A', 1);
export const COMMON_2: SemesterData = getFirstYearData('C', 2);
