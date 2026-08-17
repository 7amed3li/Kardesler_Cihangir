const fs = require('fs');

const path = 'c:/Users/Hp/kardeshler/src/i18n/breakfastTranslations.js';
let content = fs.readFileSync(path, 'utf8');

// I will just completely overwrite the file since it's easier to maintain structure,
// but wait, I don't want to lose the user's modifications (like price changes).
// Actually, earlier I noted that I will use a Node script to replace the specific fields.
// But writing the translations for 10 languages inside the string replace is very long.

// Let's use string replace for English, Arabic, Turkish, Russian, Persian, French, German, Italian, Spanish, Chinese.

const newDirections = {
  en: {
    nearbyText: `Kardeşler is located in Cihangir, a peaceful escape right next to the bustling city center. We are perfectly positioned for tourists exploring Istanbul, located just a stone's throw away from Taksim Square, İstiklal Street, Galata, Karaköy, Şişhane, and Dolmabahçe Palace.`,
    faqQ: `How do I get to the restaurant from Taksim, Galata, or Karaköy?`,
    faqA: `
      <br><strong>From Taksim Square:</strong> Put the Republic Monument behind you and walk towards the Burger King and Taksim Hospital. Continue down this street (passing the Romanian Consulate). After about 5 minutes, you will see a large pharmacy on the left corner; turn left there and our restaurant is right in front of you.
      <br><strong>From İstiklal Street:</strong> Walk to the wide Taksim Square. Turn right towards the taxi rank and walk down the street parallel to the Bosphorus for 7 minutes until you reach quiet Cihangir. We'll be on the corner.
      <br><strong>From Galata Tower:</strong> Take your photos, then walk up to Şişhane Square. Take the M2 Metro one stop to Taksim, or enjoy walking the full length of İstiklal Street to reach us.
      <br><strong>From Karaköy & Galataport:</strong> Take the blue T1 Tram towards Kabataş and get off at Tophane. Cross the street and walk up the short, cobbled hill (beside Kılıç Ali Paşa Mosque) right into Cihangir.
      <br><strong>From Dolmabahçe Palace:</strong> Walk 2 mins to Kabataş station, take the Funicular (F1) for a 3-minute ride directly to Taksim Square, then take a pleasant walk down to us.
    `
  },
  ar: {
    nearbyText: `يقع كارديشلر في جيهانكير، ويوفر ملاذاً هادئاً بجوار وسط المدينة الصاخب. يتمتع مطعمنا بموقع مثالي للسياح، حيث يقع على مرمى حجر من ميدان تقسيم، شارع الاستقلال، غلاطة، كاراكوي، شيشهانه، وقصر دولمة بهتشه.`,
    faqQ: `كيف أصل للمطعم من تقسيم، غلاطة، أو كاراكوي؟`,
    faqA: `
      <br><strong>من ميدان تقسيم:</strong> اجعل نصب الجمهورية خلفك، وامشِ باتجاه مطعم Burger King ومستشفى تقسيم. استمر بالمشي في هذا الشارع (ستمر بجوار القنصلية الرومانية). بعد 5 دقائق، ستجد صيدلية كبيرة على الزاوية اليسرى، انعطف يساراً لتجدنا أمامك.
      <br><strong>من شارع الاستقلال:</strong> امشِ حتى تصل إلى ساحة تقسيم. اتجه يميناً وانزل في الشارع الموازي للبسفور لمدة 7 دقائق حتى تصل إلى حي جيهانكير.
      <br><strong>من برج غلاطة:</strong> امشِ صعوداً إلى ميدان شيشهانه. خذ المترو M2 لمحطة واحدة إلى تقسيم، أو استمتع بعبور شارع الاستقلال كاملاً.
      <br><strong>من كاراكوي وغلاطة بورت:</strong> اركب الترام الأزرق (T1) وانزل في محطة توبهانة. اعبر الشارع واصعد التل القصير المرصوف بالحصى (بجوار مسجد كليتش علي باشا) لتجد نفسك أمام مطعمنا.
      <br><strong>من قصر دولمة بهتشه:</strong> امشِ إلى محطة كاباتاش، واركب القطار الجبلي (Funicular) لـ 3 دقائق إلى ساحة تقسيم، ومن هناك امشِ نزولاً إلينا.
    `
  },
  tr: {
    nearbyText: `Kardeşler, hareketli şehir merkezinin hemen yanında huzurlu bir kaçış noktası olan Cihangir'de yer almaktadır. Turistler için mükemmel bir konumdayız; Taksim Meydanı, İstiklal Caddesi, Galata, Karaköy, Şişhane ve Dolmabahçe Sarayı'na çok yakınız.`,
    faqQ: `Taksim, Galata veya Karaköy'den restorana nasıl gelebilirim?`,
    faqA: `
      <br><strong>Taksim Meydanı'ndan:</strong> Cumhuriyet Anıtı'nı arkanıza alın ve Burger King ile Taksim İlk Yardım Hastanesi'ne doğru yürüyün. Bu caddeden (Romanya Konsolosluğu'nu geçerek) devam edin. Yaklaşık 5 dakika sonra sol köşede büyük bir eczane göreceksiniz; oradan sola dönün, restoranımız tam karşınızda.
      <br><strong>İstiklal Caddesi'nden:</strong> Geniş Taksim Meydanı'na yürüyün. Taksi durağına doğru sağa dönün ve Boğaz'a paralel caddeden 7 dakika yürüyerek sakin Cihangir'e ulaşın. Köşede biz olacağız.
      <br><strong>Galata Kulesi'nden:</strong> Şişhane Meydanı'na kadar yürüyün. M2 Metrosu ile bir durak Taksim'e gidebilir veya İstiklal Caddesi'ni boydan boya yürüyerek bize ulaşabilirsiniz.
      <br><strong>Karaköy & Galataport'tan:</strong> Mavi T1 Tramvayı ile Kabataş yönüne gidin ve Tophane'de inin. Karşıya geçin ve Kılıç Ali Paşa Camii'nin yanındaki parke taşlı kısa yokuşu çıkarak Cihangir'in kalbine gelin.
      <br><strong>Dolmabahçe Sarayı'ndan:</strong> Kabataş istasyonuna 2 dakika yürüyün, Taksim Meydanı'na 3 dakikalık Füniküler (F1) yolculuğu yapın, ardından bize doğru keyifli bir yürüyüş yapın.
    `
  },
  ru: {
    nearbyText: `Kardeşler расположен в Джихангире, в тихом уголке рядом с шумным центром. Мы идеально расположены для туристов — в двух шагах от площади Таксим, улицы Истикляль, Галаты, Каракёя, Шишхане и дворца Долмабахче.`,
    faqQ: `Как добраться из Таксима, Галаты или Каракёя?`,
    faqA: `
      <br><strong>От площади Таксим:</strong> Встаньте спиной к монументу Республики и идите в сторону Burger King. Продолжайте идти по этой улице (мимо румынского консульства). Через 5 минут вы увидите большую аптеку на левом углу; поверните налево, и наш ресторан будет прямо перед вами.
      <br><strong>С улицы Истикляль:</strong> Дойдите до площади Таксим. Поверните направо к стоянке такси и идите 7 минут по улице, параллельной Босфору, до Джихангира.
      <br><strong>От Галатской башни:</strong> Дойдите до площади Шишхане. Сядьте на метро (M2) до Таксима (1 остановка) или прогуляйтесь по всей Истикляль.
      <br><strong>От Каракёя и Галатапорта:</strong> Сядьте на трамвай T1 и выйдите на остановке Tophane. Перейдите дорогу и поднимитесь по короткому холму (рядом с мечетью Кылыч Али-паши) прямо в Джихангир.
      <br><strong>От дворца Долмабахче:</strong> Дойдите до станции Кабаташ, сядьте на фуникулер (F1) до Таксима (3 минуты), затем спуститесь к нам.
    `
  },
  fa: {
    nearbyText: `کاردشلر در جیهانگیر واقع شده است، یک فرار آرام درست در کنار مرکز شلوغ شهر. ما در موقعیتی عالی برای گردشگران قرار داریم، تنها چند قدم دورتر از میدان تقسیم، خیابان استقلال، گالاتا، کاراکوی، شیشهانه و کاخ دلمه باغچه.`,
    faqQ: `چگونه از تقسیم، گالاتا یا کاراکوی به رستوران بیایم؟`,
    faqA: `
      <br><strong>از میدان تقسیم:</strong> بنای یادبود جمهوری را پشت سر بگذارید و به سمت Burger King حرکت کنید. در این خیابان ادامه دهید (با عبور از کنسولگری رومانی). بعد از ۵ دقیقه یک داروخانه بزرگ می‌بینید؛ به چپ بپیچید و ما آنجا هستیم.
      <br><strong>از خیابان استقلال:</strong> تا میدان تقسیم قدم بزنید. به راست بپیچید و ۷ دقیقه در خیابان موازی با بسفر راه بروید تا به جیهانگیر آرام برسید.
      <br><strong>از برج گالاتا:</strong> تا میدان شیشهانه بروید. با مترو M2 یک ایستگاه تا تقسیم بروید یا کل خیابان استقلال را پیاده‌روی کنید.
      <br><strong>از کاراکوی و گالاتاپورت:</strong> سوار تراموا T1 شوید و در Tophane پیاده شوید. از خیابان رد شوید و از تپه سنگفرش شده (کنار مسجد قلیچ علی پاشا) بالا بروید تا به جیهانگیر برسید.
      <br><strong>از کاخ دلمه‌باغچه:</strong> تا ایستگاه کاباتاش بروید، با قطار کابلی (F1) در ۳ دقیقه به تقسیم بروید و سپس به سمت ما قدم بزنید.
    `
  },
  fr: {
    nearbyText: `Kardeşler est situé à Cihangir, une escapade paisible juste à côté du centre-ville animé. Nous sommes idéalement positionnés pour les touristes, à quelques pas de la place Taksim, de la rue İstiklal, de Galata, de Karaköy, de Şişhane et du palais de Dolmabahçe.`,
    faqQ: `Comment venir depuis Taksim, Galata ou Karaköy ?`,
    faqA: `
      <br><strong>Depuis la place Taksim :</strong> Laissez le Monument de la République derrière vous et marchez vers le Burger King. Continuez dans cette rue (en passant le consulat de Roumanie). Après 5 minutes, vous verrez une grande pharmacie sur la gauche ; tournez à gauche et vous nous trouverez.
      <br><strong>Depuis la rue İstiklal :</strong> Marchez jusqu'à la place Taksim. Tournez à droite vers les taxis et marchez 7 minutes pour atteindre le calme de Cihangir.
      <br><strong>Depuis la tour de Galata :</strong> Montez jusqu'à la place Şişhane. Prenez le métro M2 jusqu'à Taksim, ou profitez d'une promenade sur İstiklal.
      <br><strong>Depuis Karaköy & Galataport :</strong> Prenez le tram T1 et descendez à Tophane. Traversez la rue et montez la petite colline pavée (à côté de la mosquée Kılıç Ali Paşa).
      <br><strong>Depuis le palais de Dolmabahçe :</strong> Allez à la station Kabataş, prenez le funiculaire (F1) jusqu'à Taksim (3 min), puis descendez vers nous.
    `
  },
  de: {
    nearbyText: `Kardeşler liegt in Cihangir, einem ruhigen Rückzugsort direkt neben dem lebhaften Stadtzentrum. Wir sind ideal für Touristen gelegen, nur einen Katzensprung von Taksim-Platz, İstiklal-Straße, Galata, Karaköy, Şişhane und dem Dolmabahçe-Palast entfernt.`,
    faqQ: `Wie komme ich von Taksim, Galata oder Karaköy zum Restaurant?`,
    faqA: `
      <br><strong>Vom Taksim-Platz:</strong> Lassen Sie das Republikdenkmal hinter sich und gehen Sie in Richtung Burger King. Folgen Sie dieser Straße (vorbei am rumänischen Konsulat). Nach 5 Minuten sehen Sie links eine große Apotheke; biegen Sie links ab und Sie finden uns.
      <br><strong>Von der İstiklal-Straße:</strong> Gehen Sie zum Taksim-Platz. Biegen Sie rechts zu den Taxis ab und gehen Sie 7 Minuten, bis Sie das ruhige Cihangir erreichen.
      <br><strong>Vom Galata-Turm:</strong> Gehen Sie zum Şişhane-Platz. Nehmen Sie die Metro M2 zum Taksim, oder spazieren Sie die İstiklal-Straße entlang.
      <br><strong>Von Karaköy & Galataport:</strong> Nehmen Sie die Tram T1 bis Tophane. Überqueren Sie die Straße und gehen Sie den kurzen Kopfsteinpflasterhügel (neben der Kılıç Ali Paşa Moschee) hinauf nach Cihangir.
      <br><strong>Vom Dolmabahçe-Palast:</strong> Gehen Sie zur Station Kabataş, nehmen Sie die Standseilbahn (F1) zum Taksim (3 Min) und spazieren Sie dann zu uns hinunter.
    `
  },
  it: {
    nearbyText: `Kardeşler si trova a Cihangir, una tranquilla via di fuga proprio accanto al vivace centro città. Siamo in posizione perfetta per i turisti, a due passi da Piazza Taksim, Via İstiklal, Galata, Karaköy, Şişhane e Palazzo Dolmabahçe.`,
    faqQ: `Come arrivo da Taksim, Galata o Karaköy?`,
    faqA: `
      <br><strong>Da Piazza Taksim:</strong> Mettiti il Monumento alla Repubblica alle spalle e cammina verso Burger King. Continua su questa strada (passando il consolato rumeno). Dopo 5 minuti vedrai una grande farmacia sulla sinistra; gira a sinistra e ci troverai.
      <br><strong>Da Via İstiklal:</strong> Cammina fino a Piazza Taksim. Gira a destra verso i taxi e cammina per 7 minuti fino a raggiungere la tranquilla Cihangir.
      <br><strong>Dalla Torre di Galata:</strong> Sali fino a Piazza Şişhane. Prendi la Metro M2 per Taksim, oppure fai una passeggiata lungo l'İstiklal.
      <br><strong>Da Karaköy e Galataport:</strong> Prendi il tram T1 e scendi a Tophane. Attraversa la strada e sali la breve collina acciottolata (vicino alla moschea Kılıç Ali Paşa).
      <br><strong>Dal Palazzo Dolmabahçe:</strong> Vai alla stazione di Kabataş, prendi la funicolare (F1) per Taksim (3 min), quindi scendi verso di noi.
    `
  },
  es: {
    nearbyText: `Kardeşler está ubicado en Cihangir, un escape tranquilo justo al lado del bullicioso centro de la ciudad. Estamos perfectamente posicionados para los turistas, a un paso de la Plaza Taksim, la calle İstiklal, Galata, Karaköy, Şişhane y el Palacio Dolmabahçe.`,
    faqQ: `¿Cómo llego desde Taksim, Galata o Karaköy?`,
    faqA: `
      <br><strong>Desde la Plaza Taksim:</strong> Deja el Monumento a la República a tu espalda y camina hacia Burger King. Sigue por esta calle (pasando el consulado rumano). Después de 5 minutos verás una farmacia grande a la izquierda; gira a la izquierda y nos encontrarás.
      <br><strong>Desde la calle İstiklal:</strong> Camina hasta la Plaza Taksim. Gira a la derecha hacia los taxis y camina 7 minutos hasta llegar a la tranquila Cihangir.
      <br><strong>Desde la Torre de Gálata:</strong> Sube hasta la Plaza Şişhane. Toma el metro M2 hasta Taksim, o disfruta caminando por İstiklal.
      <br><strong>Desde Karaköy y Galataport:</strong> Toma el tranvía T1 y bájate en Tophane. Cruza la calle y sube la pequeña colina adoquinada (junto a la mezquita Kılıç Ali Paşa).
      <br><strong>Desde el Palacio Dolmabahçe:</strong> Ve a la estación de Kabataş, toma el funicular (F1) hasta Taksim (3 min) y luego baja hacia nosotros.
    `
  },
  zh: {
    nearbyText: `Kardeşler 位于奇杭吉尔，是繁华市中心旁的一处宁静之地。我们的位置非常适合游客，距离塔克西姆广场、独立大街、加拉太、卡拉柯伊、希希哈内和多尔玛巴赫切宫仅一步之遥。`,
    faqQ: `如何从塔克西姆、加拉太或卡拉柯伊到达餐厅？`,
    faqA: `
      <br><strong>从塔克西姆广场：</strong> 背对共和国纪念碑，朝汉堡王方向走。沿着这条街走（经过罗马尼亚领事馆）。5分钟后，您会在左边看到一家大药房；向左转，我们就在您面前。
      <br><strong>从独立大街：</strong> 步行到塔克西姆广场。向右转朝出租车站方向走，步行7分钟即可到达安静的奇杭吉尔。
      <br><strong>从加拉太塔：</strong> 走到希希哈内广场。乘坐M2地铁到塔克西姆，或沿着独立大街步行。
      <br><strong>从卡拉柯伊和加拉达港：</strong> 乘坐T1电车在Tophane下车。过马路，沿着鹅卵石小山（Kılıç Ali Paşa清真寺旁）走上去。
      <br><strong>从多尔玛巴赫切宫：</strong> 步行到Kabataş站，乘坐缆车（F1）3分钟即可到达塔克西姆，然后步行前往我们餐厅。
    `
  }
};

