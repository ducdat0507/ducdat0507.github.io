<script>
    import { page } from "$app/state";
    import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

    let {
        href, target = "_self", icon, children
    } = $props();

    let selected = $derived(page.url.pathname == href)

    onMount(() => {
        if (target == "_self") target = ""
    })

</script>

<li class:active={selected}>
    <a href={href} target={target} aria-current={selected}>
        <Icon icon={icon} inline />
        <span>{@render children()}</span>
    </a>
</li>
