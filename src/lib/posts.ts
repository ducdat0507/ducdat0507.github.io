export function getBlarbPosts(): BlarbPost[] {
  let allBlarbPostsRaw = import.meta.glob("../data/blarbs/*.md", {eager: true}) as Record<string, any>;

  let allBlarbPosts = Object.entries(allBlarbPostsRaw).map(([id, post]) => {
    let list = id.substring(id.lastIndexOf("/") + 1).split("-")

    let data = {
      created: new Date(+list[0], +list[1] - 1, +list[2]),
      slug: list.slice(3).join("-"),
      title: post.metadata.title ?? "",
      subtitle: post.metadata.subtitle ?? "",
    } as BlarbPost

    data.slug = data.slug.substring(0, data.slug.lastIndexOf("."));
    data.link = list[0] + "/" + list[1] + "/" + list[2] + "/" + data.slug + "/",
    data.modified = post.metadata.modified ? new Date(post.metadata.modified) : data.created;

    return data;
  })

  allBlarbPosts.sort((x, y) => +y.modified - +x.modified);

  return allBlarbPosts;
}

export type BlarbPost = {
    slug: string,
    link: string,
    title: string,
    subtitle: string,
    created: Date,
    modified: Date,
}