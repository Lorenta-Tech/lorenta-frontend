import React, { useState, useEffect } from "react";

interface Props {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

const CopiesStepper: React.FC<Props> = ({
  value,
  onChange,
  min = 1,
  max = 100,
}) => {
  const [inputValue, setInputValue] = useState<string>(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleBlur = () => {
    let num = Number(inputValue);

    if (isNaN(num)) num = min;
    num = Math.max(min, Math.min(max, num));

    onChange(num);
    setInputValue(String(num));
  };

  const decrease = () => {
    const newVal = Math.max(min, value - 1);
    onChange(newVal);
  };

  const increase = () => {
    const newVal = Math.min(max, value + 1);
    onChange(newVal);
  };

  return (
    <div className="grid min-w-0 gap-2">
      <label className="text-sm font-semibold text-white/70">Copies</label>

      <div className="grid w-max max-w-full grid-cols-[44px_minmax(64px,72px)_44px] items-center gap-2">
        <button
          type="button"
          className="min-h-10 rounded-xl border border-white/15 bg-white/5 font-bold transition hover:border-primary hover:text-primary disabled:opacity-50"
          onClick={decrease}
          disabled={value <= min}
          aria-label="Decrease copies"
        >
          -
        </button>

        <input
          type="number"
          className="min-h-11 rounded-xl border border-white/15 bg-white/5 px-3 text-center transition focus:border-primary focus:ring-4 focus:ring-primary/20"
          value={inputValue}
          min={min}
          max={max}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onBlur={handleBlur}
        />

        <button
          type="button"
          className="min-h-10 rounded-xl border border-white/15 bg-white/5 font-bold transition hover:border-primary hover:text-primary disabled:opacity-50"
          onClick={increase}
          disabled={value >= max}
          aria-label="Increase copies"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CopiesStepper;
