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
  // Hide for single-page PDFs
  if (totalPages <= 1) return null;

  const allRange = `1-${totalPages}`;

  const [mode, setMode] = useState<"all" | "custom">(
    value[0] === allRange ? "all" : "custom"
  );

  const [input, setInput] = useState(value.join(", "));
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode === "all") {
      setInput(value.join(", "));
    }
  }, [value, mode]);

  useEffect(() => {
    const isAll =
      value.length === 1 &&
      value[0] === allRange;

    setMode(isAll ? "all" : "custom");
  }, [value, allRange]);

  const validate = (val: string) => {
    const parts = val
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    for (const part of parts) {
      // valid inputs: 1, 4-5 types
      if (!/^(\d+)(-\d+)?$/.test(part)) {
        return `Invalid: "${part}"`;
      }

      if (!part.includes("-")) {
        const page = Number(part);

        if (page < 1 || page > totalPages) {
          return `Out of bounds: ${part}`;
        }

        continue;
      }

      const [start, end] = part.split("-").map(Number);

      if (start === end) {
        return `Use "${start}" instead of "${part}"`;
      }

      if (start > end) {
        return `Invalid range: ${part}`;
      }

      if (start < 1 || end > totalPages) {
        return `Out of bounds: ${part}`;
      }
    }
    console.log(parts);
    return parts;
  };

  const selectAll = () => {
    setMode("all");
    setError("");
    setInput(allRange);

    onChange([allRange]);
  };

  const selectCustom = () => {
    setMode("custom");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;

    // numbers, commas, spaces, hyphens
    if (!/^[\d,\s-]*$/.test(val)) return;

    setInput(val);

    if (!val.trim()) {
      setError("");
      return;
    }

    const result = validate(val);

    if (typeof result === "string") {
      setError(result);
      return;
    }

    setError("");
    onChange(result);
  };

  const buttonClass = (active: boolean) =>
    `min-h-10 rounded-xl border px-4 font-bold transition ${
      active
        ? "border-primary bg-primary text-white"
        : "border-white/15 bg-white/5 text-white hover:border-primary hover:text-primary"
    }`;

  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-white/70">
        Pages
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={selectAll}
          className={buttonClass(mode === "all")}
        >
          All
        </button>

        <button
          type="button"
          onClick={selectCustom}
          className={buttonClass(mode === "custom")}
        >
          Custom
        </button>
      </div>

      {mode === "custom" && (
        <>
          <input
            value={input}
            onChange={handleChange}
            placeholder="e.g. 1-5, 8"
            className={`min-h-11 rounded-xl border bg-white/5 px-3 transition focus:border-primary focus:ring-4 focus:ring-primary/20 ${
              error ? "border-cta" : "border-white/15"
            }`}
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