/* 
 Этот файл задаёт режим «кураторского зала» для страницы серии.
 Он показывает одну большую активную работу и список остальных работ рядом.
 Он позволяет выбирать работу из списка и сразу видеть её крупно с описанием.
*/
"use client";

import { useState } from "react";
import Image from "next/image";
import type { SeriesCarouselItem } from "../SeriesCarousel/SeriesCarousel";
import styles from "./SeriesCuratedHall.module.css";

type SeriesCuratedHallProps = {
  items: SeriesCarouselItem[];
  ariaLabel: string;
};

/* Приводим индекс к безопасному диапазону, чтобы интерфейс не ломался при пустых данных */
const getSafeIndex = (index: number, length: number): number => {
  if (length === 0) {
    return 0;
  }
  return Math.max(0, Math.min(index, length - 1));
};

export function SeriesCuratedHall({ items, ariaLabel }: SeriesCuratedHallProps) {
  /* Храним номер выбранной работы, чтобы показывать её в большом формате */
  const [activeIndex, setActiveIndex] = useState(0);
  const safeActiveIndex = getSafeIndex(activeIndex, items.length);
  const activeItem = items[safeActiveIndex] ?? null;

  /* Если работ нет, показываем спокойную подпись вместо пустого макета */
  if (!activeItem) {
    return (
      <section className={styles.empty} aria-label={ariaLabel}>
        <p className={styles.emptyText}>В этой серии пока нет опубликованных работ.</p>
      </section>
    );
  }

  const activeYear = (activeItem.year ?? "").trim();
  const activeDescription = (activeItem.description ?? "").trim();

  return (
    <section className={styles.hall} aria-label={ariaLabel}>
      {/* Слева показываем одну выбранную работу в крупном формате */}
      <div className={styles.previewColumn}>
        <figure className={styles.previewFigure}>
          <div className={styles.previewMedia}>
            <Image
              src={activeItem.image}
              alt={activeItem.alt}
              fill
              sizes="(max-width: 1200px) 66vw, 980px"
              className={styles.previewImage}
              priority
              unoptimized={typeof activeItem.image === "string"}
            />
          </div>
          <figcaption className={styles.previewCaption}>
            <h2 className={styles.previewTitle}>
              {activeItem.title}
              {activeYear ? <span className={styles.previewYear}> • {activeYear}</span> : null}
            </h2>
            {activeDescription ? (
              <p className={styles.previewDescription}>{activeDescription}</p>
            ) : null}
          </figcaption>
        </figure>
      </div>

      {/* Справа даём список всех работ серии, чтобы быстро переключаться между ними */}
      <aside className={styles.listColumn} aria-label="Список работ серии">
        <ol className={styles.workList}>
          {items.map((item, index) => {
            const itemYear = (item.year ?? "").trim();
            const isActive = index === safeActiveIndex;
            const itemKey = `${item.title}-${index}`;

            return (
              <li key={itemKey} className={styles.workListItem}>
                {/* Кнопка выбирает работу и обновляет крупный просмотр слева */}
                <button
                  type="button"
                  className={[
                    styles.workButton,
                    isActive ? styles.workButtonActive : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className={styles.workNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.workText}>
                    <span className={styles.workTitle}>{item.title}</span>
                    {itemYear ? <span className={styles.workYear}>{itemYear}</span> : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </aside>
    </section>
  );
}
