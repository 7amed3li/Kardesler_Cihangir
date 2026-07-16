import { Geist, Geist_Mono } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kardeşler Cihangir | Digital Menu",
  description: "Smart QR Menu for Kardeşler Cihangir Restaurant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
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
