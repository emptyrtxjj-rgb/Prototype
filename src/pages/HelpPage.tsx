import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LifeBuoy, 
  Search, 
  MapPin, 
  ArrowRight, 
  PhoneCall, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  HeartPulse, 
  Smile, 
  Compass, 
  Building, 
  CreditCard, 
  FileQuestion,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { classifyHelpRequest } from '../services/helpService';
import { AcademicCrest } from '../components/common/AcademicCrest';

export const HelpPage: React.FC = () => {
  const { setSelectedRoomForNav, setEmergencyOpen, addToast, language } = useApp();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  // Suggested preset questions for instant demo
  const presets = [
    { label: 'Забыл пропуск в школу', query: 'Забыл пластиковую карточку-пропуск дома, как зайти в школу?' },
    { label: 'Болит голова на уроке', query: 'Сильно болит голова и кружится, куда пойти за таблеткой?' },
    { label: 'Конфликт с одноклассником', query: 'Буллинг и конфликтная ситуация в классе, нужна конфиденциальная беседа' },
    { label: 'Потерял рюкзак в столовой', query: 'Оставил синий рюкзак в столовой во время большой перемены' },
    { label: 'Олимпиада по физике', query: 'Хочу подать заявку на республиканскую олимпиаду по физике и математике' },
    { label: 'Не работает школьный Wi-Fi', query: 'Не могу подключиться к EduNet KZ со школьного планшета' }
  ];

  const handleSearch = async (textToSearch?: string) => {
    const q = textToSearch !== undefined ? textToSearch : query;
    if (!q.trim()) return;

    setLoading(true);
    try {
      const res = await classifyHelpRequest(q);
      setResult(res);
      addToast('Ситуация определена', `Рекомендовано обратиться: ${res.recommendedDepartment}`, 'info');
    } catch {
      addToast('Ошибка запроса', 'Не удалось классифицировать ситуацию', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToRoom = (roomNumber: string) => {
    setSelectedRoomForNav(roomNumber);
    navigate('/navigation');
    addToast('Навигатор запущен', `Проложен маршрут до кабинета ${roomNumber}`, 'success');
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16 max-w-7xl mx-auto">
      {/* Top Academic Banner */}
      <div className="bg-white border border-stone-200 rounded-[24px] p-8 sm:p-10 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A1526]/10 border border-[#7A1526]/20 text-[#7A1526] text-xs font-semibold uppercase tracking-wider">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Student Support & Advisory Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Служба помощи «Куда обратиться?»
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
            Интеллектуальный классификатор школьных жизненных ситуаций. Опишите свой вопрос или проблему в свободной форме — система мгновенно определит ответственный департамент, регламент действий и проложит 3D маршрут к кабинету.
          </p>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <button
            onClick={() => setEmergencyOpen(true)}
            className="btn-crimson flex items-center justify-center gap-2 py-3 px-6 text-xs font-semibold uppercase tracking-wider shadow-md"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>Экстренная связь (SOS 111)</span>
          </button>
          <span className="text-[11px] text-center text-stone-500 font-sans">
            Круглосуточно • Конфиденциально
          </span>
        </div>
      </div>

      {/* Main Search Bar Card */}
      <div className="academic-card bg-white space-y-5">
        <label className="block text-base font-serif font-bold text-stone-900">
          Опишите возникшую проблему или вопрос:
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Например: Потерял пропуск, болит голова, сломался шкафчик, хочу на олимпиаду..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#7A1526] focus:ring-1 focus:ring-[#7A1526] transition-all font-sans"
            />
          </div>
          <button
            onClick={() => handleSearch()}
            disabled={loading || !query.trim()}
            className="btn-crimson py-3.5 px-7 text-xs font-semibold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>Найти решение</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2 pt-2 border-t border-stone-200">
          <span className="text-xs text-stone-500 font-sans">Частые ситуации для быстрого тестирования:</span>
          <div className="flex flex-wrap gap-2 pt-1">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(preset.query);
                  handleSearch(preset.query);
                }}
                className="px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-stone-200 hover:border-[#7A1526]/50 hover:bg-stone-100 text-xs text-stone-700 transition-all font-sans"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div className="academic-card bg-gradient-to-br from-white via-[#FAF8F5] to-amber-50/20 border-2 border-[#C5A059]/40 space-y-6 animate-fade-in shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-stone-200 pb-5">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7A1526] block">
                Рекомендованное подразделение
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                {result.recommendedDepartment}
              </h2>
              <p className="text-xs text-stone-600 font-sans">
                Ответственное лицо: <span className="font-semibold text-stone-900">{result.responsiblePerson}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-stone-200 text-center shadow-sm">
                <span className="text-[10px] text-stone-500 block uppercase tracking-wider font-sans">Кабинет</span>
                <span className="text-xl font-serif font-bold text-[#7A1526]">№ {result.roomNumber}</span>
              </div>
              <button
                onClick={() => handleNavigateToRoom(result.roomNumber)}
                className="btn-crimson flex items-center gap-2 py-3 px-5 text-xs font-semibold uppercase tracking-wider shadow-sm"
              >
                <Compass className="w-4 h-4" />
                <span>Маршрут в 3D</span>
              </button>
            </div>
          </div>

          {/* Action Steps */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-stone-900">
              Пошаговый регламент действий:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.actionSteps && result.actionSteps.map((step: string, idx: number) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-stone-200 space-y-2 relative shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#7A1526]/10 text-[#7A1526] flex items-center justify-center text-xs font-serif font-bold">
                      {idx + 1}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed pt-1 font-sans">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs shadow-sm font-sans">
              <span className="text-stone-500 block text-[11px]">График приема:</span>
              <span className="text-stone-900 font-semibold">{result.workingHours || '08:00 – 17:30 (Пн–Пт)'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs shadow-sm font-sans">
              <span className="text-stone-500 block text-[11px]">Внутренний телефон:</span>
              <span className="text-[#7A1526] font-semibold">{result.internalPhone || 'доб. 104'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs shadow-sm font-sans">
              <span className="text-stone-500 block text-[11px]">Срок решения:</span>
              <span className="text-emerald-700 font-semibold">{result.resolutionTime || 'Немедленно (в день обращения)'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Directory of School Departments */}
      <div className="academic-card bg-white space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <span className="text-xs font-semibold text-[#7A1526] uppercase tracking-wider block">
            Справочная структура
          </span>
          <h3 className="font-serif font-bold text-2xl text-stone-900 mt-1">
            Ключевые службы и кабинеты лицея
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3 hover:border-stone-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-xs font-serif font-bold text-[#7A1526]">Каб. 102 (1 эт.)</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-base">Медицинский пункт</h4>
              <p className="text-xs text-stone-600 mt-1 font-sans leading-relaxed">
                Первая доврачебная помощь, вакцинация, освобождение от уроков и контроль здоровья.
              </p>
            </div>
            <button
              onClick={() => handleNavigateToRoom('102')}
              className="text-xs text-[#7A1526] hover:underline flex items-center gap-1 font-semibold pt-1 font-sans"
            >
              <span>Открыть в 3D навигаторе</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3 hover:border-stone-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Smile className="w-5 h-5" />
              </div>
              <span className="text-xs font-serif font-bold text-[#7A1526]">Каб. 215 (2 эт.)</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-base">Психологическая служба</h4>
              <p className="text-xs text-stone-600 mt-1 font-sans leading-relaxed">
                Конфиденциальные консультации, психологическая разгрузка, поддержка перед олимпиадами.
              </p>
            </div>
            <button
              onClick={() => handleNavigateToRoom('215')}
              className="text-xs text-[#7A1526] hover:underline flex items-center gap-1 font-semibold pt-1 font-sans"
            >
              <span>Открыть в 3D навигаторе</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3 hover:border-stone-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                <Building className="w-5 h-5" />
              </div>
              <span className="text-xs font-serif font-bold text-[#7A1526]">Каб. 201 (2 эт.)</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-base">Канцелярия & Дирекция</h4>
              <p className="text-xs text-stone-600 mt-1 font-sans leading-relaxed">
                Официальные заявления, справки об обучении, перевод между классами и прием родителей.
              </p>
            </div>
            <button
              onClick={() => handleNavigateToRoom('201')}
              className="text-xs text-[#7A1526] hover:underline flex items-center gap-1 font-semibold pt-1 font-sans"
            >
              <span>Открыть в 3D навигаторе</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3 hover:border-stone-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-xs font-serif font-bold text-[#7A1526]">Каб. 101 (1 эт.)</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-base">Служба безопасности</h4>
              <p className="text-xs text-stone-600 mt-1 font-sans leading-relaxed">
                Восстановление RFID-пропусков, бюро находок, контроль периметра и видеонаблюдение.
              </p>
            </div>
            <button
              onClick={() => handleNavigateToRoom('101')}
              className="text-xs text-[#7A1526] hover:underline flex items-center gap-1 font-semibold pt-1 font-sans"
            >
              <span>Открыть в 3D навигаторе</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3 hover:border-stone-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                <FileQuestion className="w-5 h-5" />
              </div>
              <span className="text-xs font-serif font-bold text-[#7A1526]">Каб. 301 (3 эт.)</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-base">IT Центр & Цифровая поддержка</h4>
              <p className="text-xs text-stone-600 mt-1 font-sans leading-relaxed">
                Доступ к Mektep Hub, Kundelik KZ, школьный Wi-Fi, обслуживание лицейских планшетов.
              </p>
            </div>
            <button
              onClick={() => handleNavigateToRoom('301')}
              className="text-xs text-[#7A1526] hover:underline flex items-center gap-1 font-semibold pt-1 font-sans"
            >
              <span>Открыть в 3D навигаторе</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3 hover:border-stone-300 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xs font-serif font-bold text-[#7A1526]">Каб. 105 (1 эт.)</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-base">Школьная столовая & Питание</h4>
              <p className="text-xs text-stone-600 mt-1 font-sans leading-relaxed">
                Система безналичной оплаты питания, диетическое меню и родительский контроль.
              </p>
            </div>
            <button
              onClick={() => handleNavigateToRoom('105')}
              className="text-xs text-[#7A1526] hover:underline flex items-center gap-1 font-semibold pt-1 font-sans"
            >
              <span>Открыть в 3D навигаторе</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
