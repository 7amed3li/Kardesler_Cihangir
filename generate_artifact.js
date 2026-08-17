const fs = require('fs');

const path = 'c:/Users/Hp/kardeshler/src/i18n/breakfastTranslations.js';
const content = fs.readFileSync(path, 'utf8');

// We can evaluate the file to get the object, but it has `export default`.
// Let's just remove the export default and eval it.
let scriptContent = content.replace('export default breakfastTranslations;', 'module.exports = breakfastTranslations;');
fs.writeFileSync('c:/Users/Hp/kardeshler/temp_translations.js', scriptContent, 'utf8');

const translations = require('c:/Users/Hp/kardeshler/temp_translations.js');

const languageNames = {
  en: "English",
  tr: "Turkish — Türkçe",
  ar: "Arabic — العربية",
  ru: "Russian — Русский",
  fa: "Persian — فارسی",
  fr: "French — Français",
  de: "German — Deutsch",
  it: "Italian — Italiano",
  es: "Spanish — Español",
  zh: "Chinese Simplified — 中文"
};

let md = `# Turkish Breakfast Landing Page Content\n\n`;

for (const [langCode, t] of Object.entries(translations)) {
  const langName = languageNames[langCode] || langCode;
  
  md += `## ${langName}\n\n`;
  md += `| Section | Content |\n`;
  md += `|---------|---------|\n`;
  md += `| **SEO Title** | ${t.metaTitle} |\n`;
  md += `| **Meta Description** | ${t.metaDescription} |\n`;
  md += `| **H1** | ${t.h1} |\n`;
  md += `| **Hero Text** | **Subtitle:** ${t.heroSubtitle}<br><br>${t.heroDescription} |\n`;
  md += `| **Menu Copy (Serpme)** | **${t.serpmeTitle}:** ${t.serpmeDesc} (${t.forTwoPeople}) |\n`;
  md += `| **Location Copy** | **${t.addressTitle}**<br>${t.fullAddress}<br><br>**${t.nearbyTitle}**<br>${t.nearbyText} |\n`;
  
  // Format FAQ
  let faqStr = "";
  if (t.faq && t.faq.length > 0) {
    t.faq.forEach((f, idx) => {
      faqStr += `**Q:** ${f.q}<br>**A:** ${f.a}<br><br>`;
    });
  }
  md += `| **FAQ** | ${faqStr} |\n`;
  
  // Format CTAs
  const ctas = [
    `WhatsApp: ${t.ctaWhatsApp}`,
    `Call: ${t.ctaCall}`,
    `Directions: ${t.ctaBookNow}`,
    `Menu: ${t.ctaViewMenu}`,
    `View Full Menu: ${t.menuLinkText}`,
    `Contact Us: ${t.contactLinkText}`,
    `Maps: ${t.mapsLinkText}`
  ].join("<br>");
  
  md += `| **CTA Buttons** | ${ctas} |\n`;
  md += `| **Image Alt Text** | ${t.heroImageAlt} |\n`;
  md += `| **Open Graph** | Same as SEO Title / Meta Description |\n`;
  md += `\n<br>\n\n`;
}

// Write the artifact
fs.writeFileSync('C:/Users/Hp/.gemini/antigravity-ide/brain/f9dc92b5-ef8d-4876-a6df-888c9f918e60/breakfast_content_tables.md', md, 'utf8');
fs.unlinkSync('c:/Users/Hp/kardeshler/temp_translations.js');
console.log("Artifact generated.");
