
export const prerender = true;
export const trailingSlash = "never";

export const GET = async () => {

  let canonicalLink = "https://duducat.moe/blarbs/";

  let allBlarbPostsRaw = import.meta.glob("../../../data/blarbs/*.md", {eager: true}) as Record<string, any>;

  let allBlarbPosts = Object.entries(allBlarbPostsRaw).map(([id, post]) => {
    let list = id.substring(id.lastIndexOf("/") + 1).split("-")
    console.log(list);
    let data = {
      date: new Date(+list[0], +list[1] - 1, +list[2]),
      slug: list.slice(3).join("-"),
      ...post.metadata,
    }
    data.slug = data.slug.substring(0, data.slug.lastIndexOf("."));
    data.link = canonicalLink + list[0] + "/" + list[1] + "/" + list[2] + "/" + data.slug + "/",
    console.log(data.slug);
    return data;
  }) as unknown as {
    date: Date,
    slug: string,
    link: string,
    title: string,
    subtitle: string,
  }[]

  allBlarbPosts.sort((x, y) => +y.date - +x.date);

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>duducat's blarbs</title>
        <link>https://duducat.moe/blarbs/</link>
        ${
          allBlarbPosts.map(post => `
            <item>
              <guid isPermaLink="false">${post.link}</guid>
              <title>${post.title}</title>
              <link>${post.link}</link>
              <description>${post.subtitle}</description>
            </item>
          `).join("")
        }
      </channel>
    </rss>
  `

  let response = new Response(body);
  response.headers.append("Content-Type", "application/rss+xml")
    
  return response;
};