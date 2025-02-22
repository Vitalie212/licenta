import React, { useState } from 'react';
import { getTires } from '../api';

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

const SearchBar = () => {
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [diameter, setDiameter] = useState<string>('');
  const [tires, setTires] = useState<Tire[]>([]); // Setăm lista de anvelope

  const fetchTires = async () => {
    try {
      console.log('Fetching tires with:', { width, height, diameter }); // Debugging
      const data = await getTires(width, height, diameter);
      console.log('Received data:', data); // Debugging
      setTires(data);
    } catch (error) {
      console.error('Eroare la obținerea anvelopelor:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTires();
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <form className="flex space-x-4" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Lățime (mm)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="p-2 rounded border border-gray-400"
        />
        <input
          type="text"
          placeholder="Înălțime (%)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="p-2 rounded border border-gray-400"
        />
        <input
          type="text"
          placeholder="Diametru (R)"
          value={diameter}
          onChange={(e) => setDiameter(e.target.value)}
          className="p-2 rounded border border-gray-400"
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Căutare
        </button>
      </form>

      {/* Afișare anvelope */}
      {tires.length > 0 ? (
        <ul className="mt-4">
          {tires.map((tire) => (
            <li key={tire.id}>
              {tire.brand} - {tire.width}mm - {tire.height}% - {tire.diameter}R - {tire.price} MDL
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-500">Nicio anvelopă găsită.</p>
      )}
    </div>
  );
};

export default SearchBar;
