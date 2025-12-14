/* 
 Этот файл описывает главный экран галереи.
 Он показывает логотип и слоганы сразу при загрузке страницы.
 Он даёт ссылку, которая ведёт посетителя вниз к списку серий.
*/
import Image from "next/image";

export function HeroSection() {
  return (
    <>
      {/* Главный экран с логотипом и слоганом, чтобы встречать посетителя при входе */}
      <section id="hero" className="page page--home" aria-labelledby="hero-title">
        <div className="hero">
          <div className="hero__inner">
            <div className="hero__layout">
              {/* Визуальный блок с рамкой и сиянием, который держит логотип в центре */}
              <div className="hero__media" aria-hidden="true">
                {/* Логотип проекта внутри рамки, чтобы сразу напомнить о бренде */}
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

              {/* Текстовая часть с подписью, заголовком и подзаголовком рядом с логотипом */}
              <div className="hero__content">
                <p className="hero__eyebrow">Онлайн-галерея цифрового искусства</p>
                <h1 id="hero-title" className="hero__title">
                  One Bold Idea
                </h1>
                <p className="hero__subtitle">Everything starts with focus.</p>
              </div>
            </div>

            {/* Подсказка для прокрутки к галерее ниже по странице */}
            <div className="hero__scroll">
              {/* Кнопка-прокрутка отправляет к блоку галереи */}
              <a className="hero__scroll-link" href="#gallery">
                <span className="hero__scroll-icon" aria-hidden="true"></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
