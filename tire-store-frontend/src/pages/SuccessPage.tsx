import React from "react";
import { Link } from "react-router-dom";

const SuccessPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-3xl font-bold text-green-600">✅ Plată reușită!</h1>
      <p className="text-lg text-gray-700 mt-2">Mulțumim pentru achiziție!</p>
      <Link to="/" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        🏠 Mergi la pagina principală
      </Link>
    </div>
  );
};

export default SuccessPage;
