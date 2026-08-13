import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function joinSource(source) {
  if (Array.isArray(source)) return source.join("");
  return source ?? "";
}

function OutputBlock({ output }) {
  if (output.output_type === "stream") {
    return (
      <pre className="bg-ink-950/60 text-cream/80 text-sm rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
        {joinSource(output.text)}
      </pre>
    );
  }

  if (output.output_type === "error") {
    return (
      <pre className="bg-red-950/30 text-red-300 text-sm rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
        {(output.traceback || []).join("\n")}
      </pre>
    );
  }

  if (output.output_type === "execute_result" || output.output_type === "display_data") {
    const data = output.data || {};
    if (data["image/png"]) {
      return (
        <img
          src={`data:image/png;base64,${data["image/png"]}`}
          alt="output"
          className="rounded-lg border border-ink-500/40 max-w-full"
        />
      );
    }
    if (data["text/html"]) {
      return (
        <div
          className="prose prose-invert max-w-none text-sm overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: joinSource(data["text/html"]) }}
        />
      );
    }
    if (data["text/plain"]) {
      return (
        <pre className="bg-ink-950/60 text-cream/80 text-sm rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
          {joinSource(data["text/plain"])}
        </pre>
      );
    }
  }

  return null;
}

function CodeCell({ cell, index }) {
  return (
    <div className="rounded-xl overflow-hidden border border-ink-500/50">
      <div className="flex items-center justify-between bg-ink-700/70 px-3 py-1.5 text-xs text-muted font-mono">
        <span>In [{cell.execution_count ?? " "}]</span>
        <span>{index + 1}</span>
      </div>
      <pre className="bg-ink-950 text-mint text-sm p-4 overflow-x-auto font-mono">
        <code>{joinSource(cell.source)}</code>
      </pre>
      {(cell.outputs || []).length > 0 && (
        <div className="p-4 space-y-3 bg-ink-800/40 border-t border-ink-500/40">
          {cell.outputs.map((out, i) => (
            <OutputBlock key={i} output={out} />
          ))}
        </div>
      )}
    </div>
  );
}

function MarkdownCell({ cell }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-display prose-a:text-gold">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{joinSource(cell.source)}</ReactMarkdown>
    </div>
  );
}

export default function NotebookViewer({ url }) {
  const [notebook, setNotebook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (active) setNotebook(json);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, [url]);

  if (error) {
    return <p className="text-red-400">Impossible de charger le notebook : {error}</p>;
  }

  if (!notebook) {
    return <p className="text-muted">Chargement du notebook…</p>;
  }

  return (
    <div className="space-y-5">
      {(notebook.cells || []).map((cell, i) =>
        cell.cell_type === "markdown" ? (
          <MarkdownCell key={i} cell={cell} />
        ) : cell.cell_type === "code" ? (
          <CodeCell key={i} cell={cell} index={i} />
        ) : null
      )}
    </div>
  );
}
