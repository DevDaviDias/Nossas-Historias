import fs from "fs";
import path from "path";

const BOOKS_DIR = path.join(process.cwd(), "content", "books");

// Cada subpasta dentro de content/books é um livro.
// Ex: content/books/crime-e-castigo/meta.js + capitulos/*.js
export async function getAllBooks() {
  const dirs = fs
    .readdirSync(BOOKS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const books = await Promise.all(
    dirs.map(async (dir) => {
      const mod = await import(`../content/books/${dir}/meta.js`);
      return mod.default;
    })
  );

  return books;
}

export async function getBookBySlug(slug) {
  const books = await getAllBooks();
  return books.find((b) => b.slug === slug) ?? null;
}

export async function getChapter(bookSlug, chapterSlug) {
  try {
    const mod = await import(
      `../content/books/${bookSlug}/capitulos/${chapterSlug}.js`
    );
    return mod.default;
  } catch {
    return null;
  }
}
