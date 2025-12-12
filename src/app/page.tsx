/* 
 Этот файл собирает всю одностраничную галерею в Next.js.
 Он показывает шапку, блок Hero, галерею, пример серии и манифест о проекте на одной странице.
 Он позволяет прокручивать страницу по якорям и переходить к нужному разделу без перезагрузки.
*/
"use client";

import { useState } from "react";

export default function Home() {
  /* Простое переключение меню, чтобы оверлей открывался и закрывался без сбоев */
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Общая шапка для всей одностраничной галереи */}
      <header className="site-header">
        <div className="container site-header__inner">
          <a href="#hero" className="site-logo">
            <span>SALGER ART</span>
          </a>

          {/* Основная навигация по разделам, открывается поверх контента на мобильных */}
          <nav className="site-nav" aria-label="Основная навигация">
            <input
              type="checkbox"
              id="nav-toggle"
              className="site-nav__checkbox"
              aria-hidden="true"
              checked={menuOpen}
              onChange={() => setMenuOpen((prev) => !prev)}
            />
            <label
              htmlFor="nav-toggle"
              className="site-nav__toggle"
              aria-label="Открыть меню"
            >
              <span className="site-nav__bar"></span>
              <span className="site-nav__bar"></span>
            </label>
            <ul className="site-nav__list">
              <li className="site-nav__item">
                {/* Активным оставляем первый пункт, без JS */}
                <a
                  className="site-nav__link site-nav__link--active"
                  href="#hero"
                  onClick={() => setMenuOpen(false)}
                >
                  Главная
                </a>
              </li>
              <li className="site-nav__item">
                <a
                  className="site-nav__link"
                  href="#gallery"
                  onClick={() => setMenuOpen(false)}
                >
                  Галерея
                </a>
              </li>
              <li className="site-nav__item">
                <a
                  className="site-nav__link"
                  href="#series"
                  onClick={() => setMenuOpen(false)}
                >
                  Серии
                </a>
              </li>
              <li className="site-nav__item">
                <a
                  className="site-nav__link"
                  href="#about"
                  onClick={() => setMenuOpen(false)}
                >
                  О проекте
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* ===================== Hero / Главная ===================== */}
        <section id="hero" className="page page--home" aria-labelledby="hero-title">
          <div className="hero">
            <div className="hero__inner">
              <div className="hero__layout">
                {/* Ключевой визуальный hero-элемент (заглушка под полотно) */}
                <div className="hero__media" aria-hidden="true">
                  <div className="hero__media-note">
                    Ключевое цифровое полотно автора (Hero-изображение)
                  </div>
                </div>

                {/* Слоган / H1 */}
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
                Выберите серию работ, чтобы погрузиться в отдельный цифровой зал.
              </p>
            </header>

            {/* Сетка превью серий с "воздухом" */}
            <div className="series-list__grid" aria-label="Список серий">
              {/* Пример карточки серии */}
              <article className="series-card">
                <a href="#series" className="series-card__link">
                  <figure className="series-card__figure">
                    <div
                      className="series-card__image-placeholder"
                      aria-hidden="true"
                    ></div>
                    <figcaption className="series-card__caption">
                      <h2 className="series-card__title">
                        Серия: Северное сияние
                      </h2>
                      <p className="series-card__meta">
                        Холодный свет, тишина северной ночи.
                      </p>
                    </figcaption>
                  </figure>
                </a>
              </article>

              <article className="series-card">
                <a href="#series" className="series-card__link">
                  <figure className="series-card__figure">
                    <div
                      className="series-card__image-placeholder"
                      aria-hidden="true"
                    ></div>
                    <figcaption className="series-card__caption">
                      <h2 className="series-card__title">Серия: Город без шума</h2>
                      <p className="series-card__meta">
                        Пустые улицы мегаполиса и мягкий свет экранов.
                      </p>
                    </figcaption>
                  </figure>
                </a>
              </article>

              <article className="series-card">
                <a href="#series" className="series-card__link">
                  <figure className="series-card__figure">
                    <div
                      className="series-card__image-placeholder"
                      aria-hidden="true"
                    ></div>
                    <figcaption className="series-card__caption">
                      <h2 className="series-card__title">Серия: Вдох в пустоте</h2>
                      <p className="series-card__meta">
                        Абстрактные композиции для созерцательного взгляда.
                      </p>
                    </figcaption>
                  </figure>
                </a>
              </article>

              {/* Дальше можно добавлять ещё article.series-card по тому же паттерну */}
            </div>
          </div>
        </section>

        {/* ===================== Страница серии (пример) ===================== */}
        <section
          id="series"
          className="page page--series"
          aria-labelledby="series-title"
        >
          <div className="container">
            {/* Хлебные крошки внутри одной страницы, но с якорями */}
            <nav className="breadcrumbs" aria-label="Хлебные крошки">
              <a href="#gallery">Галерея</a>
              <span> / </span>
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

            {/* Вертикальная колонка работ с "воздухом" между ними */}
            <div className="series-works">
              <figure className="series-work__figure">
                <div className="series-work__media" aria-hidden="true">
                  {/* Здесь будет конкретное изображение работы */}
                </div>
                <figcaption className="series-work__caption">
                  «Полярная тишина», 2024, цифровое полотно.
                </figcaption>
              </figure>

              <figure className="series-work__figure">
                <div className="series-work__media" aria-hidden="true"></div>
                <figcaption className="series-work__caption">
                  «Свет за горизонтом», 2024.
                </figcaption>
              </figure>

              <figure className="series-work__figure">
                <div className="series-work__media" aria-hidden="true"></div>
                <figcaption className="series-work__caption">
                  «Медленное свечение», 2024.
                </figcaption>
              </figure>
            </div>

            {/* Завершение серии и навигация */}
            <div className="series-footer">
              <a href="#gallery">←</a>
              {/* Пока просто ссылка на ту же серию как заглушка для "следующей" */}
              <a href="#series">→</a>
            </div>
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
