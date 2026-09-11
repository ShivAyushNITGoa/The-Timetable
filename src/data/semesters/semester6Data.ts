import { Course, TimeSlot, DayOfWeek } from '../timetableData';
import { buildStandardWeeklySchedule } from './scheduleBuilder';
import { SemesterData } from './semester3Data';

// ==========================================
// 6th Semester (3rd Year Even) - CSE
// ==========================================
export const CSE_6: SemesterData = {
  courses: {
    'CS350': {
      code: 'CS350',
      name: 'Compiler Design',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Pravati Swain',
      shortName: 'PS',
      facultyDesignation: 'Associate Professor & HoD (CSE)',
      facultyResearch: 'Cloud Computing, Compilers, Distributed Systems',
      email: 'pravati@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse/faculty/pravati-swain',
      room: 'Classroom 74',
      category: 'core',
      notes: 'Lexical analysis (LEX/FLEX), top-down/bottom-up parsing (YACC/BISON), syntax directed translation, code generation.',
      modules: [
        'Module 1: Lexical Analysis - Phases of a compiler, Front-end vs Back-end, Regular expressions to DFA conversion, Implementation of lexical analyzers using LEX/FLEX, Input buffering.',
        'Module 2: Syntax Analysis - Context-free grammars, Top-down parsing (Recursive descent, LL(1) grammars, First and Follow sets), Bottom-up parsing (Shift-reduce, Operator precedence, LR(0), SLR(1), LALR(1), Canonical LR(1)), YACC/BISON.',
        'Module 3: Syntax Directed Translation & Intermediate Code - Syntax-directed definitions (SDD), S-attributed and L-attributed definitions, Three-Address Code (TAC) representations (Quadruples, Triples, Indirect triples), Type checking and symbol table structures.',
        'Module 4: Code Optimization & Generation - Basic blocks and Flow graphs, DAG representation of basic blocks, Peephole optimization, Loop optimization, Register allocation (Graph coloring), Target machine code generation.'
      ],
      textbooks: [
        'Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman, "Compilers: Principles, Techniques, and Tools", 2nd Edition, Pearson',
        'Keith D. Cooper, Linda Torczon, "Engineering a Compiler", 2nd Edition, Morgan Kaufmann'
      ]
    },
    'CS351': {
      code: 'CS351',
      name: 'Software Engineering & DevOps',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. B. R. Chandavarkar',
      shortName: 'BRC',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Software Security, DevOps Pipelines, System Testing',
      email: 'brc@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse/faculty/br-chandavarkar',
      room: 'Classroom 74',
      category: 'core',
      notes: 'Agile methodologies, Scrum, UML modeling, software testing (JUnit), CI/CD pipelines, Docker containerization.',
      modules: [
        'Module 1: Software Lifecycle Models & Agile - Waterfall, Prototyping, Spiral models, Agile manifesto, Scrum framework (Sprints, Product Backlog, Stand-ups, Burndown charts), Extreme Programming (XP).',
        'Module 2: Requirements & UML Modeling - SRS document specification (IEEE 830), Use-case diagrams, Class diagrams, Sequence and Activity diagrams, State machine diagrams in StarUML.',
        'Module 3: Testing & Quality Assurance - Black-box testing (Equivalence partitioning, Boundary value analysis), White-box testing (Basis path testing, Cyclomatic complexity, Mutation testing), Unit testing with JUnit.',
        'Module 4: DevOps & Cloud Deployment - Continuous Integration/Continuous Deployment (CI/CD) pipelines using GitHub Actions/Jenkins, Docker containerization, Microservices architecture and Kubernetes basics.'
      ],
      textbooks: [
        'Roger S. Pressman, Bruce R. Maxim, "Software Engineering: A Practitioner Approach", 9th Edition, McGraw-Hill',
        'Ian Sommerville, "Software Engineering", 10th Edition, Pearson'
      ]
    },
    'CS352': {
      code: 'CS352',
      name: 'Cryptography & Network Security',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Damodar Reddy',
      shortName: 'DR',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Applied Cryptography, Number Theory, Cryptanalysis, Blockchain',
      email: 'damodar.reddy@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse/faculty/damodar-reddy',
      room: 'Classroom 74',
      category: 'core',
      notes: 'Symmetric ciphers (AES, DES), asymmetric ciphers (RSA, ECC), SHA-256, digital signatures, TLS/SSL, firewalls.',
      modules: [
        'Module 1: Classical Cryptography & Number Theory - Substitution and transposition ciphers, Modular arithmetic, Extended Euclidean algorithm, Fermat and Euler theorems, Chinese Remainder Theorem (CRT).',
        'Module 2: Symmetric Key Ciphers - Data Encryption Standard (DES), Differential and Linear cryptanalysis concepts, Advanced Encryption Standard (AES), Cipher block modes (ECB, CBC, CFB, OFB, CTR).',
        'Module 3: Public Key Cryptography & Hashes - Diffie-Hellman Key Exchange, RSA algorithm and attacks, Elliptic Curve Cryptography (ECC), Hash functions (SHA-256, SHA-3), HMAC, Digital Signatures (DSA, ECDSA).',
        'Module 4: Network Security Protocols - X.509 certificates, Public Key Infrastructure (PKI), TLS/SSL handshake, IPsec (AH and ESP modes), Intrusion Detection Systems (IDS) and stateful firewalls.'
      ],
      textbooks: [
        'William Stallings, "Cryptography and Network Security: Principles and Practice", 7th Edition, Pearson',
        'Behrouz A. Forouzan, "Cryptography & Network Security", McGraw-Hill'
      ]
    },
    'CS353': {
      code: 'CS353',
      name: 'Cloud Computing & Distributed Systems',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. S. Mini',
      shortName: 'SM',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Cloud Scheduling, Edge Computing, Distributed Algorithms',
      email: 'mini@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse/faculty/s-mini',
      room: 'Classroom 74',
      category: 'core',
      notes: 'Virtualization, hypervisors, IaaS/PaaS/SaaS, distributed consensus (Raft/Paxos), map-reduce architectures.',
      modules: [
        'Module 1: Cloud Architecture & Virtualization - NIST cloud computing reference architecture, Public/Private/Hybrid clouds, Type-1 and Type-2 hypervisors, KVM, Docker containerization vs VMs.',
        'Module 2: Distributed Systems Core - Clock synchronization (Lamport logical clocks, Vector clocks), Mutual exclusion (Ricart-Agrawala algorithm), Election algorithms (Bully and Ring algorithms).',
        'Module 3: Consensus & Fault Tolerance - Byzantine Generals problem, Paxos consensus, Raft protocol, CAP theorem, Two-phase commit (2PC) and Three-phase commit protocols.',
        'Module 4: Big Data & Serverless - MapReduce programming paradigm, Hadoop Distributed File System (HDFS), Apache Spark RDDs, Serverless computing and FaaS (AWS Lambda).'
      ],
      textbooks: [
        'George Coulouris, Jean Dollimore, Tim Kindberg, Gordon Blair, "Distributed Systems: Concepts and Design", 5th Edition, Addison-Wesley',
        'Rajkumar Buyya, Christian Vecchiola, S. Thamarai Selvi, "Mastering Cloud Computing", McGraw-Hill'
      ]
    },
    'CS520': {
      code: 'CS520',
      name: 'Big Data Analytics',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Keshavamurthy',
      shortName: 'KM',
      facultyDesignation: 'Assistant Professor (CSE)',
      facultyResearch: 'Deep Learning, Big Data, Image Analysis',
      email: 'keshava@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse/faculty/keshavamurthy',
      room: 'Classroom 74',
      category: 'elective',
      notes: 'Hadoop ecosystem, MapReduce, Apache Spark RDDs, streaming analytics, NoSQL data modeling.',
      modules: [
        'Module 1: Big Data Landscape & Storage - 5 Vs of Big Data, Distributed file systems, HDFS architecture, block replication, NameNode and DataNode fault recovery.',
        'Module 2: NoSQL Databases - Key-Value (Redis), Columnar (Apache Cassandra, HBase), Document (MongoDB), Graph databases (Neo4j), Brewer CAP theorem.',
        'Module 3: Processing Frameworks - Apache Spark execution engine, Resilient Distributed Datasets (RDDs), Spark DataFrames and Spark SQL, Catalyst optimizer.',
        'Module 4: Stream Analytics & Machine Learning - Apache Kafka real-time publish-subscribe messaging, Spark Streaming, Distributed machine learning with MLlib.'
      ],
      textbooks: [
        'Tom White, "Hadoop: The Definitive Guide", 4th Edition, O Reilly Media',
        'Matei Zaharia et al., "Learning Spark: Lightning-Fast Big Data Analysis", O Reilly'
      ]
    },
    'CS354': {
      code: 'CS354',
      name: 'Compiler & DevOps Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_MON',
      examSlot: 'LAB',
      coordinator: 'Dr. Pravati Swain',
      shortName: 'PS',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Compiler systems and CI/CD development',
      email: 'pravati@nitgoa.ac.in',
      room: 'Software Systems Lab',
      category: 'lab',
      notes: 'Lexical analysis with FLEX, grammar parsing with BISON, syntax directed translation, Docker and GitHub Actions CI/CD.',
      modules: [
        'Lab 1: Design of Lexical Analyzer for C language tokens using FLEX tool.',
        'Lab 2: Implementation of desk calculator and expression parser using BISON parser generator.',
        'Lab 3: Intermediate code generation (Three-Address Code) for conditional and loop constructs.',
        'Lab 4: Automated CI/CD pipeline setup for a microservice using Docker and GitHub Actions.'
      ],
      textbooks: ['Alfred V. Aho, "Compilers", Pearson']
    },
    'CS355': {
      code: 'CS355',
      name: 'Network Security Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_WED',
      examSlot: 'LAB',
      coordinator: 'Dr. Damodar Reddy',
      shortName: 'DR',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Applied Network Security and Pentesting',
      email: 'damodar.reddy@nitgoa.ac.in',
      room: 'Cyber Security Lab',
      category: 'lab',
      notes: 'Wireshark packet analysis, Snort IDS rule creation, OpenSSL cryptographic certificate generation, pen-testing.',
      modules: [
        'Lab 1: Cryptographic implementation of RSA and AES algorithms using OpenSSL C library.',
        'Lab 2: Wireshark packet capture and forensic analysis of TCP 3-way handshake and HTTP/DNS traffic.',
        'Lab 3: Snort Intrusion Detection System configuration and custom alert rule writing for Port Scans and DoS attacks.',
        'Lab 4: Man-in-the-Middle (MitM) ARP poisoning demonstration and mitigation using static ARP tables and DAI.'
      ],
      textbooks: ['William Stallings, "Cryptography and Network Security", Pearson']
    }
  },
  schedule: buildStandardWeeklySchedule({
    prefix: 'cse-s6',
    room: 'Classroom 74',
    slotA: 'CS350',
    slotB: 'CS351',
    slotC: 'CS352',
    slotD: 'CS353',
    slotE: 'CS520',
    labMon: { code: 'CS354', name: 'Compiler & DevOps Laboratory', room: 'Software Systems Lab' },
    labWed: { code: 'CS355', name: 'Network Security Laboratory', room: 'Cyber Security Lab' },
    saturdayFocus: 'Compiler Engineering & Cloud Architecture Workshop',
  }),
};

