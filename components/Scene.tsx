'use client';

import { Canvas } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';

export default function Scene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="white" intensity={1} />
        <TorusKnot args={[1, 0.3, 128, 32]}>
          <meshStandardMaterial color="#00BFA6" emissive="#006060" emissiveIntensity={0.5} metalness={0.9} roughness={0.2} />
        </TorusKnot>
      </Canvas>
    </div>
  );
}