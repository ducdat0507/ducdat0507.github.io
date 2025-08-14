<script lang="ts">
  import WebsiteLister from "../../../components/cards/WebsiteLister.svelte";
  import LeakyRing from "../../../components/webrings/LeakyRing.svelte";
  import { websites } from "../../../data/outlinks";
</script>

<svelte:head>
  <title>duducat's outlink collection</title>
</svelte:head>

<div class="category-box">
  <section id="personal-sites" data-category-name="personal sites">
    <h2>personal sites</h2>
    <WebsiteLister websites={websites["personal"]} />
  </section>
  <section id="webrings" data-category-name="webrings">
    <h2>webrings</h2>
    <div class="ring-box live-tiles">
      <div style="--col: 2; --row: 2">
        <LeakyRing />
      </div>
    </div>
  </section>
</div>

<style>
  h2 {
    margin-block: 1em .5em;
  }

  .ring-box > div > :global(*) {
    position: relative;
    padding: .3em .4em;
  }
  .ring-box :global(h4) {
    font-size: 1em;
    margin: 0;
  }

  @media (max-width: 799.99px) {
    .category-box :global(h2) {
      overflow: hidden;
      width: 0.0001px;
      height: 0.0001px;
      margin: 0 0 -0.0001px 0;
    }
  }

  @media (min-width: 800px) {
    .category-box {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      margin-top: 2em;
      width: 50em;
      padding-inline: 5em;
      padding-bottom: 5em;
      gap: 1em;
    }

    #webrings {
      grid-column: 2;
      grid-row: span 10;
    }
  }

  @media (min-width: 1120px) {
    .category-box {
      width: 70em;
      grid-template-columns: repeat(3, 1fr);
    }

    .category-box > :not(#webrings) {
      grid-column: span 2;
    }

    #webrings {
      grid-column: 3;
    }
  }
</style>