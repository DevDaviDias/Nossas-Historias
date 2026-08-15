"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/useTheme";
import SunMoonIcon from "@/components/SunMoonIcon";

// Posições dos galhos (em % da largura/altura do "céu"), pensadas para
// parecerem uma árvore sem folhas, só com pontos de luz nos galhos —
// exatamente como a árvore da primeira história.
// A lista cresce à medida que novas histórias são adicionadas: cada nova
// posição fica um pouco mais alta e mais aberta, para a árvore continuar
// parecendo natural mesmo com muitos galhos.
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
  // --- galhos extras, adicionados conforme o livro cresce ---
  { x: 50, y: 6 },
  { x: 25, y: 10 },
  { x: 75, y: 10 },
  { x: 10, y: 24 },
  { x: 90, y: 24 },
  { x: 44, y: 18 },
  { x: 56, y: 18 },
  { x: 8, y: 38 },
  { x: 92, y: 38 },
  { x: 36, y: 50 },
  { x: 64, y: 50 },
  { x: 5, y: 52 },
];

// Pontinhos de luz espalhados pelo "céu" atrás da árvore, só para dar
// profundidade — não são clicáveis, são só ambientação.
const BACKGROUND_SPARKLES = [
  { x: 8, y: 8, size: 0.5, delay: 0 },
  { x: 92, y: 6, size: 0.4, delay: 0.6 },
  { x: 15, y: 60, size: 0.35, delay: 1.1 },
  { x: 88, y: 55, size: 0.5, delay: 1.6 },
  { x: 6, y: 30, size: 0.3, delay: 2.1 },
  { x: 95, y: 42, size: 0.4, delay: 0.3 },
  { x: 25, y: 5, size: 0.3, delay: 1.8 },
  { x: 70, y: 4, size: 0.35, delay: 0.9 },
];

// Tufos de grama no chão, na base da árvore.
const GRASS_TUFTS = [8, 18, 28, 38, 62, 72, 82, 92];

export default function StarTree({ stories }) {
  const { dark, toggle, mounted } = useTheme();

  return (
    <div className="relative mx-auto w-full max-w-xl aspect-[4/5] select-none">
      {/* sol/lua: toque para trocar entre o tema claro e o escuro do site */}
      {mounted && (
        <button
          onClick={toggle}
          aria-label={dark ? "Mudar para tema claro" : "Mudar para tema escuro"}
          className="absolute right-[6%] top-[3%] z-10 flex h-11 w-11 items-center justify-center
                     rounded-full transition hover:scale-110 active:scale-95"
        >
          <motion.div
            animate={{
              backgroundColor: dark
                ? "rgba(181,112,140,0.55)"
                : "rgba(247,206,122,0.7)",
              boxShadow: dark
                ? "0 0 22px 7px rgba(181,112,140,0.35)"
                : "0 0 30px 10px rgba(247,206,122,0.35)",
            }}
            transition={{ duration: 0.4 }}
            className="group/sun flex h-10 w-10 items-center justify-center rounded-full animate-float"
          >
            <SunMoonIcon
              dark={dark}
              className="h-5 w-5 text-plum/25 opacity-40 transition-opacity duration-300
                         group-hover/sun:opacity-90 dark:text-cream/40"
            />
          </motion.div>
        </button>
      )}

      {/* céu, chão, tronco e galhos */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* estrelinhas de fundo, só decorativas */}
        {BACKGROUND_SPARKLES.map((s, i) => (
          <circle
            key={`bg-${i}`}
            cx={s.x}
            cy={s.y}
            r={s.size}
            fill="#F7CE7A"
            opacity="0.55"
            className="animate-twinkle"
            style={{ animationDelay: `${s.delay}s` }}
          />
        ))}

        {/* montinho de grama na base */}
        <path
          d="M0 100 C 20 90, 35 96, 50 92 C 65 96, 80 90, 100 100 L 100 100 L 0 100 Z"
          fill="#F58FB2"
          opacity="0.18"
        />
        {GRASS_TUFTS.map((x, i) => (
          <g key={`grass-${i}`} opacity="0.4">
            <path
              d={`M${x} 99 Q ${x - 1.4} 94 ${x - 2.4} 97`}
              stroke="#B5708C"
              strokeWidth="0.6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={`M${x} 99 Q ${x} 93 ${x} 96.5`}
              stroke="#B5708C"
              strokeWidth="0.6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={`M${x} 99 Q ${x + 1.4} 94 ${x + 2.4} 97`}
              stroke="#B5708C"
              strokeWidth="0.6"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        ))}

        {/* tronco */}
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
