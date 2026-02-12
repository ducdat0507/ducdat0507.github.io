<script>
  import ProjectCard from "../../../components/cards/ProjectCard.svelte";
  import ProjectLister from "../../../components/cards/ProjectLister.svelte";

  import { nongames } from "../../../data/projects";

</script>

<svelte:head>
  <title>duducat's non-games - duducat's website!</title>
</svelte:head>

<div class="category-box">
  <ProjectLister projects={nongames} 
    altNames={["apps & sites", "fun stuff", "web resources", "miscellaneous"]}
    altIcons={["tabler:browser", "tabler:dice-5", "tabler:book-2", "material-symbols:box-outline-sharp"]}
    />
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
      grid-template-columns: repeat(2, 1fr);
      gap: 0 1em;
      margin-top: 2em;
      width: 50em;
      padding-inline: 5em;
      padding-bottom: 5em;
    }

    .category-box > :global(:nth-child(1)) {
      grid-column: span 2;
    }
    
    .category-box > :global(:nth-child(n+2)) {
      grid-column: span 1;
    }
    .category-box > :global(:nth-child(n+2) > ul) {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 70em) {
    .category-box {
      width: 70em;
      grid-template-columns: repeat(3, 1fr);
    }

    .category-box > :global(:nth-child(1)) {
      grid-column: span 3;
    }
  }
</style>