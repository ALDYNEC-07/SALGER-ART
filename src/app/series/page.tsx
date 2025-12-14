/* 
 Этот файл показывает страницу со всеми доступными сериями.
 Он выводит шапку сайта, ленту карточек серий и общий футер.
 Он позволяет выбрать любую серию и перейти на её отдельную страницу с работами.
*/

/* Берём данные серий из одного файла, чтобы список карточек совпадал на главной и на отдельной странице */
import { gallerySeries } from "../../data/gallerySeries";
/* Берём готовую шапку сайта (логотип и меню) из одного места */
import {
  SiteHeader,
  type SiteNavItem,
} from "../components/SiteHeader/SiteHeader";
/* Подключаем ленту серий, чтобы не дублировать её разметку */
import { GalleryStrip } from "../components/GalleryStrip/GalleryStrip";
/* Подключаем общий футер, чтобы не копировать его разметку */
import { SiteFooter } from "../components/SiteFooter/SiteFooter";
/* Список пунктов меню храним в файле настроек, чтобы менять их один раз */
import { getNavItems } from "../config/navConfig";

export default function SeriesPage() {
  /* Пункты меню для страницы серии берём из общей конфигурации */
  const navItems: SiteNavItem[] = getNavItems("series");
  /* Готовим список серий для карточек на странице выбора серии */
  const seriesList = gallerySeries;

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
