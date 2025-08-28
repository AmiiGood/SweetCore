import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";
import rtx4090Image from "../../assets/images/rtx-4090.png";
import rtx4070tiImage from "../../assets/images/rtx-4070ti.png";
import ryzen9Image from "../../assets/images/ryzen-9.webp";
import intel9Image from "../../assets/images/i9-14900k.png";
import ddr5RamImage from "../../assets/images/ddr5-ram.png";
import nvmeSsdImage from "../../assets/images/nvme-ssd.png";

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "Todos" },
    { id: "gpu", name: "Tarjetas Gráficas" },
    { id: "cpu", name: "Procesadores" },
    { id: "ram", name: "Memoria RAM" },
    { id: "storage", name: "Almacenamiento" },
  ];

  const products = [
    {
      id: 1,
      name: "NVIDIA GeForce RTX 4090",
      category: "gpu",
      price: "$1,599.99",
      originalPrice: "$1,799.99",
      image: rtx4090Image,
      specs: {
        memory: "24GB GDDR6X",
        boost: "2.52 GHz",
        power: "450W TGP",
        rayTracing: "3rd Gen RT",
      },
      performance: 98,
      badge: "Más Vendido",
    },
    {
      id: 2,
      name: "AMD Ryzen 9 7950X3D",
      category: "cpu",
      price: "$699.99",
      originalPrice: "$799.99",
      image: ryzen9Image,
      specs: {
        cores: "16 Cores / 32 Threads",
        boost: "5.7 GHz",
        cache: "128MB L3",
        tdp: "120W",
      },
      performance: 95,
      badge: "Gaming Elite",
    },
    {
      id: 3,
      name: "Corsair Dominator DDR5-6000",
      category: "ram",
      price: "$329.99",
      originalPrice: "$399.99",
      image: ddr5RamImage,
      specs: {
        capacity: "32GB (2x16GB)",
        speed: "6000 MHz",
        timings: "CL30-36-36-76",
        rgb: "RGB Dinámico",
      },
      performance: 92,
      badge: "Premium",
    },
    {
      id: 4,
      name: "Crucial P310 NVMe",
      category: "storage",
      price: "$179.99",
      originalPrice: "$219.99",
      image: nvmeSsdImage,
      specs: {
        capacity: "1TB",
        read: "7,100 MB/s",
        write: "6,000 MB/s",
        interface: "PCIe 4.0",
      },
      performance: 90,
      badge: "Mejor Precio",
    },
    {
      id: 5,
      name: "Intel Core i9-14900K",
      category: "cpu",
      price: "$589.99",
      originalPrice: "$649.99",
      image: intel9Image,
      specs: {
        cores: "24 Cores (8P+16E)",
        boost: "6.0 GHz",
        cache: "36MB",
        tdp: "125W",
      },
      performance: 94,
      badge: "Nuevo",
    },
    {
      id: 6,
      name: "NVIDIA GeForce RTX 4070 Ti",
      category: "gpu",
      price: "$799.99",
      originalPrice: "$899.99",
      image: rtx4070tiImage,
      specs: {
        memory: "12GB GDDR6X",
        boost: "2.61 GHz",
        power: "285W TGP",
        rayTracing: "3rd Gen RT",
      },
      performance: 85,
      badge: "Sweet Spot",
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section
      id="productos"
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Componentes de{" "}
            <span className="text-gray-600">Última Generación</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra selección curada de componentes premium para
            construir la PC más potente del mercado
          </p>
        </motion.div>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#catalogo"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver Catálogo Completo
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
