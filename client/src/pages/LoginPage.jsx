import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore.js";

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: "", surname: "", password: "" });
    const { login, isLoggingIn, error } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials);
            navigate("/profile"); // Перенаправление после успешного логина
        } catch {
            alert("Login failed: " + error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
            <input
                type="text"
                placeholder="Surname"
                value={credentials.surname}
                onChange={(e) => setCredentials({...credentials, surname: e.target.value})}
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
            <button type="submit" disabled={isLoggingIn}>
                {isLoggingIn ? "Logging In..." : "Login"}
            </button>
        </form>
    );
};

export default LoginPage;