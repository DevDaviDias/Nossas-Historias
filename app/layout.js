import { Fraunces, Nunito } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
});

export const metadata = {
  title: "Nosso Livro de Histórias",
  description: "Um livrinho de histórias, guardado com carinho.",
};

// script pequeno, roda antes da página pintar, para já aplicar o tema
// salvo e evitar o "flash" de tema claro antes do escuro carregar
const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = saved ? saved === 'dark' : prefersDark;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${display.variable} ${body.variable} font-body bg-cream text-plum antialiased transition-colors duration-300 dark:bg-night dark:text-cream`}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
