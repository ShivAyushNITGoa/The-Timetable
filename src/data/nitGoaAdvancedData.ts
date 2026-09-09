export interface NitGoaLabFacility {
  name: string;
  location: string;
  equipment: string[];
  edaLicenses: string[];
  relevanceToVLSI: string;
}

export interface EEEAdvantageMapping {
  subject: string;
  semesterInNITGoa: string;
  semiconductorSpecialty: string;
  howToPitchInInterview: string;
  interviewerQuestionExample: string;
  modelAnswerSnippet: string;
}

export interface CapstoneProjectProposal {
  id: string;
  title: string;
  track: 'RTL Design' | 'ASIC Verification' | 'FPGA Accelerator' | 'Embedded Automotive' | 'Open-Source ASIC' | 'AMS / Power';
  problemStatement: string;
  hardwareRequired: string;
  toolchain: string;
  deliverables: string[];
  resumeBulletExample: string;
  nitGoaSuitability: string;
}

export interface WhiteboardDrillQuestion {
  id: string;
  topic: string;
  companyTarget: string;
  question: string;
  equationOrCircuit: string;
  stepByStepDerivation: string[];
  candidateTrap: string;
  keyTakeaway?: string;
}

export interface TimelineMilestoneMonth {
  monthYear: string;
  academicStage: string;
  focusTitle: string;
  milestoneId: string;
  category: 'Academics' | 'Summer Sprint' | 'Placements' | 'Projects' | 'Interview Prep';
  actionItems: string[];
  statusTag: 'Completed' | 'Critical Immediate' | 'Upcoming' | 'Future';
}

export interface ExtendedNITGoaCompany {
  company: string;
  category: 'Tier-1 Semiconductor MNC' | 'VLSI Design Services & Indian Fabless' | 'Automotive & Industrial Embedded';
  locationHiring: string;
  cgpaCutoff: string;
  typicalRoles: string[];
  compensationIndia: string;
  hiringMode: string;
  keyTechnicalFocus: string[];
  interviewProcess: string;
}

// 1. Campus Labs & Physical Facilities at NIT Goa
export const NIT_GOA_LAB_FACILITIES: NitGoaLabFacility[] = [
  {
    name: 'VLSI & Embedded Systems Design Laboratory',
    location: 'Electrical & Electronics Engineering Department, NIT Goa Campus',
    equipment: [
      'Digilent Basys-3 Artix-7 FPGA Trainer Kits (XC7A35T)',
      'Digilent Zybo Z7 Zynq-7000 ARM/FPGA SoC Evaluation Boards',
      'Texas Instruments MSP430 & C2000 LaunchPads',
      'STM32F4 Discovery Boards (ARM Cortex-M4 @ 168MHz)',
      '100MHz / 200MHz Mixed Signal Digital Storage Oscilloscopes (DSO)',
      '16-Channel USB Hardware Logic Analyzers',
      'PCB Prototyping & SMD Soldering Station'
    ],
    edaLicenses: [
      'Cadence University Bundle (Virtuoso IC618, Spectre, Innovus, Genus)',
      'Xilinx Vivado ML Enterprise Design Suite',
      'Siemens / Mentor Graphics Questa Sim / ModelSim',
      'Synopsys Custom Compiler & HSPICE (Academic Tier)'
    ],
    relevanceToVLSI: 'Provides certified industrial EDA access and physical FPGA bitstream verification needed for synthesizable RTL projects and CMOS layout studies.'
  },
  {
    name: 'Microprocessor & Digital Electronics Laboratory',
    location: 'Dept of EEE, NIT Goa',
    equipment: [
      '8051 & 8086 Microprocessor Hardware Trainer Kits with Keypad/LED/LCD',
      'Dual-Trace CROs and Arbitrary Function Generators',
      'Digital IC Testers (74-series TTL / 4000-series CMOS logic gates)'
    ],
    edaLicenses: ['Keil uVision IDE', 'GNU ARM Embedded Toolchain (arm-none-eabi-gcc)', 'Icarus Verilog + GTKWave'],
    relevanceToVLSI: 'Builds intuition for register banks, peripheral bus addressing, interrupt vectors, and low-level memory maps directly leveraged in SoC architecture interviews.'
  }
];

