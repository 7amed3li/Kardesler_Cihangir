const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

// List of large PNG files to convert (>500KB)
const pngToConvert = [
  'hero-bg.png',
  'lahmacun-1024x691.png',
  'cig_kofte-1024x668.png',
  'cacik-1024x856.png',
  'yogurt-1024x856.png',
  'coban_salata-1024x629.png',
  'ozel_lahmacun-1024x623.png',
  'icli_kofte-1024x616.png',
  'mevsim_salata-1024x615.png',
  'sebzeli_pide-1024x697.png',
  'etli_ekmek-1024x607.png',
  'etli_konya-1024x587.png',
  'kasarli_pide-1024x425.png',
  'kasarli_sucuklu_pide-1024x594.png',
  'kavurmali_kasarli_pide-1024x586.png',
  'kavurmali_pide-1024x558.png',
  'kiymali_kasarli_pide-1024x504.png',
  'kiymali_pide-1024x504.png',
  'kasarli_yumurtali-1024x566.png',
  'peynirli_pide-1024x529.png',
  'pastirmali_pide-1024x426.png',
  'kusbasili_kasarli_pide-1024x532.png',
  'kusbasili_pide-1024x490.png',
  'tavuklu_pide-1024x763.png',
  'kasar_sucuklu_yumurtali_pide-1024x518.png',
];

async function convertImages() {
  let totalSaved = 0;

  for (const filename of pngToConvert) {
    const inputPath = path.join(imagesDir, filename);
    const outputName = filename.replace('.png', '.webp');
    const outputPath = path.join(imagesDir, outputName);

    // Skip if source doesn't exist
    if (!fs.existsSync(inputPath)) {
      console.log(`⏭️  SKIP (not found): ${filename}`);
      continue;
    }

    // Skip if webp already exists
    if (fs.existsSync(outputPath)) {
      const origSize = fs.statSync(inputPath).size;
      const webpSize = fs.statSync(outputPath).size;
      console.log(`✅ EXISTS: ${outputName} (${(origSize/1024).toFixed(0)}KB → ${(webpSize/1024).toFixed(0)}KB, saved ${((1 - webpSize/origSize)*100).toFixed(0)}%)`);
      totalSaved += origSize - webpSize;
      continue;
    }

    try {
      const origSize = fs.statSync(inputPath).size;
      
      // Special handling for hero-bg (higher quality, larger size)
      const quality = filename === 'hero-bg.png' ? 80 : 75;
      
      await sharp(inputPath)
        .webp({ quality, effort: 6 })
        .toFile(outputPath);

      const newSize = fs.statSync(outputPath).size;
      const savings = ((1 - newSize / origSize) * 100).toFixed(1);
      totalSaved += origSize - newSize;
      
      console.log(`🔄 CONVERTED: ${filename} → ${outputName} (${(origSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB, saved ${savings}%)`);
    } catch (err) {
      console.error(`❌ ERROR: ${filename}: ${err.message}`);
    }
  }

  console.log(`\n📊 Total bandwidth saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

convertImages();
