import { getBlarbPosts } from "$lib/posts";

export const prerender = true;
export const trailingSlash = "never";

export const GET = async () => {

  let canonicalLink = "https://duducat.moe/blarbs/";

  let allBlarbPosts = getBlarbPosts();

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <id>https://duducat.moe/blarbs/</id>
      <title>duducat's blarbs</title>
      <updated>${allBlarbPosts[0].created.toISOString()}</updated>
      <link href="https://duducat.moe/blarbs/" />
      <author>
        <name>duducat</name>
        <uri>https://duducat.moe/</uri>
      </author>
      ${
        allBlarbPosts.map(post => `
          <entry>
            <id>${post.link}</id>
            <title>${post.title}</title>
            <updated>${post.modified.toISOString()}</updated>
            <published>${post.created.toISOString()}</published>
            <link href="${canonicalLink + post.link}" />
            <summary>${post.subtitle}</summary>
          </entry>
        `).join("")
      }
    </feed>
  `

  let response = new Response(body);
  response.headers.append("Content-Type", "application/rss+xml")
    
  return response;
};