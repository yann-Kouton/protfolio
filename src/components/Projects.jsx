import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/content.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Projects() {
  return (
    <section id="projets" className="py-24 md:py-32 border-t border-ink-500/60 bg-ink-800/30">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading eyebrow={projects.eyebrow} title={projects.title} />

        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {projects.items.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.08 + Math.floor(i / 2) * 0.05} y={20}>
              <motion.a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative flex flex-col h-full rounded-2xl border border-ink-500 bg-ink-800/70 p-6 md:p-7 hover:border-gold/40 hover:bg-ink-700/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="font-mono text-[10px] tracking-wider text-mint uppercase">
                      {p.tag}
                    </span>
                    <h3 className="font-display text-xl text-cream font-medium mt-1.5">
                      {p.name}
                    </h3>
                  </div>
                  <span className="shrink-0 mt-1 flex items-center justify-center w-8 h-8 rounded-full border border-ink-500 text-muted group-hover:border-gold group-hover:text-gold group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight size={15} />
                  </span>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
                  {p.description}
                </p>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono px-2 py-1 rounded bg-ink-700 text-muted border border-ink-500/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-xs text-gold shrink-0 whitespace-nowrap">
                    {p.matchScore}%
                  </span>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
