import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllBooks, getBookBySlug } from "@/lib/books";

export async function generateStaticParams() {
  const books = await getAllBooks();
  return books.map((b) => ({ bookSlug: b.slug }));
}

export default async function BookPage({ params }) {
  const book = await getBookBySlug(params.bookSlug);
  if (!book) notFound();

  // agrupa os capítulos por parte, preservando a ordem
  const groups = [];
  for (const chap of book.chapters) {
    let group = groups.find((g) => g.partTitle === chap.partTitle);
    if (!group) {
      group = { partTitle: chap.partTitle, chapters: [] };
      groups.push(group);
    }
    group.chapters.push(chap);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-12">
      <Link
        href="/livros"
        className="mb-8 w-fit text-sm text-mauve underline-offset-4 hover:underline"
      >
        ← voltar para a estante
      </Link>

      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative aspect-[2/3] w-40 overflow-hidden rounded-lg shadow-lg shadow-plum/20 ring-1 ring-blush">
          <Image src={book.cover} alt={book.title} fill sizes="160px" className="object-cover" />
        </div>
        <h1 className="font-display text-3xl italic text-mauve">{book.title}</h1>
        <p className="text-sm text-plum/60">{book.author}</p>
        <Link
          href={`/livros/${book.slug}/capitulo/${book.chapters[0].slug}`}
          className="mt-2 rounded-full bg-rose px-6 py-2 text-sm font-semibold text-white shadow-md shadow-rose/30 transition hover:brightness-105"
        >
          Começar a ler
        </Link>
      </div>

      <div className="mt-10 space-y-8">
        {groups.map((group) => (
          <div key={group.partTitle}>
            <h2 className="mb-3 font-display text-lg italic text-mauve">
              {group.partTitle}
            </h2>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {group.chapters.map((chap) => (
                <li key={chap.slug}>
                  <Link
                    href={`/livros/${book.slug}/capitulo/${chap.slug}`}
                    className="block rounded-xl bg-white/70 px-3 py-2 text-center text-sm text-plum shadow-sm ring-1 ring-blush transition hover:bg-blush/60"
                  >
                    {chap.chapterTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
