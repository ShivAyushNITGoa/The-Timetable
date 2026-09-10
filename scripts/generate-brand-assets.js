import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Exact SVGs for The GDevelopers Icon and Logo
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="104" fill="#b0b91a" />
  <path
    d="M 256 128 C 358.4 128, 384 192, 384 256 C 384 320, 358.4 384, 256 384 C 153.6 384, 128 320, 128 256 L 192 256 C 192 288, 204.8 320, 256 320 C 307.2 320, 320 288, 320 256 C 320 224, 307.2 192, 256 192 L 256 256 L 192 256 L 192 128 L 256 128 Z"
    fill="#FFFFFF"
  />
</svg>
`;

// Logo SVG (horizontal banner)
const logoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 60" width="560" height="120">
  <rect width="280" height="60" fill="transparent" />
  <rect x="10" y="10" width="40" height="40" rx="8" fill="#b0b91a" />
  <path d="M30 20 C38 20, 40 25, 40 30 C40 35, 38 40, 30 40 C22 40, 20 35, 20 30 L25 30 C25 32.5, 26 35, 30 35 C34 35, 35 32.5, 35 30 C35 27.5, 34 25, 30 25 L30 30 L25 30 L25 20 L30 20 Z" fill="#FFFFFF" />
  <text x="60" y="36" font-family="Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="20" fill="#e0d6c8">
    <tspan fill="#b0b91a">The</tspan> GDevelopers
  </text>
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

  // 3. PWA icons in all standard sizes
  await sharp(Buffer.from(iconSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));

  await sharp(Buffer.from(iconSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));

  await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));

  await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));

  await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon.png'));

  // Maskable icon with safe zone padding (standard 10% padding for circular/squircle masks)
  const maskableSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#b0b91a" />
  <g transform="translate(51.2, 51.2) scale(0.8)">
    <path
      d="M 256 128 C 358.4 128, 384 192, 384 256 C 384 320, 358.4 384, 256 384 C 153.6 384, 128 320, 128 256 L 192 256 C 192 288, 204.8 320, 256 320 C 307.2 320, 320 288, 320 256 C 320 224, 307.2 192, 256 192 L 256 256 L 192 256 L 192 128 L 256 128 Z"
      fill="#FFFFFF"
    />
  </g>
</svg>
`;

  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));

  await sharp(Buffer.from(iconSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  await sharp(Buffer.from(iconSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'app-touch-icon.png'));

  // Favicons (16x16, 32x32, 48x48, 64x64)
  await sharp(Buffer.from(iconSvg))
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));

  await sharp(Buffer.from(iconSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  await sharp(Buffer.from(iconSvg))
    .resize(64, 64)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  await sharp(Buffer.from(iconSvg))
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));

  // 4. Save clean SVGs
  fs.writeFileSync(path.join(publicDir, 'brand-icon.svg'), iconSvg.trim());
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), iconSvg.trim());
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), iconSvg.trim());
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
