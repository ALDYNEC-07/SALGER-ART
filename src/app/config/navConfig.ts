/* 
 Этот файл хранит настройки пунктов меню сайта.
 Он показывает, какие ссылки должны быть в шапке на разных страницах.
 Он позволяет менять меню в одном месте и сразу обновлять его на всех страницах.
*/
import type { SiteNavItem } from "../components/SiteHeader/SiteHeader";

/* Набор пунктов для главной страницы с якорями внутри одной страницы */
const homeNavItems: SiteNavItem[] = [
  { label: "Главная", href: "#hero", isActive: true },
  { label: "Галерея", href: "#gallery" },
  { label: "Серии", href: "/series" },
  { label: "О проекте", href: "#about" },
];

/* Набор пунктов для страницы серии: ссылки ведут на главную с нужными якорями */
const seriesNavItems: SiteNavItem[] = [
  { label: "Главная", href: "/" },
  { label: "Галерея", href: "/#gallery" },
  { label: "Серии", href: "/series", isActive: true },
  { label: "О проекте", href: "/#about" },
];

/* Простая фабрика, которая отдаёт нужное меню в зависимости от текущей страницы */
export const getNavItems = (page: "home" | "series"): SiteNavItem[] => {
  if (page === "series") {
    return seriesNavItems;
  }
  return homeNavItems;
};
