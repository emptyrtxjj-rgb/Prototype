import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Compass, 
  Calendar, 
  Sparkles, 
  Leaf, 
  Megaphone, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  BookOpen, 
  Award, 
  Users 
} from 'lucide-react';
import { announcementService, AnnouncementItem } from '../services/announcementService';

export const DashboardPage: React.FC = () => {
  const { ecoMetrics, setSelectedRoomForNav } = useApp();
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);

  useEffect(() => {
    announcementService.getAnnouncements().then((data: AnnouncementItem[]) => setAnnouncements(data.slice(0, 3)));
  }, []);

  const handleGoToRoom = (roomNum: string) => {
    setSelectedRoomForNav(roomNum);
    navigate('/navigation');
  };

  return (
    <div className="space-y-8 pb-16 animate-academic-fade">
      {/* Top Academic Greeting Banner */}
      <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7A1526] animate-pulse" />
            <span className="text-xs font-mono text-[#7A1526] font-bold uppercase tracking-wider bg-[#7A1526]/10 px-2.5 py-0.5 rounded-full border border-[#7A1526]/20">
              ЛИЦЕЙСКИЙ ПОРТАЛ • 11 «А» СЫНЫП
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1C1F23]">
            Қайырлы күн, Әмина! 👋
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Бүгінгі күнге: <strong className="text-[#7A1526] font-mono">3 сабақ</strong>, <strong className="text-stone-800 font-mono">1 үйірме</strong>, <strong className="text-emerald-700 font-mono">2 бос терезе</strong> жоспарланған.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/schedule"
            className="btn-crimson text-xs py-2.5 px-5"
          >
            <Calendar className="w-3.5 h-3.5 mr-1" />
            <span>Сабақ кестесі</span>
          </Link>
          <Link
            to="/navigation"
            className="btn-crimson-outline text-xs py-2.5 px-5"
          >
            <Compass className="w-3.5 h-3.5 mr-1" />
            <span>Кабинетті табу</span>
          </Link>
        </div>
      </div>

      {/* Grid of Key Personal Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Widget 1: Next Lesson */}
        <div className="academic-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <span className="text-xs font-mono font-bold text-[#7A1526] flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              КЕЛЕСІ САБАҚ
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              15 МИНУТТАН СОҢ
            </span>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold text-[#1C1F23]">
              Информатика & AI
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Мұғалім: Ибраев Самат Нұрбекұлы
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#7A1526]" />
              <span className="text-xs font-mono font-bold text-stone-800">Кабинет 315 (3-қабат)</span>
            </div>
            <button
              onClick={() => handleGoToRoom('315')}
              className="text-xs font-semibold text-[#7A1526] hover:underline flex items-center gap-1"
            >
              <span>3D Маршрут</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Widget 2: Today's Schedule Overview */}
        <div className="academic-card p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <span className="text-xs font-mono font-bold text-stone-700 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#7A1526]" />
              БҮГІНГІ САБАҚТАР
            </span>
            <Link to="/schedule" className="text-[11px] font-mono text-[#7A1526] hover:underline">
              Барлық күндер →
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="font-mono text-stone-500">08:30 - 09:15</span>
              <span className="font-semibold text-stone-800">Алгебра</span>
              <span className="text-emerald-700 font-mono font-semibold">Өтті ✓</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#7A1526]/10 border border-[#7A1526]/20 text-[#7A1526] font-semibold">
              <span className="font-mono">10:10 - 10:55</span>
              <span>Информатика & AI</span>
              <span className="font-mono">Каб. 315</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="font-mono text-stone-500">12:15 - 13:00</span>
              <span className="font-semibold text-stone-800">Дене шынықтыру</span>
              <span className="font-mono text-stone-500">Спортзал</span>
            </div>
          </div>
        </div>

        {/* Widget 3: Eco Impact & Certificates */}
        <div className="academic-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <span className="text-xs font-mono font-bold text-emerald-800 flex items-center gap-2">
              <Leaf className="w-3.5 h-3.5" />
              ЭКО-МОНИТОР KZ
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              +18% ҮНЕМДЕУ
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-xl font-mono font-bold text-emerald-700 block">
                {ecoMetrics.paperSheetsSaved.toLocaleString()}
              </span>
              <span className="text-[10px] text-stone-500">қағаз парағы</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200/80">
              <span className="text-xl font-mono font-bold text-[#7A1526] block">
                {ecoMetrics.treesSaved}
              </span>
              <span className="text-[10px] text-stone-500">ағаш сақталды</span>
            </div>
          </div>

          <Link
            to="/eco"
            className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold text-center block transition-colors"
          >
            Толық эко-есепті қарау →
          </Link>
        </div>
      </div>

      {/* Second Row: Latest Announcements + AI Mentor Shortcut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Announcements Timeline (2 cols) */}
        <div className="lg:col-span-2 academic-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[#7A1526]" />
              <h3 className="font-serif font-bold text-[#1C1F23] text-lg">
                Маңызды мектеп хабарландырулары
              </h3>
            </div>
            <Link to="/announcements" className="text-xs font-mono text-[#7A1526] hover:underline font-semibold">
              Барлық хабарландырулар →
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
                      📍 {ann.location}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#1C1F23]">
                    {ann.title}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-1">
                    {ann.description}
                  </p>
                </div>

                <button
                  onClick={() => handleGoToRoom(ann.roomNumber)}
                  className="shrink-0 text-xs font-mono text-[#7A1526] hover:underline flex items-center gap-1 self-end sm:self-center font-semibold"
                >
                  <span>3D Карта</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
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
                AI Академиялық Ментор
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Эссе тапсырасыз ба әлде IELTS-қа дайындаласыз ба? Жұмысыңызды жүктеп, грамматика, лексика және логикалық құрылымы бойынша лезде сараптама алыңыз.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-[11px] font-mono text-stone-700">
              🎯 Мақсатты балл: Band 7.0+ / 9.0
            </div>
            <Link
              to="/mentor"
              className="btn-crimson w-full text-xs font-semibold py-2.5 text-center block"
            >
              AI Менторды ашу →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
