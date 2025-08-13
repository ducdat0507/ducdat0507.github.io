<script>
  import ProjectCard from "./ProjectCard.svelte";
  import WebsiteButton from "./WebsiteButton.svelte";

  let { websites } = $props();

</script>

<div class="website-categories">
  {#each Object.entries(websites) as [categoryName, category]}
    <section class="subsection">
      <h3>{categoryName}</h3>
      <div class="website-list">
        {#each category as website}
          <WebsiteButton {website} />
        {/each}
      </div>
    </section>
  {/each}
</div>

<style>
  h2 {
    margin-block: 1em .5em;
  }

  .subsection {
    display: flex;
    flex-direction: column;
    margin: -2px -4px 1em -4px;
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
    margin: 2px 4px;
    font-size: 1em;
  }

  @media (width >= 50em) {
    .website-categories {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
  }

  @media (width >= 70em) {
    .website-categories {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1em;
    }
  }
</style>