// ==========================================
// 6th Semester (3rd Year Even) - ECE
// ==========================================
export const ECE_6: SemesterData = {
  courses: {
    'EC350': {
      code: 'EC350',
      name: 'Digital Signal Processing',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Trilochan Panigrahi',
      shortName: 'TP',
      facultyDesignation: 'Associate Professor & HoD (ECE)',
      facultyResearch: 'Digital Signal Processing, Adaptive Filters, Statistical Signal Processing',
      email: 'tpanigrahi@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/ece/faculty/trilochan-panigrahi',
      room: 'Classroom 76',
      category: 'core',
      notes: 'DFT, FFT algorithms (Radix-2 DIT/DIF), IIR filter design (Butterworth, Chebyshev), FIR filters, multirate DSP.',
      modules: [
        'Module 1: Discrete Fourier Transform (DFT) - Properties of DFT, Circular convolution, Linear convolution via DFT, Overlap-Add and Overlap-Save methods.',
        'Module 2: Fast Fourier Transform (FFT) - Radix-2 Decimation-in-Time (DIT) and Decimation-in-Frequency (DIF) FFT algorithms, Computational savings, Chirp-Z transform.',
        'Module 3: IIR Filter Design - Analog filter approximations (Butterworth, Chebyshev Type I & II), Bilinear Transformation method (BTM) and Impulse Invariance method (IIM), Frequency warping.',
        'Module 4: FIR Filter Design & Finite Word Length - Linear phase characteristics, Windowing techniques (Rectangular, Hamming, Hanning, Blackman, Kaiser), Frequency sampling method, Quantization errors.'
      ],
      textbooks: [
        'John G. Proakis, Dimitris G. Manolakis, "Digital Signal Processing: Principles, Algorithms and Applications", 4th Edition, Pearson',
        'Alan V. Oppenheim, Ronald W. Schafer, "Discrete-Time Signal Processing", 3rd Edition, Prentice Hall'
      ]
    },
    'EC351': {
      code: 'EC351',
      name: 'VLSI Design',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. N. Hemalatha',
      shortName: 'NH',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Low Power VLSI, Mixed Signal ICs, Semiconductor Memory Design',
      email: 'hemalatha@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/ece/faculty/hemalatha-n',
      room: 'Classroom 76',
      category: 'core',
      notes: 'MOS transistor theory, CMOS inverter static/dynamic behavior, layout design rules (lambda), stick diagrams, delay models.',
      modules: [
        'Module 1: MOS Transistor Theory - MOS capacitor, Threshold voltage equation, Gradual channel approximation, Velocity saturation, Channel length modulation, Sub-threshold conduction.',
        'Module 2: CMOS Inverter Analysis - DC transfer characteristics, Noise margins, Transient response (Rise time, Fall time, Propagation delay), Static and Dynamic power dissipation.',
        'Module 3: Combinational & Sequential MOS Logic - Static CMOS gates, Ratioed logic, Pass-transistor logic, Transmission gates, Dynamic CMOS logic and Domino logic, Logical effort theory.',
        'Module 4: VLSI Physical Design & Testing - Lambda-based design rules, Euler path for layout optimization, Stick diagrams, Fault models (Stuck-at faults), Scan design and Built-In Self-Test (BIST).'
      ],
      textbooks: [
        'Neil H. E. Weste, David Money Harris, "CMOS VLSI Design: A Circuits and Systems Perspective", 4th Edition, Pearson',
        'Sung-Mo Kang, Yusuf Leblebici, "CMOS Digital Integrated Circuits: Analysis and Design", McGraw-Hill'
      ]
    },
    'EC352': {
      code: 'EC352',
      name: 'Microwave & Antenna Engineering',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. C. Vyjayanthi',
      shortName: 'CV',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Microwave Integrated Circuits, Microstrip Patch Antennas, Radar Systems',
      email: 'vyjayanthi@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/ece/faculty/c-vyjayanthi',
      room: 'Classroom 76',
      category: 'core',
      notes: 'Waveguides, S-parameters, microwave passive components (directional couplers, isolators), antenna fundamentals.',
      modules: [
        'Module 1: Microwave Waveguides & Cavities - TE and TM modes in rectangular and circular waveguides, Cutoff frequency, Guide wavelength, Wave impedance, Resonant cavities and Q-factor.',
        'Module 2: Microwave Network Analysis - Scattering matrix (S-parameters) formulation, Properties of S-matrix, Magic Tee, Directional couplers, Circulators and Isolators.',
        'Module 3: Antenna Fundamentals - Radiation mechanism, Retarded vector potential, Hertzian dipole, Antenna parameters: Radiation pattern, Directivity, Gain, Radiation resistance, Effective aperture.',
        'Module 4: Antenna Arrays & Modern Antennas - Uniform linear arrays, Broadside and End-fire arrays, Pattern multiplication, Yagi-Uda antenna, Microstrip patch antennas and feeding techniques.'
      ],
      textbooks: [
        'David M. Pozar, "Microwave Engineering", 4th Edition, John Wiley & Sons',
        'Constantine A. Balanis, "Antenna Theory: Analysis and Design", 4th Edition, John Wiley & Sons'
      ]
    },
    'EC353': {
      code: 'EC353',
      name: 'Wireless Mobile Communications',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Shivnarayan Patidar',
      shortName: 'SNP',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Wireless Communication Systems, MIMO, Channel Modeling',
      email: 'spatidar@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/ece/faculty/shivnarayan-patidar',
      room: 'Classroom 76',
      category: 'core',
      notes: 'Cellular concept, frequency reuse, handoff, fading channels (Rayleigh/Rician), CDMA, OFDM, 4G LTE/5G NR.',
      modules: [
        'Module 1: Cellular Concepts - Frequency reuse, Channel assignment strategies, Handoff strategies, Interference and system capacity, Cell splitting, Sectoring, Microcell zones.',
        'Module 2: Mobile Radio Propagation - Large-scale path loss, Log-distance path loss model, Log-normal shadowing, Small-scale multipath fading, Doppler shift, Rayleigh and Rician fading distributions.',
        'Module 3: Modulation & Diversity Techniques - Multi-carrier modulation, Orthogonal Frequency Division Multiplexing (OFDM), Cyclic prefix, Diversity techniques (Space, Time, Frequency), RAKE receiver.',
        'Module 4: 4G & 5G Cellular Standards - LTE physical layer architecture, Resource block grid, Multiple-Input Multiple-Output (MIMO) beamforming, Millimeter wave communications in 5G NR.'
      ],
      textbooks: [
        'Theodore S. Rappaport, "Wireless Communications: Principles and Practice", 2nd Edition, Pearson',
        'Andrea Goldsmith, "Wireless Communications", Cambridge University Press'
      ]
    },
    'EC520': {
      code: 'EC520',
      name: 'Embedded RTOS & IoT',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Trilochan Panigrahi',
      shortName: 'TP',
      facultyDesignation: 'Associate Professor & HoD (ECE)',
      facultyResearch: 'Real-Time Embedded Operating Systems, IoT Protocols',
      email: 'tpanigrahi@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/ece/faculty/trilochan-panigrahi',
      room: 'Classroom 76',
      category: 'elective',
      notes: 'FreeRTOS, task scheduling (Rate Monotonic, EDF), inter-task communication, MQTT/CoAP protocols, ESP32 IoT nodes.',
      modules: [
        'Module 1: RTOS Fundamentals - Real-time kernel, Task states, Task control block (TCB), Context switching, Priority inversion and Priority Ceiling protocol.',
        'Module 2: Task Scheduling & Sync in FreeRTOS - Rate Monotonic Scheduling (RMS), Earliest Deadline First (EDF), Semaphores, Mutexes, Event groups, Message queues.',
        'Module 3: IoT Hardware Platforms - ESP32 microcontroller architecture, Dual-core programming, Low power sleep modes, Sensor interfacing via I2C and SPI buses.',
        'Module 4: IoT Communication Protocols - MQTT protocol (QoS levels, Broker architecture), CoAP protocol, BLE GATT profiles, Cloud IoT integration (AWS IoT Core).'
      ],
      textbooks: [
        'Richard Barry, "Mastering the FreeRTOS Real Time Kernel - a Hands-On Tutorial Guide"',
        'Arshdeep Bahga, Vijay Madisetti, "Internet of Things: A Hands-On Approach", Universities Press'
      ]
    },
    'EC354': {
      code: 'EC354',
      name: 'Digital Signal Processing Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_TUE',
      examSlot: 'LAB',
      coordinator: 'Dr. Shivnarayan Patidar',
      shortName: 'SNP',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'DSP Architecture and Implementation',
      email: 'spatidar@nitgoa.ac.in',
      room: 'DSP Lab',
      category: 'lab',
      notes: 'Implementation of FFT algorithms, Butterworth/Chebyshev IIR filters, FIR filter design in MATLAB and TMS320C6713 DSK.',
      modules: [
        'Lab 1: Linear and Circular convolution verification using DFT in MATLAB.',
        'Lab 2: Design and implementation of IIR Butterworth and Chebyshev Low-Pass and Band-Pass filters.',
        'Lab 3: Design of FIR filter using Hamming and Kaiser windows for speech signal filtering.',
        'Lab 4: Audio filtering and real-time audio effect synthesis on Texas Instruments TMS320C6713 DSP processor.'
      ],
      textbooks: ['John G. Proakis, "DSP Laboratory Experiments using MATLAB", Pearson']
    },
    'EC355': {
      code: 'EC355',
      name: 'VLSI Design Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_THU',
      examSlot: 'LAB',
      coordinator: 'Dr. N. Hemalatha',
      shortName: 'NH',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'VLSI CAD Tools and Layout Design',
      email: 'hemalatha@nitgoa.ac.in',
      room: 'VLSI CAD Lab',
      category: 'lab',
      notes: 'Cadence Virtuoso schematic entry, transient/DC simulation, DRC/LVS physical verification of CMOS gates and 6T SRAM.',
      modules: [
        'Lab 1: CMOS Inverter schematic simulation, VTC curve, noise margins and propagation delay in Cadence Virtuoso.',
        'Lab 2: Physical layout design of CMOS Inverter, DRC and LVS checks, Parasitic extraction.',
        'Lab 3: Design and simulation of Transmission Gate based 2-to-1 MUX and D-Latch.',
        'Lab 4: Design, read/write simulation and layout of 6T SRAM memory cell in 45nm/90nm CMOS technology.'
      ],
      textbooks: ['Neil H. E. Weste, "CMOS VLSI Design", Pearson']
    }
  },
  schedule: buildStandardWeeklySchedule({
    prefix: 'ece-s6',
    room: 'Classroom 76',
    slotA: 'EC350',
    slotB: 'EC351',
    slotC: 'EC352',
    slotD: 'EC353',
    slotE: 'EC520',
    labTue: { code: 'EC354', name: 'Digital Signal Processing Laboratory', room: 'DSP Lab' },
    labThu: { code: 'EC355', name: 'VLSI Design Laboratory', room: 'VLSI CAD Lab' },
    saturdayFocus: 'VLSI Cadence Layout & Microwave S-Parameter Workshop',
  }),
};

