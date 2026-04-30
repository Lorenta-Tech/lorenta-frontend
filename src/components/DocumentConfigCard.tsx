import { DocumentConfig } from "../types";
import CardHeader from "./CardHeader";
import ToggleSwitch from "./ToggleSwitch";
import CardActions from "./CardActions";
import PageRangePicker from "./PageRangePicker";
import CopiesStepper from "./CopiesStepper";
import PPScomponent from "./PPScomponent";

interface Props {
  configs: DocumentConfig;
  onUpdate: (updated: DocumentConfig) => void;
  onRemove: (id: string) => void;
  onApplyToAll: (configs: DocumentConfig) => void;
  onView: (configs: DocumentConfig) => void;
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
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-4">

      <CardHeader
        title={configs.name}
        onRemove={() => onRemove(configs.id)}
      />

      {configs.isPDF && 
        <PageRangePicker
        value={
          Array.isArray(configs.range) && configs.range.length > 0
            ? configs.range
            : [`1-${configs.totalPages}`]
        }
        totalPages={configs.totalPages}
        onChange={(val: string[]) => handleChange("range", val)}
      />
      }

      <CopiesStepper
        value={configs.copies}
        onChange={(val: number) => handleChange("copies", val)}
      />

      <ToggleSwitch
        label="Color Print"
        checked={configs.isColor}
        onChange={(val: boolean) => handleChange("isColor", val)}
      />

      <ToggleSwitch
        label="Double-sided"
        checked={configs.duplex}
        onChange={(val: boolean) => handleChange("duplex", val)}
      />

      <PPScomponent
        label="Pages per Sheet"
        perSheet={configs.pagesPerSheet}
        onChange={(val: number)=> handleChange("pagesPerSheet", val)}
      />
      
      <CardActions
        onView={() => onView(configs)}
        onApplyToAll={() => onApplyToAll(configs)}
      />

    </div>
  );
};

export default DocumentConfigCard;