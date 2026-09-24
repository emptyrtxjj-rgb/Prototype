import React, { useEffect, useRef, useState } from 'react';
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
  const [ecoData, setEcoData] = useState<EcoData | null>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    ecoService.getEcoData().then((data: EcoData) => {
      setEcoData(data);
      // Run GSAP counters
      counterRefs.current.forEach(el => {
        if (!el) return;
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const suffix = el.getAttribute('data-suffix') || '';
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => {
            el.innerText = Math.round(obj.val).toLocaleString() + suffix;
          }
        });
      });
    });
  }, []);

  return (
    <div className="space-y-10 pb-16 animate-fade-in max-w-7xl mx-auto">
      {/* Top Academic Header Banner */}
      <div className="bg-white border border-stone-200 rounded-[24px] p-8 sm:p-10 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A1526]/10 border border-[#7A1526]/20 text-[#7A1526] text-xs font-semibold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5" />
            <span>Campus Sustainability & Eco-Monitor KZ</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Экологический аудит и Зеленый кампус
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
            Переход школы на цифровой документооборот (eGov Mektep): непрерывный мониторинг сбережения природных ресурсов, углеродной нейтральности и энергоэффективности лицейского кампуса.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-4 bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200 shadow-inner">
          <AcademicCrest size="md" variant="crimson" />
          <div className="text-left text-xs font-sans space-y-1">
            <span className="font-serif font-bold text-stone-900 text-sm block">ISO 14001 Standards</span>
            <span className="text-stone-500 block">Сертифицированный эко-лицей</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Верифицировано
            </span>
          </div>
        </div>
      </div>

      {/* HERO METRIC DISPLAY - Academic Forest & Gold styling */}
      <div className="academic-card bg-gradient-to-br from-white via-[#FAF8F5] to-emerald-50/40 border border-stone-200 p-8 sm:p-12 relative overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute -right-8 -bottom-8 pointer-events-none opacity-5">
          <AcademicCrest size="xl" variant="crimson" />
        </div>

        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            Ключевой показатель сохраненных ресурсов
          </div>

          <div className="flex items-baseline gap-4 flex-wrap">
            <span
              ref={el => { if (el) counterRefs.current[0] = el; }}
              data-target="1284"
              data-suffix=" kg"
              className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold text-emerald-900 tracking-tight"
            >
              0 kg
            </span>
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-serif font-bold text-stone-800 block">
                сэкономленной бумажной массы
              </span>
              <span className="text-xs text-stone-500 font-sans block">
                Эквивалент 320 пачек офисной бумаги А4 премиум-класса
              </span>
            </div>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed font-sans max-w-2xl">
            Благодаря полному переходу на электронные дневники, цифровые справки с QR-верификацией, онлайн-заявления и личные портфолио в лицее сбережено более 1.2 тонн чистой древесины за текущий академический год.
          </p>
        </div>

        {/* Paper to Digital Animated Flow Widget */}
        <div className="mt-10 pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-5 font-sans relative z-10">
          <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm space-y-1.5">
            <span className="text-stone-400 font-semibold block text-[11px] uppercase tracking-wider">1. Традиционный процесс</span>
            <span className="text-rose-700 font-serif font-bold text-base block">4–6 листов / справка</span>
            <span className="text-xs text-stone-500 block">Печать, живые подписи, физический архив</span>
          </div>

          <div className="p-4 rounded-xl bg-[#7A1526]/5 border border-[#7A1526]/20 shadow-sm space-y-1.5">
            <span className="text-[#7A1526] font-semibold block text-[11px] uppercase tracking-wider">2. Цифровой стандарт Mektep</span>
            <span className="text-[#7A1526] font-serif font-bold text-base block">0 листов • QR eGov</span>
            <span className="text-xs text-stone-600 block">Мгновенная выдача и валидация через смартфон</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm space-y-1.5">
            <span className="text-emerald-800 font-semibold block text-[11px] uppercase tracking-wider">3. Экологический вклад</span>
            <span className="text-emerald-900 font-serif font-bold text-base block">100% Zero-Waste</span>
            <span className="text-xs text-emerald-700 block">Устойчивое развитие и нулевой углеродный след</span>
          </div>
        </div>
      </div>

      {/* METRIC TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="academic-card bg-white space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <span>Электронные справки</span>
            <div className="w-8 h-8 rounded-lg bg-[#7A1526]/10 text-[#7A1526] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <span
            ref={el => { if (el) counterRefs.current[1] = el; }}
            data-target="42800"
            className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 block"
          >
            0
          </span>
          <p className="text-xs text-stone-500 leading-normal font-sans">
            цифровых документов и справок сформировано без использования бумаги
          </p>
        </div>

        <div className="academic-card bg-white space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <span>Сбереженные листы</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <span
            ref={el => { if (el) counterRefs.current[2] = el; }}
            data-target="12450"
            className="text-3xl sm:text-4xl font-serif font-bold text-emerald-800 block"
          >
            0
          </span>
          <p className="text-xs text-stone-500 leading-normal font-sans">
            страниц типографской бумаги сохранено от уничтожения и утилизации
          </p>
        </div>

        <div className="academic-card bg-white space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-800 uppercase tracking-wider">
            <span>Спасенные деревья</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <TreePine className="w-4 h-4" />
            </div>
          </div>
          <span
            ref={el => { if (el) counterRefs.current[3] = el; }}
            data-target="37"
            className="text-3xl sm:text-4xl font-serif font-bold text-amber-900 block"
          >
            0
          </span>
          <p className="text-xs text-stone-500 leading-normal font-sans">
            взрослых лесных деревьев спасено за счет цифровой инфраструктуры
          </p>
        </div>
      </div>

      {/* MONTHLY IMPACT PROGRESS & CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Trend Stats (4 cols) */}
        <div className="lg:col-span-4 academic-card bg-white space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs font-semibold text-[#7A1526] uppercase tracking-wider block">
              Академическая динамика
            </span>
            <h3 className="font-serif font-bold text-xl text-stone-900 mt-1">
              Эко-прогресс за семестр
            </h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900 font-sans">Сбережение бумаги</p>
                <p className="text-xs text-stone-500">Отказ от распечаток</p>
              </div>
              <span className="text-base font-serif font-bold text-emerald-700">+18%</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900 font-sans">Электронные справки</p>
                <p className="text-xs text-stone-500">Автоматизация eGov</p>
              </div>
              <span className="text-base font-serif font-bold text-[#7A1526]">+24%</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900 font-sans">Энергоэффективность</p>
                <p className="text-xs text-stone-500">Smart LED освещение</p>
              </div>
              <span className="text-base font-serif font-bold text-amber-700">+11%</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-700" />
              <span>Зеленый флаг ЮНЕСКО</span>
            </div>
            <p className="text-stone-600 font-sans">
              Школа номинирована на почетный сертификат экологического лидерства образовательных учреждений.
            </p>
          </div>
        </div>

        {/* Recharts Monthly Chart (8 cols) */}
        <div className="lg:col-span-8 academic-card bg-white space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/60 text-emerald-800 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Динамика сэкономленной бумаги (кг / месяц)
                </h3>
                <p className="text-xs text-stone-500">Статистика по месяцам за 2025–2026 учебный год</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
              Учебный семестр 2026
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            {ecoData && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ecoData.chartData}>
                  <defs>
                    <linearGradient id="colorPaperAcademic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2D7D46" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#2D7D46" stopOpacity={0.02}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#78716C" 
                    fontSize={12} 
                    fontFamily="Inter, sans-serif" 
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#78716C" 
                    fontSize={12} 
                    fontFamily="Inter, sans-serif" 
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E7E5E4',
                      borderRadius: '12px',
                      color: '#1C1917',
                      fontSize: '12px',
                      fontFamily: 'Inter, sans-serif',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="paperSaved"
                    name="Сэкономлено бумаги (кг)"
                    stroke="#2D7D46"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorPaperAcademic)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
