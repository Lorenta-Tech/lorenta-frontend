import React from "react";

type PPSProps = {
  label: string;
  perSheet: number;
  onChange: (value: number) => void;
};


const PPScomponent : React.FC<PPSProps> = ({
  label,
  perSheet,
  onChange
})=>{
  
  return (
    <div className="flex min-w-0 items-center justify-between gap-4">
      <label className="min-w-0 text-sm font-semibold text-white/70">{ label }</label>

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          className={`min-h-10 rounded-xl border px-4 font-bold transition ${perSheet === 1 ? "border-primary bg-primary text-white" : "border-white/15 bg-white/5 text-white hover:border-primary hover:text-primary"}`}
          onClick={()=>onChange(1)}
        >
          1
        </button>

        <button
          type="button"
          className={`min-h-10 rounded-xl border px-4 font-bold transition ${perSheet === 2 ? "border-primary bg-primary text-white" : "border-white/15 bg-white/5 text-white hover:border-primary hover:text-primary"}`}
          onClick={()=>onChange(2)}
        >
          2
        </button>
      </div>
    </div>
  );
  
}

export default PPScomponent;
