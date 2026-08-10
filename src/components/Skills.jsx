import { motion } from "framer-motion";
import { skills } from "../data/content.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

const accentMap = {
  gold: {
    border: "hover:border-gold/50",
    text: "group-hover:text-gold",
    dot: "bg-gold",
  },
  mint: {
    border: "hover:border-mint/50",
    text: "group-hover:text-mint",
    dot: "bg-mint",
  },
  violet: {
    border: "hover:border-violet/50",
    text: "group-hover:text-violet",
    dot: "bg-violet",
  },
};

export default function Skills() {
  return (
    <section id="competences" className="py-24 md:py-32 border-t border-ink-500/60 bg-ink-800/30">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading eyebrow={skills.eyebrow} title={skills.title} />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.groups.map((group, gi) => {
            const accent = accentMap[group.accent];
            return (
              <Reveal key={group.name} delay={gi * 0.08}>
                <div
                  className={`group h-full rounded-2xl border border-ink-500 bg-ink-800/60 p-6 transition-colors ${accent.border}`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
                    <h3
                      className={`font-display text-sm font-medium tracking-wide text-cream/90 transition-colors ${accent.text}`}
                    >
                      {group.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <motion.span
                        key={item}
                        whileHover={{ y: -2 }}
                        className="text-xs font-mono px-2.5 py-1.5 rounded-md bg-ink-700 text-muted border border-ink-500/70"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
