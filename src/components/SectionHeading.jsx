import Reveal from "./Reveal.jsx";

export default function SectionHeading({ eyebrow, title, align = "left" }) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <Reveal>
        <p className="font-mono text-xs tracking-[0.18em] text-mint mb-3">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-cream text-balance max-w-2xl">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
