import React from "react";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import GPUVisual3D from "../GPUVisual3D/GPUVisual3D";

const Hero = () => {
  return (
    <section className="pt-20 pb-16 min-h-screen flex items-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <motion.div
            className="lg:col-span-2 max-w-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Zap size={16} />
              Último en tecnología
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Los mejores componentes para tu PC
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Encuentra tarjetas gráficas, procesadores, memorias y todos los
              componentes que necesitas para construir la PC de tus sueños.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <a
                href="#productos"
                className="btn btn-primary justify-center sm:justify-start"
              >
                Ver catálogo
                <ArrowRight size={20} />
              </a>
              <a
                href="#ensambles"
                className="btn btn-secondary justify-center sm:justify-start"
              >
                PCs armadas
              </a>
            </motion.div>

            <motion.div
              className="flex justify-center sm:justify-start gap-6 pt-8 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="text-center sm:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                  5000+
                </div>
                <div className="text-xs lg:text-sm text-gray-600 font-medium">
                  Componentes
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                  98%
                </div>
                <div className="text-xs lg:text-sm text-gray-600 font-medium">
                  Satisfacción
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                  24h
                </div>
                <div className="text-xs lg:text-sm text-gray-600 font-medium">
                  Envío rápido
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-3 w-full">
            <GPUVisual3D />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
