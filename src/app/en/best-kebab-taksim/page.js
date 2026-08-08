import { redirect } from "next/navigation";

export const metadata = {
  title: "Authentic Wood-Fired Kebab Near Taksim Square (Since 1998) | Kardeşler Cihangir",
  description:
    "Experience Istanbul's authentic oak-charcoal kebabs and stone-oven pides in historical Cihangir since 1998. Hand-minced meats, genuine local prices, 5-minute walk from Taksim.",
  alternates: {
    canonical: "https://kardeslercihangir.com/best-kebab-taksim",
    languages: {
      en: "https://kardeslercihangir.com/best-kebab-taksim",
      ar: "https://kardeslercihangir.com/ar/best-kebab-taksim",
      tr: "https://kardeslercihangir.com/tr/best-kebab-taksim",
      ru: "https://kardeslercihangir.com/ru/best-kebab-taksim",
      fa: "https://kardeslercihangir.com/fa/best-kebab-taksim",
      fr: "https://kardeslercihangir.com/fr/best-kebab-taksim",
    },
  },
};

// /en/best-kebab-taksim → permanent redirect to canonical /best-kebab-taksim
export default function EnBestKebabTakSimPage() {
  redirect("/best-kebab-taksim");
}
