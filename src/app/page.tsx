/* 
 Этот файл собирает всю одностраничную галерею в Next.js.
 Он показывает шапку, блок Hero, ленту серий, манифест и футер.
 Он позволяет перейти к серии и к якорным разделам без перезагрузки страницы.
*/

/* Берём готовую шапку сайта с логотипом и меню из одного места */
import {
  SiteHeader,
  type SiteNavItem,
} from "./components/SiteHeader/SiteHeader";
/* Подключаем главный экран с приветствием, чтобы он не загромождал файл страницы */
import { HeroSection } from "./components/HeroSection/HeroSection";
/* Подключаем отдельный кураторский блок «экспонат дня» между приветствием и каталогом */
import {
  FeaturedExhibit,
  type FeaturedExhibitItem,
} from "./components/FeaturedExhibit/FeaturedExhibit";
/* Подключаем ленту серий, где видно превью каждой подборки */
import {
  GalleryStrip,
  type GalleryStripItem,
} from "./components/GalleryStrip/GalleryStrip";
/* Подключаем блок с манифестом проекта, чтобы редактировать текст отдельно */
import { AboutSection } from "./components/AboutSection/AboutSection";
/* Подключаем общий футер со ссылками, чтобы не копировать его между страницами */
import { SiteFooter } from "./components/SiteFooter/SiteFooter";
/* Берём пункты меню из файла настроек, чтобы менять список один раз */
import { getNavItems } from "./config/navConfig";
/* Загружаем список серий из Supabase из единого слоя данных */
import { getSeries } from "../lib/supabase";

/* Преобразуем данные серии в формат карточек, который ожидает лента галереи */
const toGalleryStripItems = (
  seriesList: Awaited<ReturnType<typeof getSeries>>
): GalleryStripItem[] => {
  return seriesList.map((series, index) => ({
    slug: series.slug,
    title: series.title,
    description: series.description,
    seriesNumber:
      typeof series.sort_order === "number" && Number.isFinite(series.sort_order)
        ? series.sort_order
        : index + 1,
    addedAt: series.created_at,
    image: series.cover_image_url,
    alt: series.title,
  }));
};

/* Берём последнюю личность прямо из текущего списка, чтобы блок совпадал с порядком галереи */
const getLatestFeaturedExhibitFromList = (
  seriesList: GalleryStripItem[]
): GalleryStripItem | null => {
  if (seriesList.length === 0) {
    return null;
  }

  return seriesList[seriesList.length - 1] ?? null;
};

/* Приводим данные серии к формату блока «экспонат дня», чтобы там оставался смысловой текст */
const toFeaturedExhibitItem = (
  item: GalleryStripItem | null
): FeaturedExhibitItem | null => {
  if (!item) {
    return null;
  }

  return {
    slug: item.slug,
    title: item.title,
    meta: item.description,
    image: item.image,
    alt: item.alt,
  };
};

/* Форматируем подпись даты добавления для блока «экспонат дня» */
const getFeaturedDateLabel = (value: string): string => {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return "Дата добавления не указана";
  }

  const formattedDate = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsedDate);
  return formattedDate;
};

export default async function Home() {
  /* Получаем пункты меню для этой страницы из общего списка */
  const navItems: SiteNavItem[] = getNavItems("home");

  /* Загружаем серии из Supabase; при ошибке оставляем пустой список, чтобы страница не падала */
  let gallerySeriesPreview: GalleryStripItem[] = [];
  try {
    const seriesRows = await getSeries();
    gallerySeriesPreview = toGalleryStripItems(seriesRows);
  } catch {
    gallerySeriesPreview = [];
  }
  /* Берём последнюю добавленную серию: экспонат меняется только после нового пополнения базы */
  const latestFeaturedSeries = getLatestFeaturedExhibitFromList(gallerySeriesPreview);
  const featuredExhibit = toFeaturedExhibitItem(latestFeaturedSeries);
  const featuredDateLabel = getFeaturedDateLabel(latestFeaturedSeries?.addedAt || "");

  return (
    <>
      {/* Шапка сайта с логотипом и меню */}
      <SiteHeader logoHref="#hero" navItems={navItems} />

      <main>
        {/* Главный экран с приветствием и ссылкой к галерее */}
        <HeroSection />

        {/* Кураторский акцент дня: одна серия показывается крупно перед всей лентой */}
        <FeaturedExhibit item={featuredExhibit} dateLabel={featuredDateLabel} />

        {/* Лента серий с карточками, чтобы перейти к нужной подборке */}
        <GalleryStrip series={gallerySeriesPreview} />

        {/* Блок манифеста проекта с описанием идеи */}
        <AboutSection />
      </main>

      {/* Общий футер с контактами и ссылками */}
      <SiteFooter />
    </>
  );
}
