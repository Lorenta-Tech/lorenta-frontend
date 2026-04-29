import { UploadedFile } from "../types";
import { useEffect, useState } from "react";
import PdfViewer from "./PdfViewer";

type FileViewerProps = {
  file: UploadedFile;
  convertedPdfUrl?: string;
};

const FileViewer: React.FC<FileViewerProps> = ({ file, convertedPdfUrl }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!file) return;

    if (!convertedPdfUrl && file.content) {
      const objUrl = URL.createObjectURL(file.content);
      setUrl(objUrl);
      return () => URL.revokeObjectURL(objUrl);
    }
  }, [file, convertedPdfUrl]);

  const isPdf = file.type === "application/pdf" || !!convertedPdfUrl;
  const source = convertedPdfUrl || url;

  if (isPdf && source) {
    return <PdfViewer fileUrl={source} />;
  }

  if (file.type.startsWith("image/") && source) {
    return <img src={source} className="max-w-full" />;
  }

  return <div>Unsupported file</div>;
};

export default FileViewer;