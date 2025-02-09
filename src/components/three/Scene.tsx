'use client'

import { Canvas, useFrame } from "@react-three/fiber";
import { Points } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function PointSphere() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 5000; // より多くの点数で滑らかさを表現

  // 初期位置を計算
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const radius = 1;

    for (let i = 0; i < count; i++) {
      const phi = Math.random() * Math.PI * 2;
      const costheta = Math.random() * 2 - 1;
      const theta = Math.acos(costheta);

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    return positions;
  }, []);

  // アニメーションフレームごとに点の位置を更新
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const time = clock.getElapsedTime();
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const positions = positionAttribute.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // 3次元ノイズを使用して有機的な動きを作成
      const noise1 = Math.sin(x * 2 + time * 0.7) * 0.1;
      const noise2 = Math.sin(y * 2 + time * 0.8) * 0.1;
      const noise3 = Math.sin(z * 2 + time * 0.9) * 0.1;

      const radius = Math.sqrt(x * x + y * y + z * z);
      const normalizedX = x / radius;
      const normalizedY = y / radius;
      const normalizedZ = z / radius;

      // 新しい位置を計算（ノイズを加えた波動効果）
      const newRadius = radius + noise1 + noise2 + noise3;

      positions[i3] = normalizedX * newRadius;
      positions[i3 + 1] = normalizedY * newRadius;
      positions[i3 + 2] = normalizedZ * newRadius;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <pointsMaterial
        size={0.003}
        color="#ffffff"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
      />
    </Points>
  );
}

export default function Scene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 3] }}>
        {/* ライト */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* 点で構成された球体 */}
        <PointSphere />
      </Canvas>
    </div>
  );
} 