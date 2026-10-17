import fs from 'fs';
import path from 'path';

const i18nDir = path.resolve('src/i18n/menu');

const newTranslations = {
  hunkarbegendi: {
    tr: { name: "Hünkâr Beğendi", desc: "170 gr. Kadifemsi közlenmiş patlıcan püresi üzerinde tereyağlı kuzu eti parçaları." },
    en: { name: "Hünkâr Beğendi", desc: "170 gr. Tender sautéed meat served on a bed of velvety smoked eggplant puree." },
    ar: { name: "Hünkâr Beğendi", desc: "هونكار بيغندي — 170 غرام قطع لحم طرية بالسمن تقدم فوق مهروس الباذنجان المشوي المخملي" },
    de: { name: "Hünkâr Beğendi", desc: "170 g Zartes Fleisch auf samtigem Auberginenpüree." },
    es: { name: "Hünkâr Beğendi", desc: "170 g Trozos de carne tierna sobre puré de berenjena ahumada." },
    fa: { name: "Hünkâr Beğendi", desc: "هونکار بیندی — 170 گرم گوشت تفت داده شده با کره روی پوره بادمجان کبابی مخملی" },
    fr: { name: "Hünkâr Beğendi", desc: "170 g Morceaux de viande fondante sur une purée d'aubergines fumées." },
    it: { name: "Hünkâr Beğendi", desc: "170 g Bocconcini di carne tenera su purea vellutata di melanzane affumicate." },
    ru: { name: "Hünkâr Beğendi", desc: "170 г Нежные кусочки мяса на подушке из бархатистого пюре из печеных баклажанов." },
    zh: { name: "Hünkâr Beğendi", desc: "苏丹之喜 — 170克 慢炖嫩肉搭配丝滑烟熏茄子泥。" }
  },
  adana_kuzu_sis_kebap: {
    tr: { name: "Adana & Kuzu Şiş Kebap", desc: "350 gr. Adana kebap ve kuzu şiş kombinasyonu; meşe kömüründe pişirilmiş iki farklı lezzetin bir arada sunumu." },
    en: { name: "Adana & Lamb Shish Kebab", desc: "350 gr. Combo of Adana kebab and grilled lamb skewers cooked over oak charcoal." },
    ar: { name: "Adana & Kuzu Şiş Kebap", desc: "كباب أضنة وشيش لحم غنم — 350 غرام تشكيلة من كباب أضنة وشيش لحم الخروف المشوي على الفحم" },
    de: { name: "Adana & Lammspieß Kebab", desc: "350 g Kombination aus Adana Kebab und gegrilltem Lammspieß über Holzkohle." },
    es: { name: "Kebab Adana y Brocheta de Cordero", desc: "350 g Combinación de kebab Adana y brocheta de cordero a la brasa." },
    fa: { name: "Adana & Kuzu Şiş Kebap", desc: "کباب آدانا و شیش بره — 350 گرم ترکیب کباب آدانا و کباب چنجه بره روی زغال" },
    fr: { name: "Kebab Adana & Brochette d'Agneau", desc: "350 g Combinaison de kebab Adana et brochette d'agneau grillée au charbon." },
    it: { name: "Kebab Adana e Spiedini d'Agnello", desc: "350 g Combinazione di Adana kebab e spiedino d'agnello cotti alla brace." },
    ru: { name: "Адана и Шашлык из Баранины", desc: "350 г Сочетание кебаба Адана и шашлыка из баранины на углях." },
    zh: { name: "阿达纳烤肉配羊肉串烤肉", desc: "350克 阿达纳烤肉碎肉与炭烤嫩羊肉串拼盘。" }
  },
  adana_tavuk_sis_kebap: {
    tr: { name: "Adana & Tavuk Şiş Kebap", desc: "350 gr. Adana kebap ve tavuk şiş kombinasyonu; acılı kıyma ile marine edilmiş tavuk göğsünün kömür ızgara buluşması." },
    en: { name: "Adana & Chicken Shish Kebab", desc: "350 gr. Combo of spicy Adana kebab and marinated grilled chicken skewers." },
    ar: { name: "Adana & Tavuk Şiş Kebap", desc: "كباب أضنة وشيش طاووق — 350 غرام تشكيلة من كباب أضنة الحار وشيش طاووق الدجاج المتبل والمشوي على الفحم" },
    de: { name: "Adana & Hähnchenspieß Kebab", desc: "350 g Kombination aus scharfem Adana Kebab und mariniertem Hähnchenspieß." },
    es: { name: "Kebab Adana y Brocheta de Pollo", desc: "350 g Combinación de kebab Adana picante y brocheta de pollo marinada." },
    fa: { name: "Adana & Tavuk Şiş Kebap", desc: "کباب آدانا و جوجه کباب — 350 گرم ترکیب کباب تند آدانا و جوجه کباب زعفرانی روی زغال" },
    fr: { name: "Kebab Adana & Brochette de Poulet", desc: "350 g Combinaison de kebab Adana épicé et brochette de poulet marinée." },
    it: { name: "Kebab Adana e Spiedini di Pollo", desc: "350 g Combinazione di Adana kebab speziato e spiedino di pollo marinato." },
    ru: { name: "Адана и Куриный Шашлык", desc: "350 г Сочетание кебаба Адана и нежного куриного шашлыка на углях." },
    zh: { name: "阿达纳烤肉配鸡肉串烤肉", desc: "350克 经典辣味阿达纳烤肉与腌制鸡肉串拼盘。" }
  },
  kuzu_tavuk_sis_kebap: {
    tr: { name: "Kuzu & Tavuk Şiş Kebap", desc: "350 gr. Kuzu şiş ve tavuk şiş kombinasyonu; iki farklı etin kömür ızgarada pişirilip bir tabakta sunulması." },
    en: { name: "Lamb & Chicken Shish Kebab", desc: "350 gr. Combo of tender lamb skewers and marinated chicken skewers." },
    ar: { name: "Kuzu & Tavuk Şiş Kebap", desc: "شيش لحم غنم وشيش طاووق — 350 غرام تشكيلة من شيش لحم الخروف وشيش طاووق الدجاج المشوي على الفحم" },
    de: { name: "Lamm- & Hähnchenspieß Kebab", desc: "350 g Kombination aus zartem Lammspieß und mariniertem Hähnchenspieß." },
    es: { name: "Brocheta de Cordero y Pollo", desc: "350 g Combinación de brocheta de cordero y brocheta de pollo a la brasa." },
    fa: { name: "Kuzu & Tavuk Şiş Kebap", desc: "کباب چنجه بره و جوجه کباب — 350 گرم ترکیب کباب بره لذیذ و جوجه کباب روی زغال" },
    fr: { name: "Brochettes d'Agneau et Poulet", desc: "350 g Combinaison de brochette d'agneau et brochette de poulet mariné." },
    it: { name: "Spiedini d'Agnello e Pollo", desc: "350 g Combinazione di teneri spiedini d'agnello e pollo marinato." },
    ru: { name: "Шашлык из Баранины и Курицы", desc: "350 г Ассорти из шашлыка из баранины и нежного куриного шашлыка." },
    zh: { name: "羊肉串配鸡肉串烤肉", desc: "350克 嫩羊肉串与炭烤香脆鸡肉串双拼。" }
  },
  vejetaryen_vegan_tabagi: {
    tr: { name: "Vejetaryen & Vegan Tabağı", desc: "Çeşitli zeytinyağlı mezeler, közlenmiş sebzeler ve taze garnitürlerle zengin vegan tabağı." },
    en: { name: "Vegetarian & Vegan Platter", desc: "Rich assortment of olive oil mezes, roasted vegetables, and fresh sides." },
    ar: { name: "Vejetaryen & Vegan Tabağı", desc: "طبق نباتي وفيجان مشكل — تشكيلة غنية من المقبلات الباردة بزيت الزيتون والخضار المشوية الطازجة" },
    de: { name: "Vegetarische & Vegane Platte", desc: "Reichhaltige Auswahl an Mezes mit Olivenöl und gegrilltem Gemüse." },
    es: { name: "Plato Vegetariano y Vegano", desc: "Selección variada de mezzes en aceite de oliva y verduras asadas." },
    fa: { name: "بشقاب گیاهی و وگان", desc: "بشقاب متنوع از مزه‌های روغن زیتونی و سبزیجات کبابی تازه" },
    fr: { name: "Assiette Végétarienne & Végane", desc: "Assortiment de mezzés à l'huile d'olive et légumes grillés." },
    it: { name: "Piatto Vegetariano e Vegano", desc: "Ricco assortimento di antipasti all'olio d'oliva e verdure grigliate." },
    ru: { name: "Вегетарианское и Веганское Ассорти", desc: "Богатое ассорти из мезе на оливковом масле и запеченных овощей." },
    zh: { name: "素食与纯素拼盘", desc: "精选橄榄油冷盘小吃、炭烤蔬菜与新鲜配菜拼盘。" }
  },
  pastirma_kavurmali_kasarli_pide: {
    tr: { name: "Pastırma Kavurmalı Kaşarlı Pide", desc: "Çıtır hamur üzerinde özel Kayseri pastırması, Rize kavurması ve erimiş kaşar peyniri." },
    en: { name: "Pastırma, Kavurma & Cheese Pide", desc: "Crispy pide topped with seasoned pastırma, roasted beef kavurma, and melted kashar cheese." },
    ar: { name: "Pastırma Kavurmalı Kaşarlı Pide", desc: "فطيرة بسطرمة وقاورما بالجبن — فطيرة تركية مقرمشة مغطاة بالبسطرمة الفاخرة، لحم القاورما وجبن القشقوان الذائب" },
    de: { name: "Pide mit Pastırma, Kavurma & Käse", desc: "Knuspriges Pide belegt mit Pastırma, Rinder-Kavurma und geschmolzenem Käse." },
    es: { name: "Pide de Pastırma, Kavurma y Queso", desc: "Pide crujiente con pastırma curado, carne kavurma y queso fundido." },
    fa: { name: "پیده با پاستورما، قاورمه و پنیر", desc: "پیده ترد سنتی با پاستورما، گوشت قاورمه و پنیر کاشار ذوب شده" },
    fr: { name: "Pidé au Pastırma, Kavurma & Fromage", desc: "Pidé croustillant garni de pastırma, viande kavurma et fromage fondu." },
    it: { name: "Pide con Pastırma, Kavurma e Formaggio", desc: "Pide croccante con pastırma, carne kavurma e formaggio fuso." },
    ru: { name: "Пиде с Бастурмой, Кавурмой и Сыром", desc: "Хрустящее пиде с бастурмой, тушеным мясом кавурма и расплавленным сыром." },
    zh: { name: "熏牛肉碎肉干酪皮德", desc: "酥脆皮德面饼搭配土耳其风干牛肉 (Pastırma)、炖牛肉与浓郁奶酪。" }
  },
  ispanakli_pide: {
    tr: { name: "Ispanaklı Pide", desc: "Taze ıspanak, soğan ve özel baharatlarla fırınlanmış nefis pide." },
    en: { name: "Spinach Pide", desc: "Stone-baked pide filled with fresh seasoned spinach and onions." },
    ar: { name: "Ispanaklı Pide", desc: "فطيرة بالسبانخ — فطيرة تركية طازجة مخبوزة في الفرن الحجري بالسبانخ الطازج والبصل والبهارات" },
    de: { name: "Spinat Pide", desc: "Im Steinofen gebackenes Pide mit frischem Spinat und Zwiebeln." },
    es: { name: "Pide de Espinacas", desc: "Pide al horno de piedra relleno de espinacas frescas y cebolla." },
    fa: { name: "پیده اسفناج", desc: "پیده تنوری سنتی با اسفناج تازه، پیاز و ادویه‌جات معطر" },
    fr: { name: "Pidé aux Épinards", desc: "Pidé cuit au four traditionnel garni d'épinards frais et oignons." },
    it: { name: "Pide agli Spinaci", desc: "Pide cotto nel forno a legna con spinaci freschi e cipolle." },
    ru: { name: "Пиде со Шпинатом", desc: "Традиционное пиде со свежим шпинатом, луком и специями из каменной печи." },
    zh: { name: "菠菜皮德", desc: "石炉现烤面饼，包裹鲜嫩菠菜、洋葱与秘制香料。" }
  },
  patatesli_pide: {
    tr: { name: "Patatesli Pide", desc: "Özel baharatlı patates püresi ile fırınlanmış yumuşacık lezzet." },
    en: { name: "Potato Pide", desc: "Stone-baked pide stuffed with seasoned mashed potato filling." },
    ar: { name: "Patatesli Pide", desc: "فطيرة بالبطاطس — فطيرة مقرمشة بحشوة البطاطس المتبلة بالأعشاب والبهارات" },
    de: { name: "Kartoffel Pide", desc: "Steinofen-Pide mit würziger Kartoffelfüllung." },
    es: { name: "Pide de Patata", desc: "Pide horneado relleno de suave puré de patata especiado." },
    fa: { name: "پیده سیب‌زمینی", desc: "پیده سنتی با پوره سیب‌زمینی طعم‌دار شده و ادویه‌های مخصوص" },
    fr: { name: "Pidé à la Pomme de Terre", desc: "Pidé doré au four garni d'une savoureuse purée de pommes de terre épicée." },
    it: { name: "Pide alle Patate", desc: "Pide ripieno di purè di patate speziato cotto al forno." },
    ru: { name: "Пиде с Картофелем", desc: "Пиде с нежной пряной картофельной начинкой из каменной печи." },
    zh: { name: "土豆皮德", desc: "烤制香脆面饼，包裹风味马铃薯泥馅料。" }
  },
  peymacun: {
    tr: { name: "Peymacun", desc: "Çıtır lahmacun hamuru üzerinde bol peynirli ve baharatlı özel lezzet." },
    en: { name: "Peymacun (Cheese Lahmacun)", desc: "Thin, crispy dough baked with a special melted cheese and herbs blend." },
    ar: { name: "Peymacun", desc: "بيماجون (لحم بعجين بالجبن) — عجينة رقيقة ومقرمشة مخبوزة بخليط الأجبان الغنية والأعشاب" },
    de: { name: "Peymacun (Käse-Lahmacun)", desc: "Dünner, knuspriger Teig mit einer feinen Käse- und Kräutermischung überbacken." },
    es: { name: "Peymacun (Lahmacun de Queso)", desc: "Masa fina y crujiente horneada con abundante mezcla de quesos y especias." },
    fa: { name: "پی‌ماجون (لحمعجون پنیری)", desc: "خمیر نازک و برشته با ترکیب لذیذ پنیر و سبزیجات معطر" },
    fr: { name: "Peymacun (Lahmacun au Fromage)", desc: "Pâte fine et croustillante cuite avec un mélange de fromages fondants et herbes." },
    it: { name: "Peymacun (Lahmacun al Formaggio)", desc: "Pasta sottile e croccante cotta al forno con formaggio fuso ed erbe aromatiche." },
    ru: { name: "Пеймаджун (Лахмаджун с Сыром)", desc: "Тонкое хрустящее тесто, запеченное с щедрой порцией ароматного сыра." },
    zh: { name: "芝士拉赫马琼 (Peymacun)", desc: "薄脆面饼搭配浓郁混合奶酪与香草烘烤而成。" }
  },
  kopogl: {
    tr: { name: "Köpoğlu", desc: "Közlenmiş patlıcan, biber ve sarımsaklı süzme yoğurt üzerine nefis domates sosu." },
    en: { name: "Köpoğlu", desc: "Roasted eggplant and peppers layered with garlic strained yogurt and rich tomato sauce." },
    ar: { name: "Köpoğlu", desc: "كوب أوغلو — باذنجان وفلفل مشوي مع لبن زبادي مصفى بالثوم وصلصة طماطم غنية" },
    de: { name: "Köpoğlu", desc: "Geröstete Auberginen und Paprika mit Knoblauch-Joghurt und aromatischer Tomatensauce." },
    es: { name: "Köpoğlu", desc: "Berenjenas y pimientos asados con yogur colado al ajo y salsa de tomate casera." },
    fa: { name: "کوپ‌اوغلو", desc: "بادمجان و فلفل کبابی با ماست چکیده سیردار و سس گوجه‌فرنگی خوش‌طعم" },
    fr: { name: "Köpoğlu", desc: "Aubergines et poivrons grillés avec yaourt égoutté à l'ail et sauce tomate maison." },
    it: { name: "Köpoğlu", desc: "Melanzane e peperoni arrostiti con yogurt greco all'aglio e salsa di pomodoro." },
    ru: { name: "Кёпоглу", desc: "Запеченные баклажаны и перцы с чесночным йогуртом и томатным соусом." },
    zh: { name: "烤茄子蒜香酸奶 (Köpoğlu)", desc: "烤茄子与彩椒搭配蒜香过滤酸奶及浓郁番茄酱。" }
  },
  saksuka: {
    tr: { name: "Şakşuka", desc: "Zeytinyağında sotelenmiş köz patlıcan, biber ve domates soslu geleneksel meze." },
    en: { name: "Şakşuka", desc: "Fried eggplants, zucchini, and peppers sautéed in rich garlic tomato sauce." },
    ar: { name: "Şakşuka", desc: "شكشوكة تركية — مكعبات الباذنجان والفلفل المقلية بزيت الزيتون والمغمورة بصلصة الطماطم والثوم" },
    de: { name: "Şakşuka", desc: "In Olivenöl gebratene Auberginen und Paprika in würziger Knoblauch-Tomatensauce." },
    es: { name: "Şakşuka", desc: "Berenjenas y pimientos fritos en aceite de oliva con salsa de tomate y ajo." },
    fa: { name: "شاک‌شوکا", desc: "بادمجان و فلفل سرخ‌شده در روغن زیتون با سس گوجه و سیر معطر" },
    fr: { name: "Şakşuka", desc: "Aubergines et poivrons sautés à l'huile d'olive dans une sauce tomate à l'ail." },
    it: { name: "Şakşuka", desc: "Melanzane e peperoni saltati in olio d'oliva con salsa di pomodoro all'aglio." },
    ru: { name: "Шакшука", desc: "Баклажаны и сладкий перец, обжаренные в оливковом масле с томатно-чесночным соусом." },
    zh: { name: "橄榄油茄子杂烩 (Şakşuka)", desc: "橄榄油慢炒茄子与甜椒，裹挟浓郁蒜香番茄汁。" }
  },
  yogurtlu_karamelize_sogan: {
    tr: { name: "Yoğurtlu Karamelize Soğan", desc: "Ağır ateşte karamelize edilmiş tatlı soğanlar ve süzme yoğurdun ipeksi uyumu." },
    en: { name: "Caramelized Onion with Yogurt", desc: "Sweet slow-caramelized onions blended with thick strained yogurt." },
    ar: { name: "Yoğurtlu Karamelize Soğan", desc: "لبن بالبصل المكرمل — بصل حلو مكرمل على نار هادئة ممزوج مع لبن زبادي مصفى كريمي وزيت الزيتون" },
    de: { name: "Karamellisierte Zwiebeln mit Joghurt", desc: "Süßlich karamellisierte Zwiebeln auf cremigem stichfestem Joghurt." },
    es: { name: "Cebolla Caramelizada con Yogur", desc: "Cebollas dulces caramelizadas a fuego lento sobre yogur cremoso." },
    fa: { name: "ماست و پیاز کاراملی", desc: "پیاز کاراملی شده شیرین همراه با ماست چکیده غلیظ و خامه‌ای" },
    fr: { name: "Oignons Caramélisés au Yaourt", desc: "Oignons doux caramélisés lentement mélangés à un yaourt épais et onctueux." },
    it: { name: "Cipolle Caramellate con Yogurt", desc: "Cipolle dolci caramellate a fuego lento con yogurt greco cremoso." },
    ru: { name: "Карамелизированный Лук с Йогуртом", desc: "Сладкий томленый карамелизированный лук с густым сливочным йогуртом." },
    zh: { name: "焦糖洋葱浓缩酸奶", desc: "慢火熬制焦糖洋葱与浓醇过滤酸奶的丝滑融合。" }
  }
};

const languages = ['tr', 'en', 'ar', 'de', 'es', 'fa', 'fr', 'it', 'ru', 'zh'];

for (const lang of languages) {
  const filePath = path.join(i18nDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (!data.items) {
    data.items = {};
  }

  for (const [key, trans] of Object.entries(newTranslations)) {
    // Clean up any accidentally placed root-level keys
    delete data[key];

    // Correctly place inside data.items[key]
    const val = trans[lang] || trans['en'];
    data.items[key] = val;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`Updated ${lang}.json items correctly with all 12 entries`);
}
