import Link from "next/link";
import Image from "next/image";
import { getAllBooks } from "@/lib/books";

export default async function LivrosPage() {
  const books = await getAllBooks();

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-12">
      <Link
        href="/"
        className="mb-8 w-fit self-start text-sm text-mauve underline-offset-4 hover:underline"
      >
        ← voltar para a árvore de histórias
      </Link>

      <p className="mb-2 text-sm uppercase tracking-[0.3em] text-mauve">
        a estante
      </p>
      <h1 className="text-center font-display text-3xl italic text-mauve sm:text-4xl">
        Nossos Livros
      </h1>
      <p className="mt-3 max-w-sm text-center text-sm text-plum/70">
        Livros inteiros, guardados aqui com carinho, capítulo por capítulo.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-8">
        {books.map((book) => (
          <Link
            key={book.slug}
            href={`/livros/${book.slug}`}
            className="group flex w-40 flex-col items-center gap-3 transition hover:-translate-y-1"
          >
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg shadow-plum/20 ring-1 ring-blush">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <span className="text-center font-display text-sm italic text-mauve group-hover:underline">
              {book.title}
            </span>
          </Link>
        ))}
      </div>

      {books.length === 0 && (
        <p className="mt-6 text-sm text-plum/60">
          Nenhum livro ainda — adicione uma pasta em <code>content/books</code>.
        </p>
      )}
    </main>
  );
}
