import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TireList from "./components/TireList";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";  // 🛒 Importă pagina coșului de cumpărături
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext"; // 🛒 Importăm provider-ul pentru coș

const App: React.FC = () => {
  return (
    <CartProvider> {/* 🛒 Acum coșul este accesibil global */}
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
            <Route path="/cart" element={<CartPage />} /> {/* 🛒 Pagina coșului */}

            {/* Rute protejate */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
