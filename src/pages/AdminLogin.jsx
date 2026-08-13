import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase.js";
import { useAuth } from "../lib/AuthContext.jsx";

export default function AdminLogin() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) return <Navigate to="/admin" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Identifiants incorrects.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink-900 text-cream flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-ink-800/60 border border-ink-500/60 rounded-2xl p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <Lock size={20} className="text-gold" />
          <h1 className="font-display font-semibold text-xl">Espace admin</h1>
        </div>

        <label className="block text-sm text-muted mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-lg bg-ink-950 border border-ink-500/60 text-cream focus:outline-none focus:border-gold/60"
        />

        <label className="block text-sm text-muted mb-1">Mot de passe</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-3 py-2 rounded-lg bg-ink-950 border border-ink-500/60 text-cream focus:outline-none focus:border-gold/60"
        />

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2.5 rounded-full bg-gold text-ink-950 font-medium hover:bg-gold-soft transition-colors disabled:opacity-60"
        >
          {submitting ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
