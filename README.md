# ART

Проект онлайн-галереи на Next.js 16 (App Router) с исходниками в `src/`.

## Стек

- Next.js `16.0.10`
- React `19.2.1`
- TypeScript `^5`
- ESLint `^9` + `eslint-config-next`
- Node.js `>=20.9.0`

## Структура

```text
src/
  app/
    layout.tsx
    page.tsx
    series/
      page.tsx
      [slug]/page.tsx
    components/
    config/
    assets/
  data/
  fonts/
public/
  fonts/
```

Ключевые страницы:
- `src/app/page.tsx` — главная
- `src/app/series/page.tsx` — список серий
- `src/app/series/[slug]/page.tsx` — страница отдельной серии

## Шрифт

Используется локальный `Manrope` через `next/font/local`:
- конфигурация: `src/fonts/manrope.ts`
- файлы: `public/fonts/*`

## Установка и запуск

```bash
npm ci
npm run dev
```

Приложение доступно на `http://localhost:3000`.

## Скрипты

```bash
npm run dev        # локальная разработка
npm run build      # production-сборка
npm run start      # запуск production-сборки
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run check      # lint + typecheck
```
