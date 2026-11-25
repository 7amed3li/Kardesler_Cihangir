/************************************************************
 * Kardeşler Kebap — Google Ads BUILD script (FINAL, per FINAL-ADS-PLAN.md)
 * Account: 135-039-4545 (₺, GMT+3)
 *
 * Builds ALL SIX Search campaigns (KBS-G2, KBS-G3 × TR/EN/AR),
 * ALL PAUSED: campaigns, ad groups, 176 keywords (plan match
 * types), 3 RSAs per ad group (plan copy verbatim), shared
 * negative list KBS-NEG-SHARED + G2/G3-specific campaign negatives,
 * call asset, sitelinks, callouts, structured snippets, 5 km Presence
 * geo on the Cihangir pin, ad scheduling 09:00–02:00 on all campaigns.
 *
 * BREAKFAST: CANCELLED from paid search (owner decision 2026-11-25).
 * A split-off breakfast campaign at ₺100/day was judged too small to
 * produce anything, so this build has NO breakfast campaigns, ad
 * groups, keywords or ads. Breakfast stays organic only (Business
 * Profile + posts). The preserved breakfast copy lives in the
 * appendix of FINAL-ADS-PLAN.md, NOT in this script.
 *
 * SAFETY:
 *  - Set CONFIG.AUTHORIZED = true to actually build. While false, the
 *    script only LOGS what it would create (dry run). Always run Preview
 *    first, read the log, then authorize (plan §9: the Authorization step
 *    on first run is mandatory — skipping it is the most common silent
 *    failure).
 *  - Idempotent: everything is checked by name before creation, so a
 *    re-run (e.g. after the 30-minute limit cut a run) continues safely
 *    without duplicates. Script changes are NOT undoable; a run killed
 *    at 30 min keeps its partial changes — re-running is the fix.
 *  - NO campaign language is set (Google removed the setting, Sep 2026).
 *  - NO PMax / YouTube / Demand Gen. NO bidding changes beyond setting
 *    Maximize Conversions at creation. NOTHING is ever enabled.
 *  - çiğ köfte is a NEGATIVE only (owner decision) — never a keyword.
 *
 * MANUAL STEPS the script cannot do (plan §9/§12):
 *  - Link the Google Business Profile as the LOCATION ASSET in the UI
 *    and confirm its status is "Approved" (~24h sync) before spending.
 *  - Verify "Call reporting: OFF" stays off (account setting; Turkey has
 *    no Google forwarding numbers, so the real number is always shown).
 *  - Verify Location options = "Presence: People in or regularly in your
 *    targeted locations" on every campaign after the build.
 *  - Add ≥4 IMAGE assets per campaign from the GBP photo library
 *    (image assets are not creatable via this script API).
 *  - Business name + logo assets at account level.
 *  - Observation audience segments (In-Market: Restaurants, site
 *    visitors) — add in the UI; audience-by-name lookup is not reliable
 *    from scripts, so it is intentionally not attempted here.
 *
 * API PATCH (2026-11-25): AdsApp.newCampaignBuilder() does not exist in
 * Google Ads Scripts (production crash: "AdsApp.newCampaignBuilder is
 * not a function"). Campaigns + budgets are now created with the
 * documented AdsApp.mutateAll() generic-mutate operations (budget +
 * Search campaign in one atomic request, temporary IDs -1/-2), and the
 * campaign is then read back through the AdsApp.campaigns() selector.
 * Every other call was audited against the current scripts reference
 * and aligned where the documented API differs: phone-number/snippet
 * extension names, quoted match-type syntax for keywords and negative
 * keywords, RSA withPath1/withPath2, add* operations executed via
 * getResult() (they have no .build()), and
 * campaign.addNegativeKeywordList() instead of list.applyToCampaign().
 ************************************************************/

var CONFIG = {
  AUTHORIZED: false, // <-- set to true ONLY after a Preview dry run
  LANGUAGES_TO_BUILD: ['TR', 'EN', 'AR'], // chunk control for the 30-min limit
  SITE: 'https://www.kardeslercihangir.com',
  PHONE_DISPLAY: '(0212) 251 36 96',
  PHONE_ASSET: '0212 251 36 96',
  PHONE_COUNTRY: 'TR',
  PIN_LAT: 41.0311,
  PIN_LNG: 28.9825,
  RADIUS_KM: 5,
  // === FAMILY BUDGETS ===
  // G2 family: ₺400/day TOTAL. G3 family: ₺300/day TOTAL. Phase 1
  // runs TR only at the full family budget (G2-TR ₺400, G3-TR ₺300).
  // EN/AR entries are the phase-3 equal-split placeholders (G2
  // ₺133.33 per language, G3 ₺100 per language) — RE-BALANCE inside
  // the same family totals before enabling each phase; never raise
  // a family total.
  BUDGETS: {
    'KBS-G2-TR': 400, 'KBS-G3-TR': 300,
    'KBS-G2-EN': 133.33, 'KBS-G3-EN': 100,
    'KBS-G2-AR': 133.33, 'KBS-G3-AR': 100
  },
  NEG_LIST_NAME: 'KBS-NEG-SHARED',
  MAX_RUNTIME_MS: 25 * 60 * 1000 // stop cleanly before the 30-min kill
};

/* ============================ NEGATIVES ============================ */
/* KBS-NEG-SHARED — plan §6, ALL Phrase match, applied to all 6 campaigns.
 * (Negatives do not expand to close variants; singular/plural/synonyms
 * are listed explicitly, exactly as the plan specifies.) */
var NEG_SHARED = [
  // TR — jobs
  'iş ilanları','iş ilanı','kariyer','eleman aranıyor','personel alımı','iş başvurusu',
  // TR — recipes / homemade
  'tarif','tarifi','nasıl yapılır','evde yapımı','ev yapımı',
  // TR — free / files
  'ücretsiz','bedava','menü pdf','pdf menü',
  // TR — cheapest abuse
  'en ucuz','çok ucuz','ucuzcu',
  // TR — dishes we do not pay clicks for (çiğ köfte IS sold — owner ads decision)
  'döner','şavurma','çiğ köfte','tantuni','sushi','suşi','pizza',
  // TR — franchise / wholesale
  'franchise','bayilik','toptan','toptan satış',
  // TR — Beşiktaş breakfast street
  'kahvaltıcılar sokağı',
  // EN — jobs
  'jobs','careers','hiring','job application','employment','vacancies',
  // EN — recipes / homemade
  'recipe','recipes','how to make','homemade','diy',
  // EN — free / files
  'free','for free','menu pdf','pdf menu',
  // EN — cheapest abuse
  'cheapest','very cheap','dirt cheap',
  // EN — dishes we do not pay clicks for ('tantuni','sushi','pizza' already listed in the TR block above — same words)
  'doner','shawarma','shawerma','cig kofte',
  // EN — franchise / wholesale
  'wholesale','dealership',
  // EN — Beşiktaş breakfast street
  'breakfast street besiktas',
  // AR — jobs
  'وظائف','توظيف','فرص عمل','طلب توظيف','شواغر','تعيين موظفين',
  // AR — recipes / homemade
  'وصفة','وصفات','طريقة عمل','طريقة تحضير','كيف يصنع','صنع منزلي',
  // AR — free / files
  'مجاني','مجانا','ببلاش','منيو pdf','قائمة pdf',
  // AR — cheapest abuse
  'أرخص','رخيص جدا','الأرخص',
  // AR — dishes we do not pay clicks for
  'دونر','شاورما','شاورمه','تشي كفته','طانطوني','سوشي','بيتزا',
  // AR — franchise / wholesale
  'امتياز تجاري','فرنشايز','جملة','بيع بالجملة',
  // AR — Beşiktaş breakfast street
  'شارع الفطور بشيكتاش',
  // Competitors (Latin spellings, all languages — plan §6; never in ad copy)
  'zübeyir ocakbaşı','dürümzade','van kahvaltı evi','lades menemen','namlı gurme',
  'antiochia','yiğit sofram','doğacıyız','karadeniz döner','peynir ekmek',
  'pişi breakfast','limos kahvaltı','tarihi sultanahmet köftecisi','şehzade cağ kebap',
  'güvenç konyalı','hamdi restaurant','pandeli','çeşme bazlama','tatbak','hünkar'
];
/* 'franchise' appears once above (TR block) — it is the same word in EN. */

/* Arabic competitor transliterations — added at campaign level to AR
 * campaigns only (plan §6). */
var NEG_COMPETITORS_AR = [
  'زوبير أوجاكباشي','دوروم زاده','فان قهوالتي','لادس منمن','ناملي غورميه','أنطيوخيا',
  'كارادينيز دونر','شمشة بازلاما','حمدي','باندلي','تاتباك','هونكار',
  'سلطان أحمد كفتجيسي','شهزاده جاغ كباب','غوفنش كونيالي','بيشي','بيينير إكمك'
];

