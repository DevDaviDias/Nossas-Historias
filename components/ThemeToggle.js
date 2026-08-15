"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/useTheme";
import SunMoonIcon from "@/components/SunMoonIcon";

// Botão flutuante de sol/lua para as páginas que não têm a árvore de
// estrelas (leitura de história, estante de livros). Na página inicial,
// o próprio solzinho da árvore já cuida da troca de tema.
export default function ThemeToggle() {
  const pathname = usePathname();
  const { dark, toggle, mounted } = useTheme();

  if (pathname === "/" || !mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Mudar para tema claro" : "Mudar para tema escuro"}
      className="fixed right-4 top-4 z-30 flex h-11 w-11 items-center justify-center
                 rounded-full bg-white/80 shadow-md shadow-rose/20 ring-1 ring-blush
                 backdrop-blur transition hover:scale-105 active:scale-95
                 dark:bg-nightCard/80 dark:ring-nightBlush dark:shadow-black/30"
    >
      <SunMoonIcon
        dark={dark}
        className="h-5 w-5 text-mauve/40 opacity-50 transition-opacity duration-300
                   hover:opacity-100 dark:text-blush/50"
      />
    </button>
  );
}
