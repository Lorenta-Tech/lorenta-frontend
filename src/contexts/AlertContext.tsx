import { createContext, useContext, useState, ReactNode } from "react";

type AlertType = "success" | "error" | "warning" | "info";

type Alert = {
  id: string;
  message: string;
  type: AlertType;
};

type AlertContextType = {
  alerts: Alert[];
  showAlert: (message: string, type?: AlertType) => void;
  removeAlert: (id: string) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = (message: string, type: AlertType = "info") => {
    const id = crypto.randomUUID();

    setAlerts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeAlert(id);
    }, 3000);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, showAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used inside AlertProvider");
  return ctx;
};