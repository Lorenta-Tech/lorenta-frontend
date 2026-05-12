import { useState, useEffect } from "react";
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type PdfViewerProps = {
  fileUrl: string;
};

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setWidth(entry.contentRect.width);
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const page = Number(entry.target.getAttribute("data-page"));
            setCurrentPage(page);
          }
        });
      },
      { threshold: 0.6, root: containerRef.current }
    );

    pageRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [numPages]);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-auto">
      <div className="sticky top-3 z-10 ml-auto mr-3 w-max rounded-full bg-darkbg/85 px-3 py-1 text-sm font-bold text-white">
        {currentPage} / {numPages}
      </div>
      <div className="grid justify-items-center gap-4 py-4">
        <Document
          file={fileUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {Array.from({ length: numPages }, (_, i) => (
            <div
              key={i}
              ref={(el) => {pageRefs.current[i] = el;}}
              data-page={i + 1}
              className="max-w-full overflow-hidden rounded-xl bg-white/5 shadow-sm"
            >
              <Page pageNumber={i + 1} width={Math.max(260, width - 48)} />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
