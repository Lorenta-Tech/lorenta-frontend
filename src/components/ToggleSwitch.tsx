type ToggleSwitchProps = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex min-w-0 items-center justify-between gap-4">
      <span className="min-w-0 text-sm font-semibold text-white/70">{label}</span>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition duration-200 ${checked ? "bg-primary" : "bg-white/25"}`}
      >
        <div className={`size-6 rounded-full bg-white shadow-sm transition duration-200 ${checked ? "translate-x-6" : "translate-x-0"}`} />
      </button>
    </div>
  );
};

export default ToggleSwitch;
