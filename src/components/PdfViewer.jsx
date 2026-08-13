import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Download, ChevronUp, ChevronDown, Loader2 } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ url }) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const pageRefs = useRef([]);

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) setWidth(containerRef.current.clientWidth);
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Suit la page visible pendant le défilement, pour afficher "page X / N"
  useEffect(() => {
    if (!numPages) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = Number(visible.target.dataset.pageNumber);
          if (idx) setCurrentPage(idx);
        }
      },
      { threshold: [0.5] }
    );
    pageRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [numPages, width]);

  function scrollToPage(n) {
    const clamped = Math.min(Math.max(n, 1), numPages || 1);
    pageRefs.current[clamped - 1]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {numPages && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <button
              onClick={() => scrollToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-lg border border-ink-500/60 disabled:opacity-30 hover:text-cream"
            >
              <ChevronUp size={15} />
            </button>
            <span className="font-mono">
              Page {currentPage} / {numPages}
            </span>
            <button
              onClick={() => scrollToPage(currentPage + 1)}
              disabled={currentPage >= numPages}
              className="p-1.5 rounded-lg border border-ink-500/60 disabled:opacity-30 hover:text-cream"
            >
              <ChevronDown size={15} />
            </button>
          </div>
        )}
        <a
          href={url}
          download
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-ink-950 transition-colors ml-auto"
        >
          <Download size={16} /> Télécharger le PDF
        </a>
      </div>

      <div
        ref={containerRef}
        className="rounded-xl overflow-y-auto overflow-x-hidden border border-ink-500/50 bg-ink-950 max-h-[80vh]"
      >
        {error && <p className="text-red-400 p-6">Impossible d'afficher le PDF : {error}</p>}

        {!error && (
          <Document
            file={url}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(err) => setError(err.message)}
            loading={
              <div className="flex items-center gap-2 text-muted p-6">
                <Loader2 size={16} className="animate-spin" /> Chargement du PDF…
              </div>
            }
          >
            {Array.from({ length: numPages || 0 }, (_, i) => (
              <div
                key={i}
                ref={(el) => (pageRefs.current[i] = el)}
                data-page-number={i + 1}
                className="border-b border-ink-500/30 last:border-none flex justify-center"
              >
                {width > 0 && (
                  <Page
                    pageNumber={i + 1}
                    width={Math.min(width, 900)}
                    renderAnnotationLayer={false}
                  />
                )}
              </div>
            ))}
          </Document>
        )}
      </div>
    </div>
  );
}
