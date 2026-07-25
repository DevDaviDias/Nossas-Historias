"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function PageContent({ story, page }) {
  if (page === 0) {
    return (
      <>
        {story.cover && (
          <div className="relative aspect-[3/2] w-full max-w-sm overflow-hidden rounded-2xl shadow-lg ring-1 ring-blush">
            <Image
              src={story.cover}
              alt={story.title}
              fill
              sizes="(max-width: 640px) 90vw, 400px"
              className="object-cover"
              priority
            />
          </div>
        )}
        <h1 className="font-display text-2xl italic text-mauve sm:text-3xl">
          {story.title}
        </h1>
        {story.subtitle && (
          <p className="text-sm text-plum/60">{story.subtitle}</p>
        )}
      </>
    );
  }

  return (
    <div className="space-y-4">
      {story.pages[page - 1].map((line, i) => (
        <p
          key={i}
          className="font-display text-lg leading-relaxed text-plum sm:text-xl"
        >
          {line}
        </p>
      ))}
    </div>
  );
}

export default function BookReader({ story }) {
  // página 0 = capa da história, depois 1..N são as páginas de texto
  const [page, setPage] = useState(0);
  // a página que está no processo de "virar" (a que está saindo de cena)
  const [flip, setFlip] = useState(null); // { from, direction } | null
  const busyRef = useRef(false);
  const totalPages = story.pages.length + 1;

  function goTo(next) {
    if (busyRef.current || next < 0 || next >= totalPages || next === page) {
      return;
    }
    busyRef.current = true;
    setFlip({ from: page, direction: next > page ? 1 : -1 });
    setPage(next);
  }

  function handleDragEnd(_, info) {
    if (info.offset.x < -60) goTo(page + 1);
    else if (info.offset.x > 60) goTo(page - 1);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-5 py-8">
      <Link
        href="/"
        className="mb-4 w-fit text-sm text-mauve underline-offset-4 hover:underline"
      >
        ← voltar para a árvore
      </Link>

      <div
        className="relative flex-1 overflow-hidden rounded-3xl bg-white/70 p-1 shadow-xl shadow-rose/10 ring-1 ring-blush"
        style={{ perspective: 1600 }}
      >
        {/* página de baixo: sempre mostra o conteúdo atual, já atualizado */}
        <div className="flex h-full min-h-[60vh] flex-col items-center justify-center gap-5 rounded-[1.4rem] bg-cream p-8 text-center">
          <PageContent story={story} page={page} />
        </div>

        {/* a "folha" que gira por cima, revelando a página de baixo */}
        <AnimatePresence>
          {flip && (
            <motion.div
              key={`${flip.from}-${flip.direction}`}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: flip.direction > 0 ? -170 : 170 }}
              transition={{ duration: 1.1, ease: [0.45, 0, 0.55, 1] }}
              onAnimationComplete={() => {
                setFlip(null);
                busyRef.current = false;
              }}
              style={{
                transformOrigin: flip.direction > 0 ? "left center" : "right center",
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
              }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 rounded-[1.4rem] bg-cream p-8 text-center shadow-2xl"
            >
              <PageContent story={story} page={flip.from} />
              {/* sombra da dobra, some conforme a página gira */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.35, 0] }}
                transition={{ duration: 1.1, times: [0, 0.5, 1] }}
                className="pointer-events-none absolute inset-0 rounded-[1.4rem]"
                style={{
                  backgroundImage:
                    flip.direction > 0
                      ? "linear-gradient(to right, rgba(0,0,0,0.35), transparent 60%)"
                      : "linear-gradient(to left, rgba(0,0,0,0.35), transparent 60%)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* área para arrastar/deslizar no celular */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-20"
          style={{ background: "transparent" }}
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={() => goTo(page - 1)}
          disabled={page === 0}
          className="rounded-full bg-rose px-5 py-2 text-sm font-semibold text-white shadow-md shadow-rose/30 transition disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← anterior
        </button>
        <span className="text-xs text-plum/50">
          {page + 1} / {totalPages}
        </span>
        <button
          onClick={() => goTo(page + 1)}
          disabled={page === totalPages - 1}
          className="rounded-full bg-rose px-5 py-2 text-sm font-semibold text-white shadow-md shadow-rose/30 transition disabled:cursor-not-allowed disabled:opacity-30"
        >
          próxima →
        </button>
      </div>
    </div>
  );
}
