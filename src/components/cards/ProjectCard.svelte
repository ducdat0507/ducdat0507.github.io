<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { Snippet } from "svelte";
  import { setPopup } from "../utils/PopupDisplayer.svelte";

    let {
        links,
        banner,
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
        title: string,
        banner?: string,
        prototype: boolean,
        description: Snippet,
    } = $props();

    function showPopup(e: Event) {
        e.preventDefault();
        setPopup(title, description, [
            { name: "close", icon: "iconoir:arrow-left" },
            ...links,
        ]);
    }

</script>

<li class="project-card" class:prototype={prototype} {...cardProps} aria-label={title}>
    <article>
        {#if banner}
            <img class="banner" src={banner} alt="" aria-hidden="true">
        {/if}
        <h4 class="title">
            <span role="link" tabindex={0} onclick={showPopup} onkeydown={(e) => e.key == "Enter" && showPopup(e)}>{title}</span>
        </h4>
        <div class="links">
            {#each links as link}
                {#if link}
                    <div class="link-tile">
                        <a class="pop-out-btn" href={link.href}>
                            <Icon icon={link.icon || "iconoir:play"} />
                            <span>{link.name}</span>
                        </a>
                    </div>
                {:else}
                    <span class="flex-space" aria-hidden="true"></span>
                {/if}
            {/each}
        </div>
    </article>
</li>

<style>
    .project-card {
        position: relative;
    }
    .project-card > article {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        border: 2px solid #abf;
        background: black;
        color: white;
        padding: 0.5em;
        position: relative;
    }
    .project-card.prototype > article {
        border-style: dashed;
    }
    .project-card :is(h4, :global(p)) {
        margin: 0;
    }
    .project-card .banner {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        mask-image: linear-gradient(110deg, #fff1, #fff2, #fff4, #fff7, #fff9, #fffb, #fffc);
    }
    .project-card .title {
        z-index: 1;
    }
    .project-card .title > span {
        cursor: help;
        text-shadow: 0.5px 0.5px 2px #000, 1px 1px 3px #000, 1.5px 1.5px 5px #000, 2px 2px 8px #000;
    }
    .project-card .links {
        display: flex;
        flex-flow: row wrap;
        gap: .5em;
        margin: .3em -.8em -.8em 0;
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
        --inset-border: 0px;
        display: block;
        width: 100%;
        height: 100%;
        border: none;
        background: #abf;
        color: black;
        padding: 0.5em;
    }
</style>