// 2. The "EEE Advantage vs ECE Dilemma" Matrix
export const EEE_ADVANTAGE_MATRIX: EEEAdvantageMapping[] = [
  {
    subject: 'Power Electronics & Drives',
    semesterInNITGoa: '5th & 6th Semesters',
    semiconductorSpecialty: 'Power Delivery Networks (PDN), PMIC Design & On-Chip Regulators',
    howToPitchInInterview: 'Highlight deep understanding of switching converter topologies (Buck, Boost, LDO), transient response, and $L \\cdot di/dt$ voltage droop across chip package parasitics.',
    interviewerQuestionExample: 'How does high clock frequency switching lead to supply voltage droop in high-performance GPU silicon, and how do you calculate decoupling capacitor sizing?',
    modelAnswerSnippet: 'Supply noise occurs because $V_{droop} = L_{pkg} \\cdot \\frac{di}{dt} + I_{peak} \\cdot R_{grid}$. As EEE students, we analyze the resonant frequency $f_{res} = \\frac{1}{2\\pi\\sqrt{L C}}$ of the PDN impedance curve $Z_{pdn}(f)$ to size multi-tier on-die and package decoupling capacitors below target impedance $Z_{target} = \\frac{\\Delta V_{allowed}}{I_{step}}$.'
  },
  {
    subject: 'Control Systems Engineering',
    semesterInNITGoa: '4th & 5th Semesters',
    semiconductorSpecialty: 'Phase-Locked Loops (PLL), Clock Generation & Clock Data Recovery (CDR)',
    howToPitchInInterview: 'Frame transfer function analysis, damping factor $\\zeta$, natural frequency $\\omega_n$, and Bode phase margin as the fundamental mathematical physics behind PLL charge pumps and jitter attenuation.',
    interviewerQuestionExample: 'Explain why a second-order Phase-Locked Loop requires a series resistor with the loop filter capacitor, and relate it to loop stability.',
    modelAnswerSnippet: 'A pure charge pump feeding a capacitor has open-loop transfer function $G(s) = \\frac{K_{vco} I_p}{2\\pi s^2 C}$, which has two poles at the origin ($180^\\circ$ phase lag, zero phase margin). Adding resistor $R$ inserts a stabilizing zero at $\\omega_z = \\frac{1}{R C}$, increasing phase margin to $>45^\\circ$ to ensure transient settling without ringing.'
  },
  {
    subject: 'Signals & Systems and DSP',
    semesterInNITGoa: '4th & 7th Semesters (EE543)',
    semiconductorSpecialty: 'Hardware Compute Engines, Systolic Arrays & Audio/Video DSP Cores',
    howToPitchInInterview: 'Emphasize translating mathematical Z-transforms and convolution equations into pipelined Verilog Multiply-Accumulate (MAC) datapaths with finite word-length saturation arithmetic.',
    interviewerQuestionExample: 'What is the hardware area and latency tradeoff between a Direct-Form I and Transposed Direct-Form II FIR filter implementation in FPGA DSP48 slices?',
    modelAnswerSnippet: 'Direct-Form I requires high fanout on the input signal driving all delay taps simultaneously, whereas Transposed Form places delay elements directly between adder outputs. The transposed form eliminates adder trees, allows direct systolic chaining using dedicated internal DSP48 accumulator registers, and runs at maximum clock frequency ($F_{max} > 450\\text{ MHz}$) on Artix-7.'
  },
  {
    subject: 'Electromagnetic Field Theory & Network Theory',
    semesterInNITGoa: '3rd & 4th Semesters',
    semiconductorSpecialty: 'High-Speed Signal Integrity (SI), Crosstalk & Transmission Lines',
    howToPitchInInterview: 'Leverage transmission line physics, characteristic impedance ($Z_0 = \\sqrt{L/C}$), skin depth, and return path loop inductance for high-speed PCIe, DDR, and SerDes interfaces.',
    interviewerQuestionExample: 'Why must high-speed PCB traces be impedance matched to $50\\;\\Omega$, and what happens if a driver drives an open-ended transmission line?',
    modelAnswerSnippet: 'When propagation delay $t_{prop} > \\frac{t_{rise}}{2}$, wire acts as a distributed transmission line. An impedance mismatch produces a reflection coefficient $\\Gamma = \\frac{Z_L - Z_0}{Z_L + Z_0}$. For an open end ($Z_L = \\infty$), $\\Gamma = +1$, doubling the voltage at the receiver ($2 V_{in}$) and causing ringing, dielectric breakdown, and false clock edge triggering.'
  },
  {
    subject: 'Analog Electronics & Semiconductor Devices',
    semesterInNITGoa: '3rd & 4th Semesters',
    semiconductorSpecialty: 'CMOS Physics, Sub-threshold Leakage & Analog/Mixed-Signal Verification',
    howToPitchInInterview: 'Explain MOS channel length modulation, body effect, threshold voltage variation with temperature, and differential pair mismatch.',
    interviewerQuestionExample: 'Why does sub-threshold leakage current increase exponentially with temperature in deep submicron silicon?',
    modelAnswerSnippet: 'Subthreshold drain current follows $I_{sub} \\propto \\mu C_{ox} \\left(\\frac{W}{L}\\right) \\left(\\frac{k T}{q}\\right)^2 e^{\\frac{V_{gs} - V_{th}}{n (k T / q)}} \\left(1 - e^{-\\frac{V_{ds}}{k T / q}}\\right)$. Because thermal voltage $U_T = \\frac{k T}{q}$ increases with temperature and threshold voltage $V_{th}$ drops at $-1\\text{ to }-2\\text{ mV}/^\\circ\\text{C}$, leakage power escalates exponentially at high operating temperatures.'
  }
];

