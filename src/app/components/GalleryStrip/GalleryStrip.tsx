/* 
 Этот файл описывает горизонтальную ленту серий на главной странице.
 Он показывает обложки серий и подсвечивает центральную карточку при прокрутке.
 Он позволяет листать карточки стрелками и подсвечивать нужную по наведению или фокусу.
*/

import {
  SeriesCarousel,
  type SeriesCarouselItem,
} from "../SeriesCarousel/SeriesCarousel";
import styles from "./GalleryStrip.module.css";

export type GalleryStripItem = {
  slug: string;
  title: string;
  meta: string;
  image: SeriesCarouselItem["image"];
  alt: string;
};

type GalleryStripProps = {
  series: GalleryStripItem[];
};

export function GalleryStrip({ series }: GalleryStripProps) {
  /* Готовим карточки галереи с нужными ссылками и размерами изображений для карусели */
  const carouselItems: SeriesCarouselItem[] = series.map((item) => ({
    id: item.slug,
    /* Укорачиваем подпись, чтобы карточка выглядела как каталожный лист и не перегружалась текстом */
    title: item.title,
    meta:
      item.meta.length > 92
        ? `${item.meta.slice(0, 89).trimEnd()}...`
        : item.meta,
    image: item.image,
    alt: item.alt,
    href: `/series/${item.slug}`,
    sizes: "(max-width: 640px) 96vw, (max-width: 1200px) 64vw, 680px",
  }));

  return (
    <section
      id="gallery"
      className={`page ${styles.pageGallery}`}
      aria-labelledby="gallery-title"
    >
      <div className="container">
        <header className="page__header">
          {/* Короткий служебный лейбл задаёт настроение музейного каталога */}
          <p className={styles.galleryKicker}>Каталог выставки</p>
          <h1 id="gallery-title" className="page-title">
            Галерея
          </h1>
        </header>
      </div>

      {/* Полоса превью серий растягивается на всю ширину окна и свободно скроллится */}
      <SeriesCarousel
        items={carouselItems}
        ariaLabel="Список серий"
        showMeta
      />
    </section>
  );
}
