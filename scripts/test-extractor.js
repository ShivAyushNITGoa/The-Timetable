import fs from 'fs';
import path from 'path';

// Let's create an advanced extractor for all 5 branches
const branchFiles = [
  { branch: 'EEE', file: 'downloads/EEE_text.txt' },
  { branch: 'ECE', file: 'downloads/ECE_text.txt' },
  { branch: 'CSE', file: 'downloads/CSE_text.txt' },
  { branch: 'MCE', file: 'downloads/MCE_text.txt' },
  { branch: 'CVE', file: 'downloads/CVE_text.txt' },
];

const extractedCourses = {};

for (const bf of branchFiles) {
  const text = fs.readFileSync(bf.file, 'utf8');
  console.log(`Processing ${bf.branch}...`);

  // Let's find course sections.
  // In NIT Goa curricula, each course usually has a block:
  // (Course Code) (Course Name) (L-T-P or L T P) (Credits)
  // followed by Objectives, Outcomes, CO-PO, Syllabus (Module 1, 2, 3, 4, 5), and References/Textbooks.

  // Regex pattern matching course headings:
  // e.g.: "EE200 Circuit Theory Theory 3 - 1 - 0 4"
  // or "CS300 Operating Systems 3 1 0 4"
  // or "EC200 Electromagnetic Theory 3 1 0 4"
  // or "ME200 Mechanics of Solids 3 0 0 3"
  // or "CV200 Mechanics of Solids 3 0 0 3"
  // or "Course Code ... CS300 ... Operating Systems"

  const codeRegex = /\b([A-Z]{2,3}\s*\d{3}[A-Z]?)\b/g;
  const lines = text.split('\n');
  
  // Let's find occurrences of course codes like EE200, CS301, etc.
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Look for lines containing course codes and syllabus
    const match = line.match(/^([A-Z]{2,4}\d{3}[A-Z]?)\s*[:\-–]?\s*(.+)$/i) ||
                  line.match(/Course Code\s+Course Name[\s\S]*?\n\s*([A-Z]{2,4}\d{3}[A-Z]?)\s+([A-Za-z0-9,\-\s/()&]+)/i);

    if (match) {
      // test
    }
  }
}
