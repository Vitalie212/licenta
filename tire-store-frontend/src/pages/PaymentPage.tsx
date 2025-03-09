import React from "react";

const PaymentPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className="text-2xl font-bold">💳 Introdu Detaliile Cardului</h1>
      <p className="text-gray-600 mt-2">Completează datele pentru a efectua plata.</p>

      <form className="mt-6">
        <input
          type="text"
          placeholder="Număr card"
          className="w-full px-4 py-2 border rounded-lg mt-2"
        />
        <input
          type="text"
          placeholder="MM/YY"
          className="w-full px-4 py-2 border rounded-lg mt-2"
        />
        <input
          type="text"
          placeholder="CVV"
          className="w-full px-4 py-2 border rounded-lg mt-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-600 transition"
        >
          Confirmă Plata
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
