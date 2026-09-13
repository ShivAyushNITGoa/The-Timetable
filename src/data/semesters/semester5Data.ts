import { Course, TimeSlot, DayOfWeek, WEEKLY_SCHEDULE as EEE5_WEEKLY_SCHEDULE, COURSES as EEE5_COURSES } from '../timetableData';
import { buildInstituteMasterSchedule } from './scheduleBuilder';
import { SemesterData } from './semester3Data';

// ==========================================
// 5th Semester (3rd Year Odd) - CSE (Room 56/57)
// Faculty Advisor: Dr. S. Mini (mini@nitgoa.ac.in)
// ==========================================
export const CSE_5: SemesterData = {
  courses: {
    'CS303': {
      code: 'CS303',
      name: 'Number Theory and Cryptography',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Chirag N Modi',
      shortName: 'MCN',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Cloud Security, Cryptography, Blockchain, Information Security',
      email: 'cnmodi@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse',
      room: 'Room 56/57',
      category: 'core',
      notes: 'Teaching Slot A (Mon 09:00, Tue 11:00, Thu 10:00). Divisibility, Euclidean algorithm, modular arithmetic, RSA, discrete logarithms, ECC, and digital signatures.',
      modules: [
        'Module 1: Fundamentals of Number Theory - Divisibility, Euclidean and Extended Euclidean algorithms, Congruences, Chinese Remainder Theorem, Fermat and Euler theorems, Primitive roots.',
        'Module 2: Classical & Symmetric Cryptography - Stream and Block ciphers, Shannon secrecy, DES, Advanced Encryption Standard (AES), Modes of operation (CBC, CTR, GCM).',
        'Module 3: Asymmetric Cryptosystems - One-way trapdoor functions, RSA cryptosystem, Diffie-Hellman key exchange, Discrete Logarithm problem, Elliptic Curve Cryptography (ECC).',
        'Module 4: Cryptographic Hashes & Authentication - SHA-256, SHA-3, Message Authentication Codes (HMAC), Digital Signature Standard (ECDSA), Zero-Knowledge proofs.'
      ],
      textbooks: [
        'William Stallings, "Cryptography and Network Security: Principles and Practice", 8th Edition, Pearson',
        'Neal Koblitz, "A Course in Number Theory and Cryptography", Springer'
      ]
    },
    'CS301': {
      code: 'CS301',
      name: 'Introduction to Machine Learning',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Contract Faculty 1',
      shortName: 'CF1',
      facultyDesignation: 'Contract Faculty (Department of CSE)',
      facultyResearch: 'Machine Learning, Predictive Modeling, Pattern Recognition',
      email: 'cf1.cse@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse',
      room: 'Room 56/57',
      category: 'core',
      notes: 'Teaching Slot B (Mon 10:00, Wed 09:00, Thu 11:00). Supervised learning, linear and logistic regression, decision trees, SVM, clustering, neural network basics.',
      modules: [
        'Module 1: Introduction & Linear Models - Machine learning taxonomy, Linear Regression, gradient descent, polynomial regression, Ridge and Lasso regularization, Logistic Regression, Cross-Entropy loss.',
        'Module 2: Tree-Based Models & SVM - Decision Trees, ID3 and CART algorithms, Random Forests, AdaBoost, Gradient Boosting, Support Vector Machines (linear and kernel tricks).',
        'Module 3: Unsupervised Learning & Dimensionality Reduction - K-Means clustering, hierarchical clustering, Gaussian Mixture Models, Principal Component Analysis (PCA), t-SNE.',
        'Module 4: Neural Networks Foundations - Perceptron, Multi-Layer Perceptron (MLP), Backpropagation algorithm, activation functions, loss surfaces, evaluation metrics (ROC-AUC, Precision-Recall).'
      ],
      textbooks: [
        'Christopher M. Bishop, "Pattern Recognition and Machine Learning", Springer',
        'Tom M. Mitchell, "Machine Learning", McGraw-Hill'
      ]
    },
    'CS300': {
      code: 'CS300',
      name: 'Operating Systems',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Mrs. Sreedivya',
      shortName: 'SD',
      facultyDesignation: 'Faculty (Department of CSE)',
      facultyResearch: 'Operating Systems, Systems Software, Distributed Computing',
      email: 'sreedivya@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse',
      room: 'Room 56/57',
      category: 'core',
      notes: 'Teaching Slot C (Mon 11:00, Wed 10:00, Fri 09:00). Process lifecycle, CPU scheduling, synchronization, semaphores, deadlock detection and avoidance, paging, segmentation, virtual memory.',
      modules: [
        'Module 1: Process & Thread Management - Operating system structures, system calls, process state transitions, PCB, context switching, CPU scheduling algorithms (FCFS, SJF, Round Robin, Priority).',
        'Module 2: Synchronization & Concurrency - Critical section problem, Peterson algorithm, hardware atomic instructions, semaphores, mutex locks, classic synchronization problems (Dining Philosophers, Readers-Writers).',
        'Module 3: Deadlocks - System model, deadlock characterization, Resource Allocation Graph, deadlock prevention, avoidance (Banker algorithm), detection and recovery strategies.',
        'Module 4: Memory Management & Storage - Contiguous allocation, Paging, TLB, Segmentation, Demand paging, Page replacement algorithms (FIFO, LRU, Optimal), File systems, disk scheduling (SCAN, C-SCAN).'
      ],
      textbooks: [
        'Abraham Silberschatz, Peter B. Galvin, Greg Gagne, "Operating System Concepts", 10th Edition, Wiley',
        'Andrew S. Tanenbaum, Herbert Bos, "Modern Operating Systems", 4th Edition, Pearson'
      ]
    },
    'CS505': {
      code: 'CS505',
      name: 'Data Mining and Data Warehousing (Elective - I)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Venkatnareshbabu Kuppili',
      shortName: 'VNK',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Data Mining, Machine Learning, Deep Learning, Big Data',
      email: 'venkatnaresh@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse',
      room: 'Room 56/57',
      category: 'elective',
      notes: 'Teaching Slot E (Tue 09:00, Wed 12:00, Fri 11:00). Data warehousing architectures, OLAP, Apriori algorithm, association rule mining, advanced classification, and cluster analysis.',
      modules: [
        'Module 1: Data Warehousing & OLAP - Data warehouse architecture, Multidimensional data models, Star, Snowflake, Fact Constellation schemas, OLAP operations (Roll-up, Drill-down, Slice, Dice).',
        'Module 2: Data Preprocessing & Association Rules - Data cleaning, integration, transformation, discretization, Market Basket Analysis, Apriori algorithm, FP-Growth algorithm, rule evaluation metrics.',
        'Module 3: Classification Algorithms - Decision tree induction, Naive Bayes classifier, Rule-based classification, support vector classifiers, model evaluation and ensemble techniques.',
        'Module 4: Cluster Analysis & Outlier Detection - Partitioning methods (K-Means, K-Medoids), Density-based clustering (DBSCAN), Grid-based methods, Outlier detection algorithms.'
      ],
      textbooks: [
        'Jiawei Han, Micheline Kamber, Jian Pei, "Data Mining: Concepts and Techniques", 3rd Edition, Morgan Kaufmann',
        'Pang-Ning Tan, Michael Steinbach, Vipin Kumar, "Introduction to Data Mining", Pearson'
      ]
    },
    'CS302': {
      code: 'CS302',
      name: 'Design and Analysis of Algorithm',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'F',
      examSlot: 'F',
      coordinator: 'Dr. Damodar Reddy E',
      shortName: 'DRE',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Algorithm Design, Approximation Algorithms, Computational Geometry',
      email: 'damodar.reddy@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse',
      room: 'Room 56/57',
      category: 'core',
      notes: 'Teaching Slot F (Tue 10:00, Thu 09:00, Fri 12:00). Asymptotic analysis, divide & conquer, dynamic programming, greedy algorithms, network flows, NP-completeness.',
      modules: [
        'Module 1: Analysis Foundations & Divide and Conquer - Asymptotic notations, Master Theorem, recurrence relations, Strassen matrix multiplication, QuickSelect, closest pair of points.',
        'Module 2: Greedy Strategy & Dynamic Programming - Fractional knapsack, Huffman codes, Prim and Kruskal MST, Matrix chain multiplication, Longest Common Subsequence (LCS), 0/1 Knapsack, Bellman-Ford.',
        'Module 3: Graph Algorithms & Network Flows - All-pairs shortest path (Floyd-Warshall), Maximum flow (Ford-Fulkerson, Edmonds-Karp), Max-flow Min-cut theorem, Bipartite matching.',
        'Module 4: NP-Completeness & Approximation - P, NP, NP-Hard, NP-Complete classes, Cook-Levin theorem, polynomial reductions (3-SAT to CLIQUE, VERTEX-COVER), vertex cover and TSP approximations.'
      ],
      textbooks: [
        'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein, "Introduction to Algorithms", 4th Edition, MIT Press',
        'Jon Kleinberg, Éva Tardos, "Algorithm Design", Pearson'
      ]
    },
    'CS306': {
      code: 'CS306',
      name: 'Technical Seminar',
      type: 'Theory',
      credits: 1,
      ltp: '0-0-1',
      teachingSlot: 'Wednesday 16:00 - 16:55',
      examSlot: 'Seminar',
      coordinator: 'Dr. Keshavamurthy B N',
      shortName: 'BNK',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Data Mining, Network Security, Machine Learning',
      email: 'bnkeshav.fcse@nitgoa.ac.in',
      room: 'Room 56/57',
      category: 'core',
      notes: 'Wednesday 16:00 - 16:55. Literature review, research paper presentation, technical documentation, and seminar viva.',
      modules: [
        'Module 1: Research Problem Formulation - Literature survey of peer-reviewed IEEE/ACM journals, gap analysis, and scientific objective formulation.',
        'Module 2: Technical Synthesis & Report Drafting - Technical report preparation using LaTeX, structured methodology documentation, and reference management.',
        'Module 3: Visual Communication & Presentation - Slide design, scientific data visualization, time budgeting, and technical oral presentation skills.',
        'Module 4: Technical Defense & Viva - Oral defense before the faculty evaluation committee, defending algorithmic choices, and fielding peer inquiries.'
      ],
      textbooks: [
        'Selected IEEE/ACM Computer Society Transactions and Conference Proceedings',
        'David F. Beer, David McMurrey, "A Guide to Writing as an Engineer", John Wiley'
      ]
    },
    'HU350': {
      code: 'HU350',
      name: 'Professional Ethics and Human Values',
      type: 'MLC',
      credits: 1,
      ltp: '1-0-0',
      teachingSlot: 'Friday 16:00 - 16:55 (Slot MLC)',
      examSlot: 'Friday MLC',
      coordinator: 'Dr Unais K T',
      shortName: 'UKT',
      facultyDesignation: 'Assistant Professor (Humanities)',
      facultyResearch: 'Professional Ethics, Philosophy, Value Systems',
      email: 'unaiskt@nitgoa.ac.in',
      room: 'Room 56/57',
      category: 'mlc',
      notes: 'Friday 16:00 - 16:55. Engineering ethics, code of conduct, moral dilemmas, intellectual property, environmental responsibility.',
      modules: [
        'Module 1: Human Values & Engineering Ethics - Morals, values, integrity, work ethic, service learning, civic virtue, respect for others, living peacefully, caring, sharing, honesty, courage, valuing time, cooperation, commitment, empathy.',
        'Module 2: Moral Dilemmas & Autonomy - Kohlberg theory, Gilligan theory, Heinz dilemma, moral autonomy, consensus and controversy, models of professional roles, theories about right action.',
        'Module 3: Safety, Responsibilities & Rights - Safety and risk assessment, risk-benefit analysis, reducing risk; code of ethics, collegiality, loyalty, respect for authority, collective bargaining, confidentiality, conflicts of interest, occupational crime, professional rights, employee rights, IPR.',
        'Module 4: Global Ethics & Corporate Responsibility - Multinational corporations, environmental ethics, computer ethics, weapons development, engineers as managers, consulting engineers, moral leadership, code of conduct, corporate social responsibility.'
      ],
      textbooks: [
        'Mike W. Martin, Roland Schinzinger, "Ethics in Engineering", McGraw-Hill',
        'Govindarajan M., Natarajan S., Senthil Kumar V. S., "Engineering Ethics", Prentice Hall of India'
      ]
    },
    'CS304': {
      code: 'CS304',
      name: 'Operating Systems Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Mon/Thu 14:00 - 16:55 (Room 46)',
      examSlot: 'Practical',
      coordinator: 'Mrs. Sreedivya',
      shortName: 'SD',
      facultyDesignation: 'Faculty (Department of CSE)',
      facultyResearch: 'Operating Systems Lab Experiments',
      email: 'sreedivya@nitgoa.ac.in',
      room: 'Room 46',
      category: 'lab',
      notes: 'Linux system calls (fork, exec, wait, pipe), POSIX threads (pthread), IPC with shared memory and semaphores, CPU scheduling simulations, page replacement algorithms.',
      modules: [
        'Experiment 1: Unix process control system calls: fork, exec, wait, exit, and process tree visualization.',
        'Experiment 2: POSIX thread creation and synchronization using mutexes and condition variables.',
        'Experiment 3: Simulation of CPU scheduling algorithms (FCFS, SJF, Priority, Round Robin).',
        'Experiment 4: Producer-Consumer and Readers-Writers implementations using semaphores.',
        'Experiment 5: Simulation of page replacement algorithms: FIFO, LRU, and Optimal.'
      ],
      textbooks: ['Operating Systems Laboratory Manual, Department of CSE, NIT Goa']
    },
    'CS305': {
      code: 'CS305',
      name: 'Design and Analysis of Algorithm Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Mon/Thu 14:00 - 16:55 (Room 30)',
      examSlot: 'Practical',
      coordinator: 'Dr. Damodar Reddy E / Dr. Meenakshi Panda',
      shortName: 'DRE / MP',
      facultyDesignation: 'Faculty (Department of CSE)',
      facultyResearch: 'Algorithm Prototyping and Performance Benchmarking',
      email: 'damodar.reddy@nitgoa.ac.in',
      room: 'Room 30',
      category: 'lab',
      notes: 'Empirical runtime analysis of sorting algorithms, greedy strategies (Huffman, MST), dynamic programming (Matrix Chain, 0/1 Knapsack, LCS), and graph flow algorithms.',
      modules: [
        'Experiment 1: Divide and conquer algorithm runtime benchmarking: Merge Sort vs Quick Sort with varying pivots.',
        'Experiment 2: Minimum Spanning Tree realization using Prim and Kruskal algorithms with disjoint sets.',
        'Experiment 3: Dynamic programming implementations: Matrix Chain Multiplication and 0/1 Knapsack.',
        'Experiment 4: All-pairs shortest paths using Floyd-Warshall and Bellman-Ford algorithms.',
        'Experiment 5: Network flow computation using Ford-Fulkerson algorithm.'
      ],
      textbooks: ['DAA Laboratory Manual, Department of CSE, NIT Goa']
    },
    'CS300M': {
      code: 'CS300M',
      name: 'Design and Analysis of Algorithm (Minor in CSE)',
      type: 'Minor',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'Minor Slot G (Tue 12:00, Wed 14:00, Fri 14:00)',
      examSlot: 'G',
      coordinator: 'Dr. Pravati Swain',
      shortName: 'PS',
      facultyDesignation: 'Associate Professor & HoD (CSE)',
      facultyResearch: 'Algorithms, Wireless Networks, Distributed Systems',
      email: 'pravatiswain@nitgoa.ac.in',
      room: 'Room 56/57 (also Room 74/75)',
      isMinor: true,
      category: 'minor',
      notes: 'Minor program course for non-CSE students: Algorithm analysis, sorting, greedy methods, dynamic programming, and graphs.',
      modules: [
        'Module 1: Foundations & Divide-and-Conquer - Growth of functions, asymptotic notations (Big-O, Omega, Theta), recurrence relations, substitution method, recursion tree method, master theorem, Merge Sort and Quick Sort analysis.',
        'Module 2: Greedy Strategy - Elements of greedy strategy, Fractional Knapsack problem, Activity Selection problem, Huffman coding, Minimum Spanning Trees (Kruskal and Prim algorithms).',
        'Module 3: Dynamic Programming - Characterization of dynamic programming, optimal substructure, 0/1 Knapsack problem, Matrix Chain Multiplication, Longest Common Subsequence (LCS), Bellman-Ford shortest paths.',
        'Module 4: Graph Algorithms & Intractability - Breadth-First Search (BFS), Depth-First Search (DFS), topological sorting, strongly connected components, Dijkstra shortest path algorithm; introduction to P, NP, NP-Complete, and NP-Hard classes.'
      ],
      textbooks: [
        'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein, "Introduction to Algorithms", 3rd Edition, MIT Press',
        'Ellis Horowitz, Sartaj Sahni, Sanguthevar Rajasekaran, "Fundamentals of Computer Algorithms", Universities Press'
      ]
    }
  },
  schedule: buildInstituteMasterSchedule({
    prefix: 'cse5',
    room: 'Room 56/57',
    slotA: 'CS303',
    slotB: 'CS301',
    slotC: 'CS300',
    slotE: 'CS505',
    slotF: 'CS302',
    slotG_Minor: 'CS300M',
    mlcFriday: 'HU350',
    labMon: { code: 'CS304', name: 'OS Lab (SD - Rm 46) / DAA Lab (MP - Rm 30)', room: 'Room 46 / Room 30' },
    labThu: { code: 'CS305', name: 'DAA Lab (DRE - Rm 30) / OS Lab (SD - Rm 46)', room: 'Room 30 / Room 46' },
    labWed: { code: 'CS306', name: 'Technical Seminar (BNK)', room: 'Room 56/57' },
    notesWedLab: 'Dr. Keshavamurthy B N (BNK) - Room 56/57 (16:00-16:55)',
    notesMonLab: 'Batch 1: CS304 (SD) Room 46 | Batch 2: CS305 (MP) Room 30',
    notesThuLab: 'Batch 1: CS305 (DRE) Room 30 | Batch 2: CS304 (SD) Room 46',
    customSaturdayFocus: 'Operating Systems & Algorithm Analysis IS Code Practice',
  })
};

