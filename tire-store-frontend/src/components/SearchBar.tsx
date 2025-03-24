import React, { useState } from "react";
import axios from "axios";

// ✅ Definirea tipului de date pentru anvelope
interface Tire {
  id: number;
  name: string;
  brand: string;
  model: string;
  width: number;
  height: number;
  diameter: number;
  price: number;
  image?: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>(""); // 🔹 Căutare generală (marcă, dimensiune etc.)
  const [tires, setTires] = useState<Tire[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Funcția pentru a căuta anvelope pe API
  const fetchTires = async () => {
    if (!query.trim()) {
      setError("Introduceți un termen de căutare!");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      console.log(`🔍 Căutare anvelope pentru: ${query}`);
      const response = await axios.get(`http://localhost:5258/api/tires?query=${query}`);
      setTires(response.data.length ? response.data : []);
    } catch (error) {
      console.error("❌ Eroare la încărcarea anvelopelor:", error);
      setError("Eroare la căutare. Verifică conexiunea la server.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Gestionarea căutării la apăsarea Enter sau butonului
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTires();
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
      {/* ✅ Formular de căutare */}
      <form className="flex flex-wrap gap-4" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Caută marcă, dimensiune..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded border border-gray-400 flex-1 min-w-32"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Căutare
        </button>
      </form>

      {/* 🔄 Stare de încărcare */}
      {loading && <p className="mt-4 text-center text-gray-600">Se caută anvelope...</p>}

      {/* ⚠️ Mesaj de eroare */}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {/* 📌 Rezultate căutare */}
      {tires.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {tires.map((tire) => (
            <div key={tire.id} className="p-4 bg-white rounded-lg shadow">
              <img
                src={tire.image || "/images/default-tire.jpg"}
                alt={tire.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="font-semibold">{tire.brand} - {tire.model}</h3>
              <p className="text-gray-600">
                {tire.width}mm / {tire.height}% / {tire.diameter}R
              </p>
              <p className="font-bold text-green-600">{tire.price} MDL</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="mt-4 text-center text-gray-500">Nicio anvelopă găsită.</p>
      )}
    </div>
  );
};

export default SearchBar;
