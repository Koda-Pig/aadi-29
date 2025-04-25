import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, useTexture } from "@react-three/drei";
import * as THREE from "three";

const ImagePlane = ({
  position,
  url
}: {
  position: THREE.Vector3;
  url: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(url);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[3, 2]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

const ImageTunnel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!groupRef.current) return;

    // Move images based on scroll
    const scrollOffset = scroll.offset;
    groupRef.current.position.z = scrollOffset * 50;

    // Rotate slightly based on scroll
    groupRef.current.rotation.z = Math.sin(scrollOffset * Math.PI) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 32 }, (_, i) => (
        <ImagePlane
          key={i}
          position={new THREE.Vector3(0, 0, -i * 5)}
          url={`/images/${i + 1}.webp`}
        />
      ))}
    </group>
  );
};

export default ImageTunnel;
