import { Cairo, Tajawal } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["600", "700", "800", "900"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Kardeşler Cihangir | Digital Menu",
  description: "Smart QR Menu for Kardeşler Cihangir Restaurant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cairo.variable} ${tajawal.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-cream font-[var(--font-tajawal)]">
        <AppProvider>
          <Header />
          <main className="flex-grow w-full max-w-5xl mx-auto flex flex-col relative">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
