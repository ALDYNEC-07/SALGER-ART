/* 
 Этот файл описывает раздел с манифестом проекта.
 Он показывает текстовую колонку с идеей галереи и место под иллюстрацию автора.
 Он позволяет посетителю быстро понять посыл проекта и прочитать благодарность.
*/

import Image from "next/image";
/* Портрет автора для блока рядом с манифестом */
import authorImage from "../assets/Author.jpg";

export function AboutSection() {
  return (
    <>
      {/* Раздел с манифестом и подписью автора */}
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

              {/* Портрет автора рядом с текстом манифеста */}
              <aside
                className="about-media"
                aria-label="Фотография или иллюстрация автора"
              >
                <figure className="about-media__figure">
                  <div className="about-media__frame">
                    <div className="about-media__placeholder">
                      <Image
                        src={authorImage}
                        alt="Портрет автора проекта"
                        fill
                        sizes="(max-width: 960px) 100vw, 220px"
                        className="about-media__image"
                        priority
                      />
                    </div>
                  </div>
                  <figcaption className="about-media__caption">
                    Автор проекта на фоне мастерской.
                  </figcaption>
                </figure>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
