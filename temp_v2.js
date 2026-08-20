const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function fixImage() {
  const currentImage = path.join(__dirname, 'public/images/menu/kuzu_ciger.webp');
  const newImage = path.join(__dirname, 'public/images/menu/kuzu_ciger_v2.webp');
  
  try {
    // We rotate by 180 degrees relative to its current state.
    // If it was already rotated +90 from original, now it'll be +270 (which is -90 from original).
    await sharp(currentImage)
      .rotate(180)
      .toFile(newImage);
      
    console.log('Successfully saved kuzu_ciger_v2.webp');
    
    // Now update menuData.js
    let menuData = fs.readFileSync('src/data/menuData.js', 'utf8');
    menuData = menuData.replace(/\/images\/menu\/kuzu_ciger\.webp/g, '/images/menu/kuzu_ciger_v2.webp');
    fs.writeFileSync('src/data/menuData.js', menuData, 'utf8');
    
    // update menu.json
    let menuJson = fs.readFileSync('src/lib/menu.json', 'utf8');
    menuJson = menuJson.replace(/\/images\/menu\/kuzu_ciger\.webp/g, '/images/menu/kuzu_ciger_v2.webp');
    fs.writeFileSync('src/lib/menu.json', menuJson, 'utf8');
    
    console.log('Successfully updated references.');
  } catch (e) {
    console.error('Error:', e);
  }
}

fixImage();