/* Campaign-family-specific negatives (plan §6), Phrase, per campaign language. */
var NEG_G3_ONLY = { // reservation intent — reservations are never advertised
  TR: ['rezervasyon','masa ayırt','yer ayırt'],
  EN: ['reservation','book a table','table booking'],
  AR: ['حجز','حجز طاولة','احجز طاولة']
};
var NEG_G2_ONLY = { // pure order intent — G3 catches it, families must not compete
  TR: ['sipariş ver','online sipariş','paket servis','eve servis'],
  EN: ['order online','delivery','takeaway delivery'],
  AR: ['اطلب اون لاين','توصيل','طلب توصيل']
};

/* ============================ KEYWORDS ============================ */
/* Plan §4 verbatim (breakfast lists excluded — they live in the plan
 * appendix since the 2026-11-25 cancellation). 'E' = Exact, 'P' =
 * Phrase. No Broad at launch.
 * Totals: TR 71 + EN 56 + AR 49 = 176. */
var KEYWORDS = {
'KBS-G2-TR': {
  'Kebab & Ocakbaşı': [['cihangir kebap','E'],['taksim kebapçı','E'],['beyoğlu ocakbaşı','E'],['adana kebap istanbul','E'],['en yakın kebapçı','E'],['cihangir ocakbaşı','E'],['adana kebap cihangir','E'],['iskender kebap cihangir','E'],['taksim ocakbaşı','P'],['beyoğlu kebap','P'],['kebap restoranı taksim','P'],['urfa kebap cihangir','P'],['beyti kebap cihangir','P'],['kuzu pirzola cihangir','P'],['ocakbaşı istanbul','P'],['en yakın ocakbaşı','P'],['kebapçı beyoğlu','P'],['helal kebap istanbul','P']],
  'Pide & Lahmacun': [['pide cihangir','E'],['lahmacun cihangir','E'],['lahmacun fiyatı','E'],['çıtır lahmacun','E'],['taş fırın pide','E'],['lahmacun','P'],['pide','P'],['taksim lahmacun','P'],['beyoğlu pide','P'],['kaşarlı pide','P'],['kıymalı pide','P'],['pide fiyatı','P'],['en yakın lahmacun','P'],['en yakın pideci','P'],['cihangir pide lahmacun','P']],
  'Brand': [['kardeşler kebap','E'],['kardeşler kebap cihangir','E'],['kardesler kebap','E'],['kardesler kebap cihangir','E'],['kardeşler kebap menü','E'],['kardeşler kebap breakfast','E'],['kardeşler kebap kahvaltı','E'],['kardeşler kebap telefon','E'],['kardeşler kebap yol tarifi','E'],['kardeşler kebap & breakfast cihangir','E'],['kardeşler kebap istanbul','P'],['kardesler kebap menü','P']]
},
'KBS-G3-TR': {
  'Order-Kebab': [['kebap sipariş ver','E'],['kebap sipariş','E'],['online kebap sipariş','E'],['adana kebap sipariş','E'],['iskender kebap sipariş','E'],['paket servis kebap','E'],['urfa kebap sipariş','P'],['beyti kebap sipariş','P'],['cihangir kebap sipariş','P'],['taksim kebap sipariş','P'],['beyoğlu kebap sipariş','P'],['eve kebap siparişi','P'],['kebap siparişi cihangir','P']],
  'Order-Pide & Lahmacun': [['lahmacun sipariş','E'],['pide sipariş','E'],['pide lahmacun sipariş','E'],['online lahmacun sipariş','E'],['pide siparişi','P'],['lahmacun siparişi','P'],['online pide sipariş','P'],['cihangir lahmacun sipariş','P'],['taksim pide sipariş','P'],['beyoğlu lahmacun sipariş','P'],['paket servis lahmacun','P'],['paket servis pide','P'],['pide sipariş cihangir','P']]
},
'KBS-G2-EN': {
  'Kebab & Ocakbaşı': [['kebab restaurant cihangir','E'],['kebab near taksim','E'],['turkish kebab near me','E'],['adana kebab istanbul','E'],['iskender kebab istanbul','E'],['best kebab istanbul','E'],['kebab restaurant istanbul','P'],['ocakbasi istanbul','P'],['grill restaurant istanbul','P'],['halal restaurant istanbul','P'],['halal kebab istanbul','P'],['best kebab near taksim','P'],['kebab beyoglu','P'],['lamb chops istanbul','P'],['turkish restaurant near me','P']],
  'Pide & Lahmacun': [['lahmacun istanbul','E'],['pide istanbul','E'],['lahmacun near me','E'],['pide near me','E'],['lahmacun cihangir','E'],['pide cihangir','E'],['turkish pide taksim','P'],['best lahmacun istanbul','P'],['lahmacun price istanbul','P'],['pide restaurant istanbul','P'],['turkish flatbread istanbul','P'],['lahmacun beyoglu','P']],
  'Brand': [['kardesler kebap','E'],['kardesler kebap cihangir','E'],['kardeşler kebap','E'],['kardesler kebap menu','E'],['kardesler kebap istanbul','E'],['kardesler kebap breakfast','E'],['kardesler kebap phone','E'],['kardesler kebap directions','E'],['kardesler kebap & breakfast','P']]
},
'KBS-G3-EN': {
  'Order-Kebab': [['order kebab istanbul','E'],['kebab delivery istanbul','E'],['kebab delivery cihangir','E'],['order adana kebab','E'],['order iskender kebab','E'],['kebab delivery taksim','P'],['kebab delivery beyoglu','P'],['kebab takeaway istanbul','P'],['turkish food delivery istanbul','P'],['order turkish food online','P'],['halal kebab delivery istanbul','P']],
  'Order-Pide & Lahmacun': [['order lahmacun','E'],['lahmacun delivery istanbul','E'],['order pide','E'],['pide delivery istanbul','E'],['lahmacun delivery cihangir','P'],['pide delivery taksim','P'],['turkish pide delivery','P'],['lahmacun takeaway istanbul','P'],['pide delivery beyoglu','P']]
},
'KBS-G2-AR': {
  'Kebab & Ocakbaşı': [['مطعم كباب اسطنبول','E'],['كباب تركي اسطنبول','E'],['مطعم كباب تقسيم','E'],['مطعم كباب جيهانغير','E'],['كباب حلال اسطنبول','E'],['مطعم حلال تقسيم','E'],['أفضل كباب في اسطنبول','P'],['أضنة كباب اسطنبول','P'],['إسكندر كباب اسطنبول','P'],['مطعم مشويات اسطنبول','P'],['كباب قريب مني','P'],['مطعم تركي بيوغلو','P'],['مطعم مشويات تقسيم','P']],
  'Pide & Lahmacun': [['لحماجون اسطنبول','E'],['بيده تركية اسطنبول','E'],['لحماجون قريب مني','E'],['أفضل لحماجون في اسطنبول','E'],['بيده قريبة مني','P'],['لحماجون جيهانغير','P'],['بيده تقسيم','P'],['مطعم بيده في اسطنبول','P'],['سعر اللحماجون في اسطنبول','P'],['خبز تركي باللحم اسطنبول','P']],
  'Brand': [['كارديشلر كباب','E'],['كارديشلر كباب جيهانغير','E'],['كارديشلر كباب اسطنبول','E'],['منيو كارديشلر كباب','E'],['كارديشلر كباب فطور','E'],['هاتف كارديشلر كباب','E'],['عنوان كارديشلر كباب','E'],['مطعم كارديشلر كباب','P']]
},
'KBS-G3-AR': {
  'Order-Kebab': [['طلب كباب اسطنبول','E'],['توصيل كباب اسطنبول','E'],['توصيل كباب تقسيم','E'],['توصيل كباب جيهانغير','E'],['طلب أضنة كباب','E'],['طلب إسكندر كباب','P'],['طلب طعام تركي اون لاين','P'],['كباب سفري اسطنبول','P'],['توصيل طعام تركي اسطنبول','P'],['طلب كباب حلال','P']],
  'Order-Pide & Lahmacun': [['طلب لحماجون','E'],['توصيل لحماجون اسطنبول','E'],['طلب بيده تركية','E'],['توصيل بيده اسطنبول','E'],['لحماجون سفري اسطنبول','P'],['توصيل لحماجون تقسيم','P'],['طلب لحماجون جيهانغير','P'],['توصيل بيده جيهانغير','P']]
}
};

/* ============================ RSA COPY ============================ */
/* Plan §5 verbatim. h1/d1 = RSA-1 (15 headlines + 4 descriptions);
 * h2/h3 = RSA-2/RSA-3 headline sets (15 each); their descriptions are
 * built at build time by rotating RSA-1's descriptions (plan §5 rule).
 * No pinning (plan: pinning forbidden except name alternatives if
 * needed — not needed here). Headlines ≤30 chars, descriptions ≤90 —
 * the builder validates and logs any violation instead of failing. */
