import { Course, TimeSlot, DayOfWeek } from '../timetableData';
import { buildInstituteMasterSchedule } from './scheduleBuilder';

export interface SemesterData {
  courses: Record<string, Course>;
  schedule: Record<DayOfWeek, TimeSlot[]>;
}

// ==========================================
// 3rd Semester (2nd Year Odd) - CSE (Room 70/71)
// Faculty Advisor: Dr. Keshavamurthy B N (bnkeshav.fcse@nitgoa.ac.in)
// ==========================================
export const CSE_3: SemesterData = {
  courses: {
    'MA201': {
      code: 'MA201',
      name: 'Probability, Statistics and Queuing Theory',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr L. Shangerganesh',
      shortName: 'LSG',
      facultyDesignation: 'Assistant Professor (Mathematics)',
      facultyResearch: 'Partial Differential Equations, Stochastic Modeling, Applied Statistics',
      email: 'shangerganesh@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/appliedsciences',
      room: 'Room 70/71',
      category: 'core',
      notes: 'Teaching Slot A. Probability distributions, random processes, queuing models (M/M/1, M/M/c), Markov chains.',
      modules: [
        'Module 1: Probability & Random Variables - Axioms, conditional probability, Bayes theorem, Discrete & continuous random variables, PMF, PDF, CDF, Expectation and variance.',
        'Module 2: Standard Probability Distributions - Binomial, Poisson, Geometric, Exponential, Normal, Uniform distributions, Central Limit Theorem.',
        'Module 3: Stochastic Processes & Markov Chains - Definition, classification, discrete-time Markov chains, transition probability matrix, Chapman-Kolmogorov equations, stationary distribution.',
        'Module 4: Queuing Theory - Characteristics of queuing models, Kendall notation, birth-death process, M/M/1, M/M/c models with finite and infinite capacities, Little law.'
      ],
      textbooks: [
        'Sheldon M. Ross, "Introduction to Probability and Statistics for Engineers and Scientists", 5th Edition, Academic Press',
        'K. S. Trivedi, "Probability and Statistics with Reliability, Queuing, and Computer Science Applications", 2nd Edition, Wiley'
      ]
    },
    'CS200': {
      code: 'CS200',
      name: 'Data Structures',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Ms. Helga Lobo',
      shortName: 'HL',
      facultyDesignation: 'Faculty (Department of CSE)',
      facultyResearch: 'Data Structures, Algorithm Analysis, Information Retrieval',
      email: 'helga.lobo@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse',
      room: 'Room 70/71',
      category: 'core',
      notes: 'Teaching Slot B. Stacks, queues, linked lists, trees, binary search trees, AVL, heaps, graph traversals, and hashing.',
      modules: [
        'Module 1: Linear Data Structures - Arrays, dynamic lists, singly/doubly/circular linked lists, stacks and queues: array & pointer implementations, infix to postfix conversion.',
        'Module 2: Trees & Balanced Search Trees - Binary trees, properties, traversals (inorder, preorder, postorder), Binary Search Trees (BST), AVL trees, rotations, B-Trees.',
        'Module 3: Priority Queues & Hashing - Min-heaps, max-heaps, heapsort, Hash functions, collision resolution mechanisms (chaining, open addressing, probing).',
        'Module 4: Graphs & Path Algorithms - Graph representations (adjacency matrix and list), BFS, DFS, topological sorting, shortest path algorithms (Dijkstra), Prim & Kruskal MST.'
      ],
      textbooks: [
        'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein, "Introduction to Algorithms", 4th Edition, MIT Press',
        'Mark Allen Weiss, "Data Structures and Algorithm Analysis in C++", 4th Edition, Pearson'
      ]
    },
    'CS202': {
      code: 'CS202',
      name: 'Discrete Mathematics',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Mrs. Sreedivya',
      shortName: 'SD',
      facultyDesignation: 'Faculty (Department of CSE)',
      facultyResearch: 'Discrete Mathematics, Formal Languages, Graph Theory, Combinatorics',
      email: 'sreedivya@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse',
      room: 'Room 70/71',
      category: 'core',
      notes: 'Teaching Slot C. Mathematical logic, predicates, sets, relations, lattices, algebraic structures, recurrence relations, and graph coloring.',
      modules: [
        'Module 1: Mathematical Logic & Predicates - Propositional logic, truth tables, tautologies, predicate calculus, universal and existential quantifiers, rules of inference.',
        'Module 2: Sets, Relations & Functions - Properties of relations, equivalence relations, partial ordering, Hasse diagrams, lattices, bijective functions, pigeonhole principle.',
        'Module 3: Algebraic Structures - Semigroups, monoids, groups, subgroups, cosets, Lagrange theorem, rings, integral domains and fields.',
        'Module 4: Combinatorics & Graph Theory - Generating functions, linear recurrence relations with constant coefficients, planar graphs, graph coloring, chromatic number.'
      ],
      textbooks: [
        'Kenneth H. Rosen, "Discrete Mathematics and Its Applications", 8th Edition, McGraw-Hill',
        'J. P. Tremblay, R. Manohar, "Discrete Mathematical Structures with Applications to Computer Science", McGraw-Hill'
      ]
    },
    'CS201': {
      code: 'CS201',
      name: 'Digital System Design',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Lokesh Kumar Bramhane',
      shortName: 'LB',
      facultyDesignation: 'Assistant Professor (ECE / CSE)',
      facultyResearch: 'Digital VLSI Design, Low Power Architectures, FPGA Prototyping',
      email: 'lokesh.bramhane@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse',
      room: 'Room 70/71',
      category: 'core',
      notes: 'Teaching Slot D. Boolean minimization, K-maps, combinational circuits (adders, multiplexers), sequential circuits (flip-flops, counters, FSMs).',
      modules: [
        'Module 1: Boolean Algebra & Minimization - Number systems, binary codes, Boolean theorems, Karnaugh maps (up to 5 variables), Quine-McCluskey tabulation method.',
        'Module 2: Combinational Logic Circuits - Half/Full adders, carry look-ahead adders, subtractors, encoders, decoders, multiplexers, demultiplexers, parity generators.',
        'Module 3: Sequential Logic Circuits - Latches and Flip-Flops (SR, JK, D, T), master-slave configuration, excitation tables, state equations and state reduction.',
        'Module 4: Registers, Counters & FSM Design - Shift registers, synchronous and asynchronous counters, Mealy and Moore state machine architectures, Verilog HDL basics.'
      ],
      textbooks: [
        'M. Morris Mano, Michael D. Ciletti, "Digital Design: With an Introduction to the Verilog HDL", 6th Edition, Pearson',
        'John F. Wakerly, "Digital Design: Principles and Practices", 5th Edition, Pearson'
      ]
    },
    'CS203': {
      code: 'CS203',
      name: 'Object Oriented Programming',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Mini S',
      shortName: 'MS',
      facultyDesignation: 'Associate Professor & Dean Academics (CSE)',
      facultyResearch: 'Distributed Computing, Wireless Sensor Networks, Object Oriented Architectures',
      email: 'mini@nitgoa.ac.in',
      facultyWebsite: 'https://www.nitgoa.ac.in/department/cse',
      room: 'Room 70/71',
      category: 'core',
      notes: 'Teaching Slot E. Classes, objects, inheritance, polymorphism, templates, exception handling, STL containers and iterators in C++ and Java.',
      modules: [
        'Module 1: OOP Paradigms & Classes - Encapsulation, abstraction, classes, constructors, destructors, dynamic memory allocation, friend functions, static members.',
        'Module 2: Inheritance & Polymorphism - Single, multiple, multilevel, hierarchical inheritance, virtual base classes, function and operator overloading, virtual functions and vtables.',
        'Module 3: Generic Programming & Templates - Function templates, class templates, Standard Template Library (STL): vectors, lists, maps, sets, algorithms and iterators.',
        'Module 4: Exception Handling & File Streams - Try-catch-throw mechanisms, custom exceptions, file input/output streams, object serialization, design patterns introduction.'
      ],
      textbooks: [
        'Bjarne Stroustrup, "The C++ Programming Language", 4th Edition, Addison-Wesley',
        'Herbert Schildt, "Java: The Complete Reference", 12th Edition, McGraw-Hill'
      ]
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
      facultyResearch: 'Environmental Chemistry, EPR Spectroscopy, Green Materials',
      email: 'velavan@nitgoa.ac.in',
      room: 'Room 70/71',
      category: 'mlc',
      notes: 'Ecosystems, biodiversity conservation, pollution control, climate change, solid waste management, environmental legislation.',
      modules: [
        'Module 1: Ecosystems & Biodiversity - Ecological succession, food chains, trophic levels, biodiversity hotspots in Western Ghats, conservation strategies.',
        'Module 2: Environmental Pollution - Air, water, soil, noise, and marine pollution sources, impacts, and mitigation technologies.',
        'Module 3: Waste Management & Green Energy - Solid waste segregation, e-waste hazards, plastic recycling, solar and wind renewable energy transition.',
        'Module 4: Environmental Policy & Ethics - Climate change, carbon footprint, Kyoto/Paris agreements, Environmental Protection Act, sustainable development goals.'
      ],
      textbooks: [
        'Erach Bharucha, "Textbook of Environmental Studies for Undergraduate Courses", Universities Press'
      ]
    },
    'CS204': {
      code: 'CS204',
      name: 'Data Structures Lab',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Monday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Ms. Helga Lobo',
      shortName: 'HL',
      facultyDesignation: 'Faculty (CSE)',
      facultyResearch: 'Algorithmic implementations',
      email: 'helga.lobo@nitgoa.ac.in',
      room: 'Computing Lab (Room 30)',
      category: 'lab',
      notes: 'Implementation of linked lists, stacks, queues, binary search trees, AVL balancing, heapsort, and graph algorithms.',
      modules: [
        'Experiment 1: Singly and doubly linked list with search, insertion and deletion operations.',
        'Experiment 2: Stack implementation and infix-to-postfix expression evaluator.',
        'Experiment 3: Binary Search Tree (BST) construction, recursive traversals, and deletion.',
        'Experiment 4: Priority queue using min/max binary heap and Heapsort algorithm.',
        'Experiment 5: Graph traversal implementations: BFS, DFS, and Dijkstra shortest path.'
      ],
      textbooks: ['Data Structures Laboratory Manual, NIT Goa']
    },
    'CS205': {
      code: 'CS205',
      name: 'Digital Systems Design Lab',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Tuesday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Lokesh Kumar Bramhane',
      shortName: 'LB',
      facultyDesignation: 'Assistant Professor (ECE/CSE)',
      facultyResearch: 'Digital Circuit Testing and FPGA Design',
      email: 'lokesh.bramhane@nitgoa.ac.in',
      room: 'Digital Logic Lab (Room 30)',
      category: 'lab',
      notes: 'Realization of Boolean expressions with logic gates, adders, multiplexers, counters, and Verilog simulation on FPGA.',
      modules: [
        'Experiment 1: Verification of truth tables of basic, universal, and XOR logic gates.',
        'Experiment 2: Design and realization of half and full adder/subtractor using NAND gates.',
        'Experiment 3: Realization of 4:1 multiplexer and 1:4 demultiplexer circuits.',
        'Experiment 4: Design of synchronous and asynchronous 4-bit binary up/down counters.',
        'Experiment 5: HDL simulation and FPGA synthesis of combinational and sequential modules.'
      ],
      textbooks: ['Digital Systems Laboratory Manual, Department of CSE, NIT Goa']
    },
    'CS206': {
      code: 'CS206',
      name: 'Object Oriented Programming Lab',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Thursday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Mini S (B1) / Mr. Sarvesh Sawant (B2)',
      shortName: 'MS / SS',
      facultyDesignation: 'Faculty (Department of CSE)',
      facultyResearch: 'Software Architectures & OOP Applications',
      email: 'mini@nitgoa.ac.in',
      room: 'Computing Lab (Room 46)',
      category: 'lab',
      notes: 'Batch 1: Dr. Mini S. Batch 2: Mr. Sarvesh Sawant. Hands-on OOP in C++ and Java with inheritance, polymorphism, templates, and exceptions.',
      modules: [
        'Experiment 1: Class construction, constructor overloading, copy constructors and destructors.',
        'Experiment 2: Operator overloading: complex number operations and matrix multiplication.',
        'Experiment 3: Inheritance hierarchies and runtime polymorphism using virtual functions.',
        'Experiment 4: Generic templates: template stack and queue with custom datatypes.',
        'Experiment 5: Comprehensive mini-project applying design patterns and file persistence.'
      ],
      textbooks: ['OOP Laboratory Manual, NIT Goa']
    },
    'CS300M': {
      code: 'CS300M',
      name: 'Design and Analysis of Algorithm (Minor in CSE)',
      type: 'Minor',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'Minor Slot (G)',
      examSlot: 'G',
      coordinator: 'Dr. Pravati Swain',
      shortName: 'PS',
      facultyDesignation: 'Associate Professor & HoD (CSE)',
      facultyResearch: 'Algorithm Design, Wireless Sensor Networks',
      email: 'pravati@nitgoa.ac.in',
      room: 'Room 74/75 / 56/57',
      category: 'minor',
      notes: 'Minor Course for non-CSE students: Divide and conquer, greedy methods, dynamic programming, and graph algorithms.',
      modules: [
        'Module 1: Foundations - Asymptotic notation, recurrences, divide-and-conquer: mergesort, quicksort.',
        'Module 2: Greedy Strategy - Fractional knapsack, Huffman codes, Prim and Kruskal MST.',
        'Module 3: Dynamic Programming - 0/1 knapsack, Matrix Chain Multiplication, Longest Common Subsequence.',
        'Module 4: Graph Algorithms - BFS, DFS, Bellman-Ford, Dijkstra, Intro to NP-completeness.'
      ],
      textbooks: ['Thomas H. Cormen et al., "Introduction to Algorithms", MIT Press']
    }
  },
  schedule: buildInstituteMasterSchedule({
    prefix: 'cse3',
    room: 'Room 70/71',
    slotA: 'MA201',
    slotB: 'CS200',
    slotC: 'CS202',
    slotD: 'CS201',
    slotE: 'CS203',
    slotG_Minor: 'CS300M',
    mlcFriday: 'ES300',
    labMon: { code: 'CS204', name: 'Data Structures Lab (HL)', room: 'Room 30' },
    labTue: { code: 'CS205', name: 'Digital Systems Design Lab (LB)', room: 'Room 30' },
    labThu: { code: 'CS206', name: 'Object Oriented Programming Lab (B1: MS / B2: SS)', room: 'Room 46' },
    notesMonLab: 'Ms. Helga Lobo (HL) - Room 30',
    notesTueLab: 'Dr. Lokesh Kumar Bramhane (LB) - Room 30',
    notesThuLab: 'Batch 1: Dr. Mini S | Batch 2: Mr. Sarvesh Sawant - Room 46',
    customSaturdayFocus: 'Probability & Data Structures Problem Clinics',
  })
};

