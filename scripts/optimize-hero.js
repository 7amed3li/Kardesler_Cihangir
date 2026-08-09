const sharp = require('sharp');
const path = require('path');

async function optimizeHero() {
  const input = path.join(__dirname, '..', 'public', 'images', 'hero-bg.webp');
  const output = path.join(__dirname, '..', 'public', 'images', 'hero-bg-optimized.webp');
  
  await sharp(input)
    .resize(1920, 1080, { fit: 'cover' })
    .webp({ quality: 75, effort: 6 })
    .toFile(output);
    
  console.log('Hero image optimized!');
}

optimizeHero();
