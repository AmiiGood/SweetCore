import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import ProductShowcase from "./components/ProductShowcase/ProductShowcase";
import EnsambleShowcase from "./components/Ensambles/EnsambleShowcase";
import SupportSection from "./components/Support/SupportSection";
import AuthPage from "./components/AuthPage/AuthPage";
import CartSidebar from "./components/Cart/CartSidebar";
import NotificationContainer from "./components/Notifications/NotificationContainer";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const goHome = () => {
    setCurrentPage("home");
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const handleOpenCart = () => {
      setIsCartOpen(true);
    };

    document.addEventListener("openCart", handleOpenCart);

    return () => {
      document.removeEventListener("openCart", handleOpenCart);
    };
  }, []);

  if (currentPage === "login" || currentPage === "register") {
    return (
      <NotificationProvider>
        <CartProvider>
          <div className="App">
            <AnimatePresence mode="wait">
              <AuthPage key={currentPage} mode={currentPage} onBack={goHome} />
            </AnimatePresence>
            <NotificationContainer />
          </div>
        </CartProvider>
      </NotificationProvider>
    );
  }

  return (
    <NotificationProvider>
      <CartProvider>
        <div className="App">
          <Navbar onNavigate={navigateTo} onCartToggle={toggleCart} />

          <div id="hero">
            <Hero />
          </div>

          <ProductShowcase />

          <EnsambleShowcase />

          <SupportSection />

          <section id="contacto" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                Contacto
              </h2>
              <p className="text-xl text-gray-600">Próximamente...</p>
            </div>
          </section>

          <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />

          <NotificationContainer />
        </div>
      </CartProvider>
    </NotificationProvider>
  );
}

export default App;
