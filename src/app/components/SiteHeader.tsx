/* 
 Этот файл описывает общий верхний блок сайта.
 Он показывает логотип и навигацию, одинаковую для всех страниц.
 Он позволяет открывать и закрывать мобильное меню и переходить по разделам.
*/
"use client";

import Link from "next/link";
import { useId, useState } from "react";
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
  /* Берем уникальный код для этой шапки, чтобы его ID не пересекались в превью или встраивании */
  const navId = useId();
  /* Назначаем ID переключателю и списку по этому коду, чтобы aria-связка оставалась уникальной */
  const navToggleId = `${navId}-toggle`;
  const navListId = `${navId}-list`;

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        {/* Логотип возвращает на нужную часть сайта и закрывает меню на мобильных */}
        {logoHref.startsWith("#") ? (
          <a
            href={logoHref}
            className="site-logo"
            onClick={() => setMenuOpen(false)}
          >
            {/* Логотип с акцентным шрифтом Manrope, чтобы он выделял бренд */}
            <span className={`${manrope.className} site-logo__text`}>SALGER ART</span>
          </a>
        ) : (
          <Link
            href={logoHref}
            className="site-logo"
            onClick={() => setMenuOpen(false)}
          >
            {/* Логотип с акцентным шрифтом Manrope, чтобы он выделял бренд */}
            <span className={`${manrope.className} site-logo__text`}>SALGER ART</span>
          </Link>
        )}

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
          {/* Кнопка раскрывает и сворачивает список: экранный диктор слышит статус и знает, какой блок управляется */}
          <button
            type="button"
            className="site-nav__toggle"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls={navListId}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="site-nav__bar"></span>
            <span className="site-nav__bar"></span>
          </button>
          <ul id={navListId} className="site-nav__list">
            {/* Пункты меню приходят от страницы: активный пункт подсвечен, любой клик закрывает меню, внутренние переходы идут через Link */}
            {navItems.map((item) => (
              <li className="site-nav__item" key={item.href}>
                {item.href.startsWith("#") ? (
                  <a
                    className={`site-nav__link${
                      item.isActive ? " site-nav__link--active" : ""
                    }`}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    className={`site-nav__link${
                      item.isActive ? " site-nav__link--active" : ""
                    }`}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
