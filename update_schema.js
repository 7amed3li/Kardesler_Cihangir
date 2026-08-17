const fs = require('fs');
const path = require('path');

const locales = ['tr', 'ru', 'fa', 'fr'];
const baseDir = 'c:/Users/Hp/kardeshler/src/app';

locales.forEach(locale => {
  const filePath = path.join(baseDir, locale, 'best-kebab-taksim/page.js');
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${locale}, file not found.`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already injected
  if (content.includes('restaurantSchema')) {
    console.log(`Schema already exists in ${locale}`);
    return;
  }

  // 1. Define the localized schema object
  // Find the end of faqSchema object
  const faqSchemaRegex = /(const\s+faqSchema[a-zA-Z]*\s*=\s*\{[\s\S]*?\]\s*,\s*\};\s*)/;
  
  const schemaStr = `\nconst restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Kardeşler Kebap & Breakfast",
  description: "Authentic Wood-Fired Kebab Near Taksim Square (Since 1998) | Kardeşler Cihangir",
  url: "https://kardeslercihangir.com/${locale}/best-kebab-taksim",
  telephone: "+902122513696",
  image: "https://kardeslercihangir.com/images/hero-bg.webp",
  servesCuisine: ["Turkish", "Kebab", "Mediterranean", "Pide", "Lahmacun"],
  priceRange: "₺₺",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Defterdar Yokuşu No:1/A, Firuzağa Mah.",
    addressLocality: "Cihangir, Beyoğlu",
    addressRegion: "İstanbul",
    postalCode: "34425",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0310944,
    longitude: 28.9824818,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "02:00",
    },
  ],
};\n`;

  content = content.replace(faqSchemaRegex, `$1${schemaStr}`);

  // 2. Inject the script tag
  // Find the script tag for faqSchema
  const faqScriptRegex = /(<script\s+type="application\/ld\+json"\s+dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(faqSchema[a-zA-Z]*\)\s*\}\}\s*\/>)/;
  
  const scriptStr = `\n      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />`;

  content = content.replace(faqScriptRegex, `$1${scriptStr}`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully injected restaurantSchema into ${locale}`);
});
