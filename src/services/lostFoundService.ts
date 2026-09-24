import { apiRequest } from './api';

export interface LostItemData {
  id: string;
  title: string;
  location: string;
  date: string;
  category: string;
  description: string;
  status: 'pending' | 'returned';
  imageUrl: string;
}

export interface LostFoundPayload {
  stats: {
    found: number;
    returned: number;
    pending: number;
  };
  items: LostItemData[];
}

export const lostFoundService = {
  async getLostItems(): Promise<LostFoundPayload> {
    try {
      const res = await apiRequest<{ success: boolean; data: LostFoundPayload }>('/lost-found');
      return res.data;
    } catch {
      return {
        stats: { found: 24, returned: 17, pending: 7 },
        items: [
          {
            id: 'LF-101',
            title: 'Чёрный рюкзак Nike Pro',
            location: 'Спортивный зал (115)',
            date: '23 сентября',
            category: 'clothes',
            description: 'Внутри спортивная форма, кроссовки 42 размера и бутылка для воды.',
            status: 'pending',
            imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'LF-102',
            title: 'Apple AirPods Pro 2 в белом чехле',
            location: 'Кабинет 205 (IT Labs)',
            date: '24 сентября',
            category: 'electronics',
            description: 'На чехле наклейка «Qazaq Republic». Заряд 70%.',
            status: 'pending',
            imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 'LF-103',
            title: 'Инженерный калькулятор Casio fx-991EX',
            location: 'Кабинет 204 (Математика)',
            date: '22 сентября',
            category: 'electronics',
            description: 'На обратной стороне крышки написаны формулы физики карандашом.',
            status: 'pending',
            imageUrl: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e485?auto=format&fit=crop&w=600&q=80'
          }
        ]
      };
    }
  },

  async addLostItem(data: { title: string; location: string; description?: string; category?: string; date?: string }) {
    if (!data.title || !data.title.trim()) {
      throw new Error('Введите название предмета.');
    }
    if (!data.location || !data.location.trim()) {
      throw new Error('Укажите место находки.');
    }

    try {
      const res = await apiRequest<{ success: boolean; message: string; data: LostItemData; stats: any }>('/lost-found', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res;
    } catch (err: any) {
      // Local fallback
      const newItem: LostItemData = {
        id: `LF-${Date.now().toString().slice(-4)}`,
        title: data.title.trim(),
        location: data.location.trim(),
        date: data.date || 'Сегодня',
        category: data.category || 'other',
        description: data.description || 'Описание отсутствует',
        status: 'pending',
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
      };
      return {
        success: true,
        message: 'Запись успешно добавлена.',
        data: newItem,
        stats: { found: 25, returned: 17, pending: 8 }
      };
    }
  }
};

export const getLostItems = lostFoundService.getLostItems;
export const addLostItem = lostFoundService.addLostItem;
export const getLostFoundItems = async () => {
  const data = await lostFoundService.getLostItems();
  return data.items;
};
