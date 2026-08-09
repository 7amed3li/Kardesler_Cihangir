import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, MapPin, Clock, Phone, Utensils, Award, CheckCircle2, 
  Navigation, MessageCircle, Flame, ShieldCheck, 
  Heart, Compass, ChevronRight, ArrowUpRight, Check, ExternalLink
} from "lucide-react";
import LandingDishesSection from "../../../components/LandingDishesSection";
import LandingVerifiedReviews from "../../../components/LandingVerifiedReviews";

export const metadata = {
  title: "Taksim'e En Yakın Meşe Kömüründe Hakiki Kebap & Taş Fırın Pide (1998'den Beri) | Kardeşler Cihangir",
  description:
    "Cihangir'in 28 yıllık lezzet durağı. Zırhta çekilmiş taze etler, meşe kömürü ateşi ve 450 derecelik taş fırından sıcacık pideler. Taksim Meydanı'na sadece 5 dakika yürüme mesafesinde.",
  keywords: [
    "taksim en iyi kebap",
    "cihangir kebapçı",
    "kardesler kebap cihangir 1998",
    "taksim adana kebap",
    "beyoglu tas firin pide",
    "istiklal caddesi yakin kebap",
  ],
  alternates: {
    canonical: "https://kardeslercihangir.com/tr/best-kebab-taksim",
    languages: {
      tr: "https://kardeslercihangir.com/tr/best-kebab-taksim",
      en: "https://kardeslercihangir.com/best-kebab-taksim",
      ar: "https://kardeslercihangir.com/ar/best-kebab-taksim",
      ru: "https://kardeslercihangir.com/ru/best-kebab-taksim",
      fa: "https://kardeslercihangir.com/fa/best-kebab-taksim",
      fr: "https://kardeslercihangir.com/fr/best-kebab-taksim",
    },
  },
  openGraph: {
    title: "Taksim'e En Yakın Hakiki Meşe Kömüründe Kebap — Kardeşler Cihangir (1998)",
    description: "28 yıllık esnaf terbiyesi ve değişmeyen meşe kömürü lezzetiyle Cihangir'de hizmetinizdeyiz.",
    images: [{ url: "https://kardeslercihangir.com/images/hero-bg.webp" }],
  },
};

const faqSchemaTr = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Taksim Meydanı'na en yakın hakiki kebap nerede yenir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1998 yılında kurulan Kardeşler Kebap, Taksim Meydanı'na yalnızca 5 dakika (450 metre) yürüme mesafesinde tarihi Cihangir Firuzağa Camii karşısında yer almaktadır. Zırh kıyması Adana kebabı ve taş fırın pideleriyle ünlüdür.",
      },
    },
    {
      "@type": "Question",
      name: "Kardeşler Kebap'ın et ve pişirme farkı nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Etlerimiz dondurulmamış, günlük taze ve %100 yerli kesimdir. Geleneksel zırh bıçağı ile elde kıyılır, sadece doğal meşe kömürü közünde pişirilir. Pidelerimiz ise 450 derecelik taş fırında sipariş üzerine sıcak olarak fırından çıkar.",
      },
    },
    {
      "@type": "Question",
      name: "Çalışma saatleri ve rezervasyon nasıl yapılır?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Haftanın 7 günü sabah 09:00'dan gece 02:00'ye kadar aralıksız hizmet vermekteyiz. WhatsApp (+90 506 045 39 06) veya telefon (+90 212 251 36 96) ile kolayca masa ayırtabilirsiniz.",
      },
    },
  ],
};

