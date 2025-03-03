import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      {/* Banner principal */}
      <section
        className="relative bg-cover bg-center h-[1620px] sm:h-[200px] md:h-[629px] lg:h-[600px]"
        style={{ backgroundImage: "url('/images/tire-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl font-bold">Găsește Anvelopele Perfecte</h1>
          <p className="mt-4 text-lg">Calitate premium, livrare rapidă și prețuri accesibile</p>
          <Link
  to="/tirelist"
  className="mt-6 bg-yellow-500 px-6 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-600 text-black"
  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }} // Adăugăm umbră pentru contrast
>
  Cumpără Acum
</Link>

        </div>
      </section>

      {/* Categorii de Anvelope */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-center">Categorii de Anvelope</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          <Link to="/tirelist?category=autoturisme" className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
            <img src="/images/passenger-tires.jpg" alt="Autoturisme" className="rounded-lg" />
            <h3 className="mt-2 text-lg font-medium text-center">Autoturisme</h3>
          </Link>
          <Link to="/tirelist?category=suv" className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
            <img src="/images/suv-tires.jpg" alt="SUV" className="rounded-lg" />
            <h3 className="mt-2 text-lg font-medium text-center">SUV</h3>
          </Link>
          <Link to="/tirelist?category=camioane" className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
            <img src="/images/truck-tires.jpg" alt="Camioane" className="rounded-lg" />
            <h3 className="mt-2 text-lg font-medium text-center">Camioane</h3>
          </Link>
          <Link to="/tirelist?category=agricole" className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition">
            <img src="/images/agriculture-tires.jpg" alt="Agricole" className="rounded-lg" />
            <h3 className="mt-2 text-lg font-medium text-center">Agricole</h3>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
