/*
 Этот файл получает данные серий и работ из Supabase для серверных страниц.
 Он запрашивает таблицы series и artworks_with_series и приводит ответы к стабильному виду.
 Он нужен как единый слой данных, чтобы страницы не дублировали запросы и обработку полей.
*/

import "server-only";

type RawSupabaseRow = Record<string, unknown>;

export type SupabaseSeriesRow = {
  id: number;
  slug: string;
  title: string;
  description: string;
  cover_image_url: string;
  sort_order: number | null;
  published: boolean;
};

export type SupabaseArtworkRow = {
  id: number;
  slug: string;
  title: string;
  description: string;
  year: string;
  medium: string;
  size: string;
  image_url: string;
  alt: string;
  sort_order: number | null;
  published: boolean;
  series_slug: string;
};

const toText = (value: unknown): string => {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return "";
};

const toNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
};

const toBoolean = (value: unknown): boolean => {
  return value === true;
};

const normalizeSeriesRow = (row: RawSupabaseRow): SupabaseSeriesRow => {
  return {
    id: toNumber(row.id) ?? 0,
    slug: toText(row.slug).toLowerCase(),
    title: toText(row.title),
    description: toText(row.description),
    cover_image_url: toText(row.cover_image_url),
    sort_order: toNumber(row.sort_order),
    published: toBoolean(row.published),
  };
};

const normalizeArtworkRow = (row: RawSupabaseRow): SupabaseArtworkRow => {
  const title = toText(row.title);

  return {
    id: toNumber(row.id) ?? 0,
    slug: toText(row.slug).toLowerCase(),
    title,
    description: toText(row.description),
    year: toText(row.year),
    medium: toText(row.medium),
    size: toText(row.size),
    image_url: toText(row.image_url),
    alt: toText(row.alt) || title,
    sort_order: toNumber(row.sort_order),
    published: toBoolean(row.published),
    series_slug: toText(row.series_slug).toLowerCase(),
  };
};

const sortBySortOrder = <T extends { sort_order: number | null }>(rows: T[]): T[] => {
  return rows
    .map((row, index) => ({ row, index }))
    .sort((left, right) => {
      const leftOrder = left.row.sort_order ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = right.row.sort_order ?? Number.MAX_SAFE_INTEGER;

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }

      return left.index - right.index;
    })
    .map(({ row }) => row);
};

/* Читаем только серверные переменные окружения, чтобы ключи не попадали в клиентский код */
const getSupabaseServerConfig = (): { url: string; apiKey: string } => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !apiKey) {
    throw new Error(
      "Supabase env is missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return {
    url: url.replace(/\/$/, ""),
    apiKey,
  };
};

const buildSeriesUrl = (url: string): string => {
  const requestUrl = new URL("/rest/v1/series", url);
  requestUrl.searchParams.set(
    "select",
    "id,slug,title,description,cover_image_url,sort_order,published"
  );
  requestUrl.searchParams.set("published", "eq.true");
  requestUrl.searchParams.set("order", "sort_order.asc");
  return requestUrl.toString();
};

const buildSeriesBySlugUrl = (url: string, slug: string): string => {
  const requestUrl = new URL("/rest/v1/series", url);
  requestUrl.searchParams.set(
    "select",
    "id,slug,title,description,cover_image_url,sort_order,published"
  );
  requestUrl.searchParams.set("published", "eq.true");
  requestUrl.searchParams.set("slug", `eq.${slug}`);
  requestUrl.searchParams.set("limit", "1");
  return requestUrl.toString();
};

const buildArtworksBySeriesUrl = (url: string, seriesSlug: string): string => {
  const requestUrl = new URL("/rest/v1/artworks_with_series", url);
  requestUrl.searchParams.set(
    "select",
    "id,slug,title,description,year,medium,size,image_url,alt,sort_order,published,series_slug"
  );
  requestUrl.searchParams.set("published", "eq.true");
  requestUrl.searchParams.set("series_slug", `eq.${seriesSlug}`);
  requestUrl.searchParams.set("order", "sort_order.asc");
  return requestUrl.toString();
};

async function fetchRows(url: string): Promise<RawSupabaseRow[]> {
  const { apiKey } = getSupabaseServerConfig();

  const response = await fetch(url, {
    method: "GET",
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase request failed: ${response.status}`);
  }

  const data = (await response.json()) as unknown;
  return Array.isArray(data) ? (data as RawSupabaseRow[]) : [];
}

export async function getSeries(): Promise<SupabaseSeriesRow[]> {
  const { url } = getSupabaseServerConfig();
  const rows = await fetchRows(buildSeriesUrl(url));

  return sortBySortOrder(rows.map(normalizeSeriesRow)).filter(
    (series) => series.published && series.slug.length > 0
  );
}

export async function getSeriesBySlug(slug: string): Promise<SupabaseSeriesRow | null> {
  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug) {
    return null;
  }

  const { url } = getSupabaseServerConfig();
  const rows = await fetchRows(buildSeriesBySlugUrl(url, normalizedSlug));
  const currentSeries = rows[0];

  if (!currentSeries) {
    return null;
  }

  const normalizedSeries = normalizeSeriesRow(currentSeries);
  if (!normalizedSeries.published || normalizedSeries.slug.length === 0) {
    return null;
  }

  return normalizedSeries;
}

export async function getArtworksBySeriesSlug(seriesSlug: string): Promise<SupabaseArtworkRow[]> {
  const normalizedSlug = seriesSlug.trim().toLowerCase();
  if (!normalizedSlug) {
    return [];
  }

  const { url } = getSupabaseServerConfig();
  const rows = await fetchRows(buildArtworksBySeriesUrl(url, normalizedSlug));

  return sortBySortOrder(rows.map(normalizeArtworkRow)).filter(
    (artwork) => artwork.published && artwork.series_slug === normalizedSlug
  );
}
