import { getBlarbPosts } from "$lib/posts";

export const prerender = true;
export const trailingSlash = "never";

export const GET = async () => {

  let canonicalLink = "https://duducat.moe/blarbs/";
  
  let allBlarbPosts = getBlarbPosts();

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>duducat's blarbs</title>
        <link>https://duducat.moe/blarbs/</link>
        <description>duducat's blarbs</description>
        ${
          allBlarbPosts.map(post => `
            <item>
              <guid isPermaLink="false">${post.link}</guid>
              <title>${post.title}</title>
              <pubDate>${post.created.toUTCString()}</pubDate>
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