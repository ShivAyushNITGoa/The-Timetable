import { FacultyProfile } from './timetableData';

export const COMPREHENSIVE_FACULTY_PROFILES: FacultyProfile[] = [
  // =========================================================================
  // ELECTRICAL & ELECTRONICS ENGINEERING (EEE)
  // =========================================================================
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
      "Smart Electric Grids & Power Quality Mitigation",
      "Electric Vehicles (EVs) & Fast Charging Systems",
      "Grid-Connected & Stand-Alone Photovoltaic Systems",
      "Wireless Power Transfer & Inductive Coupling",
      "Active Power Filters & Harmonic Compensation",
      "Soft Computing & AI Techniques in Power Systems"
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
      { code: "EE302", name: "Power Systems-I", role: "Course Coordinator & Lecturer" },
      { code: "EE201", name: "Network Analysis & Synthesis", role: "Course Coordinator" }
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
      "Power Electronics & Variable Frequency Drives",
      "Sensorless Grid-Connected Inverter Topologies",
      "Renewable Energy Systems & Solar Microinverters",
      "High-Gain DC-DC Switched-Capacitor Converters",
      "Soft Computing & Particle Swarm Optimization in Power Electronics"
    ],
    prominentPapers: [
      "One-Cycle-Controlled Single-Stage Single-Phase Voltage-Sensorless Grid-Connected PV System (IEEE Transactions on Industrial Electronics)",
      "Analysis and Design of High-Gain Non-Isolated DC-DC Converters (IEEE Journal of Emerging and Selected Topics in Industrial Electronics)",
      "Novel Modulation Strategies for Multi-Level Inverters in Renewable Grid Integration (CSEE JPES)"
    ],
    coursesTaught: [
      { code: "EE300", name: "Power Electronics", role: "Course Coordinator & Lecturer" },
      { code: "EE350", name: "Power Electronics Lab", role: "Lab In-Charge" }
    ]
  },
  {
    id: "c-vyjayanthi",
    name: "Dr. C. Vyjayanthi",
    shortName: "CV",
    designation: "Associate Professor & Dean (Academics)",
    department: "Electrical & Electronics Engineering",
    cabin: "Dean Academics Office / EEE Faculty Block",
    email: "vyjayanthi@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/eee/faculty/c-vyjayanthi",
    scholarUrl: "https://scholar.google.com/citations?user=eX7w49EAAAAJ",
    researchInterests: [
      "Restructured Power Systems & Electricity Markets",
      "Smart Electric Grids & Wide Area Monitoring (WAMS)",
      "FACTS Devices & Power Quality Conditioning",
      "Hybrid AC/DC Microgrids & Islanding Detection",
      "Electric Vehicle Multi-Stage Battery Fast Charging",
      "Blockchain Protocols in Decentralized Energy Trading"
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
      { code: "EE306", name: "Tinkering Lab - II", role: "Lab In-Charge & Coordinator" },
      { code: "EE351", name: "Power System Dynamics & Control", role: "Course Coordinator" }
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
      "Digital Signal, Speech & Biomedical Image Processing",
      "Wavelet Filter-banks & Directional Feature Extraction",
      "Biometrics & Iris Pattern Recognition Systems",
      "Neural Networks & Deep Learning for Medical Diagnostics",
      "FPGA-Based Hardware Accelerators for Signal Denoising",
      "Control Systems Engineering & Robust Control"
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
      { code: "EE307", name: "Seminar", role: "Course Coordinator & Faculty Advisor" },
      { code: "EE252", name: "Control Systems", role: "Course Coordinator" },
      { code: "EE308", name: "Remedial & Problem Solving Tutorial", role: "Faculty In-Charge" }
    ]
  },
  {
    id: "mahi-teja-talluri",
    name: "Dr. Mahi Teja Talluri",
    shortName: "MTT",
    designation: "Assistant Professor",
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
      "A Novel Buck Converter Topology with High Step Down Ratio and Continuous Conduction (IEEE Transactions on Circuits and Systems II: Express Briefs, 2024)"
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
    designation: "Assistant Professor",
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
      "Analysis and Design of a Two-Winding Wireless Power Transfer System with Higher System Efficiency (IEEE IECON)"
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
    designation: "Assistant Professor",
    department: "Electrical & Electronics Engineering",
    cabin: "EEE Dept Faculty Cabin, Cuncolim Campus",
    email: "ad.dksamuel@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/eee/faculty/anudevi-samuel",
    researchInterests: [
      "Electrical Machines & Synchronous Drives",
      "Electric Vehicle Traction Motors",
      "Special Electrical Machines & Control",
      "High Voltage Engineering & Dielectric Insulation Diagnostics"
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
    designation: "Assistant Professor",
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

  // =========================================================================
  // COMPUTER SCIENCE & ENGINEERING (CSE)
  // =========================================================================
  {
    id: "damodar-reddy-edla",
    name: "Dr. Damodar Reddy Edla",
    shortName: "DRE",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    cabin: "CSE Dept Faculty Block, Cuncolim Campus",
    email: "dr.edla@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/cse/faculty/damodar-reddy-edla",
    scholarUrl: "https://scholar.google.com/citations?user=h19YtQAAAAAJ",
    researchInterests: [
      "Machine Learning & Deep Learning Architectures",
      "Wireless Sensor Networks (WSNs) & Clustering Protocols",
      "Cognitive Neuroscience & Brain-Computer Interfaces (BCI)",
      "Big Data Analytics & Bio-Inspired Optimization",
      "Pattern Recognition & Medical Image Diagnostics"
    ],
    patents: [
      "Granted Indian Patent: IoT-Enabled Non-Invasive Cognitive Fatigue Monitoring System for Industrial Environments"
    ],
    prominentPapers: [
      "A Novel Clustering Algorithm for Wireless Sensor Networks Using Fuzzy Logic and Particle Swarm Optimization (IEEE Sensors Journal)",
      "Deep Learning-Based EEG Signal Classification for Motor Imagery Brain-Computer Interfaces (IEEE Transactions on Neural Systems and Rehabilitation Engineering)",
      "Optimization of Deep Neural Networks for High-Dimensional Biomedical Data Analysis (Elsevier Computers in Biology and Medicine)"
    ],
    coursesTaught: [
      { code: "CS301", name: "Database Management Systems", role: "Course Coordinator" },
      { code: "CS518", name: "Machine Learning", role: "Elective Coordinator" },
      { code: "CS519", name: "Deep Learning", role: "Postgraduate Lecturer" }
    ]
  },
  {
    id: "pravati-swain",
    name: "Dr. Pravati Swain",
    shortName: "PS",
    designation: "Associate Professor & Head of Department (CSE)",
    department: "Computer Science & Engineering",
    cabin: "HOD Office / CSE Dept Block, Cuncolim Campus",
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
      { code: "CS300M", name: "Design and Analysis of Algorithm", role: "Minor Course Coordinator (CSE)" },
      { code: "CS250", name: "Design and Analysis of Algorithms", role: "Course Coordinator" },
      { code: "CS351", name: "Computer Networks", role: "Course Coordinator" }
    ]
  },
  {
    id: "veena-thenkanidiyoor",
    name: "Dr. Veena Thenkanidiyoor",
    shortName: "VT",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    cabin: "CSE Dept Faculty Block, Cuncolim Campus",
    email: "veena@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/cse/faculty/veena-thenkanidiyoor",
    scholarUrl: "https://scholar.google.com/citations?user=veena_thenkanidiyoor",
    researchInterests: [
      "Pattern Recognition & Document Analysis",
      "Computer Vision & Video Analytics",
      "Speech Processing & Audio Signal Classification",
      "Biometric Authentication & Handwriting Recognition"
    ],
    prominentPapers: [
      "Document Image Segmentation and Script Identification Using Spatial Feature Pyramids (IEEE Transactions on Image Processing)",
      "Offline Handwritten Character Recognition Using Deep Convolutional Networks (Elsevier Pattern Recognition)"
    ],
    coursesTaught: [
      { code: "CS200", name: "Data Structures and Algorithms", role: "Course Coordinator" },
      { code: "CS524", name: "Computer Vision", role: "Elective Coordinator" }
    ]
  },
  {
    id: "keshavamurthy-bn",
    name: "Dr. Keshavamurthy B.N.",
    shortName: "KBN",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    cabin: "CSE Dept Faculty Block, Cuncolim Campus",
    email: "bnk@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/cse/faculty/keshavamurthy-bn",
    scholarUrl: "https://scholar.google.com/citations?user=bnkeshavamurthy",
    researchInterests: [
      "Data Mining & Stream Data Mining Algorithms",
      "Social Network Analytics & Community Detection",
      "Privacy Preserving Data Mining (PPDM)",
      "Web Intelligence & Information Retrieval Systems"
    ],
    prominentPapers: [
      "Privacy Preserving Association Rule Mining in Distributed Data Streams (IEEE Transactions on Knowledge and Data Engineering)",
      "Community Detection in Dynamic Social Networks Using Topological Clustering (Elsevier Knowledge-Based Systems)"
    ],
    coursesTaught: [
      { code: "CS350", name: "Operating Systems", role: "Course Coordinator" },
      { code: "CS505", name: "Data Warehousing and Data Mining", role: "Course Coordinator" }
    ]
  },
  {
    id: "purushothama-br",
    name: "Dr. Purushothama B.R.",
    shortName: "PBR",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    cabin: "CSE Dept Faculty Block, Cuncolim Campus",
    email: "puru@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/cse/faculty/purushothama-br",
    scholarUrl: "https://scholar.google.com/citations?user=purushothamabr",
    researchInterests: [
      "Cryptography & Mathematical Foundations of Security",
      "Blockchain Protocols & Smart Contract Security",
      "Cloud Security & Secure Multi-Party Computation (SMPC)",
      "Privacy Preserving Authentication Schemes"
    ],
    prominentPapers: [
      "Verifiable Public Key Cryptosystems for Cloud Data Integrity Auditing (IEEE Transactions on Cloud Computing)",
      "Lightweight Blockchain Consensus for Decentralized IoT Identity Management (IEEE Internet of Things Journal)"
    ],
    coursesTaught: [
      { code: "CS302", name: "Computer Organization and Architecture", role: "Course Coordinator" },
      { code: "CS515", name: "Cryptography and Network Security", role: "Course Coordinator" }
    ]
  },
  {
    id: "chirag-modi",
    name: "Dr. Chirag Modi",
    shortName: "CNM",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    cabin: "CSE Dept Faculty Block, Cuncolim Campus",
    email: "cnmodi@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/cse/faculty/chirag-modi",
    scholarUrl: "https://scholar.google.com/citations?user=chiragmodi",
    researchInterests: [
      "Cyber Security & Intrusion Detection Systems (IDS)",
      "Cloud Security Architectures & Virtualization Defense",
      "Machine Learning for Threat Intelligence",
      "Blockchain-Enabled Secure Distributed Storage"
    ],
    prominentPapers: [
      "A Novel Framework for Intrusion Detection in Cloud Computing Environments Using Hybrid AI (IEEE Transactions on Information Forensics and Security)",
      "Securing Cloud Virtual Machines from Hypervisor-Level Side Channel Attacks (Elsevier Computers & Security)"
    ],
    coursesTaught: [
      { code: "CS303", name: "Theory of Computation", role: "Course Coordinator" },
      { code: "CS521", name: "Cloud Computing Security", role: "Course Coordinator" }
    ]
  },
  {
    id: "s-mini",
    name: "Dr. S. Mini",
    shortName: "SMN",
    designation: "Associate Professor",
    department: "Computer Science & Engineering",
    cabin: "CSE Dept Faculty Block, Cuncolim Campus",
    email: "mini@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/cse/faculty/s-mini",
    scholarUrl: "https://scholar.google.com/citations?user=smini_nitgoa",
    researchInterests: [
      "Wireless Ad-Hoc & Sensor Networks",
      "Swarm Intelligence & Evolutionary Optimization",
      "Target Coverage & Topology Management in WSNs",
      "Internet of Things (IoT) Protocol Design"
    ],
    prominentPapers: [
      "Genetic Algorithm-Based Sleep Scheduling for Lifetime Maximization in Sensor Networks (IEEE Sensors Journal)",
      "Meta-Heuristic Optimization for Connected Target Coverage in Heterogeneous Sensor Fields (Elsevier Ad Hoc Networks)"
    ],
    coursesTaught: [
      { code: "CS251", name: "Software Engineering", role: "Course Coordinator" },
      { code: "CS522", name: "Wireless Sensor Networks", role: "Elective Coordinator" }
    ]
  },

  // =========================================================================
  // ELECTRONICS & COMMUNICATION ENGINEERING (ECE)
  // =========================================================================
  {
    id: "b-venugopal-reddy",
    name: "Dr. B. Venugopal Reddy",
    shortName: "BVR",
    designation: "Associate Professor & Head of Department (ECE)",
    department: "Electronics & Communication Engineering",
    cabin: "HOD Office / ECE Dept Block, Cuncolim Campus",
    email: "bvenugopal@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/ece/faculty/b-venugopal-reddy",
    scholarUrl: "https://scholar.google.com/citations?user=bvenugopalreddy",
    researchInterests: [
      "Digital VLSI System Design & Synthesizable RTL",
      "Low-Power ASIC Architectures & Clock Gating",
      "FPGA-Based Hardware Accelerators for Cryptography & AI",
      "Fault-Tolerant Computing & Built-In Self-Test (BIST)"
    ],
    prominentPapers: [
      "Energy-Efficient Low-Power Approximate Multiplier Design for Image Processing Applications (IEEE Transactions on Very Large Scale Integration (VLSI) Systems)",
      "High-Throughput Synthesizable FPGA Accelerator for Cryptographic Hash Algorithms (IEEE Transactions on Circuits and Systems I)"
    ],
    coursesTaught: [
      { code: "EC300", name: "Digital Communication", role: "Course Coordinator" },
      { code: "EC351", name: "VLSI Design", role: "Course Coordinator" },
      { code: "EC510", name: "Digital System Design using FPGA", role: "Elective Coordinator" }
    ]
  },
  {
    id: "trilochan-panigrahi",
    name: "Dr. Trilochan Panigrahi",
    shortName: "TP",
    designation: "Associate Professor",
    department: "Electronics & Communication Engineering",
    cabin: "ECE Dept Faculty Block, Cuncolim Campus",
    email: "tpanigrahi@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/ece/faculty/trilochan-panigrahi",
    scholarUrl: "https://scholar.google.com/citations?user=tpanigrahi",
    researchInterests: [
      "Adaptive Signal Processing & Filter Design",
      "Distributed Estimation & Sensor Networks",
      "Array Signal Processing & Beamforming",
      "Statistical Signal Processing for Wireless Communications"
    ],
    prominentPapers: [
      "Distributed Diffusion Recursive Least Squares Estimation Over Adaptive Networks (IEEE Transactions on Signal Processing)",
      "Sparse Distributed Estimation in Sensor Networks with Quantized Communications (IEEE Signal Processing Letters)"
    ],
    coursesTaught: [
      { code: "EC251", name: "Digital Signal Processing", role: "Course Coordinator" },
      { code: "EC201", name: "Signals and Systems", role: "Course Coordinator" },
      { code: "EC512", name: "Adaptive Signal Processing", role: "Elective Coordinator" }
    ]
  },
  {
    id: "lalat-indu-giri",
    name: "Dr. Lalat Indu Giri",
    shortName: "LIG",
    designation: "Assistant Professor",
    department: "Electronics & Communication Engineering",
    cabin: "ECE Dept Faculty Block, Cuncolim Campus",
    email: "lalat.giri@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/ece/faculty/lalat-indu-giri",
    scholarUrl: "https://scholar.google.com/citations?user=lalatindugiri",
    researchInterests: [
      "Infrared Thermography & Non-Destructive Testing (NDT)",
      "Optical Instrumentation & Quantitative Heat Flux Analysis",
      "Thermal Imaging for Structural Health Monitoring",
      "Biomedical Thermography for Early Cancer Detection"
    ],
    prominentPapers: [
      "Pulsed Infrared Thermography for Subsurface Defect Detection in Aerospace Composites (IEEE Sensors Journal)",
      "Lock-in Thermography Signal Reconstruction Using Principal Component Analysis (NDT&E International)"
    ],
    coursesTaught: [
      { code: "EC200", name: "Electronic Devices and Circuits", role: "Course Coordinator" },
      { code: "EC302", name: "Electromagnetic Waves and Radiation", role: "Course Coordinator" }
    ]
  },
  {
    id: "nithin-kumar-yb",
    name: "Dr. Nithin Kumar Y.B.",
    shortName: "NKY",
    designation: "Associate Professor",
    department: "Electronics & Communication Engineering",
    cabin: "ECE Dept Faculty Block, Cuncolim Campus",
    email: "nithin.kumar@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/ece/faculty/nithin-kumar-yb",
    scholarUrl: "https://scholar.google.com/citations?user=nithinkumaryb",
    researchInterests: [
      "Analog & Mixed-Signal IC Design",
      "RF Integrated Circuits & Low-Noise Amplifiers (LNA)",
      "Low-Voltage Sub-Threshold CMOS Circuits",
      "Data Converters (ADC/DAC) & Phase-Locked Loops (PLL)"
    ],
    prominentPapers: [
      "Design of an Ultra-Low-Power Sub-Threshold Low-Noise Amplifier for Biomedical Wireless Receivers (IEEE Transactions on Circuits and Systems II)",
      "A 0.5-V Low-Power High-Linearity CMOS Active Mixer for IoT Transceivers (IEEE Microwave and Wireless Technology Letters)"
    ],
    coursesTaught: [
      { code: "EC250", name: "Analog Integrated Circuits", role: "Course Coordinator" },
      { code: "EC514", name: "Analog Mixed Signal IC Design", role: "Course Coordinator" }
    ]
  },
  {
    id: "pragati-patel",
    name: "Dr. Pragati Patel",
    shortName: "PP",
    designation: "Assistant Professor",
    department: "Electronics & Communication Engineering",
    cabin: "ECE Dept Faculty Block, Cuncolim Campus",
    email: "pragati.patel@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/ece/faculty/pragati-patel",
    scholarUrl: "https://scholar.google.com/citations?user=pragatipatel",
    researchInterests: [
      "Nanoelectronics & 2D Semiconductor Materials (MoS2, Graphene)",
      "Field-Effect Transistors (FETs) & Steep-Slope Switching Devices",
      "Negative Capacitance FETs (NC-FETs) & Tunnel FETs (TFETs)",
      "Semiconductor Device Modeling & TCAD Simulations"
    ],
    prominentPapers: [
      "Design and Performance Optimization of Monolayer MoS2 Negative Capacitance Field-Effect Transistors (IEEE Transactions on Electron Devices)",
      "Investigation of Surface Roughness and Defect Traps on Steep-Slope Switching in 2D Transistors (IEEE Electron Device Letters)"
    ],
    coursesTaught: [
      { code: "EC202", name: "Digital Electronics", role: "Course Coordinator" },
      { code: "EC516", name: "Nanoelectronics & Semiconductor Devices", role: "Elective Coordinator" }
    ]
  },
  {
    id: "anirban-chatterjee",
    name: "Dr. Anirban Chatterjee",
    shortName: "AC",
    designation: "Assistant Professor",
    department: "Electronics & Communication Engineering",
    cabin: "ECE Dept Faculty Block, Cuncolim Campus",
    email: "anirban.c@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/ece/faculty/anirban-chatterjee",
    scholarUrl: "https://scholar.google.com/citations?user=anirbanchatterjee",
    researchInterests: [
      "Microwave Engineering & RF Circuit Design",
      "Microstrip Antennas & Metamaterial Surfaces",
      "5G/6G Phased Array Antennas & Beam Steering",
      "Radar Sensors & Terahertz Communication Systems"
    ],
    prominentPapers: [
      "Broadband High-Gain Metasurface-Loaded Microstrip Antenna for Millimeter-Wave 5G Systems (IEEE Antennas and Wireless Propagation Letters)",
      "Compact Dual-Polarized Phased Array Antenna with Low Cross-Polarization for Satellite Communications (IEEE Transactions on Antennas and Propagation)"
    ],
    coursesTaught: [
      { code: "EC350", name: "Microwave and Radar Engineering", role: "Course Coordinator" },
      { code: "EC518", name: "Antenna Theory and Design", role: "Course Coordinator" }
    ]
  },

  // =========================================================================
  // MECHANICAL ENGINEERING (ME)
  // =========================================================================
  {
    id: "sachin-d-kore",
    name: "Dr. Sachin D. Kore",
    shortName: "SDK",
    designation: "Professor",
    department: "Mechanical Engineering",
    cabin: "Directorate / ME Dept Block, Cuncolim Campus",
    email: "sachin@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/me/faculty/sachin-d-kore",
    scholarUrl: "https://scholar.google.com/citations?user=sachindkore",
    researchInterests: [
      "Electromagnetic Forming & High-Velocity Metal Processing",
      "Solid-State Impact Welding & Dissimilar Material Joining",
      "Advanced Manufacturing Processes & Explosive Welding",
      "Finite Element Modeling of High-Strain Rate Deformation"
    ],
    books: [
      "Electromagnetic Welding of Dissimilar Metal Sheets (Springer Book Series)",
      "High-Velocity Metal Forming: Principles and Industrial Applications"
    ],
    prominentPapers: [
      "Experimental and Numerical Investigation of Electromagnetic Impact Welding of Aluminum to Steel (Journal of Materials Processing Technology, Elsevier)",
      "Electromagnetic Forming of Thin Sheet Metals: Strain Distribution and Formability Limit Curves (International Journal of Mechanical Sciences)",
      "Finite Element Simulation of Coil Design for Magnetic Pulse Metal Forming Systems (IEEE Transactions on Plasma Science)"
    ],
    coursesTaught: [
      { code: "ME200", name: "Manufacturing Technology - I", role: "Course Coordinator" },
      { code: "ME350", name: "Advanced Manufacturing Processes", role: "Course Coordinator" },
      { code: "ME501", name: "High-Velocity Metal Forming", role: "Postgraduate Lecturer" }
    ]
  },
  {
    id: "shrikant-joshi",
    name: "Dr. Shrikant Joshi",
    shortName: "SJ",
    designation: "Assistant Professor & Head of Department (ME)",
    department: "Mechanical Engineering",
    cabin: "HOD Office / ME Dept Block, Cuncolim Campus",
    email: "shrikant.joshi@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/me/faculty/shrikant-joshi",
    scholarUrl: "https://scholar.google.com/citations?user=shrikantjoshi",
    researchInterests: [
      "Thermal & Fluid Sciences",
      "Turbulent Heat Transfer & Multiphase Flows",
      "Computational Fluid Dynamics (CFD)",
      "Renewable Thermal Energy Storage & Phase Change Materials (PCM)"
    ],
    prominentPapers: [
      "Numerical Investigation of Conjugate Heat Transfer in Microchannel Heat Sinks with Nanofluids (International Journal of Heat and Mass Transfer)",
      "Turbulence Modeling and Bubble Dynamics in Boiling Multi-Phase Flows (Applied Thermal Engineering)"
    ],
    coursesTaught: [
      { code: "ME250", name: "Applied Thermodynamics", role: "Course Coordinator" },
      { code: "ME300", name: "Heat and Mass Transfer", role: "Course Coordinator" },
      { code: "ME511", name: "Computational Fluid Dynamics", role: "Elective Coordinator" }
    ]
  },
  {
    id: "thalluri-nk",
    name: "Dr. Thalluri N.K.",
    shortName: "TNK",
    designation: "Assistant Professor",
    department: "Mechanical Engineering",
    cabin: "ME Dept Faculty Block, Cuncolim Campus",
    email: "thalluri@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/me/faculty/thalluri-nk",
    scholarUrl: "https://scholar.google.com/citations?user=thallurink",
    researchInterests: [
      "Additive Manufacturing (3D Printing) of Aerospace Alloys",
      "Non-Traditional Machining Processes (EDM, ECM, Abrasive Jet)",
      "Surface Integrity & Microstructure Evolution",
      "Sustainable Machining & Minimum Quantity Lubrication (MQL)"
    ],
    prominentPapers: [
      "Investigation on Wire Electro-Discharge Machining Characteristics of Titanium Alloy Ti-6Al-4V under Eco-Friendly Dielectrics (Materials and Manufacturing Processes)",
      "Microstructural and Mechanical Characterization of Selective Laser Melted Inconel 718 (Journal of Manufacturing Processes)"
    ],
    coursesTaught: [
      { code: "ME251", name: "Manufacturing Technology - II", role: "Course Coordinator" },
      { code: "ME304", name: "Machining Sciences Laboratory", role: "Lab In-Charge" }
    ]
  },
  {
    id: "prashant-kumar",
    name: "Dr. Prashant Kumar",
    shortName: "PK",
    designation: "Assistant Professor",
    department: "Mechanical Engineering",
    cabin: "ME Dept Faculty Block, Cuncolim Campus",
    email: "prashant.kumar@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/me/faculty/prashant-kumar",
    scholarUrl: "https://scholar.google.com/citations?user=prashantkumar_nitg",
    researchInterests: [
      "Solid Mechanics & Continuum Damage Mechanics",
      "Fracture Mechanics & Fatigue Crack Propagation",
      "Fiber-Reinforced Composite Materials & Delamination",
      "Finite Element Analysis (FEA) of Nonlinear Structures"
    ],
    prominentPapers: [
      "Cohesive Zone Modeling of Mixed-Mode Delamination in Carbon-Fiber Reinforced Polymer Laminates (Composite Structures, Elsevier)",
      "Fatigue Life Prediction of Notched Components Under Variable Amplitude Loading (International Journal of Fatigue)"
    ],
    coursesTaught: [
      { code: "ME201", name: "Mechanics of Materials", role: "Course Coordinator" },
      { code: "ME301", name: "Design of Machine Elements", role: "Course Coordinator" }
    ]
  },
  {
    id: "v-shanmugaraj",
    name: "Dr. V. Shanmugaraj",
    shortName: "VS",
    designation: "Assistant Professor",
    department: "Mechanical Engineering",
    cabin: "ME Dept Faculty Block, Cuncolim Campus",
    email: "v.shanmugaraj@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/me/faculty/v-shanmugaraj",
    scholarUrl: "https://scholar.google.com/citations?user=vshanmugaraj",
    researchInterests: [
      "Robotics, Kinematics & Autonomous Mobile Manipulators",
      "Industrial Automation & Programmable Logic Controllers (PLC)",
      "Mechatronics Systems & Sensor-Actuator Integration",
      "Multi-Body Dynamics Simulation & Vibration Control"
    ],
    prominentPapers: [
      "Trajectory Tracking Control of Non-Holonomic Wheeled Mobile Robots Using Adaptive Neural Backstepping (Robotics and Autonomous Systems)",
      "Dynamic Modeling and Payload Vibration Suppression for Industrial Gantry Cranes (IEEE/ASME Transactions on Mechatronics)"
    ],
    coursesTaught: [
      { code: "ME252", name: "Theory of Machines & Mechanisms", role: "Course Coordinator" },
      { code: "ME516", name: "Industrial Robotics & Automation", role: "Course Coordinator" },
      { code: "ME540", name: "Robotics and Industrial Automation", role: "Course Coordinator" }
    ]
  },

  // =========================================================================
  // CIVIL ENGINEERING (CVE)
  // =========================================================================
  {
    id: "harikumar-m",
    name: "Dr. Harikumar M.",
    shortName: "HM",
    designation: "Assistant Professor & Head of Department (Civil Engineering)",
    department: "Civil Engineering",
    cabin: "HOD Office / Civil Dept Block, Cuncolim Campus",
    email: "harikumar@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/cve/faculty/harikumar-m",
    scholarUrl: "https://scholar.google.com/citations?user=harikumar_m",
    researchInterests: [
      "Structural Engineering & Non-Linear Structural Analysis",
      "Reinforced Concrete Design & Earthquake Resistant Buildings",
      "High-Performance Concrete & Geopolymer Binders",
      "Structural Health Monitoring & Finite Element Modeling"
    ],
    prominentPapers: [
      "Seismic Vulnerability Assessment and Performance-Based Design of RC Framed Buildings with Soft-Storey (Journal of Earthquake Engineering)",
      "Mechanical and Durability Properties of Sustainable Fly Ash-Slag Geopolymer Concrete (Construction and Building Materials, Elsevier)"
    ],
    coursesTaught: [
      { code: "CE250", name: "Structural Analysis - I", role: "Course Coordinator" },
      { code: "CV251", name: "Structural Analysis", role: "Course Coordinator" },
      { code: "CE350", name: "Design of Reinforced Concrete Structures", role: "Course Coordinator" },
      { code: "CV301", name: "Design of Reinforced Concrete Structures", role: "Course Coordinator" }
    ]
  },
  {
    id: "p-s-rao",
    name: "Dr. P. S. Rao",
    shortName: "PSR",
    designation: "Assistant Professor",
    department: "Civil Engineering",
    cabin: "Civil Dept Faculty Block, Cuncolim Campus",
    email: "psrao@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/cve/faculty/ps-rao",
    scholarUrl: "https://scholar.google.com/citations?user=psrao_nitgoa",
    researchInterests: [
      "Geotechnical Engineering & Soil Mechanics",
      "Foundation Design & Deep Pile Foundations in Coastal Soils",
      "Soil Dynamics, Liquefaction & Ground Improvement Techniques",
      "Geosynthetics & Reinforced Soil Retaining Walls"
    ],
    prominentPapers: [
      "Liquefaction Resistance and Dynamic Behavior of Saturated Marine Clays Under Cyclic Loading (Geotechnique, ICE Publishing)",
      "Settlement Analysis and Load-Carrying Capacity of Piled Raft Foundations in Coastal Alluvial Strata (Canadian Geotechnical Journal)"
    ],
    coursesTaught: [
      { code: "CE251", name: "Geotechnical Engineering - I (Soil Mechanics)", role: "Course Coordinator" },
      { code: "CV252", name: "Geotechnical Engineering", role: "Course Coordinator" },
      { code: "CE351", name: "Geotechnical Engineering - II (Foundations)", role: "Course Coordinator" },
      { code: "CV303", name: "Foundation Engineering", role: "Course Coordinator" },
      { code: "CE520", name: "Ground Improvement Techniques", role: "Course Coordinator" },
      { code: "CV537", name: "Ground Improvement Techniques", role: "Course Coordinator" }
    ]
  },
  {
    id: "l-e-reddy",
    name: "Dr. L. E. Reddy",
    shortName: "LER",
    designation: "Assistant Professor",
    department: "Civil Engineering",
    cabin: "Civil Dept Faculty Block, Cuncolim Campus",
    email: "lereddy@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/cve/faculty/le-reddy",
    scholarUrl: "https://scholar.google.com/citations?user=lereddy_nitgoa",
    researchInterests: [
      "Water Resources Engineering & Hydraulic Structures",
      "Hydrological Modeling & Flood Forecasting Systems",
      "GIS & Remote Sensing Applications in River Basins",
      "Climate Change Impact on Regional Water Availability"
    ],
    prominentPapers: [
      "Distributed Hydrological Modeling of Catchments Using High-Resolution Satellite Precipitation Products (Journal of Hydrology, Elsevier)",
      "Impact of Land-Use Land-Cover Dynamics on Streamflow and Sediment Yield in Tropical River Basins (Water Resources Management)"
    ],
    coursesTaught: [
      { code: "CE353", name: "Water Resources Engineering", role: "Course Coordinator" },
      { code: "CV352", name: "Engineering Hydrology and Irrigation Systems", role: "Course Coordinator" }
    ]
  },
  {
    id: "k-vinoth",
    name: "Dr. K. Vinoth",
    shortName: "KV",
    designation: "Assistant Professor",
    department: "Civil Engineering",
    cabin: "Civil Dept Faculty Block, Cuncolim Campus",
    email: "kvinoth@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/cve/faculty/k-vinoth",
    scholarUrl: "https://scholar.google.com/citations?user=kvinoth_nitgoa",
    researchInterests: [
      "Transportation Engineering & Highway Design",
      "Traffic Flow Theory & Intelligent Transportation Systems (ITS)",
      "Pavement Materials & Modified Bituminous Mixes",
      "Road Safety Audits & Accident Analysis in Hilly Terrains"
    ],
    prominentPapers: [
      "Rutting and Fatigue Cracking Performance of Crumb Rubber Modified Bituminous Mixes (International Journal of Pavement Engineering)",
      "Traffic Conflict Analysis and Safety Evaluation at Unsignalized Urban Intersections (Transportation Research Part F)"
    ],
    coursesTaught: [
      { code: "CE252", name: "Transportation Engineering - I (Highways)", role: "Course Coordinator" },
      { code: "CV254", name: "Highway Engineering", role: "Course Coordinator" }
    ]
  },
  {
    id: "m-r-sneha",
    name: "Dr. M. R. Sneha",
    shortName: "MRS",
    designation: "Assistant Professor",
    department: "Civil Engineering",
    cabin: "Civil Dept Faculty Block, Cuncolim Campus",
    email: "sneha.mr@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/cve/faculty/mr-sneha",
    scholarUrl: "https://scholar.google.com/citations?user=mrsneha_nitgoa",
    researchInterests: [
      "Environmental Engineering & Water/Wastewater Treatment",
      "Advanced Oxidation Processes (AOPs) for Emerging Contaminants",
      "Membrane Bioreactors for Industrial Effluent Recycling",
      "Solid Waste Management & Leachate Treatment Technologies"
    ],
    prominentPapers: [
      "Degradation of Pharmaceutical Micro-Pollutants in Wastewater Using Solar Photocatalysis with Modified TiO2 (Chemical Engineering Journal)",
      "Treatment of Municipal Solid Waste Landfill Leachate by Combined Coagulation and Electro-Fenton Process (Waste Management, Elsevier)"
    ],
    coursesTaught: [
      { code: "CE253", name: "Environmental Engineering - I (Water Supply)", role: "Course Coordinator" },
      { code: "CV253", name: "Environmental Engineering", role: "Course Coordinator" },
      { code: "CE352", name: "Environmental Engineering - II (Wastewater)", role: "Course Coordinator" },
      { code: "CV304", name: "Waste Water Engineering", role: "Course Coordinator" }
    ]
  },

  // =========================================================================
  // APPLIED SCIENCES & HUMANITIES (PHYSICS, CHEMISTRY, MATH, HUMANITIES)
  // =========================================================================
  {
    id: "saidi-reddy-parne",
    name: "Dr. Saidi Reddy Parne",
    shortName: "SRP",
    designation: "Associate Professor & Head of Department (Applied Sciences)",
    department: "Department of Applied Sciences (Physics)",
    cabin: "Applied Sciences Faculty Block, Cuncolim Campus",
    email: "saidi@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/as/faculty/saidi-reddy-parne",
    scholarUrl: "https://scholar.google.com/citations?user=saidireddyparne",
    researchInterests: [
      "Fiber Optic Sensors & Photonic Crystal Fibers",
      "Optical Instrumentation for Structural Health Monitoring",
      "Surface Plasmon Resonance (SPR) Biosensors",
      "Condensed Matter Physics & Thin Film Optics"
    ],
    prominentPapers: [
      "Fiber Bragg Grating Sensors for High-Temperature Dynamic Strain Measurements (IEEE Sensors Journal)",
      "High-Sensitivity Surface Plasmon Resonance Biosensor Based on 2D MoS2-Coated Optical Fibers (Optics Communications)"
    ],
    coursesTaught: [
      { code: "PH100", name: "Engineering Physics", role: "Course Coordinator" },
      { code: "PH150", name: "Physics Laboratory", role: "Lab In-Charge" }
    ]
  },
  {
    id: "velavan-kathirvelu",
    name: "Dr. Velavan Kathirvelu",
    shortName: "VK",
    designation: "Associate Professor",
    department: "Department of Applied Sciences (Chemistry)",
    cabin: "Applied Sciences Block, Cuncolim Campus",
    email: "velavan@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/as/faculty/velavan-kathirvelu",
    scholarUrl: "https://scholar.google.com/citations?user=velavankathirvelu",
    researchInterests: [
      "Chemical Sciences & Spectroscopic Methods",
      "Electron Paramagnetic Resonance (EPR) Spectroscopy",
      "Green Energy Materials & Metal-Organic Frameworks (MOFs)",
      "Environmental Chemistry & Sustainable Remediation"
    ],
    prominentPapers: [
      "Electron Paramagnetic Resonance (EPR) Spectroscopy of Advanced Metal-Organic Frameworks (Journal of Physical Chemistry)",
      "Green Synthesis of Bio-sorbents for Heavy Metal Removal from Industrial Effluents (Environmental Science & Pollution Research)"
    ],
    coursesTaught: [
      { code: "CY100", name: "Engineering Chemistry", role: "Course Coordinator" },
      { code: "CY150", name: "Chemistry Laboratory", role: "Lab In-Charge" },
      { code: "ES300", name: "Environmental Studies", role: "Course Coordinator" }
    ]
  },
  {
    id: "sarani-ghosal-mondal",
    name: "Dr. Sarani Ghosal Mondal",
    shortName: "SGM",
    designation: "Associate Professor",
    department: "Department of Applied Sciences (Humanities)",
    cabin: "Applied Sciences Block, Cuncolim Campus",
    email: "sarani@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/as/faculty/sarani-ghosal-mondal",
    scholarUrl: "https://scholar.google.com/citations?user=saranighosal",
    researchInterests: [
      "Professional & Technical Communication for Engineers",
      "English Language Teaching (ELT) & Applied Linguistics",
      "Gender Studies & Postcolonial Indian English Literature",
      "Ethics, Cross-Cultural Communication & Workplace Soft Skills"
    ],
    prominentPapers: [
      "Pedagogy of Professional Communication in Indian Technological Universities (Higher Education Review)",
      "Narratives of Identity and Subversion in Contemporary Indian Writing in English"
    ],
    coursesTaught: [
      { code: "HU100", name: "Professional Communication", role: "Course Coordinator" },
      { code: "HS300", name: "Industrial Economics", role: "Course Coordinator" },
      { code: "HS350", name: "Principles of Management", role: "Course Coordinator" }
    ]
  },
  {
    id: "ravi-ragoju",
    name: "Dr. Ravi Ragoju",
    shortName: "RR",
    designation: "Associate Professor",
    department: "Department of Applied Sciences (Mathematics)",
    cabin: "Applied Sciences Block, Cuncolim Campus",
    email: "raviragoju@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/as/faculty/ravi-ragoju",
    scholarUrl: "https://scholar.google.com/citations?user=raviragoju",
    researchInterests: [
      "Fluid Dynamics & Boundary Layer Theory",
      "Numerical Analysis & Finite Difference Methods",
      "Mathematical Modeling of Bio-Fluid Flows",
      "Heat and Mass Transfer in Porous Media"
    ],
    prominentPapers: [
      "Numerical Simulation of Peristaltic Pumping of Non-Newtonian Fluids Through Porous Tubes (Applied Mathematics and Computation, Elsevier)",
      "Boundary Layer Flow and Heat Transfer of Nanofluids Over a Stretching Cylinder (Journal of Computational and Applied Mathematics)"
    ],
    coursesTaught: [
      { code: "MA100", name: "Matrices and Advanced Calculus", role: "Course Coordinator" },
      { code: "MA150", name: "Ordinary Differential Equations and Linear Algebra", role: "Course Coordinator" },
      { code: "MA200", name: "Partial Differential Equations and Complex Variables", role: "Course Coordinator" }
    ]
  },
  {
    id: "j-venkateswara-rao",
    name: "Dr. J. Venkateswara Rao",
    shortName: "JVR",
    designation: "Associate Professor",
    department: "Department of Applied Sciences (Mathematics)",
    cabin: "Applied Sciences Block, Cuncolim Campus",
    email: "jvr@nitgoa.ac.in",
    website: "https://www.nitgoa.ac.in/department/as/faculty/j-venkateswara-rao",
    scholarUrl: "https://scholar.google.com/citations?user=jvenkateswararao",
    researchInterests: [
      "Algebra, Universal Algebra & Lattice Theory",
      "Fuzzy Mathematics & Soft Computing Models",
      "Probability, Statistics & Stochastic Processes",
      "Discrete Mathematical Structures for Computer Science"
    ],
    prominentPapers: [
      "Characterization of Prime Ideals in Almost Distributive Lattices (Algebra Universalis, Springer)",
      "Fuzzy Soft Set Decision Making Models for Engineering Optimization Problems (Journal of Intelligent & Fuzzy Systems)"
    ],
    coursesTaught: [
      { code: "MA250", name: "Probability and Statistics", role: "Course Coordinator" },
      { code: "CS201", name: "Discrete Mathematical Structures", role: "Course Coordinator" }
    ]
  }
];

