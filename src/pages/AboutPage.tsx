import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Sparkles, 
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
import { useApp } from '../context/AppContext';
import { AcademicCrest } from '../components/common/AcademicCrest';

export const AboutPage: React.FC = () => {
  const { language } = useApp();
  const isKk = language === 'kk';

  return (
    <div className="space-y-12 animate-academic-fade pb-16 max-w-5xl mx-auto">
      {/* Top Academic Banner */}
      <div className="bg-white border border-stone-200 rounded-[24px] p-8 sm:p-12 shadow-sm relative overflow-hidden">
        <div className="space-y-4 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A1526]/10 border border-[#7A1526]/20 text-[#7A1526] text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span className="font-pixel text-[8px]">NATIONAL DIGITAL ECOSYSTEM • EGOV MEKTEP</span>
          </div>

          <h1 className="font-climate text-3xl sm:text-5xl text-stone-900 tracking-wide uppercase">
            Smart School KZ (Mektep Hub)
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-serif">
            {isKk
              ? 'Қазақстанның 7 842 мектебіне арналған бірыңғай мемлекеттік цифрлық білім платформасы («eGov мектептері үшін»). Жүйе электронды күнделік пен журналды (Kundelik 2.0), накладкасыз AI сабақ кестесін, эсселерді тексеретін академиялық менторды және қағазсыз мектеп экожүйесін біріктіреді.'
              : 'Единая государственная цифровая экосистема для 7 842 школ Казахстана («eGov для школ Казахстана»). Платформа объединяет электронный дневник и журнал (Kundelik 2.0), интеллектуальный планировщик расписания без накладок, академический AI ментор и стандарт безбумажной школы.'}
          </p>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <div className="space-y-6">
        <div className="text-center sm:text-left space-y-1">
          <span className="font-pixel text-[8px] uppercase tracking-wider text-[#7A1526] block">
            {isKk ? 'АРХИТЕКТУРАЛЫҚ НЕГІЗДЕР' : 'АРХИТЕКТУРНЫЕ ОСНОВЫ'}
          </span>
          <h2 className="font-climate text-2xl sm:text-3xl text-stone-900 uppercase">
            {isKk ? 'Ұлттық деңгейдегі сенімді технологиялар' : 'Технологический фундамент национального масштаба'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="academic-card bg-white p-6 space-y-3 border border-stone-200">
            <div className="p-3 rounded-xl bg-[#7A1526]/10 text-[#7A1526] border border-[#7A1526]/20 w-fit">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="font-climate text-lg text-stone-900 uppercase">Frontend Engine</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-serif">
              React 19, TypeScript, Vite, Tailwind CSS. {isKk ? 'Лезде жүктелу жылдамдығы (FCP < 0.5s), дербес компоненттік архитектура және мобильді құрылғыларға толық бейімделу.' : 'Мгновенная загрузка (First Contentful Paint < 0.5s), компонентная архитектура и полная адаптивность для мобильных телефонов и ПК.'}
            </p>
          </div>

          <div className="academic-card bg-white p-6 space-y-3 border border-stone-200">
            <div className="p-3 rounded-xl bg-[#C5A059]/15 text-[#8C6D23] border border-[#C5A059]/30 w-fit">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-climate text-lg text-stone-900 uppercase">Kundelik 2.0 Core</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-serif">
              {isKk ? '1-10 баллдық ресми формативті бағалау, БЖБ және ТЖБ критериалды жүйесі, үй тапсырмаларын онлайн тексеру және орташа баллды автоматты есептеу.' : '10-балльная система формативного оценивания РК, расчет критериальных баллов СОР и СОЧ, трекинг домашних заданий и GPA.'}
            </p>
          </div>

          <div className="academic-card bg-white p-6 space-y-3 border border-stone-200">
            <div className="p-3 rounded-xl bg-stone-100 text-stone-800 border border-stone-300 w-fit">
              <Sparkles className="w-6 h-6 text-[#7A1526]" />
            </div>
            <h3 className="font-climate text-lg text-stone-900 uppercase">AI Mentor & Solver</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-serif">
              {isKk ? 'Эвристикалық шектеулер негізінде сабақ кестесін қақтығыссыз құрастыру (Conflict-Free Solver) және халықаралық IELTS/эссе сапасын талдайтын AI ментор.' : 'Эвристический планировщик расписания без накладок (Conflict-Free Solver) и AI наставник для проверки эссе по критериям IELTS и БЖБ.'}
            </p>
          </div>
        </div>
      </div>

      {/* Compliance & Standards */}
      <div className="academic-card bg-white p-6 sm:p-8 space-y-6 border border-stone-200">
        <div className="border-b border-stone-200 pb-4">
          <span className="font-pixel text-[8px] text-[#7A1526] uppercase tracking-wider block">
            {isKk ? 'НОРМАТИВТІК СӘЙКЕСТІК' : 'НОРМАТИВНОЕ СООТВЕТСТВИЕ'}
          </span>
          <h3 className="font-climate text-xl sm:text-2xl text-stone-900 mt-1 flex items-center gap-2.5 uppercase">
            <ShieldCheck className="w-6 h-6 text-[#7A1526]" />
            <span>{isKk ? 'Қазақстан Республикасының мемлекеттік стандарттары' : 'Государственные стандарты Республики Казахстан'}</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs text-stone-700 font-serif">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>СанПиН РК № ҚР ДСМ-76</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              {isKk ? 'AI-кесте алгоритмі Сивков шкаласын ескеріп, күрделі пәндерді (алгебра, физика, химия) белсенді сабақтармен кезектестіреді.' : 'Алгоритм AI-расписания строго соблюдает шкалу трудности предметов по Сивкову, чередуя сложные дисциплины со спортом и искусством.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>eGov Mobile & Digital ID</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              {isKk ? 'Оқушылар мен ата-аналардың мемлекеттік цифрлық құжаттары Smart Bridge ҚР қорғалған шлюзі арқылы интеграцияланады.' : 'Интеграция с государственными цифровыми документами ученика и родителей через защищенный шлюз Smart Bridge РК.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isKk ? '«Жасыл Мектеп» бағдарламасы' : 'Программа «Жасыл Мектеп»'}</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              {isKk ? 'Анықтамалар мен өтініштерді цифрландыру арқылы мектеп жылына 1 200+ парақ қағаз үнемдеп, табиғи ресурстарды сақтайды.' : 'Оцифровка справок и дневников позволяет экономить более 1.2 тонн бумаги ежегодно, сохраняя взрослые деревья в Казахстане.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isKk ? '111 «Аманат» шұғыл байланысы' : 'Горячая линия 111 «Аманат»'}</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              {isKk ? 'Бала құқықтарын қорғау және шұғыл психологиялық көмек көрсету бойынша ұлттық байланыс орталығымен жедел байланыс.' : 'Интеграция экстренной связи в один клик для доступа к национальному телефону доверия по защите прав ребенка.'}
            </p>
          </div>
        </div>
      </div>

      {/* CTA to Demo */}
      <div className="rounded-[24px] bg-[#7A1526] text-white p-8 sm:p-10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-xl font-serif">
          <h3 className="font-climate text-2xl sm:text-3xl text-white uppercase">
            {isKk ? 'Платформаның жұмысын сынап көріңіз' : 'Оцените работу платформы в действии'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            {isKk ? 'Жюри сынақ панеліне өтіп, барлық модульдердің автоматтандырылған тесттерін орындаңыз.' : 'Перейдите в тестовую панель жюри и запустите сквозное автоматизированное тестирование всех модулей платформы.'}
          </p>
        </div>
        <Link
          to="/demo"
          className="btn-white py-3 px-7 text-xs font-semibold uppercase tracking-wider relative z-10 shrink-0 inline-flex items-center gap-2 font-serif"
        >
          <span>{isKk ? 'Жюри сынақ панелі' : 'Панель жюри (Тест-стенд)'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
