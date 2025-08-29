import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Zap,
  Info,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/NotificationContext";

const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const { showSuccess, showInfo } = useNotification();
  const itemQuantity = getItemQuantity(product.id);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    rest: { scale: 1, rotateY: 0 },
    hover: {
      scale: 1.05,
      rotateY: -5,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const specsVariants = {
    rest: { opacity: 0, y: 20, height: 0 },
    hover: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const handleAddToCart = async () => {
    setIsAdding(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    addItem(product);
    setIsAdding(false);

    showSuccess(
      "Producto agregado",
      `${product.name} ha sido agregado al carrito`,
      {
        type: "cart",
        action: {
          label: "Ver carrito",
          onClick: () => {
            document.dispatchEvent(new CustomEvent("openCart"));
          },
        },
      }
    );
  };

  const handleQuantityChange = (newQuantity) => {
    const oldQuantity = itemQuantity;

    if (newQuantity <= 0) {
      updateQuantity(product.id, 0);
      showInfo(
        "Producto eliminado",
        `${product.name} ha sido eliminado del carrito`
      );
    } else {
      updateQuantity(product.id, newQuantity);

      if (newQuantity > oldQuantity) {
        showSuccess(
          "Cantidad actualizada",
          `Ahora tienes ${newQuantity} unidades de ${product.name}`
        );
      }
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);

    if (!isFavorite) {
      showSuccess(
        "Agregado a favoritos",
        `${product.name} ha sido agregado a tus favoritos`,
        {
          duration: 3000,
          action: {
            label: "Ver favoritos",
            onClick: () => console.log("Ver favoritos"),
          },
        }
      );
    } else {
      showInfo(
        "Eliminado de favoritos",
        `${product.name} ha sido eliminado de tus favoritos`
      );
    }
  };

  const handleViewDetails = () => {
    showInfo(
      "Vista de detalles",
      "La página de detalles estará disponible próximamente",
      {
        duration: 4000,
        action: {
          label: "Saber más",
          onClick: () => console.log("Ver roadmap"),
        },
      }
    );
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
        whileHover={{ y: -8 }}
      >
        {product.badge && (
          <motion.div
            className="absolute top-4 left-4 z-10 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {product.badge}
          </motion.div>
        )}

        <motion.button
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300"
          onClick={handleToggleFavorite}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            size={18}
            className={`${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            } transition-colors duration-300`}
          />
        </motion.button>

        {itemQuantity > 0 && (
          <motion.div
            className="absolute top-4 right-16 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {itemQuantity}
          </motion.div>
        )}

        <motion.div
          className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
          variants={imageVariants}
          animate={isHovered ? "hover" : "rest"}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
            style={{
              filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.1))",
            }}
          />

          <motion.div
            className="absolute inset-0 bg-gray-900/5"
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          <motion.div
            className="absolute bottom-4 left-4 right-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-between text-xs font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-1">
                  <Zap size={12} />
                  Rendimiento
                </span>
                <span>{product.performance}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-gray-900 rounded-full"
                  initial={{ width: 0 }}
                  animate={
                    isHovered
                      ? { width: `${product.performance}%` }
                      : { width: 0 }
                  }
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="p-5">
          <motion.h3
            className="text-lg font-bold text-gray-900 mb-2 line-clamp-2"
            layout
          >
            {product.name}
          </motion.h3>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl font-bold text-gray-900">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>

          <motion.div
            variants={specsVariants}
            animate={isHovered ? "hover" : "rest"}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
              {Object.entries(product.specs).map(([key, value], i) => (
                <motion.div
                  key={key}
                  className="bg-gray-50 rounded-lg p-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                  }
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="font-medium capitalize text-gray-800">
                    {key}
                  </div>
                  <div className="text-gray-600">{value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="flex gap-2">
            {itemQuantity === 0 ? (
              <motion.button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-gray-900 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isAdding ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Agregando...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    Agregar
                  </>
                )}
              </motion.button>
            ) : (
              <div className="flex-1 flex items-center justify-between bg-gray-100 rounded-lg p-2">
                <motion.button
                  onClick={() => handleQuantityChange(itemQuantity - 1)}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Minus size={14} className="text-gray-600" />
                </motion.button>

                <div className="flex items-center gap-2 px-2">
                  <Check size={16} className="text-green-500" />
                  <span className="font-semibold text-gray-900">
                    {itemQuantity}
                  </span>
                </div>

                <motion.button
                  onClick={() => handleQuantityChange(itemQuantity + 1)}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus size={14} className="text-gray-600" />
                </motion.button>
              </div>
            )}

            <motion.button
              onClick={handleViewDetails}
              className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Info
                size={16}
                className="text-gray-600 group-hover:text-gray-900"
              />
            </motion.button>
          </div>
        </div>

        <motion.div
          className="absolute inset-0 rounded-2xl bg-gray-900/5 -z-10"
          animate={
            isHovered ? { opacity: 1, scale: 1.02 } : { opacity: 0, scale: 1 }
          }
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
