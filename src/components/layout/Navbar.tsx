import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { AcademicCrest } from '../common/AcademicCrest';
import { 
  Search, 
  Menu, 
  X,
  ChevronDown,
  ArrowRight,
  Globe,
  Calendar,
  Sparkles,
  BookOpen,
  LifeBuoy,
  Leaf,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, setCommandPaletteOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isKz = language === 'kk';

  const navLinks = [
    { to: '/', label: isKz ? 'Басты бет' : 'Главная' },
    { 
      label: isKz ? 'Оқу Хабы' : 'Учебный Хаб', 
      isDropdown: true,
      items: [
        { to: '/dashboard', label: isKz ? 'Құзыреттер матрицасы & Кабинет' : 'Матрица компетенций и Кабинет' },
        { to: '/schedule', label: isKz ? 'Интерактивті сабақ кестесі' : 'Умное расписание уроков' },
        { to: '/mentor', label: isKz ? 'AI Академиялық Ментор' : 'AI Академический Ментор' },
        { to: '/activity', label: isKz ? 'Спорт & Экспедициялар' : 'Спорт и Экспедиции' },
        { to: '/eco', label: isKz ? '11-сынып Эко-мониторингі' : 'Эко-мониторинг 11 класса' },
      ]
    },
    { to: '/announcements', label: isKz ? 'Жаңалықтар & Олимпиадалар' : 'Новости и Олимпиады' },
    { to: '/help', label: isKz ? 'Служба көмек (111)' : 'Служба помощи (111)' },
    { to: '/contacts', label: isKz ? 'Байланыс' : 'Контакты' },
    { to: '/about', label: isKz ? 'Платформа туралы' : 'О платформе' }
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white ${
        isScrolled
          ? 'shadow-md border-b border-stone-200 py-2.5'
          : 'border-b border-stone-200/80 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Column: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((item, idx) => {
            if (item.isDropdown) {
              return (
                <div 
                  key={idx} 
                  className="relative group"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 text-[13px] font-medium text-stone-700 hover:text-[#7A1526] transition-colors py-2 font-sans">
                    <span>{item.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#7A1526] transition-transform group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-stone-200/90 py-2 animate-academic-fade z-50 font-sans">
                      {item.items?.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          to={sub.to}
                          className="flex items-center px-4 py-2.5 text-xs text-stone-700 hover:bg-[#FAF8F5] hover:text-[#7A1526] transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={idx}
                to={item.to || '/'}
                className={({ isActive }) =>
                  `text-[13px] font-medium transition-colors font-sans ${
                    isActive
                      ? 'text-[#7A1526] font-semibold'
                      : 'text-stone-700 hover:text-[#7A1526]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Center Column: National Emblem Crest & Wordmark */}
        <div className="flex items-center justify-center">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <AcademicCrest size={36} className="sm:w-[42px] sm:h-[42px] group-hover:scale-105 transition-transform shrink-0" />
            <div className="text-left">
              <div className="font-serif font-bold text-sm sm:text-xl tracking-tight text-[#1C1F23] leading-none group-hover:text-[#7A1526] transition-colors whitespace-nowrap">
                SMART SCHOOL KZ
              </div>
              <div className="font-pixel text-[7px] sm:text-[8px] tracking-wider text-[#C5A059] mt-0.5 hidden xs:block">
                NATIONAL EDTECH PLATFORM
              </div>
            </div>
          </Link>
        </div>

        {/* Right Column: Search, Language Switcher [KZ | RU], Portal Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="p-2 sm:p-2.5 rounded-full hover:bg-stone-100 text-stone-600 hover:text-[#7A1526] transition-colors"
            title="Іздеу / Поиск (⌘K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* DEDICATED LANGUAGE SWITCHER BUTTON: KZ | RU */}
          <div className="flex items-center p-0.5 rounded-full bg-stone-100 border border-stone-200 shadow-inner">
            <button
              onClick={() => setLanguage('kk')}
              className={`px-2 sm:px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                isKz
                  ? 'bg-[#7A1526] text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Қазақ тіліне ауыстыру"
            >
              KZ
            </button>
            <button
              onClick={() => setLanguage('ru')}
              className={`px-2 sm:px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                !isKz
                  ? 'bg-[#7A1526] text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Переключить на русский язык"
            >
              RU
            </button>
          </div>

          {/* Crimson Pill Action Button: LMS Entry */}
          <Link
            to="/dashboard"
            className="hidden sm:inline-flex btn-crimson text-xs py-2 px-5 whitespace-nowrap font-sans"
          >
            <span>{isKz ? 'Порталға кіру' : 'Войти в систему'}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 sm:px-5 pt-4 pb-6 space-y-4 animate-academic-fade font-sans max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-semibold">{isKz ? 'Тіл:' : 'Язык:'}</span>
              <div className="flex items-center p-0.5 rounded-full bg-stone-100 border border-stone-200">
                <button
                  onClick={() => setLanguage('kk')}
                  className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${isKz ? 'bg-[#7A1526] text-white' : 'text-stone-600'}`}
                >
                  KZ
                </button>
                <button
                  onClick={() => setLanguage('ru')}
                  className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${!isKz ? 'bg-[#7A1526] text-white' : 'text-stone-600'}`}
                >
                  RU
                </button>
              </div>
            </div>

            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-crimson text-xs py-2 px-4 whitespace-nowrap"
            >
              {isKz ? 'Порталға кіру' : 'Войти'}
            </Link>
          </div>

          <div className="space-y-1">
            {navLinks.map((item, idx) => {
              if (item.isDropdown && item.items) {
                return (
                  <div key={idx} className="pt-2 pb-1 space-y-1">
                    <div className="px-3 py-1 text-[10px] font-pixel text-[#7A1526] uppercase font-bold tracking-wider flex items-center gap-1.5">
                      <span>{item.label}</span>
                    </div>
                    <div className="pl-2 space-y-1 border-l-2 border-[#7A1526]/20 ml-3">
                      {item.items.map((sub, sIdx) => (
                        <NavLink
                          key={sIdx}
                          to={sub.to}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-lg text-xs font-serif transition-colors ${
                              isActive
                                ? 'bg-[#7A1526]/10 text-[#7A1526] font-bold'
                                : 'text-stone-700 hover:bg-stone-50'
                            }`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <NavLink
                  key={idx}
                  to={item.to || '/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#7A1526]/10 text-[#7A1526] font-bold'
                        : 'text-stone-800 hover:bg-stone-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
