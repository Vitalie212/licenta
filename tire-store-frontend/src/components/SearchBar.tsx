import React, { useState } from "react";
import { getTires } from "../api";

// Definirea tipului pentru o anvelopă
interface Tire {
  id: number;
  brand: string;
  model: string;
  width: number;
  height: number;
  diameter: number;
  price: number;
}

const SearchBar: React.FC = () => {
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [tires, setTires] = useState<Tire[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTires = async () => {
    if (!width || !height || !diameter) {
      setError("Introduceți toate dimensiunile!");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      console.log("Fetching tires with:", { width, height, diameter }); // Debugging
      const data = await getTires(width, height, diameter);
      console.log("Received data:", data); // Debugging
      setTires(data.length ? data : null);
    } catch (error) {
      setError("Eroare la obținerea anvelopelor. Vă rugăm să încercați din nou.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTires();
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
      <form className="flex flex-wrap gap-4" onSubmit={handleSearch}>
        <input
          type="number"
          placeholder="Lățime (mm)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="p-2 rounded border border-gray-400 w-32"
          min="100"
          max="400"
          required
        />
        <input
          type="number"
          placeholder="Înălțime (%)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="p-2 rounded border border-gray-400 w-32"
          min="20"
          max="90"
          required
        />
        <input
          type="number"
          placeholder="Diametru (R)"
          value={diameter}
          onChange={(e) => setDiameter(e.target.value)}
          className="p-2 rounded border border-gray-400 w-32"
          min="10"
          max="30"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-32"
        >
          Căutare
        </button>
      </form>

      {/* Loading State */}
      {loading && <p className="mt-4 text-center text-gray-600">Se caută anvelope...</p>}

      {/* Error Message */}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {/* Display Search Results */}
      {tires !== null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {tires.map((tire) => (
            <div key={tire.id} className="p-4 bg-white rounded-lg shadow">
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
