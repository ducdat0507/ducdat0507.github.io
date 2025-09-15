<script lang="ts">
  import Tooltip from "../utils/Tooltip.svelte";
  import WebringNav from "./WebringNav.svelte";

    const {
        ...itemProps
    }: {
        [itemProp: string]: any
    } = $props();

</script>
<li class="gradient-ring"
        aria-label="gradientring" 
        {...itemProps}
    >
    <article>
        <h4>gradientring</h4>
        <Tooltip>(apparently this background is gradient enough to qualify)</Tooltip>
        <WebringNav 
            indexLink="https://gradientring.nekoweb.org/" 
            prevLink="https://gradientring.nekoweb.org/s/duducat/prev"
            nextLink="https://gradientring.nekoweb.org/s/duducat/next" />
    </article>
</li>

<style>
    .gradient-ring article {
        background: conic-gradient(#016 25%, #004 25% 50%, #016 50% 75%, #004 75%) top left / 1em 1em repeat;
    }
    p {
        margin: 0;
        font-size: .75em;
    }
</style>