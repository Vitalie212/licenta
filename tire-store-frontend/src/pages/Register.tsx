import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const Register: React.FC = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!fullName || !username || !email || !password || !confirmPassword) {
            setError("Toate câmpurile sunt obligatorii.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Parolele nu se potrivesc.");
            return;
        }

        const response = await register(fullName, username, email, password);

        if (response.success) {
            setSuccess("Înregistrare reușită! Redirecționare către login...");
            setTimeout(() => navigate("/login"), 2000);
        } else {
            setError(response.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-gray-800">Înregistrare</h2>

                {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                {success && <p className="text-green-500 text-sm mt-2 text-center">{success}</p>}

                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        placeholder="Nume complet"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                    <input
                        type="text"
                        placeholder="Nume utilizator"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                    <input
                        type="password"
                        placeholder="Parolă"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                    <input
                        type="password"
                        placeholder="Confirmă parola"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                    <button
                        type="submit"
                        className="w-full p-2 text-white bg-blue-600 rounded mt-4 hover:bg-blue-700 transition"
                    >
                        Înregistrează-te
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
