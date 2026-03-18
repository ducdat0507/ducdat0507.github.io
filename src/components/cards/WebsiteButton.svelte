<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { WebsiteDefinition } from "../../data/outlinks";

    const {
        website
    }: {
        website: WebsiteDefinition
    } = $props();

</script>

<li class="website-button" aria-label={website.name}>
    <a class="pop-out-btn" href={website.site} onclick={website.onNav}>
        <div class="website-items">
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
        </div>
    </a>
</li>

<style>
    .website-button {
        padding: 4px 6px;
    }
    .website-button a {
        display: flex;
        font-size: .75em;
        color: black;
        text-decoration: none;
        margin: 0;
        padding-top: 2px;
        padding-right: 2px;
    }
    .website-items {
        margin: -4px -4px -2px -2px;
        display: flex;
        flex: 1;
    }
    .website-image {
        flex: 0 0 88px;
        background: black;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 31px;
    }
    .website-image img {
        display: block;
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
        background: #abf;
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
        transform: translate(-50%, -50%) rotate(45deg);
        width: 0;
        height: 0;
        background: linear-gradient(45deg, #abf 60%, #0000 60%);
        background-clip: border-box;
        transition: all .1s;
    }
    .website-button a:hover .website-name::before {
        width: 1em;
        height: 1em;
    }
    .outlink-icon {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: -2px;
        overflow: hidden;
        pointer-events: none;
    }
    .outlink-icon :global(svg) {
        height: 200%;
        width: auto;
        opacity: 0.15;
    }
    .outlink-icon :global(svg path) {
        stroke-width: 1.5 !important;
    }
    .website-button a:hover .outlink-icon :global(svg) {
        opacity: 0.3;
    }
</style>