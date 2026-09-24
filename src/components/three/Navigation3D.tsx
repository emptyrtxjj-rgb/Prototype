import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RoomCoord {
  id: string;
  number: string;
  name: string;
  floor: number;
  wing: string;
  coordinates: { x: number; y: number; z: number };
}

interface Navigation3DProps {
  rooms: RoomCoord[];
  activeFloor: number;
  onFloorChange?: (floor: number) => void;
  startRoomNumber: string;
  destRoomNumber: string;
  onRoomSelect?: (roomNumber: string) => void;
}

export const Navigation3D: React.FC<Navigation3DProps> = ({
  rooms,
  activeFloor,
  startRoomNumber,
  destRoomNumber,
  onRoomSelect,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const pathLineRef = useRef<THREE.Mesh | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x060913);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(16, 14, 18);
    camera.lookAt(0, (activeFloor - 1) * 2.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.replaceChildren(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    const pointCyan = new THREE.PointLight(0x06b6d4, 2, 25);
    pointCyan.position.set(0, 10, 0);
    scene.add(pointCyan);

    // Grid base
    const grid = new THREE.GridHelper(26, 26, 0x1e293b, 0x0f172a);
    grid.position.y = -0.05;
    scene.add(grid);

    // Slabs for floors 1 to 4
    for (let f = 1; f <= 4; f++) {
      const slabGeo = new THREE.BoxGeometry(22, 0.15, 14);
      const isCurrent = f === activeFloor;
      const slabMat = new THREE.MeshStandardMaterial({
        color: isCurrent ? 0x0f172a : 0x070c18,
        transparent: true,
        opacity: isCurrent ? 0.9 : 0.25,
      });
      const slab = new THREE.Mesh(slabGeo, slabMat);
      slab.position.y = (f - 1) * 2.2;
      scene.add(slab);

      const wireGeo = new THREE.EdgesGeometry(slabGeo);
      const wireMat = new THREE.LineBasicMaterial({
        color: isCurrent ? 0x06b6d4 : 0x1e293b,
        transparent: true,
        opacity: isCurrent ? 0.7 : 0.15,
      });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      wire.position.y = slab.position.y;
      scene.add(wire);
    }

    // Room Blocks
    const meshesMap = new Map<string, THREE.Mesh>();
    rooms.forEach(room => {
      const isMatch = room.floor === activeFloor;
      const isStart = room.number === startRoomNumber;
      const isDest = room.number === destRoomNumber;

      const roomGeo = new THREE.BoxGeometry(3.6, 1.2, 3.2);

      let color = 0x1e293b;
      let emissive = 0x000000;
      let emissiveIntensity = 0;

      if (isStart) {
        color = 0x15803d;
        emissive = 0x22c55e;
        emissiveIntensity = 0.8;
      } else if (isDest) {
        color = 0x0284c7;
        emissive = 0x06b6d4;
        emissiveIntensity = 0.9;
      } else if (isMatch) {
        color = 0x0f172a;
        emissive = 0x1e293b;
        emissiveIntensity = 0.1;
      }

      const roomMat = new THREE.MeshStandardMaterial({
        color,
        emissive,
        emissiveIntensity,
        roughness: 0.3,
        metalness: 0.5,
        transparent: true,
        opacity: isMatch ? 0.95 : 0.2,
      });

      const mesh = new THREE.Mesh(roomGeo, roomMat);
      mesh.position.set(room.coordinates.x, (room.floor - 1) * 2.2 + 0.6, room.coordinates.z);
      mesh.userData = { roomNumber: room.number };
      scene.add(mesh);
      meshesMap.set(room.number, mesh);

      const edges = new THREE.EdgesGeometry(roomGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: isDest ? 0x22d3ee : isStart ? 0x4ade80 : 0x334155,
        transparent: true,
        opacity: isMatch ? 0.85 : 0.15,
      });
      const edgeLine = new THREE.LineSegments(edges, edgeMat);
      mesh.add(edgeLine);
    });

    // Orbit Drag Controls
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let spherical = { theta: Math.PI / 4, phi: Math.PI / 3.2, radius: 24 };

    const updateCameraPos = () => {
      camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.position.y = spherical.radius * Math.cos(spherical.phi);
      camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.lookAt(0, (activeFloor - 1) * 2.2, 0);
    };
    updateCameraPos();

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      spherical.theta -= dx * 0.007;
      spherical.phi = Math.max(0.1, Math.min(Math.PI / 2.05, spherical.phi - dy * 0.007));
      updateCameraPos();
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = (e: MouseEvent) => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      spherical.radius = Math.max(10, Math.min(40, spherical.radius + e.deltaY * 0.02));
      updateCameraPos();
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        spherical.theta += 0.0006;
        updateCameraPos();
      }
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
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [rooms, activeFloor, startRoomNumber, destRoomNumber]);

  // Dynamic Route Line Tube
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (pathLineRef.current) {
      scene.remove(pathLineRef.current);
      pathLineRef.current = null;
    }

    const start = rooms.find(r => r.number === startRoomNumber);
    const dest = rooms.find(r => r.number === destRoomNumber);

    if (start && dest) {
      const y1 = (start.floor - 1) * 2.2 + 0.8;
      const y2 = (dest.floor - 1) * 2.2 + 0.8;

      const points: THREE.Vector3[] = [];
      points.push(new THREE.Vector3(start.coordinates.x, y1, start.coordinates.z));

      // Intermediate corridor / stair waypoint
      if (start.floor !== dest.floor) {
        points.push(new THREE.Vector3(0, y1, 0)); // stairs entrance
        points.push(new THREE.Vector3(0, y2, 0)); // stairs exit
      } else {
        points.push(new THREE.Vector3(0, y1, (start.coordinates.z + dest.coordinates.z) / 2));
      }

      points.push(new THREE.Vector3(dest.coordinates.x, y2, dest.coordinates.z));

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.16, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      scene.add(tube);
      pathLineRef.current = tube;
    }
  }, [rooms, startRoomNumber, destRoomNumber]);

  return (
    <div className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-slate-800 bg-[#060913] shadow-2xl">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-4 left-4 bg-dark-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-xs font-mono text-slate-300 flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400" /> Старт: {startRoomNumber}
        </span>
        <span className="text-slate-600">|</span>
        <span className="flex items-center gap-1.5 text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400" /> Финиш: {destRoomNumber}
        </span>
      </div>
    </div>
  );
};
