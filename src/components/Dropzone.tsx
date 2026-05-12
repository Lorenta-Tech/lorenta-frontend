import React, { useRef } from "react";

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
      <p className="text-lg font-bold text-white">Drag and drop files here</p>

      <p>
        or <span className="font-bold text-primary">select files</span>
      </p>
      <p className="text-sm text-white/70">Images, PDFs, and text files are supported</p>
      
      <input
        type="file"
        multiple
        ref={fileInputRef}
        accept="image/*,.pdf,.txt"
        onChange={(e) => {
          const files = e.target.files;
          if (!files || files.length === 0) return;
          onFiles(e.target.files);
          e.target.value="";
        }}
        className="sr-only"
      />
    </div>
  );
};

export default Dropzone;
