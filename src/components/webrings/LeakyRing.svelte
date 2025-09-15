<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import WebringNav from "./WebringNav.svelte";
  import Tooltip from "../utils/Tooltip.svelte";

    const {
        backend = "https://brain.melonking.net",
        ...itemProps
    }: {
        backend?: string,
        [itemProp: string]: any
    } = $props();

    onMount(() => {
        doRequest()
        return () => {
            clearTimeout(lastUpdate);
        }
    })

    // Constants from https://melonking.net/scripts/flood.js
    const fillMax: number = 100;
    const bilgeAmount: number = 10;
    const bilgeCooldown: number = 10;
    const updateInterval: number = 10;

    let leakyRing: HTMLElement;

    let fillAmount: number = $state(0);
    let allSites: string[] = $state.raw([]);

    let lastBilge = 0;
    let lastUpdate = 0;
    let broken = $state(false);

    let bilging = $state(false);
    let cooldownTimeout = $state(0);

    function doRequest(bilge: boolean = false, fullInfo: boolean = true) {
        clearTimeout(lastUpdate);
        lastUpdate = setTimeout(() => {doRequest()}, updateInterval * 1000);
        if (bilging) return;

        // if (page.url.hostname == "localhost") {
        //     fillAmount = 100;
        //     allSites = [];
        //     return;
        // }

        fetch(
            `${backend}/flood?bilge=${bilge}&info=${fullInfo}&path=${page.url.pathname}`,
            {
                headers: {
                    "Accept": "application/json"
                }
            }
        )
            .then(async x => {
                // dealing with non-restful APIs be like
                if (x.headers.get("Content-Type")?.includes("text/html")) {
                    throw new Error(await x.text());
                }
                let data = await x.json();
                fillAmount = data.level;
                let sites = Object.keys(data.info.members)
                    .map(domain => data.info.members[domain].proto + "//" + domain + data.info.members[domain].path);
                allSites = sites;
                broken = false;
            })
            .catch(e => {
                console.error(e);
                broken = true;
            });
    }

    function doBilge() {
        if (fillAmount == 0) return;
        let now = Date.now()
        if (now - lastBilge >= bilgeCooldown * 1000) {
            fillAmount = Math.max(0, fillAmount - bilgeAmount);
            lastBilge = Date.now();
            doRequest(true);
            bilging = true;
            setTimeout(() => bilging = false, 5000);
        } else {
            if (cooldownTimeout) clearTimeout(cooldownTimeout);
            cooldownTimeout = setTimeout(() => {cooldownTimeout = 0}, 2000);
            
            leakyRing.animate([
                { transform: "translateX(0)", easing: "ease-out" },
                { transform: "translateX(0.5em)", easing: "ease-in" },
                { transform: "translateX(0)", easing: "ease-out" },
                { transform: "translateX(-0.5em)", easing: "ease-in" },
                { transform: "translateX(0)", easing: "ease-out" },
                { transform: "translateX(0.5em)", easing: "ease-in" },
                { transform: "translateX(0)", easing: "ease-out" },
                { transform: "translateX(-0.5em)", easing: "ease-in" },
                { transform: "translateX(0)" },
            ], {
                duration: 1500,
                easing: "cubic-bezier(0.4, 0.8, 0.6, 1)",
            })
        }
    }
</script>

<li class="leaky-ring" class:bilging={bilging}
        aria-label="Leaky Homepage Ring" 
        bind:this={leakyRing}
        {...itemProps}
    >
    <article class:broken={broken}>
        <h4>Leaky Homepage Ring</h4>
        <Tooltip>
            (now's actually a webring!)<br/>
            (...and doesn't take the entire screen for no reason)
        </Tooltip>
        {@html '<!-- <script src="https://melonking.net/scripts/flood.js"></script> -->'}
        <button class="leaky-ring-holder"
                style:--level={fillAmount / fillMax} 
                aria-label={`Water level: ${fillAmount / fillMax * 100}% - click to flush some water`}
                onclick={doBilge}
            ></button>
        <div class:active={cooldownTimeout || bilging || fillAmount / fillMax >= 0.5} aria-hidden={true}>
            {#if cooldownTimeout} 
                (I'm on cooldown, please wait a moment)
            {:else if bilging}
                (trying my best...)
            {:else}
                (click here to flush some water)
            {/if}
        </div>
        <WebringNav 
            indexLink="https://melonking.net/free/software/flood" 
            allLinks={allSites}
            {broken} />
    </article>
    <svg style="display: none">
        <defs>
            <filter id="leaky-ring-water">
                <feTurbulence baseFrequency="0.005" numOctaves="2" stitchTiles="stitch">
                    
                </feTurbulence>
                <feColorMatrix type="hueRotate" result="displacement-map">
                    <animate attributeName="values" values="0;360" dur="2s" repeatCount="indefinite"/>
                </feColorMatrix>
                <feDisplacementMap in="SourceGraphic" in2="map" scale="16" xChannelSelector="R" yChannelSelector="G">
                    <animate attributeName="scale" values="8;16;8" dur="10s" repeatCount="indefinite"/>
                </feDisplacementMap>
            </filter>
        </defs>
    </svg>
</li>

<style>
    .leaky-ring.bilging {
        animation: leaky-ring-shaking 0.05s linear alternate infinite;
    }

    .leaky-ring-holder {
        position: absolute;
        border-width: 0px;
        margin: 0;
        padding: 0;
        inset: 0;
        background: transparent;
        overflow: hidden;
        cursor: url(https://melonking.net/images/ui/bucket.png), pointer;
    }
    .leaky-ring-holder::before {
        content: "";
        display: block;
        inset: -1em -1em -1em -1em;
        width: calc(100% + 2em);
        height: calc(100% + 2em);
        margin: -1em;
        background: 
            linear-gradient(black, black) top left / 100% calc(100% - var(--level, 0) * 100%) no-repeat,
            url(/index/res/images/wave.svg) left calc(calc(1 - var(--level, 0)) * calc(100% + 19.9px)) / 200px 20px repeat-x, 
            url(/index/res/images/wave2.svg) left calc(calc(1 - var(--level, 0)) * calc(100% + 29.9px)) / 300px 30px repeat-x, 
            url(/index/res/images/tiling-bg.svg) repeat, 
            linear-gradient(#5df, #59f);
        transition: background 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        filter: url(#leaky-ring-water);
    }
    .leaky-ring .broken .leaky-ring-holder {
        display: none;
    }
    .leaky-ring.bilging .leaky-ring-holder::before {
        transition: background 5s linear;
    }
    .leaky-ring-holder + div {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-bottom: 2em;
        padding-inline: 1em;
        pointer-events: none;
        opacity: 0;
        transition: opacity .3s;
        font-size: 0.75em;
    }
    .leaky-ring-holder:hover + div, 
    .leaky-ring-holder + div.active {
        opacity: 1;
    }
    h4 {
        position: relative;
        z-index: 1;
    }

    @keyframes leaky-ring-shaking {
        from {
            transform: translateX(-1px);
        } to {
            transform: translateX(1px);
        }
    }
</style>