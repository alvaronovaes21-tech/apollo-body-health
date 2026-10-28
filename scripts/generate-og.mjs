/**
 * Gera public/og-image.jpg (1200x630) para compartilhamento (Open Graph).
 * Fonte: src/assets/images/hero/hero.(jpg|png|webp) se existir; senão a imagem provisória.
 * Uso: npm run og
 */
import { existsSync } from 'node:fs';
import sharp from 'sharp';

const candidates = [
  'src/assets/images/hero/hero.jpg',
  'src/assets/images/hero/hero.jpeg',
  'src/assets/images/hero/hero.png',
  'src/assets/images/hero/hero.webp',
  'src/assets/images/provisorias/hero-treino.jpg',
];
const source = candidates.find((p) => existsSync(p));
if (!source) throw new Error('Nenhuma imagem de origem encontrada.');

const W = 1200;
const H = 630;

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="l" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#05080d" stop-opacity="0.96"/>
      <stop offset="0.65" stop-color="#05080d" stop-opacity="0.6"/>
      <stop offset="1" stop-color="#05080d" stop-opacity="0.2"/>
    </linearGradient>
    <radialGradient id="g" cx="0.15" cy="1" r="0.8">
      <stop offset="0" stop-color="#19c3ff" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#19c3ff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#l)"/>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="72" y="230" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="30" letter-spacing="10" fill="#19c3ff">APOLLO BODY &amp; HEALTH</text>
  <text x="72" y="320" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="64" fill="#ffffff">Musculação, aulas</text>
  <text x="72" y="392" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="64" fill="#ffffff">coletivas e artes marciais</text>
  <text x="72" y="468" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="30" fill="#a3afbd">Salvador, Bahia</text>
</svg>`);

await sharp(source)
  .resize(W, H, { fit: 'cover', position: 'center' })
  .composite([{ input: overlay }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/og-image.jpg');

console.log(`og-image.jpg gerada a partir de ${source}`);
