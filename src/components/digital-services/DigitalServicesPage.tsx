import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { mockApi } from '../../services/mockApi';
import { LostItem, LostCategory } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input, Textarea, Select } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { Skeleton } from '../ui/Skeleton';
import { 
  FileBox, 
  Search, 
  Plus, 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode, 
  FileText, 
  Download, 
  Sparkles,
  HelpCircle,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';

const sampleImages = [
  'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e485?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?auto=format&fit=crop&w=600&q=80',
];

export const DigitalServicesPage: React.FC = () => {
  const { t, language, addToast, recordCertificateIssued } = useApp();

  const [activeTab, setActiveTab] = useState<'lost' | 'certificate'>('lost');
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Create Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    title: '',
    category: 'electronics' as LostCategory,
    description: '',
    locationFound: '',
    reporterName: '',
    reporterPhone: '',
    secretVerificationQuestion: '',
    imageUrl: sampleImages[0],
  });

  // Claim Modal state
  const [claimItem, setClaimItem] = useState<LostItem | null>(null);
  const [claimAnswer, setClaimAnswer] = useState<string>('');
  const [isClaiming, setIsClaiming] = useState<boolean>(false);

  // Certificate generator state
  const [studentName, setStudentName] = useState<string>('Сәрсенбай Әмина Нұрланқызы');
  const [gradeClass, setGradeClass] = useState<string>('11 «А» сыныбы');
  const [isGeneratingCert, setIsGeneratingCert] = useState<boolean>(false);
  const [generatedCert, setGeneratedCert] = useState<{ id: string; timestamp: string; qrUrl: string } | null>(null);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const data = await mockApi.getLostItems();
      setLostItems(data);
    } catch {
      addToast(language === 'kk' ? 'Деректерді жүктеу қатесі' : 'Ошибка загрузки', '', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Validation before creation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) errors.title = language === 'kk' ? 'Атауды енгізіңіз' : 'Введите название';
    if (!formData.description.trim()) errors.description = language === 'kk' ? 'Сипаттама жазыңыз' : 'Опишите вещь';
    if (!formData.locationFound.trim()) errors.locationFound = language === 'kk' ? 'Табылған орынды көрсетіңіз' : 'Укажите место';
    if (!formData.reporterName.trim()) errors.reporterName = language === 'kk' ? 'Атыңызды жазыңыз' : 'Укажите имя';
    if (!formData.reporterPhone.trim()) errors.reporterPhone = language === 'kk' ? 'Телефон нөмірін енгізіңіз' : 'Укажите телефон';
    if (!formData.secretVerificationQuestion.trim()) {
      errors.secretVerificationQuestion = language === 'kk' ? 'Секретті сұрақты жазыңыз' : 'Укажите секретный вопрос';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      addToast(
        language === 'kk' ? 'Барлық міндетті өрістерді толтырыңыз' : 'Заполните все обязательные поля',
        '',
        'warning'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await mockApi.createLostItem(formData);
      setLostItems(prev => [created, ...prev]);
      setIsCreateModalOpen(false);
      addToast(
        language === 'kk' ? 'Зат сәтті тіркелді!' : 'Вещь успешно зарегистрирована!',
        `${created.id} — ${created.title}`,
        'success'
      );
      // Reset form
      setFormData({
        title: '',
        category: 'electronics',
        description: '',
        locationFound: '',
        reporterName: '',
        reporterPhone: '',
        secretVerificationQuestion: '',
        imageUrl: sampleImages[0],
      });
    } catch {
      addToast(language === 'kk' ? 'Қате орын алды' : 'Ошибка сохранения', '', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClaimSubmit = async () => {
    if (!claimItem) return;
    setIsClaiming(true);
    try {
      await mockApi.claimLostItem(claimItem.id, claimAnswer);
      setLostItems(prev => prev.map(item => item.id === claimItem.id ? { ...item, status: 'claimed' } : item));
      setClaimItem(null);
      setClaimAnswer('');
      addToast(
        language === 'kk' ? 'Өтініш расталды!' : 'Запрос подтвержден!',
        language === 'kk' ? 'Затты 104-кабинеттен немесе кезекшіден алып кетуге болады.' : 'Вещь можно забрать на стойке дежурного.',
        'success'
      );
      try {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      } catch { /* noop */ }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error';
      addToast(language === 'kk' ? 'Растау қатесі' : 'Ошибка подтверждения', msg, 'error');
    } finally {
      setIsClaiming(false);
    }
  };

  // Certificate generation
  const handleGenerateCertificate = () => {
    setIsGeneratingCert(true);
    setTimeout(() => {
      const certId = `KZ-NOBD-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedCert({
        id: certId,
        timestamp: new Date().toLocaleDateString('kk-KZ'),
        qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://egov.kz/verify/${certId}`
      });
      recordCertificateIssued();
      setIsGeneratingCert(false);
      addToast(
        t.digitalServices.certReady,
        `${certId} • eGov деректер қорына қосылды`,
        'success'
      );
      try {
        confetti({ particleCount: 40, spread: 70, origin: { y: 0.7 } });
      } catch { /* noop */ }
    }, 900);
  };

  const filteredItems = lostItems.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.locationFound.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-2.5">
              <FileBox className="w-7 h-7 text-cyan-400" />
              {t.digitalServices.title}
            </h1>
            <Badge variant="cyan" size="sm">Gov Services Hub</Badge>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            {t.digitalServices.subtitle}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-dark-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('lost')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'lost'
                ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{t.digitalServices.tabLostFound}</span>
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'certificate'
                ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{t.digitalServices.tabCertificates}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LOST & FOUND REGISTRY */}
      {activeTab === 'lost' && (
        <div className="space-y-6 animate-fade-in">
          {/* Search, Filter & Report Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.digitalServices.searchPlaceholder}
                className="w-full bg-dark-900 text-slate-100 placeholder-slate-500 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsCreateModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              {t.digitalServices.reportItemBtn}
            </Button>
          </div>

          {/* Category Pills Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: t.digitalServices.catAll },
              { id: 'electronics', label: t.digitalServices.catElectronics },
              { id: 'clothes', label: t.digitalServices.catClothes },
              { id: 'documents', label: t.digitalServices.catDocs },
              { id: 'sports', label: t.digitalServices.catSports },
              { id: 'books', label: t.digitalServices.catBooks },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'bg-dark-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-64 w-full rounded-2xl" />)}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-16 text-center rounded-2xl bg-dark-900/50 border border-slate-800">
              <FileBox className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-300">{t.digitalServices.emptyTitle}</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">{t.digitalServices.emptyDesc}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map(item => {
                const isClaimed = item.status === 'claimed';

                return (
                  <Card key={item.id} className="flex flex-col justify-between">
                    <div>
                      {/* Image Preview Container */}
                      <div className="relative h-44 w-full overflow-hidden bg-dark-950 border-b border-slate-800">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="font-mono text-[10px] font-bold text-white bg-dark-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-slate-700">
                            {item.id}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge variant={isClaimed ? 'emerald' : 'amber'} size="sm" hasDot={!isClaimed}>
                            {isClaimed ? 'ТАБЫЛДЫ / ИЕСІ АЛДЫ' : 'ИЕСІ ТАБЫЛМАДЫ'}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2.5">
                        <h4 className="text-sm font-semibold text-slate-100 line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="space-y-1 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                          <p className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>{item.locationFound}</span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>{item.dateFound}</span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>{item.reporterName}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Button */}
                    <div className="p-4 pt-0">
                      {isClaimed ? (
                        <div className="w-full py-2 text-center text-xs font-mono text-emerald-400 bg-emerald-950/20 rounded-lg border border-emerald-500/30">
                          ✓ Зат заңды иесіне қайтарылды
                        </div>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full"
                          onClick={() => setClaimItem(item)}
                        >
                          {t.digitalServices.claimButton}
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DIGITAL CERTIFICATES (eGov Mektep) */}
      {activeTab === 'certificate' && (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
          <Card glow="cyan">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-cyan-300">{t.digitalServices.certTitle}</CardTitle>
                  <p className="text-xs text-slate-400">{t.digitalServices.certSub}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Оқушының толық аты-жөні (ФИО):"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                />
                <Input
                  label="Сыныбы мен тобы:"
                  value={gradeClass}
                  onChange={e => setGradeClass(e.target.value)}
                />
              </div>

              <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-slate-200">
                    Электронды цифрлық қолтаңба (ЭЦҚ) & QR-код
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    ҚР Білім министрлігі Ұлттық білім беру деректер қорымен (НОБД) синхрондалған
                  </p>
                </div>

                <Button
                  variant="primary"
                  isLoading={isGeneratingCert}
                  onClick={handleGenerateCertificate}
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  {t.digitalServices.generateCertBtn}
                </Button>
              </div>

              {/* Generated Certificate Display */}
              {generatedCert && (
                <div className="p-6 rounded-2xl bg-dark-900 border border-cyan-500/40 shadow-2xl space-y-4 animate-fade-in">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <span className="text-sm font-bold text-slate-100">
                          ҚАЗАҚСТАН РЕСПУБЛИКАСЫ БІЛІМ МИНИСТРЛІГІ
                        </span>
                      </div>
                      <p className="text-xs text-cyan-400 font-mono font-semibold">
                        №128 IT-ЛИЦЕЙ МЕМЛЕКЕТТІК МЕКЕМЕСІ
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        Құжат нөмірі: {generatedCert.id} • Берілген күні: {generatedCert.timestamp}
                      </p>
                    </div>

                    <div className="p-2 bg-white rounded-xl shadow-md shrink-0">
                      <img
                        src={generatedCert.qrUrl}
                        alt="QR Code verification"
                        className="w-24 h-24"
                      />
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 leading-relaxed font-sans space-y-2">
                    <p>
                      Осы анықтама азамат(ша) <strong>{studentName}</strong>, шын мәнінде 2026-2027 оқу жылында Алматы қаласы №128 IT-лицейінің <strong>{gradeClass}</strong> оқушысы болып табылатындығын растау үшін берілді.
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {t.digitalServices.qrNotice}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      ЭЦҚ расталған (Цифровой штамп eGov)
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToast('PDF файл жүктелуде', 'Mektep_Hub_Certificate.pdf', 'info')}
                      leftIcon={<Download className="w-3.5 h-3.5" />}
                    >
                      PDF Жүктеу
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* CREATE FOUND ITEM MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title={t.digitalServices.modalTitle}
        subtitle={t.digitalServices.modalSubtitle}
        maxWidth="lg"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <Input
            label={t.digitalServices.formTitle}
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            error={formErrors.title}
            placeholder="Мысалы: Сары корпустағы Xiaomi Powerbank 20000"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label={t.digitalServices.formCategory}
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as LostCategory }))}
              options={[
                { value: 'electronics', label: 'Электроника & Гаджеттер' },
                { value: 'clothes', label: 'Киім-кешек & Аяқкиім' },
                { value: 'documents', label: 'Құжаттар & Кілттер' },
                { value: 'sports', label: 'Спортинвентарь' },
                { value: 'books', label: 'Кітаптар' },
                { value: 'other', label: 'Басқа' },
              ]}
            />
            <Input
              label={t.digitalServices.formLocation}
              value={formData.locationFound}
              onChange={e => setFormData(prev => ({ ...prev, locationFound: e.target.value }))}
              error={formErrors.locationFound}
              placeholder="Мысалы: 208-кабинет, 2-қатар"
            />
          </div>

          <Textarea
            label={t.digitalServices.formDesc}
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            error={formErrors.description}
            placeholder="Түсі, белгілері, зақымдары, жанында болған заттары..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label={t.digitalServices.formReporter}
              value={formData.reporterName}
              onChange={e => setFormData(prev => ({ ...prev, reporterName: e.target.value }))}
              error={formErrors.reporterName}
              placeholder="Әлихан Нұрболұлы (10 А)"
            />
            <Input
              label={t.digitalServices.formPhone}
              value={formData.reporterPhone}
              onChange={e => setFormData(prev => ({ ...prev, reporterPhone: e.target.value }))}
              error={formErrors.reporterPhone}
              placeholder="+7 (777) 000-11-22"
            />
          </div>

          <Input
            label={t.digitalServices.formSecret}
            value={formData.secretVerificationQuestion}
            onChange={e => setFormData(prev => ({ ...prev, secretVerificationQuestion: e.target.value }))}
            error={formErrors.secretVerificationQuestion}
            placeholder="Мысалы: Кейстің сыртында қандай жазу бар?"
          />

          {/* Image Sample Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              {t.digitalServices.formImage}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {sampleImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setFormData(prev => ({ ...prev, imageUrl: img }))}
                  className={`h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    formData.imageUrl === img ? 'border-cyan-400 shadow-glow-cyan' : 'border-slate-700 opacity-60'
                  }`}
                >
                  <img src={img} alt="sample" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsCreateModalOpen(false)}>
              {t.digitalServices.cancelBtn}
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting}>
              {t.digitalServices.submitBtn}
            </Button>
          </div>
        </form>
      </Modal>

      {/* CLAIM ITEM VERIFICATION MODAL */}
      {claimItem && (
        <Modal
          isOpen={!!claimItem}
          onClose={() => setClaimItem(null)}
          title="Затты қайтарып алуды растау"
          subtitle={`№ ${claimItem.id} — ${claimItem.title}`}
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800 text-xs space-y-1">
              <span className="text-cyan-400 font-mono font-semibold block">Секретті сұрақ (Иесіне арналған):</span>
              <p className="text-slate-200">{claimItem.secretVerificationQuestion}</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Сіздің нақты жауабыңыз:
              </label>
              <textarea
                value={claimAnswer}
                onChange={e => setClaimAnswer(e.target.value)}
                placeholder="Сұраққа дұрыс жауап беріңіз (мысалы түсі, ерекше белгісі немесе ішіндегі зат)..."
                rows={3}
                className="w-full bg-dark-950 text-slate-100 placeholder-slate-500 border border-slate-700 rounded-xl p-3 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
              <Button variant="ghost" size="sm" onClick={() => setClaimItem(null)}>
                Болдырмау
              </Button>
              <Button
                variant="primary"
                size="sm"
                isLoading={isClaiming}
                onClick={handleClaimSubmit}
              >
                Растау және алып кету
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
