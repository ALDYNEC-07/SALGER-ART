import type { StaticImageData } from "next/image";

// 4 Серии первой картины 
import WdokhImage from "../app/assets/Wdokh.png";
import TeatrImage from "../app/assets/Teatr.png";
import ProjectorImage from "../app/assets/Projector.png";
import EndImage from "../app/assets/End.png";

// 4 Серии второй картины 
import SosnaImage from "../app/assets/Sosna.png";
import DojdLampaImage from "../app/assets/DojdLampa.png";
import PosleDojdImage from "../app/assets/PosleDojd.png";
import OknoTishinaImage from "../app/assets/OknoTishina.png";


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
  // Первая картина в голерее
  {
    slug: "pervaya-kartina",
    title: "Перед началом",
    meta: "Главное в пьесе — Уильям Шекспир",
    year: "1 Серия, 2024",
    intro: "Сцена пуста лишь для тех, кто смотрит невнимательно",
    coverImage: ProjectorImage,
    coverAlt: "Картина из серии «Перед началом»: прожекторы подсвечивают пространство на темном фоне",
    works: [
      // Серии
      {
        title: "Перед началом",
        meta: "Главное в пьесе — Уильям Шекспир",
        image: ProjectorImage,
        alt: "Перед началом",
      },
      {
        title: "Вдох",
        meta: "Уважение вызывает находящийся на арене борьбы человек… — Теодор Рузвельт",
        image: WdokhImage,
        alt: "Вдох",
      },
      {
        title: "Театр",
        meta: "Весь мир — театр, а люди в нём — актёры — Уильям Шекспир",
        image: TeatrImage,
        alt: "Театр",
      },
      {
        title: "После аплодисментов",
        meta: "Искусство — это не то, что видно, а то, что остаётся, когда всё уже исчезло - Жан Кокто",
        image: EndImage,
        alt: "После аплодисментов",
      },
    ],
  },
  // Вторая картина в голерее
  {
    slug: "vtoraya-kartina",
    title: "Дождь над сосной",
    meta: "Природа не торопит, и все же все свершается — Лао-Цзы",
    year: "2 Cерия, 2024",
    intro: "Дождь оставляет только главное: свет и отражения",
    coverImage: SosnaImage,
    coverAlt: "Природа не торопит, и все же все свершается — Лао-Цзы",
    works: [
      // Серии
      {
        title: "Дождь над сосной",
        meta: "Природа не торопит, и все же все свершается — Лао-Цзы",
        image: SosnaImage,
        alt: "Природа не торопит, и все же все свершается — Лао-Цзы",
      },
      {
        title: "Конус света",
        meta: "Во всем есть трещина — вот как проникает свет — Леонард Коэн",
        image: DojdLampaImage,
        alt: "Во всем есть трещина — вот как проникает свет — Леонард Коэн",
      },
      {
        title: "После дождя",
        meta: "В каждой жизни должно выпасть немного дождя — Генри Уодсвор",
        image: PosleDojdImage,
        alt: "В каждой жизни должно выпасть немного дождя” — Генри Уодсвор",
      },
      {
        title: "Стекло и тишина",
        meta: "Некоторые люди чувствуют дождь. Другие просто промокают — Боб Марли",
        image: OknoTishinaImage,
        alt: "Некоторые люди чувствуют дождь. Другие просто промокают — Боб Марли",
      },
    ],
  },
  // Третья картина в голерее
  {
    slug: "trety-kartina",
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
