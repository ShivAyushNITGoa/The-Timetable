import fs from 'fs';
import path from 'path';

const branchFiles = [
  { branch: 'EEE', file: 'downloads/EEE_text.txt' },
  { branch: 'ECE', file: 'downloads/ECE_text.txt' },
  { branch: 'CSE', file: 'downloads/CSE_text.txt' },
  { branch: 'MCE', file: 'downloads/MCE_text.txt' },
  { branch: 'CVE', file: 'downloads/CVE_text.txt' },
];

const courseDatabase = {};

// Helper to clean up text
function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/--\s*\d+\s*of\s*\d+\s*--/g, '') // remove page numbers
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

for (const bf of branchFiles) {
  const text = fs.readFileSync(bf.file, 'utf8');
  console.log(`\n================ Processing ${bf.branch} ================`);

  // Let's find all syllabus blocks
  // Common pattern across NIT Goa curricula:
  // (CourseCode) (CourseName) [L T P / Credits]
  // ...
  // Syllabus ...
  // ...
  // (References / Learning Resources / Text Books)

  // We can search for course code patterns:
  // e.g., EE\d{3}, EC\d{3}, CS\d{3}, ME\d{3}, CV\d{3}, MA\d{3}, PH\d{3}, CY\d{3}, HS\d{3}, HU\d{3}, ES\d{3}, IE\d{3}, IKS\d{3}
  const courseCodeRegex = /\b(EE\d{3}[A-Z]?|EC\d{3}[A-Z]?|CS\d{3}[A-Z]?|ME\d{3}[A-Z]?|CV\d{3}[A-Z]?|MA\d{3}|PH\d{3}|CY\d{3}|HS\d{3}|HU\d{3}|ES\d{3}|IE\d{3}|IKS\d{3})\b/g;

  // Let's find all distinct positions where course syllabus appears
  // Specifically lines like "Course Code ... Course Name ... L T P" or "Course Code\s+([A-Z]{2,4}\d{3})"
  // Or "([A-Z]{2,4}\d{3})\s+([A-Za-z0-9,\-\s/()&]+?)\s+(?:3|4|2|1)\s+(?:0|1)\s+(?:0|1|2|3)"
  
  // Let's use a regex to find all course definitions in text
  const courseHeaderRegex = /(?:Course Code[:\s]+)?\b(EE\d{3}[A-Z]?|EC\d{3}[A-Z]?|CS\d{3}[A-Z]?|ME\d{3}[A-Z]?|CV\d{3}[A-Z]?|MA\d{3}|PH\d{3}|CY\d{3}|HS\d{3}|HU\d{3}|ES\d{3}|IE\d{3}|IKS\d{3})\b\s*[:\-–]?\s*([A-Za-z0-9,\-\s/()&]+?)(?:\s+(?:Theory|Practical|Laboratory|Lab|Elective|Core|DC|BS|ES|HS|OE|Credits?|Credit|LTP|L\s*T\s*P|Contact hours|Overlaps with|Course Objective|Course Objectives|Course Outcomes|Pre-requisites|\d\s*-\s*\d|\d\s+\d\s+\d))/gi;

  const positions = [];
  let m;
  while ((m = courseHeaderRegex.exec(text)) !== null) {
    const code = m[1].toUpperCase().trim();
    const rawName = m[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    const index = m.index;

    // Filter out table of contents lines or summary table lines
    // In TOC, lines usually have lots of dots: ". . . . . 21"
    const next500 = text.slice(index, index + 500);
    if (next500.includes('. . . .') || next500.includes('Table 1.') || next500.includes('Total Credits')) {
      continue;
    }

    // Check if within next 4000 characters there is "Syllabus"
    const next4000 = text.slice(index, index + 4000);
    const hasSyllabus = /Syllabus/i.test(next4000);
    if (!hasSyllabus) continue;

    positions.push({
      code,
      name: rawName,
      index,
      branch: bf.branch,
    });
  }

  // Remove duplicates that are very close to each other
  const filtered = [];
  for (const pos of positions) {
    const prev = filtered[filtered.length - 1];
    if (prev && prev.code === pos.code && Math.abs(pos.index - prev.index) < 500) {
      continue;
    }
    filtered.push(pos);
  }

  console.log(`Found ${filtered.length} candidate course sections in ${bf.branch}`);

  for (let i = 0; i < filtered.length; i++) {
    const current = filtered[i];
    const nextIndex = i + 1 < filtered.length ? filtered[i + 1].index : text.length;
    // Chunk for this course is from current.index to nextIndex (capped at ~10,000 chars)
    const chunk = text.slice(current.index, Math.min(nextIndex, current.index + 12000));

    // Extract LTP and Credits if present
    const ltpMatch = chunk.match(/(?:L\s*-\s*T\s*-\s*P|L\s*T\s*P|Contact hours[\s\S]*?L-T-P\)?[:\s]*)\s*([0-9]\s*[- ]\s*[0-9]\s*[- ]\s*[0-9])/i);
    const creditsMatch = chunk.match(/(?:Credits?|Credit)[:\s]*([0-9]+)/i);

    // Extract Syllabus section
    const syllabusMatch = chunk.match(/Syllabus:?\s*([\s\S]*?)(?:(?:Learning Resources|Reference Books|References|Text\s*Books|Course Assessment|Evaluation Scheme|--\s*\d+\s*of|$))/i);
    
    let modules = [];
    if (syllabusMatch && syllabusMatch[1]) {
      const sylText = syllabusMatch[1];
      // Split by "Module X:" or "Module X" or numbered sections
      const moduleParts = sylText.split(/(?=Module\s+\d+:?|Unit\s+\d+:?)/i).filter(p => p.trim().length > 10);
      if (moduleParts.length > 1) {
        modules = moduleParts.map(p => cleanText(p));
      } else {
        // Break by paragraphs or sentences
        const paras = sylText.split(/\n\s*\n/).map(p => cleanText(p)).filter(p => p.length > 20);
        if (paras.length > 0) {
          modules = paras;
        } else {
          modules = [cleanText(sylText)];
        }
      }
    }

    // Extract Textbooks / References
    const refMatch = chunk.match(/(?:Learning Resources|Reference Books\/Material|References|Text\s*Books):?\s*([\s\S]*?)(?:Course Outcome|CO - PO|Relationship of Course|Evaluation Scheme|--\s*\d+\s*of|\n\s*\n\s*\n|$)/i);
    let textbooks = [];
    if (refMatch && refMatch[1]) {
      const refText = refMatch[1];
      const items = refText.split(/\n(?=\s*\d+[\.\)])/).map(item => cleanText(item)).filter(item => item.length > 10);
      if (items.length > 0) {
        textbooks = items;
      } else {
        const lines = refText.split('\n').map(l => cleanText(l)).filter(l => l.length > 15 && !l.startsWith('Module'));
        if (lines.length > 0) {
          textbooks = lines.slice(0, 6);
        }
      }
    }

    // Store in courseDatabase
    const courseCode = current.code;
    if (!courseDatabase[courseCode] || (modules.length > (courseDatabase[courseCode].modules?.length || 0))) {
      courseDatabase[courseCode] = {
        code: courseCode,
        name: current.name,
        branch: current.branch,
        ltp: ltpMatch ? ltpMatch[1].replace(/\s+/g, '-').replace(/--/g, '-') : undefined,
        credits: creditsMatch ? parseInt(creditsMatch[1], 10) : undefined,
        modules,
        textbooks,
      };
    }
  }
}

const totalExtracted = Object.keys(courseDatabase).length;
console.log(`\nTOTAL UNIQUE COURSES EXTRACTED: ${totalExtracted}`);
fs.writeFileSync('downloads/extracted_courses.json', JSON.stringify(courseDatabase, null, 2));

// Print summary by branch
const byBranch = {};
Object.values(courseDatabase).forEach(c => {
  byBranch[c.branch] = (byBranch[c.branch] || 0) + 1;
});
console.log('Courses count by branch:', byBranch);
console.log('Sample extracted course (CS300):', JSON.stringify(courseDatabase['CS300'], null, 2));
console.log('Sample extracted course (EE200):', JSON.stringify(courseDatabase['EE200'], null, 2));
console.log('Sample extracted course (EC200):', JSON.stringify(courseDatabase['EC200'], null, 2));
