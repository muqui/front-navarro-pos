import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  setToken: (token) => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        set({ token, user: decodedUser });
      } catch (error) {
        console.error("Error decodificando el token:", error);
        set({ token: null, user: null });
      }
    } else {
      set({ token: null, user: null });
    }
  },
  logout: () => set({ token: null, user: null }),
}));
