<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { WebsiteDefinition } from "../../data/outlinks";

    const {
        website
    }: {
        website: WebsiteDefinition
    } = $props();

</script>

<a class="website-button" href={website.site}>
    <span class="website-image" aria-hidden="true">
        {#if website.button}
            <img src={website.button.includes("//") ? website.button : `/index/res/buttons/websites/${website.button}`} loading="lazy" alt={website.name} />
        {:else}
            <small>no button D:</small>
        {/if}
    </span>
    <span class="website-name">
        {website.name}
    </span>
    <span class="outlink-icon" aria-hidden="true">
        <Icon icon="lucide:external-link" />
    </span>
</a>

<style>
    .website-button {
        position: relative;
        padding: 2px 4px;
        display: flex;
        font-size: .75em;
        color: white;
        text-decoration: none;
    }
    .website-image {
        flex: 0 0 90px;
        border: 2px solid white;
        border-right: 0;
        background: black;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 35px;
    }
    .website-image img {
        max-width: 88px;
        max-height: 31px;
        image-rendering: pixelated;
    }
    .website-image small {
        font-size: 1em;
        opacity: .5;
    }
    .website-name {
        position: relative;
        border: 2px solid white;
        background: black;
        display: flex;
        align-items: center;
        padding-inline: calc(15px - 0.5em);
        flex: 1;
    }
    .website-name::before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(calc(-50% - 1px), -50%) rotate(45deg);
        width: 0;
        height: 0;
        background: linear-gradient(45deg, black 60%, #0000 60%);
        border-left: 2px solid white;
        border-bottom: 2px solid white;
        transition: all .1s;
    }
    .website-button:hover .website-name::before {
        width: 1em;
        height: 1em;
    }
    .outlink-icon {
        position: absolute;
        right: 4px;
        top: 2px;
        bottom: 2px;
        overflow: hidden;
        pointer-events: none;
    }
    .outlink-icon :global(svg) {
        height: 200%;
        width: auto;
        opacity: 0.3;
    }
    .outlink-icon :global(svg path) {
        stroke-width: 1.5 !important;
    }
    .website-button:hover .outlink-icon :global(svg) {
        opacity: 0.4;
    }
</style>