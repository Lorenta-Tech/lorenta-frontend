import { DocumentConfig, UploadedFile } from "../types";
import CardHeader from "./CardHeader";
import ToggleSwitch from "./ToggleSwitch";
import CardActions from "./CardActions";
import PageRangePicker from "./PageRangePicker";
import CopiesStepper from "./CopiesStepper";
import PPScomponent from "./PPScomponent";
import { useCart } from "../contexts/CartContext";

interface Props {
  config: DocumentConfig;
  file: UploadedFile;
  onView: () => void;
}

const DocumentConfigCard: React.FC<Props> = ({ config, file, onView }) => {
  const { updateConfig, removeConfig, applyToAll } = useCart();

  const isPDF = (file.type === "application/pdf");

  const handleChange = <K extends keyof DocumentConfig>(
    field: K,
    value: DocumentConfig[K]
  ) => {
    updateConfig({ ...config, [field]: value });
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-4">
      
      <CardHeader
        title={file.name}
        onRemove={() => removeConfig(config.file_id)}
      />

      {isPDF && (
        <PageRangePicker
          value={
            Array.isArray(config.page_range) && config.page_range.length > 0
              ? config.page_range
              : [`1-${file.pages}`]
          }
          totalPages={file.pages}
          onChange={(val: string[]) => handleChange("page_range", val)}
        />
      )}

      <CopiesStepper
        value={config.copies}
        onChange={(val: number) => handleChange("copies", val)}
      />

      <ToggleSwitch
        label="Color Print"
        checked={config.printing_mode === "color"}
        onChange={(val: boolean) => 
          handleChange("printing_mode", val ? "color" : "monochromatic")
        }
      />

      <ToggleSwitch
        label="Double-sided"
        checked={config.printing_side === "double_side"}
        onChange={(val: boolean) =>
          handleChange("printing_side", val ? "double_side" : "single_side")
        }
      />

      <PPScomponent
        label="Pages per Sheet"
        perSheet={config.page_layout}
        onChange={(val: number) =>
          handleChange("page_layout", val)
        }
      />

      <CardActions
        onView={onView}
        onApplyToAll={() => applyToAll(config)}
      />
    </div>
  );
};

export default DocumentConfigCard;