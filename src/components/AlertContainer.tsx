import { useAlert } from "../contexts/AlertContext";

const AlertContainer = () => {
  const getAlertStyle = (type: string) => {
    switch (type) {
      case "success":
        return "border-primary/40 bg-primary/15 text-primary";
      case "error":
        return "border-cta/40 bg-cta/10 text-cta";
      case "warning":
        return "border-cta/40 bg-cta/10 text-cta";
      case "info":
      default:
        return "border-primary/40 bg-primary/15 text-primary";
    }
  };

  const { alerts, removeAlert } = useAlert();

  return (
    <div className="fixed right-4 top-20 z-[9999] grid w-[calc(100vw-2rem)] max-w-sm gap-3" role="region" aria-live="polite">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-lg ${getAlertStyle(alert.type)}`}
        >
          <span>{alert.message}</span>
          <button
            type="button"
            onClick={() => removeAlert(alert.id)}
            className="grid size-8 place-items-center rounded-lg transition hover:bg-white/10"
            aria-label="Dismiss alert"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlertContainer
