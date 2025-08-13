<script lang="ts">
  import { onMount } from "svelte";

    type Status = {
        author: string,
        content: string,
        face: string,
        timeAgo: string,
    }

    let {
        username = "duducat",
    } = $props();

    let ready = $state(false);
    let lastStatus: Status | null = $state(null)

    onMount(() => {
        fetch(`https://status.cafe/users/${username}/status.json`).then(x => x.json()).then(data => {
            lastStatus = data as Status;
            ready = true;
        })
    })
</script>

{#if ready && lastStatus?.content}
    <div class="status-cafe-face">{lastStatus?.face}</div>
    <div class="status-cafe">
        <time style="opacity: .5">{lastStatus?.timeAgo}</time><br/>
        {lastStatus?.content}
    </div>
{/if}