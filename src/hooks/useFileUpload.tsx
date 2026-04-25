import { useState } from "react";

export const useFileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const addFiles = (selected: FileList | null) => {
    if (!selected) return;

    const newFiles = Array.from(selected);

    setFiles((prev) => {
      const existingKeys = new Set(
        prev.map((f) => `${f.name}-${f.size}-${f.lastModified}`)
      );

      const filtered = newFiles.filter((f) => {
        const key = `${f.name}-${f.size}-${f.lastModified}`;
        return !existingKeys.has(key);
      });

      return [...prev, ...filtered];
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearFiles = () => setFiles([]);

  return {
    files,
    dragActive,
    setDragActive,
    addFiles,
    removeFile,
    clearFiles,
  };
};