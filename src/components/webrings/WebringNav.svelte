<script lang="ts">
  import { page } from "$app/state";
  import Icon from "@iconify/svelte";

    let {
        prevLink,
        nextLink,
        randomLink,
        allLinks,
        indexLink,
    }: {
        prevLink?: string,
        nextLink?: string,
        randomLink?: string,
        allLinks?: string[],
        indexLink?: string,    
    } = $props()

    if (allLinks) {
        let index = allLinks.findIndex(link => link.includes("//" + page.url.hostname));
        if (index == -1) {
            // TODO add not in site logic
        } else {
            prevLink = allLinks[(index + allLinks.length - 1) % allLinks.length]
            nextLink = allLinks[(index + 1) % allLinks.length]
            updateRandom();
        }
    }

    function updateRandom() {
        randomLink = allLinks![Math.floor(Math.random() * allLinks!.length)];
    }
</script>

<div class="links webring-nav">
    {#if indexLink}
        <div class="link-tile">
            <a href={indexLink}>
                <Icon icon="simple-line-icons:directions" />
                <span>indx</span>
            </a>
        </div>
    {/if}
    <span class="flex-space" aria-hidden={true}></span>
    {#if prevLink}
        <div class="link-tile">
            <a href={prevLink}>
                <Icon icon="iconoir:arrow-left" />
                <span>prev</span>
            </a>
        </div>
    {/if}
    {#if randomLink}
        <div class="link-tile">
            <a href={randomLink}>
                <Icon icon="iconoir:dice-five" />
                <span>rand</span>
            </a>
        </div>
    {/if}
    {#if nextLink}
        <div class="link-tile">
            <a href={nextLink}>
                <Icon icon="iconoir:arrow-right" />
                <span>next</span>
            </a>
        </div>
    {/if}
</div>

<style>
    .webring-nav {
        position: absolute;
        inset: auto -.3em -.3em auto;
        min-width: calc(100%);
        display: flex;
        flex-flow: row;
        gap: 4px;
    }
    .webring-nav > .link-tile {
        flex: 0 0 2.4em;
        aspect-ratio: 1;
    }
    .webring-nav > .link-tile span {
        line-height: 1;
        bottom: .4em;
    }
    .webring-nav > .flex-space {
        flex: 1;
    }
    .webring-nav .link-tile > a {
        display: block;
        width: 100%;
        height: 100%;
        border: 2px solid white;
        background: black;
        color: white;
        padding: 0.5em;
    }
</style>