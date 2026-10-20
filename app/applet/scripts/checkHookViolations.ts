import fs from 'fs';
import path from 'path';

function getFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.resolve(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getFiles('src');
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  
  // Look for hooks inside `if (` or after early returns within a function component
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/\b(useState|useEffect|useMemo|useCallback|useRef|useContext)\s*\(/.test(line)) {
      // check if inside an `if` block or after an early return
      // let's trace backwards up to the function start
      let depth = 0;
      let insideIf = false;
      for (let j = Math.max(0, i - 30); j < i; j++) {
        if (/^\s*if\s*\(/.test(lines[j])) {
          // potential condition
        }
      }
    }
  }
}
