import React from "react";
import { Tire } from "../types/Tire";

interface TireCardProps {
  tire: Tire;
}

const TireCard: React.FC<TireCardProps> = ({ tire }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
      {/* Imaginea anvelopei */}
      <img src={`/images/${tire.image}`} alt={tire.name} className="w-full h-40 object-cover rounded-md" />

      {/* Numele și descrierea */}
      <h3 className="mt-2 text-lg font-bold">{tire.name}</h3>
      <p className="text-gray-600 text-sm">{tire.description}</p>

      {/* Prețul */}
      <p className="mt-2 text-xl font-bold text-green-600">{tire.price} MDL</p>
    </div>
  );
};

export default TireCard;
