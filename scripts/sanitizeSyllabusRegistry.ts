import * as fs from 'fs';
import { OFFICIAL_NIT_GOA_SYLLABI } from '../src/data/officialSyllabusRegistry';

function cleanString(str: string): string {
  if (typeof str !== 'string') return str;
  let s = str;
  // Strip trailing handbook page footer and following header block
  s = s.replace(/\n+(?:[A-Z\s,]+NIT Goa Academic Handbook[\s\S]*|Module\s+\d+\.\s+[\s\S]*|Part\s+[IVX]+[\s\S]*|nth\s+Semester[\s\S]*|(?:First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|\d+(?:st|nd|rd|th))\s+Semester\s+Courses[\s\S]*|ELECTIVES\s*$)/gi, '');
  // Strip accidental trailing headers
  s = s.replace(/\n+(?:Academic Handbook :|NIT Goa Academic|th Semester|rd Semester|nd Semester|st Semester)[\s\S]*$/gi, '');
  return s.trim();
}

const SPECIAL_OVERRIDES: Record<string, any> = {
  "EE206": {
    code: "EE206",
    name: "Tinkering Lab - I",
    branch: "EEE",
    pdfPath: "/syllabi/EEE2025.pdf",
    pdfName: "EEE2025.pdf",
    sourceUrl: "https://www.nitgoa.ac.in/uploads/EEE2025.pdf",
    ltp: "0-0-3",
    credits: 2,
    modules: [
      "Module 1: Electrical Safety, Workshop Practices & Tools - Workshop attire briefing, electrical safety rules and shock hazard prevention, precautions and first aid practices; identification of tools, cables, switches, meters, wiring symbols and standard schematic abbreviations.",
      "Module 2: Practical Wiring & Power Distribution - Lighting circuits, stair-case wiring, fan regulation wiring; assembling distribution board with Energy meter, MCB, DP switch, ELCB/RCCB, fuse, indicator lamps; testing continuity, polarity, earth resistance and insulation resistance.",
      "Module 3: Electronics Prototyping & PCB Design - Soldering and desoldering techniques, PCB layout design, chemical etching/milling, inductor winding of specified inductance and wire gauge, transformer testing and verification.",
      "Module 4: Embedded Studio & Prototyping Projects - Microcontroller interfacing (Arduino/ESP32), sensor signal acquisition, motor driver interfacing, and hands-on studio project in robotics, smart home automation, or IoT application."
    ],
    textbooks: [
      "1. J. B. Gupta, \"A Course in Electrical Installation Estimating and Costing\", S. K. Kataria & Sons, 2013.",
      "2. K. B. Bhatia, \"Electrical Workshop and Practice\", Khanna Publishers, 2011.",
      "3. Simon Monk, \"Programming Arduino: Getting Started with Sketches\", 2nd Edition, McGraw-Hill, 2016."
    ],
    objectives: [
      "To familiarize students with standard electrical workshop practices, safety guidelines, and tools.",
      "To provide hands-on experience in house wiring, PCB fabrication, and microcontroller-based hardware prototyping."
    ],
    outcomes: [
      "CO1: Adhere to electrical safety standards, identify protective switchgear, and execute standard domestic wiring.",
      "CO2: Fabricate printed circuit boards and wind inductors according to design requirements.",
      "CO3: Interface sensors and actuators with embedded microcontroller boards to build functional prototypes."
    ]
  },
  "EE257": {
    code: "EE257",
    name: "Control System Lab",
    branch: "EEE",
    pdfPath: "/syllabi/EEE2025.pdf",
    pdfName: "EEE2025.pdf",
    sourceUrl: "https://www.nitgoa.ac.in/uploads/EEE2025.pdf",
    ltp: "0-0-3",
    credits: 2,
    modules: [
      "Module 1: Simulation of Control Systems - MATLAB/Simulink modeling of transfer functions, state-space representations, step and impulse responses, and pole-zero map stability analysis.",
      "Module 2: Servomotors & Position Control - Experimental study of AC and DC servomotors, synchro transmitter-receiver pairs, and closed-loop angular/rectilinear position control systems.",
      "Module 3: PID Controller Design & Tuning - Design, tuning (Ziegler-Nichols), and experimental validation of P, PI, PD, and PID controllers for DC motor speed control, liquid level control, and temperature control systems.",
      "Module 4: Advanced Control & Automation - Study of inverted pendulum system, 2-DoF ball-on-beam balance, 3-DoF gyroscope cascade control, and PLC ladder logic programming for industrial sequencing."
    ],
    textbooks: [
      "1. I. J. Nagrath and M. Gopal, \"Control Systems Engineering\", 6th Edition, New Age International, 2018.",
      "2. Katsuhiko Ogata, \"Modern Control Engineering\", 5th Edition, Pearson, 2015."
    ],
    objectives: [
      "To experimentally verify the principles of classical and modern control system engineering.",
      "To design, tune, and test analog and digital PID controllers on real hardware plants."
    ],
    outcomes: [
      "CO1: Model dynamic systems and analyze stability using time-domain and frequency-domain response curves.",
      "CO2: Implement and tune PID controllers for speed, position, temperature, and level regulation.",
      "CO3: Program PLCs and configure industrial control loops for automated machinery."
    ]
  },
  "EE355": {
    code: "EE355",
    name: "Electrical & Electronic Design Lab",
    branch: "EEE",
    pdfPath: "/syllabi/EEE2025.pdf",
    pdfName: "EEE2025.pdf",
    sourceUrl: "https://www.nitgoa.ac.in/uploads/EEE2025.pdf",
    ltp: "0-0-3",
    credits: 2,
    modules: [
      "Module 1: Power Electronic Hardware Design - Gate driver isolation circuits (optocoupler / pulse transformer), heatsink thermal calculations, and PCB layout optimization for high di/dt and dv/dt switching.",
      "Module 2: Magnetic Component Design - High-frequency inductor and transformer design using area-product (Ap) method, ferrite core selection, winding loss minimization, and gap calculation.",
      "Module 3: Signal Conditioning & Closed-Loop Controller - Op-amp current/voltage sensing circuits, anti-aliasing active filters, microcontroller/DSP PWM interface, and analog feedback compensator design.",
      "Module 4: System Integration, EMI Mitigation & Testing - Enclosure packaging, thermal management, snubber and clamp circuit verification, conducted EMI reduction, and full-load efficiency testing."
    ],
    textbooks: [
      "1. Ned Mohan, \"Power Electronics: Converters, Applications, and Design\", 3rd Edition, Wiley, 2007.",
      "2. Abraham I. Pressman, Keith Billings, Taylor Morey, \"Switching Power Supply Design\", 3rd Edition, McGraw-Hill, 2009.",
      "3. Colonel Wm. T. McLyman, \"Transformer and Inductor Design Handbook\", 4th Edition, CRC Press, 2011."
    ],
    objectives: [
      "To impart hands-on system design methodology for power converters and electrical apparatus.",
      "To integrate magnetic component sizing, gate driving, sensor signal conditioning, and microcontroller feedback."
    ],
    outcomes: [
      "CO1: Design and size magnetics including high-frequency inductors and flyback/forward transformers.",
      "CO2: Layout noise-immune power electronic PCBs with isolated gate driver circuits.",
      "CO3: Implement closed-loop voltage and current compensators on physical converter prototypes."
    ]
  },
  "HS350": {
    code: "HS350",
    name: "Industrial Economics",
    branch: "COMMON",
    pdfPath: "/syllabi/CVE2025.pdf",
    pdfName: "CVE2025.pdf",
    sourceUrl: "https://www.nitgoa.ac.in/uploads/CVE2025.pdf",
    ltp: "3-0-0",
    credits: 3,
    modules: [
      "Module 1: Introduction to Industrial Economics - Nature, scope, concept of firm and industry, types of firms, ownership structures, and structure-conduct-performance (SCP) paradigm.",
      "Module 2: Market Structures & Managerial Theories - Pricing strategies and output determination under perfect competition, monopoly, monopolistic competition, and oligopoly; Baumol sales maximization, Williamson utility maximization, and Marris growth models; economies of scale.",
      "Module 3: Strategic Behavior & Game Theory - Price and non-price competition, collusion, cartels, vertical and horizontal mergers, game-theoretic strategies, information asymmetry, advertising, and product differentiation.",
      "Module 4: Innovation, R&D & Fourth Industrial Revolution - Economics of patents, technological diffusion, R&D races, licensing, market concentration indices (Herfindahl-Hirschman), and the economic impact of Industry 4.0, IoT, and AI."
    ],
    textbooks: [
      "1. Donald A. Hay and Derek J. Morris, \"Industrial Economics: Theory and Evidence\", Oxford University Press, 1991.",
      "2. Dennis W. Carlton and Jeffrey M. Perloff, \"Modern Industrial Organization\", 4th Edition, Pearson, 2005.",
      "3. R. R. Barthwal, \"Industrial Economics: An Introductory Textbook\", New Age International Publishers, 2007."
    ],
    objectives: [
      "To identify and analyze firm behavior under diverse industrial market environments.",
      "To understand strategic decision making, innovation dynamics, and economic implications of Industry 4.0."
    ],
    outcomes: [
      "CO1: Evaluate industrial market structures and price-output equilibrium across competition models.",
      "CO2: Apply game-theoretic principles to model strategic interaction, cartels, and mergers.",
      "CO3: Assess returns to R&D, patent races, and macroeconomic factors shaping technological diffusion."
    ]
  },
  "CS206": {
    code: "CS206",
    name: "Object Oriented Programming Lab",
    branch: "CSE",
    pdfPath: "/syllabi/CSE2025.pdf",
    pdfName: "CSE2025.pdf",
    sourceUrl: "https://www.nitgoa.ac.in/uploads/CSE2025.pdf",
    ltp: "0-0-3",
    credits: 2,
    modules: [
      "Module 1: C++ Object-Oriented Principles - Classes, objects, constructors/destructors, operator overloading, copy constructors, and dynamic memory allocation (new/delete).",
      "Module 2: Advanced C++ & Templates - Function and class templates, multiple and virtual inheritance, runtime polymorphism with virtual functions, exception handling, and Standard Template Library (STL containers & iterators).",
      "Module 3: Java Fundamentals & Architecture - Java byte-code and JVM, class structures, packages, interfaces, abstract classes, exception handling, and I/O byte/character streams.",
      "Module 4: Java Multithreading & GUI Applications - Thread lifecycles, synchronization, inter-thread communication, Java Collections framework, and GUI application development using Java Swing/JavaFX."
    ],
    textbooks: [
      "1. Bjarne Stroustrup, \"The C++ Programming Language\", 4th Edition, Addison-Wesley, 2013.",
      "2. Herbert Schildt, \"Java: The Complete Reference\", 12th Edition, McGraw-Hill, 2021."
    ],
    objectives: [
      "To gain hands-on proficiency in object-oriented paradigm using C++ and Java.",
      "To master generic programming, exception safety, multithreading, and GUI application design."
    ],
    outcomes: [
      "CO1: Implement object-oriented designs using classes, encapsulation, inheritance, and dynamic polymorphism in C++.",
      "CO2: Utilize STL containers, algorithms, and templates to write robust and reusable code.",
      "CO3: Develop concurrent multithreaded applications and graphical interfaces in Java."
    ]
  },
  "CS256": {
    code: "CS256",
    name: "Microprocessors and Microcontrollers Lab",
    branch: "CSE",
    pdfPath: "/syllabi/CSE2025.pdf",
    pdfName: "CSE2025.pdf",
    sourceUrl: "https://www.nitgoa.ac.in/uploads/CSE2025.pdf",
    ltp: "0-0-3",
    credits: 2,
    modules: [
      "Module 1: 8086 Assembly Language Programming - Real-mode architecture, register operations, 16-bit arithmetic (addition, subtraction, multiplication, division), logic operations, and array sorting/searching.",
      "Module 2: 8051 Microcontroller & Embedded C - 8051 internal architecture, SFR configuration, timer/counter programming, external interrupts, and serial communication (UART) in Assembly and Embedded C.",
      "Module 3: Hardware Peripheral Interfacing - Interfacing matrix keypads, 7-segment displays, 16x2 LCD modules, stepper motors, and ADC/DAC converters with 8051.",
      "Module 4: Embedded System Application & Mini-Project - Design, programming, and debugging of a standalone microcontroller-based application with sensors and actuators."
    ],
    textbooks: [
      "1. Barry B. Brey, \"The Intel Microprocessors: Architecture, Programming, and Interfacing\", 8th Edition, Pearson, 2009.",
      "2. Muhammad Ali Mazidi, Janice Gillispie Mazidi, Rolin D. McKinlay, \"The 8051 Microcontroller and Embedded Systems\", 2nd Edition, Pearson, 2007."
    ],
    objectives: [
      "To provide hands-on assembly language programming skills on 8086 microprocessor.",
      "To program and interface real-world peripherals with 8051 microcontroller using Embedded C."
    ],
    outcomes: [
      "CO1: Write, assemble, and debug 8086 assembly language routines for arithmetic, logical, and array processing tasks.",
      "CO2: Program on-chip timers, interrupts, and serial ports of 8051 microcontrollers.",
      "CO3: Interface physical devices including LCDs, motors, and converters to create functional embedded prototypes."
    ]
  }
};

