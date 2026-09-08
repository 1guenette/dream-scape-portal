import { promises as fsPromises } from "fs";
import path from "path";

export const LIBRARY_ROOT = path.join(process.cwd(), "public", "game-library");

// Ordered by preference: a level saved before the WebP switch still has a .png on disk.
export const IMAGE_EXTENSIONS = [".webp", ".png", ".jpeg", ".jpg"];

// Story names come straight from the URL and are used to build file paths.
export function isValidStoryName(storyName: unknown): storyName is string {
  return (
    typeof storyName === "string" &&
    storyName.length > 0 &&
    !storyName.startsWith(".") &&
    !storyName.includes("..") &&
    !storyName.includes("/") &&
    !storyName.includes("\\")
  );
}

export function storyDir(storyName: string) {
  return path.join(LIBRARY_ROOT, storyName);
}

export function storyFile(storyName: string) {
  return path.join(storyDir(storyName), `${storyName}.json`);
}

export async function loadStory(storyName: string) {
  if (!isValidStoryName(storyName)) return null;

  try {
    return JSON.parse(await fsPromises.readFile(storyFile(storyName), "utf-8"));
  } catch {
    return null;
  }
}

// Maps a level id to its image URL. Callers can't derive the URL themselves
// because the extension varies by when the level was saved.
export async function loadImageMap(storyName: string) {
  const imageMap: Record<string, string> = {};

  if (!isValidStoryName(storyName)) return imageMap;

  let files: string[];

  try {
    files = await fsPromises.readdir(storyDir(storyName));
  } catch {
    return imageMap;
  }

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const rank = IMAGE_EXTENSIONS.indexOf(ext);

    if (rank === -1) continue;

    const levelId = path.basename(file, path.extname(file));
    const existing = imageMap[levelId];
    const existingRank = existing
      ? IMAGE_EXTENSIONS.indexOf(path.extname(existing).toLowerCase())
      : Infinity;

    if (rank < existingRank) {
      imageMap[levelId] = `/game-library/${storyName}/${file}`;
    }
  }

  return imageMap;
}
