<script lang="ts">
  import { onMount } from "svelte";

    let {
        invite,
    } = $props();

    let ready = $state(false);
    let memberCount: number | null = $state(null)
    let onlineCount: number | null = $state(null)

    onMount(() => {
        fetch(`https://discord.com/api/v9/invites/${invite}?with_counts=true`).then(x => x.json()).then(data => {
            memberCount = (+data.approximate_member_count);
            onlineCount = (+data.approximate_presence_count);
            ready = true;
        })
    })
</script>

{#if ready}
    <span style="font-weight: bold">
        {memberCount?.toLocaleString("en-US")} <span class="stat-total-bubble">members</span>
        {onlineCount?.toLocaleString("en-US")} <span class="stat-online-bubble">online</span>
    </span>
{/if}