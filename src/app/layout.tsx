/* 
 Этот файл задаёт общий каркас Next.js.
 Он подключает глобальные стили и базовые мета-теги страницы.
 Он оборачивает все разделы галереи в общий html и body.
*/
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { manrope } from "../fonts/manrope";

/* Здесь хранятся основные данные страницы: заголовок и краткое описание проекта */
export const metadata: Metadata = {
  title: "SALGER ART — онлайн-галерея",
  description: "Онлайн-галерея цифрового искусства.",
};

/* Эти параметры подсказывают браузеру, как правильно масштабировать сайт на телефонах */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/* Этот блок автоматически оборачивает каждую страницу в общий каркас сайта */
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
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