var RSA_COPY = {
TR: {

'Kebab & Ocakbaşı': { url:'/tr/menu', p1:'Cihangir', p2:'Kebap',
  h1:['Kardeşler Kebap Cihangir',"Cihangir'de Gerçek Kebap",'Adana Kebap ₺725','İskender Kebap ₺725','Kömür Ateşinde Ocakbaşı',"1998'den Beri Aynı Ocak","Google'da 4,6 Puan",'Adana, Urfa, Beyti, İskender',"Taksim'e 5 Dakika",'Kuzu Pirzola Ustasından',"Beyoğlu'nda Kebap Keyfi",'Hemen Ara 0212 251 36 96','Her Gün 09.00-02.00 Açık',"Cihangir'in Kebapçısı",'Menüyü Gör, Yol Tarifi Al'],
  d1:["Adana ve Urfa ₺725, İskender ₺725. Kömür ateşinde, 1998'den beri Cihangir'de.","Taksim'e 5 dakika. Ocakbaşı, pide ve lahmacun tek adreste. Menüyü gör, hemen ara.","Google'da 4,6 puan. Her gün 09.00-02.00 açığız. Telefon: (0212) 251 36 96.",'Komisyonsuz sipariş resmi siteden: aracı yok, fiyat menü fiyatıdır.'],
  h2:['Kebap mı Arıyorsun?','Ocakbaşında Gerçek Lezzet','Közde Adana Kebap','Ustasından Beyti Kebap',"Cihangir'de Akşam Yemeği",'Kebap İçin Hemen Ara','Dumanı Üstünde Kebaplar',"Taksim'de Kebap Adresi",'İskender Sevenlere','Pirzola ve Şiş Çeşitleri','Ailecek Kebap Sofrası','Menü ve Fiyatlar Sitede','Yol Tarifi Al, Hemen Gel',"1998'den Beri Aynı Lezzet",'Beyoğlu Ocakbaşı Keyfi'],
  h3:['Kebap Burada Yenir','Kömür Ateşi, Usta İşi',"₺725'den Başlayan Kebap",'Ara 0212 251 36 96','Cihangir Kebap Durağı',"Gece 02.00'ye Kadar Açık",'Ocakbaşı Lezzeti Burada','Adana Acılı, Urfa Acısız','Günlük Taze Et','Kebapta Kardeşler Farkı',"Taksim'e Yürüme Mesafesi",'Hemen Menüyü İncele','Sofranı Kur, Kebap Söyle','Izgara ve Kebap Çeşitleri',"Cihangir'de Kebap Zamanı"]},
'Pide & Lahmacun': { url:'/tr/menu', p1:'Cihangir', p2:'Lahmacun',
  h1:['Çıtır Lahmacun ₺210','Taş Fırında Pide',"Cihangir'de Lahmacun",'Kardeşler Kebap Cihangir','İncecik Hamur, Bol Malzeme','Kaşarlı ve Kıymalı Pide',"1998'den Beri Cihangir","Google'da 4,6 Puan","Taksim'e 5 Dakika",'Lahmacun ve Pide Ustası','Her Gün 09.00-02.00 Açık','Hemen Ara 0212 251 36 96',"Beyoğlu'nda Pide Keyfi",'Fırından Sıcak Sıcak','Menüyü Gör, Hemen Ara'],
  d1:["Çıtır lahmacun ₺210, taş fırın pideler günlük taze hamurla. 1998'den beri Cihangir'de.",'Kaşarlı, kıymalı ve karışık pide çeşitleri. Menü ve fiyatlar sitede, hemen ara.',"Taksim'e 5 dakika, Google'da 4,6 puan. Her gün 09.00-02.00 açığız.",'Komisyonsuz sipariş resmi siteden verilir: aracı yok, fiyat menü fiyatıdır.'],
  h2:['Lahmacun mu Arıyorsun?','Pide İçin Doğru Adres','Taş Fırından Çıtır Lezzet',"Cihangir'de Pide Zamanı",'İnce Hamur, Çıtır Kenar','Lahmacunda Kardeşler Farkı','Sıcak Sıcak Fırından','Pide ve Lahmacun Söyle','Menü ve Fiyatlar Sitede','Yol Tarifi Al, Hemen Gel',"Taksim'de Lahmacun",'Günlük Açılan Hamur','Ailecek Pide Sofrası','Kahvaltı da Kebap da',"1998'den Beri Aynı Fırın"],
  h3:['Lahmacun Burada',"₺210'a Çıtır Lahmacun",'Ara 0212 251 36 96','Cihangir Pide Durağı','Fırın Ateşi Hiç Sönmez','Pide Çeşitleri Bol',"Gece 02.00'ye Kadar",'Hemen Menüyü İncele',"Beyoğlu'nda Lahmacun",'Usta İşi Taş Fırın','Taze Hamur Her Gün','Lahmacun Sevenlere',"Cihangir'de Fırın Lezzeti",'Tek Dokunuşla Ara','Sofrada Pide Keyfi']},
'Brand': { url:'/tr', p1:'Cihangir', p2:'Menu',
  h1:['Kardeşler Kebap & Breakfast','Kardeşler Kebap Resmi Site',"Cihangir, 1998'den Beri",'Menü ve Güncel Fiyatlar',"Google'da 4,6 Puan",'Serpme Kahvaltı ve Kebap',"Taksim'e 5 Dakika",'Her Gün 09.00-02.00 Açık','Hemen Ara 0212 251 36 96','Komisyonsuz Online Sipariş',"Cihangir'in Kebapçısı",'Taş Fırın Pide ve Lahmacun','Yol Tarifi Al','İki Kuşaktır Aynı Lezzet','Kahvaltı 09.00-13.00'],
  d1:['Kardeşler Kebap & Breakfast resmi sitesi: menü, güncel fiyatlar ve komisyonsuz sipariş.',"1998'den beri Cihangir'de: serpme kahvaltı, kebap, pide ve lahmacun. Her gün 09.00-02.00.","Google'da 4,6 puan, Taksim'e 5 dakika. Telefon: (0212) 251 36 96.",'Sipariş doğrudan bize gelir, aracı komisyonu yok. Menüyü gör, WhatsApp\'tan yaz.'],
  h2:['Bizi mi Arıyordunuz?','Kardeşler Kebap Cihangir','Resmi Sitedesiniz','Menüyü Hemen Gör',"1998'den Beri Aynı Ocak","Cihangir'de Aile İşletmesi",'Kahvaltıdan Kebab\'a','Fiyatlar Şeffaf, Menüde','Ara, Sor, Sipariş Ver',"Taksim'in Yanı Başında",'Güncel Menü ve Fiyatlar','Ocakbaşı ve Taş Fırın','Misafirlerimiz 4,6 Verdi','Hemen Yol Tarifi Al','Soframız Herkese Açık'],
  h3:['Kardeşler Kebap Burada',"Cihangir'in Adresi",'Ara 0212 251 36 96','09.00-02.00 Her Gün','Aynı Ateş, Aynı Lezzet','Menü Sitede Hazır','Serpme Kahvaltı ₺1.350','Adana ve İskender ₺725','Lahmacun ₺210','Tek Dokunuşla Ara',"WhatsApp'tan Yazın",'İki Kuşaktır Biz',"Beyoğlu'nda Bir Klasik",'Hemen İncele','Kahvaltı da Var Kebap da']},
'Order-Kebab': { url:'/tr/menu', p1:'Siparis', p2:'Kebap',
  h1:['Kebap Siparişi Ver','Komisyonsuz Sipariş','Kardeşler Kebap Cihangir','Adana Kebap ₺725','İskender Kebap ₺725','Resmi Siteden Sipariş','Aracı Yok, Menü Fiyatı','WhatsApp ile Hızlı Onay','Sıcak ve Taze Teslimat',"Cihangir'e Paket Servis",'Her Gün 09.00-02.00','Hemen Ara 0212 251 36 96','Beyti ve Urfa da Var','Menüyü Gör, Sipariş Ver',"1998'den Beri Aynı Lezzet"],
  d1:['Aracı komisyonu yok: sipariş doğrudan bize gelir, fiyat menü fiyatıdır. Adana ₺725.','Resmi siteden sipariş ver, WhatsApp ile hızlı onay al. Pide, lahmacun ve kebap çeşitleri.',"Cihangir ve çevresine paket servis. Telefon: (0212) 251 36 96.","Google'da 4,6 puan alan ocakbaşından evinize: kömür ateşinde kebaplar."],
  h2:['Eve Kebap Söyle','Siparişin Doğrudan Bize','Komisyon Yok, Fark Yok','Ocakbaşından Kapına','Adana Siparişi Ver','İskender Siparişi Ver','Paket Servis Kebap','Menü Fiyatına Sipariş',"WhatsApp'tan Sipariş Ver","Taksim'e Paket Servis","Beyoğlu'na Paket Servis",'Ara, Siparişini Ver','Sıcak Sıcak Kapında','Günlük Taze Kebaplar','Sipariş İçin Tıkla'],
  h3:['Kebap Kapına Gelsin',"₺725'den Başlayan Kebap",'Ara 0212 251 36 96','Komisyonsuz Tek Adres','Resmi Site, Gerçek Fiyat','Cihangir Paket Servis','Hemen Sipariş Ver','Usta İşi, Kapına Teslim',"WhatsApp'tan Yaz, Söyle",'Menüyü Gör, Seç, Söyle','Aynı Ocak, Evinizde',"Gece 02.00'ye Kadar",'Taze ve Sıcak Teslim','Beyti Siparişi de Var','Doğrudan Bizden Sipariş']},
'Order-Pide & Lahmacun': { url:'/tr/menu', p1:'Siparis', p2:'Lahmacun',
  h1:['Lahmacun Siparişi Ver','Çıtır Lahmacun ₺210','Komisyonsuz Sipariş','Taş Fırın Pide Siparişi','Kardeşler Kebap Cihangir','Resmi Siteden Sipariş','Aracı Yok, Menü Fiyatı','WhatsApp ile Hızlı Onay','Kaşarlı, Kıymalı Pideler',"Cihangir'e Paket Servis",'Her Gün 09.00-02.00','Hemen Ara 0212 251 36 96','Fırından Sıcak Teslimat','Menüyü Gör, Sipariş Ver',"1998'den Beri Aynı Fırın"],
  d1:['Çıtır lahmacun ₺210 ve taş fırın pideler, aracısız resmi siteden kapınıza.','Sipariş doğrudan bize gelir, fiyat menü fiyatıdır. WhatsApp ile hızlı onay.','Kaşarlı ve kıymalı pide çeşitleri günlük taze hamurla. Telefon: (0212) 251 36 96.',"Cihangir ve çevresine paket servis, her gün 09.00-02.00. Google'da 4,6 puan."],
  h2:['Eve Lahmacun Söyle','Pide Siparişi Ver','Fırından Kapına','İnce Hamur, Çıtır Kenar','Paket Servis Lahmacun','Paket Servis Pide','Menü Fiyatına Sipariş',"WhatsApp'tan Sipariş Ver","Taksim'e Paket Servis","Beyoğlu'na Paket Servis",'Ara, Siparişini Ver','Sıcak Sıcak Kapında','Günlük Taze Hamur','Sipariş İçin Tıkla','Lahmacun Sevenlere Müjde'],
  h3:['Lahmacun Kapına Gelsin',"₺210'a Çıtır Lahmacun",'Ara 0212 251 36 96','Komisyonsuz Tek Adres','Resmi Site, Gerçek Fiyat','Cihangir Paket Servis','Hemen Sipariş Ver','Taş Fırın, Kapına Teslim',"WhatsApp'tan Yaz, Söyle",'Menüyü Gör, Seç, Söyle','Aynı Fırın, Evinizde',"Gece 02.00'ye Kadar",'Pide Siparişi de Var','Taze ve Sıcak Teslim','Doğrudan Bizden Sipariş']}
},
EN: {

'Kebab & Ocakbaşı': { url:'/en/menu', p1:'Cihangir', p2:'Kebab',
  h1:['Kardesler Kebap Cihangir','Real Kebab in Cihangir','Adana Kebab ₺725','Iskender Kebab ₺725','Charcoal Grill Ocakbasi','Same Grill Since 1998','Rated 4.6 on Google','Adana, Urfa, Beyti, Iskender','5 Minutes from Taksim','Lamb Chops from the Master','Kebab Night in Beyoglu','Call 0212 251 36 96','Open Daily 09:00-02:00',"Cihangir's Kebab House",'See Menu, Get Directions'],
  d1:['Adana and Urfa ₺725, Iskender ₺725. Charcoal-grilled in Cihangir since 1998.','Five minutes from Taksim. Ocakbasi grill, pide and lahmacun in one house. See the menu.','Rated 4.6 on Google. Open every day 09:00-02:00. Call: (0212) 251 36 96.','Order direct from our official site: no middleman, no commission, menu prices.'],
  h2:['Looking for Real Kebab?','Ocakbasi Grill Experience','Adana Over Charcoal','Beyti from the Master','Dinner in Cihangir','Call for Kebab Tonight','Kebabs Fresh off the Grill',"Taksim's Kebab Address",'For Iskender Lovers','Lamb Chops & Skewers','A Family Kebab Table','Menu & Prices on Our Site','Get Directions, Visit Us','Same Taste Since 1998','Beyoglu Ocakbasi Nights'],
  h3:['Kebab Is Eaten Here',"Charcoal Fire, Master's Hand",'Kebabs from ₺725','Call 0212 251 36 96','Cihangir Kebab Stop','Open Until 2am','Ocakbasi Flavour Is Here','Adana Hot, Urfa Mild','Fresh Meat Daily','The Kardesler Difference','Walking Distance to Taksim','See the Menu Now','Set the Table, Order Kebab','Grill & Kebab Varieties','Kebab Time in Cihangir']},
'Pide & Lahmacun': { url:'/en/menu', p1:'Cihangir', p2:'Lahmacun',
  h1:['Crispy Lahmacun ₺210','Stone-Oven Pide','Lahmacun in Cihangir','Kardesler Kebap Cihangir','Thin Dough, Rich Topping','Cheese & Minced-Meat Pide','In Cihangir Since 1998','Rated 4.6 on Google','5 Minutes from Taksim','Lahmacun & Pide Masters','Open Daily 09:00-02:00','Call 0212 251 36 96','Pide Time in Beyoglu','Hot from the Oven','See the Menu, Call Now'],
  d1:['Crispy lahmacun ₺210 and stone-oven pide with fresh dough daily. In Cihangir since 1998.','Cheese, minced-meat and mixed pide varieties. Menu and prices on our site — call us.','Five minutes from Taksim, rated 4.6 on Google. Open daily 09:00-02:00.','Order direct from our official site: no middleman, menu prices only.'],
  h2:['Looking for Lahmacun?','The Right Pide Address','Crispy Taste from Stone Oven','Pide Time in Cihangir','Thin Dough, Crispy Edges','The Kardesler Lahmacun','Hot, Straight from the Oven','Order Pide & Lahmacun','Menu & Prices on Our Site','Get Directions, Visit Us','Lahmacun Near Taksim','Dough Rolled Fresh Daily','A Family Pide Table','Breakfast & Kebab Too','Same Oven Since 1998'],
  h3:['Lahmacun Is Here','Crispy Lahmacun for ₺210','Call 0212 251 36 96','Cihangir Pide Stop','The Oven Fire Never Dies','Plenty of Pide Varieties','Open Until 2am','See the Menu Now','Lahmacun in Beyoglu','Master-Made Stone Oven','Fresh Dough Every Day','For Lahmacun Lovers','Oven Flavours of Cihangir','One Tap to Call Us','Pide Joy at the Table']},
'Brand': { url:'/en', p1:'Cihangir', p2:'Menu',
  h1:['Kardesler Kebap & Breakfast','Kardesler Kebap Official Site','Cihangir, Since 1998','Menu & Current Prices','Rated 4.6 on Google','Serpme Breakfast & Kebab','5 Minutes from Taksim','Open Daily 09:00-02:00','Call 0212 251 36 96','Commission-Free Online Order',"Cihangir's Kebab House",'Stone-Oven Pide & Lahmacun','Get Directions','Two Generations, One Taste','Breakfast 09:00-13:00'],
  d1:['Kardesler Kebap & Breakfast official site: menu, current prices and commission-free order.','In Cihangir since 1998: breakfast, kebab, pide and lahmacun. Open daily 09:00-02:00.','Rated 4.6 on Google, five minutes from Taksim. Phone: (0212) 251 36 96.','Your order comes directly to us — no middleman commission. See the menu, message WhatsApp.'],
  h2:['Looking for Us?','Kardesler Kebap Cihangir','You Are on the Official Site','See the Menu Right Away','Same Grill Since 1998','A Family House in Cihangir','From Breakfast to Kebab','Transparent Menu Prices','Call, Ask, Order','Right Next to Taksim','Current Menu & Prices','Ocakbasi & Stone Oven','Guests Rated Us 4.6','Get Directions Now','Our Table Is Open to All'],
  h3:['Kardesler Kebap Is Here','The Address in Cihangir','Call 0212 251 36 96','Open Daily 09:00-02:00','Same Fire, Same Taste','Menu Ready on Our Site','Serpme Breakfast ₺1,350','Adana & Iskender ₺725','Lahmacun ₺210','One Tap to Call','Message Us on WhatsApp','Two Generations of Us','A Beyoglu Classic','Explore Now','Breakfast & Kebab Both']},
'Order-Kebab': { url:'/en/menu', p1:'Order', p2:'Kebab',
  h1:['Order Kebab Online','Commission-Free Order','Kardesler Kebap Cihangir','Adana Kebab ₺725','Iskender Kebab ₺725','Order from the Official Site','No Middleman, Menu Prices','Fast WhatsApp Confirmation','Hot & Fresh Delivery','Delivery around Cihangir','Open Daily 09:00-02:00','Call 0212 251 36 96','Beyti & Urfa Available Too','See Menu, Place Your Order','Same Taste Since 1998'],
  d1:['No middleman commission: your order comes directly to us at menu prices. Adana ₺725.','Order on the official site, confirm fast on WhatsApp. Pide, lahmacun and kebab varieties.','Takeaway delivery in Cihangir and around. Phone: (0212) 251 36 96.','From a 4.6-rated ocakbasi to your home: charcoal-grilled kebabs.'],
  h2:['Kebab to Your Door','Your Order Comes to Us','No Commission, No Markup','From Grill to Your Door','Order Adana Kebab','Order Iskender Kebab','Kebab Takeaway Service','Order at Menu Prices','Order via WhatsApp','Delivery to Taksim','Delivery to Beyoglu','Call & Place Your Order','Hot at Your Door','Fresh Kebabs Daily','Tap to Order Now'],
  h3:['Kebab Delivered to You','Kebabs Starting at ₺725','Call 0212 251 36 96','One Commission-Free Address','Official Site, Real Prices','Cihangir Takeaway','Order Right Now',"Master's Work, Delivered",'Message WhatsApp & Order','See, Choose, Order','Same Grill, at Your Home','Open Until 2am','Fresh & Hot Delivery','Beyti Orders Available','Order Directly from Us']},
'Order-Pide & Lahmacun': { url:'/en/menu', p1:'Order', p2:'Lahmacun',
  h1:['Order Lahmacun Online','Crispy Lahmacun ₺210','Commission-Free Order','Stone-Oven Pide Orders','Kardesler Kebap Cihangir','Order from the Official Site','No Middleman, Menu Prices','Fast WhatsApp Confirmation','Cheese & Minced-Meat Pide','Delivery around Cihangir','Open Daily 09:00-02:00','Call 0212 251 36 96','Hot Delivery from the Oven','See Menu, Place Your Order','Same Oven Since 1998'],
  d1:['Crispy lahmacun ₺210 and stone-oven pide, direct from our official site to your door.','Your order comes directly to us at menu prices. Fast confirmation on WhatsApp.','Cheese and minced-meat pide with fresh dough daily. Phone: (0212) 251 36 96.','Takeaway delivery in Cihangir and around, daily 09:00-02:00. Rated 4.6 on Google.'],
  h2:['Lahmacun to Your Door','Order Pide Online','From Oven to Your Door','Thin Dough, Crispy Edges','Lahmacun Takeaway','Pide Takeaway Service','Order at Menu Prices','Order via WhatsApp','Delivery to Taksim','Delivery to Beyoglu','Call & Place Your Order','Hot at Your Door','Fresh Dough Daily','Tap to Order Now','Good News for Lahmacun Fans'],
  h3:['Lahmacun Delivered to You','Crispy Lahmacun for ₺210','Call 0212 251 36 96','One Commission-Free Address','Official Site, Real Prices','Cihangir Takeaway','Order Right Now','Stone Oven, Delivered','Message WhatsApp & Order','See, Choose, Order','Same Oven, at Your Home','Open Until 2am','Pide Orders Available Too','Fresh & Hot Delivery','Order Directly from Us']}
},
AR: {

'Kebab & Ocakbaşı': { url:'/ar/menu', p1:'جيهانغير', p2:'كباب',
  h1:['كارديشلر كباب جيهانغير','كباب حقيقي في جيهانغير','أضنة كباب بـ725 ليرة','إسكندر كباب بـ725 ليرة','مشويات فحم أوجاكباشي','نفس المشواة منذ 1998','تقييم 4.6 على جوجل','أضنة وأورفا وبيتي وإسكندر','على بعد 5 دقائق من تقسيم','ريش ضأن من يد الأستا','ليلة كباب في بيوغلو','اتصل 0212 251 36 96','مفتوح يوميًا 09:00-02:00','بيت الكباب في جيهانغير','شاهد القائمة واحصل على الاتجاه'],
  d1:['أضنة وأورفا بـ725 ليرة، وإسكندر بـ725 ليرة. مشويات فحم في جيهانغير منذ 1998.','على بعد 5 دقائق من تقسيم. أوجاكباشي وبيده ولحماجون في مكان واحد. شاهد القائمة.','تقييم 4.6 على جوجل. مفتوح كل يوم 09:00-02:00. اتصل: (0212) 251 36 96.','اطلب مباشرة من موقعنا الرسمي: بدون وسيط وبدون عمولة وبأسعار القائمة.'],
  h2:['تبحث عن كباب حقيقي؟','تجربة أوجاكباشي أصلية','أضنة على الفحم','بيتي من يد الأستا','عشاء في جيهانغير','اتصل لكباب الليلة','كباب طازج من المشواة','عنوان الكباب في تقسيم','لعشاق الإسكندر','ريش وأسياخ مشكلة','سفرة كباب عائلية','القائمة والأسعار على موقعنا','احصل على الاتجاهات وزورنا','نفس الطعم منذ 1998','ليالي أوجاكباشي بيوغلو'],
  h3:['الكباب يؤكل هنا','نار فحم ويد أستا','كباب يبدأ من 725 ليرة','اتصل 0212 251 36 96','محطة كباب جيهانغير','مفتوح حتى 2 فجرًا','نكهة الأوجاكباشي هنا','أضنة حار وأورفا بدون','لحم طازج يوميًا','فارق كارديشلر','على مسافة مشي من تقسيم','شاهد القائمة الآن','جهز سفرتك واطلب كباب','أصناف مشويات وكباب','وقت الكباب في جيهانغير']},
'Pide & Lahmacun': { url:'/ar/menu', p1:'جيهانغير', p2:'لحماجون',
  h1:['لحماجون مقرمش بـ210 ليرة','بيده من فرن حجري','لحماجون في جيهانغير','كارديشلر كباب جيهانغير','عجينة رقيقة وحشو غني','بيده بالجبن واللحم المفروم','في جيهانغير منذ 1998','تقييم 4.6 على جوجل','على بعد 5 دقائق من تقسيم','أساتذة اللحماجون والبيده','مفتوح يوميًا 09:00-02:00','اتصل 0212 251 36 96','وقت البيده في بيوغلو','ساخن من الفرن مباشرة','شاهد القائمة واتصل الآن'],
  d1:['لحماجون مقرمش بـ210 ليرة وبيده فرن حجري بعجينة طازجة يوميًا. في جيهانغير منذ 1998.','أصناف بيده بالجبن واللحم المفروم والخلطات. القائمة والأسعار على موقعنا — اتصل بنا.','على بعد 5 دقائق من تقسيم، وتقييم 4.6 على جوجل. مفتوح يوميًا 09:00-02:00.','اطلب مباشرة من موقعنا الرسمي: بدون وسيط وبأسعار القائمة فقط.'],
  h2:['تبحث عن لحماجون؟','عنوان البيده الصحيح','قرمشة من الفرن الحجري','وقت البيده في جيهانغير','عجينة رقيقة وحواف مقرمشة','لحماجون كارديشلر','ساخن مباشرة من الفرن','اطلب بيده ولحماجون','القائمة والأسعار على موقعنا','احصل على الاتجاهات وزورنا','لحماجون قرب تقسيم','عجينة تُفرد طازجة يوميًا','سفرة بيده عائلية','فطور وكباب أيضًا','نفس الفرن منذ 1998'],
  h3:['اللحماجون هنا','لحماجون مقرمش بـ210','اتصل 0212 251 36 96','محطة بيده جيهانغير','نار الفرن لا تنطفئ','أصناف بيده كثيرة','مفتوح حتى 2 فجرًا','شاهد القائمة الآن','لحماجون في بيوغلو','فرن حجري بيد أستا','عجينة طازجة كل يوم','لعشاق اللحماجون','نكهات فرن جيهانغير','اتصل بنا بضغطة واحدة','متعة البيده على السفرة']},
'Brand': { url:'/ar', p1:'جيهانغير', p2:'القائمة',
  h1:['كارديشلر كباب وفطور','الموقع الرسمي لكارديشلر كباب','جيهانغير، منذ 1998','القائمة والأسعار الحالية','تقييم 4.6 على جوجل','فطور سربمه وكباب','على بعد 5 دقائق من تقسيم','مفتوح يوميًا 09:00-02:00','اتصل 0212 251 36 96','طلب أونلاين بدون عمولة','بيت الكباب في جيهانغير','بيده ولحماجون فرن حجري','احصل على الاتجاهات','جيلان وطعم واحد','الفطور 09:00-13:00'],
  d1:['الموقع الرسمي لكارديشلر كباب وفطور: القائمة والأسعار الحالية وطلب بدون عمولة.','في جيهانغير منذ 1998: فطور سربمه وكباب وبيده ولحماجون. مفتوح يوميًا 09:00-02:00.','تقييم 4.6 على جوجل وعلى بعد 5 دقائق من تقسيم. الهاتف: (0212) 251 36 96.','طلبك يصلنا مباشرة — بدون عمولة وسيط. شاهد القائمة وراسلنا واتساب.'],
  h2:['هل تبحث عنا؟','كارديشلر كباب جيهانغير','أنت في الموقع الرسمي','شاهد القائمة فورًا','نفس المشواة منذ 1998','بيت عائلي في جيهانغير','من الفطور إلى الكباب','أسعار قائمة شفافة','اتصل واسأل واطلب','بجوار تقسيم مباشرة','قائمة وأسعار محدثة','أوجاكباشي وفرن حجري','ضيوفنا قيّمونا 4.6','احصل على الاتجاهات الآن','سفرتنا مفتوحة للجميع'],
  h3:['كارديشلر كباب هنا','العنوان في جيهانغير','اتصل 0212 251 36 96','مفتوح يوميًا 09:00-02:00','نفس النار ونفس الطعم','القائمة جاهزة على موقعنا','فطور سربمه بـ1350 ليرة','أضنة وإسكندر بـ725 ليرة','لحماجون بـ210 ليرة','اتصل بضغطة واحدة','راسلنا على واتساب','جيلان منا نحن','كلاسيكية بيوغلو','اكتشف الآن','فطور وكباب معًا']},
'Order-Kebab': { url:'/ar/menu', p1:'اطلب', p2:'كباب',
  h1:['اطلب كباب أونلاين','طلب بدون عمولة','كارديشلر كباب جيهانغير','أضنة كباب بـ725 ليرة','إسكندر كباب بـ725 ليرة','اطلب من الموقع الرسمي','بدون وسيط وبأسعار القائمة','تأكيد سريع عبر واتساب','توصيل ساخن وطازج','توصيل حول جيهانغير','مفتوح يوميًا 09:00-02:00','اتصل 0212 251 36 96','بيتي وأورفا متوفر أيضًا','شاهد القائمة وقدم طلبك','نفس الطعم منذ 1998'],
  d1:['بدون عمولة وسيط: طلبك يصلنا مباشرة وبأسعار القائمة. أضنة بـ725 ليرة.','اطلب من الموقع الرسمي وأكّد بسرعة عبر واتساب. أصناف بيده ولحماجون وكباب.','توصيل سفري في جيهانغير وحولها. الهاتف: (0212) 251 36 96.','من أوجاكباشي بتقييم 4.6 على جوجل إلى بيتك: كباب مشوي على الفحم.'],
  h2:['كباب يصل إلى بابك','طلبك يصلنا مباشرة','بدون عمولة وبدون زيادة','من المشواة إلى بابك','اطلب أضنة كباب','اطلب إسكندر كباب','خدمة كباب سفري','اطلب بأسعار القائمة','اطلب عبر واتساب','توصيل إلى تقسيم','توصيل إلى بيوغلو','اتصل وقدم طلبك','ساخن عند بابك','كباب طازج يوميًا','اضغط للطلب الآن'],
  h3:['كباب يوصلك أينما كنت','كباب يبدأ من 725 ليرة','اتصل 0212 251 36 96','عنوان واحد بدون عمولة','موقع رسمي وأسعار حقيقية','سفري جيهانغير','اطلب الآن مباشرة','شغل أستا ويصلك جاهز','راسل واتساب واطلب','شاهد واختر واطلب','نفس المشواة في بيتك','مفتوح حتى 2 فجرًا','توصيل طازج وساخن','طلبات بيتي متوفرة','اطلب منا مباشرة']},
'Order-Pide & Lahmacun': { url:'/ar/menu', p1:'اطلب', p2:'لحماجون',
  h1:['اطلب لحماجون أونلاين','لحماجون مقرمش بـ210 ليرة','طلب بدون عمولة','طلبات بيده فرن حجري','كارديشلر كباب جيهانغير','اطلب من الموقع الرسمي','بدون وسيط وبأسعار القائمة','تأكيد سريع عبر واتساب','بيده بالجبن واللحم المفروم','توصيل حول جيهانغير','مفتوح يوميًا 09:00-02:00','اتصل 0212 251 36 96','توصيل ساخن من الفرن','شاهد القائمة وقدم طلبك','نفس الفرن منذ 1998'],
  d1:['لحماجون مقرمش بـ210 ليرة وبيده فرن حجري، من موقعنا الرسمي مباشرة إلى بابك.','طلبك يصلنا مباشرة وبأسعار القائمة. تأكيد سريع عبر واتساب.','بيده بالجبن واللحم المفروم بعجينة طازجة يوميًا. الهاتف: (0212) 251 36 96.','توصيل سفري في جيهانغير وحولها، يوميًا 09:00-02:00. تقييم 4.6 على جوجل.'],
  h2:['لحماجون يصل إلى بابك','اطلب بيده أونلاين','من الفرن إلى بابك','عجينة رقيقة وحواف مقرمشة','لحماجون سفري','خدمة بيده سفري','اطلب بأسعار القائمة','اطلب عبر واتساب','توصيل إلى تقسيم','توصيل إلى بيوغلو','اتصل وقدم طلبك','ساخن عند بابك','عجينة طازجة يوميًا','اضغط للطلب الآن','بشرى لعشاق اللحماجون'],
  h3:['لحماجون يوصلك جاهز','لحماجون مقرمش بـ210','اتصل 0212 251 36 96','عنوان واحد بدون عمولة','موقع رسمي وأسعار حقيقية','سفري جيهانغير','اطلب الآن مباشرة','فرن حجري ويصلك جاهز','راسل واتساب واطلب','شاهد واختر واطلب','نفس الفرن في بيتك','مفتوح حتى 2 فجرًا','طلبات بيده متوفرة أيضًا','توصيل طازج وساخن','اطلب منا مباشرة']}
}
};

