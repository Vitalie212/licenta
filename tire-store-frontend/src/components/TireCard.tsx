import React from "react";
import { Tire } from "../types/Tire";
import { useCart } from "../context/CartContext";

interface TireCardProps {
  tire: Tire;
}

const TireCard: React.FC<TireCardProps> = ({ tire }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
      <img src={`/images/${tire.image}`} alt={tire.name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="mt-2 text-lg font-bold">{tire.name}</h3>
      <p className="text-gray-600 text-sm">{tire.description}</p>
      <p className="mt-2 text-xl font-bold text-green-600">{tire.price} MDL</p>

      <button
        onClick={() => addToCart({ ...tire, quantity: 1, imageUrl: tire.image })}
        className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        🛒 Adaugă în Coș
      </button>
    </div>
  );
};

export default TireCard;
