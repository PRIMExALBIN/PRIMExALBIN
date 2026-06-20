import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const charPath = join(root, 'public', 'hero-character.png');
const outDir = join(root, 'public');

// Crop face area from the 1440x1440 hero character
// Take top-center portion (face/head)
const crop = await sharp(charPath)
  .extract({ left: 360, top: 80, width: 720, height: 720 })
  .png()
  .toBuffer();

// Generate multiple sizes
const sizes = [
  { size: 16, name: 'favicon-16.png' },
  { size: 32, name: 'favicon-32.png' },
  { size: 48, name: 'favicon-48.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
];

for (const { size, name } of sizes) {
  await sharp(crop)
    .resize(size, size, { fit: 'cover' })
    .png()
    .toFile(join(outDir, name));
  console.log(`✅ ${name} (${size}×${size})`);
}

console.log('\nDone — favicons generated');
