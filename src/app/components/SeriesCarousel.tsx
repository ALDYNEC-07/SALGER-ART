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
  railClassName: string;
  ariaLabel: string;
  tabIndex?: number;
};

export function SeriesCarousel({
  items,
  railClassName,
  ariaLabel,
  tabIndex = 0,
}: SeriesCarouselProps) {
  /* Запоминаем карточки, чтобы знать, куда скроллить и какую подсветить */
  const cardRefs = useRef<HTMLElement[]>([]);
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

  /* Отмечаем карточку, которая занимает центр видимой области, чтобы подсветить её */
  useEffect(() => {
    if (!railRef.current || cardRefs.current.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const index = cardRefs.current.indexOf(entry.target as HTMLElement);
            if (index >= 0) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: railRef.current,
        threshold: 0.6,
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [items.length]);

  /* Переключаем визуальный акцент между карточками */
  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      card.classList.toggle("is-active", index === activeIndex);
      card.classList.toggle("is-dim", index !== activeIndex);
    });
  }, [activeIndex]);

  /* Прокручиваем полосу к нужной карточке с учётом предпочтений по анимации */
  const scrollToCard = (nextIndex: number) => {
    const targetCard = cardRefs.current[nextIndex];
    if (!targetCard) return;

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
      className={railClassName}
      aria-label={ariaLabel}
      ref={railRef}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
    >
      {items.map((item, index) => (
        <article
          key={item.title}
          className="series-card"
          ref={(node) => {
            if (node) {
              cardRefs.current[index] = node;
            }
          }}
          /* При наведении сразу делаем карточку чёткой */
          onMouseEnter={() => setActiveIndex(index)}
        >
          <a
            href={item.href}
            className="series-card__link"
            /* При фокусе клавиатурой также снимаем размытие с выбранной карточки */
            onFocus={() => setActiveIndex(index)}
          >
            <figure className="series-card__figure">
              <div className="series-card__image-placeholder">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes={item.sizes}
                  className="series-card__image"
                  priority={index === 0}
                />
              </div>
              <figcaption className="series-card__caption">
                <h2 className="series-card__title">{item.title}</h2>
                <p className="series-card__meta">{item.meta}</p>
              </figcaption>
            </figure>
          </a>
        </article>
      ))}
    </div>
  );
}
