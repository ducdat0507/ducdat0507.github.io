<script lang="ts">
  import { onMount } from "svelte";

    let {
        username = "ducdat0507",
    } = $props();

    let ready = $state(false);
    let followerCount: number | null = $state(null)

    onMount(() => {
        fetch(`https://api.github.com/users/${username}`, { cache: "force-cache" }).then(x => x.json()).then(data => {
            followerCount = data.followers;
            ready = true;
        })
    })
</script>

{#if ready}
    <span style="font-weight: bold">
        {followerCount?.toLocaleString("en-US")} <span class="stat-watch-bubble">followers</span>
    </span>
{/if}