/* ============================ ASSETS (plan §7) ============================ */
var ASSETS = {
  TR: {
    sitelinks: [['Menü','/tr/menu'],['Serpme Kahvaltı','/tr/turkish-breakfast-cihangir'],['Online Sipariş','/tr/menu'],['Kardeşler Kebap','/tr']],
    callouts: ["1998'den Beri",'Komisyonsuz Sipariş','Her Gün 09.00-02.00',"Taksim'e 5 Dakika"],
    snippets: ['Serpme Kahvaltı','Adana Kebap','İskender','Pide','Lahmacun','Ocakbaşı']
  },
  EN: {
    sitelinks: [['Menu','/en/menu'],['Turkish Breakfast','/en/turkish-breakfast-cihangir'],['Order Online','/en/menu'],['Kardesler Kebap','/en']],
    callouts: ['Since 1998','Commission-Free Order','Open Daily 09:00-02:00','5 Min from Taksim'],
    snippets: ['Serpme Breakfast','Adana Kebab','Iskender','Pide','Lahmacun','Ocakbasi Grill']
  },
  AR: {
    sitelinks: [['القائمة','/ar/menu'],['الفطور التركي','/ar/turkish-breakfast-cihangir'],['اطلب أونلاين','/ar/menu'],['كارديشلر كباب','/ar']],
    callouts: ['منذ 1998','طلب بدون عمولة','مفتوح يوميًا 09:00-02:00','5 دقائق من تقسيم'],
    snippets: ['فطور سربمه','أضنة كباب','إسكندر','بيده','لحماجون','أوجاكباشي']
  }
};

