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
      className={`border-2 border-dashed md:py-20 rounded-xl p-10 text-center cursor-pointer transition ${
        dragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400"
      }`}
    >
      <p className="text-gray-600">
        Drag & drop files here, or
      </p>

      <p className="text-gray-600">
        <span className="text-blue-600 ">select files</span>
      </p>
      <p className="text-gray-600">Only images and pdfs supported</p>
      
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
        className="hidden"
      />
    </div>
  );
};

export default Dropzone;