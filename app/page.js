import { getAllStories } from "@/lib/stories";
import StarTree from "@/components/StarTree";
import Link from "next/link";

export default async function HomePage() {
  const stories = await getAllStories();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <p className="mb-2 text-sm uppercase tracking-[0.3em] text-mauve">
        para você
      </p>
      <h1 className="text-center font-display text-3xl italic text-mauve sm:text-4xl">
        Nosso Livro de Histórias
      </h1>
      <p className="mt-3 max-w-sm text-center text-sm text-plum/70">
        Cada estrela é uma história esperando para ser lida. Toque em uma
        delas.
      </p>

      <div className="mt-10 w-full">
        <StarTree stories={stories} />
      </div>

      {stories.length === 0 && (
        <p className="mt-6 text-sm text-plum/60">
          Nenhuma história ainda — adicione um arquivo em{" "}
          <code>content/stories</code>.
        </p>
      )}

      <Link
        href="/livros"
        className="mt-12 text-sm text-mauve underline-offset-4 hover:underline"
      >
        📚 ver a estante de livros
      </Link>
    </main>
  );
}
