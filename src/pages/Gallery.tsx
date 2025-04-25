import { Canvas } from "@react-three/fiber";
import { ScrollControls, OrbitControls } from "@react-three/drei";
import CosmicTimeline from "../components/CosmicTimeline";
import styles from "../styles/gallery.module.scss";

const Gallery = () => {
  return (
    <div className={styles.gallery}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ScrollControls pages={3} damping={0.1}>
          <ambientLight intensity={0.1} />
          <CosmicTimeline />
        </ScrollControls>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Gallery;
