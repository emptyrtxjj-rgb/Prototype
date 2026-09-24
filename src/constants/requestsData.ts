import { SchoolServiceRequest } from '../types';

export const initialRequests: SchoolServiceRequest[] = [
  {
    id: 'REQ-1042',
    titleKk: '208-кабинеттегі Vernier оптикалық датчигін калибрлеу',
    titleRu: 'Калибровка оптического датчика Vernier в 208 кабинете',
    category: 'it_support',
    requesterName: 'Тұрсынов Берік',
    requesterRole: 'teacher',
    timestamp: '10 мин бұрын',
    status: 'new',
    priority: 'high',
    roomNumber: '208',
    description: 'Физика пәні бойынша практикалық жұмысқа дейін датчиктің нөлдік көрсеткішін теңшеу қажет.'
  },
  {
    id: 'REQ-1041',
    titleKk: 'Мектептен оқу орны туралы ресми анықтамаға сұраныс',
    titleRu: 'Запрос на официальную справку об обучении для визы',
    category: 'document',
    requesterName: 'Сәрсенбай Әмина (10 «А»)',
    requesterRole: 'student',
    timestamp: '25 мин бұрын',
    status: 'in_progress',
    priority: 'medium',
    roomNumber: '201',
    description: 'Халықаралық олимпиадаға қатысу үшін ағылшын тіліндегі шұғыл анықтама қажет.'
  },
  {
    id: 'REQ-1039',
    titleKk: '301-шеберханаға PLA пластик филаментін жеткізу',
    titleRu: 'Поставка катушек филамента PLA в 301 мастерскую',
    category: 'supplies',
    requesterName: 'Жұмағалиев Әлішер',
    requesterRole: 'teacher',
    timestamp: '1 сағат бұрын',
    status: 'in_progress',
    priority: 'medium',
    roomNumber: '301',
    description: '3D принтерлер үшін қара және көк түсті 4 катушка биоыдырайтын PLA пластик керек.'
  },
  {
    id: 'REQ-1038',
    titleKk: '115-спорт залындағы қосымша жарық шамдарын ауыстыру',
    titleRu: 'Замена LED-прожекторов верхнего яруса в 115 спортзале',
    category: 'maintenance',
    requesterName: 'Рахметов Дәулет',
    requesterRole: 'teacher',
    timestamp: '2 сағат бұрын',
    status: 'resolved',
    priority: 'low',
    roomNumber: '115',
    description: 'Оң жақ жарықтандыру секциясы толық қалпына келтірілді, инженерлік акт толтырылды.'
  },
  {
    id: 'REQ-1035',
    titleKk: '205-IT лабындағы 14-компьютерге VS Code кеңейтімдерін жаңарту',
    titleRu: 'Обновление сред разработки VS Code на ПК 14 в IT-лаборатории',
    category: 'it_support',
    requesterName: 'Нұрлан Батырхан (11 «Б»)',
    requesterRole: 'student',
    timestamp: '3 сағат бұрын',
    status: 'resolved',
    priority: 'low',
    roomNumber: '205',
    description: 'Оқушыларға Python Data Science бумасы мен Git баптаулары қашықтан орнатылды.'
  },
  {
    id: 'REQ-1031',
    titleKk: '110-асхана су тазарту сүзгісінің жоспарлы ауыстырылуы',
    titleRu: 'Плановая замена картриджей очистки воды в 110 столовой',
    category: 'cleaning',
    requesterName: 'Санитарлық қызмет',
    requesterRole: 'admin',
    timestamp: '5 сағат бұрын',
    status: 'resolved',
    priority: 'medium',
    roomNumber: '110',
    description: 'Барлық 4 фильтрлік мембрана ауыстырылып, су сапасы сертификатталды.'
  }
];
