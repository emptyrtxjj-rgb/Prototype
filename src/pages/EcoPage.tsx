import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ecoService, EcoData } from '../services/ecoService';
import { 
  Leaf, 
  TreePine, 
  FileText, 
  Zap, 
  Droplet, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Building2, 
  Calendar 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  BarChart, 
  Bar 
} from 'recharts';
import gsap from 'gsap';
import { AcademicCrest } from '../components/common/AcademicCrest';

export const EcoPage: React.FC = () => {
  const { language } = useApp();
  const isKk = language === 'kk';

  const [ecoData, setEcoData] = useState<EcoData | null>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);

  const monthlySavings = [
    { month: isKk ? 'Қыркүйек' : 'Сентябрь', sheets: 240, trees: 0.6 },
    { month: isKk ? 'Қазан' : 'Октябрь', sheets: 310, trees: 0.8 },
    { month: isKk ? 'Қараша' : 'Ноябрь', sheets: 290, trees: 0.7 },
    { month: isKk ? 'Желтоқсан' : 'Декабрь', sheets: 360, trees: 0.9 },
  ];

  const classLeaderboard = [
    { rank: '01', name: '11 «А» (Біздің сынып)', sheets: '1 200 парақ', trees: 3, score: '100% Цифрлық' },
    { rank: '02', name: '10 «Б» Лицей', sheets: '1 050 парақ', trees: 2.6, score: '94% Цифрлық' },
    { rank: '03', name: '9 «В» Сынып', sheets: '920 парақ', trees: 2.3, score: '89% Цифрлық' },
    { rank: '04', name: '11 «Ә» Сынып', sheets: '880 парақ', trees: 2.1, score: '86% Цифрлық' },
  ];

  useEffect(() => {
    ecoService.getEcoData().then((data: EcoData) => {
      setEcoData(data);
      counterRefs.current.forEach(el => {
        if (!el) return;
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const suffix = el.getAttribute('data-suffix') || '';
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2.0,
          ease: 'power2.out',
          onUpdate: () => {
            el.innerText = Math.round(obj.val).toLocaleString() + suffix;
          }
        });
      });
    });
  }, []);

  return (
    <div className="space-y-8 pb-16 animate-academic-fade max-w-7xl mx-auto">
      {/* Top Academic Banner */}
      <div className="bg-white border border-stone-200 rounded-[24px] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-pixel text-[9px] text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              CAMPUS SUSTAINABILITY • GREEN MEKTEP KZ
            </span>
          </div>

          <h1 className="font-climate text-2xl sm:text-4xl text-[#1C1F23] tracking-wide uppercase">
            {isKk ? 'Эко-мониторинг & Қағазсыз Мектеп' : 'Эко-мониторинг и Безбумажная Школа'}
          </h1>

          <p className="text-stone-600 text-xs sm:text-sm font-serif leading-relaxed">
            {isKk
              ? 'Smart School KZ платформасына толық көшу нәтижесіндегі нақты үнем: электронды журнал, БЖБ/ТЖБ цифрлық тапсыру және лицейлік табиғи ресурстар аудиті.'
              : 'Реальный аудит сбережения ресурсов благодаря переходу на Smart School KZ: отказ от бумажных дневников, электронная сдача СОР/СОЧ и учет углеродного следа.'}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200 self-start md:self-auto">
          <AcademicCrest size={40} />
          <div className="text-left text-xs space-y-0.5 font-serif">
            <span className="font-bold text-stone-900 block">ISO 14001 Standards</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1 font-mono text-[10px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Верификацияланды
            </span>
          </div>
        </div>
      </div>

      {/* CLASS-LEVEL 11 «А» HERO METRIC (User Requirement: 1,200 sheets, 3 trees) */}
      <div className="academic-card bg-gradient-to-br from-white via-[#FAF8F5] to-emerald-50/40 border border-stone-200 p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200/80 pb-4">
          <div>
            <span className="font-pixel text-[9px] text-[#7A1526] uppercase block mb-1">
              {isKk ? '11 «А» СЫНЫБЫНЫҢ ЖЕКЕ ҮЛЕСІ' : 'ЛИЧНЫЙ ВКЛАД 11 «А» КЛАССА'}
            </span>
            <h2 className="font-climate text-xl sm:text-2xl text-[#1C1F23] uppercase">
              {isKk ? 'Нақты сыныптық эко-нәтиже' : 'Точные показатели нашего класса'}
            </h2>
          </div>
          <span className="font-pixel text-[8px] bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-full border border-emerald-300 self-start sm:self-center font-bold">
            {isKk ? 'МЕКТЕП БОЙЫНША 1-ОРЫН 🏆' : '1 МЕСТО В ШКОЛЕ 🏆'}
          </span>
        </div>

        {/* 4 Class Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-1">
              <span>{isKk ? 'ҚАҒАЗ ПАРАҒЫ' : 'ЛИСТОВ БУМАГИ'}</span>
              <FileText className="w-4 h-4 text-emerald-600" />
            </div>
            <span
              ref={el => { if (el) counterRefs.current[0] = el; }}
              data-target="1200"
              data-suffix=" шт"
              className="font-climate text-3xl sm:text-4xl text-emerald-900 block"
            >
              0 шт
            </span>
            <span className="text-[10px] font-serif text-stone-500 block mt-1">
              {isKk ? '11 «А» күнделіктері мен дәптерлері' : 'Дневники и тетради 11 «А»'}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-1">
              <span>{isKk ? 'САҚТАЛҒАН АҒАШ' : 'СПАСЕНО ДЕРЕВЬЕВ'}</span>
              <TreePine className="w-4 h-4 text-[#7A1526]" />
            </div>
            <span
              ref={el => { if (el) counterRefs.current[1] = el; }}
              data-target="3"
              data-suffix=" ағаш"
              className="font-climate text-3xl sm:text-4xl text-[#7A1526] block"
            >
              0 ағаш
            </span>
            <span className="text-[10px] font-serif text-stone-500 block mt-1">
              {isKk ? 'Жас қайың мен қарағай' : 'Хвойные и лиственные'}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-1">
              <span>{isKk ? 'СУ ҚОРЫ' : 'СБЕРЕЖЕНО ВОДЫ'}</span>
              <Droplet className="w-4 h-4 text-sky-600" />
            </div>
            <span
              ref={el => { if (el) counterRefs.current[2] = el; }}
              data-target="180"
              data-suffix=" L"
              className="font-climate text-3xl sm:text-4xl text-sky-800 block"
            >
              0 L
            </span>
            <span className="text-[10px] font-serif text-stone-500 block mt-1">
              {isKk ? 'Өндірістік су үнемі' : 'Чистая фильтрованная'}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-1">
              <span>{isKk ? 'CO₂ ҚЫСҚАРТУ' : 'СНИЖЕНИЕ CO₂'}</span>
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <span
              ref={el => { if (el) counterRefs.current[3] = el; }}
              data-target="14.2"
              data-suffix=" kg"
              className="font-climate text-3xl sm:text-4xl text-stone-800 block"
            >
              0 kg
            </span>
            <span className="text-[10px] font-serif text-stone-500 block mt-1">
              {isKk ? 'Углеродтық із азайды' : 'Углеродный след'}
            </span>
          </div>
        </div>
      </div>

      {/* Chart & Leaderboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Monthly Savings Chart */}
        <div className="lg:col-span-7 academic-card p-6 sm:p-8 space-y-4 bg-white border border-stone-200">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <span className="font-pixel text-[8px] text-[#7A1526] uppercase">
                {isKk ? 'АЙ САЙЫНҒЫ ДИНАМИКА' : 'ДИНАМИКА ПО МЕСЯЦАМ'}
              </span>
              <h3 className="font-climate text-lg text-[#1C1F23] uppercase">
                {isKk ? '11 «А» қағаз үнемдеу қарқыны' : 'Экономия бумаги 11 «А»'}
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
              +18% Өсім
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySavings}>
                <defs>
                  <linearGradient id="colorSheets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7A1526" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#7A1526" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'monospace' }} />
                <YAxis tick={{ fontSize: 11, fontFamily: 'monospace' }} />
                <Tooltip />
                <Area type="monotone" dataKey="sheets" stroke="#7A1526" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSheets)" name={isKk ? 'Парақтар' : 'Листы'} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* School Class Leaderboard */}
        <div className="lg:col-span-5 academic-card p-6 sm:p-8 space-y-4 bg-white border border-stone-200">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <span className="font-pixel text-[8px] text-emerald-800 uppercase">
                {isKk ? 'СЫНЫПТАР РЕЙТИНГІ' : 'РЕЙТИНГ КЛАССОВ'}
              </span>
              <h3 className="font-climate text-lg text-[#1C1F23] uppercase">
                {isKk ? 'Жасыл сынып лигасы' : 'Зеленая лига лицея'}
              </h3>
            </div>
            <Award className="w-5 h-5 text-[#C5A059]" />
          </div>

          <div className="space-y-3">
            {classLeaderboard.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  idx === 0
                    ? 'bg-[#7A1526]/10 border-[#7A1526]/30 text-[#7A1526]'
                    : 'bg-[#FAF8F5] border-stone-200 text-stone-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-climate text-base w-6">{item.rank}</span>
                  <div>
                    <h4 className="font-serif font-bold text-sm leading-snug">{item.name}</h4>
                    <span className="text-[10px] font-mono text-stone-500 block">{item.score}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-xs block">{item.sheets}</span>
                  <span className="text-[10px] font-mono text-emerald-700">{item.trees} {isKk ? 'ағаш' : 'дер.'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
