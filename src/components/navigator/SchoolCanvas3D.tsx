import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Room } from '../../types';

interface SchoolCanvas3DProps {
  rooms: Room[];
  selectedFloor: 1 | 2 | 3;
  selectedWing: string;
  selectedRoom: Room | null;
  onSelectRoom: (room: Room) => void;
  hoveredRoom: Room | null;
  onHoverRoom: (room: Room | null) => void;
  routePath: Room[];
}

export const SchoolCanvas3D: React.FC<SchoolCanvas3DProps> = ({
  rooms,
  selectedFloor,
  selectedWing,
  selectedRoom,
  onSelectRoom,
  hoveredRoom,
  onHoverRoom,
  routePath,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const roomMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const pathLineRef = useRef<THREE.Line | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Mouse interaction state for camera drag
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraAngleRef = useRef({ theta: Math.PI / 4, phi: Math.PI / 3, radius: 24 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x050813);
    scene.fog = new THREE.FogExp2(0x050813, 0.025);

    // 2. Camera setup
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;
    
    // Update camera position from spherical angles
    const updateCamera = () => {
      const { theta, phi, radius } = cameraAngleRef.current;
      camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, (selectedFloor - 1) * 2, 0);
    };
    updateCamera();

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.replaceChildren(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight.position.set(10, 20, 15);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 1.5, 30);
    pointLight.position.set(0, 8, 0);
    scene.add(pointLight);

    // 5. Floor Grid and Base Structure
    const gridHelper = new THREE.GridHelper(30, 30, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // Render floor slabs (3 floors)
    for (let f = 1; f <= 3; f++) {
      const slabGeo = new THREE.BoxGeometry(22, 0.15, 14);
      const isCurrentFloor = f === selectedFloor;
      const slabMat = new THREE.MeshStandardMaterial({
        color: isCurrentFloor ? 0x0f172a : 0x090d16,
        transparent: true,
        opacity: isCurrentFloor ? 0.85 : 0.25,
        roughness: 0.8,
        metalness: 0.2,
      });
      const slab = new THREE.Mesh(slabGeo, slabMat);
      slab.position.y = (f - 1) * 2.2;
      scene.add(slab);

      // Floor wireframe border
      const wireGeo = new THREE.EdgesGeometry(slabGeo);
      const wireMat = new THREE.LineBasicMaterial({
        color: isCurrentFloor ? 0x06b6d4 : 0x1e293b,
        transparent: true,
        opacity: isCurrentFloor ? 0.6 : 0.15,
      });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      wire.position.y = slab.position.y;
      scene.add(wire);
    }

    // 6. Build Room Meshes
    roomMeshesRef.current.clear();
    rooms.forEach(room => {
      const isMatchingFloor = room.floor === selectedFloor;
      const isMatchingWing = selectedWing === 'all' || room.wing === selectedWing;

      const roomGeo = new THREE.BoxGeometry(3.6, 1.2, 3.2);
      
      let baseColor = 0x1e293b;
      let emissive = 0x000000;
      let emissiveIntensity = 0;

      if (room.currentStatus === 'available') {
        baseColor = 0x064e3b;
        emissive = 0x10b981;
        emissiveIntensity = 0.3;
      } else if (room.currentStatus === 'occupied') {
        baseColor = 0x1e3a8a;
        emissive = 0x3b82f6;
        emissiveIntensity = 0.2;
      } else if (room.currentStatus === 'reserved') {
        baseColor = 0x78350f;
        emissive = 0xf59e0b;
        emissiveIntensity = 0.2;
      }

      if (selectedRoom?.id === room.id) {
        baseColor = 0x0891b2;
        emissive = 0x06b6d4;
        emissiveIntensity = 0.7;
      } else if (hoveredRoom?.id === room.id) {
        emissive = 0x38bdf8;
        emissiveIntensity = 0.5;
      }

      const opacity = isMatchingFloor ? (isMatchingWing ? 0.95 : 0.4) : 0.15;

      const roomMat = new THREE.MeshStandardMaterial({
        color: baseColor,
        emissive,
        emissiveIntensity,
        roughness: 0.3,
        metalness: 0.4,
        transparent: true,
        opacity,
      });

      const mesh = new THREE.Mesh(roomGeo, roomMat);
      // Room position: floor y offset
      mesh.position.set(room.coordinates.x, (room.floor - 1) * 2.2 + 0.6, room.coordinates.z);
      mesh.userData = { room };
      scene.add(mesh);
      roomMeshesRef.current.set(room.id, mesh);

      // Edges for crisp developer-tooling aesthetic
      const edges = new THREE.EdgesGeometry(roomGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: selectedRoom?.id === room.id ? 0x22d3ee : 0x334155,
        transparent: true,
        opacity: isMatchingFloor ? 0.8 : 0.15,
      });
      const edgeLine = new THREE.LineSegments(edges, edgeMat);
      mesh.add(edgeLine);
    });

    // 7. Raycasting for hover & click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(Array.from(roomMeshesRef.current.values()));

      if (intersects.length > 0) {
        const hitRoom = intersects[0].object.userData.room as Room;
        onHoverRoom(hitRoom);
        container.style.cursor = 'pointer';
      } else {
        onHoverRoom(null);
        container.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      container.style.cursor = 'grabbing';
    };

    const handlePointerUp = (e: MouseEvent) => {
      const deltaX = Math.abs(e.clientX - previousMousePositionRef.current.x);
      const deltaY = Math.abs(e.clientY - previousMousePositionRef.current.y);

      // If minimal drag, consider it a click
      if (deltaX < 4 && deltaY < 4) {
        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(Array.from(roomMeshesRef.current.values()));
        if (intersects.length > 0) {
          const hitRoom = intersects[0].object.userData.room as Room;
          onSelectRoom(hitRoom);
        }
      }

      isDraggingRef.current = false;
      container.style.cursor = 'grab';
    };

    const handleDrag = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      cameraAngleRef.current.theta -= deltaX * 0.008;
      cameraAngleRef.current.phi = Math.max(0.1, Math.min(Math.PI / 2.1, cameraAngleRef.current.phi - deltaY * 0.008));
      updateCamera();

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraAngleRef.current.radius = Math.max(10, Math.min(45, cameraAngleRef.current.radius + e.deltaY * 0.02));
      updateCamera();
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('mousemove', handleDrag);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // 8. Animation loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      // Gentle auto-sway when idle
      if (!isDraggingRef.current) {
        cameraAngleRef.current.theta += 0.0008;
        updateCamera();
      }
      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize observer
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
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('mousemove', handleDrag);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [rooms, selectedFloor, selectedWing, selectedRoom, hoveredRoom]);

  // Update Route Line dynamically
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (pathLineRef.current) {
      scene.remove(pathLineRef.current);
      pathLineRef.current = null;
    }

    if (routePath.length >= 2) {
      const points: THREE.Vector3[] = [];
      routePath.forEach((rm, i) => {
        const yPos = (rm.floor - 1) * 2.2 + 0.8;
        points.push(new THREE.Vector3(rm.coordinates.x, yPos, rm.coordinates.z));
        // If moving across floors, add an intermediate stair node
        if (i < routePath.length - 1 && routePath[i + 1].floor !== rm.floor) {
          const nextRm = routePath[i + 1];
          const nextY = (nextRm.floor - 1) * 2.2 + 0.8;
          // Stair tower is at center (0, y, 0)
          points.push(new THREE.Vector3(0, yPos, 0));
          points.push(new THREE.Vector3(0, nextY, 0));
        }
      });

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.12, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: false,
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      scene.add(tube);
      pathLineRef.current = tube as unknown as THREE.Line;
    }
  }, [routePath]);

  return (
    <div className="relative w-full h-[540px] rounded-2xl overflow-hidden border border-slate-800 bg-dark-950 shadow-2xl">
      <div ref={mountRef} className="w-full h-full cursor-grab" />
      
      {/* 3D controls hint overlay */}
      <div className="absolute bottom-3 left-3 pointer-events-none flex items-center gap-2 bg-dark-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-mono">
        <span>🖱️ Сүйреу: Айналдыру</span>
        <span>•</span>
        <span>Колесо: Zoom</span>
        <span>•</span>
        <span>Шерту: Таңдау</span>
      </div>
    </div>
  );
};
