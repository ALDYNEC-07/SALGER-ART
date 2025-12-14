/* 
 Этот файл собирает всю одностраничную галерею в Next.js.
 Он показывает шапку, блок Hero, галерею серий и манифест о проекте на одной странице.
 Он позволяет прокручивать страницу по якорям и переходить к нужному разделу без перезагрузки.
*/
/* Данные галереи вынесены в отдельный файл, чтобы пополнять их без правки компонента */
import { gallerySeries } from "../data/gallerySeries";
/* Общая шапка вынесена в переиспользуемый компонент, чтобы держать её в одном месте */
import { SiteHeader, type SiteNavItem } from "./components/SiteHeader";
/* Главный экран вынесен в отдельный компонент, чтобы использовать его в разных местах без дублирования */
import { HeroSection } from "./components/HeroSection";
/* Горизонтальная лента серий вынесена в компонент, чтобы логика подсветки была локальной */
import { SeriesStrip } from "./components/SeriesStrip";

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

  return (
    <>
      {/* Общая шапка для всей одностраничной галереи */}
      <SiteHeader logoHref="#hero" navItems={navItems} />

      <main>
        {/* Главный экран вынесен в компонент, чтобы страница оставалась короткой */}
        <HeroSection />

        {/* Горизонтальная лента серий вынесена в компонент, чтобы страница не разрасталась */}
        <SeriesStrip series={gallerySeriesPreview} />

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
