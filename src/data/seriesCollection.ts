import type { StaticImageData } from "next/image";
import scenaImage from "../app/assets/Scena.jpg";
import WdokhImage from "../app/assets/Wdokh.png";
import TeatrImage from "../app/assets/Teatr.png";
import ProjectorImage from "../app/assets/Projector.png";


import lineImage from "../app/assets/Line.png";
import krugImage from "../app/assets/Krug.jpg";
import idealLineImage from "../app/assets/Ideal-line.jpg";
import yaycoImage from "../app/assets/Yayco.jpg";

export type SeriesWork = {
  title: string;
  meta: string;
  image: StaticImageData;
  alt: string;
};

export type SeriesEntry = {
  slug: string;
  title: string;
  meta: string;
  year: string;
  intro: string;
  coverImage: StaticImageData;
  coverAlt: string;
  works: SeriesWork[];
};

export const seriesCollection: SeriesEntry[] = [
  {
    slug: "polyarnaya-scena",
    title: "Полярная сцена",
    meta: "Холодный свет прожекторов и лёгкая дымка, будто северное сияние на сцене.",
    year: "Цифровая серия, 2024",
    intro: "Сцена наполнена туманом и холодным светом, который расчерчивает пространство. Кажется, что свет вот-вот сменится движением актёров, но момент остановлен.",
    coverImage: scenaImage,
    coverAlt: "Картина из серии «Полярная сцена»: прожекторы подсвечивают пространство на темном фоне",
    works: [
      {
        title: "Полярная тишина",
        meta: "Холодное свечение, будто северное сияние застыло в кадре.",
        image: scenaImage,
        alt: "Полотно «Полярная тишина»: мягкий свет прожекторов на тёмном фоне",
      },
      {
        title: "Вдох",
        meta: "«Уважение вызывает находящийся на арене борьбы человек…» — Теодор Рузвельт",
        image: WdokhImage,
        alt: "Сцена на природе",
      },
      {
        title: "Театр",
        meta: "«Весь мир — театр, а люди в нём — актёры.» — Уильям Шекспир",
        image: TeatrImage,
        alt: "Театр",
      },
      {
        title: "Перед началом",
        meta: "“Главное в пьесе” — Уильям Шекспир",
        image: ProjectorImage,
        alt: "Прожектор",
      },
    ],
  },
  {
    slug: "tikhiy-gorod",
    title: "Тихий город",
    meta: "Ровные линии неона, которые остались после ночного движения.",
    year: "Цифровая серия, 2024",
    intro: "Город заснул, но световые линии остаются на улицах как следы машин и людей. Остаётся только ритм и ровный шум, который держит пространство.",
    coverImage: lineImage,
    coverAlt: "Картина из серии «Тихий город»: световые линии неона на тёмном фоне",
    works: [
      {
        title: "Ночная грань",
        meta: "Ровные линии неона, которые держат пространство в равновесии.",
        image: lineImage,
        alt: "Полотно «Ночная грань»: тонкие полосы неона на тёмном фоне",
      },
    ],
  },
  {
    slug: "krug-dykhaniya",
    title: "Круг дыхания",
    meta: "Мягкие кольца цвета, собирающие взгляд в спокойный центр.",
    year: "Цифровая серия, 2024",
    intro: "Ритм дыхания считывается в плавных кольцах, которые вспыхивают и снова затихают. Цвет мягко меняется, но взгляд возвращается к центру.",
    coverImage: krugImage,
    coverAlt: "Картина из серии «Круг дыхания»: кольца цвета на нейтральном фоне",
    works: [
      {
        title: "Тёплый круг",
        meta: "Плавный круг цвета, который собирает взгляд в одну точку.",
        image: krugImage,
        alt: "Полотно «Тёплый круг»: кольца света на нейтральном фоне",
      },
    ],
  },
  {
    slug: "idealnaya-liniya",
    title: "Идеальная линия",
    meta: "Единственная линия света держит равновесие кадра и задаёт ритм.",
    year: "Цифровая серия, 2024",
    intro: "Вся композиция держится на одной линии, которая ведёт от края к краю. Она как измерение, которое держит пространство и задаёт точку покоя.",
    coverImage: idealLineImage,
    coverAlt: "Картина из серии «Идеальная линия»: тонкая линия света на темном фоне",
    works: [
      {
        title: "Идеальная линия",
        meta: "Одна линия света делит пространство и держит весь кадр в балансе.",
        image: idealLineImage,
        alt: "Полотно «Идеальная линия»: тонкая линия света на темном фоне",
      },
    ],
  },
  {
    slug: "rassvetnye-kraski",
    title: "Рассветные краски",
    meta: "Тёплая палитра раннего утра и мягкие переходы цвета.",
    year: "Цифровая серия, 2024",
    intro: "Цвета рассвета складываются в мягкий градиент. Плавные формы напоминают о том, как медленно появляется свет и воздух становится теплее.",
    coverImage: yaycoImage,
    coverAlt: "Картина из серии «Рассветные краски»: тёплые плавные формы в мягком свете",
    works: [
      {
        title: "Рассветные краски",
        meta: "Тёплая палитра раннего утра с плавными переходами цвета.",
        image: yaycoImage,
        alt: "Полотно «Рассветные краски»: тёплые плавные формы в мягком свете",
      },
    ],
  },
];

export const getSeriesBySlug = (slug: string) =>
  seriesCollection.find((series) => series.slug === slug);
