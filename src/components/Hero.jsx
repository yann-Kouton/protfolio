import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { hero } from "../data/content.js";
import MatchGraph from "./MatchGraph.jsx";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center pt-28 pb-20 md:pt-32 overflow-hidden bg-grid bg-grid-cell"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(231,169,61,0.10), transparent), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(53,210,138,0.08), transparent)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-14 md:gap-8 items-center w-full">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs md:text-sm tracking-[0.18em] text-mint mb-5"
          >
            {hero.eyebrow}
          </motion.p>

          <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-cream text-balance">
            {hero.headline.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 24 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: "easeOut" }}
                className="block"
              >
                {i === 1 ? <span className="text-gold">{line}</span> : line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 text-base md:text-lg text-muted max-w-lg leading-relaxed"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href={hero.ctaPrimary.href}
              className="px-6 py-3 rounded-full bg-gold text-ink-950 font-medium text-sm hover:bg-gold-soft transition-colors"
            >
              {hero.ctaPrimary.label}
            </a>
            <a
              href={hero.ctaSecondary.href}
              className="px-6 py-3 rounded-full border border-ink-500 text-cream font-medium text-sm hover:border-mint hover:text-mint transition-colors"
            >
              {hero.ctaSecondary.label}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="animate-floatY"
        >
          <MatchGraph inView={mounted} />
        </motion.div>
      </div>

      <motion.a
        href="#apropos"
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        aria-label="Défiler vers le bas"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted hover:text-cream transition-colors"
      >
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <ArrowDown size={14} className="animate-pulseSoft" />
      </motion.a>
    </section>
  );
}
