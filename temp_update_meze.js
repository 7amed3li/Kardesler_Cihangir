const fs = require('fs');

async function updateMeze() {
  try {
    // 1. Update menuData.js
    const menuDataPath = 'src/data/menuData.js';
    let menuDataContent = fs.readFileSync(menuDataPath, 'utf8');
    
    // karisik_meze_tabagi
    const regex1 = new RegExp(`(id:\\s*['"]karisik_meze_tabagi['"],(?:.|\\n|\\r)*?)price:\\s*([0-9.]+)`, 'g');
    menuDataContent = menuDataContent.replace(regex1, (match, p1) => {
      return `${p1}price: 500`;
    });
    
    fs.writeFileSync(menuDataPath, menuDataContent, 'utf8');
    console.log('Updated price in menuData.js');

    // 2. Update menu.json
    const menuJsonPath = 'src/lib/menu.json';
    if (fs.existsSync(menuJsonPath)) {
      let menuJson = JSON.parse(fs.readFileSync(menuJsonPath, 'utf8'));
      const meze = menuJson.find(i => i.id === 'karisik_meze_tabagi');
      if (meze) {
        meze.price = 500;
        fs.writeFileSync(menuJsonPath, JSON.stringify(menuJson, null, 2), 'utf8');
        console.log('Updated price in menu.json');
      }
    }

    // 3. Update Supabase
    const env = fs.readFileSync('.env.local', 'utf8');
    const supabaseUrlMatch = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
    const supabaseKeyMatch = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/);
    
    if (supabaseUrlMatch && supabaseKeyMatch) {
      const url = supabaseUrlMatch[1].trim().replace(/['"]/g, '') + '/rest/v1/items';
      const key = supabaseKeyMatch[1].trim().replace(/['"]/g, '');
      
      const itemsToUpdate = [
        { id: "karisik_meze_tabagi", price: 500 }
      ];
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(itemsToUpdate)
      });
      
      if (!response.ok) {
        console.error('Error updating Supabase:', await response.text());
      } else {
        console.log('Successfully updated in Supabase via REST');
      }
    }
  } catch (e) {
    console.error(e);
  }
}

updateMeze();
