import React from "react";
import { useNavigate } from "react-router-dom";
import uploadToCart from "../api/uploadToCart";
import Button from "../components/Button";
import Dropzone from "../components/Dropzone";
import FileList from "../components/FileList";
import { useFileUpload } from "../hooks/useFileUpload";
import { useCart } from "../contexts/CartContext";
import { useAlert } from "../contexts/AlertContext"

const Upload: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showAlert } = useAlert();

  const {
    files,
    dragActive,
    setDragActive,
    addFiles,
    removeFile,
  } = useFileUpload();

  const handleUpload = async () => {
    if (files.length > 0) {
      const uploaded = await uploadToCart(files, showAlert);
      addToCart(uploaded); 
      navigate("/cart");
    } else {
      showAlert("Please select files to upload", "warning");
    }
  };

  return (
    <div className="mx-auto mt-8 grid w-full max-w-3xl gap-5">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-2">
          <div>
            <h1 className="text-3xl font-extrabold tracking-normal text-white">Upload files</h1>
            <p className="mt-2 text-white/70">Add PDFs, images, or text files to configure prints.</p>
          </div>
        </div>

        <Dropzone
          onFiles={addFiles}
          dragActive={dragActive}
          setDragActive={setDragActive}
        />

        <FileList files={files} onRemove={removeFile} />
      </div>

      <Button className="w-full" onClick={handleUpload}>
        Upload files
      </Button>
    </div>
  );
};

export default Upload;