// ==========================================
// 6th Semester (3rd Year Even) - EEE
// ==========================================
export const EEE_6: SemesterData = {
  courses: {
    'EE350': {
      code: 'EE350',
      name: 'Power System Analysis',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Suresh Mikkili',
      shortName: 'SM',
      facultyDesignation: 'Associate Professor & HoD (EEE)',
      facultyResearch: 'Power System Dynamics, Power Flow Optimization, Fault Analysis',
      email: 'mikkili.suresh@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/eee/faculty/suresh-mikkili',
      room: 'Classroom 52',
      category: 'core',
      notes: 'Bus admittance matrix, Gauss-Seidel and Newton-Raphson load flow, symmetrical components, unsymmetrical faults.',
      modules: [
        'Module 1: Power System Representation - Per unit system, Single line diagram, Impedance and Reactance diagrams, Formulation of Y-Bus matrix via singular transformation and direct inspection.',
        'Module 2: Power Flow Analysis - Problem formulation, Classification of buses (Slack, Generator, Load), Gauss-Seidel method, Newton-Raphson method (Polar coordinates), Fast Decoupled Load Flow (FDLF).',
        'Module 3: Symmetrical Fault Analysis - Transient on a transmission line, Short circuit capacity (SCC), Selection of circuit breakers, Z-Bus building algorithm for 3-phase symmetrical fault calculation.',
        'Module 4: Symmetrical Components & Unsymmetrical Faults - Symmetrical component transformation, Sequence networks of generators, transformers and transmission lines, Single Line-to-Ground (SLG), Line-to-Line (LL), and Double Line-to-Ground (LLG) fault analysis.'
      ],
      textbooks: [
        'John J. Grainger, William D. Stevenson Jr., "Power System Analysis", McGraw-Hill',
        'Hadi Saadat, "Power System Analysis", 3rd Edition, PSA Publishing'
      ]
    },
    'EE351': {
      code: 'EE351',
      name: 'Modern Control Theory',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Amol D Rahulkar',
      shortName: 'ADR',
      facultyDesignation: 'Associate Professor (EEE)',
      facultyResearch: 'State Space Control, Robust Control, Observer Design',
      email: 'amol.rahulkar@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/eee/faculty/amol-rahulkar',
      room: 'Classroom 52',
      category: 'core',
      notes: 'State space representations, controllability, observability, state feedback pole placement, observer design, Lyapunov stability.',
      modules: [
        'Module 1: State Space Modeling - Concept of state, state variables and state model, State models for linear continuous-time systems, Diagonalization, Jordan canonical form, State transition matrix (STM) properties.',
        'Module 2: Controllability & Observability - Kalman and Gilbert tests for controllability and observability, Duality principle, Effect of pole-zero cancellation on controllability and observability.',
        'Module 3: State Feedback Controller & Observers - Full state feedback pole placement design (Ackermann formula), Controllability condition, Full order and minimum order state observer design.',
        'Module 4: Non-linear Systems & Stability - Describing function method for non-linearities (Dead zone, Saturation, Relay), Phase plane method, Singular points, Lyapunov direct method for stability analysis.'
      ],
      textbooks: [
        'Katsuhiko Ogata, "Modern Control Engineering", 5th Edition, Pearson',
        'M. Gopal, "Digital Control and State Variable Methods", 4th Edition, McGraw-Hill'
      ]
    },
    'EE352': {
      code: 'EE352',
      name: 'Electric Drives & Traction',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Sreeraj E.S.',
      shortName: 'SES',
      facultyDesignation: 'Associate Professor (EEE)',
      facultyResearch: 'Electric Drives, Vector Control, Electric Vehicle Powertrains',
      email: 'sreeraj@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/eee/faculty/sreeraj-es',
      room: 'Classroom 52',
      category: 'core',
      notes: 'Four-quadrant operation of DC drives, chopper controlled drives, V/f induction motor drives, vector control, electric traction.',
      modules: [
        'Module 1: Dynamics of Electric Drives - Multi-quadrant operation in speed-torque plane, Equivalent inertia and torque of drive systems, Steady state stability, Closed loop speed and current control.',
        'Module 2: DC Motor Drives - Single phase and three phase fully controlled rectifier fed DC drives, Dual converter operations, Four-quadrant chopper drives for electric vehicles.',
        'Module 3: AC Induction Motor Drives - Stator voltage control, Variable Frequency control (V/f), Voltage Source Inverter (VSI) fed drives, Introduction to Field Oriented Control (FOC / Vector control).',
        'Module 4: Electric Traction Systems - Mechanics of train movement, Speed-time curves (Trapezoidal, Quadrilateral), Tractive effort, Specific energy consumption, Modern AC traction drives.'
      ],
      textbooks: [
        'G. K. Dubey, "Fundamentals of Electrical Drives", 2nd Edition, Narosa Publishing House',
        'R. Krishnan, "Electric Motor Drives: Modeling, Analysis, and Control", Prentice Hall'
      ]
    },
    'EE353': {
      code: 'EE353',
      name: 'High Voltage Engineering',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Anudevi Samuel',
      shortName: 'ADS',
      facultyDesignation: 'Assistant Professor (EEE)',
      facultyResearch: 'Dielectric Insulation, High Voltage Testing, Breakdown Mechanisms',
      email: 'ad.dksamuel@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/eee/faculty/anudevi-samuel',
      room: 'Classroom 52',
      category: 'core',
      notes: 'Breakdown in gases/liquids/solids, generation of high AC/DC/impulse voltages, Marx generator, insulation coordination.',
      modules: [
        'Module 1: Conduction & Breakdown in Dielectrics - Townsend ionization theory, Paschen law in gases, Streamer theory, Cavitation and suspended particle mechanisms in liquid dielectrics, Intrinsic and thermal breakdown in solids.',
        'Module 2: Generation of High Voltages - Cascaded transformers, Cockcroft-Walton voltage multiplier circuit, Marx impulse generator circuit for standard lightning and switching impulses (1.2/50 us wave).',
        'Module 3: High Voltage Measurement Techniques - Sphere gaps, Electrostatic voltmeters, Generating voltmeters, Resistive and Capacitive potential dividers, Peak reading voltmeters.',
        'Module 4: Overvoltage Transients & Insulation Coordination - Lightning and switching surges, Traveling waves on transmission lines, Lightning arresters (Metal Oxide Varistor), Basic Insulation Level (BIL) selection.'
      ],
      textbooks: [
        'M. S. Naidu, V. Kamaraju, "High Voltage Engineering", 5th Edition, McGraw-Hill',
        'E. Kuffel, W. S. Zaengl, J. Kuffel, "High Voltage Engineering: Fundamentals", 2nd Edition, Newnes'
      ]
    },
    'EE520': {
      code: 'EE520',
      name: 'Renewable Energy Integration & Smart Grid',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Suresh Mikkili',
      shortName: 'SM',
      facultyDesignation: 'Associate Professor & HoD (EEE)',
      facultyResearch: 'Photovoltaic Systems, Power Quality, Grid Codes, Battery Energy Storage',
      email: 'mikkili.suresh@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/eee/faculty/suresh-mikkili',
      room: 'Classroom 52',
      category: 'elective',
      notes: 'Solar PV grid integration, MPPT algorithms, wind energy conversion (DFIG/PMSG), smart meters, microgrid stability.',
      modules: [
        'Module 1: Solar PV Grid Systems - PV cell characteristics, Maximum Power Point Tracking (Perturb & Observe, Incremental Conductance), Grid synchronization via Phase Locked Loops (SRF-PLL).',
        'Module 2: Wind Energy Systems - Doubly Fed Induction Generator (DFIG) and Permanent Magnet Synchronous Generator (PMSG) based wind energy conversion, Pitch and yaw control mechanisms.',
        'Module 3: Microgrid & Energy Storage - AC and DC microgrid architectures, Battery Energy Storage Systems (BESS), Droop control strategies for parallel inverters, Islanding detection algorithms.',
        'Module 4: Smart Grid Technologies - Advanced Metering Infrastructure (AMI), Phasor Measurement Units (PMU), Wide Area Monitoring (WAMS), Vehicle-to-Grid (V2G) technology.'
      ],
      textbooks: [
        'Suresh Mikkili, Anup Kumar Panda, "Power Quality Issues in Distributed Generation", CRC Press',
        'Ali Keyhani, "Design of Smart Power Grid Renewable Energy Systems", 2nd Edition, Wiley'
      ]
    },
    'EE354': {
      code: 'EE354',
      name: 'Power Systems Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_TUE',
      examSlot: 'LAB',
      coordinator: 'Dr. Suresh Mikkili',
      shortName: 'SM',
      facultyDesignation: 'Associate Professor & HoD (EEE)',
      facultyResearch: 'Power System Simulation and Relaying',
      email: 'mikkili.suresh@nitgoa.ac.in',
      room: 'Power Systems Simulation Lab',
      category: 'lab',
      notes: 'Load flow analysis using Newton-Raphson in MATLAB/ETAP, symmetrical/unsymmetrical fault simulation, overcurrent relay testing.',
      modules: [
        'Lab 1: Y-Bus and Z-Bus matrix formulation using MATLAB script for an IEEE standard test bus system.',
        'Lab 2: Power flow solution using Newton-Raphson and Gauss-Seidel methods in ETAP software.',
        'Lab 3: Symmetrical (3-phase) and unsymmetrical (LG, LL, LLG) fault analysis on IEEE 14-bus system.',
        'Lab 4: Operating characteristics testing of Numerical Overcurrent and Earth Fault Relays.'
      ],
      textbooks: ['Hadi Saadat, "Power System Analysis", McGraw-Hill']
    },
    'EE355': {
      code: 'EE355',
      name: 'Electric Drives & Simulation Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_THU',
      examSlot: 'LAB',
      coordinator: 'Dr. Sreeraj E.S.',
      shortName: 'SES',
      facultyDesignation: 'Associate Professor (EEE)',
      facultyResearch: 'Drives and Power Electronic Systems',
      email: 'sreeraj@nitgoa.ac.in',
      room: 'Power Electronics & Drives Lab',
      category: 'lab',
      notes: 'Speed control of 3-phase induction motor using DSP/FPGA controlled VSI, chopper fed DC motor drive, vector control simulation.',
      modules: [
        'Lab 1: Four-quadrant chopper-fed DC motor drive speed control and regenerative braking demonstration.',
        'Lab 2: V/f speed control of 3-Phase Squirrel Cage Induction Motor using Space Vector PWM inverter.',
        'Lab 3: MATLAB/Simulink simulation of Field Oriented Vector Control (FOC) of Induction Motor.',
        'Lab 4: Digital signal processor (DSP TMS320F28335) based gating pulse generation for 3-phase inverter drives.'
      ],
      textbooks: ['G. K. Dubey, "Fundamentals of Electrical Drives", Narosa']
    }
  },
  schedule: buildStandardWeeklySchedule({
    prefix: 'eee-s6',
    room: 'Classroom 52',
    slotA: 'EE350',
    slotB: 'EE351',
    slotC: 'EE352',
    slotD: 'EE353',
    slotE: 'EE520',
    labTue: { code: 'EE354', name: 'Power Systems Laboratory', room: 'Power Systems Simulation Lab' },
    labThu: { code: 'EE355', name: 'Electric Drives & Simulation Laboratory', room: 'Power Electronics & Drives Lab' },
    saturdayFocus: 'Power Flow & State Space Controller Clinic',
  }),
};

