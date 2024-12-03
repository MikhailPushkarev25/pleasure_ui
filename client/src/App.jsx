import Navbar from "./components/Navbar.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {useAuthStore} from "./store/useAuthStore.js";
import {Loader} from "lucide-react";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const App = () => {
    const { isLoggingIn , isSignUp} = useAuthStore();

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
                {/* Открытые маршруты */}
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Защищенные маршруты */}
                <Route path="/settings" element={<SettingsPage />}/>
                <Route path="/profile" element={<ProfilePage />}/>
            </Routes>
        </div>
    );
};

export default App;
