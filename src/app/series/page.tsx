/* 
 Этот файл описывает отдельную страницу серии.
 Он показывает шапку сайта, хлебные крошки и полосу карточек с работами серии.
 Он позволяет пролистывать карточки по стрелкам, смотреть описание и вернуться на главную страницу.
*/

import Link from "next/link";
/* Берём готовую шапку сайта (логотип и меню) из одного места */
import {
  SiteHeader,
  type SiteNavItem,
} from "../components/SiteHeader/SiteHeader";
/* Подключаем общий футер, чтобы не копировать его разметку */
import { SiteFooter } from "../components/SiteFooter";
/* Подключаем общую карусель карточек, чтобы логика скролла оставалась одинаковой */
import {
  SeriesCarousel,
  type SeriesCarouselItem,
} from "../components/SeriesCarousel/SeriesCarousel";
/* Список пунктов меню храним в файле настроек, чтобы менять их один раз */
import { getNavItems } from "../components/navConfig";
/* Берём список работ серии из одного файла, чтобы карточки совпадали на всех страницах */
import { seriesWorks } from "../../data/seriesWorks";

export default function SeriesPage() {
  /* Пункты меню для страницы серии берём из общей конфигурации */
  const navItems: SiteNavItem[] = getNavItems("series");
  /* Собираем карточки серии с нужными размерами изображений для общей карусели */
  const carouselItems: SeriesCarouselItem[] = seriesWorks.map((work) => ({
    title: work.title,
    meta: work.meta,
    image: work.image,
    alt: work.alt,
    href: "#series",
    sizes: "(max-width: 640px) 92vw, (max-width: 1200px) 48vw, 420px",
  }));

  return (
    <>
      {/* Общая шапка, чтобы логотип и меню работали как на главной */}
      <SiteHeader logoHref="/" navItems={navItems} />

      <main>
        {/* Отдельная страница серии с хлебными крошками и полосой карточек */}
        <section
          id="series"
          className="page page--series"
          aria-labelledby="series-title"
        >
          <div className="container">
            {/* Хлебные крошки на случай возврата в галерею */}
            <nav className="breadcrumbs" aria-label="Хлебные крошки">
              <Link href="/#gallery">Галерея</Link>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">Северное сияние</span>
            </nav>

            <header className="series-header">
              <h1 id="series-title" className="series-header__title">
                Северное сияние
              </h1>
              <p className="series-header__meta">Серия цифровых работ, 2024</p>
              <p className="series-header__intro">
                Короткий манифест серии: одна–две строки о настроении и идее,
                без длинных описаний.
              </p>
            </header>
          </div>

          {/* Полоса карточек серии на всю ширину экрана с эффектом размытия соседей */}
          <div className="series-works">
            <SeriesCarousel
              items={carouselItems}
              ariaLabel="Работы серии «Северное сияние»"
              metaTone="series"
            />
          </div>
        </section>
      </main>

      {/* Общий футер вынесен в компонент, чтобы использовать на всех страницах серии */}
      <SiteFooter />
    </>
  );
}
