import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, googleLogin } from "../services/authService";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = "GOOGLE_CLIENT_ID_AICI"; // 🔹 Înlocuiește cu Client ID-ul tău Google OAuth

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError("Email și parola sunt necesare.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await login(email, password);
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

    const handleGoogleSuccess = async (credentialResponse: any) => {
        const { credential } = credentialResponse;
        if (!credential) {
            setError("Autentificare Google eșuată.");
            return;
        }

        const response = await googleLogin(credential);
        if (response.success) {
            navigate("/dashboard"); // ✅ Navigare după succes
        } else {
            setError(response.message);
        }
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Autentificare</h2>

                    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="mt-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    <div className="mt-4 text-center text-gray-500">Sau autentifică-te cu Google</div>

                    <div className="flex justify-center mt-2">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError("Eroare la autentificare cu Google.")}
                        />
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
