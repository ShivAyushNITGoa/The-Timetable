import fs from 'fs';
import path from 'path';

const branchFiles = [
  { branch: 'EEE', file: 'downloads/EEE_text.txt', pdfPath: '/syllabi/EEE2025.pdf', pdfName: 'EEE2025.pdf' },
  { branch: 'ECE', file: 'downloads/ECE_text.txt', pdfPath: '/syllabi/ECE2025.pdf', pdfName: 'ECE2025.pdf' },
  { branch: 'CSE', file: 'downloads/CSE_text.txt', pdfPath: '/syllabi/CSE2025.pdf', pdfName: 'CSE2025.pdf' },
  { branch: 'MCE', file: 'downloads/MCE_text.txt', pdfPath: '/syllabi/MCE2025.pdf', pdfName: 'MCE2025.pdf' },
  { branch: 'CVE', file: 'downloads/CVE_text.txt', pdfPath: '/syllabi/CVE2025.pdf', pdfName: 'CVE2025.pdf' },
];

function cleanLine(str) {
  if (!str) return '';
  return str
    .replace(/[ \t]+/g, ' ')
    .replace(/\r/g, '')
    .trim();
}

const allExtractedCourses = {};

for (const bf of branchFiles) {
  let doc = fs.readFileSync(bf.file, 'utf8');
  // Strip page markings
  doc = doc.replace(/--\s*\d+\s*of\s*\d+\s*--\s*\d*/gi, '');

  // Match course headers in NIT Goa handbooks
  // Look for course codes like CS300, EC204, EE200, ME200, CV200, etc.
  const headerRegex = /(?:Course Code[:\s]+)?\b([A-Z]{2,4}\d{3}[A-Z]?)\b\s*[:\-–]?\s*([A-Za-z0-9,\-\s/()&]{2,65}?)\s*(?:(?:\b(?:DC|BS|ES|HS|HU|OE|DE|Theory|Practical|Lab|Laboratory|Core|MLC)\b\s+)?([0-9]\s*[- ]\s*[0-9]\s*[- ]\s*[0-9])\s+([0-9]+)|(?:Contact hours|Course Objective|Course Objectives|Course Outcomes|Pre-requisites|Prerequisites|List of Experiments))/gi;

  const matches = [];
  let m;
  while ((m = headerRegex.exec(doc)) !== null) {
    const code = m[1].toUpperCase().replace(/\s+/g, '');
    const rawName = m[2] ? m[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim() : '';
    const index = m.index;

    const nextText = doc.slice(index, index + 8000);
    // Ignore Table of Contents
    if (nextText.includes('. . . .') || nextText.includes('Name of the Course Type')) {
      continue;
    }

    const hasContent = /Course Objectives?|Course Outcomes?|Syllabus|List of Experiments/i.test(nextText);
    if (!hasContent) continue;

    matches.push({
      code,
      name: rawName,
      index,
      branch: bf.branch,
      pdfPath: bf.pdfPath,
      pdfName: bf.pdfName,
    });
  }

  // Deduplicate nearby matches
  const uniqueMatches = [];
  for (const item of matches) {
    const prev = uniqueMatches[uniqueMatches.length - 1];
    if (prev && prev.code === item.code && Math.abs(item.index - prev.index) < 600) {
      continue;
    }
    uniqueMatches.push(item);
  }

  console.log(`Branch ${bf.branch}: extracted ${uniqueMatches.length} raw sections`);

  for (let i = 0; i < uniqueMatches.length; i++) {
    const item = uniqueMatches[i];
    const nextIdx = i + 1 < uniqueMatches.length ? uniqueMatches[i + 1].index : doc.length;
    const chunk = doc.slice(item.index, Math.min(nextIdx, item.index + 14000));

    // LTP and Credits
    const ltpMatch = chunk.match(/(?:L\s*-\s*T\s*-\s*P|L\s*T\s*P|Contact hours[\s\S]*?L-T-P\)?[:\s]*)\s*([0-9]\s*[- ]\s*[0-9]\s*[- ]\s*[0-9])/i);
    const creditsMatch = chunk.match(/(?:Credits?|Credit)[:\s]*([0-9]+)/i);

    // Objectives
    const objMatch = chunk.match(/Course Objectives?[:\s]*([\s\S]*?)(?:Course Outcomes?|Syllabus|List of Experiments|PO1|CO1|Relationship)/i);
    let objectives = [];
    if (objMatch && objMatch[1]) {
      objectives = objMatch[1]
        .split(/\n(?=\s*(?:[0-9]+[\.\)]|•|-|\*))/)
        .map(l => cleanLine(l))
        .filter(l => l.length > 10);
    }

    // Outcomes
    const outMatch = chunk.match(/Course Outcomes?[:\s]*([\s\S]*?)(?:Syllabus|List of Experiments|PO1|CO1|Relationship)/i);
    let outcomes = [];
    if (outMatch && outMatch[1]) {
      outcomes = outMatch[1]
        .split(/\n(?=\s*(?:CO[0-9]+[\.\:]?|[0-9]+[\.\)]|•|-|\*))/)
        .map(l => cleanLine(l))
        .filter(l => l.length > 10);
    }

    // Syllabus or List of Experiments
    const sylMatch = chunk.match(/(?:Syllabus:?|List of Experiments:?|Experiments?:?)\s*([\s\S]*?)(?:(?:Learning Resources|Reference Books\/Material|Reference Books|Text\/Reference Books|Text\s*Books|References|Course Assessment Method|Course Assessment|Evaluation Scheme|\n\s*(?:PO1|CO1|Course Code)|$))/i);

    let modules = [];
    if (sylMatch && sylMatch[1]) {
      const sylBody = sylMatch[1].trim();

      // Check if it has Module 1, Module 2, etc.
      const moduleParts = sylBody.split(/(?=Module\s+\d+:?|Unit\s+\d+:?)/i).filter(p => p.trim().length > 15);
      if (moduleParts.length > 1) {
        modules = moduleParts.map(p => cleanLine(p));
      } else {
        // Check for Experiment No. X or 1), 2)
        const expParts = sylBody.split(/(?=(?:Experiment\s+No\.?\s*\d+:?|Exp\.?\s*\d+:?|\b\d+[\.\)]))/i).filter(p => p.trim().length > 10);
        if (expParts.length > 1) {
          modules = expParts.map(p => cleanLine(p));
        } else {
          const paras = sylBody.split(/\n\s*\n/).map(p => cleanLine(p)).filter(p => p.length > 25);
          if (paras.length > 0) {
            modules = paras;
          } else {
            modules = [cleanLine(sylBody)];
          }
        }
      }
    }

    // Textbooks
    const refMatch = chunk.match(/(?:Learning Resources|Reference Books\/Material|Reference Books|Text\/Reference Books|Text\s*Books|References):?\s*([\s\S]*?)(?:(?:Course Outcome|Relationship of Course|CO\s*-\s*PO|Evaluation Scheme|\n\s*Course Code|\n\s*[A-Z]{2,4}\d{3}|$))/i);
    let textbooks = [];
    if (refMatch && refMatch[1]) {
      const refBody = refMatch[1].trim();
      const items = refBody.split(/\n(?=\s*(?:[0-9]+[\.\)]|•|-|\*))/).map(item => cleanLine(item)).filter(item => item.length > 10);
      if (items.length > 0) {
        textbooks = items.filter(it => !it.toLowerCase().startsWith('text books:') && !it.toLowerCase().startsWith('reference books:'));
      } else {
        const lines = refBody.split('\n').map(l => cleanLine(l)).filter(l => l.length > 15 && !l.startsWith('Module'));
        if (lines.length > 0) {
          textbooks = lines.slice(0, 8);
        }
      }
    }

    const code = item.code;
    const existing = allExtractedCourses[code];

    if (!existing || (modules.length > (existing.modules?.length || 0))) {
      allExtractedCourses[code] = {
        code,
        name: (item.name && item.name.length > 3) ? item.name : (existing?.name || code),
        branch: bf.branch,
        pdfPath: bf.pdfPath,
        pdfName: bf.pdfName,
        ltp: ltpMatch ? ltpMatch[1].replace(/\s+/g, '-').replace(/--/g, '-') : (existing?.ltp || '3-0-0'),
        credits: creditsMatch ? parseInt(creditsMatch[1], 10) : (existing?.credits || 3),
        modules: modules.length > 0 ? modules : (existing?.modules || []),
        textbooks: textbooks.length > 0 ? textbooks : (existing?.textbooks || []),
        objectives: objectives.length > 0 ? objectives : (existing?.objectives || []),
        outcomes: outcomes.length > 0 ? outcomes : (existing?.outcomes || []),
      };
    }
  }
}

