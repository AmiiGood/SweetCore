import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  HardDrive,
  Monitor,
  Zap,
  Star,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Gamepad2,
  Briefcase,
  Palette,
  Settings,
} from "lucide-react";
import { CategorySelector } from "./CategorySelector";
import { EnsambleCard } from "./EnsambleCard";
import gamingBeastImage from "../../assets/images/gaming-beast.png";
import creatorProWorkstationImage from "../../assets/images/creator-pro-workstation.webp";
import gamingEssentialImage from "../../assets/images/gaming-essential.webp";
import streamingPcImage from "../../assets/images/streaming-pc.png";
import budgetGamingImage from "../../assets/images/budget-gaming-starter.webp";
import compactWorkstationImage from "../../assets/images/compact-workstation.avif";

const EnsambleShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "Todos", icon: Settings },
    { id: "gaming", name: "Gaming", icon: Gamepad2 },
    { id: "workstation", name: "Workstation", icon: Briefcase },
    { id: "creator", name: "Creadores", icon: Palette },
  ];

  const ensambles = [
    {
      id: 1,
      name: "SweetCore Gaming Beast",
      category: "gaming",
      price: "$2,599.00",
      originalPrice: "$3,599.99",
      monthlyPrice: "$137",
      image: gamingBeastImage,
      description:
        "PC gaming de alto rendimiento diseñada para 4K y ray tracing extremo.",
      performance: 98,
      rating: 5,
      reviews: 127,
      featured: true,
      specs: {
        cpu: "AMD Ryzen 9 9900X",
        gpu: "RTX 5080 MSI",
      },
      fullSpecs: {
        processor: "AMD Ryzen 9 9900X",
        graphics_card: "NVIDIA RTX 5080 MSI",
        memory: "32GB CORSAIR VENGEANCE DDR5-6000",
        storage: "1TB NVMe SSD",
        motherboard: "MSI X870 Gaming Plus WiFi",
        cooling: "AIO 360mm RGB",
        power_supply: "1000W 80+ Gold",
        case: "HYTE Y60",
      },
    },
    {
      id: 2,
      name: "Creator Pro Workstation",
      category: "workstation",
      price: "$3,799.00",
      originalPrice: "$4,599.99",
      monthlyPrice: "$175",
      image: creatorProWorkstationImage,
      description:
        "Estación de trabajo profesional para renderizado 3D y edición de video 8K.",
      performance: 95,
      rating: 5,
      reviews: 89,
      featured: true,
      specs: {
        cpu: "AMD Ryzen 9 9950X3D",
        gpu: "RTX 5070 TI",
      },
      fullSpecs: {
        processor: "AMD Ryzen 9 9950X3D",
        graphics_card: "GIGABYTE AERO GeForce RTX 5070 Ti OC 16G",
        memory: "32GB DDR5-5600",
        storage: "2TB NVMe SSD",
        motherboard: "MSI PRO X870-P WiFi AM5",
        cooling: "Lian Li Hydroshift 360 LCD Liquid CPU Cooler",
        power_supply: "1200W 80+ Platinum",
        case: "HYTE Y70 Touch Infinite Case",
      },
    },
    {
      id: 3,
      name: "Gaming Essential",
      category: "gaming",
      price: "$2,549.00",
      originalPrice: "$3,199.99",
      monthlyPrice: "$79",
      image: gamingEssentialImage,
      description:
        "PC gaming equilibrada para 1440p con excelente relación precio-rendimiento.",
      performance: 85,
      rating: 5,
      reviews: 203,
      specs: {
        cpu: "Intel® Core™ Ultra 5",
        gpu: "RTX 5060 TI",
      },
      fullSpecs: {
        processor: "Intel® Core™ Ultra 5 245K 4.2 - 5.2GHz 14-Cores",
        graphics_card: "NVIDIA® GeForce RTX™ 5060 Ti 16GB",
        memory: "32GB DDR5-6400",
        storage: "1TB NVMe SSD",
        motherboard: "ASUS TUF GAMING Z890-PLUS WIFI",
        cooling: "CPU AIO 240MM Water Cooler",
        power_supply: "750W 80+ Gold",
        case: "Pitch Black Touch",
      },
    },
    {
      id: 4,
      name: "Content Creator Studio",
      category: "creator",
      price: "$2,799.99",
      originalPrice: "$3,099.99",
      monthlyPrice: "$117",
      image: streamingPcImage,
      description:
        "Perfecta para streaming, edición de video 4K y creación de contenido.",
      performance: 90,
      rating: 5,
      reviews: 156,
      specs: {
        cpu: "Intel Core i7-14700K/KF",
        gpu: "RTX 5070",
      },
      fullSpecs: {
        processor: "Intel Core i7-14700K",
        graphics_card: "NVIDIA RTX 5070",
        memory: "32GB DDR5-6000",
        storage: "2TB NVMe SSD",
        motherboard: "Z790 DDR5",
        cooling:
          "Refrigeración líquida RGB, triple radiador y tres ventiladores",
        power_supply: "850W 80+ Gold",
        case: "WSNBB Gaming Case",
      },
    },
    {
      id: 5,
      name: "Budget Gaming Starter",
      category: "gaming",
      price: "$650.00",
      originalPrice: "$1,499.99",
      monthlyPrice: "$54",
      image: budgetGamingImage,
      description:
        "PC gaming de entrada para 1080p con gran potencial de actualización.",
      performance: 75,
      rating: 4,
      reviews: 312,
      specs: {
        cpu: "AMD Ryzen 5 5600G ",
        gpu: " AMD Radeon Vega 7 ",
      },
      fullSpecs: {
        processor: "AMD Ryzen 5 5600G",
        graphics_card: "AMD Radeon Vega 7",
        memory: "16GB DDR4-3200",
        storage: "1TB NVMe SSD",
        motherboard: "MSI B650 Gaming Plus",
        cooling: "Wraith Stealth",
        power_supply: "650W 80+ Bronze",
        case: "Cooler Master MasterBox",
      },
    },
    {
      id: 6,
      name: "Compact Workstation",
      category: "workstation",
      price: "$2,499.99",
      originalPrice: "$2,799.99",
      monthlyPrice: "$104",
      image: compactWorkstationImage,
      description:
        "Estación de trabajo compacta sin comprometer el rendimiento profesional.",
      performance: 88,
      rating: 4,
      reviews: 94,
      specs: {
        cpu: "AMD Ryzen 9 5950X",
        gpu: "RTX 3080",
      },
      fullSpecs: {
        processor: "AMD Ryzen 9 5950X",
        graphics_card: "NVIDIA RTX 3080",
        memory: "64GB DDR4-3200",
        storage: "2TB NVMe SSD",
        motherboard: "AMD B550",
        cooling: "AIO 120mm",
        power_supply: "600W 80+ Gold SFX",
        case: "Corsair One Case",
      },
    },
  ];

  const filteredEnsambles =
    activeCategory === "all"
      ? ensambles
      : ensambles.filter((ensamble) => ensamble.category === activeCategory);

  return (
    <section
      id="ensambles"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
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
            PCs <span className="text-gray-600">Pre-armadas</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Equipos profesionalmente ensamblados y testados, listos para usar
            desde el primer día
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Zap,
                title: "Testeo Profesional",
                desc: "Cada PC es probada 48 horas antes del envío",
              },
              {
                icon: Settings,
                title: "Personalización",
                desc: "Adapta cualquier componente a tus necesidades",
              },
              {
                icon: HardDrive,
                title: "Garantía Extendida",
                desc: "3 años de garantía en todo el sistema",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <feature.icon size={20} className="text-gray-700" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <CategorySelector
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEnsambles.map((ensamble, index) => (
            <EnsambleCard key={ensamble.id} ensamble={ensamble} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-16 p-8 bg-gray-900 rounded-2xl text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">
            ¿No encuentras lo que buscas?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Nuestro equipo de expertos puede crear una configuración
            personalizada específicamente para tus necesidades y presupuesto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Configurador Personalizado
            </motion.button>
            <motion.button
              className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hablar con un Experto
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnsambleShowcase;
