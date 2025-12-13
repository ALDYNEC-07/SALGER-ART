/* 
 Этот файл описывает общий верхний блок сайта.
 Он показывает логотип и навигацию, одинаковую для всех страниц.
 Он позволяет открывать и закрывать мобильное меню и переходить по разделам.
*/
"use client";

import { useState } from "react";
import { manrope } from "../../fonts/manrope";

export type SiteNavItem = {
  label: string;
  href: string;
  isActive?: boolean;
};

type SiteHeaderProps = {
  logoHref: string;
  navItems: SiteNavItem[];
};

export function SiteHeader({ logoHref, navItems }: SiteHeaderProps) {
  /* Простое переключение меню, чтобы оверлей открывался и закрывался без сбоев */
  const [menuOpen, setMenuOpen] = useState(false);
  /* Фиксируем идентификатор, потому что стили для оверлея навигации привязаны к нему */
  const navToggleId = "nav-toggle";

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        {/* Логотип возвращает на нужную часть сайта и закрывает меню на мобильных */}
        <a
          href={logoHref}
          className="site-logo"
          onClick={() => setMenuOpen(false)}
        >
          {/* Логотип с акцентным шрифтом Manrope, чтобы он выделял бренд */}
          <span className={`${manrope.className} site-logo__text`}>SALGER ART</span>
        </a>

        {/* Основная навигация по разделам, открывается поверх контента на мобильных */}
        <nav className="site-nav" aria-label="Основная навигация">
          <input
            type="checkbox"
            id={navToggleId}
            className="site-nav__checkbox"
            aria-hidden="true"
            checked={menuOpen}
            onChange={() => setMenuOpen((prev) => !prev)}
          />
          <label
            htmlFor={navToggleId}
            className="site-nav__toggle"
            aria-label="Открыть меню"
          >
            <span className="site-nav__bar"></span>
            <span className="site-nav__bar"></span>
          </label>
          <ul className="site-nav__list">
            {/* Пункты меню приходят от страницы: активный пункт подсвечен, любой клик закрывает меню */}
            {navItems.map((item) => (
              <li className="site-nav__item" key={item.href}>
                <a
                  className={`site-nav__link${
                    item.isActive ? " site-nav__link--active" : ""
                  }`}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
