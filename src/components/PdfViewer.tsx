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
    <div className="relative h-full">

      {/* Floating page indicator */}
      <div className="pointer-events-none absolute right-4 top-4 z-[100]">
        <div className="rounded-full border border-white/10 bg-black/80 px-4 py-1.5 text-lg font-semibold text-white shadow-lg backdrop-blur">
          {currentPage} / {numPages}
        </div>
      </div>

      {/* Scrollable PDF area */}
      <div
        ref={containerRef}
        className="h-full overflow-auto"
      >
        <Document
          file={fileUrl}
          onLoadSuccess={({ numPages }) =>
            setNumPages(numPages)
          }
          loading={
            <div className="py-10 text-center text-white/70">
              Loading PDF...
            </div>
          }
        >
          <div className="flex flex-col items-center gap-6 px-4 py-6">
            {Array.from(
              { length: numPages },
              (_, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    pageRefs.current[i] = el;
                  }}
                  data-page={i + 1}
                  className="overflow-hidden rounded-2xl bg-white shadow-xl"
                >
                  <Page
                    pageNumber={i + 1}
                    width={Math.min(width - 32, 900)}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              )
            )}
          </div>
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
