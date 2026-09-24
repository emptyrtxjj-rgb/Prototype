import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AcademicCrest } from '../components/common/AcademicCrest';
import { 
  ArrowRight, 
  ArrowUpRight,
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  Sparkles,
  BookOpen,
  GraduationCap,
  Users,
  Compass,
  Award,
  ChevronRight,
  ShieldCheck,
  Send,
  Building2,
  Globe2,
  CheckCircle2,
  Laptop
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language } = useApp();
  const isKk = language === 'kk';

  // Admission Form State
  const [admissionForm, setAdmissionForm] = useState({
    name: '',
    iin: '',
    region: 'astana',
    grade: '9-grade',
    email: '',
    phone: '',
    stream: 'stem'
  });
  const [submitted, setSubmitted] = useState(false);

  // Selected Region for National Map
  const [selectedRegion, setSelectedRegion] = useState<number>(0);

  const kazakhstanRegions = [
    { name: isKk ? 'Астана қаласы' : 'г. Астана', schools: 178, students: '245 000', teachers: '14 200', status: '100% ОНЛАЙН' },
    { name: isKk ? 'Алматы қаласы' : 'г. Алматы', schools: 312, students: '320 000', teachers: '21 500', status: '100% ОНЛАЙН' },
    { name: isKk ? 'Шымкент қаласы' : 'г. Шымкент', schools: 245, students: '265 000', teachers: '17 800', status: '100% ОНЛАЙН' },
    { name: isKk ? 'Қарағанды облысы' : 'Карагандинская обл.', schools: 410, students: '172 000', teachers: '15 400', status: '99.8% ОНЛАЙН' },
    { name: isKk ? 'Ақтөбе облысы' : 'Актюбинская обл.', schools: 395, students: '168 000', teachers: '14 900', status: '99.4% ОНЛАЙН' },
    { name: isKk ? 'Шығыс Қазақстан' : 'Восточно-Казахстанская обл.', schools: 334, students: '115 000', teachers: '12 800', status: '99.1% ОНЛАЙН' },
    { name: isKk ? 'Түркістан облысы' : 'Туркестанская обл.', schools: 940, students: '510 000', teachers: '42 000', status: '99.7% ОНЛАЙН' },
    { name: isKk ? 'Павлодар облысы' : 'Павлодарская обл.', schools: 348, students: '112 000', teachers: '11 600', status: '100% ОНЛАЙН' }
  ];

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (admissionForm.name && admissionForm.email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setAdmissionForm({ name: '', iin: '', region: 'astana', grade: '9-grade', email: '', phone: '', stream: 'stem' });
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#1C1F23] overflow-hidden">
      {/* =========================================================================
          01. MAJESTIC ACADEMIC HERO SECTION
          Climate Crisis for major headline, Press Start 2P for tech micro badge,
          classic Kazakh Cormorant Garamond for description, crimson rounded CTA
          ========================================================================= */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Architectural Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85')`
          }}
        />

        {/* Warm Cinematic Dark Overlay for Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/45 z-[1] pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-20 flex flex-col items-center">
          {/* Circular Academic Crest */}
          <div className="mb-5 transform hover:scale-105 transition-transform duration-300">
            <AcademicCrest size={76} light />
          </div>

          {/* Creative Pixel Micro Badge (Press Start 2P) */}
          <div className="mb-4">
            <span className="font-pixel text-[9px] sm:text-[10px] text-[#E6CA85] uppercase tracking-widest bg-black/60 px-4 py-2 rounded-full border border-[#E6CA85]/40 inline-flex items-center gap-2 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isKk ? 'SMART MEKTEP • 7 842 МЕКТЕП • БІРЫҢҒАЙ ЭКОЖҮЙЕ' : 'SMART MEKTEP • 7 842 ШКОЛ • ЕДИНАЯ ЭКОСИСТЕМА'}</span>
            </span>
          </div>

          {/* Headline in bold Climate Crisis font */}
          <h1 className="font-climate text-3xl sm:text-5xl md:text-6xl text-white tracking-wide leading-[1.15] mb-5 text-center drop-shadow-xl uppercase">
            {isKk ? (
              <>
                SMART SCHOOL KZ <br />
                <span className="text-[#E6CA85]">ҰЛТТЫҚ ЦИФРЛЫҚ ПОРТАЛ</span>
              </>
            ) : (
              <>
                SMART SCHOOL KZ <br />
                <span className="text-[#E6CA85]">НАЦИОНАЛЬНЫЙ ШКОЛЬНЫЙ ПОРТАЛ</span>
              </>
            )}
          </h1>

          {/* Subtitle in classical Kazakh serif font */}
          <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-8 font-serif">
            {isKk
              ? 'Қазақстанның барлық орта мектептері мен лицейлеріне арналған мемлекеттік цифрлық білім экоплатформасы: халықаралық құзыреттер матрицасы, оқушы кабинеті, AI сабақ кестесі, академиялық ментор және қағазсыз мектеп стандарты.'
              : 'Государственная цифровая образовательная экосистема для всех школ и лицеев Казахстана: международная матрица компетенций, умное расписание уроков без накладок, AI академический ментор и стандарт безбумажной школы.'}
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/dashboard"
              className="btn-crimson text-sm sm:text-base py-3.5 px-9 shadow-2xl hover:scale-105 flex items-center gap-2 font-serif font-semibold"
            >
              <span>{isKk ? 'Порталға кіру (Оқушы кабинеті)' : 'Войти в кабинет учащегося'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              to="/schedule"
              className="btn-crimson-outline text-sm sm:text-base py-3.5 px-8 shadow-xl bg-black/40 hover:bg-black/60 text-white border-white/40 flex items-center gap-2 font-serif"
            >
              <span>{isKk ? 'AI Сабақ кестесі' : 'AI Расписание занятий'}</span>
              <ArrowUpRight className="w-4 h-4 text-[#E6CA85]" />
            </Link>
          </div>

          {/* Quick Real-Time Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-14 pt-8 border-t border-white/20 w-full max-w-3xl text-center">
            <div>
              <span className="font-climate text-2xl sm:text-3xl text-[#E6CA85] block">7 842</span>
              <span className="text-[11px] font-mono text-white/80 uppercase">{isKk ? 'Мектеп' : 'Школ'}</span>
            </div>
            <div>
              <span className="font-climate text-2xl sm:text-3xl text-[#E6CA85] block">3.85 M</span>
              <span className="text-[11px] font-mono text-white/80 uppercase">{isKk ? 'Оқушы' : 'Учащихся'}</span>
            </div>
            <div>
              <span className="font-climate text-2xl sm:text-3xl text-[#E6CA85] block">385 K</span>
              <span className="text-[11px] font-mono text-white/80 uppercase">{isKk ? 'Педагог' : 'Учителей'}</span>
            </div>
            <div>
              <span className="font-climate text-2xl sm:text-3xl text-[#E6CA85] block">100%</span>
              <span className="text-[11px] font-mono text-white/80 uppercase">{isKk ? 'Цифрлық' : 'Цифровизация'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02. "OUR PROGRAMS" SECTION
          Left description + curved doodle arrow + slanted crimson pill badge
          Right 2x2 grid of 4 rounded photo cards with titles
          ========================================================================= */}
      <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Description + Hand-drawn Arrow + Slanted Pill Button */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-pixel text-[9px] text-[#7A1526] uppercase tracking-widest block">
                {isKk ? 'АКАДЕМИЯЛЫҚ СТАНДАРТТАР' : 'АКАДЕМИЧЕСКИЕ СТАНДАРТЫ'}
              </span>
              <h2 className="font-climate text-2xl sm:text-4xl text-[#1C1F23] tracking-wide leading-tight uppercase">
                {isKk ? 'Ұлттық білім бағдарламалары' : 'Национальные программы'}
              </h2>
            </div>
            <p className="font-serif text-stone-600 text-sm sm:text-base leading-relaxed">
              {isKk
                ? 'Smart School KZ платформасы мемлекеттік жалпыға міндетті білім беру стандартын (МЖМББС) қолдайды. 1-11 сыныптар аралығындағы әр оқушы үшін жеке цифрлық портфолио, критериалды бағалау және олимпиадалық дайындық.'
                : 'Платформа Smart School KZ полностью соответствует ГОСО РК. Персональные цифровые траектории обучения для 1–11 классов, объективная система формативного и суммативного оценивания, подготовка к олимпиадам и ЕНТ.'}
            </p>

            {/* Doodle Curved Arrow pointing to the slanted badge */}
            <div className="relative pt-4 pb-6 pl-4">
              <svg 
                className="w-24 h-16 text-[#7A1526]/70 stroke-current fill-none" 
                viewBox="0 0 100 80"
              >
                <path 
                  d="M10 10 C 20 45, 50 65, 80 50" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeDasharray="4 4"
                />
                <path 
                  d="M72 42 L 82 50 L 78 62" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>

              {/* Slanted Crimson Pill Button */}
              <div className="inline-block mt-1">
                <Link
                  to="/dashboard"
                  className="btn-slanted-pill"
                >
                  <span className="font-serif">{isKk ? 'Күнделікке өту' : 'Перейти в дневник'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: 2x2 Grid of 4 Rounded Photo Tiles */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Tile 1: General & Secondary Education */}
            <Link 
              to="/dashboard"
              className="group relative rounded-[20px] overflow-hidden aspect-[4/3] shadow-md hover:shadow-2xl transition-all duration-300 block"
            >
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="Undergraduate program"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-pixel text-[8px] text-[#E6CA85] uppercase tracking-wider block mb-1">GRADES 1-11</span>
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#E6CA85] transition-colors">
                  {isKk ? 'Орта және негізгі мектеп' : 'Основная и старшая школа'}
                </h3>
                <p className="text-white/80 text-xs mt-0.5 line-clamp-1">
                  {isKk ? 'Құзыреттер матрицасы & Жобалық қорғау' : 'Матрица компетенций и Защита проектов'}
                </p>
              </div>
            </Link>

            {/* Tile 2: Academic Mentor & Olympiad */}
            <Link 
              to="/mentor"
              className="group relative rounded-[20px] overflow-hidden aspect-[4/3] shadow-md hover:shadow-2xl transition-all duration-300 block"
            >
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
                alt="Library research"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-pixel text-[8px] text-[#E6CA85] uppercase tracking-wider block mb-1">AI MENTOR</span>
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#E6CA85] transition-colors">
                  {isKk ? 'Ғылыми ізденіс & AI Ментор' : 'Научный поиск и AI Ментор'}
                </h3>
                <p className="text-white/80 text-xs mt-0.5 line-clamp-1">
                  {isKk ? 'Эссе тексеру және IELTS дайындығы' : 'Анализ эссе и подготовка к олимпиадам'}
                </p>
              </div>
            </Link>

            {/* Tile 3: STEM & Robotics */}
            <Link 
              to="/schedule"
              className="group relative rounded-[20px] overflow-hidden aspect-[4/3] shadow-md hover:shadow-2xl transition-all duration-300 block"
            >
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                alt="STEM and Robotics"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-pixel text-[8px] text-[#E6CA85] uppercase tracking-wider block mb-1">STEM LABS</span>
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#E6CA85] transition-colors">
                  {isKk ? 'IT, Робототехника & AI' : 'IT, Робототехника и AI'}
                </h3>
                <p className="text-white/80 text-xs mt-0.5 line-clamp-1">
                  {isKk ? 'Ақылды сабақ кестесі және факультативтер' : 'Умное расписание и профильные кружки'}
                </p>
              </div>
            </Link>

            {/* Tile 4: Campus Life & Eco */}
            <Link 
              to="/eco"
              className="group relative rounded-[20px] overflow-hidden aspect-[4/3] shadow-md hover:shadow-2xl transition-all duration-300 block"
            >
              <img
                src="https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80"
                alt="Campus architecture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-pixel text-[8px] text-[#E6CA85] uppercase tracking-wider block mb-1">GREEN ECO</span>
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#E6CA85] transition-colors">
                  {isKk ? 'Жасыл мектеп & Эко-аудит' : 'Зеленая школа и эко-аудит'}
                </h3>
                <p className="text-white/80 text-xs mt-0.5 line-clamp-1">
                  {isKk ? 'Қағазсыз мектеп және ресурстарды үнемдеу' : 'Безбумажная школа и сохранение деревьев'}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          03. EMBARK ON A JOURNEY: DEEP CRIMSON BRAND STORY
          Deep Burgundy background, White typography, Classical bust collage,
          and large outline watermark text
          ========================================================================= */}
      <section className="relative w-full bg-[#7A1526] text-white py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Giant Hollow Stroke Watermark Text in Background */}
        <div className="absolute -bottom-10 left-6 sm:left-12 pointer-events-none select-none z-0">
          <span className="watermark-outline-light text-[60px] sm:text-[120px] md:text-[160px] opacity-20">
            SMART MEKTEP KZ
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Title, Description, and Learn More Link */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-pixel text-[9px] text-[#E6CA85] uppercase tracking-widest block">
              {isKk ? 'ҰЛТТЫҚ ЦИФРЛЫҚ МҰРА' : 'НАЦИОНАЛЬНОЕ ЦИФРОВОЕ НАСЛЕДИЕ'}
            </span>
            <h2 className="font-climate text-2xl sm:text-4xl text-white tracking-wide leading-tight uppercase">
              {isKk ? (
                <>
                  Қазақстан мектептерінің <br />
                  жаңа цифрлық дәуірі
                </>
              ) : (
                <>
                  Новая цифровая эра <br />
                  школ Казахстана
                </>
              )}
            </h2>

            <p className="font-serif text-white/90 text-sm sm:text-base leading-relaxed">
              {isKk
                ? 'Smart School KZ — бұл еліміздің барлық өңірлеріндегі оқушылар, ата-аналар мен ұстаздарды біріктіретін мемлекеттік ауқымдағы цифрлық орталық («Қазақстан мектептеріне арналған eGov»).'
                : 'Smart School KZ — это государственный цифровой хаб («eGov для школьников Казахстана»), объединяющий учащихся, родителей и педагогов во всех 20 регионах страны.'}
            </p>

            <p className="font-serif text-white/80 text-xs sm:text-sm leading-relaxed">
              {isKk
                ? 'Дәстүрлі академиялық тереңдік пен заманауи жасанды интеллект алгоритмдері біріктірілген: күнделік толтыру уақыты 3 есеге қысқарды, ал қағазбастылық толығымен жойылды.'
                : 'Сочетание глубоких академических традиций и современных AI-алгоритмов: время на заполнение документации сокращено в 3 раза, а бумажная бюрократия сведена к нулю.'}
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#E6CA85] hover:text-white transition-colors group font-serif"
              >
                <span>{isKk ? 'Толығырақ білу' : 'Подробнее о платформе'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Classical Marble Bust & Ancient Library Collage */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end gap-4">
            <div className="relative rounded-[20px] overflow-hidden w-48 sm:w-60 h-72 sm:h-80 shadow-2xl border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
                alt="Classical sculpture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative rounded-[20px] overflow-hidden w-44 sm:w-56 h-80 sm:h-96 shadow-2xl border border-white/20 mt-8">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80"
                alt="Classical university library"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/15" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          04. NATIONAL DIGITAL ECOSYSTEM OF KAZAKHSTAN (REPLACING 3D BUILDING)
          National scale: 7,842 schools across 20 regions of Kazakhstan,
          interactive regional coverage selector, live telemetry metrics
          ========================================================================= */}
      <section className="w-full bg-[#121417] text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-pixel text-[9px] text-[#E6CA85] uppercase tracking-widest px-4 py-1.5 rounded-full bg-white/5 border border-white/10 inline-block">
              {isKk ? 'ҚАЙТАЛАНБАС АУҚЫМ // 20 ӨҢІР' : 'МАСШТАБ СТРАНЫ // 20 РЕГИОНОВ'}
            </span>
            <h2 className="font-climate text-2xl sm:text-4xl lg:text-5xl text-white tracking-wide uppercase">
              {isKk ? 'Қазақстанның цифрлық мектептері' : 'Цифровые школы Казахстана'}
            </h2>
            <p className="font-serif text-stone-400 text-xs sm:text-sm">
              {isKk
                ? 'Республика бойынша 7 842 мектеп бірыңғай серверлермен байланысып, күнделікті 100 миллионнан астам бағалау транзакциясын өңдейді.'
                : '7 842 школы по всей Республике объединены в единую сеть, обрабатывая более 100 миллионов транзакций оценивания ежедневно.'}
            </p>
          </div>

          {/* Interactive Regional Coverage Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Region List */}
            <div className="lg:col-span-5 space-y-2">
              <span className="text-xs font-mono text-[#C5A059] block uppercase tracking-wider mb-2">
                {isKk ? 'Өңірді таңдаңыз:' : 'Выберите регион:'}
              </span>
              <div className="space-y-1.5">
                {kazakhstanRegions.map((reg, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedRegion(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      selectedRegion === idx
                        ? 'bg-[#7A1526] border-[#E6CA85] text-white shadow-lg'
                        : 'bg-[#1A1D22] border-stone-800 text-stone-300 hover:border-stone-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className={`w-4 h-4 ${selectedRegion === idx ? 'text-[#E6CA85]' : 'text-stone-500'}`} />
                      <span className="font-serif font-bold text-sm">{reg.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono opacity-80">{reg.schools} {isKk ? 'мектеп' : 'школ'}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Selected Region Telemetry Display */}
            <div className="lg:col-span-7 bg-[#1A1D22] border border-stone-800 rounded-[24px] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-[10px] font-pixel text-[#E6CA85] block uppercase mb-1">
                    {isKk ? 'ТАҢДАЛҒАН ОБЛЫС ТЕЛЕМЕТРИЯСЫ' : 'ТЕЛЕМЕТРИЯ ВЫБРАННОГО РЕГИОНА'}
                  </span>
                  <h3 className="font-climate text-2xl text-white tracking-wide">
                    {kazakhstanRegions[selectedRegion].name}
                  </h3>
                </div>
                <span className="font-pixel text-[9px] px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {kazakhstanRegions[selectedRegion].status}
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-stone-800">
                  <span className="text-[11px] font-mono text-stone-400 block">{isKk ? 'Мектептер саны' : 'Количество школ'}</span>
                  <span className="font-climate text-2xl text-white mt-1 block">
                    {kazakhstanRegions[selectedRegion].schools}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">100% Smart Mektep</span>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-stone-800">
                  <span className="text-[11px] font-mono text-stone-400 block">{isKk ? 'Оқушылар' : 'Учащиеся'}</span>
                  <span className="font-climate text-2xl text-[#E6CA85] mt-1 block">
                    {kazakhstanRegions[selectedRegion].students}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">{isKk ? 'Белсенді аккаунттар' : 'Активных аккаунтов'}</span>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-stone-800">
                  <span className="text-[11px] font-mono text-stone-400 block">{isKk ? 'Педагогтар' : 'Педагоги'}</span>
                  <span className="font-climate text-2xl text-white mt-1 block">
                    {kazakhstanRegions[selectedRegion].teachers}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">{isKk ? 'Электронды қолтаңба' : 'ЭЦП валидировано'}</span>
                </div>
              </div>

              {/* National Standards Ribbon */}
              <div className="p-4 rounded-xl bg-[#7A1526]/20 border border-[#7A1526]/40 space-y-2">
                <span className="text-xs font-serif font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E6CA85]" />
                  <span>{isKk ? 'Мемлекеттік интеграциялар және қауіпсіздік' : 'Государственные интеграции и безопасность'}</span>
                </span>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  {isKk
                    ? 'Деректер ҚР Ұлттық білім беру дерекқорымен (НОБД) және eGov Gateway арқылы тікелей синхрондалған. 100% қазақстандық серверлерде (STS KZ сертификаты).'
                    : 'Прямая синхронизация с Национальной образовательной базой данных (НОБД) и шлюзом eGov. Полная защита данных на серверах РК по стандартам СТС КЗ.'}
                </p>
              </div>

              {/* Action */}
              <div className="pt-2 flex items-center justify-between">
                <Link
                  to="/dashboard"
                  className="btn-crimson text-xs py-2.5 px-6 font-serif"
                >
                  <span>{isKk ? 'Аймақтық журналға өту' : 'Открыть региональный журнал'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
                <span className="text-[11px] font-mono text-stone-500">
                  {isKk ? 'Тікелей эфир: Синхрондалды' : 'Live stream: Синхронизировано'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          05. STATE GUARANTEED EDUCATION & GRANTS
          ========================================================================= */}
      <section className="w-full bg-[#FAF8F5] py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6">
            <span className="font-pixel text-[9px] text-[#7A1526] uppercase tracking-widest block">
              {isKk ? 'МЕМЛЕКЕТТІК КЕПІЛДІК' : 'ГОСУДАРСТВЕННЫЙ СТАНДАРТ'}
            </span>
            <h2 className="font-climate text-2xl sm:text-4xl text-[#1C1F23] tracking-wide leading-tight uppercase">
              {isKk ? 'Тегін орта білім және гранттар' : 'Бесплатное образование и гранты'}
            </h2>
            <p className="font-serif text-stone-600 text-sm leading-relaxed">
              {isKk
                ? 'Қазақстан Республикасы Конституциясына сәйкес мемлекеттік орта білім беру барлық азаматтар үшін 100% тегін.'
                : 'В соответствии с Конституцией Республики Казахстан базовое и среднее общее образование является 100% бесплатным.'}
            </p>
            <p className="font-serif text-stone-500 text-xs leading-relaxed">
              {isKk
                ? 'Бейінді лицейлер, олимпиадалық резерв және дарынды балаларға арналған арнайы мемлекеттік шәкіртақылар қарастырылған.'
                : 'Для профильных лицеев, олимпиадного резерва и одаренных детей действуют государственные образовательные стипендии.'}
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="btn-crimson text-xs sm:text-sm py-2.5 px-6 font-serif"
              >
                <span>{isKk ? 'Грант ережелері' : 'Правила грантов'}</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Center: Public Standard Card */}
          <div className="lg:col-span-4 bg-[#7A1526] text-white rounded-[20px] p-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div>
                <span className="font-pixel text-[8px] tracking-widest uppercase text-[#E6CA85] font-semibold block mb-1">
                  {isKk ? 'МЕМЛЕКЕТТІК СТАНДАРТ' : 'ГОСУДАРСТВЕННЫЙ СТАНДАРТ'}
                </span>
                <h3 className="font-climate text-2xl font-bold text-white uppercase tracking-wide">
                  {isKk ? 'Жалпы орта білім' : 'Общее среднее'}
                </h3>
              </div>

              <div className="space-y-2 border-t border-white/20 pt-4">
                <h4 className="font-serif font-bold text-base text-white/95">
                  {isKk ? 'Мемлекеттік тапсырыс' : 'Госзаказ РК'}
                </h4>
                <ul className="space-y-2.5 text-xs text-white/85 pt-2 font-serif">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E6CA85] shrink-0" />
                    <span>{isKk ? 'Оқу құны: 0 ₸ (100% Мемлекеттік грант)' : 'Стоимость обучения: 0 ₸ (100% Госгрант)'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E6CA85] shrink-0" />
                    <span>{isKk ? 'Тегін цифрлық оқулықтар мен күнделік' : 'Бесплатные цифровые учебники и дневник'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E6CA85] shrink-0" />
                    <span>{isKk ? 'Ыстық тамақпен қамтамасыз ету (1-4 сынып)' : 'Горячее питание (1–4 классы)'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Specialized Lyceum & STEM Card */}
          <div className="lg:col-span-4 bg-white text-[#1C1F23] rounded-[20px] p-8 shadow-sm border border-stone-200">
            <div className="space-y-6">
              <div>
                <span className="font-pixel text-[8px] tracking-widest uppercase text-[#7A1526] font-semibold block mb-1">
                  {isKk ? 'ЛИЦЕЙЛІК РЕЗЕРВ' : 'ЛИЦЕЙСКИЙ РЕЗЕРВ'}
                </span>
                <h3 className="font-climate text-2xl font-bold text-[#1C1F23] uppercase tracking-wide">
                  {isKk ? 'Бейіндік лицей' : 'Профильный лицей'}
                </h3>
              </div>

              <div className="space-y-2 border-t border-stone-200 pt-4">
                <h4 className="font-serif font-bold text-base text-stone-800">
                  {isKk ? 'STEM & Жасанды интеллект' : 'STEM и AI технологии'}
                </h4>
                <ul className="space-y-2.5 text-xs text-stone-600 pt-2 font-serif">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#7A1526] shrink-0" />
                    <span>{isKk ? 'AI Академиялық Ментор қолжетімділігі' : 'Доступ к AI Академическому Ментору'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#7A1526] shrink-0" />
                    <span>{isKk ? 'Республикалық олимпиадаға дайындық' : 'Подготовка к республиканским олимпиадам'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#7A1526] shrink-0" />
                    <span>{isKk ? 'Халықаралық алмасу бағдарламалары' : 'Программы академической мобильности'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          06. EGOV ADMISSION APPLICATION (ОНЛАЙН ӨТІНІМ)
          ========================================================================= */}
      <section className="relative w-full bg-white py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="font-pixel text-[9px] text-[#7A1526] uppercase tracking-widest block">
              {isKk ? 'EGOV MEKTEP ҚАБЫЛДАУ' : 'ПРИЕМ ЧЕРЕЗ EGOV MEKTEP'}
            </span>
            <h2 className="font-climate text-2xl sm:text-4xl text-[#1C1F23] tracking-wide uppercase">
              {isKk ? 'Мектепке қабылдау өтінімі' : 'Заявление на зачисление'}
            </h2>
            <p className="font-serif text-stone-600 text-sm">
              {isKk
                ? 'Smart School KZ бірыңғай порталы арқылы мектепке қабылдау өтінімін 2 минут ішінде толтырыңыз'
                : 'Подайте электронное заявление на зачисление в школу онлайн за 2 минуты без очередей'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Photo */}
            <div className="lg:col-span-6">
              <div className="rounded-[24px] overflow-hidden shadow-2xl border border-stone-200 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                  alt="Students studying with laptop"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: Admission Form */}
            <div className="lg:col-span-6 bg-[#FAF8F5] rounded-[24px] p-8 sm:p-10 border border-stone-200 shadow-xl">
              <h3 className="font-climate text-xl text-[#1C1F23] mb-6 uppercase tracking-wide">
                {isKk ? 'Онлайн Өтінім Формасы' : 'Форма Онлайн Заявления'}
              </h3>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 space-y-2 text-center animate-academic-fade font-serif">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 font-bold">
                    ✓
                  </div>
                  <h4 className="font-bold text-base">{isKk ? 'Өтініміңіз қабылданды!' : 'Заявление принято!'}</h4>
                  <p className="text-xs">
                    {isKk
                      ? 'Өтінім №KZ-2026-84920 тіркелді. eGov порталы арқылы растау SMS-хабарламасы 24 сағат ішінде келеді.'
                      : 'Заявка №KZ-2026-84920 успешно зарегистрирована. Уведомление через eGov поступит в течение 24 часов.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAdmissionSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1 font-serif">
                      {isKk ? 'Оқушының толық аты-жөні' : 'ФИО Учащегося'}
                    </label>
                    <input
                      type="text"
                      required
                      value={admissionForm.name}
                      onChange={e => setAdmissionForm({ ...admissionForm, name: e.target.value })}
                      placeholder={isKk ? 'Мысалы: Әлихан Нұрланұлы' : 'Например: Сериков Алихан Нурланович'}
                      className="w-full h-11 px-4 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-[#7A1526] transition-colors font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1 font-serif">
                        {isKk ? 'Өңір' : 'Регион'}
                      </label>
                      <select
                        value={admissionForm.region}
                        onChange={e => setAdmissionForm({ ...admissionForm, region: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-[#7A1526] transition-colors font-sans"
                      >
                        <option value="astana">{isKk ? 'Астана қаласы' : 'г. Астана'}</option>
                        <option value="almaty">{isKk ? 'Алматы қаласы' : 'г. Алматы'}</option>
                        <option value="shymkent">{isKk ? 'Шымкент қаласы' : 'г. Шымкент'}</option>
                        <option value="karaganda">{isKk ? 'Қарағанды облысы' : 'Карагандинская обл.'}</option>
                        <option value="aktobe">{isKk ? 'Ақтөбе облысы' : 'Актюбинская обл.'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1 font-serif">
                        {isKk ? 'Сыныбы' : 'Класс'}
                      </label>
                      <select
                        value={admissionForm.grade}
                        onChange={e => setAdmissionForm({ ...admissionForm, grade: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-[#7A1526] transition-colors font-sans"
                      >
                        <option value="1-grade">{isKk ? '1-сынып (Бастауыш)' : '1 класс (Начальная)'}</option>
                        <option value="5-grade">{isKk ? '5-сынып' : '5 класс'}</option>
                        <option value="7-grade">{isKk ? '7-сынып (Лицей)' : '7 класс (Лицей)'}</option>
                        <option value="9-grade">{isKk ? '9-сынып' : '9 класс'}</option>
                        <option value="10-grade">{isKk ? '10-сынып (Бейіндік)' : '10 класс (Профиль)'}</option>
                        <option value="11-grade">{isKk ? '11-сынып (Түлек)' : '11 класс (Выпускной)'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1 font-serif">
                        {isKk ? 'Электрондық пошта' : 'Эл. почта'}
                      </label>
                      <input
                        type="email"
                        required
                        value={admissionForm.email}
                        onChange={e => setAdmissionForm({ ...admissionForm, email: e.target.value })}
                        placeholder="student@mektep.kz"
                        className="w-full h-11 px-4 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-[#7A1526] transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1 font-serif">
                        {isKk ? 'Телефон нөмірі' : 'Номер телефона'}
                      </label>
                      <input
                        type="tel"
                        value={admissionForm.phone}
                        onChange={e => setAdmissionForm({ ...admissionForm, phone: e.target.value })}
                        placeholder="+7 (777) 000-0000"
                        className="w-full h-11 px-4 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-[#7A1526] transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-crimson w-full text-sm font-semibold py-3 font-serif"
                    >
                      <span>{isKk ? 'Өтінімді жолдау (eGov)' : 'Отправить заявление (eGov)'}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          07. "UPCOMING EVENT" & ACCREDITATION RIBBON
          ========================================================================= */}
      <section className="w-full bg-[#FAF8F5] py-24 px-4 sm:px-6 lg:px-8 border-t border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-stone-300/80 pb-4">
            <div>
              <span className="font-pixel text-[9px] text-[#7A1526] uppercase tracking-widest block mb-1">
                {isKk ? 'РЕСПУБЛИКАЛЫҚ КҮНТІЗБЕ' : 'РЕСПУБЛИКАНСКИЙ КАЛЕНДАРЬ'}
              </span>
              <h2 className="font-climate text-2xl sm:text-4xl text-[#1C1F23] tracking-wide uppercase">
                {isKk ? 'МАҢЫЗДЫ ШАРАЛАР' : 'БЛИЖАЙШИЕ СОБЫТИЯ'}
              </h2>
            </div>
            <Link to="/announcements" className="text-xs font-semibold text-[#7A1526] hover:underline flex items-center gap-1 font-serif">
              <span>{isKk ? 'Барлығын көру' : 'Смотреть все'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3 Event Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Event 1 */}
            <div className="academic-card overflow-hidden bg-white">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
                  alt="Cultural Exchange"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#7A1526] text-white text-[10px] font-pixel font-semibold px-3 py-1 rounded-full shadow-md">
                  24 ТАМЫЗ 2026
                </div>
              </div>
              <div className="p-6 space-y-3 font-serif">
                <h3 className="font-bold text-base text-[#1C1F23] hover:text-[#7A1526] transition-colors leading-snug">
                  {isKk ? 'Халықаралық тіл және пікірсайыс лигасы' : 'Международная языковая и дебатная лига'}
                </h3>
                <p className="text-stone-500 text-xs line-clamp-2">
                  {isKk ? 'Қазақстан мектептері арасындағы онлайн телемост және ағылшын тіліндегі пікірсайыс.' : 'Онлайн-телемост и дебатный турнир на английском языке среди школ РК.'}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-stone-600 border-t border-stone-100 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#7A1526]" /> 14:00 - 17:00
                  </span>
                  <Link to="/announcements" className="text-[#7A1526] font-semibold hover:underline">
                    {isKk ? 'Толығырақ →' : 'Подробнее →'}
                  </Link>
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="academic-card overflow-hidden bg-white">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                  alt="Annual Science Fair"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#7A1526] text-white text-[10px] font-pixel font-semibold px-3 py-1 rounded-full shadow-md">
                  15 ҚЫРКҮЙЕК 2026
                </div>
              </div>
              <div className="p-6 space-y-3 font-serif">
                <h3 className="font-bold text-base text-[#1C1F23] hover:text-[#7A1526] transition-colors leading-snug">
                  {isKk ? 'SMART SCHOOL HACKATHON 2026' : 'SMART SCHOOL HACKATHON 2026'}
                </h3>
                <p className="text-stone-500 text-xs line-clamp-2">
                  {isKk ? 'Оқушылардың AI жобалары мен цифрлық шешімдерінің республикалық конкурсы.' : 'Республиканский конкурс AI проектов и IT стартапов среди школьников.'}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-stone-600 border-t border-stone-100 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#7A1526]" /> 10:00 - 18:30
                  </span>
                  <Link to="/announcements" className="text-[#7A1526] font-semibold hover:underline">
                    {isKk ? 'Толығырақ →' : 'Подробнее →'}
                  </Link>
                </div>
              </div>
            </div>

            {/* Event 3 */}
            <div className="academic-card overflow-hidden bg-white">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?auto=format&fit=crop&w=800&q=80"
                  alt="Graduation and Olympiad"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#7A1526] text-white text-[10px] font-pixel font-semibold px-3 py-1 rounded-full shadow-md">
                  02 ҚАЗАН 2026
                </div>
              </div>
              <div className="p-6 space-y-3 font-serif">
                <h3 className="font-bold text-base text-[#1C1F23] hover:text-[#7A1526] transition-colors leading-snug">
                  {isKk ? 'Республикалық пәндік олимпиада' : 'Республиканская предметная олимпиада'}
                </h3>
                <p className="text-stone-500 text-xs line-clamp-2">
                  {isKk ? 'Математика, физика және информатика пәндерінен дарынды балаларды іріктеу.' : 'Отборочный этап по математике, физике и информатике среди призеров.'}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-stone-600 border-t border-stone-100 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#7A1526]" /> 11:00 - 15:00
                  </span>
                  <Link to="/announcements" className="text-[#7A1526] font-semibold hover:underline">
                    {isKk ? 'Толығырақ →' : 'Подробнее →'}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Accreditation & Academic Partner Ribbon */}
          <div className="pt-10 border-t border-stone-200">
            <p className="text-center text-xs font-mono uppercase tracking-widest text-stone-400 mb-6">
              {isKk ? 'МЕМЛЕКЕТТІК СЕРІКТЕСТЕР ЖӘНЕ СТАНДАРТТАР' : 'ГОСУДАРСТВЕННЫЕ ПАРТНЕРЫ И СТАНДАРТЫ'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
              <div className="flex items-center gap-2 font-serif font-bold text-stone-700 text-sm tracking-tight">
                <AcademicCrest size={28} />
                <span>QAZAQSTAN EDUTECH</span>
              </div>
              <div className="flex items-center gap-2 font-serif font-bold text-stone-700 text-sm tracking-tight">
                <Award className="w-5 h-5 text-[#7A1526]" />
                <span>ASTANA HUB</span>
              </div>
              <div className="flex items-center gap-2 font-serif font-bold text-stone-700 text-sm tracking-tight">
                <ShieldCheck className="w-5 h-5 text-[#7A1526]" />
                <span>eGov KZ GATEWAY</span>
              </div>
              <div className="flex items-center gap-2 font-serif font-bold text-stone-700 text-sm tracking-tight">
                <BookOpen className="w-5 h-5 text-[#7A1526]" />
                <span>NATIONAL EDTECH STANDARD</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
