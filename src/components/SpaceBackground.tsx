import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";

const StarField = () => {
  const ref = useRef<THREE.Points>(null);

  // Generate random star positions and colors
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    const colors = new Float32Array(1000 * 3);

    for (let i = 0; i < positions.length; i += 3) {
      // Random position in a sphere
      random.inSphere(positions, { radius: 1.5 });

      // Random color from a color palette or random RGB values
      // You could use COLORS object to select random colors from your palette
      // Example with random RGB values:
      colors[i] = Math.random(); // R
      colors[i + 1] = Math.random(); // G
      colors[i + 2] = Math.random(); // B
    }

    return [positions, colors];
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        colors={colors}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          vertexColors
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default StarField;
