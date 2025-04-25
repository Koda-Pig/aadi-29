import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";

const StarField = () => {
  const ref = useRef<THREE.Points>(null);

  // Generate random star positions
  const [positions] = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    const colors = new Float32Array(5000 * 3);

    for (let i = 0; i < positions.length; i += 3) {
      // Random position in a sphere
      random.inSphere(positions, { radius: 1.5 });

      // Random color with slight variation
      colors[i] = 1; // R
      colors[i + 1] = 1; // G
      colors[i + 2] = 1; // B
    }

    return [positions, colors];
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default StarField;
