import type { StaticImageData } from "next/image";
import krugImage from "../assets/Krug.jpg";
import lineImage from "../assets/Line.png";
import scenaImage from "../assets/Scena.jpg";

/* Структура одной работы серии: название, описание и иллюстрация */
export type SeriesWork = {
  title: string;
  meta: string;
  image: StaticImageData;
  alt: string;
};

/* Список работ серии хранится отдельно, чтобы переиспользовать в разных местах */
export const seriesWorks: SeriesWork[] = [
  {
    title: "Полярная тишина",
    meta: "Холодное свечение, будто северное сияние застыло в кадре.",
    image: scenaImage,
    alt: "Полотно «Полярная тишина»: мягкий свет прожекторов на тёмном фоне",
  },
  {
    title: "Ночная грань",
    meta: "Ровные линии неона, которые держат пространство в равновесии.",
    image: lineImage,
    alt: "Полотно «Ночная грань»: тонкие полосы неона на тёмном фоне",
  },
  {
    title: "Тёплый круг",
    meta: "Плавный круг цвета, который собирает взгляд в одну точку.",
    image: krugImage,
    alt: "Полотно «Тёплый круг»: кольца света на нейтральном фоне",
  },
];
