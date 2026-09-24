import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Sparkles, 
  Compass, 
  Leaf, 
  Code2, 
  CheckCircle2, 
  Globe2, 
  Award,
  ArrowRight,
  ExternalLink,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AcademicCrest } from '../components/common/AcademicCrest';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in pb-16 max-w-5xl mx-auto">
      {/* Top Academic Banner */}
      <div className="bg-white border border-stone-200 rounded-[24px] p-8 sm:p-12 shadow-sm relative overflow-hidden">
        {/* Subtle Watermark Crest */}
        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
          <AcademicCrest size="xl" variant="crimson" />
        </div>

        <div className="space-y-4 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A1526]/10 border border-[#7A1526]/20 text-[#7A1526] text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Digital Academic Heritage & Innovation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            Smart School KZ (Mektep Hub)
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
            Единая цифровая экосистема современного лицея, разработанная в эстетике престижных мировых академических университетов. Портал объединяет интерактивную 3D-навигацию по кампусу, адаптивное расписание с соблюдением санитарных норм РК, интеллектуального академического наставника и комплексный аудит экологического следа школы.
          </p>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <div className="space-y-6">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7A1526] block">
            Архитектурные основы
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Технологический фундамент университетского класса
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="academic-card bg-white space-y-3">
            <div className="p-3 rounded-xl bg-[#7A1526]/10 text-[#7A1526] border border-[#7A1526]/20 w-fit">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Frontend Engine</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              React 19 + TypeScript, Vite 6, Tailwind CSS. Мгновенная загрузка (First Contentful Paint &lt; 0.6s), компонентная архитектура и полная доступность для настольных ПК и мобильных терминалов лицея.
            </p>
          </div>

          <div className="academic-card bg-white space-y-3">
            <div className="p-3 rounded-xl bg-[#C5A059]/15 text-[#8C6D23] border border-[#C5A059]/30 w-fit">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Three.js WebGL 3D</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Процедурный рендеринг школьного корпуса в реальном времени. Интерактивные этажи 1–4, трассировка лучей (Raycaster) для выбора кабинетов, расчет кратчайших путей с визуализацией светящихся маршрутных линий.
            </p>
          </div>

          <div className="academic-card bg-white space-y-3">
            <div className="p-3 rounded-xl bg-stone-100 text-stone-800 border border-stone-300 w-fit">
              <Sparkles className="w-6 h-6 text-[#7A1526]" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">AI Solver & Mentorship</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Эвристический планировщик расписания с защитой от противоречивых условий (Edge Cases). Академический AI наставник для проверки эссе по международным стандартам с поуровневой шкалой баллов.
            </p>
          </div>
        </div>
      </div>

      {/* Compliance & Standards */}
      <div className="academic-card bg-white space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <span className="text-xs font-semibold text-[#7A1526] uppercase tracking-wider block">
            Нормативное соответствие
          </span>
          <h3 className="font-serif font-bold text-2xl text-stone-900 mt-1 flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#7A1526]" />
            <span>Государственные стандарты Республики Казахстан</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs text-stone-700 font-sans">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>СанПиН РК № ҚР ДСМ-76</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Алгоритм AI-расписания строго соблюдает шкалу трудности предметов по Сивкову, чередуя сложные дисциплины (алгебра, физика, химия) с активными (физкультура, искусство).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>eGov Mobile & Digital ID</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Архитектура адаптирована к интеграции с государственными цифровыми документами ученика и родителей через защищенный шлюз Smart Bridge РК.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Экологическая программа «Жасыл Мектеп»</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Оцифровка справок и заявлений позволяет лицею экономить свыше 1.2 тонн бумаги ежегодно, сохраняя 37 взрослых деревьев в парках Казахстана.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Единая горячая линия 111 «Аманат»</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Интеграция экстренной связи в один клик для доступа к национальному телефону доверия по защите прав ребенка и кризисной психологической помощи.
            </p>
          </div>
        </div>
      </div>

      {/* CTA to Demo */}
      <div className="rounded-[24px] bg-[#7A1526] text-white p-8 sm:p-10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 pointer-events-none transform skew-x-12" />
        <div className="space-y-2 relative z-10 max-w-xl">
          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
            Оцените работу платформы в действии
          </h3>
          <p className="text-xs sm:text-sm text-stone-200 font-sans leading-relaxed">
            Перейдите в тестовую панель жюри и запустите сквозное автоматизированное тестирование всех модулей платформы.
          </p>
        </div>
        <Link
          to="/demo"
          className="btn-white py-3 px-7 text-xs font-semibold uppercase tracking-wider relative z-10 shrink-0 inline-flex items-center gap-2"
        >
          <span>Панель жюри (Тест-стенд)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
