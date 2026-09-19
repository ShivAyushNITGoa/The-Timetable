import fs from 'fs';
import path from 'path';
import https from 'https';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const pdfs = [
  { branch: 'EEE', url: 'https://nitgoa.ac.in/uploads/EEE2025.pdf', filename: 'EEE2025.pdf' },
  { branch: 'ECE', url: 'https://nitgoa.ac.in/uploads/ECE2025.pdf', filename: 'ECE2025.pdf' },
  { branch: 'CSE', url: 'https://nitgoa.ac.in/uploads/CSE2025.pdf', filename: 'CSE2025.pdf' },
  { branch: 'MCE', url: 'https://nitgoa.ac.in/uploads/Mechanical2025.pdf', filename: 'MCE2025.pdf' },
  { branch: 'CVE', url: 'https://nitgoa.ac.in/uploads/CVE2025.pdf', filename: 'CVE2025.pdf' },
];

const downloadsDir = path.resolve('downloads');
const publicSyllabiDir = path.resolve('public/syllabi');
if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });
if (!fs.existsSync(publicSyllabiDir)) fs.mkdirSync(publicSyllabiDir, { recursive: true });

function downloadPdf(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`Already downloaded ${dest} (${fs.statSync(dest).size} bytes)`);
      return resolve(dest);
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadPdf(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of pdfs) {
    const dest = path.join(downloadsDir, item.filename);
    console.log(`Downloading ${item.branch} from ${item.url}...`);
    try {
      await downloadPdf(item.url, dest);
      const publicDest = path.join(publicSyllabiDir, item.filename);
      fs.copyFileSync(dest, publicDest);
      console.log(`Copied ${item.filename} to ${publicDest}`);

      console.log(`Parsing text for ${item.branch}...`);
      const dataBuffer = fs.readFileSync(dest);
      const parser = new PDFParse({ data: dataBuffer });
      const parsed = await parser.getText();
      const text = typeof parsed === 'string' ? parsed : (parsed?.text || '');
      console.log(`${item.branch} Parsed Pages: ${parsed?.total || 'N/A'}, Text Length: ${text.length}`);
      fs.writeFileSync(path.join(downloadsDir, `${item.branch}_text.txt`), text);
    } catch (e) {
      console.error(`Error with ${item.branch}:`, e);
    }
  }
}

run();
