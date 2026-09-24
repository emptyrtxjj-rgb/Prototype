import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Layers, HelpCircle } from 'lucide-react';
import { AcademicCrest } from '../components/common/AcademicCrest';
import { useApp } from '../context/AppContext';

export const NotFoundPage: React.FC = () => {
  const { language } = useApp();
  const isKk = language === 'kk';

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 animate-academic-fade max-w-2xl mx-auto">
      <div className="mb-6">
        <AcademicCrest size={56} />
      </div>

      <div className="mb-3">
        <span className="font-pixel text-[9px] text-[#7A1526] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#7A1526]/10 border border-[#7A1526]/20 font-bold inline-block">
          ERROR 404 • ACADEMIC ROUTE COORDINATE
        </span>
      </div>

      <h1 className="font-climate text-3xl sm:text-5xl text-[#1C1F23] tracking-wide uppercase mb-3">
        {isKk ? 'Бет табылмады' : 'Страница не найдена'}
      </h1>

      <p className="text-sm text-stone-600 max-w-md mx-auto mb-8 leading-relaxed font-serif">
        {isKk
          ? 'Сұралған интернет-мекенжай немесе кабинет Smart School KZ цифрлық тізілімінде табылмады. Басты мәзірге қайтыңыз немесе қызметтер тізімін тексеріңіз.'
          : 'Запрашиваемая страница или координата не зарегистрирована в цифровой экосистеме Smart School KZ. Проверьте правильность адреса или вернитесь в главное меню.'}
      </p>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="btn-crimson flex items-center gap-2 py-3 px-6 text-xs font-semibold uppercase tracking-wider shadow-md font-serif"
        >
          <Home className="w-4 h-4" />
          <span>{isKk ? 'Басты бетке' : 'На главную'}</span>
        </Link>
        <Link
          to="/dashboard"
          className="btn-crimson-outline flex items-center gap-2 py-3 px-6 text-xs font-semibold uppercase tracking-wider font-serif"
        >
          <Layers className="w-4 h-4" />
          <span>{isKk ? 'Оқушы кабинеті' : 'Кабинет ученика'}</span>
        </Link>
        <Link
          to="/help"
          className="px-5 py-3 rounded-full bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 font-serif"
        >
          <HelpCircle className="w-4 h-4 text-stone-500" />
          <span>{isKk ? 'Көмек қызметі' : 'Служба помощи'}</span>
        </Link>
      </div>

      {/* Traceback info */}
      <div className="mt-12 p-4 rounded-xl bg-white border border-stone-200 w-full text-left font-mono text-xs text-stone-500 shadow-sm space-y-1">
        <p className="font-semibold text-stone-700">{isKk ? 'Маршруттау мәліметтері:' : 'Сведения маршрутизатора:'}</p>
        <p>{isKk ? 'Бағыт' : 'Маршрут'}: {window.location.pathname}</p>
        <p>{isKk ? 'Жауап коды' : 'Код ответа'}: HTTP 404 (Resource Not Found)</p>
      </div>
    </div>
  );
};
