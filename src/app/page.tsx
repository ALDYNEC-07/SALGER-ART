/* 
 Этот файл собирает всю одностраничную галерею в Next.js.
 Он показывает шапку, блок Hero, галерею серий и манифест о проекте на одной странице.
 Он позволяет прокручивать страницу по якорям и переходить к нужному разделу без перезагрузки.
*/
/* Берём данные галереи из отдельного файла, чтобы добавлять серии без правки страницы */
import { gallerySeries } from "../data/gallerySeries";
/* Подключаем готовую шапку сайта с логотипом и меню из одного места */
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

export default function Home() {
  /* Получаем пункты меню для этой страницы из общего списка */
  const navItems: SiteNavItem[] = getNavItems("home");
  /* Используем общий список серий для карточек на ленте */
  const gallerySeriesPreview = gallerySeries;

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
