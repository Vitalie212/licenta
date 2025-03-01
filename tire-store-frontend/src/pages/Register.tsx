import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password || !confirmPassword) {
            setError("Toate câmpurile sunt obligatorii.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Parolele nu se potrivesc.");
            return;
        }

        const response = await register(username, password);

        if (response.success) {
            setSuccess("Înregistrare reușită! Redirecționare către login...");
            setTimeout(() => navigate("/login"), 2000);
        } else {
            setError(response.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Înregistrare</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Parola"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirmă parola"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Înregistrează-te</button>
            </form>
        </div>
    );
};

export default Register;
