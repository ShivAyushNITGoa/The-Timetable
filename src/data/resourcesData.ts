export type DocumentCategory = 'timetable' | 'curriculum' | 'syllabus' | 'calendar' | 'rules';
export type BranchFilter = 'ALL' | 'COMMON' | 'CSE' | 'ECE' | 'EEE' | 'ME' | 'CVE';
export type YearFilter = 'ALL' | '1' | '2' | '3' | '4';

export interface ResourceDocumentSection {
  title: string;
  subheading?: string;
  content?: string[];
  table?: {
    headers: string[];
    rows: (string | number)[][];
  };
}

export interface ResourceDocument {
  id: string;
  title: string;
  shortTitle: string;
  docNumber: string;
  category: DocumentCategory;
  branch: BranchFilter;
  year: YearFilter;
  semesterRange: string;
  academicYear: string;
  issuingAuthority: string;
  effectiveDate: string;
  summary: string;
  tags: string[];
  pdfFileName: string;
  externalOfficialUrl: string;
  sections: ResourceDocumentSection[];
}

export const NIT_GOA_RESOURCES: ResourceDocument[] = [
  // ==========================================
  // TIMETABLES (All Branches & All Years)
  // ==========================================
  {
    id: 'tt-y1-common',
    title: 'B.Tech 1st Year (Sections A, B, C, D) Master Class & Lab Timetable',
    shortTitle: '1st Year Timetable (Sec A-D)',
    docNumber: 'NITG/ACAD/TT/2024-25/Y1',
    category: 'timetable',
    branch: 'COMMON',
    year: '1',
    semesterRange: 'Semesters 1 & 2',
    academicYear: '2024–2025 (Current)',
    issuingAuthority: 'Office of Dean (Academics) & 1st Year Time Table Coordinator',
    effectiveDate: 'August 2024 (Updated for Cuncolim Campus)',
    summary: 'Comprehensive class timetable for B.Tech First Year students across Sections A, B, C, and D covering Physics and Chemistry Cycles, workshop slots, and language lab hours.',
    tags: ['Timetable', '1st Year', 'Physics Cycle', 'Chemistry Cycle', 'LHC Room 1-4'],
    pdfFileName: 'NIT_Goa_BTech_1st_Year_Timetable_Latest.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/academic/timetables.html',
    sections: [
      {
        title: 'Section Distribution & Cycle Matrix',
        subheading: 'Division of Branches across Sections & Academic Cycles',
        table: {
          headers: ['Section', 'Allocated Branches', 'Odd Semester Cycle', 'Even Semester Cycle', 'Primary Venue'],
          rows: [
            ['Section A', 'CSE (Roll Nos 01–35) + ECE (Roll Nos 01–25)', 'Physics Cycle', 'Chemistry Cycle', 'Lecture Hall Complex - Room 01'],
            ['Section B', 'ECE (Roll Nos 26–50) + EEE (All Students)', 'Physics Cycle', 'Chemistry Cycle', 'Lecture Hall Complex - Room 02'],
            ['Section C', 'CSE (Roll Nos 36–70) + ME (All Students)', 'Chemistry Cycle', 'Physics Cycle', 'Lecture Hall Complex - Room 03'],
            ['Section D', 'Civil Engineering (All) + Remaining CSE/ECE', 'Chemistry Cycle', 'Physics Cycle', 'Lecture Hall Complex - Room 04']
          ]
        }
      },
      {
        title: 'Master Weekly Lecture & Laboratory Schedule (Section A & B - Physics Cycle)',
        subheading: 'Classes: 08:30 AM to 05:30 PM (Monday to Friday, Saturday Make-up)',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '01:30 - 02:30', '02:30 - 05:30 (Lab/Workshop)'],
          rows: [
            ['Monday', 'MA100 Math-I', 'PH100 Physics', 'CS100 Prog.', 'HS100 English', 'EE100 BEE', 'Batch A1: PH101 Physics Lab / Batch A2: Workshop'],
            ['Tuesday', 'EE100 BEE', 'MA100 Math-I', 'CS100 Prog.', 'PH100 Physics', 'Tutorial', 'Batch A1: CS101 Prog. Lab / Batch A2: Physics Lab'],
            ['Wednesday', 'PH100 Physics', 'HS100 English', 'EE100 BEE', 'MA100 Math-I', 'CS100 Prog.', 'Batch A1: Workshop ME101 / Batch A2: BEE Lab'],
            ['Thursday', 'CS100 Prog.', 'MA100 Math-I', 'PH100 Physics', 'EE100 BEE', 'Sports/ECA', 'Batch A1: EE101 BEE Lab / Batch A2: Prog. Lab'],
            ['Friday', 'HS100 English', 'CS100 Prog.', 'MA100 Math-I', 'PH100 Physics', 'Mentoring', 'Language Laboratory (HS101) & Remedial Clinic'],
            ['Saturday', 'Reserved for Continuous Assessment, Make-up Lectures, and Invited Engineering Clinics', '', '', '', '']
          ]
        }
      },
      {
        title: 'Faculty Instructors & Course Coordinators (1st Year)',
        content: [
          '• Mathematics-I & II (MA100 / MA150): Dr. Ravi Ragoju (Department of Applied Sciences)',
          '• Engineering Physics & Lab (PH100 / PH101): Dr. Velavan Kathirvelu / Dr. Saidi Reddy Parne',
          '• Engineering Chemistry & Lab (CY100 / CY101): Dr. Sarani Saha / Dr. Subhasish Roy',
          '• Computer Programming & Lab (CS100 / CS101): Dr. Damodar Reddy Edla / Dr. Keshavamurthy B N',
          '• Basics of Electrical Engineering & Lab (EE100 / EE101): Dr. Suresh Mikkili / Dr. Sreeraj E.S.',
          '• Engineering Mechanics / Graphics (ME100 / ME101): Dr. Sachin D. Kore / Dr. Samar Singhal',
          '• Professional Communication (HS100 / HS101): Faculty of Humanities and Social Sciences'
        ]
      }
    ]
  },

  {
    id: 'tt-cse-all',
    title: 'Department of Computer Science & Engineering - Master Class Timetables (2nd, 3rd & 4th Year)',
    shortTitle: 'CSE All Years Timetable',
    docNumber: 'NITG/CSE/TT/2024-25/EVEN-ODD',
    category: 'timetable',
    branch: 'CSE',
    year: 'ALL',
    semesterRange: 'Semesters 3, 4, 5, 6, 7 & 8',
    academicYear: '2024–2025',
    issuingAuthority: 'Head, Department of Computer Science & Engineering',
    effectiveDate: 'August 2024 / January 2025',
    summary: 'Official timetable for B.Tech Computer Science & Engineering students across all senior years. Includes Room 51/52 allocations, advanced lab timings, software engineering sessions, and Capstone Project defenses.',
    tags: ['CSE', 'Timetable', 'Year 2', 'Year 3', 'Year 4', 'Room 51/52', 'Algorithms', 'Deep Learning'],
    pdfFileName: 'NIT_Goa_CSE_Class_Timetable_All_Years.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/cse/timetable.html',
    sections: [
      {
        title: 'CSE 2nd Year (Semester 3 & 4) Class Timetable',
        subheading: 'Venue: Class Room 51, Academic Block | Class Advisor: Dr. B. R. Chandavarkar',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '01:30 - 02:30', '02:30 - 05:30 (Laboratory)'],
          rows: [
            ['Monday', 'CS200 DSA', 'CS201 DSD', 'MA200 DMath', 'CS202 COA', 'HS200 Econ', 'CS203 Data Structures Lab (Batch 1 & 2)'],
            ['Tuesday', 'CS202 COA', 'CS200 DSA', 'CS201 DSD', 'MA200 DMath', 'Tutorial', 'CS204 Digital Systems Design Lab (Hardware Lab)'],
            ['Wednesday', 'MA200 DMath', 'HS200 Econ', 'CS202 COA', 'CS200 DSA', 'CS201 DSD', 'Programming Practice & Competitive Coding Slot'],
            ['Thursday', 'CS201 DSD', 'CS202 COA', 'CS200 DSA', 'HS200 Econ', 'Library', 'Object-Oriented Programming (CS253) Lab'],
            ['Friday', 'HS200 Econ', 'MA200 DMath', 'CS201 DSD', 'CS200 DSA', 'Mentoring', 'Open Hardware / Mini-Project Development Lab']
          ]
        }
      },
      {
        title: 'CSE 3rd Year (Semester 5 & 6) Class Timetable',
        subheading: 'Venue: Class Room 52, Academic Block | Class Advisor: Dr. Damodar Reddy Edla',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '01:30 - 02:30', '02:30 - 05:30 (Laboratory)'],
          rows: [
            ['Monday', 'CS300 DAA', 'CS301 OS', 'CS302 DB', 'CS303 CN', 'CS512 ML', 'CS304 DAA & Algorithms Lab'],
            ['Tuesday', 'CS303 CN', 'CS300 DAA', 'CS301 OS', 'CS302 DB', 'CS300M Minor', 'CS305 Operating Systems & Systems Programming Lab'],
            ['Wednesday', 'CS302 DB', 'CS512 ML', 'CS303 CN', 'CS300 DAA', 'CS301 OS', 'CS306 Database Systems Lab (PostgreSQL / NoSQL)'],
            ['Thursday', 'CS301 OS', 'CS302 DB', 'CS300 DAA', 'CS303 CN', 'CS300M Minor', 'CS307 Computer Networks Socket Programming Lab'],
            ['Friday', 'CS512 ML', 'CS301 OS', 'CS302 DB', 'CS300 DAA', 'Seminar', 'Open Source / Minor Project Consultation']
          ]
        }
      },
      {
        title: 'CSE 4th Year (Semester 7 & 8) Class Timetable & Project Slotting',
        subheading: 'Venue: Seminar Hall / Room 51 | Capstone Committee Chair: Dr. Modi Chirag N',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '02:00 - 05:30 (Capstone / Elective)'],
          rows: [
            ['Monday', 'HS350 Mgmt', 'CS520 Cloud', 'CS525 InfoSec', 'CS530 BigData', 'CS400 Major Project - I / II Research Work'],
            ['Tuesday', 'CS525 InfoSec', 'HS350 Mgmt', 'CS520 Cloud', 'CS530 BigData', 'CS400 Major Project Work & Implementation'],
            ['Wednesday', 'CS530 BigData', 'CS520 Cloud', 'HS350 Mgmt', 'CS525 InfoSec', 'CS402 Comprehensive Self-Study & Technical Seminar'],
            ['Thursday', 'CS540 DeepNLP', 'CS542 CyberSec', 'CS520 Cloud', 'HS350 Mgmt', 'CS450 Capstone Project II Development'],
            ['Friday', 'CS542 CyberSec', 'CS540 DeepNLP', 'CS525 InfoSec', 'Mentoring', 'Bi-weekly Capstone Defense & External Evaluation']
          ]
        }
      }
    ]
  },

  {
    id: 'tt-ece-all',
    title: 'Department of Electronics & Communication Engineering - Master Class Timetables (All Years)',
    shortTitle: 'ECE All Years Timetable',
    docNumber: 'NITG/ECE/TT/2024-25/MASTER',
    category: 'timetable',
    branch: 'ECE',
    year: 'ALL',
    semesterRange: 'Semesters 3, 4, 5, 6, 7 & 8',
    academicYear: '2024–2025',
    issuingAuthority: 'Head, Department of Electronics & Communication Engineering',
    effectiveDate: 'August 2024 / January 2025',
    summary: 'Master schedule of classes and laboratory sessions for B.Tech ECE students. Covers Room 54, Room 5, Advanced Communication Lab, VLSI CAD Suite, and DSP Workstations.',
    tags: ['ECE', 'Timetable', 'Year 2', 'Year 3', 'Year 4', 'Room 54', 'VLSI', '5G Communication'],
    pdfFileName: 'NIT_Goa_ECE_Class_Timetable_All_Years.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/ece/timetable.html',
    sections: [
      {
        title: 'ECE 2nd Year (Sem 3 & 4) Schedule',
        subheading: 'Room 54 | Faculty Advisor: Dr. T. Veerakumar',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '02:30 - 05:30 (Laboratory)'],
          rows: [
            ['Monday', 'EC200 EDC', 'EC201 NT', 'EC202 SAS', 'EC203 DSD', 'EC204 Electronic Devices & Circuits Lab'],
            ['Tuesday', 'EC203 DSD', 'EC200 EDC', 'EC201 NT', 'EC202 SAS', 'EC205 Digital System Design (Verilog) Lab'],
            ['Wednesday', 'EC202 SAS', 'MA200 Math-III', 'EC203 DSD', 'EC200 EDC', 'Simulation Lab (MATLAB / Cadence Spice)'],
            ['Thursday', 'EC201 NT', 'EC202 SAS', 'MA200 Math-III', 'EC203 DSD', 'EC206 Circuits & Networks Laboratory'],
            ['Friday', 'MA200 Math-III', 'EC201 NT', 'EC200 EDC', 'Mentoring', 'Remedial & Mini-Project Mentoring']
          ]
        }
      },
      {
        title: 'ECE 3rd Year (Sem 5 & 6) Schedule',
        subheading: 'Room 54 / Room 5 | Faculty Advisor: Dr. Shivnarayan Patidar',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '02:30 - 05:30 (Laboratory)'],
          rows: [
            ['Monday', 'EC300 AC', 'EC301 DSP', 'EC302 Micro', 'EC303 EM Waves', 'EC304 Analog Communication Lab'],
            ['Tuesday', 'EC303 EM Waves', 'EC300 AC', 'EC301 DSP', 'EC302 Micro', 'EC305 Digital Signal Processing (TI DSP) Lab'],
            ['Wednesday', 'EC302 Micro', 'EC514 Adv DSP', 'EC303 EM Waves', 'EC300 AC', 'EC306 Microprocessors & Microcontrollers Lab'],
            ['Thursday', 'EC301 DSP', 'EC302 Micro', 'EC300 AC', 'EC303 EM Waves', 'EC353 Digital Communication Lab'],
            ['Friday', 'EC514 Adv DSP', 'EC301 DSP', 'EC302 Micro', 'Seminar', 'Cadence VLSI Design (EC354) Practicals']
          ]
        }
      },
      {
        title: 'ECE 4th Year (Sem 7 & 8) Schedule',
        subheading: 'Room 5 / ECE Project Lab | Coordinator: Dr. Vasantha MH',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '02:00 - 05:30 (Capstone/Lab)'],
          rows: [
            ['Monday', 'EC521 Opto', 'EC506 Wireless', 'EC501 InfoTheory', 'EC515 BioMed', 'EC400 Major Project - I / II Work'],
            ['Tuesday', 'EC506 Wireless', 'EC521 Opto', 'EC501 InfoTheory', 'EC515 BioMed', 'EC400 Hardware Fabrication & Measurement'],
            ['Wednesday', 'EC501 InfoTheory', 'EC515 BioMed', 'EC521 Opto', 'EC506 Wireless', 'EC402 Comprehensive Viva Self-Study'],
            ['Thursday', 'EC530 5G Comm', 'EC535 LowPower', 'HS350 Mgmt', 'EC521 Opto', 'EC450 Capstone Project - II Work'],
            ['Friday', 'EC535 LowPower', 'EC530 5G Comm', 'HS350 Mgmt', 'Mentoring', 'IEEE Project Paper Writing & Review']
          ]
        }
      }
    ]
  },

  {
    id: 'tt-eee-all',
    title: 'Department of Electrical & Electronics Engineering - Master Class Timetables (All Years)',
    shortTitle: 'EEE All Years Timetable',
    docNumber: 'NITG/EEE/TT/2024-25/MASTER',
    category: 'timetable',
    branch: 'EEE',
    year: 'ALL',
    semesterRange: 'Semesters 3, 4, 5, 6, 7 & 8',
    academicYear: '2024–2025',
    issuingAuthority: 'Head, Department of Electrical & Electronics Engineering',
    effectiveDate: 'August 2024 / January 2025',
    summary: 'Official timetable for B.Tech EEE students. Specifies Room 70/71, Electrical Machines Lab, Power Electronics Bench, Microcontroller Lab, High Voltage Testing facilities, and Minor slots.',
    tags: ['EEE', 'Timetable', 'Year 2', 'Year 3', 'Year 4', 'Room 70/71', 'Machines', 'Power Systems'],
    pdfFileName: 'NIT_Goa_EEE_Class_Timetable_All_Years.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/eee/timetable.html',
    sections: [
      {
        title: 'EEE 2nd Year (Sem 3 & 4) Schedule',
        subheading: 'Room 70/71 | Faculty Advisor: Dr. Suresh Mikkili',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '02:30 - 05:30 (Laboratory)'],
          rows: [
            ['Monday', 'EE200 EM-I', 'EE201 NT', 'EE202 EMF', 'EE203 AE', 'EE204 Electrical Machines - I Lab (Batch 1/2)'],
            ['Tuesday', 'EE203 AE', 'EE200 EM-I', 'EE201 NT', 'EE202 EMF', 'EE205 Analog Electronics Lab'],
            ['Wednesday', 'EE202 EMF', 'MA200 Math-III', 'EE203 AE', 'EE200 EM-I', 'Circuits Simulation & MATLAB Scripting'],
            ['Thursday', 'EE201 NT', 'EE202 EMF', 'MA200 Math-III', 'EE203 AE', 'EE206 Networks & Measurements Lab'],
            ['Friday', 'MA200 Math-III', 'EE201 NT', 'EE200 EM-I', 'Mentoring', 'Faculty Consultation & Technical Quiz']
          ]
        }
      },
      {
        title: 'EEE 3rd Year (Sem 5 & 6) Schedule',
        subheading: 'Room 70/71 | Class Advisor: Dr. Amol D. Rahulkar',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '02:30 - 05:30 (Laboratory)'],
          rows: [
            ['Monday', 'EE300 PS-I', 'EE301 PE', 'EE302 CS', 'EE303 Micro', 'EE304 Power Electronics & Drives Lab'],
            ['Tuesday', 'EE303 Micro', 'EE300 PS-I', 'EE301 PE', 'EE302 CS', 'EE305 Control Systems & MATLAB Simulink Lab'],
            ['Wednesday', 'EE302 CS', 'EE541/545 Elec.', 'EE303 Micro', 'EE300 PS-I', 'EE306 Microprocessors (8086/ARM) Lab'],
            ['Thursday', 'EE301 PE', 'EE302 CS', 'EE300 PS-I', 'EE303 Micro', 'EE353 Power Systems Simulation (MiPower) Lab'],
            ['Friday', 'EE541/545 Elec.', 'EE301 PE', 'EE302 CS', 'CS300M Minor', 'Industrial Drives Bench Testing & Seminar']
          ]
        }
      },
      {
        title: 'EEE 4th Year (Sem 7 & 8) Schedule',
        subheading: 'Room 71 / Hardware Lab | Coordinator: Dr. C. Vyjayanthi',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '02:00 - 05:30 (Capstone/Lab)'],
          rows: [
            ['Monday', 'EE514 Renewable', 'EE552 SmartGrid', 'HS350 Mgmt', 'EE530 Drives', 'EE400 Major Project - I / II Implementation'],
            ['Tuesday', 'EE552 SmartGrid', 'EE514 Renewable', 'HS350 Mgmt', 'EE530 Drives', 'EE400 Hardware In-The-Loop Testing'],
            ['Wednesday', 'EE530 Drives', 'EE560 FACTS', 'EE514 Renewable', 'EE552 SmartGrid', 'EE402 Comprehensive Assessment Self-Study'],
            ['Thursday', 'EE535 HVDC', 'EE540 Dynamics', 'HS350 Mgmt', 'EE560 FACTS', 'EE450 Capstone Final Fabrication Work'],
            ['Friday', 'EE540 Dynamics', 'EE535 HVDC', 'EE560 FACTS', 'Mentoring', 'IEEE PES Manuscript Review & Evaluation']
          ]
        }
      }
    ]
  },

  {
    id: 'tt-me-all',
    title: 'Department of Mechanical Engineering - Master Class Timetables (All Years)',
    shortTitle: 'ME All Years Timetable',
    docNumber: 'NITG/ME/TT/2024-25/MASTER',
    category: 'timetable',
    branch: 'ME',
    year: 'ALL',
    semesterRange: 'Semesters 3, 4, 5, 6, 7 & 8',
    academicYear: '2024–2025',
    issuingAuthority: 'Head, Department of Mechanical Engineering',
    effectiveDate: 'August 2024 / January 2025',
    summary: 'Master schedule for B.Tech Mechanical Engineering students. Details Room 74/75, Thermal Engineering Lab, Fluid Mechanics Lab, Machine Dynamics Rig, CAD/CAM Suite, and Manufacturing Workshop.',
    tags: ['ME', 'Timetable', 'Year 2', 'Year 3', 'Year 4', 'Room 74/75', 'Robotics', 'CFD'],
    pdfFileName: 'NIT_Goa_ME_Class_Timetable_All_Years.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/me/timetable.html',
    sections: [
      {
        title: 'Mechanical 2nd Year (Sem 3 & 4) Schedule',
        subheading: 'Room 74/75 | Class Advisor: Dr. Prasenjit Dey',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '02:30 - 05:30 (Laboratory)'],
          rows: [
            ['Monday', 'ME200 TD', 'ME201 MOS', 'ME202 FM', 'ME203 MP-I', 'ME204 Mechanics of Solids Lab (UTM)'],
            ['Tuesday', 'ME203 MP-I', 'ME200 TD', 'ME201 MOS', 'ME202 FM', 'ME205 Fluid Mechanics & Machinery Lab'],
            ['Wednesday', 'ME202 FM', 'MA200 Math-III', 'ME203 MP-I', 'ME200 TD', 'Machine Drawing & SolidWorks 3D Modeling'],
            ['Thursday', 'ME201 MOS', 'ME202 FM', 'MA200 Math-III', 'ME203 MP-I', 'ME206 Manufacturing Technology - I Workshop'],
            ['Friday', 'MA200 Math-III', 'ME201 MOS', 'ME200 TD', 'Mentoring', 'Thermodynamics Problem Solving Clinic']
          ]
        }
      },
      {
        title: 'Mechanical 3rd Year (Sem 5 & 6) Schedule',
        subheading: 'Room 74/75 | Class Advisor: Dr. Samar Singhal',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '02:30 - 05:30 (Laboratory)'],
          rows: [
            ['Monday', 'ME300 HT', 'ME301 TOM', 'ME302 DME-I', 'ME303 IC Eng', 'ME304 Heat Transfer Experimental Lab'],
            ['Tuesday', 'ME303 IC Eng', 'ME300 HT', 'ME301 TOM', 'ME302 DME-I', 'ME305 Theory of Machines & Vibrations Rig Lab'],
            ['Wednesday', 'ME302 DME-I', 'ME518 MicroMfg', 'ME303 IC Eng', 'ME300 HT', 'ME306 IC Engines & Emissions Testing Lab'],
            ['Thursday', 'ME301 TOM', 'ME302 DME-I', 'ME300 HT', 'ME303 IC Eng', 'ANSYS Mechanical FEA Simulation Lab'],
            ['Friday', 'ME518 MicroMfg', 'ME301 TOM', 'ME302 DME-I', 'Seminar', 'CAD/CAM CNC Machining Practical Practice']
          ]
        }
      },
      {
        title: 'Mechanical 4th Year (Sem 7 & 8) Schedule',
        subheading: 'Room 74 / Project Lab | Coordinator: Dr. Chaitanya Vundru',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '02:00 - 05:30 (Capstone/Lab)'],
          rows: [
            ['Monday', 'HS350 Mgmt', 'ME524 Auto', 'ME512 RAC', 'ME513 DFMA', 'ME400 Major Project - I / II Fabrication'],
            ['Tuesday', 'ME524 Auto', 'HS350 Mgmt', 'ME512 RAC', 'ME513 DFMA', 'ME400 Wind Tunnel & DAQ Testing'],
            ['Wednesday', 'ME512 RAC', 'ME535 CFD', 'ME518 Micro', 'ME524 Auto', 'ME402 Comprehensive Assessment Self-Study'],
            ['Thursday', 'ME540 Robotics', 'ME545 Turbines', 'HS350 Mgmt', 'ME535 CFD', 'ME450 Capstone Project Rig Demonstration'],
            ['Friday', 'ME545 Turbines', 'ME540 Robotics', 'ME518 Micro', 'Mentoring', 'ASME / Springer Journal Manuscript Drafting']
          ]
        }
      }
    ]
  },

  {
    id: 'tt-cve-all',
    title: 'Department of Civil Engineering - Master Class Timetables (All Years)',
    shortTitle: 'Civil All Years Timetable',
    docNumber: 'NITG/CVE/TT/2024-25/MASTER',
    category: 'timetable',
    branch: 'CVE',
    year: 'ALL',
    semesterRange: 'Semesters 3, 4, 5, 6, 7 & 8',
    academicYear: '2024–2025',
    issuingAuthority: 'Head, Department of Civil Engineering',
    effectiveDate: 'August 2024 / January 2025',
    summary: 'Master class schedule for B.Tech Civil Engineering. Specifies Room 48 and Room 69, Geotechnical Engineering Lab, Surveying Fieldwork, Structural Testing Frame, Environmental Analysis Suite, and Transportation Lab.',
    tags: ['CVE', 'Civil', 'Timetable', 'Year 2', 'Year 3', 'Year 4', 'Room 48', 'Room 69', 'Structures'],
    pdfFileName: 'NIT_Goa_Civil_Class_Timetable_All_Years.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/cve/timetable.html',
    sections: [
      {
        title: 'Civil 2nd Year (Sem 3 & 4) Schedule',
        subheading: 'Room 48 | Class Advisor: Dr. Bapi Mondal',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '02:30 - 05:30 (Laboratory)'],
          rows: [
            ['Monday', 'CV200 SM', 'CV201 FM', 'CV202 Survey', 'CV203 BMTC', 'CV204 Strength of Materials Lab'],
            ['Tuesday', 'CV203 BMTC', 'CV200 SM', 'CV201 FM', 'CV202 Survey', 'CV205 Surveying Field Work (Total Station)'],
            ['Wednesday', 'CV202 Survey', 'MA200 Math-III', 'CV203 BMTC', 'CV200 SM', 'Building Planning & AutoCAD Drawing Lab'],
            ['Thursday', 'CV201 FM', 'CV202 Survey', 'MA200 Math-III', 'CV203 BMTC', 'CV206 Fluid Mechanics & Hydraulics Lab'],
            ['Friday', 'MA200 Math-III', 'CV201 FM', 'CV200 SM', 'Mentoring', 'Concrete Mix Design & Slump Cone Tests']
          ]
        }
      },
      {
        title: 'Civil 3rd Year (Sem 5 & 6) Schedule',
        subheading: 'Room 48 / 69 | Class Advisor: Dr. S Sethulekshmi',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '02:30 - 05:30 (Laboratory)'],
          rows: [
            ['Monday', 'CV300 SA-I', 'CV301 DRCS', 'CV302 Geo-I', 'CV303 Env-I', 'CV304 Geotechnical Engineering - I Lab'],
            ['Tuesday', 'CV303 Env-I', 'CV300 SA-I', 'CV301 DRCS', 'CV302 Geo-I', 'CV305 Environmental Engineering Testing Lab'],
            ['Wednesday', 'CV302 Geo-I', 'CV538 AdvRCC', 'CV303 Env-I', 'CV300 SA-I', 'Structural Analysis with STAAD.Pro / ETABS'],
            ['Thursday', 'CV301 DRCS', 'CV302 Geo-I', 'CV300 SA-I', 'CV303 Env-I', 'CV353 Concrete Technology & Highway Lab'],
            ['Friday', 'CV538 AdvRCC', 'CV301 DRCS', 'CV302 Geo-I', 'Seminar', 'Site Survey Clinic & Topographical Review']
          ]
        }
      },
      {
        title: 'Civil 4th Year (Sem 7 & 8) Schedule',
        subheading: 'Room 69 / Civil Lab | Coordinator: Dr. Aparup Biswal',
        table: {
          headers: ['Day', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 11:30', '11:30 - 12:30', '02:00 - 05:30 (Capstone/Lab)'],
          rows: [
            ['Monday', 'HS350 Mgmt', 'CV538 AdvRCC', 'CV535 Bridge', 'CV518 Ground', 'CV400 Major Project - I / II Laboratory Testing'],
            ['Tuesday', 'CV538 AdvRCC', 'HS350 Mgmt', 'CV535 Bridge', 'CV518 Ground', 'CV400 Numerical Modeling (PLAXIS / SAP2000)'],
            ['Wednesday', 'CV535 Bridge', 'CV525 GeoEnv', 'CV537 Traffic', 'CV538 AdvRCC', 'CV402 Comprehensive Examination Self-Study'],
            ['Thursday', 'CV540 Prestress', 'CV545 Seismic', 'HS350 Mgmt', 'CV525 GeoEnv', 'CV450 Capstone Project Dissertation Preparation'],
            ['Friday', 'CV545 Seismic', 'CV540 Prestress', 'CV537 Traffic', 'Mentoring', 'BIS / IRC Code Compliance Review & Viva']
          ]
        }
      }
    ]
  },

  {
    id: 'tt-slots-master',
    title: 'NIT Goa Central Academic Slot Matrix & Examination Time Table',
    shortTitle: 'Master Slot & Exam Matrix',
    docNumber: 'NITG/ACAD/SLOT-MATRIX/2024-25',
    category: 'timetable',
    branch: 'ALL',
    year: 'ALL',
    semesterRange: 'All Semesters (1 to 8)',
    academicYear: '2024–2025',
    issuingAuthority: 'Dean (Academics) & Controller of Examinations',
    effectiveDate: 'Annual Academic Standard',
    summary: 'The authoritative institute master slot distribution. Outlines Slots A through F for departmental core courses, Slot G for Interdisciplinary Minors, Slot H for Institute Open Electives, and standard Mid-Sem / End-Sem exam time windows.',
    tags: ['Slots', 'Exam Timings', 'Clash Prevention', 'Minor Slot', 'Open Elective Slot', 'Institute Core'],
    pdfFileName: 'NIT_Goa_Master_Slot_Matrix_and_Exam_Timetable.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/academic/slot-matrix.html',
    sections: [
      {
        title: 'Weekly Slot Allocation Matrix (Clash-Free Academic Standard)',
        subheading: 'Lecture Hours: 55 Minutes each | Monday to Friday',
        table: {
          headers: ['Slot', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Mid-Sem Exam Window', 'End-Sem Exam Window'],
          rows: [
            ['Slot A', '08:30 - 09:25', '09:30 - 10:25', '11:30 - 12:25', '—', '10:30 - 11:25', 'Day 1: 09:30 - 11:30 AM', 'Day 1: 09:30 AM - 12:30 PM'],
            ['Slot B', '09:30 - 10:25', '10:30 - 11:25', '—', '08:30 - 09:25', '11:30 - 12:25', 'Day 2: 09:30 - 11:30 AM', 'Day 2: 09:30 AM - 12:30 PM'],
            ['Slot C', '10:30 - 11:25', '—', '08:30 - 09:25', '09:30 - 10:25', '—', 'Day 3: 09:30 - 11:30 AM', 'Day 3: 09:30 AM - 12:30 PM'],
            ['Slot D', '11:30 - 12:25', '08:30 - 09:25', '09:30 - 10:25', '—', '08:30 - 09:25', 'Day 4: 09:30 - 11:30 AM', 'Day 4: 09:30 AM - 12:30 PM'],
            ['Slot E', '—', '11:30 - 12:25', '10:30 - 11:25', '10:30 - 11:25', '—', 'Day 5: 09:30 - 11:30 AM', 'Day 5: 09:30 AM - 12:30 PM'],
            ['Slot F', '12:30 - 01:25', '12:30 - 01:25', '12:30 - 01:25', '11:30 - 12:25', '09:30 - 10:25', 'Day 6: 09:30 - 11:30 AM', 'Day 6: 09:30 AM - 12:30 PM'],
            ['Slot G (Minor)', '—', '01:30 - 02:25', '—', '01:30 - 02:25', '12:30 - 01:25', 'Day 7: 09:30 - 11:30 AM', 'Day 7: 09:30 AM - 12:30 PM'],
            ['Slot H (Open Elec)', '01:30 - 02:25', '—', '01:30 - 02:25', '—', '01:30 - 02:25', 'Day 8: 09:30 - 11:30 AM', 'Day 8: 09:30 AM - 12:30 PM']
          ]
        }
      },
      {
        title: 'Laboratory Session Time Windows',
        content: [
          '• Afternoon Practical Session 1: 02:00 PM to 05:00 PM (Monday to Friday)',
          '• Extended Senior Capstone / Hardware Slot: 02:00 PM to 05:30 PM',
          '• Morning Make-up Practical Session: 09:00 AM to 12:00 PM (Saturday by prior notification)'
        ]
      }
    ]
  },

  // ==========================================
  // CURRICULUM & SCHEMES (All Branches)
  // ==========================================
  {
    id: 'curr-ordinance',
    title: 'NIT Goa B.Tech Ordinances, Rules & Academic Regulations Handbook',
    shortTitle: 'B.Tech Academic Ordinances',
    docNumber: 'NITG/SENATE/ACAD-ORD/REV-2024',
    category: 'rules',
    branch: 'ALL',
    year: 'ALL',
    semesterRange: 'Semesters 1 through 8',
    academicYear: '2024–2025 onwards',
    issuingAuthority: 'The Senate, National Institute of Technology Goa',
    effectiveDate: 'Ratified by 32nd Senate Meeting',
    summary: 'The official statute and academic rules governing B.Tech degrees at NIT Goa. Defines mandatory 75% attendance criteria, grading formulas (10-point scale), credit requirements for degree conferral, Minor Degree stipulations, and supplementary exam policies.',
    tags: ['Rules', 'Regulations', '75% Attendance', 'SGPA', 'CGPA', 'Grading Scale', 'Credit Matrix'],
    pdfFileName: 'NIT_Goa_BTech_Ordinances_and_Regulations_Latest.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/academic/regulations.html',
    sections: [
      {
        title: 'Credit Distribution & Minimum Graduation Thresholds',
        subheading: 'B.Tech Degree Conferment: Minimum 160 – 168 Credits across 8 Semesters',
        table: {
          headers: ['Curricular Category', 'Code', 'Range of Credits Required', 'Sample Courses'],
          rows: [
            ['Basic Science Courses', 'BSC', '24 – 28 Credits', 'Mathematics I-IV, Engineering Physics, Engineering Chemistry'],
            ['Engineering Science Courses', 'ESC', '20 – 24 Credits', 'Computer Programming, Basic Electrical, Mechanics, Workshop'],
            ['Humanities & Social Sciences', 'HSMC', '10 – 14 Credits', 'Professional English, Economics, Industrial Management, Environmental Studies'],
            ['Professional Core Courses', 'PCC', '64 – 72 Credits', 'Core Discipline Departmental Theory & Practical Courses'],
            ['Professional Elective Courses', 'PEC', '15 – 18 Credits', 'Specialized Departmental Technical Electives (Electives I–V)'],
            ['Open Elective Courses', 'OEC', '6 – 9 Credits', 'Inter-departmental Institute Open Electives'],
            ['Project Work & Internship', 'PROJ', '12 – 16 Credits', 'Mini Project, Technical Seminar, Major Project - I & II']
          ]
        }
      },
      {
        title: 'Attendance Regulations (Clause 14.2 - The 75% Rule)',
        content: [
          '• Mandatory Requirement: Every student must attend a minimum of 75% of total scheduled lectures, tutorials, and practical classes in each registered course.',
          '• Medical / Official Duty Exemption: Up to 10% relaxation may be granted by the Dean (Academics) solely upon receipt of verified medical hospitalization certificates or official representation in sports/conferences certified by Student Welfare.',
          '• De-barment (Grade "FA"): A student securing less than 75% attendance without sanctioned condonation will be awarded the "FA" (Fail on Attendance) grade and debarred from appearing in End-Semester examinations.'
        ]
      },
      {
        title: 'Grading Scale & Grade Point Equivalents (10-Point Scale)',
        table: {
          headers: ['Letter Grade', 'Grade Point', 'Description', 'Performance Benchmark'],
          rows: [
            ['S', '10', 'Outstanding', 'Exceptional mastery (Top 5–10% of class cohort)'],
            ['A', '9', 'Excellent', 'Superior understanding and problem solving'],
            ['B', '8', 'Very Good', 'Above average performance'],
            ['C', '7', 'Good', 'Average grasp of theoretical fundamentals'],
            ['D', '6', 'Satisfactory', 'Pass with adequate standard'],
            ['P', '5', 'Pass', 'Bare minimum passing threshold'],
            ['F', '0', 'Fail', 'Unsatisfactory performance; must repeat or re-exam'],
            ['FA', '0', 'Fail on Attendance', 'Debarred due to attendance falling below 75%']
          ]
        }
      }
    ]
  },

  {
    id: 'curr-cse-scheme',
    title: 'B.Tech Computer Science & Engineering - Complete 4-Year Scheme of Instruction',
    shortTitle: 'CSE Curriculum Scheme',
    docNumber: 'NITG/CSE/SCHEME/2024-28',
    category: 'curriculum',
    branch: 'CSE',
    year: 'ALL',
    semesterRange: 'Semesters 1 through 8',
    academicYear: '2024–2028 Batch',
    issuingAuthority: 'Department of Computer Science & Engineering & Board of Studies',
    effectiveDate: 'Approved for Batch 2022-26, 2023-27 & 2024-28',
    summary: 'Semester-by-semester credit chart, course codes, LTP structures, prerequisites, and category groupings for B.Tech CSE at NIT Goa. Total graduation requirement: 164 Credits.',
    tags: ['CSE', 'Curriculum', 'Scheme', 'Credits', 'LTP', 'Core Courses', 'Electives'],
    pdfFileName: 'NIT_Goa_CSE_Curriculum_Scheme_Complete.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/cse/curriculum.html',
    sections: [
      {
        title: 'Semester-Wise Credit Distribution Summary',
        table: {
          headers: ['Semester', 'Academic Phase', 'Theory Courses', 'Laboratory / Project', 'Total Credits'],
          rows: [
            ['Semester 1', 'Common Foundation (Physics/Chem Cycle)', '5 Theory', '3 Labs / Workshop', '21'],
            ['Semester 2', 'Common Foundation (Opposite Cycle)', '5 Theory', '3 Labs', '21'],
            ['Semester 3', 'Data Structures, DSD, Discrete Math, COA', '5 Theory', '2 Labs', '22'],
            ['Semester 4', 'DAA, OS, Automata, Database Systems', '5 Theory', '2 Labs', '22'],
            ['Semester 5', 'Computer Networks, Software Engg, Elective-I', '5 Theory', '2 Labs', '21'],
            ['Semester 6', 'Compiler Design, Distributed Systems, Elective-II', '5 Theory', '2 Labs + Mini-Proj', '22'],
            ['Semester 7', 'Cloud Computing, InfoSec, Electives, Major Project - I', '4 Theory', '1 Lab + Major Proj I', '19'],
            ['Semester 8', 'Deep Learning, Capstone Major Project - II', '2 Electives', 'Major Project - II (8 cr)', '16'],
            ['Total', '8 Semesters of Study', '36 Theory Courses', '17 Labs + 2 Major Projects', '164 Credits']
          ]
        }
      },
      {
        title: 'Department Program Elective (PEC) Baskets',
        content: [
          '• Basket 1 (AI & Data Science): Machine Learning (CS512), Deep Learning & NLP (CS540), Computer Vision (CS528), Big Data Analytics (CS530).',
          '• Basket 2 (Systems & Security): Cloud Computing (CS520), Cyber Security & Forensics (CS542), Information Security (CS525), Blockchain Technologies (CS534).',
          '• Basket 3 (Theoretical & Advanced CS): Advanced Algorithms (CS510), Quantum Computing (CS546), Computational Complexity (CS548).'
        ]
      }
    ]
  },

  {
    id: 'curr-ece-scheme',
    title: 'B.Tech Electronics & Communication Engineering - Complete 4-Year Scheme',
    shortTitle: 'ECE Curriculum Scheme',
    docNumber: 'NITG/ECE/SCHEME/2024-28',
    category: 'curriculum',
    branch: 'ECE',
    year: 'ALL',
    semesterRange: 'Semesters 1 through 8',
    academicYear: '2024–2028',
    issuingAuthority: 'Department of Electronics & Communication Engineering',
    effectiveDate: 'July 2024 (Updated)',
    summary: 'Comprehensive curriculum framework for B.Tech ECE covering circuits, semiconductor devices, communication systems, VLSI design, DSP, embedded microprocessors, and capstone engineering projects. Total: 165 Credits.',
    tags: ['ECE', 'Scheme', 'Curriculum', 'Credits', 'VLSI', 'Communication', 'Signal Processing'],
    pdfFileName: 'NIT_Goa_ECE_Curriculum_Scheme_Complete.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/ece/curriculum.html',
    sections: [
      {
        title: 'Semester-Wise Credit Summary (ECE)',
        table: {
          headers: ['Semester', 'Key Focus Areas', 'Theory', 'Practical', 'Credits'],
          rows: [
            ['Semester 1', 'Common Engineering Basics', '5', '3 Labs', '21'],
            ['Semester 2', 'Mathematics-II, Physics/Chemistry', '5', '3 Labs', '21'],
            ['Semester 3', 'Electronic Devices, Network Theory, Signals & Systems, DSD', '5', '2 Labs', '22'],
            ['Semester 4', 'Analog Circuits, Electromagnetic Waves, Microprocessors', '5', '2 Labs', '21'],
            ['Semester 5', 'Analog Communication, DSP, Control Systems, Elective-I', '5', '2 Labs', '21'],
            ['Semester 6', 'Digital Communication, VLSI Design, Antennas, Elective-II', '5', '2 Labs + Mini-Proj', '22'],
            ['Semester 7', 'Wireless Comm, Optical Networks, Elective-III/IV, Major Proj I', '4', 'Major Proj I + Viva', '19'],
            ['Semester 8', '5G Communications, Low Power VLSI, Capstone Project - II', '2 Electives', 'Major Proj II (8 cr)', '16'],
            ['Total', 'Full 4-Year Graduation Pipeline', '36 Theory', '18 Practical Units', '165 Credits']
          ]
        }
      }
    ]
  },

  {
    id: 'curr-eee-scheme',
    title: 'B.Tech Electrical & Electronics Engineering - Complete 4-Year Scheme of Instruction',
    shortTitle: 'EEE Curriculum Scheme',
    docNumber: 'NITG/EEE/SCHEME/2024-28',
    category: 'curriculum',
    branch: 'EEE',
    year: 'ALL',
    semesterRange: 'Semesters 1 through 8',
    academicYear: '2024–2028',
    issuingAuthority: 'Department of Electrical & Electronics Engineering',
    effectiveDate: 'July 2024 (Updated)',
    summary: 'The authoritative B.Tech EEE scheme detailing electric circuits, machines, power electronics, control systems, modern smart grids, HVDC, and interdisciplinary minor streams. Total: 166 Credits.',
    tags: ['EEE', 'Scheme', 'Curriculum', 'Power Systems', 'Drives', 'Smart Grids', 'Renewables'],
    pdfFileName: 'NIT_Goa_EEE_Curriculum_Scheme_Complete.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/eee/curriculum.html',
    sections: [
      {
        title: 'Semester-Wise Credit Summary (EEE)',
        table: {
          headers: ['Semester', 'Core Subjects Covered', 'Theory', 'Practical', 'Credits'],
          rows: [
            ['Semester 1', 'Engineering Foundation (Physics/Chemistry Cycle)', '5', '3 Labs', '21'],
            ['Semester 2', 'Foundation (Opposite Cycle)', '5', '3 Labs', '21'],
            ['Semester 3', 'Electrical Machines-I, Network Theory, Analog Electronics, EMF', '5', '2 Labs', '22'],
            ['Semester 4', 'Electrical Machines-II, Digital Electronics, Electrical Measurements', '5', '2 Labs', '21'],
            ['Semester 5', 'Power Systems-I, Power Electronics, Control Systems, Microprocessors', '5', '2 Labs', '21'],
            ['Semester 6', 'Power Systems-II, Solid State Drives, Advanced Control, Elective-II', '5', '2 Labs + Mini-Proj', '22'],
            ['Semester 7', 'Renewable Energy, Smart Grids, FACTS, Major Project - I', '4', 'Major Proj I + Viva', '19'],
            ['Semester 8', 'High Voltage & HVDC, Dynamics & Stability, Capstone Project - II', '2 Electives', 'Major Proj II (8 cr)', '16'],
            ['Total', 'Full 4-Year Curriculum', '36 Theory', '17 Practical Units', '166 Credits']
          ]
        }
      }
    ]
  },

  {
    id: 'curr-me-scheme',
    title: 'B.Tech Mechanical Engineering - Complete 4-Year Scheme of Instruction',
    shortTitle: 'ME Curriculum Scheme',
    docNumber: 'NITG/ME/SCHEME/2024-28',
    category: 'curriculum',
    branch: 'ME',
    year: 'ALL',
    semesterRange: 'Semesters 1 through 8',
    academicYear: '2024–2028',
    issuingAuthority: 'Department of Mechanical Engineering',
    effectiveDate: 'July 2024',
    summary: 'B.Tech Mechanical curriculum framework integrating thermal sciences, fluid dynamics, solid mechanics, manufacturing systems, robotics, and industrial engineering. Total: 165 Credits.',
    tags: ['ME', 'Mechanical', 'Scheme', 'Thermodynamics', 'Robotics', 'Manufacturing', 'Fluid Dynamics'],
    pdfFileName: 'NIT_Goa_Mechanical_Curriculum_Scheme_Complete.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/me/curriculum.html',
    sections: [
      {
        title: 'Semester-Wise Credit Summary (ME)',
        table: {
          headers: ['Semester', 'Primary Courses', 'Theory', 'Practical', 'Credits'],
          rows: [
            ['Semester 1', 'Engineering Foundation', '5', '3 Labs', '21'],
            ['Semester 2', 'Engineering Foundation', '5', '3 Labs', '21'],
            ['Semester 3', 'Thermodynamics, Mechanics of Solids, Fluid Mechanics, Mfg Tech I', '5', '2 Labs', '22'],
            ['Semester 4', 'Applied Thermodynamics, Kinematics, Materials Science, Mfg Tech II', '5', '2 Labs', '21'],
            ['Semester 5', 'Heat Transfer, Dynamics of Machinery, Machine Design I, IC Engines', '5', '2 Labs', '21'],
            ['Semester 6', 'Machine Design II, Turbo Machines, Metrology, Elective-II', '5', '2 Labs + Mini Proj', '22'],
            ['Semester 7', 'Automobile Engg, RAC, DFMA, CFD, Major Project - I', '4', 'Major Proj I + Viva', '19'],
            ['Semester 8', 'Robotics & Automation, Gas Turbines & Jet Propulsion, Capstone II', '2 Electives', 'Major Proj II (8 cr)', '16'],
            ['Total', '4-Year Mechanical Engineering Program', '36 Theory', '17 Practical Units', '165 Credits']
          ]
        }
      }
    ]
  },

  {
    id: 'curr-cve-scheme',
    title: 'B.Tech Civil Engineering - Complete 4-Year Scheme of Instruction',
    shortTitle: 'Civil Curriculum Scheme',
    docNumber: 'NITG/CVE/SCHEME/2024-28',
    category: 'curriculum',
    branch: 'CVE',
    year: 'ALL',
    semesterRange: 'Semesters 1 through 8',
    academicYear: '2024–2028',
    issuingAuthority: 'Department of Civil Engineering',
    effectiveDate: 'July 2024',
    summary: 'Comprehensive scheme for B.Tech Civil Engineering spanning structural design, hydraulics, geotechnical mechanics, environmental engineering, surveying, and transportation systems. Total: 164 Credits.',
    tags: ['CVE', 'Civil', 'Scheme', 'Structures', 'Geotechnical', 'Hydraulics', 'Surveying'],
    pdfFileName: 'NIT_Goa_Civil_Curriculum_Scheme_Complete.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/cve/curriculum.html',
    sections: [
      {
        title: 'Semester-Wise Credit Summary (Civil)',
        table: {
          headers: ['Semester', 'Disciplines Covered', 'Theory', 'Practical', 'Credits'],
          rows: [
            ['Semester 1', 'Foundation Courses', '5', '3 Labs', '21'],
            ['Semester 2', 'Foundation Courses', '5', '3 Labs', '21'],
            ['Semester 3', 'Strength of Materials, Fluid Mechanics, Surveying, BMTC', '5', '2 Labs', '22'],
            ['Semester 4', 'Structural Analysis I, Advanced Surveying, Concrete Tech, Hydrology', '5', '2 Labs', '21'],
            ['Semester 5', 'Structural Analysis II, Design of RCC, Geotechnical Engg I, Env Engg I', '5', '2 Labs', '21'],
            ['Semester 6', 'Design of Steel Structures, Geotechnical Engg II, Transportation Engg', '5', '2 Labs + Camp', '22'],
            ['Semester 7', 'Advanced RCC, Bridge Engg, Ground Improvement, Major Project - I', '4', 'Major Proj I + Viva', '19'],
            ['Semester 8', 'Prestressed Concrete, Earthquake Resistant Design, Capstone II', '2 Electives', 'Major Proj II (8 cr)', '16'],
            ['Total', '4-Year Civil Engineering Degree Program', '36 Theory', '17 Practical Units', '164 Credits']
          ]
        }
      }
    ]
  },

  // ==========================================
  // SYLLABUS BOOKS (Official NIT Goa 4-Module)
  // ==========================================
  {
    id: 'syl-y1-common',
    title: 'B.Tech 1st Year (Common Foundation) - Detailed Syllabus Book',
    shortTitle: '1st Year Foundation Syllabus',
    docNumber: 'NITG/SYL/FOUNDATION/2024-25',
    category: 'syllabus',
    branch: 'COMMON',
    year: '1',
    semesterRange: 'Semesters 1 & 2 (Physics & Chemistry Cycles)',
    academicYear: '2024–2025',
    issuingAuthority: 'Dean (Academics) & Joint Departmental Faculty Board',
    effectiveDate: 'August 2024',
    summary: 'Authoritative 4-module syllabus breakdown for all 1st-year subjects: Engineering Mathematics I & II, Engineering Physics, Engineering Chemistry, Computer Programming (C/Python), Basic Electrical Engineering, Engineering Mechanics, and Professional English.',
    tags: ['Syllabus', '1st Year', 'Math-I', 'Physics', 'Chemistry', 'Programming', 'Mechanics'],
    pdfFileName: 'NIT_Goa_BTech_1st_Year_Complete_Syllabus_Book.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/academic/syllabus.html',
    sections: [
      {
        title: 'MA100: Engineering Mathematics - I (3-1-0 : 4 Credits)',
        subheading: 'Core Foundation | Department of Applied Sciences',
        content: [
          '• Module 1: Differential Calculus & Multivariable Functions - Rolle Theorem, Mean Value Theorems, Taylor and Maclaurin expansions; Partial derivatives, Euler Theorem on homogeneous functions, Jacobians; Taylor expansion of two variables; Maxima and minima of functions of two variables, Lagrange multipliers.',
          '• Module 2: Integral Calculus & Multiple Integrals - Beta and Gamma functions and their properties; Double and triple integrals, evaluation by change of order of integration and change of variables (polar, cylindrical, spherical coordinate systems); Applications: computation of areas, surface areas, and volumes of revolution.',
          '• Module 3: Vector Calculus & Field Theory - Gradient, directional derivative, divergence, and curl of vector fields; Line, surface, and volume integrals; Green Theorem in a plane, Gauss Divergence Theorem, Stokes Theorem (with engineering proofs and verification); physical applications in conservative force fields.',
          '• Module 4: Sequences, Series & Ordinary Differential Equations - Convergence tests for infinite series: Ratio test, Root test, Raabe test, Alternating series (Leibnitz rule); Exact ODEs, integrating factors; Linear ODEs with constant coefficients, Cauchy-Euler equations, method of variation of parameters.'
        ]
      },
      {
        title: 'PH100: Engineering Physics (3-0-0 : 3 Credits)',
        subheading: 'Core Foundation | Department of Applied Sciences',
        content: [
          '• Module 1: Physical Optics & Lasers - Interference in thin films, Newton rings; Fraunhofer diffraction at single slit, double slit, and diffraction grating; Polarization: Brewster law, double refraction, Nicol prism, quarter/half wave plates; Lasers: Einstein coefficients, population inversion, He-Ne laser, semiconductor laser, fiber optics attenuation and numerical aperture.',
          '• Module 2: Quantum Mechanics Foundations - Wave-particle duality, de Broglie hypothesis, Davisson-Germer experiment; Heisenberg uncertainty principle; Wave function and Born physical interpretation; 1D time-independent and time-dependent Schrodinger equations; Particle in an infinite and finite potential well, quantum tunneling through a potential barrier.',
          '• Module 3: Solid State & Semiconductor Physics - Free electron theory, Fermi-Dirac distribution, density of states; Kronig-Penney model and formation of energy bands; Direct and indirect band gap semiconductors, carrier concentration in intrinsic and extrinsic semiconductors, Hall effect, solar cells and LED fundamentals.',
          '• Module 4: Electromagnetism & Dielectric Materials - Gauss law for electric and magnetic fields, Faraday law of induction, Ampere-Maxwell law, displacement current; Maxwell equations in differential and integral forms; Wave equation for electromagnetic waves in free space and dielectric media, Poynting vector, dielectric polarization.'
        ]
      },
      {
        title: 'CS100: Computer Programming & Problem Solving (3-0-0 : 3 Credits)',
        subheading: 'Core Foundation | Department of CSE',
        content: [
          '• Module 1: Computational Thinking & Fundamentals - Algorithms, flowcharts, pseudocode, compiler toolchain, memory hierarchy; Data types, operators, operator precedence, type casting; Decision control: if-else, nested if, switch-case; Iteration constructs: while, do-while, for loops.',
          '• Module 2: Modular Programming & Arrays - Function definition, prototypes, pass by value and pass by reference, recursion, storage classes (auto, static, extern, register); 1D arrays, multi-dimensional arrays, matrix operations, string manipulation and standard library string functions.',
          '• Module 3: Pointers & Dynamic Memory Management - Pointer arithmetic, pointer to pointers, pointers as function arguments; Dynamic memory allocation using malloc, calloc, realloc, and free; Void and function pointers, common memory leak traps and debugging techniques.',
          '• Module 4: Structures, Unions & File I/O - Structures: declaration, array of structures, nested structures, pointers to structures, self-referential structures; Unions and bit-fields; File operations: file pointers, fopen, fclose, text and binary file I/O (fprintf, fscanf, fread, fwrite, fseek).'
        ]
      }
    ]
  },

  {
    id: 'syl-cse-complete',
    title: 'Department of Computer Science & Engineering - Complete B.Tech Syllabus Book',
    shortTitle: 'CSE Detailed Syllabus Book',
    docNumber: 'NITG/CSE/SYL/2024-28/COMPLETE',
    category: 'syllabus',
    branch: 'CSE',
    year: 'ALL',
    semesterRange: 'Semesters 3 through 8 (All Years)',
    academicYear: '2024–2028',
    issuingAuthority: 'Department of CSE Curriculum Committee',
    effectiveDate: 'Current Academic Syllabus',
    summary: 'The comprehensive course-by-course syllabus book for all B.Tech CSE subjects across 2nd, 3rd, and 4th years. Fully structured in the authentic NIT Goa 4-Module format with course objectives, LTP metrics, textbooks, and prerequisite chains.',
    tags: ['CSE', 'Syllabus', 'Algorithms', 'Operating Systems', 'Databases', 'Networks', 'Machine Learning', 'Compilers'],
    pdfFileName: 'NIT_Goa_CSE_Complete_Syllabus_Book.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/cse/syllabus.html',
    sections: [
      {
        title: 'CS200: Data Structures and Algorithms (Sem 3 : 3-0-0 : 3 Credits)',
        content: [
          '• Module 1: Linear Data Structures - Asymptotic notation (Big-O, Omega, Theta), recurrence relations and Master Theorem; Stacks, Queues, Circular Queues, Deques; Singly, Doubly, and Circular Linked Lists; Applications: infix to postfix conversion, polynomial representation.',
          '• Module 2: Non-Linear Hierarchical Structures - Binary trees, properties, traversals (inorder, preorder, postorder, level-order); Binary Search Trees (BST), insertion, deletion; Self-balancing trees: AVL trees (single and double rotations), Red-Black trees, B-Trees and B+ Trees.',
          '• Module 3: Priority Queues & Graph Representations - Binary Heaps, min/max heap operations, Binomial heaps; Graph representation: adjacency matrix and adjacency list; Graph traversals: BFS, DFS; Directed Acyclic Graphs (DAG), topological sorting; Strongly connected components (Kosaraju algorithm).',
          '• Module 4: Hashing & Sorting Algorithms - Hash functions, collision resolution: separate chaining, open addressing (linear probing, quadratic probing, double hashing); Sorting: QuickSort, MergeSort, HeapSort, non-comparative sorting (CountingSort, RadixSort).'
        ]
      },
      {
        title: 'CS300: Design and Analysis of Algorithms (Sem 5 : 3-1-0 : 4 Credits)',
        content: [
          '• Module 1: Divide-and-Conquer & Greedy Strategies - Divide-and-Conquer paradigm, Strassen matrix multiplication; Greedy Method: fractional knapsack, Huffman coding, minimum spanning trees (Prim and Kruskal algorithms), single-source shortest paths (Dijkstra algorithm).',
          '• Module 2: Dynamic Programming - Principle of optimality; Matrix chain multiplication, Longest Common Subsequence (LCS), 0/1 Knapsack problem, Bellman-Ford shortest path algorithm, Floyd-Warshall all-pairs shortest paths, traveling salesperson problem (DP approach).',
          '• Module 3: Backtracking & Branch-and-Bound - N-Queens problem, Subset sum problem, Graph coloring, Hamiltonian cycles; Branch and Bound: 15-puzzle problem, 0/1 Knapsack branch-and-bound, Traveling Salesperson Problem.',
          '• Module 4: NP-Completeness & Approximation Algorithms - Complexity classes P, NP, NP-Hard, and NP-Complete; Polynomial-time reductions; Cook-Levin theorem; Proving NP-completeness: 3-SAT, Clique, Vertex Cover; Approximation algorithms for Vertex Cover and Metric TSP.'
        ]
      },
      {
        title: 'CS301: Operating Systems (Sem 5 : 3-0-0 : 3 Credits)',
        content: [
          '• Module 1: OS Structures & Process Management - Dual-mode operation, system calls, OS architectures; Process state diagram, Process Control Block (PCB), context switching; CPU Scheduling: FCFS, SJF, Priority, Round Robin, Multilevel Feedback Queue scheduling.',
          '• Module 2: Process Synchronization & Deadlocks - Critical section problem, Peterson solution; Hardware synchronization, semaphores, mutex locks, monitors; Classical problems: Producer-Consumer, Dining Philosophers; Deadlock characterization, Banker algorithm for deadlock avoidance.',
          '• Module 3: Memory Management & Virtual Memory - Logical vs physical address space, contiguous allocation, paging, segmentation, TLB; Virtual memory: demand paging, page fault handling, page replacement algorithms (FIFO, LRU, Optimal), thrashing and working set model.',
          '• Module 4: Storage & File Systems - File organization, directory structures, allocation methods (contiguous, linked, indexed), free space management; Disk scheduling (FCFS, SSTF, SCAN, C-SCAN), RAID structures, OS protection and access matrix.'
        ]
      },
      {
        title: 'CS540: Deep Learning & Natural Language Processing (Sem 8 : 3-0-0 : 3 Credits)',
        content: [
          '• Module 1: Statistical NLP & Vector Space Embeddings - N-gram language models, perplexity, smoothing; vector space representations: TF-IDF, Continuous Bag of Words (CBOW), Skip-Gram (Word2Vec), GloVe; sub-word tokenization: Byte-Pair Encoding (BPE), WordPiece.',
          '• Module 2: Sequential Deep Models & Recurrent Architectures - Recurrent Neural Networks (RNN), vanishing and exploding gradients, Backpropagation Through Time (BPTT); Long Short-Term Memory (LSTM), Gated Recurrent Units (GRU); bidirectional RNNs, sequence-to-sequence models.',
          '• Module 3: Attention Mechanism & Transformer Architectures - Bahdanau additive and Luong multiplicative attention; Transformer encoder-decoder architecture: scaled dot-product attention, multi-head attention, positional encodings; BERT, RoBERTa, and GPT series.',
          '• Module 4: Large Language Models, Fine-Tuning & Generative AI - Pre-training objectives (masked language modeling, causal language modeling); fine-tuning techniques: Parameter-Efficient Fine-Tuning (LoRA, QLoRA), Prompt Engineering, In-Context Learning; Retrieval-Augmented Generation (RAG).'
        ]
      }
    ]
  },

  {
    id: 'syl-ece-complete',
    title: 'Department of Electronics & Communication Engineering - Complete Syllabus Book',
    shortTitle: 'ECE Detailed Syllabus Book',
    docNumber: 'NITG/ECE/SYL/2024-28/COMPLETE',
    category: 'syllabus',
    branch: 'ECE',
    year: 'ALL',
    semesterRange: 'Semesters 3 through 8 (All Years)',
    academicYear: '2024–2028',
    issuingAuthority: 'Department of ECE Curriculum Committee',
    effectiveDate: 'Current Academic Syllabus',
    summary: 'The complete 4-module syllabus guide for all B.Tech ECE disciplines including Analog Circuits, Electromagnetic Waves, Digital Communication, VLSI Design, DSP, and Wireless & 5G Systems.',
    tags: ['ECE', 'Syllabus', 'VLSI', 'Digital Communication', 'Electromagnetics', '5G', 'DSP'],
    pdfFileName: 'NIT_Goa_ECE_Complete_Syllabus_Book.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/ece/syllabus.html',
    sections: [
      {
        title: 'EC300: Analog Communication (Sem 5 : 3-0-0 : 3 Credits)',
        content: [
          '• Module 1: Linear Continuous Wave Modulation - Principles of Amplitude Modulation (AM), DSB-SC, SSB-SC, and VSB; modulation index, spectrum, power calculations; generation and coherent detection schemes; Costas receiver, envelope detector, superheterodyne receiver.',
          '• Module 2: Exponential Angle Modulation - Frequency Modulation (FM) and Phase Modulation (PM); narrowband FM vs wideband FM, Carson rule for bandwidth; Armstrong indirect FM generation, direct FM generation using varactor diode; demodulation using Foster-Seeley discriminator and PLL.',
          '• Module 3: Probability, Random Variables & Noise in Communication - Random variables, probability density functions, Gaussian noise; White Gaussian noise, narrow-band noise representation; SNR analysis in DSB-SC, SSB-SC, AM envelope detector, and FM discriminator; pre-emphasis and de-emphasis.',
          '• Module 4: Pulse Modulation & Sampling Fundamentals - Low-pass sampling theorem, aliasing, flat-top and natural sampling; Pulse Amplitude Modulation (PAM), Pulse Width Modulation (PWM), Pulse Position Modulation (PPM); Time Division Multiplexing (TDM).'
        ]
      },
      {
        title: 'EC350: Digital VLSI Design (Sem 6 : 3-0-0 : 3 Credits)',
        content: [
          '• Module 1: MOS Transistor Theory & Inverter Characteristics - Review of MOSFET physics, I-V characteristics, subthreshold conduction; CMOS inverter static characteristics, VTC curve, noise margins, regenerative property; dynamic behavior: propagation delay, parasitic capacitances, power dissipation.',
          '• Module 2: Combinational MOS Logic Circuits - Static CMOS design: complementary logic gates, ratioed logic (pseudo-NMOS), pass-transistor logic, transmission gates; Dynamic CMOS logic: Domino logic, NORA logic, charge sharing, leakage mitigation; Logical effort analysis for delay estimation.',
          '• Module 3: Sequential Logic & Clocking Disciplines - Static latches and registers, bistable elements, SR latch, CMOS D-latch and edge-triggered flip-flops; setup time, hold time, clock-to-Q delay; clock skew and jitter, non-overlapping two-phase clocking, pipelining strategies.',
          '• Module 4: Memory Architectures & Physical Design - SRAM 6T cell operation (read, write, hold margins), DRAM 1T cell and refresh circuits; ROM, Flash memory; Physical layout design rules (lambda-based rules), stick diagrams, latch-up prevention, standard-cell ASIC flow.'
        ]
      }
    ]
  },

  {
    id: 'syl-eee-complete',
    title: 'Department of Electrical & Electronics Engineering - Complete Syllabus Book',
    shortTitle: 'EEE Detailed Syllabus Book',
    docNumber: 'NITG/EEE/SYL/2024-28/COMPLETE',
    category: 'syllabus',
    branch: 'EEE',
    year: 'ALL',
    semesterRange: 'Semesters 3 through 8 (All Years)',
    academicYear: '2024–2028',
    issuingAuthority: 'Department of EEE Curriculum Committee',
    effectiveDate: 'Current Academic Syllabus',
    summary: 'The complete course-by-course syllabus guide for B.Tech EEE students. Features 4-module syllabi for Electrical Machines, Power Electronics, Power System Analysis, Control Theory, Smart Grids, and HVDC Engineering.',
    tags: ['EEE', 'Syllabus', 'Machines', 'Power Systems', 'Power Electronics', 'Control Systems', 'HVDC'],
    pdfFileName: 'NIT_Goa_EEE_Complete_Syllabus_Book.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/eee/syllabus.html',
    sections: [
      {
        title: 'EE300: Power Systems - I (Sem 5 : 3-1-0 : 4 Credits)',
        content: [
          '• Module 1: Transmission Line Parameters - Resistance, skin effect, proximity effect; Inductance of single-phase and 3-phase lines, transposition, composite conductors, GMD and GMR concepts; Capacitance of 1-phase and 3-phase lines with earth effect; bundle conductors.',
          '• Module 2: Performance of Transmission Lines - Short, medium (Nominal-T and Nominal-Pi), and long transmission lines; rigorous solution, ABCD parameters, surge impedance loading (SIL), Ferranti effect, voltage regulation and power transmission efficiency.',
          '• Module 3: Mechanical Design & Overhead Insulators - Sag and tension calculations (equal and unequal supports, ice and wind loading); Types of insulators (pin, suspension, strain), potential distribution across suspension string, string efficiency, methods of equalizing potential.',
          '• Module 4: Underground Cables & Corona Phenomenon - Cable construction, dielectric insulation, electrostatic stress in single-core and belted cables, capacitance and grading of cables (capacitance and inter-sheath grading); Corona discharge, critical disruptive voltage, power loss.'
        ]
      },
      {
        title: 'EE301: Power Electronics (Sem 5 : 3-0-0 : 3 Credits)',
        content: [
          '• Module 1: Power Semiconductor Switching Devices - Power diodes, Thyristors (SCR), Triac, GTO, Power MOSFET, IGBT; static and dynamic switching characteristics; SCR firing circuits (UJT, optocouplers), commutation techniques (natural, forced); snubber circuit design.',
          '• Module 2: Controlled Phase Rectifiers - 1-phase and 3-phase half-controlled and fully controlled bridge converters with R, RL, and RLE loads; continuous and discontinuous conduction modes; source inductance effect, power factor improvement schemes.',
          '• Module 3: DC-DC Converters (Choppers) - Principles of step-down (buck) and step-up (boost) choppers; Buck-boost, Cuk, and SEPIC topologies; continuous and discontinuous inductor current modes; state-space averaged modeling, duty cycle control.',
          '• Module 4: Inverters & AC Voltage Regulators - 1-phase and 3-phase voltage source inverters (120-degree and 180-degree conduction modes); PWM techniques: sinusoidal PWM (SPWM), space vector PWM (SVPWM); Current source inverters; AC voltage controllers.'
        ]
      }
    ]
  },

  {
    id: 'syl-me-complete',
    title: 'Department of Mechanical Engineering - Complete Syllabus Book',
    shortTitle: 'ME Detailed Syllabus Book',
    docNumber: 'NITG/ME/SYL/2024-28/COMPLETE',
    category: 'syllabus',
    branch: 'ME',
    year: 'ALL',
    semesterRange: 'Semesters 3 through 8 (All Years)',
    academicYear: '2024–2028',
    issuingAuthority: 'Department of Mechanical Engineering Curriculum Committee',
    effectiveDate: 'Current Academic Syllabus',
    summary: 'The official 4-module syllabus guide for all B.Tech Mechanical courses: Thermodynamics, Heat Transfer, Machine Design, CFD, Robotics & Industrial Automation, and Gas Turbines.',
    tags: ['ME', 'Mechanical', 'Syllabus', 'Heat Transfer', 'Fluid Dynamics', 'Robotics', 'CFD'],
    pdfFileName: 'NIT_Goa_Mechanical_Complete_Syllabus_Book.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/me/syllabus.html',
    sections: [
      {
        title: 'ME300: Heat Transfer (Sem 5 : 3-1-0 : 4 Credits)',
        content: [
          '• Module 1: Conduction Heat Transfer - Fourier law of heat conduction, general 3D heat conduction equation in Cartesian, cylindrical, and spherical coordinates; 1D steady conduction through plane and composite walls; thermal contact resistance, critical thickness of insulation; extended surfaces (fins).',
          '• Module 2: Transient Conduction & Numerical Methods - Lumped capacitance method, validity criterion (Biot number), infinite solids with negligible internal resistance; 1D transient conduction in semi-infinite and finite slabs; Heisler charts; finite difference formulations.',
          '• Module 3: Convective Heat Transfer - Boundary layer theory, velocity and thermal boundary layers, Reynolds analogy; Forced convection: external flow over flat plates and cylinders, internal flow through circular tubes, Dittus-Boelter correlation; Natural convection: Grashof number, Rayleigh number.',
          '• Module 4: Thermal Radiation & Heat Exchangers - Black body radiation, Planck distribution law, Wien displacement law, Stefan-Boltzmann law, Kirchhoff law; Radiation shape factor, radiation exchange between diffuse gray surfaces, radiation shields; Heat exchangers: LMTD and NTU-effectiveness methods.'
        ]
      },
      {
        title: 'ME540: Robotics and Industrial Automation (Sem 8 : 3-0-0 : 3 Credits)',
        content: [
          '• Module 1: Spatial Descriptions & Forward Kinematics - Coordinate frames, rotation matrices, Euler angles, roll-pitch-yaw angles; homogeneous transformation matrices; Denavit-Hartenberg (D-H) parameter representation; forward kinematics formulation for planar 2R/3R arms, SCARA, and 6-DOF industrial serial manipulators.',
          '• Module 2: Inverse Kinematics & Manipulator Jacobians - Geometric and algebraic inverse kinematics solution techniques, existence of multiple solutions; velocity kinematics: linear and angular velocities of links, Manipulator Jacobian matrix; kinematic singularities and rank deficiency; static force-torque relations.',
          '• Module 3: Manipulator Dynamics & Trajectory Planning - Euler-Lagrange dynamic formulation, kinetic and potential energy of rigid bodies; inertia matrix, Coriolis and centripetal terms, gravity vector; trajectory planning in joint space and Cartesian space: cubic polynomials, quintic polynomials, parabolic blends (LSPB).',
          '• Module 4: Robot Control & Industrial Automation - Independent joint control: PD and PID feedback control; computed torque control; end-effector gripping mechanisms (vacuum, mechanical jaws, magnetic grippers); programmable logic controllers (PLCs), ladder logic, robotic work-cell automation and collaborative robots (Cobots).'
        ]
      }
    ]
  },

  {
    id: 'syl-cve-complete',
    title: 'Department of Civil Engineering - Complete Syllabus Book',
    shortTitle: 'Civil Detailed Syllabus Book',
    docNumber: 'NITG/CVE/SYL/2024-28/COMPLETE',
    category: 'syllabus',
    branch: 'CVE',
    year: 'ALL',
    semesterRange: 'Semesters 3 through 8 (All Years)',
    academicYear: '2024–2028',
    issuingAuthority: 'Department of Civil Engineering Curriculum Committee',
    effectiveDate: 'Current Academic Syllabus',
    summary: 'The comprehensive course-by-course syllabus guide for B.Tech Civil Engineering. Full 4-module coverage for Structural Analysis, Design of RCC, Geotechnical Engineering, Prestressed Concrete, and Earthquake Resistant Design.',
    tags: ['CVE', 'Civil', 'Syllabus', 'RCC', 'Steel', 'Prestressed Concrete', 'Earthquake', 'Geotechnical'],
    pdfFileName: 'NIT_Goa_Civil_Complete_Syllabus_Book.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/cve/syllabus.html',
    sections: [
      {
        title: 'CV301: Design of Reinforced Concrete Structures (Sem 5 : 3-1-0 : 4 Credits)',
        content: [
          '• Module 1: Limit State Philosophy & Flexural Analysis - Limit state design philosophy as per IS 456:2000, characteristic loads and material strengths, partial safety factors; Analysis and design of singly and doubly reinforced rectangular and flanged (T and L) beam sections for flexure.',
          '• Module 2: Shear, Torsion, Bond & Serviceability - Limit state of collapse in shear: nominal shear stress, design shear strength of concrete, design of vertical stirrups and bent-up bars; Torsional reinforcement design; Development length, anchorage and lap splices; Limit state of serviceability: deflection and cracking.',
          '• Module 3: Design of Slabs & Staircases - Behavior and design of one-way and two-way simply supported and continuous slabs (IS 456 moment coefficients); Design of dog-legged and open-well staircases with loading guidelines.',
          '• Module 4: Design of Compression Members & Foundations - Classification of columns, effective length concept, short and slender columns; Limit state design of short columns under axial compression, uniaxial bending, and biaxial bending (interaction charts); Design of isolated square and rectangular footings.'
        ]
      },
      {
        title: 'CV545: Earthquake Resistant Design of Structures (Sem 8 : 3-0-0 : 3 Credits)',
        content: [
          '• Module 1: Engineering Seismology & Structural Dynamics - Origin of earthquakes, plate tectonics, seismic waves, fault mechanisms, magnitude and intensity scales, seismographs; single-degree-of-freedom (SDOF) systems: free and forced vibrations, damping, response spectrum concept.',
          '• Module 2: Seismic Conceptual Design & Irregularities - Building configurations for seismic resistance, continuous load paths, soft storey effect, torsional irregularity, re-entrant corners, short column effect; pounding between adjacent structures, soil-structure interaction overview.',
          '• Module 3: Seismic Analysis Methods as per IS 1893:2016 - Design lateral force calculation using Equivalent Static Method; dynamic analysis: Response Spectrum Method (modal combination rules: SRSS, CQC); design base shear, vertical distribution of seismic forces, drift limitations.',
          '• Module 4: Ductile Detailing & Modern Aseismic Strategies - Philosophy of capacity design, strong-column weak-beam mechanism; ductile detailing of beams, columns, beam-column joints, and shear walls in accordance with IS 13920:2016; introduction to seismic base isolation and passive tuned mass dampers.'
        ]
      }
    ]
  },

  // ==========================================
  // ACADEMIC CALENDARS
  // ==========================================
  {
    id: 'cal-odd-semester',
    title: 'NIT Goa Official Academic Calendar - Odd Semester (July to December)',
    shortTitle: 'Odd Semester Academic Calendar',
    docNumber: 'NITG/ACAD/CAL/2024-25/ODD',
    category: 'calendar',
    branch: 'ALL',
    year: 'ALL',
    semesterRange: 'Semesters 1, 3, 5 & 7',
    academicYear: '2024–2025',
    issuingAuthority: 'Office of the Dean (Academic), NIT Goa',
    effectiveDate: 'Approved by Chairman, Senate',
    summary: 'Official milestones for the Odd Semester: physical reporting, course registration, continuous evaluation deadlines, Mid-Semester Examinations, Diwali vacation, End-Semester Examinations, and grade publication dates.',
    tags: ['Calendar', 'Dates', 'Odd Semester', 'Mid-Sem Dates', 'End-Sem Dates', 'Registration'],
    pdfFileName: 'NIT_Goa_Odd_Semester_Academic_Calendar.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/academic/calendar.html',
    sections: [
      {
        title: 'Key Academic Milestones (Odd Semester)',
        table: {
          headers: ['Event / Activity', 'Undergraduate Batch', 'Scheduled Date / Window'],
          rows: [
            ['Physical Reporting & Fee Payment', 'B.Tech 2nd, 3rd & 4th Year', 'July 22 – July 26'],
            ['Orientation & Induction Program', 'B.Tech 1st Year (Freshers)', 'August 01 – August 07'],
            ['Commencement of Classes', 'All Undergraduate Semesters', 'August 05 (Seniors) / August 08 (1st Year)'],
            ['Last Date for Course Add/Drop', 'All Registered Students', 'August 16'],
            ['First Attendance Review & Shortfall Intimation', 'Dean Academics Notice Board', 'September 13'],
            ['Mid-Semester Examinations (Slot A–F)', 'Semesters 1, 3, 5, 7', 'September 23 – September 30'],
            ['Mid-Sem Marks Display to Students', 'Respective Faculty In-charge', 'October 08'],
            ['Diwali Vacation / Mid-Term Break', 'Institute Holiday', 'October 28 – November 01'],
            ['Last Working Day for Odd Semester', 'Completion of 90 Instructional Days', 'November 22'],
            ['Practical / Laboratory End-Sem Examinations', 'Department Laboratories', 'November 25 – November 29'],
            ['End-Semester Theory Examinations', 'Central Examination Halls', 'December 02 – December 13'],
            ['Department Evaluation & Grade Moderation', 'Senate Board of Examiners', 'December 18 – December 20'],
            ['Official Announcement of Results (ERP Portal)', 'Dean (Academics)', 'December 24']
          ]
        }
      }
    ]
  },

  {
    id: 'cal-even-semester',
    title: 'NIT Goa Official Academic Calendar - Even Semester (January to June)',
    shortTitle: 'Even Semester Academic Calendar',
    docNumber: 'NITG/ACAD/CAL/2024-25/EVEN',
    category: 'calendar',
    branch: 'ALL',
    year: 'ALL',
    semesterRange: 'Semesters 2, 4, 6 & 8',
    academicYear: '2024–2025',
    issuingAuthority: 'Office of the Dean (Academic), NIT Goa',
    effectiveDate: 'Approved by Chairman, Senate',
    summary: 'Official schedule for the Even Semester: spring registration, annual cultural/technical festivals (Saavyas / Raag), Mid-Sem Exams, Capstone Phase-II Final Project Submissions, and Summer Break.',
    tags: ['Calendar', 'Dates', 'Even Semester', 'Festivals', 'Major Project Defense', 'Summer Vacation'],
    pdfFileName: 'NIT_Goa_Even_Semester_Academic_Calendar.pdf',
    externalOfficialUrl: 'https://www.nitgoa.ac.in/academic/calendar.html',
    sections: [
      {
        title: 'Key Academic Milestones (Even Semester)',
        table: {
          headers: ['Event / Activity', 'Target Cohort', 'Scheduled Date / Window'],
          rows: [
            ['Even Semester Course Registration', 'All B.Tech Batches', 'January 02 – January 06'],
            ['Commencement of Regular Classes', 'Semesters 2, 4, 6 & 8', 'January 06'],
            ['Annual Technical Festival (Saavyas)', 'Campus Event', 'February 14 – February 16'],
            ['Mid-Semester Examinations', 'All Semesters', 'February 24 – March 03'],
            ['Annual Cultural Festival (Raag)', 'Campus Event', 'March 14 – March 16'],
            ['Submission of Capstone Major Project Drafts', 'B.Tech 4th Year (Sem 8)', 'April 18'],
            ['Last Instructional Day of Classes', 'All Batches', 'April 25'],
            ['End-Semester Practical Examinations', 'Department Laboratories', 'April 28 – May 02'],
            ['End-Semester Theory Examinations', 'Central Halls', 'May 05 – May 16'],
            ['B.Tech Major Project - II Final Viva Defense', 'External Examiners Committee', 'May 19 – May 21'],
            ['Results Declaration & Grade Publishing', 'Dean (Academics)', 'May 28'],
            ['Summer Vacation / Industrial Training Period', 'Students', 'May 30 – July 18']
          ]
        }
      }
    ]
  }
];
