const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public/images');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')) {
    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    const webpName = `${basename}.webp`;
    const webpPath = path.join(dir, webpName);

    if (!fs.existsSync(webpPath)) {
      console.log(`Converting ${file} to ${webpName}...`);
      sharp(path.join(dir, file))
        .webp({ quality: 80 })
        .toFile(webpPath)
        .then(() => console.log(`Success: ${webpName}`))
        .catch(err => console.error(`Failed to convert ${file}:`, err));
    }
  }
});
