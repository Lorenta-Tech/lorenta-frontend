import React, { useRef, useState } from "react";
import {uploadFiles} from "../api/uploadFiles"
import { driveUpload } from "../api/driveUpload";
import Button from "../components/Button";

type UploadSource = "local" | "drive";

const Upload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [source, setSource] = useState<UploadSource>("local");

  const handleFiles = (selected: FileList | null) => {
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

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDriveUpload = () => {
    driveUpload();
  };

  return (
    <div className="bg-gray-100 flex flex-col gap-7 items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-6">
        {/* Header */}
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          Upload Files
        </h1>

        {/* Source Tabs */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setSource("local")}
            className={`px-4 py-2 text-sm font-medium ${
              source === "local"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            From Device
          </button>
          <button
            onClick={() => setSource("drive")}
            className={`px-4 py-2 text-sm font-medium ${
              source === "drive"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            From Drive
          </button>
        </div>

        {/* Local Upload */}
        {source === "local" && (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <p className="text-gray-600">
              Drag & drop files here, or{" "}
              <span className="text-blue-600 font-medium">browse</span>
            </p>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
          </div>
        )}

        {/* Drive Upload */}
        {source === "drive" && (
          <div className="flex flex-col items-center justify-center p-10 border rounded-xl">
            <p className="text-gray-600 mb-4">
              Select files directly from your Drive
            </p>
            <button
              onClick={onDriveUpload}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Connect Drive
            </button>
          </div>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-medium text-gray-700 mb-2">
              Selected Files
            </h2>
            <ul className="space-y-2 max-h-40 overflow-auto">
              {files.map((file, idx) => (
                <li
                  key={idx}
                  className="text-sm bg-gray-50 px-3 py-2 rounded-md border"
                >
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Button className="rounded-3xl" onClick={uploadFiles}>Upload files</Button>
    </div>
  );
};

export default Upload;