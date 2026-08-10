import { profile } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="border-t border-ink-500/60 py-8">
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.fullName}
        </p>
        <p className="font-mono text-xs text-muted">Donne moi des chiffres, je te lirais l'avenir.</p>
      </div>
    </footer>
  );
}
