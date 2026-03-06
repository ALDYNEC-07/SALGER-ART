/* 
 Этот файл задаёт режим «кураторского зала» для страницы серии.
 Он показывает одну большую активную работу и список остальных работ рядом.
 Он позволяет выбирать работу из списка, видеть прогресс и путь серии по трём актам.
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

/* Храним названия трёх актов, чтобы одна и та же шкала использовалась во всём блоке */
const ACT_LABELS = ["Пролог", "Перелом", "Эхо"] as const;

type ActLabel = (typeof ACT_LABELS)[number];

/* Приводим индекс к безопасному диапазону, чтобы интерфейс не ломался при пустых данных */
const getSafeIndex = (index: number, length: number): number => {
  if (length === 0) {
    return 0;
  }
  return Math.max(0, Math.min(index, length - 1));
};

/* Определяем акт по месту работы в общем порядке, чтобы деление работало при любом количестве */
const getActLabelByIndex = (index: number, length: number): ActLabel => {
  if (length <= 1) {
    return ACT_LABELS[0];
  }

  const progress = index / (length - 1);

  if (progress < 1 / 3) {
    return ACT_LABELS[0];
  }

  if (progress < 2 / 3) {
    return ACT_LABELS[1];
  }

  return ACT_LABELS[2];
};

/* Приводим номер к виду «07», чтобы прогресс читался одинаково */
const formatProgressValue = (value: number): string => {
  return String(value).padStart(2, "0");
};

export function SeriesCuratedHall({ items, ariaLabel }: SeriesCuratedHallProps) {
  /* Запоминаем номер выбранной работы, чтобы показывать её в большом формате */
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
  /* Для выбранной работы считаем акт и формируем строку прогресса справа */
  const activeAct = getActLabelByIndex(safeActiveIndex, items.length);
  const progressCurrent = formatProgressValue(safeActiveIndex + 1);
  const progressTotal = formatProgressValue(items.length);

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
            />
          </div>
          <figcaption className={styles.previewCaption}>
            <h2 className={styles.previewTitle}>
              {activeItem.title}
              <span className={styles.previewAct}> — {activeAct}</span>
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
        {/* Показываем текущее положение в серии: выбранная работа из общего числа */}
        <p className={styles.listProgress}>
          {progressCurrent} / {progressTotal}
        </p>
        <ol className={styles.workList}>
          {items.map((item, index) => {
            const itemYear = (item.year ?? "").trim();
            const isActive = index === safeActiveIndex;
            const itemKey = `${item.title}-${index}`;
            const itemAct = getActLabelByIndex(index, items.length);

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
                    <span className={styles.workTitleRow}>
                      <span className={styles.workTitle}>{item.title}</span>
                      <span className={styles.workAct}>{itemAct}</span>
                    </span>
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
