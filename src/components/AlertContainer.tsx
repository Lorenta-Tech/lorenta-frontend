import { useAlert } from "../contexts/AlertContext";

const AlertContainer = () => {
  const getAlertStyle = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500 text-black";
      case "info":
      default:
        return "bg-blue-500";
    }
  };

  const { alerts, removeAlert } = useAlert();

  return (
    <div className="fixed top-15 right-5 z-[9999] flex flex-col gap-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-center justify-between gap-4 px-4 py-3 rounded-lg shadow-lg text-white min-w-[250px]
            ${getAlertStyle(alert.type)}`}
        >
          <span className="text-sm">{alert.message}</span>
          <button
            onClick={() => removeAlert(alert.id)}
            className="text-white/80 hover:text-white text-lg leading-none"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlertContainer