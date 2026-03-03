/* 
 Этот файл описывает главный экран галереи.
 Он показывает картину на весь экран и краткое приветствие проекта.
 Он даёт одну основную кнопку для перехода к каталогу серий.
*/
"use client";

import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <>
      {/* Главный экран с фоновой картиной и слоганом, чтобы встречать посетителя при входе */}
      <section
        id="hero"
        className={`page ${styles.pageHome}`}
        aria-labelledby="hero-title"
      >
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroLayout}>
              {/* Текстовый блок кратко объясняет идею галереи и остаётся легко читаемым поверх фона */}
              <div className={styles.heroContent}>
                <p className={styles.heroEyebrow}>Кураторская онлайн-галерея</p>
                <h1 id="hero-title" className={styles.heroTitle}>
                  Исторические личности
                </h1>
                <p className={styles.heroSubtitle}>
                  Цифровые портреты, собранные как музейная афиша.
                </p>

                {/* Одна главная кнопка ведёт посетителя к каталогу серий */}
                <a className={styles.heroCta} href="#gallery">
                  Смотреть галерею
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
