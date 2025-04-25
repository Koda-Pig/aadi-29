import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import * as THREE from "three";

interface FloatingImageProps {
  src: string;
  position: THREE.Vector3;
  scale?: number;
  rotation?: [number, number, number];
}

const FloatingImage = ({
  src,
  position,
  scale = 0.5,
  rotation = [0, 0, 0]
}: FloatingImageProps) => {
  const imageRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!imageRef.current) return;

    // Subtle floating animation
    imageRef.current.position.y =
      position.y + Math.sin(state.clock.elapsedTime + position.x) * 0.02;

    // Scale animation on hover
    imageRef.current.scale.x = THREE.MathUtils.lerp(
      imageRef.current.scale.x,
      hovered ? scale * 1.2 : scale,
      0.1
    );
    imageRef.current.scale.y = imageRef.current.scale.x;
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={imageRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <Image
          url={`/images/${src}`}
          transparent
          opacity={0.9}
          // scale={[1, 1, 1]}
        />
      </mesh>
    </group>
  );
};

export default FloatingImage;
