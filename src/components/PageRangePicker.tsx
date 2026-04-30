import { useEffect, useState } from "react";

interface Props {
  value: string[];
  onChange: (val: string[]) => void;
  totalPages: number;
}

const PageRangePicker: React.FC<Props> = ({
  value,
  onChange,
  totalPages,
}) => {

  const safeValue = Array.isArray(value) ? value : [];
  const [mode, setMode] = useState<"all" | "custom">("all");

  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (safeValue.length === 0) {
      setInput("");
      return;
    }
    setInput(safeValue.join(", "));
  }, [safeValue]);

  useEffect(() => {
    const isAll =
      safeValue.length === 1 &&
      safeValue[0] === `1-${totalPages}`;

    setMode(isAll ? "all" : "custom");
  }, [safeValue, totalPages]);

  const parse = (input: string) => {
    const parts = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    for (const part of parts) {
      if (!/^(\d+)(-\d+)?$/.test(part)) {
        return `Invalid: "${part}"`;
      }

      if (part.includes("-")) {
        const [s, e] = part.split("-").map(Number);
        if (s > e) return `Invalid range: ${part}`;
        if (s < 1 || e > totalPages)
          return `Out of bounds: ${part}`;
      } else {
        const n = Number(part);
        if (n < 1 || n > totalPages)
          return `Out of bounds: ${part}`;
      }
    }

    return parts;
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Pages</label>

      <div className="flex gap-2">
        {/* ALL */}
        <button
          type="button"
          className={`px-3 py-1 rounded-lg border ${
            mode === "all"
              ? "bg-blue-500 text-white"
              : "border-gray-500"
          }`}
          onClick={() => {
            setMode("all");
            setError(null);
            onChange([`1-${totalPages}`]);
          }}
        >
          All
        </button>

        {/* CUSTOM */}
        <button
          type="button"
          className={`px-3 py-1 rounded-lg border ${
            mode === "custom"
              ? "bg-blue-500 text-white"
              : "border-gray-500"
          }`}
          onClick={() => {
            setMode("custom");
            if (mode === "all"){
              setInput(`1-${totalPages}`);
            }
          }}
        >
          Custom
        </button>
      </div>

      {mode === "custom" && (
        <>
          <input
            value={input}
            placeholder="e.g. 1-5, 8"
            className={`px-2 py-1 rounded-lg border ${
              error ? "border-red-500" : "border-gray-400"
            }`}
            onChange={(e) => {
              const val = e.target.value;

              if (!/^[0-9,\-\s]*$/.test(val)) return;

              setInput(val);

              if (val.trim() === "") {
                setError(null);
                return; 
              }

              const result = parse(val);

              if (typeof result === "string") {
                setError(result);
              } else {
                setError(null);
                onChange(result);
              }
            }}
          />

          {error && (
            <p className="text-red-500 text-xs mt-1">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PageRangePicker;