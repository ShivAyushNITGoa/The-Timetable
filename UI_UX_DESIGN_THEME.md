# NIT Goa Academic Timetable & Student Portal — UI & UX Design System

> **Application**: The Timetable — NIT Goa Academic Timetable & Student Portal  
> **Brand & Engineering Core**: Powered by **The GDevelopers**  
> **Target Audience**: Undergraduate & Postgraduate Engineering Students, Faculty, and Academic Administrators at NIT Goa  
> **Tech Stack**: React 19 + TypeScript + Tailwind CSS v4 + Local-First Architecture with Firebase Firestore Cloud Sync + PWA Offline Support  

---

## 1. Executive Summary & Design Vision

**The Timetable** is engineered as an **authoritative, real-time academic operating system** for the National Institute of Technology Goa. It combines daily and weekly schedule matrix navigation, 75% attendance threshold monitoring, continuous evaluation tracking, SGPA simulation, official syllabus readers, and student portal access into a single, cohesive interface.

### Core Design Values:
- **Authoritative & Scholarly**: Replaces casual, overly colorful consumer app tropes with a structured, collegiate, dignified aesthetic appropriate for a national institute of technology.
- **High Information Density**: Class schedules, room allocations, instructor details, time slots, and attendance margins are viewable at a glance with minimal panning or unnecessary scrolling.
- **Zero-Latency Local-First Execution**: Routine student interactions (marking attendance, customizing elective slots, filtering courses, calculating SGPA) update in memory and `localStorage` in under 1ms, asynchronously synchronizing with Firebase Firestore when online.
- **Distraction-Free Focus**: High-contrast dark workspace (`bg-slate-950` / `bg-slate-900`) designed for all-day use in lecture halls, computer labs, and late-night study sessions.

---

## 2. Geometry & Corner Radius System

Following institutional design standards, all playful, overly rounded bubble shapes have been eliminated:

### 2.1 Corner Radius Hierarchy
| Element Type | Tailwind Class | Usage & Specifications |
| :--- | :--- | :--- |
| **Workspace Modals & Sheets** | `rounded-lg` / `rounded-t-xl sm:rounded-lg` | Dialog containers, syllabus reader panels, mobile bottom drawers |
| **Content Cards & Panels** | `rounded-lg` (`8px`) | Lecture period cards, test cards, handbook cards, profile summary strips |
| **Interactive Buttons** | `rounded-lg` or `rounded-md` (`6px - 8px`) | Primary actions ("Read PDF", "Switch Branch", "Mark Attendance", "Export") |
| **Input Controls & Dropdowns** | `rounded-md` (`6px`) | Filter inputs, date pickers, grade selects, search bars |
| **Status Tags & Micro-Badges** | `rounded` or `rounded-md` (`4px - 6px`) | Course codes, room numbers (`L-101`), batch indicators (`Batch 1`), cycle tags |
| **Progress Tracks & Bars** | `rounded-sm` / `rounded` | Attendance gauges, evaluation progress indicators |

### 2.2 Anti-Pill Discipline
- **No Floating Capsule Pills**: Status badges and category filters are rendered as clean, rectangular micro-tags (`rounded-md` or `rounded px-2 py-0.5`) with subtle borders, rather than bubbly `rounded-full` capsules.
- **Strictly Circular Only When Functional**: `rounded-full` is reserved exclusively for numerical step badges (e.g., `1`, `2`, `3` in installation instructions), notification count dots, or small status indicator pings.

---

## 3. Color Palette & Semantic Color Roles

The color system is anchored around **NIT Goa Collegiate Navy**, neutral structural slates, and predictable academic status colors.

### 3.1 Structural Neutrals
| Token | Tailwind Class | Semantic Application |
| :--- | :--- | :--- |
| **Canvas Background** | `bg-slate-950` (`#020617`) | Global page background, high-contrast viewport backdrop |
| **Card Surface** | `bg-slate-900` (`#0f172a`) | Primary card containers, modal headers, navigation bar |
| **Secondary Surface** | `bg-slate-850` / `bg-slate-800` | Sub-panels, table headers, hovered button states |
| **Subtle Divider** | `border-slate-800` (`#1e293b`) | Structural section borders, timetable grid cell boundaries |
| **Focused Divider** | `border-slate-700` (`#334155`) | Card hover outlines, active modal borders |
| **Primary Typography** | `text-white` / `text-slate-100` | Course names, active slot titles, modal headers |
| **Secondary Typography** | `text-slate-300` / `text-slate-400` | Faculty names, room codes, timestamps, descriptive copy |
| **Muted Metadata** | `text-slate-500` | Micro-labels, shortcuts, credit notes |

