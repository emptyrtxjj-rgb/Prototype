import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Droplet, 
  Timer, 
  Mountain, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Trophy, 
  Users, 
  Flame, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Minus,
  Compass,
  Heart,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { AcademicCrest } from '../components/common/AcademicCrest';

interface GearItem {
  id: string;
  name: string;
  nameKk: string;
  category: 'essentials' | 'safety' | 'food' | 'clothes';
  weightKg: number;
  isMandatory: boolean;
  packed: boolean;
}

interface SportsClub {
  id: string;
  name: string;
  category: string;
  coach: string;
  schedule: string;
  room: string;
  spotsLeft: number;
  totalSpots: number;
  joined: boolean;
}

export const ActivityPage: React.FC = () => {
  const { language, addToast } = useApp();

  // Hydration state (Goal: 2000 ml = 8 glasses of 250ml)
  const [waterMl, setWaterMl] = useState<number>(() => {
    const saved = localStorage.getItem('smart_school_water');
    return saved ? parseInt(saved, 10) : 750;
  });
  const waterGoal = 2000;
  const glassSize = 250;

  // 20-20-20 Timer state (20 min = 1200 sec, or 20 sec eye rest)
  const [timerSeconds, setTimerSeconds] = useState<number>(1200);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<'work' | 'rest'>('work');

  // Gear checklist for Almaty Mountains / Kok-Tobe / Charyn expedition
  const [gearList, setGearList] = useState<GearItem[]>([
    { id: '1', name: 'Рюкзак анатомический (25–35 л)', nameKk: 'Анатомиялық рюкзак (25-35 л)', category: 'essentials', weightKg: 1.2, isMandatory: true, packed: true },
    { id: '2', name: 'Треккинговая обувь с фиксацией голеностопа', nameKk: 'Треккингтік аяқ киім', category: 'essentials', weightKg: 0.9, isMandatory: true, packed: true },
    { id: '3', name: 'Индивидуальная школьная аптечка', nameKk: 'Жеке мектеп дәрі қобдишасы', category: 'safety', weightKg: 0.4, isMandatory: true, packed: false },
    { id: '4', name: 'Термобутылка / гидратор (не менее 1.5 л)', nameKk: 'Термобөтелке / гидратор (1.5 л)', category: 'essentials', weightKg: 1.6, isMandatory: true, packed: true },
    { id: '5', name: 'Ветрозащитная куртка (Мембрана / Gore-Tex)', nameKk: 'Желден қорғайтын күрте', category: 'clothes', weightKg: 0.6, isMandatory: true, packed: false },
    { id: '6', name: 'Налобный фонарь с запасным комплектом батарей', nameKk: 'Қосалқы батареясы бар маңдайша шам', category: 'safety', weightKg: 0.2, isMandatory: false, packed: false },
    { id: '7', name: 'Энергетические снеки (орехи, сухофрукты, курт)', nameKk: 'Құрт және жаңғақтар жинағы', category: 'food', weightKg: 0.5, isMandatory: true, packed: true },
    { id: '8', name: 'Солнцезащитный крем (SPF 50+) и очки UV400', nameKk: 'Күннен қорғайтын крем және көзілдірік', category: 'safety', weightKg: 0.3, isMandatory: true, packed: false },
    { id: '9', name: 'Свисток спасательный и компас', nameKk: 'Құтқару ысқырығы және компас', category: 'safety', weightKg: 0.1, isMandatory: false, packed: true }
  ]);

  // Clubs
  const [clubs, setClubs] = useState<SportsClub[]>([
    {
      id: 'c1',
      name: 'Баскетбольная лига Медеу',
      category: 'Спорт / Команда',
      coach: 'Абдуллаев Р. К. (Мастер спорта РК)',
      schedule: 'Пн, Ср, Пт 16:30 – 18:00',
      room: 'Спортзал А (1 этаж)',
      spotsLeft: 3,
      totalSpots: 20,
      joined: false
    },
    {
      id: 'c2',
      name: 'Горный клуб юных натуралистов Заилийского Алатау',
      category: 'Туризм / Экология',
      coach: 'Касымова А. М.',
      schedule: 'Суббота 09:00 – 15:00',
      room: 'Каб. 204 (География)',
      spotsLeft: 5,
      totalSpots: 18,
      joined: true
    },
    {
      id: 'c3',
      name: 'Шахматная академия «Ақбозат»',
      category: 'Интеллектуальный спорт',
      coach: 'Гроссмейстер Садуакасов Б.',
      schedule: 'Вт, Чт 15:00 – 16:30',
      room: 'Каб. 312 (Медиатека)',
      spotsLeft: 1,
      totalSpots: 14,
      joined: false
    },
    {
      id: 'c4',
      name: 'Школьная сборная по волейболу',
      category: 'Спорт / Волейбол',
      coach: 'Ерланов Д. С.',
      schedule: 'Вт, Пт 17:00 – 18:30',
      room: 'Спортзал Б (1 этаж)',
      spotsLeft: 4,
      totalSpots: 16,
      joined: false
    }
  ]);

  // Sync hydration
  useEffect(() => {
    localStorage.setItem('smart_school_water', waterMl.toString());
  }, [waterMl]);

  // 20-20-20 timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      if (timerMode === 'work') {
        // Switch to eye rest
        setTimerMode('rest');
        setTimerSeconds(20);
        addToast('Перерыв 20 секунд!', 'Посмотрите вдаль на расстояние 6 метров для снятия усталости глаз.', 'success');
        try {
          confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
        } catch { /* noop */ }
      } else {
        // Switch back to work
        setTimerMode('work');
        setTimerSeconds(1200);
        addToast('Глаза отдохнули!', 'Продолжайте продуктивную учебу. Следующий перерыв через 20 минут.', 'info');
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timerSeconds, timerMode, addToast]);

  const toggleGear = (id: string) => {
    setGearList(prev => prev.map(item => {
      if (item.id === id) {
        const nextPacked = !item.packed;
        if (nextPacked) {
          addToast('Снаряжение собрано', `${item.name} добавлено в рюкзак`, 'success');
        }
        return { ...item, packed: nextPacked };
      }
      return item;
    }));
  };

  const handleWaterAdd = (amount: number) => {
    setWaterMl(prev => {
      const next = Math.max(0, Math.min(3500, prev + amount));
      if (next >= waterGoal && prev < waterGoal) {
        addToast('Цель достигнута! 💧', 'Вы выпили 2.0 литра воды сегодня. Превосходный уровень гидратации!', 'success');
        try {
          confetti({ particleCount: 50, spread: 80, origin: { y: 0.5 } });
        } catch { /* noop */ }
      }
      return next;
    });
  };

  const toggleClubJoin = (id: string) => {
    setClubs(prev => prev.map(club => {
      if (club.id === id) {
        const nextState = !club.joined;
        addToast(
          nextState ? 'Запись подтверждена!' : 'Запись отменена',
          nextState ? `Вы успешно записались в клуб "${club.name}"` : `Вы вышли из клуба "${club.name}"`,
          nextState ? 'success' : 'info'
        );
        return {
          ...club,
          joined: nextState,
          spotsLeft: nextState ? club.spotsLeft - 1 : club.spotsLeft + 1
        };
      }
      return club;
    }));
  };

  // Calculations
  const packedCount = gearList.filter(g => g.packed).length;
  const packedWeight = gearList.filter(g => g.packed).reduce((acc, curr) => acc + curr.weightKg, 0);
  const totalWeight = gearList.reduce((acc, curr) => acc + curr.weightKg, 0);
  const gearProgress = Math.round((packedCount / gearList.length) * 100);
  const hydrationPercent = Math.min(100, Math.round((waterMl / waterGoal) * 100));

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16 max-w-7xl mx-auto">
      {/* Top Academic Banner */}
      <div className="bg-white border border-stone-200 rounded-[24px] p-8 sm:p-10 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A1526]/10 border border-[#7A1526]/20 text-[#7A1526] text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>Athletics, Wellness & Outdoor Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Спорт, Здоровье и Экспедиции
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
            Академический центр физической культуры и активного образа жизни: контроль гидратации, защита зрения по правилу 20-20-20, горные чек-листы и лицейские сборные команды.
          </p>
        </div>

        {/* Quick Stat Pills */}
        <div className="flex sm:flex-row md:flex-col gap-3 shrink-0">
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-center min-w-[140px] shadow-sm">
            <span className="text-xs text-stone-500 font-sans block">Энергия дня</span>
            <div className="text-2xl font-serif font-bold text-[#7A1526] flex items-center justify-center gap-1.5 mt-0.5">
              <Flame className="w-5 h-5 text-[#7A1526] fill-[#7A1526]" />
              94%
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-center min-w-[140px] shadow-sm">
            <span className="text-xs text-stone-500 font-sans block">Баллы активности</span>
            <div className="text-2xl font-serif font-bold text-[#C5A059] flex items-center justify-center gap-1.5 mt-0.5">
              <Trophy className="w-5 h-5 text-[#C5A059]" />
              480 pts
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: Hydration Tracker + 20-20-20 Eye Protocol */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card 1: Hydration Logger */}
        <div className="academic-card bg-white space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700">
                <Droplet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900">Баланс гидратации</h3>
                <p className="text-xs text-stone-500 font-sans">Норма: 2.0 литра (8 стаканов) в день</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-100/70 text-cyan-900 border border-cyan-200">
              {hydrationPercent}% нормы
            </span>
          </div>

          {/* Progress Bar & Display */}
          <div className="space-y-2">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-serif text-3xl font-bold text-stone-900">
                {waterMl} <span className="text-sm font-sans font-normal text-stone-500">мл</span>
              </span>
              <span className="text-xs text-stone-500 font-sans">
                Цель: {waterGoal} мл ({Math.round(waterGoal / glassSize)} стаканов)
              </span>
            </div>
            <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
              <div 
                className="h-full bg-gradient-to-r from-cyan-600 to-teal-500 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${hydrationPercent}%` }}
              />
            </div>
          </div>

          {/* Interactive Glasses Grid */}
          <div className="grid grid-cols-8 gap-2">
            {Array.from({ length: 8 }).map((_, i) => {
              const isFilled = (i + 1) * glassSize <= waterMl;
              return (
                <button
                  key={i}
                  onClick={() => {
                    const targetAmount = (i + 1) * glassSize;
                    setWaterMl(targetAmount);
                  }}
                  title={`Стакан #${i + 1} (${(i + 1) * 250} мл)`}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-200 ${
                    isFilled 
                      ? 'bg-cyan-50 border-cyan-300 text-cyan-700 scale-105 shadow-sm' 
                      : 'bg-[#FAF8F5] border-stone-200 text-stone-400 hover:border-stone-300'
                  }`}
                >
                  <Droplet className={`w-5 h-5 ${isFilled ? 'fill-cyan-600 text-cyan-600' : ''}`} />
                  <span className="text-[10px] mt-1 font-semibold">{i + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => handleWaterAdd(glassSize)}
              className="flex-1 btn-crimson flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              <span>+1 стакан (250 мл)</span>
            </button>
            <button
              onClick={() => handleWaterAdd(500)}
              className="px-4 py-2.5 rounded-full bg-[#FAF8F5] hover:bg-stone-200 border border-stone-300 text-stone-700 font-semibold text-xs transition-all"
            >
              +0.5 л
            </button>
            <button
              onClick={() => handleWaterAdd(-glassSize)}
              disabled={waterMl <= 0}
              className="p-2.5 rounded-full bg-[#FAF8F5] hover:bg-stone-200 border border-stone-300 text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Отнять стакан"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setWaterMl(0)}
              className="p-2.5 rounded-full bg-[#FAF8F5] hover:bg-stone-200 border border-stone-300 text-stone-600 transition-all"
              title="Сбросить на 0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: 20-20-20 Screen Rest Protocol */}
        <div className="academic-card bg-white space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
                <Timer className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900">Правило «20-20-20» для зрения</h3>
                <p className="text-xs text-stone-500 font-sans">Каждые 20 минут смотрите 20 секунд на 6 метров вдаль</p>
              </div>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
              timerMode === 'work' 
                ? 'bg-stone-100 text-stone-700 border-stone-300' 
                : 'bg-emerald-100 text-emerald-800 border-emerald-300 animate-pulse'
            }`}>
              {timerMode === 'work' ? 'УЧЕБА / ЭКРАН' : 'ОТДЫХ ГЛАЗ'}
            </span>
          </div>

          {/* Big Digital Timer Display */}
          <div className="text-center py-6 rounded-2xl bg-[#FAF8F5] border border-stone-200 relative overflow-hidden">
            <div className={`text-5xl sm:text-6xl font-serif font-bold tracking-wider ${
              timerMode === 'work' ? 'text-stone-900' : 'text-emerald-700 animate-pulse'
            }`}>
              {formatTimer(timerSeconds)}
            </div>
            <p className="text-xs text-stone-500 mt-2 font-sans">
              {timerMode === 'work' 
                ? 'До гимнастики для глаз осталось' 
                : 'Посмотрите в окно на горы или вдаль лицейского парка'}
            </p>

            {timerMode === 'rest' && (
              <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-2xl pointer-events-none" />
            )}
          </div>

          {/* Timer Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTimerActive(!isTimerActive)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-xs uppercase tracking-wider transition-all shadow-sm ${
                isTimerActive 
                  ? 'bg-amber-700 hover:bg-amber-800 text-white' 
                  : 'btn-crimson'
              }`}
            >
              {isTimerActive ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Пауза</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>{timerSeconds < 1200 ? 'Продолжить' : 'Запустить цикл (20 мин)'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsTimerActive(false);
                setTimerMode('work');
                setTimerSeconds(1200);
              }}
              className="p-3 rounded-full bg-[#FAF8F5] hover:bg-stone-200 border border-stone-300 text-stone-700 transition-all"
              title="Сбросить цикл на 20:00"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setTimerMode('rest');
                setTimerSeconds(20);
                setIsTimerActive(true);
              }}
              className="px-4 py-3 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold transition-all"
            >
              Тест 20 сек
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Mountain Hike & Expedition Checklist */}
      <div className="academic-card bg-white space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#7A1526]/10 border border-[#7A1526]/20 text-[#7A1526]">
              <Mountain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="font-serif font-bold text-xl text-stone-900">
                  Горная экспедиция: Заилийский Алатау & Кок-Тобе
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C5A059]/15 text-[#8C6D23] border border-[#C5A059]/30">
                  Высота: 2 400 м
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans mt-0.5">
                Официальный регламент снаряжения для экологических выездов и географических практикумов
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-sans">
            <div className="text-right">
              <span className="text-stone-500">Вес рюкзака: </span>
              <span className="font-serif font-bold text-stone-900 text-sm">{packedWeight.toFixed(1)} кг</span>
              <span className="text-stone-400"> / {totalWeight.toFixed(1)} кг</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-[#7A1526]/10 border border-[#7A1526]/20 text-[#7A1526] font-bold">
              {packedCount}/{gearList.length} ({gearProgress}%)
            </div>
          </div>
        </div>

        {/* Gear Progress Bar */}
        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
          <div 
            className="h-full bg-gradient-to-r from-[#7A1526] to-[#C5A059] rounded-full transition-all duration-300"
            style={{ width: `${gearProgress}%` }}
          />
        </div>

        {/* Interactive List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {gearList.map(item => (
            <div
              key={item.id}
              onClick={() => toggleGear(item.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start justify-between gap-3 ${
                item.packed 
                  ? 'bg-[#FAF8F5] border-stone-300 text-stone-900 shadow-sm' 
                  : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-[#FAF8F5]/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5">
                  {item.packed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-5 h-5 text-stone-400" />
                  )}
                </span>
                <div className="space-y-1">
                  <p className={`text-sm font-medium font-sans ${item.packed ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                    {language === 'kk' ? item.nameKk : item.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
                    <span>{item.weightKg} кг</span>
                    {item.isMandatory && (
                      <span className="text-[#7A1526] font-semibold">• Обязательно</span>
                    )}
                  </div>
                </div>
              </div>

              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase shrink-0 ${
                item.category === 'essentials' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                item.category === 'safety' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                item.category === 'clothes' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: School Sports Clubs & Extracurriculars */}
      <div className="academic-card bg-white space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#7A1526]/10 border border-[#7A1526]/20 text-[#7A1526]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900">Лицейские спортивные секции и клубы</h3>
              <p className="text-xs text-stone-500 font-sans">Электронная запись в секции, график тренировок и наставники</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-700">
            Сезон 2025–2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {clubs.map(club => (
            <div 
              key={club.id}
              className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-4 ${
                club.joined 
                  ? 'bg-[#FAF8F5] border-[#7A1526]/30 shadow-sm' 
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-[#7A1526] uppercase tracking-wider block">{club.category}</span>
                    <h4 className="font-serif font-bold text-stone-900 text-lg mt-0.5">{club.name}</h4>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                    club.spotsLeft > 2 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}>
                    {club.spotsLeft > 0 ? `Мест: ${club.spotsLeft}` : 'Мест нет'}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-stone-600 font-sans pt-1">
                  <p>👤 <span className="font-medium text-stone-800">{club.coach}</span></p>
                  <p>⏰ <span>{club.schedule}</span></p>
                  <p>📍 <span>{club.room}</span></p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                <span className="text-xs text-stone-500 font-sans">
                  2–3 тренировки в неделю
                </span>
                <button
                  onClick={() => toggleClubJoin(club.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    club.joined 
                      ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200' 
                      : 'btn-crimson'
                  }`}
                >
                  {club.joined ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Вы записаны (Отменить)</span>
                    </>
                  ) : (
                    <>
                      <span>Записаться</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
