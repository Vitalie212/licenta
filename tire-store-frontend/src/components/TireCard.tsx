// src/components/TireCard.tsx
import React from 'react';
import { Tire } from '../types/Tire'; // Importăm tipul Tire

// Specificăm tipul tire ca fiind de tip Tire
const TireCard: React.FC<{ tire: Tire }> = ({ tire }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={tire.image} alt="Tire" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{tire.name}</div>
        <p className="text-gray-700 text-base">{tire.description}</p>
      </div>
      <div className="px-6 py-4">
        <span className="font-bold text-xl">{tire.price} MDL</span>
      </div>
    </div>
  );
};

export default TireCard;
