import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TireList from "./components/TireList";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";  // ✅ Importăm pagina de înregistrare
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <Navbar />

        {/* Rute */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tirelist" element={<TireList />} />
          <Route path="/register" element={<Register />} /> 
          
          {/* Rute protejate */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

