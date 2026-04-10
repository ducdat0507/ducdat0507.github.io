import type { EntryGenerator } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () => {
  let allBlarbPostsRaw = import.meta.glob("../../data/blarbs/*.md") as Record<string, any>;
  let allBlarbPosts = Object.entries(allBlarbPostsRaw).map(([id, post]) => {
    let list = id.substring(id.lastIndexOf("/") + 1).split("-")
    let data = {
      year: list[0],
      month: list[1],
      day: list[2],
      slug: list.slice(3).join("-"),
    }
    return data;
  })
  return allBlarbPosts;
};