/* Ad groups per family, in build order (plan §2). */
var FAMILY_GROUPS = {
  G2: ['Kebab & Ocakbaşı','Pide & Lahmacun','Brand'],
  G3: ['Order-Kebab','Order-Pide & Lahmacun']
};
var DAYS = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'];

/* ============================ BUILD LOGIC ============================ */
var START_MS = new Date().getTime();
var STATS = { campaigns: 0, adGroups: 0, keywords: 0, ads: 0, negListEntries: 0, campaignNegs: 0, assets: 0, schedules: 0, warnings: [] };

function log(msg) { Logger.log(msg); }
function warn(msg) { STATS.warnings.push(msg); Logger.log('WARNING: ' + msg); }
function timeUp() { return (new Date().getTime() - START_MS) > CONFIG.MAX_RUNTIME_MS; }
function resultOf(op) { return (op && typeof op.getResult === 'function') ? op.getResult() : op; }

function findCampaignByName(name) {
  var it = AdsApp.campaigns().get();
  while (it.hasNext()) { var c = it.next(); if (c.getName() === name) return c; }
  return null;
}
function findAdGroup(campaign, name) {
  var it = campaign.adGroups().get();
  while (it.hasNext()) { var g = it.next(); if (g.getName() === name) return g; }
  return null;
}
function findNegativeList(name) {
  var it = AdsApp.negativeKeywordLists().get();
  while (it.hasNext()) { var l = it.next(); if (l.getName() === name) return l; }
  return null;
}

