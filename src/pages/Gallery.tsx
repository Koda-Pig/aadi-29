import { Canvas } from "@react-three/fiber";
import styles from "../styles/gallery.module.scss";

const Gallery = () => {
  return (
    <div className={styles.gallery}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <></>
      </Canvas>
    </div>
  );
};

export default Gallery;
