import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification debe usarse dentro de NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(
    ({
      title,
      message,
      type = "info", // info, success, warning, error
      duration = 5000,
      action = null,
      persistent = false,
    }) => {
      const id = Date.now() + Math.random();

      const notification = {
        id,
        title,
        message,
        type,
        action,
        persistent,
        timestamp: new Date(),
      };

      setNotifications((prev) => [...prev, notification]);

      // Auto-remove after duration (unless persistent)
      if (!persistent && duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }

      return id;
    },
    []
  );

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback(
    (title, message, options = {}) => {
      return addNotification({
        title,
        message,
        type: "success",
        ...options,
      });
    },
    [addNotification]
  );

  const showError = useCallback(
    (title, message, options = {}) => {
      return addNotification({
        title,
        message,
        type: "error",
        duration: 8000, // Longer for errors
        ...options,
      });
    },
    [addNotification]
  );

  const showWarning = useCallback(
    (title, message, options = {}) => {
      return addNotification({
        title,
        message,
        type: "warning",
        ...options,
      });
    },
    [addNotification]
  );

  const showInfo = useCallback(
    (title, message, options = {}) => {
      return addNotification({
        title,
        message,
        type: "info",
        ...options,
      });
    },
    [addNotification]
  );

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
