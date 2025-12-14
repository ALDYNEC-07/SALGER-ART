import type { StaticImageData } from "next/image";
import { seriesCollection } from "./seriesCollection";

/* Набор серий на главной странице: название, подпись и обложка для каждой */
export type GallerySeriesItem = {
  slug: string;
  title: string;
  meta: string;
  image: StaticImageData;
  alt: string;
};

export const gallerySeries: GallerySeriesItem[] = seriesCollection.map(
  (series) => ({
    slug: series.slug,
    title: series.title,
    meta: series.meta,
    image: series.coverImage,
    alt: series.coverAlt,
  })
);
