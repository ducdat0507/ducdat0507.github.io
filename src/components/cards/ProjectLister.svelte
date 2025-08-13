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
      <div class="subsections">
        {#each Object.entries(section) as [categoryName, category]}
          <section class="subsection">
            <h3>{categoryName}</h3>
            {#each category as project}
              <div class="project-list">
                <ProjectCard prototype={project.prototype} links={project.links}>
                  {#snippet title()}
                    {project.name}
                  {/snippet}
                  {#snippet description()}
                    {@html project.description}
                  {/snippet}
                </ProjectCard>
              </div>
            {/each}
          </section>
        {/each}
      </div>
    </section>
  {/each}

<style>
  h2 {
    margin-block: 1em .5em;
  }

  .subsection {
    display: flex;
    flex-direction: column;
    margin: -4px -4px 1em -4px;
  }
  .subsection > * {
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