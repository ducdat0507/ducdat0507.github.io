<script module lang="ts">
    import { onMount, type Snippet } from "svelte";
  import { cubicOut, expoOut } from "svelte/easing";
  import { fade } from "svelte/transition";

    type TooltipData = {
        id: string,
        content: Snippet | null,
        parent: HTMLElement | null,
        containerProps: any,
        style: {
            top?: string,
            left?: string,
            "transform-origin"?: string
        }
    }

    let tooltipData: TooltipData[] = $state([]);

    const maxTooltips = 1;

    export function setTooltip(_parent: HTMLElement, _content: Snippet, _props: any) {

        if (tooltipData.length > 0) {
            if (tooltipData.at(-1)?.parent == _parent) return;
            if (tooltipData.length >= maxTooltips) tooltipData.shift();
        }

        tooltipData.push({
            id: Math.random() + "",
            parent: _parent,
            content: _content,
            containerProps: _props,
            style: {},
        })
    }

    export function unsetTooltip(_parent: HTMLElement | null) {
        let index = tooltipData.findIndex(x => x.parent == _parent);
        if (index < 0) return;
        tooltipData.splice(index, 1);
    }

    function objToStyle(obj: Record<string, string>) {
        let style = "";
        for (let prop in obj) style += `${prop}:${obj[prop]};`
        return style;
    }


    function easeIn(node: HTMLElement, { from, to }: { from: DOMRect; to: DOMRect }, params: any) {
		return {
			delay: 0,
			duration: 200,
			easing: expoOut,
			css: (t: number, u: number) => `transform: scale(${t <= 0 ? 1 : 0.8 + t * 0.2}); opacity: ${t}`
		};
	}
    function easeOut(node: HTMLElement, { from, to }: { from: DOMRect; to: DOMRect }, params: any) {
		return {
			delay: 0,
			duration: 100,
			easing: cubicOut,
			css: (t: number, u: number) => `transform: scale(${0.8 + t * 0.2}); opacity: ${t}`
		};
	}
</script>

<script lang="ts">

    let tooltips: HTMLElement[] = $state([]);

    $effect(() => {
        requestUpdatePositionAll();
    })

    function requestUpdatePositionAll() {
        for (let i = 0; i < tooltipData.length; i++) updatePosition(i);
    }

    function requestUpdatePosition(index: number) {
        updatePosition(index);
    }

    function updatePosition(index: number) {

        let tooltip = tooltips[index];
        let parent = tooltipData[index].parent;
        if (!tooltip || !parent) return;

        let tooltipRect = tooltip.getBoundingClientRect();
        let parentRect = parent.getBoundingClientRect();

        let left = parentRect.left + (parentRect.width - tooltipRect.width) / 2;
        let top = parentRect.top + (parentRect.height - tooltipRect.height) / 2;
        let alignment = "bottom";

        // TODO add more alignment options
        top -= (parentRect.height + tooltipRect.height) / 2;
        if (top < 0) {
            alignment = "top";
            top = parentRect.top + parentRect.height;
        }
        
        // Keep tooltip inside viewport
        left = Math.min(Math.max(left, 0), window.innerWidth - tooltipRect.width);
        top = Math.min(Math.max(top, 0), window.innerHeight - tooltipRect.height);

        // Account for document scroll
        left -= document.body.scrollLeft;
        top -= document.body.scrollTop;

        tooltipData[index].style.left = left + "px";
        tooltipData[index].style.top = top + "px";
        tooltipData[index].style["transform-origin"] = alignment;
    }
</script>

{#each tooltipData as tooltip, i (tooltip.id)}
    <section class="tooltip" role="tooltip"
                in:easeIn out:easeOut
                bind:this={tooltips[i]} 
                style={objToStyle(tooltip.style)}
                {...tooltip.containerProps}
            >
        <div class="tooltip-box">
            {#if tooltip.content}
                {@render tooltip.content()}
            {/if}
        </div>
    </section>
{/each}

<style>
    .tooltip {
        z-index: 1000000;
        position: fixed;
        max-width: min(calc(100dvw - 2em), 20em);
        pointer-events: none;
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

    .tooltip :global(:is(h1, h2, h3, h4, h5, h6, p)) {
        margin: 0;
    }

    .tooltip :global(h4) {
        font-size: 1.25em;
    }

    .tooltip :global(.tooltip-action) {
        opacity: 0.6;
    }
</style>