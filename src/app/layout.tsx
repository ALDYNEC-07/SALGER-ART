/* 
 Этот файл задаёт общий каркас Next.js.
 Он подключает глобальные стили и базовые мета-теги страницы.
 Он оборачивает все разделы галереи в общий html и body.
*/
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SALGER ART — онлайн-галерея",
  description: "Онлайн-галерея цифрового искусства.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru">
      {/* Базовые мета-теги, чтобы страница корректно открывалась в браузере */}
      <head>
        <meta charSet="utf-8" />
      </head>
      {/* Обёртка для всего содержимого галереи на странице */}
      <body>{children}</body>
    </html>
  );
}
