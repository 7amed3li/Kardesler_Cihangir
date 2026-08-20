const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processImage() {
  const inputPath = path.join(__dirname, 'public/images/kuzu_ciger.jpeg');
  const outputPath = path.join(__dirname, 'public/images/menu/kuzu_ciger.webp');
  
  if (!fs.existsSync(inputPath)) {
    console.error('Input file not found:', inputPath);
    return;
  }
  
  // Create output dir if it doesn't exist
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    await sharp(inputPath)
      .resize(800, 600, {
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
      })
      .webp({ quality: 80 })
      .toFile(outputPath);
      
    console.log('Successfully converted image to WebP:', outputPath);
    
    // delete the original to keep it clean
    fs.unlinkSync(inputPath);
    console.log('Deleted original jpeg');
  } catch (e) {
    console.error('Error processing image:', e);
  }
}

processImage();
