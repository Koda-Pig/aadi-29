import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";

const CosmicTimeline = () => {
  const timelineRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Create a more interesting curved path for the timeline
  const path = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-3, -1, 0),
        new THREE.Vector3(-2, 1, -1),
        new THREE.Vector3(-1, -0.5, -2),
        new THREE.Vector3(0, 0.8, -1),
        new THREE.Vector3(1, -0.3, -1.5),
        new THREE.Vector3(2, 0.5, -0.5),
        new THREE.Vector3(3, -0.2, 0)
      ],
      false,
      "catmullrom",
      0.5
    );
    return curve;
  }, []);

  // Generate star positions
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);

    for (let i = 0; i < positions.length; i += 3) {
      random.inSphere(positions, { radius: 3 });
      colors[i] = 0.8 + Math.random() * 0.2; // R
      colors[i + 1] = 0.8 + Math.random() * 0.2; // G
      colors[i + 2] = 1; // B
    }

    return [positions, colors];
  }, []);

  // Generate points along the path for constellation effect
  const pathPoints = useMemo(() => {
    const points = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      const point = path.getPoint(i / 49);
      points[i * 3] = point.x;
      points[i * 3 + 1] = point.y;
      points[i * 3 + 2] = point.z;
    }
    return points;
  }, [path]);

  useFrame((state) => {
    if (!timelineRef.current) return;

    // Animate timeline based on scroll position
    const offset = scroll.offset;
    timelineRef.current.rotation.y = offset * Math.PI * 2;

    // Subtle floating animation
    timelineRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={timelineRef}>
      {/* Stars background */}
      <Points
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

      {/* Constellation points */}
      <Points positions={pathPoints} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>

      {/* Timeline path */}
      <mesh>
        <tubeGeometry args={[path, 100, 0.005, 8, false]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default CosmicTimeline;
