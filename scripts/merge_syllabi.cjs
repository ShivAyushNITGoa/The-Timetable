const fs = require('fs');

const fyCourses = JSON.parse(fs.readFileSync('scripts/first_year_curriculum.json', 'utf8'));
const upperCourses = JSON.parse(fs.readFileSync('scripts/upper_year_curriculum.json', 'utf8'));

const allAdditions = { ...fyCourses, ...upperCourses };

console.log('Total additions to inject:', Object.keys(allAdditions).length);

// Read current officialSyllabusRegistry.ts
let content = fs.readFileSync('src/data/officialSyllabusRegistry.ts', 'utf8');

// Ensure sourceUrl in interface
if (!content.includes('sourceUrl?: string;')) {
  content = content.replace(
    'pdfName: string;',
    'pdfName: string;\n  sourceUrl?: string;'
  );
}

// Check which keys are already present vs new
const newKeys = [];
const updatedKeys = [];

// Prepare string of entries to insert right after export const OFFICIAL_NIT_GOA_SYLLABI: Record<string, OfficialCourseSyllabus> = {
let entriesToAdd = '';

for (const [code, item] of Object.entries(allAdditions)) {
  // If key already exists in content, replace it or prepend clean version
  const keySearch = `"${code}": {`;
  if (content.includes(keySearch)) {
    updatedKeys.push(code);
    // Find matching block and replace it
    const startIdx = content.indexOf(keySearch);
    // find matching closing of object
    // Or we can just remove existing object and prepend new one
    // Let's see: better to delete the old one or just override in new registry structure
  } else {
    newKeys.push(code);
  }
}

console.log(`New keys: ${newKeys.length}, Existing keys to update: ${updatedKeys.length}`);

// We can build the new entries snippet
for (const [code, data] of Object.entries(allAdditions)) {
  // Remove existing block if present
  const regex = new RegExp(`\\s*"${code}":\\s*\\{[\\s\\S]*?\\n  \\},?`, 'g');
  content = content.replace(regex, '');

  entriesToAdd += `  "${code}": ${JSON.stringify(data, null, 4)},\n`;
}

// Now insert entriesToAdd right after "export const OFFICIAL_NIT_GOA_SYLLABI: Record<string, OfficialCourseSyllabus> = {\n"
const insertPoint = 'export const OFFICIAL_NIT_GOA_SYLLABI: Record<string, OfficialCourseSyllabus> = {\n';
if (content.includes(insertPoint)) {
  content = content.replace(insertPoint, insertPoint + entriesToAdd);
} else {
  console.error('Could not find insert point!');
  process.exit(1);
}

// Enhance getOfficialCourseSyllabus function
const newGetFunction = `export function getOfficialCourseSyllabus(courseCode: string): OfficialCourseSyllabus | null {
  if (!courseCode) return null;
  const clean = courseCode.trim().toUpperCase().replace(/\\s+/g, '');
  
  if (OFFICIAL_NIT_GOA_SYLLABI[clean]) {
    return OFFICIAL_NIT_GOA_SYLLABI[clean];
  }

  // Handle Minor course codes ending in M (e.g. CS300M -> CS300M or CS300)
  if (clean.endsWith('M')) {
    const baseWithoutM = clean.slice(0, -1);
    if (OFFICIAL_NIT_GOA_SYLLABI[baseWithoutM]) {
      return OFFICIAL_NIT_GOA_SYLLABI[baseWithoutM];
    }
  }

  // Handle Elective Aliases
  const ELECTIVE_ALIASES: Record<string, string> = {
    'CS815': 'CS505', // Data Warehousing and Data Mining
    'CS814': 'CS511', // Optimization Techniques
    'ME540': 'ME516', // Industrial Robotics & Automation
    'ME545': 'ME530', // Gas Dynamics & Jet Propulsion
    'CE355': 'CV355', // Environmental Quality Testing Lab
    'HS300': 'HS350', // Industrial Economics / Humanities
    'HS350': 'HS300'
  };

  if (ELECTIVE_ALIASES[clean] && OFFICIAL_NIT_GOA_SYLLABI[ELECTIVE_ALIASES[clean]]) {
    return OFFICIAL_NIT_GOA_SYLLABI[ELECTIVE_ALIASES[clean]];
  }
  
  // Try CE -> CV alias (Civil Engineering)
  if (clean.startsWith('CE')) {
    const cvCode = 'CV' + clean.slice(2);
    if (OFFICIAL_NIT_GOA_SYLLABI[cvCode]) {
      return OFFICIAL_NIT_GOA_SYLLABI[cvCode];
    }
  }
  
  // Try CV -> CE alias
  if (clean.startsWith('CV')) {
    const ceCode = 'CE' + clean.slice(2);
    if (OFFICIAL_NIT_GOA_SYLLABI[ceCode]) {
      return OFFICIAL_NIT_GOA_SYLLABI[ceCode];
    }
  }

  // Try ME -> MCE alias
  if (clean.startsWith('MCE')) {
    const meCode = 'ME' + clean.slice(3);
    if (OFFICIAL_NIT_GOA_SYLLABI[meCode]) {
      return OFFICIAL_NIT_GOA_SYLLABI[meCode];
    }
  }

  if (clean.startsWith('ME')) {
    const mceCode = 'MCE' + clean.slice(2);
    if (OFFICIAL_NIT_GOA_SYLLABI[mceCode]) {
      return OFFICIAL_NIT_GOA_SYLLABI[mceCode];
    }
  }
  
  return null;
}
`;

// Replace old getOfficialCourseSyllabus function
const fnStart = content.indexOf('export function getOfficialCourseSyllabus');
if (fnStart !== -1) {
  content = content.slice(0, fnStart) + newGetFunction;
}

fs.writeFileSync('src/data/officialSyllabusRegistry.ts', content, 'utf8');
console.log('Successfully updated src/data/officialSyllabusRegistry.ts with all official 1st year and 2nd-4th year courses!');
