import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GearItem } from '../../types';
import { dayHikeGear, campingGear } from '../../constants/gearChecklists';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  Heart, 
  Droplet, 
  Timer, 
  Backpack, 
  Leaf, 
  CheckSquare, 
  Square, 
  Plus, 
  RotateCcw, 
  Flame, 
  Award,
  Sparkles,
  Play,
  Pause,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const HealthEcoPage: React.FC = () => {
  const { t, language, addToast } = useApp();

  // Hydration state
  const [hydrationMl, setHydrationMl] = useState<number>(() => {
    const saved = localStorage.getItem('smart_school_hydration');
    return saved ? Number(saved) : 1250;
  });
  const dailyGoalMl = 2000;

  // Recess / 20-20-20 timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(20 * 60); // 20 minutes
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Gear checklist state
  const [selectedGearMode, setSelectedGearMode] = useState<'hike' | 'camping'>('hike');
  const [gearList, setGearList] = useState<GearItem[]>(() => {
    const saved = localStorage.getItem('smart_school_gear');
    return saved ? JSON.parse(saved) : dayHikeGear;
  });
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemWeight, setNewItemWeight] = useState<string>('200');

  // Eco challenge check states
  const [completedChallenges, setCompletedChallenges] = useState<Record<string, boolean>>({
    c1: true,
    c2: false,
    c3: true,
  });

  // Hydration effect
  const handleAddHydration = (amount: number) => {
    const updated = Math.min(3500, hydrationMl + amount);
    setHydrationMl(updated);
    localStorage.setItem('smart_school_hydration', updated.toString());
    if (updated >= dailyGoalMl && hydrationMl < dailyGoalMl) {
      try {
        confetti({ particleCount: 50, spread: 80, origin: { y: 0.7 } });
      } catch { /* noop */ }
      addToast(
        language === 'kk' ? 'Күндізгі су ішу межесі орындалды! 🎉' : 'Дневная норма воды выполнена! 🎉',
        language === 'kk' ? '2 000 мл таза су ішілді.' : 'Выпито 2 000 мл чистой воды.',
        'success'
      );
    }
  };

  const handleResetHydration = () => {
    setHydrationMl(0);
    localStorage.setItem('smart_school_hydration', '0');
  };

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      addToast(
        language === 'kk' ? '20-20-20 Ережесі: Көзді демалдыратын уақыт!' : 'Время разминки: Правило 20-20-20!',
        language === 'kk' ? '20 секунд алысқа қарап, көзіңізге демалыс беріңіз.' : 'Посмотрите вдаль на 6 метров в течение 20 секунд.',
        'info'
      );
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Gear toggle & calculations
  const handleToggleGear = (id: string) => {
    const updated = gearList.map(item => item.id === id ? { ...item, packed: !item.packed } : item);
    setGearList(updated);
    localStorage.setItem('smart_school_gear', JSON.stringify(updated));
  };

  const handleSwitchGearMode = (mode: 'hike' | 'camping') => {
    setSelectedGearMode(mode);
    const list = mode === 'hike' ? dayHikeGear : campingGear;
    setGearList(list);
    localStorage.setItem('smart_school_gear', JSON.stringify(list));
  };

  const handleAddCustomGear = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const item: GearItem = {
      id: `CUSTOM-${Date.now()}`,
      nameKk: newItemName.trim(),
      nameRu: newItemName.trim(),
      categoryKk: 'Жеке жабдық',
      categoryRu: 'Личное снаряжение',
      weightGrams: Number(newItemWeight) || 200,
      isEssential: false,
      packed: true,
    };
    const updated = [item, ...gearList];
    setGearList(updated);
    localStorage.setItem('smart_school_gear', JSON.stringify(updated));
    setNewItemName('');
    addToast(
      language === 'kk' ? 'Жаңа зат қосылды' : 'Предмет добавлен в рюкзак',
      item.nameKk,
      'success'
    );
  };

  const totalWeightGrams = gearList.reduce((acc, item) => acc + (item.packed ? item.weightGrams : 0), 0);
  const packedCount = gearList.filter(item => item.packed).length;
  const packedPercent = Math.round((packedCount / (gearList.length || 1)) * 100);
  const hydrationPercent = Math.min(100, Math.round((hydrationMl / dailyGoalMl) * 100));

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-2.5">
            <Heart className="w-7 h-7 text-emerald-400" />
            {t.healthEco.title}
          </h1>
          <Badge variant="emerald" size="sm">Wellbeing & Outdoor</Badge>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          {t.healthEco.subtitle}
        </p>
      </div>

      {/* Top 2 Tiles: Hydration Tracker + Recess 20-20-20 Timer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hydration Tracker */}
        <Card glow="cyan">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Droplet className="w-5 h-5" />
                </span>
                <div>
                  <CardTitle>{t.healthEco.hydrationTitle}</CardTitle>
                  <p className="text-xs text-slate-400">{t.healthEco.hydrationGoal}</p>
                </div>
              </div>
              <Badge variant="cyan" size="md">
                {hydrationPercent}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-bold font-mono text-cyan-400">
                  {hydrationMl}
                </span>
                <span className="text-sm font-mono text-slate-400 ml-1.5">/ {dailyGoalMl} мл</span>
              </div>
              <button
                onClick={handleResetHydration}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 font-mono"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.healthEco.resetHydration}</span>
              </button>
            </div>

            {/* Visual liquid meter */}
            <div className="w-full bg-dark-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 shadow-glow-cyan"
                style={{ width: `${hydrationPercent}%` }}
              />
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleAddHydration(250)}
                leftIcon={<Droplet className="w-3.5 h-3.5 text-cyan-400" />}
              >
                {t.healthEco.add250}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleAddHydration(500)}
                leftIcon={<Droplet className="w-3.5 h-3.5 text-white" />}
              >
                {t.healthEco.add500}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 20-20-20 Recess & Rest Timer */}
        <Card glow="blue">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Timer className="w-5 h-5" />
                </span>
                <div>
                  <CardTitle>{t.healthEco.recessTitle}</CardTitle>
                  <p className="text-xs text-slate-400">{t.healthEco.recessSub}</p>
                </div>
              </div>
              <Badge variant={isTimerRunning ? 'emerald' : 'slate'} size="md" hasDot={isTimerRunning}>
                {isTimerRunning ? 'АКТИВТІ' : 'КІДІРТІЛГЕН'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="text-center py-2">
              <span className="text-4xl font-mono font-bold text-slate-100 tracking-wider">
                {formatTimer(timerSeconds)}
              </span>
              <p className="text-xs text-slate-400 font-mono mt-1">
                {isTimerRunning ? 'Сабақ үстіндегі зейін уақыты' : 'Таймерді іске қосыңыз'}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-1">
              <Button
                variant={isTimerRunning ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => setIsTimerRunning(prev => !prev)}
                leftIcon={isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              >
                {isTimerRunning ? t.healthEco.pauseTimer : t.healthEco.startTimer}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(20 * 60);
                }}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                {t.healthEco.resetTimer}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Outdoor Adventure Gear Checklist */}
      <Card glow="emerald">
        <CardHeader className="flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Backpack className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-emerald-300">{t.healthEco.gearTitle}</CardTitle>
              <p className="text-xs text-slate-400">{t.healthEco.gearSub}</p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-dark-950 p-1 rounded-xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => handleSwitchGearMode('hike')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedGearMode === 'hike'
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🏔️ {t.healthEco.filterDayHike}
            </button>
            <button
              onClick={() => handleSwitchGearMode('camping')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedGearMode === 'camping'
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ⛺ {t.healthEco.filterCamping}
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          {/* Progress and Weight Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-dark-950 border border-slate-800">
            <div>
              <span className="text-xs text-slate-400 block">{t.healthEco.totalWeight}</span>
              <span className="text-2xl font-mono font-bold text-slate-100">
                {(totalWeightGrams / 1000).toFixed(2)} кг
              </span>
              <p className="text-[10px] text-emerald-400 font-mono">Норма: &lt; 8 кг</p>
            </div>

            <div>
              <span className="text-xs text-slate-400 block">{t.healthEco.packedProgress}</span>
              <span className="text-2xl font-mono font-bold text-emerald-400">
                {packedPercent}%
              </span>
              <p className="text-[10px] text-slate-400 font-mono">{packedCount} / {gearList.length} зат салынды</p>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-400 block">Қауіпсіздік ережесі</span>
              <span className="text-xs font-semibold text-slate-300 block mt-1">
                SOS 112 & Аптечка бар
              </span>
              <p className="text-[10px] text-slate-500 font-mono">Іле-Алатау Ұлттық паркі</p>
            </div>
          </div>

          {/* Add custom gear input form */}
          <form onSubmit={handleAddCustomGear} className="flex gap-2">
            <input
              type="text"
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
              placeholder={t.healthEco.addItemPlaceholder}
              className="flex-1 bg-dark-950 text-slate-100 placeholder-slate-500 border border-slate-700 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-500"
            />
            <input
              type="number"
              value={newItemWeight}
              onChange={e => setNewItemWeight(e.target.value)}
              placeholder="Салмағы (г)"
              className="w-24 bg-dark-950 text-slate-100 placeholder-slate-500 border border-slate-700 rounded-lg px-2.5 py-2 text-xs font-mono focus:outline-none focus:border-emerald-500"
            />
            <Button variant="emerald" size="sm" type="submit" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              {t.healthEco.addButton}
            </Button>
          </form>

          {/* Gear items list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {gearList.map(item => (
              <div
                key={item.id}
                onClick={() => handleToggleGear(item.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                  item.packed
                    ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm'
                    : 'bg-dark-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="mt-0.5 text-emerald-400">
                  {item.packed ? (
                    <CheckSquare className="w-5 h-5" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-xs font-semibold truncate ${item.packed ? 'text-slate-100' : 'text-slate-400'}`}>
                      {language === 'kk' ? item.nameKk : item.nameRu}
                    </p>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {item.weightGrams} г
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-500 font-mono">
                      {language === 'kk' ? item.categoryKk : item.categoryRu}
                    </span>
                    {item.isEssential && (
                      <Badge variant="rose" size="sm">МІНДЕТТІ</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Eco-Challenges for Students */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <CardTitle>{t.healthEco.ecoChallengesTitle}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-2">
          {[
            { id: 'c1', label: t.healthEco.challenge1, xp: '+150 XP' },
            { id: 'c2', label: t.healthEco.challenge2, xp: '+200 XP' },
            { id: 'c3', label: t.healthEco.challenge3, xp: '+100 XP' },
          ].map(ch => {
            const isDone = completedChallenges[ch.id];
            return (
              <div
                key={ch.id}
                onClick={() => setCompletedChallenges(prev => ({ ...prev, [ch.id]: !prev[ch.id] }))}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isDone 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' 
                    : 'bg-dark-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600 shrink-0" />
                  )}
                  <span className={`text-xs font-medium ${isDone ? 'line-through text-slate-400' : ''}`}>
                    {ch.label}
                  </span>
                </div>
                <Badge variant={isDone ? 'emerald' : 'slate'} size="sm">
                  {ch.xp}
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
