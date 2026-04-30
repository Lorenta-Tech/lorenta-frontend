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
    <div className="flex items-center justify-between">
      <label className="text-sm text-gray-600">{ label }</label>

      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded-lg border border-gray-300 ${
            perSheet==1 ? "bg-bgsecondary text-white" : ""
          }`}
          onClick={()=>onChange(1)}
        >
          1
        </button>

        <button
          className={`px-3 py-1 rounded-lg border border-gray-400 ${
            perSheet==2? "bg-bgsecondary text-white" : ""
          }`}
          onClick={()=>onChange(2)}
        >
          2
        </button>
      </div>
    </div>
  );
  
}

export default PPScomponent;