// ==========================================
// 3rd Semester (2nd Year Odd) - Civil (Room 56/57)
// Faculty Advisor: Dr. Aparup Biswal (aparup@nitgoa.ac.in)
// ==========================================
export const CVE_3: SemesterData = {
  courses: {
    'CV204': {
      code: 'CV204',
      name: 'Building and Construction Materials',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. S Sethulekshmi',
      shortName: 'SS',
      facultyDesignation: 'Assistant Professor (Civil Engineering)',
      facultyResearch: 'Sustainable Concrete, Construction Technology, Waste Valorization',
      email: 'sethulekshmi@nitgoa.ac.in',
      room: 'Room 56/57',
      category: 'core',
      notes: 'Teaching Slot A. Cement, aggregates, concrete technology, masonry, structural steel, and modern composites.',
      modules: [
        'Module 1: Stones, Bricks & Mortar - Geological classification of rocks, quarrying, dressing, brick manufacturing, mortar types and proportions.',
        'Module 2: Cement & Concrete - Portland cement chemical composition, hydration, testing, aggregates, workability, water-cement ratio, durability.',
        'Module 3: Timber & Metals - Seasoning of timber, defects, structural steel grades, corrosion prevention, aluminum and glass in architecture.',
        'Module 4: Modern Building Materials - Geopolymer concrete, fiber reinforced concrete, smart materials, thermal insulation and waterproofing.'
      ],
      textbooks: ['S. K. Duggal, "Building Materials", 5th Edition, New Age International', 'M. S. Shetty, "Concrete Technology", S. Chand']
    },
    'CV200': {
      code: 'CV200',
      name: 'Mechanics of Solids',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Aparup Biswal',
      shortName: 'AB',
      facultyDesignation: 'Assistant Professor & Faculty Advisor (Civil Engineering)',
      facultyResearch: 'Structural Mechanics, Seismic Engineering, Composite Structures',
      email: 'aparup@nitgoa.ac.in',
      room: 'Room 56/57',
      category: 'core',
      notes: 'Teaching Slot B. Stresses, strains, shear force & bending moment diagrams, bending and shear stresses, Mohr circle, deflection of beams, torsion.',
      modules: [
        'Module 1: Stress and Strain - Direct stress and strain, Hooke law, Poisson ratio, elastic constants (E, G, K), thermal stresses, compound bars.',
        'Module 2: Shear Force & Bending Moment - Types of beams and loads, SFD and BMD for simply supported, cantilever, and overhanging beams.',
        'Module 3: Bending & Shear Stresses - Theory of simple bending, section modulus, flexural shear stress distribution, principal stresses and Mohr circle.',
        'Module 4: Deflection & Torsion - Double integration method, Macaulay method, torsion of circular shafts, strain energy and impact loading.'
      ],
      textbooks: ['James M. Gere, Barry J. Goodno, "Mechanics of Materials", Cengage', 'S. Ramamrutham, "Strength of Materials", Dhanpat Rai']
    },
    'CV202': {
      code: 'CV202',
      name: 'Surveying',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Sathishraj Mani',
      shortName: 'SRM',
      facultyDesignation: 'Assistant Professor (Civil Engineering)',
      facultyResearch: 'Geomatics, Photogrammetry, Remote Sensing, Surveying Networks',
      email: 'sathishraj@nitgoa.ac.in',
      room: 'Room 56/57',
      category: 'core',
      notes: 'Teaching Slot C. Levelling, theodolite traversing, tachometry, curve setting, Total Station and GPS principles.',
      modules: [
        'Module 1: Levelling & Contouring - Differential levelling, fly levelling, profile levelling, contour characteristics, interpolation and uses.',
        'Module 2: Theodolite Traversing - Vernier and digital theodolites, balancing of traverse, Gale traverse table, omitted measurements.',
        'Module 3: Tacheometry & Curves - Stadia principles, tangential tacheometry, simple, compound, reverse, and vertical curves calculation and setting out.',
        'Module 4: Modern Surveying - Electronic Distance Measurement (EDM), Total Station operations, Global Positioning System (GPS) kinematics.'
      ],
      textbooks: ['B. C. Punmia, "Surveying Vol. I & II", Laxmi Publications', 'K. R. Arora, "Surveying", Standard Book House']
    },
    'CV203': {
      code: 'CV203',
      name: 'Engineering Geology',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Kandalai Srikanth',
      shortName: 'KS',
      facultyDesignation: 'Assistant Professor (Civil Engineering)',
      facultyResearch: 'Geotechnical Engineering, Soil Mechanics, Rock Mechanics',
      email: 'srikanth@nitgoa.ac.in',
      room: 'Room 56/57',
      category: 'core',
      notes: 'Teaching Slot D. Mineralogy, petrology, structural geology (faults, folds), geological site investigations for dams and tunnels.',
      modules: [
        'Module 1: Mineralogy & Petrology - Physical properties of minerals, classification and engineering properties of igneous, sedimentary, and metamorphic rocks.',
        'Module 2: Structural Geology - Dip, strike, folds, faults, joints, unconformities, geological mapping and structural interpretation.',
        'Module 3: Geological Investigations - Subsurface exploration, core drilling, electrical resistivity and seismic refraction methods.',
        'Module 4: Engineering Applications - Geological considerations in site selection for dams, reservoirs, tunnels, bridges, and landslide stabilization.'
      ],
      textbooks: ['N. Chenna Kesavulu, "Textbook of Engineering Geology", Macmillan', 'Parbin Singh, "Engineering and General Geology", S. K. Kataria']
    },
    'CV201': {
      code: 'CV201',
      name: 'Mechanics of Fluids',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Rishi D Sahastrabuddhe',
      shortName: 'RDS',
      facultyDesignation: 'Assistant Professor (Civil Engineering)',
      facultyResearch: 'Fluid Dynamics, Hydrology, Water Resources Engineering',
      email: 'rishi@nitgoa.ac.in',
      room: 'Room 56/57',
      category: 'core',
      notes: 'Teaching Slot E. Fluid statics, buoyancy, kinematics, continuity, Bernoulli equation, momentum equation, pipe flows, boundary layer.',
      modules: [
        'Module 1: Fluid Statics - Pressure measurement, manometers, hydrostatic forces on submerged plane and curved surfaces, metacentric height.',
        'Module 2: Fluid Kinematics - Streamlines, streaklines, pathlines, velocity potential and stream functions, circulation, vorticity.',
        'Module 3: Fluid Dynamics - Euler equation, Bernoulli equation with applications (venturimeter, orificemeter, pitot tube), momentum theorem.',
        'Module 4: Pipe Flow & Boundary Layer - Laminar and turbulent flow, Hagen-Poiseuille law, Darcy-Weisbach friction factor, minor losses, boundary layer separation.'
      ],
      textbooks: ['Frank M. White, "Fluid Mechanics", 8th Edition, McGraw-Hill', 'P. N. Modi, S. M. Seth, "Hydraulics and Fluid Mechanics", Standard Book House']
    },
    'MA200': {
      code: 'MA200',
      name: 'Advanced Differential Equations and Complex Analysis',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'F',
      examSlot: 'F',
      coordinator: 'Dr. Ravi Ragoju',
      shortName: 'RR',
      facultyDesignation: 'Associate Professor (Mathematics)',
      facultyResearch: 'Fluid Dynamics, Boundary Value Problems, Complex Variables',
      email: 'raviragoju@nitgoa.ac.in',
      room: 'Room 56/57',
      category: 'core',
      notes: 'Teaching Slot F. Second-order PDEs, separation of variables, analytic functions, Cauchy-Riemann equations, contour integration, residue theorem.',
      modules: [
        'Module 1: Partial Differential Equations - Classification of 2nd order PDEs, Wave equation, Heat equation, Laplace equation solutions using separation of variables.',
        'Module 2: Complex Analytic Functions - Cauchy-Riemann equations, harmonic functions, Milne-Thomson method, conformal mapping.',
        'Module 3: Complex Integration - Cauchy integral theorem and formula, Taylor and Laurent series expansions, classification of singularities.',
        'Module 4: Residue Calculus - Cauchy residue theorem, evaluation of real definite and improper integrals using contour integration.'
      ],
      textbooks: ['Erwin Kreyszig, "Advanced Engineering Mathematics", 10th Edition, Wiley', 'B. S. Grewal, "Higher Engineering Mathematics", Khanna']
    },
    'CV205': {
      code: 'CV205',
      name: 'Material Testing Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Monday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Aparup Biswal',
      shortName: 'AB',
      facultyDesignation: 'Assistant Professor (Civil Engineering)',
      facultyResearch: 'Materials testing, Concrete technology',
      email: 'aparup@nitgoa.ac.in',
      room: 'Material Testing Lab',
      category: 'lab',
      notes: 'Tension, compression, bending, torsion, hardness (Brinell/Rockwell), and impact (Izod/Charpy) tests on metals and concrete.',
      modules: [
        'Experiment 1: Tension test on mild steel and HYSD rebar on Universal Testing Machine (UTM).',
        'Experiment 2: Compression test on timber, concrete cubes, and brick specimens.',
        'Experiment 3: Torsion test on circular mild steel specimens for shear modulus.',
        'Experiment 4: Hardness test using Brinell and Rockwell testing machines.',
        'Experiment 5: Izod and Charpy impact toughness testing of metals.'
      ],
      textbooks: ['Material Testing Lab Manual, Department of Civil Engineering, NIT Goa']
    },
    'CV206': {
      code: 'CV206',
      name: 'Fluid Mechanics Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Tuesday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Rishi D Sahastrabuddhe',
      shortName: 'RDS',
      facultyDesignation: 'Assistant Professor (Civil Engineering)',
      facultyResearch: 'Hydraulic experiments and calibrations',
      email: 'rishi@nitgoa.ac.in',
      room: 'Fluid Mechanics Lab',
      category: 'lab',
      notes: 'Calibration of venturimeter, orifice meter, V-notch, pipe friction factor, and Bernoulli theorem demonstration.',
      modules: [
        'Experiment 1: Verification of Bernoulli theorem using variable cross-section conduit.',
        'Experiment 2: Calibration of Venturimeter and Orifice meter for discharge coefficient.',
        'Experiment 3: Flow over rectangular and V-notch weirs.',
        'Experiment 4: Determination of Darcy-Weisbach friction factor in pipe flow.',
        'Experiment 5: Measurement of minor losses due to pipe fittings, bends, and expansions.'
      ],
      textbooks: ['Fluid Mechanics Lab Manual, NIT Goa']
    },
    'CV207': {
      code: 'CV207',
      name: 'Surveying Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Thursday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Sathishraj Mani',
      shortName: 'SRM',
      facultyDesignation: 'Assistant Professor (Civil Engineering)',
      facultyResearch: 'Geomatics and surveying fieldwork',
      email: 'sathishraj@nitgoa.ac.in',
      room: 'Survey Field / Lab',
      category: 'lab',
      notes: 'Fieldwork: Profile levelling, contour mapping, theodolite traversing, curve setting out, and Total Station measurements.',
      modules: [
        'Experiment 1: Profile levelling and cross-sectioning for road alignment.',
        'Experiment 2: Contour map preparation of undulating terrain using grid method.',
        'Experiment 3: Measurement of horizontal and vertical angles using vernier theodolite.',
        'Experiment 4: Setting out of simple circular curves using Rankine deflection angle method.',
        'Experiment 5: Area and distance measurement using electronic Total Station.'
      ],
      textbooks: ['Surveying Fieldwork Manual, NIT Goa']
    }
  },
  schedule: buildInstituteMasterSchedule({
    prefix: 'cve3',
    room: 'Room 56/57',
    slotA: 'CV204',
    slotB: 'CV200',
    slotC: 'CV202',
    slotD: 'CV203',
    slotE: 'CV201',
    slotF: 'MA200',
    labMon: { code: 'CV205', name: 'Material Testing Laboratory (AB)', room: 'Material Testing Lab' },
    labTue: { code: 'CV206', name: 'Fluid Mechanics Laboratory (RDS)', room: 'Fluid Mechanics Lab' },
    labThu: { code: 'CV207', name: 'Surveying Laboratory (SRM)', room: 'Surveying Field' },
    notesMonLab: 'Dr. Aparup Biswal (AB) - Material Testing Lab',
    notesTueLab: 'Dr. Rishi D Sahastrabuddhe (RDS) - Fluid Mechanics Lab',
    notesThuLab: 'Dr. Sathishraj Mani (SRM) - Surveying Field / Lab',
    customSaturdayFocus: 'Mechanics of Solids & Advanced Math Problem Solving',
  })
};