// 3. 6 B.Tech Capstone Project Proposals for NIT Goa EEE Students
export const BTECH_CAPSTONE_PROJECTS: CapstoneProjectProposal[] = [
  {
    id: 'capstone-riscv-soc',
    title: '5-Stage Pipelined RV32I Processor Core with AXI4-Lite Peripherals on Artix-7 FPGA',
    track: 'RTL Design',
    problemStatement: 'Design and synthesize a cycle-accurate 32-bit RISC-V pipelined core supporting hazard detection, data forwarding, branch prediction, and memory-mapped UART/Timer over AXI4 bus.',
    hardwareRequired: 'Digilent Basys-3 (Artix-7 XC7A35T) or Zybo Z7 Board',
    toolchain: 'Xilinx Vivado 2023.2, Verilator, GNU RISC-V Toolchain (riscv32-unknown-elf-gcc)',
    deliverables: [
      'Synthesizable SystemVerilog RTL matching RV32I user-level ISA',
      'Passes 100% of official RISC-V architectural compliance test vectors',
      'In-system bitstream execution displaying sensor readings via UART terminal on PC',
      'Resource utilization report (LUTs, BRAMs, DSP slices, Fmax > 75 MHz)'
    ],
    resumeBulletExample: 'Architected and synthesized 5-stage pipelined RV32I core in SystemVerilog on Artix-7 FPGA; engineered hazard-forwarding logic achieving 1.35 IPC and 82 MHz Fmax with AXI4-Lite peripheral subsystem.',
    nitGoaSuitability: 'Directly supported by NIT Goa EEE VLSI Lab Basys3 boards and eligible for final year B.Tech major project credits.'
  },
  {
    id: 'capstone-async-fifo-uvm',
    title: 'Dual-Clock Asynchronous FIFO CDC Engine with Industrial UVM Verification Suite',
    track: 'ASIC Verification',
    problemStatement: 'Develop a clock-domain crossing (CDC) asynchronous FIFO with Gray-code pointers, synthesized on 130nm, verified with full UVM agent, sequence, driver, monitor, and functional coverage model.',
    hardwareRequired: 'Host PC with EDA Simulators (Questa / VCS / ModelSim)',
    toolchain: 'QuestaSim / Siemens ModelSim, Synopsys VCS, Python cocotb',
    deliverables: [
      'Metastability-free dual-stage synchronizer RTL with parameterized data width & depth',
      'UVM testbench with constrained-random burst stimuli and scoreboard comparator',
      'Functional coverage report achieving 100% cross-coverage of full/empty corner states',
      'SpyGlass CDC lint report verifying zero structural race hazards'
    ],
    resumeBulletExample: 'Constructed dual-clock asynchronous FIFO in SystemVerilog; built industrial UVM testbench closing 100% functional and branch coverage with zero CDC violations under random burst stress.',
    nitGoaSuitability: 'Golden standard for Design Verification (DV) interview shortlisting at Qualcomm, Intel, and Synopsys.'
  },
  {
    id: 'capstone-edge-ai-fpga',
    title: 'Hardware-Accelerated INT8 2D Convolution Engine for Edge AI on Zynq SoC',
    track: 'FPGA Accelerator',
    problemStatement: 'Accelerate convolutional neural network layers using hardware line buffers and parallel systolic DSP48 multiply-accumulate units for low-latency image feature extraction.',
    hardwareRequired: 'Zybo Z7-20 / PYNQ-Z2 Zynq-7000 SoC Evaluation Board',
    toolchain: 'Xilinx Vivado, Vitis HLS, Python Jupyter PYNQ API',
    deliverables: [
      'Pipelined systolic array compute engine in SystemVerilog processing 3x3 kernel in 1 cycle',
      'Direct Memory Access (DMA) streaming interface feeding weights from DDR to BRAM',
      'Comparison benchmark demonstrating 14x speedup over ARM Cortex-A9 software baseline',
      'Dynamic power dissipation measurement showing <1.8W total thermal budget'
    ],
    resumeBulletExample: 'Designed systolic INT8 convolution accelerator in Verilog on Zynq-7000 FPGA; integrated AXI-DMA pipeline yielding 14x speedup over software baseline at 1.4W power consumption.',
    nitGoaSuitability: 'Directly bridges EEE DSP elective (EE543) with high-demand Edge AI silicon architecture.'
  },
  {
    id: 'capstone-openlane-asic',
    title: 'RTL-to-GDSII Physical Implementation of Low-Power AES-128 Accelerator on SkyWater 130nm',
    track: 'Open-Source ASIC',
    problemStatement: 'Take a hardware encryption IP from RTL through automated synthesis, floorplanning, placement, clock tree synthesis (CTS), routing, and physical signoff (DRC/LVS) using OpenLane.',
    hardwareRequired: 'Linux Workstation / Docker container',
    toolchain: 'OpenLane, Yosys, Magic, KLayout, OpenSTA, SkyWater 130nm PDK',
    deliverables: [
      'DRC & LVS clean GDSII layout ready for foundry shuttle tapeout',
      'Multi-corner static timing analysis reports proving positive setup/hold slack at 50 MHz',
      'Power distribution network IR-drop analysis showing <4% supply rail droop',
      'Total chip area under 0.8 mm² with 72% standard cell placement density'
    ],
    resumeBulletExample: 'Completed full physical design flow of AES-128 crypto-core in OpenLane on SkyWater 130nm PDK; closed DRC/LVS clean GDSII with zero timing violations and 72% core density.',
    nitGoaSuitability: 'Demonstrates rare hands-on tapeout fluency highly prized by Synopsys, Cadence, and ASIC service firms.'
  },
  {
    id: 'capstone-can-fd-controller',
    title: 'ISO 11898-1 Compliant CAN-FD Protocol Controller with Fault Confinement Logic',
    track: 'Embedded Automotive',
    problemStatement: 'Design a synthesizable Controller Area Network Flexible Data-Rate (CAN-FD) MAC layer supporting 5 Mbps data phase, bit stuffing, CRC-17/21 calculation, and error state counters.',
    hardwareRequired: 'Basys-3 FPGA board + External CAN Transceiver (MCP2551 / TJA1050) + STM32 Board',
    toolchain: 'Vivado, ModelSim, Saleae Logic Analyzer / DSO',
    deliverables: [
      'Synthesizable CAN-FD bitstream tested in hardware against commercial automotive MCU',
      'Fault confinement state machine (Error Active, Error Passive, Bus Off)',
      'Waveform capture showing seamless arbitration transition from 1 Mbps nominal to 5 Mbps data rate'
    ],
    resumeBulletExample: 'Engineered ISO 11898-1 CAN-FD protocol controller in SystemVerilog; verified hardware loopback with external transceiver at 5 Mbps with automatic CRC error frame generation.',
    nitGoaSuitability: 'Unlocks top automotive semiconductor roles at Texas Instruments, NXP, Microchip, and Bosch.'
  },
  {
    id: 'capstone-svpwm-inverter-fpga',
    title: 'FPGA-Based High-Frequency Space Vector PWM (SVPWM) Controller for BLDC Motors',
    track: 'AMS / Power',
    problemStatement: 'Combine core EEE electrical machine theory with high-speed digital logic by implementing 100 kHz dead-time protected SVPWM inverter timing generators in Verilog.',
    hardwareRequired: 'Basys-3 or Spartan-6 kit + 3-Phase MOSFET Inverter Bridge + BLDC Motor',
    toolchain: 'Vivado / ISE, MATLAB/Simulink for reference model comparison, Oscilloscope',
    deliverables: [
      'Microsecond Clarke/Park vector transformation hardware pipeline',
      'Programmable dead-time generator preventing bridge shoot-through short circuits',
      'Hardware oscilloscope measurement confirming sinusoidal motor phase currents'
    ],
    resumeBulletExample: 'Created 100 kHz Space-Vector PWM motor controller in Verilog on Artix-7 FPGA with hardware dead-time protection, achieving 94% harmonic efficiency on 3-phase inverter.',
    nitGoaSuitability: 'Capitalizes directly on NIT Goa EEE faculty expertise in Power Electronics and Electric Drives.'
  }
];

