const fs = require('fs');
const path = require('path');

async function fix() {
  const imagePath = path.join(__dirname, 'public/images/menu/kuzu_ciger.webp');
  const tempPath = path.join(__dirname, 'public/images/menu/kuzu_ciger_temp.webp');
  
  try {
    fs.unlinkSync(imagePath);
    fs.renameSync(tempPath, imagePath);
    console.log('Successfully fixed.');
  } catch (e) {
    console.error('Error:', e);
  }
}

fix();
