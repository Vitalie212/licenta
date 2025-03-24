import React from "react";
import { Tire } from "../types/Tire";
import { useCart } from "../context/CartContext";

interface TireCardProps {
  tire: Tire;
}

const TireCard: React.FC<TireCardProps> = ({ tire }) => {
  const { addToCart } = useCart();

  // ✅ Construim calea imaginii corect (URL absolut sau fișier local)
  const imageUrl =
    tire.image?.startsWith("http") || tire.image?.startsWith("/images/")
      ? tire.image
      : `/images/${tire.image?.trim() || "default-tire.jpg"}`;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-center border border-gray-200 hover:shadow-xl transition duration-300">
      {/* ✅ Container pentru imagine */}
      <div className="w-full h-44 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
        <img
          src={imageUrl}
          alt={tire.name}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = "/images/default-tire.jpg")} // ✅ Fallback dacă imaginea lipsește
        />
      </div>

      {/* ✅ Titlu anvelopă */}
      <h3 className="mt-3 text-lg font-bold text-gray-800">{tire.name}</h3>
      <p className="text-gray-500 text-sm">{tire.brand} - {tire.model}</p>

      {/* ✅ Descriere (fallback dacă nu există) */}
      <p className="mt-2 text-sm text-gray-600">
        {tire.description?.trim() || "Descriere indisponibilă"}
      </p>

      {/* ✅ Dimensiuni */}
      <p className="text-gray-600 text-sm">
        Dimensiuni: {tire.width} / {tire.height} R{tire.diameter}
      </p>

      {/* ✅ Preț afișat clar */}
      <p className="mt-2 text-xl font-bold text-green-600">{tire.price} MDL</p>

      {/* ✅ Buton „Adaugă în Coș” */}
      <button
        onClick={() =>
          addToCart({
            id: tire.id,
            name: tire.name,
            description: tire.description || "Fără descriere",
            price: tire.price,
            imageUrl: imageUrl,
            quantity: 1,
          })
        }
        className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition w-full"
      >
        🛒 Adaugă în Coș
      </button>
    </div>
  );
};

export default TireCard;