// ==========================================
// 5th Semester (3rd Year Odd) - Civil (Room 25/26)
// Faculty Advisor: Dr. Bapi Mondal (bapimondal@nitgoa.ac.in)
// ==========================================
export const CVE_5: SemesterData = {
  courses: {
    'CV303': {
      code: 'CV303',
      name: 'Foundation Engineering',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Harikumar M',
      shortName: 'HKM',
      facultyDesignation: 'Assistant Professor & HoD (Civil)',
      facultyResearch: 'Geotechnical Engineering, Soil Dynamics, Foundation Engineering',
      email: 'harikumar@nitgoa.ac.in',
      room: 'Room 25/26',
      category: 'core',
      notes: 'Teaching Slot A (Mon 09:00, Tue 11:00, Thu 10:00). Soil exploration, shallow foundations bearing capacity, settlement analysis, pile foundations, retaining walls and earth pressures.',
      modules: [
        'Module 1: Subsurface Exploration - Drilling methods, sampling techniques, standard penetration test (SPT), cone penetration test (CPT), geophysical methods.',
        'Module 2: Shallow Foundations & Bearing Capacity - Terzaghi bearing capacity theory, Meyerhof and Hansen modifications, safe bearing capacity, water table effects, allowable settlement.',
        'Module 3: Deep Foundations & Piles - Pile classification, static and dynamic pile capacity formulas, pile load test, group action of piles, settlement of pile groups, negative skin friction.',
        'Module 4: Lateral Earth Pressure & Retaining Walls - Rankine and Coulomb earth pressure theories for active and passive conditions, design and stability checks of gravity and cantilever retaining walls.'
      ],
      textbooks: ['K. R. Arora, "Soil Mechanics and Foundation Engineering", Standard Publishers', 'B. M. Das, "Principles of Foundation Engineering", Cengage Learning']
    },
    'CV302': {
      code: 'CV302',
      name: 'Advanced Structural Analysis',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Bapi Mondal',
      shortName: 'BM',
      facultyDesignation: 'Assistant Professor & Faculty Advisor (Civil)',
      facultyResearch: 'Structural Analysis, Matrix Methods, Finite Element Modeling',
      email: 'bapimondal@nitgoa.ac.in',
      room: 'Room 25/26',
      category: 'core',
      notes: 'Teaching Slot B (Mon 10:00, Wed 09:00, Thu 11:00). Tutorial Thu 14:00. Indeterminate structures, slope deflection, moment distribution, matrix flexibility and stiffness methods.',
      modules: [
        'Module 1: Classical Indeterminate Methods - Slope Deflection method applied to continuous beams and portal frames with and without sway.',
        'Module 2: Moment Distribution Method - Distribution factor, carry-over factor, application to continuous beams, non-sway and sway frames.',
        'Module 3: Matrix Flexibility Method - Element flexibility matrix, system flexibility equations, primary structure selection, indeterminate trusses and beams.',
        'Module 4: Matrix Stiffness Method - Coordinate transformations, element stiffness matrix for truss and beam elements, assembly of global stiffness matrix, boundary condition handling.'
      ],
      textbooks: ['Devdas Menon, "Structural Analysis", Narosa Publishing House', 'C. S. Reddy, "Basic Structural Analysis", Tata McGraw-Hill']
    },
    'CV304': {
      code: 'CV304',
      name: 'Waste Water Engineering',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. S Sethulekshmi',
      shortName: 'SS',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Environmental Engineering, Wastewater Treatment, Water Quality',
      email: 'sethulekshmi@nitgoa.ac.in',
      room: 'Room 25/26',
      category: 'core',
      notes: 'Teaching Slot C (Mon 11:00, Wed 10:00, Fri 09:00). Sewage generation, sewer design, primary sedimentation, activated sludge process, trickling filters, sludge digestion and disposal.',
      modules: [
        'Module 1: Wastewater Generation & Sewer Design - Domestic and industrial sewage characteristics, BOD, COD, design of gravity sewers, hydraulic formulas (Manning, Chezy), sewer appurtenances.',
        'Module 2: Primary Treatment - Screen chambers, grit chambers, equalization tanks, design of primary sedimentation tanks (PST), coagulation-flocculation in wastewater.',
        'Module 3: Secondary Biological Treatment - Aerobic and anaerobic processes, design of Activated Sludge Process (ASP), F/M ratio, hydraulic retention time, Trickling filters, Sequencing Batch Reactors (SBR).',
        'Module 4: Sludge Treatment & Disposal - Sludge thickening, aerobic and anaerobic sludge digestion, biogas generation, drying beds, effluent disposal standards, reuse of treated wastewater.'
      ],
      textbooks: ['Metcalf & Eddy, "Wastewater Engineering: Treatment and Resource Recovery", McGraw-Hill', 'B. C. Punmia, "Waste Water Engineering", Laxmi Publications']
    },
    'CV301': {
      code: 'CV301',
      name: 'Design of Reinforced Concrete Structures',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Aparup Biswal',
      shortName: 'AB',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Reinforced Concrete Design, Earthquake Engineering, IS 456 Provisions',
      email: 'aparup@nitgoa.ac.in',
      room: 'Room 25/26',
      category: 'core',
      notes: 'Teaching Slot E (Tue 09:00, Wed 12:00, Fri 10:00). Tutorial Wed 16:00. Limit state design per IS 456:2000, singly/doubly reinforced beams, flanged sections, shear, torsion, bond, slabs, columns, footings.',
      modules: [
        'Module 1: Limit State Philosophy & Flexure - Limit state of collapse and serviceability, stress-strain curves for concrete and steel, design of singly and doubly reinforced rectangular and flanged (T and L) beams.',
        'Module 2: Shear, Torsion & Bond - Limit state of collapse in shear, nominal shear stress, design of shear reinforcement, bond and development length, design for combined bending, shear and torsion.',
        'Module 3: Slabs & Compression Members - Design of one-way and two-way slabs with various boundary conditions, axially loaded short columns, columns with uniaxial and biaxial eccentricities.',
        'Module 4: Footings & Serviceability - Design of isolated square and rectangular pad footings, sloped footings, deflection and cracking checks per IS 456:2000.'
      ],
      textbooks: ['S. Unnikrishna Pillai, Devdas Menon, "Reinforced Concrete Design", Tata McGraw-Hill', 'P. C. Varghese, "Limit State Design of Reinforced Concrete", PHI']
    },
    'CV501': {
      code: 'CV501',
      name: 'Railway Airport and Harbour Engineering (Elective - I)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'F',
      examSlot: 'F',
      coordinator: 'Dr. Vinamra Mishra',
      shortName: 'VM',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Pavement Systems, Transportation Infrastructure, Rail Engineering',
      email: 'vinamra@nitgoa.ac.in',
      room: 'Room 25/26',
      category: 'elective',
      notes: 'Teaching Slot F (Tue 10:00, Thu 09:00, Fri 11:00). Permanent way alignment, rails, sleepers, ballast, turnouts, airport runway orientation and design, harbour breakwaters and docks.',
      modules: [
        'Module 1: Railway Track Components & Geometry - Permanent way cross-section, rail stresses, creep, fishplates, sleeper density, ballast specifications, geometric design: cant, equilibrium speed, cant deficiency.',
        'Module 2: Points, Crossings & Signaling - Turnouts, switches, crossings, track junctions, interlocking systems, signaling principles in Indian Railways.',
        'Module 3: Airport Planning & Runway Design - Airport master plan, aircraft characteristics, wind rose diagram, runway orientation, basic runway length corrections, taxiway geometric design.',
        'Module 4: Harbour & Docks Engineering - Natural and artificial harbours, wave action, design of rubble mound and vertical wall breakwaters, jetties, quays, dry docks, aids to navigation.'
      ],
      textbooks: ['Satish Chandra, M. M. Agarwal, "Railway Engineering", Oxford University Press', 'S. K. Khanna, M. G. Arora, S. S. Jain, "Airport Planning and Design", Nem Chand & Bros']
    },
    'ES300': {
      code: 'ES300',
      name: 'Environmental Studies',
      type: 'Theory',
      credits: 1,
      ltp: '1-0-0',
      teachingSlot: 'Friday 16:00 - 16:55 (Slot MLC)',
      examSlot: 'Friday MLC',
      coordinator: 'Dr. Velavan Kathirvelu',
      shortName: 'VK',
      facultyDesignation: 'Associate Professor (Chemistry)',
      facultyResearch: 'Environmental Science & Sustainability',
      email: 'velavan@nitgoa.ac.in',
      room: 'Room 70/71',
      category: 'mlc',
      notes: 'Friday 16:00 - 16:55 (Room 70/71). Ecosystem dynamics, biodiversity, pollution control, e-waste handling, green energy systems.',
      modules: [
        'Module 1: Natural Resources & Multidisciplinary Nature - Renewable and non-renewable resources; forest, water, mineral, food, and energy resources; land degradation and soil conservation.',
        'Module 2: Ecosystems & Biodiversity - Concept, structure, and functions of forest, grassland, desert, and aquatic ecosystems; threats to biodiversity, hot-spots, and in-situ/ex-situ conservation.',
        'Module 3: Environmental Pollution & Waste Management - Causes, effects, and control of air, water, soil, marine, noise, and thermal pollution; solid and electronic waste management; disaster mitigation.',
        'Module 4: Social Issues, Environmental Policy & Human Population - Sustainable development, water harvesting, climate change, global warming, acid rain, ozone depletion; Environment Protection Acts; population growth and environmental ethics.'
      ],
      textbooks: [
        'Erach Bharucha, "Textbook of Environmental Studies for Undergraduate Courses", Universities Press',
        'R. Rajagopalan, "Environmental Studies: From Crisis to Cure", Oxford University Press'
      ]
    },
    'CV300': {
      code: 'CV300',
      name: 'Seminar',
      type: 'Theory',
      credits: 1,
      ltp: '0-0-2',
      teachingSlot: 'Thursday 15:00 - 16:55',
      examSlot: 'Seminar',
      coordinator: 'Dr. S Sethulekshmi',
      shortName: 'SS',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Environmental Engineering & Concrete Tech',
      email: 'sethulekshmi@nitgoa.ac.in',
      room: 'Room 25/26',
      category: 'core',
      notes: 'Thursday 15:00 - 16:55. Literature review, research topic presentation, civil infrastructure reports.',
      modules: [
        'Module 1: Literature Survey & Field Needs - Review of recent peer-reviewed civil engineering journal publications (ASCE, ICE, Springer), identification of structural/environmental research problems.',
        'Module 2: Technical Report Formulation - Methodology synthesis, technical report drafting adhering to institutional guidelines, reference formatting.',
        'Module 3: Visual Demonstration & Presentation - Structuring technical slides, structural/hydraulic diagram presentations, verbal defense preparedness.',
        'Module 4: Seminar Defense & Viva - Oral presentation before departmental panel, responding to analytical and design queries.'
      ],
      textbooks: [
        'Civil Engineering research journals (ASCE, Springer, Elsevier)',
        'David F. Beer, David McMurrey, "A Guide to Writing as an Engineer", John Wiley'
      ]
    },
    'CV305': {
      code: 'CV305',
      name: 'Transportation Engineering Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Mon/Tue 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Vinamra Mishra / Dr. Sathishraj Mani',
      shortName: 'VM / SRM',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Transportation Materials Testing',
      email: 'vinamra@nitgoa.ac.in',
      room: 'Transportation Engineering Lab',
      category: 'lab',
      notes: 'Aggregate tests (crushing, impact, Los Angeles abrasion, shape), bitumen tests (penetration, softening point, ductility, viscosity), and Marshall stability mix design.',
      modules: [
        'Experiment 1: Aggregate crushing value and impact value determination.',
        'Experiment 2: Los Angeles abrasion test for road aggregates.',
        'Experiment 3: Bitumen penetration, softening point, and ductility tests.',
        'Experiment 4: Flash and fire point test, kinematic viscosity determination.',
        'Experiment 5: Marshall stability and flow value test for bituminous mix.'
      ],
      textbooks: ['Transportation Engineering Laboratory Manual, NIT Goa']
    },
    'CV306': {
      code: 'CV306',
      name: 'Geotechnical Engineering Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Mon/Tue 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Harikumar M',
      shortName: 'HKM',
      facultyDesignation: 'Assistant Professor & HoD (Civil)',
      facultyResearch: 'Soil Mechanics Testing Bench',
      email: 'harikumar@nitgoa.ac.in',
      room: 'Geotechnical Engineering Lab',
      category: 'lab',
      notes: 'Grain size analysis, Atterberg limits, proctor compaction, direct shear, unconfined compression, consolidation, and triaxial shear testing.',
      modules: [
        'Experiment 1: Sieve analysis and hydrometer analysis of fine-grained soils.',
        'Experiment 2: Liquid limit, plastic limit, and shrinkage limit determination.',
        'Experiment 3: Standard Proctor compaction test for optimum moisture content.',
        'Experiment 4: Direct shear test on cohesionless soils.',
        'Experiment 5: Unconfined compression test and One-Dimensional Consolidation test.'
      ],
      textbooks: ['Geotechnical Engineering Laboratory Manual, NIT Goa']
    }
  },
  schedule: buildInstituteMasterSchedule({
    prefix: 'cve5',
    room: 'Room 25/26',
    slotA: 'CV303',
    slotB: 'CV302',
    slotC: 'CV304',
    slotE: 'CV301',
    slotF: 'CV501',
    mlcFriday: 'ES300',
    labMon: { code: 'CV305', name: 'TE Lab (VM/SRM) B2 / GT Lab (HKM) B1', room: 'Transportation / Geotechnical Lab' },
    labTue: { code: 'CV306', name: 'TE Lab (VM/SRM) B1 / GT Lab (HKM) B2', room: 'Transportation / Geotechnical Lab' },
    labWed: { code: 'CV301', name: 'RC Design Tutorial (AB)', room: 'Room 25/26' },
    labThu: { code: 'CV300', name: 'Seminar (SS) & Tutorial (BM)', room: 'Room 25/26' },
    notesWedLab: 'Dr. Aparup Biswal (AB) - RC Design Tutorial (16:00-16:55)',
    notesThuLab: '14:00 CV302 Tut (BM) | 15:00-16:55 CV300 Seminar (SS)',
    notesMonLab: 'Batch 1: CV306 GT Lab (HKM) | Batch 2: CV305 TE Lab (VM/SRM)',
    notesTueLab: 'Batch 1: CV305 TE Lab (VM/SRM) | Batch 2: CV306 GT Lab (HKM)',
    customSaturdayFocus: 'RC Design & Structural Analysis IS Code Clinics',
  })
};

