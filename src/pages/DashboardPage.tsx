import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Calendar, 
  Megaphone, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  FileText, 
  Compass, 
  Cpu, 
  BrainCircuit, 
  BookMarked, 
  Microscope, 
  Layers, 
  Sliders, 
  ShieldCheck, 
  ChevronRight,
  Target,
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { announcementService, AnnouncementItem } from '../services/announcementService';

interface SubjectCompetency {
  id: number;
  nameKk: string;
  nameRu: string;
  teacherKk: string;
  teacherRu: string;
  category: 'stem' | 'humanities' | 'languages';
  theoryScore: number;       // 0-100%
  practicalScore: number;    // 0-100%
  labProjectScore: number;   // 0-100%
  defenseScore: number;      // 0-100%
  overallMastery: number;    // 0-100%
  tierKk: string;
  tierRu: string;
  currentMilestoneKk: string;
  currentMilestoneRu: string;
  status: 'completed' | 'in_progress' | 'review';
  deadlineKk: string;
  deadlineRu: string;
}

export const DashboardPage: React.FC = () => {
  const { ecoMetrics, language } = useApp();
  const isKk = language === 'kk';

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [activeTab, setActiveTab] = useState<'matrix' | 'radar' | 'portfolio'>('matrix');

  // Interactive Competency Simulator State
  const [extraStudyHours, setExtraStudyHours] = useState<number>(4);
  const [olympiadFocus, setOlympiadFocus] = useState<boolean>(true);

  useEffect(() => {
    announcementService.getAnnouncements().then((data: AnnouncementItem[]) => setAnnouncements(data.slice(0, 3)));
  }, []);

  // Next-Gen Competency Matrix Data (World-Class Mastery System)
  const coreCompetencies = [
    {
      titleKk: 'STEM және Алгоритмдік Модельдеу',
      titleRu: 'STEM и алгоритмическое моделирование',
      descKk: 'Математикалық логика, бағдарламалау, деректерді талдау және есептерді шешу',
      descRu: 'Математическая логика, программирование, анализ данных и решение задач',
      score: 97,
      growth: '+3.4%',
      levelKk: 'Шың (Mastery)',
      levelRu: 'Мастерство (Mastery)',
      color: 'from-emerald-600 to-teal-600',
      icon: Cpu
    },
    {
      titleKk: 'Сыни Талдау және Ғылыми Зерттеу',
      titleRu: 'Критический анализ и научный поиск',
      descKk: 'Гипотеза құру, академиялық дәлелдемелер сапасы және фактчекинг',
      descRu: 'Формулирование гипотез, академическая доказательность и фактчекинг',
      score: 93,
      growth: '+2.1%',
      levelKk: 'Шың (Mastery)',
      levelRu: 'Мастерство (Mastery)',
      color: 'from-indigo-600 to-purple-600',
      icon: BrainCircuit
    },
    {
      titleKk: 'Тіл Мәдениеті және Академиялық Жазылым',
      titleRu: 'Культура речи и академическое письмо',
      descKk: 'Үштілділік (KZ/RU/EN), эссе құрылымы, шешендік өнер және дебат',
      descRu: 'Трехъязычие (KZ/RU/EN), структура эссе, риторика и академические дебаты',
      score: 96,
      growth: '+4.0%',
      levelKk: 'Шың (Mastery)',
      levelRu: 'Мастерство (Mastery)',
      color: 'from-amber-600 to-rose-600',
      icon: BookMarked
    },
    {
      titleKk: 'Тәжірибелік Эксперимент & Зертхана',
      titleRu: 'Практический эксперимент и лаборатория',
      descKk: 'Физика-химиялық өлшеулер, прототиптеу және қауіпсіздік хаттамалары',
      descRu: 'Физико-химические измерения, прототипирование и лабораторные протоколы',
      score: 91,
      growth: '+1.8%',
      levelKk: 'Жетік (Proficient)',
      levelRu: 'Продвинутый (Proficient)',
      color: 'from-cyan-600 to-blue-600',
      icon: Microscope
    },
    {
      titleKk: 'Цифрлық Сауаттылық & AI Инженерия',
      titleRu: 'Цифровая грамотность и AI инженерия',
      descKk: 'Prompt engineering, нейрожүйелер архитектурасы және киберқауіпсіздік',
      descRu: 'Prompt-инженерия, архитектура нейросетей и кибергигиена',
      score: 98,
      growth: '+5.2%',
      levelKk: 'Шың (Mastery)',
      levelRu: 'Мастерство (Mastery)',
      color: 'from-[#7A1526] to-[#C5A059]',
      icon: Sparkles
    },
    {
      titleKk: 'Көшбасшылық және Әлеуметтік Импакт',
      titleRu: 'Лидерство и социальный импакт',
      descKk: 'Эко-бастамалар, командалық жобаларды үйлестіру және қауымдастыққа қызмет ету',
      descRu: 'Эко-инициативы, командное управление проектами и служение обществу',
      score: 94,
      growth: '+2.9%',
      levelKk: 'Шың (Mastery)',
      levelRu: 'Мастерство (Mastery)',
      color: 'from-emerald-700 to-green-600',
      icon: Target
    }
  ];

  // Subject Competencies
  const subjectsData: SubjectCompetency[] = [
    {
      id: 1,
      nameKk: 'Алгебра және математикалық модельдеу',
      nameRu: 'Алгебра и математическое моделирование',
      teacherKk: 'Ахметова Г.К.',
      teacherRu: 'Ахметова Г.К.',
      category: 'stem',
      theoryScore: 96,
      practicalScore: 98,
      labProjectScore: 94,
      defenseScore: 96,
      overallMastery: 96,
      tierKk: 'Шың (Mastery)',
      tierRu: 'Мастерство (Mastery)',
      currentMilestoneKk: 'Тригонометриялық теңдеулер жүйесін компьютерлік талдау',
      currentMilestoneRu: 'Компьютерный анализ систем тригонометрических уравнений',
      status: 'completed',
      deadlineKk: 'Бүгін, 18:00',
      deadlineRu: 'Сегодня, 18:00'
    },
    {
      id: 2,
      nameKk: 'Информатика & Қолданбалы AI',
      nameRu: 'Информатика и прикладной AI',
      teacherKk: 'Ибраев С.Н.',
      teacherRu: 'Ибраев С.Н.',
      category: 'stem',
      theoryScore: 100,
      practicalScore: 99,
      labProjectScore: 98,
      defenseScore: 99,
      overallMastery: 99,
      tierKk: 'Шың (Mastery)',
      tierRu: 'Мастерство (Mastery)',
      currentMilestoneKk: 'Computer Vision негізінде мектеп қауіпсіздігі нейромоделі',
      currentMilestoneRu: 'Нейромодель школьной безопасности на базе Computer Vision',
      status: 'completed',
      deadlineKk: 'Ертең, 20:00',
      deadlineRu: 'Завтра, 20:00'
    },
    {
      id: 3,
      nameKk: 'Физика & Кванттық оптика',
      nameRu: 'Физика и квантовая оптика',
      teacherKk: 'Сәрсенов Б.Т.',
      teacherRu: 'Сарсенов Б.Т.',
      category: 'stem',
      theoryScore: 91,
      practicalScore: 93,
      labProjectScore: 90,
      defenseScore: 92,
      overallMastery: 92,
      tierKk: 'Шың (Mastery)',
      tierRu: 'Мастерство (Mastery)',
      currentMilestoneKk: 'Фотоэффект заңдылықтары мен планк тұрақтысын өлшеу зертханасы',
      currentMilestoneRu: 'Лабораторное измерение постоянной Планка и фотоэффекта',
      status: 'in_progress',
      deadlineKk: 'Сәрсенбі, 15:00',
      deadlineRu: 'Среда, 15:00'
    },
    {
      id: 4,
      nameKk: 'Қазақ тілі & Академиялық риторика',
      nameRu: 'Казахский язык и академическая риторика',
      teacherKk: 'Қасымова Ә.М.',
      teacherRu: 'Касымова А.М.',
      category: 'languages',
      theoryScore: 98,
      practicalScore: 97,
      labProjectScore: 99,
      defenseScore: 98,
      overallMastery: 98,
      tierKk: 'Шың (Mastery)',
      tierRu: 'Мастерство (Mastery)',
      currentMilestoneKk: '«Абай жолы» роман-эпопеясындағы тарихи ұлттық код концептісі',
      currentMilestoneRu: 'Концепция исторического национального кода в эпопее «Путь Абая»',
      status: 'completed',
      deadlineKk: 'Бейсенбі, 12:00',
      deadlineRu: 'Четверг, 12:00'
    },
    {
      id: 5,
      nameKk: 'Academic English (C1 & Research)',
      nameRu: 'Academic English (C1 & Research)',
      teacherKk: 'Сүлейменова Д.Р.',
      teacherRu: 'Сулейменова Д.Р.',
      category: 'languages',
      theoryScore: 96,
      practicalScore: 97,
      labProjectScore: 95,
      defenseScore: 98,
      overallMastery: 96,
      tierKk: 'Шың (Mastery)',
      tierRu: 'Мастерство (Mastery)',
      currentMilestoneKk: 'Renewable Energy Transition in Kazakhstan: Academic Policy Brief',
      currentMilestoneRu: 'Renewable Energy Transition in Kazakhstan: Academic Policy Brief',
      status: 'completed',
      deadlineKk: 'Жұма, 18:00',
      deadlineRu: 'Пятница, 18:00'
    },
    {
      id: 6,
      nameKk: 'Қазақстан тарихы және қоғамтану',
      nameRu: 'История Казахстана и обществознание',
      teacherKk: 'Жұмабаев Е.О.',
      teacherRu: 'Жумабаев Е.О.',
      category: 'humanities',
      theoryScore: 97,
      practicalScore: 95,
      labProjectScore: 98,
      defenseScore: 97,
      overallMastery: 97,
      tierKk: 'Шың (Mastery)',
      tierRu: 'Мастерство (Mastery)',
      currentMilestoneKk: 'Алаш-Орда қайраткерлерінің құқықтық және мемлекеттік реформалары',
      currentMilestoneRu: 'Правовые и государственные реформы деятелей Алаш-Орды',
      status: 'completed',
      deadlineKk: 'Дүйсенбі, 09:00',
      deadlineRu: 'Понедельник, 09:00'
    }
  ];

  // Verified Micro-Credentials and Academic Portfolio
  const studentPortfolio = [
    {
      id: 'p1',
      titleKk: 'Республикалық информатика олимпиадасы — Алтын медаль',
      titleRu: 'Республиканская олимпиада по информатике — Золотая медаль',
      issuerKk: '«Дарын» республикалық ғылыми-практикалық орталығы',
      issuerRu: 'РНПЦ «Дарын» МОН РК',
      date: '2026',
      badge: 'Gold Medal',
      verificationId: 'KZ-DAR-2026-9041'
    },
    {
      id: 'p2',
      titleKk: 'IELTS Academic — Band Score 8.0 (C1 Pro)',
      titleRu: 'IELTS Academic — Band Score 8.0 (C1 Pro)',
      issuerKk: 'British Council Kazakhstan & Cambridge Assessment',
      issuerRu: 'British Council Kazakhstan & Cambridge Assessment',
      date: '2025',
      badge: '8.0 Band',
      verificationId: 'BC-KZ-882104'
    },
    {
      id: 'p3',
      titleKk: '«Smart Alatau Eco-AI» ғылыми жоба қорғауы — 1-орын',
      titleRu: 'Защита научного проекта «Smart Alatau Eco-AI» — 1 место',
      issuerKk: 'ҚР Ұлттық Ғылым Академиясы жас ғалымдар форумы',
      issuerRu: 'Форум молодых ученых Национальной Академии Наук РК',
      date: '2025',
      badge: '1st Place',
      verificationId: 'NAS-KZ-PROJECT-55'
    }
  ];

  // Projected Mastery Calculation based on Simulator
  const baseMastery = 94.8;
  const simulatedGrowth = Number((extraStudyHours * 0.45 + (olympiadFocus ? 1.8 : 0)).toFixed(1));
  const simulatedMastery = Math.min(100, Number((baseMastery + simulatedGrowth).toFixed(1)));

  return (
    <div className="space-y-8 pb-16 animate-academic-fade max-w-7xl mx-auto">
      {/* Top Academic Student Profile Header */}
      <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-pixel text-[9px] text-[#7A1526] font-bold uppercase tracking-wider bg-[#7A1526]/10 px-2.5 py-1 rounded-full border border-[#7A1526]/20">
              {isKk ? 'SMART MEKTEP • 11 «А» • IT ЛИЦЕЙ №175' : 'SMART MEKTEP • 11 «А» • IT ЛИЦЕЙ №175'}
            </span>
            <span className="font-pixel text-[9px] text-[#C5A059] font-bold uppercase tracking-wider bg-[#C5A059]/10 px-2 py-1 rounded-full border border-[#C5A059]/20">
              {isKk ? 'ДАМУ ТРАЕКТОРИЯСЫ' : 'ТРАЕКТОРИЯ РАЗВИТИЯ'}
            </span>
          </div>

          <h1 className="font-climate text-2xl sm:text-3xl text-[#1C1F23] tracking-wide uppercase">
            {isKk ? 'Қайырлы күн, Әмина!' : 'Добрый день, Амина!'}
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 font-serif max-w-2xl">
            {isKk ? (
              <>
                Сіздің жиынтық құзырет деңгейіңіз: <strong className="text-[#7A1526] font-mono">94.8%</strong> («Шың / Mastery»). 
                Бүгінге: <strong className="text-stone-800 font-mono">4 сабақ</strong>, 1 зертханалық қорғау және жеке AI кеңесші тапсырмалары.
              </>
            ) : (
              <>
                Ваш интегральный уровень компетентности: <strong className="text-[#7A1526] font-mono">94.8%</strong> («Мастерство / Mastery»). 
                На сегодня: <strong className="text-stone-800 font-mono">4 занятия</strong>, 1 лабораторная защита и персональные рекомендации AI тьютора.
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/schedule"
            className="btn-crimson text-xs py-2.5 px-5 font-serif flex items-center gap-1.5 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{isKk ? 'Сабақ кестесі' : 'Расписание уроков'}</span>
          </Link>
          <Link
            to="/mentor"
            className="btn-crimson-outline text-xs py-2.5 px-5 font-serif flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7A1526]" />
            <span>{isKk ? 'AI Академиялық Ментор' : 'AI Академический Ментор'}</span>
          </Link>
        </div>
      </div>

      {/* Top 4 Key Competency & Impact Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Mastery Index */}
        <div className="academic-card p-5 bg-white border border-stone-200">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-1">
            <span>{isKk ? 'ҚҰЗЫРЕТ ИНДЕКСІ' : 'ИНДЕКС КОМПЕТЕНЦИЙ'}</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <span className="font-climate text-3xl text-emerald-800 block">94.8%</span>
          <span className="text-[10px] font-mono text-emerald-700 font-semibold">
            {isKk ? 'Шың деңгейі (Mastery Tier)' : 'Уровень: Мастерство (Mastery)'}
          </span>
        </div>

        {/* KPI 2: Critical Milestones */}
        <div className="academic-card p-5 bg-white border border-stone-200">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-1">
            <span>{isKk ? 'ЖОБАЛЫҚ МАЙЛСТОУНДАР' : 'ПРОЕКТНЫЕ ВЕХИ'}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#7A1526]" />
          </div>
          <span className="font-climate text-3xl text-[#1C1F23] block">18 / 18</span>
          <span className="text-[10px] font-mono text-emerald-700 font-semibold">
            {isKk ? 'Барлық критерий қорғалды' : 'Все критерии защищены'}
          </span>
        </div>

        {/* KPI 3: Academic Credentials */}
        <div className="academic-card p-5 bg-white border border-stone-200">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-1">
            <span>{isKk ? 'СЕРТИФИКАТТАЛҒАН ПОРТФОЛИО' : 'ПОРТФОЛИО ДОСТИЖЕНИЙ'}</span>
            <Award className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <span className="font-climate text-3xl text-[#7A1526] block">12</span>
          <span className="text-[10px] font-mono text-[#7A1526] font-semibold">
            {isKk ? 'Олимпиада & Жобалық куәліктер' : 'Олимпиады и патенты'}
          </span>
        </div>

        {/* KPI 4: Eco Impact Contribution */}
        <div className="academic-card p-5 bg-emerald-50/50 border border-emerald-200">
          <div className="flex items-center justify-between text-xs text-emerald-900 font-mono mb-1">
            <span>{isKk ? '11 «А» ЭКО-ҮЛЕСІ' : 'ЭКО-ВКЛАД 11 «А»'}</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          </div>
          <span className="font-climate text-3xl text-emerald-800 block">1 200</span>
          <span className="text-[10px] font-mono text-emerald-700 font-semibold">
            {isKk ? 'парақ үнемделді (3 ағаш)' : 'листов бумаги (3 дерева)'}
          </span>
        </div>
      </div>

      {/* 6 Key Core Competencies Radar / Cards Section */}
      <div className="academic-card p-6 sm:p-8 bg-white border border-stone-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-4 h-4 text-[#7A1526]" />
              <span className="font-pixel text-[9px] text-[#7A1526] uppercase">
                {isKk ? 'ЖАЛПЫҰЛТТЫҚ ҚҰЗЫРЕТТЕР СТАНДАРТЫ' : 'ОБЩЕНАЦИОНАЛЬНЫЙ СТАНДАРТ КОМПЕТЕНЦИЙ'}
              </span>
            </div>
            <h2 className="font-climate text-xl sm:text-2xl text-[#1C1F23] tracking-wide uppercase">
              {isKk ? 'Негізгі 6 академиялық құзырет' : '6 ключевых академических компетенций'}
            </h2>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-mono">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'matrix' 
                  ? 'bg-white text-[#7A1526] font-bold shadow-xs' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isKk ? 'Пәндер матрицасы' : 'Матрица предметов'}
            </button>
            <button
              onClick={() => setActiveTab('radar')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'radar' 
                  ? 'bg-white text-[#7A1526] font-bold shadow-xs' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isKk ? 'Траектория симуляторы' : 'Симулятор траектории'}
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'portfolio' 
                  ? 'bg-white text-[#7A1526] font-bold shadow-xs' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isKk ? 'Портфолио & Сертификаттар' : 'Портфолио и Сертификаты'}
            </button>
          </div>
        </div>

        {/* 6 Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreCompetencies.map((comp, idx) => {
            const Icon = comp.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 hover:border-[#7A1526]/30 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#7A1526] shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-300">
                      {comp.growth}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-stone-900 text-base leading-snug">
                    {isKk ? comp.titleKk : comp.titleRu}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {isKk ? comp.descKk : comp.descRu}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-stone-200/60">
                  <div className="flex items-baseline justify-between text-xs font-mono">
                    <span className="text-stone-500 font-semibold">{isKk ? comp.levelKk : comp.levelRu}</span>
                    <span className="font-bold text-[#7A1526] text-sm">{comp.score}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${comp.color} transition-all duration-700`}
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic View: Tab Content */}
      {activeTab === 'matrix' && (
        /* Multi-Vector Subject Competency Table */
        <div className="academic-card p-6 sm:p-8 space-y-6 bg-white border border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-4 h-4 text-[#7A1526]" />
                <span className="font-pixel text-[9px] text-[#7A1526] uppercase">
                  {isKk ? 'КӨПВЕКТОРЛЫ ПӘНДІК БАҒАЛАУ МАТРИЦАСЫ' : 'МНОГОВЕКТОРНАЯ МАТРИЦА ОЦЕНКИ ПРЕДМЕТОВ'}
                </span>
              </div>
              <h3 className="font-climate text-xl sm:text-2xl text-[#1C1F23] tracking-wide uppercase">
                {isKk ? 'Пәндік құзыреттер мен жобалық прогресс' : 'Предметные компетенции и прогресс проектов'}
              </h3>
            </div>

            <span className="text-xs font-mono text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
              {isKk ? 'Академиялық кезең: 2025–2026 / 2-семестр' : 'Академический период: 2025–2026 / 2-й семестр'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b border-stone-200 bg-[#FAF8F5] text-stone-700 font-mono uppercase text-[11px]">
                  <th className="py-3 px-4 font-semibold">{isKk ? 'Пән & Тәлімгер' : 'Дисциплина и Наставник'}</th>
                  <th className="py-3 px-4 font-semibold text-center">{isKk ? 'Теория & Концепт' : 'Теория и Концепт'}</th>
                  <th className="py-3 px-4 font-semibold text-center">{isKk ? 'Қолданбалы Практика' : 'Практика'}</th>
                  <th className="py-3 px-4 font-semibold text-center">{isKk ? 'Зертхана / Жоба' : 'Лаборатория'}</th>
                  <th className="py-3 px-4 font-semibold text-center">{isKk ? 'Қорғау & Аудит' : 'Защита и Аудит'}</th>
                  <th className="py-3 px-4 font-semibold text-center">{isKk ? 'Жиынтық Меңгеру' : 'Итоговое Мастерство'}</th>
                  <th className="py-3 px-4 font-semibold">{isKk ? 'Ағымдағы зерттеу вехасы' : 'Текущая веха исследования'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-sans">
                {subjectsData.map((sub) => (
                  <tr key={sub.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-serif font-bold text-stone-900 block text-sm">
                        {isKk ? sub.nameKk : sub.nameRu}
                      </span>
                      <span className="text-[11px] text-stone-500 font-mono">
                        {isKk ? sub.teacherKk : sub.teacherRu}
                      </span>
                    </td>

                    {/* Theory Score */}
                    <td className="py-4 px-4 text-center">
                      <span className="font-mono font-semibold text-xs px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200">
                        {sub.theoryScore}%
                      </span>
                    </td>

                    {/* Practical Score */}
                    <td className="py-4 px-4 text-center">
                      <span className="font-mono font-semibold text-xs px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200">
                        {sub.practicalScore}%
                      </span>
                    </td>

                    {/* Lab / Project Score */}
                    <td className="py-4 px-4 text-center">
                      <span className="font-mono font-semibold text-xs px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200">
                        {sub.labProjectScore}%
                      </span>
                    </td>

                    {/* Defense Score */}
                    <td className="py-4 px-4 text-center">
                      <span className="font-mono font-semibold text-xs px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200">
                        {sub.defenseScore}%
                      </span>
                    </td>

                    {/* Overall Mastery */}
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className="font-mono font-bold text-sm text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-300">
                          {sub.overallMastery}%
                        </span>
                        <span className="text-[9px] font-mono text-emerald-700 mt-0.5">
                          {isKk ? sub.tierKk : sub.tierRu}
                        </span>
                      </div>
                    </td>

                    {/* Milestone & Deadline */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="space-y-1">
                        <p className="font-serif text-stone-800 text-xs font-medium line-clamp-1">
                          {isKk ? sub.currentMilestoneKk : sub.currentMilestoneRu}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-mono">
                          {sub.status === 'completed' ? (
                            <span className="text-emerald-700 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> {isKk ? 'Қорғалды' : 'Защищено'}
                            </span>
                          ) : (
                            <span className="text-amber-700 font-semibold flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> {isKk ? 'Орындалуда' : 'В процессе'}
                            </span>
                          )}
                          <span className="text-stone-400">• {isKk ? sub.deadlineKk : sub.deadlineRu}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'radar' && (
        /* Dynamic Learning Trajectory Simulator */
        <div className="academic-card p-6 sm:p-8 bg-white border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <Sliders className="w-4 h-4 text-[#7A1526]" />
              <span className="font-pixel text-[9px] text-[#7A1526] uppercase">
                {isKk ? 'АДАПТИВТІ AI ТРЕНИНГ ЖӘНЕ БОЛЖАМ' : 'АДАПТИВНЫЙ AI ТРЕНИНГ И ПРОГНОЗ'}
              </span>
            </div>
            <h3 className="font-climate text-xl sm:text-2xl text-[#1C1F23] tracking-wide uppercase">
              {isKk ? 'Жеке академиялық өсім симуляторы' : 'Симулятор индивидуального академического роста'}
            </h3>
            <p className="text-xs text-stone-600 font-serif mt-1">
              {isKk 
                ? 'Қосымша зерттеу сағаттары мен олимпиадалық жүктемені таңдап, құзыреттер өсімінің нейрожелілік болжамын есептеңіз.' 
                : 'Задайте параметры самостоятельной работы и олимпиадной нагрузки для расчета нейросетевого прогноза мастерства.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Controls */}
            <div className="space-y-6 p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-stone-800">
                    {isKk ? 'Апталық қосымша зерттеу & ғылыми жұмыс:' : 'Дополнительные часы научных исследований в неделю:'}
                  </span>
                  <span className="text-[#7A1526] font-bold text-sm">{extraStudyHours} {isKk ? 'сағат' : 'ч.'}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="1"
                  value={extraStudyHours}
                  onChange={(e) => setExtraStudyHours(Number(e.target.value))}
                  className="w-full accent-[#7A1526] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>0 сағ/нед</span>
                  <span>6 сағ/нед</span>
                  <span>12 сағ/нед</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-stone-200">
                <div className="space-y-0.5">
                  <span className="text-xs font-serif font-bold text-stone-900 block">
                    {isKk ? 'Халықаралық олимпиадалық трек' : 'Международный олимпиадный трек'}
                  </span>
                  <span className="text-[11px] text-stone-500 block">
                    {isKk ? 'IPhO / IOI / Cambridge Research модульдері' : 'Модули IPhO / IOI / Cambridge Research'}
                  </span>
                </div>
                <button
                  onClick={() => setOlympiadFocus(!olympiadFocus)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    olympiadFocus ? 'bg-[#7A1526]' : 'bg-stone-300'
                  }`}
                >
                  <span 
                    className={`block w-5 h-5 rounded-full bg-white transition-transform transform shadow-sm ${
                      olympiadFocus ? 'translate-x-6' : 'translate-x-1'
                    }`} 
                  />
                </button>
              </div>

              {/* AI Tutor Note */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs font-serif text-amber-900 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  {isKk
                    ? 'AI Диагностика: Сіздің «STEM & AI» құзыретіңіз республикалық орташа көрсеткіштен 18%-ға жоғары. Кванттық оптика зертханасын тапсыру жалпы нәтижені рекордтық 97.5%-ға дейін жеткізеді.'
                    : 'AI Диагностика: Ваш показатель в «STEM & AI» на 18% превосходит среднереспубликанский. Завершение лабораторной по квантовой оптике выведет интегральное мастерство на уровень 97.5%.'}
                </p>
              </div>
            </div>

            {/* Simulated Outcome Display */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white to-[#FAF8F5] border border-stone-200 text-center space-y-4">
              <span className="text-xs font-pixel text-[#7A1526] uppercase tracking-wider block">
                {isKk ? 'БОЛЖАМДЫ ҚҰЗЫРЕТ ДЕҢГЕЙІ' : 'ПРОГНОЗИРУЕМЫЙ УРОВЕНЬ МАСТЕРСТВА'}
              </span>

              <div className="flex items-center justify-center gap-3">
                <span className="font-climate text-5xl sm:text-6xl text-[#1C1F23]">
                  {simulatedMastery}%
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                  +{simulatedGrowth}% {isKk ? 'өсім' : 'рост'}
                </span>
              </div>

              <p className="text-xs text-stone-600 font-serif max-w-sm mx-auto">
                {isKk
                  ? 'Бұл траектория бойынша бітірген жағдайда Назарбаев Университеті мен әлемнің топ-50 ЖОО-ларына грантқа түсу ықтималдығы — 99.2%.'
                  : 'При сохранении данной траектории вероятность поступления в Назарбаев Университет и топ-50 вузов мира на грант составляет 99.2%.'}
              </p>

              <div className="pt-2">
                <Link
                  to="/mentor"
                  className="btn-crimson inline-flex items-center gap-2 text-xs py-2.5 px-6 font-serif"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isKk ? 'AI Академиялық Ментормен талқылау' : 'Обсудить с AI Ментором'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'portfolio' && (
        /* Academic Portfolio & Micro-Credentials */
        <div className="academic-card p-6 sm:p-8 bg-white border border-stone-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-[#7A1526]" />
                <span className="font-pixel text-[9px] text-[#7A1526] uppercase">
                  {isKk ? 'ЦИФРЛЫҚ ОҚУШЫ ПОРТФОЛИОСЫ & EGOV ВЕРИФИКАЦИЯ' : 'ЦИФРОВОЕ ПОРТФОЛИО УЧАЩЕГОСЯ И EGOV ВЕРИФИКАЦИЯ'}
                </span>
              </div>
              <h3 className="font-climate text-xl sm:text-2xl text-[#1C1F23] tracking-wide uppercase">
                {isKk ? 'Ресми марапаттар мен ғылыми куәліктер' : 'Официальные награды и научные сертификаты'}
              </h3>
            </div>

            <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
              ✓ 100% {isKk ? 'Блокчейн верификациясы' : 'Верифицировано через eGov'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {studentPortfolio.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col justify-between space-y-4 hover:border-[#7A1526]/40 transition-all shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#7A1526] bg-[#7A1526]/10 px-2 py-0.5 rounded border border-[#7A1526]/20">
                      {item.badge}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500">{item.date}</span>
                  </div>

                  <h4 className="font-serif font-bold text-stone-900 text-sm leading-snug">
                    {isKk ? item.titleKk : item.titleRu}
                  </h4>
                  <p className="text-xs text-stone-600 font-sans">
                    {isKk ? item.issuerKk : item.issuerRu}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span>ID: {item.verificationId}</span>
                  <span className="text-emerald-700 font-semibold">✓ Ресми</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Second Row: School Announcements Timeline & AI Mentor Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Announcements Timeline (2 cols) */}
        <div className="lg:col-span-2 academic-card p-6 space-y-4 bg-white border border-stone-200">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[#7A1526]" />
              <h3 className="font-serif font-bold text-[#1C1F23] text-lg">
                {isKk ? 'Маңызды мектеп хабарландырулары' : 'Важные школьные уведомления'}
              </h3>
            </div>
            <Link to="/announcements" className="text-xs font-mono text-[#7A1526] hover:underline font-semibold">
              {isKk ? 'Барлық хабарландырулар →' : 'Все объявления →'}
            </Link>
          </div>

          <div className="space-y-3">
            {announcements.map(ann => (
              <div
                key={ann.id}
                className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#7A1526]/30 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#7A1526] bg-[#7A1526]/10 px-2 py-0.5 rounded border border-[#7A1526]/20">
                      {ann.date} • {ann.time}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500">
                      {ann.location}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#1C1F23] font-serif">
                    {ann.title}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-1 font-serif">
                    {ann.description}
                  </p>
                </div>

                <Link
                  to="/announcements"
                  className="shrink-0 text-xs font-mono text-[#7A1526] hover:underline flex items-center gap-1 self-end sm:self-center font-semibold"
                >
                  <span>{isKk ? 'Толығырақ' : 'Подробнее'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* AI Mentor Shortcut Card (1 col) */}
        <div className="academic-card p-6 bg-gradient-to-br from-white via-[#FAF8F5] to-white border border-[#7A1526]/20 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#7A1526]/10 text-[#7A1526] border border-[#7A1526]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-[#1C1F23] text-lg">
                {isKk ? 'AI Академиялық Ментор' : 'AI Академический Ментор'}
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed font-serif">
                {isKk
                  ? 'Эссе немесе ғылыми жұмысыңызды жүктеп, грамматика, лексика және логикалық құрылымы бойынша лезде сараптама алыңыз.'
                  : 'Загрузите эссе или научный проект для мгновенного аудита аргументации, академического стиля и структуры.'}
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-[11px] font-mono text-stone-700 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{isKk ? 'Мақсат: IELTS 8.0+ / Ғылыми қорғау 100%' : 'Цель: IELTS 8.0+ / Защита 100%'}</span>
            </div>
            <Link
              to="/mentor"
              className="btn-crimson w-full text-xs font-semibold py-2.5 text-center block font-serif"
            >
              {isKk ? 'AI Менторды ашу →' : 'Открыть AI Ментор →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
