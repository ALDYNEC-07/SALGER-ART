/* 
 Этот файл рисует страницу конкретной серии по адресу в URL.
 Он показывает шапку сайта, хлебные крошки и ленту работ выбранной серии.
 Он позволяет открыть серию из любой карточки галереи и пролистать её работы.
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
/* Список пунктов меню храним в файле настроек, чтобы менять их один раз */
import { getNavItems } from "../../config/navConfig";
/* Берём данные выбранной серии из общего списка по её адресу */
import { getSeriesBySlug, seriesCollection } from "../../../data/seriesCollection";
import styles from "../SeriesPage.module.css";

type SeriesPageProps = {
  params: Promise<{ slug: string }>;
};

/* Подсказываем Next.js, какие адреса серий нужно заранее подготовить */
export function generateStaticParams() {
  return seriesCollection.map((series) => ({ slug: series.slug }));
}

export default async function SeriesDetailPage({ params }: SeriesPageProps) {
  /* Ищем серию по адресу страницы и заранее отсекаем неизвестные варианты */
  const { slug } = await params;
  const currentSeries = getSeriesBySlug(slug);

  if (!currentSeries) {
    notFound();
  }

  /* Пункты меню для страницы серии берём из общей конфигурации */
  const navItems: SiteNavItem[] = getNavItems("series");
  /* Собираем карточки серии с нужными размерами изображений для общей карусели */
  const carouselItems: SeriesCarouselItem[] = currentSeries.works.map((work) => ({
    title: work.title,
    meta: work.meta,
    image: work.image,
    alt: work.alt,
    sizes: "(max-width: 640px) 96vw, (max-width: 1200px) 66vw, 680px",
  }));

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
              <span aria-current="page">{currentSeries.title}</span>
            </nav>

            {/* В шапке серии оставляем только вступление и год, чтобы сразу настроить зрителя */}
            <header className={styles.seriesHeader}>
              <h1 id="series-title" className={styles.seriesHeaderIntro}>
                {currentSeries.intro}
              </h1>
              <p className={styles.seriesHeaderYear}>{currentSeries.year}</p>
            </header>
          </div>

          {/* Полоса карточек серии на всю ширину экрана с эффектом размытия соседей */}
          <div className={styles.seriesWorks}>
            <SeriesCarousel
              items={carouselItems}
              ariaLabel={`Работы серии «${currentSeries.title}»`}
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
