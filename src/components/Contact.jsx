import { Mail, Phone, MapPin } from "lucide-react";
import { contact, profile, interests } from "../data/content.js";
import Reveal from "./Reveal.jsx";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 border-t border-ink-500/60 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 45% at 70% 30%, rgba(231,169,61,0.10), transparent)",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-14">
          <div>
            <Reveal>
              <p className="font-mono text-xs tracking-[0.18em] text-mint mb-3">
                {contact.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-[2.75rem] text-cream text-balance max-w-lg leading-tight">
                {contact.title}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 text-muted max-w-md leading-relaxed">{contact.sub}</p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold text-ink-950 font-medium text-sm hover:bg-gold-soft transition-colors"
                >
                  <Mail size={16} />
                  Écrire un email
                </a>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-ink-500 text-cream font-medium text-sm hover:border-mint hover:text-mint transition-colors"
                >
                  <Phone size={16} />
                  Appeler
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex items-center gap-2 text-sm text-muted">
                <MapPin size={15} />
                {profile.location}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-ink-500 bg-ink-800/60 p-6 md:p-7 h-full">
              <p className="font-mono text-[10px] tracking-wider text-muted uppercase mb-4">
                Centres d'intérêt
              </p>
              <ul className="space-y-3.5">
                {interests.map((it) => (
                  <li key={it} className="flex gap-3 text-sm text-cream/80 leading-relaxed">
                    <span className="mt-2 w-1 h-1 rounded-full bg-gold shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
