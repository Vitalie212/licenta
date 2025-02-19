import React from 'react';

const CategoryMenu: React.FC = () => {
    return (
        <div className="bg-blue-100 p-4 mt-4">
            <h2 className="font-bold">Categorii de anvelope</h2>
            <ul>
                <li><a href="#" className="block py-2">Autoturisme</a></li>
                <li><a href="#" className="block py-2">SUV</a></li>
                <li><a href="#" className="block py-2">Microbuse</a></li>
                <li><a href="#" className="block py-2">Camioane</a></li>
                <li><a href="#" className="block py-2">Tehnică agricolă</a></li>
                <li><a href="#" className="block py-2">Industriale</a></li>
            </ul>
        </div>
    );
};

export default CategoryMenu;
