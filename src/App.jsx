import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import ProductShowcase from "./components/ProductShowcase/ProductShowcase";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <ProductShowcase />

      <section id="ensambles" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Ensambles
          </h2>
          <p className="text-xl text-gray-600">Próximamente...</p>
        </div>
      </section>

      <section id="soporte" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Soporte
          </h2>
          <p className="text-xl text-gray-600">Próximamente...</p>
        </div>
      </section>

      <section id="contacto" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Contacto
          </h2>
          <p className="text-xl text-gray-600">Próximamente...</p>
        </div>
      </section>
    </div>
  );
}

export default App;
