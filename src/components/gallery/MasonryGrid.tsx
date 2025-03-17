"use client";

import Masonry from 'react-masonry-css';
import { SmartImage } from "@/once-ui/components";
import styles from "./Gallery.module.scss";
import { useTranslations } from 'next-intl';
import { renderContent } from '@/app/resources';

// Definice typů pro galerii
interface GalleryImage {
  src: string;
  alt: string;
  orientation: string;
}

interface GalleryContent {
  label?: string;
  title?: string;
  description?: string;
  images: GalleryImage[];
}

export default function MasonryGrid() {
  const breakpointColumnsObj = {
    default: 4,
    1440: 3,
    1024: 2,
    560: 1
  };

  const t = useTranslations();
  const content = renderContent(t);

  // Bezpečné typování s výchozími hodnotami
  const gallery = (content.gallery as GalleryContent) || {
    images: []
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}>
      {gallery.images.map((image: GalleryImage, index: number) => (
        <SmartImage
          key={index}
          radius="m"
          aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "9 / 16"}
          src={image.src}
          alt={image.alt}
          className={styles.gridItem}
        />
      ))}
    </Masonry>
  );
}
