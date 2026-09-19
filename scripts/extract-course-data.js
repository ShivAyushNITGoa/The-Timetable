import fs from 'fs';
import path from 'path';

const branches = ['EEE', 'ECE', 'CSE', 'MCE', 'CVE'];

for (const b of branches) {
  const file = path.resolve(`downloads/${b}_text.txt`);
  if (!fs.existsSync(file)) {
    console.log(`Missing ${file}`);
    continue;
  }
  const text = fs.readFileSync(file, 'utf8');
  console.log(`=== Branch ${b} ===`);

  // Regex to find course codes like EE200, CS301, EC202, ME201, CVE201, etc.
  // In NIT Goa curricula:
  // "Course Code Courses Name Course Type L - T - P Credits Total Hours"
  // e.g. "EE200 Circuit Theory Theory 3 - 1 - 0 4 56"
  // or "CS200 Data Structures Theory 3 - 0 - 0 3"
  const matches = [...text.matchAll(/([A-Z]{2,4}\s*\d{3}[A-Z]?)\s+([A-Za-z0-9,\-\s/()&]+?)(?:Theory|Practical|Laboratory|Lab|Elective|Core|DC|BS|ES|HS|OE)\s+([0-9\s-]+)\s+([0-9]+)/gi)];
  console.log(`Potential course matches count: ${matches.length}`);
  if (matches.length > 0) {
    console.log('Sample matches:');
    matches.slice(0, 8).forEach(m => {
      console.log(`  Code: "${m[1].trim()}", Name: "${m[2].trim()}", LTP: "${m[3].trim()}", Credits: "${m[4].trim()}"`);
    });
  }

  // Let's also check for "Syllabus:" or "Module 1"
  const syllabusMatches = [...text.matchAll(/Syllabus:\s*([\s\S]*?)(?:Learning Resources|Text\s*Books|References|Course Outcome|$)/gi)];
  console.log(`Syllabus sections found: ${syllabusMatches.length}`);
}
