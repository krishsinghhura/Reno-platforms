import { useState, useCallback } from "react";

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error";
  duration?: number;
}

let toastIdCounter = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: Omit<ToastData, "id">) => {
    const id = `toast-${toastIdCounter++}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback((options: Omit<ToastData, "id">) => {
    return addToast(options);
  }, [addToast]);

  return {
    toasts,
    toast,
    removeToast,
  };
};
