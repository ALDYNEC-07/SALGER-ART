/* 
 Этот файл описывает раздел с манифестом проекта.
 Он показывает короткое описание галереи в обрамлении.
 Он помогает посетителю за пару строк понять, что это за пространство.
*/

import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <>
      {/* Раздел с манифестом и подписью автора */}
      <section
        id="about"
        className={`page ${styles.pageAbout}`}
        aria-labelledby="about-title"
      >
        <div className="container">
          <header className="page__header">
            <h1 id="about-title" className="page-title">
              О проекте
            </h1>
          </header>

          <div className="page__body">
            <div className={styles.aboutLayout}>
              {/* Колонка с коротким описанием галереи */}
              <div className={styles.manifestText}>
                {/* Карточка с манифестом, оформленная в фирменной рамке */}
                <div className={styles.manifestFrame}>
                  <p className={styles.manifestLabel}>SALGER ART</p>
                  <p className={styles.manifestLead}>
                    SALGER ART — это личная онлайн-галерея минималистичных цифровых работ,
                    где остаётся только главное: форма, пауза и внимательный взгляд.
                  </p>
                </div>

                {/* Три опорные мысли, вынесенные в небольшие рамки */}
                <div className={styles.manifestPills} role="list">
                  <span className={styles.manifestPill} role="listitem">
                    форма
                  </span>
                  <span className={styles.manifestPill} role="listitem">
                    пауза
                  </span>
                  <span className={styles.manifestPill} role="listitem">
                    внимательный взгляд
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
