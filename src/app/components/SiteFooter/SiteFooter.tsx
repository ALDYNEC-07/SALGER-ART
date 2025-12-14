/* 
 Этот файл описывает общий футер галереи.
 Он показывает копирайт и контактную почту внизу каждой страницы.
 Он помогает посетителю понять, кому принадлежит сайт и куда написать письмо.
*/

/* Контакт и копирайт берём из одного файла настроек, чтобы менять их сразу везде */
import { siteMeta } from "../../config/meta";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    // Общий футер для всех страниц галереи
    <footer className={styles.siteFooter}>
      <div className={`container ${styles.siteFooterInner}`}>
        <div>{siteMeta.copyright}</div>
        <div>Контакт: {siteMeta.contactEmail}</div>
      </div>
    </footer>
  );
}
