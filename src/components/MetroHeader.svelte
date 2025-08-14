<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";


    let metroHeader: HTMLDivElement;
    let metroHeaderItems: HTMLDivElement;

    let currentPage = $derived(page.url.pathname);
    let lastPage = "";

    let navBar: HTMLElement, mobileTest: MediaQueryList;

    $effect(() => {
        currentPage;

        metroHeaderItems.innerHTML = "";

        let categories = document.querySelectorAll(".category-box > *");
        if (!categories[0]) return;

        for (let elm of categories) {
            let link = document.createElement("a");
            link.innerText = elm.getAttribute("data-category-name") ?? "";
            link.href = "#" + elm.id;
            metroHeaderItems.appendChild(link);
        }

        if (lastPage || currentPage != "/") {
            categories[0].scrollIntoView();
        }

        lastPage = currentPage;
    })

    onMount(() => {
        navBar = document.querySelector(".nav-bar") as HTMLElement;
        mobileTest = window.matchMedia("(not (min-width: 50em))");
        document.querySelector(".main-container")?.addEventListener("scroll", onScroll)
        setTimeout(() => {
            metroHeader.scrollBy({left: 0.01});
        }, 0)
        return () => {
            document.querySelector(".main-container")?.removeEventListener("scroll", onScroll)
        }
    })

    function onScroll(ev: Event) {
        if (!mobileTest.matches) return;
        let progress = (ev.target as HTMLElement).scrollLeft / navBar.offsetWidth;
        console.log(progress);

        updateHeader(progress);
    }

    function updateHeader(progress: number) {
        if (!metroHeader) return;

        let items = metroHeaderItems.childNodes as NodeListOf<HTMLElement>;

        // Update scroll
        let scrollProgress = Math.min(Math.max(progress - 1, -1), items.length - 1 - 1e-4);
        let scrollProgressInt = Math.floor(scrollProgress);
        let posStart = scrollProgressInt < 0 ? 0 : items[scrollProgressInt]?.offsetLeft;
        let posEnd = items[scrollProgressInt + 1]?.offsetLeft;
        let posTarget = posStart + (posEnd - posStart) * ((scrollProgress % 1 + 1) % 1);
        console.log(posTarget);
        console.log(scrollProgressInt, posStart, posEnd, posTarget);
        metroHeader.scrollLeft = posTarget;

        // Update highlight
        let index = 0;
        for (let item of items) {
            item.style.setProperty("--highlight", Math.min(Math.max(1 - Math.abs(index + 1 - progress), 0), 1) + "");
            index++;
        }
    }
</script>


<div class="metro-header" aria-hidden="true" bind:this={metroHeader}>
    <div class="metro-header-items" bind:this={metroHeaderItems}>

    </div>
</div>

<style>
    .metro-header {
        position: fixed;
        inset: 0 0 auto 0;
        height: 9em;
        display: flex;
        align-items: end;
        overflow: hidden;
    }
    .metro-header-items {
        padding-left: min(30em, calc(100dvw - 3em));
        padding-right: 100dvw;
    }
    .metro-header-items > :global(a) {
        font-size: min(4em, 10dvw);
        font-weight: 300;
        color: white;
        padding-left: 1.8rem;
        text-decoration: none;
        opacity: calc(0.3 + 0.7 * var(--highlight, 0));
        white-space: nowrap;
    }
    @media (min-width: 50em) {
        .metro-header {
            display: none;
        }
    }
</style>