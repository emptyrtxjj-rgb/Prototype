import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { 
  PhoneCall, 
  ShieldAlert, 
  HeartPulse, 
  Smile, 
  PhoneIncoming, 
  Building, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const EmergencyModal: React.FC = () => {
  const { isEmergencyOpen, setEmergencyOpen, t } = useApp();

  const hotlines = [
    {
      id: 'national',
      icon: <PhoneIncoming className="w-5 h-5 text-amber-700" />,
      title: t.hotlines.nationalChildHelp.title,
      phone: t.hotlines.nationalChildHelp.phone,
      desk: t.hotlines.nationalChildHelp.desk,
      badge: '24/7 ТЕГІН / БЕСПЛАТНО',
      badgeVariant: 'amber' as const,
      isSpecial: true,
    },
    {
      id: 'medical',
      icon: <HeartPulse className="w-5 h-5 text-rose-700" />,
      title: t.hotlines.medical.title,
      phone: t.hotlines.medical.phone,
      desk: t.hotlines.medical.desk,
      badge: 'ЖЕДЕЛ КӨМЕК',
      badgeVariant: 'rose' as const,
    },
    {
      id: 'security',
      icon: <ShieldAlert className="w-5 h-5 text-[#7A1526]" />,
      title: t.hotlines.security.title,
      phone: t.hotlines.security.phone,
      desk: t.hotlines.security.desk,
      badge: 'КҮЗЕТ / ОХРАНА',
      badgeVariant: 'cyan' as const,
    },
    {
      id: 'psychologist',
      icon: <Smile className="w-5 h-5 text-emerald-700" />,
      title: t.hotlines.psychologist.title,
      phone: t.hotlines.psychologist.phone,
      desk: t.hotlines.psychologist.desk,
      badge: 'ҚҰПИЯ / ДОВЕРИЕ',
      badgeVariant: 'emerald' as const,
    },
    {
      id: 'director',
      icon: <Building className="w-5 h-5 text-blue-700" />,
      title: t.hotlines.directorOffice.title,
      phone: t.hotlines.directorOffice.phone,
      desk: t.hotlines.directorOffice.desk,
      badge: 'ҚАБЫЛДАУ БӨЛМЕСІ',
      badgeVariant: 'blue' as const,
    },
    {
      id: 'tech',
      icon: <Cpu className="w-5 h-5 text-purple-700" />,
      title: t.hotlines.techSupport.title,
      phone: t.hotlines.techSupport.phone,
      desk: t.hotlines.techSupport.desk,
      badge: 'IT SUPPORT',
      badgeVariant: 'violet' as const,
    },
  ];

  return (
    <Modal
      isOpen={isEmergencyOpen}
      onClose={() => setEmergencyOpen(false)}
      title={t.emergencyTitle}
      subtitle={t.emergencyDesc}
      maxWidth="lg"
    >
      <div className="space-y-3 font-sans">
        {hotlines.map(h => (
          <div
            key={h.id}
            className={`p-4 rounded-xl border transition-all ${
              h.isSpecial 
                ? 'bg-amber-50/70 border-amber-300 shadow-sm' 
                : 'bg-[#FAF8F5] border-stone-200 hover:border-stone-300'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-white border border-stone-200 shrink-0 mt-0.5 shadow-xs">
                  {h.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-semibold text-stone-900">{h.title}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-stone-200 text-stone-700">
                      {h.badge}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 flex items-center gap-1.5 font-sans">
                    📍 <span>{h.desk}</span>
                  </p>
                </div>
              </div>

              <a
                href={`tel:${h.phone.replace(/[^0-9+]/g, '')}`}
                className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#7A1526] hover:bg-[#901B30] text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{h.phone}</span>
              </a>
            </div>
          </div>
        ))}

        <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-600 leading-relaxed font-sans">
          💡 <span className="font-semibold text-stone-900">Регламент:</span> Қауіп төнген жағдайда алдымен 1-қабаттағы күзет бекетіне хабарласыңыз немесе «111» желісіне қоңырау шалыңыз. Барлық сөйлесулер оқушылардың қауіпсіздігі үшін қорғалған.
        </div>
      </div>
    </Modal>
  );
};
