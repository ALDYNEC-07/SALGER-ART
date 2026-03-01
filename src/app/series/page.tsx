/* 
 Этот файл показывает страницу со всеми доступными сериями.
 Он выводит шапку сайта, ленту карточек серий и общий футер.
 Он позволяет выбрать любую серию и перейти на её отдельную страницу с работами.
*/

/* Берём готовую шапку сайта (логотип и меню) из одного места */
import {
  SiteHeader,
  type SiteNavItem,
} from "../components/SiteHeader/SiteHeader";
/* Подключаем ленту серий, чтобы не дублировать её разметку */
import {
  GalleryStrip,
  type GalleryStripItem,
} from "../components/GalleryStrip/GalleryStrip";
/* Подключаем общий футер, чтобы не копировать его разметку */
import { SiteFooter } from "../components/SiteFooter/SiteFooter";
/* Список пунктов меню храним в файле настроек, чтобы менять их один раз */
import { getNavItems } from "../config/navConfig";
/* Загружаем серии из Supabase, чтобы страница не зависела от локальных данных */
import { getSeries } from "../../lib/supabase";

/* Переводим данные серии в карточки галереи, которые понимает готовый визуальный компонент */
const toGalleryStripItems = (
  seriesList: Awaited<ReturnType<typeof getSeries>>
): GalleryStripItem[] => {
  return seriesList.map((series) => ({
    slug: series.slug,
    title: series.title,
    meta: series.description,
    image: series.cover_image_url || "/Logo.png",
    alt: series.title,
  }));
};

export default async function SeriesPage() {
  /* Пункты меню для страницы серии берём из общей конфигурации */
  const navItems: SiteNavItem[] = getNavItems("series");

  /* Получаем список серий из Supabase; если API недоступен, отдаём пустую ленту */
  let seriesList: GalleryStripItem[] = [];
  try {
    const seriesRows = await getSeries();
    seriesList = toGalleryStripItems(seriesRows);
  } catch {
    seriesList = [];
  }

  return (
    <>
      {/* Общая шапка, чтобы логотип и меню повторяли главную страницу */}
      <SiteHeader logoHref="/" navItems={navItems} />

      <main>
        {/* Полноэкранный список всех серий, чтобы выбрать нужную карточку */}
        <GalleryStrip series={seriesList} />
      </main>

      {/* Общий футер вынесен в компонент, чтобы использовать на всех страницах серии */}
      <SiteFooter />
    </>
  );
}
