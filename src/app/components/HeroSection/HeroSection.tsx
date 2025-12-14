/* 
 Этот файл описывает главный экран галереи.
 Он показывает портрет автора и слоганы сразу при загрузке страницы.
 Он даёт ссылку, которая ведёт посетителя вниз к списку серий.
*/
import Image from "next/image";
/* Портрет автора, вынесенный на главный экран */
import authorImage from "../../assets/Author.jpg";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <>
      {/* Главный экран с портретом автора и слоганом, чтобы встречать посетителя при входе */}
      <section
        id="hero"
        className={`page ${styles.pageHome}`}
        aria-labelledby="hero-title"
      >
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroLayout}>
              {/* Визуальный блок в рамке, где портрет автора задаёт тон галерее */}
              <div className={styles.heroMedia}>
                {/* Портрет автора в фирменной рамке на первом экране */}
                <div className={styles.heroMediaNote}>
                  <Image
                    src={authorImage}
                    alt="Портрет автора SALGER ART"
                    fill
                    sizes="(max-width: 768px) 92vw, 640px"
                    priority
                    className={styles.heroPortrait}
                  />
                </div>
              </div>

              {/* Текстовая часть с подписью, заголовком и подзаголовком рядом с портретом */}
              <div className={styles.heroContent}>
                <p className={styles.heroEyebrow}>Онлайн-галерея цифрового искусства</p>
                <h1 id="hero-title" className={styles.heroTitle}>
                  One Bold Idea
                </h1>
                <p className={styles.heroSubtitle}>Everything starts with focus.</p>
              </div>
            </div>

            {/* Подсказка для прокрутки к галерее ниже по странице */}
            <div className={styles.heroScroll}>
              {/* Кнопка-прокрутка отправляет к блоку галереи */}
              <a className={styles.heroScrollLink} href="#gallery">
                <span className={styles.heroScrollIcon} aria-hidden="true"></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