// 4. Extended Placement Playbook for Semiconductor MNCs Recruiting at NIT Goa
export const EXTENDED_NIT_GOA_COMPANIES: ExtendedNITGoaCompany[] = [
  {
    company: 'Qualcomm',
    category: 'Tier-1 Semiconductor MNC',
    locationHiring: 'Bangalore / Hyderabad / Chennai',
    cgpaCutoff: '8.0+ CGPA (Strict shortlist threshold for EEE/ECE)',
    typicalRoles: ['Associate Engineer - RTL Design', 'Modem Verification Engineer', 'SoC HW Validation Engineer'],
    compensationIndia: '₹18 LPA - ₹28 LPA (Base ₹14L - ₹17L + Joining Bonus + RSUs)',
    hiringMode: 'On-Campus at NIT Goa / Pooled Western Region',
    keyTechnicalFocus: ['Verilog FSMs', 'Setup & Hold Slack with Jitter', 'FIFO CDC Gray Coding', 'C/C++ Bitwise Logic'],
    interviewProcess: '1 Online Assessment (Digital Electronics + C + Aptitude) -> 2 Deep Technical Video Rounds -> 1 HR/Managerial Round.'
  },
  {
    company: 'Texas Instruments (TI)',
    category: 'Tier-1 Semiconductor MNC',
    locationHiring: 'Bangalore (TI India R&D Center)',
    cgpaCutoff: '7.5+ CGPA (Values circuit fundamentals heavily)',
    typicalRoles: ['Digital Design Engineer', 'Analog / AMS IC Design Engineer', 'Embedded Applications Engineer'],
    compensationIndia: '₹17 LPA - ₹26 LPA (Base ₹13L - ₹16L + Bonus + Benefits)',
    hiringMode: 'On-Campus at NIT Goa / National Contest (TI India Innovation Challenge)',
    keyTechnicalFocus: ['Op-Amp Internals & Bode Plots', 'RLC Transients & Laplace', 'CMOS Inverters', 'Microcontroller Peripherals'],
    interviewProcess: '1 Rigorous Written/Online Core Electrical & Electronics Exam -> 2 In-Depth Technical Interviews (Heavy Whiteboard Circuit Analysis) -> 1 Behavioral Round.'
  },
  {
    company: 'Intel Corporation',
    category: 'Tier-1 Semiconductor MNC',
    locationHiring: 'Bangalore (Intel India Technology Centre)',
    cgpaCutoff: '7.75+ CGPA',
    typicalRoles: ['Graduate Hardware Engineer (GHE)', 'Pre-Silicon DV Engineer', 'Emulation Validation Engineer'],
    compensationIndia: '₹16 LPA - ₹25 LPA (Base ₹12L - ₹15L + RSUs + Retirals)',
    hiringMode: 'Campus Pool / National Technical Hackathon',
    keyTechnicalFocus: ['Computer Architecture', 'Pipelining Hazards & Caches', 'SystemVerilog OOP', 'RTL Verilog Coding'],
    interviewProcess: 'Online HackerEarth Assessment -> 2-3 Technical Video Panels focusing on Digital Design, Microarchitecture & Verilog Coding.'
  },
  {
    company: 'AMD (Advanced Micro Devices)',
    category: 'Tier-1 Semiconductor MNC',
    locationHiring: 'Bangalore / Hyderabad',
    cgpaCutoff: '8.0+ CGPA',
    typicalRoles: ['Silicon Design Engineer 1', 'DV Engineer 1', 'FPGA Emulation Engineer'],
    compensationIndia: '₹17 LPA - ₹27 LPA',
    hiringMode: 'Virtual Pooled / Off-Campus Referral',
    keyTechnicalFocus: ['Static Timing Analysis (STA)', 'Verilog/SystemVerilog RTL', 'FPGA Architecture (CLBs/LUTs/BRAMs)'],
    interviewProcess: 'Online Test -> Technical Round 1 (Digital Design & Timing) -> Technical Round 2 (RTL/Verification Coding) -> Managerial.'
  },
  {
    company: 'Western Digital / SanDisk',
    category: 'Tier-1 Semiconductor MNC',
    locationHiring: 'Bangalore',
    cgpaCutoff: '7.5+ CGPA',
    typicalRoles: ['ASIC Verification Engineer', 'Firmware Engineer (NAND Flash)', 'FPGA Validation Engineer'],
    compensationIndia: '₹15 LPA - ₹24 LPA',
    hiringMode: 'On-Campus at NIT Goa / Pooled NIT Drive',
    keyTechnicalFocus: ['Memory Controller Architecture', 'PCIe / NVMe / AXI protocols', 'C Programming & Pointers', 'Digital Logic'],
    interviewProcess: 'Online MCQ + Coding Test -> 2 Technical Rounds (Focus on C Data Structures, Bit Manipulation & Digital Design) -> HR.'
  },
  {
    company: 'Synopsys',
    category: 'Tier-1 Semiconductor MNC',
    locationHiring: 'Bangalore / Hyderabad / Noida',
    cgpaCutoff: '7.5+ CGPA',
    typicalRoles: ['R&D Engineer 1 - EDA Software', 'Applications Engineer - Silicon IP', 'STA / Synthesis Specialist'],
    compensationIndia: '₹14 LPA - ₹23 LPA',
    hiringMode: 'National Talent Hunt / Pooled NITs',
    keyTechnicalFocus: ['C++ Data Structures & Graph Algorithms', 'Timing Constraints (SDC)', 'Verilog Synthesis Rules', 'TCL Scripting'],
    interviewProcess: 'Online Aptitude & Coding Assessment -> 2 Technical Rounds (Data Structures, Digital Logic & Graph Traversal) -> Manager.'
  },
  {
    company: 'Cadence Design Systems',
    category: 'Tier-1 Semiconductor MNC',
    locationHiring: 'Bangalore / Noida / Pune',
    cgpaCutoff: '7.5+ CGPA',
    typicalRoles: ['Software Engineer - Core EDA', 'Product Validation Engineer - Virtuoso/Innovus', 'Design Verification Intern'],
    compensationIndia: '₹14 LPA - ₹22 LPA',
    hiringMode: 'Virtual Campus Drives & Pooled NITs',
    keyTechnicalFocus: ['C++ OOP & Algorithms', 'Physical Design Flow (Floorplan/CTS/Routing)', 'Verilog / VHDL Simulators'],
    interviewProcess: 'Coding & Aptitude Test -> 2 Technical Interviews -> HR Round.'
  },
  {
    company: 'ARM',
    category: 'Tier-1 Semiconductor MNC',
    locationHiring: 'Bangalore',
    cgpaCutoff: '8.2+ CGPA (Very selective tier)',
    typicalRoles: ['Graduate Hardware Engineer', 'CPU Verification Engineer', 'Physical IP Engineer'],
    compensationIndia: '₹18 LPA - ₹28 LPA',
    hiringMode: 'National Graduate Hiring Pool / Career Portal',
    keyTechnicalFocus: ['ARMv8/v9 Architecture', 'AMBA AXI/AHB Protocols', 'Assembly & C Co-design', 'Cache Coherence'],
    interviewProcess: 'Rigorous Coding & Logic Test -> 3 Technical Rounds (Microarchitecture, SVA/UVM, Digital Logic) -> Cultural Interview.'
  },
  {
    company: 'Tessolve Semiconductor',
    category: 'VLSI Design Services & Indian Fabless',
    locationHiring: 'Bangalore / Hyderabad / Vizag',
    cgpaCutoff: '6.5+ CGPA',
    typicalRoles: ['Test Engineer (ATE & Silicon Validation)', 'Physical Design Trainee', 'Embedded Systems Engineer'],
    compensationIndia: '₹6.0 LPA - ₹10.5 LPA (Fast 2-yr hike to ₹16L+ via client deployment)',
    hiringMode: 'On-Campus at NIT Goa / Regional Drives',
    keyTechnicalFocus: ['Automated Test Equipment (ATE)', 'Analog & Digital Testing', 'C / Python Scripting', 'Lab Instrumentation'],
    interviewProcess: 'Written Aptitude & Technical Test -> 1 Technical Interview (Basic Circuits, Logic Gates, Lab Instruments) -> HR.'
  },
  {
    company: 'SmartSoC Solutions',
    category: 'VLSI Design Services & Indian Fabless',
    locationHiring: 'Bangalore / Hyderabad',
    cgpaCutoff: '6.5+ CGPA',
    typicalRoles: ['ASIC Physical Design Trainee', 'RTL & DV Trainee', 'FPGA Engineer'],
    compensationIndia: '₹5.5 LPA - ₹9.5 LPA',
    hiringMode: 'Campus Recruitment / Direct NIT Walk-ins',
    keyTechnicalFocus: ['Verilog Syntax', 'Synthesis Basics', 'CMOS Inverters', 'Linux Command Line'],
    interviewProcess: 'Technical Test -> Face-to-Face Technical Interview -> Offer.'
  },
  {
    company: 'Wipro VLSI / Engineering Services',
    category: 'VLSI Design Services & Indian Fabless',
    locationHiring: 'Bangalore / Hyderabad / Kochi',
    cgpaCutoff: '6.5+ CGPA',
    typicalRoles: ['VLSI Project Engineer', 'ASIC Verification Trainee', 'Embedded Firmware Engineer'],
    compensationIndia: '₹6.5 LPA - ₹11 LPA',
    hiringMode: 'On-Campus at NIT Goa (Bulk VLSI hiring band)',
    keyTechnicalFocus: ['Digital Electronics', 'Basic Verilog', 'C Programming', 'Operating Systems'],
    interviewProcess: 'National Elite National Talent Hunt (NLTH) -> Technical Interview -> HR.'
  },
  {
    company: 'Tata Elxsi (Semiconductor & Embedded)',
    category: 'VLSI Design Services & Indian Fabless',
    locationHiring: 'Bangalore / Trivandrum / Pune',
    cgpaCutoff: '7.0+ CGPA',
    typicalRoles: ['Silicon Design Engineer', 'Automotive Embedded Engineer', 'FPGA Engineer'],
    compensationIndia: '₹6.5 LPA - ₹11.5 LPA',
    hiringMode: 'On-Campus at NIT Goa',
    keyTechnicalFocus: ['Embedded C', 'Microcontroller Interfacing', 'AUTOSAR Basics', 'Verilog Design'],
    interviewProcess: 'Online Cognitive & Technical Test -> Technical Panel -> HR Discussion.'
  },
  {
    company: 'L&T Technology Services (LTTS)',
    category: 'VLSI Design Services & Indian Fabless',
    locationHiring: 'Bangalore / Mysore / Mumbai',
    cgpaCutoff: '7.0+ CGPA',
    typicalRoles: ['Hardware Design Engineer', 'VLSI Physical Design Trainee', 'FPGA Developer'],
    compensationIndia: '₹6.0 LPA - ₹10.0 LPA',
    hiringMode: 'On-Campus at NIT Goa',
    keyTechnicalFocus: ['PCB Layout Basics', 'Microprocessors', 'Digital Logic', 'C Programming'],
    interviewProcess: 'Online Test -> Technical Interview -> HR.'
  },
  {
    company: 'Robert Bosch (BGSW)',
    category: 'Automotive & Industrial Embedded',
    locationHiring: 'Bangalore / Coimbatore / Hyderabad',
    cgpaCutoff: '7.5+ CGPA',
    typicalRoles: ['Embedded Software Engineer', 'AUTOSAR Developer', 'Hardware-in-the-Loop (HIL) Test Engineer'],
    compensationIndia: '₹8 LPA - ₹14 LPA',
    hiringMode: 'On-Campus at NIT Goa',
    keyTechnicalFocus: ['Embedded C Pointers & Structs', 'CAN / SPI / I2C Buses', 'RTOS Concepts', 'Microcontroller Interrupts'],
    interviewProcess: 'Technical Assessment -> 1-2 Technical Interviews (Focus on Real-time Embedded Systems & C Code) -> HR.'
  },
  {
    company: 'Continental Automotive',
    category: 'Automotive & Industrial Embedded',
    locationHiring: 'Bangalore',
    cgpaCutoff: '7.0+ CGPA',
    typicalRoles: ['Associate Software Engineer - ADAS & Chassis', 'Embedded Systems Developer'],
    compensationIndia: '₹8 LPA - ₹13.5 LPA',
    hiringMode: 'Campus Pooled Drive',
    keyTechnicalFocus: ['ISO 26262 Safety Concepts', 'C / C++', 'Microcontroller Timers & ADC', 'Vehicle Networking'],
    interviewProcess: 'Online Test -> Technical Round -> Management Round.'
  }
];

