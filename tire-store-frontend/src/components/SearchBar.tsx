// SearchBar.tsx
import React from 'react';

const SearchBar = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <form className="flex space-x-4">
        <input type="text" placeholder="Lățime (mm)" className="p-2 rounded" />
        <input type="text" placeholder="Înălțime (%)" className="p-2 rounded" />
        <input type="text" placeholder="Diametru (R)" className="p-2 rounded" />
        <button className="bg-green-600 text-white p-2 rounded">Căutare</button>
      </form>
    </div>
  );
}

export default SearchBar;
