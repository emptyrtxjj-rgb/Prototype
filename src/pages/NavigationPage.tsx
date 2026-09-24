import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { navigationService, RouteResult } from '../services/navigationService';
import { Navigation3D } from '../components/three/Navigation3D';
import { 
  Compass, 
  MapPin, 
  Footprints, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  RotateCcw,
  Sparkles,
  Search
} from 'lucide-react';

export const NavigationPage: React.FC = () => {
  const { selectedRoomForNav, setSelectedRoomForNav } = useApp();

  const [rooms, setRooms] = useState<any[]>([]);
  const [activeFloor, setActiveFloor] = useState<number>(2);
  const [fromRoom, setFromRoom] = useState<string>('101');
  const [toRoom, setToRoom] = useState<string>(selectedRoomForNav || '204');
  const [customRoomInput, setCustomRoomInput] = useState<string>('');

  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    navigationService.getRooms().then((data: any[]) => {
      setRooms(data);
      if (selectedRoomForNav) {
        const found = data.find((r: any) => r.number === selectedRoomForNav);
        if (found) {
          setActiveFloor(found.floor);
          setToRoom(selectedRoomForNav);
          handleBuildRoute(fromRoom, selectedRoomForNav);
        }
      }
    });
  }, [selectedRoomForNav]);

  const handleBuildRoute = async (start = fromRoom, destination = toRoom) => {
    setErrorMessage(null);
    setIsLoading(true);

    const destTarget = customRoomInput.trim() ? customRoomInput.trim() : destination;

    try {
      const result = await navigationService.calculateRoute(start, destTarget);
      setRouteResult(result);
      if (result.toRoom) {
        setActiveFloor(result.toRoom.floor);
      }
    } catch (err: any) {
      setRouteResult(null);
      setErrorMessage(err.message || 'Маршрут құру кезінде қате орын алды.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPreset = (targetNum: string) => {
    setToRoom(targetNum);
    setCustomRoomInput('');
    handleBuildRoute(fromRoom, targetNum);
  };

  return (
    <div className="space-y-8 pb-16 animate-academic-fade">
      {/* Title & Description */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7A1526]/10 text-[#7A1526] border border-[#7A1526]/20 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1F23]">
                3D Навигация және кабинеттер картасы
              </h1>
              <p className="text-xs sm:text-sm text-stone-600">
                Ғимарат ішіндегі қабаттар бойынша интерактивті навигация, уақытты есептеу және бағыт құру.
              </p>
            </div>
          </div>
        </div>

        {/* Floor switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-stone-200 shadow-sm">
          {[1, 2, 3, 4].map(floor => (
            <button
              key={floor}
              onClick={() => setActiveFloor(floor)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                activeFloor === floor
                  ? 'bg-[#7A1526] text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {floor}-қабат
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Controls + 3D View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Route Planner Form & Result (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="academic-card p-6 space-y-4">
            <h3 className="font-serif font-bold text-[#1C1F23] text-lg flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#7A1526]" />
              Маршрут параметрлері
            </h3>

            {/* Error Notification Banner */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-mono flex items-start gap-2.5 animate-academic-fade">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold">Навигация қатесі:</p>
                  <p className="mt-0.5 leading-relaxed">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Selectors */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1">
                  Қайдан (Бастапқы нүкте):
                </label>
                <select
                  value={fromRoom}
                  onChange={e => setFromRoom(e.target.value)}
                  className="w-full bg-white text-stone-800 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:border-[#7A1526]"
                >
                  <option value="101">101 — Басты кіреберіс / Бастауыш сыныптар</option>
                  <option value="102">102 — Медициналық пункт (1-қабат)</option>
                  <option value="110">110 — Асхана & Smart Буфет</option>
                  <option value="204">204 — Математика кабинеті (2-қабат)</option>
                  <option value="315">315 — Медиатека & Цифрлық кітапхана</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1">
                  Қайда (Тағайындалған орын):
                </label>
                <select
                  value={toRoom}
                  onChange={e => {
                    setToRoom(e.target.value);
                    setCustomRoomInput('');
                  }}
                  className="w-full bg-white text-stone-800 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:border-[#7A1526]"
                >
                  <option value="">[ Мақсатты кабинетті таңдаңыз ]</option>
                  <option value="204">Кабинет 204 — Жоғары математика</option>
                  <option value="101">Кабинет 101 — Бастауыш сыныптар</option>
                  <option value="102">Кабинет 102 — Медициналық пункт</option>
                  <option value="110">Кабинет 110 — Мектеп асханасы</option>
                  <option value="115">Кабинет 115 — Спорттық кешен</option>
                  <option value="201">Кабинет 201 — Директор қабылдау бөлмесі</option>
                  <option value="208">Кабинет 208 — Физика зертханасы</option>
                  <option value="214">Кабинет 214 — Химия & Биология</option>
                  <option value="222">Кабинет 222 — Language Hub</option>
                  <option value="301">Кабинет 301 — Робототехника</option>
                  <option value="305">Кабинет 305 — IT Academy</option>
                  <option value="315">Кабинет 315 — Цифрлық кітапхана</option>
                  <option value="320">Кабинет 320 — Акт залы</option>
                  <option value="417">Кабинет 417 — Астрономия & Обсерватория</option>
                </select>
              </div>

              {/* Or manual custom input */}
              <div>
                <label className="block text-[11px] font-mono text-stone-500 mb-1">
                  Немесе кабинет нөмірін қолмен енгізіңіз:
                </label>
                <input
                  type="text"
                  value={customRoomInput}
                  onChange={e => setCustomRoomInput(e.target.value)}
                  placeholder="Мысалы: 204 немесе қате тесті үшін 999"
                  className="w-full bg-white text-stone-800 border border-stone-300 rounded-xl px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-[#7A1526]"
                />
              </div>
            </div>

            {/* Quick Chips */}
            <div className="pt-1">
              <span className="text-[10px] font-mono text-stone-500 block mb-1.5">
                Жылдам таңдау:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['204', '102', '315', '110', '115', '417', '999'].map(chip => (
                  <button
                    key={chip}
                    onClick={() => handleQuickPreset(chip)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                      chip === '999'
                        ? 'bg-rose-50 text-rose-700 border border-rose-300 hover:bg-rose-100'
                        : 'bg-[#FAF8F5] text-stone-700 border border-stone-200 hover:border-[#7A1526] hover:text-[#7A1526]'
                    }`}
                  >
                    {chip === '999' ? 'Тест 999' : `Каб. ${chip}`}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleBuildRoute()}
              disabled={isLoading}
              className="btn-crimson w-full text-xs font-semibold py-3"
            >
              {isLoading ? 'Маршрут есептелуде...' : 'МАРШРУТТЫ ҚҰРУ'}
            </button>
          </div>

          {/* ROUTE RESULT CARD */}
          {routeResult && (
            <div className="academic-card p-6 border-l-4 border-l-[#7A1526] space-y-4 animate-academic-fade">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-serif font-bold text-sm text-[#1C1F23]">
                    Маршрут табысты құрылды
                  </span>
                </div>
                <span className="text-xs font-mono text-[#7A1526] font-bold">
                  {routeResult.time}
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-stone-700">
                  <span className="text-stone-500">Бастапқы:</span>
                  <span className="font-bold">{routeResult.from}</span>
                </div>
                <div className="flex justify-between text-stone-700">
                  <span className="text-stone-500">Мақсатты:</span>
                  <span className="font-bold text-[#7A1526]">{routeResult.to}</span>
                </div>
                <div className="flex justify-between text-stone-700">
                  <span className="text-stone-500">Қашықтық:</span>
                  <span className="font-bold text-emerald-700">{routeResult.distance}</span>
                </div>
              </div>

              {/* Step-by-Step Directions */}
              <div className="pt-3 border-t border-stone-100 space-y-2">
                <span className="text-[11px] font-mono text-stone-500 font-bold block">
                  ҚАДАМДЫҚ БАҒЫТ:
                </span>
                <div className="space-y-1.5 text-xs">
                  {routeResult.steps.map((step: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80">
                      <span className="text-[#7A1526] font-mono font-bold shrink-0">{idx + 1}.</span>
                      <span className="text-stone-800">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: 3D Floor Map Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="rounded-[24px] overflow-hidden border border-stone-300 shadow-md bg-white">
            <Navigation3D
              rooms={rooms}
              activeFloor={activeFloor}
              startRoomNumber={fromRoom}
              destRoomNumber={routeResult?.toRoom?.number || toRoom}
              onRoomSelect={(num: string) => {
                setToRoom(num);
                setCustomRoomInput('');
                handleBuildRoute(fromRoom, num);
              }}
            />
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-stone-500 px-2">
            <span>🖱️ Тінтуірдің сол батырмасымен айналдыру</span>
            <span>Дөңгелек: Масштаб</span>
            <span>Белсенді қабат: {activeFloor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
