
<script>
  import { page } from '$app/state';
  import CommonNav from '../components/CommonNav.svelte';
  import MetroHeader from '../components/MetroHeader.svelte';
  import TooltipDisplayer from '../components/utils/TooltipDisplayer.svelte';

    let { 
        children
    } = $props();

    let isHome = $derived(page.url.pathname == "/");
</script>

<div class="background"></div>
<div class="main-container" class:home={isHome}>
    <div class="content-background-holder">
        <div class="content-background">
            
        </div>
    </div>
    <div class="nav-bar"> 
        <span class="flexible-space" aria-hidden="true"></span>
        <header>
            <div class="mobile-nav-help" aria-hidden="true">(scroll horizontally to navigate!)</div>
            <CommonNav/>
        </header>
        <span class="flexible-space" aria-hidden="true"></span>
        <footer>
            <p>
                website &copy; 2021-{new Date().getFullYear()} duducat/ducdat0507<br/>
                sometimes rights are reserved
            </p>
            <p class="buttons">
                <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL">
                    <img src="/index/res/buttons/smil.svg" alt="&quot;Enhanced with SMIL! :D&quot; button" />
                </a>
            </p>
        </footer>
    </div>
    <div class="content-container">
        <main>
            {@render children()}
        </main>
    </div>
    <MetroHeader />
    <TooltipDisplayer />
</div>

