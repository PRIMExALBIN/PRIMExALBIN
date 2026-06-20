import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const W = 1200;
const H = 630;

// Colours
const paper = '#f7f4ed';
const ink = '#1c1c1a';
const inkSoft = '#3a3a36';
const accent = '#d23b1a';
const rule = '#e2ddcf';

// Create a blank canvas
const svgCanvas = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${paper}"/>

  <!-- Subtle grain-like dot pattern -->
  <defs>
    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.6" fill="${rule}" opacity="0.4"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#dots)" opacity="0.5"/>

  <!-- Accent vertical bar -->
  <rect x="0" y="0" width="6" height="${H}" fill="${accent}"/>

  <!-- PRIMExALBIN text -->
  <text x="60" y="210" font-family="Georgia, serif" font-size="52" font-weight="100" letter-spacing="-1" fill="${ink}">
    PRIMExALBIN
  </text>

  <!-- Tagline -->
  <text x="60" y="270" font-family="system-ui, sans-serif" font-size="20" fill="${inkSoft}">
    Albin Eby — Developer, Designer &amp; Builder
  </text>

  <!-- Decorative line -->
  <line x1="60" y1="300" x2="260" y2="300" stroke="${accent}" stroke-width="2"/>

  <!-- Project count line -->
  <text x="60" y="350" font-family="ui-monospace, monospace" font-size="13" fill="${'#75716a'}" letter-spacing="2">
    REACT · TYPESCRIPT · SVELTE · ANDROID · AI · CYBERSECURITY
  </text>

  <!-- Bottom tag -->
  <text x="60" y="550" font-family="Georgia, serif" font-size="28" font-style="italic" fill="${ink}">
    Building things worth using.
  </text>

  <!-- Decorative large glyph behind -->
  <text x="1050" y="520" font-family="Georgia, serif" font-size="180" fill="${accent}" opacity="0.08">
    ✦
  </text>
</svg>
`;

// Composite: canvas + character image
const charPath = join(root, 'public', 'hero-character.png');

try {
  const charBuf = await sharp(charPath)
    .resize({ height: 500, withoutEnlargement: true })
    .png()
    .toBuffer();

  await sharp(Buffer.from(svgCanvas))
    .resize(W, H)
    .composite([
      {
        input: charBuf,
        top: 65,
        left: 650,
        opacity: 0.85,
      },
    ])
    .png()
    .toFile(join(root, 'public', 'og-image.png'));

  console.log('✅ Created public/og-image.png (1200×630)');
} catch (err) {
  console.error('Error:', err.message);
}
