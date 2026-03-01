# ART

Онлайн-галерея на Next.js 16 (App Router), где данные серий и работ приходят из Supabase.

## Стек

- Next.js `16.1.6`
- React `19.2.1`
- TypeScript `^5`
- ESLint `^9` + `eslint-config-next`
- Node.js `>=20.9.0`
- npm `>=10.9.3`

## Data layer (Supabase)

Серверный слой данных находится в `src/lib/supabase.ts` и работает через Supabase REST API (`/rest/v1`).

Что делает слой данных:
- читает серии из таблицы `series`;
- читает работы серии из `artworks_with_series`;
- нормализует поля (текст, число, boolean);
- фильтрует только опубликованные записи;
- сортирует по `sort_order`.

Где используется:
- `src/app/page.tsx`
- `src/app/series/page.tsx`
- `src/app/series/[slug]/page.tsx`

## Переменные окружения (`.env.local`)

В проекте реально используются только эти переменные:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

Важно:
- код читает именно `NEXT_PUBLIC_SUPABASE_URL` и `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Запуск проекта

1. Установить зависимости:

```bash
npm ci
```

2. Создать/обновить `.env.local` с двумя переменными выше.

3. Запустить dev-сервер:

```bash
npm run dev
```

Приложение будет доступно на `http://localhost:3000`.

## Проверки и сборка

```bash
npm run lint
npm run typecheck
npm run build
```

Дополнительно:

```bash
npm run start
```