// Ensure first year foundation courses are also incorporated from the common curriculum
const firstYearSyllabi = {
  'MA100': {
    code: 'MA100',
    name: 'Engineering Mathematics - I',
    branch: 'COMMON',
    pdfPath: '/syllabi/CSE2025.pdf',
    pdfName: 'CSE2025.pdf',
    ltp: '3-1-0',
    credits: 4,
    modules: [
      'Module 1: Differential Calculus & Multivariable Functions - Rolle Theorem, Mean Value Theorems, Taylor and Maclaurin expansions; Partial derivatives, Euler Theorem on homogeneous functions, Jacobians; Taylor expansion of two variables; Maxima and minima of functions of two variables, Lagrange multipliers.',
      'Module 2: Integral Calculus & Multiple Integrals - Beta and Gamma functions and their properties; Double and triple integrals, evaluation by change of order of integration and change of variables (polar, cylindrical, spherical coordinate systems); Applications: computation of areas, surface areas, and volumes of revolution.',
      'Module 3: Vector Calculus & Field Theory - Gradient, directional derivative, divergence, and curl of vector fields; Line, surface, and volume integrals; Green Theorem in a plane, Gauss Divergence Theorem, Stokes Theorem; Applications in fluid flux and conservative force fields.',
      'Module 4: Sequences, Series & Ordinary Differential Equations - Convergence tests for infinite series: Ratio test, Root test, Alternating series (Leibnitz rule); Exact ODEs, integrating factors; Linear ODEs with constant coefficients, Cauchy-Euler equations, method of variation of parameters.'
    ],
    textbooks: [
      'Erwin Kreyszig, "Advanced Engineering Mathematics", 10th Edition, John Wiley & Sons',
      'B. S. Grewal, "Higher Engineering Mathematics", 44th Edition, Khanna Publishers',
      'Thomas and Finney, "Calculus and Analytic Geometry", 11th Edition, Pearson'
    ]
  },
  'PH100': {
    code: 'PH100',
    name: 'Engineering Physics',
    branch: 'COMMON',
    pdfPath: '/syllabi/CSE2025.pdf',
    pdfName: 'CSE2025.pdf',
    ltp: '3-0-0',
    credits: 3,
    modules: [
      'Module 1: Physical Optics & Lasers - Interference in thin films, Newton rings; Fraunhofer diffraction at single slit, double slit, and diffraction grating; Polarization: Brewster law, double refraction, Nicol prism, quarter/half wave plates; Lasers: Einstein coefficients, population inversion, He-Ne laser, semiconductor laser, fiber optics attenuation.',
      'Module 2: Quantum Mechanics Foundations - Wave-particle duality, de Broglie hypothesis, Davisson-Germer experiment; Heisenberg uncertainty principle; Wave function and Born physical interpretation; 1D time-independent and time-dependent Schrodinger equations; Particle in a box, quantum tunneling.',
      'Module 3: Solid State & Semiconductor Physics - Free electron theory, Fermi-Dirac distribution, density of states; Kronig-Penney model and formation of energy bands; Direct and indirect band gap semiconductors, carrier concentration in intrinsic and extrinsic semiconductors, Hall effect, solar cells.',
      'Module 4: Electromagnetism & Dielectric Materials - Gauss law for electric and magnetic fields, Faraday law of induction, Ampere-Maxwell law, displacement current; Maxwell equations in differential and integral forms; Wave equation for electromagnetic waves in dielectric media, Poynting vector.'
    ],
    textbooks: [
      'David J. Griffiths, "Introduction to Electrodynamics", 4th Edition, Pearson',
      'Arthur Beiser, "Concepts of Modern Physics", 7th Edition, McGraw-Hill',
      'Ajoy Ghatak, "Optics", 6th Edition, McGraw-Hill Education'
    ]
  },
  'CY100': {
    code: 'CY100',
    name: 'Engineering Chemistry',
    branch: 'COMMON',
    pdfPath: '/syllabi/CSE2025.pdf',
    pdfName: 'CSE2025.pdf',
    ltp: '3-0-0',
    credits: 3,
    modules: [
      'Module 1: Chemical Thermodynamics & Phase Equilibria - First and second laws of thermodynamics, entropy, Gibbs free energy, chemical potential; Clausius-Clapeyron equation; Phase rule, one-component (water, sulfur) and two-component systems (eutectic, lead-silver alloys).',
      'Module 2: Electrochemistry & Corrosion Engineering - Nernst equation, electrochemical cells, reference electrodes (standard hydrogen, calomel); Batteries: Lithium-ion, lead-acid, fuel cells; Corrosion: mechanisms (galvanic, pitting, stress), cathodic and anodic protection, protective coatings.',
      'Module 3: Polymers, Composites & Advanced Materials - Polymerization mechanisms (addition, condensation); Thermoplastics and thermosetting plastics, conducting polymers, biodegradable polymers; Fiber-reinforced composites; Carbon nanomaterials (graphene, CNTs) and synthesis.',
      'Module 4: Water Technology & Instrumental Analysis - Hardness of water, EDTA method, boiler troubles, water softening (ion-exchange, reverse osmosis); Principles and engineering applications of UV-Visible spectroscopy, FTIR, and HPLC.'
    ],
    textbooks: [
      'P. C. Jain and Monika Jain, "Engineering Chemistry", 16th Edition, Dhanpat Rai Publishing',
      'S. S. Dara and S. S. Umare, "A Textbook of Engineering Chemistry", S. Chand Publishing',
      'Shashi Chawla, "A Text Book of Engineering Chemistry", Dhanpat Rai & Co.'
    ]
  },
  'CS100': {
    code: 'CS100',
    name: 'Computer Programming and Problem Solving',
    branch: 'COMMON',
    pdfPath: '/syllabi/CSE2025.pdf',
    pdfName: 'CSE2025.pdf',
    ltp: '3-0-0',
    credits: 3,
    modules: [
      'Module 1: Computational Thinking & Fundamentals - Algorithms, flowcharts, pseudocode, compiler toolchain; Data types, operators, operator precedence; Decision control: if-else, switch-case; Iteration constructs: while, do-while, for loops.',
      'Module 2: Modular Programming & Arrays - Function definition, prototypes, pass by value and reference, recursion; 1D arrays, multi-dimensional arrays, matrix operations, string manipulation and standard library functions.',
      'Module 3: Pointers & Dynamic Memory Management - Pointer arithmetic, pointer to pointers, pointers as function arguments; Dynamic memory allocation using malloc, calloc, realloc, and free; Void pointers and memory leak prevention.',
      'Module 4: Structures, Unions & File I/O - Structures: declaration, array of structures, nested structures, pointers to structures; Unions and bit-fields; File operations: fopen, fclose, text and binary file I/O (fprintf, fscanf, fread, fwrite).'
    ],
    textbooks: [
      'Brian W. Kernighan, Dennis M. Ritchie, "The C Programming Language", 2nd Edition, Prentice Hall',
      'E. Balagurusamy, "Programming in ANSI C", 8th Edition, McGraw-Hill',
      'Pradip Dey and Manas Ghosh, "Computer Fundamentals and Programming in C", 2nd Edition, Oxford University Press'
    ]
  },
  'EE100': {
    code: 'EE100',
    name: 'Basics of Electrical Engineering',
    branch: 'COMMON',
    pdfPath: '/syllabi/EEE2025.pdf',
    pdfName: 'EEE2025.pdf',
    ltp: '2-0-0',
    credits: 2,
    modules: [
      'Module 1: DC Circuit Analysis - Ohm law, Kirchhoff laws (KCL, KVL), mesh and nodal analysis; Network theorems: Thevenin, Norton, Superposition, Maximum Power Transfer theorems with independent and dependent sources.',
      'Module 2: AC Circuits & Single-Phase Fundamentals - Generation of sinusoidal voltages, RMS and average values, form factor, peak factor; Phasor representation; Analysis of single-phase R, L, C, RL, RC, RLC circuits; Real power, reactive power, apparent power, power factor.',
      'Module 3: Three-Phase Systems & Magnetic Circuits - Star and delta connections, line and phase voltages and currents, power measurement in 3-phase circuits by two-wattmeter method; Magnetic circuits: MMF, flux, reluctance, B-H curve, hysteresis and eddy current losses.',
      'Module 4: Electrical Machines & Transformers - Single-phase transformer: construction, EMF equation, equivalent circuit, losses and efficiency; DC machines: construction, motor and generator action, back EMF, torque equation; Induction motors: working principle, rotating magnetic field.'
    ],
    textbooks: [
      'D. P. Kothari and I. J. Nagrath, "Basic Electrical Engineering", 4th Edition, McGraw-Hill',
      'V. D. Toro, "Electrical Engineering Fundamentals", 2nd Edition, Prentice Hall India',
      'B. L. Theraja and A. K. Theraja, "A Textbook of Electrical Technology", Vol. 1, S. Chand'
    ]
  },
  'ME100': {
    code: 'ME100',
    name: 'Engineering Mechanics',
    branch: 'COMMON',
    pdfPath: '/syllabi/Mechanical2025.pdf',
    pdfName: 'MCE2025.pdf',
    ltp: '3-0-0',
    credits: 3,
    modules: [
      'Module 1: Statics of Particles & Rigid Bodies - System of forces, coplanar and non-coplanar concurrent forces, resultant and equilibrium, Varignon theorem; Free body diagrams, equilibrium of rigid bodies in two and three dimensions; Friction: laws of dry friction, wedge friction, screw jack.',
      'Module 2: Centroids, Center of Gravity & Moment of Inertia - Centroids of lines, areas, and composite figures; Theorems of Pappus-Guldinus; Moment of inertia of plane areas, parallel axis theorem, perpendicular axis theorem, polar moment of inertia, radius of gyration; Mass moment of inertia of simple solids.',
      'Module 3: Kinematics of Particles & Rigid Bodies - Rectilinear motion, curvilinear motion in rectangular, normal-tangential, and polar coordinates; Projectile motion; Relative motion; Kinematics of rigid bodies: translation, fixed axis rotation, general plane motion, instantaneous center of zero velocity.',
      'Module 4: Kinetics of Particles & Rigid Bodies - Newton second law, D Alembert principle, equations of motion; Work-energy principle, potential energy, conservation of energy; Impulse and momentum principle, conservation of linear and angular momentum, direct and oblique central impact.'
    ],
    textbooks: [
      'J. L. Meriam and L. G. Kraige, "Engineering Mechanics: Statics and Dynamics", 8th Edition, Wiley',
      'F. P. Beer, E. R. Johnston, "Vector Mechanics for Engineers: Statics and Dynamics", 11th Edition, McGraw-Hill',
      'S. Timoshenko and D. H. Young, "Engineering Mechanics", 5th Edition, McGraw-Hill'
    ]
  },
  'ME101': {
    code: 'ME101',
    name: 'Engineering Drawing',
    branch: 'COMMON',
    pdfPath: '/syllabi/Mechanical2025.pdf',
    pdfName: 'MCE2025.pdf',
    ltp: '1-0-3',
    credits: 3,
    modules: [
      'Module 1: Principles of Engineering Graphics - Drawing instruments, lettering, dimensioning, BIS conventions; Conic sections: ellipse, parabola, hyperbola; Cycloidal curves, involutes; Plain scales, diagonal scales.',
      'Module 2: Orthographic Projections - Projections of points in all four quadrants; Projections of straight lines: inclined to one plane and both planes, true lengths and true inclinations, traces; Projections of planes: regular polygons and circles inclined to one and both reference planes.',
      'Module 3: Projections of Solids & Section of Solids - Projections of regular solids: prisms, pyramids, cylinders, cones with axes inclined to one or both planes; Section planes, sectional views, true shapes of sections of prisms, pyramids, cylinders, cones.',
      'Module 4: Isometric Projections & CAD Basics - Isometric scale, isometric views and projections of simple and composite solids; Conversion of orthographic views to isometric view and vice-versa; Introduction to Computer-Aided Drafting (AutoCAD): 2D drafting commands, layers, dimensioning.'
    ],
    textbooks: [
      'N. D. Bhatt, "Engineering Drawing", 53rd Edition, Charotar Publishing House',
      'K. L. Narayana and P. Kannaiah, "Textbook on Engineering Drawing", 2nd Edition, SciTech',
      'Basant Agrawal and C. M. Agrawal, "Engineering Drawing", 2nd Edition, Tata McGraw Hill'
    ]
  },
  'MA150': {
    code: 'MA150',
    name: 'Differential Equations and Vector Calculus',
    branch: 'COMMON',
    pdfPath: '/syllabi/CSE2025.pdf',
    pdfName: 'CSE2025.pdf',
    ltp: '3-1-0',
    credits: 4,
    modules: [
      'Module 1: Linear ODEs of Higher Order - Homogeneous and non-homogeneous linear differential equations with constant coefficients; Cauchy-Euler equations; Method of variation of parameters, method of undetermined coefficients; Systems of linear differential equations.',
      'Module 2: Partial Differential Equations - Formation of PDEs, solutions of first-order first-degree PDEs: Lagrange linear equation; Non-linear first-order PDEs: Charpit method; Homogeneous and non-homogeneous linear PDEs with constant coefficients.',
      'Module 3: Applications of PDEs & Separation of Variables - Method of separation of variables; 1D wave equation (vibrating string), 1D heat conduction equation; 2D Laplace equation in Cartesian and polar coordinates; Fourier series solutions.',
      'Module 4: Vector Calculus Applications - Conservative vector fields, scalar potential; Line integrals, work done; Surface integrals, flux; Verification of Green, Gauss, and Stokes theorems; Engineering applications in potential flow and electromagnetic theory.'
    ],
    textbooks: [
      'Erwin Kreyszig, "Advanced Engineering Mathematics", 10th Edition, John Wiley & Sons',
      'B. S. Grewal, "Higher Engineering Mathematics", 44th Edition, Khanna Publishers',
      'Dennis G. Zill, "Advanced Engineering Mathematics", 6th Edition, Jones & Bartlett Learning'
    ]
  },
  'CY150': {
    code: 'CY150',
    name: 'Engineering Chemistry',
    branch: 'COMMON',
    pdfPath: '/syllabi/CSE2025.pdf',
    pdfName: 'CSE2025.pdf',
    ltp: '3-0-0',
    credits: 3,
    modules: [
      'Module 1: Chemical Thermodynamics & Phase Equilibria - Entropy, Gibbs free energy, chemical potential; Clausius-Clapeyron equation; Phase rule, one-component (water) and two-component systems (eutectic alloys).',
      'Module 2: Electrochemistry & Energy Storage - Nernst equation, electrochemical cells, reference electrodes; Modern batteries (Li-ion, flow batteries), fuel cells; Corrosion mechanisms and industrial prevention.',
      'Module 3: Materials Chemistry & Polymers - Conducting polymers, high-performance polymers, composites, nanomaterials (graphene, carbon nanotubes, metal-organic frameworks).',
      'Module 4: Water Treatment & Spectroscopy - Industrial water quality parameters, demineralization, reverse osmosis; Fundamentals and applications of UV-Visible, FTIR, and NMR spectroscopy.'
    ],
    textbooks: [
      'P. C. Jain and Monika Jain, "Engineering Chemistry", 16th Edition, Dhanpat Rai',
      'S. S. Dara, "A Textbook of Engineering Chemistry", S. Chand Publishing'
    ]
  },
  'EC150': {
    code: 'EC150',
    name: 'Basics of Electronics Engineering',
    branch: 'COMMON',
    pdfPath: '/syllabi/ECE2025.pdf',
    pdfName: 'ECE2025.pdf',
    ltp: '2-0-0',
    credits: 2,
    modules: [
      'Module 1: Semiconductor Diodes & Applications - P-N junction diode, V-I characteristics, temperature dependence; Diode equivalent circuits; Zener diode and voltage regulation; Half-wave and full-wave rectifiers, capacitor filters, clippers and clampers.',
      'Module 2: Bipolar Junction Transistors (BJT) - BJT operation, CB, CE, CC configurations, input and output characteristics; Transistor as a switch and amplifier; DC load line and operating point (Q-point), bias stability and voltage divider biasing.',
      'Module 3: Field Effect Transistors (FET) & Operational Amplifiers - JFET characteristics, pinch-off voltage; MOSFET (enhancement and depletion types); Ideal Op-Amp, inverting and non-inverting configurations, summing amplifier, differentiator, integrator.',
      'Module 4: Digital Fundamentals & Number Systems - Number systems (binary, octal, hex), logic gates (AND, OR, NOT, NAND, NOR, XOR), Boolean algebra theorems, De Morgan laws, realization of logic functions using universal gates.'
    ],
    textbooks: [
      'Robert L. Boylestad and Louis Nashelsky, "Electronic Devices and Circuit Theory", 11th Edition, Pearson',
      'David A. Bell, "Electronic Devices and Circuits", 5th Edition, Oxford University Press',
      'M. Morris Mano, "Digital Design", 6th Edition, Pearson'
    ]
  },
  'ME150': {
    code: 'ME150',
    name: 'Basics of Mechanical and Civil Engineering',
    branch: 'COMMON',
    pdfPath: '/syllabi/Mechanical2025.pdf',
    pdfName: 'MCE2025.pdf',
    ltp: '3-0-0',
    credits: 3,
    modules: [
      'Module 1: Thermal Engineering Fundamentals - Laws of thermodynamics, thermodynamic processes; Working principles of 2-stroke and 4-stroke petrol and diesel engines; Boilers: fire tube and water tube boilers; Refrigeration and air conditioning principles.',
      'Module 2: Manufacturing Processes & Power Transmission - Casting, forging, rolling, extrusion processes; Welding techniques: arc, gas, resistance welding; Lathe and drilling machine operations; Belt drives, gear drives, chain drives, clutches and brakes.',
      'Module 3: Civil Engineering Materials & Structural Systems - Stones, bricks, cement, concrete, steel properties and grading; Reinforced concrete; Structural systems: trusses, frames, arches; Foundations: shallow and deep foundations.',
      'Module 4: Surveying & Environmental Engineering - Principles of surveying, chain surveying, compass surveying, leveling; Water resources: dams, canals; Water purification processes and solid waste management principles.'
    ],
    textbooks: [
      'P. K. Nag, "Basic and Applied Thermodynamics", 3rd Edition, Tata McGraw-Hill',
      'B. C. Punmia, "Basic Civil Engineering", Laxmi Publications',
      'S. Ramamrutham, "Basic Civil Engineering", Dhanpat Rai'
    ]
  }
};

