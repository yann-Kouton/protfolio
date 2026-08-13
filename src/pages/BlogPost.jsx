import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { db } from "../lib/firebase.js";
import { linkify } from "../lib/linkify.jsx";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import NotebookViewer from "../components/NotebookViewer.jsx";
import PdfViewer from "../components/PdfViewer.jsx";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const q = query(
          collection(db, "posts"),
          where("slug", "==", slug),
          where("published", "==", true),
          limit(1)
        );
        const snap = await getDocs(q);
        if (!active) return;
        if (snap.empty) setError("not-found");
        else setPost({ id: snap.docs[0].id, ...snap.docs[0].data() });
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <div className="bg-ink-900 min-h-screen text-cream font-body">
      <Nav />
      <main className="max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-24">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-gold transition-colors mb-8">
          <ArrowLeft size={16} /> Retour au blog
        </Link>

        {loading && <p className="text-muted">Chargement…</p>}
        {error && <p className="text-red-400">Article introuvable.</p>}

        {post && (
          <>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-cream">{post.title}</h1>
            {post.description && <p className="text-muted mt-3">{linkify(post.description)}</p>}
            {post.coverImageUrl && (
              <img
                src={post.coverImageUrl}
                alt=""
                className="w-full rounded-2xl border border-ink-500/50 mt-6"
              />
            )}

            <div className="mt-8">
              {post.postType === "article" && (
                <div className="prose prose-invert max-w-none prose-headings:font-display prose-a:text-gold">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content || ""}</ReactMarkdown>
                </div>
              )}
              {post.postType === "pdf" && post.fileUrl && <PdfViewer url={post.fileUrl} />}
              {post.postType === "notebook" && post.fileUrl && (
                <NotebookViewer url={post.fileUrl} />
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
