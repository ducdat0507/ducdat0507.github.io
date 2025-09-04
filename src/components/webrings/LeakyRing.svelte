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

    function doRequest(bilge: boolean = false, fullInfo: boolean = true) {
        clearTimeout(lastUpdate);
        lastUpdate = setTimeout(() => {doRequest()}, updateInterval * 1000)
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
                allSites = Object.keys(data.info.members).map(domain => data.info.members[domain].proto + "//" + domain + data.info.members[domain].path);
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
        } else {

        }
    }
</script>

<li class="leaky-ring" aria-label="Leaky Homepage Ring" {...itemProps}>
    <article class:broken={broken}>
        <h4>Leaky Homepage Ring</h4>
        {@html '<!-- <script src="https://melonking.net/scripts/flood.js"></script> -->'}
        <button class="leaky-ring-holder" 
                style:--level={fillAmount / fillMax} 
                aria-label={`Water level: ${fillAmount / fillMax * 100}% - click to bilge`}
                onclick={doBilge}
            ></button>
        <WebringNav 
            indexLink="https://melonking.net/free/software/flood" 
            allLinks={allSites}
            {broken} />
    </article>
</li>

<style>
    .leaky-ring-holder {
        position: absolute;
        inset: 0;
        background: url(/index/res/images/tiling-bg.svg) repeat, linear-gradient(#5df, #59f);
        mask: linear-gradient(white, white) no-repeat bottom / 100% calc(var(--level, 0) * 100%);
        transition: mask 1s ease-out;
        cursor: url(https://melonking.net/images/ui/bucket.png), pointer;
    }
    h4 {
        position: relative;
        z-index: 1;
    }
</style>