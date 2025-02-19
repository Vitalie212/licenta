import React from 'react';
import Navbar from '../components/Navbar'; // Importă Navbar
import SearchBar from '../components/SearchBar'; // Importă SearchBar
import CategoryMenu from '../components/CategoryMenu'; // Importă CategoryMenu
import TireList from '../components/TireList'; // Importă TireList
import Footer from '../components/Footer'; // Importă Footer

const HomePage: React.FC = () => {
    return (
        <div>
            
            {/* Bara de căutare */}
            <SearchBar />
            
            {/* Meniu și lista de anvelope */}
            <div className="container mx-auto mt-8 flex">
                {/* Meniu de categorii */}
                <div className="w-1/4">
                    <CategoryMenu />
                </div>

                {/* Lista de anvelope */}
                <div className="w-3/4">
                    <TireList />
                </div>
            </div>

            {/* Footer */}
        </div>
    );
};

export default HomePage;
