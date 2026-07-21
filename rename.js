const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/images');

const renames = {
  '34-Special-Mardin-Kebap-1019x1024.webp': 'mardin_menu.webp',
  '35-Special-Tavuk-Kanat-1019x1024.webp': 'tavuk_kanat_menu.webp',
  '36-Special-Kuzu-Ciger-1019x1024.webp': 'kuzu_ciger_menu.webp',
  '37-Special-Kuzu-Sis-Kebap-1019x1024.webp': 'kuzu_sis_menu.webp',
  '38-Mezeli-Adana.webp': 'mezeli_adana.webp',
  '39-Mezeli-Dana-Cop-Sis.webp': 'mezeli_cop_sis.webp',
  '40-Mezeli-Kuzu-Pirzola.webp': 'mezeli_pirzola.webp',
  '41-Mezeli-Kuzu-Lokum.webp': 'mezeli_lokum.webp',
  '42-Mezeli-Inegol-Kofte.webp': 'mezeli_kofte.webp',
  '43-Mezeli-Kuzu-Sis.webp': 'mezeli_kuzu_sis.webp',
  '44-Mezeli-Dana-Bonfile.webp': 'mezeli_bonfile.webp',
  '45-Mezeli-Durum.webp': 'mezeli_durum.webp',
  '46-Mezeli-Tavuk-Kanat.webp': 'mezeli_tavuk_kanat.webp',
  '47-Mezeli-Tavuk-Sis.webp': 'mezeli_tavuk_sis.webp',
  '48-Karisik-Meze-Tabagi.webp': 'karisik_meze.webp',
  '82-Kunefe.webp': 'kunefe.webp'
};

for (const [oldName, newName] of Object.entries(renames)) {
  const oldPath = path.join(dir, oldName);
  const newPath = path.join(dir, newName);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${oldName} -> ${newName}`);
  } else {
    console.log(`File not found: ${oldName}`);
  }
}
