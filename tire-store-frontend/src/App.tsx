import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './components/Navbar'; // Importă Navbar
import Footer from './components/Footer'; // Importă Footer
import TireList from './components/TireList'; // Importă TireList
import SearchBar from './components/SearchBar'; // Importă SearchBar
import CategoryMenu from './components/CategoryMenu'; // Importă CategoryMenu
import HomePage from './pages/HomePage'; // Importă HomePage

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Navbar component */}
        <Navbar />

        {/* Configurare rute */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Pagina de start */}
          {/* Adaugă rute suplimentare pentru alte pagini dacă este necesar */}
          <Route path="/tirelist" element={<TireList />} /> {/* Exemplu de ruta pentru TireList */}
        </Routes>

        {/* Footer component */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
