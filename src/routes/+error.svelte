<script>
  import { page } from "$app/state";

</script>

<svelte:head>
  <title>uhhhh - duducat's website!</title>
</svelte:head>

<div class="category-box">
  <div id="error" data-category-name="uhhhh" data-icon="tabler:file-alert">
    <section class="box big">
      <h1>uhhhh</h1>
      <p>{page.status}: {page.error?.message}</p>
    </section>
  </div>
</div>

<style>

  @media (max-width: 49.999em) {
    #error h1 {
      display: none;
    }
    #error > .box.big > :nth-child(2) {
      margin-top: 0;
    }
  }

  @media (min-width: 50em) {
    .category-box {
      width: 50em;
      padding-inline: 5em;
      padding-bottom: 5em;
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