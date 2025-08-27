import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/98 backdrop-blur-md border-b border-gray-200"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-xl font-bold text-gray-900">
              SweetCore
            </a>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#productos"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Productos
              </a>
              <a
                href="#ensambles"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Ensambles
              </a>
              <a
                href="#soporte"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Soporte
              </a>
              <a
                href="#contacto"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contacto
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Iniciar Sesión
            </a>
            <a
              href="#"
              className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-700 font-medium transition-all"
            >
              Registrarse
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              <a
                href="#productos"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
              >
                Productos
              </a>
              <a
                href="#ensambles"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
              >
                Ensambles
              </a>
              <a
                href="#soporte"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
              >
                Soporte
              </a>
              <a
                href="#contacto"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
              >
                Contacto
              </a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
                >
                  Iniciar Sesión
                </a>
                <a
                  href="#"
                  className="bg-gray-900 text-white block px-3 py-2 mt-2 mx-3 rounded-md text-base font-medium"
                >
                  Registrarse
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
