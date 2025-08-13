<script>
    import Icon from "@iconify/svelte";
    import CommonNavItem from "./CommonNavItem.svelte";
    import { page } from "$app/state";
</script>

<nav>
    <ul>
        {#if page.url.pathname != "/"}
            <CommonNavItem href="/" icon="iconoir:home">
                home
            </CommonNavItem>
        {/if}
        <li>
            <h2>portfolio</h2>
            <ul>
                <CommonNavItem href="/index/about/" icon="fluent:hand-wave-24-regular">
                    about me
                </CommonNavItem>
            </ul>
        </li>
        <li>
            <h2>my stuff</h2>
            <ul>
                <CommonNavItem href="/index/games/" icon="iconoir:gamepad">
                    games
                </CommonNavItem>
                <CommonNavItem href="/index/non-games/" icon="iconoir:cube">
                    non-games
                </CommonNavItem>
                <!-- <CommonNavItem href="/index/non-code/" icon="octicon:paintbrush-24">
                    non-code
                </CommonNavItem> -->
                <CommonNavItem href="/blarbs/" icon="ri:speak-line">
                    blarbs
                </CommonNavItem>
            </ul>
        </li>
        <li>
            <h2>world wide web</h2>
            <ul>
                <CommonNavItem href="/index/outlinks/" icon="hugeicons:globe">
                    outlink collection
                </CommonNavItem>
            </ul>
        </li>
    </ul>
</nav>

<style>
    nav, nav ul, nav h2 {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    nav h2 {
        font-size: 1.5em;
        margin-top: 0.5em;
        color: #fffa;
    }
    nav li {
        margin-top: 0.25em;
    }

    nav :global(a) {
        color: white;
        text-decoration: none;
        font-size: 2.75em;
        font-weight: 300;
        line-height: 0.75;
    }
    nav :global(svg) {
        margin-inline-end: -0.1em;
    }
</style>