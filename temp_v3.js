const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function fixAll() {
  try {
    // 1. Rotate image 90 degrees so it becomes horizontal (landscape)
    const currentImage = path.join(__dirname, 'public/images/menu/kuzu_ciger_v2.webp');
    const newImage = path.join(__dirname, 'public/images/menu/kuzu_ciger_v3.webp');
    
    if (fs.existsSync(currentImage)) {
      await sharp(currentImage)
        .rotate(-90) // Try -90 (counter-clockwise) to make it horizontal
        .toFile(newImage);
      console.log('Successfully saved kuzu_ciger_v3.webp');
    } else {
      console.log('v2 image not found');
    }

    // 2. Update image paths in menuData.js and menu.json
    let menuData = fs.readFileSync('src/data/menuData.js', 'utf8');
    menuData = menuData.replace(/\/images\/menu\/kuzu_ciger_v2\.webp/g, '/images/menu/kuzu_ciger_v3.webp');
    
    // 3. Fix trending for karisik_meze_tabagi
    // Instead of complex regex, find the exact line and append trending
    const lines = menuData.split('\n');
    const mezeIndex = lines.findIndex(l => l.includes('"karisik_meze_tabagi"'));
    if (mezeIndex !== -1) {
      // Look forward a few lines to find where to add it
      let foundEnd = false;
      for (let i = mezeIndex; i < mezeIndex + 10; i++) {
        if (lines[i] && lines[i].includes('}')) {
          // add trending before the closing brace
          if (!menuData.substring(menuData.indexOf('"karisik_meze_tabagi"'), menuData.indexOf('}', menuData.indexOf('"karisik_meze_tabagi"'))).includes('trending')) {
             lines[i] = lines[i].replace('}', '  trending: true\n      }');
             console.log('Added trending to karisik_meze_tabagi');
          }
          foundEnd = true;
          break;
        }
      }
      menuData = lines.join('\n');
    }
    
    fs.writeFileSync('src/data/menuData.js', menuData, 'utf8');
    
    let menuJson = fs.readFileSync('src/lib/menu.json', 'utf8');
    menuJson = menuJson.replace(/\/images\/menu\/kuzu_ciger_v2\.webp/g, '/images/menu/kuzu_ciger_v3.webp');
    fs.writeFileSync('src/lib/menu.json', menuJson, 'utf8');
    
    console.log('Successfully updated everything.');
  } catch (e) {
    console.error('Error:', e);
  }
}

fixAll();
