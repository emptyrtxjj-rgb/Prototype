import React, { useState } from 'react';
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
  Building, 
  CreditCard, 
  FileQuestion,
  HelpCircle,
  GraduationCap,
  Send,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { classifyHelpRequest } from '../services/helpService';
import { AcademicCrest } from '../components/common/AcademicCrest';

export const HelpPage: React.FC = () => {
  const { setEmergencyOpen, addToast, language } = useApp();
  const isKk = language === 'kk';

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [onlineAppealSent, setOnlineAppealSent] = useState(false);

  // Suggested preset questions for instant demo
  const presetsKk = [
    { label: 'Мектепке өткізгішті (ID) ұмыттым', query: 'Мектепке кіру карточкамды үйде ұмытып кеттім, қалай кіремін?' },
    { label: 'Сабақта басым ауырып тұр', query: 'Басым қатты ауырып, қызуым көтерілді, қайда баруым керек?' },
    { label: 'Сыныптағы кикілжің мен буллинг', query: 'Сыныптастарыммен кикілжің туындады, құпия кеңес қажет' },
    { label: 'Асханада сөмкемді жоғалттым', query: 'Үлкен үзіліс кезінде көк түсті сөмкемді асханада қалдырып кеттім' },
    { label: 'Физика олимпиадасына қатысу', query: 'Республикалық физика олимпиадасына қалай тіркелуге болады?' },
    { label: 'Мектептің Wi-Fi желісі қосылмайды', query: 'Планшеттен EduNet KZ мектеп желісіне қосыла алмай жатырмын' }
  ];

  const presetsRu = [
    { label: 'Забыл пропуск в школу', query: 'Забыл пластиковую карточку-пропуск дома, как зайти в школу?' },
    { label: 'Болит голова на уроке', query: 'Сильно болит голова и кружится, куда пойти за таблеткой?' },
    { label: 'Конфликт с одноклассником', query: 'Буллинг и конфликтная ситуация в классе, нужна конфиденциальная беседа' },
    { label: 'Потерял рюкзак в столовой', query: 'Оставил синий рюкзак в столовой во время большой перемены' },
    { label: 'Олимпиада по физике', query: 'Хочу подать заявку на республиканскую олимпиаду по физике и математике' },
    { label: 'Не работает школьный Wi-Fi', query: 'Не могу подключиться к EduNet KZ со школьного планшета' }
  ];

  const presets = isKk ? presetsKk : presetsRu;

  const handleSearch = async (textToSearch?: string) => {
    const q = textToSearch !== undefined ? textToSearch : query;
    if (!q.trim()) return;

    setLoading(true);
    setOnlineAppealSent(false);
    try {
      const res = await classifyHelpRequest(q);
      setResult(res);
      addToast(
        isKk ? 'Жағдай анықталды' : 'Ситуация определена',
        isKk ? `Жүгіну орны: ${res.recommendedDepartment}` : `Рекомендовано обратиться: ${res.recommendedDepartment}`,
        'info'
      );
    } catch {
      addToast(
        isKk ? 'Сұрау қатесі' : 'Ошибка запроса',
        isKk ? 'Жағдайды сараптау мүмкін болмады' : 'Не удалось классифицировать ситуацию',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendOnlineAppeal = () => {
    setOnlineAppealSent(true);
    addToast(
      isKk ? 'Электронды өтініш тіркелді' : 'Электронное обращение зарегистрировано',
      isKk ? '№AP-2026-912 өтінімі жауапты маманға жолданды' : 'Заявка №AP-2026-912 передана ответственному лицу',
      'success'
    );
  };

  return (
    <div className="space-y-8 animate-academic-fade pb-16 max-w-7xl mx-auto">
      {/* Top Academic Banner */}
      <div className="bg-white border border-stone-200 rounded-[24px] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7A1526] animate-pulse" />
            <span className="font-pixel text-[9px] text-[#7A1526] uppercase tracking-wider bg-[#7A1526]/10 px-2.5 py-1 rounded-full border border-[#7A1526]/20">
              STUDENT ADVISORY & SUPPORT • SMART DESK KZ
            </span>
          </div>

          <h1 className="font-climate text-2xl sm:text-4xl text-[#1C1F23] tracking-wide uppercase">
            {isKk ? '«Қайда жүгіну керек?» сервисі' : 'Служба помощи «Куда обратиться?»'}
          </h1>

          <p className="text-stone-600 text-xs sm:text-sm font-serif leading-relaxed">
            {isKk
              ? 'Мектептегі кез келген мәселе немесе сұрақты еркін түрде сипаттаңыз — жүйе лезде жауапты бөлімді, нақты регламентті және электронды өтініш беру тәсілін көрсетеді.'
              : 'Интеллектуальный классификатор школьных жизненных ситуаций. Опишите вопрос в свободной форме — система мгновенно определит кабинет, телефон и регламент.'}
          </p>
        </div>

        <div className="flex flex-col gap-2 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setEmergencyOpen(true)}
            className="btn-crimson flex items-center justify-center gap-2 py-3 px-6 text-xs font-semibold uppercase tracking-wider shadow-md font-serif"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>{isKk ? 'Шұғыл байланыс (SOS 111)' : 'Экстренная связь (SOS 111)'}</span>
          </button>
          <span className="text-[11px] text-center text-stone-500 font-mono">
            {isKk ? 'Тәулік бойы • Құпия сақталады' : 'Круглосуточно • Конфиденциально'}
          </span>
        </div>
      </div>

      {/* Main Search Bar Card */}
      <div className="academic-card bg-white p-6 sm:p-8 space-y-5 border border-stone-200">
        <label className="block text-base font-serif font-bold text-stone-900">
          {isKk ? 'Туындаған мәселе немесе сұрағыңызды жазыңыз:' : 'Опишите возникшую проблему или вопрос:'}
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder={
                isKk
                  ? 'Мысалы: Өткізгіш карточкам үйде қалды, басым ауырып тұр, олимпиадаға жазылғым келеді...'
                  : 'Например: Забыл пропуск, болит голова, хочу подать на олимпиаду...'
              }
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#FAF8F5] border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#7A1526] transition-all font-sans"
            />
          </div>
          <button
            onClick={() => handleSearch()}
            disabled={loading || !query.trim()}
            className="btn-crimson py-3.5 px-7 text-xs font-semibold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0 font-serif"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{isKk ? 'Шешімін табу' : 'Найти решение'}</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2 pt-2 border-t border-stone-200">
          <span className="text-xs text-stone-500 font-mono">
            {isKk ? 'Жиі кездесетін жағдайлар:' : 'Частые ситуации для быстрого тестирования:'}
          </span>
          <div className="flex flex-wrap gap-2 pt-1">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(preset.query);
                  handleSearch(preset.query);
                }}
                className="px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-stone-300 hover:border-[#7A1526] hover:bg-stone-100 text-xs text-stone-800 transition-all font-mono"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div className="academic-card bg-gradient-to-br from-white via-[#FAF8F5] to-amber-50/20 border-2 border-[#C5A059]/40 p-6 sm:p-8 space-y-6 animate-academic-fade shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-stone-200 pb-5">
            <div className="space-y-1">
              <span className="font-pixel text-[8px] uppercase tracking-wider text-[#7A1526] block">
                {isKk ? 'ЖАУАПТЫ БӨЛІМ' : 'РЕКОМЕНДОВАННОЕ ПОДРАЗДЕЛЕНИЕ'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-climate text-stone-900 uppercase">
                {result.recommendedDepartment}
              </h2>
              <p className="text-xs text-stone-600 font-serif">
                {isKk ? 'Жауапты маман:' : 'Ответственное лицо:'} <span className="font-semibold text-stone-900">{result.responsiblePerson}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-stone-200 text-center shadow-sm">
                <span className="text-[10px] text-stone-500 block uppercase tracking-wider font-mono">{isKk ? 'Кабинет' : 'Кабинет'}</span>
                <span className="text-xl font-climate text-[#7A1526]">№ {result.roomNumber}</span>
              </div>
              <button
                onClick={handleSendOnlineAppeal}
                className="btn-crimson flex items-center gap-2 py-3 px-5 text-xs font-semibold uppercase tracking-wider shadow-sm font-serif"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{onlineAppealSent ? (isKk ? 'Өтініш жіберілді ✓' : 'Обращение отправлено ✓') : (isKk ? 'Онлайн өтініш беру' : 'Подать онлайн-обращение')}</span>
              </button>
            </div>
          </div>

          {/* Action Steps */}
          <div className="space-y-3 font-serif">
            <h4 className="font-bold text-base text-stone-900">
              {isKk ? 'Нақты әрекет ету қадамдары:' : 'Пошаговый регламент действий:'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.actionSteps && result.actionSteps.map((step: string, idx: number) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-stone-200 space-y-2 relative shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#7A1526]/10 text-[#7A1526] flex items-center justify-center text-xs font-mono font-bold">
                      {idx + 1}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-sm">
              <span className="text-stone-500 block text-[11px]">{isKk ? 'Қабылдау кестесі:' : 'График приема:'}</span>
              <span className="text-stone-900 font-semibold">{result.workingHours || '08:00 – 17:30 (Дүйсенбі–Жұма)'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-sm">
              <span className="text-stone-500 block text-[11px]">{isKk ? 'Ішкі телефон:' : 'Внутренний телефон:'}</span>
              <span className="text-[#7A1526] font-semibold">{result.internalPhone || 'доб. 104'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-sm">
              <span className="text-stone-500 block text-[11px]">{isKk ? 'Шешілу мерзімі:' : 'Срок решения:'}</span>
              <span className="text-emerald-700 font-semibold">{result.resolutionTime || (isKk ? 'Шұғыл (өтініш берілген күні)' : 'Немедленно (в день обращения)')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Directory of School Departments */}
      <div className="academic-card bg-white p-6 sm:p-8 space-y-6 border border-stone-200">
        <div className="border-b border-stone-200 pb-4">
          <span className="font-pixel text-[8px] text-[#7A1526] uppercase tracking-wider block">
            {isKk ? 'МЕКТЕП ҚҰРЫЛЫМЫ // АНЫҚТАМАЛЫҚ' : 'СТРУКТУРА ШКОЛЫ // СПРАВОЧНИК'}
          </span>
          <h3 className="font-climate text-xl sm:text-2xl text-stone-900 mt-1 uppercase">
            {isKk ? 'Негізгі қызметтер мен бөлімдер' : 'Ключевые службы и кабинеты'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Medical */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-[#7A1526]">{isKk ? 'Каб. 102 (1-қабат)' : 'Каб. 102 (1 эт.)'}</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-base">{isKk ? 'Медициналық пункт' : 'Медицинский пункт'}</h4>
              <p className="text-xs text-stone-600 mt-1 font-serif leading-relaxed">
                {isKk ? 'Алғашқы көмек, екпе жұмыстары, сабақтан босату анықтамалары.' : 'Первая помощь, вакцинация, освобождение от уроков и контроль здоровья.'}
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 font-semibold block">{isKk ? 'Ішкі тел: 102' : 'Внутр. тел: 102'}</span>
          </div>

          {/* Psychology */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Smile className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-[#7A1526]">{isKk ? 'Каб. 215 (2-қабат)' : 'Каб. 215 (2 эт.)'}</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-base">{isKk ? 'Психологиялық қолдау' : 'Психологическая служба'}</h4>
              <p className="text-xs text-stone-600 mt-1 font-serif leading-relaxed">
                {isKk ? 'Құпия кеңес, олимпиада алдындағы стрессті жеңілдету, сенімді орта.' : 'Конфиденциальные консультации, психологическая разгрузка, поддержка.'}
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 font-semibold block">{isKk ? 'Ішкі тел: 215' : 'Внутр. тел: 215'}</span>
          </div>

          {/* Reception */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                <Building className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-[#7A1526]">{isKk ? 'Каб. 201 (2-қабат)' : 'Каб. 201 (2 эт.)'}</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-base">{isKk ? 'Кеңсе & Дирекция' : 'Канцелярия & Дирекция'}</h4>
              <p className="text-xs text-stone-600 mt-1 font-serif leading-relaxed">
                {isKk ? 'Ресми анықтамалар, мектепке қабылдау құжаттары, өтініштер қабылдау.' : 'Официальные заявления, справки об обучении, перевод между классами.'}
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 font-semibold block">{isKk ? 'Ішкі тел: 201' : 'Внутр. тел: 201'}</span>
          </div>

          {/* Security */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-[#7A1526]">{isKk ? 'Каб. 101 (1-қабат)' : 'Каб. 101 (1 эт.)'}</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-base">{isKk ? 'Қауіпсіздік & Өткізу қызметі' : 'Служба безопасности'}</h4>
              <p className="text-xs text-stone-600 mt-1 font-serif leading-relaxed">
                {isKk ? 'Жоғалған RFID карточкаларын қалпына келтіру, бақылау камералары.' : 'Восстановление RFID-пропусков, бюро находок, контроль периметра.'}
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 font-semibold block">{isKk ? 'Ішкі тел: 101' : 'Внутр. тел: 101'}</span>
          </div>

          {/* IT Center */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                <FileQuestion className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-[#7A1526]">{isKk ? 'Каб. 301 (3-қабат)' : 'Каб. 301 (3 эт.)'}</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-base">{isKk ? 'IT Орталық & Цифрлық қолдау' : 'IT Центр & Цифровая поддержка'}</h4>
              <p className="text-xs text-stone-600 mt-1 font-serif leading-relaxed">
                {isKk ? 'Kundelik 2.0 аккаунттары, мектептік Wi-Fi және планшеттерді баптау.' : 'Доступ к Mektep Hub, Kundelik KZ, школьный Wi-Fi, обслуживание планшетов.'}
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 font-semibold block">{isKk ? 'Ішкі тел: 301' : 'Внутр. тел: 301'}</span>
          </div>

          {/* Canteen */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-[#7A1526]">{isKk ? 'Каб. 105 (1-қабат)' : 'Каб. 105 (1 эт.)'}</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-base">{isKk ? 'Мектеп асханасы & Тамақтану' : 'Школьная столовая & Питание'}</h4>
              <p className="text-xs text-stone-600 mt-1 font-serif leading-relaxed">
                {isKk ? 'Қолма-қол ақшасыз төлем карталары, ыстық тамақ мәзірі.' : 'Система безналичной оплаты питания, диетическое меню и контроль.'}
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 font-semibold block">{isKk ? 'Ішкі тел: 105' : 'Внутр. тел: 105'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