// ==========================================
// 6th Semester (3rd Year Even) - ME
// ==========================================
export const ME_6: SemesterData = {
  courses: {
    'ME350': {
      code: 'ME350',
      name: 'Dynamics of Machinery',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Gaurav Saxena',
      shortName: 'GS',
      facultyDesignation: 'Assistant Professor & HoD (Mechanical)',
      facultyResearch: 'Vibrations, Multi-degree of Freedom Systems, Balancing',
      email: 'gaurav@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/me/faculty/gaurav-saxena',
      room: 'Classroom 71',
      category: 'core',
      notes: 'Flywheels, balancing of multi-cylinder inline engines, free/damped vibrations, 2-DOF systems, vibration isolation.',
      modules: [
        'Module 1: Turning Moment & Flywheels - Turning moment diagrams of single and multi-cylinder engines, Fluctuation of energy and speed, Flywheel design for punching presses and IC engines.',
        'Module 2: Balancing of Rotating & Reciprocating Masses - Static and dynamic balancing of multiple masses in several planes, Balancing of multi-cylinder inline engines, V-engines, Direct and reverse cranks.',
        'Module 3: Single Degree of Freedom Vibrations - Free undamped and damped vibrations (Viscous, Coulomb damping), Logarithmic decrement, Forced vibrations with harmonic excitation, Vibration isolation and transmissibility.',
        'Module 4: Two Degree of Freedom Systems - Principal modes of vibration, Coordinate coupling, Dynamic vibration absorber (tuned mass damper), Critical speed of shafts (Whirling of shafts).'
      ],
      textbooks: [
        'Singiresu S. Rao, "Mechanical Vibrations", 6th Edition, Pearson',
        'S. S. Rattan, "Theory of Machines", McGraw-Hill'
      ]
    },
    'ME351': {
      code: 'ME351',
      name: 'Design of Machine Elements - II',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Prasanth A. S.',
      shortName: 'PAS',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Machine Design, Fatigue and Failure Analysis, Gear Drives',
      email: 'prasanth@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/me/faculty/prasanth-as',
      room: 'Classroom 71',
      category: 'core',
      notes: 'Design of spur, helical, bevel, worm gears, hydrodynamic bearings, rolling contact bearings, IC engine parts (piston, connecting rod).',
      modules: [
        'Module 1: Gear Design Principles - Beam strength of spur gear teeth (Lewis equation), Dynamic tooth load (Buckingham equation), Wear strength, Design of helical and bevel gears.',
        'Module 2: Worm Gears & Sliding Contact Bearings - Worm gear force analysis and thermal equilibrium, Hydrodynamic lubrication theory (Petroff and Reynolds equations), Raimondi and Boyd charts, Bearing design.',
        'Module 3: Rolling Contact Bearings - Static and dynamic load carrying capacities, Equivalent radial load, Rating life (L10 life), Selection of ball and roller bearings from manufacturer catalogs.',
        'Module 4: IC Engine Components Design - Design of trunk type cast iron and aluminum pistons, Connecting rod buckling design (Rankine formula), Crankshaft and flywheel design.'
      ],
      textbooks: [
        'V. B. Bhandari, "Design of Machine Elements", 4th Edition, McGraw-Hill',
        'Joseph E. Shigley, Charles R. Mischke, "Mechanical Engineering Design", McGraw-Hill'
      ]
    },
    'ME352': {
      code: 'ME352',
      name: 'Automobile Engineering',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Sandip Rathod',
      shortName: 'SR',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Automotive Powertrains, Alternate Fuels, Vehicle Dynamics',
      email: 'sandip@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/me/faculty/sandip-rathod',
      room: 'Classroom 71',
      category: 'core',
      notes: 'Chassis layout, transmission (clutch, gearbox, differential), suspension, steering geometry, braking systems, EV powertrain.',
      modules: [
        'Module 1: Vehicle Architecture & Powertrains - Front-engine rear-drive, Front-wheel drive configurations, Frame types, Aerodynamic drag and rolling resistance calculation.',
        'Module 2: Transmission Systems - Friction clutches (Single plate, Multi-plate), Synchromesh gearbox, Epicyclic automatic transmission, Propeller shaft, Universal joints, Differential mechanism.',
        'Module 3: Steering, Suspension & Braking - Steering geometry (Castor, Camber, Kingpin inclination, Toe-in/out), Independent suspension (MacPherson strut, Double wishbone), Hydraulic and Air brakes, Anti-lock Braking System (ABS).',
        'Module 4: Electric & Hybrid Vehicles - Series, Parallel, and Series-Parallel hybrid architectures, Regenerative braking, Lithium-ion battery packs, Battery Management Systems (BMS), Traction motor topologies.'
      ],
      textbooks: [
        'Kripal Singh, "Automobile Engineering Volume 1 & 2", Standard Publishers',
        'William H. Crouse, Donald L. Anglin, "Automotive Mechanics", 10th Edition, McGraw-Hill'
      ]
    },
    'ME353': {
      code: 'ME353',
      name: 'Metrology & Computer Aided Inspection',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Sachin D. Kore',
      shortName: 'SDK',
      facultyDesignation: 'Professor (Mechanical)',
      facultyResearch: 'Precision Engineering, Inspection, High Velocity Manufacturing',
      email: 'sachin@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/me/faculty/sachin-kore',
      room: 'Classroom 71',
      category: 'core',
      notes: 'Linear/angular measurements, comparators, interferometry, surface roughness (Ra, Rz), Coordinate Measuring Machines (CMM).',
      modules: [
        'Module 1: Standards of Measurement & Limits/Fits - Line and end standards, Abbe principle, System of limits and fits (IS 919), Tolerance grades, Hole basis and shaft basis systems, Taylor principle for gauge design.',
        'Module 2: Comparators & Optical Metrology - Mechanical, Optical, Electrical and Pneumatic comparators (Solex comparator), Optical flat interferometry, NPL flatness interferometer.',
        'Module 3: Surface Roughness & Gear Metrology - Terminology of surface finish, CLA and RMS values, Stylus probe instruments, Gear tooth caliper, Parkinson gear tester, Pitch error measurement.',
        'Module 4: CMM & Machine Vision Inspection - Coordinate Measuring Machine (CMM) construction and probing systems, Laser interferometry for machine tool calibration, Machine vision inspection.'
      ],
      textbooks: [
        'R. K. Jain, "Engineering Metrology", 21st Edition, Khanna Publishers',
        'I. C. Gupta, "A Text Book of Engineering Metrology", Dhanpat Rai Publications'
      ]
    },
    'ME520': {
      code: 'ME520',
      name: 'Computational Fluid Dynamics (CFD)',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Ravi Ragoju',
      shortName: 'RR',
      facultyDesignation: 'Associate Professor (Mathematics)',
      facultyResearch: 'Fluid Dynamics and CFD Numerical Modeling',
      email: 'raviragoju@nitgoa.ac.in',
      room: 'Classroom 71',
      category: 'elective',
      notes: 'Governing equations, finite volume method (FVM), SIMPLE algorithm for pressure-velocity coupling, turbulence modeling.',
      modules: [
        'Module 1: Governing Equations of Fluid Flow - Continuity, Momentum (Navier-Stokes) and Energy equations in conservative form, Mathematical nature of PDEs (Elliptic, Parabolic, Hyperbolic).',
        'Module 2: Finite Difference & Finite Volume Formulation - Discretization of 1D steady-state diffusion, Central differencing scheme, Upwind differencing scheme, False diffusion.',
        'Module 3: Pressure-Velocity Coupling - Staggered grid concept, Semi-Implicit Method for Pressure-Linked Equations (SIMPLE) algorithm, SIMPLER and PISO algorithms.',
        'Module 4: Turbulence Modeling & Validation - Reynolds-Averaged Navier-Stokes (RANS) equations, Reynolds stresses, Eddy viscosity models (k-epsilon and k-omega models), Boundary conditions and convergence criteria.'
      ],
      textbooks: [
        'H. K. Versteeg, W. Malalasekera, "An Introduction to Computational Fluid Dynamics: The Finite Volume Method", 2nd Edition, Pearson',
        'John D. Anderson Jr., "Computational Fluid Dynamics: The Basics with Applications", McGraw-Hill'
      ]
    },
    'ME354': {
      code: 'ME354',
      name: 'Heat Transfer & Metrology Lab',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_MON',
      examSlot: 'LAB',
      coordinator: 'Dr. Prasanth A. S.',
      shortName: 'PAS',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Heat Transfer Testing and Precision Measurement',
      email: 'prasanth@nitgoa.ac.in',
      room: 'Heat Transfer & Metrology Lab',
      category: 'lab',
      notes: 'Thermal conductivity of metal rod, natural/forced convection from pin fin, Stefan-Boltzmann constant, CMM measurement.',
      modules: [
        'Lab 1: Determination of thermal conductivity of metal rod under steady state conduction.',
        'Lab 2: Heat transfer coefficient and fin efficiency determination in Natural and Forced convection on Pin-Fin rig.',
        'Lab 3: Experimental verification of Stefan-Boltzmann constant of thermal radiation.',
        'Lab 4: Coordinate Measuring Machine (CMM) measurement of hole diameter, pitch, and profile tolerances.'
      ],
      textbooks: ['Frank P. Incropera, "Fundamentals of Heat and Mass Transfer", Wiley']
    },
    'ME355': {
      code: 'ME355',
      name: 'Automobile & Engines Lab',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_WED',
      examSlot: 'LAB',
      coordinator: 'Dr. Sandip Rathod',
      shortName: 'SR',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Automotive Engine Testing',
      email: 'sandip@nitgoa.ac.in',
      room: 'Automobile Lab',
      category: 'lab',
      notes: 'Dismantling and assembly of multi-cylinder engine, differential gear box, wheel alignment and exhaust emission analysis.',
      modules: [
        'Lab 1: Complete dismantling, study and assembly of 4-stroke multi-cylinder automotive petrol/diesel engine.',
        'Lab 2: Inspection and backlash adjustment of automotive differential mechanism and final drive.',
        'Lab 3: Wheel balancing and computerized wheel alignment (Camber, Castor, Toe angles measurement).',
        'Lab 4: Exhaust gas emission measurement (CO, HC, NOx) using 5-gas exhaust analyzer as per BS-VI norms.'
      ],
      textbooks: ['Kripal Singh, "Automobile Engineering", Standard Publishers']
    }
  },
  schedule: buildStandardWeeklySchedule({
    prefix: 'me-s6',
    room: 'Classroom 71',
    slotA: 'ME350',
    slotB: 'ME351',
    slotC: 'ME352',
    slotD: 'ME353',
    slotE: 'ME520',
    labMon: { code: 'ME354', name: 'Heat Transfer & Metrology Lab', room: 'Heat Transfer & Metrology Lab' },
    labWed: { code: 'ME355', name: 'Automobile & Engines Lab', room: 'Automobile Lab' },
    saturdayFocus: 'Machine Element Design & Dynamics Problem Clinic',
  }),
};

