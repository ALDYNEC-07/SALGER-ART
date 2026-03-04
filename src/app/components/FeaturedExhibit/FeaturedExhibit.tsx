/* 
 Этот файл описывает блок «Экспонат дня» на главной странице.
 Он показывает одну выбранную серию крупно: обложку, название и короткое пояснение.
 Он позволяет перейти к этой серии сразу из главного экрана, как в кураторской витрине.
*/

import Image from "next/image";
import Link from "next/link";
import type { SeriesCarouselItem } from "../SeriesCarousel/SeriesCarousel";
import styles from "./FeaturedExhibit.module.css";

export type FeaturedExhibitItem = {
  slug: string;
  title: string;
  meta: string;
  image: SeriesCarouselItem["image"];
  alt: string;
};

type FeaturedExhibitProps = {
  item: FeaturedExhibitItem | null;
  dateLabel: string;
};

export function FeaturedExhibit({ item, dateLabel }: FeaturedExhibitProps) {
  /* Если серии не загрузились, скрываем блок, чтобы не показывать пустую рамку */
  if (!item) {
    return null;
  }

  return (
    <section className={`page ${styles.pageFeatured}`} aria-labelledby="featured-exhibit-title">
      <div className="container">
        {/* Каркас блока делит экран на текстовую часть и визуальный экспонат */}
        <div className={styles.featuredLayout}>
          {/* Левая колонка объясняет, почему сегодня подсвечена именно эта серия */}
          <div className={styles.featuredCopy}>
            <p className={styles.featuredKicker}>Экспонат дня</p>
            <p className={styles.featuredDate}>{dateLabel}</p>
            <h2 id="featured-exhibit-title" className={styles.featuredTitle}>
              {item.title}
            </h2>
            <p className={styles.featuredMeta}>
              {item.meta || "Сегодня куратор выделил эту серию как главный вход в галерею."}
            </p>
            {/* Главная кнопка ведёт напрямую в выбранную серию */}
            <Link href={`/series/${item.slug}`} className={styles.featuredCta}>
              Открыть серию
            </Link>
          </div>

          {/* Правая колонка показывает обложку серии в формате музейной карточки */}
          <figure className={styles.featuredFigure}>
            <div className={styles.featuredMedia}>
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 46vw"
                className={styles.featuredImage}
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
