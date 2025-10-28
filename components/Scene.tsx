'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, TorusKnot, PointLight } from '@react-three/drei';
import { useEffect, useRef } from 'react';

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <PointLight position={[5, 5, 5]} color="#3B82F6" intensity={1} />
        <PointLight position={[-5, -5, 5]} color="#FFC107" intensity={0.8} />
        <TorusKnot
          args={[1, 0.3, 128, 32]}
          position={[0, 0, 0]}
          rotation={[0.5, 0, 0]}
        >
          <meshStandardMaterial
            color="#00BFA6"
            emissive="#006060"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.2}
          />
        </TorusKnot>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}