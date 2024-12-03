import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    isAuthenticated: !!localStorage.getItem("authToken"), // Проверка на начальную аутентификацию
    isLoggingIn: false,
    isSignUp: false,
    error: null,

    signup: async (userData) => {
        set({ isSignUp: true, error: null });
        try {
            const res = await axiosInstance.post("/users/register", userData);
            toast.success(res.data); // Успешное сообщение
        } catch (error) {
            toast.error(error.response?.data?.message || "Ошибка при регистрации");
        } finally {
            set({ isSignUp: false });
        }
    },

    // Логин пользователя
    login: async (credentials) => {
        set({ isLoggingIn: true, error: null });
        try {
            const res = await axiosInstance.post("/users/login", credentials);
            const token = res.data.token; // JWT токен из ответа
            localStorage.setItem("authToken", token); // Сохранение токена
            set({ token, isAuthenticated: true, isLoggingIn: false });
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