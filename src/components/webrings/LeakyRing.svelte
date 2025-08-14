<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import WebringNav from "./WebringNav.svelte";

    const {
        backend = "https://brain.melonking.net",
    }: {
        backend?: string,
    } = $props();

    onMount(() => {
        doRequest()
        return () => {
            clearTimeout(lastUpdate);
        }
    })

    // Constants found in https://melonking.net/scripts/flood.js
    const fillMax: number = 100;
    const bilgeAmount: number = 10;
    const bilgeCooldown: number = 10;
    const updateInterval: number = 10;

    let fillAmount: number = $state(0);
    let allSites: string[] = $state([]);

    let lastBilge = 0;
    let lastUpdate = 0;

    function doRequest(bilge: boolean = false, fullInfo: boolean = true) {
        clearTimeout(lastUpdate);
        setTimeout(() => {doRequest()}, updateInterval * 1000)
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
                fillAmount = data.fill;
                allSites = Object.keys(data.info.members).map(domain => data.info.members[domain].proto + "//" + domain);
            })
            .catch(console.error);
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

<div class="leaky-ring">
    <div class="leaky-ring-holder" style:--level={fillAmount / fillMax} on:click={doBilge}></div>
    <h4>Leaky Homepage Ring</h4>
    <WebringNav 
        indexLink="https://melonking.net/free/software/flood" 
        allLinks={allSites} />
</div>

<style>
    .leaky-ring-holder {
        position: absolute;
        inset: 0;
        background: url(/index/res/images/tiling-bg.svg) repeat, linear-gradient(#5df, #59f);
        mask: linear-gradient(white, white) no-repeat bottom / 100% calc(var(--level, 0) * 100%);
        transition: mask 1s ease-out;
    }
    h4 {
        position: relative;
        z-index: 1;
    }
</style>