// ==========================================
// 3rd Semester (2nd Year Odd) - ECE (Room 74/75)
// Faculty Advisor: Dr. Prashanth GR (grprashanth@nitgoa.ac.in)
// ==========================================
export const ECE_3: SemesterData = {
  courses: {
    'MA202': {
      code: 'MA202',
      name: 'Mathematical Methods for Communication Engineering',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. G. Shiva Kumar Reddy',
      shortName: 'GSK',
      facultyDesignation: 'Assistant Professor (Mathematics)',
      facultyResearch: 'Signal Transforms, Communication Mathematics',
      email: 'gshivakumarreddy913@nitgoa.ac.in',
      room: 'Room 74/75',
      category: 'core',
      notes: 'Teaching Slot A. Fourier series, Fourier transforms, Laplace transforms, Z-transforms, probability distributions and noise analysis.',
      modules: [
        'Module 1: Continuous Fourier Transforms - Properties, duality, convolution, modulation, energy spectral density, Parseval relation.',
        'Module 2: Discrete Transforms - Discrete-time Fourier transform (DTFT), Z-transform, region of convergence (ROC), inverse Z-transform.',
        'Module 3: Probability & Random Processes - Random variables, PDF, CDF, moments, Wide-Sense Stationary (WSS) random processes, autocorrelation.',
        'Module 4: Spectral Analysis & Noise - Power spectral density (PSD), linear time-invariant systems with random inputs, white Gaussian noise.'
      ],
      textbooks: ['Alan V. Oppenheim, Alan S. Willsky, "Signals and Systems", 2nd Edition, Pearson']
    },
    'EC200': {
      code: 'EC200',
      name: 'Electromagnetic Theory',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Anirban Chatterjee',
      shortName: 'AC',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Antennas, Microwaves, Computational Electromagnetics',
      email: 'anirban.chatterjee@nitgoa.ac.in',
      room: 'Room 74/75',
      category: 'core',
      notes: 'Teaching Slot B. Vector calculus, electrostatics, magnetostatics, Maxwell equations, uniform plane wave propagation, transmission lines.',
      modules: [
        'Module 1: Electrostatics & Magnetostatics - Coulomb law, Gauss law, Poisson and Laplace equations, Biot-Savart law, Ampere circuital law, magnetic vector potential.',
        'Module 2: Maxwell Equations - Faraday law, displacement current, differential and integral forms of Maxwell equations, boundary conditions.',
        'Module 3: Electromagnetic Waves - Wave equation, uniform plane waves in lossless and lossy media, skin depth, Poynting theorem, reflection and refraction.',
        'Module 4: Transmission Lines - Telegrapher equations, characteristic impedance, reflection coefficient, standing wave ratio (SWR), Smith chart basics.'
      ],
      textbooks: ['Matthew N. O. Sadiku, "Elements of Electromagnetics", 7th Edition, Oxford University Press']
    },
    'EC201': {
      code: 'EC201',
      name: 'Network Theory and Synthesis',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Lokesh Kumar Bramhane',
      shortName: 'LKB',
      facultyDesignation: 'Assistant Professor (ECE)',
      facultyResearch: 'Circuit Theory, VLSI Architectures',
      email: 'lokesh.bramhane@nitgoa.ac.in',
      room: 'Room 74/75',
      category: 'core',
      notes: 'Teaching Slot C. Graph theory of networks, transient analysis, two-port networks (Z, Y, ABCD, h), positive real functions, Foster and Cauer synthesis.',
      modules: [
        'Module 1: Network Topology & Graph Theory - Graph, tree, cotree, incidence matrix, tie-set matrix, cut-set matrix, formulation of equilibrium equations.',
        'Module 2: Transient Analysis - Time domain analysis of RL, RC, RLC circuits under DC and AC excitations, Laplace transform application.',
        'Module 3: Two-Port Networks - Z, Y, ABCD, h, and g parameters, interconnected two-port networks, reciprocity, symmetry, image parameters.',
        'Module 4: Network Synthesis - Positive real functions, Hurwitz polynomials, Foster and Cauer realization of LC, RC, and RL immittance functions.'
      ],
      textbooks: ['M. E. Van Valkenburg, "Network Analysis", 3rd Edition, Pearson', 'Franklin F. Kuo, "Network Analysis and Synthesis", Wiley']
    },
    'EC202': {
      code: 'EC202',
      name: 'Digital System Design',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Prashanth GR',
      shortName: 'PGR',
      facultyDesignation: 'Associate Professor & Faculty Advisor (ECE)',
      facultyResearch: 'Digital Architectures, Embedded Systems, Microelectronics',
      email: 'grprashanth@nitgoa.ac.in',
      room: 'Room 74/75',
      category: 'core',
      notes: 'Teaching Slot D. Combinational and sequential logic, flip-flops, counters, FSM synthesis, memories (ROM/RAM), and Verilog HDL.',
      modules: [
        'Module 1: Combinational Logic Design - Boolean minimization, K-maps, multi-level NAND/NOR networks, arithmetic circuits, multiplexers, decoders.',
        'Module 2: Synchronous Sequential Logic - Flip-flops, state diagram, state reduction and assignment, design of synchronous counters and registers.',
        'Module 3: Asynchronous Sequential Logic - Analysis of asynchronous circuits, transition tables, flow tables, race conditions and hazards.',
        'Module 4: Hardware Description Languages - Verilog HDL structural, dataflow, and behavioral modeling, synthesis of digital logic on FPGAs.'
      ],
      textbooks: ['M. Morris Mano, Michael D. Ciletti, "Digital Design", Pearson']
    },
    'EC203': {
      code: 'EC203',
      name: 'Signals & Systems',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'F',
      examSlot: 'F',
      coordinator: 'Dr. T. Veerakumar',
      shortName: 'TVK',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Digital Signal Processing, Biomedical Image Analysis, Filter Design',
      email: 'tveerakumar@nitgoa.ac.in',
      room: 'Room 74/75',
      category: 'core',
      notes: 'Teaching Slot F. Continuous and discrete LTI systems, convolution, Fourier series, Fourier transforms, Laplace transforms, and sampling theorem.',
      modules: [
        'Module 1: Signals and Systems Classification - Continuous and discrete time signals, energy and power signals, periodicity, linearity, time-invariance, causality, stability.',
        'Module 2: Linear Time-Invariant (LTI) Systems - Impulse response, convolution integral and convolution sum, properties of LTI systems, differential/difference equations.',
        'Module 3: Fourier Representation of Signals - Continuous-time Fourier series (CTFS), continuous-time Fourier transform (CTFT), frequency response of LTI systems.',
        'Module 4: Sampling & Z-Transform - Nyquist sampling theorem, reconstruction from samples, aliasing, discrete-time processing, Z-transforms and system functions.'
      ],
      textbooks: ['Alan V. Oppenheim, Alan S. Willsky, "Signals and Systems", 2nd Edition, Pearson']
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
      notes: 'Environmental protection, sustainable practices, climate change mitigation.',
      modules: ['Ecosystems, biodiversity, environmental pollution, solid waste management, green technologies.'],
      textbooks: ['Erach Bharucha, "Textbook of Environmental Studies"']
    },
    'EC204': {
      code: 'EC204',
      name: 'Digital System Design Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Monday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Anirban Chatterjee',
      shortName: 'AC',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Digital circuit implementation',
      email: 'anirban.chatterjee@nitgoa.ac.in',
      room: 'Digital Design Lab',
      category: 'lab',
      notes: 'Logic gate realization, adder/subtractor, code converters, shift registers, counters, Verilog programming and FPGA download.',
      modules: [
        'Experiment 1: Design of code converters: Binary to Gray and BCD to Excess-3.',
        'Experiment 2: Realization of 4-bit carry look-ahead adder and BCD adder.',
        'Experiment 3: Multiplexer-based logic function realization.',
        'Experiment 4: Synchronous decade counter and ring counter.',
        'Experiment 5: Verilog HDL coding and simulation of Moore/Mealy state machines on Xilinx Vivado.'
      ],
      textbooks: ['DSD Laboratory Manual, Department of ECE, NIT Goa']
    },
    'EC205': {
      code: 'EC205',
      name: 'Signals & Systems Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Tuesday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. T. Veerakumar',
      shortName: 'TVK',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Signal processing software modeling',
      email: 'tveerakumar@nitgoa.ac.in',
      room: 'DSP & Signal Processing Lab',
      category: 'lab',
      notes: 'MATLAB / Python implementation: Signal generation, continuous/discrete convolution, Fourier analysis, pole-zero plots, filter frequency response.',
      modules: [
        'Experiment 1: Generation of elementary signals (unit step, ramp, impulse, sinusoidal, exponential).',
        'Experiment 2: Linear convolution and cross-correlation of discrete-time sequences.',
        'Experiment 3: Verification of sampling theorem and aliasing demonstration.',
        'Experiment 4: Computation of DTFT and frequency response of discrete-time LTI systems.',
        'Experiment 5: Pole-zero diagram plotting and stability checking using Z-transform.'
      ],
      textbooks: ['Signals and Systems Lab Manual, NIT Goa']
    }
  },
  schedule: buildInstituteMasterSchedule({
    prefix: 'ece3',
    room: 'Room 74/75',
    slotA: 'MA202',
    slotB: 'EC200',
    slotC: 'EC201',
    slotD: 'EC202',
    slotF: 'EC203',
    mlcFriday: 'ES300',
    labMon: { code: 'EC204', name: 'Digital System Design Laboratory (AC)', room: 'Digital Design Lab' },
    labTue: { code: 'EC205', name: 'Signals & Systems Laboratory (TVK)', room: 'DSP Lab' },
    notesMonLab: 'Dr. Anirban Chatterjee (AC) - Digital Design Lab',
    notesTueLab: 'Dr. T. Veerakumar (TVK) - DSP & Signal Processing Lab',
    customSaturdayFocus: 'Network Theory & Electromagnetic Field Clinics',
  })
};

