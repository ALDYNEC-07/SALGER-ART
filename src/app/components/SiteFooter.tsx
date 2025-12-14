/* 
 Этот файл описывает общий футер галереи.
 Он показывает копирайт и контактную почту внизу каждой страницы.
 Он помогает посетителю понять, кому принадлежит сайт и куда написать письмо.
*/

export function SiteFooter() {
  return (
    // Общий футер для всех страниц галереи
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>© Онлайн-галерея «SALGER ART»</div>
        <div>Контакт: example@email.com</div>
      </div>
    </footer>
  );
}
