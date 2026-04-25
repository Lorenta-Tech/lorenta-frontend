type ToggleSwitchProps = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200
          ${checked ? "bg-blue-500" : "bg-gray-300"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200
            ${checked ? "translate-x-6" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;