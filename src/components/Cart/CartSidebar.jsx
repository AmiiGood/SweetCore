import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2, CreditCard } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../context/NotificationContext";
import { useConfirmation } from "../../hooks/useConfirmation";
import ConfirmationModal from "../Notifications/ConfirmationModal";

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } =
    useCart();
  const { showSuccess, showInfo } = useNotification();
  const {
    confirmationState,
    closeConfirmation,
    confirmDelete,
    confirmClearCart,
  } = useConfirmation();

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const sidebarVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 },
    }),
    exit: { opacity: 0, x: 20 },
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price.replace(/[$,]/g, ""));
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(numPrice);
  };

  const handleRemoveItem = async (item) => {
    const confirmed = await confirmDelete(item.name);
    if (confirmed) {
      removeItem(item.id);
      showSuccess(
        "Producto eliminado",
        `${item.name} ha sido eliminado del carrito`
      );
    }
  };

  const handleClearCart = async () => {
    if (items.length === 0) return;

    const confirmed = await confirmClearCart();
    if (confirmed) {
      clearCart();
      showSuccess(
        "Carrito vaciado",
        "Todos los productos han sido eliminados del carrito"
      );
    }
  };

  const handleCheckout = () => {
    showInfo(
      "Checkout próximamente",
      "¡La función de pago estará disponible muy pronto! 🚀",
      {
        duration: 4000,
        action: {
          label: "Ver más detalles",
          onClick: () => console.log("Ver detalles del checkout"),
        },
      }
    );
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(item);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={onClose}
            />

            <motion.div
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <ShoppingBag className="text-gray-700" size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Tu Carrito
                    </h2>
                    <p className="text-sm text-gray-500">
                      {items.length}{" "}
                      {items.length === 1 ? "producto" : "productos"}
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={20} className="text-gray-600" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-full p-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <ShoppingBag size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Tu carrito está vacío
                    </h3>
                    <p className="text-gray-500 mb-4">
                      ¡Agrega algunos productos increíbles para empezar!
                    </p>
                    <motion.button
                      onClick={onClose}
                      className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Explorar Productos
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="p-4 space-y-4">
                    <AnimatePresence>
                      {items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          custom={index}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                        >
                          <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
                              {item.name}
                            </h4>
                            <p className="text-lg font-bold text-gray-900 mt-1">
                              {formatPrice(item.price)}
                            </p>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <motion.button
                              onClick={() => handleRemoveItem(item)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Trash2 size={16} />
                            </motion.button>

                            <div className="flex items-center gap-2">
                              <motion.button
                                onClick={() =>
                                  handleQuantityChange(item, item.quantity - 1)
                                }
                                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Minus size={14} className="text-gray-600" />
                              </motion.button>

                              <span className="w-8 text-center font-semibold text-gray-900">
                                {item.quantity}
                              </span>

                              <motion.button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Plus size={14} className="text-gray-600" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {items.length > 0 && (
                      <motion.button
                        onClick={handleClearCart}
                        className="w-full py-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Vaciar carrito
                      </motion.button>
                    )}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <motion.div
                  className="border-t border-gray-200 p-6 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(getTotalPrice().toString())}
                    </span>
                  </div>

                  <motion.button
                    onClick={handleCheckout}
                    className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CreditCard size={20} />
                    Proceder al Pago
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center">
                    Envío gratis en pedidos superiores a $500
                  </p>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmationModal
        isOpen={confirmationState.isOpen}
        onClose={closeConfirmation}
        onConfirm={confirmationState.onConfirm}
        title={confirmationState.title}
        message={confirmationState.message}
        type={confirmationState.type}
        confirmText={confirmationState.confirmText}
        cancelText={confirmationState.cancelText}
        confirmVariant={confirmationState.confirmVariant}
      />
    </>
  );
};

export default CartSidebar;
