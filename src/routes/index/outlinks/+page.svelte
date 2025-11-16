<script lang="ts">
  import WebsiteLister from "../../../components/cards/WebsiteLister.svelte";
  import LeakyRing from "../../../components/webrings/LeakyRing.svelte";
  import GradientRing from "../../../components/webrings/GradientRing.svelte";
  import { websites } from "../../../data/outlinks";
  import WebringNav from "../../../components/webrings/WebringNav.svelte";
  import Tooltip from "../../../components/utils/Tooltip.svelte";
  import HotlineWebring from "../../../components/webrings/HotlineWebring.svelte";
</script>

<svelte:head>
  <title>duducat's outlink collection - duducat's website!</title>
</svelte:head>

<div class="category-box">
  <section id="personal-sites" data-category-name="personal sites">
    <h2>personal sites</h2>
    <WebsiteLister websites={websites["personal"]} />
  </section>
  <section id="webrings" data-category-name="rings & directories">
    <h2>webrings & directories</h2>
    <ul class="ring-box live-tiles">
      <LeakyRing />
      <GradientRing />
      <HotlineWebring />
    </ul>
  </section>
</div>

<style>
  h2 {
    margin-block: 1em .5em;
  }

  .ring-box > :global(li) {
    height: 7em;
    aspect-ratio: unset;
  }
  .ring-box > :global(li > *) {
    position: relative;
    padding: .3em .4em;
  }
  .ring-box :global(h4) {
    font-size: 1em;
    margin: -0.3em;
    padding: 0.3em;
  }
  
  #webrings li p {
    margin: 0;
    font-size: .75em;
  }

  @media (max-width: 49.999em) {
    .category-box :global(h2) {
      overflow: hidden;
      width: 0.0001px;
      height: 0.0001px;
      margin: 0 0 -0.0001px 0;
    }

    .ring-box {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 50em) {
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
      grid-column: span 1;
      grid-row: span 10;
    }

    .ring-box {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 70em) {
    .category-box {
      width: 70em;
      grid-template-columns: repeat(3, 1fr);
    }

    .category-box > :not(#webrings) {
      grid-column: span 2;
    }

    .ring-box {
      grid-template-columns: repeat(3, 1fr);
    }

    #webrings {
      grid-column: span 3;
    }
  }
</style>