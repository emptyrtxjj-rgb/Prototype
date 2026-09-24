import { LostItem } from '../types';

export const initialLostItems: LostItem[] = [
  {
    id: 'LOST-801',
    title: 'Apple AirPods Pro 2 (ақ түсті корпус)',
    category: 'electronics',
    description: 'Ақ корпуста кішкентай көгілдір «Qazaq Republic» стикері жапсырылған кейс. Батареясы 60%.',
    locationFound: '205-кабинет (Информатика зертханасы, 3-үстел)',
    dateFound: 'Бүгін, 11:45',
    reporterName: 'Ибраев Самат (Оқытушы)',
    reporterPhone: '+7 (701) 450-22-11',
    status: 'unclaimed',
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80',
    secretVerificationQuestion: 'Кейстің ішкі қақпағында қандай сериялық нөмір немесе сыртқы қабында қандай із бар?'
  },
  {
    id: 'LOST-802',
    title: 'Қара түсті «The North Face» спорттық күртесі',
    category: 'clothes',
    description: 'Өлшемі M, оң жақ қалтасында мектептің оқушылық картасы (Onay) және кілттер байламы бар.',
    locationFound: '115-спорт залының киім ауыстыру бөлмесі',
    dateFound: 'Кеше, 16:20',
    reporterName: 'Рахметов Дәулет (Дене шынықтыру)',
    reporterPhone: '+7 (705) 912-33-44',
    status: 'unclaimed',
    imageUrl: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=600&q=80',
    secretVerificationQuestion: 'Күртенің қалтасындағы Onay картасы кімнің атына рәсімделген?'
  },
  {
    id: 'LOST-803',
    title: 'Casio fx-991EX ғылыми инженерлік калькуляторы',
    category: 'electronics',
    description: 'Матрицалар мен интегралдарды есептейтін калькулятор. Артқы қақпағында физика формулалары жазылған.',
    locationFound: '305-математика аудиториясы',
    dateFound: '2 күн бұрын',
    reporterName: 'Қайырбеков Нұржан',
    reporterPhone: '+7 (777) 123-88-99',
    status: 'unclaimed',
    imageUrl: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e485?auto=format&fit=crop&w=600&q=80',
    secretVerificationQuestion: 'Калькулятордың қақпағының ішкі жағына кімнің аты жазылған?'
  },
  {
    id: 'LOST-804',
    title: 'Күміс түсті су термосы (Hydro Flask 750ml)',
    category: 'other',
    description: 'Термоста Алматы таулары мен шаңғы бейнеленген гравировка бар. Түбінде кішкене майысқан жері бар.',
    locationFound: '110-асхананың ортаңғы үстелі',
    dateFound: '3 күн бұрын',
    reporterName: 'Асхана кезекшісі Ажар',
    reporterPhone: '+7 (707) 555-43-21',
    status: 'unclaimed',
    imageUrl: 'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?auto=format&fit=crop&w=600&q=80',
    secretVerificationQuestion: 'Термостың қақпағы қандай түсті және қандай бекіткіші бар?'
  },
  {
    id: 'LOST-805',
    title: 'Spalding TF-1000 кәсіби баскетбол добы',
    category: 'sports',
    description: 'Қоңыр түсті классикалық былғары доп. 11 «А» сыныбының белгісі бар.',
    locationFound: 'Сыртқы спорт алаңы',
    dateFound: '4 күн бұрын',
    reporterName: 'Күзет қызметі',
    reporterPhone: '+7 (727) 388-10-01',
    status: 'claimed',
    imageUrl: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=600&q=80',
    secretVerificationQuestion: 'Доптың клапаны жанында қандай маркермен белгі қойылған?'
  }
];
