// src/app/layout.tsx

import type { Metadata } from "next";
// Імпортуємо шрифт Inter з бібліотеки Google Fonts
import { Inter } from "next/font/google";
import "./globals.css";

// Налаштовуємо шрифт: вказуємо, які накреслення (жирність) нам потрібні
const inter = Inter({ 
  subsets: ["latin", "cyrillic"], // Додаємо кирилицю
  weight: ["400", "500", "700", "800"], // Regular, Medium, Bold, ExtraBold
  variable: '--font-inter', // Створюємо CSS-змінну для шрифту
});

export const metadata: Metadata = {
  title: "GlamAI",
  description: "AI-Powered Hairstyle Transformations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {/* Застосовуємо клас шрифту до тегу body.
        Це зробить Inter шрифтом за замовчуванням для всього сайту.
      */}
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}