// 5. Whiteboard Technical Interview Questions for EEE Candidates
export const EEE_WHITEBOARD_QUESTIONS: WhiteboardDrillQuestion[] = [
  {
    id: 'drill-setup-hold-skew',
    topic: 'Static Timing Analysis (STA) & Clock Skew',
    companyTarget: 'Qualcomm, Intel, AMD, TI',
    question: 'Two flip-flops $FF_1$ and $FF_2$ operate on clock period $T_{clk} = 5\\text{ ns}$. Parameters: $T_{cq} = 0.8\\text{ ns}$, $T_{setup} = 0.5\\text{ ns}$, $T_{hold} = 0.3\\text{ ns}$. Clock network delay to $FF_1$ is $0.6\\text{ ns}$ and to $FF_2$ is $1.1\\text{ ns}$. What is the maximum and minimum allowable combinational logic delay ($T_{comb}$) between them?',
    equationOrCircuit: 'T_{skew} = T_{clk2} - T_{clk1} = +0.5\\text{ ns}. \\quad \\text{Setup: } T_{cq} + T_{comb,max} + T_{setup} \\le T_{clk} + T_{skew}. \\quad \\text{Hold: } T_{cq} + T_{comb,min} \\ge T_{hold} + T_{skew}.',
    stepByStepDerivation: [
      'Clock skew $T_{skew} = T_{clk2} - T_{clk1} = 1.1\\text{ ns} - 0.6\\text{ ns} = +0.5\\text{ ns}$ (positive skew, helps setup, hurts hold).',
      '**Maximum Allowable Logic Delay (Setup Check):**',
      '$T_{cq} + T_{comb,max} + T_{setup} \\le T_{clk} + T_{skew}$',
      '$0.8 + T_{comb,max} + 0.5 \\le 5.0 + 0.5 \\implies T_{comb,max} + 1.3 \\le 5.5 \\implies \\mathbf{T_{comb,max} \\le 4.2\\text{ ns}}$.',
      '**Minimum Allowable Logic Delay (Hold Check):**',
      '$T_{cq} + T_{comb,min} \\ge T_{hold} + T_{skew}$',
      '$0.8 + T_{comb,min} \\ge 0.3 + 0.5 \\implies 0.8 + T_{comb,min} \\ge 0.8 \\implies \\mathbf{T_{comb,min} \\ge 0.0\\text{ ns}}$.',
      'Conclusion: Maximum combinational logic delay is $4.2\\text{ ns}$; minimum delay is $0.0\\text{ ns}$ (a direct wire between flops will safely satisfy hold time).'
    ],
    candidateTrap: 'Students often subtract skew from setup instead of adding it, or forget that positive clock skew eats directly into hold slack.',
    keyTakeaway: 'Positive clock skew ($T_{clk2} > T_{clk1}$) increases the available time for setup, but makes hold violations more likely.'
  },
  {
    id: 'drill-metastability-cdc',
    topic: 'Clock Domain Crossing (CDC) & MTBF Physics',
    companyTarget: 'Qualcomm, Synopsys, NVIDIA',
    question: 'Why does a simple 2-Flip-Flop synchronizer fail when passing a multi-bit binary counter across asynchronous clock domains, and why does Gray coding eliminate this hazard?',
    equationOrCircuit: '\\text{Binary 011 (3) } \\rightarrow \\text{ 100 (4) changes 3 bits simultaneously!} \\quad \\text{Gray 010 (3) } \\rightarrow \\text{ 110 (4) changes ONLY 1 bit.}',
    stepByStepDerivation: [
      'In a synchronous multi-bit binary transition from $3$ (`011`) to $4$ (`100`), all 3 bits change state simultaneously.',
      'Because of physical wire delay variations and gate threshold skews on the silicon die, the receiving clock domain does NOT capture all 3 bits at the exact same picosecond.',
      'If the receiving clock samples during the transition, it may latch any intermediate permutation: `000`, `001`, `010`, `111`, etc., producing an invalid spurious count and corrupting FIFO pointers.',
      '**Gray Code Solution:** A Gray code sequence is mathematically defined such that only **one single bit** ever changes state between any two adjacent increments.',
      'If the receiving clock samples right on the switching edge, only that single changing bit can experience metastability. The sampled value will resolve either to the old count or the new count—never to a random invalid state!',
      'Therefore, FIFO pointers remain monotonically valid and never skip or corrupt memory.'
    ],
    candidateTrap: 'Claiming that Gray code prevents metastability completely. Gray code does NOT prevent metastability on the changing bit; it guarantees that the resolved value is either $N$ or $N-1$, preventing erroneous jumps.'
  },
  {
    id: 'drill-blocking-vs-nonblocking',
    topic: 'Verilog Event Queue & Simulation Race Conditions',
    companyTarget: 'Intel, AMD, Western Digital, Synopsys',
    question: 'Explain why using blocking assignments (`=`) inside an `always @(posedge clk)` block causes non-deterministic simulation race conditions in shift registers, while non-blocking (`<=`) assignments behave deterministically.',
    equationOrCircuit: '\\text{Blocking: Active Region immediate update. } \\quad \\text{Non-blocking: RHS evaluated in Active; LHS assigned in NBA Region.}',
    stepByStepDerivation: [
      'In the IEEE 1800 Verilog Stratified Event Queue, the active time slot contains: Active Region, Inactive Region, and Non-Blocking Assignment (NBA) Region.',
      '**With Blocking (`=`):** The assignment evaluates the Right-Hand Side (RHS) and immediately updates the Left-Hand Side (LHS) variable before the simulator executes the next statement.',
      'If two flip-flops are coded in separate `always` blocks using `=`: `always @(posedge clk) q1 = d;` and `always @(posedge clk) q2 = q1;`, the simulator is free to execute either block first!',
      'If the first block executes first, `q2` captures the new `d` in the same clock cycle (behaving like a single wire instead of a 2-stage shift register). If the second executes first, `q2` gets the old `q1`. This is a fatal non-deterministic simulation race.',
      '**With Non-Blocking (`<=`):** All RHS values across all processes are sampled during the Active Region. The actual assignments to LHS are deferred to the NBA Region.',
      'Therefore, `q2` is guaranteed to capture the previous cycle value of `q1` regardless of block execution order, perfectly modeling real physical flip-flop hardware!'
    ],
    candidateTrap: 'Thinking that synthesis tools will synthesize wires instead of flip-flops. Synthesis tools often synthesize flip-flops anyway, creating a fatal mismatch between RTL simulation and real silicon behavior (Simulation-Synthesis Mismatch)!'
  },
  {
    id: 'drill-cmos-inverter-sizing',
    topic: 'CMOS Device Physics & Inverter Threshold ($V_M$)',
    companyTarget: 'Texas Instruments, Qualcomm, Intel',
    question: 'Why is the PMOS transistor in a standard CMOS inverter sized wider than the NMOS transistor (typically $W_p / W_n \\approx 2\\text{ to }2.5$ in bulk silicon), and what is the effect on propagation delay and switching threshold $V_M$?',
    equationOrCircuit: '\\mu_n \\approx 2.5 \\times \\mu_p. \\quad V_M = \\frac{V_{DD} - |V_{tp}| + V_{tn} \\sqrt{\\frac{\\mu_n W_n}{\\mu_p W_p}}}{1 + \\sqrt{\\frac{\\mu_n W_n}{\\mu_p W_p}}}.',
    stepByStepDerivation: [
      'In silicon, electron mobility (majority carriers in NMOS) is $\\mu_n \\approx 500\\text{ cm}^2/\\text{V}\\cdot\\text{s}$, while hole mobility (majority carriers in PMOS) is $\\mu_p \\approx 200\\text{ cm}^2/\\text{V}\\cdot\\text{s}$.',
      'The on-resistance of a MOS transistor in linear/triode mode is inversely proportional to mobility and width: $R_{on} \\propto \\frac{1}{\\mu C_{ox} (W/L) (V_{gs} - V_{th})}$.',
      'To achieve equal pull-up and pull-down drive strength ($R_{on,p} = R_{on,n}$) and symmetric rise ($t_r$) and fall ($t_f$) propagation times: We must size PMOS width $W_p \\approx \\left(\\frac{\\mu_n}{\\mu_p}\\right) W_n \\approx 2.2\\times W_n$.',
      'This symmetric sizing places the inverter switching threshold exactly at the mid-rail: $V_M = \\frac{V_{DD}}{2}$, maximizing the high and low noise margins ($NM_H$ and $NM_L$).'
    ],
    candidateTrap: 'In FinFET technology nodes (<7nm), explain that width is discretized by fin count ($N_{fins}$), and strain engineering (SiGe channels) has brought the effective hole-to-electron mobility ratio closer to $1.2\\text{ to }1.5$.'
  }
];

