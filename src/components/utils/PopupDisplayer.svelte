<script module lang="ts">
  import Icon from "@iconify/svelte";
    import { createRawSnippet, onMount, type Snippet } from "svelte";
  import { focusTrap } from "svelte-focus-trap";
  import { cubicOut, expoOut } from "svelte/easing";
  import { render } from "svelte/server";
  import { fade } from "svelte/transition";

    type PopupData = {
        id: string,
        title: string,
        parent?: HTMLElement,
        content: Snippet | null,
        actions: ({
            name: string,
            icon?: string,
            invoke?: () => void,
            href?: string,
        } | null)[]
    }

    let popupData: PopupData[] = $state([]);

    let popups: HTMLElement[] = $state([]);

    export function hasPopup() {
        return popupData.length > 0;
    }

    export function setPopup(title: string, content: string | Snippet, actions: PopupData["actions"]) {

        if (typeof content == "string") {
            const contentString = content;
            content = createRawSnippet(() => ({
                render: () => contentString,
            }));
        }

        popupData.push({
            id: (Math.random() + "").substring(2),
            title,
            content,
            actions,
        })
    }

    export function unsetPopup(id: string) {
        let index = popupData.findIndex(x => x.id == id);
        if (index < 0) return;
        popupData[index].parent?.focus?.();
        popupData.splice(index, 1);
    }

    function easeIn(node: HTMLElement, { from, to }: { from: DOMRect; to: DOMRect }, params: any) {
        let index = popups.indexOf(node);
        if (index >= 0) {
            popupData[index].parent = document.activeElement as HTMLElement;
        }
        node.focus();
		return {
			delay: 0,
			duration: 200,
			easing: expoOut,
			css: (t: number, u: number) => `opacity: ${t}`
		};
	}
    function easeOut(node: HTMLElement, { from, to }: { from: DOMRect; to: DOMRect }, params: any) {
        let index = popups.indexOf(node);
		return {
			delay: 0,
			duration: 100,
			easing: cubicOut,
			css: (t: number, u: number) => `opacity: ${t}`
		};
	}
</script>

<script lang="ts">
</script>

{#each popupData as popup, i (popup.id)}
    <div class="popup" role="dialog" tabindex="-1" bind:this={popups[i]}
                aria-labelledby="popup-header-{popup.id}"
                aria-describedby="popup-content-{popup.id}"
                aria-modal="true"
                use:focusTrap
                in:easeIn out:easeOut
            >
        <div class="popup-box">
            <h4 id="popup-header-{popup.id}" class="popup-header">
                {popup.title}
            </h4>
            <div id="popup-content-{popup.id}" class="popup-content">
                {#if popup.content}
                    {@render popup.content()}
                {/if}
            </div>
            <div class="popup-actions links">
                {#each popup.actions as action}
                    {#if action}
                        <div class="action link-tile">
                            {#if action.href}
                                <a class="pop-out-btn" href={action.href} onclick={() => unsetPopup(popup.id)}>
                                    <Icon icon={action.icon || "iconoir:play"} />
                                    <span>{action.name}</span>
                                </a>
                            {:else}
                                <button class="pop-out-btn" onclick={() => { action.invoke?.(); unsetPopup(popup.id) }}>
                                    <Icon icon={action.icon || "iconoir:play"} />
                                    <span>{action.name}</span>
                                </button>
                            {/if}
                        </div>
                    {:else}
                        <span class="flex-space" aria-hidden="true"></span>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
{/each}

<style>
    .popup {
        z-index: 900000;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        inset: 0;
        transition: opacity .15s .05s;
        background: #0007;
        overflow: hidden;
    }
    .popup-box {
        display: flex;
        flex-flow: column;
        margin: 0.75em;
        color: white;
        background: black;
        border: 2px solid white;
        box-shadow: 2px 2px black;
        text-decoration: none;
        align-items: stretch;
        animation: popup-box-in .5s cubic-bezier(0.2, 1, 0, 1);
        max-width: 40em;
    }

    @keyframes popup-box-in {
        from {
            transform: translateY(calc(50lvh + 50%));
        }
    }

    .popup-header {
        padding: 0.5em 0.75em;
        margin: 0;
        color: black;
        background: white;
        flex: 0;
    }

    .popup-content {
        padding: 1em 1.25em;
        flex: 1;
    }

    .popup-actions {
        display: flex;
        flex-flow: row;
        gap: .5em;
        margin: 0 -0.5em -0.5em 0.5em;
        flex: 0;
    }
    .popup-actions > .action {
        flex: 0 0 5em;
        aspect-ratio: 2;
    }
    .popup-actions > .action > :is(a, button) {
        display: block;
        width: 100%;
        height: 100%;
        border: 2px solid white;
        background: black;
        color: white;
        padding: 0.5em;
        font: inherit;
    }
    .popup-actions > .action span {
        line-height: 1;
        bottom: .4em;
    }
    .popup-actions > .flex-space {
        flex: 1;
    }
</style>