import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";
import {jwtDecode} from "jwt-decode";

export const useAuthStore = create((set) => ({
    isRegister: false,
    isAuthenticated: false,
    isLoggingIn: false,
    isSignUp: false,
    error: null,
    isUpdatingProfile: false,
    token: null,
    userProfile: null,

    resetRegister: () => set({ isRegister: false }),

    signup: async (userData) => {
        set({ isSignUp: true, error: null });
        try {
            const res = await axiosInstance.post("/users/register", userData);
            set({ isRegister: true });
            return true;
        } catch (error) {
            return false;
        } finally {
            set({ isSignUp: false });
        }
    },

    // Логин пользователя
    login: async (credentials) => {
        set({ isLoggingIn: true, error: null});
        try {
            const res = await axiosInstance.post("/users/login", credentials);
            const token = res.data; // JWT токен из ответа
            localStorage.setItem("authToken", token); // Сохранение токена
            const userProfile = jwtDecode(token);
            set({ token, userProfile, isAuthenticated: true });
        } catch (error) {
            set({ isLoggingIn: false, error: error.response?.data || error.message });
        } finally {
            set({ isLoggingIn: false });
        }
    },

    // Выход из системы
    logout: () => {
        localStorage.removeItem("authToken");
        set({ token: null, userProfile: null, isAuthenticated: false });
    },

    updatingProfile: async(data) => {},
}));