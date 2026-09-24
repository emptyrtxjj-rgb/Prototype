import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CampusHero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(12, 10, 16);
    camera.lookAt(0, 0, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.replaceChildren(renderer.domElement);

    // 4. Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const pointCyan = new THREE.PointLight(0x06b6d4, 3, 30);
    pointCyan.position.set(5, 8, 5);
    scene.add(pointCyan);

    const pointEmerald = new THREE.PointLight(0x10b981, 2.5, 30);
    pointEmerald.position.set(-5, 4, -5);
    scene.add(pointEmerald);

    // 5. Procedural Campus Geometry
    const campusGroup = new THREE.Group();
    scene.add(campusGroup);

    // Building Blocks
    const buildings = [
      { x: -3.5, y: 1.5, z: -2, w: 3, h: 3, d: 4, color: 0x0284c7 },
      { x: 1.5, y: 2.2, z: -1, w: 4, h: 4.4, d: 3.5, color: 0x0ea5e9 },
      { x: -1, y: 1.0, z: 2.5, w: 5, h: 2, d: 3, color: 0x10b981 },
      { x: 3.8, y: 1.8, z: 2.5, w: 2.8, h: 3.6, d: 2.8, color: 0x059669 },
    ];

    buildings.forEach(b => {
      const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
      const mat = new THREE.MeshStandardMaterial({
        color: b.color,
        roughness: 0.2,
        metalness: 0.6,
        transparent: true,
        opacity: 0.75,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(b.x, b.y, b.z);
      campusGroup.add(mesh);

      // Neon Edges
      const edges = new THREE.EdgesGeometry(geo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.85,
      });
      const edgeLine = new THREE.LineSegments(edges, edgeMat);
      mesh.add(edgeLine);
    });

    // Connecting Skybridge Tube
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.5, 2.5, -2),
      new THREE.Vector3(-1, 2.8, 0),
      new THREE.Vector3(1.5, 3.2, -1),
      new THREE.Vector3(3.8, 2.8, 2.5),
    ]);
    const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.15, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    campusGroup.add(tube);

    // Glowing Floating Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 18;
      positions[i + 1] = Math.random() * 8;
      positions[i + 2] = (Math.random() - 0.5) * 18;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.18,
      transparent: true,
      opacity: 0.7,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    campusGroup.add(particleSystem);

    // Base Grid
    const grid = new THREE.GridHelper(24, 24, 0x1e293b, 0x0f172a);
    grid.position.y = -0.05;
    scene.add(grid);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animId: number;
    let time = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.008;

      campusGroup.rotation.y = time * 0.4 + mouseX * 0.3;
      campusGroup.rotation.x = Math.sin(time * 0.5) * 0.05 - mouseY * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] lg:h-[480px] rounded-3xl overflow-hidden pointer-events-auto">
      <div ref={mountRef} className="w-full h-full cursor-pointer" />
      <div className="absolute top-4 right-4 bg-dark-900/70 dark:bg-dark-900/70 light:bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/50 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>3D DIGITAL TWIN • ALMATY CAMPUS</span>
      </div>
    </div>
  );
};