<style>
    .background {  
        position: fixed;
        inset: 0;
        background: url(/index/res/images/tiling-bg.svg) repeat, linear-gradient(#000039, #1f0085);
    }
    
    .main-container {
        position: fixed;
        inset: 0;
        width: 100dvw;
        height: 100dvh;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: center;
        transition: inset 0.3s, box-shadow 0.3s, width 0.3s, height 0.3s;
        transition-timing-function: var(--ease-out-expo);
    }
    .content-background-holder {  
        position: absolute;
        inset: 0;
        overflow: hidden;
    }
    .content-background {  
        position: absolute;
        background:
            url(/index/res/images/tiling-spikes-left.svg) repeat-y top left / 1em 2em, 
            url(/index/res/images/tiling-spikes-right.svg) repeat-y top right / 1em 2em, 
            linear-gradient(#000, #000) no-repeat center / calc(100% - 2em) 100%;

        transition: inset 0.3s;
        transition-timing-function: var(--ease-out-expo);
    }
    .main-container .nav-bar {
        overflow-y: auto;
    }

    .nav-bar footer {
        margin-top: 1em;
    }
    .nav-bar footer p {
        margin: 0;
        line-height: 1.1;
    }
    .nav-bar .buttons {
        margin-top: .3em;
        display: flex;
        gap: 5px;
    }

    .content-container {
        display: flex;
        flex-direction: column;
        overflow: hidden auto;
        gap: 1em;
        align-items: stretch;
        justify-content: space-between;
        z-index: 1;
    }
    .main-container .content-background { 
        inset: 0 -1em 0 50%;
    }

    @media (max-width: 83.999em) {
        :global(body) {
            font-size: 0.9em;
        }
    }

    @media (max-width: 49.999em) {
        .main-container .content-background { 
            position: fixed;
        }
        .main-container {
            display: flex;
            justify-content: start;
            gap: 1px;
            padding: 0 1em;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-padding-left: 1em;
            scrollbar-width: none;
        }
        .main-container::-webkit-scrollbar {
            display: none;
        }
        .main-container .mobile-nav-help {
            position: absolute;
            inset: 2em max(3em, calc(100dvw - 32em)) auto auto;
            border: 2px solid white;
            padding: .6em 1em;
            background: black;
        }
        .main-container .nav-bar {
            display: flex;
            flex-flow: column;
            justify-content: safe end;
            flex: 0 0 min(30em, calc(100dvw - 3em));
            padding-block: 7em 2em;
            padding-inline: 1em;
            z-index: 1;
            scroll-snap-align: start;
            scroll-snap-stop: always;
            scrollbar-width: none;
        }
        .content-container {
            flex: 0 1;
            overflow: visible;
            height: 100%;
            width: max-content;
        }
        main {
            height: 100%;
            width: max-content;
        }
        main :global(.category-box) {
            flex: 0 1;
            display: flex;
            flex-flow: row;
            height: 100%;
            min-width: max-content;
        }
        main :global(.category-box > *) {
            flex: 0 0 min(30em, calc(100dvw - 3em));
            height: 100%;
            padding: 1em;
            padding-block: 10em 2em;
            padding-inline: 1em;
            overflow-y: auto;
            scroll-snap-align: start;
            scroll-snap-stop: always;
            scrollbar-width: none;
        }
        main :global(.category-box::after) {
            content: "";
            padding-right: max(2em, calc(100dvw - 31em));
        }
    }


    @media (min-width: 50em) {
        .main-container .mobile-nav-help {
            display: none;
        }

        .main-container.home {
            --inset-block: max(0px, calc(50dvh - 20em));
            --inset-inline: max(0px, calc(50vw - 40em));
            inset-block: var(--inset-block);
            height: calc(100dvh - var(--inset-block) * 2);
            inset-inline: var(--inset-inline);
            width: calc(100dvw - var(--inset-inline) * 2);
            box-shadow: 0 0 0 .2em white;
            
            display: inline-block;
        }
        .main-container.home .nav-bar {
            position: absolute;
            padding: 1em;
            bottom: 0;
            width: 100%;
            max-height: 100%;
            max-width: 100%;
        }
        .main-container.home .content-container {
            position: absolute;
            padding: 1em;
            top: 0;
            bottom: 0;
            inset-inline-end: 0;
            text-align: end;
            max-height: 100%;
            max-width: 100%;
        }
        .main-container.home .content-background { 
            inset: 0 -1em 0 60%;
        }

        .main-container:not(.home) .nav-bar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 100000;
            display: flex;
            flex-direction: column;
            padding: 0.5em;
            background: black;
            border-right: 2px solid white;
            width: calc(4em + 2px);
            white-space: nowrap;
            overflow: hidden;
            transition: all .3s;
            transition-timing-function: var(--ease-out-expo);
            animation: .8s nav-bar-in var(--ease-out-expo);
        }
        .main-container:not(.home) .flexible-space {
            flex: 1;
        }
        .main-container:not(.home) .nav-bar :global(nav) {
            position: absolute;
            inset: 0em;
            padding: 0.5em;
            display: flex;
            flex-flow: column;
            align-items: start;
            justify-content: safe center;
            overflow: hidden auto;
        }
        .main-container:not(.home) .nav-bar :global(nav a) {
            display: flex;
            flex-direction: row;
            font-size: 1.5em;
            line-height: 1.2;
            height: 2em;
            width: 2em;
            align-items: center;
            justify-content: start;
            overflow: hidden;
            border-radius: 0.5em;
            transition: all .3s;
            transition-timing-function: var(--ease-out-expo);
        }
        .main-container:not(.home) .nav-bar :global(nav li.active a) {
            background: #fff2;
        }
        .main-container:not(.home) .nav-bar :global(nav a svg) {
            flex: 0 0 1em;
            font-size: 1.2em;
            vertical-align: -0.2em !important;
            margin-inline: 0.35em 0.36em;
            transition: all .3s;
            transition-timing-function: var(--ease-out-expo);
        }
        .main-container:not(.home) .nav-bar :global(nav h2) {
            font-size: 1em;
            color: #0000;
            margin: .5em 0 0 .5em;
            transition: all .3s;
            transition-timing-function: var(--ease-out-expo);
        }
        .main-container:not(.home) .nav-bar footer {
            font-size: small;
            opacity: 0;
            width: 19rem;
            white-space: wrap;
            transition: all .3s;
            transition-timing-function: var(--ease-out-expo);
        }
        .main-container:not(.home) .nav-bar:hover {
            width: 20rem;
        }
        .main-container:not(.home) .nav-bar:hover :global(nav a) {
            width: 19rem;
        }
        .main-container:not(.home) .nav-bar:hover :global(nav h2) {
            color: #fffa;
        }
        .main-container:not(.home) .nav-bar:hover footer {
            opacity: 1;
        }
        .main-container:not(.home) .content-background { 
            inset: 0 calc(50dvw - 16em);
        }

    }

    @media (min-width: 70em) {
        .main-container:not(.home) .content-background { 
            inset: 0 calc(50dvw - 25em);
        }
    }

    @media (min-width: 74em) {
        .main-container.home .content-background { 
            inset: 0 -1em 0 50%;
        }
    }

    @keyframes nav-bar-in {
        from {
            transform: translateX(-100%);
        } 40% {
            transform: translateX(-100%);
        } to {
            transform: translateX(0);
        }
    }
</style>