const registry = { ...OFFICIAL_NIT_GOA_SYLLABI };

for (const [code, entry] of Object.entries(registry)) {
  if (SPECIAL_OVERRIDES[code]) {
    registry[code] = { ...entry, ...SPECIAL_OVERRIDES[code] };
    continue;
  }

  if (entry.modules && Array.isArray(entry.modules)) {
    entry.modules = entry.modules
      .map(cleanString)
      .filter(m => m.length > 5 && !m.match(/^(?:First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|\d+(?:st|nd|rd|th))\s+Semester/i));
  }
  if (entry.textbooks && Array.isArray(entry.textbooks)) {
    entry.textbooks = entry.textbooks
      .map(cleanString)
      .filter(t => t.length > 5);
  }
  if (entry.objectives && Array.isArray(entry.objectives)) {
    entry.objectives = entry.objectives
      .map(cleanString)
      .filter(o => o.length > 5);
  }
  if (entry.outcomes && Array.isArray(entry.outcomes)) {
    entry.outcomes = entry.outcomes
      .map(cleanString)
      .filter(oc => oc.length > 5);
  }
}

const header = `// Official NIT Goa 2025 Accredited Curriculum & Syllabus Registry
// Extracted from official NIT Goa B.Tech Handbooks (EEE2025.pdf, ECE2025.pdf, CSE2025.pdf, Mechanical2025.pdf, CVE2025.pdf)
// National Institute of Technology Goa, Cuncolim, South Goa

export interface OfficialCourseSyllabus {
  code: string;
  name: string;
  branch: string;
  pdfPath: string;
  pdfName: string;
  sourceUrl?: string;
  ltp: string;
  credits: number;
  modules: string[];
  textbooks: string[];
  objectives?: string[];
  outcomes?: string[];
}

export const OFFICIAL_NIT_GOA_SYLLABI: Record<string, OfficialCourseSyllabus> = `;