// ==========================================
// 3rd Semester (2nd Year Odd) - EEE (Room 48)
// Faculty Advisor: Dr. Soumitra Das (sdas@nitgoa.ac.in)
// ==========================================
export const EEE_3: SemesterData = {
  courses: {
    'EE202': {
      code: 'EE202',
      name: 'Analog Electronics',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Amritansh Sagar',
      shortName: 'AMS',
      facultyDesignation: 'Assistant Professor (EEE)',
      facultyResearch: 'Power Electronics, Analog Circuits, Semiconductor Devices',
      email: 'amritansh.sagar@nitgoa.ac.in',
      room: 'Room 48',
      category: 'core',
      notes: 'Teaching Slot A. BJT and MOSFET small-signal amplifiers, frequency response, feedback amplifiers, oscillators, op-amp linear/nonlinear circuits.',
      modules: [
        'Module 1: Transistor Small-Signal Models - BJT hybrid-pi model, CE, CB, CC amplifier analysis, MOSFET small signal parameters, common source/drain amplifiers.',
        'Module 2: Frequency Response & Multistage - Low and high frequency response of BJT/FET amplifiers, Miller theorem, cascade amplifiers, Darlington pair.',
        'Module 3: Feedback Amplifiers & Oscillators - Negative feedback topologies, gain stability, bandwidth, distortion reduction, Barkhausen criteria, RC phase shift, Wien bridge, Colpitts, Hartley oscillators.',
        'Module 4: Linear & Non-Linear Op-Amp Circuits - Differential amplifier, CMRR, active filters (Butterworth low pass, high pass), precision rectifiers, Schmitt trigger, multivibrators.'
      ],
      textbooks: ['Adel S. Sedra, Kenneth C. Smith, "Microelectronic Circuits", 7th Edition, Oxford University Press']
    },
    'EE201': {
      code: 'EE201',
      name: 'Electrical Circuit Analysis',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Anudevi Samuel',
      shortName: 'ADS',
      facultyDesignation: 'Assistant Professor (EEE)',
      facultyResearch: 'Power Systems, Circuit Simulation, Renewable Energy',
      email: 'anudevi@nitgoa.ac.in',
      room: 'Room 48',
      category: 'core',
      notes: 'Teaching Slot B. Network theorems, transient analysis of AC/DC circuits, resonance, two-port networks, and magnetic coupling.',
      modules: [
        'Module 1: Network Theorems in AC/DC Circuits - Superposition, Thevenin, Norton, Maximum Power Transfer, Tellegen, Reciprocity theorems.',
        'Module 2: Transient Analysis - First order RL and RC circuits, second order RLC circuits, natural and step response, Laplace transform applications.',
        'Module 3: Sinusoidal Steady State & Resonance - Phasor diagrams, series and parallel resonance, quality factor, bandwidth, magnetically coupled circuits, dot convention.',
        'Module 4: Two-Port Networks & Three-Phase - Z, Y, ABCD, h parameters, interconnection of two-ports, balanced/unbalanced 3-phase circuits, star-delta power analysis.'
      ],
      textbooks: ['Charles K. Alexander, Matthew N. O. Sadiku, "Fundamentals of Electric Circuits", 6th Edition, McGraw-Hill']
    },
    'EE200': {
      code: 'EE200',
      name: 'Electromagnetic Field Theory',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Soumitra Das',
      shortName: 'SD',
      facultyDesignation: 'Assistant Professor & Faculty Advisor (EEE)',
      facultyResearch: 'Electromagnetic Modeling, Power Quality, Electric Drives',
      email: 'sdas@nitgoa.ac.in',
      room: 'Room 48',
      category: 'core',
      notes: 'Teaching Slot C. Coordinate systems, electrostatic fields, boundary conditions, magnetostatics, magnetic forces, time-varying fields, Maxwell equations.',
      modules: [
        'Module 1: Electrostatic Fields - Coulomb law, Gauss law, divergence theorem, electric potential, electric dipole, energy density in electrostatic fields.',
        'Module 2: Dielectrics & Boundary Conditions - Polarization, continuity equation, relaxation time, boundary conditions between dielectric-dielectric and dielectric-conductor.',
        'Module 3: Magnetostatic Fields - Biot-Savart law, Ampere circuital law, curl of magnetic fields, magnetic vector potential, magnetic force on moving charge and current element.',
        'Module 4: Time-Varying Fields & Maxwell Equations - Faraday law of electromagnetic induction, displacement current, Maxwell equations in differential and integral forms, wave propagation.'
      ],
      textbooks: ['Matthew N. O. Sadiku, "Elements of Electromagnetics", Oxford University Press', 'William H. Hayt, "Engineering Electromagnetics", McGraw-Hill']
    },
    'MA203': {
      code: 'MA203',
      name: 'Probability and Numerical Methods',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. G Shiva Kumar Reddy',
      shortName: 'GSK',
      facultyDesignation: 'Assistant Professor (Mathematics)',
      facultyResearch: 'Numerical Analysis, Applied Stochastic Models',
      email: 'gshivakumarreddy913@nitgoa.ac.in',
      room: 'Room 48',
      category: 'core',
      notes: 'Teaching Slot D. Root finding, numerical linear algebra, interpolation, numerical integration, differential equations, probability distributions.',
      modules: [
        'Module 1: Numerical Solutions of Equations - Bisection, Newton-Raphson method, Gauss-Seidel iterative method, LU decomposition, Eigenvalues by power method.',
        'Module 2: Interpolation & Calculus - Newton forward/backward interpolation, Lagrange interpolation, Trapezoidal rule, Simpson 1/3 and 3/8 rules.',
        'Module 3: Numerical ODEs - Taylor series method, Euler method, Modified Euler, Runge-Kutta 4th order method, finite difference methods.',
        'Module 4: Probability Distributions - Discrete and continuous random variables, Binomial, Poisson, Exponential, and Normal distributions.'
      ],
      textbooks: ['S. S. Sastry, "Introductory Methods of Numerical Analysis", Prentice Hall', 'Erwin Kreyszig, "Advanced Engineering Mathematics", Wiley']
    },
    'EE203': {
      code: 'EE203',
      name: 'Electrical Machines-I',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Shanta Hardas Patil',
      shortName: 'SHP',
      facultyDesignation: 'Assistant Professor (EEE)',
      facultyResearch: 'Electric Vehicles, Machine Design, Energy Storage',
      email: 'shanta@nitgoa.ac.in',
      room: 'Room 48',
      category: 'core',
      notes: 'Teaching Slot E. Electromechanical energy conversion, DC generators, DC motors, single-phase transformers, testing and 3-phase transformers.',
      modules: [
        'Module 1: Electromechanical Energy Conversion - Energy balance, energy and co-energy, force and torque in singly and doubly excited magnetic systems.',
        'Module 2: DC Machines Construction & Armature - Armature windings (lap, wave), EMF and torque equations, armature reaction, commutation, compensating windings.',
        'Module 3: DC Motors Characteristics & Speed Control - Shunt, series, compound motor characteristics, starting (3-point/4-point starters), speed control (armature, field), Hopkinson test.',
        'Module 4: Transformers - Single-phase transformer equivalent circuit, phasor diagram, OC and SC tests, efficiency, voltage regulation, all-day efficiency, parallel operation, autotransformers.'
      ],
      textbooks: ['I. J. Nagrath, D. P. Kothari, "Electric Machines", 5th Edition, McGraw-Hill', 'P. S. Bimbhra, "Electrical Machinery", 7th Edition, Khanna Publishers']
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
      facultyResearch: 'Environmental Protection and Renewable Transitions',
      email: 'velavan@nitgoa.ac.in',
      room: 'Room 70/71',
      category: 'mlc',
      notes: 'Environmental management, sustainability, biodiversity, ecological footprint.',
      modules: ['Ecosystem dynamics, pollution control, e-waste handling, green energy systems.'],
      textbooks: ['Erach Bharucha, "Textbook of Environmental Studies"']
    },
    'EE204': {
      code: 'EE204',
      name: 'Simulation Lab',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Monday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Soumitra Das (Technician: Mr. Rohit Madhu Gawas)',
      shortName: 'SD / RMG',
      facultyDesignation: 'Assistant Professor (EEE)',
      facultyResearch: 'Circuit simulation and modeling',
      email: 'sdas@nitgoa.ac.in',
      room: 'Simulation Lab (Room 39)',
      category: 'lab',
      notes: 'Simulation of electrical networks, theorems, transient response, filters, and resonance using MATLAB/Simulink and PSPICE.',
      modules: [
        'Experiment 1: Verification of network theorems in DC and AC circuits using Simulink.',
        'Experiment 2: Transient response analysis of RLC series and parallel circuits.',
        'Experiment 3: Frequency response of passive low-pass and high-pass filters.',
        'Experiment 4: Simulation of single-phase transformer under loaded conditions.',
        'Experiment 5: Simulation of DC machine speed control strategies.'
      ],
      textbooks: ['Simulation Lab Manual, Department of EEE, NIT Goa']
    },
    'EE205': {
      code: 'EE205',
      name: 'Measurement Lab',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Tuesday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Amol D Rahulkar / Dr. Shanta Hardas Patil (Technician: Mr. Pinaki Chatterjee)',
      shortName: 'ADR / SHP',
      facultyDesignation: 'Faculty (Department of EEE)',
      facultyResearch: 'Instrumentation and Electrical Measurements',
      email: 'amol.rahulkar@nitgoa.ac.in',
      room: 'Measurement Lab (Room 16 Abdul Kalam Complex)',
      category: 'lab',
      notes: 'Calibration of energy meters, bridge circuits (Wheatstone, Kelvin, Maxwell, Schering), potentiometer, LVDT, and sensor measurements.',
      modules: [
        'Experiment 1: Calibration of single-phase induction type energy meter.',
        'Experiment 2: Measurement of medium resistance using Wheatstone bridge and low resistance by Kelvin double bridge.',
        'Experiment 3: Measurement of self-inductance by Maxwell bridge and capacitance by Schering bridge.',
        'Experiment 4: Calibration of voltmeter and ammeter using DC potentiometer.',
        'Experiment 5: Displacement measurement characteristics using Linear Variable Differential Transformer (LVDT).'
      ],
      textbooks: ['A. K. Sawhney, "A Course in Electrical and Electronic Measurements and Instrumentation", Dhanpat Rai']
    },
    'EE206': {
      code: 'EE206',
      name: 'Tinkering Lab - I',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Thursday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Ankeshwarapu Sunil (Technician: Mr. Rohit Madhu Gawas)',
      shortName: 'AWS / RMG',
      facultyDesignation: 'Assistant Professor (EEE)',
      facultyResearch: 'IoT, Microcontroller Prototyping, Embedded Systems',
      email: 'sunil@nitgoa.ac.in',
      room: 'Tinkering Lab (Room 04 Abdul Kalam Complex)',
      category: 'lab',
      notes: 'Hardware prototyping with Arduino, sensors, motor drivers, PCB layout design, soldering, and embedded circuit troubleshooting.',
      modules: [
        'Experiment 1: Microcontroller interfacing: GPIO programming, LED chasers, and push-button debouncing.',
        'Experiment 2: Analog-to-digital conversion: Interfacing thermistor, LDR, and LM35 temperature sensors.',
        'Experiment 3: PWM motor speed control using H-bridge driver and DC motors.',
        'Experiment 4: PCB schematic capture, routing, and single-sided PCB fabrication.',
        'Experiment 5: Capstone hardware prototype assembly and embedded firmware deployment.'
      ],
      textbooks: ['Tinkering & Prototyping Manual, Department of EEE, NIT Goa']
    }
  },
  schedule: buildInstituteMasterSchedule({
    prefix: 'eee3',
    room: 'Room 48',
    slotA: 'EE202',
    slotB: 'EE201',
    slotC: 'EE200',
    slotD: 'MA203',
    slotE: 'EE203',
    mlcFriday: 'ES300',
    labMon: { code: 'EE204', name: 'Simulation Lab (SD)', room: 'Room 39' },
    labTue: { code: 'EE205', name: 'Measurement Lab (ADR/SHP)', room: 'Room 16 Abdul Kalam Complex' },
    labThu: { code: 'EE206', name: 'Tinkering Lab - I (AWS)', room: 'Room 04 Abdul Kalam Complex' },
    notesMonLab: 'Dr. Soumitra Das (SD) | Tech: Mr. Rohit Madhu Gawas - Room 39',
    notesTueLab: 'Dr. Amol D Rahulkar / Dr. Shanta Hardas Patil | Tech: Mr. Pinaki Chatterjee - Room 16',
    notesThuLab: 'Dr. Ankeshwarapu Sunil (AWS) | Tech: Mr. Rohit Madhu Gawas - Room 04',
    customSaturdayFocus: 'Electrical Circuit Analysis & Machines Numerical Practice',
  })
};

