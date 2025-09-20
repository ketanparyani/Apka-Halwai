import api from './api';
import { Sweet } from '../types';

export const sweetService = {
  getAll: async (): Promise<Sweet[]> => {
    const response = await api.get('/sweets');
    return response.data;
  },

  getById: async (id: number): Promise<Sweet> => {
    const response = await api.get(`/sweets/${id}`);
    return response.data;
  },

  create: async (sweet: Omit<Sweet, 'id' | 'created_at' | 'updated_at'>): Promise<Sweet> => {
    const response = await api.post('/sweets', sweet);
    return response.data;
  },

  update: async (id: number, sweet: Partial<Sweet>): Promise<Sweet> => {
    const response = await api.put(`/sweets/${id}`, sweet);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/sweets/${id}`);
  },

  search: async (query: string, category?: string, minPrice?: number, maxPrice?: number): Promise<Sweet[]> => {
    const params = new URLSearchParams();
    params.append('q', query);
    if (category) params.append('category', category);
    if (minPrice) params.append('minPrice', minPrice.toString());
    if (maxPrice) params.append('maxPrice', maxPrice.toString());
    
    const response = await api.get(`/sweets/search?${params.toString()}`);
    return response.data;
  },

  purchase: async (id: number, quantity: number): Promise<Sweet> => {
    const response = await api.post(`/sweets/${id}/purchase`, { quantity });
    return response.data;
  },

  restock: async (id: number, quantity: number): Promise<Sweet> => {
    const response = await api.post(`/sweets/${id}/restock`, { quantity });
    return response.data;
  },
};