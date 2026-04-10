<script lang="ts">
  import { goto, preloadData, pushState } from "$app/navigation";
  import { preventDefault } from "svelte/legacy";

  let allBlarbPostsRaw = import.meta.glob("../../data/blarbs/*.md", {eager: true}) as Record<string, any>;

  let allBlarbPosts = Object.entries(allBlarbPostsRaw).map(([id, post]) => {
    let list = id.substring(id.lastIndexOf("/") + 1).split("-")
    console.log(list);
    let data = {
      date: new Date(+list[0], +list[1] - 1, +list[2]),
      slug: list.slice(3).join("-"),
      ...post.metadata,
    }
    data.slug = data.slug.substring(0, data.slug.lastIndexOf("."));
    data.link = list[0] + "/" + list[1] + "/" + list[2] + "/" + data.slug + "/",
    console.log(data.slug);
    return data;
  }) as unknown as {
    date: Date,
    slug: string,
    link: string,
    title: string,
    subtitle: string,
  }[]

  allBlarbPosts.sort((x, y) => +y.date - +x.date)

  function printDate(date: Date) {
    return date.getFullYear() + "-" 
      + (date.getMonth() + 1).toString().padStart(2, "0") + "-"
      + (date.getDate()).toString().padStart(2, "0")
  }
</script>

<svelte:head>
  <title>blarbs - duducat's website!</title>
</svelte:head>

<div class="category-box">
  <section id="blarbs" data-category-name="blarb posts" data-icon="lucide:message-circle">
    <h2>blarb posts</h2>
    <ul class="blarb-list">
      {#each allBlarbPosts as post}
        <li>
          <a href={post.link} target="_self" class="pop-out-btn">
            <div>
              <h3>{post.title}</h3>
              <time>({printDate(post.date)})</time>
            </div>
            <p>{post.subtitle}</p>
          </a>
        </li>
      {/each}
    </ul>
  </section>
</div>

<style>
  h2 {
    margin-block: 1em .5em;
  }
  
  .blarb-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .blarb-list a {
    --inset-border: 0px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: #abf;
    color: black;
    border: none;
    text-decoration: none;
    padding: 0.5em;
    position: relative;
  }
  
  .blarb-list a h3 {
    display: inline;
    font-size: 1em;
  }
  .blarb-list a time {
    display: inline;
    font-size: 0.8em;
  }
  .blarb-list a p {
    font-size: 0.8em;
    margin-top: 0;
  }


  @media (max-width: 49.999em) {
    .category-box :global(h2) {
      overflow: hidden;
      width: 0.0001px;
      height: 0.0001px;
      margin: 0 0 -0.0001px 0;
    }
    .help-box {
      margin-bottom: 1em;
    }
  }
  
  @media (min-width: 50em) {
    .category-box {
      display: flex;
      margin-top: 2em;
      flex-flow: column;
      width: 50em;
      padding-inline: 5em;
      padding-bottom: 5em;
    }
  }

    @media (min-width: 70em) {
        .category-box {
            width: 70em;
            padding-inline: 15em;
        }
    }
</style>