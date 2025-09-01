import React, { useState, useEffect } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import GPUVisual3D from "../GPUVisual3D/GPUVisual3D";

const Hero = () => {
  const titles = [
    "Componentes de alta gama",
    "Gaming sin límites",
    "Construye tu PC ideal",
    "Tecnología premium",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];

    if (isTyping) {
      if (displayText.length < currentTitle.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        }, 80);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setIsTyping(false), 3000);
        return () => clearTimeout(timer);
      }
    } else {
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
        return () => clearTimeout(timer);
      } else {
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentTitleIndex, titles]);

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
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
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  return (
    <section className="pt-20 pb-16 min-h-screen flex items-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12 items-center">
          <motion.div
            className="lg:col-span-2 max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 lg:mb-6 min-h-[1.2em]">
              {displayText}
              <span className="inline-block w-0.5 h-[0.9em] bg-gray-900 ml-1 animate-pulse opacity-75"></span>
            </h1>

            <motion.p
              className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 lg:mb-10 leading-relaxed px-4 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Encuentra tarjetas gráficas, procesadores, memorias y todos los
              componentes que necesitas para construir la PC de tus sueños.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 lg:mb-12 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <button
                onClick={() => smoothScrollTo("productos")}
                className="btn btn-primary justify-center sm:justify-start"
              >
                Ver catálogo
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => smoothScrollTo("ensambles")}
                className="btn btn-secondary justify-center sm:justify-start"
              >
                PCs armadas
              </button>
            </motion.div>

            <motion.div
              className="flex justify-center sm:justify-center lg:justify-start gap-6 pt-8 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                  5000+
                </div>
                <div className="text-xs lg:text-sm text-gray-600 font-medium">
                  Componentes
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                  98%
                </div>
                <div className="text-xs lg:text-sm text-gray-600 font-medium">
                  Satisfacción
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                  24h
                </div>
                <div className="text-xs lg:text-sm text-gray-600 font-medium">
                  Envío rápido
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-3 w-full order-first lg:order-last">
            <GPUVisual3D />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
