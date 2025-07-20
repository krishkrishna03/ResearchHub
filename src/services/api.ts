import axios from 'axios';
import { Paper } from '../types/Paper';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const paperAPI = {
  // Get all papers with optional search and filter
  getAllPapers: async (params?: { search?: string; category?: string; page?: number; limit?: number }) => {
    const response = await api.get('/papers', { params });
    return response.data;
  },

  // Get single paper by ID
  getPaper: async (id: string) => {
    const response = await api.get(`/papers/${id}`);
    return response.data;
  },

  // Create new paper
  createPaper: async (paperData: Omit<Paper, '_id' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post('/papers', paperData);
    return response.data;
  },

  // Update paper
  updatePaper: async (id: string, paperData: Partial<Paper>) => {
    const response = await api.put(`/papers/${id}`, paperData);
    return response.data;
  },

  // Delete paper
  deletePaper: async (id: string) => {
    const response = await api.delete(`/papers/${id}`);
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api;