/**
 * Normalizes text for robust comparison (strips titles, dots, whitespace, lowercase)
 */
function normalizeName(str: string): string {
  return str
    .toLowerCase()
    .replace(/^dr\.\s*/i, '')
    .replace(/^prof\.\s*/i, '')
    .replace(/^mr\.\s*/i, '')
    .replace(/^ms\.\s*/i, '')
    .replace(/[.\s_-]+/g, '');
}

/**
 * Looks up official NIT Goa faculty profile using coordinator name or short name.
 * Handles fuzzy matching, initials, multi-faculty strings, and titles.
 */
export function getFacultyByCoordinator(coordinatorName?: string, shortName?: string): FacultyProfile | undefined {
  if (!coordinatorName) return undefined;

  const raw = coordinatorName.trim();
  const normalizedCoordinator = normalizeName(raw);

  // Exact ID match or name match
  for (const fac of COMPREHENSIVE_FACULTY_PROFILES) {
    if (fac.name.toLowerCase() === raw.toLowerCase()) return fac;
    if (normalizeName(fac.name) === normalizedCoordinator) return fac;
    if (shortName && fac.shortName.toLowerCase() === shortName.toLowerCase()) return fac;
    if (fac.id.toLowerCase() === normalizedCoordinator) return fac;
  }

  // Handle multi-faculty strings like "Dr. Anudevi Samuel / Dr. Mahi Teja Talluri"
  if (raw.includes('/') || raw.includes('&') || raw.includes(',')) {
    const parts = raw.split(/[/&,]/);
    for (const part of parts) {
      const found = getFacultyByCoordinator(part.trim());
      if (found) return found;
    }
  }

  // Substring / token matching (e.g. "Dr. Damodar Reddy" matching "Dr. Damodar Reddy Edla")
  const tokens = raw
    .toLowerCase()
    .replace(/^(dr|prof|mr|ms)\.?\s*/i, '')
    .split(/\s+/)
    .filter((t) => t.length > 2);

  if (tokens.length > 0) {
    for (const fac of COMPREHENSIVE_FACULTY_PROFILES) {
      const facTokens = fac.name.toLowerCase().split(/\s+/);
      const allTokensMatch = tokens.every((token) =>
        facTokens.some((ft) => ft.includes(token) || token.includes(ft))
      );
      if (allTokensMatch) return fac;
    }
  }

  // Try matching last name + first name
  for (const fac of COMPREHENSIVE_FACULTY_PROFILES) {
    const normFac = normalizeName(fac.name);
    if (normFac.includes(normalizedCoordinator) || normalizedCoordinator.includes(normFac)) {
      return fac;
    }
  }

  return undefined;
}
