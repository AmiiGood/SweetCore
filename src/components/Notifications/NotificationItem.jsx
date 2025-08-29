import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  ShoppingCart,
  Heart,
  Zap,
} from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

const NotificationItem = ({ notification }) => {
  const { removeNotification } = useNotification();
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(100);

  const { id, title, message, type, action, persistent } = notification;

  useEffect(() => {
    if (persistent) return;

    const duration = 5000;
    const interval = 50;
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      if (!isHovered) {
        setProgress((prev) => {
          const newProgress = prev - decrement;
          if (newProgress <= 0) {
            removeNotification(id);
            return 0;
          }
          return newProgress;
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [id, removeNotification, persistent, isHovered]);

  const getTypeConfig = () => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-white",
          borderColor: "border-gray-900",
          iconColor: "text-gray-900",
          progressColor: "bg-gray-900",
          icon: CheckCircle,
          titleColor: "text-gray-900",
          messageColor: "text-gray-600",
          accentColor: "bg-gray-900",
        };
      case "error":
        return {
          bgColor: "bg-gray-900",
          borderColor: "border-gray-900",
          iconColor: "text-white",
          progressColor: "bg-white",
          icon: AlertCircle,
          titleColor: "text-white",
          messageColor: "text-gray-300",
          accentColor: "bg-white",
        };
      case "warning":
        return {
          bgColor: "bg-gray-100",
          borderColor: "border-gray-300",
          iconColor: "text-gray-900",
          progressColor: "bg-gray-700",
          icon: AlertTriangle,
          titleColor: "text-gray-900",
          messageColor: "text-gray-700",
          accentColor: "bg-gray-700",
        };
      case "cart":
        return {
          bgColor: "bg-white",
          borderColor: "border-gray-200",
          iconColor: "text-gray-900",
          progressColor: "bg-gray-900",
          icon: ShoppingCart,
          titleColor: "text-gray-900",
          messageColor: "text-gray-600",
          accentColor: "bg-gray-900",
        };
      default:
        return {
          bgColor: "bg-white",
          borderColor: "border-gray-200",
          iconColor: "text-gray-600",
          progressColor: "bg-gray-600",
          icon: Info,
          titleColor: "text-gray-900",
          messageColor: "text-gray-600",
          accentColor: "bg-gray-600",
        };
    }
  };

  const config = getTypeConfig();
  const Icon = config.icon;

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border ${config.bgColor} ${config.borderColor} shadow-lg backdrop-blur-sm`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      layout
    >
      {!persistent && (
        <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full">
          <motion.div
            className={`h-full ${config.progressColor}`}
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
          >
            <Icon className={`${config.iconColor} flex-shrink-0`} size={20} />
          </motion.div>

          <div className="flex-1 min-w-0">
            <motion.h4
              className={`font-semibold text-sm ${config.titleColor}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h4>

            {message && (
              <motion.p
                className={`text-sm mt-1 ${config.messageColor}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {message}
              </motion.p>
            )}

            {action && (
              <motion.button
                onClick={action.onClick}
                className={`mt-3 text-sm font-medium hover:underline transition-colors ${
                  type === "error"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-900 hover:text-gray-700"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {action.label}
              </motion.button>
            )}
          </div>

          <motion.button
            onClick={() => removeNotification(id)}
            className={`flex-shrink-0 p-1 rounded-lg transition-colors group ${
              type === "error" ? "hover:bg-white/10" : "hover:bg-black/5"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X
              size={16}
              className={`transition-colors ${
                type === "error"
                  ? "text-gray-400 group-hover:text-white"
                  : "text-gray-400 group-hover:text-gray-600"
              }`}
            />
          </motion.button>
        </div>
      </div>

      <motion.div
        className={`absolute inset-0 ${config.accentColor} opacity-0 rounded-xl`}
        animate={isHovered ? { opacity: 0.05 } : { opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default NotificationItem;
