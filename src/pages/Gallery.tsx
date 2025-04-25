import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import ImageTunnel from "../components/ImageTunnel";
import LoadingSpinner from "../components/LoadingSpinner";
import styles from "../styles/gallery.module.scss";

const Gallery = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleProgress = (progress: number) => {
    setLoadingProgress(progress);
    if (progress === 100) {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.gallery}>
      {isLoading && <LoadingSpinner progress={loadingProgress} />}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ScrollControls pages={8} damping={0.3}>
          <ImageTunnel onLoadProgress={handleProgress} />
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default Gallery;
