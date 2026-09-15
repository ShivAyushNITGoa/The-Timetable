import { Course, TimeSlot, DayOfWeek } from '../timetableData';
import { buildInstituteMasterSchedule } from './scheduleBuilder';
import { SemesterData } from './semester3Data';

// Helper for 8th sem project-heavy weekly schedule
function buildFinalSemSchedule(prefix: string, room: string, elect1: string, elect2: string, projectCode: string): Record<DayOfWeek, TimeSlot[]> {
  return {
    Monday: [
      { id: `${prefix}-m1`, day: 'Monday', startTime: '09:00', endTime: '09:55', slotName: 'Slot A', courseCode: elect1, room },
      { id: `${prefix}-m2`, day: 'Monday', startTime: '10:00', endTime: '10:55', slotName: 'Slot B', courseCode: elect2, room },
      { id: `${prefix}-m3`, day: 'Monday', startTime: '11:00', endTime: '11:55', slotName: 'Technical Seminar', courseCode: projectCode, room, notes: 'Literature review & progress review' },
      { id: `${prefix}-m4`, day: 'Monday', startTime: '12:00', endTime: '12:55', slotName: 'Faculty Advisory Slot', courseCode: projectCode, room },
      { id: `${prefix}-ml`, day: 'Monday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      { id: `${prefix}-m5`, day: 'Monday', startTime: '14:00', endTime: '16:55', slotName: 'Major Project Phase II Lab', courseCode: projectCode, room: 'Project Research Lab', isLab: true },
    ],
    Tuesday: [
      { id: `${prefix}-t1`, day: 'Tuesday', startTime: '09:00', endTime: '09:55', slotName: 'Slot B', courseCode: elect2, room },
      { id: `${prefix}-t2`, day: 'Tuesday', startTime: '10:00', endTime: '10:55', slotName: 'Slot A', courseCode: elect1, room },
      { id: `${prefix}-t3`, day: 'Tuesday', startTime: '11:00', endTime: '11:55', slotName: 'Project Mentorship', courseCode: projectCode, room },
      { id: `${prefix}-t4`, day: 'Tuesday', startTime: '12:00', endTime: '12:55', slotName: 'Research Paper Writing', courseCode: projectCode, room },
      { id: `${prefix}-tl`, day: 'Tuesday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      { id: `${prefix}-t5`, day: 'Tuesday', startTime: '14:00', endTime: '16:55', slotName: 'Major Project Implementation', courseCode: projectCode, room: 'Project Research Lab', isLab: true },
    ],
    Wednesday: [
      { id: `${prefix}-w1`, day: 'Wednesday', startTime: '09:00', endTime: '09:55', slotName: 'Slot A', courseCode: elect1, room },
      { id: `${prefix}-w2`, day: 'Wednesday', startTime: '10:00', endTime: '10:55', slotName: 'Slot B', courseCode: elect2, room },
      { id: `${prefix}-w3`, day: 'Wednesday', startTime: '11:00', endTime: '11:55', slotName: 'Hardware / Prototype Testing', courseCode: projectCode, room: 'Specialized Lab' },
      { id: `${prefix}-w4`, day: 'Wednesday', startTime: '12:00', endTime: '12:55', slotName: 'Thesis Drafting Slot', courseCode: projectCode, room },
      { id: `${prefix}-wl`, day: 'Wednesday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      { id: `${prefix}-w5`, day: 'Wednesday', startTime: '14:00', endTime: '16:55', slotName: 'Project Evaluation & Defense Prep', courseCode: projectCode, room: 'Project Research Lab', isLab: true },
    ],
    Thursday: [
      { id: `${prefix}-th1`, day: 'Thursday', startTime: '09:00', endTime: '09:55', slotName: 'Slot B', courseCode: elect2, room },
      { id: `${prefix}-th2`, day: 'Thursday', startTime: '10:00', endTime: '10:55', slotName: 'Slot A', courseCode: elect1, room },
      { id: `${prefix}-th3`, day: 'Thursday', startTime: '11:00', endTime: '11:55', slotName: 'Industrial Training & Viva', courseCode: projectCode, room },
      { id: `${prefix}-th4`, day: 'Thursday', startTime: '12:00', endTime: '12:55', slotName: 'Library Research & Literature', courseCode: 'FREE', room: 'Central Library', isFree: true },
      { id: `${prefix}-thl`, day: 'Thursday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      { id: `${prefix}-th5`, day: 'Thursday', startTime: '14:00', endTime: '16:55', slotName: 'Major Project Phase II Lab', courseCode: projectCode, room: 'Project Research Lab', isLab: true },
    ],
    Friday: [
      { id: `${prefix}-f1`, day: 'Friday', startTime: '09:00', endTime: '09:55', slotName: 'Slot A', courseCode: elect1, room },
      { id: `${prefix}-f2`, day: 'Friday', startTime: '10:00', endTime: '10:55', slotName: 'Slot B', courseCode: elect2, room },
      { id: `${prefix}-f3`, day: 'Friday', startTime: '11:00', endTime: '11:55', slotName: 'Project Progress Colloquium', courseCode: projectCode, room: 'Seminar Hall' },
      { id: `${prefix}-f4`, day: 'Friday', startTime: '12:00', endTime: '12:55', slotName: 'Capstone Milestone Sign-Off', courseCode: projectCode, room },
      { id: `${prefix}-fl`, day: 'Friday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      { id: `${prefix}-f5`, day: 'Friday', startTime: '14:00', endTime: '16:55', slotName: 'Comprehensive Viva Voce Prep', courseCode: 'FREE', room: 'Department Conference Room', isFree: true },
    ],
    Saturday: [
      { id: `${prefix}-sat1`, day: 'Saturday', startTime: '09:00', endTime: '09:55', slotName: 'Placement & Higher Studies Clinic', courseCode: 'FREE', room, isFree: true },
      { id: `${prefix}-sat2`, day: 'Saturday', startTime: '10:00', endTime: '10:55', slotName: 'Project Sprint Session', courseCode: projectCode, room: 'Research Lab' },
      { id: `${prefix}-sat3`, day: 'Saturday', startTime: '11:00', endTime: '11:55', slotName: 'IEEE / ACM Conference Drafting', courseCode: projectCode, room: 'Research Lab' },
      { id: `${prefix}-sat4`, day: 'Saturday', startTime: '12:00', endTime: '12:55', slotName: 'Patent & IP Guidance Slot', courseCode: 'FREE', room: 'Library', isFree: true },
      { id: `${prefix}-satl`, day: 'Saturday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      { id: `${prefix}-sat5`, day: 'Saturday', startTime: '14:00', endTime: '16:55', slotName: 'Capstone Prototype Finalization', courseCode: projectCode, room: 'Research Lab', isLab: true },
    ],
    Sunday: [
      { id: `${prefix}-sun1`, day: 'Sunday', startTime: '09:00', endTime: '09:55', slotName: 'Reading Hall Study', courseCode: 'FREE', room: 'Central Library', isFree: true },
      { id: `${prefix}-sun2`, day: 'Sunday', startTime: '10:00', endTime: '10:55', slotName: 'Self-Study Slot', courseCode: 'FREE', room: 'Central Library', isFree: true },
      { id: `${prefix}-sun3`, day: 'Sunday', startTime: '11:00', endTime: '11:55', slotName: 'Campus Activities & Sports', courseCode: 'FREE', room: 'Sports Complex', isFree: true },
      { id: `${prefix}-sun4`, day: 'Sunday', startTime: '12:00', endTime: '12:55', slotName: 'Personal Preparation', courseCode: 'FREE', room: 'Central Library', isFree: true },
      { id: `${prefix}-sunl`, day: 'Sunday', startTime: '12:55', endTime: '14:00', slotName: 'LUNCH', courseCode: '', room: 'Cafeteria', isLunch: true },
      { id: `${prefix}-sun5`, day: 'Sunday', startTime: '14:00', endTime: '16:55', slotName: 'Weekend Leisure & Open Labs', courseCode: 'FREE', room: 'Campus', isFree: true },
    ],
  };
}

// ==========================================
// 7th Semester (4th Year Odd) - CSE (Room 18)
// Faculty Advisor: Dr. Modi Chirag N (cnmodi@nitgoa.ac.in)
// ==========================================
export const CSE_7: SemesterData = {
  courses: {
    'CS529': {
      code: 'CS529',
      name: 'Big Data Analysis (Elective - III)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Mr. Sarvesh Sawant',
      shortName: 'SS',
      facultyDesignation: 'Faculty (Department of CSE)',
      facultyResearch: 'Big Data Analytics, Distributed File Systems, Cloud Computing',
      email: 'sarvesh@nitgoa.ac.in',
      room: 'Room 18',
      category: 'elective',
      notes: 'Teaching Slot A. Hadoop HDFS, MapReduce, Apache Spark, NoSQL stores (HBase, Cassandra), stream processing, and large-scale graph mining.',
      modules: [
        'Module 1: Big Data Foundations & Hadoop - 5Vs of Big Data, Hadoop Distributed File System (HDFS) architecture, NameNode, DataNode, MapReduce programming paradigm, YARN resource manager.',
        'Module 2: In-Memory Processing with Spark - Apache Spark core, Resilient Distributed Datasets (RDDs), transformations and actions, Spark SQL, DataFrames, Spark Streaming architecture.',
        'Module 3: NoSQL Database Architectures - CAP theorem, Key-Value stores, Column-family databases (Apache Cassandra, HBase), Document databases (MongoDB), Graph databases (Neo4j).',
        'Module 4: Machine Learning at Scale - Spark MLlib, distributed clustering (K-Means), ALS collaborative filtering for recommendation systems, PageRank on Pregel and GraphX.'
      ],
      textbooks: [
        'Tom White, "Hadoop: The Definitive Guide", 4th Edition, O Reilly',
        'Holden Karau, Andy Konwinski, Patrick Wendell, Matei Zaharia, "Learning Spark", O Reilly'
      ]
    },
    'CS501': {
      code: 'CS501',
      name: 'Advanced Data Structures (Elective - III)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Mini S',
      shortName: 'MS',
      facultyDesignation: 'Associate Professor & Dean Academics (CSE)',
      facultyResearch: 'Data Structures, Optimization, Sensor Networks',
      email: 'mini@nitgoa.ac.in',
      room: 'Room 18',
      category: 'elective',
      notes: 'Teaching Slot B. Splay trees, Red-Black trees, Fibonacci heaps, Disjoint set forests, Trie structures, Suffix trees, and persistent data structures.',
      modules: [
        'Module 1: Balanced Search Trees - Red-Black trees, Top-down deletion, Splay trees with amortized analysis (potential method), Treaps.',
        'Module 2: Priority Queues & Heaps - Binomial heaps, Fibonacci heaps, decrease-key amortized runtime, Leftist heaps, Skew heaps.',
        'Module 3: String Data Structures - Tries, Compressed tries, Suffix trees (Ukkonen algorithm), Suffix arrays, Burrows-Wheeler transform.',
        'Module 4: Geometric & Persistent Data Structures - Interval trees, Range trees, Segment trees, KD-trees, Fully and partially persistent data structures.'
      ],
      textbooks: ['Thomas H. Cormen et al., "Introduction to Algorithms", MIT Press', 'Peter Brass, "Advanced Data Structures", Cambridge University Press']
    },
    'CS814': {
      code: 'CS814',
      name: 'Game Theory (Elective - V)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Contract Faculty 1',
      shortName: 'CF1',
      facultyDesignation: 'Faculty (CSE)',
      facultyResearch: 'Algorithmic Game Theory, Multi-Agent Systems',
      email: 'cf1.cse@nitgoa.ac.in',
      room: 'Room 18',
      category: 'elective',
      notes: 'Teaching Slot C. Strategic games, Nash equilibrium, mixed strategies, extensive form games, auctions (Vickrey), mechanism design.',
      modules: [
        'Module 1: Strategic Games & Nash Equilibrium - Normal form games, dominant strategies, pure and mixed strategy Nash equilibria, Minimax theorem for zero-sum games.',
        'Module 2: Extensive Form Games - Game trees, subgame perfect equilibria, backward induction, imperfect information, Bayesian games.',
        'Module 3: Repeated Games - Infinitely repeated games, Folk theorem, Tit-for-Tat strategy, cooperative bargaining solutions.',
        'Module 4: Mechanism Design & Auctions - Social choice functions, Revelation principle, Vickrey-Clarke-Groves (VCG) mechanisms, English, Dutch, and sealed-bid auctions.'
      ],
      textbooks: ['Martin J. Osborne, "An Introduction to Game Theory", Oxford University Press', 'Noam Nisan et al., "Algorithmic Game Theory", Cambridge University Press']
    },
    'CS534': {
      code: 'CS534',
      name: 'Virtualization and Cloud Computing (Elective - IV)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Pravati Swain',
      shortName: 'PS',
      facultyDesignation: 'Associate Professor & HoD (CSE)',
      facultyResearch: 'Cloud Virtualization, Task Scheduling, Fault Tolerance',
      email: 'pravati@nitgoa.ac.in',
      room: 'Room 18',
      category: 'elective',
      notes: 'Teaching Slot D. Hypervisors (Type 1 & 2), containerization (Docker, Kubernetes), cloud service models (IaaS, PaaS, SaaS), cloud storage, SLA management.',
      modules: [
        'Module 1: Virtualization Technologies - Hardware emulation, full virtualization, para-virtualization, OS-level virtualization (Containers vs VMs), KVM, Xen, Docker.',
        'Module 2: Cloud Architectures & Models - NIST cloud reference architecture, IaaS, PaaS, SaaS, Public, Private, Hybrid clouds, AWS and GCP service architectures.',
        'Module 3: Resource Management & Scheduling - Virtual machine migration (live migration), resource allocation heuristics, auto-scaling, cloud load balancing algorithms.',
        'Module 4: Cloud Storage, Security & SLA - Distributed block storage, Amazon S3, SLA parameters, multi-tenancy security, data sovereignty, serverless computing (AWS Lambda).'
      ],
      textbooks: ['Rajkumar Buyya, Christian Vecchiola, S. Thamarai Selvi, "Mastering Cloud Computing", McGraw-Hill', 'Kai Hwang, Geoffrey C. Fox, Jack J. Dongarra, "Distributed and Cloud Computing", Morgan Kaufmann']
    },
    'CS541': {
      code: 'CS541',
      name: 'Cryptocurrency and Blockchain Technologies (Elective - IV)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Modi Chirag N',
      shortName: 'MCN',
      facultyDesignation: 'Associate Professor & Faculty Advisor (CSE)',
      facultyResearch: 'Blockchain Protocols, Smart Contracts, Distributed Ledgers',
      email: 'cnmodi@nitgoa.ac.in',
      room: 'Room 18',
      category: 'elective',
      notes: 'Teaching Slot E. Bitcoin protocol, Proof of Work (PoW), Proof of Stake (PoS), Ethereum virtual machine (EVM), Solidity smart contracts, DeFi applications.',
      modules: [
        'Module 1: Distributed Ledger Fundamentals - Cryptographic hash pointers, Merkle trees, UTXO model, Bitcoin blockchain, mining difficulty adjustment.',
        'Module 2: Consensus Mechanisms - Byzantine Fault Tolerance (BFT), Proof of Work (PoW), Proof of Stake (PoS), Delegated PoS, Raft and PBFT algorithms.',
        'Module 3: Ethereum & Smart Contracts - Ethereum accounts, gas mechanics, EVM bytecode, Solidity programming: state variables, modifiers, events, reentrancy vulnerability.',
        'Module 4: Enterprise Blockchain & Future Trends - Hyperledger Fabric architecture, channels, chaincode, zero-knowledge proofs (zk-SNARKs), decentralized finance (DeFi).'
      ],
      textbooks: ['Arvind Narayanan et al., "Bitcoin and Cryptocurrency Technologies", Princeton University Press', 'Andreas M. Antonopoulos, Gavin Wood, "Mastering Ethereum", O Reilly']
    },
    'CS815': {
      code: 'CS815',
      name: 'Data Warehousing & Data Mining (Elective - V)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'F',
      examSlot: 'F',
      coordinator: 'Dr. Damodar Reddy E',
      shortName: 'DRE',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Data Mining, OLAP Architectures, Information Systems',
      email: 'damodar.reddy@nitgoa.ac.in',
      room: 'Room 18',
      category: 'elective',
      notes: 'Teaching Slot F. OLAP cubes, Star and Snowflake schemas, association rule mining (Apriori, FP-Growth), classification (C4.5, SVM), clustering (DBSCAN).',
      modules: [
        'Module 1: Data Warehousing & OLAP - Data warehouse architecture, ETL processes, Star schema, Snowflake schema, Fact constellation, OLAP operations (Roll-up, Drill-down, Slice, Dice).',
        'Module 2: Data Preprocessing & Association Mining - Data cleaning, normalization, discretization, Association rule mining: Apriori algorithm, FP-Growth algorithm, correlation analysis.',
        'Module 3: Classification Algorithms - Decision tree induction (ID3, C4.5), Bayesian classification, Support Vector Machines (SVM), ensemble methods (Random Forests, AdaBoost).',
        'Module 4: Clustering & Outlier Detection - Partitioning methods (k-Means, k-Medoids), Hierarchical clustering (AGNES, DIANA), Density-based clustering (DBSCAN), LOF outlier detection.'
      ],
      textbooks: ['Jiawei Han, Micheline Kamber, Jian Pei, "Data Mining: Concepts and Techniques", 3rd Edition, Morgan Kaufmann']
    },
    'HS350': {
      code: 'HS350',
      name: 'Industrial Economics',
      type: 'Theory',
      credits: 1,
      ltp: '1-0-0',
      teachingSlot: 'Friday 16:00 - 16:55 (Slot MLC)',
      examSlot: 'Friday MLC',
      coordinator: 'Dr. Sunil Kumar A',
      shortName: 'SKA',
      facultyDesignation: 'Assistant Professor (Economics / Humanities)',
      facultyResearch: 'Industrial Organization, Public Finance, Microeconomics',
      email: 'sunilkumar@nitgoa.ac.in',
      room: 'Room 18',
      category: 'mlc',
      notes: 'Demand forecasting, cost analysis, market structures (monopoly, oligopoly), capital budgeting, break-even analysis.',
      modules: [
        'Module 1: Foundations of Engineering Economics & Demand Analysis - Nature, scope, and engineering significance; law of demand and supply, elasticity of demand, demand forecasting methods (qualitative and regression analysis).',
        'Module 2: Production & Cost Theory - Production functions (Cobb-Douglas), laws of diminishing returns, returns to scale; short-run and long-run cost curves, economies of scale, break-even analysis and profit maximization.',
        'Module 3: Market Structures & Pricing Policies - Perfect competition, monopoly, monopolistic competition, and oligopoly; pricing strategies: cost-plus, price discrimination, penetration, skimming, marginal cost pricing.',
        'Module 4: Capital Budgeting & Investment Decisions - Time value of money, cash flow equivalence; Net Present Value (NPV), Internal Rate of Return (IRR), Payback Period, Benefit-Cost ratio, depreciation accounting.'
      ],
      textbooks: [
        'R. Paneerselvam, "Engineering Economics", 2nd Edition, Prentice Hall of India',
        'Leland Blank and Anthony Tarquin, "Engineering Economy", McGraw-Hill'
      ]
    },
    'CS402': {
      code: 'CS402',
      name: 'Major Project - I',
      type: 'Practical',
      credits: 4,
      ltp: '0-0-6',
      teachingSlot: 'Project Slot (Mon / Thu)',
      examSlot: 'Project Evaluation',
      coordinator: 'Dr. Modi Chirag N',
      shortName: 'MCN',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Capstone Guidance',
      email: 'cnmodi@nitgoa.ac.in',
      room: 'Department Research Lab',
      category: 'lab',
      notes: 'Capstone Phase I: Problem definition, literature survey, architectural design, feasibility analysis, preliminary prototyping, and intermediate defense.',
      modules: [
        'Phase 1: Problem Formulation & Literature Review - Formulating computer science research objectives, comprehensive survey of IEEE/ACM transactions, gap analysis, and requirement specifications.',
        'Phase 2: System Architecture & Design Specification - Software/hardware architectural diagram, database schema design, algorithm flowchart, UML modeling, and technology stack selection.',
        'Phase 3: Prototype Implementation & Module Testing - Implementing core algorithms/modules, backend API integration, preliminary testing, and Git version control setup.',
        'Phase 4: Interim Defense & Technical Documentation - Compiling interim technical report conforming to NIT Goa formatting guidelines, slide defense before departmental review committee.'
      ],
      textbooks: [
        'NIT Goa B.Tech Project Guidelines Handbook',
        'David F. Beer, David McMurrey, "A Guide to Writing as an Engineer", John Wiley'
      ]
    },
    'CS401': {
      code: 'CS401',
      name: 'Comprehensive Exam',
      type: 'Theory',
      credits: 3,
      ltp: '0-0-0',
      teachingSlot: 'Self-Study & Viva',
      examSlot: 'Viva Voce',
      coordinator: 'Dr. Modi Chirag N',
      shortName: 'MCN',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Curriculum Evaluation',
      email: 'cnmodi@nitgoa.ac.in',
      room: 'Room 18',
      category: 'core',
      notes: 'Comprehensive evaluation covering all core B.Tech Computer Science and Engineering courses from 3rd to 6th semesters.',
      modules: [
        'Domain 1: Algorithms & Data Structures - Asymptotic analysis, arrays, stacks, queues, linked lists, binary search trees, AVL trees, heaps, hashing, divide-and-conquer, greedy algorithms, dynamic programming, graph algorithms (BFS, DFS, Dijkstra, Prim), NP-completeness.',
        'Domain 2: Computer Systems & Architecture - Boolean algebra, combinational and sequential logic, ALU, instruction pipelining, cache memory hierarchy, virtual memory, interrupt handling, addressing modes.',
        'Domain 3: Operating Systems & Databases - Process management, threads, CPU scheduling algorithms, process synchronization (mutex, semaphores), deadlock detection and prevention, paging, ER models, relational algebra, SQL, BCNF/3NF normalization, transactions and ACID properties.',
        'Domain 4: Networks, Theory of Computation & Compilers - ISO/OSI and TCP/IP protocol stacks, sliding window protocols, routing algorithms (Dijkstra, Bellman-Ford), TCP/UDP, DNS, HTTP, regular languages, finite automata, context-free grammars, Turing machines, lexical analysis, parsing.'
      ],
      textbooks: [
        'GATE Computer Science and Information Technology Syllabus and Reference Texts',
        'Thomas H. Cormen, "Introduction to Algorithms", MIT Press',
        'Abraham Silberschatz, "Operating System Concepts", Wiley'
      ]
    }
  },
  schedule: buildInstituteMasterSchedule({
    prefix: 'cse7',
    room: 'Room 18',
    slotA: 'CS534',
    slotB: 'CS529',
    slotD: 'CS501',
    slotF: 'CS541',
    slotG_Minor: 'CS400M',
    slotH_OpenElective: 'IKS351',
    mlcFriday: 'CS401',
    labThu: { code: 'CS402', name: 'Major Project - I (Dr. Chirag N Modi)', room: 'Room 18 / Research Lab' },
    notesThuLab: 'Dr. Chirag N Modi (MCN) - Major Project - I Capstone Review',
    customSaturdayFocus: 'Big Data & Cloud Virtualization Research Seminars',
  })
};

// ==========================================
// 7th Semester (4th Year Odd) - Civil (Room 69)
// Faculty Advisor: Dr. Vinamra Mishra (vinamra@nitgoa.ac.in)
// ==========================================
export const CVE_7: SemesterData = {
  courses: {
    'CV518': {
      code: 'CV518',
      name: 'Remote Sensing and GIS (Elective - III)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Rishi D Sahastrabuddhe',
      shortName: 'RDS',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Geospatial Analytics, Hydrology, Remote Sensing',
      email: 'rishi@nitgoa.ac.in',
      room: 'Room 69',
      category: 'elective',
      notes: 'Teaching Slot A. Electromagnetic spectrum, sensor platforms (Landsat, Sentinel), GIS spatial data models (raster/vector), and terrain modeling.',
      modules: [
        'Module 1: Physics of Remote Sensing - Electromagnetic spectrum, atmospheric windows, spectral reflectance curves of water, soil, and green vegetation; sensors and orbital platforms (sun-synchronous and geostationary orbits, Landsat, Sentinel, IRS).',
        'Module 2: Digital Image Processing & Classification - Digital image representations, radiometric and geometric pre-processing, image enhancement techniques, visual interpretation keys, supervised and unsupervised classification (Maximum Likelihood, K-Means).',
        'Module 3: Geographic Information Systems (GIS) Foundations - Spatial data concepts, raster and vector data models, coordinate reference systems, map projections (UTM), topology creation, and spatial database management systems (SDBMS).',
        'Module 4: Spatial Analysis & Civil Engineering Applications - Proximity and overlay operations, buffer analysis, network analysis, Digital Elevation Models (DEM/DTM), watershed delineation, flood inundation modeling, land use/land cover change detection.'
      ],
      textbooks: [
        'Thomas Lillesand, Ralph W. Kiefer, Jonathan Chipman, "Remote Sensing and Image Interpretation", 7th Edition, Wiley',
        'Kang-tsung Chang, "Introduction to Geographic Information Systems", McGraw-Hill'
      ]
    },
    'CV521': {
      code: 'CV521',
      name: 'Pavement Design (Elective - III)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Vinamra Mishra',
      shortName: 'VM',
      facultyDesignation: 'Assistant Professor & Faculty Advisor (Civil)',
      facultyResearch: 'Pavement Design, Asphalt Mechanics, Highway Engineering',
      email: 'vinamra@nitgoa.ac.in',
      room: 'Room 69',
      category: 'elective',
      notes: 'Teaching Slot B. Stresses in flexible and rigid pavements, Burmister 2-layer theory, IRC:37 flexible pavement guidelines, IRC:58 concrete pavements.',
      modules: [
        'Module 1: Wheel Load Stresses & Traffic Factors - Types of pavements, structural comparison; axle load distributions, Equivalent Single Wheel Load (ESWL), contact pressure and tyre pressure, legal axle load limits.',
        'Module 2: Stresses in Flexible Pavements & Material Mechanics - Boussinesq theory, Burmister two-layer and multi-layer elastic layered systems; subgrade soil characterization, CBR test, resilient modulus, dynamic modulus, asphalt binder rheology.',
        'Module 3: Design of Flexible Pavements - Design factors, design life, cumulative standard axles (CSA), IRC:37-2018 guidelines, bituminous layer fatigue cracking and rutting failure criteria, drainage design in flexible pavements.',
        'Module 4: Stresses & Design of Rigid Pavements - Westergaard stress equations for corner, edge, and interior wheel loadings; temperature stresses (warping and frictional), combination of stresses, IRC:58-2015 design provisions, joint design (expansion, contraction, tie bars, dowel bars).'
      ],
      textbooks: [
        'Yang H. Huang, "Pavement Analysis and Design", 2nd Edition, Pearson Education',
        'IRC:37-2018 & IRC:58-2015 Standard Codes, Indian Roads Congress'
      ]
    },
    'CV537': {
      code: 'CV537',
      name: 'Ground Improvement Techniques (Elective - V)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Kandalai Srikanth',
      shortName: 'KS',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Geotechnical Engineering, Soil Stabilization',
      email: 'srikanth@nitgoa.ac.in',
      room: 'Room 69',
      category: 'elective',
      notes: 'Teaching Slot C. Vibro-compaction, stone columns, pre-loading with PVD, chemical grouting, geosynthetics, soil nailing.',
      modules: [
        'Module 1: Principles of Ground Modification & Deep Compaction - Engineering need for ground improvement, problematic soils (expansive black cotton soils, collapsible soils, soft marine clays); dynamic compaction, vibro-flotation, vibro-replacement, and stone columns.',
        'Module 2: Drainage & Dewatering Systems - Well point systems, deep well dewatering, vacuum dewatering, electro-osmotic consolidation; preloading with surcharge, vertical sand drains, and Prefabricated Vertical Drains (PVD).',
        'Module 3: Chemical Stabilization & Grouting Technologies - Soil stabilization using cement, lime, fly ash, bitumen; grouting materials (suspension vs solution grouts), permeation grouting, compaction grouting, jet grouting, deep soil mixing.',
        'Module 4: Geosynthetics & Soil Reinforcement - Geotextiles, geogrids, geomembranes, geonets; mechanisms of reinforced earth, internal and external stability of reinforced soil retaining walls, soil nailing, micropiles, rock bolting.'
      ],
      textbooks: [
        'P. Purushothama Raj, "Ground Improvement Techniques", Laxmi Publications',
        'Robert M. Koerner, "Designing with Geosynthetics", Prentice Hall'
      ]
    },
    'CV535': {
      code: 'CV535',
      name: 'Irrigation Structures and Hydropower Engineering (Elective - IV)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Harikumar M',
      shortName: 'HKM',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Hydraulic Structures, Hydropower Engineering',
      email: 'harikumar@nitgoa.ac.in',
      room: 'Room 69',
      category: 'elective',
      notes: 'Teaching Slot D. Diversion headworks, Bligh and Khosla seepage theories, spillways, energy dissipators, penstocks, surge tanks.',
      modules: [
        'Module 1: Diversion Headworks & Seepage Theories - Layout and components of diversion headworks; subsurface flow on permeable foundations, Bligh creep theory, Lane weighted creep theory, Khosla theory of independent variables and exit gradient calculations.',
        'Module 2: Canal Falls & Cross-Drainage Works - Types of canal falls (Ogee, Rapid, Stepped, Sarda type), energy dissipation mechanisms below falls; design principles of aqueducts, siphon aqueducts, super passages, and level crossings.',
        'Module 3: Spillways & Energy Dissipators - Classification of spillways, hydraulics of Ogee spillway crest profile, discharge equations, chute spillway, siphon spillway; energy dissipation below spillways: hydraulic jump stilling basins, roller and trajectory buckets.',
        'Module 4: Hydropower Systems & Water Conductor Elements - Layout of high, medium, and low head hydropower plants; run-of-river and pumped storage schemes; intake structures, penstocks, water hammer phenomenon, surge tanks (simple, restricted orifice, differential), hydraulic turbine selection.'
      ],
      textbooks: [
        'S. K. Garg, "Irrigation Engineering and Hydraulic Structures", Khanna Publishers',
        'P. N. Modi, "Irrigation, Water Resources and Water Power Engineering", Standard Book House'
      ]
    },
    'CV525': {
      code: 'CV525',
      name: 'Structural Dynamics (Elective - IV)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Bapi Mondal',
      shortName: 'BM',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Structural Dynamics, Earthquake Engineering',
      email: 'bapi@nitgoa.ac.in',
      room: 'Room 69',
      category: 'elective',
      notes: 'Teaching Slot E. SDOF dynamic response, Duhamel integral, MDOF modal analysis, response spectrum analysis (IS 1893:2016).',
      modules: [
        'Module 1: Single-Degree-of-Freedom (SDOF) Systems - Undamped and viscously damped free vibration, logarithmic decrement, Coulomb damping; forced vibration under harmonic excitation, dynamic magnification factor, resonance, vibration transmissibility and isolation.',
        'Module 2: Response to General Dynamic Loading - Response to step, ramp, and impulse excitations, Duhamel integral formulation, numerical evaluation of dynamic response (Newmark-Beta and Wilson-theta methods), earthquake ground motion response spectra.',
        'Module 3: Multi-Degree-of-Freedom (MDOF) Systems - Equations of motion for shear building frames, mass and stiffness matrices, characteristic equation, natural frequencies and mode shapes, orthogonality properties of normal modes, modal analysis and modal superposition.',
        'Module 4: Continuous Systems & Seismic Code Provisions - Free vibration of uniform flexural beams, boundary conditions; introduction to Indian standard seismic code provisions (IS 1893:2016) for equivalent static lateral force and dynamic response spectrum analysis.'
      ],
      textbooks: [
        'Anil K. Chopra, "Dynamics of Structures: Theory and Applications to Earthquake Engineering", 4th Edition, Pearson',
        'Mario Paz, William Leigh, "Structural Dynamics: Theory and Computation", Springer'
      ]
    },
    'CV538': {
      code: 'CV538',
      name: 'Repair and Rehabilitation of Structures (Elective - V)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'F',
      examSlot: 'F',
      coordinator: 'Dr. Sathishraj Mani',
      shortName: 'SRM',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Structural Rehabilitation, NDT of Concrete',
      email: 'sathishraj@nitgoa.ac.in',
      room: 'Room 69',
      category: 'elective',
      notes: 'Teaching Slot F. Deterioration mechanisms of concrete and steel, NDT methods (UPV, Rebound hammer), FRP retrofitting, structural strengthening.',
      modules: [
        'Module 1: Distress & Deterioration Mechanisms in Concrete - Causes of deterioration: carbonation, chloride ingress, alkali-silica reaction, sulfate attack, freeze-thaw cycles; corrosion of steel reinforcement (electrochemistry, half-cell potentials), structural distress cracking.',
        'Module 2: Diagnostic Assessment & Non-Destructive Testing (NDT) - Visual inspection, core sampling, Schmidt rebound hammer, Ultrasonic Pulse Velocity (UPV), cover meter, rebar corrosion mapping, carbonation depth phenolphthalein test.',
        'Module 3: Repair Materials & Crack Remediation - Polymeric repair mortars, expansive cements, epoxy resins, polyurethane sealants, rust inhibitors; crack repair techniques: resin injection, stitching, routing and sealing, external bonding.',
        'Module 4: Structural Retrofitting & Strengthening Techniques - RC column and beam jacketing, steel plate bonding, external prestressing, Fiber Reinforced Polymers (CFRP, GFRP) for flexural, shear, and seismic confinement; case studies.'
      ],
      textbooks: [
        'P. C. Varghese, "Maintenance, Repair & Rehabilitation and Minor Works of Buildings", PHI Learning',
        'B. Vidivelli, "Rehabilitation of Concrete Structures", Standard Publishers'
      ]
    },
    'HS350': {
      code: 'HS350',
      name: 'Industrial Economics',
      type: 'Theory',
      credits: 1,
      ltp: '1-0-0',
      teachingSlot: 'Friday 16:00 - 16:55 (Slot MLC)',
      examSlot: 'Friday MLC',
      coordinator: 'Dr. Sunil Kumar A',
      shortName: 'SKA',
      facultyDesignation: 'Assistant Professor (Humanities)',
      facultyResearch: 'Economics',
      email: 'sunilkumar@nitgoa.ac.in',
      room: 'Room 69',
      category: 'mlc',
      notes: 'Engineering economics and cost analysis.',
      modules: [
        'Module 1: Foundations of Engineering Economics & Demand Analysis - Law of supply and demand, price and income elasticity, demand forecasting for civil infrastructure projects.',
        'Module 2: Production & Cost Theory - Short-run and long-run cost curves, production functions, economies of scale, break-even analysis for construction firms.',
        'Module 3: Market Structures & Pricing Policies - Perfect competition, monopoly, oligopolistic contractor bidding strategies, tender evaluation economics.',
        'Module 4: Capital Budgeting & Investment Appraisal - Time value of money, discounted cash flows, Net Present Value (NPV), Internal Rate of Return (IRR), Benefit-Cost ratio for public works, asset depreciation.'
      ],
      textbooks: [
        'R. Paneerselvam, "Engineering Economics", 2nd Edition, Prentice Hall of India',
        'Leland Blank and Anthony Tarquin, "Engineering Economy", McGraw-Hill'
      ]
    },
    'CV400': {
      code: 'CV400',
      name: 'Major Project - I',
      type: 'Practical',
      credits: 4,
      ltp: '0-0-6',
      teachingSlot: 'Project Slot (Mon / Thu)',
      examSlot: 'Project Evaluation',
      coordinator: 'Dr. Aparup Biswal',
      shortName: 'AB',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Capstone Mentorship',
      email: 'aparup@nitgoa.ac.in',
      room: 'Civil Project Lab',
      category: 'lab',
      notes: 'Civil engineering design project, structural modeling, geotechnical investigation, or environmental modeling.',
      modules: [
        'Phase 1: Project Site Selection & Literature Review - Selection of civil infrastructure/environmental engineering problem, site reconnaissance, survey of ASCE/ICE research publications.',
        'Phase 2: Numerical Modeling & Geotechnical Assessment - Structural modeling in ETABS/STAAD.Pro or geotechnical simulation in PLAXIS/GeoStudio, soil investigation parameter estimation.',
        'Phase 3: Design Computations & Experimental Validation - Detailed structural RCC/steel design calculations as per Indian Standards, experimental laboratory testing of soil/concrete specimens.',
        'Phase 4: Interim Evaluation & Defense - Compiling interim project report according to NIT Goa guidelines, defense presentation before the departmental evaluation committee.'
      ],
      textbooks: [
        'NIT Goa Civil Engineering B.Tech Project Manual',
        'Bureau of Indian Standards (IS 456, IS 800, IS 1893)'
      ]
    },
    'CV402': {
      code: 'CV402',
      name: 'Comprehensive Exam',
      type: 'Theory',
      credits: 3,
      ltp: '0-0-0',
      teachingSlot: 'Self-Study & Viva',
      examSlot: 'Viva Voce',
      coordinator: 'Dr. Aparup Biswal',
      shortName: 'AB',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Comprehensive Assessment',
      email: 'aparup@nitgoa.ac.in',
      room: 'Room 69',
      category: 'core',
      notes: 'Comprehensive viva across structural engineering, fluid mechanics, surveying, soil mechanics, and transportation engineering.',
      modules: [
        'Domain 1: Structural Engineering & Mechanics - Stress-strain relations, bending and shear stresses, deflection of determinate and indeterminate beams, slope deflection and moment distribution methods, RCC limit state design (IS 456), structural steel design (IS 800).',
        'Domain 2: Geotechnical & Foundation Engineering - Phase relations, index properties, soil classification, permeability, effective stress, Terzaghi 1D consolidation theory, Mohr-Coulomb shear strength, lateral earth pressure, shallow and deep foundation bearing capacity.',
        'Domain 3: Fluid Mechanics & Water Resources - Fluid properties, hydrostatic pressure, Bernoulli equation, viscous pipe flow, Darcy-Weisbach friction, open channel flow (Manning formula, hydraulic jump), hydrological cycle, unit hydrograph, water and wastewater treatment processes.',
        'Domain 4: Transportation Engineering & Surveying - Highway geometric design (stopping sight distance, super-elevation, horizontal and vertical curves), pavement materials (CBR, aggregates, bitumen), levelling, theodolite traversing, tachometry, contouring.'
      ],
      textbooks: [
        'GATE Civil Engineering Syllabus and Reference Texts',
        'B.C. Punmia, "Surveying and Soil Mechanics", Laxmi Publications',
        'S. Ramamrutham, "Theory of Structures", Dhanpat Rai'
      ]
    }
  },
  schedule: buildInstituteMasterSchedule({
    prefix: 'cve7',
    room: 'Room 69',
    slotA: 'HS350',
    slotB: 'CV538',
    slotC: 'CV535',
    slotD: 'CV518',
    slotE: 'CV525',
    slotF: 'CV537',
    labTue: { code: 'CV400', name: 'Major Project - I (Dr. Aparup Biswal)', room: 'Room 69 / Civil Project Lab' },
    notesTueLab: 'Dr. Aparup Biswal (AB) - Major Project - I Evaluation',
    customSaturdayFocus: 'Geotechnical & Structural Dynamics Research Review',
  })
};

// ==========================================
// 7th Semester (4th Year Odd) - ECE (Room 5)
// Faculty Advisor: Dr. Shivnarayan Patidar (shivnarayan.patidar@nitgoa.ac.in)
// ==========================================
export const ECE_7: SemesterData = {
  courses: {
    'EC521': {
      code: 'EC521',
      name: 'Advanced Analog IC Design (Elective - V)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Nithin Kumar YB',
      shortName: 'NKY',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Analog IC Design, Low Voltage Circuits, Data Converters',
      email: 'nithinkumar@nitgoa.ac.in',
      room: 'Room 5',
      category: 'elective',
      notes: 'Teaching Slot A. MOS current mirrors, folded cascode op-amps, bandgap references, continuous-time and switched-capacitor filters.',
      modules: [
        'Module 1: Sub-Micron MOS Physics & Current Mirrors - Short-channel MOS effects, velocity saturation, channel length modulation; advanced current mirrors (cascode, high-swing, Wilson), matching considerations, active loads.',
        'Module 2: High-Gain Operational Amplifiers - Telescopic and folded cascode operational amplifiers, output swing limitations, common-mode feedback (CMFB) circuits, slew rate, power supply rejection ratio (PSRR).',
        'Module 3: Stability & Frequency Compensation - Multi-pole amplifier frequency response, Miller compensation, pole splitting, lead-lag compensation, phase margin, settling time, two-stage and three-stage op-amp topologies.',
        'Module 4: Voltage References & Switched-Capacitor Circuits - Temperature-independent references, PTAT and CTAT generation, bandgap voltage reference circuits; switched-capacitor integrators, sampling switches, clock feedthrough and charge injection cancellation.'
      ],
      textbooks: [
        'Behzad Razavi, "Design of Analog CMOS Integrated Circuits", 2nd Edition, McGraw-Hill',
        'Paul R. Gray, Paul J. Hurst, Stephen H. Lewis, Robert G. Meyer, "Analysis and Design of Analog Integrated Circuits", Wiley'
      ]
    },
    'EC506': {
      code: 'EC506',
      name: 'Information Theory and Coding (Elective - III)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Trilochan Panigrahi',
      shortName: 'TP',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Information Theory, Error Control Coding, Wireless Networks',
      email: 'tpanigrahi@nitgoa.ac.in',
      room: 'Room 5',
      category: 'elective',
      notes: 'Teaching Slot B. Shannon entropy, mutual information, channel capacity theorem, linear block codes, cyclic codes, convolutional codes, Viterbi decoding.',
      modules: [
        'Module 1: Information Measures & Source Coding - Uncertainty and information, Shannon entropy, joint and conditional entropy, mutual information; source coding theorem, Huffman coding, Shannon-Fano-Elias coding, Lempel-Ziv coding.',
        'Module 2: Channel Capacity & Continuous Channels - Discrete Memoryless Channels (DMC), channel coding theorem, capacity of Binary Symmetric Channel (BSC) and Binary Erasure Channel (BEC); differential entropy, Shannon-Hartley theorem for AWGN channels.',
        'Module 3: Linear Block Codes & Cyclic Codes - Generator and parity-check matrices, syndrome decoding, Hamming codes, dual codes; cyclic codes, polynomial representation, shift register encoders, syndrome computation, BCH and Reed-Solomon codes.',
        'Module 4: Convolutional Codes & Modern Coding Schemes - Convolutional encoders, state diagram, trellis diagram; Maximum Likelihood Decoding and Viterbi algorithm, soft-decision decoding, puncturing; introduction to Turbo codes and Low-Density Parity-Check (LDPC) codes.'
      ],
      textbooks: [
        'Thomas M. Cover, Joy A. Thomas, "Elements of Information Theory", 2nd Edition, Wiley-Interscience',
        'Shu Lin, Daniel J. Costello, "Error Control Coding", 2nd Edition, Pearson'
      ]
    },
    'EC501': {
      code: 'EC501',
      name: 'Biomedical Signal Processing (Elective - III)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Shivnarayan Patidar',
      shortName: 'SP',
      facultyDesignation: 'Associate Professor & Faculty Advisor (ECE)',
      facultyResearch: 'Biomedical Engineering, ECG/EEG Processing, Machine Learning',
      email: 'shivnarayan.patidar@nitgoa.ac.in',
      room: 'Room 5',
      category: 'elective',
      notes: 'Teaching Slot C. Bioelectric potentials (ECG, EEG, EMG), baseline wander and noise filtering, QRS detection (Pan-Tompkins), wavelets, biomedical classification.',
      modules: [
        'Module 1: Genesis of Physiological Signals & Bio-potentials - Origin of bioelectric action potentials, resting membrane potentials; ECG, EEG, EMG waveforms; electrode-tissue interface, instrumentation amplifier design, noise sources and motion artifacts.',
        'Module 2: Bio-Signal Conditioning & Adaptive Filtering - Baseline wander suppression, 50/60 Hz power-line notch filtering; adaptive noise cancellation (LMS and RLS algorithms) for maternal ECG extraction and electromyographic noise reduction.',
        'Module 3: ECG Feature Extraction & Rhythm Analysis - Detection of fiducial points, Pan-Tompkins QRS detection algorithm, heart rate variability (HRV) time-domain and frequency-domain analysis; sleep EEG rhythm analysis (alpha, beta, theta, delta waves).',
        'Module 4: Advanced Time-Frequency Methods & Pattern Recognition - Continuous and Discrete Wavelet Transforms (CWT/DWT) for transient detection; empirical mode decomposition (EMD); machine learning classification of cardiac arrhythmias using SVM and neural networks.'
      ],
      textbooks: [
        'Rangaraj M. Rangayyan, "Biomedical Signal Analysis", 2nd Edition, Wiley-IEEE Press',
        'Willis J. Tompkins, "Biomedical Digital Signal Processing", Prentice Hall'
      ]
    },
    'EC515': {
      code: 'EC515',
      name: 'Microwave Devices and Circuits (Elective - IV)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Anirban Chatterjee',
      shortName: 'AC',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Microwaves, Antennas, S-parameters',
      email: 'anirban.chatterjee@nitgoa.ac.in',
      room: 'Room 5',
      category: 'elective',
      notes: 'Teaching Slot D. S-parameter matrix, microwave waveguides, microstrip lines, power dividers (Wilkinson), directional couplers, microwave amplifiers.',
      modules: [
        'Module 1: Microwave Transmission Lines & Network Analysis - High-frequency transmission line theory, Smith chart impedance matching (single and double stub); Scattering parameters (S-matrix), properties of reciprocal and lossless networks, signal flow graphs.',
        'Module 2: Microwave Passive Components - Waveguide T-junctions, E-plane and H-plane tees, Magic Tee; directional couplers (Bethe hole, branch line), Wilkinson power dividers, ferrite circulators and isolators.',
        'Module 3: Solid-State Microwave Devices - Transferred electron devices (Gunn diode, domain formation), avalanche transit-time devices (IMPATT, TRAPATT, BARITT diodes), parametric amplifiers, Schottky barrier diodes, PIN diodes for RF switching.',
        'Module 4: Microwave Amplifiers & Resonators - Microwave bipolar and FET amplifiers, two-port power gains, stability circles, low-noise amplifier (LNA) design; rectangular and circular cavity resonators, quality factor (Q), microstrip planar filters.'
      ],
      textbooks: [
        'David M. Pozar, "Microwave Engineering", 4th Edition, John Wiley & Sons',
        'Samuel Y. Liao, "Microwave Devices and Circuits", 3rd Edition, Pearson'
      ]
    },
    'EC852': {
      code: 'EC852',
      name: 'Optimization Techniques (Elective - V)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Mallikarjun Erramshetty',
      shortName: 'EM',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Mathematical Optimization, Convex Optimization',
      email: 'mallikarjun.e@nitgoa.ac.in',
      room: 'Room 5',
      category: 'elective',
      notes: 'Teaching Slot E. Convex sets, linear programming (Simplex), unconstrained optimization (gradient descent, Newton-Raphson), KKT conditions, genetic algorithms.',
      modules: [
        'Module 1: Convex Sets, Functions & Problem Formulation - Affine and convex sets, hyperplanes, convex cones; convex functions, epigraphs, Jensen inequality; formulation of optimization problems in signal processing and communication systems.',
        'Module 2: Linear Programming & Duality Theory - Standard form linear programming, geometry of linear programs, Simplex algorithm and two-phase method; duality theory, weak and strong duality, dual Simplex method.',
        'Module 3: Unconstrained & Constrained Non-Linear Optimization - Unconstrained optimization: line search methods, gradient descent, Newton method, BFGS quasi-Newton; constrained optimization: Lagrange multipliers, Karush-Kuhn-Tucker (KKT) first and second order optimality conditions.',
        'Module 4: Interior-Point Methods & Evolutionary Algorithms - Barrier methods, primal-dual interior point algorithms; nature-inspired metaheuristics: Genetic Algorithms (GA), Particle Swarm Optimization (PSO), applications in antenna array synthesis and wireless resource allocation.'
      ],
      textbooks: [
        'Stephen Boyd, Lieven Vandenberghe, "Convex Optimization", Cambridge University Press',
        'Singiresu S. Rao, "Engineering Optimization: Theory and Practice", 5th Edition, Wiley'
      ]
    },
    'EC517': {
      code: 'EC517',
      name: 'VLSI Testing and Testability (Elective - IV)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'F',
      examSlot: 'F',
      coordinator: 'Dr. Vasantha MH',
      shortName: 'VMH',
      facultyDesignation: 'Professor (ECE)',
      facultyResearch: 'VLSI Testing, Fault Modeling, Built-In Self-Test',
      email: 'vasanthamh@nitgoa.ac.in',
      room: 'Room 5',
      category: 'elective',
      notes: 'Teaching Slot F. Stuck-at fault modeling, ATPG (D-algorithm, PODEM), scan path architectures, Built-In Self-Test (BIST), boundary scan (IEEE 1149.1).',
      modules: [
        'Module 1: Fault Modeling in VLSI Circuits - Physical defects, fault equivalence and fault dominance; single and multiple stuck-at fault models, bridging faults, transistor open and short faults, delay fault modeling.',
        'Module 2: Test Generation for Combinational & Sequential Logic - Fault simulation algorithms (serial, parallel, deductive, concurrent); Automatic Test Pattern Generation (ATPG): D-algorithm, PODEM, FAN algorithm; sequential ATPG challenges.',
        'Module 3: Design for Testability (DFT) & Scan Architectures - Controllability and observability measures (SCOAP); ad-hoc testability techniques; structured DFT: full-scan and partial-scan design, scan flip-flop architectures, boundary scan standard (IEEE 1149.1 / JTAG).',
        'Module 4: Built-In Self-Test (BIST) & Memory Testing - BIST architecture, test pattern generation with Linear Feedback Shift Registers (LFSR), response compression (signature analysis, MISR); RAM testing: March tests, memory BIST (MBIST).'
      ],
      textbooks: [
        'M. L. Bushnell, V. D. Agrawal, "Essentials of Electronic Testing for Digital, Memory and Mixed-Signal VLSI Circuits", Springer',
        'Niranjan K. Jha, Sandeep Gupta, "Testing of Digital Systems", Cambridge University Press'
      ]
    },
    'EC901': {
      code: 'EC901',
      name: 'Mathematical Foundation for AI and ML (Open Elective)',
      type: 'Open Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'Open Elective (Slot H)',
      examSlot: 'H',
      coordinator: 'Dr. Trilochan Panigrahi',
      shortName: 'TP',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Machine Learning Mathematics',
      email: 'tpanigrahi@nitgoa.ac.in',
      room: 'Room 5',
      category: 'open_elective',
      notes: 'Institute open elective: Linear algebra (SVD, PCA), multivariate calculus, probability distributions, convex optimization for machine learning algorithms.',
      modules: [
        'Module 1: Linear Algebra & Matrix Decompositions - Vector spaces, linear independence, basis and dimension; inner products, orthogonal projections, Gram-Schmidt orthogonalization; eigenvalues and eigenvectors, Singular Value Decomposition (SVD), Principal Component Analysis (PCA).',
        'Module 2: Multivariate Calculus & Optimization - Vector-valued functions, Jacobian and Hessian matrices; directional derivatives, multivariable chain rule; unconstrained optimization, gradient descent, stochastic gradient descent (SGD), momentum, Adam optimizer.',
        'Module 3: Probability & Random Variables - Joint, marginal, and conditional probabilities, Bayes theorem; discrete and continuous distributions (Gaussian, Bernoulli, Multinomial); expectation, covariance matrices, multivariate Gaussian distributions.',
        'Module 4: Statistical Inference & Information Measures - Maximum Likelihood Estimation (MLE), Maximum A Posteriori (MAP) estimation; Kullback-Leibler (KL) divergence, cross-entropy loss, Bayesian linear regression, applications to neural network loss formulations.'
      ],
      textbooks: [
        'Marc Peter Deisenroth, A. Aldo Faisal, Cheng Soon Ong, "Mathematics for Machine Learning", Cambridge University Press',
        'Gilbert Strang, "Linear Algebra and Learning from Data", Wellesley-Cambridge Press'
      ]
    },
    'HS350': {
      code: 'HS350',
      name: 'Industrial Economics',
      type: 'Theory',
      credits: 1,
      ltp: '1-0-0',
      teachingSlot: 'Friday 16:00 - 16:55 (Slot MLC)',
      examSlot: 'Friday MLC',
      coordinator: 'Dr. Sunil Kumar A',
      shortName: 'SKA',
      facultyDesignation: 'Assistant Professor (Humanities)',
      facultyResearch: 'Economics',
      email: 'sunilkumar@nitgoa.ac.in',
      room: 'Room 5',
      category: 'mlc',
      notes: 'Economic feasibility, corporate costing, and investment appraisal.',
      modules: [
        'Module 1: Foundations of Engineering Economics & Demand Analysis - Law of supply and demand, price elasticity, market forecasting for consumer electronics and semiconductor products.',
        'Module 2: Production & Cost Theory - Short-run and long-run cost functions, economies of scale in VLSI fabrication and assembly, break-even analysis.',
        'Module 3: Market Structures & Pricing Policies - Perfect competition, monopoly, oligopolistic competition in telecom markets, cost-plus and technology-skimming pricing.',
        'Module 4: Capital Budgeting & Project Appraisal - Time value of money, discounted cash flows, Net Present Value (NPV), Internal Rate of Return (IRR), Benefit-Cost ratio, equipment depreciation.'
      ],
      textbooks: [
        'R. Paneerselvam, "Engineering Economics", 2nd Edition, Prentice Hall of India',
        'Leland Blank and Anthony Tarquin, "Engineering Economy", McGraw-Hill'
      ]
    },
    'EC400': {
      code: 'EC400',
      name: 'Major Project - I',
      type: 'Practical',
      credits: 4,
      ltp: '0-0-6',
      teachingSlot: 'Project Slot (Mon / Thu)',
      examSlot: 'Project Evaluation',
      coordinator: 'Dr. Trilochan Panigrahi',
      shortName: 'TP',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Capstone Mentorship',
      email: 'tpanigrahi@nitgoa.ac.in',
      room: 'ECE Research Lab',
      category: 'lab',
      notes: 'Hardware or simulation capstone in VLSI, Signal Processing, Embedded IoT, or Wireless Communications.',
      modules: [
        'Phase 1: Project Formulation & Literature Survey - Formulating core engineering objective in VLSI, DSP, communications, or embedded systems; critical review of IEEE transactions and patents.',
        'Phase 2: Architectural Modeling & Simulation - System architectural block diagram, schematic design, RTL Verilog/VHDL modeling or MATLAB/Python algorithmic simulation.',
        'Phase 3: Hardware Implementation & Benchmarking - Cadence/Synopsys circuit synthesis or FPGA/microcontroller hardware benchtop testing, preliminary experimental metric validation.',
        'Phase 4: Interim Evaluation & Defense - Interim thesis documentation following NIT Goa style guidelines, presentation before departmental project review committee.'
      ],
      textbooks: [
        'NIT Goa ECE Capstone Project Guidelines',
        'David F. Beer, David McMurrey, "A Guide to Writing as an Engineer", John Wiley'
      ]
    },
    'EC402': {
      code: 'EC402',
      name: 'Comprehensive Exam',
      type: 'Theory',
      credits: 3,
      ltp: '0-0-0',
      teachingSlot: 'Self-Study & Viva',
      examSlot: 'Viva Voce',
      coordinator: 'Dr. Prashanth GR',
      shortName: 'PGR',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Comprehensive Assessment',
      email: 'grprashanth@nitgoa.ac.in',
      room: 'Room 5',
      category: 'core',
      notes: 'Comprehensive viva on Analog/Digital Communication, DSP, Electronic Devices, Circuits, and Microprocessors.',
      modules: [
        'Domain 1: Signals, Systems & Networks - Continuous and discrete-time signals, LTI systems, Fourier series and transforms, Laplace and Z-transforms, DFT/FFT, FIR/IIR digital filter design; network theorems, transient analysis, two-port networks.',
        'Domain 2: Electronic Devices & Analog Circuits - Energy bands, carrier transport, PN junction diode, Zener diode, BJT, MOSFET physics and biasing; small-signal amplifiers, frequency response, feedback amplifiers, op-amp configurations.',
        'Domain 3: Digital Circuits & Embedded Microprocessors - Boolean algebra, logic gates, combinational circuits (multiplexers, decoders, adders), sequential circuits (latches, flip-flops, counters), finite state machines, 8085/8086 microprocessors, memory interfacing.',
        'Domain 4: Communications & Electromagnetics - Amplitude, frequency, and phase modulation; digital modulation (BPSK, QPSK, QAM), noise in communication systems, channel capacity; Maxwell equations, plane waves, transmission lines, Smith charts, antennas.'
      ],
      textbooks: [
        'GATE Electronics and Communication Engineering Reference Texts',
        'Simon Haykin, "Communication Systems", Wiley',
        'Adel S. Sedra, Kenneth C. Smith, "Microelectronic Circuits", Oxford University Press'
      ]
    }
  },
  schedule: buildInstituteMasterSchedule({
    prefix: 'ece7',
    room: 'Room 5',
    slotB: 'EC517',
    slotC: 'EC501',
    slotD: 'EC506',
    slotE: 'EC521',
    slotF: 'EC515',
    slotG_Minor: 'EC400M',
    slotH_OpenElective: 'IKS351',
    labThu: { code: 'EC402', name: 'Major Project - I (Dr. Shivnarayan Patidar)', room: 'Room 5 / ECE Research Lab' },
    notesThuLab: 'Dr. Shivnarayan Patidar (SP) - Major Project - I Capstone Review',
    customSaturdayFocus: 'Advanced VLSI Testing & Information Theory Clinics',
  })
};

// ==========================================
// 7th Semester (4th Year Odd) - EEE (Room 8/9)
// Faculty Advisor: Dr. C. Vyjayanthi (c.vyjayanthi@nitgoa.ac.in)
// ==========================================
export const EEE_7: SemesterData = {
  courses: {
    'EE514': {
      code: 'EE514',
      name: 'Smart Electric Grids (Elective - III)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. C. Vyjayanthi',
      shortName: 'CV',
      facultyDesignation: 'Associate Professor & Faculty Advisor (EEE)',
      facultyResearch: 'Smart Grid Architectures, Microgrids, Phasor Measurement Units (PMUs)',
      email: 'c.vyjayanthi@nitgoa.ac.in',
      room: 'Room 8/9',
      category: 'elective',
      notes: 'Teaching Slot B. Smart grid drivers, Advanced Metering Infrastructure (AMI), Phasor Measurement Units (PMUs), Wide Area Measurement Systems (WAMS), demand response, microgrid control.',
      modules: [
        'Module 1: Smart Grid Concept & Architecture - Evolution from legacy grid to smart grid, National and International smart grid visions, Smart grid communication layers, cyber-security concerns.',
        'Module 2: Sensing & Measurement - Smart meters, Advanced Metering Infrastructure (AMI), Phasor Measurement Units (PMUs), synchrophasor standards (IEEE C37.118), Wide Area Monitoring Systems (WAMS).',
        'Module 3: Demand Side Management & Pricing - Demand response programs, peak clipping, valley filling, dynamic pricing models: Time of Use (TOU), Real Time Pricing (RTP), Critical Peak Pricing (CPP).',
        'Module 4: Microgrid Control & Protection - Islanded and grid-connected microgrids, droop control for distributed energy resources, microgrid protection challenges, bi-directional power flow.'
      ],
      textbooks: [
        'James Momoh, "Smart Grid: Fundamentals of Design and Analysis", Wiley-IEEE Press',
        'Janaka Ekanayake et al., "Smart Grid: Technology and Applications", Wiley'
      ]
    },
    'EE531': {
      code: 'EE531',
      name: 'Electric Vehicles (Elective - III)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. Shanta Hardas Patil',
      shortName: 'SHP',
      facultyDesignation: 'Assistant Professor (EEE)',
      facultyResearch: 'Electric Vehicle Powertrains, Battery Management Systems',
      email: 'shanta@nitgoa.ac.in',
      room: 'Room 8/9',
      category: 'elective',
      notes: 'Teaching Slot C. EV vehicle dynamics, traction motor selection (BLDC, PMSM, induction), battery chemistry (Li-ion, LFP), Battery Management Systems (BMS), charging topologies (AC Level 2, DC Fast Charging).',
      modules: [
        'Module 1: Vehicle Dynamics & Propulsion - Tractive effort equations (rolling, aerodynamic, gradient, acceleration resistance), drive cycles (NEDC, WLTP), transmission sizing.',
        'Module 2: EV Traction Motors & Drives - Selection criteria, Brushless DC (BLDC) motor drives, Permanent Magnet Synchronous Motor (PMSM) vector control, regenerative braking mechanics.',
        'Module 3: Battery Technologies & BMS - Lithium-ion and LFP cell chemistry, equivalent circuit battery models, State of Charge (SOC) estimation using Kalman filter, cell balancing methods.',
        'Module 4: EV Charging Infrastructure - On-board and off-board chargers, wireless inductive charging, DC fast charging protocols (CCS, CHAdeMO), vehicle-to-grid (V2G) power transfer.'
      ],
      textbooks: [
        'Mehrdad Ehsani, Yimin Gao, Stefano Longo, Kambiz M. Ebrahimi, "Modern Electric, Hybrid Electric, and Fuel Cell Vehicles", CRC Press',
        'Iqbal Husain, "Electric and Hybrid Vehicles: Design Fundamentals", CRC Press'
      ]
    },
    'EE552': {
      code: 'EE552',
      name: 'Optimization Techniques (Elective - IV)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Ms. Shefali Painuli',
      shortName: 'SP',
      facultyDesignation: 'Faculty (Department of EEE)',
      facultyResearch: 'Power System Optimization, Metaheuristics',
      email: 'shefali@nitgoa.ac.in',
      room: 'Room 8/9',
      category: 'elective',
      notes: 'Teaching Slot D. Classical optimization, Lagrange multipliers, Kuhn-Tucker conditions, linear programming, nonlinear programming, Particle Swarm Optimization (PSO) for power systems.',
      modules: [
        'Module 1: Classical Optimization - Single and multivariable unconstrained optimization, Hessian matrix, constrained optimization with equality constraints (Lagrangian multipliers).',
        'Module 2: Non-Linear Optimization - Kuhn-Tucker (KKT) conditions, gradient-based methods: Steepest Descent, Newton method, Conjugate Gradient.',
        'Module 3: Linear & Integer Programming - Simplex algorithm, duality in linear programming, Branch and Bound algorithm for integer programming.',
        'Module 4: Metaheuristics in Power Engineering - Genetic Algorithms (GA), Particle Swarm Optimization (PSO) applied to Economic Load Dispatch and Optimal Power Flow (OPF).'
      ],
      textbooks: ['Singiresu S. Rao, "Engineering Optimization: Theory and Practice", 5th Edition, Wiley']
    },
    'EE560': {
      code: 'EE560',
      name: 'VLSI Technology (Elective - IV)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Ms. Shefali Painuli',
      shortName: 'SP',
      facultyDesignation: 'Faculty (Department of EEE)',
      facultyResearch: 'VLSI Fabrication Processes, Semiconductor Physics',
      email: 'shefali@nitgoa.ac.in',
      room: 'Room 8/9',
      category: 'elective',
      notes: 'Teaching Slot E. Cleanroom environments, silicon wafer preparation (Czochralski crystal growth), thermal oxidation, photolithography, chemical vapor deposition (CVD), ion implantation, and metallization.',
      modules: [
        'Module 1: Crystal Growth & Wafer Preparation - Czochralski crystal pulling technique, float-zone method, wafer slicing, polishing, cleanroom classifications (Class 10/100).',
        'Module 2: Thermal Oxidation & Diffusion - Deal-Grove oxidation model, wet and dry oxidation, Fick diffusion laws, constant-source and limited-source diffusion profiles.',
        'Module 3: Photolithography & Etching - Optical lithography, photoresists (positive and negative), cleanroom masks, wet chemical etching vs dry plasma/reactive ion etching (RIE).',
        'Module 4: Thin Film Deposition & Metallization - Chemical Vapor Deposition (APCVD, LPCVD, PECVD), physical sputtering, vacuum evaporation, aluminum and copper interconnects, CMP.'
      ],
      textbooks: ['S. M. Sze, "VLSI Technology", 2nd Edition, McGraw-Hill', 'James D. Plummer, Michael D. Deal, Peter B. Griffin, "Silicon VLSI Technology", Pearson']
    },
    'EE903': {
      code: 'EE903',
      name: 'Electric Vehicle Technology (Open Elective)',
      type: 'Open Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'Open Elective (Slot H)',
      examSlot: 'H',
      coordinator: 'Dr. Shanta Hardas Patil',
      shortName: 'SHP',
      facultyDesignation: 'Assistant Professor (EEE)',
      facultyResearch: 'Clean Transportation & EV Tech',
      email: 'shanta@nitgoa.ac.in',
      room: 'Room 8/9',
      category: 'open_elective',
      notes: 'Institute open elective for non-EEE students: Fundamentals of electric vehicles, battery chemistries, motor configurations, EV charging levels, and environmental life-cycle analysis.',
      modules: [
        'Module 1: Electric Vehicle Architecture & Dynamics - Historical background, EV classifications (HEV, PHEV, BEV, FCEV); vehicle dynamics, rolling resistance, aerodynamic drag, grading resistance, tractive effort curves, energy consumption per kilometer.',
        'Module 2: EV Electric Motors & Powertrains - Comparison of traction motors (DC series, induction, BLDC, Permanent Magnet Synchronous Motors); regenerative braking principles, power converter topology for motor control, single and multi-gear transmissions.',
        'Module 3: Battery Energy Storage & BMS - Battery chemistry fundamentals (Lead-acid, NiMH, Lithium-ion, LFP, NMC), battery pack configuration (cells in series-parallel); Battery Management System (BMS) roles: state of charge (SOC) estimation, thermal runaway prevention, cell balancing.',
        'Module 4: EV Charging Infrastructure & Grid Integration - AC Level 1, Level 2, and DC Fast Charging standards (CCS-2, CHAdeMO, GB/T); wireless inductive power transfer; smart charging, Vehicle-to-Grid (V2G) concepts, environmental well-to-wheel emissions lifecycle analysis.'
      ],
      textbooks: [
        'Mehrdad Ehsani, Yimin Gao, Stefano Longo, Kambiz M. Ebrahimi, "Modern Electric, Hybrid Electric, and Fuel Cell Vehicles", CRC Press',
        'Iqbal Husain, "Electric and Hybrid Vehicles: Design Fundamentals", CRC Press'
      ]
    },
    'HS350': {
      code: 'HS350',
      name: 'Industrial Economics',
      type: 'Theory',
      credits: 1,
      ltp: '1-0-0',
      teachingSlot: 'Friday 16:00 - 16:55 (Slot MLC)',
      examSlot: 'Friday MLC',
      coordinator: 'Dr. Sunil Kumar A',
      shortName: 'SKA',
      facultyDesignation: 'Assistant Professor (Humanities)',
      facultyResearch: 'Economics and Industrial Management',
      email: 'sunilkumar@nitgoa.ac.in',
      room: 'Room 8/9',
      category: 'mlc',
      notes: 'Financial evaluation, tariff calculations, power project feasibility, and capital investment appraisal.',
      modules: [
        'Module 1: Foundations of Engineering Economics & Demand Analysis - Law of supply and demand, price elasticity, load forecasting and power demand projections.',
        'Module 2: Production & Cost Theory - Short-run and long-run cost curves, economies of scale in power generation and grid transmission, break-even analysis.',
        'Module 3: Market Structures & Electricity Tariffs - Monopoly vs deregulated power markets; electricity tariff formulation: flat rate, block meter, two-part, maximum demand, time-of-use (TOU) tariffs.',
        'Module 4: Capital Budgeting & Investment Appraisal - Time value of money, discounted cash flows, Net Present Value (NPV), Internal Rate of Return (IRR), Payback Period for renewable energy installations, transformer and asset depreciation.'
      ],
      textbooks: [
        'R. Paneerselvam, "Engineering Economics", 2nd Edition, Prentice Hall of India',
        'Leland Blank and Anthony Tarquin, "Engineering Economy", McGraw-Hill'
      ]
    },
    'EE400': {
      code: 'EE400',
      name: 'Major Project - I',
      type: 'Practical',
      credits: 4,
      ltp: '0-0-6',
      teachingSlot: 'Project Slot (Mon / Thu)',
      examSlot: 'Project Evaluation',
      coordinator: 'Dr. C. Vyjayanthi',
      shortName: 'CV',
      facultyDesignation: 'Associate Professor & HoD (EEE)',
      facultyResearch: 'Capstone Mentorship',
      email: 'c.vyjayanthi@nitgoa.ac.in',
      room: 'Power Systems / Hardware Lab',
      category: 'lab',
      notes: 'Electrical engineering capstone: hardware prototype or deep simulation in Smart Grids, Power Converters, Motor Drives, or Renewable Integration.',
      modules: [
        'Phase 1: Project Scope Formulation & Literature Review - Identifying technical problem in smart grids, renewable energy, power converters, or EV drives; exhaustive IEEE Transactions literature review.',
        'Phase 2: Mathematical Modeling & Simulation - Deriving differential equations, MATLAB/Simulink/PLECS circuit simulation, controller design and stability verification.',
        'Phase 3: Hardware Testbench Development - Gate driver circuitry, PCB layout design, sensor interfacing, DSP/microcontroller programming for PWM generation, preliminary experimental testing.',
        'Phase 4: Interim Evaluation & Defense - Documentation of interim project report per NIT Goa academic standards, defense presentation before departmental faculty panel.'
      ],
      textbooks: [
        'NIT Goa EEE Capstone Project Handbook',
        'David F. Beer, David McMurrey, "A Guide to Writing as an Engineer", John Wiley'
      ]
    },
    'EE402': {
      code: 'EE402',
      name: 'Comprehensive Exam',
      type: 'Theory',
      credits: 3,
      ltp: '0-0-0',
      teachingSlot: 'Self-Study & Viva',
      examSlot: 'Viva Voce',
      coordinator: 'Dr. Suresh Mikkili',
      shortName: 'SM',
      facultyDesignation: 'Associate Professor (EEE)',
      facultyResearch: 'Comprehensive Assessment',
      email: 'mikkili.suresh@nitgoa.ac.in',
      room: 'Room 8/9',
      category: 'core',
      notes: 'Comprehensive viva voce covering Circuit Theory, Electrical Machines I & II, Power Systems, Control Systems, and Power Electronics.',
      modules: [
        'Domain 1: Electric Circuits & Electromagnetic Fields - Mesh and nodal analysis, network theorems (Thevenin, Norton, Superposition, Maximum Power Transfer), transient response of RL, RC, RLC circuits, two-port networks, Gauss law, Ampere law, magnetic boundary conditions, Biot-Savart law.',
        'Domain 2: Electrical Machines - Single-phase and three-phase transformers (equivalent circuits, phasor diagrams, efficiency, regulation), DC machines (armature reaction, speed control, braking), 3-phase induction motors (torque-slip curves, starting methods), synchronous machines (salient and cylindrical rotor models, V-curves).',
        'Domain 3: Power Systems & Protection - Overhead line parameters, ABCD constants, per-unit representation, power flow analysis (Gauss-Seidel, Newton-Raphson), symmetrical and unsymmetrical fault calculations, overcurrent and distance relays, circuit breakers.',
        'Domain 4: Control Systems & Power Electronics - Transfer functions, block diagram reduction, Routh-Hurwitz stability, root locus, Bode and Nyquist plots, state-space representations; power semiconductor devices (SCR, MOSFET, IGBT), phase-controlled rectifiers, DC-DC choppers (buck, boost, buck-boost), voltage source inverters (VSI).'
      ],
      textbooks: [
        'GATE Electrical Engineering Syllabi and Reference Texts',
        'I. J. Nagrath, D. P. Kothari, "Electric Machines", McGraw-Hill',
        'Ned Mohan, Tore M. Undeland, William P. Robbins, "Power Electronics: Converters, Applications, and Design", Wiley'
      ]
    }
  },
  schedule: buildInstituteMasterSchedule({
    prefix: 'eee7',
    room: 'Room 8/9',
    slotB: 'EE514',
    slotC: 'EE531',
    slotD: 'EE552',
    slotE: 'EE560',
    slotH_OpenElective: 'EE903',
    mlcFriday: 'HS350',
    labThu: { code: 'EE400', name: 'Major Project - I (Dr. C. Vyjayanthi)', room: 'Room 8/9 / Power Systems Lab' },
    notesThuLab: 'Dr. C. Vyjayanthi (CV) - Major Project - I Review',
    customSaturdayFocus: 'Smart Grids & Electric Vehicle Power Converters Seminar',
  })
};

// ==========================================
// 7th Semester (4th Year Odd) - Mechanical (Room 30/31)
// Faculty Advisor: Dr. Chaitanya Vundru (chaitanya.vundru@nitgoa.ac.in)
// ==========================================
export const ME_7: SemesterData = {
  courses: {
    'ME518': {
      code: 'ME518',
      name: 'Micro-Nano Manufacturing Processes (Elective - V)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Gurkirat Singh',
      shortName: 'GS',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Micro-machining, Precision Engineering, Advanced Manufacturing',
      email: 'gurkirat@nitgoa.ac.in',
      room: 'Room 30/31',
      category: 'elective',
      notes: 'Teaching Slot A. Micro-EDM, micro-USM, laser micro-machining, photolithography, cleanroom fabrication, nano-finishing processes.',
      modules: [
        'Module 1: Foundations of Micro-Manufacturing & Scaling Effects - Definition, miniaturization drivers, scaling laws in manufacturing; size effect in micro-cutting, minimum chip thickness, micro-tool fabrication using micro-grinding and EDM wire electro-discharge grinding.',
        'Module 2: Advanced Thermal & Beam Micro-Machining - Micro-EDM (spark energy regimes, RC and transistor circuits, dielectric fluids), micro-wire EDM; Laser Beam Micro-Machining (excimer and femtosecond laser ablation, thermal HAZ minimization); electron beam micro-machining.',
        'Module 3: Chemical, Electrochemical & Lithographic Processes - Photolithography (positive/negative resists, mask aligners), wet chemical anisotropic etching of silicon (KOH, TMAH), Deep Reactive Ion Etching (DRIE / Bosch process), LIGA and micro-electroforming.',
        'Module 4: Nano-Finishing & Precision Metrology - Magnetorheological abrasive flow finishing (MRAFF), elastic emission machining (EEM), chemical mechanical polishing (CMP); characterization techniques: Atomic Force Microscopy (AFM), Scanning Electron Microscopy (SEM), optical surface profilometry.'
      ],
      textbooks: [
        'V. K. Jain, "Introduction to Micromachining", 2nd Edition, CRC Press',
        'Mark J. Madou, "Fundamentals of Microfabrication and Nanotechnology", CRC Press'
      ]
    },
    'ME535': {
      code: 'ME535',
      name: 'Computational Fluid Dynamics (Elective - III)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Prasenjit Dey',
      shortName: 'PD',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'CFD, Turbulence Modeling, Thermal Fluids',
      email: 'prasenjit@nitgoa.ac.in',
      room: 'Room 30/31',
      category: 'elective',
      notes: 'Teaching Slot B. Governing equations (Navier-Stokes), finite difference and finite volume methods, SIMPLE algorithm, turbulence models (k-epsilon).',
      modules: [
        'Module 1: Governing Equations & Mathematical Nature of Flow - Conservation equations of mass, momentum (Navier-Stokes), and energy in conservative differential forms; mathematical classification of PDEs (elliptic, parabolic, hyperbolic) and physical boundary conditions.',
        'Module 2: Finite Volume Discretization for Diffusion & Convection - Finite volume method (FVM) for 1D and 2D steady diffusion; convective flux discretization schemes: Central Differencing, Upwind Differencing, Hybrid, and QUICK schemes; false diffusion and boundedness criteria.',
        'Module 3: Pressure-Velocity Coupling & Solution Algorithms - Staggered vs collocated grids; pressure-velocity linkage algorithms: Semi-Implicit Method for Pressure-Linked Equations (SIMPLE), SIMPLER, and PISO; convergence criteria and under-relaxation factors.',
        'Module 4: Turbulence Modeling & Grid Generation - Reynolds-Averaged Navier-Stokes (RANS) equations, Reynolds stresses, Boussinesq eddy viscosity hypothesis; two-equation turbulence models (standard k-epsilon and SST k-omega), near-wall treatment (wall functions); structured and unstructured mesh generation.'
      ],
      textbooks: [
        'H. K. Versteeg, W. Malalasekera, "An Introduction to Computational Fluid Dynamics: The Finite Volume Method", 2nd Edition, Pearson',
        'John D. Anderson Jr., "Computational Fluid Dynamics: The Basics with Applications", McGraw-Hill'
      ]
    },
    'ME513': {
      code: 'ME513',
      name: 'Design for Manufacturing and Assembly (Elective - III)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'C',
      examSlot: 'C',
      coordinator: 'Dr. B Santhi',
      shortName: 'BS',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'DFMA, Product Design, Concurrent Engineering',
      email: 'santhi@nitgoa.ac.in',
      room: 'Room 30/31',
      category: 'elective',
      notes: 'Teaching Slot C. DFMA philosophy, design for casting, forging, welding, injection moulding, Boothroyd-Dewhurst DFA methodology.',
      modules: [
        'Module 1: DFMA Principles & Concurrent Engineering - Engineering design process, concurrent engineering philosophy, integration of design and manufacturing; material and process selection criteria, standard components and modularity.',
        'Module 2: Design for Primary Manufacturing Processes - Design for Sand Casting and Die Casting (parting lines, draft angles, ribs, wall thickness uniformity, coring); Design for Forging (flash allowances, die wear); Design for Sheet Metal Forming (bend radii, relief notches).',
        'Module 3: Design for Machining & Polymer Processing - Design guidelines for turning, milling, and drilling operations (tool accessibility, standardized hole sizes); Design for Injection Moulding (shrinkage compensation, weld lines, gate locations, ejection pins).',
        'Module 4: Boothroyd-Dewhurst DFA & Mistake-Proofing - Boothroyd and Dewhurst DFA index, theoretical minimum part count criteria; design for manual, automated, and robotic assembly; poke-yoke (mistake-proofing) geometric design principles, life-cycle design (DFE and DFR).'
      ],
      textbooks: [
        'Geoffrey Boothroyd, Peter Dewhurst, Winston A. Knight, "Product Design for Manufacture and Assembly", 3rd Edition, CRC Press',
        'David M. Anderson, "Design for Manufacturability: How to Use Concurrent Engineering to Rapidly Develop Low-Cost, High-Quality Products", CRC Press'
      ]
    },
    'ME524': {
      code: 'ME524',
      name: 'Automobile Engineering (Elective - IV)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'D',
      examSlot: 'D',
      coordinator: 'Dr. Siba Prasad Choudhury',
      shortName: 'SPC',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Automotive Systems, Aerodynamics, Vehicle Dynamics',
      email: 'spchoudhury@nitgoa.ac.in',
      room: 'Room 30/31',
      category: 'elective',
      notes: 'Teaching Slot D. Vehicle chassis and body, transmission systems (clutch, manual/automatic gearbox, differential), steering geometry, braking systems (ABS), suspension.',
      modules: [
        'Module 1: Vehicle Architecture & Powertrain Layout - Chassis classification, frameless and monocoque body designs; vehicle aerodynamics; internal combustion engine auxiliary subsystems: MPFI fuel injection, turbocharging, intercooling, Euro VI / Bharat Stage VI emission standards.',
        'Module 2: Transmission & Driveline Systems - Single and multi-plate dry clutches, diaphragm springs; manual synchromesh gearboxes, planetary/epicyclic automatic gearboxes, Continuously Variable Transmissions (CVT); propeller shaft, universal joints, slip joints, differential and limited-slip differential.',
        'Module 3: Steering Geometry & Suspension Systems - Steering mechanics, Ackermann and Davis steering principles, camber, caster, kingpin inclination, toe-in/toe-out, power steering (hydraulic and EPS); independent suspension systems (MacPherson strut, double wishbone), coil springs, torsion bars, anti-roll bars.',
        'Module 4: Braking Systems & Automotive Safety - Drum and disc brakes, hydraulic and pneumatic braking systems; Anti-lock Braking Systems (ABS), Electronic Brakeforce Distribution (EBD), Electronic Stability Program (ESP); active and passive safety features, crash test regulations.'
      ],
      textbooks: [
        'Kirpal Singh, "Automobile Engineering Vol. 1 & 2", 13th Edition, Standard Publishers',
        'William H. Crouse, Donald L. Anglin, "Automotive Mechanics", 10th Edition, McGraw-Hill'
      ]
    },
    'ME512': {
      code: 'ME512',
      name: 'Composite Materials (Elective - IV)',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'E',
      examSlot: 'E',
      coordinator: 'Dr. Abhijit Sarkar',
      shortName: 'AS',
      facultyDesignation: 'Associate Professor (Mechanical)',
      facultyResearch: 'Composites, Micromechanics, Lamina Theory',
      email: 'abhijit.sarkar@nitgoa.ac.in',
      room: 'Room 30/31',
      category: 'elective',
      notes: 'Teaching Slot E. Reinforcements (fibers, particles), polymer/metal/ceramic matrix composites, classical lamination theory, failure criteria (Tsai-Hill, Tsai-Wu).',
      modules: [
        'Module 1: Classification & Matrix-Reinforcement Systems - Definition and classification of composites; fibers (glass, carbon, aramid, natural fibers) and particulate reinforcements; matrix materials (thermosetting polymers, thermoplastics, metal matrices, ceramic matrices); manufacturing methods: hand lay-up, resin transfer moulding (RTM), filament winding, pultrusion.',
        'Module 2: Micromechanics of a Lamina - Volume and mass fractions; rule of mixtures for longitudinal and transverse elastic modulus, Poisson ratio, and shear modulus; Halpin-Tsai empirical relations, stress transfer mechanics, critical fiber length.',
        'Module 3: Macromechanics of an Orthotropic Lamina - Hooke law for anisotropic, monoclinic, and orthotropic materials; plane stress constitutive equations for an orthotropic lamina in principal material axes; coordinate transformation of stresses and strains, transformed stiffness matrix [Q-bar].',
        'Module 4: Classical Lamination Theory & Failure Criteria - Kirchhoff-Love kinematic assumptions for laminates; laminate strain-displacement relationships; derivation of laminate stiffness matrices [A], [B], [D]; symmetric, antisymmetric, and cross-ply laminates; failure theories: Maximum Stress, Maximum Strain, Tsai-Hill, and Tsai-Wu quadratic failure criterion.'
      ],
      textbooks: [
        'Robert M. Jones, "Mechanics of Composite Materials", 2nd Edition, Taylor & Francis',
        'Autar K. Kaw, "Mechanics of Composite Materials", 2nd Edition, CRC Press'
      ]
    },
    'HS300': {
      code: 'HS300',
      name: 'Industrial Economics',
      type: 'Theory',
      credits: 1,
      ltp: '1-0-0',
      teachingSlot: 'Friday 16:00 - 16:55 (Slot MLC)',
      examSlot: 'Friday MLC',
      coordinator: 'Dr. Sunil Kumar A',
      shortName: 'SKA',
      facultyDesignation: 'Assistant Professor (Humanities)',
      facultyResearch: 'Industrial Economics',
      email: 'sunilkumar@nitgoa.ac.in',
      room: 'Room 30/31',
      category: 'mlc',
      notes: 'Economic feasibility of mechanical engineering plants, depreciation, costing.',
      modules: [
        'Module 1: Foundations of Engineering Economics & Demand Analysis - Law of supply and demand, elasticity of demand, demand forecasting for industrial machinery and automotive products.',
        'Module 2: Production & Cost Theory - Short-run and long-run production functions, economies and diseconomies of scale in mass manufacturing, break-even analysis.',
        'Module 3: Market Structures & Industrial Pricing - Perfect competition, monopoly, oligopolistic pricing models, target costing and life-cycle costing for engineering products.',
        'Module 4: Capital Budgeting & Plant Appraisal - Time value of money, discounted cash flow methods, Net Present Value (NPV), Internal Rate of Return (IRR), Payback Period, machine depreciation accounting (declining balance, straight-line).'
      ],
      textbooks: [
        'R. Paneerselvam, "Engineering Economics", 2nd Edition, Prentice Hall of India',
        'Leland Blank and Anthony Tarquin, "Engineering Economy", McGraw-Hill'
      ]
    },
    'ME400': {
      code: 'ME400',
      name: 'Major Project - I',
      type: 'Practical',
      credits: 4,
      ltp: '0-0-6',
      teachingSlot: 'Project Slot (Mon / Thu)',
      examSlot: 'Project Evaluation',
      coordinator: 'Dr. Chaitanya Vundru',
      shortName: 'CV',
      facultyDesignation: 'Assistant Professor & Faculty Advisor (Mechanical)',
      facultyResearch: 'Capstone Guidance',
      email: 'chaitanya.vundru@nitgoa.ac.in',
      room: 'Mechanical Research Lab',
      category: 'lab',
      notes: 'Design and fabrication or numerical CFD/FEA analysis of mechanical prototypes, thermal systems, or robotics mechanisms.',
      modules: [
        'Phase 1: Project Scope Definition & Literature Review - Formulating engineering objective in thermal-fluids, robotics, biomechanics, design, or manufacturing; extensive review of ASME/Elsevier journals.',
        'Phase 2: Mathematical Modeling & CAD Synthesis - 3D parametric CAD modeling in SolidWorks/Creo, kinematic/dynamic equation formulation, finite element analysis in ANSYS.',
        'Phase 3: Prototype Component Fabrication & Sizing - Actuator and sensor sizing, bill of materials (BOM), 3D printing/machining of sub-assemblies, preliminary experimental test rig assembly.',
        'Phase 4: Interim Evaluation & Defense - Compiling interim project documentation according to NIT Goa thesis style guidelines, oral defense before departmental assessment panel.'
      ],
      textbooks: [
        'NIT Goa Mechanical Engineering B.Tech Project Manual',
        'David F. Beer, David McMurrey, "A Guide to Writing as an Engineer", John Wiley'
      ]
    },
    'ME402': {
      code: 'ME402',
      name: 'Comprehensive Exam',
      type: 'Theory',
      credits: 3,
      ltp: '0-0-0',
      teachingSlot: 'Self-Study & Viva',
      examSlot: 'Viva Voce',
      coordinator: 'Dr. Samar Singhal',
      shortName: 'SS',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Comprehensive Assessment',
      email: 'samar.singhal@nitgoa.ac.in',
      room: 'Room 30/31',
      category: 'core',
      notes: 'Comprehensive examination across Thermodynamics, Heat Transfer, Fluid Mechanics, Mechanics of Solids, Machine Design, and Manufacturing.',
      modules: [
        'Domain 1: Mechanics of Solids & Machine Design - Free body diagrams, Mohr circle, shear force and bending moment diagrams, deflection of beams, torsion of shafts, Euler column buckling; fatigue failure (S-N curve, Goodman/Soderberg criteria), design of bolted/welded joints, shafts, gears, bearings.',
        'Domain 2: Fluid Mechanics & Thermal Sciences - Bernoulli equation, viscous laminar and turbulent pipe flow, boundary layer theory, Navier-Stokes equations; First and Second laws of thermodynamics, entropy, power cycles (Rankine, Otto, Diesel, Brayton, refrigeration); conduction, convection (dimensionless numbers), radiation heat transfer.',
        'Domain 3: Theory of Machines & Vibrations - Kinematic pairs, inversions, velocity and acceleration analysis, gear trains, flywheels, dynamic balancing of rotating/reciprocating masses; free, forced, and damped single-degree-of-freedom vibrations, resonance, vibration isolation.',
        'Domain 4: Manufacturing Technology & Industrial Engineering - Casting patterns and gating design, metal forming (rolling, extrusion, forging), welding metallurgy, orthogonal cutting mechanics (Merchant circle), tool life (Taylor equation), CNC programming; forecasting, EOQ inventory models, PERT/CPM, linear programming.'
      ],
      textbooks: [
        'GATE Mechanical Engineering Syllabi and Reference Texts',
        'Yunus A. Cengel, Michael A. Boles, "Thermodynamics: An Engineering Approach", McGraw-Hill',
        'Joseph E. Shigley, "Mechanical Engineering Design", McGraw-Hill'
      ]
    }
  },
  schedule: buildInstituteMasterSchedule({
    prefix: 'me7',
    room: 'Room 30/31',
    slotA: 'HS350',
    slotB: 'ME524',
    slotC: 'ME512',
    slotD: 'ME513',
    slotE: 'ME535',
    slotF: 'ME518',
    labTue: { code: 'ME400', name: 'Major Project - I (Dr. Chaitanya Vundru)', room: 'Room 30/31 / Mechanical Research Lab' },
    notesTueLab: 'Dr. Chaitanya Vundru (CV) - Major Project - I Capstone Review',
    customSaturdayFocus: 'CFD & Composite Materials Problem Solving Session',
  })
};

// ==========================================
// 8th Semester (4th Year Even) - Capstone & Electives
// ==========================================
export const CSE_8: SemesterData = {
  courses: {
    'CS540': {
      code: 'CS540',
      name: 'Deep Learning & Natural Language Processing',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Keshavamurthy B N',
      shortName: 'BNK',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Deep Learning, NLP, Computer Vision',
      email: 'bnkeshav.fcse@nitgoa.ac.in',
      room: 'Room 18',
      category: 'elective',
      notes: 'Word embeddings (Word2Vec), RNN, GRU, Transformers (BERT, GPT), Attention mechanisms, LLMs.',
      modules: [
        'Module 1: Statistical NLP & Vector Space Embeddings - N-gram language models, perplexity, smoothing; vector space representations: TF-IDF, Continuous Bag of Words (CBOW), Skip-Gram (Word2Vec), GloVe; sub-word tokenization: Byte-Pair Encoding (BPE), WordPiece.',
        'Module 2: Sequential Deep Models & Recurrent Architectures - Recurrent Neural Networks (RNN), vanishing and exploding gradients, Backpropagation Through Time (BPTT); Long Short-Term Memory (LSTM), Gated Recurrent Units (GRU); bidirectional RNNs, sequence-to-sequence models.',
        'Module 3: Attention Mechanism & Transformer Architectures - Bahdanau additive and Luong multiplicative attention; Transformer encoder-decoder architecture: scaled dot-product attention, multi-head attention, positional encodings, layer normalization; Transformer-based encoders (BERT, RoBERTa) and decoders (GPT series).',
        'Module 4: Large Language Models, Fine-Tuning & Generative AI - Pre-training objectives (masked language modeling, causal language modeling); fine-tuning techniques: Parameter-Efficient Fine-Tuning (LoRA, QLoRA), Prompt Engineering, In-Context Learning; Retrieval-Augmented Generation (RAG), RLHF alignment.'
      ],
      textbooks: [
        'Dan Jurafsky, James H. Martin, "Speech and Language Processing", 3rd Edition, Pearson',
        'Ian Goodfellow, Yoshua Bengio, Aaron Courville, "Deep Learning", MIT Press'
      ]
    },
    'CS542': {
      code: 'CS542',
      name: 'Cyber Security & Software Forensics',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Modi Chirag N',
      shortName: 'MCN',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Cyber Security, Malware Analysis, Cloud Forensics',
      email: 'cnmodi@nitgoa.ac.in',
      room: 'Room 18',
      category: 'elective',
      notes: 'Vulnerability assessment, buffer overflows, penetration testing, malware reverse engineering, digital evidence acquisition.',
      modules: [
        'Module 1: Cyber Security Fundamentals & Software Vulnerabilities - Threat modeling, CIA triad, attack surfaces; software vulnerabilities: stack and heap buffer overflows, format string vulnerabilities, integer overflows, return-oriented programming (ROP); secure coding practices.',
        'Module 2: Penetration Testing & Network Security Operations - Penetration testing methodologies (reconnaissance, scanning, exploitation, post-exploitation); firewall architectures, Intrusion Detection and Prevention Systems (IDS/IPS), Web Application Security (OWASP Top 10: SQL injection, XSS, CSRF).',
        'Module 3: Digital Evidence Acquisition & Forensics - Principles of digital forensics, chain of custody, search and seizure; physical and logical data acquisition (disk imaging, write blockers); file system forensics (FAT, NTFS, ext4), metadata analysis, deleted file recovery and carving.',
        'Module 4: Memory Forensics & Reverse Engineering - Volatile memory acquisition, memory analysis with Volatility framework (process listing, DLL injection detection); static and dynamic malware analysis, disassembly and debugging (Ghidra, IDA Pro, x64dbg), ransomware behavior analysis.'
      ],
      textbooks: [
        'Eoghan Casey, "Digital Evidence and Computer Crime: Forensic Science, Computers, and the Internet", 3rd Edition, Academic Press',
        'William Stallings, "Cryptography and Network Security: Principles and Practice", 8th Edition, Pearson'
      ]
    },
    'CS450': {
      code: 'CS450',
      name: 'Major Project - II (Capstone Final Defense)',
      type: 'Practical',
      credits: 8,
      ltp: '0-0-12',
      teachingSlot: 'Full Semester Project',
      examSlot: 'Final Defense',
      coordinator: 'Dr. Modi Chirag N',
      shortName: 'MCN',
      facultyDesignation: 'Associate Professor (CSE)',
      facultyResearch: 'Capstone Evaluation Committee Chair',
      email: 'cnmodi@nitgoa.ac.in',
      room: 'Department Research Lab',
      category: 'lab',
      notes: 'Final Capstone Project defense, publication in IEEE/ACM conferences, software deployment, and patent filing.',
      modules: [
        'Phase 1: Advanced Implementation & System Integration - Full-scale coding, system integration, API development, cloud deployment (Docker, Kubernetes), database scaling, and performance optimization.',
        'Phase 2: Comprehensive Experimental Evaluation - Benchmark testing, unit/integration testing, comparative performance evaluation against state-of-the-art baselines, ablation studies, and scalability profiling.',
        'Phase 3: Research Dissemination & Intellectual Property - Drafting research papers for peer-reviewed IEEE/ACM conferences/journals, technical documentation, source code repository archiving, patent evaluation where applicable.',
        'Phase 4: Comprehensive Thesis & Viva Voce Defense - Final project report submission in accordance with NIT Goa dissertation formatting guidelines, public oral presentation and project demonstration before external and internal examiners.'
      ],
      textbooks: [
        'NIT Goa B.Tech Project Guidelines Handbook',
        'Justin Zobel, "Writing for Computer Science", 3rd Edition, Springer'
      ]
    }
  },
  schedule: buildFinalSemSchedule('cse8', 'Room 18', 'CS540', 'CS542', 'CS450')
};

export const CVE_8: SemesterData = {
  courses: {
    'CV540': {
      code: 'CV540',
      name: 'Prestressed Concrete Structures',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. S Sethulekshmi',
      shortName: 'SS',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Prestressed Concrete, Bridge Engineering',
      email: 'sethulekshmi@nitgoa.ac.in',
      room: 'Room 69',
      category: 'elective',
      notes: 'Pre-tensioning, post-tensioning, loss of prestress, design of PSC beams, composite beams.',
      modules: [
        'Module 1: Principles & Systems of Prestressing - Basic concepts of prestressed concrete, comparison with reinforced concrete; high-strength concrete and high-tensile steel requirements; pretensioning and post-tensioning systems (Freyssinet, Magnel-Blaton, Gifford-Udall, Lee-McCall); anchorage devices.',
        'Module 2: Losses of Prestress - Immediate and time-dependent losses: elastic shortening of concrete, friction and wobble effects, anchorage slip, creep of concrete, shrinkage of concrete, and relaxation of steel stress; total loss estimations as per IS 1343:2012.',
        'Module 3: Analysis & Design of Flexural Members - Stress analysis in prestressed concrete beams at transfer and working loads; load balancing concept; cracking moment; Limit State of Collapse (flexural and shear strength), Limit State of Serviceability (deflection and crack width checks) as per IS 1343.',
        'Module 4: Anchorage Zone Stresses & Composite Construction - Stress distribution in end blocks, Guyon and Magnel methods of anchorage zone reinforcement design, bursting and spalling tensions; composite prestressed concrete beams, differential shrinkage, horizontal shear transfer at interfaces.'
      ],
      textbooks: [
        'N. Krishna Raju, "Prestressed Concrete", 6th Edition, McGraw-Hill',
        'P. Dayaratnam, "Prestressed Concrete Structures", Oxford & IBH Publishing',
        'IS 1343:2012, "Code of Practice for Prestressed Concrete", Bureau of Indian Standards'
      ]
    },
    'CV545': {
      code: 'CV545',
      name: 'Earthquake Resistant Design of Structures',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Bapi Mondal',
      shortName: 'BM',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Earthquake Engineering',
      email: 'bapi@nitgoa.ac.in',
      room: 'Room 69',
      category: 'elective',
      notes: 'Seismic hazard analysis, IS 1893:2016 response spectrum method, ductile detailing as per IS 13920:2016.',
      modules: [
        'Module 1: Engineering Seismology & Structural Dynamics - Origin of earthquakes, plate tectonics, seismic waves, fault mechanisms, magnitude and intensity scales, seismographs; single-degree-of-freedom (SDOF) systems: free and forced vibrations, damping, response spectrum concept.',
        'Module 2: Seismic Conceptual Design & Irregularities - Building configurations for seismic resistance, continuous load paths, soft storey effect, torsional irregularity, re-entrant corners, short column effect; pounding between adjacent structures, soil-structure interaction overview.',
        'Module 3: Seismic Analysis Methods as per IS 1893:2016 - Design lateral force calculation using Equivalent Static Method; dynamic analysis: Response Spectrum Method (modal combination rules: SRSS, CQC); design base shear, vertical distribution of seismic forces, drift limitations.',
        'Module 4: Ductile Detailing & Modern Aseismic Strategies - Philosophy of capacity design, strong-column weak-beam mechanism; ductile detailing of beams, columns, beam-column joints, and shear walls in accordance with IS 13920:2016; introduction to seismic base isolation and passive tuned mass dampers.'
      ],
      textbooks: [
        'Pankaj Agarwal, Manish Shrikhande, "Earthquake Resistant Design of Structures", PHI Learning',
        'S. K. Duggal, "Earthquake Resistant Design of Structures", 2nd Edition, Oxford University Press',
        'IS 1893 (Part 1): 2016 & IS 13920: 2016, Bureau of Indian Standards'
      ]
    },
    'CV450': {
      code: 'CV450',
      name: 'Major Project - II',
      type: 'Practical',
      credits: 8,
      ltp: '0-0-12',
      teachingSlot: 'Full Semester Project',
      examSlot: 'Final Defense',
      coordinator: 'Dr. Aparup Biswal',
      shortName: 'AB',
      facultyDesignation: 'Assistant Professor (Civil)',
      facultyResearch: 'Project Committee Chair',
      email: 'aparup@nitgoa.ac.in',
      room: 'Civil Project Lab',
      category: 'lab',
      notes: 'Final Capstone Project in structural design, geotechnical foundation analysis, or infrastructure planning.',
      modules: [
        'Phase 1: Advanced Experimental / Numerical Investigation - Rigorous laboratory experimental investigations (concrete testing, soil mechanics, flume tests) or sophisticated numerical modeling (ETABS, SAP2000, PLAXIS, GIS).',
        'Phase 2: Parametric Analysis & Design Optimization - Sensitivity analyses, structural optimization, cost estimations, compliance checks with relevant Bureau of Indian Standards (BIS) and IRC codes.',
        'Phase 3: Comprehensive Dissertation Compilation - Preparation of detailed engineering drawings, structural design calculations, bills of quantities (BOQ), and final comprehensive B.Tech thesis manuscript.',
        'Phase 4: Final Capstone Viva Voce Defense - Presentation of project achievements, methodology, outcomes, and societal impact before an evaluation committee comprising internal faculty and external examiners.'
      ],
      textbooks: [
        'Civil Engineering B.Tech Project Manual, NIT Goa',
        'Relevant Bureau of Indian Standards (BIS) & IRC Codes of Practice'
      ]
    }
  },
  schedule: buildFinalSemSchedule('cve8', 'Room 69', 'CV540', 'CV545', 'CV450')
};

export const ECE_8: SemesterData = {
  courses: {
    'EC530': {
      code: 'EC530',
      name: 'Wireless & 5G Communications',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Trilochan Panigrahi',
      shortName: 'TP',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: '5G Cellular Networks, Massive MIMO, OFDM',
      email: 'tpanigrahi@nitgoa.ac.in',
      room: 'Room 5',
      category: 'elective',
      notes: 'Cellular concept, small scale fading (Rayleigh/Rician), OFDM, Massive MIMO, 5G NR physical layer.',
      modules: [
        'Module 1: Cellular Concepts & Radio Propagation - Cellular architecture, frequency reuse, handoff strategies, co-channel interference; path loss models (log-distance, Okumura-Hata); small-scale multipath fading: Rayleigh, Rician, and Nakagami distributions; Doppler spread and coherence time.',
        'Module 2: Multicarrier Modulation & OFDM Systems - Inter-Symbol Interference (ISI), principles of multicarrier transmission; Orthogonal Frequency Division Multiplexing (OFDM): transceiver architecture, FFT/IFFT implementation, cyclic prefix (CP); Peak-to-Average Power Ratio (PAPR) reduction techniques; OFDMA.',
        'Module 3: Multiple Antenna Systems (MIMO) & Beamforming - Diversity techniques (spatial, temporal, frequency); Alamouti space-time block coding (STBC), spatial multiplexing; MIMO channel capacity (water-filling algorithm); Massive MIMO concepts, pilot contamination, channel state information (CSI) estimation.',
        'Module 4: 5G NR Physical Layer & Advanced Technologies - 5G New Radio (NR) numerology, scalable subcarrier spacing, frame structures; mmWave communications, hybrid digital-analog beamforming, non-orthogonal multiple access (NOMA), ultra-reliable low-latency communications (URLLC), Open RAN (O-RAN).'
      ],
      textbooks: [
        'David Tse, Pramod Viswanath, "Fundamentals of Wireless Communication", Cambridge University Press',
        'Andrea Goldsmith, "Wireless Communications", Cambridge University Press',
        'Erik Dahlman, Stefan Parkvall, Johan Skold, "5G NR: The Next Generation Wireless Access Technology", Academic Press'
      ]
    },
    'EC535': {
      code: 'EC535',
      name: 'Low Power VLSI Design',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Vasantha MH',
      shortName: 'VMH',
      facultyDesignation: 'Professor (ECE)',
      facultyResearch: 'Low Power Circuits, Energy Harvesting',
      email: 'vasanthamh@nitgoa.ac.in',
      room: 'Room 5',
      category: 'elective',
      notes: 'Dynamic and leakage power dissipation in CMOS, clock gating, multi-threshold CMOS (MTCMOS), dynamic voltage scaling (DVFS).',
      modules: [
        'Module 1: Physics of Power Dissipation in CMOS - Drivers for low-power design; dynamic power dissipation (switching activity factor, capacitive load, short-circuit power); static leakage power dissipation (sub-threshold leakage, gate oxide tunneling, band-to-band tunneling, DIBL effect); total power estimation metrics.',
        'Module 2: Architectural & Algorithmic Low-Power Strategies - Parallelism and pipelining for voltage scaling without throughput loss; algorithmic transformations: retiming, resource sharing, algebraic transformations; low-power memory architectures: partitioned memory, banking, low-swing buses.',
        'Module 3: Circuit & Logic-Level Low-Power Techniques - Clock distribution networks and clock gating strategies; Multi-Threshold CMOS (MTCMOS / power gating) with sleep transistors, Sub-threshold logic design, Variable Threshold CMOS (VTCMOS), Pass-transistor logic, Pre-computation logic.',
        'Module 4: Dynamic Power Management & Energy Harvesting - Dynamic Voltage and Frequency Scaling (DVFS) algorithms, adaptive voltage scaling (AVS), power domain isolation and level shifters; low-power interconnect design; self-powered energy harvesting interface circuits for IoT edge nodes.'
      ],
      textbooks: [
        'Kaushik Roy, Sharat C. Prasad, "Low-Power CMOS VLSI Circuit Design", John Wiley & Sons',
        'Jan M. Rabaey, "Low Power Design Essentials", Springer',
        'Anantha P. Chandrakasan, Robert W. Brodersen, "Low Power Digital CMOS Design", Kluwer Academic Publishers'
      ]
    },
    'EC450': {
      code: 'EC450',
      name: 'Major Project - II',
      type: 'Practical',
      credits: 8,
      ltp: '0-0-12',
      teachingSlot: 'Full Semester Project',
      examSlot: 'Final Defense',
      coordinator: 'Dr. Shivnarayan Patidar',
      shortName: 'SP',
      facultyDesignation: 'Associate Professor (ECE)',
      facultyResearch: 'Capstone Evaluation Chair',
      email: 'shivnarayan.patidar@nitgoa.ac.in',
      room: 'ECE Research Lab',
      category: 'lab',
      notes: 'Full-scale experimental hardware or algorithmic realization, patent evaluation, and final viva voce.',
      modules: [
        'Phase 1: Full-Scale Implementation & Prototyping - Complete fabrication and assembly of high-speed RF/analog PCB or FPGA-based digital signal processing architecture, firmware integration, and lab bench testing.',
        'Phase 2: Signal & Performance Metric Characterization - Bit Error Rate (BER) testing, SNR measurement, logic analyzer and digital storage oscilloscope (DSO) waveform capture, power consumption profiling, and compliance testing.',
        'Phase 3: Scholarly Manuscript Preparation - Drafting scientific paper for submission to IEEE/IET/Springer conferences or journals; open-source hardware/software documentation; patentability search and filing where applicable.',
        'Phase 4: Final Capstone Dissertation & External Defense - Preparation of comprehensive B.Tech thesis adhering to NIT Goa dissertation templates; public project demonstration and oral viva before external university evaluators.'
      ],
      textbooks: [
        'NIT Goa ECE Capstone Project Manual',
        'David F. Beer, David McMurrey, "A Guide to Writing as an Engineer", John Wiley'
      ]
    }
  },
  schedule: buildFinalSemSchedule('ece8', 'Room 5', 'EC530', 'EC535', 'EC450')
};

export const EEE_8: SemesterData = {
  courses: {
    'EE535': {
      code: 'EE535',
      name: 'High Voltage Engineering & HVDC',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Suresh Mikkili',
      shortName: 'SM',
      facultyDesignation: 'Associate Professor (EEE)',
      facultyResearch: 'High Voltage Transmission, Insulation Diagnostics',
      email: 'mikkili.suresh@nitgoa.ac.in',
      room: 'Room 8/9',
      category: 'elective',
      notes: 'Breakdown mechanisms in gases, liquids, and solids; lightning impulse generation (Marx generator); HVDC converter bridges.',
      modules: [
        'Module 1: Conduction & Dielectric Breakdown Phenomena - Breakdown in gases: Townsend first and second ionization coefficients, Paschen law, Streamer theory; breakdown in commercial liquids (suspended particle, cavitation mechanisms); breakdown in solid dielectrics: intrinsic, electromechanical, thermal breakdown, treeing and tracking.',
        'Module 2: Generation & Measurement of High Voltages - Generation of high DC voltages: Cockcroft-Walton voltage multiplier; High AC voltages: cascaded transformers, resonant transformers; Lightning impulse generator (Marx circuit, wave-shaping R-C components); sphere gaps, electrostatic voltmeters, capacitive voltage dividers.',
        'Module 3: Overvoltage Transients & Insulation Coordination - Atmospheric lightning and switching surges, traveling wave theory on transmission lines, reflection and refraction at junctions; surge arresters (Metal Oxide Varistors / ZnO); insulation coordination principles as per IEC/IS standards.',
        'Module 4: HVDC Transmission Systems & Converter Topologies - Comparison between HVAC and HVDC transmission; Graetz 6-pulse and 12-pulse bridge converter circuits; converter transformer ratings, firing angle control and extinction angle control; reactive power management and harmonic filter design in HVDC converter stations; Voltage Source Converter (VSC-HVDC).'
      ],
      textbooks: [
        'E. Kuffel, W. S. Zaengl, J. Kuffel, "High Voltage Engineering: Fundamentals", 2nd Edition, Newnes (Elsevier)',
        'M. S. Naidu, V. Kamaraju, "High Voltage Engineering", 5th Edition, McGraw-Hill',
        'K. R. Padiyar, "HVDC Power Transmission Systems: Technology and System Interactions", New Age International'
      ]
    },
    'EE540': {
      code: 'EE540',
      name: 'Power System Dynamics & Stability',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. C. Vyjayanthi',
      shortName: 'CV',
      facultyDesignation: 'Associate Professor & HoD (EEE)',
      facultyResearch: 'Power System Stability, Synchrophasors',
      email: 'c.vyjayanthi@nitgoa.ac.in',
      room: 'Room 8/9',
      category: 'elective',
      notes: 'Rotor angle stability, swing equation, equal area criterion, small-signal stability, power system stabilizers (PSS).',
      modules: [
        'Module 1: Synchronous Machine Modeling & Dynamics - Physical description of synchronous machine, Park transformation (d-q-0 axis variables); flux linkage equations, voltage and torque equations; transient and sub-transient inductances and time constants; IEEE standard excitation systems (type DC, AC, ST) and prime mover governor models.',
        'Module 2: Transient Stability & Equal Area Criterion - Mechanical and electrical torque balances, swing equation for multi-machine systems; Equal Area Criterion: critical clearing angle, critical clearing time, three-phase fault on transmission lines; numerical integration methods: Euler, modified Euler, and Runge-Kutta 4th order.',
        'Module 3: Small-Signal Stability Analysis - Linearization of state-space power system equations; modal analysis: eigenvalues, eigenvectors, participation factors, mode shapes; low-frequency electromechanical oscillations (local modes and inter-area modes); damping ratio, sensitivity analysis.',
        'Module 4: Power System Stabilizers (PSS) & Voltage Stability - Concept and architecture of Power System Stabilizer (PSS), lead-lag compensator design for damping rotor angle swings; Voltage stability: P-V and Q-V curves, reactive power margins; Voltage Collapse Proximity Indicators (VCPI); FACTS devices (STATCOM, SVC) for dynamic stability enhancement.'
      ],
      textbooks: [
        'Prabha Kundur, "Power System Stability and Control", McGraw-Hill',
        'K. R. Padiyar, "Power System Dynamics: Stability and Control", 2nd Edition, BS Publications',
        'Peter W. Sauer, M. A. Pai, "Power System Dynamics and Stability", Stipes Publishing'
      ]
    },
    'EE450': {
      code: 'EE450',
      name: 'Major Project - II',
      type: 'Practical',
      credits: 8,
      ltp: '0-0-12',
      teachingSlot: 'Full Semester Project',
      examSlot: 'Final Defense',
      coordinator: 'Dr. C. Vyjayanthi',
      shortName: 'CV',
      facultyDesignation: 'Associate Professor & HoD (EEE)',
      facultyResearch: 'Capstone Evaluation Chair',
      email: 'c.vyjayanthi@nitgoa.ac.in',
      room: 'Power Systems / Hardware Lab',
      category: 'lab',
      notes: 'Capstone Phase II: Hardware prototype fabrication, experimental validation, IEEE transaction/conference paper submission, and viva defense.',
      modules: [
        'Phase 1: Full-Scale Hardware Prototyping & Converter Assembly - Hardware fabrication of power converter stages, magnetics winding (inductors/transformers), high-frequency PCB layout, gate-driver isolation, sensor integration (Hall-effect current/voltage sensors).',
        'Phase 2: Controller Implementation & Hardware-in-the-Loop Validation - Real-time digital controller deployment on DSP (TI TMS320F28379D) or FPGA; hardware-in-the-loop (HIL) simulation validation, transient step-load testing, efficiency profiling, Total Harmonic Distortion (THD) measurements.',
        'Phase 3: Research Dissemination & Publication - Manuscript preparation conforming to IEEE PES/PELS conference or journal formatting, documentation of open-access experimental datasets, intellectual property assessment.',
        'Phase 4: Comprehensive Thesis & Viva Voce Defense - Submission of final hardcover B.Tech dissertation per NIT Goa postgraduate & undergraduate thesis regulations; public demonstration and defense before external academic and industrial evaluators.'
      ],
      textbooks: [
        'NIT Goa EEE Capstone Manual',
        'David F. Beer, David McMurrey, "A Guide to Writing as an Engineer", John Wiley'
      ]
    }
  },
  schedule: buildFinalSemSchedule('eee8', 'Room 8/9', 'EE535', 'EE540', 'EE450')
};

export const ME_8: SemesterData = {
  courses: {
    'ME540': {
      code: 'ME540',
      name: 'Robotics and Industrial Automation',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'A',
      examSlot: 'A',
      coordinator: 'Dr. Chaitanya Vundru',
      shortName: 'CV',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Robotics Kinematics, Industrial Automation, Cobots',
      email: 'chaitanya.vundru@nitgoa.ac.in',
      room: 'Room 30/31',
      category: 'elective',
      notes: 'Forward and inverse kinematics (DH parameters), Jacobian and velocity analysis, trajectory planning, robot dynamics (Euler-Lagrange).',
      modules: [
        'Module 1: Spatial Descriptions, Transformations & Forward Kinematics - Coordinate frames, rotation matrices, Euler angles, roll-pitch-yaw angles; homogeneous transformation matrices; Denavit-Hartenberg (D-H) parameter representation; forward kinematics formulation for planar 2R/3R arms, SCARA, and 6-DOF industrial serial manipulators.',
        'Module 2: Inverse Kinematics & Manipulator Jacobians - Geometric and algebraic inverse kinematics solution techniques, existence of multiple solutions; velocity kinematics: linear and angular velocities of links, Manipulator Jacobian matrix; kinematic singularities and rank deficiency; static force-torque relations.',
        'Module 3: Manipulator Dynamics & Trajectory Planning - Euler-Lagrange dynamic formulation, kinetic and potential energy of rigid bodies; inertia matrix, Coriolis and centripetal terms, gravity vector; trajectory planning in joint space and Cartesian space: cubic polynomials, quintic polynomials, parabolic blends (LSPB).',
        'Module 4: Robot Control, End-Effectors & Industrial Automation - Independent joint control: PD and PID feedback control; computed torque control; end-effector gripping mechanisms (vacuum, mechanical jaws, magnetic grippers); programmable logic controllers (PLCs), ladder logic, robotic work-cell automation and collaborative robots (Cobots).'
      ],
      textbooks: [
        'John J. Craig, "Introduction to Robotics: Mechanics and Control", 3rd Edition, Pearson',
        'Mark W. Spong, Seth Hutchinson, M. Vidyasagar, "Robot Modeling and Control", Wiley',
        'Mikell P. Groover, "Automation, Production Systems, and Computer-Integrated Manufacturing", Pearson'
      ]
    },
    'ME545': {
      code: 'ME545',
      name: 'Gas Turbines and Jet Propulsion',
      type: 'Elective',
      credits: 3,
      ltp: '3-0-0',
      teachingSlot: 'B',
      examSlot: 'B',
      coordinator: 'Dr. Srikumar Warrier',
      shortName: 'SW',
      facultyDesignation: 'Faculty (Department of Mechanical Engineering)',
      facultyResearch: 'Gas Turbines, Aerospace Propulsion, Combustion',
      email: 'srikumar@nitgoa.ac.in',
      room: 'Room 30/31',
      category: 'elective',
      notes: 'Joule/Brayton cycle with intercooling, reheating and regeneration, turbojet, turbofan, and rocket propulsion mechanics.',
      modules: [
        'Module 1: Ideal & Real Gas Turbine Cycles - Ideal Joule/Brayton cycle; effect of component irreversibilities: compressor and turbine isentropic efficiencies, pressure losses in ducting and combustor; real cycle thermodynamics; performance improvements: intercooling, reheat, regeneration (recuperation), combined cycle power plants.',
        'Module 2: Centrifugal & Axial Flow Compressors - Centrifugal compressors: impeller velocity triangles, slip factor, work input factor, diffuser performance, surging and choking; Axial flow compressors: stage velocity diagrams, degree of reaction, blade loading, stage pressure ratio, stall and rotating stall.',
        'Module 3: Combustion Systems & Axial Flow Turbines - Gas turbine combustion chambers (can, annular, can-annular), combustion intensity, stability loop, flame stabilization; Axial flow turbines: impulse and reaction stages, stage efficiency, blade cooling techniques (internal convection, impingement, film cooling) for ultra-high turbine entry temperatures (TET).',
        'Module 4: Aircraft Jet Engines & Rocket Propulsion - Principles of aircraft propulsion, thrust equations, propulsive and thermal efficiencies, specific thrust, TSFC; thermodynamic analysis of Turbojet, Turbofan (high and low bypass), Turboprop, and Ramjet engines; fundamentals of chemical rocket propulsion: solid and liquid propellant rockets, specific impulse.'
      ],
      textbooks: [
        'H. Cohen, G. F. C. Rogers, H. I. H. Saravanamuttoo, "Gas Turbine Theory", 7th Edition, Pearson',
        'V. Ganesan, "Gas Turbines", 3rd Edition, Tata McGraw-Hill',
        'Jack D. Mattingly, "Elements of Propulsion: Gas Turbines and Rockets", AIAA Education Series'
      ]
    },
    'ME450': {
      code: 'ME450',
      name: 'Major Project - II',
      type: 'Practical',
      credits: 8,
      ltp: '0-0-12',
      teachingSlot: 'Full Semester Project',
      examSlot: 'Final Defense',
      coordinator: 'Dr. Samar Singhal',
      shortName: 'SS',
      facultyDesignation: 'Assistant Professor (Mechanical)',
      facultyResearch: 'Capstone Evaluation Chair',
      email: 'samar.singhal@nitgoa.ac.in',
      room: 'Mechanical Research Lab',
      category: 'lab',
      notes: 'Final capstone defense, fabricated prototype demonstration, thermal/mechanical test measurement, and viva examination.',
      modules: [
        'Phase 1: Full Prototyping & Experimental Test Rig Setup - Complete fabrication and assembly of mechanical, thermal, robotic, or mechatronic systems; sensor instrumentation (thermocouples, load cells, strain gauges, pressure transducers, DAQ cards).',
        'Phase 2: Comprehensive Experimental Testing & Uncertainty Analysis - Full operational parameter testing, repeatability checks, calibration curves, propagation of uncertainty using Kline-McClintock methodology, validation with FEA/CFD numerical predictions.',
        'Phase 3: Scholarly Dissemination & Intellectual Property - Drafting scientific manuscripts for publication in ASME, Elsevier, or Springer indexed journals/conferences; patent application drafting if novel inventions are demonstrated.',
        'Phase 4: Final B.Tech Dissertation & Viva Voce Defense - Final manuscript submission according to NIT Goa academic style conventions; demonstration of physical prototype and comprehensive oral presentation before internal and external university examiners.'
      ],
      textbooks: [
        'NIT Goa Mechanical Engineering B.Tech Project Manual',
        'David F. Beer, David McMurrey, "A Guide to Writing as an Engineer", John Wiley'
      ]
    }
  },
  schedule: buildFinalSemSchedule('me8', 'Room 30/31', 'ME540', 'ME545', 'ME450')
};
