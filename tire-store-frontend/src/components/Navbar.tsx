import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getToken, logout } from "../services/authService";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [token, setToken] = useState(getToken());
  const { cart } = useCart(); // 🛒 Obținem produsele din coș
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    setToken(getToken());
  }, [location]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleLogout = () => {
    logout();
    setToken("");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/">TireStore</Link>
      </div>

      <ul className="flex space-x-4">
        <li><Link to="/" className={location.pathname === "/" ? "text-yellow-400 font-bold" : "text-white"}>Acasă</Link></li>
        <li><Link to="/delivery" className={location.pathname === "/delivery" ? "text-yellow-400 font-bold" : "text-white"}>Plata și livrarea</Link></li>
        <li><Link to="/promotions" className={location.pathname === "/promotions" ? "text-yellow-400 font-bold" : "text-white"}>Promoții</Link></li>
        <li><Link to="/contact" className={location.pathname === "/contact" ? "text-yellow-400 font-bold" : "text-white"}>Contact</Link></li>
      </ul>

      <div className="flex-grow mx-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Căutare..."
          className="w-full p-2 rounded border-2 border-gray-300 text-black"
        />
      </div>

      <div className="text-white mr-6">
        <p> +373 684 35239</p>
      </div>

      {/* 🛒 Coșul de cumpărături */}
      <div className="text-white relative">
        <Link to="/cart" className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-1.5 9h-15L3 3zm3 12h12m-6 0v3m0-3l-1.5 1.5m1.5-1.5l1.5 1.5"/>
          </svg>
          <span className="ml-2">Coșul meu ({cart.length})</span>
        </Link>
      </div>

      <div className="flex space-x-4">
        {token ? (
          <>
            <Link to="/dashboard" className="bg-gray-500 px-4 py-2 rounded">Dashboard</Link>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-green-500 px-4 py-2 rounded">Login</Link>
            <Link to="/register" className="bg-blue-500 px-4 py-2 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
