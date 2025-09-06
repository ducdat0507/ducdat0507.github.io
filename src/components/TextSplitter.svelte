<script lang="ts">
    let { 
        text
    }: {
        text: string
    } = $props();

    let charIndex = 0;
</script>

{((charIndex = 0) || true) && ""}
<splitted-text aria-label={text}>
    {#each text.split(" ") as word}
        {" "}<s-word aria-hidden="true">
            {#each word as char, index}
                <span style:--index={charIndex + index}>{char}</span>
            {/each}
        </s-word>{((charIndex += word.length) || true) && ""}
    {/each}
</splitted-text>

<style>
    s-word {
        white-space: nowrap;
    }
</style>