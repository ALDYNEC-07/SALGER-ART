/* 
 Этот файл описывает горизонтальную ленту серий на главной странице.
 Он показывает обложки серий и подсвечивает центральную карточку при прокрутке.
 Он позволяет листать карточки стрелками и подсвечивать нужную по наведению или фокусу.
*/

import type { GallerySeriesItem } from "../../data/gallerySeries";
import {
  SeriesCarousel,
  type SeriesCarouselItem,
} from "./SeriesCarousel";

type SeriesStripProps = {
  series: GallerySeriesItem[];
};

export function SeriesStrip({ series }: SeriesStripProps) {
  /* Готовим карточки галереи с нужными ссылками и размерами изображений для карусели */
  const carouselItems: SeriesCarouselItem[] = series.map((item) => ({
    title: item.title,
    meta: item.meta,
    image: item.image,
    alt: item.alt,
    href: "/series",
    sizes: "(max-width: 640px) 80vw, (max-width: 1200px) 46vw, 520px",
  }));

  return (
    <section id="gallery" className="page page--gallery" aria-labelledby="gallery-title">
      <div className="container">
        <header className="page__header">
          <h1 id="gallery-title" className="page-title">
            Галерея
          </h1>
          <p className="page-intro">
            Выберите серию — и войдите в отдельный зал.
          </p>
        </header>
      </div>

      {/* Полоса превью серий растягивается на всю ширину окна и свободно скроллится */}
      <SeriesCarousel
        items={carouselItems}
        railClassName="series-list__grid"
        ariaLabel="Список серий"
      />
    </section>
  );
}