// ==========================================
// 3rd Semester (2nd Year Odd) - Mechanical (Room 54)
// Faculty Advisor: Dr. B Santhi (santhi@nitgoa.ac.in)
// ==========================================
export const ME_3: SemesterData = {
  courses: {
    'MA200': {
      code: 'MA200',
      name: 'Advanced Differential Equations and Complex Analysis',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr Najiya V K',
      shortName: 'NVK',
      facultyDesignation: 'Assistant Professor (Mathematics)',
      facultyResearch: 'Differential Equations, Complex Analysis, Vedic Math',
      email: 'najiyavk@nitgoa.ac.in',
      room: 'Room 54',
      category: 'core',
      notes: 'Teaching Slot A. Boundary value problems, PDEs, complex analytic functions, contour integrals, and residue theorem.',
      modules: [
        'Module 1: PDEs in Engineering - Wave, Heat, and Laplace equations solutions using separation of variables.',
        'Module 2: Complex Analytic Functions - Cauchy-Riemann equations, harmonic functions, Milne-Thomson method.',
        'Module 3: Complex Series - Laurent series, singular points, poles and essential singularities.',
        'Module 4: Residue Calculus - Cauchy residue theorem, evaluation of contour integrals and definite integrals.'
      ],
      textbooks: ['Erwin Kreyszig, "Advanced Engineering Mathematics", Wiley']
    },
    'ME200': {
      code: 'ME200',
      name: 'Mechanics of Solids',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Darrius Diogo Barreto',
      shortName: 'DDB',
      facultyDesignation: 'Faculty (Mechanical Engineering)',
      facultyResearch: 'Solid Mechanics, Structural Dynamics, FEA',
      email: 'darrius@nitgoa.ac.in',
      room: 'Room 54',
      category: 'core',
      notes: 'Teaching Slot B. Stress-strain relationships, SFD/BMD, flexural and shear stresses in beams, torsion of shafts, columns and struts.',
      modules: [
        'Module 1: Stress and Strain - Normal and shear stresses, generalized Hooke law, thermal stresses, strain rosette.',
        'Module 2: Beams & Flexure - SFD and BMD for statically determinate beams, pure bending theory, shear stress distribution.',
        'Module 3: Torsion & Combined Loading - Torsion of solid and hollow shafts, power transmission, combined bending and torsion.',
        'Module 4: Deflection & Columns - Deflection by double integration and moment-area methods, Euler buckling theory for columns.'
      ],
      textbooks: ['S. Timoshenko, "Strength of Materials", CBS Publishers']
    },
    'ME201': {
      code: 'ME201',
      name: 'Materials & Metallurgical Engg',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. B Santhi',
      shortName: 'BS',
      facultyDesignation: 'Assistant Professor & Faculty Advisor (Mechanical)',
      facultyResearch: 'Materials Characterization, Metallurgy, Composites',
      email: 'santhi@nitgoa.ac.in',
      room: 'Room 54',
      category: 'core',
      notes: 'Teaching Slot C. Crystal structures, crystal defects, phase diagrams, Fe-C equilibrium diagram, heat treatment of steels, alloy steels.',
      modules: [
        'Module 1: Crystal Structures & Imperfections - Unit cells, Miller indices, point, line, and surface defects, grain boundaries, dislocation theory.',
        'Module 2: Phase Diagrams - Gibbs phase rule, binary isomorphous and eutectic systems, Lever rule, Iron-Iron Carbide (Fe-Fe3C) phase diagram.',
        'Module 3: Heat Treatment - TTT and CCT diagrams, annealing, normalizing, hardening, tempering, austempering, case hardening methods.',
        'Module 4: Engineering Alloys - Plain carbon steels, alloy steels, tool steels, cast irons, non-ferrous alloys (Al, Cu, Ti based), smart alloys.'
      ],
      textbooks: ['William D. Callister, "Materials Science and Engineering: An Introduction", Wiley']
    },
    'ME202': {
      code: 'ME202',
      name: 'Fluid Mechanics',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Siba Prasad Choudhury',
      shortName: 'SPC',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Fluid Dynamics, Aerodynamics, Thermal Systems',
      email: 'spchoudhury@nitgoa.ac.in',
      room: 'Room 54',
      category: 'core',
      notes: 'Teaching Slot D. Fluid properties, manometry, hydrostatic forces, Bernoulli theorem, viscous pipe flows, Navier-Stokes equations, boundary layer theory.',
      modules: [
        'Module 1: Fluid Statics - Pressure distribution, Pascal law, manometry, hydrostatic force on plane and curved surfaces, buoyant stability.',
        'Module 2: Fluid Kinematics & Conservation - Streamlines, velocity potential and stream function, continuity equation, Navier-Stokes equations in differential form.',
        'Module 3: Bernoulli Equation & Pipe Flow - Energy equation, Venturi, Orifice, Pitot tube, laminar flow between parallel plates, Darcy-Weisbach equation.',
        'Module 4: Boundary Layer Theory - Laminar and turbulent boundary layers, displacement and momentum thickness, drag and lift on immersed bodies.'
      ],
      textbooks: ['Frank M. White, "Fluid Mechanics", McGraw-Hill', 'Fox and McDonald, "Introduction to Fluid Mechanics", Wiley']
    },
    'ME203': {
      code: 'ME203',
      name: 'Mechanics of Machinery',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Chaitanya Vundru',
      shortName: 'CV',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Kinematics, Mechanism Synthesis, Robotics',
      email: 'chaitanya.vundru@nitgoa.ac.in',
      room: 'Room 54',
      category: 'core',
      notes: 'Teaching Slot E. Kinematic pairs, inversions of 4-bar and slider crank mechanisms, velocity and acceleration analysis, cams, gear trains.',
      modules: [
        'Module 1: Mechanisms & Inversions - Kinematic pairs, degrees of freedom, Kutzbach and Grubler criteria, inversions of four-bar chain and slider-crank mechanism.',
        'Module 2: Kinematic Analysis of Linkages - Instantaneous center of rotation, Aronhold-Kennedy theorem, relative velocity and acceleration diagrams, Coriolis component.',
        'Module 3: Cams & Followers - Types of cams and followers, displacement, velocity and acceleration diagrams for uniform, SHM, and cycloidal motion, cam profile synthesis.',
        'Module 4: Gears & Gear Trains - Law of gearing, involute and cycloidal profiles, interference and undercutting, epicyclic and planetary gear trains.'
      ],
      textbooks: ['S. S. Rattan, "Theory of Machines", McGraw-Hill', 'John J. Uicker, Gordon R. Pennock, Joseph E. Shigley, "Theory of Machines and Mechanisms", Oxford']
    },
    'ME204': {
      code: 'ME204',
      name: 'Basic Thermodynamics',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'F',
      examSlot: 'F',
      coordinator: 'Dr. Srikumar Warrier',
      shortName: 'SW',
      facultyDesignation: 'Faculty (Department of Mechanical Engineering)',
      facultyResearch: 'Thermodynamics, Energy Conversion Systems, Power Cycles',
      email: 'srikumar@nitgoa.ac.in',
      room: 'Room 54',
      category: 'core',
      notes: 'Teaching Slot F. Zeroth, First, and Second laws of thermodynamics, entropy, availability, thermodynamic property relations, ideal gas mixtures.',
      modules: [
        'Module 1: First Law Analysis - Thermodynamic systems, state, path, work and heat interactions, First Law for closed systems and steady flow control volumes.',
        'Module 2: Second Law & Entropy - Heat engines, refrigerators, Kelvin-Planck and Clausius statements, Carnot cycle, Clausius inequality, entropy principle.',
        'Module 3: Exergy & Property Relations - Availability and irreversibility, Maxwell relations, T-ds equations, Joule-Thomson coefficient, Clapeyron equation.',
        'Module 4: Pure Substances & Gas Mixtures - Phase change processes on P-v-T surfaces, steam tables, Mollier chart, ideal gas equation of state, Dalton law.'
      ],
      textbooks: ['Yunus A. Cengel, Michael A. Boles, "Thermodynamics: An Engineering Approach", McGraw-Hill', 'P. K. Nag, "Engineering Thermodynamics", McGraw-Hill']
    },
    'ME205': {
      code: 'ME205',
      name: 'Machine Drawing & Computer Graphics',
      type: 'Practical',
      credits: 3,
      ltp: '1-0-3',
      teachingSlot: 'Monday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Sanjeev Singh / Dr. Chaitanya Vundru',
      shortName: 'DSS / CV',
      facultyDesignation: 'Faculty (Mechanical Engineering)',
      facultyResearch: 'Computer Aided Drafting and CAD/CAM',
      email: 'sanjeev@nitgoa.ac.in',
      room: 'Drawing Hall / CAD Lab (Room 33/38)',
      category: 'lab',
      notes: 'Assembly and detail drawings of machine parts: stuffing box, screw jack, plummer block, connecting rod, and 3D modeling in CAD software.',
      modules: [
        'Experiment 1: Thread profiles, bolted joints, keys, cotter and knuckle joints.',
        'Experiment 2: Assembly drawing of Screw Jack with bill of materials.',
        'Experiment 3: Assembly drawing of Plummer block bearing assembly.',
        'Experiment 4: Detail drawings of IC engine connecting rod and piston.',
        'Experiment 5: 3D solid modeling and 2D drafting extraction in CAD software.'
      ],
      textbooks: ['K. L. Narayana, P. Kannaiah, "Machine Drawing", New Age International']
    },
    'ME206': {
      code: 'ME206',
      name: 'Design Lab-1',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Tuesday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Darrius Diogo Barreto',
      shortName: 'DDB',
      facultyDesignation: 'Faculty (Mechanical Engineering)',
      facultyResearch: 'Mechanical Design and FEA Analysis',
      email: 'darrius@nitgoa.ac.in',
      room: 'Design Lab (Room 12 CV Raman Complex)',
      category: 'lab',
      notes: 'Mechanical design computations, stress analysis, failure criteria, mechanism simulation, and FEA stress analysis of structural members.',
      modules: [
        'Experiment 1: Verification of static failure theories (Rankine, Tresca, Von Mises) under combined stresses.',
        'Experiment 2: Kinematic velocity and acceleration simulation of planar mechanisms.',
        'Experiment 3: Cam profile design and dynamic follower displacement verification.',
        'Experiment 4: Finite element stress distribution in notched tensile bars using ANSYS.',
        'Experiment 5: Deflection and modal frequency testing of cantilever beam.'
      ],
      textbooks: ['Design Lab Manual, Department of Mechanical Engineering, NIT Goa']
    }
  },
  schedule: buildInstituteMasterSchedule({
    prefix: 'me3',
    room: 'Room 54',
    slotA: 'MA200',
    slotB: 'ME200',
    slotC: 'ME201',
    slotD: 'ME202',
    slotE: 'ME203',
    slotF: 'ME204',
    labMon: { code: 'ME205', name: 'Machine Drawing & Computer Graphics (DSS/CV)', room: 'Room 33/38' },
    labTue: { code: 'ME206', name: 'Design Lab-1 (DDB)', room: 'Room 12 CV Raman' },
    notesMonLab: 'Dr. Sanjeev Singh / Dr. Chaitanya Vundru - Drawing Hall 33/38',
    notesTueLab: 'Dr. Darrius Diogo Barreto (DDB) - Room 12 CV Raman',
    customSaturdayFocus: 'Thermodynamics & Mechanics of Solids Problem Solving',
  })
};
