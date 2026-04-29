import { useState } from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const PageRangePicker: React.FC<Props> = ({ value, onChange }) => {
  const [isCustom, setIsCustom] = useState(false);
  const [customVal, setCustomVal] = useState(value);
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Pages</label>

      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded-lg border border-gray-500 ${
            !isCustom ? "bg-blue-500 text-white" : ""
          }`}
          onClick={()=>setIsCustom(false)}
        >
          All
        </button>

        <button
          className={`px-3 py-1 rounded-lg border border-greay-500 ${
            isCustom ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setIsCustom(true)}
        >
          Custom
        </button>
      </div>

      {isCustom && (
        <input
          className="border border-gray-400 rounded-lg px-2 py-1"
          placeholder="e.g. 1-5, 8"
          onChange={(e) => {
            setCustomVal(e.target.value);
            onChange(e.target.value);
          }}
          value={customVal}
        />
      )}
    </div>
  );
};

export default PageRangePicker;