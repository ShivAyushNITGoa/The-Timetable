export interface Course {
  code: string;
  name: string;
  type: 'Theory' | 'Practical' | 'Tutorial' | 'MLC' | 'Minor' | 'Elective' | 'Open Elective';
  credits: number;
  ltp: string;
  teachingSlot: string;
  examSlot: string;
  coordinator: string;
  shortName: string;
  facultyDesignation?: string;
  facultyResearch?: string;
  email?: string;
  facultyWebsite?: string;
  facultyScholar?: string;
  patents?: string[];
  papers?: string[];
  books?: string[];
  room: string;
  isMinor?: boolean;
  category: 'core' | 'elective' | 'minor' | 'lab' | 'mlc' | 'open_elective';
  notes?: string;
  modules?: string[];
  textbooks?: string[];
}

export interface FacultyProfile {
  id: string;
  name: string;
  shortName: string;
  designation: string;
  department: string;
  cabin?: string;
  email: string;
  website: string;
  scholarUrl?: string;
  researchInterests: string[];
  patents?: string[];
  prominentPapers: string[];
  books?: string[];
  coursesTaught: {
    code: string;
    name: string;
    role: string;
  }[];
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface TimeSlot {
  id: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  slotName: string; // e.g., 'Slot A', 'Slot B', 'LAB', 'Minor (G)'
  courseCode: string;
  room: string;
  isLab?: boolean;
  isLunch?: boolean;
  isFree?: boolean;
  isMinor?: boolean;
  isElectiveChoice?: boolean;
  electiveOptions?: {
    code: string;
    name: string;
    faculty: string;
    room: string;
  }[];
  labOptions?: {
    batch1: { code: string; name: string; faculty: string; room: string };
    batch2: { code: string; name: string; faculty: string; room: string };
  };
  notes?: string;
}

export const EEE_SEMESTER_INFO = {
  institution: "National Institute of Technology Goa",
  institutionHindi: "राष्ट्रीय प्रौद्योगिकी संस्थान गोवा",
  location: "Cuncolim, South Goa - 403703",
  semester: "5th Semester (Odd Semester)",
  academicYear: "July - Dec 2026",
  department: "Electrical & Electronics Engineering (EEE)",
  minorProgram: "Minor in Computer Science & Engineering (CSE)",
  minorCourse: "CS300M - Design and Analysis of Algorithm",
  facultyAdvisor: {
    name: "Dr. Amol D Rahulkar",
    email: "amol.rahulkar@nitgoa.ac.in",
    role: "Faculty Advisor, 5th Sem EEE"
  },
  minorAdvisor: {
    name: "Dr. Pravati Swain",
    email: "pravati@nitgoa.ac.in",
    role: "Minor Coordinator (CSE)"
  }
};

export const COURSES: Record<string, Course> = {
  "EE300": {
    code: "EE300",
    name: "Power Electronics",
    type: "Theory",
    credits: 3,
    ltp: "3-0-0",
    teachingSlot: "C",
    examSlot: "C",
    coordinator: "Dr. Sreeraj E.S.",
    shortName: "SES",
    facultyDesignation: "Associate Professor",
    facultyResearch: "Power Electronics, Renewable Energy Systems, Sensorless Grid Inverters, Soft Computing Optimization",
    email: "sreeraj@nitgoa.ac.in",
    facultyWebsite: "https://www.nitgoa.ac.in/department/eee/faculty/sreeraj-es",
    facultyScholar: "https://scholar.google.com/citations?user=K5f2n04AAAAJ",
    papers: [
      "One-Cycle-Controlled Single-Stage Single-Phase Voltage-Sensorless Grid-Connected PV System (IEEE Transactions on Industrial Electronics)",
      "Analysis and Design of High-Gain Non-Isolated DC-DC Converters (IEEE JESTIE)",
      "Novel Modulation Strategies for Multi-Level Inverters in Renewable Grid Integration (CSEE JPES)"
    ],
    room: "51/52",
    category: "core",
    notes: "Core course covering semiconductor switches, converters, inverters, and PWM controllers.",
    modules: [
      "Module 1: Power Semiconductor Devices (SCR, MOSFET, IGBT, GTO) - characteristics & firing circuits",
      "Module 2: Controlled Rectifiers (Single & Three phase fully controlled and half controlled bridge converters)",
      "Module 3: DC-DC Converters (Buck, Boost, Buck-Boost, Cuk converters and continuous/discontinuous conduction)",
      "Module 4: Inverters & Cycloconverters (Voltage source inverters, current source inverters, PWM modulation techniques)"
    ],
    textbooks: [
      "M.H. Rashid, 'Power Electronics: Circuits, Devices, and Applications', Pearson Education",
      "Ned Mohan, T.M. Undeland, W.P. Robbins, 'Power Electronics: Converters, Applications, and Design', John Wiley"
    ]
  },
  "EE301": {
    code: "EE301",
    name: "Electrical Machines-II",
    type: "Theory",
    credits: 3,
    ltp: "3-0-0",
    teachingSlot: "B",
    examSlot: "B",
    coordinator: "Dr. Anudevi Samuel",
    shortName: "ADS",
    facultyDesignation: "Assistant Professor (Faculty on Contract)",
    facultyResearch: "Electrical Machines, Synchronous Drives, Electric Vehicles, Power System Operation",
    email: "ad.dksamuel@nitgoa.ac.in",
    facultyWebsite: "https://www.nitgoa.ac.in/department/eee/faculty/anudevi-samuel",
    papers: [
      "Performance Evaluation of Permanent Magnet Synchronous Motors for Electric Traction Applications (IEEE PEDES)",
      "Harmonic Distortion and Core Loss Minimization in Multi-Phase Induction Machine Drives"
    ],
    room: "51/52",
    category: "core",
    notes: "Comprehensive study of AC machines: Synchronous machines, Induction motors, and Fractional HP motors.",
    modules: [
      "Module 1: Three Phase Induction Motors - Circle diagram, speed control, starting methods and braking",
      "Module 2: Synchronous Generators (Alternators) - Regulation methods (EMF, MMF, Potier), parallel operation",
      "Module 3: Synchronous Motors - V and inverted V curves, hunting, starting methods, synchronous condenser",
      "Module 4: Single Phase Induction Motors & Special Machines - Stepper motor, reluctance motor, universal motor"
    ],
    textbooks: [
      "P.S. Bimbhra, 'Electrical Machinery', Khanna Publishers",
      "A.E. Fitzgerald, C. Kingsley, S.D. Umans, 'Electric Machinery', McGraw-Hill"
    ]
  },
  "EE302": {
    code: "EE302",
    name: "Power Systems-I",
    type: "Theory",
    credits: 4,
    ltp: "3-1-0",
    teachingSlot: "E",
    examSlot: "E",
    coordinator: "Dr. Suresh Mikkili",
    shortName: "SM",
    facultyDesignation: "Associate Professor & Head of Department",
    facultyResearch: "Smart Electric Grids, Electric Vehicles, Grid/Stand-Alone PV Systems, Wireless Power Transfer, Power Quality",
    email: "mikkili.suresh@nitgoa.ac.in",
    facultyWebsite: "https://www.nitgoa.ac.in/department/eee/faculty/suresh-mikkili",
    facultyScholar: "https://scholar.google.com/citations?user=Y70xYHsAAAAJ",
    books: [
      "Power Quality Issues: Current Harmonics (CRC Press / Taylor & Francis)",
      "Modelling and Simulation of Photovoltaic Systems: Array Configurations and Distributed MPPT Architectures"
    ],
    papers: [
      "Hardware Implementation of an Improved Transformer-less Grid-Connected PV Inverter Topology (IEEE Transactions on Sustainable Energy)",
      "PV Array Configurations for Reducing Multiple-Peak Power Points Under Partial Shading Conditions (Applied Energy, Elsevier)",
      "Investigation of MPPT Techniques Under Dynamic Solar Irradiation Conditions (IEEE Transactions on Industrial Electronics)",
      "Photovoltaic Mismatch and Wiring Losses Caused by Cloud Transients (Solar Energy, Elsevier)"
    ],
    room: "51/52",
    category: "core",
    notes: "Includes Wednesday 16:00 tutorial session. Fundamental theory of transmission lines and distribution networks.",
    modules: [
      "Module 1: Structure of Electric Power Systems, Generation types and Economics of Power Generation",
      "Module 2: Line Parameters Calculation - Inductance and Capacitance of single and three phase transmission lines",
      "Module 3: Performance of Transmission Lines - Short, medium, and long lines, ABCD constants, Ferranti effect",
      "Module 4: Mechanical Design, Overhead line insulators, Sag and Tension calculations, Underground cables"
    ],
    textbooks: [
      "C.L. Wadhwa, 'Electrical Power Systems', New Age International Publishers",
      "I.J. Nagrath & D.P. Kothari, 'Modern Power System Analysis', Tata McGraw-Hill"
    ]
  },
  "EE303": {
    code: "EE303",
    name: "Microprocessor and Microcontroller",
    type: "Theory",
    credits: 3,
    ltp: "3-0-0",
    teachingSlot: "A",
    examSlot: "A",
    coordinator: "Dr. Amritansh Sagar",
    shortName: "AMS",
    facultyDesignation: "Assistant Professor (Faculty on Contract) | CARIPARO Fellow (Univ of Padova)",
    facultyResearch: "Wireless Power Transfer, Electric Vehicle Charging Systems, Vehicle-to-Home (V2H), Microprocessor Interfacing",
    email: "amritansh@nitgoa.ac.in",
    facultyWebsite: "https://www.nitgoa.ac.in/department/eee/faculty/amritansh-sagar",
    facultyScholar: "https://scholar.google.com/citations?user=amritanshsagar",
    papers: [
      "Control Strategy for a Bidirectional Wireless Power Transfer System With Vehicle to Home Functionality (IEEE Access, 2023)",
      "Analysis and Comparisons of Reactive Power Control State for the V2H Wireless Power Transfer System (IEEE Access, 2023)",
      "Analysis and Design of a Two-Winding Wireless Power Transfer System with Higher System Efficiency (IEEE IECON)",
      "Design and Analysis of Robust Interleaved Buck Converter with Minimal Ripple Current (IEEE INCET)"
    ],
    room: "51/52",
    category: "core",
    notes: "Covers internal architecture, instruction sets, assembly programming and peripheral interfacing.",
    modules: [
      "Module 1: 8086 Microprocessor Architecture, Register organization, Memory segmentation, Minimum/Maximum mode",
      "Module 2: 8086 Instruction Set, Assembly Language Programming, Interrupt handling, DOS/BIOS interrupts",
      "Module 3: Peripheral Interfacing Chips - 8255 PPI, 8254 Timer/Counter, 8259 PIC, 8251 USART, ADC/DAC interface",
      "Module 4: 8051 Microcontroller Architecture, Special function registers, Timers, Serial communication, Embedded C"
    ],
    textbooks: [
      "Ramesh S. Gaonkar / Douglas V. Hall, 'Microprocessors and Interfacing', McGraw-Hill",
      "Muhammad Ali Mazidi, 'The 8051 Microcontroller and Embedded Systems', Pearson"
    ]
  },
  "EE530": {
    code: "EE530",
    name: "Renewable Energy Systems",
    type: "Theory",
    credits: 3,
    ltp: "3-0-0",
    teachingSlot: "D",
    examSlot: "D",
    coordinator: "Dr. Mahi Teja Talluri",
    shortName: "MTT",
    facultyDesignation: "Assistant Professor (Faculty on Contract)",
    facultyResearch: "High-Efficiency DC-DC Converters, Electric Vehicle Powertrains, Renewable Energy Storage, IoT-integrated Power Electronics",
    email: "mtalluri@nitgoa.ac.in",
    facultyWebsite: "https://www.nitgoa.ac.in/department/eee/faculty/mahi-teja-talluri",
    facultyScholar: "https://scholar.google.com/citations?user=mtalluri",
    patents: [
      "IN Patent 563,278 (Granted 2025): Novel High Conversion Ratio DC-DC Converter Topology for Electric Vehicle Energy Storage Systems"
    ],
    papers: [
      "Regenerative Switched-Inductor/Capacitor Configuration-Based Cubic Bidirectional DC-DC Converter for EV Applications (IEEE JESTIE, 2025)",
      "Asymmetric Operation of DAB Converter with Reduced Conduction Devices for Energy Storage Applications (IEEE Transactions on Industry Applications, 2025)",
      "A Novel Buck Converter Topology with High Step Down Ratio and Continuous Conduction (IEEE Transactions on Circuits and Systems II, 2024)",
      "Current Sharing Network-Based Bidirectional DC-DC Converter with High Conversion Ratio (IJCTA, 2025)"
    ],
    room: "51/52",
    category: "core",
    notes: "Design, control, and grid-integration of Solar PV, Wind Energy, and Hybrid systems.",
    modules: [
      "Module 1: Renewable Energy Scenario in India, Solar radiation geometry, Solar PV cell modelling & MPPT algorithms",
      "Module 2: Wind Energy Conversion Systems (WECS), Aerodynamics, Betz limit, Fixed & Variable speed wind turbines",
      "Module 3: Grid Integration Issues - Power quality, Islanding detection, Fault ride-through capabilities",
      "Module 4: Biomass, Fuel Cells, Tidal & Geothermal energy systems, Energy storage technologies (BESS)"
    ],
    textbooks: [
      "S.P. Sukhatme & J.K. Nayak, 'Solar Energy: Principles of Thermal Collection and Storage', McGraw-Hill",
      "B.H. Khan, 'Non-Conventional Energy Resources', McGraw-Hill"
    ]
  },
  "EE541": {
    code: "EE541",
    name: "Embedded Systems Design",
    type: "Theory",
    credits: 3,
    ltp: "3-0-0",
    teachingSlot: "F",
    examSlot: "F",
    coordinator: "Dr. Ankeshwarapu Sunil",
    shortName: "AWS",
    facultyDesignation: "Assistant Professor (Faculty on Contract)",
    facultyResearch: "Active Distribution Systems, AI applications in Power & Energy Systems, Networked Microgrids, Embedded Firmware",
    email: "a.sunil@nitgoa.ac.in",
    facultyWebsite: "https://www.nitgoa.ac.in/department/eee/faculty/ankeshwarapu-sunil",
    facultyScholar: "https://scholar.google.com/citations?user=ankeshwarapusuni",
    papers: [
      "Multi-Objective Adaptive Fuzzy Campus Placement-Based Optimization for Optimal Integration of DERs and DSTATCOMs (Elsevier Journal of Energy Storage)",
      "Optimal Power Dispatch of Multiple Distributed Generators in Radial Distribution Networks (Elsevier)",
      "Investigation of Power Flow Analysis and Islanding Detection in Networked Microgrids (IEEE Smart Grid)"
    ],
    room: "51/52",
    category: "elective",
    notes: "Professional Elective option 1. Focuses on ARM architectures, RTOS primitives, and embedded firmware.",
    modules: [
      "Module 1: ARM Cortex-M Architecture, Memory Map, Bus Architecture, Exception and Interrupt Model",
      "Module 2: Real-Time Operating Systems (RTOS) concepts, Tasks, Scheduling algorithms, Semaphores, Mutexes",
      "Module 3: Embedded Communication Protocols - I2C, SPI, UART, CAN, USB, Ethernet interfacing",
      "Module 4: Low-power embedded design, Watchdog timers, Firmware debugging, JTAG/SWD emulators"
    ],
    textbooks: [
      "Joseph Yiu, 'The Definitive Guide to ARM Cortex-M3 and Cortex-M4 Processors', Newnes",
      "David E. Simon, 'An Embedded Software Primer', Addison-Wesley"
    ]
  },
  "EE545": {
    code: "EE545",
    name: "FPGA based Digital Design",
    type: "Theory",
    credits: 3,
    ltp: "3-0-0",
    teachingSlot: "F",
    examSlot: "F",
    coordinator: "Dr. Mahi Teja Talluri",
    shortName: "MTT",
    facultyDesignation: "Assistant Professor (Faculty on Contract)",
    facultyResearch: "FPGA Digital Controllers, Power Electronics Drives, Reconfigurable Computing",
    email: "mtalluri@nitgoa.ac.in",
    facultyWebsite: "https://www.nitgoa.ac.in/department/eee/faculty/mahi-teja-talluri",
    facultyScholar: "https://scholar.google.com/citations?user=mtalluri",
    patents: [
      "IN Patent 563,278 (Granted 2025): Novel High Conversion Ratio DC-DC Converter Topology for Electric Vehicle Energy Storage Systems"
    ],
    papers: [
      "Regenerative Switched-Inductor/Capacitor Configuration-Based Cubic Bidirectional DC-DC Converter for EV Applications (IEEE JESTIE, 2025)",
      "FPGA-based High-Frequency Digital PWM Generation for Multi-Level Inverters (IEEE IECON)"
    ],
    room: "51/52",
    category: "elective",
    notes: "Professional Elective option 2. Hardware Description Languages (HDL) and synthesis on modern FPGA platforms.",
    modules: [
      "Module 1: FPGA Architecture, Look-Up Tables (LUTs), Configurable Logic Blocks (CLBs), DSP Slices, Block RAM",
      "Module 2: Verilog/VHDL Digital Design - Behavioral, Dataflow, and Structural modeling of combinational/sequential circuits",
      "Module 3: Finite State Machine (FSM) Design - Moore and Mealy machines, state encoding, timing analysis & constraints",
      "Module 4: Implementation of Digital Signal Processing blocks & Power Electronic PWM controllers on FPGA"
    ],
    textbooks: [
      "Stephen Brown & Zvonko Vranesic, 'Fundamentals of Digital Logic with Verilog Design', McGraw-Hill",
      "Clive Maxfield, 'The Design Warrior's Guide to FPGAs', Elsevier"
    ]
  },
  "CS300M": {
    code: "CS300M",
    name: "Design and Analysis of Algorithm",
    type: "Minor",
    credits: 3,
    ltp: "3-0-0",
    teachingSlot: "G",
    examSlot: "G",
    coordinator: "Dr. Pravati Swain",
    shortName: "PS",
    facultyDesignation: "Associate Professor (CSE Department)",
    facultyResearch: "Human In The Loop (HITL) Learning, AI/ML for Communication Networks, Federated Learning, B5G/6G, IoT-Edge-Cloud Continuum Systems",
    email: "pravati@nitgoa.ac.in",
    facultyWebsite: "https://www.nitgoa.ac.in/department/cse/faculty/pravati-swain",
    facultyScholar: "https://scholar.google.com/citations?user=tT1fEa8AAAAJ",
    papers: [
      "Federated Learning for Edge-Assisted Mobile Networks under Uncertain Communication Environments (IEEE Transactions on Mobile Computing)",
      "Human-in-the-Loop AI Paradigm for Distributed Resource Allocation in Next-Generation Cellular Networks (IEEE Access)",
      "Game-Theoretic Bandwidth Allocation in Heterogeneous IoT-Edge Clouds (IEEE ANTS)"
    ],
    room: "74/75 (Tue) / 56/57 (Wed, Fri)",
    isMinor: true,
    category: "minor",
    notes: "Offered by CSE Department for Minor in CSE students. Essential algorithmic paradigm foundations.",
    modules: [
      "Module 1: Algorithm Analysis & Asymptotic Notations (Big-O, Omega, Theta), Recurrence relations & Master Theorem",
      "Module 2: Divide and Conquer (Merge sort, Quick sort, Strassen matrix multiplication), Greedy Method (Huffman, MST)",
      "Module 3: Dynamic Programming (0/1 Knapsack, LCS, Matrix chain multiplication, Floyd-Warshall), Backtracking",
      "Module 4: Graph Algorithms (BFS, DFS, Dijkstra, Bellman-Ford), Introduction to NP-Completeness (P, NP, NP-Hard)"
    ],
    textbooks: [
      "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein, 'Introduction to Algorithms' (CLRS), MIT Press",
      "Ellis Horowitz, Sartaj Sahni, Sanguthevar Rajasekaran, 'Fundamentals of Computer Algorithms', Universities Press"
    ]
  },
  "ES300": {
    code: "ES300",
    name: "Environmental Studies",
    type: "MLC",
    credits: 1,
    ltp: "1-0-0",
    teachingSlot: "Friday 16:00",
    examSlot: "MLC",
    coordinator: "Dr. Velavan Kathirvelu",
    shortName: "VK",
    facultyDesignation: "Assistant Professor (Department of Applied Sciences / Chemistry)",
    facultyResearch: "Chemical Sciences, Electron Paramagnetic Resonance (EPR), Green Energy Materials, Environmental Impact Assessment",
    email: "velavan@nitgoa.ac.in",
    facultyWebsite: "https://www.nitgoa.ac.in/department/as/faculty/velavan-kathirvelu",
    facultyScholar: "https://scholar.google.com/citations?user=velavankathirvelu",
    papers: [
      "Electron Paramagnetic Resonance (EPR) Spectroscopy of Advanced Metal-Organic Frameworks (Journal of Physical Chemistry)",
      "Green Synthesis of Bio-sorbents for Heavy Metal Removal from Industrial Effluents (Environmental Science & Pollution Research)"
    ],
    room: "70/71",
    category: "mlc",
    notes: "Mandatory Learning Course (Non-credit evaluated as Satisfactory SA / Unsatisfactory US).",
    modules: [
      "Module 1: Ecosystems, Biodiversity, Conservation methods and Endangered species of Western Ghats",
      "Module 2: Environmental Pollution - Air, Water, Soil, Noise, Electronic Waste management & control",
      "Module 3: Climate Change, Global Warming, Carbon Footprint and International Environmental Protocols",
      "Module 4: Sustainable Development Goals (SDGs), Environmental Impact Assessment (EIA) & Indian Green Laws"
    ],
    textbooks: [
      "Erach Bharucha, 'Textbook of Environmental Studies for Undergraduate Courses', Universities Press",
      "R. Rajagopalan, 'Environmental Studies: From Crisis to Cure', Oxford University Press"
    ]
  },
  "EE304": {
    code: "EE304",
    name: "Electrical Machine-II Laboratory",
    type: "Practical",
    credits: 2,
    ltp: "0-0-3",
    teachingSlot: "Thursday 14:00 - 16:55",
    examSlot: "Practical",
    coordinator: "Dr. Anudevi Samuel / Dr. Mahi Teja Talluri",
    shortName: "ADS/MTT",
    email: "ad.dksamuel@nitgoa.ac.in",
    facultyWebsite: "https://www.nitgoa.ac.in/department/eee",
    room: "Workshop Complex",
    category: "lab",
    notes: "TAs: Mr. Pinaki Chatterjee & Mr. Arjun Singh. Hands-on testing of alternators, induction motors, and synchronous drives."
  },
  "EE305": {
    code: "EE305",
    name: "Microprocessor Laboratory",
    type: "Practical",
    credits: 2,
    ltp: "0-0-3",
    teachingSlot: "Mon/Tue 14:00 - 16:55 (by Batch)",
    examSlot: "Practical",
    coordinator: "Dr. Amritansh Sagar",
    shortName: "AMS",
    email: "amritansh@nitgoa.ac.in",
    facultyWebsite: "https://www.nitgoa.ac.in/department/eee/faculty/amritansh-sagar",
    room: "Abdul Kalam Complex",
    category: "lab",
    notes: "TA: Mr. Diljith K.M. Assembly coding and hardware interfacing on 8086 kits and 8051 trainer boards."
  },
  "EE306": {
    code: "EE306",
    name: "Tinkering Lab - II",
    type: "Practical",
    credits: 1,
    ltp: "0-0-3",
    teachingSlot: "Mon/Tue 14:00 - 16:55 (by Batch)",
    examSlot: "Practical",
    coordinator: "Dr. C. Vyjayanthi",
    shortName: "CV",
    facultyDesignation: "Associate Professor",
    facultyResearch: "Restructured Power Systems, Smart Electric Grids, FACTS, AC/DC Microgrids, Electric Vehicles, Battery Charging",
    email: "vyjayanthi@nitgoa.ac.in",
    facultyWebsite: "https://www.nitgoa.ac.in/department/eee/faculty/c-vyjayanthi",
    facultyScholar: "https://scholar.google.com/citations?user=eX7w49EAAAAJ",
    patents: [
      "Indian Patent Granted: 'Wavelet Based Real-Time Multi-Stage Battery Charging Device for Electric Vehicle' (with Dr. Amol D. Rahulkar & Ms. Nivedita Naik)"
    ],
    papers: [
      "Design and Implementation of Multi-Stage Wavelet-Controlled Fast EV Charger (IEEE Transactions on Industry Applications)",
      "Blockchain-Enabled Privacy-Preserving Energy Trading Framework in Distributed Microgrids (IEEE Transactions on Industrial Informatics)",
      "Coordinated Control of Hybrid AC/DC Microgrid with Renewable Generation and Energy Storage (Elsevier Journal of Energy Storage)"
    ],
    room: "Abdul Kalam Complex",
    category: "lab",
    notes: "TA: Mr. Koushik. Innovative hardware prototyping, PCB fabrication, and multi-disciplinary maker projects."
  },
  "EE307": {
    code: "EE307",
    name: "Seminar",
    type: "Practical",
    credits: 1,
    ltp: "0-0-1",
    teachingSlot: "Scheduled by Department",
    examSlot: "Viva/Seminar",
    coordinator: "Dr. Amol D Rahulkar",
    shortName: "ADR",
    facultyDesignation: "Associate Professor (5th Sem Faculty Advisor)",
    facultyResearch: "Digital Signal/Image Processing, Wavelet Filter-banks, Biometrics, Neural Networks, FPGA Hardware Accelerators",
    email: "amol.rahulkar@nitgoa.ac.in",
    facultyWebsite: "https://www.nitgoa.ac.in/department/eee/faculty/amol-d-rahulkar",
    facultyScholar: "https://scholar.google.com/citations?user=8M_2_4IAAAAJ",
    patents: [
      "Indian Patent Granted: 'Wavelet Based Real-Time Multi-Stage Battery Charging Device for Electric Vehicle' (with Dr. C. Vyjayanthi & Ms. Nivedita Naik)"
    ],
    books: [
      "Iris Image Recognition: New Wavelet Filter-banks Based Iris Feature Extraction Schemes",
      "Wavelet Transform for Cardiac Image Retrieval (Elsevier Book Chapter)"
    ],
    papers: [
      "Partial Iris Feature Extraction and Recognition Based on Combined Directional and Rotated Directional Wavelet Filter Banks (IEEE Transactions on Information Forensics and Security)",
      "FPGA Implementation of Pipelined Wavelet Hardware Architecture for Real-Time Image Denoising (IEEE Transactions on VLSI Systems)"
    ],
    room: "Seminar Hall",
    category: "core",
    notes: "Technical presentation and literature survey on contemporary electrical engineering technologies."
  },
  "EE308": {
    code: "EE308",
    name: "Remedial & Problem Solving Tutorial",
    type: "Tutorial",
    credits: 1,
    ltp: "1-0-0",
    teachingSlot: "Sat 09:00 - 10:55",
    examSlot: "Internal",
    coordinator: "Dr. Amol D Rahulkar",
    shortName: "ADR",
    facultyDesignation: "Associate Professor (5th Sem Faculty Advisor)",
    email: "amol.rahulkar@nitgoa.ac.in",
    room: "51/52",
    category: "core",
    notes: "Doubt-clearing session, numerical tutorials, and makeup classes for semester curriculum."
  },
  "TECH-WS": {
    code: "TECH-WS",
    name: "IEEE Student Branch & Robotics Workshop",
    type: "Practical",
    credits: 1,
    ltp: "0-0-2",
    teachingSlot: "Sat 11:00 - 12:55",
    examSlot: "Activity",
    coordinator: "Dr. C. Vyjayanthi",
    shortName: "CV",
    facultyDesignation: "Associate Professor (IEEE Branch Counselor)",
    email: "vyjayanthi@nitgoa.ac.in",
    room: "Innovation & Tinkering Lab",
    category: "mlc",
    notes: "Hands-on hardware development, PCB fabrication, IoT sensor integration, and technical paper reading circle."
  },
  "HACK-LAB": {
    code: "HACK-LAB",
    name: "Open Hardware Prototyping & Project Mentoring",
    type: "Practical",
    credits: 2,
    ltp: "0-0-3",
    teachingSlot: "Sat 14:00 - 16:55",
    examSlot: "Practical",
    coordinator: "Dr. Sreeraj E.S.",
    shortName: "SES",
    facultyDesignation: "Associate Professor",
    email: "sreeraj@nitgoa.ac.in",
    room: "Abdul Kalam Complex",
    category: "lab",
    notes: "Project prototyping, microcontroller programming, hardware debugging, and inter-NIT hackathon prep."
  },
  "LIB-GATE": {
    code: "LIB-GATE",
    name: "Central Library Reference & GATE / Higher Studies Circle",
    type: "Theory",
    credits: 1,
    ltp: "2-0-0",
    teachingSlot: "Sun 09:00 - 10:55",
    examSlot: "Self-Study",
    coordinator: "Faculty Advisor & Library Committee",
    shortName: "LIB",
    facultyDesignation: "Central Library NIT Goa",
    email: "library@nitgoa.ac.in",
    room: "Central Library",
    category: "mlc",
    notes: "Reference textbooks, IEEE Xplore digital library access, NPTEL/SWAYAM lectures, and GATE preparation peer group."
  },
  "CAMPUS-ACT": {
    code: "CAMPUS-ACT",
    name: "Student Activity Centre & Sports Practice",
    type: "Practical",
    credits: 1,
    ltp: "0-0-3",
    teachingSlot: "Sun 14:00 - 16:55",
    examSlot: "Activity",
    coordinator: "SAC Coordinator & Sports Council",
    shortName: "SAC",
    facultyDesignation: "Student Activity Centre NIT Goa",
    email: "sac@nitgoa.ac.in",
    room: "SAC Sports Complex & Grounds",
    category: "mlc",
    notes: "Inter-branch league training, sports conditioning (badminton, football, cricket), cultural society practice, and NSS activities."
  }
};

export const WEEKLY_SCHEDULE: Record<DayOfWeek, TimeSlot[]> = {
  Monday: [
    {
      id: "mon-1",
      day: "Monday",
      startTime: "09:00",
      endTime: "09:55",
      slotName: "Slot A",
      courseCode: "EE303",
      room: "51/52"
    },
    {
      id: "mon-2",
      day: "Monday",
      startTime: "10:00",
      endTime: "10:55",
      slotName: "Slot B",
      courseCode: "EE301",
      room: "51/52"
    },
    {
      id: "mon-3",
      day: "Monday",
      startTime: "11:00",
      endTime: "11:55",
      slotName: "Slot C",
      courseCode: "EE300",
      room: "51/52"
    },
    {
      id: "mon-4",
      day: "Monday",
      startTime: "12:00",
      endTime: "12:55",
      slotName: "Slot D",
      courseCode: "EE530",
      room: "51/52"
    },
    {
      id: "mon-lunch",
      day: "Monday",
      startTime: "12:55",
      endTime: "14:00",
      slotName: "LUNCH",
      courseCode: "",
      room: "Cafeteria / Dining",
      isLunch: true
    },
    {
      id: "mon-lab",
      day: "Monday",
      startTime: "14:00",
      endTime: "16:55",
      slotName: "LAB Session (3 Hrs)",
      courseCode: "LAB_MON",
      room: "Abdul Kalam Complex",
      isLab: true,
      labOptions: {
        batch1: {
          code: "EE305",
          name: "Microprocessor Lab (Batch 1)",
          faculty: "Dr. Amritansh Sagar (AMS)",
          room: "Abdul Kalam Complex"
        },
        batch2: {
          code: "EE306",
          name: "Tinkering Lab - II (Batch 2)",
          faculty: "Dr. C. Vyjayanthi (CV)",
          room: "Abdul Kalam Complex"
        }
      },
      notes: "Batch 1: EE305 (29 students) | Batch 2: EE306 (42 students)"
    }
  ],

  Tuesday: [
    {
      id: "tue-1",
      day: "Tuesday",
      startTime: "09:00",
      endTime: "09:55",
      slotName: "Slot E",
      courseCode: "EE302",
      room: "51/52"
    },
    {
      id: "tue-2",
      day: "Tuesday",
      startTime: "10:00",
      endTime: "10:55",
      slotName: "Slot F (Elective)",
      courseCode: "ELECTIVE_F",
      room: "51/52",
      isElectiveChoice: true,
      electiveOptions: [
        { code: "EE541", name: "Embedded Systems Design", faculty: "Dr. AWS", room: "51/52" },
        { code: "EE545", name: "FPGA based Digital Design", faculty: "Dr. MTT", room: "51/52" }
      ]
    },
    {
      id: "tue-3",
      day: "Tuesday",
      startTime: "11:00",
      endTime: "11:55",
      slotName: "Slot A",
      courseCode: "EE303",
      room: "51/52"
    },
    {
      id: "tue-4",
      day: "Tuesday",
      startTime: "12:00",
      endTime: "12:55",
      slotName: "Minor Slot (G)",
      courseCode: "CS300M",
      room: "74/75",
      isMinor: true,
      notes: "Design and Analysis of Algorithm with Dr. Pravati Swain"
    },
    {
      id: "tue-lunch",
      day: "Tuesday",
      startTime: "12:55",
      endTime: "14:00",
      slotName: "LUNCH",
      courseCode: "",
      room: "Cafeteria / Dining",
      isLunch: true
    },
    {
      id: "tue-lab",
      day: "Tuesday",
      startTime: "14:00",
      endTime: "16:55",
      slotName: "LAB Session (3 Hrs)",
      courseCode: "LAB_TUE",
      room: "Abdul Kalam Complex",
      isLab: true,
      labOptions: {
        batch1: {
          code: "EE306",
          name: "Tinkering Lab - II (Batch 1)",
          faculty: "Dr. C. Vyjayanthi (CV)",
          room: "Abdul Kalam Complex"
        },
        batch2: {
          code: "EE305",
          name: "Microprocessor Lab (Batch 2)",
          faculty: "Dr. Amritansh Sagar (AMS)",
          room: "Abdul Kalam Complex"
        }
      },
      notes: "Batch 2: EE305 | Batch 1: EE306"
    }
  ],

  Wednesday: [
    {
      id: "wed-1",
      day: "Wednesday",
      startTime: "09:00",
      endTime: "09:55",
      slotName: "Slot B",
      courseCode: "EE301",
      room: "51/52"
    },
    {
      id: "wed-2",
      day: "Wednesday",
      startTime: "10:00",
      endTime: "10:55",
      slotName: "Slot C",
      courseCode: "EE300",
      room: "51/52"
    },
    {
      id: "wed-3",
      day: "Wednesday",
      startTime: "11:00",
      endTime: "11:55",
      slotName: "Slot D",
      courseCode: "EE530",
      room: "51/52"
    },
    {
      id: "wed-4",
      day: "Wednesday",
      startTime: "12:00",
      endTime: "12:55",
      slotName: "Slot E",
      courseCode: "EE302",
      room: "51/52"
    },
    {
      id: "wed-lunch",
      day: "Wednesday",
      startTime: "12:55",
      endTime: "14:00",
      slotName: "LUNCH",
      courseCode: "",
      room: "Cafeteria / Dining",
      isLunch: true
    },
    {
      id: "wed-5",
      day: "Wednesday",
      startTime: "14:00",
      endTime: "14:55",
      slotName: "Minor Slot (G)",
      courseCode: "CS300M",
      room: "56/57",
      isMinor: true,
      notes: "Design and Analysis of Algorithm in Room 56/57"
    },
    {
      id: "wed-free",
      day: "Wednesday",
      startTime: "15:00",
      endTime: "15:55",
      slotName: "Slot O.E (H)",
      courseCode: "FREE",
      room: "Library / Study Area",
      isFree: true,
      notes: "No Open Elective registered for 5th Sem EEE - Free / Self-Study Slot"
    },
    {
      id: "wed-tut",
      day: "Wednesday",
      startTime: "16:00",
      endTime: "16:55",
      slotName: "Tutorial Slot",
      courseCode: "EE302",
      room: "51/52",
      notes: "Power Systems-I Tutorial with Dr. Suresh Mikkili"
    }
  ],

  Thursday: [
    {
      id: "thu-1",
      day: "Thursday",
      startTime: "09:00",
      endTime: "09:55",
      slotName: "Slot F (Elective)",
      courseCode: "ELECTIVE_F",
      room: "51/52",
      isElectiveChoice: true,
      electiveOptions: [
        { code: "EE541", name: "Embedded Systems Design", faculty: "Dr. AWS", room: "51/52" },
        { code: "EE545", name: "FPGA based Digital Design", faculty: "Dr. MTT", room: "51/52" }
      ]
    },
    {
      id: "thu-2",
      day: "Thursday",
      startTime: "10:00",
      endTime: "10:55",
      slotName: "Slot A",
      courseCode: "EE303",
      room: "51/52"
    },
    {
      id: "thu-3",
      day: "Thursday",
      startTime: "11:00",
      endTime: "11:55",
      slotName: "Slot B",
      courseCode: "EE301",
      room: "51/52"
    },
    {
      id: "thu-free",
      day: "Thursday",
      startTime: "12:00",
      endTime: "12:55",
      slotName: "Slot O.E (H)",
      courseCode: "FREE",
      room: "Campus / Library",
      isFree: true,
      notes: "Free / Early Lunch hour for 5th Sem EEE"
    },
    {
      id: "thu-lunch",
      day: "Thursday",
      startTime: "12:55",
      endTime: "14:00",
      slotName: "LUNCH",
      courseCode: "",
      room: "Cafeteria / Dining",
      isLunch: true
    },
    {
      id: "thu-lab",
      day: "Thursday",
      startTime: "14:00",
      endTime: "16:55",
      slotName: "LAB Session (3 Hrs)",
      courseCode: "EE304",
      room: "Workshop Complex",
      isLab: true,
      notes: "Electrical Machine-II Laboratory (Dr. ADS & Dr. MTT, TAs: Mr. Pinaki & Mr. Arjun)"
    }
  ],

  Friday: [
    {
      id: "fri-1",
      day: "Friday",
      startTime: "09:00",
      endTime: "09:55",
      slotName: "Slot C",
      courseCode: "EE300",
      room: "51/52"
    },
    {
      id: "fri-2",
      day: "Friday",
      startTime: "10:00",
      endTime: "10:55",
      slotName: "Slot D",
      courseCode: "EE530",
      room: "51/52"
    },
    {
      id: "fri-3",
      day: "Friday",
      startTime: "11:00",
      endTime: "11:55",
      slotName: "Slot E",
      courseCode: "EE302",
      room: "51/52"
    },
    {
      id: "fri-4",
      day: "Friday",
      startTime: "12:00",
      endTime: "12:55",
      slotName: "Slot F (Elective)",
      courseCode: "ELECTIVE_F",
      room: "51/52",
      isElectiveChoice: true,
      electiveOptions: [
        { code: "EE541", name: "Embedded Systems Design", faculty: "Dr. AWS", room: "51/52" },
        { code: "EE545", name: "FPGA based Digital Design", faculty: "Dr. MTT", room: "51/52" }
      ]
    },
    {
      id: "fri-lunch",
      day: "Friday",
      startTime: "12:55",
      endTime: "14:00",
      slotName: "LUNCH",
      courseCode: "",
      room: "Cafeteria / Dining",
      isLunch: true
    },
    {
      id: "fri-5",
      day: "Friday",
      startTime: "14:00",
      endTime: "14:55",
      slotName: "Minor Slot (G)",
      courseCode: "CS300M",
      room: "56/57",
      isMinor: true,
      notes: "Design and Analysis of Algorithm in Room 56/57"
    },
    {
      id: "fri-free",
      day: "Friday",
      startTime: "15:00",
      endTime: "15:55",
      slotName: "Slot O.E (H)",
      courseCode: "FREE",
      room: "Study Area",
      isFree: true,
      notes: "Open Elective hour (Not enrolled for V EEE) - Free period"
    },
    {
      id: "fri-mlc",
      day: "Friday",
      startTime: "16:00",
      endTime: "16:55",
      slotName: "MLC Slot (1 Credit)",
      courseCode: "ES300",
      room: "70/71",
      notes: "Environmental Studies with Dr. Velavan Kathirvelu (VK)"
    }
  ],

  Saturday: [
    {
      id: "sat-1",
      day: "Saturday",
      startTime: "09:00",
      endTime: "09:55",
      slotName: "Remedial & Tutorial",
      courseCode: "EE308",
      room: "51/52",
      notes: "Remedial doubt clearing and numerical tutorial session with Dr. Amol D. Rahulkar"
    },
    {
      id: "sat-2",
      day: "Saturday",
      startTime: "10:00",
      endTime: "10:55",
      slotName: "Doubt Clearing Session",
      courseCode: "EE308",
      room: "51/52",
      notes: "Faculty consultation, backlog lab queries, and assignment clarification"
    },
    {
      id: "sat-3",
      day: "Saturday",
      startTime: "11:00",
      endTime: "11:55",
      slotName: "IEEE / Robotics Workshop",
      courseCode: "TECH-WS",
      room: "Innovation & Tinkering Lab",
      notes: "IEEE Student Branch technical seminar, PCB layout, and IoT hardware prototyping"
    },
    {
      id: "sat-4",
      day: "Saturday",
      startTime: "12:00",
      endTime: "12:55",
      slotName: "Tech Society Workshop",
      courseCode: "TECH-WS",
      room: "Innovation & Tinkering Lab",
      notes: "Hands-on maker projects and research paper discussions"
    },
    {
      id: "sat-lunch",
      day: "Saturday",
      startTime: "12:55",
      endTime: "14:00",
      slotName: "LUNCH",
      courseCode: "",
      room: "Cafeteria / Dining",
      isLunch: true
    },
    {
      id: "sat-lab",
      day: "Saturday",
      startTime: "14:00",
      endTime: "16:55",
      slotName: "Prototyping & Hackathon Lab",
      courseCode: "HACK-LAB",
      room: "Abdul Kalam Complex",
      isLab: true,
      notes: "Open Hardware Lab: Hardware debugging, Tinkering projects, and national hackathon preparation"
    }
  ],

  Sunday: [
    {
      id: "sun-1",
      day: "Sunday",
      startTime: "09:00",
      endTime: "09:55",
      slotName: "Library Reference Slot",
      courseCode: "LIB-GATE",
      room: "Central Library",
      notes: "Central Library reference section, textbook lending, and IEEE Xplore digital journals"
    },
    {
      id: "sun-2",
      day: "Sunday",
      startTime: "10:00",
      endTime: "10:55",
      slotName: "GATE / Study Group",
      courseCode: "LIB-GATE",
      room: "Central Library",
      notes: "Peer group study for GATE Electrical, IES, and core technical placements"
    },
    {
      id: "sun-3",
      day: "Sunday",
      startTime: "11:00",
      endTime: "11:55",
      slotName: "SWAYAM / NPTEL Slot",
      courseCode: "FREE",
      room: "Computer Centre",
      isFree: true,
      notes: "Online video lectures (NPTEL/SWAYAM) and self-paced certification courses"
    },
    {
      id: "sun-4",
      day: "Sunday",
      startTime: "12:00",
      endTime: "12:55",
      slotName: "Self-Study & Coding",
      courseCode: "FREE",
      room: "Study Area",
      isFree: true,
      notes: "Personal revision, problem sets, and coding practice"
    },
    {
      id: "sun-lunch",
      day: "Sunday",
      startTime: "12:55",
      endTime: "14:00",
      slotName: "LUNCH",
      courseCode: "",
      room: "Cafeteria / Dining",
      isLunch: true
    },
    {
      id: "sun-5",
      day: "Sunday",
      startTime: "14:00",
      endTime: "14:55",
      slotName: "SAC Sports & Clubs",
      courseCode: "CAMPUS-ACT",
      room: "SAC Sports Complex",
      notes: "Intra-NIT sports league practice, gymnasium, football, badminton, and cricket"
    },
    {
      id: "sun-6",
      day: "Sunday",
      startTime: "15:00",
      endTime: "15:55",
      slotName: "Cultural / NSS Activities",
      courseCode: "CAMPUS-ACT",
      room: "SAC Grounds",
      notes: "Music, drama, literary society rehearsals, and NSS community outreach"
    },
    {
      id: "sun-7",
      day: "Sunday",
      startTime: "16:00",
      endTime: "16:55",
      slotName: "Campus Recreation",
      courseCode: "CAMPUS-ACT",
      room: "Student Activity Centre",
      notes: "Open recreational activities and evening campus community gathering"
    }
  ]
};

export const MASTER_SLOT_TIMINGS = [
  { id: "p1", time: "09:00 - 09:55", label: "Period 1" },
  { id: "p2", time: "10:00 - 10:55", label: "Period 2" },
  { id: "p3", time: "11:00 - 11:55", label: "Period 3" },
  { id: "p4", time: "12:00 - 12:55", label: "Period 4" },
  { id: "lunch", time: "12:55 - 14:00", label: "Lunch Break" },
  { id: "p5", time: "14:00 - 14:55", label: "Period 5" },
  { id: "p6", time: "15:00 - 15:55", label: "Period 6" },
  { id: "p7", time: "16:00 - 16:55", label: "Period 7" }
];

export interface CampusFacility {
  id: string;
  name: string;
  block: string;
  type: 'Lecture Hall' | 'Laboratory' | 'Workshop' | 'Academic' | 'Amenities';
  description: string;
  associatedCourses: string[];
  features: string[];
}

export const CAMPUS_FACILITIES: CampusFacility[] = [
  {
    id: "room-51-52",
    name: "Lecture Hall 51/52",
    block: "Academic Block A / EEE Wing",
    type: "Lecture Hall",
    description: "Primary classroom for 5th Semester Electrical & Electronics Engineering core theory lectures.",
    associatedCourses: ["EE300", "EE301", "EE302", "EE303", "EE530", "EE541", "EE545"],
    features: ["Air Conditioned", "High-Resolution Projector", "Acoustic Audio System", "Capacity: 60 students"]
  },
  {
    id: "room-74-75",
    name: "Lecture Hall 74/75",
    block: "Computer Science & Engineering Wing",
    type: "Lecture Hall",
    description: "Lecture hall utilized for Tuesday 12:00 Minor lecture in CS300M (Design and Analysis of Algorithm).",
    associatedCourses: ["CS300M"],
    features: ["Interactive Smart Podium", "Projector", "Tiered Seating", "Capacity: 70 students"]
  },
  {
    id: "room-56-57",
    name: "Lecture Hall 56/57",
    block: "CSE & Interdisciplinary Block",
    type: "Lecture Hall",
    description: "Classroom for Wednesday 14:00 and Friday 14:00 Minor in CSE (CS300M) lectures.",
    associatedCourses: ["CS300M"],
    features: ["LAN/WiFi Connectivity", "Dual Projection", "Capacity: 65 students"]
  },
  {
    id: "room-70-71",
    name: "Lecture Hall 70/71",
    block: "Applied Sciences & Humanities Block",
    type: "Lecture Hall",
    description: "Venue for Friday 16:00 Environmental Studies (ES300) mandatory learning course.",
    associatedCourses: ["ES300"],
    features: ["Audio Visual System", "Spacious Hall", "Capacity: 80 students"]
  },
  {
    id: "apj-kalam-complex",
    name: "Dr. APJ Abdul Kalam Block",
    block: "Central Science & Engineering Labs",
    type: "Laboratory",
    description: "Houses the Microprocessor & Embedded Controllers Lab (EE305) and Tinkering Lab - II (EE306).",
    associatedCourses: ["EE305", "EE306"],
    features: ["8086 / 8051 Trainer Kits", "Digital Storage Oscilloscopes", "Logic Analyzers", "Soldering & Prototyping Stations"]
  },
  {
    id: "workshop-complex",
    name: "Heavy Machinery & Workshop Complex",
    block: "Mechanical & Electrical Heavy Testing Bay",
    type: "Workshop",
    description: "Houses the Electrical Machines - II Laboratory (EE304) for synchronous machines and alternator testing.",
    associatedCourses: ["EE304"],
    features: ["MG Sets", "Alternator Synchronization Panels", "Induction Motor Brake Drums", "High-Voltage Safety Relays"]
  },
  {
    id: "central-library",
    name: "NIT Goa Central Library",
    block: "Knowledge Resource Centre",
    type: "Amenities",
    description: "Comprehensive repository of standard textbooks (C.L. Wadhwa, M.H. Rashid, CLRS, Bimbhra), journals, and digital IEEE Xplore access.",
    associatedCourses: ["Library Study during Free Periods (Slot H)"],
    features: ["Air Conditioned Reading Rooms", "Digital E-Library Section", "Reprography Facility", "Open until 10:00 PM"]
  }
];

export const NIT_GOA_GRADING_RULES = {
  scale: [
    { grade: "S", points: 10, description: "Outstanding / Exceptional Performance" },
    { grade: "A", points: 9, description: "Excellent" },
    { grade: "B", points: 8, description: "Very Good" },
    { grade: "C", points: 7, description: "Good" },
    { grade: "D", points: 6, description: "Fair / Average" },
    { grade: "P", points: 5, description: "Pass (Min 35% in theory, 50% in lab)" },
    { grade: "F", points: 0, description: "Fail (Requires Re-examination / Summer Term)" },
    { grade: "W", points: 0, description: "Attendance Shortage (<75% - Barred from Exam)" },
    { grade: "I", points: 0, description: "Incomplete (Approved medical grounds)" }
  ],
  ordinanceHighlights: [
    {
      title: "85% Baseline & 75% Condonation Rule",
      detail: "As per NIT Goa B.Tech Ordinance, 85% attendance is expected. Shortfall up to 10% may be condoned by Dean Academic Affairs, and an additional 5% by the Director for approved medical or institute representation reasons. Below 75% results in an automatic 'W' grade."
    },
    {
      title: "Minimum Passing Marks",
      detail: "A student must secure a minimum of 35% in each theory course (continuous evaluation + end-sem) and a minimum of 50% in each practical/laboratory course to be awarded a 'P' grade or higher."
    },
    {
      title: "Official CGPA to Percentage Formula",
      detail: "Equivalent Percentage = (CGPA - 0.5) × 10 (e.g., 8.0 CGPA corresponds to 75.0% marks)."
    },
    {
      title: "Mandatory Learning Course (MLC - ES300)",
      detail: "Evaluated on a Satisfactory (SA) or Unsatisfactory (US) basis. It does not carry grade points towards SGPA/CGPA calculation but is mandatory for conferral of the B.Tech degree."
    }
  ]
};

export const NIT_GOA_PORTALS = [
  {
    name: "NIT Goa Official Portal",
    url: "https://www.nitgoa.ac.in",
    description: "Main institutional website with notices, announcements, and administration news.",
    icon: "Globe"
  },
  {
    name: "EEE Department Webpage",
    url: "https://www.nitgoa.ac.in/department/eee",
    description: "Faculty profiles, research publications, and department academic updates.",
    icon: "Zap"
  },
  {
    name: "Academic Notices & Circulars",
    url: "https://www.nitgoa.ac.in/academics/circulars",
    description: "Official notifications regarding semester registration, exam schedules, and holidays.",
    icon: "FileText"
  },
  {
    name: "Central Library Digital Resources",
    url: "https://www.nitgoa.ac.in/facilities/library",
    description: "IEEE Xplore, ScienceDirect, and digital catalogue access for research and coursework.",
    icon: "BookOpen"
  }
];

export const NIT_GOA_FACULTY_PROFILES: FacultyProfile[] = [
  {
    id: "suresh-mikkili",
    name: "Dr. Suresh Mikkili",
    shortName: "SM",
    designation: "Associate Professor & Head of Department (EEE)",
    department: "Electrical & Electronics Engineering",
    cabin: "EEE Dept Faculty Block, Cuncolim Campus",
    email: "mikkili.suresh@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/eee/faculty/suresh-mikkili",
    scholarUrl: "https://scholar.google.com/citations?user=Y70xYHsAAAAJ",
    researchInterests: [
      "Smart Electric Grids",
      "Electric Vehicles (EVs)",
      "Grid-Connected & Stand-Alone PV Systems",
      "Wireless Power Transfer",
      "Power Quality & Harmonic Mitigation",
      "Soft Computing Techniques in Power Systems"
    ],
    books: [
      "Power Quality Issues: Current Harmonics (CRC Press / Taylor & Francis)",
      "Modelling and Simulation of Photovoltaic Systems: Array Configurations and Distributed MPPT Architectures"
    ],
    prominentPapers: [
      "Hardware Implementation of an Improved Transformer-less Grid-Connected PV Inverter Topology (IEEE Transactions on Sustainable Energy)",
      "PV Array Configurations for Reducing Multiple-Peak Power Points Under Partial Shading Conditions (Applied Energy, Elsevier)",
      "Investigation of MPPT Techniques Under Dynamic Solar Irradiation Conditions (IEEE Transactions on Industrial Electronics)",
      "Photovoltaic Mismatch and Wiring Losses Caused by Cloud Transients (Solar Energy, Elsevier)"
    ],
    coursesTaught: [
      { code: "EE302", name: "Power Systems-I", role: "Course Coordinator & Lecturer" }
    ]
  },
  {
    id: "sreeraj-es",
    name: "Dr. Sreeraj E.S.",
    shortName: "SES",
    designation: "Associate Professor",
    department: "Electrical & Electronics Engineering",
    cabin: "EEE Dept Faculty Block, Cuncolim Campus",
    email: "sreeraj@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/eee/faculty/sreeraj-es",
    scholarUrl: "https://scholar.google.com/citations?user=K5f2n04AAAAJ",
    researchInterests: [
      "Power Electronics & Drives",
      "Renewable Energy Systems",
      "Sensorless Grid Inverters",
      "High-Gain DC-DC Converters",
      "Soft Computing in Power Electronics"
    ],
    prominentPapers: [
      "One-Cycle-Controlled Single-Stage Single-Phase Voltage-Sensorless Grid-Connected PV System (IEEE Transactions on Industrial Electronics)",
      "Analysis and Design of High-Gain Non-Isolated DC-DC Converters (IEEE Journal of Emerging and Selected Topics in Industrial Electronics)",
      "Novel Modulation Strategies for Multi-Level Inverters in Renewable Grid Integration (CSEE JPES)"
    ],
    coursesTaught: [
      { code: "EE300", name: "Power Electronics", role: "Course Coordinator & Lecturer" }
    ]
  },
  {
    id: "pravati-swain",
    name: "Dr. Pravati Swain",
    shortName: "PS",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    cabin: "CSE Dept Block, Cuncolim Campus",
    email: "pravati@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/cse/faculty/pravati-swain",
    scholarUrl: "https://scholar.google.com/citations?user=tT1fEa8AAAAJ",
    researchInterests: [
      "Human In The Loop (HITL) Learning",
      "AI/ML for Next-Gen Communication Networks",
      "Federated Learning & Edge Intelligence",
      "Beyond 5G / 6G Mobile Systems",
      "IoT-Edge-Cloud Continuum Systems",
      "Algorithmic Game Theory & Markov Models"
    ],
    prominentPapers: [
      "Federated Learning for Edge-Assisted Mobile Networks under Uncertain Communication Environments (IEEE Transactions on Mobile Computing)",
      "Human-in-the-Loop AI Paradigm for Distributed Resource Allocation in Next-Generation Cellular Networks (IEEE Access)",
      "Game-Theoretic Bandwidth Allocation in Heterogeneous IoT-Edge Clouds (IEEE ANTS)"
    ],
    coursesTaught: [
      { code: "CS300M", name: "Design and Analysis of Algorithm", role: "Minor Course Coordinator (CSE)" }
    ]
  },
  {
    id: "c-vyjayanthi",
    name: "Dr. C. Vyjayanthi",
    shortName: "CV",
    designation: "Associate Professor",
    department: "Electrical & Electronics Engineering",
    cabin: "EEE Dept Faculty Block, Cuncolim Campus",
    email: "vyjayanthi@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/eee/faculty/c-vyjayanthi",
    scholarUrl: "https://scholar.google.com/citations?user=eX7w49EAAAAJ",
    researchInterests: [
      "Restructured Power Systems & Smart Grid",
      "FACTS & Power Quality Controllers",
      "Electric Arc Furnace (EAF) Operations",
      "Hybrid AC/DC Microgrids & Network Security",
      "EV Battery Fast Charging Algorithms",
      "Blockchain in Distributed Energy Trading"
    ],
    patents: [
      "Indian Patent Granted: 'Wavelet Based Real-Time Multi-Stage Battery Charging Device for Electric Vehicle' (with Dr. Amol D. Rahulkar & Ms. Nivedita Naik)"
    ],
    prominentPapers: [
      "Design and Implementation of Multi-Stage Wavelet-Controlled Fast EV Charger (IEEE Transactions on Industry Applications)",
      "Blockchain-Enabled Privacy-Preserving Energy Trading Framework in Distributed Microgrids (IEEE Transactions on Industrial Informatics)",
      "Coordinated Control of Hybrid AC/DC Microgrid with Renewable Generation and Energy Storage (Elsevier Journal of Energy Storage)"
    ],
    coursesTaught: [
      { code: "EE306", name: "Tinkering Lab - II", role: "Lab In-Charge & Coordinator" }
    ]
  },
  {
    id: "amol-d-rahulkar",
    name: "Dr. Amol D Rahulkar",
    shortName: "ADR",
    designation: "Associate Professor & 5th Sem Faculty Advisor",
    department: "Electrical & Electronics Engineering",
    cabin: "EEE Dept Faculty Block, Cuncolim Campus",
    email: "amol.rahulkar@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/eee/faculty/amol-d-rahulkar",
    scholarUrl: "https://scholar.google.com/citations?user=8M_2_4IAAAAJ",
    researchInterests: [
      "Digital Signal & Biomedical Image Processing",
      "Wavelet Filter-banks & Feature Extraction",
      "Biometrics & Iris Feature Recognition",
      "Neural Networks & Deep Learning",
      "FPGA-Based Hardware Accelerators",
      "Control Systems Engineering"
    ],
    patents: [
      "Indian Patent Granted: 'Wavelet Based Real-Time Multi-Stage Battery Charging Device for Electric Vehicle' (with Dr. C. Vyjayanthi & Ms. Nivedita Naik)"
    ],
    books: [
      "Iris Image Recognition: New Wavelet Filter-banks Based Iris Feature Extraction Schemes",
      "Wavelet Transform for Cardiac Image Retrieval (Elsevier Book Chapter)"
    ],
    prominentPapers: [
      "Partial Iris Feature Extraction and Recognition Based on Combined Directional and Rotated Directional Wavelet Filter Banks (IEEE Transactions on Information Forensics and Security)",
      "FPGA Implementation of Pipelined Wavelet Hardware Architecture for Real-Time Image Denoising (IEEE Transactions on VLSI Systems)",
      "Design of Compact 2D Wavelet Filters for High-Throughput Hardware Processing"
    ],
    coursesTaught: [
      { code: "EE307", name: "Seminar", role: "Course Coordinator & Faculty Advisor" }
    ]
  },
  {
    id: "mahi-teja-talluri",
    name: "Dr. Mahi Teja Talluri",
    shortName: "MTT",
    designation: "Assistant Professor (Faculty on Contract)",
    department: "Electrical & Electronics Engineering",
    cabin: "EEE Dept Faculty Cabin, Cuncolim Campus",
    email: "mtalluri@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/eee/faculty/mahi-teja-talluri",
    scholarUrl: "https://scholar.google.com/citations?user=mtalluri",
    researchInterests: [
      "High-Efficiency Bidirectional DC-DC Converters",
      "Electric Vehicle Powertrains & Charging Infrastructure",
      "Dual Active Bridge (DAB) Converters",
      "Renewable Energy Systems & Battery Energy Storage (BESS)",
      "FPGA-Based Digital Controllers & Reconfigurable Hardware"
    ],
    patents: [
      "IN Patent 563,278 (Granted 2025): Novel High Conversion Ratio DC-DC Converter Topology for Electric Vehicle Energy Storage Systems"
    ],
    prominentPapers: [
      "Regenerative Switched-Inductor/Capacitor Configuration-Based Cubic Bidirectional DC-DC Converter for EV Applications (IEEE JESTIE, 2025)",
      "Asymmetric Operation of DAB Converter with Reduced Conduction Devices for Energy Storage Applications (IEEE Transactions on Industry Applications, 2025)",
      "A Novel Buck Converter Topology with High Step Down Ratio and Continuous Conduction (IEEE Transactions on Circuits and Systems II: Express Briefs, 2024)",
      "Current Sharing Network-Based Bidirectional DC-DC Converter with High Conversion Ratio (IJCTA, 2025)"
    ],
    coursesTaught: [
      { code: "EE530", name: "Renewable Energy Systems", role: "Course Coordinator & Lecturer" },
      { code: "EE545", name: "FPGA based Digital Design", role: "Elective Coordinator & Lecturer" },
      { code: "EE304", name: "Electrical Machine-II Lab", role: "Joint Lab In-Charge" }
    ]
  },
  {
    id: "amritansh-sagar",
    name: "Dr. Amritansh Sagar",
    shortName: "AMS",
    designation: "Assistant Professor (Faculty on Contract)",
    department: "Electrical & Electronics Engineering",
    cabin: "EEE Dept Faculty Cabin, Cuncolim Campus",
    email: "amritansh@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/eee/faculty/amritansh-sagar",
    scholarUrl: "https://scholar.google.com/citations?user=amritanshsagar",
    researchInterests: [
      "Bidirectional Wireless Power Transfer (WPT)",
      "Vehicle-to-Home (V2H) & Vehicle-to-Grid (V2G) Systems",
      "Electric Vehicle Dynamic Charging",
      "Microprocessor & Microcontroller Interfacing",
      "Interleaved Converters & Power Conditioning"
    ],
    prominentPapers: [
      "Control Strategy for a Bidirectional Wireless Power Transfer System With Vehicle to Home Functionality (IEEE Access, 2023)",
      "Analysis and Comparisons of Reactive Power Control State for the V2H Wireless Power Transfer System (IEEE Access, 2023)",
      "Analysis and Design of a Two-Winding Wireless Power Transfer System with Higher System Efficiency (IEEE IECON, 48th Annual Conf. of IEEE IES)",
      "Design and Analysis of Robust Interleaved Buck Converter with Minimal Ripple Current (IEEE INCET)"
    ],
    coursesTaught: [
      { code: "EE303", name: "Microprocessor and Microcontroller", role: "Course Coordinator & Lecturer" },
      { code: "EE305", name: "Microprocessor Laboratory", role: "Lab In-Charge" }
    ]
  },
  {
    id: "anudevi-samuel",
    name: "Dr. Anudevi Samuel",
    shortName: "ADS",
    designation: "Assistant Professor (Faculty on Contract)",
    department: "Electrical & Electronics Engineering",
    cabin: "EEE Dept Faculty Cabin, Cuncolim Campus",
    email: "ad.dksamuel@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/eee/faculty/anudevi-samuel",
    researchInterests: [
      "Electrical Machines & Synchronous Drives",
      "Electric Vehicle Traction Motors",
      "Special Electrical Machines & Control",
      "Harmonics and Loss Minimization in AC Drives"
    ],
    prominentPapers: [
      "Performance Evaluation of Permanent Magnet Synchronous Motors for Electric Traction Applications (IEEE PEDES)",
      "Harmonic Distortion and Core Loss Minimization in Multi-Phase Induction Machine Drives under Inverter Supply"
    ],
    coursesTaught: [
      { code: "EE301", name: "Electrical Machines-II", role: "Course Coordinator & Lecturer" },
      { code: "EE304", name: "Electrical Machine-II Lab", role: "Joint Lab In-Charge" }
    ]
  },
  {
    id: "ankeshwarapu-sunil",
    name: "Dr. Ankeshwarapu Sunil",
    shortName: "AWS",
    designation: "Assistant Professor (Faculty on Contract)",
    department: "Electrical & Electronics Engineering",
    cabin: "EEE Dept Faculty Cabin, Cuncolim Campus",
    email: "a.sunil@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/eee/faculty/ankeshwarapu-sunil",
    scholarUrl: "https://scholar.google.com/citations?user=ankeshwarapusuni",
    researchInterests: [
      "Active Distribution Systems & DER Integration",
      "Networked Microgrids & Power Flow Dynamics",
      "Soft Computing Optimization Algorithms",
      "Embedded Systems, ARM Architectures & RTOS"
    ],
    prominentPapers: [
      "Multi-Objective Adaptive Fuzzy Campus Placement-Based Optimization for Optimal Integration of DERs and DSTATCOMs (Elsevier Journal of Energy Storage)",
      "Optimal Power Dispatch of Multiple Distributed Generators in Radial Distribution Networks (Elsevier)",
      "Investigation of Power Flow Analysis and Islanding Detection in Networked Microgrids (IEEE Smart Grid)"
    ],
    coursesTaught: [
      { code: "EE541", name: "Embedded Systems Design", role: "Elective Coordinator & Lecturer" }
    ]
  },
  {
    id: "velavan-kathirvelu",
    name: "Dr. Velavan Kathirvelu",
    shortName: "VK",
    designation: "Assistant Professor",
    department: "Department of Applied Sciences (Chemistry)",
    cabin: "Applied Sciences Block, Cuncolim Campus",
    email: "velavan@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/as/faculty/velavan-kathirvelu",
    scholarUrl: "https://scholar.google.com/citations?user=velavankathirvelu",
    researchInterests: [
      "Chemical Sciences & Spectroscopic Methods",
      "Electron Paramagnetic Resonance (EPR) Spectroscopy",
      "Green Energy & Functional Nanomaterials",
      "Environmental Chemistry & Waste Management"
    ],
    prominentPapers: [
      "Electron Paramagnetic Resonance (EPR) Spectroscopy of Advanced Metal-Organic Frameworks (Journal of Physical Chemistry)",
      "Green Synthesis of Bio-sorbents for Heavy Metal Removal from Industrial Effluents (Environmental Science & Pollution Research)"
    ],
    coursesTaught: [
      { code: "ES300", name: "Environmental Studies", role: "Course Coordinator & Lecturer" }
    ]
  }
];
