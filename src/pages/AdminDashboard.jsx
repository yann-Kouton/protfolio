import { useEffect, useState } from "react";
import { LogOut, Plus, Trash2, Pencil, Eye, EyeOff, UploadCloud } from "lucide-react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../lib/firebase.js";
import { uploadToCloudinary } from "../lib/cloudinary.js";

const emptyForm = {
  id: null,
  slug: "",
  title: "",
  description: "",
  postType: "article",
  content: "",
  fileUrl: "",
  coverImageUrl: "",
  published: false,
};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsubscribe;
  }, []);

  function startNew() {
    setForm(emptyForm);
    setMessage(null);
  }

  function startEdit(post) {
    setForm({ ...emptyForm, ...post });
    setMessage(null);
  }

  async function handleFileUpload(e, field) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage(null);
    try {
      const resourceType = field === "coverImageUrl" ? "image" : "raw";
      const folder = field === "coverImageUrl" ? "blog/covers" : "blog/files";
      const url = await uploadToCloudinary(file, resourceType, folder);
      setForm((f) => ({ ...f, [field]: url }));
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
      slug: form.slug || slugify(form.title),
      title: form.title,
      description: form.description,
      postType: form.postType,
      content: form.content,
      fileUrl: form.fileUrl,
      coverImageUrl: form.coverImageUrl,
      published: form.published,
      updatedAt: serverTimestamp(),
    };

    try {
      if (form.id) {
        await updateDoc(doc(db, "posts", form.id), payload);
      } else {
        await addDoc(collection(db, "posts"), { ...payload, createdAt: serverTimestamp() });
      }
      setMessage({ type: "success", text: "Article enregistré." });
      startNew();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(post) {
    await updateDoc(doc(db, "posts", post.id), { published: !post.published });
  }

  async function deletePost(post) {
    if (!confirm(`Supprimer "${post.title}" ?`)) return;
    await deleteDoc(doc(db, "posts", post.id));
  }

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="min-h-screen bg-ink-900 text-cream font-body">
      <header className="border-b border-ink-500/50 px-6 md:px-8 h-16 flex items-center justify-between">
        <h1 className="font-display font-semibold text-lg">Admin — Blog</h1>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-gold transition-colors"
        >
          <LogOut size={16} /> Déconnexion
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-8 py-10 grid lg:grid-cols-[1fr_1.3fr] gap-8">
        {/* Liste des articles */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg">Articles</h2>
            <button
              onClick={startNew}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-ink-950 transition-colors"
            >
              <Plus size={15} /> Nouveau
            </button>
          </div>

          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-xl border border-ink-500/50 bg-ink-800/50 p-4 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="font-medium truncate">{post.title || "(sans titre)"}</p>
                  <p className="text-xs text-muted mt-1">
                    /{post.slug} · {post.postType}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    title={post.published ? "Dépublier" : "Publier"}
                    onClick={() => togglePublish(post)}
                    className={`p-2 rounded-lg border ${
                      post.published ? "border-mint/50 text-mint" : "border-ink-500/60 text-muted"
                    }`}
                  >
                    {post.published ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                  <button
                    title="Modifier"
                    onClick={() => startEdit(post)}
                    className="p-2 rounded-lg border border-ink-500/60 text-muted hover:text-cream"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    title="Supprimer"
                    onClick={() => deletePost(post)}
                    className="p-2 rounded-lg border border-ink-500/60 text-muted hover:text-red-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
            {posts.length === 0 && <p className="text-muted text-sm">Aucun article pour l'instant.</p>}
          </div>
        </section>

        {/* Formulaire */}
        <section className="rounded-2xl border border-ink-500/50 bg-ink-800/50 p-6">
          <h2 className="font-display font-semibold text-lg mb-4">
            {form.id ? "Modifier l'article" : "Nouvel article"}
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-1">Titre</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-ink-950 border border-ink-500/60 focus:outline-none focus:border-gold/60"
              />
            </div>

            <div>
              <label className="block text-sm text-muted mb-1">
                Slug (URL) — laisser vide pour générer depuis le titre
              </label>
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                placeholder={slugify(form.title) || "mon-article"}
                className="w-full px-3 py-2 rounded-lg bg-ink-950 border border-ink-500/60 focus:outline-none focus:border-gold/60"
              />
            </div>

            <div>
              <label className="block text-sm text-muted mb-1">Description courte</label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-ink-950 border border-ink-500/60 focus:outline-none focus:border-gold/60"
              />
            </div>

            <div>
              <label className="block text-sm text-muted mb-1">Type de contenu</label>
              <select
                value={form.postType}
                onChange={(e) => setForm((f) => ({ ...f, postType: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-ink-950 border border-ink-500/60 focus:outline-none focus:border-gold/60"
              >
                <option value="article">Article (texte / markdown)</option>
                <option value="pdf">PDF</option>
                <option value="notebook">Notebook Jupyter (.ipynb)</option>
              </select>
            </div>

            {form.postType === "article" && (
              <div>
                <label className="block text-sm text-muted mb-1">Contenu (markdown)</label>
                <textarea
                  rows={8}
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-ink-950 border border-ink-500/60 font-mono text-sm focus:outline-none focus:border-gold/60"
                />
              </div>
            )}

            {(form.postType === "pdf" || form.postType === "notebook") && (
              <div>
                <label className="block text-sm text-muted mb-1">
                  Fichier {form.postType === "pdf" ? "PDF" : ".ipynb"}
                </label>
                <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-ink-950 border border-dashed border-ink-500/60 cursor-pointer hover:border-gold/50 text-sm text-muted">
                  <UploadCloud size={16} />
                  {uploading ? "Envoi en cours…" : form.fileUrl ? "Remplacer le fichier" : "Choisir un fichier"}
                  <input
                    type="file"
                    accept={form.postType === "pdf" ? "application/pdf" : ".ipynb"}
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "fileUrl")}
                  />
                </label>
                {form.fileUrl && (
                  <a
                    href={form.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-gold mt-1 inline-block break-all"
                  >
                    {form.fileUrl}
                  </a>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm text-muted mb-1">Image de couverture (optionnel)</label>
              <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-ink-950 border border-dashed border-ink-500/60 cursor-pointer hover:border-gold/50 text-sm text-muted">
                <UploadCloud size={16} />
                {form.coverImageUrl ? "Remplacer l'image" : "Choisir une image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, "coverImageUrl")}
                />
              </label>
              {form.coverImageUrl && (
                <img
                  src={form.coverImageUrl}
                  alt=""
                  className="mt-2 h-24 rounded-lg border border-ink-500/50"
                />
              )}
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              />
              Publié (visible sur le site)
            </label>

            {message && (
              <p className={message.type === "error" ? "text-red-400 text-sm" : "text-mint text-sm"}>
                {message.text}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving || uploading}
                className="px-5 py-2.5 rounded-full bg-gold text-ink-950 font-medium hover:bg-gold-soft transition-colors disabled:opacity-60"
              >
                {saving ? "Enregistrement…" : "Enregistrer"}
              </button>
              {form.id && (
                <button
                  type="button"
                  onClick={startNew}
                  className="px-5 py-2.5 rounded-full border border-ink-500/60 text-muted hover:text-cream transition-colors"
                >
                  Annuler
                </button>
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
