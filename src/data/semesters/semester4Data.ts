import { Course, TimeSlot, DayOfWeek } from '../timetableData';
import { buildStandardWeeklySchedule } from './scheduleBuilder';
import { SemesterData } from './semester3Data';

// ==========================================
// 4th Semester (2nd Year Even) - CSE
// ==========================================
export const CSE_4: SemesterData = {
  courses: {
    'CS250': {
      code: 'CS250',
      name: 'Advanced Object Oriented Programming',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Damodar Reddy',
      shortName: 'DR',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Cryptography, Cyber Security, Secure Software Engineering',
      email: 'damodar.reddy@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse/faculty/damodar-reddy',
      room: 'Classroom 51',
      category: 'core',
      notes: 'Advanced C++ and Java paradigms, templates, STL containers, design patterns, multithreading and GUI frameworks.',
      modules: [
        'Module 1: C++ Advanced Features - Operator overloading, Copy constructors, Move semantics, Type casting operators, Templates (function & class), Standard Template Library (STL) algorithms & iterators.',
        'Module 2: Java Advanced Programming - Reflection API, Annotations, I/O streams, Serialization, Concurrency utilities (Executors, Locks, Concurrent collections).',
        'Module 3: Design Patterns - Creational (Singleton, Factory, Builder), Structural (Adapter, Decorator, Facade), Behavioral (Observer, Strategy, Command) patterns.',
        'Module 4: Enterprise & GUI - JavaFX / Modern GUI architecture, Event-driven programming, Database connectivity via JDBC with prepared statements and transaction isolation.'
      ],
      textbooks: [
        'Bjarne Stroustrup, "The C++ Programming Language", 4th Edition, Addison-Wesley',
        'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides, "Design Patterns: Elements of Reusable Object-Oriented Software", Addison-Wesley'
      ]
    },
    'CS251': {
      code: 'CS251',
      name: 'Theory of Computation',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Pravati Swain',
      shortName: 'PS',
      facultyDesignation: 'Associate Professor & HoD (CSE)',
      facultyResearch: 'Distributed Computing, Formal Models, Automata Theory',
      email: 'pravati@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse/faculty/pravati-swain',
      room: 'Classroom 51',
      category: 'core',
      notes: 'DFA, NFA, regular expressions, pumping lemma, context-free grammars, pushdown automata, Turing machines.',
      modules: [
        'Module 1: Finite Automata & Regular Languages - Deterministic Finite Automata (DFA), Non-deterministic Finite Automata (NFA), Epsilon-NFA equivalence, Regular Expressions, Pumping Lemma for regular languages, Myhill-Nerode theorem.',
        'Module 2: Context-Free Grammars & Pushdown Automata - CFG parsing, Derivation trees, Ambiguity, Chomsky and Greibach normal forms, Pushdown Automata (PDA) by final state and empty stack, Deterministic PDA.',
        'Module 3: Turing Machines & Computability - Formal definition of Turing Machine, Configurations, Multi-tape TMs, Non-deterministic TMs, Church-Turing thesis, Universal Turing Machine.',
        'Module 4: Undecidability & Complexity - Halting problem, Post Correspondence Problem (PCP), Rice theorem, Decidability classes (Recursive vs Recursively Enumerable), Introduction to P, NP, and NP-Complete classes.'
      ],
      textbooks: [
        'John E. Hopcroft, Rajeev Motwani, Jeffrey D. Ullman, "Introduction to Automata Theory, Languages, and Computation", 3rd Edition, Pearson',
        'Michael Sipser, "Introduction to the Theory of Computation", 3rd Edition, Cengage Learning'
      ]
    },
    'CS252': {
      code: 'CS252',
      name: 'Microprocessors & Microcontrollers',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. B. R. Chandavarkar',
      shortName: 'BRC',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Embedded Systems, IoT, Wireless Protocols, Hardware Security',
      email: 'brc@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse/faculty/br-chandavarkar',
      room: 'Classroom 51',
      category: 'core',
      notes: '8086 microprocessor architecture, assembly programming, 8051 microcontroller, interrupts, peripheral interfacing.',
      modules: [
        'Module 1: 8086 Microprocessor Architecture - Register organization, Bus Interface Unit (BIU) and Execution Unit (EU), Segmented memory, Pin configuration, Minimum and Maximum mode operations, Timing diagrams.',
        'Module 2: 8086 Assembly Programming - Addressing modes, Instruction set (Data transfer, Arithmetic, Logical, String, Control), Assembler directives, Interrupt vector table (IVT).',
        'Module 3: Peripheral Interfacing - 8255 Programmable Peripheral Interface (PPI), 8254 Programmable Interval Timer (PIT), 8259 Priority Interrupt Controller (PIC), 8237 DMA Controller.',
        'Module 4: 8051 Microcontroller - 8051 core architecture, Special Function Registers (SFR), Timers/Counters, Serial communication (UART), External memory interfacing and embedded C programming.'
      ],
      textbooks: [
        'Douglas V. Hall, "Microprocessors and Interfacing: Programming and Hardware", 3rd Edition, McGraw-Hill',
        'Muhammad Ali Mazidi, Janice Gillispie Mazidi, Rolin D. McKinlay, "The 8051 Microcontroller and Embedded Systems", 2nd Edition, Pearson'
      ]
    },
    'CS253': {
      code: 'CS253',
      name: 'Computer Organization & Architecture',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Keshavamurthy',
      shortName: 'KM',
      facultyDesignation: 'Assistant Professor (CSE)',
      facultyResearch: 'Computer Architecture, GPU Computing, Machine Learning Accelerators',
      email: 'keshava@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse/faculty/keshavamurthy',
      room: 'Classroom 51',
      category: 'core',
      notes: 'Instruction set architecture, ALU design, pipelining, hazards, memory hierarchy, cache mapping, I/O organization.',
      modules: [
        'Module 1: Processing Unit & Instruction Sets - Register Transfer Level (RTL), Bus and memory transfers, Computer instructions, Timing and control, Hardwired vs Microprogrammed control units.',
        'Module 2: Computer Arithmetic - Booth multiplication algorithm for signed numbers, Restoring and non-restoring division, IEEE 754 floating-point standard representation and arithmetic.',
        'Module 3: Pipelining & Hazard Handling - 5-stage instruction pipeline, Structural hazards, Data hazards (Forwarding, Stalling), Branch prediction (Dynamic 1-bit, 2-bit branch history tables), Superscalar processors.',
        'Module 4: Memory Hierarchy & Cache Design - Locality of reference, Cache mapping (Direct, Fully Associative, Set-Associative), Replacement policies (LRU, FIFO), Write policies, Virtual memory and TLB.'
      ],
      textbooks: [
        'David A. Patterson, John L. Hennessy, "Computer Organization and Design: The Hardware/Software Interface", 5th Edition, Morgan Kaufmann',
        'Carl Hamacher, Zvonko Vranesic, Safwat Zaky, "Computer Organization and Embedded Systems", 6th Edition, McGraw-Hill'
      ]
    },
    'MA250': {
      code: 'MA250',
      name: 'Linear Algebra and Optimization',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. J. P. Jaiswal',
      shortName: 'JPJ',
      facultyDesignation: 'Associate Professor & HoD (Applied Sciences)',
      facultyResearch: 'Applied Linear Algebra, Numerical Optimization',
      email: 'jpjaiswal@nitgoa.ac.in',
      room: 'Classroom 51',
      category: 'core',
      notes: 'Vector spaces, eigenvalues, singular value decomposition, linear programming and simplex method.',
      modules: [
        'Module 1: Vector Spaces & Subspaces - Linear independence, Basis and dimension, Row and column spaces, Rank-nullity theorem, Inner product spaces, Gram-Schmidt orthogonalization.',
        'Module 2: Eigenvalues & Matrix Factorizations - Characteristic polynomial, Diagonalization of symmetric matrices, Quadratic forms, Singular Value Decomposition (SVD), Principal Component Analysis (PCA) foundations.',
        'Module 3: Linear Programming Formulations - Convex sets, Extreme points, Standard and canonical forms, Graphical solution method, Degeneracy and duality theorem.',
        'Module 4: Simplex Method & Unconstrained Optimization - Simplex algorithm, Big-M method, Two-phase simplex method, Gradient descent and Newton-Raphson methods for multivariable optimization.'
      ],
      textbooks: [
        'Gilbert Strang, "Linear Algebra and Its Applications", 4th Edition, Cengage Learning',
        'Kambo N. S., "Mathematical Programming Techniques", Affiliated East-West Press'
      ]
    },
    'CS254': {
      code: 'CS254',
      name: 'Microprocessors Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_TUE',
      examSlot: 'LAB',
      coordinator: 'Dr. B. R. Chandavarkar',
      shortName: 'BRC',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Hardware Interfacing and Assembly Programming',
      email: 'brc@nitgoa.ac.in',
      room: 'Microprocessor Lab',
      category: 'lab',
      notes: '8086 assembly programming (MASM/TASM) and 8051 microcontroller hardware interfacing experiments.',
      modules: [
        'Lab 1: 8086 Assembly Programming - 16-bit multi-byte addition, multiplication, division and block memory transfer.',
        'Lab 2: Array sorting (Bubble sort), string search and palindrome verification in 8086.',
        'Lab 3: Interfacing 8255 PPI with stepper motor for clockwise/counter-clockwise speed control.',
        'Lab 4: 8051 Microcontroller - Square wave generation using internal timer and ADC 0808 analog voltage measurement.'
      ],
      textbooks: ['Douglas V. Hall, "Microprocessors and Interfacing", McGraw-Hill']
    },
    'CS255': {
      code: 'CS255',
      name: 'Advanced OOP Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_THU',
      examSlot: 'LAB',
      coordinator: 'Dr. Damodar Reddy',
      shortName: 'DR',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Object oriented software systems',
      email: 'damodar.reddy@nitgoa.ac.in',
      room: 'Computing Lab 1',
      category: 'lab',
      notes: 'Design patterns implementation in C++/Java, multithreaded socket chat server and GUI database client.',
      modules: [
        'Lab 1: Implementation of Singleton and Factory design patterns for a cross-platform logging utility.',
        'Lab 2: Multithreaded TCP client-server chat application with thread synchronization and queues.',
        'Lab 3: Modern JavaFX desktop CRUD application connected to PostgreSQL database via JDBC.',
        'Lab 4: Generic collection library implementation with iterators and lambda stream filtering.'
      ],
      textbooks: ['Herbert Schildt, "Java: The Complete Reference", McGraw-Hill']
    }
  },
  schedule: buildStandardWeeklySchedule({
    prefix: 'cse-s4',
    room: 'Classroom 51',
    slotA: 'CS250',
    slotB: 'CS251',
    slotC: 'CS252',
    slotD: 'CS253',
    slotE: 'MA250',
    labTue: { code: 'CS254', name: 'Microprocessors Laboratory', room: 'Microprocessor Lab' },
    labThu: { code: 'CS255', name: 'Advanced OOP Laboratory', room: 'Computing Lab 1' },
    saturdayFocus: 'Automata Theory & Assembly Interfacing Clinic',
  }),
};

