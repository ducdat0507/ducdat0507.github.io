<script lang="ts">
    import { onMount, type Snippet } from "svelte";
  import TooltipDisplayer, { setTooltip, unsetTooltip } from "./TooltipDisplayer.svelte";

    let {
        children,
        ...containerProps
    }: {
        children: Snippet
    } = $props();

    let tooltip: HTMLElement;

    let isShowing = $state(false);

    let left: number = $state(0);
    let top: number = $state(0);

    onMount(() => {
        let parent = tooltip.parentNode as HTMLElement | null;
        if (!parent) return;

        parent.addEventListener("pointerenter", onTooltipSet);
        parent.addEventListener("pointerleave", onTooltipUnset);
        parent.addEventListener("focus", onTooltipSet);
        parent.addEventListener("blur", onTooltipUnset);

        return () => {
            parent.removeEventListener("pointerenter", onTooltipSet);
            parent.removeEventListener("pointerleave", onTooltipUnset);
            parent.removeEventListener("focus", onTooltipSet);
            parent.removeEventListener("blur", onTooltipUnset);
        }
    })

    function onTooltipSet() {
        let parent = tooltip.parentNode as HTMLElement | null;
        if (!parent) return;
        setTooltip(parent, children, containerProps);
    }

    function onTooltipUnset() {
        unsetTooltip();
    }
</script>

<x-tooltip bind:this={tooltip}></x-tooltip>