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
        <div class="ring-title">
            <h4>
                Hotline Webring
            </h4>
        </div>
        <WebringNav 
        indexLink="https://hotlinewebring.club/" 
        prevLink="https://hotlinewebring.club/¤/previous"
        nextLink="https://hotlinewebring.club/¤/next" />
    </article>
</li>

<style>
    .hotline-webring > article {
        background: 
            linear-gradient(#fa9aba, #fa9aba) 
            !important;
    }
    .ring-title {
        font-style: italic;
        text-shadow: 0 0 2px #000, 0 0 4px #000, 0 0 6px #000;
    }
    .ring-title > h4::before {
        content: "← ";
    }
    .ring-title > h4::after {
        content: " →";
    }
    p {
        margin: 0;
        font-size: .75em;
    }
</style>