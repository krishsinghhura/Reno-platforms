import { useEffect } from "react";
import { X } from "lucide-react";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error";
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast = ({ id, title, description, variant = "default", duration = 5000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const variantStyles = {
    default: "bg-card border-border text-foreground",
    success: "bg-secondary/10 border-secondary text-secondary",
    error: "bg-destructive/10 border-destructive text-destructive",
  };

  return (
    <div
      className={`pointer-events-auto w-full max-w-sm rounded-lg border p-4 shadow-lg transition-all ${variantStyles[variant]}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          {title && <div className="font-semibold mb-1">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 rounded-md p-1 hover:bg-background/10 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export const ToastContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 flex flex-col gap-2 pointer-events-none">
      {children}
    </div>
  );
};
