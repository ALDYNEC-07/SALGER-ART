/* 
 Этот файл описывает общий футер галереи.
 Он показывает копирайт и контактную почту внизу каждой страницы.
 Он помогает посетителю понять, кому принадлежит сайт и куда написать письмо.
*/

/* Контакт и копирайт берём из одного файла настроек, чтобы менять их сразу везде */
import { siteMeta } from "../config/meta";

export function SiteFooter() {
  return (
    // Общий футер для всех страниц галереи
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>{siteMeta.copyright}</div>
        <div>Контакт: {siteMeta.contactEmail}</div>
      </div>
    </footer>
  );
}
