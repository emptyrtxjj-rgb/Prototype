import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { AcademicCrest } from '../common/AcademicCrest';
import { 
  ArrowRight, 
  Mail, 
  MapPin, 
  Phone, 
  Globe, 
  Calendar,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useApp();
  const isKk = language === 'kk';

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full">
      {/* 01. PRE-FOOTER CRIMSON NEWSLETTER STRIP */}
      <section className="w-full bg-[#7A1526] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              {isKk ? 'Мектеп және олимпиада жаңалықтары' : 'Новости школ и олимпиад Казахстана'}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm">
              {isKk 
                ? 'Республикалық олимпиада нәтижелері, ғылыми жобалар және маңызды хабарландыруларды поштаңызға алыңыз.' 
                : 'Результаты республиканских олимпиад, научные проекты и официальные уведомления на ваш e-mail.'}
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center w-full max-w-md gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={isKk ? 'Электрондық поштаңызды енгізіңіз...' : 'Введите ваш адрес эл. почты...'}
                className="w-full h-11 px-4 rounded-full bg-white/10 border border-white/25 text-white placeholder-white/60 text-xs sm:text-sm focus:outline-none focus:bg-white/20 transition-all font-sans"
              />
            </div>
            <button
              type="submit"
              className="h-11 px-6 rounded-full bg-white text-[#7A1526] font-semibold text-xs sm:text-sm hover:bg-stone-100 transition-all shrink-0 flex items-center gap-1.5 shadow-md"
            >
              <span>{subscribed ? (isKk ? 'Жазылдыңыз!' : 'Вы подписаны!') : (isKk ? 'Жазылу' : 'Подписаться')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>

      {/* 02. MAIN ACADEMIC DARK FOOTER */}
      <div className="w-full bg-[#121417] text-[#9A9EAB] py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Crest & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AcademicCrest size={44} light />
              <div>
                <span className="font-climate text-white text-base tracking-wider block">
                  SMART SCHOOL KZ
                </span>
                <span className="text-[9px] font-pixel text-[#C5A059] tracking-wider uppercase block mt-1">
                  MEKTEP HUB // EGOV ECOSYSTEM
                </span>
              </div>
            </div>
            <p className="text-xs text-[#9A9EAB] leading-relaxed">
              {isKk
                ? 'Қазақстанның 7 842 мектебіне арналған бірыңғай цифрлық білім экожүйесі. Құзыреттер матрицасы, оқушы кабинеті, ақылды сабақ кестесі және AI академиялық наставник.'
                : 'Единая цифровая образовательная экосистема для 7 842 школ Казахстана. Матрица компетенций, кабинет учащегося, умное расписание и академический AI наставник.'}
            </p>
            <div className="flex items-center gap-3 pt-2 text-white">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7A1526] hover:border-[#7A1526] transition-colors cursor-pointer" title="ҚР Оқу-ағарту министрлігі">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7A1526] hover:border-[#7A1526] transition-colors cursor-pointer" title="Байланыс орталығы">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7A1526] hover:border-[#7A1526] transition-colors cursor-pointer" title="Жедел желі 1414 / 111">
                <Phone className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Col 2: Services / Academics */}
          <div className="space-y-3">
            <h4 className="font-serif text-white font-semibold text-sm tracking-wide border-b border-stone-800 pb-2">
              {isKk ? 'Цифрлық қызметтер' : 'Цифровые сервисы'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/dashboard" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                  <span>{isKk ? 'Құзыреттер матрицасы & Кабинет' : 'Матрица компетенций и Кабинет'}</span>
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                  <span>{isKk ? 'AI Сабақ кестесі (накладкасыз)' : 'Умное AI Расписание занятий'}</span>
                </Link>
              </li>
              <li>
                <Link to="/mentor" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                  <span>{isKk ? 'AI Академиялық Ментор & Зерттеулер' : 'AI Академический Ментор и Исследования'}</span>
                </Link>
              </li>
              <li>
                <Link to="/eco" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                  <span>{isKk ? 'Эко-мониторинг & Қағаз үнемдеу' : 'Эко-мониторинг и аудит ресурсов'}</span>
                </Link>
              </li>
              <li>
                <Link to="/activity" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                  <span>{isKk ? 'Спорт секциялары & Экспедициялар' : 'Спортивные секции и Экспедиции'}</span>
                </Link>
              </li>
              <li>
                <Link to="/lost-found" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                  <span>{isKk ? 'Табылған заттар бюросы' : 'Бюро находок школы'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-white font-semibold text-sm tracking-wide border-b border-stone-800 pb-2">
              {isKk ? 'Портал навигациясы' : 'Навигация портала'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/announcements" className="hover:text-white hover:underline transition-colors">
                  {isKk ? 'Мектеп хабарландырулары' : 'Школьные объявления'}
                </Link>
              </li>
              <li>
                <Link to="/activity" className="hover:text-white hover:underline transition-colors">
                  {isKk ? 'Дене белсенділігі & Денсаулық' : 'Физическая активность и здоровье'}
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white hover:underline transition-colors">
                  {isKk ? '«Қайда жүгіну керек?» сервисі' : 'Сервис «Куда обратиться?»'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-colors">
                  {isKk ? 'Мектеп туралы ақпарат' : 'О школе и аккредитации'}
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-[#E6CA85] hover:underline font-semibold flex items-center gap-1">
                  <span className="font-pixel text-[9px] text-[#C5A059]">[DEMO]</span>
                  <span>{isKk ? 'Жюри бағалау панелі' : 'Панель для жюри (Test Bench)'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Recent Posts */}
          <div className="space-y-3">
            <h4 className="font-serif text-white font-semibold text-sm tracking-wide border-b border-stone-800 pb-2">
              {isKk ? 'Соңғы хабарлар' : 'Последние новости'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=120&q=80"
                  alt="news thumbnail"
                  className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-700"
                />
                <div>
                  <span className="text-[10px] text-[#C5A059] font-mono block">24 тамыз 2026</span>
                  <Link to="/announcements" className="text-xs text-white hover:text-[#E6CA85] line-clamp-2 leading-snug">
                    {isKk ? 'Халықаралық ғылыми олимпиадаға қатысушыларды іріктеу' : 'Отбор участников на Международную научную олимпиаду'}
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=120&q=80"
                  alt="news thumbnail"
                  className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-700"
                />
                <div>
                  <span className="text-[10px] text-[#C5A059] font-mono block">02 қыркүйек 2026</span>
                  <Link to="/announcements" className="text-xs text-white hover:text-[#E6CA85] line-clamp-2 leading-snug">
                    {isKk ? 'Жаңа оқу жылына арналған цифрлық AI Ментор модулі іске қосылды' : 'Запущен модуль цифрового AI Ментора для нового учебного года'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Smart School KZ • {isKk ? 'Барлық құқықтар қорғалған. Қазақстанның бірыңғай мектептер порталы.' : 'Все права защищены. Единый школьный портал Казахстана.'}</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-stone-300">{isKk ? 'Біз туралы' : 'О нас'}</Link>
            <span>•</span>
            <Link to="/help" className="hover:text-stone-300">{isKk ? 'Құпиялылық саясаты' : 'Конфиденциальность'}</Link>
            <span>•</span>
            <Link to="/demo" className="text-[#C5A059] hover:underline font-mono">{isKk ? 'Жюри сынағы' : 'Жюри бенчмарк'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
