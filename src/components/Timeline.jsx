import { GraduationCap, Briefcase } from "lucide-react";
import { timeline } from "../data/content.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Timeline() {
  return (
    <section id="parcours" className="py-24 md:py-32 border-t border-ink-500/60">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading eyebrow={timeline.eyebrow} title={timeline.title} />

        <div className="mt-8 flex items-center gap-6 font-mono text-[11px] text-muted uppercase tracking-wide">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold" /> Formation
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mint" /> Expérience
          </span>
        </div>

        <div className="relative mt-10 pl-8 md:pl-10">
          <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-ink-500" />

          <div className="space-y-10">
            {timeline.items.map((item, i) => {
              const isExp = item.kind === "experience";
              const Icon = isExp ? Briefcase : GraduationCap;
              const color = isExp ? "mint" : "gold";
              return (
                <Reveal key={item.title} delay={Math.min(i * 0.06, 0.3)} y={16}>
                  <div className="relative">
                    <span
                      className={`absolute -left-[33px] md:-left-[41px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-ink-900 ${
                        color === "mint" ? "border-mint" : "border-gold"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          color === "mint" ? "bg-mint" : "bg-gold"
                        }`}
                      />
                    </span>

                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 mb-1.5">
                      <h3 className="font-display text-lg text-cream font-medium flex items-center gap-2">
                        <Icon size={15} className={color === "mint" ? "text-mint" : "text-gold"} />
                        {item.title}
                      </h3>
                      <span className="font-mono text-xs text-muted shrink-0">{item.date}</span>
                    </div>
                    <p className="text-sm text-cream/70 font-medium mb-1.5">{item.place}</p>
                    {item.description && (
                      <p className="text-sm text-muted leading-relaxed max-w-2xl">
                        {item.description}
                      </p>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
