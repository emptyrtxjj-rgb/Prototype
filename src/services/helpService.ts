import { apiRequest } from './api';

export interface HelpClassification {
  service: string;
  roomNumber: string;
  floor: string;
  actionPlan: string[];
  contactPhone: string;
}

export const helpService = {
  async classifyQuery(query: string): Promise<HelpClassification> {
    if (!query || !query.trim()) {
      throw new Error('Пожалуйста, опишите, что произошло.');
    }

    try {
      const res = await apiRequest<{ success: boolean; data: HelpClassification }>('/help/classify', {
        method: 'POST',
        body: JSON.stringify({ query }),
      });
      return res.data;
    } catch {
      // Local fallback classifier
      const q = query.toLowerCase();
      if (q.includes('плохо') || q.includes('болит') || q.includes('температур')) {
        return {
          service: 'Медицинский пункт (Неотложная помощь)',
          roomNumber: '102',
          floor: '1 этаж, центральный коридор',
          actionPlan: [
            'Сообщите учителю или дежурному администратору.',
            'Обратитесь в медпункт (Кабинет 102).',
            'При необходимости сотрудник свяжется с родителями.'
          ],
          contactPhone: '+7 (727) 388-10-03'
        };
      }

      if (q.includes('потерял') || q.includes('телефон') || q.includes('рюкзак')) {
        return {
          service: 'Охрана и Бюро находок',
          roomNumber: '101',
          floor: '1 этаж, главный вход',
          actionPlan: [
            'Проверьте статус в разделе «Бюро находок».',
            'Обратитесь на пост охраны для просмотра камер.',
            'Зарегистрируйте заявку с описанием предмета.'
          ],
          contactPhone: '+7 (727) 388-10-01'
        };
      }

      return {
        service: 'Приемная директора и Служба поддержки',
        roomNumber: '201',
        floor: '2 этаж, кабинет 201',
        actionPlan: [
          'Обратитесь к дежурному администратору.',
          'Оставьте письменное или электронное обращение.',
          'При необходимости свяжитесь с куратором.'
        ],
        contactPhone: '+7 (727) 388-10-00'
      };
    }
  }
};

export const classifyQuery = helpService.classifyQuery;
export const classifyHelpRequest = async (query: string) => {
  const res = await helpService.classifyQuery(query);
  return {
    ...res,
    recommendedDepartment: res.service,
    responsiblePerson: res.service.includes('Медицинский') ? 'Фельдшер Серикова А. Б.' :
                       res.service.includes('Охрана') ? 'Начальник охраны Мустафин К. Т.' :
                       res.service.includes('Психолог') ? 'Педагог-психолог Смагулова Ж. Е.' :
                       'Дежурный администратор лицея',
    actionSteps: res.actionPlan,
    internalPhone: 'доб. ' + res.roomNumber
  };
};
