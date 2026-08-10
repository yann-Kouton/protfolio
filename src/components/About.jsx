import { about } from "../data/content.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import kevinPhoto from "../assets/kevin.jpeg";

export default function About() {
  return (
    <section id="apropos" className="py-24 md:py-32 border-t border-ink-500/60">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading eyebrow={about.eyebrow} title={about.title} />

        <div className="mt-14 grid md:grid-cols-[280px_1fr] gap-12 md:gap-16 items-start">
          <Reveal delay={0.1} className="mx-auto md:mx-0">
            <div className="relative w-56 md:w-full max-w-[280px]">
              <div className="absolute -inset-3 rounded-2xl border border-gold/25" />
              <img
                src={kevinPhoto}
                alt="Portrait de Kevin Kouton"
                className="relative rounded-2xl w-full aspect-square object-cover grayscale-[15%] contrast-[1.05]"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -right-4 bg-ink-800 border border-ink-500 rounded-xl px-3 py-2 font-mono text-[10px] text-mint">
                open_to_work: true
              </div>
            </div>
          </Reveal>

          <div>
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.08}>
                <p className="text-muted leading-relaxed mb-5 text-[15px] md:text-base">{p}</p>
              </Reveal>
            ))}

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
              {about.facts.map((f, i) => (
                <Reveal key={f.label} delay={0.35 + i * 0.06}>
                  <p className="font-mono text-[10px] tracking-wider text-muted uppercase mb-1">
                    {f.label}
                  </p>
                  <p className="text-cream text-sm font-medium">{f.value}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
