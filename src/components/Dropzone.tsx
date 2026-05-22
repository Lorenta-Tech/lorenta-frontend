import React, { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

type Props = {
  onFiles: (files: FileList | null) => void;
  dragActive: boolean;
  setDragActive: (v: boolean) => void;
};

const Dropzone: React.FC<Props> = ({
  onFiles,
  dragActive,
  setDragActive,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        onFiles(e.dataTransfer.files);
      }}
      onClick={() => fileInputRef.current?.click()}
      className={`grid min-h-64 cursor-pointer place-items-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center transition duration-200 md:min-h-72 ${
        dragActive
          ? "scale-[1.005] border-primary bg-primary/15"
          : "border-white/15 bg-white/5 hover:border-primary hover:bg-primary/15"
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fileInputRef.current?.click();
        }
      }}
    >
      {/* Upload Icon */}
      <div className={`rounded-2xl p-4 transition duration-200 ${dragActive ? "bg-primary/20" : "bg-white/10"}`}>
        <FiUploadCloud
          size={40}
          className={`transition duration-200 ${dragActive ? "text-primary" : "text-white/60"}`}
        />
      </div>

      <p className="text-lg font-bold text-white">
        Drag and drop your PDF here
      </p>

      <p className="text-white/70">
        or <span className="font-bold text-primary">browse to upload</span>
      </p>

      {/* PDF only notice */}
      <div className="mt-1 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2">
        <span className="text-xs font-bold tracking-widest text-red-400 uppercase">PDF only</span>
        <span className="text-white/40">·</span>
        <span className="text-xs text-white/50">No images, Word docs, or other formats accepted</span>
      </div>

      <input
        type="file"
        multiple
        ref={fileInputRef}
        accept=".pdf"
        onChange={(e) => {
          const files = e.target.files;
          if (!files || files.length === 0) return;
          onFiles(e.target.files);
          e.target.value = "";
        }}
        className="sr-only"
      />
    </div>
  );
};

export default Dropzone;