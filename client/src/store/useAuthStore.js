import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    token: localStorage.getItem("authToken") || null,
    isLoggingIn: false,
    isSignUp: false,
    error: null,

    // Регистрация пользователя
    register: async (userData) => {
        set({ isSignUp: true, error: null });
        try {
            const res = await axiosInstance.post("/users/register", userData);
            set({ isSignUp: false });
            return res.data; // Успешное сообщение
        } catch (error) {
            set({ isSignUp: false, error: error.response?.data || error.message });
            throw error;
        }
    },

    // Логин пользователя
    login: async (credentials) => {
        set({ isLoggingIn: true, error: null });
        try {
            const res = await axiosInstance.post("/users/login", credentials);
            const token = res.data.token; // JWT токен из ответа
            localStorage.setItem("authToken", token); // Сохранение токена
            set({ token, isLoggingIn: false });
        } catch (error) {
            set({ isLoggingIn: false, error: error.response?.data || error.message });
        }
    },

    // Выход из системы
    logout: () => {
        localStorage.removeItem("authToken");
        set({ token: null });
    },
}));