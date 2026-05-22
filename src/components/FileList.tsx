import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";

type Props = {
  files: File[];
  onRemove?: (index: number) => void;
};

const FileList: React.FC<Props> = ({ files, onRemove }) => {
  if (!files.length) return null;

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="mt-5">

      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-white/70 uppercase tracking-widest">
          Selected Files
        </h2>
        <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-bold text-primary">
          {files.length} {files.length === 1 ? "file" : "files"}
        </span>
      </div>

      <ul className="grid max-h-56 gap-2 overflow-auto pr-1">
        {files.map((file, idx) => (
          <li
            key={idx}
            className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm transition hover:border-primary/30 hover:bg-primary/5"
          >
            {/* PDF Icon + File Info */}
            <div className="flex min-w-0 items-center gap-3">

              {/* Icon */}
              <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-red-500/15">
                <FaFilePdf size={18} className="text-red-400" />
              </div>

              {/* Name + Size */}
              <div className="min-w-0">
                <p className="truncate font-medium text-white">
                  {file.name.length > 20
                    ? `${file.name.slice(0, 20)}...`
                    : file.name}
                </p>
                <p className="text-xs text-white/40">
                  {formatSize(file.size)}
                </p>
              </div>

            </div>

            {/* Remove Button */}
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="grid size-9 shrink-0 place-items-center rounded-xl text-white/40 transition hover:bg-red-500/15 hover:text-red-400"
                aria-label={`Remove ${file.name}`}
              >
                <IoMdClose size={20} />
              </button>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default FileList;