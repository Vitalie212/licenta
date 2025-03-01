import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError("Username și parola sunt necesare.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await login(username, password);
            if (response.success) {
                navigate("/dashboard"); // ✅ Navighează spre dashboard dacă autentificarea reușește
            } else {
                setError(response.message || "Eroare la autentificare.");
            }
        } catch (err) {
            setError("Eroare la conectare. Verifică rețeaua și încearcă din nou.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-gray-800">Autentificare</h2>

                {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                    <input
                        type="password"
                        placeholder="Parola"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-2 text-white bg-blue-600 rounded mt-4 hover:bg-blue-700 transition ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? "Se autentifică..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
