/* 
 Этот файл описывает общую горизонтальную карусель карточек.
 Он показывает прокручиваемую полосу карточек с подсветкой центральной.
 Он позволяет листать карточки клавиатурой, учитывать запрос на уменьшение анимации и реагировать на наведение.
*/
"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import styles from "./SeriesCarousel.module.css";

export type SeriesCarouselItem = {
  title: string;
  meta: string;
  image: StaticImageData;
  alt: string;
  href: string;
  sizes: string;
};

type SeriesCarouselProps = {
  items: SeriesCarouselItem[];
  railClassName?: string;
  ariaLabel: string;
  tabIndex?: number;
  metaTone?: "default" | "series";
};

export function SeriesCarousel({
  items,
  railClassName = "",
  ariaLabel,
  tabIndex = 0,
  metaTone = "default",
}: SeriesCarouselProps) {
  /* Запоминаем карточки, чтобы знать, куда скроллить и какую подсветить */
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  /* Отслеживаем, какая карточка видна сильнее остальных, чтобы подсветку не сносило скачками */
  const visibilityRatios = useRef<number[]>([]);
  /* Фиксируем контейнер полосы, чтобы отслеживать, какие карточки видны в данный момент */
  const railRef = useRef<HTMLDivElement | null>(null);
  /* Следим, какая карточка активна, чтобы добавлять или убирать размытие */
  const [activeIndex, setActiveIndex] = useState(0);
  /* Сразу учитываем системный запрос на уменьшение анимации, чтобы не включать плавный скролл лишний раз */
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  /* Составляем строку, чтобы понять, изменился ли список карточек, и не гонять эффект зря */
  const itemsSignature = items.map((item) => `${item.title}-${item.href}`).join("|");

  /* Обновляем реакцию на изменение системной настройки движения без перезагрузки страницы */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  /* Очищаем устаревшие ссылки и видимость карточек, не даём активному индексу выходить за пределы новых данных */
  useEffect(() => {
    cardRefs.current.length = items.length;
    visibilityRatios.current = new Array(items.length).fill(0);
    setActiveIndex((prevIndex) => {
      if (items.length === 0) return 0;
      const safeIndex = Math.min(prevIndex, items.length - 1);
      return prevIndex === safeIndex ? prevIndex : safeIndex;
    });
  }, [items.length, itemsSignature]);

  /* Ищем самую заметную карточку в зоне видимости и реагируем на любое изменение доли видимости */
  useEffect(() => {
    if (!railRef.current || cardRefs.current.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLElement);
          if (index >= 0) {
            visibilityRatios.current[index] = entry.isIntersecting ? entry.intersectionRatio : 0;
          }
        });

        if (!visibilityRatios.current.length) {
          return;
        }

        const bestIndex = visibilityRatios.current.reduce((best, ratio, idx, arr) => {
          return ratio > arr[best] ? idx : best;
        }, 0);

        setActiveIndex((prevIndex) => {
          if (visibilityRatios.current[bestIndex] === 0) {
            return 0;
          }
          return prevIndex === bestIndex ? prevIndex : bestIndex;
        });
      },
      {
        root: railRef.current,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    cardRefs.current.forEach((card) => {
      if (!card) return;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [items.length, itemsSignature]);

  /* Прокручиваем полосу к нужной карточке с учётом предпочтений по анимации и сразу переставляем подсветку */
  const scrollToCard = (nextIndex: number) => {
    const targetCard = cardRefs.current[nextIndex];
    if (!targetCard) return;

    setActiveIndex(nextIndex);

    targetCard.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  /* Управляем полосой клавиатурой: стрелки двигают к соседним карточкам */
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!cardRefs.current.length) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = Math.min(activeIndex + 1, cardRefs.current.length - 1);
      scrollToCard(nextIndex);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prevIndex = Math.max(activeIndex - 1, 0);
      scrollToCard(prevIndex);
    }
  };

  return (
    <div
      className={[styles.rail, railClassName].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
      role="list"
      ref={railRef}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
    >
      {items.map((item, index) => {
        const metaClassName = [
          styles.meta,
          metaTone === "series" ? styles.metaSeries : "",
        ]
          .filter(Boolean)
          .join(" ");

        /* Повторяемый контент карточки держим в одном месте, чтобы проще менять разметку */
        const cardContent = (
          <figure className={styles.figure}>
            <div className={styles.imagePlaceholder}>
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes={item.sizes}
                className={styles.image}
                priority={index === 0}
              />
            </div>
            <figcaption className={styles.caption}>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={metaClassName}>{item.meta}</p>
            </figcaption>
          </figure>
        );

        /* Один общий обработчик снимает размытие при наведении или фокусе */
        const activateCard = () => setActiveIndex(index);

        return (
          <article
            key={`${item.href}-${item.title}`}
            /* Сразу ставим нужный класс подсветки, чтобы не трогать DOM вручную */
            className={[
              styles.card,
              activeIndex === index ? styles.cardActive : styles.cardDim,
            ].join(" ")}
            role="listitem"
            aria-current={activeIndex === index ? "true" : undefined}
            ref={(node) => {
              if (node) {
                cardRefs.current[index] = node;
              } else {
                cardRefs.current[index] = null;
              }
            }}
            /* При наведении сразу делаем карточку чёткой */
            onMouseEnter={activateCard}
          >
            {item.href.startsWith("#") ? (
              <a
                href={item.href}
                className={styles.cardLink}
                /* При фокусе клавиатурой также снимаем размытие с выбранной карточки */
                onFocus={activateCard}
              >
                {cardContent}
              </a>
            ) : (
              <Link
                href={item.href}
                className={styles.cardLink}
                /* При фокусе клавиатурой также снимаем размытие с выбранной карточки */
                onFocus={activateCard}
              >
                {cardContent}
              </Link>
            )}
          </article>
        );
      })}
    </div>
  );
}