const footer = `;

export function getOfficialCourseSyllabus(courseCode: string): OfficialCourseSyllabus | null {
  if (!courseCode) return null;
  const clean = courseCode.trim().toUpperCase().replace(/\\s+/g, '');
  
  if (OFFICIAL_NIT_GOA_SYLLABI[clean]) {
    return OFFICIAL_NIT_GOA_SYLLABI[clean];
  }

  // Handle Minor course codes ending in M (e.g. CS300M -> CS300M or CS300)
  if (clean.endsWith('M')) {
    const baseWithoutM = clean.slice(0, -1);
    if (OFFICIAL_NIT_GOA_SYLLABI[baseWithoutM]) {
      return OFFICIAL_NIT_GOA_SYLLABI[baseWithoutM];
    }
  }

  // Handle Elective Aliases
  const ELECTIVE_ALIASES: Record<string, string> = {
    'CS815': 'CS505', // Data Warehousing and Data Mining
    'CS814': 'CS511', // Optimization Techniques
    'ME540': 'ME516', // Industrial Robotics & Automation
    'ME545': 'ME530', // Gas Dynamics & Jet Propulsion
    'CE355': 'CV355', // Environmental Quality Testing Lab
    'HS300': 'HS350', // Industrial Economics / Humanities
    'HS350': 'HS300'
  };

  if (ELECTIVE_ALIASES[clean] && OFFICIAL_NIT_GOA_SYLLABI[ELECTIVE_ALIASES[clean]]) {
    return OFFICIAL_NIT_GOA_SYLLABI[ELECTIVE_ALIASES[clean]];
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

  if (clean.startsWith('ME')) {
    const mceCode = 'MCE' + clean.slice(2);
    if (OFFICIAL_NIT_GOA_SYLLABI[mceCode]) {
      return OFFICIAL_NIT_GOA_SYLLABI[mceCode];
    }
  }
  
  return null;
}
`;

const newFileContent = header + JSON.stringify(registry, null, 2) + footer;
fs.writeFileSync('src/data/officialSyllabusRegistry.ts', newFileContent, 'utf8');
console.log('Successfully sanitized and updated src/data/officialSyllabusRegistry.ts');
