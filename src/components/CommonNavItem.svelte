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

<li class="nav-item pop-out-btn" class:active={selected}>
    <a href={href} target={target} aria-current={selected}>
        <Icon icon={icon} inline />
        <span>{@render children()}</span>
    </a>
</li>

<style>
    li {
        --inset: 0px;
        --outset: 0px;
        --inset-border: 0px;
        pointer-events: none;
    }
    li.active:is(:hover, :active) {
        --inset: 0px;
        --outset: 0px;
        --inset-border: 0px;
    }
    li.active:is(:hover, :active)::before {
        background: transparent;
    }

    a {
        pointer-events: all;
    }
</style>