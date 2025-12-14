/* 
 Этот файл описывает общий верхний блок сайта.
 Он показывает логотип и навигацию, одинаковую для всех страниц.
 Он позволяет открывать и закрывать мобильное меню и переходить по разделам.
*/
"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { manrope } from "../../../fonts/manrope";
import styles from "./SiteHeader.module.css";

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
  /* Когда меню открыто, ставим класс на body, чтобы заблокировать прокрутку фона на мобильных */
  useEffect(() => {
    const body = document.body;
    if (menuOpen) {
      body.classList.add("site-nav-open");
    } else {
      body.classList.remove("site-nav-open");
    }
    return () => body.classList.remove("site-nav-open");
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        {/* Логотип возвращает на нужную часть сайта и закрывает меню на мобильных */}
        {logoHref.startsWith("#") ? (
          <a
            href={logoHref}
            className={styles.logo}
            onClick={() => setMenuOpen(false)}
          >
            {/* Логотип с акцентным шрифтом Manrope, чтобы он выделял бренд */}
            <span className={`${manrope.className} ${styles.logoText}`}>SALGER ART</span>
          </a>
        ) : (
          <Link
            href={logoHref}
            className={styles.logo}
            onClick={() => setMenuOpen(false)}
          >
            {/* Логотип с акцентным шрифтом Manrope, чтобы он выделял бренд */}
            <span className={`${manrope.className} ${styles.logoText}`}>SALGER ART</span>
          </Link>
        )}

        {/* Основная навигация по разделам, открывается поверх контента на мобильных */}
        <nav className={styles.nav} aria-label="Основная навигация">
          <input
            type="checkbox"
            id={navToggleId}
            className={styles.navCheckbox}
            aria-hidden="true"
            checked={menuOpen}
            onChange={() => setMenuOpen((prev) => !prev)}
          />
          {/* Кнопка раскрывает и сворачивает список: экранный диктор слышит статус и знает, какой блок управляется */}
          <button
            type="button"
            className={styles.navToggle}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls={navListId}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className={styles.navBar}></span>
            <span className={styles.navBar}></span>
          </button>
          <ul id={navListId} className={styles.navList}>
            {/* Пункты меню приходят от страницы: активный пункт подсвечен, любой клик закрывает меню, внутренние переходы идут через Link */}
            {navItems.map((item) => {
              const linkClassName = [
                styles.navLink,
                item.isActive ? styles.navLinkActive : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <li className={styles.navItem} key={item.href}>
                  {item.href.startsWith("#") ? (
                    <a
                      className={linkClassName}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      className={linkClassName}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
