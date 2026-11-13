import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CLIMATE UZBEKISTAN — Bugungi harakat, ertangi kelajak",
    template: "%s — CLIMATE UZBEKISTAN",
  },
  description:
    "O‘zbekiston va Markaziy Osiyo iqlimi bo‘yicha monitoring, AI tahlil, muammolar xaritasi, yechimlar va jamoaviy ekologik harakatlar ekotizimi.",
};

const themeInit = `(function(){try{var t=localStorage.getItem("cu_theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");}}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-soft font-sans text-ink antialiased dark:bg-ink dark:text-soft">
        {children}
      </body>
    </html>
  );
}
