import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { FileText, Notebook, FileEdit, ArrowRight } from "lucide-react";
import { db } from "../lib/firebase.js";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

const typeMeta = {
  article: { icon: FileEdit, label: "Article" },
  pdf: { icon: FileText, label: "PDF" },
  notebook: { icon: Notebook, label: "Notebook" },
};

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <div className="bg-ink-900 min-h-screen text-cream font-body">
      <Nav />
      <main className="max-w-6xl mx-auto px-6 md:px-8 pt-32 pb-24">
        <SectionHeading eyebrow="BLOG" title="Mes travaux, publications et notes." />

        {loading && <p className="text-muted mt-10">Chargement des articles…</p>}
        {error && <p className="text-red-400 mt-10">Erreur : {error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="text-muted mt-10">Aucun article publié pour le moment.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {posts.map((post) => {
            const meta = typeMeta[post.postType] ?? typeMeta.article;
            const Icon = meta.icon;
            return (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-ink-500/60 bg-ink-800/60 overflow-hidden hover:border-gold/50 transition-colors"
              >
                {post.coverImageUrl ? (
                  <img src={post.coverImageUrl} alt="" className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center bg-ink-700/60">
                    <Icon size={36} className="text-gold/70" />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gold mb-2 w-fit px-2 py-1 rounded-full bg-gold/10">
                    <Icon size={13} /> {meta.label}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-cream group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-sm text-muted mt-2 line-clamp-3">{post.description}</p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-gold/90">
                    Lire <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
