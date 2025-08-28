import React from "react";
import { motion } from "framer-motion";

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2 mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`relative px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden ${
            activeCategory === category.id
              ? "text-white shadow-lg"
              : "text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md"
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileHover={{
            scale: 1.05,
            y: -2,
          }}
          whileTap={{ scale: 0.95 }}
        >
          {activeCategory === category.id && (
            <motion.div
              className="absolute inset-0 bg-gray-900"
              layoutId="activeCategory"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          )}

          <motion.div
            className="relative flex items-center gap-2 z-10"
            animate={activeCategory === category.id ? { y: 0 } : { y: 0 }}
          >
            <span>{category.name}</span>

            {activeCategory === category.id && (
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full ml-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
            )}
          </motion.div>

          {activeCategory !== category.id && (
            <motion.div
              className="absolute inset-0 bg-gray-100 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategoryFilter;
