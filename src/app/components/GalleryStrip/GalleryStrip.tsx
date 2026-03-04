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
  description: string;
  seriesNumber: number;
  addedAt: string;
  image: SeriesCarouselItem["image"];
  alt: string;
};

type GalleryStripProps = {
  series: GalleryStripItem[];
};

/* Приводим номер серии к виду «№01», чтобы в карточках был единый формат */
const formatSeriesNumber = (value: number): string => {
  const safeNumber = Number.isFinite(value) && value > 0 ? Math.floor(value) : 1;
  return `№${String(safeNumber).padStart(2, "0")}`;
};

/* Приводим дату добавления к удобному виду для карточки */
const formatAddedDate = (value: string): string => {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return "дата не указана";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsedDate);
};

/* Собираем подпись карточки: номер серии и дата её добавления */
const getSeriesMeta = (item: GalleryStripItem): string => {
  const seriesNumberLabel = formatSeriesNumber(item.seriesNumber);
  const addedDateLabel = formatAddedDate(item.addedAt);
  return `Серия ${seriesNumberLabel} • Добавлено ${addedDateLabel}`;
};

export function GalleryStrip({ series }: GalleryStripProps) {
  /* Готовим карточки галереи с нужными ссылками и размерами изображений для карусели */
  const carouselItems: SeriesCarouselItem[] = series.map((item) => ({
    id: item.slug,
    /* В подписи каждой карточки показываем номер серии и дату её добавления */
    title: item.title,
    meta: getSeriesMeta(item),
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
