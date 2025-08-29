import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, X, Info } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "warning",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmVariant = "primary",
}) => {
  const getTypeConfig = () => {
    switch (type) {
      case "danger":
        return {
          icon: AlertTriangle,
          iconColor: "text-white",
          iconBg: "bg-gray-900",
        };
      case "success":
        return {
          icon: CheckCircle,
          iconColor: "text-gray-900",
          iconBg: "bg-gray-100",
        };
      case "info":
        return {
          icon: Info,
          iconColor: "text-gray-600",
          iconBg: "bg-gray-50",
        };
      default:
        return {
          icon: AlertTriangle,
          iconColor: "text-gray-700",
          iconBg: "bg-gray-100",
        };
    }
  };

  const config = getTypeConfig();
  const Icon = config.icon;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className={`p-3 rounded-full ${config.iconBg}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
                  >
                    <Icon className={config.iconColor} size={24} />
                  </motion.div>

                  <div className="flex-1">
                    <motion.h3
                      className="text-lg font-bold text-gray-900"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {title}
                    </motion.h3>
                  </div>

                  <motion.button
                    onClick={onClose}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} className="text-gray-400" />
                  </motion.button>
                </div>

                <motion.p
                  className="text-gray-600 mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {message}
                </motion.p>

                <motion.div
                  className="flex gap-3 justify-end"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    onClick={onClose}
                    className="px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {cancelText}
                  </motion.button>

                  <motion.button
                    onClick={handleConfirm}
                    className={`px-6 py-2.5 text-white rounded-lg font-medium transition-all ${
                      confirmVariant === "danger"
                        ? "bg-gray-900 hover:bg-gray-800"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {confirmText}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