let modifiedContent = content;

Object.keys(newDirections).forEach(lang => {
  const t = newDirections[lang];
  // Replace nearbyText using regex
  // Find `nearbyText: "..."` or `nearbyText: '...'` or `nearbyText: `...``
  const nearbyRegex = new RegExp(`(nearbyText\\s*:\\s*)(['"\`])(.*?)\\2`, 's');
  // First locate the block for the specific language
  const blockRegex = new RegExp(`(${lang}\\s*:\\s*{)(.*?)(^\\s*},?\\s*$|(?=^\\s*[a-z]+\\s*:\\s*{))`, 'ims');
  
  const blockMatch = modifiedContent.match(blockRegex);
  if (blockMatch) {
    let blockContent = blockMatch[2];
    
    // Replace nearbyText
    blockContent = blockContent.replace(nearbyRegex, `$1\`${t.nearbyText}\``);
    
    // Replace FAQ. Specifically the one talking about "How do I get..." or "كيف أصل"
    // We will just find the question that contains "Taksim" in the FAQ array and replace its q and a
    const faqArrayRegex = /(faq\s*:\s*\[)(.*?)(\]\s*,?)/s;
    const faqArrayMatch = blockContent.match(faqArrayRegex);
    if (faqArrayMatch) {
      let faqArray = faqArrayMatch[2];
      // Regex to find the object in the array that has a 'q' containing Taksim or تقسيم or Taksim or ...
      // Instead of complex parsing, since we know it's the 5th FAQ (index 4) usually, let's just parse the FAQs, update the specific one, and stringify
      // Actually, standard regex replacement is safer if we just match the specific known strings.
      // Or we can just use `eval` to read it, modify the JS object, but we want to retain formatting.
      // Let's do a simple regex that matches the FAQ object containing "Taksim" or "تقسيم" or "Таксим" or "تقسیم" or "塔克西姆"
      
      const taksimQRegex = /\{\s*q\s*:\s*['"`]([^'"`]*(Taksim|تقسيم|Таксим|تقسیم|塔克西姆)[^'"`]*)['"`]\s*,\s*a\s*:\s*['"`](.*?)['"`]\s*\}/gs;
      faqArray = faqArray.replace(taksimQRegex, (match, q, taksim, a) => {
        return `{
      q: \`${t.faqQ}\`,
      a: \`${t.faqA}\`
    }`;
      });
      
      blockContent = blockContent.replace(faqArrayRegex, `$1${faqArray}$3`);
    }
    
    modifiedContent = modifiedContent.replace(blockRegex, `$1${blockContent}$3`);
  }
});

fs.writeFileSync(path, modifiedContent, 'utf8');
console.log("Updated breakfastTranslations.js with detailed visual landmark directions.");
