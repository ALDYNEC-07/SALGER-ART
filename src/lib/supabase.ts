/*
 Этот файл читает данные серий и работ из Supabase PostgREST.
 Он отправляет запросы к таблицам series и artworks_with_series и возвращает подготовленные массивы.
 Он нужен, чтобы страницы брали данные из одного места и не дублировали сетевую логику.
*/

const SERIES_IMAGE_FALLBACK_URL = "/Logo.png";

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

export type SupabaseGallerySeriesItem = {
  slug: string;
  title: string;
  meta: string;
  image: string;
  alt: string;
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

const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
  }

  return {
    url: url.replace(/\/$/, ""),
    anonKey,
  };
};

const buildSeriesUrl = (url: string): string => {
  return `${url}/rest/v1/series?select=*&published=eq.true&order=sort_order.asc`;
};

const buildArtworksBySeriesUrl = (url: string, seriesSlug: string): string => {
  const encodedSlug = encodeURIComponent(seriesSlug);
  return `${url}/rest/v1/artworks_with_series?select=*&published=eq.true&series_slug=eq.${encodedSlug}&order=sort_order.asc`;
};

async function fetchRows(url: string): Promise<RawSupabaseRow[]> {
  const { anonKey } = getSupabaseConfig();

  const response = await fetch(url, {
    method: "GET",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
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
  const { url } = getSupabaseConfig();
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

  const seriesRows = await getSeries();
  return seriesRows.find((series) => series.slug === normalizedSlug) ?? null;
}

export async function getArtworksBySeriesSlug(seriesSlug: string): Promise<SupabaseArtworkRow[]> {
  const normalizedSlug = seriesSlug.trim().toLowerCase();
  if (!normalizedSlug) {
    return [];
  }

  const { url } = getSupabaseConfig();
  const rows = await fetchRows(buildArtworksBySeriesUrl(url, normalizedSlug));

  return sortBySortOrder(rows.map(normalizeArtworkRow)).filter(
    (artwork) => artwork.published && artwork.series_slug === normalizedSlug
  );
}

export async function getGallerySeries(): Promise<SupabaseGallerySeriesItem[]> {
  const seriesRows = await getSeries();

  return seriesRows.map((series) => ({
    slug: series.slug,
    title: series.title,
    meta: series.description,
    image: series.cover_image_url || SERIES_IMAGE_FALLBACK_URL,
    alt: series.title,
  }));
}
