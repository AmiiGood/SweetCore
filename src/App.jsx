import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import ProductShowcase from "./components/ProductShowcase/ProductShowcase";
import EnsambleShowcase from "./components/Ensambles/EnsambleShowcase";
import SupportSection from "./components/Support/SupportSection";
import ContactSection from "./components/Contact/ContactSection";
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

          <ContactSection />

          <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />

          <NotificationContainer />
        </div>
      </CartProvider>
    </NotificationProvider>
  );
}

export default App;
