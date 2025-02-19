import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TireList from './components/TireList';
import SearchBar from './components/SearchBar';
import CategoryMenu from './components/CategoryMenu';

const App: React.FC = () => {
  return (
    <div>
      {/* Navbar component */}
      <Navbar />

      {/* Search bar component */}
      <SearchBar />

      {/* Category menu component */}
      <CategoryMenu />

      {/* Tire list component */}
      <TireList />

      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default App;
