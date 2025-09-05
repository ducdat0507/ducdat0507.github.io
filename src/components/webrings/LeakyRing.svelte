<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import WebringNav from "./WebringNav.svelte";

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

    let fillAmount: number = $state(0);
    let allSites: string[] = $state.raw([]);

    let lastBilge = 0;
    let lastUpdate = 0;
    let broken = $state(false);

    let bilging = $state(false);

    function doRequest(bilge: boolean = false, fullInfo: boolean = true) {
        clearTimeout(lastUpdate);
        lastUpdate = setTimeout(() => {doRequest()}, updateInterval * 1000);
        if (bilging) return;
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
                bilging = false;
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

        }
    }
</script>

<li class="leaky-ring" aria-label="Leaky Homepage Ring" {...itemProps}>
    <article class:broken={broken}>
        <h4>Leaky Homepage Ring</h4>
        <p>(now's actually a webring)</p>
        {@html '<!-- <script src="https://melonking.net/scripts/flood.js"></script> -->'}
        <button class="leaky-ring-holder" class:bilging={bilging}
                style:--level={fillAmount / fillMax} 
                aria-label={`Water level: ${fillAmount / fillMax * 100}% - click to bilge`}
                onclick={doBilge}
            ></button>
        <div aria-hidden={true}>(click here to bilge)</div>
        <WebringNav 
            indexLink="https://melonking.net/free/software/flood" 
            allLinks={allSites}
            {broken} />
    </article>
</li>

<style>
    .leaky-ring-holder {
        position: absolute;
        border-width: 0px;
        margin: 0;
        inset: 0;
        background: url(/index/res/images/tiling-bg.svg) repeat, linear-gradient(#5df, #59f);
        mask: linear-gradient(white, white) no-repeat bottom / 100% calc(var(--level, 0) * 100%);
        transition: mask 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        cursor: url(https://melonking.net/images/ui/bucket.png), pointer;
    }
    .leaky-ring-holder.bilging {
        transition: mask 5s linear;
    }
    .leaky-ring-holder + div {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 1em;
        pointer-events: none;
        opacity: 0;
        transition: opacity .3s;
        font-size: 0.75em;
    }
    .leaky-ring-holder:hover + div {
        opacity: 1;
    }
    h4, p {
        position: relative;
        z-index: 1;
    }
    p {
        margin: 0;
        font-size: .75em;
    }
</style>