// ==========================================
// 4th Semester (2nd Year Even) - ECE
// ==========================================
export const ECE_4: SemesterData = {
  courses: {
    'EC250': {
      code: 'EC250',
      name: 'Analog Integrated Circuits',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. N. Hemalatha',
      shortName: 'NH',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Analog IC Design, Low Power VLSI, Operational Transconductance Amplifiers',
      email: 'hemalatha@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/ece/faculty/hemalatha-n',
      room: 'Classroom 53',
      category: 'core',
      notes: 'Differential amplifiers, current mirrors, op-amp internal architecture, active filters, PLL and 555 timers.',
      modules: [
        'Module 1: Integrated Circuit Biasing - Current sources, Basic current mirror, Wilson and Widlar current mirrors, Cascode current mirrors, Constant transconductance biasing.',
        'Module 2: Differential Amplifiers - BJT and MOS differential pairs, Differential and common-mode gain, CMRR, Non-ideal effects (Offset voltages, bias currents), Active load differential amplifiers.',
        'Module 3: Operational Amplifier Architecture - Two-stage CMOS op-amp design, Frequency compensation (Miller compensation), Slew rate, Gain margin, Phase margin.',
        'Module 4: Non-linear Analog Blocks - Phase Locked Loop (PLL) operating principles, Capture range and lock range, Analog multipliers (Gilbert cell), Switched capacitor filters.'
      ],
      textbooks: [
        'Behzad Razavi, "Design of Analog CMOS Integrated Circuits", 2nd Edition, McGraw-Hill',
        'D. Roy Choudhury, Shail B. Jain, "Linear Integrated Circuits", New Age International'
      ]
    },
    'EC251': {
      code: 'EC251',
      name: 'Microprocessors and Applications',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Trilochan Panigrahi',
      shortName: 'TP',
      facultyDesignation: 'Associate Professor & HoD (ECE)',
      facultyResearch: 'Embedded Signal Processing, Microprocessor Architectures',
      email: 'tpanigrahi@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/ece/faculty/trilochan-panigrahi',
      room: 'Classroom 53',
      category: 'core',
      notes: '8086 processor, peripheral interface ICs (8255, 8254, 8259), ARM Cortex-M architecture.',
      modules: [
        'Module 1: 8086 Architecture & Timing - Internal organization, Memory segmentation, Bus cycle timing diagrams, Interrupt structure and handling.',
        'Module 2: 8086 Programming - Instruction set, Stack operations, Subroutines, Macros, String instructions, BIOS and DOS interrupts.',
        'Module 3: Interfacing Peripheral Devices - Keyboard and 7-segment display interfacing, ADC 0808 and DAC 0800 interfacing, 8251 USART serial communication.',
        'Module 4: ARM Architecture Intro - ARM Cortex-M0/M3 architecture, 32-bit programmer model, Thumb instruction set, Memory map and NVIC interrupt controller.'
      ],
      textbooks: [
        'Douglas V. Hall, "Microprocessors and Interfacing", 3rd Edition, McGraw-Hill',
        'Joseph Yiu, "The Definitive Guide to ARM Cortex-M3 and Cortex-M4 Processors", Newnes'
      ]
    },
    'EC252': {
      code: 'EC252',
      name: 'Analog Communication',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Shivnarayan Patidar',
      shortName: 'SNP',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Communication Theory, Statistical Signal Processing',
      email: 'spatidar@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/ece/faculty/shivnarayan-patidar',
      room: 'Classroom 53',
      category: 'core',
      notes: 'AM, DSB-SC, SSB, VSB, FM, PM, superheterodyne receivers, noise analysis in communication systems.',
      modules: [
        'Module 1: Amplitude Modulation - DSB-FC generation and envelope detection, DSB-SC balanced modulators, SSB-SC generation (Phase shift & Filter methods), VSB modulation and television broadcasting.',
        'Module 2: Angle Modulation - Frequency Modulation (FM) and Phase Modulation (PM), Carson rule for bandwidth, Narrowband and Wideband FM, Armstrong indirect FM transmitter, Foster-Seeley discriminator and Ratio detector.',
        'Module 3: Radio Receivers & Sampling - TRF receiver vs Superheterodyne receiver, Image frequency and selectivity, Automatic Gain Control (AGC), Pulse Amplitude Modulation (PAM), Pulse Width Modulation (PWM), Pulse Position Modulation (PPM).',
        'Module 4: Noise Analysis - Thermal noise, White noise, Noise figure and equivalent noise temperature, SNR calculation for AM, DSB-SC, and FM systems, Pre-emphasis and de-emphasis networks.'
      ],
      textbooks: [
        'Simon Haykin, Michael Moher, "Communication Systems", 5th Edition, John Wiley & Sons',
        'B. P. Lathi, Zhi Ding, "Modern Digital and Analog Communication Systems", 4th Edition, Oxford University Press'
      ]
    },
    'EC253': {
      code: 'EC253',
      name: 'Electromagnetic Waves & Transmission Lines',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. C. Vyjayanthi',
      shortName: 'CV',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Antennas, Wave Propagation, Transmission Line Matching, RF Circuits',
      email: 'vyjayanthi@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/ece/faculty/c-vyjayanthi',
      room: 'Classroom 53',
      category: 'core',
      notes: 'Maxwell equations, plane wave propagation, reflection & refraction, transmission line equations, Smith chart.',
      modules: [
        'Module 1: Wave Propagation in Media - Wave equations for conductors and dielectrics, Skin depth and surface impedance, Polarization (Linear, Circular, Elliptical).',
        'Module 2: Reflection & Refraction - Normal and oblique incidence at plane boundaries, Snell laws, Brewster angle, Total internal reflection and surface waves.',
        'Module 3: Transmission Line Theory - Distributed parameters, Characteristic impedance, Propagation constant, Voltage Standing Wave Ratio (VSWR), Input impedance of terminated lines.',
        'Module 4: Impedance Matching & Smith Chart - Applications of Smith chart, Single-stub and double-stub matching techniques, Quarter-wave transformers, Waveguide modes (TE and TM).'
      ],
      textbooks: [
        'Matthew N. O. Sadiku, "Elements of Electromagnetics", Oxford University Press',
        'E. C. Jordan, K. G. Balmain, "Electromagnetic Waves and Radiating Systems", Prentice Hall'
      ]
    },
    'MA250': {
      code: 'MA250',
      name: 'Linear Algebra & Numerical Methods',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Ravi Ragoju',
      shortName: 'RR',
      facultyDesignation: 'Associate Professor (Mathematics)',
      facultyResearch: 'Numerical Analysis and Differential Modeling',
      email: 'raviragoju@nitgoa.ac.in',
      room: 'Classroom 53',
      category: 'core',
      notes: 'Numerical root finding, interpolation, numerical integration, matrix factorizations (LU, QR).',
      modules: [
        'Module 1: Root Finding & Linear Systems - Newton-Raphson method, Gauss elimination, LU decomposition, Gauss-Seidel iterative method.',
        'Module 2: Interpolation & Approximation - Lagrange interpolation, Newton divided differences, Cubic splines, Least squares curve fitting.',
        'Module 3: Numerical Calculus - Trapezoidal rule, Simpson 1/3rd and 3/8th rules, Romberg integration, Euler method, Runge-Kutta 4th order method for ODEs.',
        'Module 4: Matrix Factorizations & Eigenvalues - Power method for dominant eigenvalue, QR algorithm, SVD decomposition.'
      ],
      textbooks: ['M. K. Jain, S. R. K. Iyengar, R. K. Jain, "Numerical Methods", New Age International']
    },
    'EC254': {
      code: 'EC254',
      name: 'Analog Integrated Circuits Lab',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_MON',
      examSlot: 'LAB',
      coordinator: 'Dr. N. Hemalatha',
      shortName: 'NH',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Analog IC and Simulation',
      email: 'hemalatha@nitgoa.ac.in',
      room: 'Analog IC Lab',
      category: 'lab',
      notes: 'Op-amp linear/non-linear applications, instrumentation amplifier, active filters and PLL frequency synthesizer.',
      modules: [
        'Lab 1: Design and frequency response measurement of 2nd order active Butterworth Low Pass and High Pass filters.',
        'Lab 2: IC 741 Instrumentation amplifier design and Common Mode Rejection Ratio (CMRR) evaluation.',
        'Lab 3: Astable and Monostable multivibrators using IC 555 and pulse width modulation generation.',
        'Lab 4: PLL characteristics (Lock range and Capture range) measurement using IC 565.'
      ],
      textbooks: ['D. Roy Choudhury, "Linear Integrated Circuits Lab Manual", New Age']
    },
    'EC255': {
      code: 'EC255',
      name: 'Microprocessors Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_WED',
      examSlot: 'LAB',
      coordinator: 'Dr. Trilochan Panigrahi',
      shortName: 'TP',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Embedded Signal Processing',
      email: 'tpanigrahi@nitgoa.ac.in',
      room: 'Embedded Systems Lab',
      category: 'lab',
      notes: '8086 programming, waveform generation via DAC, traffic light controller interfacing, ARM Cortex GPIO experiments.',
      modules: [
        'Lab 1: 8086 Assembly - Code conversion (BCD to Binary and vice-versa) and sorting algorithms.',
        'Lab 2: Interfacing 8-bit DAC 0808 with 8086 to generate Sine, Square, Ramp and Triangular waveforms.',
        'Lab 3: Traffic light controller simulator interfacing with 8255 PPI.',
        'Lab 4: ARM Cortex-M microcontroller GPIO programming and LED blinker in Keil MDK.'
      ],
      textbooks: ['Douglas V. Hall, "Microprocessors and Interfacing", McGraw-Hill']
    }
  },
  schedule: buildStandardWeeklySchedule({
    prefix: 'ece-s4',
    room: 'Classroom 53',
    slotA: 'EC250',
    slotB: 'EC251',
    slotC: 'EC252',
    slotD: 'EC253',
    slotE: 'MA250',
    labMon: { code: 'EC254', name: 'Analog Integrated Circuits Lab', room: 'Analog IC Lab' },
    labWed: { code: 'EC255', name: 'Microprocessors Laboratory', room: 'Embedded Systems Lab' },
    saturdayFocus: 'Communication Systems & RF Smith Chart Workshop',
  }),
};

