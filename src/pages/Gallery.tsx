import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import styles from "../styles/gallery.module.scss";

const Gallery = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingSpinner progress={0} />;
  }

  return <div className={styles.gallery}></div>;
};

export default Gallery;
