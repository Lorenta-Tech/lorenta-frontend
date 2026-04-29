import React from "react";
import { useNavigate } from "react-router-dom";
import uploadFiles from "../api/uploadFiles";
import Button from "../components/Button";
import Dropzone from "../components/Dropzone";
import FileList from "../components/FileList";
import { useFileUpload } from "../hooks/useFileUpload";
import { useCart } from "../contexts/CartContext";

const Upload: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const {
    files,
    dragActive,
    setDragActive,
    addFiles,
    removeFile,
  } = useFileUpload();

  const handleUpload = async () => {
    if (files.length > 0) {
      const uploaded = await uploadFiles(files);
      addToCart(uploaded); 
      navigate("/cart");
    } else {
      alert("Select files to upload!");
    }
  };

  return (
    <div className="bg-bgprimary flex flex-col gap-7 items-center justify-center mt-20">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">
          Upload Files
        </h1>

        <Dropzone
          onFiles={addFiles}
          dragActive={dragActive}
          setDragActive={setDragActive}
        />

        <FileList files={files} onRemove={removeFile} />
      </div>

      <Button className="rounded-3xl text-lg" onClick={handleUpload}>
        Upload files
      </Button>
    </div>
  );
};

export default Upload;