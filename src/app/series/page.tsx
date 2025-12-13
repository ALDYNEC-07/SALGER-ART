/* 
 Этот файл описывает отдельную страницу серии.
 Он показывает шапку сайта, хлебные крошки и полосу карточек с работами серии.
 Он позволяет пролистывать карточки по стрелкам, смотреть описание и вернуться на главную страницу.
*/
"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import krugImage from "@/app/assets/Krug.jpg";
import lineImage from "@/app/assets/Line.png";
import scenaImage from "@/app/assets/Scena.jpg";
/* Общая шапка вынесена в переиспользуемый компонент, чтобы держать её в одном месте */
import { SiteHeader, type SiteNavItem } from "../components/SiteHeader";

export default function SeriesPage() {
  /* Пункты меню для страницы с сериями: активным остаётся раздел «Серии» */
  const navItems: SiteNavItem[] = [
    { label: "Главная", href: "/" },
    { label: "Галерея", href: "/#gallery" },
    { label: "Серии", href: "/series", isActive: true },
    { label: "О проекте", href: "/#about" },
  ];
  /* Работы серии: название, описание и иллюстрация из assets */
  const seriesWorks = [
    {
      title: "Полярная тишина",
      meta: "Холодное свечение, будто северное сияние застыло в кадре.",
      image: scenaImage,
      alt: "Полотно «Полярная тишина»: мягкий свет прожекторов на тёмном фоне",
    },
    {
      title: "Ночная грань",
      meta: "Ровные линии неона, которые держат пространство в равновесии.",
      image: lineImage,
      alt: "Полотно «Ночная грань»: тонкие полосы неона на тёмном фоне",
    },
    {
      title: "Тёплый круг",
      meta: "Плавный круг цвета, который собирает взгляд в одну точку.",
      image: krugImage,
      alt: "Полотно «Тёплый круг»: кольца света на нейтральном фоне",
    },
  ];
  /* Запоминаем карточки серии, чтобы понимать, какая сейчас в центре */
  const seriesCardRefs = useRef<HTMLElement[]>([]);
  /* Контейнер горизонтальной полосы карточек для отслеживания пересечений */
  const seriesListRef = useRef<HTMLDivElement | null>(null);
  /* Следим, какая карточка сейчас активна, чтобы убирать размытие у неё */
  const [activeSeriesCardIndex, setActiveSeriesCardIndex] = useState(0);
  /* Учитываем запрос пользователя на минимальное движение */
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  /* Следим за изменениями системного запроса на уменьшение анимации */
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

  /* Отмечаем центральную карточку серии через IntersectionObserver, чтобы подсветить её */
  useEffect(() => {
    if (!seriesListRef.current || seriesCardRefs.current.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const index = seriesCardRefs.current.indexOf(entry.target as HTMLElement);
            if (index >= 0) {
              setActiveSeriesCardIndex(index);
            }
          }
        });
      },
      {
        root: seriesListRef.current,
        threshold: 0.6,
      }
    );

    seriesCardRefs.current.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  /* Включаем размытие у соседних карточек и убираем его у активной */
  useEffect(() => {
    seriesCardRefs.current.forEach((card, index) => {
      if (!card) return;
      card.classList.toggle("is-active", index === activeSeriesCardIndex);
      card.classList.toggle("is-dim", index !== activeSeriesCardIndex);
    });
  }, [activeSeriesCardIndex]);

  /* Прокрутка по карточкам серии с учётом предпочтений по анимации */
  const scrollToSeriesCard = (nextIndex: number) => {
    const targetCard = seriesCardRefs.current[nextIndex];
    if (!targetCard) return;

    targetCard.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  /* Стрелки двигают полосу серии, чтобы выбрать нужную работу */
  const handleSeriesKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!seriesCardRefs.current.length) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = Math.min(
        activeSeriesCardIndex + 1,
        seriesCardRefs.current.length - 1
      );
      scrollToSeriesCard(nextIndex);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prevIndex = Math.max(activeSeriesCardIndex - 1, 0);
      scrollToSeriesCard(prevIndex);
    }
  };

  return (
    <>
      {/* Общая шапка, чтобы логотип и меню работали как на главной */}
      <SiteHeader logoHref="/" navItems={navItems} />

      <main>
        {/* Отдельная страница серии с хлебными крошками и полосой карточек */}
        <section
          id="series"
          className="page page--series"
          aria-labelledby="series-title"
        >
          <div className="container">
            {/* Хлебные крошки на случай возврата в галерею */}
            <nav className="breadcrumbs" aria-label="Хлебные крошки">
              <Link href="/#gallery">Галерея</Link>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">Северное сияние</span>
            </nav>

            <header className="series-header">
              <h1 id="series-title" className="series-header__title">
                Северное сияние
              </h1>
              <p className="series-header__meta">Серия цифровых работ, 2024</p>
              <p className="series-header__intro">
                Короткий манифест серии: одна–две строки о настроении и идее,
                без длинных описаний.
              </p>
            </header>
          </div>

          {/* Полоса карточек серии на всю ширину экрана с эффектом размытия соседей */}
          <div className="series-works">
            <div
              className="series-works__rail"
              aria-label="Работы серии «Северное сияние»"
              ref={seriesListRef}
              onKeyDown={handleSeriesKeyDown}
              tabIndex={0}
            >
              {seriesWorks.map((work, index) => (
                <article
                  key={work.title}
                  className="series-card"
                  ref={(node) => {
                    if (node) {
                      seriesCardRefs.current[index] = node;
                    }
                  }}
                  /* При наведении снимаем размытие с выбранной карточки серии */
                  onMouseEnter={() => setActiveSeriesCardIndex(index)}
                >
                  <a
                    href="#series"
                    className="series-card__link"
                    /* При фокусе через клавиатуру также делаем карточку чёткой */
                    onFocus={() => setActiveSeriesCardIndex(index)}
                  >
                    <figure className="series-card__figure">
                      <div className="series-card__image-placeholder">
                        <Image
                          src={work.image}
                          alt={work.alt}
                          fill
                          sizes="(max-width: 640px) 92vw, (max-width: 1200px) 48vw, 420px"
                          className="series-card__image"
                          priority={index === 0}
                        />
                      </div>
                      <figcaption className="series-card__caption">
                        <h2 className="series-card__title">{work.title}</h2>
                        <p className="series-card__meta">{work.meta}</p>
                      </figcaption>
                    </figure>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div>© Онлайн-галерея «SALGER ART»</div>
          <div>Контакт: example@email.com</div>
        </div>
      </footer>
    </>
  );
}
