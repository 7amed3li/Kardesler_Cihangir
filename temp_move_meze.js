const fs = require('fs');

function moveItem() {
  try {
    // 1. Update menuData.js
    let menuData = fs.readFileSync('src/data/menuData.js', 'utf8');
    
    // Find where the item is right now
    const itemRegex = /(\s*\{\s*id:\s*['"]karisik_meze_tabagi['"][\s\S]*?\},?)/;
    const match = menuData.match(itemRegex);
    
    if (match) {
      let itemBlock = match[0];
      
      // Remove it from its current position
      menuData = menuData.replace(itemRegex, '');
      
      // Find meze category
      const mezeRegex = /(id:\s*['"]meze['"],[\s\S]*?items:\s*\[)([\s\S]*?)(\n\s*\])/;
      const mezeMatch = menuData.match(mezeRegex);
      
      if (mezeMatch) {
        // Append it to meze items
        const before = mezeMatch[1];
        const itemsList = mezeMatch[2];
        const after = mezeMatch[3];
        
        const cleanItemBlock = itemBlock.trim().replace(/,$/, '') + ',';
        const newItemsList = itemsList + (itemsList.trim() === '' || itemsList.trim().endsWith(',') ? '' : ',') + '\n      ' + cleanItemBlock;
        
        menuData = menuData.replace(mezeRegex, before + newItemsList + after);
        fs.writeFileSync('src/data/menuData.js', menuData, 'utf8');
        console.log('Moved item in menuData.js');
      } else {
        console.log('Could not find meze category in menuData.js');
      }
    } else {
      console.log('Item not found in menuData.js');
    }

    // 2. Update menu.json
    const menuJsonPath = 'src/lib/menu.json';
    if (fs.existsSync(menuJsonPath)) {
      let menuJson = JSON.parse(fs.readFileSync(menuJsonPath, 'utf8'));
      const meze = menuJson.find(i => i.id === 'karisik_meze_tabagi');
      if (meze) {
        meze.category = {
          tr: "Meze",
          en: "Appetizers",
          ar: "مقبلات"
        };
        fs.writeFileSync(menuJsonPath, JSON.stringify(menuJson, null, 2), 'utf8');
        console.log('Updated category in menu.json');
      }
    }
  } catch (e) {
    console.error(e);
  }
}

moveItem();
