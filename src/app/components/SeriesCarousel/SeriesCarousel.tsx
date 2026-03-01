/* 
 Этот файл описывает общую горизонтальную карусель карточек.
 Он показывает прокручиваемую полосу карточек с подсветкой центральной.
 Он позволяет листать карточки клавиатурой, учитывать запрос на уменьшение анимации и реагировать на наведение.
*/
"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import styles from "./SeriesCarousel.module.css";

export type SeriesCarouselItem = {
  title: string;
  meta: string;
  year?: string;
  description?: string;
  image: StaticImageData | string;
  alt: string;
  href?: string;
  sizes: string;
};

type SeriesCarouselProps = {
  items: SeriesCarouselItem[];
  railClassName?: string;
  ariaLabel: string;
  tabIndex?: number;
  metaTone?: "default" | "series";
  showMeta?: boolean;
};

export function SeriesCarousel({
  items,
  railClassName = "",
  ariaLabel,
  tabIndex = 0,
  metaTone = "default",
  showMeta = false,
}: SeriesCarouselProps) {
  /* Запоминаем карточки, чтобы знать, куда скроллить и какую подсветить */
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  /* Храним контейнер полосы, чтобы понимать, какая карточка ближе всего к центру */
  const railRef = useRef<HTMLDivElement | null>(null);
  /* Следим, какая карточка активна, чтобы подсветка работала предсказуемо */
  const [activeIndex, setActiveIndex] = useState(0);
  /* Запоминаем, у каких карточек уже открыт полный текст описания */
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({});
  /* Храним ссылки на текст описаний, чтобы измерять их точную высоту */
  const descriptionRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  /* Храним высоты описаний: короткая версия и полная, чтобы анимация была плавной */
  const [descriptionHeights, setDescriptionHeights] = useState<
    Record<number, { collapsed: number; full: number }>
  >({});

  /* Составляем строку, чтобы понять, изменился ли список карточек, и не гонять эффект зря */
  const itemsSignature = items
    .map((item) => `${item.title}-${item.href ?? "nolink"}`)
    .join("|");
  /* Держим индекс в безопасных пределах, даже если список карточек сократился */
  const safeActiveIndex = Math.max(0, Math.min(activeIndex, Math.max(items.length - 1, 0)));

  /* Очищаем устаревшие ссылки карточек при обновлении списка */
  useEffect(() => {
    cardRefs.current.length = items.length;
    descriptionRefs.current.length = items.length;
  }, [items.length, itemsSignature]);

  /* Сбрасываем открытые описания, когда состав карточек меняется */
  useEffect(() => {
    setExpandedDescriptions({});
  }, [items.length, itemsSignature]);

  /* Измеряем полную высоту каждого описания, чтобы раскрывать текст целиком */
  useEffect(() => {
    const measureDescriptions = () => {
      const nextHeights: Record<number, { collapsed: number; full: number }> = {};

      descriptionRefs.current.forEach((descriptionElement, index) => {
        if (!descriptionElement) {
          return;
        }

        const computedStyles = window.getComputedStyle(descriptionElement);
        const lineHeight = Number.parseFloat(computedStyles.lineHeight);
        const collapsedHeight = Number.isFinite(lineHeight) ? lineHeight * 3 : 72;
        const fullHeight = Math.max(descriptionElement.scrollHeight, collapsedHeight);

        nextHeights[index] = {
          collapsed: collapsedHeight,
          full: fullHeight,
        };
      });

      setDescriptionHeights(nextHeights);
    };

    measureDescriptions();
    window.addEventListener("resize", measureDescriptions);

    return () => {
      window.removeEventListener("resize", measureDescriptions);
    };
  }, [items.length, itemsSignature]);

  /* Во время скролла сразу выделяем карточку, которая ближе всего к центру полосы */
  useEffect(() => {
    const railElement = railRef.current;
    if (!railElement || cardRefs.current.length === 0) {
      return;
    }

    let animationFrameId = 0;

    const syncActiveCardToCenter = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const currentRail = railRef.current;
        if (!currentRail) {
          return;
        }

        const railRect = currentRail.getBoundingClientRect();
        const railCenterX = railRect.left + railRect.width / 2;
        let nextActiveIndex = 0;
        let minDistance = Number.POSITIVE_INFINITY;

        cardRefs.current.forEach((card, index) => {
          if (!card) {
            return;
          }

          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const distanceToCenter = Math.abs(cardCenterX - railCenterX);

          if (distanceToCenter < minDistance) {
            minDistance = distanceToCenter;
            nextActiveIndex = index;
          }
        });

        setActiveIndex(nextActiveIndex);
      });
    };

    syncActiveCardToCenter();
    railElement.addEventListener("scroll", syncActiveCardToCenter, { passive: true });
    window.addEventListener("resize", syncActiveCardToCenter);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      railElement.removeEventListener("scroll", syncActiveCardToCenter);
      window.removeEventListener("resize", syncActiveCardToCenter);
    };
  }, [items.length, itemsSignature]);

  /* Прокручиваем полосу к нужной карточке с учётом предпочтений по анимации и сразу переставляем подсветку */
  const scrollToCard = (nextIndex: number) => {
    const targetCard = cardRefs.current[nextIndex];
    if (!targetCard) return;

    setActiveIndex(nextIndex);

    targetCard.scrollIntoView({
      behavior: "smooth",
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
      const nextIndex = Math.min(safeActiveIndex + 1, cardRefs.current.length - 1);
      scrollToCard(nextIndex);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prevIndex = Math.max(safeActiveIndex - 1, 0);
      scrollToCard(prevIndex);
    }
  };

  /* По клику раскрываем или сворачиваем полный текст описания у конкретной карточки */
  const toggleDescription = (
    event: MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
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
        const metaClassName = [styles.meta, metaTone === "series" ? styles.metaSeries : ""]
          .filter(Boolean)
          .join(" ");
        /* Готовим подпись с годом, чтобы показать её рядом с названием работы */
        const trimmedYear = (item.year ?? "").trim();
        /* Берём описание из базы, чтобы вывести его сразу после названия отдельным блоком */
        const trimmedDescription = (item.description ?? "").trim();
        const trimmedMeta = item.meta.trim();
        const isDescriptionExpanded = expandedDescriptions[index] === true;
        const descriptionHeight = descriptionHeights[index];
        const descriptionMaxHeight = descriptionHeight
          ? isDescriptionExpanded
            ? descriptionHeight.full
            : descriptionHeight.collapsed
          : undefined;

        /* Повторяемый контент карточки держим в одном месте, чтобы проще менять разметку */
        const cardContent = (
          <figure className={styles.figure}>
            <div className={styles.imagePlaceholder}>
              {/* Для URL из внешнего API отключаем оптимизацию Next Image, чтобы не зависеть от домена хранилища */}
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes={item.sizes}
                className={styles.image}
                priority={index === 0}
                unoptimized={typeof item.image === "string"}
              />
            </div>
            <figcaption className={styles.caption}>
              <h2 className={styles.title}>
                {item.title}
                {/* Год показываем только здесь: рядом с названием через точку */}
                {trimmedYear ? <span className={styles.titleYear}> • {trimmedYear}</span> : null}
              </h2>
              {/* Короткий текст о работе показываем сразу после названия, если он заполнен */}
              {trimmedDescription ? (
                <div className={styles.descriptionBlock}>
                  <p
                    className={[
                      styles.description,
                      isDescriptionExpanded ? styles.descriptionExpanded : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    ref={(node) => {
                      descriptionRefs.current[index] = node;
                    }}
                    style={
                      descriptionMaxHeight !== undefined
                        ? { maxHeight: `${descriptionMaxHeight}px` }
                        : undefined
                    }
                  >
                    {trimmedDescription}
                  </p>
                  <button
                    type="button"
                    className={[
                      styles.descriptionToggle,
                      isDescriptionExpanded ? styles.descriptionToggleExpanded : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-expanded={isDescriptionExpanded}
                    aria-label={isDescriptionExpanded ? "Свернуть описание" : "Показать описание полностью"}
                    onClick={(event) => toggleDescription(event, index)}
                  >
                    <span className={styles.descriptionChevron} aria-hidden="true" />
                  </button>
                </div>
              ) : null}
              {/* Подпись с деталями работы показываем только когда это явно включено */}
              {showMeta && trimmedMeta ? <p className={metaClassName}>{trimmedMeta}</p> : null}
            </figcaption>
          </figure>
        );

        /* Один общий обработчик подсвечивает карточку при наведении или фокусе */
        const activateCard = () => setActiveIndex(index);

        const href = item.href ?? "";
        const cardKey = href ? `${href}-${item.title}` : item.title;
        const hasLink = href.length > 0;
        const isHashLink = hasLink && href.startsWith("#");

        return (
          <article
            key={cardKey}
            /* Сразу ставим нужный класс подсветки, чтобы не трогать DOM вручную */
            className={[
              styles.card,
              safeActiveIndex === index ? styles.cardActive : styles.cardDim,
            ].join(" ")}
            role="listitem"
            aria-current={safeActiveIndex === index ? "true" : undefined}
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
            {/* Если у карточки нет перехода, оставляем её без ссылки, чтобы не было клика */}
            {!hasLink ? (
              <div className={styles.cardLink} tabIndex={0} onFocus={activateCard}>
                {cardContent}
              </div>
            ) : isHashLink ? (
              <a
                href={href}
                className={styles.cardLink}
                /* При фокусе клавиатурой также подсвечиваем выбранную карточку */
                onFocus={activateCard}
              >
                {cardContent}
              </a>
            ) : (
              <Link
                href={href}
                className={styles.cardLink}
                /* При фокусе клавиатурой также подсвечиваем выбранную карточку */
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
