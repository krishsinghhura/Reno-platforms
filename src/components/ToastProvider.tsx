"use client"
import { createContext, useContext, ReactNode } from "react";
import { useToast as useToastHook } from "../hooks/useToast";
import { Toast, ToastContainer } from "./Toast";

interface ToastContextType {
  toast: (options: { title?: string; description?: string; variant?: "default" | "success" | "error" }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const { toasts, toast, removeToast } = useToastHook();

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer>
        {toasts.map((toastData) => (
          <Toast
            key={toastData.id}
            {...toastData}
            onClose={removeToast}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
