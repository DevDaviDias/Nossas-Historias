"use client";

import { motion, AnimatePresence } from "framer-motion";

// Ícone de sol/lua desenhado em linha fina (sem emoji), para combinar com
// o estilo ilustrado do resto do app. Troca com uma transição suave.
export default function SunMoonIcon({ dark, className = "" }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {dark ? (
        <motion.svg
          key="moon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ rotate: -70, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 70, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={className}
        >
          <path d="M20.2 15.2A8.6 8.6 0 0 1 8.8 3.8a9 9 0 1 0 11.4 11.4Z" />
        </motion.svg>
      ) : (
        <motion.svg
          key="sun"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ rotate: 70, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: -70, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={className}
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.3M12 19.2v2.3M4.5 12H2.2M21.8 12h-2.3M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
        </motion.svg>
      )}
    </AnimatePresence>
  );
}