// ==========================================
// 5th Semester (3rd Year Odd) - ECE (Room 53)
// Faculty Advisor: Dr. Nithin Kumar YB (nithin.shastri@nitgoa.ac.in)
// ==========================================
export const ECE_5: SemesterData = {
  courses: {
    'EC301': {
      code: 'EC301',
      name: 'Digital Signal Processing',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Shivnarayan Patidar',
      shortName: 'SP',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Digital Signal Processing, Biomedical Signal Analysis, Wavelets',
      email: 'shivnarayan.patidar@nitgoa.ac.in',
      room: 'Room 53',
      category: 'core',
      notes: 'Teaching Slot A (Mon 09:00, Tue 16:00, Thu 10:00). DFT, Radix-2 FFT algorithms, IIR filter design (Butterworth, Chebyshev), FIR filter design (windowing), finite word-length effects.',
      modules: [
        'Module 1: Discrete Fourier Transform - Frequency domain sampling, DFT properties, circular convolution, linear filtering using DFT (overlap-add, overlap-save).',
        'Module 2: Fast Fourier Transform (FFT) - Radix-2 Decimation-in-Time (DIT) and Decimation-in-Frequency (DIF) algorithms, computational complexity comparison.',
        'Module 3: IIR Digital Filter Design - Analog filter prototypes, Bilinear Transformation, Impulse Invariance method, frequency transformation.',
        'Module 4: FIR Filter Design - Linear phase characteristics, Fourier series and window design methods (Hamming, Hanning, Blackman), quantization noise, limit cycles.'
      ],
      textbooks: ['John G. Proakis, Dimitris G. Manolakis, "Digital Signal Processing: Principles, Algorithms and Applications", Pearson', 'A. V. Oppenheim, R. W. Schafer, "Discrete-Time Signal Processing", Pearson']
    },
    'EC300': {
      code: 'EC300',
      name: 'Control System',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Pragati Patel',
      shortName: 'PP',
      facultyDesignation: 'Assistant Professor (ECE)',
      facultyResearch: 'Control Systems, Robotics, Nonlinear Dynamics',
      email: 'pragatipatel@nitgoa.ac.in',
      room: 'Room 53',
      category: 'core',
      notes: 'Teaching Slot B (Mon 10:00, Wed 09:00, Thu 11:00). Tutorial Friday 16:00. Mathematical modeling, block diagrams, signal flow graphs, time response, Routh-Hurwitz, Root Locus, Bode plots, Nyquist, state space.',
      modules: [
        'Module 1: Transfer Functions & State Variables - Open-loop and closed-loop control systems, block diagram algebra, Mason gain formula, state-space representations.',
        'Module 2: Time Response Analysis - Standard test inputs, 1st and 2nd order system transient response, steady state error and error constants (Kp, Kv, Ka).',
        'Module 3: Stability & Root Locus - Routh-Hurwitz stability criterion, construction of Root Loci, lead/lag compensator design.',
        'Module 4: Frequency Domain Analysis - Bode plots, gain and phase margins, Nyquist stability criterion and polar plots.'
      ],
      textbooks: ['Katsuhiko Ogata, "Modern Control Engineering", 5th Edition, Pearson', 'I. J. Nagrath, M. Gopal, "Control Systems Engineering", New Age']
    },
    'EC303': {
      code: 'EC303',
      name: 'Linear Integrated Circuits',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Mallikarjun Erramshetty',
      shortName: 'EM',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Analog Circuits, Signal Conditioning, Optical Networks',
      email: 'mallikarjun.e@nitgoa.ac.in',
      room: 'Room 53',
      category: 'core',
      notes: 'Teaching Slot E (Tue 14:00, Wed 12:00, Fri 11:00). Operational amplifiers characteristics, linear and non-linear op-amp circuits, 555 timers, PLL 565, and data converters (ADC/DAC).',
      modules: [
        'Module 1: Op-Amp Characteristics - Internal stages of op-amp 741, differential amplifier, DC/AC characteristics, slew rate, CMRR, frequency compensation.',
        'Module 2: Linear Applications - Inverting/non-inverting amplifiers, instrumentation amplifier (3 op-amp topology), active RC filters.',
        'Module 3: Non-Linear Applications & Timers - Precision rectifiers, peak detectors, Schmitt trigger, IC 555 timer functional diagram, astable and monostable modes.',
        'Module 4: PLL & Data Converters - Phase Locked Loop (IC 565) principles, DAC architectures (R-2R ladder), ADC architectures (successive approximation, flash).'
      ],
      textbooks: ['D. Roy Choudhury, Shail B. Jain, "Linear Integrated Circuits", New Age International', 'Ramakant A. Gayakwad, "Op-Amps and Linear Integrated Circuits", Pearson']
    },
    'EC302': {
      code: 'EC302',
      name: 'Microprocessor and Microcontroller',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'F',
      examSlot: 'F',
      coordinator: 'Dr. Prashanth GR',
      shortName: 'PGR',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Microprocessor Architectures, Embedded Systems, VLSI',
      email: 'grprashanth@nitgoa.ac.in',
      room: 'Room 53',
      category: 'core',
      notes: 'Teaching Slot F (Tue 15:00, Thu 09:00, Fri 12:00). 8086 microprocessor internal architecture, assembly programming, bus timing, peripheral interfacing (8255, 8254, 8259), ARM microcontroller basics.',
      modules: [
        'Module 1: 8086 Architecture & Register Organization - Execution unit, Bus interface unit, segment registers, memory segmentation, physical address calculation.',
        'Module 2: Assembly Language Programming - Addressing modes, instruction set: data transfer, arithmetic, logical, string manipulation, subroutines and macros.',
        'Module 3: Peripheral Interfacing Devices - Programmable Peripheral Interface (8255 PPI), Interval Timer (8254 PIT), Interrupt Controller (8259 PIC).',
        'Module 4: Embedded Microcontrollers - 8051 and ARM Cortex architecture overview, GPIO ports, timers, serial communication (UART, I2C, SPI).'
      ],
      textbooks: ['Douglas V. Hall, "Microprocessors and Interfacing", McGraw-Hill', 'Muhammad Ali Mazidi, "The 8051 Microcontroller and Embedded Systems", Pearson']
    },
    'CS900': {
      code: 'CS900',
      name: 'Data Structures and Algorithm (Elective - I / Open Elective)',
      type: 'Open Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'Slot H (Wed 15:00, Thu 12:00, Fri 15:00)',
      examSlot: 'H',
      coordinator: 'CSE Faculty',
      shortName: 'CSE',
      facultyDesignation: 'Faculty (Department of CSE)',
      facultyResearch: 'Data Structures, Algorithm Design',
      email: 'hod.cse@nitgoa.ac.in',
      room: 'Room 53',
      category: 'open_elective',
      notes: 'Slot H (Open Elective / Elective-I). Stacks, queues, linked lists, trees, graphs, sorting, searching, algorithm complexity.',
      modules: [
        'Module 1: Linear Data Structures - Arrays, singly and doubly linked lists, stack operations and applications (infix to postfix), queues, circular queues, priority queues.',
        'Module 2: Trees & Hierarchical Structures - Binary trees, binary search trees (BST), operations (insertion, deletion, search), tree traversals, AVL tree rotations and balance factor, binary heaps.',
        'Module 3: Sorting & Searching Strategies - Linear search, binary search, bubble sort, selection sort, insertion sort, quick sort, merge sort, heap sort; hashing functions and collision resolution.',
        'Module 4: Graph Algorithms & Applications - Graph representations (adjacency matrix and list), breadth-first search (BFS), depth-first search (DFS), Dijkstra single-source shortest path, Prim and Kruskal minimum spanning trees.'
      ],
      textbooks: [
        'Mark Allen Weiss, "Data Structures and Algorithm Analysis in C++", Pearson Education',
        'Thomas H. Cormen, "Introduction to Algorithms", MIT Press'
      ]
    },
    'HU350': {
      code: 'HU350',
      name: 'Professional Ethics and Human Values',
      type: 'MLC',
      credits: 1,
      ltp: '1-0-0',
      teachingSlot: 'Wednesday 16:00 - 16:55',
      examSlot: 'Wednesday MLC',
      coordinator: 'Dr Sarani Ghosal Mondal',
      shortName: 'SGM',
      facultyDesignation: 'Associate Professor (Humanities)',
      facultyResearch: 'Professional Ethics, Applied Linguistics',
      email: 'sarani@nitgoa.ac.in',
      room: 'Room 53',
      category: 'mlc',
      notes: 'Wednesday 16:00 - 16:55 (Room 53). Moral autonomy, ethics in engineering professions, social responsibility.',
      modules: [
        'Module 1: Human Values & Engineering Ethics - Morals, values, integrity, work ethic, service learning, civic virtue, respect for others, living peacefully, caring, sharing, honesty, courage, valuing time, cooperation, commitment, empathy.',
        'Module 2: Moral Dilemmas & Autonomy - Kohlberg theory, Gilligan theory, Heinz dilemma, moral autonomy, consensus and controversy, models of professional roles, theories about right action.',
        'Module 3: Safety, Responsibilities & Rights - Safety and risk assessment, risk-benefit analysis, reducing risk; code of ethics, collegiality, loyalty, respect for authority, collective bargaining, confidentiality, conflicts of interest, occupational crime, professional rights, employee rights, IPR.',
        'Module 4: Global Ethics & Corporate Responsibility - Multinational corporations, environmental ethics, computer ethics, weapons development, engineers as managers, consulting engineers, moral leadership, code of conduct, corporate social responsibility.'
      ],
      textbooks: [
        'Mike W. Martin, Roland Schinzinger, "Ethics in Engineering", McGraw-Hill',
        'Govindarajan M., Natarajan S., Senthil Kumar V. S., "Engineering Ethics", Prentice Hall of India'
      ]
    },
    'EC304': {
      code: 'EC304',
      name: 'Digital Signal Processing Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Mon/Thu 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Shivnarayan Patidar',
      shortName: 'SP',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'DSP Algorithm Implementations',
      email: 'shivnarayan.patidar@nitgoa.ac.in',
      room: 'DSP Lab',
      category: 'lab',
      notes: 'Implementation of DFT/FFT, Butterworth/Chebyshev IIR filters, window-based FIR filters in MATLAB and DSP processor kit.',
      modules: [
        'Experiment 1: Computation of N-point DFT, IDFT, and circular convolution.',
        'Experiment 2: Implementation of Radix-2 DIT and DIF FFT algorithms.',
        'Experiment 3: Design and frequency response of IIR Butterworth low-pass and high-pass filters.',
        'Experiment 4: Design and realization of FIR filters using Hamming and Hanning windows.',
        'Experiment 5: Audio signal filtering implementation on DSP processor board.'
      ],
      textbooks: ['DSP Laboratory Manual, NIT Goa']
    },
    'EC305': {
      code: 'EC305',
      name: 'Microprocessor and Microcontroller Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Tue 09:00 - 11:55 / Thu 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Prashanth GR',
      shortName: 'PGR',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Microprocessor Hardware Interfacing',
      email: 'grprashanth@nitgoa.ac.in',
      room: 'Microprocessor Lab',
      category: 'lab',
      notes: '8086 assembly programming on MASM/TASM, memory interfacing, peripheral interfacing with 8255 (stepper motor, traffic light), ADC/DAC conversion.',
      modules: [
        'Experiment 1: 8086 assembly programming: 16-bit arithmetic operations and array sorting.',
        'Experiment 2: String manipulation, code conversion (BCD to Hex, Hex to ASCII).',
        'Experiment 3: Interfacing 8255 PPI with 8086: Stepper motor speed and direction control.',
        'Experiment 4: ADC and DAC interfacing with 8086 for waveform generation.',
        'Experiment 5: Embedded microcontroller programming: GPIO and timer configuration.'
      ],
      textbooks: ['Microprocessor Laboratory Manual, NIT Goa']
    },
    'EC306': {
      code: 'EC306',
      name: 'Linear Integrated Circuits Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Mon 14:00 - 16:55 / Tue 09:00 - 11:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Mallikarjun Erramshetty',
      shortName: 'EM',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Analog Circuit Prototyping',
      email: 'mallikarjun.e@nitgoa.ac.in',
      room: 'Linear IC Lab',
      category: 'lab',
      notes: 'Op-amp parameter measurement (offset, slew rate, CMRR), active filters, Schmitt trigger, astable/monostable multivibrators using IC 555, PLL 565.',
      modules: [
        'Experiment 1: Measurement of op-amp 741 input offset voltage, bias current, and slew rate.',
        'Experiment 2: Inverting and non-inverting summing and difference amplifiers.',
        'Experiment 3: Second-order active low-pass and high-pass Butterworth filters.',
        'Experiment 4: Schmitt trigger circuit design with user-defined hysteresis thresholds.',
        'Experiment 5: Astable and monostable multivibrators using IC 555 timer.'
      ],
      textbooks: ['LIC Laboratory Manual, NIT Goa']
    },
    'EC400M': {
      code: 'EC400M',
      name: 'Sensor Technologies (Minor in ECE)',
      type: 'Minor',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'Minor Slot G (Tue 12:00, Wed 14:00, Fri 14:00)',
      examSlot: 'G',
      coordinator: 'Dr. Mallikarjun Erramshetty',
      shortName: 'EM',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Sensors, Optical Devices, Transducers',
      email: 'mallikarjun.e@nitgoa.ac.in',
      room: 'Room 53',
      isMinor: true,
      category: 'minor',
      notes: 'Minor program course: Resistive, capacitive, inductive sensors, optical transducers, biosensors, signal conditioning circuits.',
      modules: [
        'Module 1: Principles of Sensing & Transduction - General classification of transducers, static characteristics (accuracy, precision, sensitivity, linearity, resolution, hysteresis), dynamic response (zero, first, and second-order systems), calibration standards.',
        'Module 2: Mechanical & Thermal Sensors - Resistive sensors (strain gauges, piezoresistive), capacitive and inductive transducers (LVDT, RVDT), temperature sensors (RTDs, thermocouples, thermistors, semiconductor sensors, pyrometers).',
        'Module 3: Optical, Chemical & Magnetic Transducers - Photodetectors (photodiodes, phototransistors, solar cells), optical encoders, Hall-effect sensors, fluxgate magnetometers, electrochemical sensors, biosensors and gas sensors.',
        'Module 4: Signal Conditioning & Smart Sensors - Operational amplifier circuits for sensors, instrumentation amplifiers, bridge circuits, filtering, A/D converters, smart sensors with microcontrollers, IEEE 1451 smart transducer interface standard, IoT sensor nodes.'
      ],
      textbooks: [
        'A. K. Sawhney, "Electrical and Electronic Measurements and Instrumentation", Dhanpat Rai & Sons',
        'D. Patranabis, "Sensors and Transducers", 2nd Edition, PHI Learning'
      ]
    }
  },
  schedule: buildInstituteMasterSchedule({
    prefix: 'ece5',
    room: 'Room 53',
    slotA: 'EC301',
    slotB: 'EC300',
    slotE: 'EC303',
    slotF: 'EC302',
    slotH_OpenElective: 'CS900',
    slotG_Minor: 'EC400M',
    labMon: { code: 'EC306', name: 'LIC Lab (EM) B1 / DSP Lab (SP) B2', room: 'LIC Lab / DSP Lab' },
    labTue: { code: 'EC305', name: 'Microprocessor Lab (PGR) B1 / LIC Lab (EM) B2', room: 'Microprocessor Lab / LIC Lab' },
    labThu: { code: 'EC304', name: 'DSP Lab (SP) B1 / Microprocessor Lab (PGR) B2', room: 'DSP Lab / Microprocessor Lab' },
    labWed: { code: 'HU350', name: 'Professional Ethics & Human Values (SGM)', room: 'Room 53' },
    notesWedLab: 'Dr Sarani Ghosal Mondal (SGM) - Room 53 (16:00-16:55)',
    notesMonLab: 'Batch 1: EC306 LIC Lab (EM) | Batch 2: EC304 DSP Lab (SP)',
    notesTueLab: 'Morning (09:00-11:55): Batch 1 EC305 (PGR) | Batch 2 EC306 (EM)',
    notesThuLab: 'Batch 1: EC304 DSP Lab (SP) | Batch 2: EC305 MPMC Lab (PGR)',
    mlcFriday: 'EC300',
    customSaturdayFocus: 'Control Systems & Digital Signal Processing Clinics',
  })
};

