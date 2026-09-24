import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft, Search, Layers, HelpCircle } from 'lucide-react';
import { AcademicCrest } from '../components/common/AcademicCrest';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 animate-fade-in max-w-2xl mx-auto">
      <div className="mb-6">
        <AcademicCrest size="lg" variant="crimson" />
      </div>

      <span className="font-sans text-xs text-[#7A1526] uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#7A1526]/10 border border-[#7A1526]/20 mb-3 font-semibold">
        Error 404 • Academic Directory Coordinate
      </span>

      <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight mb-3">
        Кабинет не найден
      </h1>

      <p className="text-sm text-stone-600 max-w-md mx-auto mb-8 leading-relaxed font-sans">
        Запрашиваемая страница или координата не зарегистрирована в цифровой карте Smart School KZ. Проверьте правильность адреса или вернитесь в главное меню.
      </p>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="btn-crimson flex items-center gap-2 py-3 px-6 text-xs font-semibold uppercase tracking-wider shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>На главную</span>
        </Link>
        <Link
          to="/navigation"
          className="btn-crimson-outline flex items-center gap-2 py-3 px-6 text-xs font-semibold uppercase tracking-wider"
        >
          <Compass className="w-4 h-4" />
          <span>3D Навигация</span>
        </Link>
        <Link
          to="/help"
          className="px-5 py-3 rounded-full bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
        >
          <HelpCircle className="w-4 h-4 text-stone-500" />
          <span>Служба помощи</span>
        </Link>
      </div>

      {/* Traceback info */}
      <div className="mt-12 p-4 rounded-xl bg-white border border-stone-200 w-full text-left font-sans text-xs text-stone-500 shadow-sm space-y-1">
        <p className="font-semibold text-stone-700">Сведения маршрутизатора:</p>
        <p>Маршрут: {window.location.pathname}</p>
        <p>Код ответа: HTTP 404 (Resource Not Found)</p>
      </div>
    </div>
  );
};
