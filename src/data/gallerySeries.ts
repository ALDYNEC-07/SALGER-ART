import type { StaticImageData } from "next/image";
import krugImage from "../app/assets/Krug.jpg";
import lineImage from "../app/assets/Line.png";
import scenaImage from "../app/assets/Scena.jpg";
import idealLineImage from "../app/assets/Ideal-line.jpg";
import yaycoImage from "../app/assets/Yayco.jpg";

/* Набор серий на главной странице: название, подпись и обложка для каждой */
export type GallerySeriesItem = {
  title: string;
  meta: string;
  image: StaticImageData;
  alt: string;
};

export const gallerySeries: GallerySeriesItem[] = [
  {
    title: "Полярная сцена",
    meta: "Холодный свет прожекторов и лёгкая дымка, будто северное сияние на сцене.",
    image: scenaImage,
    alt: "Картина из серии «Полярная сцена»: прожекторы подсвечивают пространство на темном фоне",
  },
  {
    title: "Тихий город",
    meta: "Ровные линии неона, которые остались после ночного движения.",
    image: lineImage,
    alt: "Картина из серии «Тихий город»: световые линии неона на тёмном фоне",
  },
  {
    title: "Круг дыхания",
    meta: "Мягкие кольца цвета, собирающие взгляд в спокойный центр.",
    image: krugImage,
    alt: "Картина из серии «Круг дыхания»: кольца цвета на нейтральном фоне",
  },
  {
    title: "Идеальная линия",
    meta: "Единственная линия света держит равновесие кадра и задаёт ритм.",
    image: idealLineImage,
    alt: "Картина из серии «Идеальная линия»: тонкая линия света на темном фоне",
  },
  {
    title: "Рассветные краски",
    meta: "Тёплая палитра раннего утра и мягкие переходы цвета.",
    image: yaycoImage,
    alt: "Картина из серии «Рассветные краски»: тёплые плавные формы в мягком свете",
  },
];
