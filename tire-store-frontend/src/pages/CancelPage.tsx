import React from "react";
import { Link } from "react-router-dom";

const CancelPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h1 className="text-3xl font-bold text-red-600">❌ Plată anulată!</h1>
      <p className="text-lg text-gray-700 mt-2">Tranzacția nu a fost finalizată.</p>
      <Link to="/cart" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        🛒 Înapoi la coșul de cumpărături
      </Link>
    </div>
  );
};

export default CancelPage;
