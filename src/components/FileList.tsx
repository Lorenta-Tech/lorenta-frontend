import React from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
  files: File[];
  onRemove?: (index: number) => void;
};

const FileList: React.FC<Props> = ({ files, onRemove }) => {
  if (!files.length) return null;

  return (
    <div className="mt-6">
      <h2 className="text-sm font-medium text-gray-700 mb-2">
        Selected Files
      </h2>

      <ul className="space-y-2 max-h-40 overflow-auto">
        {files.map((file, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center text-sm bg-gray-50 px-3 py-2 rounded-md border"
          >
            <span>{file.name}</span>

            {onRemove && (
              <button
                onClick={() => onRemove(idx)}
                className="text-red-500 text-xs"
              >
                <IoMdClose size={20}/>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;