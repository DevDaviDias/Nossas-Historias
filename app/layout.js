import { Fraunces, Nunito } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable} font-body bg-cream text-plum antialiased`}>
        {children}
      </body>
    </html>
  );
}
