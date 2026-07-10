import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

export interface AIBrainProps {
  size?: number;
}

const AIBrain = ({ size = 2 }: AIBrainProps)=> {
  const meshRef = useRef<Mesh>(null);

  useFrame(state => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial
        color="#00f0ff"
        emissive="#00f0ff"
        emissiveIntensity={0.2}
        wireframe
      />
    </mesh>
  );
};

export default AIBrain;