// ==========================================
// 4th Semester (2nd Year Even) - EEE
// ==========================================
export const EEE_4: SemesterData = {
  courses: {
    'EE250': {
      code: 'EE250',
      name: 'Electrical Machines - II',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Anudevi Samuel',
      shortName: 'ADS',
      facultyDesignation: 'Assistant Professor (EEE)',
      facultyResearch: 'Electric Vehicles, Synchronous Motors, AC Machine Dynamics',
      email: 'ad.dksamuel@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/eee/faculty/anudevi-samuel',
      room: 'Classroom 52',
      category: 'core',
      notes: '3-phase induction motors, circle diagram, synchronous alternators, voltage regulation, synchronous motors.',
      modules: [
        'Module 1: Three Phase Induction Motors - Rotating magnetic field, Slip, Equivalent circuit, Torque-slip characteristics, Maximum torque, Circle diagram, Starting and speed control methods.',
        'Module 2: Synchronous Alternators - Armature winding factors (Distribution, Chording), EMF equation, Armature reaction, Voltage regulation by Synchronous Impedance (EMF), MMF, and Potier (ZPF) methods.',
        'Module 3: Parallel Operation & Salient Pole - Synchronizing power and torque, Two-reaction theory of salient pole machines, Power angle characteristics, Slip test for Xd and Xq determination.',
        'Module 4: Synchronous Motors & Special Machines - V and inverted V curves, Hunting and damper windings, Synchronous condenser, Permanent Magnet Synchronous Motors (PMSM), Switched Reluctance Motors (SRM).'
      ],
      textbooks: [
        'P. S. Bimbhra, "Electrical Machinery", 7th Edition, Khanna Publishers',
        'A. E. Fitzgerald, C. Kingsley, S. D. Umans, "Electric Machinery", 7th Edition, McGraw-Hill'
      ]
    },
    'EE251': {
      code: 'EE251',
      name: 'Microprocessors & Microcontrollers',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Amol D Rahulkar',
      shortName: 'ADR',
      facultyDesignation: 'Associate Professor (EEE)',
      facultyResearch: 'Embedded Controllers for Power Electronics, Digital Control',
      email: 'amol.rahulkar@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/eee/faculty/amol-rahulkar',
      room: 'Classroom 52',
      category: 'core',
      notes: '8085/8086 processor, 8051 microcontroller, timers, serial ports, PWM generation for converter firing.',
      modules: [
        'Module 1: 8086 Architecture & Assembly - Register banks, Memory organization, Addressing modes, Flag register, Assembly program design for mathematical computations.',
        'Module 2: Interfacing Peripherals - 8255 PPI, 8254 Timer/Counter for PWM generation, 8259 Interrupt Controller, ADC 0809 and DAC 0808 interfacing.',
        'Module 3: 8051 Microcontroller Architecture - Hardware overview, Timers and counters, Interrupt priority, Serial port communication (Modes 0, 1, 2, 3).',
        'Module 4: Microcontroller Applications in Power Systems - Frequency and phase measurement, Firing angle calculation and gate trigger pulse generation for SCR converters.'
      ],
      textbooks: [
        'Muhammad Ali Mazidi, "The 8051 Microcontroller and Embedded Systems", Pearson',
        'Douglas V. Hall, "Microprocessors and Interfacing", McGraw-Hill'
      ]
    },
    'EE252': {
      code: 'EE252',
      name: 'Control Systems',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Sreeraj E.S.',
      shortName: 'SES',
      facultyDesignation: 'Associate Professor (EEE)',
      facultyResearch: 'Control Systems, Grid Inverter Controls, Soft Computing',
      email: 'sreeraj@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/eee/faculty/sreeraj-es',
      room: 'Classroom 52',
      category: 'core',
      notes: 'Block diagrams, signal flow graphs, time response, Routh-Hurwitz, Root Locus, Bode and Nyquist plots.',
      modules: [
        'Module 1: System Modeling & Feedback - Transfer functions of electrical, mechanical, and electro-mechanical systems, Block diagram reduction, Mason gain formula.',
        'Module 2: Time Domain Analysis - Standard test signals, Transient response of first and second order systems, Time domain specifications (Damping ratio, Settling time, Peak overshoot), Steady state error and error constants.',
        'Module 3: Stability & Root Locus - Concept of BIBO stability, Routh-Hurwitz stability criterion, Construction rules of Root Locus, Determination of marginal gain K, Effect of adding poles and zeros.',
        'Module 4: Frequency Domain Analysis - Bode plot, Gain Margin and Phase Margin, Polar plots, Nyquist stability criterion, Lead, Lag and Lead-Lag compensator design.'
      ],
      textbooks: [
        'Katsuhiko Ogata, "Modern Control Engineering", 5th Edition, Pearson',
        'I. J. Nagrath, M. Gopal, "Control Systems Engineering", 6th Edition, New Age International'
      ]
    },
    'EE253': {
      code: 'EE253',
      name: 'Power Systems - I (Generation & Trans.)',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Suresh Mikkili',
      shortName: 'SM',
      facultyDesignation: 'Associate Professor & HoD (EEE)',
      facultyResearch: 'Power System Operation, Renewable Energy Integration, Power Quality',
      email: 'mikkili.suresh@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/eee/faculty/suresh-mikkili',
      room: 'Classroom 52',
      category: 'core',
      notes: 'Generation economics, transmission line parameters (R, L, C), performance models, corona, underground cables.',
      modules: [
        'Module 1: Generation & Economics of Power - Load curves, Load factor, Diversity factor, Plant capacity factor, Tariffs, Solar PV and wind energy conversion principles.',
        'Module 2: Transmission Line Parameters - Resistance, Skin effect, Proximity effect, Inductance of single and 3-phase lines with symmetrical and unsymmetrical spacing, GMD and GMR, Bundled conductors, Line capacitance.',
        'Module 3: Performance of Transmission Lines - Short, Medium (Nominal-T and Nominal-Pi), and Long transmission line models (Rigorous solution), Ferranti effect, Surge Impedance Loading (SIL).',
        'Module 4: Mechanical Design & Cables - Overhead line insulators (Suspension, Pin), String efficiency and grading methods, Sag and tension calculations (Equal and unequal level supports), Underground cables (Grading of cables, Capacitance of 3-core cables).'
      ],
      textbooks: [
        'C. L. Wadhwa, "Electrical Power Systems", 7th Edition, New Age International',
        'I. J. Nagrath, D. P. Kothari, "Modern Power System Analysis", 4th Edition, McGraw-Hill'
      ]
    },
    'MA250': {
      code: 'MA250',
      name: 'Linear Algebra & Numerical Methods',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. J. P. Jaiswal',
      shortName: 'JPJ',
      facultyDesignation: 'Associate Professor & HoD (Applied Sciences)',
      facultyResearch: 'Numerical Analysis and Mathematical Modeling',
      email: 'jpjaiswal@nitgoa.ac.in',
      room: 'Classroom 52',
      category: 'core',
      notes: 'Numerical solutions of non-linear equations, linear systems, numerical calculus and ODE solvers.',
      modules: [
        'Module 1: Iterative Methods for Non-linear Equations.',
        'Module 2: Numerical Linear Algebra & Eigenvalue Algorithms.',
        'Module 3: Interpolation and Splines.',
        'Module 4: Numerical Integration and Differential Equation Solvers.'
      ],
      textbooks: ['M. K. Jain, S. R. K. Iyengar, "Numerical Methods", New Age']
    },
    'EE254': {
      code: 'EE254',
      name: 'Electrical Machines - II Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_TUE',
      examSlot: 'LAB',
      coordinator: 'Dr. Anudevi Samuel',
      shortName: 'ADS',
      facultyDesignation: 'Assistant Professor (EEE)',
      facultyResearch: 'AC Machines and Drives Testing',
      email: 'ad.dksamuel@nitgoa.ac.in',
      room: 'Electrical Machines Lab',
      category: 'lab',
      notes: 'No-load and blocked rotor test of 3-phase induction motor, slip test, regulation of alternator by EMF/MMF/ZPF methods.',
      modules: [
        'Lab 1: No-load and blocked rotor tests on 3-Phase Induction Motor to draw circle diagram and determine performance.',
        'Lab 2: Voltage regulation of 3-phase alternator by Synchronous Impedance (EMF) and MMF methods.',
        'Lab 3: Potier method (ZPF) to determine armature leakage reactance and voltage regulation.',
        'Lab 4: Slip test on Salient Pole Synchronous Machine to determine direct axis (Xd) and quadrature axis (Xq) reactances.'
      ],
      textbooks: ['P. S. Bimbhra, "Electrical Machinery", Khanna Publishers']
    },
    'EE255': {
      code: 'EE255',
      name: 'Control Systems Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_THU',
      examSlot: 'LAB',
      coordinator: 'Dr. Sreeraj E.S.',
      shortName: 'SES',
      facultyDesignation: 'Associate Professor (EEE)',
      facultyResearch: 'Control Systems and Inverter Control',
      email: 'sreeraj@nitgoa.ac.in',
      room: 'Control Systems Lab',
      category: 'lab',
      notes: 'Synchro transmitter-receiver, AC/DC servo motor characteristics, PID controller tuning and MATLAB/Simulink.',
      modules: [
        'Lab 1: Transfer function determination and torque-speed characteristics of AC Servomotor and DC Servomotor.',
        'Lab 2: Design and experimental implementation of analog Lead and Lag compensators.',
        'Lab 3: Tuning of Proportional-Integral-Derivative (PID) controller for temperature and speed control loops.',
        'Lab 4: MATLAB simulation of Root Locus, Bode plot, and Nyquist stability verification of higher-order systems.'
      ],
      textbooks: ['Katsuhiko Ogata, "Modern Control Engineering", Pearson']
    }
  },
  schedule: buildStandardWeeklySchedule({
    prefix: 'eee-s4',
    room: 'Classroom 52',
    slotA: 'EE250',
    slotB: 'EE251',
    slotC: 'EE252',
    slotD: 'EE253',
    slotE: 'MA250',
    labTue: { code: 'EE254', name: 'Electrical Machines - II Laboratory', room: 'Electrical Machines Lab' },
    labThu: { code: 'EE255', name: 'Control Systems Laboratory', room: 'Control Systems Lab' },
    saturdayFocus: 'Control Stability & Grid Power Modeling Clinic',
  }),
};

