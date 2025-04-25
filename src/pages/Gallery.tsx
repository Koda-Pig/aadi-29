import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import ImageTunnel from "../components/ImageTunnel";
import styles from "../styles/gallery.module.scss";

const Gallery = () => {
  return (
    <div className={styles.gallery}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ScrollControls pages={8} damping={0.3}>
          <ImageTunnel />
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default Gallery;
