import Navbar from "./components/Navbar.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {useAuthStore} from "./store/useAuthStore.js";
import {Loader} from "lucide-react";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import {Toaster} from "react-hot-toast";

const App = () => {
    const { isRegister, isAuthenticated, isLoggingIn , isSignUp} = useAuthStore();

    if (isLoggingIn || isSignUp) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }
    return (
        <div>
            <Navbar />
            <Routes>
                {/* Главная страница доступна только для авторизованных пользователей */}
                <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/signup" />} />

                {/* Страница регистрации доступна только для незарегистрированных пользователей */}
                <Route path="/signup" element={!isRegister ? <SignUpPage /> : <Navigate to="/login" />} />

                {/* Страница логина доступна только для незарегистрированных пользователей */}
                <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />

                {/* Страница настроек доступна всегда */}
                <Route path="/settings" element={<SettingsPage />} />

                {/* Страница профиля доступна только для авторизованных пользователей */}
                <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
            </Routes>
            <Toaster />
        </div>
    );
};

export default App;