// ==========================================
// 4th Semester (2nd Year Even) - ME
// ==========================================
export const ME_4: SemesterData = {
  courses: {
    'ME250': {
      code: 'ME250',
      name: 'Applied Thermodynamics',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Sandip Rathod',
      shortName: 'SR',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Thermal Power Systems, IC Engines, Refrigeration and Air Conditioning',
      email: 'sandip@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/me/faculty/sandip-rathod',
      room: 'Classroom 71',
      category: 'core',
      notes: 'Steam nozzles, steam turbines, gas turbines, jet propulsion, psychrometry and air conditioning systems.',
      modules: [
        'Module 1: Steam Nozzles & Turbines - Isentropic flow through nozzles, Critical pressure ratio, Choked flow, Impulse and Reaction turbines, Velocity compounding (Curtis) and Pressure compounding (Rateau), Reheat factor.',
        'Module 2: Gas Turbines & Jet Propulsion - Open and closed Brayton cycles with intercooling, reheating and regeneration, Aircraft propulsion (Turbojet, Turbofan, Turboprop), Rocket propulsion.',
        'Module 3: IC Engine Combustion & Fuels - Spark Ignition (SI) combustion stages, Knocking, Octane rating, Compression Ignition (CI) combustion, Diesel knock, Cetane rating, Alternate fuels.',
        'Module 4: Psychrometry & Air Conditioning - Psychrometric properties and chart, Sensible heating/cooling, Humidification/Dehumidification, Cooling load estimation, Summer and Winter air conditioning systems.'
      ],
      textbooks: [
        'T. D. Eastop, A. McConkey, "Applied Thermodynamics for Engineering Technologists", 5th Edition, Pearson',
        'R. K. Rajput, "Thermal Engineering", 10th Edition, Laxmi Publications'
      ]
    },
    'ME251': {
      code: 'ME251',
      name: 'Kinematics of Machinery',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Gaurav Saxena',
      shortName: 'GS',
      facultyDesignation: 'Assistant Professor & HoD (Mechanical)',
      facultyResearch: 'Kinematics, Mechanism Synthesis, Rotor Dynamics',
      email: 'gaurav@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/me/faculty/gaurav-saxena',
      room: 'Classroom 71',
      category: 'core',
      notes: 'Mechanisms, inversions, velocity and acceleration analysis, cams, gears, and epicyclic gear trains.',
      modules: [
        'Module 1: Kinematic Pairs & Mechanisms - Degrees of freedom, Kutzbach and Grubler criteria, Inversions of four-bar chain and slider-crank chain, Straight-line mechanisms, Steering gear mechanisms (Davis and Ackermann).',
        'Module 2: Velocity & Acceleration Analysis - Relative velocity method, Instantaneous centers of rotation (Aronhold-Kennedy theorem), Acceleration polygon, Coriolis acceleration component and its significance.',
        'Module 3: Cams & Followers - Classification of cams and followers, Displacement, velocity and acceleration diagrams for Uniform velocity, Simple Harmonic Motion (SHM), and Cycloidal motions, Cam profile generation.',
        'Module 4: Gears & Gear Trains - Law of gearing, Involute and cycloidal tooth profiles, Interference and undercutting, Epicyclic gear trains, Torques in gear trains.'
      ],
      textbooks: [
        'S. S. Rattan, "Theory of Machines", 4th Edition, McGraw-Hill',
        'Joseph E. Shigley, John J. Uicker, "Theory of Machines and Mechanisms", Oxford University Press'
      ]
    },
    'ME252': {
      code: 'ME252',
      name: 'Manufacturing Processes - II (Machining)',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Sachin D. Kore',
      shortName: 'SDK',
      facultyDesignation: 'Professor (Mechanical)',
      facultyResearch: 'Advanced Metal Machining, Unconventional Manufacturing',
      email: 'sachin@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/me/faculty/sachin-kore',
      room: 'Classroom 71',
      category: 'core',
      notes: 'Mechanics of metal cutting, Merchant circle, tool wear, grinding, modern machining (EDM, ECM, USM).',
      modules: [
        'Module 1: Mechanics of Metal Cutting - Geometry of single point cutting tool (ASA, ORS systems), Chip formation mechanisms, Orthogonal vs oblique cutting, Merchant force circle diagram, Cutting power estimation.',
        'Module 2: Tool Wear & Tool Life - Mechanisms of tool wear (Flank, Crater), Taylor tool life equation, Cutting fluids, Machinability index, Economics of machining.',
        'Module 3: Abrasive Machining - Grinding wheel specification and selection, Mechanics of grinding, Truing and dressing, Honing, Lapping and super-finishing operations.',
        'Module 4: Non-Traditional Machining - Working principles, process parameters and applications of Ultrasonic Machining (USM), Electrical Discharge Machining (EDM), Electrochemical Machining (ECM), and Laser Beam Machining (LBM).'
      ],
      textbooks: [
        'Amitabha Ghosh, Asok Kumar Mallik, "Manufacturing Science", 2nd Edition, East-West Press',
        'P. C. Pandey, H. S. Shan, "Modern Machining Processes", McGraw-Hill'
      ]
    },
    'ME253': {
      code: 'ME253',
      name: 'Heat and Mass Transfer',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Prasanth A. S.',
      shortName: 'PAS',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Thermal Convection, Heat Exchanger Design, Mass Transfer',
      email: 'prasanth@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/me/faculty/prasanth-as',
      room: 'Classroom 71',
      category: 'core',
      notes: 'Conduction, extended surfaces, forced/natural convection, thermal radiation, heat exchangers, Fick law.',
      modules: [
        'Module 1: Steady & Transient Conduction - Fourier law, 3D heat conduction equation, Critical radius of insulation, Heat transfer through extended surfaces (Fins), Lumped capacitance method for transient cooling.',
        'Module 2: Convective Heat Transfer - Boundary layer thermal equations, Dimensionless numbers (Nu, Re, Pr, Gr), Empirical correlations for laminar and turbulent forced convection over flat plates and pipes, Natural convection.',
        'Module 3: Radiation Heat Transfer - Thermal radiation laws (Planck, Stefan-Boltzmann, Wien, Kirchhoff), Black and gray bodies, View factor algebra, Radiation exchange between surfaces with reradiating shields.',
        'Module 4: Heat Exchangers & Mass Transfer - Types of heat exchangers, LMTD and NTU-effectiveness methods, Fick law of diffusion, Equimolar counter diffusion.'
      ],
      textbooks: [
        'Frank P. Incropera, David P. DeWitt, "Fundamentals of Heat and Mass Transfer", 7th Edition, John Wiley & Sons',
        'Yunus A. Cengel, Afshin J. Ghajar, "Heat and Mass Transfer: Fundamentals and Applications", 5th Edition, McGraw-Hill'
      ]
    },
    'MA250': {
      code: 'MA250',
      name: 'Numerical Methods and Optimization',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Ravi Ragoju',
      shortName: 'RR',
      facultyDesignation: 'Associate Professor (Mathematics)',
      facultyResearch: 'Numerical Analysis and Computational Fluid Dynamics',
      email: 'raviragoju@nitgoa.ac.in',
      room: 'Classroom 71',
      category: 'core',
      notes: 'Finite difference methods, non-linear optimization, genetic algorithms intro, boundary value problems.',
      modules: [
        'Module 1: Numerical Methods for Boundary Value Problems.',
        'Module 2: Finite Difference Methods for Partial Differential Equations.',
        'Module 3: Optimization Techniques - Single and multivariable unconstrained optimization.',
        'Module 4: Constrained Optimization - Kuhn-Tucker conditions and penalty function methods.'
      ],
      textbooks: ['S. S. Rao, "Engineering Optimization: Theory and Practice", John Wiley & Sons']
    },
    'ME254': {
      code: 'ME254',
      name: 'Thermal Engineering Laboratory - I',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_MON',
      examSlot: 'LAB',
      coordinator: 'Dr. Sandip Rathod',
      shortName: 'SR',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Thermal Systems and IC Engine Testing',
      email: 'sandip@nitgoa.ac.in',
      room: 'Thermal Engineering Lab',
      category: 'lab',
      notes: 'Performance test of 4-stroke multi-cylinder petrol engine, Morse test, refrigeration test rig, bomb calorimeter.',
      modules: [
        'Lab 1: Performance and heat balance sheet evaluation of 4-Stroke single cylinder diesel engine at varying loads.',
        'Lab 2: Morse test on 4-cylinder 4-stroke petrol engine for friction power and indicated thermal efficiency determination.',
        'Lab 3: Determination of Coefficient of Performance (COP) of Vapor Compression Refrigeration Test Rig.',
        'Lab 4: Calorific value determination of solid/liquid fuels using Bomb Calorimeter.'
      ],
      textbooks: ['P. K. Nag, "Thermal Engineering Laboratory Manual", McGraw-Hill']
    },
    'ME255': {
      code: 'ME255',
      name: 'Kinematics & Dynamics Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_WED',
      examSlot: 'LAB',
      coordinator: 'Dr. Gaurav Saxena',
      shortName: 'GS',
      facultyDesignation: 'Assistant Professor & HoD (Mechanical)',
      facultyResearch: 'Vibrations and Mechanism Dynamics',
      email: 'gaurav@nitgoa.ac.in',
      room: 'Dynamics of Machines Lab',
      category: 'lab',
      notes: 'Gyroscope couple measurement, governor characteristics (Watt/Porter), static and dynamic balancing, cam profile analysis.',
      modules: [
        'Lab 1: Experimental verification of gyroscopic couple rule on motorized gyroscope rig.',
        'Lab 2: Characteristic curves and sensitivity evaluation of Porter and Hartnell centrifugal governors.',
        'Lab 3: Static and Dynamic balancing of rotating masses on dynamic balancing apparatus.',
        'Lab 4: Determination of natural frequency of torsional vibrations in single and two-rotor shaft systems.'
      ],
      textbooks: ['S. S. Rattan, "Theory of Machines", McGraw-Hill']
    }
  },
  schedule: buildStandardWeeklySchedule({
    prefix: 'me-s4',
    room: 'Classroom 71',
    slotA: 'ME250',
    slotB: 'ME251',
    slotC: 'ME252',
    slotD: 'ME253',
    slotE: 'MA250',
    labMon: { code: 'ME254', name: 'Thermal Engineering Laboratory - I', room: 'Thermal Engineering Lab' },
    labWed: { code: 'ME255', name: 'Kinematics & Dynamics Laboratory', room: 'Dynamics of Machines Lab' },
    saturdayFocus: 'Heat Transfer Numerical & Mechanism Kinematics Clinic',
  }),
};

