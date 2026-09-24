import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { announcementService, AnnouncementItem } from '../services/announcementService';
import { 
  Megaphone, 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Filter, 
  Tag, 
  Sparkles 
} from 'lucide-react';

export const AnnouncementsPage: React.FC = () => {
  const { setSelectedRoomForNav } = useApp();
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    announcementService.getAnnouncements().then((data: AnnouncementItem[]) => {
      setAnnouncements(data);
      setIsLoading(false);
    });
  }, []);

  const filtered = announcements.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleRouteToRoom = (roomNum: string) => {
    setSelectedRoomForNav(roomNum);
    navigate('/navigation');
  };

  return (
    <div className="space-y-8 pb-16 animate-academic-fade">
      {/* Title */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#7A1526]/10 text-[#7A1526] border border-[#7A1526]/20 flex items-center justify-center">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1F23]">
              Мектеп хабарландырулары & Оқиғалар
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              Академиялық, мәдени және спорттық іс-шаралардың бірыңғай күнтізбесі.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Іздеу: атауы, сипаттамасы немесе орны бойынша..."
            className="w-full bg-[#FAF8F5] text-stone-800 placeholder-stone-400 border border-stone-300 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#7A1526] font-mono"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
          {[
            { id: 'all', label: 'Барлығы' },
            { id: 'academic', label: 'Олимпиада' },
            { id: 'health', label: 'Денсаулық' },
            { id: 'eco', label: 'Экология' },
            { id: 'tech', label: 'IT & AI' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${
                selectedCategory === cat.id
                  ? 'bg-[#7A1526] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Events List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="p-8 text-center text-stone-400 text-xs font-mono">Хабарландырулар жүктелуде...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-stone-200 text-stone-500 text-xs font-mono">
            Сұранысыңыз бойынша ешқандай хабарландыру табылмады.
          </div>
        ) : (
          filtered.map(item => {
            const priorityBadge = item.priority === 'high'
              ? 'bg-[#7A1526] text-white'
              : item.priority === 'medium'
              ? 'bg-amber-100 text-amber-800 border-amber-200'
              : 'bg-stone-100 text-stone-700 border-stone-200';

            return (
              <div
                key={item.id}
                className="academic-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-[#FAF8F5] text-[#7A1526] font-mono font-bold text-xs border border-stone-200">
                      📅 {item.date} • {item.time}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${priorityBadge}`}>
                      {item.priority.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-stone-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#7A1526]" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#1C1F23]">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">
                    {item.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => handleRouteToRoom(item.roomNumber)}
                    className="btn-crimson-outline text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    <span>3D Маршрут</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
