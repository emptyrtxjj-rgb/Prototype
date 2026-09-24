import React, { useState, useEffect } from 'react';
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
  Sparkles,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

export const AnnouncementsPage: React.FC = () => {
  const { language, addToast } = useApp();
  const isKk = language === 'kk';

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

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

  const handleSaveReminder = (id: string, title: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        addToast(
          isKk ? 'Күнтізбеден өшірілді' : 'Удалено из календаря',
          title,
          'info'
        );
      } else {
        next.add(id);
        addToast(
          isKk ? 'Күнтізбеге қосылды' : 'Добавлено в личный календарь',
          isKk ? `«${title}» туралы хабарлама қосылды` : `Напоминание о «${title}» сохранено`,
          'success'
        );
      }
      return next;
    });
  };

  const categories = [
    { id: 'all', label: isKk ? 'Барлығы' : 'Все' },
    { id: 'academic', label: isKk ? 'Академиялық' : 'Академические' },
    { id: 'olympiad', label: isKk ? 'Олимпиада' : 'Олимпиады' },
    { id: 'event', label: isKk ? 'Іс-шаралар' : 'Мероприятия' },
    { id: 'admin', label: isKk ? 'Әкімшілік' : 'Административные' },
  ];

  return (
    <div className="space-y-8 pb-16 animate-academic-fade max-w-7xl mx-auto">
      {/* Title */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#7A1526]/10 text-[#7A1526] border border-[#7A1526]/20 flex items-center justify-center">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-pixel text-[9px] text-[#7A1526] uppercase">
                NATIONAL ANNOUNCEMENT DISPATCH
              </span>
            </div>
            <h1 className="font-climate text-2xl sm:text-3xl text-[#1C1F23] tracking-wide uppercase">
              {isKk ? 'Мектеп хабарландырулары & Оқиғалар' : 'Школьные объявления и события'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-serif">
              {isKk
                ? 'Академиялық, мәдени және спорттық іс-шаралардың бірыңғай күнтізбесі.'
                : 'Единый календарь академических событий, предметных олимпиад и лицейских мероприятий.'}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="academic-card p-4 sm:p-6 space-y-4 bg-white border border-stone-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={isKk ? 'Хабарландыруларды іздеу...' : 'Поиск по объявлениям...'}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-stone-300 text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-[#7A1526] transition-colors font-sans"
            />
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#7A1526] text-white shadow-sm'
                  : 'bg-[#FAF8F5] text-stone-700 hover:bg-stone-200 border border-stone-200'
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
          <div className="p-8 text-center text-stone-400 text-xs font-mono">
            {isKk ? 'Хабарландырулар жүктелуде...' : 'Загрузка объявлений...'}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-stone-200 text-stone-500 text-xs font-mono">
            {isKk ? 'Сұранысыңыз бойынша ешқандай хабарландыру табылмады.' : 'Объявлений по вашему запросу не найдено.'}
          </div>
        ) : (
          filtered.map(item => {
            const isSaved = savedIds.has(item.id);
            const priorityBadge = item.priority === 'high'
              ? 'bg-[#7A1526] text-white'
              : item.priority === 'medium'
              ? 'bg-amber-100 text-amber-800 border-amber-200'
              : 'bg-stone-100 text-stone-700 border-stone-200';

            return (
              <div
                key={item.id}
                className="academic-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-stone-200"
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

                  <p className="text-xs text-stone-600 leading-relaxed max-w-3xl font-serif">
                    {item.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => handleSaveReminder(item.id, item.title)}
                    className={`text-xs py-2 px-4 rounded-xl border flex items-center gap-1.5 transition-all font-serif font-semibold ${
                      isSaved
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-[#FAF8F5] text-[#7A1526] border-stone-300 hover:border-[#7A1526]'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-emerald-700' : ''}`} />
                    <span>{isSaved ? (isKk ? 'Күнтізбеде ✓' : 'В календаре ✓') : (isKk ? 'Күнтізбеге қосу' : 'В календарь')}</span>
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
