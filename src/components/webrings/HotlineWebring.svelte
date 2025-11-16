<script lang="ts">
  import Tooltip from "../utils/Tooltip.svelte";
  import WebringNav from "./WebringNav.svelte";

    const {
        ...itemProps
    }: {
        [itemProp: string]: any
    } = $props();

</script>
<li class="hotline-webring" aria-label="Hotline Webring">
    <article>
        <h4>
        Hotline Webring
        <Tooltip>
            (I only needed to navigate to a link to join)
        </Tooltip>
        </h4>
        <WebringNav 
        indexLink="https://hotlinewebring.club/" 
        prevLink="https://hotlinewebring.club/¤/previous"
        nextLink="https://hotlinewebring.club/¤/next" />
    </article>
</li>

<style>
    .hotline-webring > article {
        background: 
            linear-gradient(#941640, #941640) top left / 100% 2em no-repeat,
            linear-gradient(#fa9aba, #fa9aba) 
            !important;
    }
    p {
        margin: 0;
        font-size: .75em;
    }
</style>