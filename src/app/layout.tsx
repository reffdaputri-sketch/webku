import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "FLazDev | Premium Software Engineer Portfolio & CV",
  description: "Katalog proyek profesional, riwayat pencapaian, serta layanan pengembangan sistem web dan mobile berstandar tinggi untuk solusi digital masa depan.",
  keywords: ["Portfolio", "CV", "Software Engineer", "Next.js", "Fullstack", "Web Development", "Mobile App"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={outfit.variable}>
      <body className={outfit.className}>
        {children}
      </body>
    </html>
  );
}
