import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AcademicCrest } from '../components/common/AcademicCrest';
import { CampusHero3D } from '../components/three/CampusHero3D';
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
  Send
} from 'lucide-react';

export const HomePage: React.FC = () => {
  // Admission Form State
  const [admissionForm, setAdmissionForm] = useState({
    name: '',
    grade: '9-grade',
    email: '',
    phone: '',
    stream: 'stem'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (admissionForm.name && admissionForm.email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setAdmissionForm({ name: '', grade: '9-grade', email: '', phone: '', stream: 'stem' });
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#1C1F23] overflow-hidden">
      {/* =========================================================================
          01. MAJESTIC ACADEMIC HERO SECTION (MATCHING TEMPLATE)
          Historic university stone architecture background, circular crest emblem,
          majestic serif typography, and crimson rounded pill CTA
          ========================================================================= */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Architectural Campus Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85')`
          }}
        />

        {/* Warm Cinematic Dark Overlay for Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/40 z-[1] pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-20 flex flex-col items-center">
          {/* White & Gold Circular Academic Crest */}
          <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
            <AcademicCrest size={76} light />
          </div>

          {/* Headline in Classical Serif */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-white drop-shadow-md">
            Academic Journey <br />
            Begins Smart School
          </h1>

          {/* Subtitle */}
          <p className="text-white/85 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            Қазақстанның озық мектептері мен лицейлеріне арналған бірыңғай ұлттық цифрлық академия: интерактивті навигация, оқу бағдарламалары және жеке AI ментор.
          </p>

          {/* Crimson Pill Action Button */}
          <div>
            <Link
              to="/dashboard"
              className="btn-crimson text-sm sm:text-base py-3.5 px-9 shadow-2xl hover:scale-105"
            >
              <span>View Our Programs</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02. "OUR PROGRAMS" SECTION (MATCHING TEMPLATE)
          Left description + curved doodle arrow + slanted crimson pill badge
          Right 2x2 grid of 4 rounded photo cards with titles
          ========================================================================= */}
      <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Description + Hand-drawn Arrow + Slanted Pill Button */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1F23] tracking-tight leading-tight">
              Our Programs
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Embark on a journey of knowledge, discovery, and growth at Smart School KZ. Our academic ecosystem is designed to identify bright, motivated individuals who are eager to contribute to our dynamic educational community.
            </p>

            {/* Doodle Curved Arrow pointing to the slanted badge */}
            <div className="relative pt-6 pb-8 pl-4">
              <svg 
                className="w-24 h-20 text-[#7A1526]/70 stroke-current fill-none" 
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

              {/* Slanted Crimson Pill Button (matches the angled badge in template) */}
              <div className="inline-block mt-1">
                <Link
                  to="/schedule"
                  className="btn-slanted-pill"
                >
                  <span>View All Programs</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: 2x2 Grid of 4 Rounded Photo Tiles */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Tile 1: Undergraduate & Secondary */}
            <Link 
              to="/dashboard"
              className="group relative rounded-[20px] overflow-hidden aspect-[4/3] shadow-md hover:shadow-2xl transition-all duration-300 block"
            >
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="Undergraduate program"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#E6CA85] transition-colors">
                  Undergraduate & Lyceum
                </h3>
                <p className="text-white/80 text-xs mt-0.5 line-clamp-1">
                  Негізгі академиялық бағдарламалар
                </p>
              </div>
            </Link>

            {/* Tile 2: Lifelong Learning & Research */}
            <Link 
              to="/mentor"
              className="group relative rounded-[20px] overflow-hidden aspect-[4/3] shadow-md hover:shadow-2xl transition-all duration-300 block"
            >
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
                alt="Library research"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#E6CA85] transition-colors">
                  Lifelong Learning
                </h3>
                <p className="text-white/80 text-xs mt-0.5 line-clamp-1">
                  Ғылыми ізденіс & Олимпиадалық дайындық
                </p>
              </div>
            </Link>

            {/* Tile 3: STEM & Robotics */}
            <Link 
              to="/navigation"
              className="group relative rounded-[20px] overflow-hidden aspect-[4/3] shadow-md hover:shadow-2xl transition-all duration-300 block"
            >
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                alt="STEM and Robotics"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#E6CA85] transition-colors">
                  Graduate & STEM
                </h3>
                <p className="text-white/80 text-xs mt-0.5 line-clamp-1">
                  Жасанды интеллект және робототехника
                </p>
              </div>
            </Link>

            {/* Tile 4: Campus Life & Athletics */}
            <Link 
              to="/activity"
              className="group relative rounded-[20px] overflow-hidden aspect-[4/3] shadow-md hover:shadow-2xl transition-all duration-300 block"
            >
              <img
                src="https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80"
                alt="Campus architecture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#E6CA85] transition-colors">
                  Campus & Innovation
                </h3>
                <p className="text-white/80 text-xs mt-0.5 line-clamp-1">
                  Кампус инфрақұрылымы мен спорт
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          03. EMBARK ON A JOURNEY: DEEP CRIMSON BRAND STORY (MATCHING TEMPLATE)
          Deep Burgundy background, White typography, Classical bust collage,
          and large "About Smart School" outline watermark text
          ========================================================================= */}
      <section className="relative w-full bg-[#7A1526] text-white py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Giant Hollow Stroke Watermark Text in Background */}
        <div className="absolute -bottom-10 left-6 sm:left-12 pointer-events-none select-none z-0">
          <span className="watermark-outline-light text-[70px] sm:text-[130px] md:text-[170px] opacity-25">
            About Smart School
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Title, Description, and Learn More Link */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-white">
              Embark on a Journey: <br />
              Unveiling the Story of Smart School KZ
            </h2>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              Embark on a journey of knowledge, discovery, and growth at Smart School KZ. Our admissions process and digital ecosystem is designed to identify bright, motivated individuals who are eager to contribute to our dynamic national network.
            </p>

            <p className="text-white/75 text-xs sm:text-sm leading-relaxed">
              Мектептің ғасырлық академиялық құндылықтары мен заманауи цифрлық технологиялары тоғысқан орта. Әрбір оқушының интеллектуалдық әлеуетін толық ашуға арналған білім кеңістігі.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#E6CA85] hover:text-white transition-colors group"
              >
                <span>Learn More</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Classical Marble Bust & Ancient Library Collage */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end gap-4">
            {/* Marble Bust Sculpture Image */}
            <div className="relative rounded-[20px] overflow-hidden w-48 sm:w-60 h-72 sm:h-80 shadow-2xl border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
                alt="Classical sculpture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Library Stacks Image */}
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
          04. "TUITION FEES AT SMART SCHOOL KZ" (MATCHING TEMPLATE)
          Left description + Plan Details button,
          Center featured Deep Crimson card, Right Clean Ivory card
          ========================================================================= */}
      <section className="w-full bg-[#FAF8F5] py-28 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Title, Description, and "Plan Details ↗" Button */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1F23] tracking-tight leading-tight">
              Tuition Fees At <br />
              Smart School KZ
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              At Smart School KZ, we are committed to providing a high-quality education that is accessible to a diverse range of students across Kazakhstan.
            </p>
            <p className="text-stone-500 text-xs leading-relaxed">
              Мемлекеттік гранттар, олимпиадалық жеңілдіктер және халықаралық алмасу бағдарламалары қарастырылған.
            </p>
            <div className="pt-2">
              <Link
                to="/dashboard"
                className="btn-crimson text-xs sm:text-sm py-2.5 px-6"
              >
                <span>Plan Details</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Middle Column: Featured Tier Card (Deep Crimson Background) */}
          <div className="lg:col-span-4 bg-[#7A1526] text-white rounded-[20px] p-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#E6CA85] font-semibold block mb-1">
                  Undergraduate & Secondary
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Undergraduate Programs
                </h3>
              </div>

              {/* Sub-block 1 */}
              <div className="space-y-2 border-t border-white/20 pt-4">
                <h4 className="font-semibold text-sm text-white/95 underline decoration-[#E6CA85] underline-offset-4">
                  College of Arts and Sciences
                </h4>
                <ul className="space-y-2 text-xs text-white/85 pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E6CA85] shrink-0" />
                    <span>Full-Time Tuition (per semester): ₸ 240,000</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E6CA85] shrink-0" />
                    <span>Part-Time Tuition (per credit): ₸ 14,000</span>
                  </li>
                </ul>
              </div>

              {/* Sub-block 2 */}
              <div className="space-y-2 border-t border-white/20 pt-4">
                <h4 className="font-semibold text-sm text-white/95 underline decoration-[#E6CA85] underline-offset-4">
                  School of Advanced IT & STEM
                </h4>
                <ul className="space-y-2 text-xs text-white/85 pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E6CA85] shrink-0" />
                    <span>Full-Time Tuition (per semester): ₸ 240,000</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#E6CA85] shrink-0" />
                    <span>AI Ментор және лабораториялық қолжетімділік</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Secondary Tier Card (Clean Ivory Card) */}
          <div className="lg:col-span-4 bg-white text-[#1C1F23] rounded-[20px] p-8 shadow-sm border border-stone-200">
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#7A1526] font-semibold block mb-1">
                  Graduate & Lyceum
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1C1F23]">
                  Graduate Programs
                </h3>
              </div>

              {/* Sub-block 1 */}
              <div className="space-y-2 border-t border-stone-200 pt-4">
                <h4 className="font-semibold text-sm text-stone-800">
                  Graduate School / Department
                </h4>
                <ul className="space-y-2 text-xs text-stone-600 pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#7A1526] shrink-0" />
                    <span>Full-Time Tuition (per semester): ₸ 280,000</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#7A1526] shrink-0" />
                    <span>Part-Time Tuition (per credit): ₸ 18,000</span>
                  </li>
                </ul>
              </div>

              {/* Sub-block 2 */}
              <div className="space-y-2 border-t border-stone-200 pt-4">
                <h4 className="font-semibold text-sm text-stone-800">
                  Additional Fees & Grants
                </h4>
                <ul className="space-y-2 text-xs text-stone-600 pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#7A1526] shrink-0" />
                    <span>Technology & Lab Fee: ₸ 14,500 per semester</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#7A1526] shrink-0" />
                    <span>Student Activity & Sports Fee: ₸ 9,500</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          05. THRIVING BEYOND CLASSES - CAMPUS LIFE (MATCHING TEMPLATE)
          Dark charcoal section, "Campus Life" pill, 3D Campus Viewer & Photography
          ========================================================================= */}
      <section className="w-full bg-[#121417] text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-mono tracking-wider uppercase border border-white/15">
              Campus Life
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Thriving Beyond Classes: <br />
              Campus Life at Smart School
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm">
              Ғылыми зертханалар, 3D интерактивті навигация, дебат клубтары және спорттық кешен.
            </p>
          </div>

          {/* Interactive 3D Campus Model + Campus Photography Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 3D Campus Canvas Box */}
            <div className="lg:col-span-7 rounded-[20px] p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent border border-white/15 overflow-hidden shadow-2xl">
              <div className="p-4 bg-[#1A1D22] border-b border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#E6CA85] flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  3D CAMPUS TWIN • КЕҢІСТІКТІК КАРТА
                </span>
                <span className="text-stone-400">КАБИНЕТТЕР & ЗЕРТХАНАЛАР</span>
              </div>
              <CampusHero3D />
            </div>

            {/* Side Photography Stack */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-[18px] overflow-hidden relative group aspect-[16/9] shadow-lg border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
                  alt="Students walking campus"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <h4 className="font-serif text-white font-bold text-sm">Студенттік және мектеп қауымдастығы</h4>
                    <p className="text-stone-300 text-xs">Ашық кампус, коворкинг және дебат алаңдары</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[18px] overflow-hidden relative group aspect-[16/9] shadow-lg border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=80"
                  alt="Campus athletics"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <h4 className="font-serif text-white font-bold text-sm">Спорт және салауатты өмір</h4>
                    <p className="text-stone-300 text-xs">Жүзу бассейні, футбол алаңы және волейбол залдары</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          06. "APPLY FOR ADMISSION" (MATCHING TEMPLATE)
          Left: Student Photo Collage; Right: Clean White Admission Form Card;
          Large "Admission Open" watermark in background
          ========================================================================= */}
      <section className="relative w-full bg-white py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Giant Hollow Stroke Watermark Text */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0">
          <span className="watermark-outline text-[70px] sm:text-[130px] md:text-[180px] opacity-15">
            Admission Open
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1F23] tracking-tight">
              Apply For Admission
            </h2>
            <p className="text-stone-600 text-sm">
              Smart School KZ лицейіне қабылдау өтінімін онлайн толтырыңыз
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Photo of Smiling Students */}
            <div className="lg:col-span-6">
              <div className="rounded-[24px] overflow-hidden shadow-2xl border border-stone-200 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                  alt="Students studying with laptop"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: Clean Admission Form Card */}
            <div className="lg:col-span-6 bg-[#FAF8F5] rounded-[24px] p-8 sm:p-10 border border-stone-200 shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-[#1C1F23] mb-6">
                Application Form
              </h3>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 space-y-2 text-center animate-academic-fade">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 font-bold">
                    ✓
                  </div>
                  <h4 className="font-bold text-sm">Өтініміңіз қабылданды!</h4>
                  <p className="text-xs">
                    Қабылдау комиссиясы 24 сағат ішінде көрсетілген пошта немесе телефон арқылы хабарласады.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAdmissionSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Оқушының толық аты-жөні
                    </label>
                    <input
                      type="text"
                      required
                      value={admissionForm.name}
                      onChange={e => setAdmissionForm({ ...admissionForm, name: e.target.value })}
                      placeholder="Мысалы: Әлихан Нұрланұлы"
                      className="w-full h-11 px-4 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-[#7A1526] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Сыныбы
                      </label>
                      <select
                        value={admissionForm.grade}
                        onChange={e => setAdmissionForm({ ...admissionForm, grade: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-[#7A1526] transition-colors"
                      >
                        <option value="7-grade">7-сынып (Лицей)</option>
                        <option value="8-grade">8-сынып</option>
                        <option value="9-grade">9-сынып</option>
                        <option value="10-grade">10-сынып (Бейіндік)</option>
                        <option value="11-grade">11-сынып (Түлек)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Бағыты (Stream)
                      </label>
                      <select
                        value={admissionForm.stream}
                        onChange={e => setAdmissionForm({ ...admissionForm, stream: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-[#7A1526] transition-colors"
                      >
                        <option value="stem">STEM & Жасанды интеллект</option>
                        <option value="humanities">Гуманитарлық & Тілдер</option>
                        <option value="olympiad">Олимпиадалық резерв</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Электрондық пошта
                      </label>
                      <input
                        type="email"
                        required
                        value={admissionForm.email}
                        onChange={e => setAdmissionForm({ ...admissionForm, email: e.target.value })}
                        placeholder="student@example.kz"
                        className="w-full h-11 px-4 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-[#7A1526] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Телефон нөмірі
                      </label>
                      <input
                        type="tel"
                        value={admissionForm.phone}
                        onChange={e => setAdmissionForm({ ...admissionForm, phone: e.target.value })}
                        placeholder="+7 (707) 000-0000"
                        className="w-full h-11 px-4 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-[#7A1526] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-crimson w-full text-sm font-semibold py-3"
                    >
                      <span>Apply Now</span>
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
          07. "UPCOMING EVENT" & ACCREDITATION RIBBON (MATCHING TEMPLATE)
          3-card Event schedule with dates, titles, and partner logos
          ========================================================================= */}
      <section className="w-full bg-[#FAF8F5] py-24 px-4 sm:px-6 lg:px-8 border-t border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-stone-300/80 pb-4">
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#7A1526] font-semibold block mb-1">
                Academic Calendar
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1F23]">
                UPCOMING EVENT
              </h2>
            </div>
            <Link to="/announcements" className="text-xs font-semibold text-[#7A1526] hover:underline flex items-center gap-1">
              <span>View All</span>
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
                <div className="absolute top-3 left-3 bg-[#7A1526] text-white text-[11px] font-mono font-semibold px-3 py-1 rounded-full shadow-md">
                  August 24, 2026
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#1C1F23] hover:text-[#7A1526] transition-colors leading-snug">
                  Cultural Exchange: Building Global Connections Through Language
                </h3>
                <p className="text-stone-500 text-xs line-clamp-2">
                  Халықаралық мектептермен онлайн телемост және ағылшын тіліндегі пікірсайыс турнирі.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-stone-600 border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#7A1526]" /> 14:00 - 17:00
                  </span>
                  <Link to="/announcements" className="text-[#7A1526] font-semibold hover:underline">
                    Толығырақ →
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
                <div className="absolute top-3 left-3 bg-[#7A1526] text-white text-[11px] font-mono font-semibold px-3 py-1 rounded-full shadow-md">
                  September 15, 2026
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#1C1F23] hover:text-[#7A1526] transition-colors leading-snug">
                  Annual Science & Hackathon Fair: Empowering Young Innovators
                </h3>
                <p className="text-stone-500 text-xs line-clamp-2">
                  Оқушылардың стартап және AI жобаларының республикалық хакатоны мен көрмесі.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-stone-600 border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#7A1526]" /> 10:00 - 18:30
                  </span>
                  <Link to="/announcements" className="text-[#7A1526] font-semibold hover:underline">
                    Толығырақ →
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
                <div className="absolute top-3 left-3 bg-[#7A1526] text-white text-[11px] font-mono font-semibold px-3 py-1 rounded-full shadow-md">
                  October 02, 2026
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#1C1F23] hover:text-[#7A1526] transition-colors leading-snug">
                  National School Olympiad: Honors, Awards & Academic Ceremony
                </h3>
                <p className="text-stone-500 text-xs line-clamp-2">
                  Республикалық олимпиада жүлдегерлерін салтанатты марапаттау және шәкіртақы тағайындау.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-stone-600 border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#7A1526]" /> 11:00 - 15:00
                  </span>
                  <Link to="/announcements" className="text-[#7A1526] font-semibold hover:underline">
                    Толығырақ →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Accreditation & Academic Partner Ribbon (as seen at bottom of event section in template) */}
          <div className="pt-10 border-t border-stone-200">
            <p className="text-center text-xs font-mono uppercase tracking-widest text-stone-400 mb-6">
              Accreditation & Strategic Partners
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
              <div className="flex items-center gap-2 font-serif font-bold text-stone-700 text-sm tracking-tight">
                <AcademicCrest size={28} />
                <span>QAZAQSTAN EDUTECH</span>
              </div>
              <div className="flex items-center gap-2 font-serif font-bold text-stone-700 text-sm tracking-tight">
                <Award className="w-5 h-5 text-[#7A1526]" />
                <span>ASTANA HUB ECOSYSTEM</span>
              </div>
              <div className="flex items-center gap-2 font-serif font-bold text-stone-700 text-sm tracking-tight">
                <ShieldCheck className="w-5 h-5 text-[#7A1526]" />
                <span>eGov KZ STANDARD</span>
              </div>
              <div className="flex items-center gap-2 font-serif font-bold text-stone-700 text-sm tracking-tight">
                <BookOpen className="w-5 h-5 text-[#7A1526]" />
                <span>CAMBRIDGE ACADEMIC</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
