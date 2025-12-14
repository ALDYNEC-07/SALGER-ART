/* 
 Этот файл описывает горизонтальную ленту серий на главной странице.
 Он показывает обложки серий и подсвечивает центральную карточку при прокрутке.
 Он позволяет листать карточки стрелками и подсвечивать нужную по наведению или фокусу.
*/
"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";
import type { GallerySeriesItem } from "../../data/gallerySeries";

type SeriesStripProps = {
  series: GallerySeriesItem[];
};

export function SeriesStrip({ series }: SeriesStripProps) {
  /* Запоминаем карточки, чтобы знать, куда скроллить и какую подсвечивать */
  const galleryCardRefs = useRef<HTMLElement[]>([]);
  /* Храним ссылку на контейнер, внутри которого крутится горизонтальная лента */
  const galleryListRef = useRef<HTMLDivElement | null>(null);
  /* Фиксируем активную карточку, чтобы добавлять классы для подсветки */
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  /* Сразу учитываем запрос пользователя на минимальное движение, чтобы не включать плавный скролл лишний раз */
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  /* Следим, если пользователь поменяет настройку уменьшения анимаций, и обновляем скролл без перезагрузки */
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

  /* Отмечаем центральную карточку через IntersectionObserver, чтобы подсветка менялась автоматически */
  useEffect(() => {
    if (!galleryListRef.current || galleryCardRefs.current.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const index = galleryCardRefs.current.indexOf(entry.target as HTMLElement);
            if (index >= 0) {
              setActiveCardIndex(index);
            }
          }
        });
      },
      {
        root: galleryListRef.current,
        threshold: 0.6,
      }
    );

    galleryCardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [series.length]);

  /* Сразу переключаем классы, чтобы активная карточка была ярче, а остальные приглушёнными */
  useEffect(() => {
    galleryCardRefs.current.forEach((card, index) => {
      if (!card) return;
      card.classList.toggle("is-active", index === activeCardIndex);
      card.classList.toggle("is-dim", index !== activeCardIndex);
    });
  }, [activeCardIndex]);

  /* Скроллим к нужной карточке с учётом предпочтений по анимации */
  const scrollToCard = (nextIndex: number) => {
    const targetCard = galleryCardRefs.current[nextIndex];
    if (!targetCard) return;

    targetCard.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  /* Стрелки влево/вправо двигают карусель к соседним карточкам */
  const handleGalleryKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!galleryCardRefs.current.length) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = Math.min(
        activeCardIndex + 1,
        galleryCardRefs.current.length - 1
      );
      scrollToCard(nextIndex);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prevIndex = Math.max(activeCardIndex - 1, 0);
      scrollToCard(prevIndex);
    }
  };

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
      <div
        className="series-list__grid"
        aria-label="Список серий"
        ref={galleryListRef}
        onKeyDown={handleGalleryKeyDown}
        tabIndex={0}
      >
        {series.map((item, index) => (
          <article
            key={item.title}
            className="series-card"
            ref={(node) => {
              if (node) {
                galleryCardRefs.current[index] = node;
              }
            }}
            /* При наведении сразу отмечаем карточку активной, чтобы выбранная не оставалась размытой */
            onMouseEnter={() => setActiveCardIndex(index)}
          >
            <a
              href="/series"
              className="series-card__link"
              /* При фокусе через клавиатуру тоже снимаем размытие с выбранной карточки */
              onFocus={() => setActiveCardIndex(index)}
            >
              <figure className="series-card__figure">
                <div className="series-card__image-placeholder">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1200px) 46vw, 520px"
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
    </section>
  );
}
