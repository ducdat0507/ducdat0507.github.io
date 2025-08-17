<script module lang="ts">
    import { onMount, type Snippet } from "svelte";


    let content: Snippet | null = $state(null);
    let parent: HTMLElement | null = $state(null);
    let containerProps: any = $state(null);

    export function setTooltip(_parent: HTMLElement, _content: Snippet, _props: any) {
        parent = _parent;
        content = _content;
        containerProps = _props;
    }

    export function unsetTooltip() {
        parent = null;
    }

</script>

<script lang="ts">

    let tooltip: HTMLElement;

    let isShowing = $state(false);
    $effect(() => {
        isShowing = !!parent;
        requestUpdatePosition();
    })

    let timeout: number = -1;

    function requestUpdatePosition() {
        updatePosition();
        // f (timeout > 0) clearTimeout(0);
        // timeout = setTimeout(() => updatePosition(), 0);
    }

    function updatePosition() {
        if (!parent) return;

        let tooltipRect = tooltip.getBoundingClientRect();
        let parentRect = parent.getBoundingClientRect();

        let left = parentRect.left + (parentRect.width - tooltipRect.width) / 2;
        let top = parentRect.top + (parentRect.height - tooltipRect.height) / 2;

        // TODO add more alignment options
        top -= (parentRect.height + tooltipRect.height) / 2;
        if (top < 0) top = parentRect.top + parentRect.height;
        
        // Keep tooltip inside viewport
        left = Math.min(Math.max(left, 0), window.innerWidth - tooltipRect.width);
        top = Math.min(Math.max(top, 0), window.innerHeight - tooltipRect.height);

        // Account for document scroll
        left -= document.body.scrollLeft;
        top -= document.body.scrollTop;

        tooltip.style.left = left + "px";
        tooltip.style.top = top + "px";
    }
</script>

<section class="tooltip" class:is-showing={isShowing}
            bind:this={tooltip} 
            {...containerProps}
        >
    <div class="tooltip-box">
        {#if content}
            {@render content()}
            {requestUpdatePosition(), ""}
        {/if}
    </div>
</section>

<style>
    :global {
        .tooltip {
            z-index: 1000000;
            position: fixed;
            max-width: min(calc(100dvw - 2em), 20em);
            pointer-events: none;
            opacity: 0;
            transition: opacity .15s .05s;
        }
        .tooltip-box {
            display: flex;
            flex-flow: column;
            gap: 0.3em;
            padding: 0.5em 0.75em;
            margin: 0.5em;
            font-size: 0.75em;
            color: white;
            background: black;
            border: 2px solid white;
            box-shadow: 0 2px 4px black;
            text-decoration: none;
            text-align: center;
            align-items: center;
        }
        .tooltip.is-showing {
            opacity: 1;
        }

        .tooltip :global(:is(h1, h2, h3, h4, h5, h6, p)) {
            margin: 0;
        }

        .tooltip :global(h4) {
            font-size: 1.25em;
        }
    }
</style>