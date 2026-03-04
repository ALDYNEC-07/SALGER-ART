/* 
 Этот файл рисует страницу конкретной серии по адресу в URL.
 Он показывает шапку сайта, хлебные крошки и ленту работ выбранной серии.
 Он позволяет открыть серию из любой карточки галереи и пролистать её работы из Supabase.
*/

import Link from "next/link";
import { notFound } from "next/navigation";
/* Берём готовую шапку сайта (логотип и меню) из одного места */
import {
  SiteHeader,
  type SiteNavItem,
} from "../../components/SiteHeader/SiteHeader";
/* Подключаем общий футер, чтобы не копировать его разметку */
import { SiteFooter } from "../../components/SiteFooter/SiteFooter";
/* Подключаем общую карусель карточек, чтобы логика скролла оставалась одинаковой */
import {
  SeriesCarousel,
  type SeriesCarouselItem,
} from "../../components/SeriesCarousel/SeriesCarousel";
/* Подключаем отдельный режим показа серии для широких экранов */
import { SeriesCuratedHall } from "../../components/SeriesCuratedHall/SeriesCuratedHall";
/* Список пунктов меню храним в файле настроек, чтобы менять их один раз */
import { getNavItems } from "../../config/navConfig";
/* Берём серию и её работы из Supabase, чтобы страница не зависела от локальных файлов данных */
import {
  getArtworksBySeriesSlug,
  getSeries,
  getSeriesBySlug,
  type SupabaseArtworkRow,
  type SupabaseSeriesRow,
} from "../../../lib/supabase";
import styles from "../SeriesPage.module.css";

type SeriesPageProps = {
  params: Promise<{ slug: string }>;
};

/* Преобразуем любое значение в безопасный текст, чтобы спокойно собирать интерфейс при неполных данных */
const toTextValue = (value: unknown): string => {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return "";
};

/* Берём номер серии из sort_order, а если его нет — подставляем id как безопасный резерв */
const getSeriesNumberValue = (series: SupabaseSeriesRow): number => {
  if (typeof series.sort_order === "number" && Number.isFinite(series.sort_order)) {
    return series.sort_order;
  }

  return series.id > 0 ? series.id : 1;
};

/* Приводим дату добавления к читаемому виду для шапки страницы */
const formatSeriesAddedDate = (value: string): string => {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return "дата не указана";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsedDate);
};

/* Достаём порядок карточки из поля sort_order, чтобы список был предсказуемым */
const getArtworkOrderValue = (artwork: SupabaseArtworkRow): number => {
  const orderField = artwork.sort_order;
  return typeof orderField === "number" ? orderField : Number.MAX_SAFE_INTEGER;
};

/* Подсказываем Next.js, какие адреса серий можно заранее подготовить */
export async function generateStaticParams() {
  let seriesRows: SupabaseSeriesRow[] = [];

  try {
    seriesRows = await getSeries();
  } catch {
    seriesRows = [];
  }

  return seriesRows
    .map((series) => toTextValue(series.slug))
    .filter((slug): slug is string => slug.length > 0)
    .map((slug) => ({ slug }));
}

export default async function SeriesDetailPage({ params }: SeriesPageProps) {
  /* Ищем серию по адресу страницы и заранее отсекаем неизвестные варианты */
  const { slug } = await params;

  let currentSeries: SupabaseSeriesRow | null = null;
  try {
    currentSeries = await getSeriesBySlug(slug);
  } catch {
    currentSeries = null;
  }

  if (!currentSeries) {
    notFound();
  }

  /* Загружаем работы серии из Supabase по текущему адресу страницы */
  let seriesArtworks: SupabaseArtworkRow[] = [];
  try {
    seriesArtworks = await getArtworksBySeriesSlug(slug);
  } catch {
    seriesArtworks = [];
  }

  /* Пункты меню для страницы серии берём из общей конфигурации */
  const navItems: SiteNavItem[] = getNavItems("series");
  /* Достаём текстовые поля серии, чтобы шапка работала даже при неполных данных API */
  const seriesTitle = toTextValue(currentSeries.title) || "Серия";
  const seriesIntro = toTextValue(currentSeries.description) || seriesTitle;
  const seriesCoverImage = toTextValue(currentSeries.cover_image_url) || "/Logo.png";
  const seriesNumberLabel = String(getSeriesNumberValue(currentSeries)).padStart(2, "0");
  const seriesAddedDateLabel = formatSeriesAddedDate(currentSeries.created_at);

  /* Сортируем работы по порядку из Supabase, а затем собираем карточки для общей карусели */
  const carouselItems: SeriesCarouselItem[] = [...seriesArtworks]
    .sort((a, b) => getArtworkOrderValue(a) - getArtworkOrderValue(b))
    .map((artwork, index) => {
      const title = toTextValue(artwork.title) || `Работа ${index + 1}`;
      const imageUrl = toTextValue(artwork.image_url);
      const alt = toTextValue(artwork.alt) || title;
      const year = toTextValue(artwork.year);
      const description = toTextValue(artwork.description);

      return {
        id:
          toTextValue(artwork.slug) ||
          (typeof artwork.id === "number" ? String(artwork.id) : `artwork-${index}`),
        title,
        /* В карточке оставляем год рядом с названием */
        year,
        /* Короткое описание берём из базы и ставим рядом с названием отдельным блоком */
        description,
        /* Детали вроде техники и размера остаются скрыты */
        meta: "",
        image: imageUrl || seriesCoverImage,
        alt,
        sizes: "(max-width: 640px) 96vw, (max-width: 1200px) 66vw, 680px",
      };
    });

  return (
    <>
      {/* Общая шапка, чтобы логотип и меню работали как на главной */}
      <SiteHeader logoHref="/" navItems={navItems} />

      <main>
        {/* Отдельная страница серии с хлебными крошками и полосой карточек */}
        <section
          id="series"
          className={`page ${styles.pageSeries}`}
          aria-labelledby="series-title"
        >
          <div className="container">
            {/* Хлебные крошки на случай возврата в галерею */}
            <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
              <Link href="/#gallery">Галерея</Link>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">{seriesTitle}</span>
            </nav>

            {/* В шапке серии показываем вступление и служебные данные о серии */}
            <header className={styles.seriesHeader}>
              <h1 id="series-title" className={styles.seriesHeaderIntro}>
                {seriesIntro}
              </h1>
              {/* Под заголовком показываем номер серии и дату публикации */}
              <p className={styles.seriesHeaderYear}>
                Серия {seriesNumberLabel} • Добавлено {seriesAddedDateLabel}
              </p>
            </header>
          </div>

          {/* Для серии используем два режима: мобильную ленту и desktop-зал */}
          <div className={styles.seriesWorks}>
            {/* На мобильных оставляем привычную горизонтальную ленту */}
            <div className={styles.seriesWorksMobile}>
              <SeriesCarousel
                items={carouselItems}
                ariaLabel={`Работы серии «${seriesTitle}»`}
                metaTone="series"
              />
            </div>

            {/* На немобильных экранах показываем «кураторский зал» */}
            <div className={styles.seriesWorksDesktop}>
              <SeriesCuratedHall
                items={carouselItems}
                ariaLabel={`Работы серии «${seriesTitle}»`}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Общий футер вынесен в компонент, чтобы использовать на всех страницах серии */}
      <SiteFooter />
    </>
  );
}
