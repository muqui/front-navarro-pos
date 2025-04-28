// auth.ts o authStore.ts
import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = create((set) => ({
  token: localStorage.getItem('token'),
  user: localStorage.getItem('token')
    ? jwtDecode(localStorage.getItem('token'))
    : null,

  setToken: (token) => {
    if (token) {
      try {
        const user = jwtDecode(token);
        localStorage.setItem('token', token);
        set({ token, user });
      } catch (error) {
        console.error("Token inválido");
        set({ token: null, user: null });
      }
    } else {
      localStorage.removeItem('token');
      set({ token: null, user: null });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));
