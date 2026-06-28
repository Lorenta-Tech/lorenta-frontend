// import { DocumentConfig, UploadedFile } from "../types";
// import CardHeader from "./CardHeader";
// import ToggleSwitch from "./ToggleSwitch";
// import CardActions from "./CardActions";
// import PageRangePicker from "./PageRangePicker";
// import CopiesStepper from "./CopiesStepper";
// import PPScomponent from "./PPScomponent";
// import { useCart } from "../contexts/CartContext";

// interface Props {
//   config: DocumentConfig;
//   file: UploadedFile;
//   onView: () => void;
// }

// const DocumentConfigCard: React.FC<Props> = ({ config, file, onView }) => {
//   const { updateConfig, removeConfig, applyToAll } = useCart();

//   const isPDF = (file.type === "application/pdf");

//   const handleChange = <K extends keyof DocumentConfig>(
//     field: K,
//     value: DocumentConfig[K]
//   ) => {
//     updateConfig({ ...config, [field]: value });
//   };

//   return (
//     <div className="grid min-w-0 gap-4 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-4 shadow-sm sm:p-5">
      
//       <CardHeader
//         title={file.name}
//         onRemove={() => removeConfig(config.file_id)}
//       />

//       {isPDF && (
//         <PageRangePicker
//           value={
//             Array.isArray(config.page_range) && config.page_range.length > 0
//               ? config.page_range
//               : [file.pages===1?`1`:`1-${file.pages}`]
//           }
//           totalPages={file.pages}
//           onChange={(val: string[]) => handleChange("page_range", val)}
//         />
//       )}

//       <CopiesStepper
//         value={config.copies}
//         onChange={(val: number) => handleChange("copies", val)}
//       />

//       <ToggleSwitch
//         label="Color Print"
//         checked={config.printing_mode === "color"}
//         onChange={(val: boolean) => 
//           handleChange("printing_mode", val ? "color" : "monochromatic")
//         }
//       />

//       <ToggleSwitch
//         label="Double-sided"
//         checked={config.printing_side === "double_side"}
//         onChange={(val: boolean) =>
//           handleChange("printing_side", val ? "double_side" : "single_side")
//         }
//       />

//       <PPScomponent
//         label="Pages per Side"
//         perSheet={config.page_layout}
//         onChange={(val: number) =>
//           handleChange("page_layout", val)
//         }
//       />

//       <CardActions
//         onView={onView}
//         onApplyToAll={() => applyToAll(config)}
//       />
//     </div>
//   );
// };

// export default DocumentConfigCard;

import { DocumentConfig, UploadedFile } from "../types";
import CardHeader from "./CardHeader";
import ToggleSwitch from "./ToggleSwitch";
import CardActions from "./CardActions";
import PageRangePicker from "./PageRangePicker";
import CopiesStepper from "./CopiesStepper";
import PPScomponent from "./PPScomponent";
import { useCart } from "../contexts/CartContext";
import { IoColorPaletteOutline } from "react-icons/io5";
import { TbLayoutRows } from "react-icons/tb";
import { BsFileEarmarkText } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";
import { countSelectedPages } from "../utils/pageUtils";

interface Props {
  config: DocumentConfig;
  file: UploadedFile;
  onView: () => void;
}

const DocumentConfigCard: React.FC<Props> = ({ config, file, onView }) => {
  const { updateConfig, removeConfig, applyToAll } = useCart();

  const isPDF = file.type === "application/pdf";

  const handleChange = <K extends keyof DocumentConfig>(
    field: K,
    value: DocumentConfig[K]
  ) => {
    updateConfig({ ...config, [field]: value });
  };

  const isColor = config.printing_mode === "color";
  const isDouble = config.printing_side === "double_side";

  return (
    <div className="grid min-w-0 gap-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-lg">

      {/* Card Header */}
      <div className="border-b border-white/10 px-5 pt-5 pb-4">
        <CardHeader
          title={file.name}
          onRemove={() => removeConfig(config.file_id)}
        />

        {/* Summary Badges */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isColor ? "bg-yellow-400/10 text-yellow-300" : "bg-white/10 text-white/50"}`}>
            <IoColorPaletteOutline size={12} />
            {isColor ? "Color" : "B&W"}
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isDouble ? "bg-primary/15 text-primary" : "bg-white/10 text-white/50"}`}>
            <TbLayoutRows size={12} />
            {isDouble ? "Double-sided" : "Single-sided"}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/50">
            <MdContentCopy size={12} />
            {config.copies} {config.copies === 1 ? "copy" : "copies"}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/50">
            <BsFileEarmarkText size={12} />
            {config.page_layout}p/side
          </span>
        </div>
      </div>

      {/* Settings Body */}
      <div className="grid gap-0 divide-y divide-white/[0.06] px-5">

        {/* Page Range */}
        {isPDF && (
          <div className="py-4">
            <PageRangePicker
              value={
                Array.isArray(config.page_range) && config.page_range.length > 0
                  ? config.page_range
                  : [file.pages === 1 ? "1" : `1-${file.pages}`]
              }
              totalPages={file.pages}
              onChange={(val) =>
                updateConfig({
                  ...config,
                  page_range: val,
                  num_of_pages: countSelectedPages(val, file.pages),
                })
              }
            />
          </div>
        )}

        {/* Copies */}
        <div className="py-4">
          <CopiesStepper
            value={config.copies}
            onChange={(val: number) => handleChange("copies", val)}
          />
        </div>

        {/* Color Print */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <IoColorPaletteOutline
              size={16}
              className={isColor ? "text-yellow-300" : "text-white/40"}
            />
            <div>
              <p className="text-sm font-semibold text-white">Color Print</p>
            </div>
          </div>
          <ToggleSwitch
            label=""
            checked={config.printing_mode === "color"}
            onChange={(val: boolean) =>
              handleChange("printing_mode", val ? "color" : "monochromatic")
            }
          />
        </div>

        {/* Double Sided */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <TbLayoutRows
              size={16}
              className={isDouble ? "text-primary" : "text-white/40"}
            />
            <div>
              <p className="text-sm font-semibold text-white">Double-sided</p>
            </div>
          </div>
          <ToggleSwitch
            label=""
            checked={config.printing_side === "double_side"}
            onChange={(val: boolean) =>
              handleChange("printing_side", val ? "double_side" : "single_side")
            }
          />
        </div>

        {/* Pages Per Side */}
        <div className="py-4">
          <PPScomponent
            label="Pages per Side"
            perSheet={config.page_layout}
            onChange={(val: number) => handleChange("page_layout", val)}
          />
        </div>

      </div>

      {/* Card Actions */}
      <div className=" border-white/10 px-2 py-4 -mt-3">
        <CardActions
          onView={onView}
          onApplyToAll={() => applyToAll(config)}
        />
      </div>

    </div>
  );
};

export default DocumentConfigCard;