import React, { useState, useEffect } from 'react';
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
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SchedulePage: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [generationResult, setGenerationResult] = useState<GeneratedScheduleResponse | null>(null);

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
        setScheduleData(res.schedule);
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
      {/* Title */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#7A1526]/10 text-[#7A1526] border border-[#7A1526]/20 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1F23]">
              Апталық сабақ кестесі & AI Генератор
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              Smart Schedule AI: академиялық жүктемені теңгерімдеп, накладкасыз жеке кесте құрастыру.
            </p>
          </div>
        </div>
      </div>

      {/* AI Prompt Input Card */}
      <div className="academic-card p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2 text-[#7A1526]">
          <Bot className="w-5 h-5" />
          <h3 className="font-serif font-bold text-[#1C1F23] text-lg">
            Кестеңізді қалай құрастырғыңыз келетінін жазыңыз:
          </h3>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Мысалы: 13:00-ден 15:00-ге дейін тынығу уақыты болсын және аптасына екі рет орыс тілі қосылсын..."
            rows={3}
            className="w-full bg-[#FAF8F5] text-stone-800 placeholder-stone-400 border border-stone-300 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#7A1526] transition-colors"
          />
        </div>

        {/* Quick Test Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono text-stone-600 font-semibold">Сценарийлер:</span>
          <button
            onClick={() => handlePreset('13:00-ден 15:00-ге дейін үзіліс және аптасына екі рет тіл сабағы.')}
            className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:border-[#7A1526] hover:text-[#7A1526] transition-colors font-mono"
          >
            ✓ Тест 2: 13:00-15:00 терезесі + Тіл сабақтары
          </button>
          <button
            onClick={() => handlePreset('Сағат сайын 08:00-ден 20:00-ге дейін тынығу болсын.')}
            className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 transition-colors font-mono font-semibold"
          >
            ⚠️ Тест 3 (Конфликт тесті): Сағат сайын демалыс
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <span className="text-[11px] font-mono text-stone-500">
            Движок: Conflict-Free Constraint Satisfaction Engine
          </span>

          <button
            onClick={() => handleGenerate()}
            disabled={isLoading || !prompt.trim()}
            className="btn-crimson text-xs uppercase tracking-wider py-3 px-6 disabled:opacity-50 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'Кесте талдануда...' : 'КЕСТЕНІ ГЕНЕРАЦИЯЛАУ'}</span>
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
                    Кестеде накладка (конфликт) анықталды
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed font-mono">
                    {generationResult.message}
                  </p>
                  {generationResult.compromise && (
                    <p className="text-xs text-amber-900 font-mono mt-1 font-semibold">
                      💡 {generationResult.compromise}
                    </p>
                  )}
                </div>
              </div>

              {/* Smart Balance Breakdown */}
              {generationResult.balance && (
                <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-3">
                  <span className="text-xs font-mono font-bold text-[#7A1526] block uppercase tracking-wider">
                    Smart Balance (Оңтайландырылған кесте):
                  </span>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200">
                      <span className="text-2xl font-mono font-bold text-[#1C1F23] block">
                        {generationResult.balance.requiredLessons}
                      </span>
                      <span className="text-[11px] text-stone-500">Міндетті сабақтар</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200">
                      <span className="text-2xl font-mono font-bold text-emerald-700 block">
                        {generationResult.balance.restPeriods}
                      </span>
                      <span className="text-[11px] text-stone-500">Тынығу аралықтары</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200">
                      <span className="text-2xl font-mono font-bold text-[#7A1526] block">
                        {generationResult.balance.freeWindows}
                      </span>
                      <span className="text-[11px] text-stone-500">Бос терезелер</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{generationResult.message}</span>
            </div>
          )}
        </div>
      )}

      {/* WEEKLY PLANNER VISUALIZATION */}
      <div className="academic-card p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <h3 className="font-serif font-bold text-[#1C1F23] text-lg flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#7A1526]" />
            Интерактивті Weekly Planner (08:00 - 17:00)
          </h3>

          <div className="flex items-center gap-2 text-[10px] font-mono flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#7A1526]/10 text-[#7A1526] border border-[#7A1526]/20 font-bold">LESSON</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">BREAK</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">SPORT</span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-bold">CLUB</span>
            <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-bold">FREE</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px] grid grid-cols-5 divide-x divide-stone-200">
            {scheduleData.map((dayGroup, idx) => (
              <div key={idx} className="p-3 space-y-3">
                <div className="text-center pb-2 border-b border-stone-200">
                  <h4 className="font-serif font-bold text-sm text-[#1C1F23]">
                    {dayGroup.day}
                  </h4>
                  <span className="text-[10px] text-stone-500 font-mono">5 академиялық слот</span>
                </div>

                <div className="space-y-2.5">
                  {dayGroup.lessons.map((lesson: any) => {
                    const cardStyles: Record<string, string> = {
                      LESSON: 'bg-white border-[#7A1526]/30 text-stone-900 shadow-sm border-l-4 border-l-[#7A1526]',
                      BREAK: 'bg-emerald-50/70 border-emerald-200 text-emerald-950 border-l-4 border-l-emerald-600',
                      SPORT: 'bg-amber-50/70 border-amber-200 text-amber-950 border-l-4 border-l-amber-600',
                      CLUB: 'bg-purple-50/70 border-purple-200 text-purple-950 border-l-4 border-l-purple-600',
                      FREE: 'bg-sky-50/70 border-sky-200 text-sky-950 border-l-4 border-l-sky-600',
                    };

                    return (
                      <div
                        key={lesson.id}
                        className={`p-3 rounded-xl border ${cardStyles[lesson.type] || cardStyles.LESSON} transition-all hover:shadow-md`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-stone-500">
                          <span>{lesson.time}</span>
                          <span className="font-bold text-[#7A1526]">Каб. {lesson.room}</span>
                        </div>
                        <h5 className="font-bold text-xs leading-snug">
                          {lesson.subject}
                        </h5>
                        <p className="text-[10px] mt-1 font-mono text-stone-600">
                          👤 {lesson.teacher}
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
