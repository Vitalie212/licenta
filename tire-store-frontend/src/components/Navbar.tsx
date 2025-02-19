// Navbar.tsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">TireStore</div>
        <ul className="flex space-x-4">
          <li>Acasă</li>
          <li>Categorii</li>
          <li>Promoții</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
