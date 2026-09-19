import fs from 'fs';

const branchFiles = [
  { branch: 'EEE', file: 'downloads/EEE_text.txt' },
  { branch: 'ECE', file: 'downloads/ECE_text.txt' },
  { branch: 'CSE', file: 'downloads/CSE_text.txt' },
  { branch: 'MCE', file: 'downloads/MCE_text.txt' },
  { branch: 'CVE', file: 'downloads/CVE_text.txt' },
];

function cleanString(str) {
  if (!str) return '';
  return str
    .replace(/[ \t]+/g, ' ')
    .replace(/\r/g, '')
    .trim();
}

const masterDb = {};

for (const bf of branchFiles) {
  let rawText = fs.readFileSync(bf.file, 'utf8');
  // 1. Strip page footers and headers like "-- 9 of 253 --"
  let cleanDoc = rawText.replace(/--\s*\d+\s*of\s*\d+\s*--\s*\d*/gi, '');

  // 2. Find course headers across all branches
  // In NIT Goa curricula, course headers can look like:
  // "Course Code Course Name L T P Credits \n CS200 Data Structures 3 1 0 4"
  // "EE200 Circuit Theory Theory 3 - 1 - 0 4 56"
  // "ME200 Mechanics of Solids 3 0 0 3"
  // "CV200 Mechanics of Solids 3 0 0 3"
  // "EC200 Electromagnetic Theory 3 1 0 4"

  const codeRegex = /\b([A-Z]{2,4}\s*\d{3}[A-Z]?)\b/g;
  
  // Regex to detect course definition blocks:
  // Starts with course code like "CS300", "CV200", "ME200", "EC200", "EE200", etc.
  const courseSectionRegex = /(?:Course Code[:\s]+)?\b([A-Z]{2,4}\d{3}[A-Z]?)\b\s*[:\-–]?\s*([A-Za-z0-9,\-\s/()&]{2,60}?)\s*(?:(?:Theory|Practical|Lab|Laboratory|Core|DC|BS|ES|HS|OE|DE|Credits?|Credit|LTP|L\s*T\s*P|Contact hours|Overlaps with|Course Objective|Course Objectives|Course Outcomes|Pre-requisites|\d\s*-\s*\d|\d\s+\d\s+\d))/gi;

  const positions = [];
  let match;
  while ((match = courseSectionRegex.exec(cleanDoc)) !== null) {
    const code = match[1].toUpperCase().replace(/\s+/g, '');
    const name = match[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    const index = match.index;

    // Reject table of contents lines
    const snippet = cleanDoc.slice(index, index + 400);
    if (snippet.includes('. . . .') || snippet.includes('Table 1.') || snippet.includes('Total Credits') || snippet.includes('Name of the Course Type')) {
      continue;
    }

    // Must contain "Syllabus" in the following text
    const following = cleanDoc.slice(index, index + 8000);
    if (!/Syllabus/i.test(following)) {
      continue;
    }

    positions.push({ code, name, index, branch: bf.branch });
  }

  // De-duplicate positions that are adjacent (< 400 chars)
  const uniquePositions = [];
  for (const pos of positions) {
    const prev = uniquePositions[uniquePositions.length - 1];
    if (prev && prev.code === pos.code && Math.abs(pos.index - prev.index) < 600) {
      continue;
    }
    uniquePositions.push(pos);
  }

  console.log(`Branch ${bf.branch}: found ${uniquePositions.length} course headers`);

  for (let i = 0; i < uniquePositions.length; i++) {
    const curr = uniquePositions[i];
    const nextIdx = i + 1 < uniquePositions.length ? uniquePositions[i + 1].index : cleanDoc.length;
    const block = cleanDoc.slice(curr.index, Math.min(nextIdx, curr.index + 12000));

    // Extract LTP
    const ltpM = block.match(/(?:L\s*-\s*T\s*-\s*P|L\s*T\s*P|Contact hours[\s\S]*?L-T-P\)?[:\s]*)\s*([0-9]\s*[- ]\s*[0-9]\s*[- ]\s*[0-9])/i);
    const creditsM = block.match(/(?:Credits?|Credit)[:\s]*([0-9]+)/i);

    // Extract Syllabus
    // Syllabus starts with "Syllabus:" or "Syllabus"
    // Stops before "Learning Resources" / "Text Books" / "Reference Books" / "References" / "Course Assessment" / "Course Outcomes" / next course
    const sylMatch = block.match(/Syllabus:?\s*([\s\S]*?)(?:(?:Learning Resources|Reference Books\/Material|Reference Books|Text\/Reference Books|Text\s*Books|References|Course Assessment Method|Course Assessment|Evaluation Scheme|\n\s*(?:PO1|CO1|Course Code)|$))/i);

    let modules = [];
    if (sylMatch && sylMatch[1]) {
      const sylBody = sylMatch[1].trim();

      // Check if it has "Module 1", "Module 2", etc.
      const moduleParts = sylBody.split(/(?=Module\s+\d+:?|Unit\s+\d+:?)/i).filter(p => p.trim().length > 15);
      if (moduleParts.length > 1) {
        modules = moduleParts.map(p => cleanString(p));
      } else {
        // Check for "List of Experiments" or numbered experiment items
        if (/List of Experiments/i.test(sylBody)) {
          const expParts = sylBody.split(/(?=\d+[\.\)])/).filter(p => p.trim().length > 10);
          if (expParts.length > 1) {
            modules = expParts.map(p => cleanString(p));
          } else {
            modules = [cleanString(sylBody)];
          }
        } else {
          // Paragraph split
          const paras = sylBody.split(/\n\s*\n/).map(p => cleanString(p)).filter(p => p.length > 25);
          if (paras.length > 0) {
            modules = paras;
          } else {
            modules = [cleanString(sylBody)];
          }
        }
      }
    }

    // Extract Textbooks / References
    const refMatch = block.match(/(?:Learning Resources|Reference Books\/Material|Reference Books|Text\/Reference Books|Text\s*Books|References):?\s*([\s\S]*?)(?:(?:Course Outcome|Relationship of Course|CO\s*-\s*PO|Evaluation Scheme|\n\s*Course Code|\n\s*[A-Z]{2,4}\d{3}|$))/i);
    let textbooks = [];
    if (refMatch && refMatch[1]) {
      const refBody = refMatch[1].trim();
      const items = refBody.split(/\n(?=\s*\d+[\.\)])/).map(item => cleanString(item)).filter(item => item.length > 10);
      if (items.length > 0) {
        textbooks = items.filter(it => !it.toLowerCase().includes('text books:') && !it.toLowerCase().includes('reference books:'));
      } else {
        const lines = refBody.split('\n').map(l => cleanString(l)).filter(l => l.length > 15 && !l.startsWith('Module'));
        if (lines.length > 0) {
          textbooks = lines.slice(0, 6);
        }
      }
    }

    const code = curr.code;
    // Prefer the entry with richer modules
    if (!masterDb[code] || (modules.length > (masterDb[code].modules?.length || 0))) {
      masterDb[code] = {
        code,
        name: curr.name || masterDb[code]?.name,
        branch: bf.branch,
        ltp: ltpM ? ltpM[1].replace(/\s+/g, '-').replace(/--/g, '-') : masterDb[code]?.ltp,
        credits: creditsM ? parseInt(creditsM[1], 10) : masterDb[code]?.credits,
        modules: modules.length > 0 ? modules : (masterDb[code]?.modules || []),
        textbooks: textbooks.length > 0 ? textbooks : (masterDb[code]?.textbooks || []),
      };
    }
  }
}

fs.writeFileSync('downloads/master_courses_db.json', JSON.stringify(masterDb, null, 2));
console.log(`Total courses in master DB: ${Object.keys(masterDb).length}`);

// Test specific courses that were previously 0
console.log('CV200 modules:', masterDb['CV200']?.modules?.length);
console.log('EC300 modules:', masterDb['EC300']?.modules?.length);
console.log('ME300 modules:', masterDb['ME300']?.modules?.length);
console.log('CS300 modules:', masterDb['CS300']?.modules?.length);
console.log('EE300 modules:', masterDb['EE300']?.modules?.length);
