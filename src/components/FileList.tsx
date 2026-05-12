import React from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
  files: File[];
  onRemove?: (index: number) => void;
};

const FileList: React.FC<Props> = ({ files, onRemove }) => {
  if (!files.length) return null;

  return (
    <div className="mt-5">
      <h2 className="mb-2 text-sm font-bold text-white/70">
        Selected Files
      </h2>

      <ul className="grid max-h-56 gap-2 overflow-auto">
        {files.map((file, idx) => (
          <li
            key={idx}
            className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm"
          >
            <span className="truncate">{file.name}</span>

            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="grid size-9 place-items-center rounded-xl text-cta transition hover:bg-cta/10 hover:text-cta"
                aria-label={`Remove ${file.name}`}
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
