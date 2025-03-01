// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from "../services/authService";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const token = getToken(); // ✅ Verifică dacă utilizatorul este autentificat
  const navigate = useNavigate();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); // ✅ Redirecționează utilizatorul la pagina de login
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">TireStore</Link>
        </div>

        {/* Meniu de navigare */}
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white">
              Acasă
            </Link>
          </li>
          <li>
            <Link to="/delivery" className="text-white">
              Plata și livrarea
            </Link>
          </li>
          <li>
            <Link to="/promotions" className="text-white">
              Promoții
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white">
              Contact
            </Link>
          </li>
        </ul>

        {/* Număr de contact */}
        <div className="text-white">
          <p>+373 684 35239</p>
        </div>

        {/* Bara de căutare */}
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Căutare..."
            className="p-2 rounded border-2 border-gray-300 text-black"
          />
        </div>

        {/* Coșul de cumpărături */}
        <div className="text-white">
          <Link to="/cart" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h18l-1.5 9h-15L3 3zm3 12h12m-6 0v3m0-3l-1.5 1.5m1.5-1.5l1.5 1.5"
              />
            </svg>
            <span className="ml-2">Coșul meu</span>
          </Link>
        </div>

        {/* Autentificare / Logout */}
        <div className="text-white">
          {token ? (
            <>
              <Link to="/dashboard" className="mr-4">Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-green-500 px-4 py-2 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
