import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import styles from "../styles/gallery.module.scss";

interface ImageData {
  id: number;
  src: string;
  isExpanded: boolean;
}

const Gallery = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Create image data array
    const imageData: ImageData[] = Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      src: `/images/${i + 1}.webp`,
      isExpanded: false
    }));
    setImages(imageData);
    setIsLoading(false);
  }, []);

  const handleImageClick = (id: number) => {
    setImages(
      images.map((img) => ({
        ...img,
        isExpanded: img.id === id ? !img.isExpanded : false
      }))
    );
  };

  if (isLoading) {
    return <LoadingSpinner progress={0} />;
  }

  return (
    <div className={styles.gallery}>
      {images.map((image) => (
        <div
          key={image.id}
          className={`${styles.imageContainer} ${
            image.isExpanded ? styles.expanded : ""
          }`}
          onClick={() => handleImageClick(image.id)}
        >
          <img
            src={image.src}
            alt={`Gallery image ${image.id}`}
            className={styles.image}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
