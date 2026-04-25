import { DocumentConfig } from "../types";
import CardHeader from "./CardHeader";
import InputField from "./InputField";
import ToggleSwitch from "./ToggleSwitch";
import CardActions from "./CardActions";

interface Props {
  configs: DocumentConfig;
  onUpdate: (updated: DocumentConfig) => void;
  onRemove: (id: string) => void;
  onApplyToAll: (config: DocumentConfig) => void;
  onView: (config: DocumentConfig) => void;
}

const DocumentConfigCard: React.FC<Props> = ({
  configs,
  onUpdate,
  onRemove,
  onApplyToAll,
  onView,
}) => {
  const handleChange = <K extends keyof DocumentConfig>(
    field: K,
    value: DocumentConfig[K]
  ) => {
    onUpdate({ ...configs, [field]: value });
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-3">

      <CardHeader
        title={configs.name}
        onRemove={() => onRemove(configs.id)}
      />

      <InputField
        label="Page Range"
        value={configs.range}
        placeholder="e.g. 1-5, 8"
        onChange={(val) => handleChange("range", val)}
      />

      <InputField
        label="Copies"
        type="number"
        min={1}
        value={configs.copies}
        onChange={(val) => handleChange("copies", Number(val))}
      />

      <ToggleSwitch
        label="Color Print"
        checked={configs.isColor}
        onChange={(val) => handleChange("isColor", val)}
      />

      <ToggleSwitch
        label="Duplex"
        checked={configs.duplex}
        onChange={(val) => handleChange("duplex", val)}
      />

      <CardActions
        onView={() => onView(configs)}
        onApplyToAll={() => onApplyToAll(configs)}
      />

    </div>
  );
};

export default DocumentConfigCard;