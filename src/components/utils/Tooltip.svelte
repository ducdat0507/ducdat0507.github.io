<script lang="ts">
    import { onMount, type Snippet } from "svelte";
  import TooltipDisplayer, { setTooltip, unsetTooltip } from "./TooltipDisplayer.svelte";

    let {
        children,
        ...containerProps
    }: {
        children: Snippet
    } = $props();

    let tooltip: HTMLElement | null = $state(null);
    let parent: HTMLElement | null = $state(null);

    let hasParent = $derived(parent != null);

    let isShowing = false;

    onMount(() => {
        if (!parent) parent = tooltip!.parentNode as HTMLElement | null;
        if (!parent) return;

        parent.addEventListener("pointerenter", onTooltipSetMouse);
        parent.addEventListener("pointerleave", onTooltipUnsetMouse);
        parent.addEventListener("pointerdown", onTooltipSetTouch);
        parent.addEventListener("focus", onTooltipSet);
        parent.addEventListener("blur", onTooltipUnset);

        return () => {
            if (!parent) return;

            parent.removeEventListener("pointerenter", onTooltipSetMouse);
            parent.removeEventListener("pointerleave", onTooltipUnsetMouse);
            parent.removeEventListener("pointerdown", onTooltipSetTouch);
            parent.removeEventListener("focus", onTooltipSet);
            parent.removeEventListener("blur", onTooltipUnset);
        }
    })

    function onTooltipSet() {
        isShowing = true;
        if (!parent) return;
        setTooltip(parent, children, containerProps);
    }

    function onTooltipUnset() {
        isShowing = false;
        unsetTooltip(parent);
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
            if (!parent) return;

            if (isShowing) return;

            ev.stopPropagation();
            
            onTooltipSet();

            function bodyMove(ev2: PointerEvent) {
                if ((ev.clientX - ev2.clientX) ** 2 + (ev.clientY - ev2.clientY) ** 2 > 100) bodyTouch(ev2);
            }
            function bodyTouch(ev2: PointerEvent) {
                onTooltipUnset();
                document.body.removeEventListener("pointerdown", bodyTouch);
                document.body.removeEventListener("pointermove", bodyMove);
                parent?.removeEventListener("click", cancelTouch);
            }
            document.body.addEventListener("pointerdown", bodyTouch);
            document.body.addEventListener("pointermove", bodyMove);
            parent.addEventListener("click", cancelTouch);
        }
        else onTooltipUnset();
    }
</script>

{#if !hasParent}
    <x-tooltip bind:this={tooltip}></x-tooltip>
{/if}