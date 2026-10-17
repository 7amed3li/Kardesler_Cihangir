/**
 * Script to process new kebab images:
 * - Flatten on white background
 * - Resize (max 1200px width)
 * - Convert to WebP with quality 82
 * - Save to public/images/
 */

import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const images = [
  {
    src: resolve(root, 'IMG_5164.JPG.jpeg'),
    dest: resolve(root, 'public/images/adana_kuzu_sis_kebap.webp'),
    label: 'Adana + Kuzu Şiş → adana_kuzu_sis_kebap.webp',
  },
  {
    src: resolve(root, 'IMG_5165.JPG.jpeg'),
    dest: resolve(root, 'public/images/kuzu_tavuk_sis_kebap.webp'),
    label: 'Kuzu + Tavuk Şiş → kuzu_tavuk_sis_kebap.webp',
  },
  {
    src: resolve(root, 'IMG_5172.JPG.jpeg'),
    dest: resolve(root, 'public/images/adana_tavuk_sis_kebap.webp'),
    label: 'Adana + Tavuk Şiş → adana_tavuk_sis_kebap.webp',
  },
];

async function processImage({ src, dest, label }) {
  console.log(`\n▶ Processing: ${label}`);

  const meta = await sharp(src).metadata();
  console.log(`  Original: ${meta.width}x${meta.height} ${meta.format} (${Math.round(meta.size / 1024)} KB)`);

  await sharp(src)
    // Flatten transparent areas onto white background
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    // Resize to max 1200px wide, keep aspect ratio
    .resize({ width: 1200, withoutEnlargement: true })
    // Convert to WebP with quality 82 (matches existing images quality)
    .webp({ quality: 82, effort: 6 })
    .toFile(dest);

  const { size } = await sharp(dest).metadata();
  const fs = await import('fs');
  const stats = fs.statSync(dest);
  console.log(`  ✓ Saved: ${dest.split('\\').pop()} (${Math.round(stats.size / 1024)} KB)`);
}

(async () => {
  console.log('=== Processing New Kebab Images ===');
  for (const img of images) {
    try {
      await processImage(img);
    } catch (err) {
      console.error(`  ✗ Error processing ${img.label}:`, err.message);
    }
  }
  console.log('\n✅ Done! All images processed.');
})();
