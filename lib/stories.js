import fs from "fs";
import path from "path";

const STORIES_DIR = path.join(process.cwd(), "content", "stories");

// Lê todos os arquivos .js dentro de content/stories e devolve as histórias
// ordenadas pelo nome do arquivo (por isso o prefixo numérico: 01-, 02-, ...).
export async function getAllStories() {
  const files = fs
    .readdirSync(STORIES_DIR)
    .filter((file) => file.endsWith(".js"))
    .sort();

  const stories = await Promise.all(
    files.map(async (file) => {
      const mod = await import(`../content/stories/${file}`);
      return mod.default;
    })
  );

  return stories;
}

export async function getStoryBySlug(slug) {
  const stories = await getAllStories();
  return stories.find((s) => s.slug === slug) ?? null;
}
