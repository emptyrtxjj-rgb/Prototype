import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { AcademicCrest } from '../common/AcademicCrest';
import { 
  Search, 
  Menu, 
  X,
  ChevronDown,
  ArrowRight,
  Globe,
  Compass,
  Calendar,
  Sparkles,
  LifeBuoy
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, setCommandPaletteOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryLeftLinks = [
    { to: '/', label: 'Home' },
    { 
      label: 'Academics', 
      isDropdown: true,
      items: [
        { to: '/dashboard', label: 'Академический дашборд' },
        { to: '/navigation', label: '3D Карта кампуса' },
        { to: '/schedule', label: 'Умное расписание' },
        { to: '/mentor', label: 'AI Ментор (IELTS/Эссе)' },
      ]
    },
    { to: '/announcements', label: 'Event & News' },
    { to: '/help', label: 'Contact' }
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
        {/* Left Column: Navigation Links with Carets */}
        <nav className="hidden lg:flex items-center gap-7">
          {primaryLeftLinks.map((item, idx) => {
            if (item.isDropdown) {
              return (
                <div 
                  key={idx} 
                  className="relative group"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 text-[13px] font-medium text-stone-700 hover:text-[#7A1526] transition-colors py-2">
                    <span>{item.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#7A1526] transition-transform group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-stone-200/90 py-2 animate-academic-fade z-50">
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
                  `text-[13px] font-medium transition-colors ${
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

        {/* Center Column: Academic Crest & Wordmark (matches template center logo) */}
        <div className="flex items-center justify-center">
          <Link to="/" className="flex items-center gap-3 group">
            <AcademicCrest size={44} className="group-hover:scale-105 transition-transform" />
            <div className="text-left">
              <div className="font-serif font-bold text-lg sm:text-xl tracking-tight text-[#1C1F23] leading-none group-hover:text-[#7A1526] transition-colors">
                SMART SCHOOL
              </div>
              <div className="text-[10px] font-mono tracking-widest text-[#7A1526] font-semibold uppercase mt-0.5">
                KZ • ACADEMIA 2026
              </div>
            </div>
          </Link>
        </div>

        {/* Right Column: Search, Language, Portal Crimson Button */}
        <div className="flex items-center gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-600 hover:text-[#7A1526] transition-colors"
            title="Search (⌘K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Switch */}
          <button
            onClick={() => setLanguage(language === 'ru' ? 'kk' : 'ru')}
            className="px-2.5 py-1 text-xs font-mono font-medium rounded border border-stone-200 text-stone-700 hover:border-[#7A1526] hover:text-[#7A1526] transition-colors"
          >
            {language.toUpperCase()}
          </button>

          {/* Crimson Pill Action Button */}
          <Link
            to="/dashboard"
            className="hidden sm:inline-flex btn-crimson text-xs py-2 px-5"
          >
            <span>Порталға кіру</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-5 pt-4 pb-6 space-y-3 animate-academic-fade">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <button
              onClick={() => { setCommandPaletteOpen(true); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-xs text-stone-600 bg-stone-50 px-3 py-2 rounded-lg border border-stone-200 w-full mr-2"
            >
              <Search className="w-3.5 h-3.5 text-stone-400" />
              <span>Іздеу / Поиск (⌘K)...</span>
            </button>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-crimson text-xs py-2 px-4 whitespace-nowrap"
            >
              Кіру
            </Link>
          </div>

          <div className="space-y-1 pt-1">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-stone-800 hover:bg-stone-50 font-medium"
            >
              Басты бет / Home
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-stone-800 hover:bg-stone-50 font-medium"
            >
              Дашборд & Бағалар
            </NavLink>
            <NavLink
              to="/navigation"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-stone-800 hover:bg-stone-50 font-medium"
            >
              3D Навигация кампуса
            </NavLink>
            <NavLink
              to="/schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-stone-800 hover:bg-stone-50 font-medium"
            >
              Сабақ кестесі
            </NavLink>
            <NavLink
              to="/mentor"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-stone-800 hover:bg-stone-50 font-medium"
            >
              AI Академиялық Ментор
            </NavLink>
            <NavLink
              to="/announcements"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-stone-800 hover:bg-stone-50 font-medium"
            >
              Хабарландырулар & Оқиғалар
            </NavLink>
            <NavLink
              to="/help"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-stone-800 hover:bg-stone-50 font-medium"
            >
              Қабылдау & Көмек
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
