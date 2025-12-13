/* 
 Этот файл собирает всю одностраничную галерею в Next.js.
 Он показывает шапку, блок Hero, галерею серий и манифест о проекте на одной странице.
 Он позволяет прокручивать страницу по якорям и переходить к нужному разделу без перезагрузки.
*/
"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";
/* Данные галереи вынесены в отдельный файл, чтобы пополнять их без правки компонента */
import { gallerySeries } from "../data/gallerySeries";
/* Общая шапка вынесена в переиспользуемый компонент, чтобы держать её в одном месте */
import { SiteHeader, type SiteNavItem } from "../../components/SiteHeader";

export default function Home() {
  /* Пункты меню для одностраничной галереи: активный пункт и ссылки на блоки страницы */
  const navItems: SiteNavItem[] = [
    { label: "Главная", href: "#hero", isActive: true },
    { label: "Галерея", href: "#gallery" },
    { label: "Серии", href: "/series" },
    { label: "О проекте", href: "#about" },
  ];
  /* Список серий для превью берём из базы данных в папке data, чтобы данные жили отдельно от разметки */
  const gallerySeriesPreview = gallerySeries;
  /* Запоминаем карточки галереи, чтобы знать, куда скроллить и кого выделять */
  const galleryCardRefs = useRef<HTMLElement[]>([]);
  /* Запоминаем контейнер галереи, который скроллится по горизонтали */
  const galleryListRef = useRef<HTMLDivElement | null>(null);
  /* Следим, какая карточка сейчас в центре, чтобы подсвечивать её среди остальных */
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  /* Учитываем запрос пользователя на минимальное движение */
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  /* При загрузке проверяем запрос на уменьшение анимаций и обновляем его при изменении настроек */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

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

  /* Отмечаем центральную карточку через IntersectionObserver, чтобы выделять её без ручных кликов */
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

    galleryCardRefs.current.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  /* Переключаем классы активной и приглушённых карточек, как только вычислили центральную */
  useEffect(() => {
    galleryCardRefs.current.forEach((card, index) => {
      if (!card) return;
      card.classList.toggle("is-active", index === activeCardIndex);
      card.classList.toggle("is-dim", index !== activeCardIndex);
    });
  }, [activeCardIndex]);

  /* Прокрутка к нужной карточке влево/вправо с учётом предпочтений по анимации */
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
    <>
      {/* Общая шапка для всей одностраничной галереи */}
      <SiteHeader logoHref="#hero" navItems={navItems} />

      <main>
        {/* ===================== Hero / Главная ===================== */}
        <section id="hero" className="page page--home" aria-labelledby="hero-title">
          <div className="hero">
            <div className="hero__inner">
              <div className="hero__layout">
                {/* Ключевой визуальный блок с рамкой под арт и мягким сиянием */}
                <div className="hero__media" aria-hidden="true">
                  {/* Логотип проекта в центре рамки, чтобы напомнить о бренде */}
                  <div className="hero__media-note">
                    <Image
                      src="/Logo.png"
                      alt="Логотип SALGER ART"
                      fill
                      sizes="(max-width: 768px) 92vw, 640px"
                      priority
                      className="hero__logo"
                    />
                  </div>
                </div>

                {/* Слоган и главный заголовок, совмещённые с центром визуала, когда блоки стоят рядом */}
                <div className="hero__content">
                  <p className="hero__eyebrow">Онлайн-галерея цифрового искусства</p>
                  <h1 id="hero-title" className="hero__title">
                    One Bold Idea
                  </h1>
                  <p className="hero__subtitle">Everything starts with focus.</p>
                </div>
              </div>

              {/* Призыв прокрутить вниз к галерее */}
              <div className="hero__scroll">
                <a className="hero__scroll-link" href="#gallery">
                  <span className="hero__scroll-icon" aria-hidden="true"></span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== Галерея серий ===================== */}
        <section
          id="gallery"
          className="page page--gallery"
          aria-labelledby="gallery-title"
        >
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
            {gallerySeriesPreview.map((series, index) => (
              <article
                key={series.title}
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
                        src={series.image}
                        alt={series.alt}
                        fill
                        sizes="(max-width: 640px) 80vw, (max-width: 1200px) 46vw, 520px"
                        className="series-card__image"
                        priority={index === 0}
                      />
                    </div>
                    <figcaption className="series-card__caption">
                      <h2 className="series-card__title">{series.title}</h2>
                      <p className="series-card__meta">{series.meta}</p>
                    </figcaption>
                  </figure>
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ===================== О проекте (манифест) ===================== */}
        <section id="about" className="page page--about" aria-labelledby="about-title">
          <div className="container">
            <header className="page__header">
              <h1 id="about-title" className="page-title">
                О проекте
              </h1>
            </header>

            <div className="page__body">
              <div className="about-layout">
                {/* Текст манифеста */}
                <div className="manifest-text">
                  <p className="manifest-lead">«В тишине рождается образ».</p>

                  <p>
                    Этот онлайн-проект родился из усталости от визуального шума.
                    Я захотел создать пространство, где изображение дышит, а
                    зрителю не нужно торопиться.
                  </p>

                  <p>
                    <strong>«Искусство тишины»</strong> — не витрина и не реклама.
                    Это личная галерея цифровых работ, собранных вокруг одной идеи:
                    в минимализме остается только главное, и именно оно звучит
                    громче всего.
                  </p>

                  <p>
                    Мне важно, чтобы вы могли вернуться к этим изображениям так же,
                    как возвращаются к любимым залам музея: без суеты, без
                    отвлекающих баннеров, без навязчивых подсказок. Просто
                    созерцание и короткие слова там, где они действительно нужны.
                  </p>

                  <p>
                    Если вам близки тишина, пауза и внимательное отношение
                    к деталям — вы в правильном месте.
                  </p>

                  <p className="manifest-signature">
                    Спасибо за внимание к моему искусству. Присоединяйтесь к тишине.
                  </p>
                </div>

                {/* Опциональный портрет / иллюстрация */}
                <aside
                  className="about-media"
                  aria-label="Фотография или иллюстрация автора"
                >
                  <div className="about-media__placeholder" aria-hidden="true"></div>
                  <p className="about-media__caption">
                    Здесь может быть нейтральный портрет автора или абстрактное изображение.
                  </p>
                </aside>
              </div>
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