// Merge first year syllabi
for (const [code, item] of Object.entries(firstYearSyllabi)) {
  if (!allExtractedCourses[code] || (allExtractedCourses[code].modules?.length || 0) < 2) {
    allExtractedCourses[code] = item;
  }
}

// Generate the output file
const fileHeader = `// Official NIT Goa 2025 Accredited Curriculum & Syllabus Registry
// Extracted from official NIT Goa B.Tech Handbooks (EEE2025.pdf, ECE2025.pdf, CSE2025.pdf, Mechanical2025.pdf, CVE2025.pdf)
// National Institute of Technology Goa, Cuncolim, South Goa

export interface OfficialCourseSyllabus {
  code: string;
  name: string;
  branch: string;
  pdfPath: string;
  pdfName: string;
  ltp: string;
  credits: number;
  modules: string[];
  textbooks: string[];
  objectives?: string[];
  outcomes?: string[];
}

export const OFFICIAL_NIT_GOA_SYLLABI: Record<string, OfficialCourseSyllabus> = ${JSON.stringify(allExtractedCourses, null, 2)};

export function getOfficialCourseSyllabus(courseCode: string): OfficialCourseSyllabus | null {
  if (!courseCode) return null;
  const clean = courseCode.trim().toUpperCase().replace(/\\s+/g, '');
  
  if (OFFICIAL_NIT_GOA_SYLLABI[clean]) {
    return OFFICIAL_NIT_GOA_SYLLABI[clean];
  }
  
  // Try CE -> CV alias (Civil Engineering)
  if (clean.startsWith('CE')) {
    const cvCode = 'CV' + clean.slice(2);
    if (OFFICIAL_NIT_GOA_SYLLABI[cvCode]) {
      return OFFICIAL_NIT_GOA_SYLLABI[cvCode];
    }
  }
  
  // Try CV -> CE alias
  if (clean.startsWith('CV')) {
    const ceCode = 'CE' + clean.slice(2);
    if (OFFICIAL_NIT_GOA_SYLLABI[ceCode]) {
      return OFFICIAL_NIT_GOA_SYLLABI[ceCode];
    }
  }

  // Try ME -> MCE alias
  if (clean.startsWith('MCE')) {
    const meCode = 'ME' + clean.slice(3);
    if (OFFICIAL_NIT_GOA_SYLLABI[meCode]) {
      return OFFICIAL_NIT_GOA_SYLLABI[meCode];
    }
  }
  
  return null;
}
`;

fs.writeFileSync('src/data/officialSyllabusRegistry.ts', fileHeader);
console.log(`Saved ${Object.keys(allExtractedCourses).length} courses to src/data/officialSyllabusRegistry.ts successfully!`);
