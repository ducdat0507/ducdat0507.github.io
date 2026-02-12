<script lang="ts">
  import { page } from "$app/state";
  import Icon from "@iconify/svelte";
  import { onMount, untrack } from "svelte";

    type MobileNavButton = {
        element: Element,
        icon?: string,
        href?: string,
        highlight: number,
    }

    let metroHeader: HTMLDivElement;
    let metroHeaderItems: HTMLDivElement;
    let mobileNavItems: MobileNavButton[] = $state([]);
    let mobileNavBarItem: HTMLAnchorElement;

    let currentPage = $derived(page.url.pathname);
    let lastPage = "";

    let mainContainer: HTMLElement | null = null;

    let navBar: HTMLElement, mobileTest: MediaQueryList;

    $effect(() => {
        currentPage;
        untrack(() => {
            metroHeaderItems.innerHTML = "";
            mobileNavItems = []

            let categories = document.querySelectorAll(".category-box > *");
            if (!categories[0]) return;

            let index = 0;
            for (const elm of categories) {
                let link = document.createElement("a");
                link.innerText = elm.getAttribute("data-category-name") ?? "";
                link.href = "#" + elm.id;
                metroHeaderItems.appendChild(link);

                mobileNavItems.push({
                    element: elm,
                    icon: elm.getAttribute("data-icon") ?? undefined,
                    href: "#" + elm.id,
                    highlight: 0,
                });

                index++;
            }

            if (lastPage || currentPage != "/") {
                categories[0].scrollIntoView({inline: "center"});
            }

            lastPage = currentPage;
        })
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
            let highlightValue = Math.min(Math.max(1 - Math.abs(index + 1 - progress), 0), 1);
            item.style.setProperty("--highlight", highlightValue + "");
            highlightValue = Math.min(Math.max(index - progress + 2, 0), 2);
            mobileNavItems[index].highlight = highlightValue;
            index++;
        }
        mobileNavBarItem.style.setProperty("--highlight", Math.max(1 - progress, 0) + "");
    }

    function scrollToNavBar(e: Event) {
        e.preventDefault();
        navBar.scrollIntoView({inline: "center", behavior: "smooth"});
    }

    function scrollToElement(e: Event, elm: Element) {
        e.preventDefault();
        elm.scrollIntoView({inline: "center", behavior: "smooth"});
    }
</script>


<div class="mobile-nav" aria-hidden="true">
    <a class="pop-out-btn" href="#nav-bar" bind:this={mobileNavBarItem} onclick={scrollToNavBar}>
        <Icon icon="tabler:menu-2" />
    </a>
    <span class="mobile-nav-items">
        {#each mobileNavItems as item, i}
            <a class="pop-out-btn" href={item.href} onclick={(e) => scrollToElement(e, item.element!)} style:--highlight={item.highlight}>
                {#if item.icon}
                    <Icon icon={item.icon} />
                {:else}
                    {i + 1}
                {/if}
            </a>
        {/each}
    </span>
</div>
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

    .mobile-nav {
        position: fixed;
        inset: auto 0 0 0;
        display: flex;
        padding: 0 4vw 4vw 4vw;
        justify-content: space-between;
        z-index: 100;
        gap: 6px;
    }
    .mobile-nav-items {
        display: flex;
        justify-content: end;
        gap: 6px;
    }
    .mobile-nav :global(a) {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
        text-decoration: none;
        color: white;
        background: black;
        width: 3em;
        height: 3em;
    }
    .mobile-nav :global(a)::after {
        content: "";
        position: absolute;
        inset: 0 0 0 0;
        background: linear-gradient(white, white) 0 calc(calc(3em - 4px) * calc(1 - var(--highlight, 0))) / 100% 100% no-repeat;
        mix-blend-mode: difference;
    }
    .mobile-nav :global(a > svg) {
        width: 1.6em;
        height: 1.6em;
    }

    @media (min-width: 50em) {
        .metro-header, .mobile-nav {
            display: none;
        }
    }
</style>