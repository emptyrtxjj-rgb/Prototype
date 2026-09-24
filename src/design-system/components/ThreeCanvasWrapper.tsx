import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface ThreeCanvasWrapperProps {
  height?: string;
  className?: string;
}

export const ThreeCanvasWrapper: React.FC<ThreeCanvasWrapperProps> = ({
  height = '360px',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 49-50. Clean, architectural, abstract Three.js setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(5, 4, 7);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 50. Soft lighting: ambient light + directional + subtle blue/green accents
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const blueDirLight = new THREE.DirectionalLight(0x2563eb, 2.0);
    blueDirLight.position.set(6, 8, 4);
    scene.add(blueDirLight);

    const greenAccentLight = new THREE.PointLight(0x16a34a, 1.8, 15);
    greenAccentLight.position.set(-4, 2, -2);
    scene.add(greenAccentLight);

    // 49. Architectural Minimal Primitives (Wireframe grid + stacked geometric planes)
    const gridHelper = new THREE.GridHelper(10, 16, 0x2563eb, 0x1f2937);
    gridHelper.position.y = -1;
    scene.add(gridHelper);

    // Architectural geometric blocks representing modular building blocks
    const group = new THREE.Group();

    const boxGeo = new THREE.BoxGeometry(1.6, 0.4, 1.6);
    const boxMat1 = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.2,
      metalness: 0.8,
    });

    const boxMat2 = new THREE.MeshStandardMaterial({
      color: 0x0f2f6b,
      roughness: 0.3,
      metalness: 0.6,
      wireframe: false,
    });

    const box1 = new THREE.Mesh(boxGeo, boxMat1);
    box1.position.set(-0.8, 0, 0);
    group.add(box1);

    const box2 = new THREE.Mesh(boxGeo, boxMat2);
    box2.position.set(0.8, 0.4, 0);
    group.add(box2);

    const box3 = new THREE.Mesh(boxGeo, boxMat1);
    box3.position.set(0, 0.8, -0.8);
    group.add(box3);

    // Soft emissive ring/path
    const ringGeo = new THREE.TorusGeometry(2.4, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, wireframe: true });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.6;
    group.add(ring);

    scene.add(group);

    // Animation Loop: Calm, restrained rotation
    let animationFrameId: number;
    const animate = () => {
      group.rotation.y += 0.003;
      ring.rotation.z += 0.005;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className={`relative w-full rounded-[24px] overflow-hidden border border-white/12 light:border-black/10 bg-black ${className}`}
    >
      <div className="absolute top-4 left-4 z-10 font-mono text-[11px] text-[#8e8e8e] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
        <span>3D Canvas • Architectural Ambient Preset</span>
      </div>
    </div>
  );
};