### 3.2 Academic Semantic Accents
| Accent | Tailwind Token | Semantic Domain in App |
| :--- | :--- | :--- |
| **Collegiate Navy & Royal Blue** | `bg-blue-600`, `text-blue-400`, `border-blue-500/40` | Active navigation tabs, primary action buttons, active lecture periods, NIT Goa branding |
| **Academic Emerald** | `bg-emerald-500/15`, `text-emerald-400`, `border-emerald-500/30` | Attendance eligibility ($\ge 75\%$), passed evaluations, live database connection status |
| **Critical Warning Rose** | `bg-rose-500/15`, `text-rose-400`, `border-rose-500/30` | Attendance shortage alert ($< 75\%$), test countdowns under 24 hours, destructive deletes |
| **Curricular Indigo** | `bg-indigo-500/15`, `text-indigo-400`, `border-indigo-500/30` | Minor courses (`CS300M`), elective tracks, curriculum schemes |
| **Caution Amber** | `bg-amber-500/15`, `text-amber-400`, `border-amber-500/30` | Approaching attendance danger zone ($75\% - 78\%$), unsaved timetable drafts |

---

## 4. Typography & Layout Density

### 4.1 Typography Standards
- **Font Stack**: Clean system sans-serif (`Inter`, system UI font fallback) with high-contrast text rendering (`antialiased`).
- **Monospace Stack**: `font-mono` applied to:
  - Course codes (`EE300`, `CS300M`, `EC201`)
  - Class timing ranges (`09:00 - 10:00`, `14:00 - 17:00`)
  - Room identifiers (`L-204`, `VLSI Lab`, `EEE Sem Hall`)
  - SGPA / CGPA calculations (`8.84`, `9.12`)
  - Local storage footprint metrics (`~14.2 KB`)
- **Visual Weight**: Titles use `font-bold` (`font-weight: 700`) or `font-semibold` (`600`). Overly bold or playful display typography (`font-black`) is replaced with balanced typographic hierarchy.

### 4.2 Information-Dense Layouts
1. **Weekly Timetable Matrix (`WeeklyGridView`)**:
   - Day columns (Mon–Fri) cross-referenced against 8 standard instructional periods (09:00 to 17:00).
   - Lunch break (13:00–14:00) cleanly anchored with distinct styling.
   - Lab slots (3-hour blocks) clearly distinguished without breaking matrix grid alignment.
2. **Day View (`DayScheduleView`)**:
   - Linear chronological progression showing the active class banner, remaining duration countdown, and immediate upcoming class.
   - Quick attendance toggles inline with each slot.
3. **Attendance Dashboard (`AttendanceTracker`)**:
   - Course-by-course breakdown calculating safe skips remaining before breaching the mandatory 75% NIT Goa Senate threshold.
   - Immediate class deficit calculation ("Need to attend 3 more consecutive classes to reach 75%").

---

## 5. Iconography Guidelines

- **Semantic Role Only**: Decorative flourish icons (such as playful stars or sparkle badges) are strictly avoided. Every icon must represent a functional domain:
  - `BookOpen`: Syllabus books, course outlines, academic reading
  - `GraduationCap`: Official degree tracks, Senate guidelines, student profiles
  - `Award`: Granted patents, university accreditations, verified honors
  - `Calendar` / `CalendarCheck`: Class schedules, test dates, academic calendars
  - `Clock`: Time ranges, slot durations, upcoming period countdowns
  - `MapPin`: Physical lecture halls, engineering laboratories, seminar venues
  - `User` / `Mail`: Faculty profiles, course coordinators, department emails
  - `Download` / `Upload`: Backup export/import, offline JSON sync
  - `Building2`: Institute departments (EEE, ECE, CSE, CVE, MCE) and campus facilities

---

## 6. Curated Institutional Theme Options

The application supports three dignified, high-readability colorways tailored for academic focus:

1. **NIT Goa Navy (`sapphire`) — Default**:
   - High-contrast institutional blue (`#2563eb`), slate dark surfaces, and cyan highlights for current-period indicators.
2. **Cambridge Slate (`slate`)**:
   - Monochromatic steel and graphite palette (`#64748b`) designed for maximum eye comfort during extended reading and schedule review.
3. **Oxford Burgundy (`crimson`)**:
   - Traditional collegiate wine (`#b91c1c`) offering a classic university heritage atmosphere.

---

## 7. Responsiveness & Offline-First (PWA) UX

- **Mobile Viewport Optimization**:
  - Compact top header (`48px`) with department switcher and active semester badge.
  - Ergonomic bottom navigation bar (`MobileBottomNav`) with high-touch targets ($\ge 44\text{px}$) and safe-area padding (`pb-[env(safe-area-inset-bottom)]`).
- **Complete Offline Independence**:
  - Full PWA Service Worker caching ensuring instant timetable lookups inside physical classrooms with poor network coverage.
  - Zero spinner blocking on core navigation or attendance updates.
- **Admin Control Panel**:
  - Restricted administrative role verification (`ashivamone@gmail.com`) for updating syllabus revisions and cloud schedule broadcasts directly to all students.
