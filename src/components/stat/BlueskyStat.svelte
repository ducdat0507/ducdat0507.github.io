<script lang="ts">
  import { onMount } from "svelte";

    let {
        handle = "duducat.moe",
    } = $props();

    let ready = $state(false);
    let followerCount: number | null = $state(null)

    onMount(() => {
        fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${handle}`, { cache: "force-cache" }).then(x => x.json()).then(data => {
            followerCount = data.followersCount;
            ready = true;
        })
    })
</script>

{#if ready}
    <span style="font-weight: bold">
        {followerCount?.toLocaleString("en-US")} <span class="stat-watch-bubble">followers</span>
    </span>
{/if}