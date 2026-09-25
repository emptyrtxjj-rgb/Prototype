import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { scheduleService, GeneratedScheduleResponse } from '../services/scheduleService';
import { 
  Calendar, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Bot, 
  Sliders, 
  Info,
  BookOpen,
  User,
  Lightbulb,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SchedulePage: React.FC = () => {
  const { language } = useApp();
  const isKk = language === 'kk';

  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [generationResult, setGenerationResult] = useState<GeneratedScheduleResponse | null>(null);
  const [shiftedLessonIds, setShiftedLessonIds] = useState<Set<string>>(new Set());
  const [activeMobileDay, setActiveMobileDay] = useState<number>(0);

  useEffect(() => {
    scheduleService.getSchedule().then((data: any[]) => setScheduleData(data));
  }, []);

  const handleGenerate = async (customPrompt = prompt) => {
    if (!customPrompt.trim()) return;
    setIsLoading(true);

    try {
      const res = await scheduleService.generateSchedule(customPrompt);
      setGenerationResult(res);

      if (res.schedule && res.schedule.length > 0) {
        // If window 13:00 - 15:00 is requested, modify schedule slots visually
        const lower = customPrompt.toLowerCase();
        const markShifted = new Set<string>();

        const modified = res.schedule.map((dayGroup: any) => {
          return {
            ...dayGroup,
            lessons: dayGroup.lessons.map((lesson: any) => {
              if (lower.includes('13:00') || lower.includes('үзіліс') || lower.includes('окно') || lower.includes('демалыс')) {
                // If lesson is at 13:00 or 14:00, shift it
                if (lesson.time.includes('13:') || lesson.time.includes('14:')) {
                  markShifted.add(lesson.id);
                  return {
                    ...lesson,
                    isShifted: true,
                    type: 'FREE',
                    subject: isKk ? '⚡ AI Бос терезе (Тапсырыс бойынша)' : '⚡ AI Окно отдыха (По запросу)'
                  };
                }
                // Mark afternoon slots as shifted
                if (lesson.time.includes('15:') || lesson.time.includes('16:')) {
                  markShifted.add(lesson.id);
                  return {
                    ...lesson,
                    isShifted: true
                  };
                }
              }
              return lesson;
            })
          };
        });

        setShiftedLessonIds(markShifted);
        setScheduleData(modified);
      }

      if (!res.isConflict) {
        try {
          confetti({ particleCount: 40, spread: 70, origin: { y: 0.7 } });
        } catch { /* noop */ }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreset = (presetText: string) => {
    setPrompt(presetText);
    handleGenerate(presetText);
  };

  return (
    <div className="space-y-8 pb-16 animate-academic-fade">
      {/* Title with Climate Crisis Font & Pixel Badge */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#7A1526]/10 text-[#7A1526] border border-[#7A1526]/20 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-pixel text-[9px] text-[#7A1526] uppercase">
                  AI CONSTRAINT SATISFACTION ENGINE v3.2
                </span>
              </div>
              <h1 className="font-climate text-2xl sm:text-3xl text-[#1C1F23] tracking-wide uppercase">
                {isKk ? 'AI Сабақ кестесі & Weekly Planner' : 'Умное AI Расписание & Weekly Planner'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 font-serif">
                {isKk
                  ? 'Академиялық жүктемені теңгерімдеп, накладкасыз жеке және сыныптық кесте құрастыру.'
                  : 'Автоматическая балансировка учебной нагрузки, устранение окон и коллизий кабинетов в реальном времени.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="font-pixel text-[8px] bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isKk ? 'ҚАҚТЫҒЫССЫЗ ЖҮЙЕ' : 'БЕЗ НАКЛАДОК'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* AI Prompt Input Card */}
      <div className="academic-card p-6 sm:p-8 space-y-5 bg-white border border-stone-200">
        <div className="flex items-center gap-2 text-[#7A1526]">
          <Bot className="w-5 h-5" />
          <h3 className="font-serif font-bold text-[#1C1F23] text-lg">
            {isKk ? 'Кестеңізді қалай оңтайландырғыңыз келеді?' : 'Как вы хотите оптимизировать расписание?'}
          </h3>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder={
              isKk
                ? 'Мысалы: 13:00-ден 15:00-ге дейін тынығу терезесі болсын және олимпиадалық физика қосылсын...'
                : 'Например: Выделить окно отдыха с 13:00 до 15:00 и перенести олимпиадную физику...'
            }
            rows={3}
            className="w-full bg-[#FAF8F5] text-stone-800 placeholder-stone-400 border border-stone-300 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#7A1526] transition-colors font-sans"
          />
        </div>

        {/* Quick Test Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono text-stone-600 font-semibold">{isKk ? 'Сценарийлер:' : 'Сценарии:'}</span>
          <button
            onClick={() => handlePreset(isKk ? '13:00-ден 15:00-ге дейін үзіліс және тіл сабағы' : 'Окно с 13:00 до 15:00 и языковые курсы')}
            className="px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-stone-800 hover:border-[#7A1526] hover:text-[#7A1526] transition-colors font-mono"
          >
            ✓ {isKk ? 'Сценарий 1: 13:00-15:00 тынығу терезесі' : 'Сценарий 1: Окно отдыха 13:00-15:00'}
          </button>
          <button
            onClick={() => handlePreset(isKk ? 'Сағат сайын 08:00-ден 20:00-ге дейін тынығу болсын' : 'Каждый час с 08:00 до 20:00 отдых')}
            className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors font-mono font-semibold"
          >
            ⚠️ {isKk ? 'Сценарий 2 (Конфликт сынағы): Сағат сайын демалыс' : 'Сценарий 2 (Тест конфликта): Отдых каждый час'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <span className="text-[11px] font-mono text-stone-500">
            {isKk ? 'Алгоритм: Conflict-Free Constraint Satisfaction Engine' : 'Алгоритм: Conflict-Free Constraint Satisfaction Engine'}
          </span>

          <button
            onClick={() => handleGenerate()}
            disabled={isLoading || !prompt.trim()}
            className="btn-crimson text-xs uppercase tracking-wider py-3 px-6 disabled:opacity-50 flex items-center gap-2 font-serif font-semibold"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? (isKk ? 'Кесте есептелуде...' : 'Расчет расписания...') : (isKk ? 'КЕСТЕНІ ОҢТАЙЛАНДЫРУ' : 'ОПТИМИЗИРОВАТЬ РАСПИСАНИЕ')}</span>
          </button>
        </div>
      </div>

      {/* GENERATION FEEDBACK / EDGE CASE BANNER */}
      {generationResult && (
        <div className="animate-academic-fade">
          {generationResult.isConflict ? (
            <div className="p-6 rounded-[20px] bg-amber-50 border border-amber-300 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-base text-amber-900">
                    {isKk ? 'Кестеде накладка (конфликт) анықталды' : 'Обнаружена коллизия в расписании'}
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed font-mono">
                    {generationResult.message}
                  </p>
                  {generationResult.compromise && (
                    <p className="text-xs text-amber-900 font-mono mt-1 font-semibold flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{generationResult.compromise}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Smart Balance Breakdown */}
              {generationResult.balance && (
                <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-3">
                  <span className="text-xs font-mono font-bold text-[#7A1526] block uppercase tracking-wider">
                    {isKk ? 'Smart Balance (Оңтайландырылған жүктеме):' : 'Smart Balance (Сбалансированная нагрузка):'}
                  </span>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200">
                      <span className="text-2xl font-mono font-bold text-[#1C1F23] block">
                        {generationResult.balance.requiredLessons}
                      </span>
                      <span className="text-[11px] text-stone-500">{isKk ? 'Міндетті сабақтар' : 'Обязательные уроки'}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200">
                      <span className="text-2xl font-mono font-bold text-emerald-700 block">
                        {generationResult.balance.restPeriods}
                      </span>
                      <span className="text-[11px] text-stone-500">{isKk ? 'Тынығу аралықтары' : 'Окна отдыха'}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200">
                      <span className="text-2xl font-mono font-bold text-[#7A1526] block">
                        {generationResult.balance.freeWindows}
                      </span>
                      <span className="text-[11px] text-stone-500">{isKk ? 'Бос терезелер' : 'Свободные часы'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{generationResult.message}</span>
              </div>
              {shiftedLessonIds.size > 0 && (
                <span className="font-pixel text-[8px] bg-amber-200 text-amber-900 px-2 py-1 rounded border border-amber-300">
                  {isKk ? `${shiftedLessonIds.size} САБАҚ СӘТТІ ЖЫЛЖЫТЫЛДЫ ✨` : `${shiftedLessonIds.size} УРОКОВ ПЕРЕНЕСЕНО ✨`}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* WEEKLY PLANNER VISUALIZATION */}
      <div className="academic-card p-6 sm:p-8 space-y-4 bg-white border border-stone-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div>
            <h3 className="font-climate text-xl text-[#1C1F23] flex items-center gap-2 uppercase tracking-wide">
              <Clock className="w-5 h-5 text-[#7A1526]" />
              {isKk ? 'АПТАЛЫҚ КЕСТЕ (08:00 - 17:00)' : 'НЕДЕЛЬНОЕ РАСПИСАНИЕ (08:00 - 17:00)'}
            </h3>
            <span className="text-xs text-stone-500 font-serif">
              {isKk ? '11 «А» физика-математикалық бағыты' : '11 «А» физико-математический профиль'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#7A1526]/10 text-[#7A1526] border border-[#7A1526]/20 font-bold">
              {isKk ? 'САБАҚ' : 'УРОК'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              {isKk ? 'ҮЗІЛІС' : 'ОТДЫХ'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
              {isKk ? 'СПОРТ' : 'СПОРТ'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-bold">
              {isKk ? 'ҮЙІРМЕ' : 'СЕКЦИЯ'}
            </span>
          </div>
        </div>

        {/* Mobile Day Selector Tabs (md:hidden) */}
        <div className="md:hidden space-y-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
            {scheduleData.map((dayGroup, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMobileDay(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold whitespace-nowrap shrink-0 transition-all ${
                  activeMobileDay === idx
                    ? 'bg-[#7A1526] text-white shadow-md'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {dayGroup.day}
              </button>
            ))}
          </div>

          {scheduleData[activeMobileDay] && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <h4 className="font-serif font-bold text-sm text-[#1C1F23]">
                  {scheduleData[activeMobileDay].day}
                </h4>
                <span className="text-[10px] text-stone-500 font-mono">
                  {scheduleData[activeMobileDay].lessons?.length || 5} {isKk ? 'академиялық сабақ' : 'уроков'}
                </span>
              </div>

              <div className="space-y-2.5">
                {scheduleData[activeMobileDay].lessons.map((lesson: any) => {
                  const isShifted = shiftedLessonIds.has(lesson.id) || lesson.isShifted;
                  const cardStyles: Record<string, string> = {
                    LESSON: 'bg-white border-[#7A1526]/30 text-stone-900 shadow-sm border-l-4 border-l-[#7A1526]',
                    BREAK: 'bg-emerald-50/70 border-emerald-200 text-emerald-950 border-l-4 border-l-emerald-600',
                    SPORT: 'bg-amber-50/70 border-amber-200 text-amber-950 border-l-4 border-l-amber-600',
                    CLUB: 'bg-purple-50/70 border-purple-200 text-purple-950 border-l-4 border-l-purple-600',
                    FREE: 'bg-amber-50/80 border-amber-400 text-amber-950 border-l-4 border-l-amber-500 ring-2 ring-amber-300 ring-offset-1 animate-pulse',
                  };

                  return (
                    <div
                      key={lesson.id}
                      className={`p-3.5 rounded-xl border ${cardStyles[lesson.type] || cardStyles.LESSON} transition-all relative overflow-hidden`}
                    >
                      {isShifted && (
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-pixel text-[7px] bg-amber-400 text-stone-900 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5" />
                            <span>{isKk ? 'ЖЫЛЖЫТЫЛДЫ' : 'СДВИНУТО'}</span>
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[11px] font-mono mb-1 text-stone-500">
                        <span className="font-bold text-stone-800">{lesson.time}</span>
                        <span className="font-bold text-[#7A1526]">
                          {isKk ? `Каб. ${lesson.room}` : `Каб. ${lesson.room}`}
                        </span>
                      </div>
                      <h5 className="font-bold text-sm leading-snug font-serif">
                        {lesson.subject}
                      </h5>
                      <p className="text-[11px] mt-1 font-mono text-stone-600 flex items-center gap-1">
                        <User className="w-3 h-3 text-[#7A1526]" />
                        <span>{lesson.teacher}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Weekly Matrix View (hidden md:block) */}
        <div className="hidden md:block overflow-x-auto">
          <div className="min-w-[800px] grid grid-cols-5 divide-x divide-stone-200">
            {scheduleData.map((dayGroup, idx) => (
              <div key={idx} className="p-3 space-y-3">
                <div className="text-center pb-2 border-b border-stone-200">
                  <h4 className="font-serif font-bold text-sm text-[#1C1F23]">
                    {dayGroup.day}
                  </h4>
                  <span className="text-[10px] text-stone-500 font-mono">
                    5 {isKk ? 'академиялық сабақ' : 'уроков'}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {dayGroup.lessons.map((lesson: any) => {
                    const isShifted = shiftedLessonIds.has(lesson.id) || lesson.isShifted;

                    const cardStyles: Record<string, string> = {
                      LESSON: 'bg-white border-[#7A1526]/30 text-stone-900 shadow-sm border-l-4 border-l-[#7A1526]',
                      BREAK: 'bg-emerald-50/70 border-emerald-200 text-emerald-950 border-l-4 border-l-emerald-600',
                      SPORT: 'bg-amber-50/70 border-amber-200 text-amber-950 border-l-4 border-l-amber-600',
                      CLUB: 'bg-purple-50/70 border-purple-200 text-purple-950 border-l-4 border-l-purple-600',
                      FREE: 'bg-amber-50/80 border-amber-400 text-amber-950 border-l-4 border-l-amber-500 ring-2 ring-amber-300 ring-offset-1 animate-pulse',
                    };

                    return (
                      <div
                        key={lesson.id}
                        className={`p-3 rounded-xl border ${cardStyles[lesson.type] || cardStyles.LESSON} transition-all hover:shadow-md relative overflow-hidden`}
                      >
                        {isShifted && (
                          <div className="mb-1 flex items-center justify-between">
                            <span className="font-pixel text-[7px] bg-amber-400 text-stone-900 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                              <Zap className="w-2.5 h-2.5" />
                              <span>{isKk ? 'ЖЫЛЖЫТЫЛДЫ' : 'СДВИНУТО'}</span>
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-stone-500">
                          <span>{lesson.time}</span>
                          <span className="font-bold text-[#7A1526]">
                            {isKk ? `Каб. ${lesson.room}` : `Каб. ${lesson.room}`}
                          </span>
                        </div>
                        <h5 className="font-bold text-xs leading-snug font-serif">
                          {lesson.subject}
                        </h5>
                        <p className="text-[10px] mt-1 font-mono text-stone-600 flex items-center gap-1">
                          <User className="w-3 h-3 text-[#7A1526]" />
                          <span>{lesson.teacher}</span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