function getOrCreateNegativeList() {
  var list = findNegativeList(CONFIG.NEG_LIST_NAME);
  if (!list) {
    list = resultOf(AdsApp.newNegativeKeywordListBuilder().withName(CONFIG.NEG_LIST_NAME).build());
    log('Created negative keyword list: ' + CONFIG.NEG_LIST_NAME);
  }
  var existing = {};
  var it = list.negativeKeywords().get();
  while (it.hasNext()) {
    var nk = it.next();
    // Match type is expressed by quoting the text (documented API):
    // '"text"' = phrase. An entry left over from the first (pre-patch)
    // run may exist as BROAD; convert it so the list ends up as planned.
    if (nk.getMatchType && nk.getMatchType() !== 'PHRASE') {
      warn('Negative list entry "' + nk.getText() + '" exists as ' + nk.getMatchType() + ' — removing and re-adding as PHRASE.');
      nk.remove();
    } else {
      existing[nk.getText().toLowerCase()] = true;
    }
  }
  var added = 0;
  for (var i = 0; i < NEG_SHARED.length; i++) {
    var t = NEG_SHARED[i];
    if (!existing[t.toLowerCase()]) { list.addNegativeKeyword('"' + t + '"'); added++; }
  }
  STATS.negListEntries += added;
  log('Negative list ' + CONFIG.NEG_LIST_NAME + ': ' + added + ' entries added (' + NEG_SHARED.length + ' in plan).');
  return list;
}

