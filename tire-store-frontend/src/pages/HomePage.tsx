import React from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import CategoryMenu from '../components/CategoryMenu';
import TireList from '../components/TireList';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <SearchBar />
            <div className="container mx-auto mt-8 flex">
                <div className="w-1/4">
                    <CategoryMenu />
                </div>
                <div className="w-3/4">
                    <TireList />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