// ==========================================
// 4th Semester (2nd Year Even) - CVE
// ==========================================
export const CVE_4: SemesterData = {
  courses: {
    'CE250': {
      code: 'CE250',
      name: 'Structural Analysis - I',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Harikumar M.',
      shortName: 'HM',
      facultyDesignation: 'Assistant Professor & HoD (Civil Engineering)',
      facultyResearch: 'Structural Analysis, Indeterminate Systems, Seismic Dynamics',
      email: 'harikumar@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cve/faculty/harikumar-m',
      room: 'Civil Hall 01',
      category: 'core',
      notes: 'Strain energy, virtual work, Castigliano theorem, slope-deflection method, moment distribution, three-hinged arches.',
      modules: [
        'Module 1: Energy Principles & Indeterminacy - Static and kinematic indeterminacy, Real work, Virtual work method, Betti and Maxwell reciprocal theorems, Castigliano first and second theorems for deflections.',
        'Module 2: Three-Hinged & Two-Hinged Arches - Normal thrust and radial shear in three-hinged parabolic and segmental arches, Temperature effects, Two-hinged arches analysis.',
        'Module 3: Slope-Deflection Method - Formulation of slope-deflection equations, Analysis of continuous beams with and without support settlement, Rigid-jointed portal frames without sway.',
        'Module 4: Moment Distribution Method - Stiffness factor, Carry-over factor, Distribution factor, Analysis of continuous beams and single-bay single-story portal frames with side sway.'
      ],
      textbooks: [
        'C. S. Reddy, "Basic Structural Analysis", 3rd Edition, McGraw-Hill',
        'R. C. Hibbeler, "Structural Analysis", 10th Edition, Pearson'
      ]
    },
    'CE251': {
      code: 'CE251',
      name: 'Geotechnical Engineering - I (Soil Mechanics)',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Sneha M.',
      shortName: 'SMN',
      facultyDesignation: 'Assistant Professor (Civil Engineering)',
      facultyResearch: 'Soil Mechanics, Foundation Settlement, Retaining Walls',
      email: 'sneha@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cve/faculty/sneha-m',
      room: 'Civil Hall 01',
      category: 'core',
      notes: 'Phase relations, classification, permeability, seepage, consolidation, compaction, shear strength of soils.',
      modules: [
        'Module 1: Soil Index Properties & Classification - 3-phase soil system, Water content, Void ratio, Porosity, Degree of saturation, Atterberg limits, Indian Standard Soil Classification System (ISSCS).',
        'Module 2: Permeability & Seepage Analysis - Darcy law, Constant head and falling head permeability tests, Flow nets, Seepage velocity, Piping failure and critical hydraulic gradient.',
        'Module 3: Compaction & Consolidation - Standard and Modified Proctor compaction tests, Terzaghi 1D consolidation theory, e-log(p) curves, Compression index, Over-consolidation ratio (OCR).',
        'Module 4: Shear Strength of Soils - Mohr-Coulomb failure criterion, Direct shear test, Triaxial compression tests (UU, CU, CD tests), Pore pressure parameters, Vane shear test.'
      ],
      textbooks: [
        'K. R. Arora, "Soil Mechanics and Foundation Engineering", Standard Publishers',
        'Braja M. Das, "Principles of Geotechnical Engineering", 9th Edition, Cengage Learning'
      ]
    },
    'CE252': {
      code: 'CE252',
      name: 'Transportation Engineering - I (Highways)',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. S. K. Patel',
      shortName: 'SKP',
      facultyDesignation: 'Assistant Professor (Civil Engineering)',
      facultyResearch: 'Highway Geometric Design, Pavement Materials, Traffic Safety',
      email: 'skpatel@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cve/faculty/sk-patel',
      room: 'Civil Hall 01',
      category: 'core',
      notes: 'Highway geometric design, sight distances, super-elevation, pavement materials, flexible/rigid pavement design.',
      modules: [
        'Module 1: Highway Alignment & Planning - Jayakar Committee recommendations, Highway classification, Engineering surveys for highway location, Environmental impact.',
        'Module 2: Geometric Design of Highways - Design speed, Stopping Sight Distance (SSD), Overtaking Sight Distance (OSD), Super-elevation design, Transition curves, Extra widening, Summit and valley vertical curves.',
        'Module 3: Highway Materials - Subgrade soil CBR test, Road aggregates (Impact, Abrasion, Crushing tests), Bitumen properties (Ductility, Penetration, Softening point tests), Bituminous mix design (Marshall method).',
        'Module 4: Pavement Design Principles - Factors affecting pavement design, IRC 37 design method for flexible pavements, IRC 58 design method for rigid concrete pavements (Westergaard wheel load stresses).'
      ],
      textbooks: [
        'S. K. Khanna, C. E. G. Justo, A. Veeraragavan, "Highway Engineering", 10th Edition, Nem Chand & Bros',
        'L. R. Kadiyali, "Traffic Engineering and Transport Planning", Khanna Publishers'
      ]
    },
    'CE253': {
      code: 'CE253',
      name: 'Environmental Engineering - I (Water Supply)',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Mini K.M.',
      shortName: 'MKM',
      facultyDesignation: 'Associate Professor (Civil Engineering)',
      facultyResearch: 'Water Treatment Technologies, Environmental Quality, Waste Management',
      email: 'minikm@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cve/faculty/mini-km',
      room: 'Civil Hall 01',
      category: 'core',
      notes: 'Water demand, water quality standards, sedimentation, coagulation, filtration, disinfection, distribution networks.',
      modules: [
        'Module 1: Water Demand & Quality - Population forecasting methods (Arithmetic, Geometric, Incremental increase), Per capita water demand, Physical, chemical and biological water quality parameters (WHO and IS 10500 standards).',
        'Module 2: Water Treatment Processes - Aeration, Plain sedimentation, Sedimentation aided with coagulation (Alum chemistry), Design of flocculators and clarifiers.',
        'Module 3: Filtration & Disinfection - Slow sand filters vs Rapid sand filters (design and backwashing), Chlorination mechanisms (Break-point chlorination), Ozonation and UV disinfection.',
        'Module 4: Water Distribution Networks - Dead end, Grid iron, Ring, and Radial systems, Hardy Cross pipe network analysis method, Storage reservoirs and pumps.'
      ],
      textbooks: [
        'S. K. Garg, "Water Supply Engineering (Environmental Engineering Vol. I)", Khanna Publishers',
        'Peavy, Rowe, Tchobanoglous, "Environmental Engineering", McGraw-Hill'
      ]
    },
    'MA250': {
      code: 'MA250',
      name: 'Numerical Methods & Probability',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. J. P. Jaiswal',
      shortName: 'JPJ',
      facultyDesignation: 'Associate Professor & HoD (Applied Sciences)',
      facultyResearch: 'Numerical Methods and Statistics',
      email: 'jpjaiswal@nitgoa.ac.in',
      room: 'Civil Hall 01',
      category: 'core',
      notes: 'Curve fitting, numerical differential equations, extreme value distributions, regression analysis.',
      modules: [
        'Module 1: Numerical Solutions of Linear and Non-linear Systems.',
        'Module 2: Numerical Integration & Differentiation.',
        'Module 3: Probability Distributions in Civil Engineering.',
        'Module 4: Regression Analysis & Hypothesis Testing.'
      ],
      textbooks: ['Erwin Kreyszig, "Advanced Engineering Mathematics", Wiley']
    },
    'CE254': {
      code: 'CE254',
      name: 'Geotechnical Engineering Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_TUE',
      examSlot: 'LAB',
      coordinator: 'Dr. Sneha M.',
      shortName: 'SMN',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Soil Mechanics Testing',
      email: 'sneha@nitgoa.ac.in',
      room: 'Geotechnical Lab',
      category: 'lab',
      notes: 'Specific gravity, Atterberg limits, Proctor compaction, direct shear test, unconfined compression test.',
      modules: [
        'Lab 1: Determination of Liquid Limit and Plastic Limit of fine-grained soil using Casagrande apparatus.',
        'Lab 2: Standard Proctor compaction test to find Optimum Moisture Content (OMC) and Maximum Dry Density (MDD).',
        'Lab 3: Constant head and Falling head permeability tests on sand and clay samples.',
        'Lab 4: Direct shear test on cohesionless sand and Unconfined Compression Test (UCC) on cohesive clay.'
      ],
      textbooks: ['Braja M. Das, "Soil Mechanics Laboratory Manual", Oxford University Press']
    },
    'CE255': {
      code: 'CE255',
      name: 'Environmental Engineering Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_THU',
      examSlot: 'LAB',
      coordinator: 'Dr. Mini K.M.',
      shortName: 'MKM',
      facultyDesignation: 'Associate Professor (Civil)',
      facultyResearch: 'Water Quality Analysis',
      email: 'minikm@nitgoa.ac.in',
      room: 'Environmental Engg Lab',
      category: 'lab',
      notes: 'pH, turbidity, total dissolved solids, total hardness, chloride, residual chlorine, jar test for coagulant dosage.',
      modules: [
        'Lab 1: Measurement of pH, Electrical Conductivity, and Turbidity using Nephelo-Turbidimeter.',
        'Lab 2: Estimation of Total Dissolved Solids (TDS) and Total Suspended Solids (TSS) in water.',
        'Lab 3: Determination of optimum coagulant dosage for raw river water using Jar Test apparatus.',
        'Lab 4: Measurement of Dissolved Oxygen (DO) and 5-day Biochemical Oxygen Demand (BOD) at 20°C.'
      ],
      textbooks: ['Clair N. Sawyer, Perry L. McCarty, "Chemistry for Environmental Engineering", McGraw-Hill']
    }
  },
  schedule: buildStandardWeeklySchedule({
    prefix: 'cve-s4',
    room: 'Civil Hall 01',
    slotA: 'CE250',
    slotB: 'CE251',
    slotC: 'CE252',
    slotD: 'CE253',
    slotE: 'MA250',
    labTue: { code: 'CE254', name: 'Geotechnical Engineering Laboratory', room: 'Geotechnical Lab' },
    labThu: { code: 'CE255', name: 'Environmental Engineering Laboratory', room: 'Environmental Engg Lab' },
    saturdayFocus: 'Structural Analysis & Geotechnical Numerical Clinic',
  }),
};