// 6. 18-Month Calendar Milestones (Jan 2026 - June 2027)
export const TIMELINE_MILESTONES_18_MONTHS: TimelineMilestoneMonth[] = [
  {
    monthYear: 'Jan - Feb 2026',
    academicStage: '6th Semester Start',
    focusTitle: 'EE545 FPGA Enrollment & Vivado Setup',
    milestoneId: 'ms-2026-01',
    category: 'Academics',
    statusTag: 'Completed',
    actionItems: [
      'Formally register for EE545 FPGA Based Digital Design elective in NIT Goa Portal',
      'Install Xilinx Vivado 2023.2 on local machine and test Digilent Basys3 board connectivity',
      'Refresh Verilog syntax: non-blocking assignments, always_comb, always_ff, parameterized modules'
    ]
  },
  {
    monthYear: 'Mar - Apr 2026',
    academicStage: '6th Semester Mid / End',
    focusTitle: 'FPGA Peripheral Lab & Intermediate Projects',
    milestoneId: 'ms-2026-03',
    category: 'Projects',
    statusTag: 'Critical Immediate',
    actionItems: [
      'Build synthesizable UART transmitter/receiver with parameterized baud rate generator on Basys3',
      'Implement SPI Master with CPOL/CPHA configuration modes connected to PMOD sensors',
      'Master XDC timing constraints: create_clock, set_input_delay, set_output_delay in Vivado',
      'Target 8.0+ CGPA in 6th Sem exams (crucial cutoff for Qualcomm & TI placement shortlists)'
    ]
  },
  {
    monthYear: 'May - Jul 2026',
    academicStage: 'Summer Vacation (CRITICAL SPRINT)',
    focusTitle: 'RISC-V Pipelined Core & Verification Testbenches',
    milestoneId: 'ms-2026-05',
    category: 'Summer Sprint',
    statusTag: 'Upcoming',
    actionItems: [
      'Design full 5-stage pipelined RV32I RISC-V CPU in SystemVerilog with data forwarding and branch hazard unit',
      'Build SystemVerilog OOP constrained-random testbench with SVA assertions',
      'Lock-in ATS-compliant 1-page resume with verified GitHub repository links by July 15',
      'Daily practice: 1 digital logic whiteboard drill + 1 LeetCode medium bitwise/C puzzle'
    ]
  },
  {
    monthYear: 'Aug - Oct 2026',
    academicStage: '7th Semester (ON-CAMPUS PLACEMENT SEASON)',
    focusTitle: 'MNC Campus Placement Drives & EE560 VLSI Tech',
    milestoneId: 'ms-2026-08',
    category: 'Placements',
    statusTag: 'Upcoming',
    actionItems: [
      'Attend Day 1 semiconductor online assessments (Qualcomm, TI, Western Digital, Intel, Synopsys)',
      'Enroll in EE560 VLSI Technology elective (focus on CMOS inverter delays and layout DRC)',
      'Initiate B.Tech Major Project Phase 1 under VLSI/Embedded faculty supervisor',
      'Conduct peer mock technical interviews on Setup/Hold time violation calculations and CDC FIFOs'
    ]
  },
  {
    monthYear: 'Nov 2026 - Jan 2027',
    academicStage: '7th Sem End / Winter Break',
    focusTitle: 'Placement Round 2 & Design Services Pool',
    milestoneId: 'ms-2026-11',
    category: 'Placements',
    statusTag: 'Upcoming',
    actionItems: [
      'Interview with VLSI Design Services leaders (Tessolve, SmartSoC, Wipro VLSI, Tata Elxsi, Mirafra)',
      'Complete Phase 1 B.Tech project presentation and interim progress viva',
      'Advance to UVM agent architecture: scoreboards, sequences, and coverage closure'
    ]
  },
  {
    monthYear: 'Feb - May 2027',
    academicStage: '8th Semester (Graduation)',
    focusTitle: 'Computer Architecture OE & Final Capstone Defense',
    milestoneId: 'ms-2027-02',
    category: 'Academics',
    statusTag: 'Future',
    actionItems: [
      'Complete Computer Architecture Open Elective (focus on cache hierarchies and superscalar pipelines)',
      'Fabricate and demo final B.Tech Capstone hardware prototype on FPGA board',
      'Publish project report or open-source GitHub release',
      'Receive official offer letters and complete semiconductor company onboarding formalities'
    ]
  }
];
