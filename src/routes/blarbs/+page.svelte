<script lang="ts">
  import { goto, preloadData, pushState } from "$app/navigation";
  import { getBlarbPosts } from "$lib/posts";
  import Icon from "@iconify/svelte";

  let allBlarbPosts = getBlarbPosts();

  function printDate(date: Date) {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0")
    );
  }
</script>

<svelte:head>
  <title>blarbs - duducat's website!</title>
</svelte:head>

<div class="category-box">
  <section
    id="blarbs"
    data-category-name="blarb posts"
    data-icon="ri:speak-line"
  >
    <h2>blarb posts</h2>
    <div class="feed-links links">
      <div class="link-tile">
        <a class="pop-out-btn" href="feed.rss.xml">
          <Icon icon="iconoir:rss-feed" />
          <span>rss feed</span>
        </a>
      </div>
      <div class="link-tile">
        <a class="pop-out-btn" href="feed.atom.xml">
          <Icon icon="iconoir:rss-feed" />
          <span>atom feed</span>
        </a>
      </div>
    </div>
    <ul class="blarb-list">
      {#each allBlarbPosts as post}
        <li>
          <a href={post.link} target="_self" class="pop-out-btn">
            <div>
              <h3>{post.title}</h3>
              <time>({printDate(post.modified)})</time>
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
    margin-block: 1em 0.5em;
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

  .feed-links {
    display: flex;
    flex-flow: row wrap;
    gap: 0.5em;
    margin: 0.5em 0;
    justify-content: end;
  }
  .feed-links > .link-tile {
    flex: 0 0 4.8em;
    aspect-ratio: 2;
  }
  .feed-links > .link-tile span {
    line-height: 1;
    bottom: 0.4em;
  }
  .feed-links > .link-tile > a {
    --inset-border: 0px;
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    background: #abf;
    color: black;
    padding: 0.5em;
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
