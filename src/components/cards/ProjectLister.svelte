<script>
  import ProjectCard from "./ProjectCard.svelte";

  let { projects, altNames = null } = $props();

  let index = 0;

</script>
  {(index = 0), ""}
  {#each Object.entries(projects) as [sectionName, section]}
    {(index += 1), ""}
    <section id={sectionName.replaceAll(" ", "-")} data-category-name={altNames?.[index - 1] ?? sectionName}>
      <h2>{sectionName}</h2>
      <ul class="subsections">
        {#each Object.entries(section) as [categoryName, category]}
          <li class="subsection" aria-label={categoryName}>
            <h3>{categoryName}</h3>
            <ul class="project-list">
              {#each category as project}
                <ProjectCard prototype={project.prototype} links={project.links} title={project.name}>
                  {#snippet description()}
                    {@html project.description}
                  {/snippet}
                </ProjectCard>
              {/each}
            </ul>
          </li>
        {/each}
      </ul>
    </section>
  {/each}

<style>
  h2 {
    margin-block: 1em .5em;
  }
  .subsections {
    margin: 0;
    padding: 0;
  }
  .subsection {
    display: flex;
    flex-direction: column;
    margin: -4px -4px 1em -4px;
  }
  .subsection ul {
    margin: 0;
    padding: 0;
  }
  .subsection ul > :global(*) {
    margin: 0;
  }
  .subsection h3 {
    display: block;
    background: white;
    color: black;
    text-align: start;
    line-height: 1.15;
    padding: .15em .3em;
    margin: 4px;
    font-size: 1em;
  }

  @media (min-width: 50em) {
    .subsections {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1em;
    }
  }

  @media (min-width: 70em) {
    .subsections {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>