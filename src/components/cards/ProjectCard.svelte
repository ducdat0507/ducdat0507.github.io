<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { Snippet } from "svelte";

    let {
        links,
        title,
        prototype = false,
        description,
        ...cardProps
    }: {
        links: ({
            name: string,
            icon?: string,
            href: string,
        } | null)[],
        title: Snippet,
        prototype: boolean,
        description: Snippet,
    } = $props();

</script>

<article class="project-card" class:prototype={prototype} {...cardProps}>
    <div>
        <h4 class="title">{@render title()}</h4>
        <div class="description">{@render description()}</div>
        <div class="links">
            {#each links as link}
                {#if link}
                    <div class="link-tile">
                        <a href={link.href}>
                            <Icon icon={link.icon || "iconoir:play"} />
                            <span>{link.name}</span>
                        </a>
                    </div>
                {:else}
                    <span class="flex-space" aria-hidden="true" />
                {/if}
            {/each}
        </div>
    </div>
</article>

<style>
    .project-card {
        position: relative;
    }
    .project-card > div {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        border: 2px solid white;
        background: black;
        color: white;
        padding: 0.5em;
    }
    .project-card.prototype > div {
        border-style: dashed;
    }
    .project-card :is(h4, :global(p)) {
        margin: 0;
    }
    .project-card .description {
        font-size: 0;
    }
    .project-card .links {
        display: flex;
        flex-flow: row wrap;
        gap: .5em;
        margin: .3em -.8em -.8em .3em;
    }
    .project-card .links > .link-tile {
        flex: 0 0 4.8em;
        aspect-ratio: 2;
    }
    .project-card .links > .link-tile span {
        line-height: 1;
        bottom: .4em;
    }
    .project-card .links > .flex-space {
        flex: 1;
    }
    .project-card .link-tile > a {
        display: block;
        width: 100%;
        height: 100%;
        border: 2px solid white;
        background: black;
        color: white;
        padding: 0.5em;
    }
</style>