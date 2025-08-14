<script>
    import { page } from "$app/state";
    import Icon from "@iconify/svelte";

    let {
        href, target = "", icon, children
    } = $props();

    let selected = $derived(page.url.pathname == href)

</script>

<li class:active={selected}>
    <a href={href} target={target} aria-current={selected}>
        <Icon icon={icon} inline />
        <span>{@render children()}</span>
    </a>
</li>
