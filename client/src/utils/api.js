import axios from 'axios';

// Use relative URL in production, localhost in development
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gallery API
export const galleryAPI = {
  getImages: (params = {}) => api.get('/gallery', { params }),
  getImage: (id) => api.get(`/gallery/${id}`),
  getCategories: () => api.get('/gallery/stats/categories'),
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
};

// Content API
export const contentAPI = {
  getContent: (section) => api.get(`/content/${section}`),
  getAllContent: () => api.get('/content'),
};

// Admin API
export const adminAPI = {
  login: (credentials) => api.post('/admin/login', credentials),
  
  // Gallery management
  getGalleryImages: (params = {}) => api.get('/admin/gallery', { params }),
  uploadImage: (formData) => api.post('/admin/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateImage: (id, data) => api.put(`/admin/gallery/${id}`, data),
  deleteImage: (id) => api.delete(`/admin/gallery/${id}`),
  
  // Contact management
  getContacts: (params = {}) => api.get('/admin/contacts', { params }),
  updateContact: (id, data) => api.put(`/admin/contacts/${id}`, data),
  
  // Content management
  getContent: () => api.get('/admin/content'),
  updateContent: (section, data) => api.put(`/admin/content/${section}`, data),
};

export default api;
