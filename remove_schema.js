const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'src', 'app');
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, fileList);
    } else if (file === 'page.js') {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const pageFiles = findFiles(appDir);

pageFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('DeepMenuSchema')) {
    // Remove the import
    content = content.replace(/import DeepMenuSchema from ['"]@\/components\/DeepMenuSchema['"];?\n?/g, '');
    // Remove the component usage
    content = content.replace(/<DeepMenuSchema[^>]*\/>\n?/g, '');
    
    fs.writeFileSync(file, content);
    console.log(`Updated: ${file}`);
  }
});
