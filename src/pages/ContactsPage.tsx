import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  PhoneCall,
  User,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AcademicCrest } from '../components/common/AcademicCrest';

export const ContactsPage: React.FC = () => {
  const { addToast, setEmergencyOpen } = useApp();

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
      addToast('Ошибка отправки', 'Пожалуйста, заполните обязательные поля: имя и обращение', 'error');
      return;
    }

    setSubmitted(true);
    addToast('Обращение зарегистрировано', 'Ваше обращение передано в канцелярию лицея. Регистрационный номер: #APP-2026-894', 'success');
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16 max-w-6xl mx-auto">
      {/* Top Academic Banner */}
      <div className="bg-white border border-stone-200 rounded-[24px] p-8 sm:p-10 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A1526]/10 border border-[#7A1526]/20 text-[#7A1526] text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Administrative Office & Campus Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Контакты и Обратная связь
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
            Официальные контактные телефоны руководства школы, канцелярии и круглосуточных служб поддержки. Электронная подача обращений для родителей и учащихся.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <AcademicCrest size="md" variant="crimson" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: School Info & Directory */}
        <div className="lg:col-span-1 space-y-6">
          <div className="academic-card bg-white space-y-5">
            <h3 className="font-serif font-bold text-xl text-stone-900 border-b border-stone-200 pb-3">
              Адрес и реквизиты
            </h3>
            
            <div className="space-y-4 text-xs font-sans text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#7A1526] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900 text-sm">КГУ «IT-Лицей №175 Smart School»</p>
                  <p className="text-stone-600 mt-0.5">г. Алматы, Бостандыкский район, пр. Аль-Фараби 71/24</p>
                  <p className="text-stone-500 text-[11px] mt-0.5">Остановка: «КазНУ им. аль-Фараби» (Автобусы: 38, 63, 86, 127)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#7A1526] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900 text-sm">Режим работы:</p>
                  <p className="text-stone-600 mt-0.5">Учебный корпус: Пн–Сб с 07:30 до 20:00</p>
                  <p className="text-stone-600">Канцелярия: Пн–Пт с 08:30 до 18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#7A1526] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900 text-sm">Приемная директора:</p>
                  <p className="text-[#7A1526] font-semibold mt-0.5">+7 (727) 388-10-00</p>
                  <p className="text-stone-600">Канцелярия: +7 (727) 388-10-02</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#7A1526] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900 text-sm">Электронная почта:</p>
                  <p className="text-[#7A1526] font-semibold mt-0.5">info@smartschool.edu.kz</p>
                  <p className="text-stone-600">support@smartschool.edu.kz</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200">
              <button
                onClick={() => setEmergencyOpen(true)}
                className="w-full btn-crimson-outline flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider"
              >
                <PhoneCall className="w-4 h-4 text-[#7A1526]" />
                <span>Экстренные службы (SOS 111 / 102)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Feedback & Application Form */}
        <div className="lg:col-span-2">
          <div className="academic-card bg-white space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-semibold text-[#7A1526] uppercase tracking-wider block">
                Электронная приемная
              </span>
              <h3 className="font-serif font-bold text-2xl text-stone-900 mt-1">
                Обращение к администрации лицея
              </h3>
              <p className="text-xs text-stone-500 font-sans mt-1">
                Все поступившие обращения регистрируются в канцелярии школы и рассматриваются в течение 24 часов.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-stone-300 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-xl text-stone-900">Обращение успешно отправлено!</h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto font-sans leading-relaxed">
                  Регистрационный номер заявки: <span className="font-semibold text-[#7A1526]">#APP-2026-894</span>. Ответ будет направлен на указанный электронный адрес, а также сохранен в личном кабинете.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', role: 'student', email: '', category: 'general', message: '' });
                  }}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-stone-100 text-xs font-semibold text-stone-800 transition-all border border-stone-300 uppercase tracking-wider font-sans"
                >
                  Отправить еще одно обращение
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">ФИО заявителя *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иванов Данияр"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#7A1526] focus:ring-1 focus:ring-[#7A1526]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">Статус заявителя</label>
                    <select
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#7A1526] focus:ring-1 focus:ring-[#7A1526]"
                    >
                      <option value="student">Учащийся лицея</option>
                      <option value="parent">Родитель / Законный представитель</option>
                      <option value="teacher">Педагог / Сотрудник</option>
                      <option value="guest">Гость / Абитуриент</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">Email или телефон для связи *</label>
                    <input
                      type="text"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="daniyar@example.kz или +7 777 000 0000"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#7A1526] focus:ring-1 focus:ring-[#7A1526]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">Тема обращения</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#7A1526] focus:ring-1 focus:ring-[#7A1526]"
                    >
                      <option value="general">Общие вопросы и предложения</option>
                      <option value="academic">Учебный процесс и расписание</option>
                      <option value="cafeteria">Столовая и питание</option>
                      <option value="safety">Безопасность и пропуска</option>
                      <option value="it">Техническая поддержка портала</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">Текст обращения *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Подробно опишите суть вопроса или предложения..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#7A1526] focus:ring-1 focus:ring-[#7A1526]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-crimson flex items-center justify-center gap-2 py-3 px-8 text-xs font-semibold uppercase tracking-wider shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Отправить обращение в канцелярию</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
