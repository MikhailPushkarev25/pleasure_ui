import {useState} from "react";
import {useAuthStore} from "../store/useAuthStore.js";

const SignUpPage = () => {
    const [formData, setFormData] = useState({ username: "", surname: "", password: "" });
    const { register, isSignUp, error } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert("Registration successful!");
        } catch {
            alert("Registration failed: " + error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
            <input
                type="text"
                placeholder="Surname"
                value={formData.surname}
                onChange={(e) => setFormData({...formData, surname: e.target.value})}
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button type="submit" disabled={isSignUp}>
                {isSignUp ? "Signing Up..." : "Sign Up"}
            </button>
        </form>
    );
};

export default SignUpPage