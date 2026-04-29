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
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Copies</label>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="px-3 py-1 border border-gray-400 rounded-lg"
          onClick={decrease}
          disabled={value <= min}
        >
          -
        </button>

        <input
          type="number"
          className="w-16 text-center border border-gray-400 rounded-lg py-1"
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
          className="px-3 py-1 border border-gray-400 rounded-lg"
          onClick={increase}
          disabled={value >= max}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CopiesStepper;