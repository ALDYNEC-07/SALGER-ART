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
                  <p className={styles.manifestLabel}>Кураторская коллекция</p>
                  <p className={styles.manifestLead}>
                    SALGER ART собирает исторические личности в формате цифровой афиши:
                    через характер, пластику лица и атмосферу эпохи.
                  </p>
                  {/* Второй абзац поясняет, что именно увидит посетитель в каждой серии */}
                  <p className={styles.manifestBody}>
                    Каждая серия устроена как отдельный зал: крупные портреты, краткие
                    аннотации и спокойный темп просмотра без лишнего визуального шума.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
