<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";


    let metroHeader: HTMLDivElement;
    let metroHeaderItems: HTMLDivElement;

    let currentPage = $derived(page.url.pathname);
    let lastPage = "";

    let mainContainer: HTMLElement | null = null;

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
            categories[0].scrollIntoView({inline: "center"});
        }

        lastPage = currentPage;
    })

    onMount(() => {
        navBar = document.querySelector(".nav-bar") as HTMLElement;
        mobileTest = window.matchMedia("(max-width: 49.999em)");
        mainContainer = document.querySelector(".main-container");
        mainContainer?.addEventListener("scroll", updateScroll);
        document.body.addEventListener("resize", updateScroll);
        setTimeout(() => {
            updateScroll();
        }, 0)
        return () => {
            mainContainer?.removeEventListener("scroll", updateScroll);
            document.body.removeEventListener("resize", updateScroll);
        }
    })

    function updateScroll() {
        if (!mobileTest.matches) return;
        let progress = (mainContainer?.scrollLeft ?? 0) / navBar.offsetWidth;

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