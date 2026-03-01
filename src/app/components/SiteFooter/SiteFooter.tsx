/* 
 Этот файл описывает общий футер галереи.
 Он показывает копирайт внизу каждой страницы.
 Он помогает посетителю понять, кому принадлежит сайт.
*/

/* Копирайт берём из одного файла настроек, чтобы менять его сразу везде */
import { siteMeta } from "../../config/meta";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    // Общий футер для всех страниц галереи
    <footer className={styles.siteFooter}>
      <div className={`container ${styles.siteFooterInner}`}>
        <div>{siteMeta.copyright}</div>
      </div>
    </footer>
  );
}
