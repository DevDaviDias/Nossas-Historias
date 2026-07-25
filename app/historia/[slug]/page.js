import { notFound } from "next/navigation";
import { getAllStories, getStoryBySlug } from "@/lib/stories";
import BookReader from "@/components/BookReader";

export async function generateStaticParams() {
  const stories = await getAllStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export default async function StoryPage({ params }) {
  const story = await getStoryBySlug(params.slug);
  if (!story) notFound();

  return (
    <BookReader
      title={story.title}
      subtitle={story.subtitle}
      cover={story.cover}
      pages={story.pages}
      backHref="/"
      backLabel="← voltar para a árvore"
    />
  );
}
