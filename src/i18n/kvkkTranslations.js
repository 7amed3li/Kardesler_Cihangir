// KVKK Aydınlatma Metni ve Gizlilik Politikası — full page content per locale.
// The Turkish text is the operative version (drafted per the KVKK compliance
// research, Art. 10 notice). The other locales are full translations of the
// same page and each carries the closing clause that the Turkish text
// prevails. The data controller is named in the text (business name first,
// then the owner, per the KVKK naming rule for a şahıs işletmesi).
// Contact e-mail is the business's published address
// (kardeslerkebappidesalonu@gmail.com). The business has no KEP address (KEP is
// not mandatory for a şahıs işletmesi), so no KEP channel is listed.
//
// Shape per locale:
// {
//   title,
//   sections: [{ heading, paragraphs: [], table?: { head: [], rows: [[]] }, after?: [] }],
//   prevailingNote?  (non-Turkish locales only)
// }

export const kvkkContent = {
  tr: {
    title: "KİŞİSEL VERİLERİN KORUNMASINA İLİŞKİN AYDINLATMA METNİ VE GİZLİLİK POLİTİKASI",
    sections: [
      {
        heading: "1. Veri Sorumlusu",
        paragraphs: [
          "Bu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun (“KVKK”) 10. maddesi uyarınca, veri sorumlusu sıfatıyla Kardeşler Kebap & Breakfast Cihangir - Istanbul işletmesinin sahibi Emine Berrak Songur (“İşletme”) tarafından hazırlanmıştır.",
          "Adres: Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul · Telefon: +90 543 923 36 96 · E-posta: kardeslerkebappidesalonu@gmail.com · Web sitesi: https://www.kardeslercihangir.com",
        ],
      },
      {
        heading: "2. İşlenen Kişisel Veriler, Toplama Yöntemi ve Hukuki Sebepler",
        paragraphs: [
          "Kişisel verileriniz, internet sitemizdeki sipariş ve rezervasyon formları aracılığıyla, tamamen otomatik yollarla elde edilmektedir.",
        ],
        table: {
          head: ["Veri kategorisi", "Veriler", "Amaç", "Hukuki sebep"],
          rows: [
            ["Kimlik ve iletişim", "Ad soyad, telefon numarası", "Siparişin/rezervasyonun alınması, teyidi ve sizinle iletişim", "KVKK m. 5/2-c (sözleşmenin kurulması ve ifası)"],
            ["Teslimat adresi", "İlçe, mahalle, adres detayı, sipariş notu", "Siparişin adresinize teslimi", "KVKK m. 5/2-c"],
            ["Sipariş bilgisi", "Sipariş içeriği, kapıda ödeme tercihiniz (nakit/kart)", "Siparişin hazırlanması ve teslimi", "KVKK m. 5/2-c"],
            ["Rezervasyon bilgisi", "Tarih, saat, kişi sayısı", "Rezervasyonunuzun oluşturulması", "KVKK m. 5/2-c"],
            ["Muhasebe kayıtları", "Fatura/fiş bilgileriniz", "Yasal defter ve belge düzeninin yürütülmesi", "KVKK m. 5/2-ç (hukuki yükümlülük)"],
            ["İşlem güvenliği", "IP adresi ve sunucu kayıtları (log)", "Sitenin güvenliği ve kötüye kullanımın önlenmesi", "KVKK m. 5/2-f (meşru menfaat)"],
          ],
        },
        after: [
          "Sitemizde kredi kartı bilgisi toplanmaz; ödeme, teslimat sırasında nakit veya kart ile tarafınızca yapılır.",
        ],
      },
      {
        heading: "3. Kişisel Verilerin Aktarılması",
        paragraphs: [
          "Yurt içi: Verileriniz, siparişin teslimini gerçekleştiren personelimiz dışında üçüncü kişilerle paylaşılmaz; yasal zorunluluk hâlinde yetkili kamu kurum ve kuruluşlarına aktarılabilir.",
          "Yurt dışı: Sipariş ve rezervasyon talepleriniz, kendi WhatsApp uygulamanız üzerinden işletmemizin WhatsApp hattına iletilmektedir. Bu iletim, WhatsApp hizmetini sunan Meta Platforms, Inc.'in yurt dışında bulunan sunucuları aracılığıyla gerçekleştiğinden, verileriniz yurt dışına aktarılmış olur. Sitemizin barındırma ve altyapı hizmetleri de yurt dışında sunuculara sahip hizmet sağlayıcılardan (barındırma: Vercel Inc.; veritabanı altyapısı: Supabase Inc.) alınmakta olup siteye erişiminiz sırasında IP adresiniz gibi teknik veriler bu sağlayıcılar tarafından işlenebilir. Bu aktarımlar, talebinizin karşılanması için zorunlu olduğu ölçüde ve KVKK'nın 9. maddesi çerçevesinde gerçekleştirilir.",
        ],
      },
      {
        heading: "4. Tarayıcınızda Saklanan Bilgiler",
        paragraphs: [
          "Bir sonraki siparişinizde kolaylık sağlamak amacıyla, doldurduğunuz adres bilgileri ve sepetiniz, yalnızca kendi cihazınızdaki tarayıcınızın yerel depolama alanında (localStorage) saklanır. Bu bilgiler işletmemizin sunucularına gönderilmez ve tarafımızca uzaktan erişilemez. Tarayıcınızın site verilerini temizleyerek veya sitedeki “Temizle” seçeneğini kullanarak bu kaydı dilediğiniz zaman silebilirsiniz.",
        ],
      },
      {
        heading: "5. Çerezler",
        paragraphs: [
          "Sitemizde yalnızca sitenin çalışması için zorunlu olan çerezler ve benzeri teknolojiler kullanılır; reklam veya pazarlama amacıyla çerez kullanılmamaktadır. Zorunlu çerezler, KVKK m. 5/2 kapsamında açık rızanıza tabi olmaksızın kullanılır. Zorunlu olmayan çerezlerin kullanılmaya başlanması hâlinde bu metin güncellenecek ve onayınız ayrıca alınacaktır.",
        ],
      },
      {
        heading: "6. Saklama Süreleri",
        paragraphs: [
          "Sipariş ve rezervasyona ilişkin kayıtlar, işlenme amaçlarının gerektirdiği süre boyunca ve ticari defter ve belgelere ilişkin yasal saklama süreleri (Türk Ticaret Kanunu m. 82 uyarınca 10 yıl) saklanır; sürenin sonunda silinir, yok edilir veya anonim hâle getirilir. WhatsApp yazışmaları, siparişin tamamlanması ve olası uyuşmazlıkların çözümü için gerekli süreyi aşmayacak şekilde periyodik olarak gözden geçirilir ve silinir.",
        ],
      },
      {
        heading: "7. Veri Güvenliği",
        paragraphs: [
          "Kişisel verilerinizin güvenliği için KVKK'nın 12. maddesi uyarınca uygun teknik ve idari tedbirler alınmaktadır: şifreli bağlantı (HTTPS), yetkilendirilmiş ve sınırlı erişim, güçlü parola ve iki aşamalı doğrulama, düzenli yedekleme ve erişim kayıtlarının tutulması bunlar arasındadır.",
        ],
      },
      {
        heading: "8. KVKK'nın 11. Maddesi Uyarınca Haklarınız",
        paragraphs: [
          "Kişisel verilerinizle ilgili olarak: (a) işlenip işlenmediğini öğrenme, (b) işlenmişse bilgi talep etme, (c) işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, (ç) yurt içinde/yurt dışında aktarıldığı üçüncü kişileri bilme, (d) eksik veya yanlış işlenmişse düzeltilmesini isteme, (e) KVKK m. 7 şartları çerçevesinde silinmesini veya yok edilmesini isteme, (f) düzeltme/silme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme, (g) münhasıran otomatik sistemlerle analiz sonucu aleyhinize bir sonuç doğmasına itiraz etme, (ğ) kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.",
        ],
      },
      {
        heading: "9. Başvuru Yöntemi",
        paragraphs: [
          "Haklarınızı kullanmak için talebinizi, kimliğinizi tevsik edici bilgilerle birlikte kardeslerkebappidesalonu@gmail.com adresine e-posta ile veya Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul adresine yazılı olarak iletebilirsiniz. Başvurularınız, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ uyarınca en geç 30 gün içinde ücretsiz olarak sonuçlandırılır; işlemin ayrıca bir maliyet gerektirmesi hâlinde Kurulca belirlenen tarifedeki ücret alınabilir.",
        ],
      },
      {
        heading: "10. Yürürlük",
        paragraphs: [
          "Bu metin https://www.kardeslercihangir.com adresinde yayımlandığı tarihte yürürlüğe girer; gerektiğinde güncellenir ve güncel sürüm her zaman bu sayfada yer alır.",
        ],
      },
    ],
  },

  en: {
    title: "INFORMATION NOTICE ON THE PROTECTION OF PERSONAL DATA AND PRIVACY POLICY",
    sections: [
      {
        heading: "1. Data Controller",
        paragraphs: [
          "This Information Notice has been prepared by Kardeşler Kebap & Breakfast Cihangir - Istanbul işletmesinin sahibi Emine Berrak Songur (the “Business”), as the data controller, pursuant to Article 10 of the Law on the Protection of Personal Data No. 6698 (“KVKK”).",
          "Address: Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul · Phone: +90 543 923 36 96 · E-mail: kardeslerkebappidesalonu@gmail.com · Website: https://www.kardeslercihangir.com",
        ],
      },
      {
        heading: "2. Personal Data Processed, Collection Method and Legal Grounds",
        paragraphs: [
          "Your personal data is obtained by fully automated means through the order and reservation forms on our website.",
        ],
        table: {
          head: ["Data category", "Data", "Purpose", "Legal ground"],
          rows: [
            ["Identity and contact", "Full name, phone number", "Receiving and confirming your order/reservation and communicating with you", "KVKK Art. 5/2-c (establishment and performance of a contract)"],
            ["Delivery address", "District, neighbourhood, address details, order note", "Delivering your order to your address", "KVKK Art. 5/2-c"],
            ["Order information", "Order contents, your pay-at-the-door preference (cash/card)", "Preparing and delivering your order", "KVKK Art. 5/2-c"],
            ["Reservation information", "Date, time, number of guests", "Creating your reservation", "KVKK Art. 5/2-c"],
            ["Accounting records", "Your invoice/receipt details", "Maintaining statutory books and records", "KVKK Art. 5/2-ç (legal obligation)"],
            ["Transaction security", "IP address and server logs", "Site security and prevention of misuse", "KVKK Art. 5/2-f (legitimate interests)"],
          ],
        },
        after: [
          "No credit card information is collected on our website; payment is made by you, in cash or by card, at the time of delivery.",
        ],
      },
      {
        heading: "3. Transfer of Personal Data",
        paragraphs: [
          "Within Türkiye: Your data is not shared with third parties other than our personnel who carry out the delivery of your order; it may be transferred to competent public institutions and organisations where legally required.",
          "Abroad: Your order and reservation requests are transmitted to our business's WhatsApp line through your own WhatsApp application. As this transmission takes place via the servers of Meta Platforms, Inc., which provides the WhatsApp service and which are located abroad, your data is thereby transferred abroad. Our website's hosting and infrastructure services are also obtained from service providers with servers abroad (hosting: Vercel Inc.; database infrastructure: Supabase Inc.), and technical data such as your IP address may be processed by these providers when you access the site. These transfers are carried out to the extent necessary to fulfil your request and within the framework of Article 9 of the KVKK.",
        ],
      },
      {
        heading: "4. Information Stored in Your Browser",
        paragraphs: [
          "To make your next order easier, the address information you enter and your cart are stored only in your own device's browser local storage (localStorage). This information is not sent to our servers and cannot be accessed by us remotely. You may delete this record at any time by clearing your browser's site data or by using the “Clear” option on the site.",
        ],
      },
      {
        heading: "5. Cookies",
        paragraphs: [
          "Our website uses only cookies and similar technologies that are strictly necessary for the operation of the site; no cookies are used for advertising or marketing purposes. Strictly necessary cookies are used within the scope of KVKK Art. 5/2 without being subject to your explicit consent. Should non-essential cookies come into use, this text will be updated and your consent will be obtained separately.",
        ],
      },
      {
        heading: "6. Retention Periods",
        paragraphs: [
          "Records relating to orders and reservations are retained for the period required by their processing purposes and for the statutory retention periods applicable to commercial books and documents (10 years under Article 82 of the Turkish Commercial Code); at the end of that period they are erased, destroyed or anonymised. WhatsApp correspondence is reviewed periodically and deleted so as not to exceed the period necessary for the completion of the order and the resolution of possible disputes.",
        ],
      },
      {
        heading: "7. Data Security",
        paragraphs: [
          "Appropriate technical and administrative measures are taken to ensure the security of your personal data pursuant to Article 12 of the KVKK: encrypted connection (HTTPS), authorised and limited access, strong passwords and two-factor authentication, regular backups and the keeping of access logs are among these measures.",
        ],
      },
      {
        heading: "8. Your Rights under Article 11 of the KVKK",
        paragraphs: [
          "With regard to your personal data, you have the right to: (a) learn whether it is processed, (b) request information if it has been processed, (c) learn the purpose of processing and whether it is used in accordance with that purpose, (d) know the third parties to whom it is transferred within the country or abroad, (e) request its correction if it has been processed incompletely or inaccurately, (f) request its erasure or destruction within the framework of the conditions in KVKK Art. 7, (g) request that correction/erasure operations be notified to the third parties to whom the data has been transferred, (h) object to a result arising to your detriment from analysis exclusively by automated systems, and (i) demand compensation for damages if you suffer damage due to unlawful processing.",
        ],
      },
      {
        heading: "9. How to Apply",
        paragraphs: [
          "To exercise your rights, you may send your request, together with information verifying your identity, by e-mail to kardeslerkebappidesalonu@gmail.com, or in writing to Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul. Your applications will be concluded free of charge within 30 days at the latest, in accordance with the Communiqué on the Procedures and Principles of Application to the Data Controller; if the transaction requires an additional cost, the fee in the tariff determined by the Board may be charged.",
        ],
      },
      {
        heading: "10. Entry into Force",
        paragraphs: [
          "This text enters into force on the date it is published at https://www.kardeslercihangir.com; it is updated when necessary and the current version is always available on this page.",
        ],
      },
    ],
    prevailingNote:
      "This page is a translation of the Turkish Information Notice (Aydınlatma Metni). In the event of any inconsistency or discrepancy between this translation and the Turkish text, the Turkish text shall prevail.",
  },

  ar: {
    title: "نص الإفصاح بشأن حماية البيانات الشخصية وسياسة الخصوصية",
    sections: [
      {
        heading: "1. المسؤول عن البيانات",
        paragraphs: [
          "أُعدّ نص الإفصاح هذا من قبل Kardeşler Kebap & Breakfast Cihangir - Istanbul işletmesinin sahibi Emine Berrak Songur (“المنشأة”)، بصفتها المسؤول عن البيانات، وفقاً للمادة 10 من قانون حماية البيانات الشخصية رقم 6698 (“KVKK”).",
          "العنوان: Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul · الهاتف: +90 543 923 36 96 · البريد الإلكتروني: kardeslerkebappidesalonu@gmail.com · الموقع الإلكتروني: https://www.kardeslercihangir.com",
        ],
      },
      {
        heading: "2. البيانات الشخصية المعالجة وطريقة جمعها وأسسها القانونية",
        paragraphs: [
          "يتم الحصول على بياناتك الشخصية بوسائل آلية بالكامل من خلال نماذج الطلب والحجز على موقعنا الإلكتروني.",
        ],
        table: {
          head: ["فئة البيانات", "البيانات", "الغرض", "الأساس القانوني"],
          rows: [
            ["الهوية والاتصال", "الاسم الكامل، رقم الهاتف", "استلام طلبك/حجزك وتأكيده والتواصل معك", "المادة 5/2-c من قانون KVKK (إبرام العقد وتنفيذه)"],
            ["عنوان التسليم", "المنطقة، الحي، تفاصيل العنوان، ملاحظة الطلب", "تسليم طلبك إلى عنوانك", "المادة 5/2-c من قانون KVKK"],
            ["معلومات الطلب", "محتوى الطلب، تفضيل الدفع عند الباب (نقداً/بالكرت)", "تحضير طلبك وتسليمه", "المادة 5/2-c من قانون KVKK"],
            ["معلومات الحجز", "التاريخ، الوقت، عدد الأشخاص", "إنشاء حجزك", "المادة 5/2-c من قانون KVKK"],
            ["السجلات المحاسبية", "بيانات الفاتورة/الإيصال الخاصة بك", "تنفيذ نظام الدفاتر والوثائق القانونية", "المادة 5/2-ç من قانون KVKK (التزام قانوني)"],
            ["أمن المعاملات", "عنوان IP وسجلات الخادم (log)", "أمن الموقع ومنع إساءة الاستخدام", "المادة 5/2-f من قانون KVKK (مصلحة مشروعة)"],
          ],
        },
        after: [
          "لا يتم جمع معلومات بطاقات الائتمان على موقعنا؛ يتم الدفع من قبلك نقداً أو بالكرت عند التسليم.",
        ],
      },
      {
        heading: "3. نقل البيانات الشخصية",
        paragraphs: [
          "داخل البلاد: لا تتم مشاركة بياناتك مع أطراف ثالثة بخلاف موظفينا الذين يقومون بتسليم طلبك؛ ويمكن نقلها إلى المؤسسات والهيئات العامة المختصة عند وجود التزام قانوني.",
          "خارج البلاد: تُرسل طلبات الطلب والحجز الخاصة بك إلى خط واتساب الخاص بمنشأتنا عبر تطبيق واتساب الخاص بك. وبما أن هذا الإرسال يتم عبر خوادم شركة Meta Platforms, Inc. التي تقدم خدمة واتساب والموجودة خارج البلاد، فإن بياناتك تُنقل بذلك إلى الخارج. كما يتم الحصول على خدمات الاستضافة والبنية التحتية لموقعنا من مزودي خدمات لديهم خوادم خارج البلاد (الاستضافة: Vercel Inc.؛ البنية التحتية لقاعدة البيانات: Supabase Inc.)، وقد تتم معالجة بيانات تقنية مثل عنوان IP الخاص بك من قبل هؤلاء المزودين عند دخولك إلى الموقع. تتم هذه النقلات بالقدر اللازم لتلبية طلبك وفي إطار المادة 9 من قانون KVKK.",
        ],
      },
      {
        heading: "4. المعلومات المخزنة في متصفحك",
        paragraphs: [
          "لتسهيل طلبك التالي، تُحفظ معلومات العنوان التي تدخلها وسلة التسوق الخاصة بك فقط في مساحة التخزين المحلية (localStorage) في متصفح جهازك. لا تُرسل هذه المعلومات إلى خوادمنا ولا يمكننا الوصول إليها عن بعد. يمكنك حذف هذا السجل في أي وقت عن طريق مسح بيانات الموقع من متصفحك أو باستخدام خيار “مسح” في الموقع.",
        ],
      },
      {
        heading: "5. ملفات تعريف الارتباط",
        paragraphs: [
          "يستخدم موقعنا فقط ملفات تعريف الارتباط والتقنيات المماثلة الضرورية لتشغيل الموقع؛ ولا تُستخدم أي ملفات تعريف ارتباط لأغراض الإعلان أو التسويق. تُستخدم ملفات تعريف الارتباط الضرورية في إطار المادة 5/2 من قانون KVKK دون أن تخضع لموافقتك الصريحة. وفي حال البدء باستخدام ملفات تعريف ارتباط غير ضرورية، سيتم تحديث هذا النص وطلب موافقتك بشكل منفصل.",
        ],
      },
      {
        heading: "6. مدد الاحتفاظ",
        paragraphs: [
          "تُحفظ السجلات المتعلقة بالطلبات والحجوزات للمدة التي تتطلبها أغراض المعالجة ولمدد الاحتفاظ القانونية المتعلقة بالدفاتر والوثائق التجارية (10 سنوات وفقاً للمادة 82 من قانون التجارة التركي)؛ وفي نهاية المدة تُمحى أو تُدمّر أو تُحوّل إلى مجهولة المصدر. تتم مراجعة مراسلات واتساب دورياً وحذفها بحيث لا تتجاوز المدة اللازمة لإتمام الطلب وحل النزاعات المحتملة.",
        ],
      },
      {
        heading: "7. أمن البيانات",
        paragraphs: [
          "تُتخذ التدابير التقنية والإدارية المناسبة لضمان أمن بياناتك الشخصية وفقاً للمادة 12 من قانون KVKK: الاتصال المشفر (HTTPS)، والوصول المصرح به والمحدود، وكلمات المرور القوية والمصادقة الثنائية، والنسخ الاحتياطي المنتظم والاحتفاظ بسجلات الوصول، من بين هذه التدابير.",
        ],
      },
      {
        heading: "8. حقوقك بموجب المادة 11 من قانون KVKK",
        paragraphs: [
          "فيما يتعلق ببياناتك الشخصية، لديك الحق في: (أ) معرفة ما إذا كانت تُعالج، (ب) طلب المعلومات إذا عولجت، (ج) معرفة الغرض من المعالجة وما إذا كانت تُستخدم وفقاً لذلك الغرض، (د) معرفة الأطراف الثالثة التي تُنقل إليها داخل البلاد أو خارجها، (هـ) طلب تصحيحها إذا عولجت بشكل ناقص أو غير صحيح، (و) طلب محوها أو تدميرها في إطار شروط المادة 7 من قانون KVKK، (ز) طلب إبلاغ عمليات التصحيح/المحو إلى الأطراف الثالثة التي نُقلت إليها البيانات، (ح) الاعتراض على نتيجة تنشأ ضدك من التحليل بواسطة الأنظمة الآلية حصراً، (ط) المطالبة بالتعويض عن الضرر إذا تعرضت لضرر بسبب معالجة غير قانونية.",
        ],
      },
      {
        heading: "9. طريقة التقديم",
        paragraphs: [
          "لممارسة حقوقك، يمكنك إرسال طلبك، مع المعلومات التي تثبت هويتك، عبر البريد الإلكتروني إلى kardeslerkebappidesalonu@gmail.com، أو كتابياً إلى Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul. تُنجز طلباتك مجاناً في غضون 30 يوماً كحد أقصى، وفقاً للبيان الخاص بإجراءات ومبادئ التقديم إلى المسؤول عن البيانات؛ وإذا تطلبت العملية تكلفة إضافية، يمكن تحصيل الرسوم الواردة في التعريفة التي يحددها المجلس.",
        ],
      },
      {
        heading: "10. النفاذ",
        paragraphs: [
          "يدخل هذا النص حيز النفاذ في تاريخ نشره على https://www.kardeslercihangir.com؛ ويُحدّث عند الحاجة وتتوفر النسخة الحالية دائماً على هذه الصفحة.",
        ],
      },
    ],
    prevailingNote:
      "هذه الصفحة ترجمة لنص الإفصاح التركي (Aydınlatma Metni). وفي حال وجود أي تعارض أو اختلاف بين هذه الترجمة والنص التركي، يُعتدّ بالنص التركي.",
  },

  de: {
    title: "AUFKLÄRUNGSTEXT ZUM SCHUTZ PERSONENBEZOGENER DATEN UND DATENSCHUTZERKLÄRUNG",
    sections: [
      {
        heading: "1. Verantwortlicher",
        paragraphs: [
          "Dieser Aufklärungstext wurde von Kardeşler Kebap & Breakfast Cihangir - Istanbul işletmesinin sahibi Emine Berrak Songur (das “Unternehmen”) als Verantwortlichem gemäß Art. 10 des Gesetzes Nr. 6698 zum Schutz personenbezogener Daten (“KVKK”) erstellt.",
          "Adresse: Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul · Telefon: +90 543 923 36 96 · E-Mail: kardeslerkebappidesalonu@gmail.com · Website: https://www.kardeslercihangir.com",
        ],
      },
      {
        heading: "2. Verarbeitete personenbezogene Daten, Erhebungsmethode und Rechtsgrundlagen",
        paragraphs: [
          "Ihre personenbezogenen Daten werden auf vollautomatisierte Weise über die Bestell- und Reservierungsformulare auf unserer Website erhoben.",
        ],
        table: {
          head: ["Datenkategorie", "Daten", "Zweck", "Rechtsgrundlage"],
          rows: [
            ["Identität und Kontakt", "Vollständiger Name, Telefonnummer", "Annahme und Bestätigung Ihrer Bestellung/Reservierung sowie Kommunikation mit Ihnen", "Art. 5/2-c KVKK (Begründung und Erfüllung eines Vertrags)"],
            ["Lieferadresse", "Stadtbezirk, Stadtteil, Adressdetails, Bestellnotiz", "Lieferung Ihrer Bestellung an Ihre Adresse", "Art. 5/2-c KVKK"],
            ["Bestellinformationen", "Bestellinhalt, Ihre Zahlungspräferenz an der Tür (bar/Karte)", "Zubereitung und Lieferung Ihrer Bestellung", "Art. 5/2-c KVKK"],
            ["Reservierungsinformationen", "Datum, Uhrzeit, Gästeanzahl", "Erstellung Ihrer Reservierung", "Art. 5/2-c KVKK"],
            ["Buchhaltungsunterlagen", "Ihre Rechnungs-/Belegdaten", "Führung der gesetzlichen Bücher und Unterlagen", "Art. 5/2-ç KVKK (rechtliche Verpflichtung)"],
            ["Transaktionssicherheit", "IP-Adresse und Serverprotokolle (Logs)", "Sicherheit der Website und Verhinderung von Missbrauch", "Art. 5/2-f KVKK (berechtigte Interessen)"],
          ],
        },
        after: [
          "Auf unserer Website werden keine Kreditkartendaten erhoben; die Zahlung erfolgt durch Sie bei der Lieferung in bar oder mit Karte.",
        ],
      },
      {
        heading: "3. Übermittlung personenbezogener Daten",
        paragraphs: [
          "Inland: Ihre Daten werden außer an unser Personal, das die Lieferung Ihrer Bestellung durchführt, nicht an Dritte weitergegeben; bei gesetzlicher Verpflichtung können sie an zuständige öffentliche Institutionen und Organisationen übermittelt werden.",
          "Ausland: Ihre Bestell- und Reservierungsanfragen werden über Ihre eigene WhatsApp-Anwendung an die WhatsApp-Nummer unseres Unternehmens übermittelt. Da diese Übermittlung über die im Ausland befindlichen Server der Meta Platforms, Inc., die den WhatsApp-Dienst bereitstellt, erfolgt, werden Ihre Daten dadurch ins Ausland übermittelt. Auch die Hosting- und Infrastrukturdienste unserer Website werden von Dienstanbietern mit Servern im Ausland bezogen (Hosting: Vercel Inc.; Datenbankinfrastruktur: Supabase Inc.), und technische Daten wie Ihre IP-Adresse können von diesen Anbietern verarbeitet werden, wenn Sie auf die Website zugreifen. Diese Übermittlungen erfolgen in dem zur Erfüllung Ihrer Anfrage erforderlichen Umfang und im Rahmen von Art. 9 KVKK.",
        ],
      },
      {
        heading: "4. In Ihrem Browser gespeicherte Informationen",
        paragraphs: [
          "Um Ihre nächste Bestellung zu erleichtern, werden die von Ihnen eingegebenen Adressinformationen und Ihr Warenkorb ausschließlich im lokalen Speicher (localStorage) des Browsers auf Ihrem eigenen Gerät gespeichert. Diese Informationen werden nicht an unsere Server gesendet und können von uns nicht aus der Ferne abgerufen werden. Sie können diesen Eintrag jederzeit löschen, indem Sie die Website-Daten Ihres Browsers löschen oder die Option “Leeren” auf der Website verwenden.",
        ],
      },
      {
        heading: "5. Cookies",
        paragraphs: [
          "Unsere Website verwendet nur Cookies und ähnliche Technologien, die für den Betrieb der Website unbedingt erforderlich sind; zu Werbe- oder Marketingzwecken werden keine Cookies verwendet. Unbedingt erforderliche Cookies werden im Rahmen von Art. 5/2 KVKK verwendet, ohne Ihrer ausdrücklichen Einwilligung zu unterliegen. Sollten nicht erforderliche Cookies zum Einsatz kommen, wird dieser Text aktualisiert und Ihre Einwilligung gesondert eingeholt.",
        ],
      },
      {
        heading: "6. Aufbewahrungsfristen",
        paragraphs: [
          "Aufzeichnungen zu Bestellungen und Reservierungen werden für den von den Verarbeitungszwecken erforderlichen Zeitraum sowie für die gesetzlichen Aufbewahrungsfristen für Handelsbücher und -unterlagen (10 Jahre gemäß Art. 82 des türkischen Handelsgesetzbuchs) aufbewahrt; am Ende dieses Zeitraums werden sie gelöscht, vernichtet oder anonymisiert. Die WhatsApp-Korrespondenz wird regelmäßig überprüft und so gelöscht, dass sie den für den Abschluss der Bestellung und die Beilegung möglicher Streitigkeiten erforderlichen Zeitraum nicht überschreitet.",
        ],
      },
      {
        heading: "7. Datensicherheit",
        paragraphs: [
          "Zum Schutz Ihrer personenbezogenen Daten werden gemäß Art. 12 KVKK geeignete technische und organisatorische Maßnahmen getroffen: verschlüsselte Verbindung (HTTPS), autorisierter und beschränkter Zugang, starke Passwörter und Zwei-Faktor-Authentifizierung, regelmäßige Backups und die Führung von Zugriffsprotokollen gehören zu diesen Maßnahmen.",
        ],
      },
      {
        heading: "8. Ihre Rechte gemäß Art. 11 KVKK",
        paragraphs: [
          "In Bezug auf Ihre personenbezogenen Daten haben Sie das Recht: (a) zu erfahren, ob sie verarbeitet werden, (b) Auskunft zu verlangen, wenn sie verarbeitet wurden, (c) den Zweck der Verarbeitung zu erfahren und ob sie zweckgemäß verwendet werden, (d) die Dritten zu erfahren, an die sie im In- oder Ausland übermittelt werden, (e) ihre Berichtigung zu verlangen, wenn sie unvollständig oder unrichtig verarbeitet wurden, (f) im Rahmen der Bedingungen des Art. 7 KVKK ihre Löschung oder Vernichtung zu verlangen, (g) zu verlangen, dass Berichtigungs-/Löschungsvorgänge den Dritten mitgeteilt werden, an die die Daten übermittelt wurden, (h) einem Ergebnis zu widersprechen, das durch die ausschließliche Analyse mittels automatisierter Systeme zu Ihrem Nachteil entsteht, und (i) Ersatz des Schadens zu verlangen, wenn Sie durch eine rechtswidrige Verarbeitung einen Schaden erleiden.",
        ],
      },
      {
        heading: "9. Antragsverfahren",
        paragraphs: [
          "Um Ihre Rechte auszuüben, können Sie Ihren Antrag zusammen mit Angaben, die Ihre Identität belegen, per E-Mail an kardeslerkebappidesalonu@gmail.com oder schriftlich an Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul senden. Ihre Anträge werden gemäß der Bekanntmachung über die Verfahren und Grundsätze für Anträge an den Verantwortlichen spätestens innerhalb von 30 Tagen kostenlos abgeschlossen; erfordert der Vorgang zusätzliche Kosten, kann die Gebühr nach dem vom Ausschuss festgelegten Tarif erhoben werden.",
        ],
      },
      {
        heading: "10. Inkrafttreten",
        paragraphs: [
          "Dieser Text tritt an dem Datum in Kraft, an dem er unter https://www.kardeslercihangir.com veröffentlicht wird; er wird bei Bedarf aktualisiert, und die aktuelle Fassung ist stets auf dieser Seite verfügbar.",
        ],
      },
    ],
    prevailingNote:
      "Diese Seite ist eine Übersetzung des türkischen Aufklärungstextes (Aydınlatma Metni). Bei Widersprüchen oder Abweichungen zwischen dieser Übersetzung und dem türkischen Text ist der türkische Text maßgeblich.",
  },

  es: {
    title: "TEXTO INFORMATIVO SOBRE LA PROTECCIÓN DE DATOS PERSONALES Y POLÍTICA DE PRIVACIDAD",
    sections: [
      {
        heading: "1. Responsable del tratamiento",
        paragraphs: [
          "Este texto informativo ha sido preparado por Kardeşler Kebap & Breakfast Cihangir - Istanbul işletmesinin sahibi Emine Berrak Songur (la “Empresa”), en calidad de responsable del tratamiento, de conformidad con el artículo 10 de la Ley n.º 6698 de Protección de Datos Personales (“KVKK”).",
          "Dirección: Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul · Teléfono: +90 543 923 36 96 · Correo electrónico: kardeslerkebappidesalonu@gmail.com · Sitio web: https://www.kardeslercihangir.com",
        ],
      },
      {
        heading: "2. Datos personales tratados, método de recogida y bases jurídicas",
        paragraphs: [
          "Sus datos personales se obtienen por medios totalmente automatizados a través de los formularios de pedido y reserva de nuestro sitio web.",
        ],
        table: {
          head: ["Categoría de datos", "Datos", "Finalidad", "Base jurídica"],
          rows: [
            ["Identidad y contacto", "Nombre completo, número de teléfono", "Recepción y confirmación de su pedido/reserva y comunicación con usted", "Art. 5/2-c de la KVKK (celebración y ejecución de un contrato)"],
            ["Dirección de entrega", "Distrito, barrio, detalles de la dirección, nota del pedido", "Entrega de su pedido en su dirección", "Art. 5/2-c de la KVKK"],
            ["Información del pedido", "Contenido del pedido, su preferencia de pago en puerta (efectivo/tarjeta)", "Preparación y entrega de su pedido", "Art. 5/2-c de la KVKK"],
            ["Información de la reserva", "Fecha, hora, número de personas", "Creación de su reserva", "Art. 5/2-c de la KVKK"],
            ["Registros contables", "Los datos de su factura/recibo", "Llevanza de los libros y documentos legales", "Art. 5/2-ç de la KVKK (obligación legal)"],
            ["Seguridad de las transacciones", "Dirección IP y registros del servidor (logs)", "Seguridad del sitio y prevención del uso indebido", "Art. 5/2-f de la KVKK (interés legítimo)"],
          ],
        },
        after: [
          "En nuestro sitio web no se recoge información de tarjetas de crédito; el pago lo realiza usted, en efectivo o con tarjeta, en el momento de la entrega.",
        ],
      },
      {
        heading: "3. Transferencia de datos personales",
        paragraphs: [
          "Dentro del país: Sus datos no se comparten con terceros distintos de nuestro personal que realiza la entrega de su pedido; podrán transferirse a las instituciones y organismos públicos competentes cuando exista una obligación legal.",
          "Al extranjero: Sus solicitudes de pedido y reserva se transmiten a la línea de WhatsApp de nuestra empresa a través de su propia aplicación de WhatsApp. Dado que esta transmisión se realiza a través de los servidores de Meta Platforms, Inc., que presta el servicio de WhatsApp y que se encuentran en el extranjero, sus datos se transfieren así al extranjero. Los servicios de alojamiento e infraestructura de nuestro sitio web también se obtienen de proveedores de servicios con servidores en el extranjero (alojamiento: Vercel Inc.; infraestructura de base de datos: Supabase Inc.), y datos técnicos como su dirección IP pueden ser tratados por estos proveedores cuando accede al sitio. Estas transferencias se realizan en la medida necesaria para atender su solicitud y en el marco del artículo 9 de la KVKK.",
        ],
      },
      {
        heading: "4. Información almacenada en su navegador",
        paragraphs: [
          "Para facilitar su próximo pedido, la información de dirección que introduce y su carrito se almacenan únicamente en el almacenamiento local (localStorage) del navegador de su propio dispositivo. Esta información no se envía a nuestros servidores y no podemos acceder a ella de forma remota. Puede eliminar este registro en cualquier momento borrando los datos del sitio en su navegador o utilizando la opción “Limpiar” del sitio.",
        ],
      },
      {
        heading: "5. Cookies",
        paragraphs: [
          "Nuestro sitio web utiliza únicamente cookies y tecnologías similares estrictamente necesarias para el funcionamiento del sitio; no se utilizan cookies con fines publicitarios o de marketing. Las cookies estrictamente necesarias se utilizan en el ámbito del art. 5/2 de la KVKK sin estar sujetas a su consentimiento explícito. Si llegaran a utilizarse cookies no esenciales, este texto se actualizará y se recabará su consentimiento por separado.",
        ],
      },
      {
        heading: "6. Plazos de conservación",
        paragraphs: [
          "Los registros relativos a pedidos y reservas se conservan durante el período requerido por las finalidades del tratamiento y durante los plazos legales de conservación de los libros y documentos comerciales (10 años conforme al artículo 82 del Código de Comercio turco); al final de ese período se suprimen, destruyen o anonimizan. La correspondencia de WhatsApp se revisa periódicamente y se elimina de modo que no exceda el período necesario para la finalización del pedido y la resolución de posibles controversias.",
        ],
      },
      {
        heading: "7. Seguridad de los datos",
        paragraphs: [
          "Se adoptan las medidas técnicas y administrativas adecuadas para garantizar la seguridad de sus datos personales, de conformidad con el artículo 12 de la KVKK: la conexión cifrada (HTTPS), el acceso autorizado y limitado, las contraseñas seguras y la autenticación de dos factores, las copias de seguridad periódicas y el registro de los accesos se encuentran entre estas medidas.",
        ],
      },
      {
        heading: "8. Sus derechos en virtud del artículo 11 de la KVKK",
        paragraphs: [
          "En relación con sus datos personales, tiene derecho a: (a) saber si se tratan, (b) solicitar información si han sido tratados, (c) conocer la finalidad del tratamiento y si se utilizan conforme a dicha finalidad, (d) conocer los terceros a quienes se transfieren dentro del país o en el extranjero, (e) solicitar su rectificación si han sido tratados de forma incompleta o inexacta, (f) solicitar su supresión o destrucción en el marco de las condiciones del art. 7 de la KVKK, (g) solicitar que las operaciones de rectificación/supresión se notifiquen a los terceros a quienes se transfirieron los datos, (h) oponerse a un resultado en su perjuicio derivado del análisis exclusivamente mediante sistemas automatizados, e (i) exigir la indemnización del daño si sufre un perjuicio debido a un tratamiento ilícito.",
        ],
      },
      {
        heading: "9. Cómo presentar una solicitud",
        paragraphs: [
          "Para ejercer sus derechos, puede enviar su solicitud, junto con la información que acredite su identidad, por correo electrónico a kardeslerkebappidesalonu@gmail.com, o por escrito a Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul. Sus solicitudes se resolverán de forma gratuita en un plazo máximo de 30 días, de conformidad con el Comunicado sobre los procedimientos y principios de solicitud al responsable del tratamiento; si la operación requiere un coste adicional, podrá cobrarse la tarifa determinada por el Consejo.",
        ],
      },
      {
        heading: "10. Entrada en vigor",
        paragraphs: [
          "Este texto entra en vigor en la fecha de su publicación en https://www.kardeslercihangir.com; se actualiza cuando es necesario y la versión vigente está siempre disponible en esta página.",
        ],
      },
    ],
    prevailingNote:
      "Esta página es una traducción del texto informativo turco (Aydınlatma Metni). En caso de contradicción o discrepancia entre esta traducción y el texto turco, prevalecerá el texto turco.",
  },

  fa: {
    title: "متن اطلاع‌رسانی درباره حفاظت از داده‌های شخصی و سیاست حفظ حریم خصوصی",
    sections: [
      {
        heading: "1. مسئول داده",
        paragraphs: [
          "این متن اطلاع‌رسانی توسط Kardeşler Kebap & Breakfast Cihangir - Istanbul işletmesinin sahibi Emine Berrak Songur («کسب‌وکار»)، به عنوان مسئول داده، طبق ماده ۱۰ قانون حفاظت از داده‌های شخصی شماره ۶۶۹۸ («KVKK») تهیه شده است.",
          "نشانی: Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul · تلفن: +90 543 923 36 96 · ایمیل: kardeslerkebappidesalonu@gmail.com · وب‌سایت: https://www.kardeslercihangir.com",
        ],
      },
      {
        heading: "2. داده‌های شخصی پردازش‌شده، روش جمع‌آوری و مبانی قانونی",
        paragraphs: [
          "داده‌های شخصی شما به صورت کاملاً خودکار از طریق فرم‌های سفارش و رزرو در وب‌سایت ما به دست می‌آید.",
        ],
        table: {
          head: ["دسته داده", "داده‌ها", "هدف", "مبنای قانونی"],
          rows: [
            ["هویت و تماس", "نام و نام خانوادگی، شماره تلفن", "دریافت و تأیید سفارش/رزرو شما و ارتباط با شما", "ماده 5/2-c قانون KVKK (انعقاد و اجرای قرارداد)"],
            ["نشانی تحویل", "منطقه، محله، جزئیات نشانی، یادداشت سفارش", "تحویل سفارش شما به نشانی‌تان", "ماده 5/2-c قانون KVKK"],
            ["اطلاعات سفارش", "محتوای سفارش، ترجیح پرداخت درب منزل (نقدی/کارتی)", "آماده‌سازی و تحویل سفارش شما", "ماده 5/2-c قانون KVKK"],
            ["اطلاعات رزرو", "تاریخ، ساعت، تعداد نفرات", "ایجاد رزرو شما", "ماده 5/2-c قانون KVKK"],
            ["سوابق حسابداری", "اطلاعات فاکتور/رسید شما", "اجرای نظام دفاتر و اسناد قانونی", "ماده 5/2-ç قانون KVKK (تعهد قانونی)"],
            ["امنیت تراکنش", "نشانی IP و سوابق سرور (لاگ)", "امنیت سایت و جلوگیری از سوءاستفاده", "ماده 5/2-f قانون KVKK (منفعت مشروع)"],
          ],
        },
        after: [
          "در وب‌سایت ما اطلاعات کارت اعتباری جمع‌آوری نمی‌شود؛ پرداخت هنگام تحویل، به صورت نقدی یا با کارت توسط شما انجام می‌شود.",
        ],
      },
      {
        heading: "3. انتقال داده‌های شخصی",
        paragraphs: [
          "داخل کشور: داده‌های شما با اشخاص ثالثی به جز کارکنان ما که تحویل سفارش شما را انجام می‌دهند به اشتراک گذاشته نمی‌شود؛ در صورت وجود الزام قانونی ممکن است به نهادها و سازمان‌های عمومی ذی‌صلاح منتقل شود.",
          "خارج از کشور: درخواست‌های سفارش و رزرو شما از طریق برنامه واتس‌اپ خودتان به خط واتس‌اپ کسب‌وکار ما ارسال می‌شود. از آنجا که این ارسال از طریق سرورهای شرکت Meta Platforms, Inc. که خدمت واتس‌اپ را ارائه می‌دهد و در خارج از کشور قرار دارند انجام می‌شود، داده‌های شما بدین ترتیب به خارج از کشور منتقل می‌شود. خدمات میزبانی و زیرساخت وب‌سایت ما نیز از ارائه‌دهندگانی با سرورهای خارج از کشور دریافت می‌شود (میزبانی: Vercel Inc.؛ زیرساخت پایگاه داده: Supabase Inc.) و داده‌های فنی مانند نشانی IP شما هنگام دسترسی به سایت ممکن است توسط این ارائه‌دهندگان پردازش شود. این انتقال‌ها به اندازه لازم برای انجام درخواست شما و در چارچوب ماده ۹ قانون KVKK انجام می‌شود.",
        ],
      },
      {
        heading: "4. اطلاعات ذخیره‌شده در مرورگر شما",
        paragraphs: [
          "برای آسان‌تر شدن سفارش بعدی شما، اطلاعات نشانی که وارد می‌کنید و سبد خریدتان فقط در فضای ذخیره‌سازی محلی (localStorage) مرورگر دستگاه خودتان ذخیره می‌شود. این اطلاعات به سرورهای ما ارسال نمی‌شود و ما نمی‌توانیم از راه دور به آن دسترسی داشته باشیم. می‌توانید هر زمان با پاک کردن داده‌های سایت در مرورگر خود یا با استفاده از گزینه «پاک کردن» در سایت، این سابقه را حذف کنید.",
        ],
      },
      {
        heading: "5. کوکی‌ها",
        paragraphs: [
          "وب‌سایت ما فقط از کوکی‌ها و فناوری‌های مشابهی استفاده می‌کند که برای کارکرد سایت کاملاً ضروری هستند؛ هیچ کوکی‌ای برای اهداف تبلیغاتی یا بازاریابی استفاده نمی‌شود. کوکی‌های کاملاً ضروری در چارچوب ماده 5/2 قانون KVKK بدون نیاز به رضایت صریح شما استفاده می‌شوند. اگر کوکی‌های غیرضروری به کار گرفته شوند، این متن به‌روز خواهد شد و رضایت شما جداگانه گرفته می‌شود.",
        ],
      },
      {
        heading: "6. مدت‌های نگهداری",
        paragraphs: [
          "سوابق مربوط به سفارش‌ها و رزروها برای مدتی که اهداف پردازش ایجاب می‌کند و برای مدت‌های قانونی نگهداری دفاتر و اسناد تجاری (۱۰ سال طبق ماده ۸۲ قانون تجارت ترکیه) نگهداری می‌شوند؛ در پایان مدت، حذف، نابود یا ناشناس‌سازی می‌شوند. مکاتبات واتس‌اپ به صورت دوره‌ای بررسی و حذف می‌شوند تا از مدت لازم برای تکمیل سفارش و حل اختلافات احتمالی فراتر نروند.",
        ],
      },
      {
        heading: "7. امنیت داده",
        paragraphs: [
          "برای اطمینان از امنیت داده‌های شخصی شما طبق ماده ۱۲ قانون KVKK اقدامات فنی و اداری مناسبی اتخاذ می‌شود: اتصال رمزگذاری‌شده (HTTPS)، دسترسی مجاز و محدود، گذرواژه‌های قوی و احراز هویت دو مرحله‌ای، پشتیبان‌گیری منظم و نگهداری سوابق دسترسی از جمله این اقدامات هستند.",
        ],
      },
      {
        heading: "8. حقوق شما طبق ماده ۱۱ قانون KVKK",
        paragraphs: [
          "در رابطه با داده‌های شخصی خود، شما حق دارید: (الف) بدانید آیا پردازش می‌شوند، (ب) اگر پردازش شده‌اند اطلاعات درخواست کنید، (ج) هدف پردازش و اینکه آیا مطابق آن هدف استفاده می‌شوند را بدانید، (د) اشخاص ثالثی را که داده‌ها در داخل یا خارج از کشور به آنها منتقل می‌شوند بشناسید، (هـ) اگر به صورت ناقص یا نادرست پردازش شده‌اند اصلاح آنها را درخواست کنید، (و) در چارچوب شرایط ماده ۷ قانون KVKK حذف یا نابودی آنها را درخواست کنید، (ز) درخواست کنید عملیات اصلاح/حذف به اشخاص ثالثی که داده‌ها به آنها منتقل شده‌اند اطلاع داده شود، (ح) به نتیجه‌ای که صرفاً از تحلیل توسط سیستم‌های خودکار به ضرر شما ایجاد شده اعتراض کنید، (ط) اگر به دلیل پردازش غیرقانونی خسارت دیدید، جبران خسارت را مطالبه کنید.",
        ],
      },
      {
        heading: "9. روش درخواست",
        paragraphs: [
          "برای استفاده از حقوق خود، می‌توانید درخواست خود را همراه با اطلاعات احراز هویت، از طریق ایمیل به kardeslerkebappidesalonu@gmail.com، یا به صورت کتبی به Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul ارسال کنید. درخواست‌های شما حداکثر ظرف ۳۰ روز به صورت رایگان و طبق اطلاعیه مربوط به اصول و رویه‌های درخواست به مسئول داده به نتیجه می‌رسد؛ اگر این فرایند هزینه اضافی داشته باشد، ممکن است هزینه مندرج در تعرفه تعیین‌شده توسط هیئت دریافت شود.",
        ],
      },
      {
        heading: "10. لازم‌الاجرا شدن",
        paragraphs: [
          "این متن از تاریخ انتشار آن در https://www.kardeslercihangir.com لازم‌الاجرا می‌شود؛ در صورت نیاز به‌روز می‌شود و نسخه جاری همیشه در این صفحه موجود است.",
        ],
      },
    ],
    prevailingNote:
      "این صفحه ترجمه متن اطلاع‌رسانی ترکی (Aydınlatma Metni) است. در صورت هرگونه مغایرت یا اختلاف میان این ترجمه و متن ترکی، متن ترکی ملاک خواهد بود.",
  },

  fr: {
    title: "NOTICE D'INFORMATION SUR LA PROTECTION DES DONNÉES PERSONNELLES ET POLITIQUE DE CONFIDENTIALITÉ",
    sections: [
      {
        heading: "1. Responsable du traitement",
        paragraphs: [
          "La présente notice d'information a été préparée par Kardeşler Kebap & Breakfast Cihangir - Istanbul işletmesinin sahibi Emine Berrak Songur (l'« Établissement »), en sa qualité de responsable du traitement, conformément à l'article 10 de la loi n° 6698 sur la protection des données personnelles (« KVKK »).",
          "Adresse : Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul · Téléphone : +90 543 923 36 96 · E-mail : kardeslerkebappidesalonu@gmail.com · Site web : https://www.kardeslercihangir.com",
        ],
      },
      {
        heading: "2. Données personnelles traitées, méthode de collecte et bases juridiques",
        paragraphs: [
          "Vos données personnelles sont obtenues par des moyens entièrement automatisés, via les formulaires de commande et de réservation de notre site web.",
        ],
        table: {
          head: ["Catégorie de données", "Données", "Finalité", "Base juridique"],
          rows: [
            ["Identité et contact", "Nom complet, numéro de téléphone", "Réception et confirmation de votre commande/réservation et communication avec vous", "Art. 5/2-c KVKK (conclusion et exécution d'un contrat)"],
            ["Adresse de livraison", "District, quartier, détails de l'adresse, note de commande", "Livraison de votre commande à votre adresse", "Art. 5/2-c KVKK"],
            ["Informations de commande", "Contenu de la commande, votre préférence de paiement à la livraison (espèces/carte)", "Préparation et livraison de votre commande", "Art. 5/2-c KVKK"],
            ["Informations de réservation", "Date, heure, nombre de convives", "Création de votre réservation", "Art. 5/2-c KVKK"],
            ["Documents comptables", "Les informations de votre facture/reçu", "Tenue des livres et documents légaux", "Art. 5/2-ç KVKK (obligation légale)"],
            ["Sécurité des transactions", "Adresse IP et journaux du serveur (logs)", "Sécurité du site et prévention des abus", "Art. 5/2-f KVKK (intérêts légitimes)"],
          ],
        },
        after: [
          "Aucune information de carte de crédit n'est collectée sur notre site ; le paiement est effectué par vous, en espèces ou par carte, au moment de la livraison.",
        ],
      },
      {
        heading: "3. Transfert des données personnelles",
        paragraphs: [
          "En Turquie : Vos données ne sont partagées avec aucun tiers autre que notre personnel qui effectue la livraison de votre commande ; elles peuvent être transférées aux institutions et organismes publics compétents en cas d'obligation légale.",
          "À l'étranger : Vos demandes de commande et de réservation sont transmises à la ligne WhatsApp de notre établissement via votre propre application WhatsApp. Cette transmission s'effectuant par l'intermédiaire des serveurs de Meta Platforms, Inc., qui fournit le service WhatsApp et qui sont situés à l'étranger, vos données sont ainsi transférées à l'étranger. Les services d'hébergement et d'infrastructure de notre site sont également fournis par des prestataires disposant de serveurs à l'étranger (hébergement : Vercel Inc. ; infrastructure de base de données : Supabase Inc.), et des données techniques telles que votre adresse IP peuvent être traitées par ces prestataires lorsque vous accédez au site. Ces transferts sont effectués dans la mesure nécessaire à l'exécution de votre demande et dans le cadre de l'article 9 de la KVKK.",
        ],
      },
      {
        heading: "4. Informations stockées dans votre navigateur",
        paragraphs: [
          "Pour faciliter votre prochaine commande, les informations d'adresse que vous saisissez et votre panier sont stockés uniquement dans le stockage local (localStorage) du navigateur de votre propre appareil. Ces informations ne sont pas envoyées à nos serveurs et nous ne pouvons pas y accéder à distance. Vous pouvez supprimer cet enregistrement à tout moment en effaçant les données de site de votre navigateur ou en utilisant l'option « Effacer » du site.",
        ],
      },
      {
        heading: "5. Cookies",
        paragraphs: [
          "Notre site n'utilise que des cookies et technologies similaires strictement nécessaires au fonctionnement du site ; aucun cookie n'est utilisé à des fins publicitaires ou marketing. Les cookies strictement nécessaires sont utilisés dans le cadre de l'art. 5/2 de la KVKK sans être soumis à votre consentement explicite. Si des cookies non essentiels venaient à être utilisés, le présent texte serait mis à jour et votre consentement serait recueilli séparément.",
        ],
      },
      {
        heading: "6. Durées de conservation",
        paragraphs: [
          "Les enregistrements relatifs aux commandes et réservations sont conservés pendant la durée requise par les finalités du traitement et pendant les durées légales de conservation des livres et documents commerciaux (10 ans conformément à l'article 82 du Code de commerce turc) ; à l'issue de cette période, ils sont effacés, détruits ou anonymisés. La correspondance WhatsApp est examinée périodiquement et supprimée de manière à ne pas dépasser la durée nécessaire à l'achèvement de la commande et au règlement des éventuels litiges.",
        ],
      },
      {
        heading: "7. Sécurité des données",
        paragraphs: [
          "Des mesures techniques et administratives appropriées sont prises pour assurer la sécurité de vos données personnelles, conformément à l'article 12 de la KVKK : connexion chiffrée (HTTPS), accès autorisé et limité, mots de passe forts et authentification à deux facteurs, sauvegardes régulières et tenue de journaux d'accès figurent parmi ces mesures.",
        ],
      },
      {
        heading: "8. Vos droits en vertu de l'article 11 de la KVKK",
        paragraphs: [
          "En ce qui concerne vos données personnelles, vous avez le droit de : (a) savoir si elles sont traitées, (b) demander des informations si elles ont été traitées, (c) connaître la finalité du traitement et si elles sont utilisées conformément à cette finalité, (d) connaître les tiers auxquels elles sont transférées dans le pays ou à l'étranger, (e) demander leur rectification si elles ont été traitées de manière incomplète ou inexacte, (f) demander leur effacement ou leur destruction dans le cadre des conditions de l'art. 7 de la KVKK, (g) demander que les opérations de rectification/effacement soient notifiées aux tiers auxquels les données ont été transférées, (h) vous opposer à un résultat qui vous est défavorable et qui résulte d'une analyse effectuée exclusivement par des systèmes automatisés, et (i) demander la réparation du dommage si vous subissez un dommage en raison d'un traitement illicite.",
        ],
      },
      {
        heading: "9. Modalités de demande",
        paragraphs: [
          "Pour exercer vos droits, vous pouvez adresser votre demande, accompagnée des informations justifiant de votre identité, par e-mail à kardeslerkebappidesalonu@gmail.com, ou par écrit à Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul. Vos demandes sont traitées gratuitement dans un délai maximal de 30 jours, conformément au communiqué relatif aux procédures et principes de demande auprès du responsable du traitement ; si l'opération entraîne un coût supplémentaire, les frais prévus par le tarif fixé par le Conseil peuvent être appliqués.",
        ],
      },
      {
        heading: "10. Entrée en vigueur",
        paragraphs: [
          "Le présent texte entre en vigueur à la date de sa publication sur https://www.kardeslercihangir.com ; il est mis à jour si nécessaire et la version en vigueur est toujours disponible sur cette page.",
        ],
      },
    ],
    prevailingNote:
      "Cette page est une traduction du texte d'information turc (Aydınlatma Metni). En cas de contradiction ou de divergence entre cette traduction et le texte turc, le texte turc prévaut.",
  },

  it: {
    title: "INFORMATIVA SULLA PROTEZIONE DEI DATI PERSONALI E POLITICA SULLA PRIVACY",
    sections: [
      {
        heading: "1. Titolare del trattamento",
        paragraphs: [
          "La presente informativa è stata predisposta da Kardeşler Kebap & Breakfast Cihangir - Istanbul işletmesinin sahibi Emine Berrak Songur (l'“Esercizio”), in qualità di titolare del trattamento, ai sensi dell'articolo 10 della Legge n. 6698 sulla protezione dei dati personali (“KVKK”).",
          "Indirizzo: Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul · Telefono: +90 543 923 36 96 · E-mail: kardeslerkebappidesalonu@gmail.com · Sito web: https://www.kardeslercihangir.com",
        ],
      },
      {
        heading: "2. Dati personali trattati, metodo di raccolta e basi giuridiche",
        paragraphs: [
          "I suoi dati personali sono acquisiti con mezzi interamente automatizzati tramite i moduli d'ordine e di prenotazione presenti sul nostro sito web.",
        ],
        table: {
          head: ["Categoria di dati", "Dati", "Finalità", "Base giuridica"],
          rows: [
            ["Identità e contatti", "Nome e cognome, numero di telefono", "Ricezione e conferma del suo ordine/della sua prenotazione e comunicazione con lei", "Art. 5/2-c KVKK (conclusione ed esecuzione di un contratto)"],
            ["Indirizzo di consegna", "Distretto, quartiere, dettagli dell'indirizzo, nota sull'ordine", "Consegna del suo ordine al suo indirizzo", "Art. 5/2-c KVKK"],
            ["Informazioni sull'ordine", "Contenuto dell'ordine, sua preferenza di pagamento alla porta (contanti/carta)", "Preparazione e consegna del suo ordine", "Art. 5/2-c KVKK"],
            ["Informazioni sulla prenotazione", "Data, ora, numero di ospiti", "Creazione della sua prenotazione", "Art. 5/2-c KVKK"],
            ["Documenti contabili", "I dati della sua fattura/scontrino", "Tenuta dei libri e dei documenti previsti dalla legge", "Art. 5/2-ç KVKK (obbligo legale)"],
            ["Sicurezza delle transazioni", "Indirizzo IP e registri del server (log)", "Sicurezza del sito e prevenzione degli abusi", "Art. 5/2-f KVKK (legittimi interessi)"],
          ],
        },
        after: [
          "Sul nostro sito non vengono raccolti dati di carte di credito; il pagamento viene effettuato da lei, in contanti o con carta, al momento della consegna.",
        ],
      },
      {
        heading: "3. Trasferimento dei dati personali",
        paragraphs: [
          "In Turchia: I suoi dati non vengono condivisi con terzi diversi dal nostro personale che effettua la consegna del suo ordine; possono essere trasferiti a istituzioni e organismi pubblici competenti ove richiesto dalla legge.",
          "All'estero: Le sue richieste di ordine e prenotazione vengono trasmesse alla linea WhatsApp del nostro esercizio tramite la sua stessa applicazione WhatsApp. Poiché tale trasmissione avviene tramite i server di Meta Platforms, Inc., che fornisce il servizio WhatsApp e che sono situati all'estero, i suoi dati vengono così trasferiti all'estero. Anche i servizi di hosting e infrastruttura del nostro sito sono forniti da fornitori con server all'estero (hosting: Vercel Inc.; infrastruttura di database: Supabase Inc.) e dati tecnici quali il suo indirizzo IP possono essere trattati da tali fornitori quando accede al sito. Questi trasferimenti vengono effettuati nella misura necessaria a evadere la sua richiesta e nel quadro dell'articolo 9 della KVKK.",
        ],
      },
      {
        heading: "4. Informazioni memorizzate nel suo browser",
        paragraphs: [
          "Per rendere più semplice il suo prossimo ordine, le informazioni sull'indirizzo che inserisce e il suo carrello vengono memorizzati esclusivamente nella memoria locale (localStorage) del browser del suo dispositivo. Queste informazioni non vengono inviate ai nostri server e non possiamo accedervi da remoto. Può eliminare questa registrazione in qualsiasi momento cancellando i dati del sito dal suo browser oppure utilizzando l'opzione “Cancella” presente sul sito.",
        ],
      },
      {
        heading: "5. Cookie",
        paragraphs: [
          "Il nostro sito utilizza esclusivamente cookie e tecnologie simili strettamente necessari al funzionamento del sito; non vengono utilizzati cookie per finalità pubblicitarie o di marketing. I cookie strettamente necessari sono utilizzati nell'ambito dell'art. 5/2 della KVKK senza essere subordinati al suo consenso esplicito. Qualora venissero utilizzati cookie non essenziali, il presente testo sarà aggiornato e il suo consenso sarà raccolto separatamente.",
        ],
      },
      {
        heading: "6. Periodi di conservazione",
        paragraphs: [
          "Le registrazioni relative a ordini e prenotazioni sono conservate per il periodo richiesto dalle finalità del trattamento e per i periodi di conservazione previsti dalla legge per i libri e i documenti commerciali (10 anni ai sensi dell'articolo 82 del Codice commerciale turco); al termine di tale periodo vengono cancellate, distrutte o anonimizzate. La corrispondenza WhatsApp viene riesaminata periodicamente e cancellata in modo da non superare il periodo necessario per il completamento dell'ordine e la risoluzione di eventuali controversie.",
        ],
      },
      {
        heading: "7. Sicurezza dei dati",
        paragraphs: [
          "Sono adottate misure tecniche e amministrative adeguate per garantire la sicurezza dei suoi dati personali ai sensi dell'articolo 12 della KVKK: connessione crittografata (HTTPS), accesso autorizzato e limitato, password robuste e autenticazione a due fattori, backup regolari e tenuta dei registri di accesso rientrano tra tali misure.",
        ],
      },
      {
        heading: "8. I suoi diritti ai sensi dell'articolo 11 della KVKK",
        paragraphs: [
          "In relazione ai suoi dati personali, lei ha il diritto di: (a) sapere se vengono trattati, (b) richiedere informazioni se sono stati trattati, (c) conoscere la finalità del trattamento e se vengono utilizzati in conformità a tale finalità, (d) conoscere i terzi a cui vengono trasferiti nel Paese o all'estero, (e) richiederne la rettifica se sono stati trattati in modo incompleto o inesatto, (f) richiederne la cancellazione o la distruzione nel quadro delle condizioni di cui all'art. 7 della KVKK, (g) richiedere che le operazioni di rettifica/cancellazione siano notificate ai terzi a cui i dati sono stati trasferiti, (h) opporsi a un risultato a suo sfavore derivante dall'analisi effettuata esclusivamente mediante sistemi automatizzati, e (i) chiedere il risarcimento del danno qualora subisca un danno a causa di un trattamento illecito.",
        ],
      },
      {
        heading: "9. Modalità di richiesta",
        paragraphs: [
          "Per esercitare i suoi diritti, può inviare la sua richiesta, corredata dalle informazioni che attestano la sua identità, via e-mail a kardeslerkebappidesalonu@gmail.com, oppure per iscritto a Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul. Le sue richieste saranno concluse gratuitamente entro un massimo di 30 giorni, in conformità al Comunicato sulle procedure e sui principi per le richieste al titolare del trattamento; se l'operazione richiede un costo aggiuntivo, potrà essere applicata la tariffa stabilita dal Consiglio.",
        ],
      },
      {
        heading: "10. Entrata in vigore",
        paragraphs: [
          "Il presente testo entra in vigore alla data della sua pubblicazione su https://www.kardeslercihangir.com; viene aggiornato quando necessario e la versione vigente è sempre disponibile su questa pagina.",
        ],
      },
    ],
    prevailingNote:
      "Questa pagina è una traduzione del testo informativo turco (Aydınlatma Metni). In caso di contrasto o discrepanza tra questa traduzione e il testo turco, prevarrà il testo turco.",
  },

  ru: {
    title: "ИНФОРМАЦИОННОЕ УВЕДОМЛЕНИЕ О ЗАЩИТЕ ПЕРСОНАЛЬНЫХ ДАННЫХ И ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ",
    sections: [
      {
        heading: "1. Оператор персональных данных",
        paragraphs: [
          "Настоящее информационное уведомление подготовлено Kardeşler Kebap & Breakfast Cihangir - Istanbul işletmesinin sahibi Emine Berrak Songur («Предприятие») в качестве оператора персональных данных в соответствии со статьёй 10 Закона № 6698 о защите персональных данных («KVKK»).",
          "Адрес: Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul · Телефон: +90 543 923 36 96 · Электронная почта: kardeslerkebappidesalonu@gmail.com · Веб-сайт: https://www.kardeslercihangir.com",
        ],
      },
      {
        heading: "2. Обрабатываемые персональные данные, способ сбора и правовые основания",
        paragraphs: [
          "Ваши персональные данные получаются полностью автоматизированными средствами через формы заказа и бронирования на нашем веб-сайте.",
        ],
        table: {
          head: ["Категория данных", "Данные", "Цель", "Правовое основание"],
          rows: [
            ["Идентификация и контакты", "Имя и фамилия, номер телефона", "Приём и подтверждение вашего заказа/бронирования и связь с вами", "ст. 5/2-c KVKK (заключение и исполнение договора)"],
            ["Адрес доставки", "Район, микрорайон, детали адреса, примечание к заказу", "Доставка вашего заказа по вашему адресу", "ст. 5/2-c KVKK"],
            ["Информация о заказе", "Содержимое заказа, ваш способ оплаты при доставке (наличные/карта)", "Приготовление и доставка вашего заказа", "ст. 5/2-c KVKK"],
            ["Информация о бронировании", "Дата, время, количество гостей", "Создание вашего бронирования", "ст. 5/2-c KVKK"],
            ["Бухгалтерские записи", "Данные вашего счёта/чека", "Ведение установленных законом книг и документов", "ст. 5/2-ç KVKK (юридическая обязанность)"],
            ["Безопасность операций", "IP-адрес и журналы сервера (логи)", "Безопасность сайта и предотвращение злоупотреблений", "ст. 5/2-f KVKK (законные интересы)"],
          ],
        },
        after: [
          "На нашем сайте не собираются данные кредитных карт; оплата производится вами наличными или картой в момент доставки.",
        ],
      },
      {
        heading: "3. Передача персональных данных",
        paragraphs: [
          "В пределах страны: Ваши данные не передаются третьим лицам, кроме нашего персонала, осуществляющего доставку вашего заказа; при наличии юридического обязательства они могут быть переданы компетентным государственным учреждениям и организациям.",
          "За рубеж: Ваши запросы на заказ и бронирование передаются на линию WhatsApp нашего предприятия через ваше собственное приложение WhatsApp. Поскольку такая передача осуществляется через серверы компании Meta Platforms, Inc., предоставляющей сервис WhatsApp и расположенные за рубежом, ваши данные тем самым передаются за границу. Услуги хостинга и инфраструктуры нашего сайта также предоставляются поставщиками с серверами за рубежом (хостинг: Vercel Inc.; инфраструктура базы данных: Supabase Inc.), и технические данные, такие как ваш IP-адрес, могут обрабатываться этими поставщиками при вашем доступе к сайту. Такие передачи осуществляются в объёме, необходимом для выполнения вашего запроса, и в рамках статьи 9 KVKK.",
        ],
      },
      {
        heading: "4. Информация, хранящаяся в вашем браузере",
        paragraphs: [
          "Чтобы облегчить ваш следующий заказ, введённая вами информация об адресе и ваша корзина хранятся только в локальном хранилище (localStorage) браузера вашего собственного устройства. Эта информация не отправляется на наши серверы, и мы не можем получить к ней удалённый доступ. Вы можете удалить эту запись в любое время, очистив данные сайта в вашем браузере или воспользовавшись опцией «Очистить» на сайте.",
        ],
      },
      {
        heading: "5. Файлы cookie",
        paragraphs: [
          "На нашем сайте используются только файлы cookie и аналогичные технологии, строго необходимые для работы сайта; файлы cookie в рекламных или маркетинговых целях не используются. Строго необходимые файлы cookie используются в рамках ст. 5/2 KVKK без вашего явного согласия. Если начнут использоваться необязательные файлы cookie, настоящий текст будет обновлён, а ваше согласие будет получено отдельно.",
        ],
      },
      {
        heading: "6. Сроки хранения",
        paragraphs: [
          "Записи, относящиеся к заказам и бронированиям, хранятся в течение срока, требуемого целями обработки, и в течение установленных законом сроков хранения коммерческих книг и документов (10 лет в соответствии со статьёй 82 Торгового кодекса Турции); по истечении этого срока они удаляются, уничтожаются или обезличиваются. Переписка в WhatsApp периодически пересматривается и удаляется так, чтобы не превышать срок, необходимый для завершения заказа и урегулирования возможных споров.",
        ],
      },
      {
        heading: "7. Безопасность данных",
        paragraphs: [
          "Для обеспечения безопасности ваших персональных данных в соответствии со статьёй 12 KVKK принимаются надлежащие технические и административные меры: зашифрованное соединение (HTTPS), авторизованный и ограниченный доступ, надёжные пароли и двухфакторная аутентификация, регулярное резервное копирование и ведение журналов доступа входят в число таких мер.",
        ],
      },
      {
        heading: "8. Ваши права в соответствии со статьёй 11 KVKK",
        paragraphs: [
          "В отношении ваших персональных данных вы имеете право: (a) узнать, обрабатываются ли они, (b) запросить информацию, если они обрабатывались, (c) узнать цель обработки и используются ли они в соответствии с этой целью, (d) знать третьих лиц, которым они передаются внутри страны или за рубеж, (e) потребовать их исправления, если они обрабатывались неполно или неточно, (f) потребовать их удаления или уничтожения в рамках условий ст. 7 KVKK, (g) потребовать уведомления третьих лиц, которым данные были переданы, об операциях исправления/удаления, (h) возразить против результата, возникшего в ущерб вам в результате анализа исключительно автоматизированными системами, и (i) потребовать возмещения ущерба, если вы понесли ущерб вследствие незаконной обработки.",
        ],
      },
      {
        heading: "9. Порядок обращения",
        paragraphs: [
          "Чтобы воспользоваться своими правами, вы можете направить запрос вместе с информацией, удостоверяющей вашу личность, по электронной почте на адрес kardeslerkebappidesalonu@gmail.com или в письменной форме по адресу Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul. Ваши обращения будут рассмотрены бесплатно не позднее чем в течение 30 дней в соответствии с Коммюнике о процедурах и принципах обращения к оператору данных; если операция требует дополнительных затрат, может взиматься плата по тарифу, установленному Советом.",
        ],
      },
      {
        heading: "10. Вступление в силу",
        paragraphs: [
          "Настоящий текст вступает в силу с даты его публикации на сайте https://www.kardeslercihangir.com; при необходимости он обновляется, и действующая версия всегда доступна на этой странице.",
        ],
      },
    ],
    prevailingNote:
      "Эта страница является переводом турецкого информационного уведомления (Aydınlatma Metni). В случае любых противоречий или расхождений между этим переводом и турецким текстом преимущественную силу имеет турецкий текст.",
  },

  zh: {
    title: "个人数据保护信息告知文本与隐私政策",
    sections: [
      {
        heading: "1. 数据控制者",
        paragraphs: [
          "本信息告知文本由 Kardeşler Kebap & Breakfast Cihangir - Istanbul işletmesinin sahibi Emine Berrak Songur（以下简称“本企业”）作为数据控制者，依据第 6698 号《个人数据保护法》（“KVKK”）第 10 条编制。",
          "地址：Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul · 电话：+90 543 923 36 96 · 电子邮箱：kardeslerkebappidesalonu@gmail.com · 网站：https://www.kardeslercihangir.com",
        ],
      },
      {
        heading: "2. 所处理的个人数据、收集方式与法律依据",
        paragraphs: [
          "您的个人数据通过我们网站上的订单和预订表单以全自动方式获取。",
        ],
        table: {
          head: ["数据类别", "数据", "目的", "法律依据"],
          rows: [
            ["身份与联系方式", "姓名、电话号码", "接收并确认您的订单/预订并与您联系", "KVKK 第 5/2-c 条（合同的订立与履行）"],
            ["配送地址", "区、社区、地址详情、订单备注", "将您的订单送达您的地址", "KVKK 第 5/2-c 条"],
            ["订单信息", "订单内容、您的到付偏好（现金/银行卡）", "准备并配送您的订单", "KVKK 第 5/2-c 条"],
            ["预订信息", "日期、时间、用餐人数", "创建您的预订", "KVKK 第 5/2-c 条"],
            ["会计记录", "您的发票/收据信息", "维护法定账簿与文件", "KVKK 第 5/2-ç 条（法律义务）"],
            ["交易安全", "IP 地址与服务器日志", "网站安全与防止滥用", "KVKK 第 5/2-f 条（合法利益）"],
          ],
        },
        after: [
          "我们的网站不收集信用卡信息；付款由您在送达时以现金或银行卡方式完成。",
        ],
      },
      {
        heading: "3. 个人数据的传输",
        paragraphs: [
          "境内：除负责配送您订单的工作人员外，您的信息不会与任何第三方共享；在法律要求时，可能会传输给有权公共机构和组织。",
          "境外：您的订单和预订请求通过您自己的 WhatsApp 应用发送至本企业的 WhatsApp 线路。由于该传输通过提供 WhatsApp 服务的 Meta Platforms, Inc. 位于境外的服务器进行，您的信息因此被传输至境外。我们网站的托管和基础设施服务同样来自服务器位于境外的服务提供商（托管：Vercel Inc.；数据库基础设施：Supabase Inc.），在您访问网站时，您的 IP 地址等技术数据可能会被这些提供商处理。此类传输在履行您的请求所必需的范围内，并依据 KVKK 第 9 条进行。",
        ],
      },
      {
        heading: "4. 存储在您浏览器中的信息",
        paragraphs: [
          "为方便您的下一次订购，您填写的地址信息和购物车仅存储在您自己设备的浏览器本地存储（localStorage）中。这些信息不会发送到我们的服务器，我们也无法远程访问。您可以随时通过清除浏览器的网站数据或使用网站上的“清除”选项删除此记录。",
        ],
      },
      {
        heading: "5. Cookie",
        paragraphs: [
          "我们的网站仅使用网站运行所必需的 Cookie 和类似技术；不使用任何用于广告或营销目的的 Cookie。必需 Cookie 依据 KVKK 第 5/2 条使用，无需您的明确同意。如果将来开始使用非必需 Cookie，本文本将予以更新，并另行征求您的同意。",
        ],
      },
      {
        heading: "6. 保存期限",
        paragraphs: [
          "与订单和预订有关的记录，将在处理目的所需的期限内以及商业账簿和文件的法定保存期限内保存（根据《土耳其商法》第 82 条为 10 年）；期限届满后，将予以删除、销毁或匿名化。WhatsApp 通信记录将定期审查并删除，以不超过完成订单和解决可能争议所需的期限。",
        ],
      },
      {
        heading: "7. 数据安全",
        paragraphs: [
          "为保障您个人数据的安全，我们依据 KVKK 第 12 条采取适当的技术和行政措施：加密连接（HTTPS）、经授权的有限访问、强密码和双重验证、定期备份以及访问日志记录均属此类措施。",
        ],
      },
      {
        heading: "8. 您依据 KVKK 第 11 条享有的权利",
        paragraphs: [
          "关于您的个人数据，您有权：(a) 了解其是否被处理，(b) 如已被处理，要求提供相关信息，(c) 了解处理目的及其是否按该目的使用，(d) 了解其被传输至境内或境外的第三方，(e) 如处理不完整或不准确，要求更正，(f) 在 KVKK 第 7 条规定的条件框架内，要求删除或销毁，(g) 要求将更正/删除操作通知已接收数据的第三方，(h) 反对仅通过自动化系统分析而对您产生不利结果，(i) 如因非法处理遭受损害，要求赔偿损失。",
        ],
      },
      {
        heading: "9. 申请方式",
        paragraphs: [
          "为行使您的权利，您可将申请连同证明您身份的信息，通过电子邮件发送至 kardeslerkebappidesalonu@gmail.com，或以书面形式发送至 Firuzağa Mah. Firuzağa Camii Sok. No: 1A, Cihangir, Beyoğlu, İstanbul。您的申请将依据《向数据控制者申请的程序与原则公报》在最迟 30 天内免费处理完毕；如该处理需要额外费用，可能会按委员会确定的收费标准收取费用。",
        ],
      },
      {
        heading: "10. 生效",
        paragraphs: [
          "本文件自其在 https://www.kardeslercihangir.com 发布之日起生效；必要时将予以更新，现行版本始终在本页面提供。",
        ],
      },
    ],
    prevailingNote:
      "本页面为土耳其语《信息告知文本》（Aydınlatma Metni）的译文。如本译文与土耳其语原文之间存在任何不一致或差异，以土耳其语原文为准。",
  },
};
