import { Download } from "lucide-react";

export default function PdfViewer({ url }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl overflow-hidden border border-ink-500/50 bg-ink-950">
        <iframe title="Document PDF" src={url} className="w-full h-[75vh]" />
      </div>
      <a
        href={url}
        download
        className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-ink-950 transition-colors w-fit"
      >
        <Download size={16} /> Télécharger le PDF
      </a>
    </div>
  );
}
