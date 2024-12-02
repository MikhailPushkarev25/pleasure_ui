import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    authUser: null, // Текущий пользователь
    token: null, // JWT токен
    isSignUp: false, // Флаг регистрации
    isLoggingIn: false, // Флаг входа
    error: null, // Ошибки

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
            const token = res.data; // JWT токен из ответа
            localStorage.setItem("authToken", token); // Сохранение токена
            set({ token, isLoggingIn: false });

            // После логина получить данные пользователя
            await useAuthStore.getState().checkAuth();
        } catch (error) {
            set({ isLoggingIn: false, error: error.response?.data || error.message });
        }
    },

    // Выход из системы
    logout: () => {
        localStorage.removeItem("authToken");
        set({ authUser: null, token: null });
    },
}));