// ==========================================
// 5th Semester (3rd Year Odd) - EEE (Room 51/52)
// Faculty Advisor: Dr. Amol D Rahulkar (amol.rahulkar@nitgoa.ac.in)
// ==========================================
export const EEE_5: SemesterData = {
  courses: EEE5_COURSES,
  schedule: EEE5_WEEKLY_SCHEDULE,
};

// ==========================================
// 5th Semester (3rd Year Odd) - Mechanical (Room 55)
// Faculty Advisor: Dr. Abhijit Sarkar (sarkarabhijit@nitgoa.ac.in)
// ==========================================
export const ME_5: SemesterData = {
  courses: {
    'ME302': {
      code: 'ME302',
      name: 'Manufacturing Technology - II',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Abhijit Sarkar',
      shortName: 'AS',
      facultyDesignation: 'Assistant Professor & Faculty Advisor (Mechanical)',
      facultyResearch: 'Manufacturing Processes, Machining Dynamics, Composites',
      email: 'sarkarabhijit@nitgoa.ac.in',
      room: 'Room 55',
      category: 'core',
      notes: 'Teaching Slot A (Mon 09:00, Tue 11:00, Thu 10:00). Mechanics of metal cutting, Merchant circle, tool life, Taylor equation, milling, grinding, unconventional machining (EDM, ECM, USM).',
      modules: [
        'Module 1: Mechanics of Metal Cutting - Orthogonal and oblique cutting, shear plane angle, Merchant force circle diagram, velocity relationships, cutting power and specific energy calculations.',
        'Module 2: Cutting Tool Wear & Economics - Tool wear mechanisms (crater, flank wear), Taylor tool life equation, cutting tool materials (HSS, Carbides, Ceramics, CBN, PCD), machinability index.',
        'Module 3: Machine Tools & Operations - Lathe operations, shaping, planning, slotting, milling operations (up and down milling), gear manufacturing: gear hobbing, gear shaping, grinding wheel dressing.',
        'Module 4: Non-Traditional Machining - Operating principles, material removal rate (MRR), and process parameters of Electrical Discharge Machining (EDM), Electrochemical Machining (ECM), Ultrasonic Machining (USM), Laser Beam Machining (LBM).'
      ],
      textbooks: ['Amitabha Ghosh, Asok Kumar Mallik, "Manufacturing Science", East-West Press', 'P. N. Rao, "Manufacturing Technology: Metal Cutting and Machine Tools", McGraw-Hill']
    },
    'ME525': {
      code: 'ME525',
      name: 'Power Plant Engineering (Elective - I)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Sanjeev Singh',
      shortName: 'DSS',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Thermal Power Systems, Energy Conservation, Turbines',
      email: 'sanjeevsingh@nitgoa.ac.in',
      room: 'Room 55',
      category: 'elective',
      notes: 'Teaching Slot B (Mon 10:00, Wed 09:00, Thu 11:00). Rankine cycle reheat & regeneration, coal handling, steam generators, gas turbine combined cycle, nuclear power plants, economics of power generation.',
      modules: [
        'Module 1: Thermal Power Plants - Layout, coal handling, pulverization, modern boilers, fluidized bed combustion, superheaters, economizers, air preheaters, draught systems.',
        'Module 2: Steam Turbines & Condensers - Compounding of steam turbines, reheat and regenerative Rankine cycles, surface condensers, cooling towers, feedwater treatment.',
        'Module 3: Gas Turbine & Combined Cycle - Brayton cycle with reheat, intercooling, regeneration, combined cycle gas turbine (CCGT) plants, cogeneration (CHP).',
        'Module 4: Nuclear Power & Economics - Nuclear reactor types (PWR, BWR, CANDU), radiation safety, load curves, load factor, diversity factor, cost of electrical energy generation.'
      ],
      textbooks: ['P. K. Nag, "Power Plant Engineering", 4th Edition, McGraw-Hill', 'M. M. El-Wakil, "Powerplant Technology", McGraw-Hill']
    },
    'ME301': {
      code: 'ME301',
      name: 'Turbomachines',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Samar Singhal',
      shortName: 'SS',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Fluid Machinery, Turbomachinery, Renewable Energy Systems',
      email: 'samar.singhal@nitgoa.ac.in',
      room: 'Room 55',
      category: 'core',
      notes: 'Teaching Slot C (Mon 11:00, Wed 10:00, Fri 09:00). Euler turbine equation, velocity triangles, hydraulic turbines (Pelton, Francis, Kaplan), centrifugal and axial flow pumps, centrifugal compressors.',
      modules: [
        'Module 1: Fundamentals of Turbomachinery - Classification, Euler turbine equation, components of energy transfer, degree of reaction, utilization factor, dimensional analysis, specific speed.',
        'Module 2: Hydraulic Turbines - Pelton wheel impulse turbine, Francis reaction turbine, Kaplan axial flow turbine, velocity triangles, efficiencies, cavitation and draft tube theory.',
        'Module 3: Rotodynamic Pumps - Centrifugal pumps: working principle, impeller blade types, manometric head, manometric efficiency, minimum starting speed, multi-stage pumps, NPSH.',
        'Module 4: Compressors & Fans - Centrifugal compressors: velocity triangles, slip factor, pressure coefficient, surging, choking, axial flow compressor stages.'
      ],
      textbooks: ['S. M. Yahya, "Turbines, Compressors and Fans", 4th Edition, Tata McGraw-Hill', 'B. Lakshminarayana, "Fluid Dynamics and Heat Transfer of Turbomachinery", Wiley']
    },
    'ME304': {
      code: 'ME304',
      name: 'Design of Machine Elements - II',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Chaitanya Vundru',
      shortName: 'CV',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Mechanical Design, Tribology, Machine Dynamics',
      email: 'chaitanya.vundru@nitgoa.ac.in',
      room: 'Room 55',
      category: 'core',
      notes: 'Teaching Slot D (Mon 12:00, Wed 11:00, Fri 10:00). Tutorial Wed 16:00. Design of spur, helical, bevel, and worm gears, hydrodynamic journal bearings, rolling contact bearings, clutches, brakes.',
      modules: [
        'Module 1: Spur & Helical Gears - Lewis beam strength equation, Buckingham dynamic load equation, wear strength, design for bending and wear, helical gear virtual number of teeth.',
        'Module 2: Bevel & Worm Gears - Bevel gear kinematics, formative number of teeth, force analysis, worm and worm gear thermal rating, design of worm gear drives.',
        'Module 3: Sliding Contact Bearings - Petroff law, hydrodynamic lubrication theory, Reynolds equation, Sommerfeld number, design of journal bearings, heat dissipation.',
        'Module 4: Rolling Contact Bearings, Clutches & Brakes - Ball and roller bearing life rating, dynamic load rating, uniform pressure and uniform wear theories for plate and cone clutches, shoe and band brakes.'
      ],
      textbooks: ['V. B. Bhandari, "Design of Machine Elements", 4th Edition, McGraw-Hill', 'Joseph E. Shigley, "Mechanical Engineering Design", McGraw-Hill']
    },
    'ME303': {
      code: 'ME303',
      name: 'Heat Transfer',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Gurkirat Singh',
      shortName: 'GS',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Conduction, Convection, Phase Change, Heat Exchangers',
      email: 'gurkiratsingh@nitgoa.ac.in',
      room: 'Room 55',
      category: 'core',
      notes: 'Teaching Slot E (Tue 09:00, Wed 12:00, Fri 11:00). Additional lecture Tue 14:00. Conduction equations, fins, transient conduction, boundary layers, forced/free convection, radiation, LMTD/NTU.',
      modules: [
        'Module 1: Conduction - 3D general conduction equation, composite walls and cylinders, critical radius of insulation, heat transfer through extended surfaces (fins), lumped capacitance transient analysis.',
        'Module 2: Convective Heat Transfer - Laminar and turbulent boundary layers, forced convection over flat plates and cylinders, internal pipe flows, natural convection over vertical plates.',
        'Module 3: Radiation Heat Transfer - Thermal radiation laws (Planck, Stefan-Boltzmann, Wien), radiation shape factor, radiation shields, gas radiation.',
        'Module 4: Heat Exchangers & Boiling - Types of heat exchangers, overall heat transfer coefficient, Log Mean Temperature Difference (LMTD), Effectiveness-NTU method, pool boiling curve.'
      ],
      textbooks: ['Yunus A. Cengel, Afshin J. Ghajar, "Heat and Mass Transfer", McGraw-Hill', 'F. P. Incropera, D. P. DeWitt, "Fundamentals of Heat and Mass Transfer", Wiley']
    },
    'ME500': {
      code: 'ME500',
      name: 'Automatic Control (Elective - I)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'F',
      examSlot: 'F',
      coordinator: 'Dr. Srikumar Warrier',
      shortName: 'SW',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Mechanical Controls, Vibration, Robotics',
      email: 'srikumar.warrier@nitgoa.ac.in',
      room: 'Room 55',
      category: 'elective',
      notes: 'Teaching Slot F (Tue 10:00, Thu 09:00, Fri 12:00). Feedback control systems, transfer functions, time and frequency domain responses, stability criteria, hydraulic and pneumatic controllers.',
      modules: [
        'Module 1: Mathematical Modeling of Physical Systems - Mechanical, electrical, and thermal system analogies, transfer functions, block diagrams, signal flow graphs.',
        'Module 2: Time Response Analysis - First and second order systems, transient response specifications, steady state errors and error constants.',
        'Module 3: Stability Analysis - Routh-Hurwitz criterion, Root Locus technique, construction rules, effect of adding poles and zeros.',
        'Module 4: Frequency Response & Industrial Controllers - Bode diagrams, Nyquist stability criterion, PID controller characteristics, hydraulic and pneumatic control valves.'
      ],
      textbooks: ['Katsuhiko Ogata, "Modern Control Engineering", Pearson', 'Norman S. Nise, "Control Systems Engineering", Wiley']
    },
    'ES300': {
      code: 'ES300',
      name: 'Environmental Studies',
      type: 'Theory',
      credits: 1,
      ltp: '1-0-0',
      teachingSlot: 'Friday 16:00 - 16:55 (Slot MLC)',
      examSlot: 'Friday MLC',
      coordinator: 'Dr. Velavan Kathirvelu',
      shortName: 'VK',
      facultyDesignation: 'Associate Professor (Chemistry)',
      facultyResearch: 'Environmental Sustainability',
      email: 'velavan@nitgoa.ac.in',
      room: 'Room 70/71',
      category: 'mlc',
      notes: 'Friday 16:00 - 16:55 (Room 70/71). Ecosystems, pollution control, biodiversity conservation, sustainable practices.',
      modules: [
        'Module 1: Natural Resources & Multidisciplinary Nature - Renewable and non-renewable resources; forest, water, mineral, food, and energy resources; land degradation and soil conservation.',
        'Module 2: Ecosystems & Biodiversity - Concept, structure, and functions of forest, grassland, desert, and aquatic ecosystems; threats to biodiversity, hot-spots, and in-situ/ex-situ conservation.',
        'Module 3: Environmental Pollution & Waste Management - Causes, effects, and control of air, water, soil, marine, noise, and thermal pollution; solid and electronic waste management; disaster mitigation.',
        'Module 4: Social Issues, Environmental Policy & Human Population - Sustainable development, water harvesting, climate change, global warming, acid rain, ozone depletion; Environment Protection Acts; population growth and environmental ethics.'
      ],
      textbooks: [
        'Erach Bharucha, "Textbook of Environmental Studies for Undergraduate Courses", Universities Press',
        'R. Rajagopalan, "Environmental Studies: From Crisis to Cure", Oxford University Press'
      ]
    },
    'ME300': {
      code: 'ME300',
      name: 'Seminar',
      type: 'Theory',
      credits: 1,
      ltp: '0-0-2',
      teachingSlot: 'Tuesday 15:00 - 15:55',
      examSlot: 'Seminar',
      coordinator: 'Dr. Srikumar Warrier',
      shortName: 'SW',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Control & Mechanical Engineering',
      email: 'srikumar.warrier@nitgoa.ac.in',
      room: 'Room 55',
      category: 'core',
      notes: 'Tuesday 15:00 - 15:55 (Room 55). Technical presentation, literature survey, and defense before faculty committee.',
      modules: [
        'Module 1: Research Topic Selection & Literature Survey - Comprehensive survey of high-impact mechanical engineering journals (ASME, Elsevier, Springer), identifying thermal/manufacturing/design challenges.',
        'Module 2: Synthesis & Scientific Writing - Drafting a comprehensive technical report following standard ASME citation style, structured figures, tables, and mathematical equations.',
        'Module 3: Technical Slide Design & Delivery - Effective visual communication, CAD model/experimental curve presentation, delivery pacing, and time management.',
        'Module 4: Oral Defense & Evaluation - Formal oral presentation before the departmental evaluation committee, answering technical questions, and responding to panel critique.'
      ],
      textbooks: [
        'ASME / Elsevier Mechanical Engineering Journals',
        'David F. Beer, David McMurrey, "A Guide to Writing as an Engineer", John Wiley'
      ]
    },
    'ME305': {
      code: 'ME305',
      name: 'Machine Shop - II',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Mon/Thu 14:00 - 16:55 (G.D. Naidu Complex)',
      examSlot: 'Practical',
      coordinator: 'Dr. B Santhi',
      shortName: 'BS',
      facultyDesignation: 'Associate Professor (Mechanical)',
      facultyResearch: 'Machining, Tool Dynamics, Metrology',
      email: 'santhi@nitgoa.ac.in',
      room: 'G.D. Naidu Workshop',
      category: 'lab',
      notes: 'Advanced lathe operations (thread cutting, taper turning), shaper and planer exercises, spur gear cutting on universal milling machine, surface grinding.',
      modules: [
        'Experiment 1: Single-start and multi-start V-thread and square thread cutting on engine lathe.',
        'Experiment 2: Machining flat, vertical and inclined surfaces on shaper machine.',
        'Experiment 3: Spur gear cutting using simple and differential indexing on universal milling machine.',
        'Experiment 4: Cylindrical and surface grinding with precision tolerance inspection.',
        'Experiment 5: Metrological inspection of machined components using vernier height gauge, dial indicator, and toolmakers microscope.'
      ],
      textbooks: ['Machine Shop Laboratory Manual, Department of Mechanical Engineering, NIT Goa']
    },
    'ME306': {
      code: 'ME306',
      name: 'Thermal Lab - II',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Mon/Thu 14:00 - 16:55 (Visvesvaraya 22, 16)',
      examSlot: 'Practical',
      coordinator: 'Dr. Samar Singhal',
      shortName: 'SS',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Thermal Systems Testing',
      email: 'samar.singhal@nitgoa.ac.in',
      room: 'Visvesvaraya Lab (Room 22, 16)',
      category: 'lab',
      notes: 'Thermal conductivity measurement of insulating powders, pin fin forced/natural convection, Stefan-Boltzmann radiation constant, parallel/counter flow heat exchanger LMTD.',
      modules: [
        'Experiment 1: Thermal conductivity determination of insulating powder in concentric sphere apparatus.',
        'Experiment 2: Heat transfer coefficient and fin efficiency of pin-fin in natural and forced convection.',
        'Experiment 3: Verification of Stefan-Boltzmann constant of thermal radiation.',
        'Experiment 4: Overall heat transfer coefficient and LMTD calculation for parallel and counter-flow concentric tube heat exchanger.',
        'Experiment 5: Emissivity measurement of non-black test surface.'
      ],
      textbooks: ['Thermal Engineering Lab Manual, NIT Goa']
    }
  },
  schedule: buildInstituteMasterSchedule({
    prefix: 'me5',
    room: 'Room 55',
    slotA: 'ME302',
    slotB: 'ME525',
    slotC: 'ME301',
    slotD: 'ME304',
    slotE: 'ME303',
    slotF: 'ME500',
    mlcFriday: 'ES300',
    labMon: { code: 'ME305', name: 'Machine Shop - II (BS) B2 / Thermal Lab - II (SS) B1', room: 'G.D. Naidu / Visvesvaraya' },
    labThu: { code: 'ME306', name: 'Machine Shop - II (BS) B1 / Thermal Lab - II (SS) B2', room: 'G.D. Naidu / Visvesvaraya' },
    labWed: { code: 'ME304', name: 'DME-II Tutorial (CV)', room: 'Room 55' },
    notesWedLab: 'Dr. Chaitanya Vundru (CV) - DME-II Tutorial (16:00-16:55)',
    notesMonLab: 'Batch 1: ME306 Thermal Lab (SS) | Batch 2: ME305 Machine Shop (BS)',
    notesThuLab: 'Batch 1: ME305 Machine Shop (BS) | Batch 2: ME306 Thermal Lab (SS)',
    customSaturdayFocus: 'Heat Transfer & DME-II Analytical Design Clinics',
  })
};
