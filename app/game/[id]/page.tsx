import { notFound } from "next/navigation";

import { loadImageMap, loadStory } from "@/lib/gameLibrary";

import GameView from "./GameView";

// Stories are written to disk by the studio, so a cached render can be stale.
export const dynamic = "force-dynamic";

export default async function GamePage(props: { params: { id: string } }) {
  const storyName = props.params.id;
  const [story, imageMap] = await Promise.all([
    loadStory(storyName),
    loadImageMap(storyName),
  ]);

  if (!story?.id) {
    notFound();
  }

  return <GameView story={story} imageMap={imageMap} storyName={storyName} />;
}
