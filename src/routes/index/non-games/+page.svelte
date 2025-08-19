<script>
  import ProjectCard from "../../../components/cards/ProjectCard.svelte";
  import ProjectLister from "../../../components/cards/ProjectLister.svelte";

  import { nongames } from "../../../data/projects";

</script>

<svelte:head>
  <title>duducat's non-games</title>
</svelte:head>

<div class="category-box">
  <ProjectLister projects={nongames} altNames={["apps & sites", "fun stuff", "web resources"]} />
</div>

<style>

  @media (max-width: 49.999em) {
    .category-box :global(h2) {
      overflow: hidden;
      width: 0.0001px;
      height: 0.0001px;
      margin: 0 0 -0.0001px 0;
    }
  }

  @media (min-width: 50em) {
    .category-box {
      display: grid;
      margin-top: 2em;
      width: 50em;
      padding-inline: 5em;
      padding-bottom: 5em;
    }
  }

  @media (min-width: 70em) {
    .category-box {
      width: 70em;
    }
  }
</style>