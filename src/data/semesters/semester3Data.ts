import { Course, TimeSlot, DayOfWeek } from '../timetableData';
import { buildInstituteMasterSchedule } from './scheduleBuilder';

export interface SemesterData {
  courses: Record<string, Course>;
  schedule: Record<DayOfWeek, TimeSlot[]>;
}

// ==========================================
// ==========================================
// 3rd Semester (2nd Year Odd) - CSE (Room 74/75)
// Faculty Advisor: Dr. Keshavamurthy B N (bnkeshav.fcse@nitgoa.ac.in)
// ==========================================
export const CSE_3: SemesterData = {
  courses: {
    'CS200': {
      code: 'CS200',
      name: 'Data Structures',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Ms. Helga Lobo',
      shortName: 'HL',
      facultyDesignation: 'Faculty (CSE)',
      facultyResearch: 'Data Structures, Algorithms, Graph Theory',
      email: 'helga@nitgoa.ac.in',
      room: 'Room 74/75',
      category: 'core',
      notes: 'Teaching Slot A (Mon 09:00, Tue 11:00, Thu 10:00, Wed 16:00 Tut). Stacks, queues, linked lists, trees, binary search trees, AVL, heaps, graph traversals, and hashing.',
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
    'CS201': {
      code: 'CS201',
      name: 'Digital System Design',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Lokesh Kumar Bramhane',
      shortName: 'LB',
      facultyDesignation: 'Assistant Professor (ECE/CSE)',
      facultyResearch: 'Digital Architectures, VLSI, Hardware Security',
      email: 'lokesh.bramhane@nitgoa.ac.in',
      room: 'Room 74/75',
      category: 'core',
      notes: 'Teaching Slot C (Mon 11:00, Wed 10:00, Fri 09:00). Boolean algebra, K-maps, multiplexers, decoders, flip-flops, registers, counters, FSM, and Verilog HDL basics.',
      modules: [
        'Module 1: Boolean Algebra & Logic Simplification - Number systems, binary codes, Boolean theorems, canonical forms, K-map minimization (up to 5 variables), Quine-McCluskey method.',
        'Module 2: Combinational Logic Circuits - Half/full adders, ripple carry adders, carry lookahead adders, magnitude comparators, decoders, encoders, multiplexers, demultiplexers.',
        'Module 3: Sequential Logic & State Machines - Latches, flip-flops (SR, JK, D, T), master-slave flip-flops, state equations, state reduction and assignment, Mealy and Moore models.',
        'Module 4: Registers, Counters & Programmable Logic - Shift registers, universal shift registers, synchronous/asynchronous binary counters, ring/Johnson counters, ROM, PLA, PAL, FPGA basics.'
      ],
      textbooks: [
        'M. Morris Mano, Michael D. Ciletti, "Digital Design", 6th Edition, Pearson',
        'John F. Wakerly, "Digital Design: Principles and Practices", 4th Edition, Pearson'
      ]
    },
    'CS202': {
      code: 'CS202',
      name: 'Discrete Mathematics',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'F',
      examSlot: 'F',
      coordinator: 'Mrs. Sreedivya',
      shortName: 'SD',
      facultyDesignation: 'Assistant Professor (CSE)',
      facultyResearch: 'Discrete Mathematics, Graph Theory, Formal Methods',
      email: 'sreedivya@nitgoa.ac.in',
      room: 'Room 74/75',
      category: 'core',
      notes: 'Teaching Slot F (Tue 10:00, Wed 15:00, Thu 09:00, Fri 12:00). Mathematical logic, predicates, sets, relations, lattices, algebraic structures, recurrence relations, and graph coloring.',
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
    'CS203': {
      code: 'CS203',
      name: 'Object Oriented Programming',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Mini S',
      shortName: 'MS',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'OOP Paradigms, Wireless Networks, Distributed Systems',
      email: 'mini@nitgoa.ac.in',
      room: 'Room 74/75',
      category: 'core',
      notes: 'Teaching Slot B (Mon 10:00, Wed 09:00, Thu 11:00, Fri 11:00). OOP principles, classes, objects, inheritance, polymorphism, templates, exception handling, and STL.',
      modules: [
        'Module 1: Principles of Object-Oriented Programming - Encapsulation, abstraction, data hiding, classes and objects, constructors, destructors, copy constructors, dynamic memory allocation.',
        'Module 2: Inheritance & Polymorphism - Single, multiple, multilevel, hierarchical inheritance, virtual base classes, function and operator overloading, runtime polymorphism via virtual functions.',
        'Module 3: Templates, Exceptions & STL - Function and class templates, standard template library (vectors, lists, maps, iterators, algorithms), try-catch-throw mechanisms, exception hierarchies.',
        'Module 4: Design Patterns & Systems Design - SOLID design principles, Creational patterns (Factory, Singleton), Structural patterns (Adapter, Decorator), Behavioral patterns (Observer, Strategy).'
      ],
      textbooks: [
        'Bjarne Stroustrup, "The C++ Programming Language", 4th Edition, Addison-Wesley',
        'Herbert Schildt, "Java: The Complete Reference", 12th Edition, McGraw-Hill'
      ]
    },
    'MA201': {
      code: 'MA201',
      name: 'Probability, Statistics and Queuing Theory',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. L. Shangerganesh',
      shortName: 'LSG',
      facultyDesignation: 'Associate Professor (Mathematics)',
      facultyResearch: 'Probability, Differential Equations, Stochastic Modeling',
      email: 'shangerganesh@nitgoa.ac.in',
      room: 'Room 74/75',
      category: 'core',
      notes: 'Teaching Slot D (Mon 12:00, Wed 11:00, Fri 10:00). Probability distributions, random processes, queuing models (M/M/1, M/M/c), Markov chains.',
      modules: [
        'Module 1: Probability & Random Variables - Axioms, conditional probability, Bayes theorem, Discrete & continuous random variables, PMF, PDF, CDF, Expectation and variance.',
        'Module 2: Standard Distributions - Binomial, Poisson, Geometric, Exponential, Normal, Uniform distributions, Central Limit Theorem.',
        'Module 3: Stochastic Processes & Markov Chains - Classification, discrete-time Markov chains, transition probability matrix, Chapman-Kolmogorov equations, stationary distribution.',
        'Module 4: Queuing Theory - Characteristics of queuing models, Kendall notation, birth-death process, M/M/1, M/M/c models with finite and infinite capacities, Little law.'
      ],
      textbooks: [
        'Sheldon M. Ross, "Introduction to Probability and Statistics for Engineers and Scientists", Academic Press',
        'K. S. Trivedi, "Probability and Statistics with Reliability, Queuing, and Computer Science Applications", Wiley'
      ]
    },
    'CS204': {
      code: 'CS204',
      name: 'Data Structures Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Mon/Thu 14:00 - 16:55 (Room 22)',
      examSlot: 'Practical',
      coordinator: 'Ms. Helga Lobo',
      shortName: 'HL',
      facultyDesignation: 'Faculty (CSE)',
      facultyResearch: 'Data Structures, Benchmarking',
      email: 'helga@nitgoa.ac.in',
      room: 'Room 22',
      category: 'lab',
      notes: 'Mon 14:00-16:55 (Batch 1) / Thu 14:00-16:55 (Batch 2). Implementations of linked lists, stacks, queues, binary search trees, heaps, graphs, sorting and searching algorithms.',
      modules: [
        'Experiment 1: Array and linked list implementations: Singly, doubly, and circular linked lists.',
        'Experiment 2: Stack applications: Infix to postfix expression conversion and evaluation.',
        'Experiment 3: Binary Search Tree (BST) construction, recursive traversals, and deletion.',
        'Experiment 4: Priority queue using min/max binary heap and Heapsort algorithm.',
        'Experiment 5: Graph traversal implementations: BFS, DFS, and Dijkstra shortest path.'
      ],
      textbooks: ['Data Structures Laboratory Manual, Department of CSE, NIT Goa']
    },
    'CS205': {
      code: 'CS205',
      name: 'Digital Systems Design Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Mon/Thu 14:00 - 16:55 (ECE Dept)',
      examSlot: 'Practical',
      coordinator: 'Dr. Lokesh Kumar Bramhane',
      shortName: 'LB',
      facultyDesignation: 'Assistant Professor (ECE/CSE)',
      facultyResearch: 'Digital Circuits, Hardware Verification',
      email: 'lokesh.bramhane@nitgoa.ac.in',
      room: 'ECE Department',
      category: 'lab',
      notes: 'Mon 14:00-16:55 (Batch 2) / Thu 14:00-16:55 (Batch 1). Logic gates verification, combinational circuits (adders, multiplexers, decoders), flip-flops, shift registers, and counter designs.',
      modules: [
        'Experiment 1: Verification of truth tables of basic, universal, and XOR logic gates.',
        'Experiment 2: Design and realization of half and full adder/subtractor circuits.',
        'Experiment 3: Realization of 4:1 multiplexer and 1:4 demultiplexer circuits.',
        'Experiment 4: Design of synchronous and asynchronous 4-bit binary up/down counters.',
        'Experiment 5: HDL simulation and FPGA synthesis of combinational and sequential modules.'
      ],
      textbooks: ['Digital Systems Design Laboratory Manual, NIT Goa']
    },
    'CS206': {
      code: 'CS206',
      name: 'Object Oriented Programming Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Tuesday 14:00 - 16:55 (Room 30 / Room 22)',
      examSlot: 'Practical',
      coordinator: 'Dr. Mini S / Mr. Sarvesh Sawant',
      shortName: 'MS/SS',
      facultyDesignation: 'Faculty (CSE)',
      facultyResearch: 'OOP Implementations & Software Design',
      email: 'mini@nitgoa.ac.in',
      room: 'Room 30 / Room 22',
      category: 'lab',
      notes: 'Tue 14:00-16:55. Batch 1: Dr. Mini S (Room 30) | Batch 2: Mr. Sarvesh Sawant (Room 22).',
      modules: [
        'Experiment 1: Class, object creation, constructor overloading, and memory allocation.',
        'Experiment 2: Operator overloading (unary and binary) and friend functions.',
        'Experiment 3: Multiple and multilevel inheritance with virtual base classes.',
        'Experiment 4: Generic templates and Standard Template Library (vector, map, list).',
        'Experiment 5: File I/O streams and user-defined exception handling.'
      ],
      textbooks: ['OOP Laboratory Manual, Department of CSE, NIT Goa']
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
      facultyResearch: 'Environmental Science, Green Chemistry',
      email: 'velavan@nitgoa.ac.in',
      room: 'Room 74/75',
      category: 'mlc',
      notes: 'Friday 16:00 - 16:55 (Room 74/75). Ecosystem dynamics, biodiversity, pollution control, e-waste handling, green energy systems.',
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
    }
  },
  schedule: {
    Monday: [
      { id: 'cse3-m1', day: 'Monday', startTime: '09:00', endTime: '09:55', slotName: 'Slot A', courseCode: 'CS200', room: 'Room 74/75', notes: 'Ms. Helga Lobo (HL)' },
      { id: 'cse3-m2', day: 'Monday', startTime: '10:00', endTime: '10:55', slotName: 'Slot B', courseCode: 'CS203', room: 'Room 74/75', notes: 'Dr. Mini S (MS)' },
      { id: 'cse3-m3', day: 'Monday', startTime: '11:00', endTime: '11:55', slotName: 'Slot C', courseCode: 'CS201', room: 'Room 74/75', notes: 'Dr. Lokesh Kumar Bramhane (LB)' },
      { id: 'cse3-m4', day: 'Monday', startTime: '12:00', endTime: '12:55', slotName: 'Slot D', courseCode: 'MA201', room: 'Room 74/75', notes: 'Dr. L. Shangerganesh (LSG)' },
      { id: 'cse3-ml', day: 'Monday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      {
        id: 'cse3-m5',
        day: 'Monday',
        startTime: '14:00',
        endTime: '16:55',
        slotName: 'LAB Session (3 Hrs)',
        courseCode: 'CS204',
        room: 'Room 22 / ECE Dept',
        isLab: true,
        labOptions: {
          batch1: { code: 'CS204', name: 'Data Structures Lab (B1)', faculty: 'Ms. Helga Lobo (HL)', room: 'Room 22' },
          batch2: { code: 'CS205', name: 'Digital Systems Design Lab (B2)', faculty: 'Dr. Lokesh Kumar Bramhane (LB)', room: 'ECE Department' }
        },
        notes: 'Batch 1: CS204 DS Lab (HL - Rm 22) | Batch 2: CS205 DSD Lab (LB - ECE Dept)'
      }
    ],
    Tuesday: [
      { id: 'cse3-t1', day: 'Tuesday', startTime: '09:00', endTime: '09:55', slotName: 'Self Study / Library', courseCode: 'FREE', room: 'Library', isFree: true },
      { id: 'cse3-t2', day: 'Tuesday', startTime: '10:00', endTime: '10:55', slotName: 'Slot F', courseCode: 'CS202', room: 'Room 74/75', notes: 'Mrs. Sreedivya (SD)' },
      { id: 'cse3-t3', day: 'Tuesday', startTime: '11:00', endTime: '11:55', slotName: 'Slot A', courseCode: 'CS200', room: 'Room 74/75', notes: 'Ms. Helga Lobo (HL)' },
      { id: 'cse3-t4', day: 'Tuesday', startTime: '12:00', endTime: '12:55', slotName: 'Minor / Open Hour', courseCode: 'FREE', room: 'Room 74/75', isFree: true },
      { id: 'cse3-tl', day: 'Tuesday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      {
        id: 'cse3-t5',
        day: 'Tuesday',
        startTime: '14:00',
        endTime: '16:55',
        slotName: 'LAB Session (3 Hrs)',
        courseCode: 'CS206',
        room: 'Room 30 / Room 22',
        isLab: true,
        labOptions: {
          batch1: { code: 'CS206', name: 'OOP Lab (B1)', faculty: 'Dr. Mini S (MS)', room: 'Room 30' },
          batch2: { code: 'CS206', name: 'OOP Lab (B2)', faculty: 'Mr. Sarvesh Sawant (SS)', room: 'Room 22' }
        },
        notes: 'Batch 1: CS206 OOP Lab (MS - Rm 30) | Batch 2: CS206 OOP Lab (SS - Rm 22)'
      }
    ],
    Wednesday: [
      { id: 'cse3-w1', day: 'Wednesday', startTime: '09:00', endTime: '09:55', slotName: 'Slot B', courseCode: 'CS203', room: 'Room 74/75', notes: 'Dr. Mini S (MS)' },
      { id: 'cse3-w2', day: 'Wednesday', startTime: '10:00', endTime: '10:55', slotName: 'Slot C', courseCode: 'CS201', room: 'Room 74/75', notes: 'Dr. Lokesh Kumar Bramhane (LB)' },
      { id: 'cse3-w3', day: 'Wednesday', startTime: '11:00', endTime: '11:55', slotName: 'Slot D', courseCode: 'MA201', room: 'Room 74/75', notes: 'Dr. L. Shangerganesh (LSG)' },
      { id: 'cse3-w4', day: 'Wednesday', startTime: '12:00', endTime: '12:55', slotName: 'Open / Free Hour', courseCode: 'FREE', room: 'Room 74/75', isFree: true },
      { id: 'cse3-wl', day: 'Wednesday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      { id: 'cse3-w5', day: 'Wednesday', startTime: '14:00', endTime: '14:55', slotName: 'Minor / Free', courseCode: 'FREE', room: 'Campus', isFree: true },
      { id: 'cse3-w6', day: 'Wednesday', startTime: '15:00', endTime: '15:55', slotName: 'Slot F (Extra)', courseCode: 'CS202', room: 'Room 74/75', notes: 'Mrs. Sreedivya (SD)' },
      { id: 'cse3-w7', day: 'Wednesday', startTime: '16:00', endTime: '16:55', slotName: 'Tutorial Slot', courseCode: 'CS200', room: 'Room 74/75', notes: 'Data Structures Tutorial - Ms. Helga Lobo (HL)' }
    ],
    Thursday: [
      { id: 'cse3-th1', day: 'Thursday', startTime: '09:00', endTime: '09:55', slotName: 'Slot F', courseCode: 'CS202', room: 'Room 74/75', notes: 'Mrs. Sreedivya (SD)' },
      { id: 'cse3-th2', day: 'Thursday', startTime: '10:00', endTime: '10:55', slotName: 'Slot A', courseCode: 'CS200', room: 'Room 74/75', notes: 'Ms. Helga Lobo (HL)' },
      { id: 'cse3-th3', day: 'Thursday', startTime: '11:00', endTime: '11:55', slotName: 'Slot B', courseCode: 'CS203', room: 'Room 74/75', notes: 'Dr. Mini S (MS)' },
      { id: 'cse3-th4', day: 'Thursday', startTime: '12:00', endTime: '12:55', slotName: 'Open Elective / Free', courseCode: 'FREE', room: 'Room 74/75', isFree: true },
      { id: 'cse3-thl', day: 'Thursday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      {
        id: 'cse3-th5',
        day: 'Thursday',
        startTime: '14:00',
        endTime: '16:55',
        slotName: 'LAB Session (3 Hrs)',
        courseCode: 'CS205',
        room: 'ECE Dept / Room 22',
        isLab: true,
        labOptions: {
          batch1: { code: 'CS205', name: 'Digital Systems Design Lab (B1)', faculty: 'Dr. Lokesh Kumar Bramhane (LB)', room: 'ECE Department' },
          batch2: { code: 'CS204', name: 'Data Structures Lab (B2)', faculty: 'Ms. Helga Lobo (HL)', room: 'Room 22' }
        },
        notes: 'Batch 1: CS205 DSD Lab (LB - ECE Dept) | Batch 2: CS204 DS Lab (HL - Rm 22)'
      }
    ],
    Friday: [
      { id: 'cse3-f1', day: 'Friday', startTime: '09:00', endTime: '09:55', slotName: 'Slot C', courseCode: 'CS201', room: 'Room 74/75', notes: 'Dr. Lokesh Kumar Bramhane (LB)' },
      { id: 'cse3-f2', day: 'Friday', startTime: '10:00', endTime: '10:55', slotName: 'Slot D', courseCode: 'MA201', room: 'Room 74/75', notes: 'Dr. L. Shangerganesh (LSG)' },
      { id: 'cse3-f3', day: 'Friday', startTime: '11:00', endTime: '11:55', slotName: 'Slot E', courseCode: 'CS203', room: 'Room 74/75', notes: 'Dr. Mini S (MS)' },
      { id: 'cse3-f4', day: 'Friday', startTime: '12:00', endTime: '12:55', slotName: 'Slot F', courseCode: 'CS202', room: 'Room 74/75', notes: 'Mrs. Sreedivya (SD)' },
      { id: 'cse3-fl', day: 'Friday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      { id: 'cse3-f5', day: 'Friday', startTime: '14:00', endTime: '14:55', slotName: 'Minor / Free', courseCode: 'FREE', room: 'Campus', isFree: true },
      { id: 'cse3-f6', day: 'Friday', startTime: '15:00', endTime: '15:55', slotName: 'Open Slot / Library', courseCode: 'FREE', room: 'Library', isFree: true },
      { id: 'cse3-f7', day: 'Friday', startTime: '16:00', endTime: '16:55', slotName: 'MLC Slot (1 Credit)', courseCode: 'ES300', room: 'Room 74/75', notes: 'Environmental Studies - Dr. Velavan Kathirvelu (VK)' }
    ],
    Saturday: [
      { id: 'cse3-s1', day: 'Saturday', startTime: '09:00', endTime: '10:30', slotName: 'Coding Clinic', courseCode: 'CS204', room: 'Room 22', notes: 'Data Structures & Algorithms Implementation Practice' },
      { id: 'cse3-s2', day: 'Saturday', startTime: '10:45', endTime: '12:00', slotName: 'Digital System Lab Clinic', courseCode: 'CS205', room: 'ECE Dept', notes: 'Hardware Logic Design & Verilog Debugging' },
      { id: 'cse3-sl', day: 'Saturday', startTime: '12:00', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      { id: 'cse3-s3', day: 'Saturday', startTime: '14:00', endTime: '16:00', slotName: 'Self-Study & Revision', courseCode: 'FREE', room: 'Central Library', isFree: true }
    ],
    Sunday: [
      { id: 'cse3-su1', day: 'Sunday', startTime: '09:00', endTime: '17:00', slotName: 'Weekend Rest & Sports', courseCode: 'FREE', room: 'Campus', isFree: true }
    ]
  }
};

// ==========================================
// 3rd Semester (2nd Year Odd) - Civil (Room 58)
// Faculty Advisor: Dr. Aparup Biswal (aparup@nitgoa.ac.in)
// ==========================================
export const CVE_3: SemesterData = {
  courses: {
    'MA200': {
      code: 'MA200',
      name: 'Advanced Differential Equations and Complex Analysis',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Ravi Ragoju',
      shortName: 'RR',
      facultyDesignation: 'Assistant Professor (Mathematics)',
      facultyResearch: 'Differential Equations, Fluid Dynamics, Complex Analysis',
      email: 'raviragoju@nitgoa.ac.in',
      room: 'Room 58',
      category: 'core',
      notes: 'Teaching Slot A (Mon 09:00, Tue 11:00, Thu 10:00). PDEs, Laplace transforms, analytic functions, Cauchy-Riemann equations, contour integration.',
      modules: [
        'Module 1: Partial Differential Equations - First and second order linear PDEs, separation of variables method for wave and heat equations.',
        'Module 2: Complex Analytic Functions - Cauchy-Riemann equations, harmonic conjugates, conformal mapping, bilinear transformations.',
        'Module 3: Complex Integration - Cauchy integral theorem and formula, Taylor and Laurent series, singularities and zeroes.',
        'Module 4: Residue Calculus - Cauchy residue theorem, evaluation of real definite and improper integrals using contour integration.'
      ],
      textbooks: ['Erwin Kreyszig, "Advanced Engineering Mathematics", 10th Edition, Wiley']
    },
    'CV201': {
      code: 'CV201',
      name: 'Mechanics of Solids',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Rishi D Sahastrabuddhe',
      shortName: 'RDS',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Solid Mechanics, Structural Dynamics',
      email: 'rishi@nitgoa.ac.in',
      room: 'Room 58',
      category: 'core',
      notes: 'Teaching Slot B (Mon 10:00, Wed 09:00, Thu 11:00). Stresses, strains, SFD/BMD, bending and shear stresses, deflection of beams, torsion.',
      modules: [
        'Module 1: Stresses and Strains - Normal and shear stresses, Hooke law, Poisson ratio, thermal stresses, volumetric strain.',
        'Module 2: Shear Force & Bending Moment - SFD and BMD for cantilever, simply supported, and overhanging beams with point and distributed loads.',
        'Module 3: Bending & Shear Stresses - Theory of pure bending, neutral axis, section modulus, shear stress distribution in rectangular and I-sections.',
        'Module 4: Torsion & Columns - Torsion of circular shafts, power transmission, Euler buckling theory for columns with different end conditions.'
      ],
      textbooks: ['Devdas Menon, "Structural Analysis", Narosa', 'B. C. Punmia, "Mechanics of Materials", Laxmi Publications']
    },
    'CV200': {
      code: 'CV200',
      name: 'Fluid Mechanics',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Aparup Biswal',
      shortName: 'AB',
      facultyDesignation: 'Assistant Professor & Faculty Advisor (Civil)',
      facultyResearch: 'Fluid Mechanics, Hydraulics, Water Resources',
      email: 'aparup@nitgoa.ac.in',
      room: 'Room 58',
      category: 'core',
      notes: 'Teaching Slot C (Mon 11:00, Wed 10:00, Fri 09:00). Fluid properties, manometry, hydrostatic forces, buoyancy, kinematics, Bernoulli equation, viscous pipe flows.',
      modules: [
        'Module 1: Fluid Statics - Fluid properties, viscosity, pressure measurement using manometers, hydrostatic forces on submerged plane and curved surfaces, metacentric height.',
        'Module 2: Fluid Kinematics - Lagrangian and Eulerian descriptions, continuity equation, velocity potential, stream function, flow nets.',
        'Module 3: Fluid Dynamics - Euler and Bernoulli equations, venturimeter, orificemeter, pitot tube, momentum equation and impulse-momentum theorem.',
        'Module 4: Laminar & Turbulent Pipe Flow - Reynolds experiment, Hagen-Poiseuille flow, Darcy-Weisbach equation, Moody diagram, minor losses in pipe networks.'
      ],
      textbooks: ['K. L. Kumar, "Engineering Fluid Mechanics", S. Chand', 'A. K. Jain, "Fluid Mechanics", Khanna Publishers']
    },
    'CV203': {
      code: 'CV203',
      name: 'Building Planning and Construction Materials',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Kandalai Srikanth',
      shortName: 'KS',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Construction Technology, Building Planning, Concrete Structures',
      email: 'srikanth@nitgoa.ac.in',
      room: 'Room 58',
      category: 'core',
      notes: 'Teaching Slot D (Mon 12:00, Wed 11:00, Fri 10:00). Building planning bylaws, orientation, masonry, cement, aggregates, concrete technology, timber, and steel.',
      modules: [
        'Module 1: Principles of Building Planning - Principles of planning (aspect, prospect, privacy, circulation), National Building Code bylaws, FAR, open spaces.',
        'Module 2: Masonry & Foundations - Brick manufacturing, bonds in brickwork, stone masonry types, shallow and deep foundations overview.',
        'Module 3: Concrete Materials & Mix - Ordinary Portland Cement types and grades, coarse and fine aggregates, water-cement ratio, workability, IS mix design.',
        'Module 4: Building Components & Finishes - Lintels, arches, stairs planning, plastering, pointing, damp-proofing, thermal insulation and acoustic treatments.'
      ],
      textbooks: ['S. K. Duggal, "Building Materials", New Age', 'B. C. Punmia, "Building Construction", Laxmi Publications']
    },
    'CV204': {
      code: 'CV204',
      name: 'Engineering Geology',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. S Sethulekshmi',
      shortName: 'SS',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Geological Investigations, Geotechnical Engineering',
      email: 'sethulekshmi@nitgoa.ac.in',
      room: 'Room 58',
      category: 'core',
      notes: 'Teaching Slot E (Tue 09:00, Wed 12:00, Fri 11:00). Physical geology, mineralogy, petrology, structural geology (folds, faults), geological site investigations for dams and tunnels.',
      modules: [
        'Module 1: General & Structural Geology - Internal structure of earth, weathering of rocks, geological work of wind, rivers, groundwater, folds, faults, joints.',
        'Module 2: Mineralogy & Petrology - Physical properties of rock-forming minerals, classification and engineering properties of igneous, sedimentary, and metamorphic rocks.',
        'Module 3: Geological Site Selection - Geological investigations for dam foundations, reservoir sites, tunnel alignments, and bridge piers.',
        'Module 4: Geohazards & Mitigation - Landslides causes and preventive measures, earthquake zones of India, coastal erosion and ground improvement methods.'
      ],
      textbooks: ['N. Chenna Kesavulu, "Textbook of Engineering Geology", Macmillan', 'Parbin Singh, "Engineering and General Geology", S. K. Kataria']
    },
    'CV202': {
      code: 'CV202',
      name: 'Surveying',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'F',
      examSlot: 'F',
      coordinator: 'Dr. Sathishraj Mani',
      shortName: 'SRM',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Geomatics, Surveying, GIS',
      email: 'sathishraj@nitgoa.ac.in',
      room: 'Room 58',
      category: 'core',
      notes: 'Teaching Slot F (Tue 10:00, Thu 09:00, Fri 12:00). Chain and compass surveying, levelling, theodolite traversing, tachometry, contouring, and modern survey equipment.',
      modules: [
        'Module 1: Fundamentals & Compass Surveying - Principles of surveying, chain surveying, prismatic and surveyor compass, local attraction and corrections.',
        'Module 2: Levelling & Contouring - Dumpy level, auto level, fly levelling, profile levelling, contour characteristics and interpolation methods.',
        'Module 3: Theodolite Traversing - Vernier theodolite, measurement of horizontal and vertical angles, traverse computation, Gale traverse table.',
        'Module 4: Tachometry & Modern Instruments - Stadia tachometry, tangential method, Total Station components and fieldwork, introduction to GPS and LiDAR.'
      ],
      textbooks: ['B. C. Punmia, "Surveying Vol. I & II", Laxmi Publications', 'K. R. Arora, "Surveying Vol. I & II", Standard Publishers']
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
      facultyResearch: 'Environmental Science',
      email: 'velavan@nitgoa.ac.in',
      room: 'Room 70/71',
      category: 'mlc',
      notes: 'Friday 16:00 - 16:55 (Room 70/71). Ecosystems, pollution, environmental protection.',
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
    'CV207': {
      code: 'CV207',
      name: 'Surveying Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Monday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Sathishraj Mani / Dr. Vinamra Mishra',
      shortName: 'SRM / VM',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Surveying and Field Geomatics',
      email: 'sathishraj@nitgoa.ac.in',
      room: 'Survey Field / Lab',
      category: 'lab',
      notes: 'Monday 14:00 - 16:55. Profile levelling, contour mapping, theodolite traversing, curve setting out, and Total Station survey.',
      modules: [
        'Experiment 1-3: Levelling & Contouring - Fly levelling, check levelling, profile levelling, cross-sectioning and contour mapping of campus terrain using Dumpy & Auto Level.',
        'Experiment 4-6: Theodolite Surveying - Measurement of horizontal and vertical angles, traverse computation, missing line determination, heights and distances.',
        'Experiment 7-9: Curve Setting & Tacheometry - Setting out simple circular curves by deflection angles (Rankine method) and tangential angles; stadia tacheometric distance calculation.',
        'Experiment 10-12: Total Station & GPS - Topographic mapping, coordinate measurement, stake-out survey, EDM calibration and digital GIS data export.'
      ],
      textbooks: [
        'Surveying Laboratory Manual, Department of Civil Engineering, NIT Goa',
        'B.C. Punmia, "Surveying Vol. I & II", Laxmi Publications'
      ]
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
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Fluid Mechanics and Hydraulics Lab',
      email: 'rishi@nitgoa.ac.in',
      room: 'Fluid Mechanics Lab',
      category: 'lab',
      notes: 'Tuesday 14:00 - 16:55. Calibration of venturimeter and orificemeter, pipe friction factor, Reynolds experiment, metacentric height.',
      modules: [
        'Experiment 1-3: Pipe Flow & Friction - Determination of Darcy-Weisbach friction factor in smooth and rough pipes, minor losses due to pipe bends, valves, sudden contraction and expansion.',
        'Experiment 4-6: Flow Measurement Calibration - Calibration of Venturimeter and Orificemeter; flow rate determination over V-notch and rectangular weir.',
        'Experiment 7-9: Jet Impact & Hydrodynamics - Verification of momentum theorem by measuring impact of water jet on flat, inclined, and hemispherical vanes.',
        'Experiment 10-12: Hydrostatics & Flow Regimes - Determination of metacentric height and radius of gyration of a floating vessel; Reynolds experiment for laminar and turbulent flow transition visualization.'
      ],
      textbooks: [
        'Fluid Mechanics Laboratory Manual, Department of Civil Engineering, NIT Goa',
        'P.N. Modi and S.M. Seth, "Hydraulics and Fluid Mechanics", Standard Book House'
      ]
    },
    'CV205': {
      code: 'CV205',
      name: 'Material Testing Laboratory',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Thursday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Aparup Biswal / Dr. Bapi Mondal',
      shortName: 'AB / BM',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Structural Materials Testing',
      email: 'aparup@nitgoa.ac.in',
      room: 'Material Testing Lab',
      category: 'lab',
      notes: 'Thursday 14:00 - 16:55. Tension test on mild steel, compression test on concrete, torsion test, Izod/Charpy impact tests, hardness tests.',
      modules: [
        'Experiment 1-3: Tension & Compression Testing - Tensile testing of mild steel and HYSD bars on Universal Testing Machine (UTM), stress-strain curve, yield point, percentage elongation; compressive strength of concrete cubes and bricks.',
        'Experiment 4-6: Hardness & Impact Testing - Brinell and Rockwell hardness tests on ferrous and non-ferrous specimens; Charpy and Izod impact toughness tests at room temperature.',
        'Experiment 7-9: Torsion & Shear Testing - Torsion test on mild steel circular specimens, torque-twist relation, determination of shear modulus (modulus of rigidity); single and double shear tests on steel pins.',
        'Experiment 10-12: Bending & Spring Stiffness - Flexural bending test on timber and steel beams, deflection verification, modulus of elasticity calculation; stiffness determination of open and closed coiled helical springs.'
      ],
      textbooks: [
        'Material Testing Laboratory Manual, Department of Civil Engineering, NIT Goa',
        'S. Ramamrutham, "Strength of Materials", Dhanpat Rai Publishing'
      ]
    }
  },
  schedule: buildInstituteMasterSchedule({
    prefix: 'cve3',
    room: 'Room 58',
    slotA: 'MA200',
    slotB: 'CV201',
    slotC: 'CV200',
    slotD: 'CV203',
    slotE: 'CV204',
    slotF: 'CV202',
    mlcFriday: 'ES300',
    labMon: {
      code: 'CV205',
      name: 'MT Lab (AB/BM) B1 / FM Lab (RDS) B2',
      room: 'Material Testing Lab / Fluid Mechanics Lab',
      labOptions: {
        batch1: { code: 'CV205', name: 'Material Testing Lab (B1)', faculty: 'Dr. Aparup Biswal / Dr. Bapi Mondal (AB/BM)', room: 'Material Testing Lab' },
        batch2: { code: 'CV206', name: 'Fluid Mechanics Lab (B2)', faculty: 'Dr. Rishi D Sahastrabuddhe (RDS)', room: 'Fluid Mechanics Lab' }
      }
    },
    labTue: {
      code: 'CV206',
      name: 'FM Lab (RDS) B1 / MT Lab (AB/BM) B2',
      room: 'Fluid Mechanics Lab / Material Testing Lab',
      labOptions: {
        batch1: { code: 'CV206', name: 'Fluid Mechanics Lab (B1)', faculty: 'Dr. Rishi D Sahastrabuddhe (RDS)', room: 'Fluid Mechanics Lab' },
        batch2: { code: 'CV205', name: 'Material Testing Lab (B2)', faculty: 'Dr. Aparup Biswal / Dr. Bapi Mondal (AB/BM)', room: 'Material Testing Lab' }
      }
    },
    labThu: {
      code: 'CV207',
      name: 'Surveying Lab (SRM/VM)',
      room: 'Survey Field / Lab',
    },
    notesMonLab: 'Batch 1: CV205 MT Lab (AB/BM) | Batch 2: CV206 FM Lab (RDS)',
    notesTueLab: 'Batch 1: CV206 FM Lab (RDS) | Batch 2: CV205 MT Lab (AB/BM)',
    notesThuLab: 'CV207 Surveying Lab - Dr. Sathishraj Mani / Dr. Vinamra Mishra (Survey Field)',
    customSaturdayFocus: 'Mechanics of Solids & Fluid Mechanics Problem Clinics',
  })
};

// ==========================================
// 3rd Semester (2nd Year Odd) - ECE (Room 72)
// Faculty Advisor: Dr. Prashanth GR (grprashanth@nitgoa.ac.in)
// ==========================================
export const ECE_3: SemesterData = {
  courses: {
    'EC201': {
      code: 'EC201',
      name: 'Network Theory and Synthesis',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Lokesh Kumar Bramhane',
      shortName: 'LKB',
      facultyDesignation: 'Assistant Professor (ECE)',
      facultyResearch: 'Circuit Theory, VLSI Architectures',
      email: 'lokesh.bramhane@nitgoa.ac.in',
      room: 'Room 72',
      category: 'core',
      notes: 'Teaching Slot A (Mon 09:00, Tue 11:00, Thu 10:00). Graph theory of networks, transient analysis, two-port networks (Z, Y, ABCD, h), positive real functions, Foster and Cauer synthesis.',
      modules: [
        'Module 1: Network Topology & Graph Theory - Graph, tree, cotree, incidence matrix, tie-set matrix, cut-set matrix, formulation of equilibrium equations.',
        'Module 2: Transient Analysis - Time domain analysis of RL, RC, RLC circuits under DC and AC excitations, Laplace transform application.',
        'Module 3: Two-Port Networks - Z, Y, ABCD, h, and g parameters, interconnected two-port networks, reciprocity, symmetry, image parameters.',
        'Module 4: Network Synthesis - Positive real functions, Hurwitz polynomials, Foster and Cauer realization of LC, RC, and RL immittance functions.'
      ],
      textbooks: ['M. E. Van Valkenburg, "Network Analysis", Pearson', 'Franklin F. Kuo, "Network Analysis and Synthesis", Wiley']
    },
    'EC202': {
      code: 'EC202',
      name: 'Digital System Design',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Prashanth GR',
      shortName: 'PGR',
      facultyDesignation: 'Associate Professor & Faculty Advisor (ECE)',
      facultyResearch: 'Digital Architectures, Embedded Systems, Microelectronics',
      email: 'grprashanth@nitgoa.ac.in',
      room: 'Room 72',
      category: 'core',
      notes: 'Teaching Slot B (Mon 10:00, Wed 09:00, Thu 11:00). Combinational and sequential logic, flip-flops, counters, FSM synthesis, memories (ROM/RAM), and Verilog HDL.',
      modules: [
        'Module 1: Combinational Logic Design - Boolean minimization, K-maps, multi-level NAND/NOR networks, arithmetic circuits, multiplexers, decoders.',
        'Module 2: Synchronous Sequential Logic - Flip-flops, state diagram, state reduction and assignment, design of synchronous counters and registers.',
        'Module 3: Asynchronous Sequential Logic - Analysis of asynchronous circuits, transition tables, flow tables, race conditions and hazards.',
        'Module 4: Hardware Description Languages - Verilog HDL structural, dataflow, and behavioral modeling, synthesis of digital logic on FPGAs.'
      ],
      textbooks: ['M. Morris Mano, Michael D. Ciletti, "Digital Design", Pearson']
    },
    'MA202': {
      code: 'MA202',
      name: 'Mathematics-III (Mathematical Methods for Communication)',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. G. Shiva Kumar Reddy',
      shortName: 'GSK',
      facultyDesignation: 'Assistant Professor (Mathematics)',
      facultyResearch: 'Applied Mathematics, Signal Transforms',
      email: 'gshivakumarreddy913@nitgoa.ac.in',
      room: 'Room 72',
      category: 'core',
      notes: 'Teaching Slot C (Mon 11:00, Wed 10:00, Fri 09:00). Fourier series, Fourier transforms, Laplace transforms, Z-transforms, probability distributions and noise analysis.',
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
      name: 'Solid State Devices',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Anirban Chatterjee',
      shortName: 'AC',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Semiconductor Devices, Solid State Physics',
      email: 'anirban.chatterjee@nitgoa.ac.in',
      room: 'Room 72',
      category: 'core',
      notes: 'Teaching Slot D (Mon 12:00, Wed 11:00, Fri 10:00). Semiconductor physics, carrier transport, PN junction diodes, BJT operation, MOSFET physics and characteristics.',
      modules: [
        'Module 1: Semiconductor Physics - Energy bands, carrier concentrations, Fermi-Dirac statistics, drift and diffusion, Einstein relation, continuity equation.',
        'Module 2: PN Junction Diode - Built-in potential, depletion width, I-V characteristics, junction capacitances, breakdown mechanisms (Zener, avalanche).',
        'Module 3: Bipolar Junction Transistor - BJT physical operation, minority carrier distribution, Ebers-Moll model, amplification, switching characteristics.',
        'Module 4: Field Effect Transistors - MOSFET band diagram, threshold voltage, inversion layer, output and transfer characteristics, subthreshold conduction.'
      ],
      textbooks: ['Ben G. Streetman, Sanjay Kumar Banerjee, "Solid State Electronic Devices", Pearson', 'Donald A. Neamen, "Semiconductor Physics and Devices", McGraw-Hill']
    },
    'EC203': {
      code: 'EC203',
      name: 'Signals & Systems',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'G',
      examSlot: 'G',
      coordinator: 'Dr. T. Veerakumar',
      shortName: 'TVK',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Digital Signal Processing, Filter Design',
      email: 'tveerakumar@nitgoa.ac.in',
      room: 'Room 72',
      category: 'core',
      notes: 'Teaching Slot G (Tue 12:00, Wed 14:00, Fri 14:00). Continuous and discrete LTI systems, convolution, Fourier series, Fourier transforms, Laplace transforms, and sampling theorem.',
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
      facultyResearch: 'Environmental Science',
      email: 'velavan@nitgoa.ac.in',
      room: 'Room 70/71',
      category: 'mlc',
      notes: 'Friday 16:00 - 16:55 (Room 70/71). Ecosystems, pollution control, biodiversity.',
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
      notes: 'Monday 14:00 - 16:55. Logic gate realization, adder/subtractor, code converters, shift registers, counters, Verilog programming and FPGA download.',
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
      notes: 'Tuesday 14:00 - 16:55. MATLAB / Python implementation: Signal generation, continuous/discrete convolution, Fourier analysis, pole-zero plots, filter frequency response.',
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
    room: 'Room 72',
    slotA: 'EC201',
    slotB: 'EC202',
    slotC: 'MA202',
    slotD: 'EC200',
    slotG_Minor: 'EC203',
    mlcFriday: 'ES300',
    labMon: {
      code: 'EC204',
      name: 'DSD Lab (AC) B1 / SS Lab (TVK) B2',
      room: 'Digital Design Lab / DSP Lab',
      labOptions: {
        batch1: { code: 'EC204', name: 'Digital System Design Lab (B1)', faculty: 'Dr. Anirban Chatterjee (AC)', room: 'Digital Design Lab' },
        batch2: { code: 'EC205', name: 'Signals & Systems Lab (B2)', faculty: 'Dr. T. Veerakumar (TVK)', room: 'DSP & Signal Processing Lab' }
      }
    },
    labTue: {
      code: 'EC205',
      name: 'SS Lab (TVK) B1 / DSD Lab (AC) B2',
      room: 'DSP Lab / Digital Design Lab',
      labOptions: {
        batch1: { code: 'EC205', name: 'Signals & Systems Lab (B1)', faculty: 'Dr. T. Veerakumar (TVK)', room: 'DSP & Signal Processing Lab' },
        batch2: { code: 'EC204', name: 'Digital System Design Lab (B2)', faculty: 'Dr. Anirban Chatterjee (AC)', room: 'Digital Design Lab' }
      }
    },
    notesMonLab: 'Batch 1: EC204 DSD Lab (AC) | Batch 2: EC205 SS Lab (TVK)',
    notesTueLab: 'Batch 1: EC205 SS Lab (TVK) | Batch 2: EC204 DSD Lab (AC)',
    customSaturdayFocus: 'Network Theory & Digital Circuit Design Clinics',
  })
};

// ==========================================
// 3rd Semester (2nd Year Odd) - EEE (Room 60/61)
// Faculty Advisor: Dr. Soumitra Das (sdas@nitgoa.ac.in)
// ==========================================
export const EEE_3: SemesterData = {
  courses: {
    'MA203': {
      code: 'MA203',
      name: 'Transform Calculus and Complex Variables',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. G. Shiva Kumar Reddy',
      shortName: 'GSK',
      facultyDesignation: 'Assistant Professor (Mathematics)',
      facultyResearch: 'Transform Methods, Differential Equations',
      email: 'gshivakumarreddy913@nitgoa.ac.in',
      room: 'Room 60/61',
      category: 'core',
      notes: 'Teaching Slot A (Mon 09:00, Tue 11:00, Thu 10:00). Laplace transforms, Fourier transforms, Z-transforms, complex analytic functions, Cauchy integral theorem, residue calculus.',
      modules: [
        'Module 1: Laplace & Fourier Transforms - Laplace transform properties, inverse Laplace, Dirac delta, Fourier transforms, convolution theorem.',
        'Module 2: Z-Transforms - Definition, properties, ROC, inverse Z-transform, solution of difference equations.',
        'Module 3: Complex Analytic Functions - Cauchy-Riemann equations, harmonic functions, Milne-Thomson method, bilinear transformations.',
        'Module 4: Complex Integration - Cauchy integral theorem and formula, Taylor and Laurent series, residue calculus, contour integrals.'
      ],
      textbooks: ['Erwin Kreyszig, "Advanced Engineering Mathematics", Wiley']
    },
    'EE202': {
      code: 'EE202',
      name: 'Analog Electronics',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Amritansh Sagar',
      shortName: 'AMS',
      facultyDesignation: 'Assistant Professor (EEE)',
      facultyResearch: 'Analog Electronics, Power Semiconductor Devices',
      email: 'amritansh@nitgoa.ac.in',
      room: 'Room 60/61',
      category: 'core',
      notes: 'Teaching Slot C (Mon 11:00, Wed 10:00, Fri 09:00). BJT and MOSFET amplifiers, frequency response, feedback topologies, op-amp applications, oscillators.',
      modules: [
        'Module 1: Transistor Amplifiers - BJT small-signal models (h-parameters, re model), CE, CB, CC amplifier configurations, frequency response.',
        'Module 2: MOSFET Amplifiers - Small signal model, CS, CG, CD amplifiers, biasing circuits, high-frequency response.',
        'Module 3: Feedback Amplifiers & Oscillators - Feedback topologies, Barkhausen criterion, RC phase shift, Wien bridge, Colpitts, Hartley oscillators.',
        'Module 4: Operational Amplifiers - Differential amplifier stages, op-amp 741 characteristics, linear and non-linear circuits, active filters.'
      ],
      textbooks: ['Adel S. Sedra, Kenneth C. Smith, "Microelectronic Circuits", Oxford University Press']
    },
    'EE201': {
      code: 'EE201',
      name: 'Electric Power Generation',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Anudevi Samuel',
      shortName: 'ADS',
      facultyDesignation: 'Associate Professor (EEE)',
      facultyResearch: 'Power Systems, Renewable Energy Generation',
      email: 'anudevi@nitgoa.ac.in',
      room: 'Room 60/61',
      category: 'core',
      notes: 'Teaching Slot D (Mon 12:00, Wed 11:00, Fri 10:00). Conventional power plants (thermal, hydro, nuclear), solar PV, wind turbine generators, tariff structures, economics of generation.',
      modules: [
        'Module 1: Conventional Generation - Thermal power plants layout, Rankine cycle, hydro power plants, classifications, nuclear power plant reactors.',
        'Module 2: Renewable Energy Sources - Solar PV cell characteristics, grid-connected PV systems, wind turbine generators (PMSG, DFIG), biomass energy.',
        'Module 3: Economics of Power Generation - Load curves, load factor, diversity factor, capacity factor, base load and peak load stations.',
        'Module 4: Tariffs & Grid Interconnection - Types of tariffs, power factor improvement, grid code compliance, integration of renewable energy.'
      ],
      textbooks: ['B. R. Gupta, "Generation of Electrical Energy", S. Chand', 'C. L. Wadhwa, "Generation, Distribution and Utilization of Electrical Energy", New Age']
    },
    'EE203': {
      code: 'EE203',
      name: 'Signals and Systems',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Shanta Hardas Patil',
      shortName: 'SHP',
      facultyDesignation: 'Faculty (Department of EEE)',
      facultyResearch: 'Signal Processing, Electrical Systems Modeling',
      email: 'shanta@nitgoa.ac.in',
      room: 'Room 60/61',
      category: 'core',
      notes: 'Teaching Slot E (Tue 09:00, Wed 12:00, Fri 11:00). Continuous and discrete LTI systems, convolution, Fourier transform, Laplace transform, Z-transform, sampling theorem.',
      modules: [
        'Module 1: Signal Classification - Continuous and discrete signals, transformations of independent variable, basic signals, system properties.',
        'Module 2: Linear Time-Invariant Systems - Convolution integral, convolution sum, properties of LTI systems, causality and stability.',
        'Module 3: Fourier & Laplace Analysis - Continuous and discrete Fourier transforms, properties, frequency response, Laplace transform and system functions.',
        'Module 4: Z-Transform & Sampling - Z-transform, ROC, inverse Z-transform, sampling theorem, aliasing, discrete-time processing of continuous-time signals.'
      ],
      textbooks: ['Alan V. Oppenheim, Alan S. Willsky, "Signals and Systems", Pearson']
    },
    'EE200': {
      code: 'EE200',
      name: 'Electromagnetic Field Theory',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'F',
      examSlot: 'F',
      coordinator: 'Dr. Soumitra Das',
      shortName: 'SD',
      facultyDesignation: 'Assistant Professor & Faculty Advisor (EEE)',
      facultyResearch: 'Electromagnetic Fields, Power Electronics, Machines',
      email: 'sdas@nitgoa.ac.in',
      room: 'Room 60/61',
      category: 'core',
      notes: 'Teaching Slot F (Tue 10:00, Thu 09:00, Fri 12:00). Vector calculus, electrostatics, Gauss law, Poisson and Laplace equations, magnetostatics, Biot-Savart, Ampere law, Maxwell equations, wave propagation.',
      modules: [
        'Module 1: Electrostatics - Coulomb law, electric field intensity, Gauss divergence theorem, electric potential, capacitance, Poisson and Laplace equations.',
        'Module 2: Magnetostatics - Biot-Savart law, Ampere circuital law, magnetic vector potential, magnetic forces, inductance and magnetic boundary conditions.',
        'Module 3: Time-Varying Fields & Maxwell Equations - Faraday law, displacement current, Maxwell equations in point and integral forms, boundary conditions.',
        'Module 4: Electromagnetic Waves - Wave equations, uniform plane waves in free space and dielectrics, skin depth, Poynting vector and power flow.'
      ],
      textbooks: ['Matthew N. O. Sadiku, "Elements of Electromagnetics", Oxford University Press', 'William H. Hayt, John A. Buck, "Engineering Electromagnetics", McGraw-Hill']
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
      facultyResearch: 'Environmental Science',
      email: 'velavan@nitgoa.ac.in',
      room: 'Room 70/71',
      category: 'mlc',
      notes: 'Friday 16:00 - 16:55 (Room 70/71). Ecosystems, pollution, environmental protection.',
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
    'EE204': {
      code: 'EE204',
      name: 'Simulation Lab',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Monday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Soumitra Das',
      shortName: 'SD',
      facultyDesignation: 'Assistant Professor (EEE)',
      facultyResearch: 'Circuit Simulation and Analysis',
      email: 'sdas@nitgoa.ac.in',
      room: 'Room 39 (Simulation Lab)',
      category: 'lab',
      notes: 'Monday 14:00 - 16:55. Simulation of electrical networks, theorems, transient response, filters, and resonance using MATLAB/Simulink and PSPICE.',
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
      coordinator: 'Dr. Amol D Rahulkar / Dr. Shanta Hardas Patil',
      shortName: 'ADR / SHP',
      facultyDesignation: 'Faculty (Department of EEE)',
      facultyResearch: 'Instrumentation and Electrical Measurements',
      email: 'amol.rahulkar@nitgoa.ac.in',
      room: 'Room 16 Abdul Kalam Complex',
      category: 'lab',
      notes: 'Tuesday 14:00 - 16:55. Calibration of energy meters, bridge circuits (Wheatstone, Kelvin, Maxwell, Schering), potentiometer, LVDT, and sensor measurements.',
      modules: [
        'Experiment 1: Calibration of single-phase induction type energy meter.',
        'Experiment 2: Measurement of medium resistance using Wheatstone bridge and low resistance by Kelvin double bridge.',
        'Experiment 3: Measurement of self-inductance by Maxwell bridge and capacitance by Schering bridge.',
        'Experiment 4: Calibration of voltmeter and ammeter using DC potentiometer.',
        'Experiment 5: Displacement measurement characteristics using LVDT.'
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
      coordinator: 'Dr. Ankeshwarapu Sunil',
      shortName: 'AWS',
      facultyDesignation: 'Assistant Professor (EEE)',
      facultyResearch: 'IoT, Embedded Systems, Circuit Prototyping',
      email: 'sunil@nitgoa.ac.in',
      room: 'Room 04 Abdul Kalam Complex',
      category: 'lab',
      notes: 'Thursday 14:00 - 16:55. Hardware prototyping with Arduino, sensors, motor drivers, PCB layout design, soldering, and embedded circuit troubleshooting.',
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
    room: 'Room 60/61',
    slotA: 'MA203',
    slotC: 'EE202',
    slotD: 'EE201',
    slotE: 'EE203',
    slotF: 'EE200',
    mlcFriday: 'ES300',
    labMon: {
      code: 'EE206',
      name: 'Tinkering Lab - I (AWS) B1 / Measurement Lab (ADR/SHP) B2',
      room: 'Room 04 / Room 16 Abdul Kalam Complex',
      labOptions: {
        batch1: { code: 'EE206', name: 'Tinkering Lab - I (B1)', faculty: 'Dr. Ankeshwarapu Sunil (AWS)', room: 'Room 04 Abdul Kalam Complex' },
        batch2: { code: 'EE205', name: 'Electrical & Electronics Measurement Lab (B2)', faculty: 'Dr. Amol D Rahulkar / Dr. Shanta Hardas Patil (ADR/SHP)', room: 'Room 16 Abdul Kalam Complex' }
      }
    },
    labTue: {
      code: 'EE205',
      name: 'Measurement Lab (ADR/SHP) B1 / Tinkering Lab - I (AWS) B2',
      room: 'Room 16 / Room 04 Abdul Kalam Complex',
      labOptions: {
        batch1: { code: 'EE205', name: 'Electrical & Electronics Measurement Lab (B1)', faculty: 'Dr. Amol D Rahulkar / Dr. Shanta Hardas Patil (ADR/SHP)', room: 'Room 16 Abdul Kalam Complex' },
        batch2: { code: 'EE206', name: 'Tinkering Lab - I (B2)', faculty: 'Dr. Ankeshwarapu Sunil (AWS)', room: 'Room 04 Abdul Kalam Complex' }
      }
    },
    labThu: {
      code: 'EE204',
      name: 'Simulation Laboratory (SD)',
      room: 'Room 39',
    },
    notesMonLab: 'Batch 1: EE206 Tinkering Lab - I (AWS - Rm 04) | Batch 2: EE205 Measurement Lab (ADR/SHP - Rm 16)',
    notesTueLab: 'Batch 1: EE205 Measurement Lab (ADR/SHP - Rm 16) | Batch 2: EE206 Tinkering Lab - I (AWS - Rm 04)',
    notesThuLab: 'EE204 Simulation Lab - Dr. Soumitra Das (SD) | Tech: Mr. Rohit Madhu Gawas (Room 39)',
    customSaturdayFocus: 'Electromagnetic Fields & Circuit Analysis Numerical Practice',
  })
};

// ==========================================
// 3rd Semester (2nd Year Odd) - Mechanical (Room 66/67)
// Faculty Advisor: Dr. B Santhi (santhi@nitgoa.ac.in)
// ==========================================
export const ME_3: SemesterData = {
  courses: {
    'ME203': {
      code: 'ME203',
      name: 'Mechanics of Machinery',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Chaitanya Vundru',
      shortName: 'CV',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Mechanisms, Kinematics, Dynamics of Machinery',
      email: 'chaitanya.vundru@nitgoa.ac.in',
      room: 'Room 66/67',
      category: 'core',
      notes: 'Teaching Slot A (Mon 09:00, Tue 11:00, Thu 10:00). Kinematic pairs, inversion of mechanisms, velocity and acceleration analysis, cams, gears, gear trains.',
      modules: [
        'Module 1: Mechanisms & Inversions - Degrees of freedom, Grubler criterion, four-bar chain and slider-crank inversions, steering gear mechanisms.',
        'Module 2: Kinematic Analysis - Relative velocity and acceleration diagrams, instantaneous center method, Coriolis acceleration component.',
        'Module 3: Cams & Followers - Classification of cams and followers, displacement, velocity, acceleration diagrams for SHM and uniform acceleration, cam profile layout.',
        'Module 4: Gears & Gear Trains - Law of gearing, involute and cycloidal tooth profiles, interference and undercutting, simple, compound, reverted and epicyclic gear trains.'
      ],
      textbooks: ['S. S. Rattan, "Theory of Machines", McGraw-Hill', 'Thomas Bevan, "The Theory of Machines", Pearson']
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
      room: 'Room 66/67',
      category: 'core',
      notes: 'Teaching Slot B (Mon 10:00, Wed 09:00, Thu 11:00). Stress-strain relationships, SFD/BMD, flexural and shear stresses in beams, torsion of shafts, columns and struts.',
      modules: [
        'Module 1: Stress and Strain - Normal and shear stresses, generalized Hooke law, thermal stresses, strain rosette.',
        'Module 2: Beams & Flexure - SFD and BMD for statically determinate beams, pure bending theory, shear stress distribution.',
        'Module 3: Torsion & Combined Loading - Torsion of solid and hollow shafts, power transmission, combined bending and torsion.',
        'Module 4: Deflection & Columns - Deflection by double integration and moment-area methods, Euler buckling theory for columns.'
      ],
      textbooks: ['Egor P. Popov, "Engineering Mechanics of Solids", Pearson', 'L. S. Srinath, "Advanced Mechanics of Solids", McGraw-Hill']
    },
    'MA200': {
      code: 'MA200',
      name: 'Advanced Differential Equations and Complex Analysis',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr Najiya V K',
      shortName: 'NVK',
      facultyDesignation: 'Assistant Professor (Mathematics)',
      facultyResearch: 'Differential Equations, Complex Analysis',
      email: 'najiyavk@nitgoa.ac.in',
      room: 'Room 66/67',
      category: 'core',
      notes: 'Teaching Slot C (Mon 11:00, Wed 10:00, Fri 09:00). Boundary value problems, PDEs, complex analytic functions, contour integrals, and residue theorem.',
      modules: [
        'Module 1: PDEs in Engineering - Wave, Heat, and Laplace equations solutions using separation of variables.',
        'Module 2: Complex Analytic Functions - Cauchy-Riemann equations, harmonic functions, Milne-Thomson method.',
        'Module 3: Complex Series - Laurent series, singular points, poles and essential singularities.',
        'Module 4: Residue Calculus - Cauchy residue theorem, evaluation of contour integrals and definite integrals.'
      ],
      textbooks: ['Erwin Kreyszig, "Advanced Engineering Mathematics", Wiley']
    },
    'ME204': {
      code: 'ME204',
      name: 'Basic Thermodynamics',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Srikumar Warrier',
      shortName: 'SW',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Thermodynamics, Heat Transfer, Thermal Cycles',
      email: 'srikumar.warrier@nitgoa.ac.in',
      room: 'Room 66/67',
      category: 'core',
      notes: 'Teaching Slot D (Mon 12:00, Wed 11:00, Fri 10:00). Zeroth, First, and Second laws of thermodynamics, entropy principle, exergy analysis, pure substance properties, Rankine and Brayton cycles.',
      modules: [
        'Module 1: First Law of Thermodynamics - Closed and open systems, work and heat interactions, SFEE applied to nozzles, turbines, compressors, throttling.',
        'Module 2: Second Law & Entropy - Heat engines, refrigerators, Kelvin-Planck and Clausius statements, Carnot cycle, Clausius inequality, entropy generation.',
        'Module 3: Exergy & Pure Substances - Availability, reversible work, second law efficiency, P-v-T surfaces, Mollier diagram, steam tables.',
        'Module 4: Thermodynamic Cycles - Otto, Diesel, Dual air standard cycles, basic Rankine cycle and Brayton gas turbine cycle.'
      ],
      textbooks: ['P. K. Nag, "Engineering Thermodynamics", McGraw-Hill', 'Yunus A. Cengel, Michael A. Boles, "Thermodynamics: An Engineering Approach", McGraw-Hill']
    },
    'ME202': {
      code: 'ME202',
      name: 'Fluid Mechanics',
      type: 'Theory',
      credits: 4,
      ltp: '3-1-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Siba Prasad Choudhury',
      shortName: 'SPC',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Computational Fluid Dynamics, Fluid Mechanics',
      email: 'sibaprasad@nitgoa.ac.in',
      room: 'Room 66/67',
      category: 'core',
      notes: 'Teaching Slot E (Tue 09:00, Wed 12:00, Fri 11:00). Fluid statics, kinematics, momentum and energy equations, boundary layer theory, laminar and turbulent pipe flow.',
      modules: [
        'Module 1: Fluid Statics & Kinematics - Manometry, hydrostatic forces, buoyancy, continuity equation, velocity potential, stream function.',
        'Module 2: Fluid Dynamics & Bernoulli - Navier-Stokes equations introduction, Euler and Bernoulli equations, flow meters (venturi, orifice, nozzle).',
        'Module 3: Viscous Internal Flow - Laminar flow between parallel plates and in circular pipes (Hagen-Poiseuille), Darcy friction factor, pipe networks.',
        'Module 4: Boundary Layer Theory - Laminar and turbulent boundary layers over flat plates, displacement and momentum thicknesses, boundary layer separation.'
      ],
      textbooks: ['Frank M. White, "Fluid Mechanics", McGraw-Hill', 'Som, Biswas, Chakraborty, "Introduction to Fluid Mechanics and Fluid Machines", McGraw-Hill']
    },
    'ME201': {
      code: 'ME201',
      name: 'Materials and Metallurgical Engineering',
      type: 'Theory',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'F',
      examSlot: 'F',
      coordinator: 'Dr. B Santhi',
      shortName: 'BS',
      facultyDesignation: 'Associate Professor & Faculty Advisor (Mechanical)',
      facultyResearch: 'Metallurgy, Materials Science, Heat Treatment',
      email: 'santhi@nitgoa.ac.in',
      room: 'Room 66/67',
      category: 'core',
      notes: 'Teaching Slot F (Tue 10:00, Thu 09:00, Fri 12:00). Crystal structures, Miller indices, imperfections, phase diagrams (Fe-Fe3C), TTT diagrams, heat treatment of steels, engineering alloys.',
      modules: [
        'Module 1: Crystal Structures & Imperfections - Unit cells, Miller indices for planes and directions, point, line, and surface defects, dislocation mechanisms.',
        'Module 2: Phase Diagrams - Gibbs phase rule, binary isomorphous and eutectic systems, Lever rule, Iron-Iron Carbide (Fe-Fe3C) equilibrium diagram.',
        'Module 3: Heat Treatment of Steels - TTT and CCT diagrams, annealing, normalizing, hardening, tempering, austempering, martempering, surface hardening.',
        'Module 4: Engineering Alloys & Composites - Alloy steels, cast irons, non-ferrous alloys (Al, Cu, Ti based), polymer and ceramic materials overview.'
      ],
      textbooks: ['William D. Callister, David G. Rethwisch, "Materials Science and Engineering: An Introduction", Wiley', 'V. Raghavan, "Materials Science and Engineering", PHI']
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
      facultyResearch: 'Environmental Science',
      email: 'velavan@nitgoa.ac.in',
      room: 'Room 70/71',
      category: 'mlc',
      notes: 'Friday 16:00 - 16:55 (Room 70/71). Ecosystems, pollution, environmental protection.',
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
    'ME205': {
      code: 'ME205',
      name: 'Machine Drawing',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Monday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Sanjeev Singh / Dr. Chaitanya Vundru',
      shortName: 'DSS / CV',
      facultyDesignation: 'Faculty (Mechanical Engineering)',
      facultyResearch: 'CAD / Machine Drawing and GD&T',
      email: 'sanjeevsingh@nitgoa.ac.in',
      room: 'Drawing Hall (Room 33/38)',
      category: 'lab',
      notes: 'Monday 14:00 - 16:55. Limits, fits, tolerances, geometric dimensioning, assembly drawings of knuckle joint, screw jack, plummer block, and stuffing box in CAD.',
      modules: [
        'Experiment 1: Sectional views and conventions, limits, fits, and surface finish symbols.',
        'Experiment 2: Assembly drawing of Cotter joint and Knuckle joint with bill of materials.',
        'Experiment 3: Assembly drawing of Screw Jack with sectional elevations.',
        'Experiment 4: Assembly drawing of Plummer Block (Pedestal bearing).',
        'Experiment 5: 3D CAD modeling and orthographic drafting of machine components.'
      ],
      textbooks: ['N. D. Bhatt, "Machine Drawing", Charotar Publishing House', 'K. L. Narayana, "Machine Drawing", New Age']
    },
    'ME206': {
      code: 'ME206',
      name: 'Design Lab-1',
      type: 'Practical',
      credits: 2,
      ltp: '0-0-3',
      teachingSlot: 'Thursday 14:00 - 16:55',
      examSlot: 'Practical',
      coordinator: 'Dr. Darrius Diogo Barreto',
      shortName: 'DDB',
      facultyDesignation: 'Faculty (Mechanical Engineering)',
      facultyResearch: 'Mechanical Design and FEA Analysis',
      email: 'darrius@nitgoa.ac.in',
      room: 'Design Lab (Room 12 CV Raman Complex)',
      category: 'lab',
      notes: 'Thursday 14:00 - 16:55. Mechanical design computations, stress analysis, failure criteria, mechanism simulation, and FEA stress analysis of structural members.',
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
    room: 'Room 66/67',
    slotA: 'ME203',
    slotB: 'ME200',
    slotC: 'MA200',
    slotD: 'ME204',
    slotE: 'ME202',
    slotF: 'ME201',
    mlcFriday: 'ES300',
    labTue: {
      code: 'ME206',
      name: 'Design Lab-1 (DDB) B1 / Machine Drawing (CV) B2',
      room: 'Room 12 CV Raman / Room 33/38',
      labOptions: {
        batch1: { code: 'ME206', name: 'Design Lab-1 (B1)', faculty: 'Dr. Darrius Diogo Barreto (DDB)', room: 'Design Lab (Room 12 CV Raman)' },
        batch2: { code: 'ME205', name: 'Machine Drawing (B2)', faculty: 'Dr. Chaitanya Vundru (CV)', room: 'Drawing Hall (Room 33/38)' }
      }
    },
    labThu: {
      code: 'ME205',
      name: 'Machine Drawing (DSS) B1 / Design Lab-1 (DDB) B2',
      room: 'Room 33/38 / Room 12 CV Raman',
      labOptions: {
        batch1: { code: 'ME205', name: 'Machine Drawing (B1)', faculty: 'Dr. Sanjeev Singh (DSS)', room: 'Drawing Hall (Room 33/38)' },
        batch2: { code: 'ME206', name: 'Design Lab-1 (B2)', faculty: 'Dr. Darrius Diogo Barreto (DDB)', room: 'Design Lab (Room 12 CV Raman)' }
      }
    },
    notesTueLab: 'Batch 1: ME206 Design Lab-1 (DDB - Rm 12) | Batch 2: ME205 Machine Drawing (CV - Rm 33/38)',
    notesThuLab: 'Batch 1: ME205 Machine Drawing (DSS - Rm 33/38) | Batch 2: ME206 Design Lab-1 (DDB - Rm 12)',
    customSaturdayFocus: 'Thermodynamics & Mechanics of Solids Problem Solving',
  })
};