export default function TurkishLandingPage() {
  const whatsappUrl = "https://wa.me/905060453906?text=" + encodeURIComponent("Merhaba Kardeşler Kebap Cihangir, masa rezervasyonu yaptırmak veya sipariş vermek istiyorum.");

  return (
    <div className="min-h-screen bg-[#0E0804] text-cream selection:bg-copper selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaTr) }}
      />

      {/* ── 1. CINEMATIC HERO SECTION ── */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-24 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/hero-bg.webp"
            alt="Kardeşler Kebap Cihangir Taksim İstanbul 1998'den Beri"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.32]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0804]/90 via-[#0E0804]/60 to-[#0E0804]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.12)_0%,transparent_70%)]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em]">
            <span className="w-1.5 h-1.5 rounded-full bg-copper"></span>
            <span>1998'DEN BERİ • TARİHİ CİHANGİR, BEYOĞLU</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-black text-cream leading-[1.15] tracking-tight"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            Meşe Kömüründe <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-copper">
              Hakiki Zırh Kebabı
            </span>{" "}
            Taksim'in Yanında
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream-dim/90 font-light leading-relaxed">
            28 yıldır Cihangir'de geleneksel ocakbaşı kültürünü yaşatıyoruz: zırhla çekilen günlük etler, meşe kömürü ateşi ve 450 derecelik taş fırından sıcacık çıkan pideler.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm text-cream-dim">
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <Star size={14} className="text-gold fill-gold" />
              <span className="font-bold text-cream">4.6 / 5</span>
              <span className="text-cream-dim/70">(1.280+ Google Yorumu)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <MapPin size={14} className="text-copper" />
              <span>Taksim Meydanı'na 5 Dk Yürüme (450m)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-ink/70 px-3.5 py-1.5 rounded-full border border-teal-dim/40 backdrop-blur-sm">
              <ShieldCheck size={14} className="text-teal" />
              <span>%100 Günlük Taze Yerli Et</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-copper to-gold text-[#0E0804] font-bold text-sm tracking-wide uppercase hover:opacity-95 transition-all shadow-lg shadow-copper/20 hover:scale-[1.02]"
            >
              <MessageCircle size={18} />
              <span>WhatsApp ile Masa Ayırt / Sipariş Ver</span>
            </a>
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJMz3TWu23yhQRZJD_LzDM82g"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card border border-teal-dim/40 text-cream font-medium text-sm hover:border-gold/50 hover:bg-gold/5 transition-all"
            >
              <Navigation size={16} className="text-copper" />
              <span>Google Haritalar Yol Tarifi</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST STATS STRIP ── */}
      <section className="border-y border-teal-dim/30 bg-[#140D07]/90 py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 border-r border-teal-dim/20">
            <div className="text-2xl sm:text-3xl font-black text-gold">1998</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Cihangir'de Kuruluş</div>
          </div>
          <div className="p-3 border-r border-teal-dim/20">
            <div className="text-2xl sm:text-3xl font-black text-cream">%100</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Zırh Kıyımı Taze Et</div>
          </div>
          <div className="p-3 border-r border-teal-dim/20">
            <div className="text-2xl sm:text-3xl font-black text-gold">4.6★</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">1.280+ Gerçek Yorum</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-cream">450°C</div>
            <div className="text-[11px] sm:text-xs text-cream-dim/80 mt-1 uppercase tracking-wider">Odun Ateşli Taş Fırın</div>
          </div>
        </div>
      </section>

      {/* ── 3. STORY OF CRAFTSMANSHIP & HERITAGE ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/30 text-copper text-xs font-semibold uppercase tracking-wider">
              <Flame size={13} />
              <span>Ocakbaşı ve Fırın Ustalığı</span>
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-black text-cream leading-tight"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              Cihangir'in 28 Yıllık Değişmeyen Lezzet Durağı
            </h2>

            <p className="text-cream-dim/85 text-sm sm:text-base leading-relaxed font-light">
              Taksim'in turistik kalabalığından sadece 450 metre uzaklaşarak Firuzağa Camii'nin tarihi sokağındaki <strong className="text-cream font-medium">Kardeşler Kebap</strong>'a ulaşırsınız.
            </p>

            <p className="text-cream-dim/85 text-sm sm:text-base leading-relaxed font-light">
              1998'den bu yana değişmeyen ilkemiz: Etleri her gün taze zırhla çekmek, yalnızca doğal meşe odunu kömüründe ağır ağır közlemek ve taş fırınımızda sipariş anında sıcacık pide ve lahmacun pişirmektir.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl glass-card border border-teal-dim/20">
                <Check size={16} className="text-teal shrink-0" />
                <span className="text-xs sm:text-sm text-cream font-medium">Dondurulmamış günlük yerli et</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl glass-card border border-teal-dim/20">
                <Check size={16} className="text-teal shrink-0" />
                <span className="text-xs sm:text-sm text-cream font-medium">Anında açılan taş fırın hamuru</span>
              </div>
            </div>
          </div>

          <div className="relative h-[280px] sm:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden border border-gold/30 shadow-xl group">
            <Image
              src="/images/27-Karisik-Kebap_1.webp"
              alt="Kardeşler Cihangir Karışık Kebap Ziyafet Tepsisi"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0804] via-transparent to-transparent"></div>
            
            <div className="absolute bottom-4 start-4 end-4 p-3.5 sm:p-4 rounded-xl glass-card border border-gold/30 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-cream font-bold text-sm sm:text-base">Ziyafet Karışık Izgara Tepsisi</h4>
                  <p className="text-cream-dim/70 text-xs">Meşe közünde pişen karışık kebaplar ve mezeler</p>
                </div>
                <span className="text-gold font-black text-base sm:text-lg">1600 ₺</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SIGNATURE DISHES WITH LIVE MULTI-CURRENCY CONVERTER ── */}
      <LandingDishesSection currentLocale="tr" />

      {/* ── 5. VERIFIED GOOGLE MAPS REVIEWS (DIRECT LINKS & AUTHENTIC SOURCE) ── */}
      <LandingVerifiedReviews currentLocale="tr" />

      {/* ── 6. FINAL VIP CALLOUT ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#140D07] to-[#0E0804] border-t border-teal-dim/30 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-copper/20 border border-copper/40 text-gold text-xs font-bold uppercase tracking-wider">
            <span>Rezervasyon ve Paket Servis</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-black text-cream leading-tight"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            28 Yıllık Ocakbaşı Geleneğini Bu Akşam Yaşayın
          </h2>

          <p className="text-cream-dim/80 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-light">
            Aile yemekleriniz, arkadaş buluşmalarınız veya Taksim turu sonrası lezzetli bir ocakbaşı ziyafeti için sizleri Cihangir'de bekliyoruz.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle size={18} />
              <span>WhatsApp ile Hemen İletişime Geç</span>
            </a>
            <a
              href="tel:+902122513696"
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl glass-card border border-teal-dim/40 text-cream hover:border-gold/50 font-bold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Phone size={16} className="text-teal" />
              <span>+90 212 251 36 96</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
