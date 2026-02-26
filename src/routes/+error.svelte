<script>
  import { page } from "$app/state";

</script>

<svelte:head>
  <title>uhhhh - duducat's website!</title>
</svelte:head>

<div class="category-box">
  <div id="error" data-category-name={page.status} data-icon="tabler:file-alert">
    <section>
      <h1>{page.status}</h1>
    </section>
    <section>
      <p>"{page.error?.message}"</p>
    </section>
    <section class="box big">
      <p>lost?</p>
      <p>check out my stuff at the sidebar on the left!</p>
    </section>
  </div>
</div>

<style>

  #error > section:first-child {
    font-size: 3em;
    line-height: 1;
    margin-top: 2em;
  }

  #error > section:first-child > h1 {
    font-weight: 300;
  }

  @media (max-width: 49.999em) {
    #error > section:first-child {
      display: none;
    }
    #error > section:nth-child(2) {
      margin-top: -0.5em;
    }
    #error > .box {
      margin-top: 1em;
    }
  }

  @media (min-width: 50em) {
    .category-box {
      width: 50em;
      padding-inline: 5em;
      padding-bottom: 5em;
    }
    #error > section:nth-child(2) {
      margin-top: 0.5em;
    }
    #error > .box {
      margin-top: 2em;
    }
  }

  @media (min-width: 70em) {
    .category-box {
      width: 70em;
    }
  }
</style>