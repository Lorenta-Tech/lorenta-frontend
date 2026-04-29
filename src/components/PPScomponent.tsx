import React from "react";
import { useState } from "react";

type PPSProps = {
  perSheet: number;
  onChange: (value: number) => void;
};


const PPScomponent : React.FC<PPSProps> = ({
  perSheet,
  onChange
})=>{
  const [PPS, setPPS] = useState(perSheet);
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm text-gray-600">Pages per Sheet</label>

      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded-lg border border-gray-300 ${
            PPS==1 ? "bg-bgsecondary text-white" : ""
          }`}
          onClick={()=>{
            setPPS(1);
            onChange(PPS);
          }}
        >
          1
        </button>

        <button
          className={`px-3 py-1 rounded-lg border border-gray-400 ${
            PPS==2? "bg-bgsecondary text-white" : ""
          }`}
          onClick={()=>{
            setPPS(2);
            onChange(PPS);
          }}
        >
          2
        </button>
      </div>
    </div>
  );
  
}

export default PPScomponent;