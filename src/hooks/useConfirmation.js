import { useState } from "react";

export const useConfirmation = () => {
  const [confirmationState, setConfirmationState] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "warning",
    onConfirm: null,
    confirmText: "Confirmar",
    cancelText: "Cancelar",
    confirmVariant: "primary",
  });

  const showConfirmation = ({
    title,
    message,
    type = "warning",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    confirmVariant = "primary",
  }) => {
    return new Promise((resolve) => {
      setConfirmationState({
        isOpen: true,
        title,
        message,
        type,
        confirmText,
        cancelText,
        confirmVariant,
        onConfirm: () => {
          resolve(true);
          closeConfirmation();
        },
      });
    });
  };

  const closeConfirmation = () => {
    setConfirmationState((prev) => ({ ...prev, isOpen: false }));
  };

  const confirmDelete = (itemName) => {
    return showConfirmation({
      title: "Confirmar eliminación",
      message: `¿Estás seguro de que quieres eliminar "${itemName}"? Esta acción no se puede deshacer.`,
      type: "danger",
      confirmText: "Eliminar",
      confirmVariant: "danger",
    });
  };

  const confirmClearCart = () => {
    return showConfirmation({
      title: "Vaciar carrito",
      message:
        "¿Estás seguro de que quieres vaciar tu carrito? Se eliminarán todos los productos.",
      type: "warning",
      confirmText: "Vaciar carrito",
      confirmVariant: "danger",
    });
  };

  const confirmLogout = () => {
    return showConfirmation({
      title: "Cerrar sesión",
      message: "¿Estás seguro de que quieres cerrar sesión?",
      type: "info",
      confirmText: "Cerrar sesión",
    });
  };

  return {
    confirmationState,
    showConfirmation,
    closeConfirmation,
    confirmDelete,
    confirmClearCart,
    confirmLogout,
  };
};
