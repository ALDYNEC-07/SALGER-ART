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
/* Подключаем ленту серий, где видно превью каждой подборки */
import { GalleryStrip } from "./components/GalleryStrip/GalleryStrip";
/* Подключаем блок с манифестом проекта, чтобы редактировать текст отдельно */
import { AboutSection } from "./components/AboutSection/AboutSection";
/* Подключаем общий футер со ссылками, чтобы не копировать его между страницами */
import { SiteFooter } from "./components/SiteFooter/SiteFooter";
/* Берём пункты меню из файла настроек, чтобы менять список один раз */
import { getNavItems } from "./config/navConfig";
/* Загружаем список серий из Supabase и подаём его в ленту как единый источник данных */
import { getGallerySeries } from "../lib/supabase";

export default async function Home() {
  /* Получаем пункты меню для этой страницы из общего списка */
  const navItems: SiteNavItem[] = getNavItems("home");

  /* Загружаем серии из Supabase; при ошибке оставляем пустой список, чтобы страница не падала */
  let gallerySeriesPreview: Awaited<ReturnType<typeof getGallerySeries>> = [];
  try {
    gallerySeriesPreview = await getGallerySeries();
  } catch {
    gallerySeriesPreview = [];
  }

  return (
    <>
      {/* Шапка сайта с логотипом и меню */}
      <SiteHeader logoHref="#hero" navItems={navItems} />

      <main>
        {/* Главный экран с приветствием и ссылкой к галерее */}
        <HeroSection />

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
