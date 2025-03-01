import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(username, password);
    if (success) {
      navigate("/dashboard"); // Navighează către Dashboard după logare
    } else {
      setError("Email sau parolă incorectă!");
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white p-6 rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Autentificare</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Parola"
          className="w-full p-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
