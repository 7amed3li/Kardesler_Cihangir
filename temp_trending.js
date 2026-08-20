const fs = require('fs');

function setTrending() {
  try {
    let menuData = fs.readFileSync('src/data/menuData.js', 'utf8');
    
    // karisik_meze_tabagi
    const regex1 = /(id:\s*['"]karisik_meze_tabagi['"][\s\S]*?price:\s*[0-9.]+[^}]*)(})/g;
    
    // Check if it already has trending
    if (!menuData.match(/(id:\s*['"]karisik_meze_tabagi['"][\s\S]*?trending:\s*true)/)) {
      menuData = menuData.replace(regex1, (match, p1, p2) => {
        // Insert trending before the closing brace
        return `${p1.trimEnd()},\n        trending: true\n      }`;
      });
      fs.writeFileSync('src/data/menuData.js', menuData, 'utf8');
      console.log('Set trending to true for karisik_meze_tabagi in menuData.js');
    }
  } catch (e) {
    console.error(e);
  }
}

setTrending();
