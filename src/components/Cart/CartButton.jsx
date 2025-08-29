import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

const CartButton = ({ onClick, className = "" }) => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <motion.button
      onClick={onClick}
      className={`relative p-3 bg-transparent hover:bg-gray-200 rounded-xl transition-all duration-300 group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ShoppingCart
        size={20}
        className="text-gray-700 group-hover:text-gray-900 transition-colors"
      />

      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gray-950 text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            <motion.span
              key={itemCount}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              {itemCount > 99 ? "99+" : itemCount}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {itemCount > 0 && (
        <motion.div
          className="absolute inset-0 bg-blue-500 rounded-xl -z-10"
          initial={{ scale: 1, opacity: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        />
      )}
    </motion.button>
  );
};

export default CartButton;
