import { notFound } from "next/navigation";
import { getAllBooks, getBookBySlug, getChapter } from "@/lib/books";
import BookReader from "@/components/BookReader";

export async function generateStaticParams() {
  const books = await getAllBooks();
  return books.flatMap((book) =>
    book.chapters.map((c) => ({ bookSlug: book.slug, chapterSlug: c.slug }))
  );
}

export default async function ChapterPage({ params }) {
  const { bookSlug, chapterSlug } = params;
  const book = await getBookBySlug(bookSlug);
  if (!book) notFound();

  const chapter = await getChapter(bookSlug, chapterSlug);
  if (!chapter) notFound();

  const idx = book.chapters.findIndex((c) => c.slug === chapterSlug);
  const prevChap = idx > 0 ? book.chapters[idx - 1] : null;
  const nextChap = idx < book.chapters.length - 1 ? book.chapters[idx + 1] : null;

  return (
    <BookReader
      title={chapter.chapterTitle}
      subtitle={chapter.partTitle}
      cover={null}
      pages={chapter.pages}
      backHref={`/livros/${bookSlug}`}
      backLabel="← voltar para os capítulos"
      prevBoundary={
        prevChap
          ? {
              href: `/livros/${bookSlug}/capitulo/${prevChap.slug}`,
              label: "← capítulo anterior",
            }
          : undefined
      }
      nextBoundary={
        nextChap
          ? {
              href: `/livros/${bookSlug}/capitulo/${nextChap.slug}`,
              label: "próximo capítulo →",
            }
          : undefined
      }
    />
  );
}