function addCampaignNegatives(campaign, texts, label) {
  var existing = {};
  try {
    var it = campaign.negativeKeywords().get();
    while (it.hasNext()) { var nk = it.next(); existing[nk.getText().toLowerCase()] = true; }
  } catch (e) { warn('Could not read existing campaign negatives on ' + campaign.getName() + ': ' + e); }
  var added = 0;
  for (var i = 0; i < texts.length; i++) {
    if (!existing[texts[i].toLowerCase()]) {
      try { campaign.createNegativeKeyword('"' + texts[i] + '"'); added++; }
      catch (e) { warn('Campaign negative failed (' + label + ', ' + campaign.getName() + '): "' + texts[i] + '" — ' + e); }
    }
  }
  STATS.campaignNegs += added;
  if (added) log(campaign.getName() + ': +' + added + ' ' + label + ' negatives.');
}

function getOrCreateCallAsset() {
  // Documented names: the call extension is a PhoneNumber —
  // AdsApp.extensions().phoneNumbers() / newPhoneNumberBuilder(), attached
  // with campaign.addPhoneNumber(). (extensions().calls() and
  // newCallBuilder() do not exist in the current scripts reference.)
  var it = AdsApp.extensions().phoneNumbers().get();
  while (it.hasNext()) { var c = it.next(); if (c.getPhoneNumber() === CONFIG.PHONE_ASSET) return c; }
  var call = resultOf(AdsApp.extensions().newPhoneNumberBuilder()
    .withCountry(CONFIG.PHONE_COUNTRY)
    .withPhoneNumber(CONFIG.PHONE_ASSET)
    .build());
  log('Created call (phone number) asset: ' + CONFIG.PHONE_ASSET + ' (verify in UI: call reporting OFF — plan §7).');
  return call;
}
function getOrCreateSitelink(text, url) {
  var it = AdsApp.extensions().sitelinks().get();
  while (it.hasNext()) {
    var s = it.next();
    var fu = null;
    try { fu = s.urls().getFinalUrl(); } catch (e) {} // Sitelink has no getFinalUrl(); it lives on urls()
    if (s.getLinkText() === text && fu === url) return s;
  }
  return resultOf(AdsApp.extensions().newSitelinkBuilder().withLinkText(text).withFinalUrl(url).build());
}
function getOrCreateCallout(text) {
  var it = AdsApp.extensions().callouts().get();
  while (it.hasNext()) { var c = it.next(); if (c.getText() === text) return c; }
  return resultOf(AdsApp.extensions().newCalloutBuilder().withText(text).build());
}
function getOrCreateSnippet(values) {
  var key = values.join('|');
  var it = AdsApp.extensions().snippets().get();
  while (it.hasNext()) { var s = it.next(); if (s.getValues().join('|') === key) return s; }
  // Documented builder: newSnippetBuilder().withHeader(...).withValues([...])
  // (no extensions().structuredSnippets(), no newStructuredSnippetBuilder(),
  // no addValue()).
  return resultOf(AdsApp.extensions().newSnippetBuilder().withHeader('Services').withValues(values).build());
}

function attachAssets(campaign, lang) {
  var a = ASSETS[lang];
  try { campaign.addPhoneNumber(getOrCreateCallAsset()); STATS.assets++; } catch (e) { warn('Phone number (call) attach failed on ' + campaign.getName() + ': ' + e); }
  for (var i = 0; i < a.sitelinks.length; i++) {
    try { campaign.addSitelink(getOrCreateSitelink(a.sitelinks[i][0], CONFIG.SITE + a.sitelinks[i][1])); STATS.assets++; }
    catch (e) { warn('Sitelink "' + a.sitelinks[i][0] + '" failed on ' + campaign.getName() + ': ' + e); }
  }
  for (var j = 0; j < a.callouts.length; j++) {
    try { campaign.addCallout(getOrCreateCallout(a.callouts[j])); STATS.assets++; }
    catch (e) { warn('Callout "' + a.callouts[j] + '" failed on ' + campaign.getName() + ': ' + e); }
  }
  try { campaign.addSnippet(getOrCreateSnippet(a.snippets)); STATS.assets++; }
  catch (e) { warn('Snippet failed on ' + campaign.getName() + ': ' + e); }
  // LOCATION ASSET: cannot be linked from a script — link the GBP profile
  // in the UI and confirm status "Approved" before spending (plan §7/§12).
}

function addGeoAndSchedule(campaign) {
  var hasProx = false;
  try { hasProx = campaign.targeting().targetedProximities().get().totalNumEntities() > 0; } catch (e) {}
  if (!hasProx) {
    // addProximity returns a TargetedProximityOperation — it executes via
    // getResult() (resultOf); operations have no .build() method.
    resultOf(campaign.addProximity(CONFIG.PIN_LAT, CONFIG.PIN_LNG, CONFIG.RADIUS_KM, 'KILOMETERS'));
    log(campaign.getName() + ': proximity ' + CONFIG.RADIUS_KM + ' km @ Cihangir pin added. VERIFY in UI: Location options = Presence only.');
  }
  var existing = 0;
  try { existing = campaign.targeting().adSchedules().get().totalNumEntities(); } catch (e) {}
  if (existing === 0) {
    // All campaigns run the full 09:00–02:00 window (two segments per
    // day: 09:00–24:00 and 00:00–02:00). There is no breakfast-only
    // window — breakfast campaigns were cancelled (owner, 2026-11-25).
    for (var d = 0; d < DAYS.length; d++) {
      resultOf(campaign.addAdSchedule(DAYS[d], 9, 0, 24, 0, 1.0));
      resultOf(campaign.addAdSchedule(DAYS[d], 0, 0, 2, 0, 1.0));
      STATS.schedules += 2;
    }
    log(campaign.getName() + ': ad schedule 09:00–02:00 (all days) added.');
  }
}

function cleanHeadlines(list, groupLabel) {
  var out = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].length > 30) { warn('Headline >30 chars SKIPPED (' + groupLabel + '): "' + list[i] + '" (' + list[i].length + ')'); continue; }
    out.push(list[i]);
  }
  return out;
}
function cleanDescriptions(list, groupLabel) {
  var out = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].length > 90) { warn('Description >90 chars SKIPPED (' + groupLabel + '): "' + list[i] + '" (' + list[i].length + ')'); continue; }
    out.push(list[i]);
  }
  return out;
}
function rotate(arr, n) { return arr.slice(n).concat(arr.slice(0, n)); }

function buildAds(adGroup, copy, groupLabel) {
  var existing = 0;
  try { existing = adGroup.ads().withCondition("Type = 'RESPONSIVE_SEARCH_AD'").get().totalNumEntities(); }
  catch (e) { existing = adGroup.ads().get().totalNumEntities(); }
  if (existing >= 3) { log(groupLabel + ': 3 RSAs already present — skipped.'); return; }
  var url = CONFIG.SITE + copy.url;
  var sets = [
    { h: cleanHeadlines(copy.h1, groupLabel + ' RSA-1'), d: cleanDescriptions(copy.d1, groupLabel + ' RSA-1') },
    { h: cleanHeadlines(copy.h2, groupLabel + ' RSA-2'), d: cleanDescriptions(rotate(copy.d1, 1), groupLabel + ' RSA-2') },
    { h: cleanHeadlines(copy.h3, groupLabel + ' RSA-3'), d: cleanDescriptions(rotate(copy.d1, 2), groupLabel + ' RSA-3') }
  ];
  for (var s = existing; s < 3; s++) {
    var set = sets[s];
    if (set.h.length < 3 || set.d.length < 2) { warn(groupLabel + ' RSA-' + (s + 1) + ': not enough valid copy after length checks — SKIPPED, fix manually.'); continue; }
    var b = adGroup.newAd().responsiveSearchAdBuilder().withFinalUrl(url);
    for (var i = 0; i < set.h.length; i++) b.addHeadline(set.h[i]);
    for (var j = 0; j < set.d.length; j++) b.addDescription(set.d[j]);
    if (copy.p1) b.withPath1(copy.p1);
    if (copy.p2) b.withPath2(copy.p2);
    resultOf(b.build());
    STATS.ads++;
  }
  log(groupLabel + ': RSAs built up to 3.');
}

function buildKeywords(adGroup, list, groupLabel) {
  var existing = {};
  var it = adGroup.keywords().get();
  while (it.hasNext()) { var k = it.next(); existing[k.getText().toLowerCase() + '|' + k.getMatchType()] = true; }
  var added = 0;
  for (var i = 0; i < list.length; i++) {
    var text = list[i][0], match = list[i][1] === 'E' ? 'EXACT' : 'PHRASE';
    if (existing[text.toLowerCase() + '|' + match]) continue;
    var formatted = list[i][1] === 'E' ? '[' + text + ']' : '"' + text + '"';
    // AdGroup.createKeyword() does not exist in the current scripts
    // reference; the documented path is newKeywordBuilder().withText(),
    // which takes the same quoted match-type syntax already in `formatted`.
    resultOf(adGroup.newKeywordBuilder().withText(formatted).build());
    added++;
  }
  STATS.keywords += added;
  log(groupLabel + ': +' + added + ' keywords (' + list.length + ' in plan).');
}

