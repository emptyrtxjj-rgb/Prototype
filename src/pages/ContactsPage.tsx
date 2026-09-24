import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  PhoneCall,
  User,
  MessageSquare,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AcademicCrest } from '../components/common/AcademicCrest';

export const ContactsPage: React.FC = () => {
  const { language, addToast, setEmergencyOpen } = useApp();
  const isKk = language === 'kk';

  const [formData, setFormData] = useState({
    name: '',
    role: 'student',
    email: '',
    category: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      addToast(
        isKk ? 'Жіберу қатесі' : 'Ошибка отправки',
        isKk ? 'Міндетті өрістерді толтырыңыз: аты-жөні және өтініш мәтіні' : 'Пожалуйста, заполните обязательные поля: имя и обращение',
        'error'
      );
      return;
    }

    setSubmitted(true);
    addToast(
      isKk ? 'Өтініш тіркелді' : 'Обращение зарегистрировано',
      isKk ? 'Сіздің өтінішіңіз мектеп кеңсесіне жолданды. Тіркеу нөмірі: #APP-2026-894' : 'Ваше обращение передано в канцелярию лицея. Регистрационный номер: #APP-2026-894',
      'success'
    );
  };

  return (
    <div className="space-y-10 animate-academic-fade pb-16 max-w-6xl mx-auto">
      {/* Top Academic Banner */}
      <div className="bg-white border border-stone-200 rounded-[24px] p-8 sm:p-10 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A1526]/10 border border-[#7A1526]/20 text-[#7A1526] text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span className="font-pixel text-[8px]">
              {isKk ? 'ӘКІМШІЛІК КЕҢСЕ • РЕСМИ ҚАБЫЛДАУ' : 'ADMINISTRATIVE OFFICE & CAMPUS DIRECTORY'}
            </span>
          </div>

          <h1 className="font-climate text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-wide uppercase">
            {isKk ? 'Байланыс және Кері Байланыс' : 'Контакты и Обратная связь'}
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-serif">
            {isKk
              ? 'Мектеп әкімшілігінің, кеңсенің және жедел қызметтердің ресми байланыс нөмірлері. Оқушылар мен ата-аналарға арналған электронды өтініш беру порталы.'
              : 'Официальные контактные телефоны руководства школы, канцелярии и круглосуточных служб поддержки. Электронная подача обращений для родителей и учащихся.'}
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <AcademicCrest size={48} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: School Info & Directory */}
        <div className="lg:col-span-1 space-y-6">
          <div className="academic-card bg-white space-y-5 border border-stone-200">
            <h3 className="font-serif font-bold text-xl text-stone-900 border-b border-stone-200 pb-3">
              {isKk ? 'Мекенжай & Байланыс' : 'Адрес и реквизиты'}
            </h3>
            
            <div className="space-y-4 text-xs font-sans text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#7A1526] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900 text-sm">
                    {isKk ? '«№175 IT-Лицейі» КММ' : 'КГУ «IT-Лицей №175 Smart School»'}
                  </p>
                  <p className="text-stone-600 mt-0.5">
                    {isKk ? 'Алматы қ., Бостандық ауданы, Әл-Фараби даңғылы 71/24' : 'г. Алматы, Бостандыкский район, пр. Аль-Фараби 71/24'}
                  </p>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    {isKk ? 'Аялдама: «Әл-Фараби атындағы ҚазҰУ» (Автобустар: 38, 63, 86, 127)' : 'Остановка: «КазНУ им. аль-Фараби» (Автобусы: 38, 63, 86, 127)'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#7A1526] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900 text-sm">
                    {isKk ? 'Жұмыс кестесі:' : 'Режим работы:'}
                  </p>
                  <p className="text-stone-600 mt-0.5">
                    {isKk ? 'Оқу ғимараты: Дс–Сб 07:30 - 20:00' : 'Учебный корпус: Пн–Сб с 07:30 до 20:00'}
                  </p>
                  <p className="text-stone-600">
                    {isKk ? 'Кеңсе: Дс–Жм 08:30 - 18:00' : 'Канцелярия: Пн–Пт с 08:30 до 18:00'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#7A1526] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900 text-sm">
                    {isKk ? 'Директордың қабылдау бөлмесі:' : 'Приемная директора:'}
                  </p>
                  <p className="text-[#7A1526] font-semibold mt-0.5 font-mono">+7 (727) 388-10-00</p>
                  <p className="text-stone-600 font-mono">
                    {isKk ? 'Кеңсе:' : 'Канцелярия:'} +7 (727) 388-10-02
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#7A1526] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900 text-sm">
                    {isKk ? 'Электрондық пошта:' : 'Электронная почта:'}
                  </p>
                  <p className="text-[#7A1526] font-semibold mt-0.5 font-mono">info@smartschool.edu.kz</p>
                  <p className="text-stone-600 font-mono">support@smartschool.edu.kz</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200">
              <button
                onClick={() => setEmergencyOpen(true)}
                className="w-full btn-crimson-outline flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider font-serif"
              >
                <PhoneCall className="w-4 h-4 text-[#7A1526]" />
                <span>{isKk ? 'Шұғыл қызметтер (SOS 111 / 102)' : 'Экстренные службы (SOS 111 / 102)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Feedback & Application Form */}
        <div className="lg:col-span-2">
          <div className="academic-card bg-white space-y-6 border border-stone-200">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-mono font-semibold text-[#7A1526] uppercase tracking-wider block">
                {isKk ? 'ЭЛЕКТРОНДЫ ҚАБЫЛДАУ БӨЛІМІ' : 'ЭЛЕКТРОННАЯ ПРИЕМНАЯ'}
              </span>
              <h3 className="font-climate text-xl sm:text-2xl text-stone-900 mt-1 uppercase">
                {isKk ? 'Мектеп әкімшілігіне өтініш жолдау' : 'Обращение к администрации лицея'}
              </h3>
              <p className="text-xs text-stone-500 font-serif mt-1">
                {isKk
                  ? 'Барлық түскен өтініштер мектеп кеңсесінде ресми тіркеліп, 24 сағат ішінде қаралады.'
                  : 'Все поступившие обращения регистрируются в канцелярии школы и рассматриваются в течение 24 часов.'}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-stone-300 text-center space-y-4 animate-academic-fade">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-xl text-stone-900">
                  {isKk ? 'Өтініш сәтті жолданды!' : 'Обращение успешно отправлено!'}
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto font-serif leading-relaxed">
                  {isKk
                    ? <>Өтініштің тіркеу нөмірі: <span className="font-mono font-semibold text-[#7A1526]">#APP-2026-894</span>. Жауап көрсетілген электрондық поштаңызға жолданады және жеке кабинетте сақталады.</>
                    : <>Регистрационный номер заявки: <span className="font-mono font-semibold text-[#7A1526]">#APP-2026-894</span>. Ответ будет направлен на указанный электронный адрес, а также сохранен в личном кабинете.</>}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', role: 'student', email: '', category: 'general', message: '' });
                  }}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-stone-100 text-xs font-semibold text-stone-800 transition-all border border-stone-300 uppercase tracking-wider font-serif"
                >
                  {isKk ? 'Тағы бір өтініш жолдау' : 'Отправить еще одно обращение'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">
                      {isKk ? 'Өтініш берушінің аты-жөні *' : 'ФИО заявителя *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isKk ? "Ахметов Данияр" : "Иванов Данияр"}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#7A1526] focus:ring-1 focus:ring-[#7A1526]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">
                      {isKk ? 'Өтініш берушінің мәртебесі' : 'Статус заявителя'}
                    </label>
                    <select
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#7A1526] focus:ring-1 focus:ring-[#7A1526]"
                    >
                      <option value="student">{isKk ? 'Лицей оқушысы' : 'Учащийся лицея'}</option>
                      <option value="parent">{isKk ? 'Ата-ана / Заңды өкіл' : 'Родитель / Законный представитель'}</option>
                      <option value="teacher">{isKk ? 'Педагог / Қызметкер' : 'Педагог / Сотрудник'}</option>
                      <option value="guest">{isKk ? 'Қонақ / Түлек' : 'Гость / Абитуриент'}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">
                      {isKk ? 'Email немесе байланыс телефоны *' : 'Email или телефон для связи *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder={isKk ? "daniyar@example.kz немесе +7 777 000 0000" : "daniyar@example.kz или +7 777 000 0000"}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#7A1526] focus:ring-1 focus:ring-[#7A1526]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">
                      {isKk ? 'Өтініш тақырыбы' : 'Тема обращения'}
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#7A1526] focus:ring-1 focus:ring-[#7A1526]"
                    >
                      <option value="general">{isKk ? 'Жалпы сұрақтар мен ұсыныстар' : 'Общие вопросы и предложения'}</option>
                      <option value="academic">{isKk ? 'Оқу процесі және сабақ кестесі' : 'Учебный процесс и расписание'}</option>
                      <option value="cafeteria">{isKk ? 'Асхана және тамақтану сапасы' : 'Столовая и питание'}</option>
                      <option value="safety">{isKk ? 'Қауіпсіздік және кіру рұқсаты' : 'Безопасность и пропуска'}</option>
                      <option value="it">{isKk ? 'Порталдың техникалық қолдауы' : 'Техническая поддержка портала'}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    {isKk ? 'Өтініш мәтіні *' : 'Текст обращения *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder={isKk ? "Сұрағыңызды немесе ұсынысыңызды егжей-тегжейлі сипаттаңыз..." : "Подробно опишите суть вопроса или предложения..."}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#7A1526] focus:ring-1 focus:ring-[#7A1526]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-crimson flex items-center justify-center gap-2 py-3.5 px-8 text-xs font-semibold uppercase tracking-wider shadow-sm font-serif"
                >
                  <Send className="w-4 h-4" />
                  <span>{isKk ? 'Кеңсеге өтініш жіберу' : 'Отправить обращение в канцелярию'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
