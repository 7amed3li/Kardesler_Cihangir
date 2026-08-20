const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function rotateImage() {
  const imagePath = path.join(__dirname, 'public/images/menu/kuzu_ciger.webp');
  const tempPath = path.join(__dirname, 'public/images/menu/kuzu_ciger_temp.webp');
  
  try {
    await sharp(imagePath)
      .rotate(90) // rotate 90 degrees clockwise
      .toFile(tempPath);
      
    // Overwrite the original with the rotated one
    fs.renameSync(tempPath, imagePath);
    console.log('Successfully rotated image by 90 degrees.');
  } catch (e) {
    console.error('Error rotating image:', e);
  }
}

rotateImage();
