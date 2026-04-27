interface Props {
  value: string;
  onChange: (val: string) => void;
}

const PageRangePicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Pages</label>

      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded-lg border border-gray-500 ${
            value === "" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => onChange("")}
        >
          All
        </button>

        <button
          className={`px-3 py-1 rounded-lg border border-greay-500 ${
            value === "custom" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => onChange("custom")}
        >
          Custom
        </button>
      </div>

      {value === "custom" && (
        <input
          className="border border-gray-400 rounded-lg px-2 py-1"
          placeholder="e.g. 1-5, 8"
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default PageRangePicker;