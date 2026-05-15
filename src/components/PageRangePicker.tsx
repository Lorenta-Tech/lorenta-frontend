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

  const [input, setInput] = useState(
    Array.isArray(value) ? value.join(", ") : ""
  );
  const [error, setError] = useState<string | null>(null);

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
    <div className="grid min-w-0 gap-2">
      <label className="text-sm font-semibold text-white/70">Pages</label>

      <div className="flex min-w-0 flex-wrap gap-2">
        {/* ALL */}
        <button
          type="button"
          className={`min-h-10 rounded-xl border px-4 font-bold transition ${mode === "all" ? "border-primary bg-primary text-white" : "border-white/15 bg-white/5 text-white hover:border-primary hover:text-primary"}`}
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
          className={`min-h-10 rounded-xl border px-4 font-bold transition ${mode === "custom" ? "border-primary bg-primary text-white" : "border-white/15 bg-white/5 text-white hover:border-primary hover:text-primary"}`}
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
            className={`min-h-11 min-w-0 rounded-xl border bg-white/5 px-3 transition focus:border-primary focus:ring-4 focus:ring-primary/20 ${error ? "border-cta" : "border-white/15"}`}
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
            <p className="text-xs font-semibold text-cta">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PageRangePicker;
