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

export const CategorySelector = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3 mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {categories.map((category, index) => {
        const Icon = category.icon;
        return (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden flex items-center gap-2 ${
              activeCategory === category.id
                ? "text-white shadow-lg"
                : "text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md"
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeCategory === category.id && (
              <motion.div
                className="absolute inset-0 bg-gray-900"
                layoutId="activeEnsambleCategory"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            <div className="relative flex items-center gap-2 z-10">
              <Icon size={16} />
              <span>{category.name}</span>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
};