/* Campaign creation — the documented replacement for the nonexistent
 * AdsApp.newCampaignBuilder(): generic mutate (AdsApp.mutateAll) with a
 * CampaignBudget create + a Campaign create in ONE atomic request,
 * linked by temporary IDs (-1 = budget, -2 = campaign), per the Google
 * Ads Scripts "Mutate" guide and the Google Ads API "Create campaigns"
 * field reference. Name, daily budget, PAUSED status, Maximize
 * Conversions (embedded bidding-strategy field) and network settings
 * (Google Search only, Search partners OFF, Display OFF) are all set in
 * the create itself. containsEuPoliticalAdvertising is a required field
 * on campaign create in the current API. */
function createCampaignViaMutate(campaignName) {
  var customerId = AdsApp.currentAccount().getCustomerId().replace(/[^0-9]/g, '');
  var budgetResourceName = 'customers/' + customerId + '/campaignBudgets/-1';
  var campaignResourceName = 'customers/' + customerId + '/campaigns/-2';
  var operations = [
    { campaignBudgetOperation: { create: {
        resourceName: budgetResourceName,
        name: campaignName + ' Budget',
        amountMicros: Math.round(CONFIG.BUDGETS[campaignName] * 1000000),
        deliveryMethod: 'STANDARD',
        explicitlyShared: false } } },
    { campaignOperation: { create: {
        resourceName: campaignResourceName,
        name: campaignName,
        advertisingChannelType: 'SEARCH',
        status: 'PAUSED',
        campaignBudget: budgetResourceName,
        maximizeConversions: {},
        containsEuPoliticalAdvertising: 'DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING',
        networkSettings: {
          targetGoogleSearch: true,
          targetSearchNetwork: false,
          targetPartnerSearchNetwork: false,
          targetContentNetwork: false } } } }
  ];
  var results = AdsApp.mutateAll(operations, { partialFailure: false });
  for (var i = 0; i < results.length; i++) {
    if (!results[i].isSuccessful()) {
      throw new Error('Mutate create failed for ' + campaignName + ' (operation ' + i + '): ' + results[i].getErrorMessages().join(' | '));
    }
  }
  return results[1].getResourceName();
}

function buildCampaign(campaignName, negList) {
  var parts = campaignName.split('-'); // KBS-G2-TR
  var family = parts[1], lang = parts[2];
  var campaign = findCampaignByName(campaignName);
  if (!campaign) {
    createCampaignViaMutate(campaignName);
    // Read the created campaign back through the normal selector so the
    // rest of the build uses the standard AdsApp.Campaign object.
    for (var attempt = 0; attempt < 5 && !campaign; attempt++) {
      campaign = findCampaignByName(campaignName);
    }
    if (!campaign) throw new Error('Campaign ' + campaignName + ' was created via mutate but could not be read back by name.');
    STATS.campaigns++;
    log('Created campaign (PAUSED): ' + campaignName + ' — budget ₺' + CONFIG.BUDGETS[campaignName] + '/day, Maximize Conversions, networks = Google Search only (all set at creation via mutate). VERIFY in UI: network settings + Presence-only location options.');
    // Bidding was set at creation (maximizeConversions in the mutate op);
    // this documented call re-affirms it. Best-effort — if it fails, the
    // creation-time setting stands; verify in the UI before enabling.
    try { campaign.bidding().setStrategy('MAXIMIZE_CONVERSIONS'); log(campaignName + ': bidding = Maximize Conversions.'); }
    catch (e) { warn(campaignName + ': could not re-affirm Maximize Conversions from script (' + e + ') — it was set at creation; VERIFY in UI before enabling.'); }
  } else {
    // AdsApp.Campaign has no getStatus(); derive it from the is* methods.
    var statusDesc = campaign.isPaused() ? 'PAUSED' : (campaign.isEnabled() ? 'ENABLED' : (campaign.isRemoved() ? 'REMOVED' : 'UNKNOWN'));
    log('Campaign exists: ' + campaignName + ' (status ' + statusDesc + ') — filling gaps only.');
    if (!campaign.isPaused()) warn(campaignName + ' is NOT paused — this script never enables, but check before continuing.');
  }

  // Shared negative list on every campaign. (NegativeKeywordList has no
  // applyToCampaign(); the documented direction is Campaign.addNegativeKeywordList().)
  try { campaign.addNegativeKeywordList(negList); } catch (e) { warn('Applying ' + CONFIG.NEG_LIST_NAME + ' to ' + campaignName + ' failed: ' + e); }
  // Family-specific negatives (plan §6).
  if (family === 'G3') addCampaignNegatives(campaign, NEG_G3_ONLY[lang], 'G3-reservation');
  if (family === 'G2') addCampaignNegatives(campaign, NEG_G2_ONLY[lang], 'G2-order-intent');
  if (lang === 'AR') addCampaignNegatives(campaign, NEG_COMPETITORS_AR, 'AR-competitors');

  addGeoAndSchedule(campaign);
  attachAssets(campaign, lang);

  var groups = FAMILY_GROUPS[family];
  for (var g = 0; g < groups.length; g++) {
    if (timeUp()) { warn('Runtime guard hit inside ' + campaignName + ' — re-run the script; it resumes idempotently.'); return false; }
    var groupName = groups[g];
    var adGroup = findAdGroup(campaign, groupName);
    if (!adGroup) {
      adGroup = resultOf(campaign.newAdGroupBuilder().withName(groupName).withStatus('PAUSED').build());
      STATS.adGroups++;
      log('Created ad group (PAUSED): ' + campaignName + ' / ' + groupName);
    }
    buildKeywords(adGroup, KEYWORDS[campaignName][groupName], campaignName + ' / ' + groupName);
    buildAds(adGroup, RSA_COPY[lang][groupName], campaignName + ' / ' + groupName);
  }
  return true;
}

function countPlan() {
  var kw = 0;
  for (var c in KEYWORDS) for (var g in KEYWORDS[c]) kw += KEYWORDS[c][g].length;
  return kw;
}

function main() {
  log('=== Kardeşler Kebap — Ads BUILD (final plan) ===');
  log('Plan keywords total: ' + countPlan() + ' (expect 176).');
  if (!CONFIG.AUTHORIZED) {
    log('DRY RUN — CONFIG.AUTHORIZED is false. Nothing will be created.');
    log('Would build campaigns (ALL PAUSED): ' + CONFIG.LANGUAGES_TO_BUILD.map(function (l) { return 'KBS-G2-' + l + ', KBS-G3-' + l; }).join(', '));
    log('Would create negative list ' + CONFIG.NEG_LIST_NAME + ' with ' + NEG_SHARED.length + ' phrase negatives, applied to all 6 campaigns.');
    for (var b in CONFIG.BUDGETS) log('  Budget (PAUSED): ' + b + ' = ₺' + CONFIG.BUDGETS[b] + '/day — 09:00–02:00');
    log('Set CONFIG.AUTHORIZED = true and re-run (Preview first, then Run) to build — ALL campaigns PAUSED.');
    return;
  }
  var negList = getOrCreateNegativeList();
  var order = [];
  for (var i = 0; i < CONFIG.LANGUAGES_TO_BUILD.length; i++) {
    order.push('KBS-G2-' + CONFIG.LANGUAGES_TO_BUILD[i]);
    order.push('KBS-G3-' + CONFIG.LANGUAGES_TO_BUILD[i]);
  }
  for (var j = 0; j < order.length; j++) {
    if (timeUp()) { warn('Runtime guard hit before ' + order[j] + ' — re-run to continue (idempotent).'); break; }
    if (!buildCampaign(order[j], negList)) break;
  }
  log('=== BUILD SUMMARY ===');
  log('Campaigns created: ' + STATS.campaigns + ' | Ad groups created: ' + STATS.adGroups +
      ' | Keywords added: ' + STATS.keywords + ' | RSAs built: ' + STATS.ads +
      ' | Shared negatives added: ' + STATS.negListEntries + ' | Campaign negatives added: ' + STATS.campaignNegs +
      ' | Assets attached: ' + STATS.assets + ' | Ad schedules added: ' + STATS.schedules);
  log('Everything built is PAUSED. Nothing was enabled. No bids were changed beyond initial Maximize Conversions.');
  log('MANUAL BEFORE SPENDING (plan §12): link GBP location asset + confirm Approved; verify call reporting OFF; verify Presence-only location options; add ≥4 image assets per campaign; business name/logo assets; observation audiences; human review of the paused campaigns against FINAL-ADS-PLAN.md.');
  log('No breakfast campaigns exist in this build — breakfast was cancelled from paid search by the owner (2026-11-25) and stays organic only. G2 family = ₺400/day, G3 family = ₺300/day.');
  if (STATS.warnings.length) { log('Warnings (' + STATS.warnings.length + '):'); for (var w = 0; w < STATS.warnings.length; w++) log(' - ' + STATS.warnings[w]); }
}
