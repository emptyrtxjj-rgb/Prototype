import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { mockApi } from '../../services/mockApi';
import { Room, RoomType, WingType } from '../../types';
import { SchoolCanvas3D } from './SchoolCanvas3D';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Skeleton } from '../ui/Skeleton';
import { 
  Compass, 
  MapPin, 
  Footprints, 
  Clock, 
  User, 
  Users, 
  Navigation, 
  Box, 
  Eye
} from 'lucide-react';

export const NavigatorPage: React.FC = () => {
  const { t, language, selectedRoomForNav } = useApp();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedFloor, setSelectedFloor] = useState<1 | 2 | 3>(2);
  const [selectedWing, setSelectedWing] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<Room | null>(null);

  // Pathfinding state
  const [startRoomId, setStartRoomId] = useState<string>('room-101');
  const [destinationRoomId, setDestinationRoomId] = useState<string>('room-205');
  const [routePath, setRoutePath] = useState<Room[]>([]);
  const [viewMode, setViewMode] = useState<'3D' | '2D'>('3D');

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      const data = await mockApi.getRooms();
      setRooms(data);
      setIsLoading(false);

      if (selectedRoomForNav) {
        const target = data.find(r => r.number === selectedRoomForNav);
        if (target) {
          setSelectedRoom(target);
          setSelectedFloor(target.floor);
          setDestinationRoomId(target.id);
        }
      } else {
        const defaultRoom = data.find(r => r.number === '205') || data[0];
        setSelectedRoom(defaultRoom);
      }
    };
    fetchRooms();
  }, [selectedRoomForNav]);

  // Compute route when start and destination change
  const buildRoute = () => {
    const start = rooms.find(r => r.id === startRoomId);
    const dest = rooms.find(r => r.id === destinationRoomId);
    if (!start || !dest) return;
    setRoutePath([start, dest]);
  };

  useEffect(() => {
    if (rooms.length > 0) {
      buildRoute();
    }
  }, [startRoomId, destinationRoomId, rooms]);

  const startRoom = rooms.find(r => r.id === startRoomId);
  const destRoom = rooms.find(r => r.id === destinationRoomId);

  // Estimated travel calculations
  const routeCalculations = useMemo(() => {
    if (!startRoom || !destRoom) return { steps: 0, timeSec: 0, hasStairs: false };
    const floorDiff = Math.abs(destRoom.floor - startRoom.floor);
    const coordDist = Math.sqrt(
      Math.pow(destRoom.coordinates.x - startRoom.coordinates.x, 2) +
      Math.pow(destRoom.coordinates.z - startRoom.coordinates.z, 2)
    );
    const steps = Math.round(coordDist * 10 + floorDiff * 35);
    const timeSec = Math.round(steps * 0.75);
    return {
      steps,
      timeSec,
      hasStairs: floorDiff > 0,
      floorDiff,
    };
  }, [startRoom, destRoom]);

  const filteredRooms = useMemo(() => {
    return rooms.filter(r => {
      if (r.floor !== selectedFloor) return false;
      if (selectedWing !== 'all' && r.wing !== selectedWing) return false;
      if (selectedType !== 'all' && r.type !== selectedType) return false;
      return true;
    });
  }, [rooms, selectedFloor, selectedWing, selectedType]);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setSelectedFloor(room.floor);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Title & View Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-2.5">
              <Compass className="w-7 h-7 text-cyan-400" />
              {t.navigator.title}
            </h1>
            <Badge variant="cyan" size="sm">WebGL 3D</Badge>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            {t.navigator.subtitle}
          </p>
        </div>

        {/* 3D vs 2D toggle */}
        <div className="flex items-center bg-dark-900 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setViewMode('3D')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === '3D'
                ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>{t.navigator.switchMode3D}</span>
          </button>
          <button
            onClick={() => setViewMode('2D')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === '2D'
                ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.navigator.switchMode2D}</span>
          </button>
        </div>
      </div>

      {/* Control Filters Bar */}
      <div className="p-4 rounded-2xl bg-dark-850/80 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Floor selection pills */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
              {t.navigator.floorSelect}
            </span>
            <div className="flex items-center gap-1 bg-dark-950 p-1 rounded-xl border border-slate-800">
              {([1, 2, 3] as const).map(fl => (
                <button
                  key={fl}
                  onClick={() => setSelectedFloor(fl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    selectedFloor === fl
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-950/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {fl}-{language === 'kk' ? 'қабат' : 'этаж'}
                </button>
              ))}
            </div>
          </div>

          {/* Wing selector */}
          <div className="flex items-center gap-1 bg-dark-950 p-1 rounded-xl border border-slate-800 overflow-x-auto text-xs">
            {[
              { id: 'all', label: t.navigator.wingAll },
              { id: 'west', label: t.navigator.wingWest },
              { id: 'center', label: t.navigator.wingCenter },
              { id: 'east', label: t.navigator.wingEast },
            ].map(w => (
              <button
                key={w.id}
                onClick={() => setSelectedWing(w.id)}
                className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap ${
                  selectedWing === w.id
                    ? 'bg-blue-600/30 text-cyan-300 font-medium border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>

          {/* Room type filter */}
          <div className="flex items-center gap-1 bg-dark-950 p-1 rounded-xl border border-slate-800 overflow-x-auto text-xs">
            {[
              { id: 'all', label: t.navigator.filterAll },
              { id: 'classroom', label: t.navigator.filterClassrooms },
              { id: 'lab', label: t.navigator.filterLabs },
              { id: 'medical', label: t.navigator.filterMedical },
              { id: 'canteen', label: t.navigator.filterCanteen },
              { id: 'sports', label: t.navigator.filterSports },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                  selectedType === type.id
                    ? 'bg-cyan-500/20 text-cyan-300 font-medium border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: 3D Canvas / 2D Map on Left + Route & Room Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols wide): Interactive Canvas or 2D Blueprint */}
        <div className="lg:col-span-2 space-y-4">
          {isLoading ? (
            <Skeleton className="w-full h-[540px] rounded-2xl" />
          ) : viewMode === '3D' ? (
            <div className="relative">
              <SchoolCanvas3D
                rooms={rooms}
                selectedFloor={selectedFloor}
                selectedWing={selectedWing}
                selectedRoom={selectedRoom}
                onSelectRoom={handleRoomClick}
                hoveredRoom={hoveredRoom}
                onHoverRoom={setHoveredRoom}
                routePath={routePath}
              />

              {/* Hover Floating Tooltip */}
              {hoveredRoom && (
                <div className="absolute top-4 right-4 p-3 rounded-xl bg-dark-900/90 backdrop-blur-md border border-cyan-500/40 shadow-xl pointer-events-none animate-fade-in">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      № {hoveredRoom.number}
                    </span>
                    <Badge variant={hoveredRoom.currentStatus === 'available' ? 'emerald' : 'amber'} size="sm">
                      {hoveredRoom.currentStatus.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs font-semibold text-slate-100 mt-1">
                    {language === 'kk' ? hoveredRoom.nameKk : hoveredRoom.nameRu}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {hoveredRoom.floor}-{language === 'kk' ? 'қабат' : 'этаж'} • {hoveredRoom.wing.toUpperCase()}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* 2D Schematic Blueprint Grid */
            <div className="p-6 rounded-2xl bg-dark-950 border border-slate-800 min-h-[540px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-cyan-400 font-semibold">
                    📐 2D ИЗОМЕТРИЯЛЫҚ СЫЗБА • {selectedFloor}-ҚАБАТ
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    МАСШТАБ 1:100 • №128 IT-ЛИЦЕЙ
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredRooms.map(rm => {
                    const isSelected = selectedRoom?.id === rm.id;
                    const isStart = startRoomId === rm.id;
                    const isDest = destinationRoomId === rm.id;

                    return (
                      <div
                        key={rm.id}
                        onClick={() => handleRoomClick(rm)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 shadow-glow-cyan'
                            : 'bg-dark-900/80 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs font-bold text-cyan-300">
                            № {rm.number}
                          </span>
                          <Badge variant={rm.currentStatus === 'available' ? 'emerald' : 'amber'} size="sm">
                            {rm.currentStatus}
                          </Badge>
                        </div>
                        <p className="text-xs font-semibold text-slate-200 line-clamp-1">
                          {language === 'kk' ? rm.nameKk : rm.nameRu}
                        </p>
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono">
                          <span>{rm.capacity} орын</span>
                          {isStart && <span className="text-amber-400 font-bold">START</span>}
                          {isDest && <span className="text-cyan-400 font-bold">DEST</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 font-mono flex items-center justify-between">
                <span>Жасыл = Бос кабинет</span>
                <span>Көк = Сабақ өтуде</span>
                <span>Сары = Брондалған</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Pathfinding Route Builder + Selected Room Details */}
        <div className="space-y-4">
          {/* Route Planner Card */}
          <Card glow="cyan">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <Navigation className="w-4 h-4" />
                </span>
                <CardTitle>{t.navigator.routePlanner}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="space-y-3">
                {/* Start room select */}
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    🟢 {t.navigator.startPoint}:
                  </label>
                  <select
                    value={startRoomId}
                    onChange={e => setStartRoomId(e.target.value)}
                    className="w-full bg-dark-950 text-slate-200 text-xs rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    {rooms.map(rm => (
                      <option key={rm.id} value={rm.id}>
                        {rm.number} — {language === 'kk' ? rm.nameKk : rm.nameRu} ({rm.floor}-қабат)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Destination room select */}
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    🏁 {t.navigator.destinationPoint}:
                  </label>
                  <select
                    value={destinationRoomId}
                    onChange={e => setDestinationRoomId(e.target.value)}
                    className="w-full bg-dark-950 text-slate-200 text-xs rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    {rooms.map(rm => (
                      <option key={rm.id} value={rm.id}>
                        {rm.number} — {language === 'kk' ? rm.nameKk : rm.nameRu} ({rm.floor}-қабат)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Route calculation output */}
              <div className="p-3.5 rounded-xl bg-dark-950 border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {t.navigator.travelTime}:
                  </span>
                  <span className="font-mono font-bold text-cyan-300">
                    ~{Math.floor(routeCalculations.timeSec / 60)} мин {routeCalculations.timeSec % 60} сек
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Footprints className="w-3.5 h-3.5 text-emerald-400" />
                    {t.navigator.stepsCount}:
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    {routeCalculations.steps} қадам
                  </span>
                </div>

                {routeCalculations.hasStairs && (
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-400 bg-amber-950/30 p-2 rounded-lg border border-amber-500/30 font-mono mt-1">
                    <span className="shrink-0">⚠️</span>
                    <span>
                      {language === 'kk' 
                        ? `${routeCalculations.floorDiff} қабатқа орталық сатымен ауысу қажет`
                        : `Переход по центральной лестнице на ${routeCalculations.floorDiff} этаж`}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Selected Room Details Card */}
          {selectedRoom ? (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <span className="text-xs font-mono text-cyan-400">№ {selectedRoom.number}</span>
                    <CardTitle className="text-base mt-0.5">
                      {language === 'kk' ? selectedRoom.nameKk : selectedRoom.nameRu}
                    </CardTitle>
                  </div>
                  <Badge 
                    variant={selectedRoom.currentStatus === 'available' ? 'emerald' : 'amber'} 
                    size="md"
                    hasDot
                  >
                    {selectedRoom.currentStatus === 'available' 
                      ? t.navigator.statusAvailable 
                      : selectedRoom.currentStatus === 'occupied' 
                      ? t.navigator.statusOccupied 
                      : selectedRoom.currentStatus === 'reserved'
                      ? t.navigator.statusReserved
                      : t.navigator.statusCleaning}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'kk' ? selectedRoom.descriptionKk : selectedRoom.descriptionRu}
                </p>

                <div className="space-y-2 border-t border-slate-800 pt-3">
                  <div className="flex items-start gap-2.5">
                    <User className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-slate-200">{selectedRoom.teacherInCharge}</p>
                      <p className="text-[11px] text-slate-400">
                        {language === 'kk' ? selectedRoom.teacherRoleKk : selectedRoom.teacherRoleRu}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <Users className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{t.navigator.roomCapacity}: <strong className="font-mono text-slate-100">{selectedRoom.capacity} оқушы</strong></span>
                  </div>
                </div>

                {/* Equipment List */}
                <div className="border-t border-slate-800 pt-3">
                  <p className="text-[11px] font-mono text-slate-400 mb-2">
                    🛠️ {t.navigator.equipmentAvailable}:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRoom.equipment.map((eq, i) => (
                      <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-900 border border-slate-800 text-slate-300">
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick actions for path */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStartRoomId(selectedRoom.id)}
                  >
                    {language === 'kk' ? 'Бастау нүктесі' : 'Сделать стартом'}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setDestinationRoomId(selectedRoom.id)}
                  >
                    {language === 'kk' ? 'Осында бару' : 'Идти сюда'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-slate-500 text-xs">
                {language === 'kk' ? 'Толық ақпарат алу үшін 3D картадан бөлмені таңдаңыз' : 'Выберите помещение на 3D карте'}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
