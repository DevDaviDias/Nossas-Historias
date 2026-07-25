"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Posições dos galhos (em % da largura/altura do "céu"), pensadas para
// parecerem uma árvore sem folhas, só com pontos de luz nos galhos —
// exatamente como a árvore da primeira história.
const BRANCH_SPOTS = [
  { x: 50, y: 12 },
  { x: 34, y: 20 },
  { x: 66, y: 20 },
  { x: 22, y: 32 },
  { x: 78, y: 32 },
  { x: 40, y: 30 },
  { x: 60, y: 30 },
  { x: 30, y: 44 },
  { x: 70, y: 44 },
  { x: 50, y: 40 },
  { x: 15, y: 46 },
  { x: 85, y: 46 },
];

export default function StarTree({ stories }) {
  return (
    <div className="relative mx-auto w-full max-w-xl aspect-[4/5] select-none">
      {/* tronco e galhos */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M50 98 L50 55"
          stroke="#B5708C"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />
        {BRANCH_SPOTS.map((s, i) => (
          <path
            key={i}
            d={`M50 55 Q ${(50 + s.x) / 2} ${(55 + s.y) / 2} ${s.x} ${s.y}`}
            stroke="#B5708C"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
        ))}
      </svg>

      {/* uma estrela por história */}
      {stories.map((story, i) => {
        const spot = BRANCH_SPOTS[i % BRANCH_SPOTS.length];
        return (
          <Link
            key={story.slug}
            href={`/historia/${story.slug}`}
            className="group absolute -translate-x-1/2 -translate-y-1/2 outline-none"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 * i, duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.35 }}
              whileFocus={{ scale: 1.35 }}
              className="relative flex h-8 w-8 items-center justify-center rounded-full
                         bg-gold shadow-[0_0_18px_6px_rgba(247,206,122,0.55)]
                         animate-twinkle group-focus-visible:ring-2 group-focus-visible:ring-rose"
            >
              <span className="text-xs">✨</span>
            </motion.div>
            <span
              className="pointer-events-none absolute left-1/2 top-full mt-2 w-max max-w-[9rem]
                         -translate-x-1/2 rounded-full bg-plum/90 px-2 py-1 text-center text-[11px]
                         text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              {story.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