// ==========================================
// 6th Semester (3rd Year Even) - CVE
// ==========================================
export const CVE_6: SemesterData = {
  courses: {
    'CE350': {
      code: 'CE350',
      name: 'Design of Reinforced Concrete Structures',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Harikumar M.',
      shortName: 'HM',
      facultyDesignation: 'Assistant Professor & HoD (Civil Engineering)',
      facultyResearch: 'Reinforced Concrete Design, Earthquake Engineering, IS 456 Standards',
      email: 'harikumar@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cve/faculty/harikumar-m',
      room: 'Civil Hall 01',
      category: 'core',
      notes: 'Limit state method (IS 456:2000), design of singly/doubly reinforced beams, flanged beams, slabs, columns, footings.',
      modules: [
        'Module 1: Limit State Method Principles - Working Stress Method vs Limit State Method, Characteristic loads and strengths, Partial safety factors, Stress block parameters for concrete and steel as per IS 456:2000.',
        'Module 2: Beams & Shear Design - Singly reinforced, Doubly reinforced rectangular and T-beams, Design for flexure, Design for shear and torsion, Development length and anchorage of bars.',
        'Module 3: Slabs & Stairs Design - One-way simply supported and continuous slabs, Two-way slabs with corners held down (Rankine-Grashoff and IS code coefficients), Design of dog-legged staircases.',
        'Module 4: Columns & Isolated Footings - Short axially loaded columns with lateral ties and helical reinforcement, Uniaxial and biaxial bending of columns (Interaction curves), Design of isolated rectangular footings.'
      ],
      textbooks: [
        'S. Unnikrishna Pillai, Devdas Menon, "Reinforced Concrete Design", 3rd Edition, McGraw-Hill',
        'P. C. Varghese, "Limit State Design of Reinforced Concrete", 2nd Edition, PHI Learning'
      ]
    },
    'CE351': {
      code: 'CE351',
      name: 'Geotechnical Engineering - II (Foundations)',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Sneha M.',
      shortName: 'SMN',
      facultyDesignation: 'Assistant Professor (Civil Engineering)',
      facultyResearch: 'Foundation Engineering, Deep Foundations, Soil Improvement',
      email: 'sneha@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cve/faculty/sneha-m',
      room: 'Civil Hall 01',
      category: 'core',
      notes: 'Earth pressure theories (Rankine/Coulomb), slope stability, Terzaghi bearing capacity, settlement of shallow footings, pile foundations.',
      modules: [
        'Module 1: Lateral Earth Pressure - At-rest, Active and Passive earth pressures, Rankine theory for cohesionless and cohesive soils with surcharges, Coulomb wedge theory, Rebhann and Culmann graphical constructions.',
        'Module 2: Stability of Slopes - Infinite slopes in sand and clay, Finite slopes, Swedish slip circle method, Friction circle method, Bishop simplified method, Taylor stability number.',
        'Module 3: Bearing Capacity of Shallow Foundations - Terzaghi general bearing capacity theory, Meyerhof and IS 6403 formulations, Effect of water table, Plate load test, Standard Penetration Test (SPT N-value corrections).',
        'Module 4: Deep Pile Foundations - Classification of piles, Load carrying capacity of single pile in clay and sand (Static and dynamic formulae), Pile group capacity and efficiency, Settlement of pile groups, Negative skin friction.'
      ],
      textbooks: [
        'Braja M. Das, "Principles of Foundation Engineering", 9th Edition, Cengage Learning',
        'V. N. S. Murthy, "Soil Mechanics and Foundation Engineering", CBS Publishers'
      ]
    },
    'CE352': {
      code: 'CE352',
      name: 'Environmental Engineering - II (Wastewater)',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Mini K.M.',
      shortName: 'MKM',
      facultyDesignation: 'Associate Professor (Civil Engineering)',
      facultyResearch: 'Wastewater Treatment, Biological Reactor Modeling, Sludge Management',
      email: 'minikm@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cve/faculty/mini-km',
      room: 'Civil Hall 01',
      category: 'core',
      notes: 'Sewer design, wastewater characteristics (BOD, COD), primary treatment, activated sludge process, trickling filters, sludge digestion.',
      modules: [
        'Module 1: Sewerage Systems & Wastewater Characteristics - Separate vs combined systems, Hydraulic design of circular sewers (Manning formula), Self-cleansing velocity, BOD kinetics, COD, Population equivalent.',
        'Module 2: Primary Sewage Treatment - Screen chambers, Grit removal channels, Primary sedimentation tanks (design principles and surface overflow rates).',
        'Module 3: Secondary Biological Treatment - Activated Sludge Process (ASP) design (F/M ratio, Mean Cell Residence Time, Volumetric loading), Trickling filters (Standard and High-rate), Sequencing Batch Reactors (SBR).',
        'Module 4: Sludge Treatment & Disposal - Anaerobic sludge digestion stages, Design of high-rate digesters, Methane generation, Sludge dewatering, Septic tank design and soak pit dimensions.'
      ],
      textbooks: [
        'Metcalf & Eddy, "Wastewater Engineering: Treatment and Resource Recovery", 5th Edition, McGraw-Hill',
        'S. K. Garg, "Sewage Disposal and Air Pollution Engineering (Environmental Engineering Vol. II)", Khanna Publishers'
      ]
    },
    'CE353': {
      code: 'CE353',
      name: 'Water Resources Engineering',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. S. K. Patel',
      shortName: 'SKP',
      facultyDesignation: 'Assistant Professor (Civil Engineering)',
      facultyResearch: 'Hydrology, Water Resources Planning, GIS in Water Modeling',
      email: 'skpatel@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cve/faculty/sk-patel',
      room: 'Civil Hall 01',
      category: 'core',
      notes: 'Hydrologic cycle, precipitation analysis, hydrographs (Unit Hydrograph, S-curve), crop water requirements, irrigation canals.',
      modules: [
        'Module 1: Hydrologic Cycle & Precipitation - Water budget equation, Rain gauges, Mean areal rainfall (Thiessen polygon, Isohyetal methods), Infiltration indices (phi and W indices).',
        'Module 2: Runoff & Hydrograph Analysis - Factors affecting runoff, Stream flow measurement, Unit Hydrograph (UH) theory, Derivation of unit hydrograph from flood hydrograph, S-curve method for duration conversion.',
        'Module 3: Crop Water Requirements & Irrigation - Consumptive use, Field capacity, Permanent wilting point, Duty, Delta and Base period relations, Irrigation efficiencies, Lacey and Kennedy silt theories for canal design.',
        'Module 4: Dams & Spillways - Gravity dams (forces, stability analysis, elementary profile), Ogee spillways, Stilling basins and energy dissipators.'
      ],
      textbooks: [
        'K. Subramanya, "Engineering Hydrology", 4th Edition, McGraw-Hill',
        'B. C. Punmia, Pande B. B. Lal, "Irrigation and Water Power Engineering", Laxmi Publications'
      ]
    },
    'CE520': {
      code: 'CE520',
      name: 'Ground Improvement Techniques',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Sneha M.',
      shortName: 'SMN',
      facultyDesignation: 'Assistant Professor (Civil Engineering)',
      facultyResearch: 'Geotextiles, Soil Stabilization, Grouting',
      email: 'sneha@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cve/faculty/sneha-m',
      room: 'Civil Hall 01',
      category: 'elective',
      notes: 'Vibro-compaction, stone columns, preloading with vertical drains, chemical grouting, geosynthetics and reinforced earth.',
      modules: [
        'Module 1: Mechanical Modification - Shallow and deep compaction, Dynamic compaction, Vibro-flotation and Vibro-replacement, Stone columns design and construction in soft marine clay.',
        'Module 2: Hydraulic Modification - Dewatering systems (Well point and Deep well systems), Preloading with Prefabricated Vertical Drains (PVD), Vacuum consolidation mechanism.',
        'Module 3: Chemical Stabilization - Soil stabilization using lime, cement, fly ash, and bitumen, Grouting techniques (Permeation, Compaction, Jet grouting).',
        'Module 4: Geosynthetics & Reinforced Earth - Functions of geotextiles, geogrids, and geomembranes (Separation, Filtration, Drainage, Reinforcement), Design of reinforced earth retaining walls.'
      ],
      textbooks: [
        'P. Purushothama Raj, "Ground Improvement Techniques", Laxmi Publications',
        'Robert M. Koerner, "Designing with Geosynthetics", 6th Edition, Xlibris'
      ]
    },
    'CE354': {
      code: 'CE354',
      name: 'Structural Concrete Design Lab',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_TUE',
      examSlot: 'LAB',
      coordinator: 'Dr. Harikumar M.',
      shortName: 'HM',
      facultyDesignation: 'Assistant Professor & HoD (Civil)',
      facultyResearch: 'Structural Analysis & Design Software',
      email: 'harikumar@nitgoa.ac.in',
      room: 'CAD / Structural Design Lab',
      category: 'lab',
      notes: 'Structural modeling of multi-story G+4 building in STAAD.Pro/ETABS, reinforcement detailing as per SP 34.',
      modules: [
        'Lab 1: Modeling and load application (Dead, Live, Wind as per IS 875) for a G+3 building in STAAD.Pro.',
        'Lab 2: Seismic analysis and response spectrum design of reinforced concrete frame as per IS 1893:2016.',
        'Lab 3: Design and detailing of continuous beams, two-way slabs, and column-footing junctions in AutoCAD.',
        'Lab 4: Ductile detailing of earthquake-resistant RC buildings conforming to IS 13920:2016.'
      ],
      textbooks: ['SP 34: Handbook on Concrete Reinforcement and Detailing, Bureau of Indian Standards']
    },
    'CE355': {
      code: 'CE355',
      name: 'Environmental Quality Testing Lab',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'LAB_THU',
      examSlot: 'LAB',
      coordinator: 'Dr. Mini K.M.',
      shortName: 'MKM',
      facultyDesignation: 'Associate Professor (Civil)',
      facultyResearch: 'Water and Wastewater Analytics',
      email: 'minikm@nitgoa.ac.in',
      room: 'Environmental Quality Lab',
      category: 'lab',
      notes: 'Chemical Oxygen Demand (COD), mixed liquor suspended solids (MLSS), Sludge Volume Index (SVI), ambient air quality PM2.5/PM10.',
      modules: [
        'Lab 1: Chemical Oxygen Demand (COD) estimation of domestic wastewater by closed reflux titrimetric method.',
        'Lab 2: Measurement of Mixed Liquor Suspended Solids (MLSS) and determination of Sludge Volume Index (SVI).',
        'Lab 3: High Volume Air Sampler operation for ambient PM10 and PM2.5 particulate matter measurement.',
        'Lab 4: Environmental noise level measurement in decibels (dB) across various zones of the NIT Goa campus.'
      ],
      textbooks: ['APHA, "Standard Methods for the Examination of Water and Wastewater"']
    }
  },
  schedule: buildStandardWeeklySchedule({
    prefix: 'cve-s6',
    room: 'Civil Hall 01',
    slotA: 'CE350',
    slotB: 'CE351',
    slotC: 'CE352',
    slotD: 'CE353',
    slotE: 'CE520',
    labTue: { code: 'CE354', name: 'Structural Concrete Design Lab', room: 'CAD / Structural Design Lab' },
    labThu: { code: 'CE355', name: 'Environmental Quality Testing Lab', room: 'Environmental Quality Lab' },
    saturdayFocus: 'Reinforced Concrete Design & Wastewater Engineering Clinic',
  }),
};
