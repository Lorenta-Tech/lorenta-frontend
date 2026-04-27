import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { UploadedFile } from "../types";
import { Document, Page, pdfjs } from "react-pdf";
import TextViewer from "./TextViewer";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

type Props = {
  file: UploadedFile | null;
  onClose: () => void;
  convertedPdfUrl?: string;
};

const ViewModal: React.FC<Props> = ({ file, onClose, convertedPdfUrl }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [localFileUrl, setLocalFileUrl] = useState<string>("");

  useEffect(() => {
    setNumPages(0);
    setLocalFileUrl("");
  }, [file]);

  useEffect(() => {
    if (!file) return;

    if (!convertedPdfUrl && file.content) {
      const url = URL.createObjectURL(file.content);
      setLocalFileUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [file, convertedPdfUrl]);

  if (!file) return null;

  const isPdf = file.type === "application/pdf" || !!convertedPdfUrl;
  const pdfSource = convertedPdfUrl || localFileUrl;

  const renderContent = () => {
    //pdf view
    if (isPdf && pdfSource) {
      return (
        <Document
          key={file.id || file.name}
          file={pdfSource}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={(err) => console.error("PDF load error details:", err)}
          loading={
            <div className="flex justify-center py-10 text-gray-500">
              Loading PDF...
            </div>
          }
          error={
            <div className="flex justify-center py-10 text-red-500">
              Failed to load PDF. Please try again.
            </div>
          }
        >
          <div className="flex flex-col items-center">
            {Array.from({ length: numPages }, (_, i) => (
              <Page
                key={`page_${i + 1}`}
                pageNumber={i + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-md border border-gray-200 bg-white mb-8 max-w-full [&>canvas]:max-w-full [&>canvas]:!h-auto"
              />
            ))}
          </div>
        </Document>
      );
    }

    //image view
    if (file.type.startsWith("image/") && localFileUrl) {
      return (
        <img
          src={localFileUrl}
          className="max-w-full"
          alt={file.name}
        />
      );
    }

    //txt files viewer
    if (file.type === "text/plain" && file.content) {
      return <TextViewer file={file.content} />;
    }

    //doc and ppt viewer
    // looking for it...

    return <div className="p-6 text-gray-500 text-center">Unsupported file</div>;
  };


  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-5xl flex flex-col rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 shrink-0">
          <span className="text-gray-800 truncate">
            {file.name}
          </span>
          <button 
            onClick={onClose} 
            className="hover:bg-gray-200 hover:text-gray-900 rounded-full transition-colors shrink-0"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* viewer */}
        <div className="flex-1 bg-gray-100 max-h-[90vh] md:aspect[1/1.414] overflow-auto p-4">
          <div className="flex justify-center min-w-min">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;