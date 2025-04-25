import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import styles from "../styles/gallery.module.scss";

const Gallery = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.gallery}>
      {isLoading && <LoadingSpinner progress={loadingProgress} />}
    </div>
  );
};

export default Gallery;
