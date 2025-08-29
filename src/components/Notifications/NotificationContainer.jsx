import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "../../context/NotificationContext";
import NotificationItem from "./NotificationItem";

const NotificationContainer = () => {
  const { notifications } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] space-y-2 max-w-sm w-full">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            layout
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                delay: index * 0.1,
              },
            }}
            exit={{
              opacity: 0,
              x: 100,
              scale: 0.9,
              transition: { duration: 0.3 },
            }}
          >
            <NotificationItem notification={notification} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;
