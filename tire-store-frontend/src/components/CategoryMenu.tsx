import React from "react";
import { Link } from "react-router-dom";

const CategoryMenu: React.FC = () => {
  return (
    <div className="bg-blue-100 p-4 mt-4 rounded-lg shadow-lg">
      <h2 className="font-bold text-lg mb-2">Categorii de Anvelope</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/category/autoturisme" className="block py-2 hover:text-blue-600">
            Autoturisme
          </Link>
        </li>
        <li>
          <Link to="/category/suv" className="block py-2 hover:text-blue-600">
            SUV
          </Link>
        </li>
        <li>
          <Link to="/category/microbuse" className="block py-2 hover:text-blue-600">
            Microbuse
          </Link>
        </li>
        <li>
          <Link to="/category/camioane" className="block py-2 hover:text-blue-600">
            Camioane
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CategoryMenu;
