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

    let isShowing = false;

    onMount(() => {
        let parent = tooltip.parentNode as HTMLElement | null;
        if (!parent) return;

        parent.addEventListener("pointerenter", onTooltipSetMouse);
        parent.addEventListener("pointerleave", onTooltipUnsetMouse);
        parent.addEventListener("pointerdown", onTooltipSetTouch);
        parent.addEventListener("focus", onTooltipSet);
        parent.addEventListener("blur", onTooltipUnset);

        return () => {
            parent.removeEventListener("pointerenter", onTooltipSetMouse);
            parent.removeEventListener("pointerleave", onTooltipUnsetMouse);
            parent.removeEventListener("pointerdown", onTooltipSetTouch);
            parent.removeEventListener("focus", onTooltipSet);
            parent.removeEventListener("blur", onTooltipUnset);
        }
    })

    function onTooltipSet() {
        isShowing = true;
        let parent = tooltip.parentNode as HTMLElement | null;
        if (!parent) return;
        setTooltip(parent, children, containerProps);
    }

    function onTooltipUnset() {
        isShowing = false;
        unsetTooltip();
    }

    function onTooltipSetMouse(ev: PointerEvent) {
        if (ev.pointerType != "touch") {
            onTooltipSet();
        }
    }

    function onTooltipUnsetMouse(ev: PointerEvent) {
        if (ev.pointerType != "touch") {
            onTooltipUnset();
        }
    }

    function cancelTouch(ev: PointerEvent) {
        ev.preventDefault();
    }

    function onTooltipSetTouch(ev: PointerEvent) {
        if (ev.pointerType == "touch") {
            let parent = tooltip.parentNode as HTMLElement | null;
            if (!parent) return;

            if (isShowing) return;

            ev.stopPropagation();
            
            onTooltipSet();

            function bodyTouch(ev2: PointerEvent) {
                onTooltipUnset();
                document.body.removeEventListener("pointerdown", bodyTouch);
                document.body.removeEventListener("pointermove", bodyTouch);
                parent?.removeEventListener("click", cancelTouch);
            }
            document.body.addEventListener("pointerdown", bodyTouch);
            document.body.addEventListener("pointermove", bodyTouch);
            parent.addEventListener("click", cancelTouch);
        }
        else onTooltipUnset();
    }
</script>

<x-tooltip bind:this={tooltip}></x-tooltip>