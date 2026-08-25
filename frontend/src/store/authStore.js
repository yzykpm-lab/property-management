import create from 'zustand';
import api from '../services/api';

export const useStore = create((set) => ({
  user: null,
  isLoading: true,
  error: null,

  // Check if user is logged in
  checkAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await api.get('/auth/me');
        set({ user: response.data });
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      set({ isLoading: false });
    }
  },

  // Login
  login: async (username, password) => {
    try {
      set({ error: null });
      const response = await api.post('/auth/login', { username, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      set({ user });
      return user;
    } catch (error) {
      const message = error.response?.data?.message || 'שגיאת התחברות';
      set({ error: message });
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, error: null });
  },

  // Clear error
  clearError: () => set({ error: null })
}));

// Initialize auth on app load
useStore.getState().checkAuth();
