import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import CartButton from "../Cart/CartButton";

const Navbar = ({ onNavigate, onCartToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        "hero",
        "productos",
        "ensambles",
        "soporte",
        "contacto",
      ];
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const elementTop = element.offsetTop;
          if (scrollPosition >= elementTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsScrolling(true);
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = Math.max(800, Math.min(1500, Math.abs(distance) / 2));
      let start = null;

      const easeInOutCubic = (t) => {
        return t < 0.5
          ? 4 * t * t * t
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const animateScroll = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          setIsScrolling(false);
        }
      };

      requestAnimationFrame(animateScroll);
    }
    setIsMobileMenuOpen(false);
  };

  const handleAuthNavigation = (mode) => {
    if (onNavigate) {
      onNavigate(mode);
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "productos", label: "Productos" },
    { id: "ensambles", label: "Ensambles" },
    { id: "soporte", label: "Soporte" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-sm"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              SweetCore
            </button>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  disabled={isScrolling}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 disabled:opacity-50 ${
                    activeSection === item.id
                      ? "text-gray-900 bg-gray-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-1 left-1/2 w-8 h-0.5 bg-gray-900 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        duration: 0.3,
                      }}
                      style={{
                        transformOrigin: "center",
                        marginLeft: "-16px",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <CartButton onClick={onCartToggle} />

            <motion.button
              onClick={() => handleAuthNavigation("login")}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Iniciar Sesión
            </motion.button>
            <motion.button
              onClick={() => handleAuthNavigation("register")}
              className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-700 font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Registrarse
            </motion.button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <CartButton onClick={onCartToggle} />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-all"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  disabled={isScrolling}
                  className={`w-full text-left px-3 py-3 text-base font-medium rounded-lg transition-all disabled:opacity-50 ${
                    activeSection === item.id
                      ? "text-gray-900 bg-gray-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200 space-y-2">
                <button
                  onClick={() => handleAuthNavigation("login")}
                  className="w-full text-left text-gray-600 hover:text-gray-900 px-3 py-3 text-base font-medium rounded-lg hover:bg-gray-50 transition-all"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => handleAuthNavigation("register")}
                  className="w-full bg-gray-900 text-white px-3 py-3 mt-2 rounded-lg text-base font-medium hover:bg-gray-700 transition-all"
                >
                  Registrarse
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
