import { motion } from "framer-motion";
import { useCountUp } from "../hooks/useCountUp.js";

const nodes = [
  { id: "a", x: 60, y: 130, color: "#8C7CF6", r: 5 },
  { id: "b", x: 150, y: 55, color: "#E7A93D", r: 5 },
  { id: "c", x: 280, y: 80, color: "#35D28A", r: 5 },
  { id: "d", x: 375, y: 150, color: "#E7A93D", r: 5 },
  { id: "e", x: 335, y: 285, color: "#35D28A", r: 5 },
  { id: "f", x: 205, y: 350, color: "#E7A93D", r: 5 },
  { id: "g", x: 85, y: 305, color: "#8C7CF6", r: 5 },
  { id: "i", x: 150, y: 225, color: "#35D28A", r: 4 },
];

const center = { x: 218, y: 205, r: 10, color: "#E7A93D" };

const edges = [
  "a", "b", "c", "d", "e", "f", "g", "i",
];

export default function MatchGraph({ inView }) {
  const score = useCountUp(97, { start: inView, duration: 1600, delay: 500 });

  return (
    <div className="relative w-full max-w-md mx-auto select-none">
      <svg
        viewBox="0 0 440 410"
        className="w-full h-auto"
        role="img"
        aria-label="Visualisation animée d'un graphe de correspondance vectorielle"
      >
        {edges.map((id, i) => {
          const n = nodes.find((n) => n.id === id);
          return (
            <motion.line
              key={id}
              x1={center.x}
              y1={center.y}
              x2={n.x}
              y2={n.y}
              stroke="#2C3654"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: "easeOut" }}
            />
          );
        })}

        {nodes.map((n, i) => (
          <motion.circle
            key={n.id}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.color}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: "backOut" }}
          />
        ))}

        <motion.circle
          cx={center.x}
          cy={center.y}
          r={center.r}
          fill={center.color}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: [0, 1.3, 1], opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        />
        <motion.circle
          cx={center.x}
          cy={center.y}
          r={center.r}
          fill="none"
          stroke="#E7A93D"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 1 }}
          animate={inView ? { opacity: [0.6, 0], scale: [1, 2.6] } : {}}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1 }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-1 left-1 md:left-4 bg-ink-800/90 border border-ink-500 rounded-lg px-3 py-2 backdrop-blur-sm"
      >
        <p className="font-mono text-[10px] tracking-wider text-muted uppercase">
          match_score
        </p>
        <p className="font-mono text-xl md:text-2xl text-mint leading-tight">
          {score}<span className="text-sm text-muted">%</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="absolute top-1 right-1 md:right-4 bg-ink-800/90 border border-ink-500 rounded-lg px-3 py-2 backdrop-blur-sm"
      >
        <p className="font-mono text-[10px] tracking-wider text-muted uppercase">
          model_status
        </p>
        <p className="font-mono text-sm text-gold leading-tight flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulseSoft" />
          converged
        </p>
      </motion.div>
    </div>
  );
}
