import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Exact SVGs for The GDevelopers Icon and Logo
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="#9EB81E" />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    fill="#FFFFFF"
    d="
      M 82 256
      C 82 352.1 159.9 430 256 430
      C 352.1 430 430 352.1 430 256
      C 430 159.9 352.1 82 256 82
      L 169 82
      L 169 256
      L 82 256
      Z
      M 256 169
      C 304.05 169 343 207.95 343 256
      C 343 304.05 304.05 343 256 343
      L 256 169
      Z
    "
  />
</svg>
`;

// Logo SVG (horizontal banner)
const logoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 100" width="1040" height="200">
  <rect width="520" height="100" fill="transparent" />
  <g transform="translate(10, 10)">
    <rect width="80" height="80" rx="18" fill="#9EB81E" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      fill="#FFFFFF"
      d="
        M 12.8 40
        C 12.8 55.02 24.98 67.2 40 67.2
        C 55.02 67.2 67.2 55.02 67.2 40
        C 67.2 24.98 55.02 12.8 40 12.8
        L 26.4 12.8
        L 26.4 40
        L 12.8 40
        Z
        M 40 26.4
        C 47.51 26.4 53.6 32.49 53.6 40
        C 53.6 47.51 47.51 53.6 40 53.6
        L 40 26.4
        Z
      "
    />
  </g>
  <text x="110" y="66" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="52" fill="#9EB81E">The</text>
  <text x="215" y="66" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="52" fill="#E2DDD0">GDevelopers</text>
</svg>
`;

async function build() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. G icon.png & g-icon.png
  await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'g-icon.png'));

  await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'G icon.png'));

  // 2. logo.png
  await sharp(Buffer.from(logoSvg))
    .resize(920, 200)
    .png()
    .toFile(path.join(publicDir, 'logo.png'));

  // 3. PWA icons
  await sharp(Buffer.from(iconSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));

  await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));

  await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));

  await sharp(Buffer.from(iconSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // Favicon (48x48)
  await sharp(Buffer.from(iconSvg))
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));

  // 4. Save clean SVGs
  fs.writeFileSync(path.join(publicDir, 'brand-icon.svg'), iconSvg.trim());
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), iconSvg.trim());
  fs.writeFileSync(path.join(publicDir, 'G icon.svg'), iconSvg.trim());
  fs.writeFileSync(path.join(publicDir, 'g-icon.svg'), iconSvg.trim());
  fs.writeFileSync(path.join(publicDir, 'brand-logo.svg'), logoSvg.trim());

  // 5. Sync to src/assets/images
  const srcAssetsDir = path.resolve('src', 'assets', 'images');
  if (!fs.existsSync(srcAssetsDir)) {
    fs.mkdirSync(srcAssetsDir, { recursive: true });
  }
  fs.copyFileSync(path.join(publicDir, 'g-icon.png'), path.join(srcAssetsDir, 'g-icon.png'));
  fs.copyFileSync(path.join(publicDir, 'G icon.png'), path.join(srcAssetsDir, 'G icon.png'));
  fs.copyFileSync(path.join(publicDir, 'logo.png'), path.join(srcAssetsDir, 'logo.png'));
  fs.copyFileSync(path.join(publicDir, 'brand-icon.svg'), path.join(srcAssetsDir, 'brand-icon.svg'));
  fs.copyFileSync(path.join(publicDir, 'G icon.svg'), path.join(srcAssetsDir, 'G icon.svg'));
  fs.copyFileSync(path.join(publicDir, 'brand-logo.svg'), path.join(srcAssetsDir, 'brand-logo.svg'));

  console.log('Successfully generated and synced all brand png & svg assets');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
