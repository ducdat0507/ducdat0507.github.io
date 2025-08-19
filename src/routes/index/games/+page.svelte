<script>
  import ProjectCard from "../../../components/cards/ProjectCard.svelte";
  import ProjectLister from "../../../components/cards/ProjectLister.svelte";

  import { games } from "../../../data/projects";

</script>

<svelte:head>
  <title>duducat's games</title>
</svelte:head>

<div class="category-box">
  <section id="featured" data-category-name="featured">
    <h2>featured</h2>
    <div class="project-list big">
      {#each [
        games["incremental games"]["flagships (a.k.a. originals)"][0], 
        games["non-incremental games"]["rhythm games"][0]
      ] as project}
        <ProjectCard prototype={!!project.prototype} links={project.links}>
          {#snippet title()}
            {project.name}
          {/snippet}
          {#snippet description()}
            {@html project.description}
          {/snippet}
        </ProjectCard>
      {/each}
    </div>
  </section>
  <ProjectLister projects={games} altNames={["incrementals", "non-incrementals"]} />
</div>

<style>
  h2 {
    margin-block: 1em .5em;
  }

  .project-list.big > :global(* > :first-child) {
      min-height: 8em;
  }

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
    .project-list.big {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin: -4px;
    }

    .category-box {
      width: 70em;
    }
  }
</style>