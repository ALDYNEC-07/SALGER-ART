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

// 4 Серии третьей картины 
import PervRaundImage from "../app/assets/PervRaund.png";
import FightBoxImage from "../app/assets/FightBox.png";
import BegImage from "../app/assets/Beg.png";
import EndBoxImage from "../app/assets/EndBox.png";

// 4 Серии четвертой картины 
import SkyBookImage from "../app/assets/SkyBook.png";
import SvechaBookImage from "../app/assets/SvechaBook.png";
import MoreBookImage from "../app/assets/MoreBook.png";
import PrirodaBookImage from "../app/assets/PrirodaBook.png";

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
    title: "Один раунд",
    meta: "Порхай, как бабочка, жали, как пчела — Мухаммед Али",
    year: "3 Cерия, 1977",
    intro: "Запах кожи, тишина раздевалки и один свет сверху. Всё лишнее осталось за канатами — впереди только ты и следующий раунд",
    coverImage: PervRaundImage,
    coverAlt: "Порхай, как бабочка, жали, как пчела — Мухаммед Али",
    works: [
      // Серии
      {
        title: "Один раунд",
        meta: "Порхай, как бабочка, жали, как пчела — Мухаммед Али",
        image: PervRaundImage,
        alt: "Порхай, как бабочка, жали, как пчела — Мухаммед Али",
      },
      {
        title: "В свете удара",
        meta: "Дело не в том, собьют ли тебя с ног, а в том, встанешь ли ты — Винс Ломбард",
        image: FightBoxImage,
        alt: "Дело не в том, собьют ли тебя с ног, а в том, встанешь ли ты — Винс Ломбард",
      },
      {
        title: "Дистанция",
        meta: "Хочешь бегать — пробеги милю — Эмиль Затопек",
        image: BegImage,
        alt: "Хочешь бегать — пробеги милю — Эмиль Затопек",
      },
      {
        title: "После раунда",
        meta: "Заслуга принадлежит тому, кто действительно находится на арене — Теодор Рузвельт",
        image: EndBoxImage,
        alt: "Заслуга принадлежит тому, кто действительно находится на арене — Теодор Рузвельт",
      },
    ],
  },
  //  Четвертая картина в голерее
  {
    slug: "chetvyrtay-kartina",
    title: "Тяжесть смысла",
    meta: "Книги — это зеркало: в них видишь только то, что уже есть в тебе — Карлос Руис Сафон",
    year: "4 Cерия, 2024",
    intro: "Книга не шумит — она меняет тишину. Открой страницу, и мир станет точнее",
    coverImage: SkyBookImage,
    coverAlt: "Книги — это зеркало: в них видишь только то, что уже есть в тебе — Карлос Руис Сафон",
    works: [
      // Серии
      {
        title: "Тяжесть смысла",
        meta: "Книги — это зеркало: в них видишь только то, что уже есть в тебе — Карлос Руис Сафон",
        image: SkyBookImage,
        alt: "Книги — это зеркало: в них видишь только то, что уже есть в тебе — Карлос Руис Сафон",
      },
      {
        title: "Одна свеча",
        meta: "Есть два способа распространять свет: быть свечой или зеркалом, которое его отражает — Эдит Уортон",
        image: SvechaBookImage,
        alt: "Есть два способа распространять свет: быть свечой или зеркалом, которое его отражает — Эдит Уортон",
      },
      {
        title: "Тихая глубина",
        meta: "Читатель проживает тысячу жизней, прежде чем умрёт. Тот, кто не читает, проживает лишь одну — Джордж Р.",
        image: MoreBookImage,
        alt: "Читатель проживает тысячу жизней, прежде чем умрёт. Тот, кто не читает, проживает лишь одну — Джордж Р.",
      },
      {
        title: "Книга у ручья",
        meta: "Я ушел в лес, потому что хотел жить осознанно... — Генри Дэвид Торо",
        image: PrirodaBookImage,
        alt: "Я ушел в лес, потому что хотел жить осознанно... — Генри Дэвид Торо",
      },
    ],
  }
];

export const getSeriesBySlug = (slug: string) =>
  seriesCollection.find((series) => series.slug === slug);
