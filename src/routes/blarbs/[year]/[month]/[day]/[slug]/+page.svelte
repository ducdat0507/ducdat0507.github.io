<script lang="ts">
    import type { PageProps } from "./$types";

    let { params }: PageProps = $props();

    let allBlarbPostsRaw = import.meta.glob(
        "../../../../../../data/blarbs/*.md",
        { eager: true },
    ) as Record<string, any>;

    let Post =
        allBlarbPostsRaw[
            `../../../../../../data/blarbs/${params.year}-${params.month}-${params.day}-${params.slug}.md`
        ];


    function printDate(date: Date) {
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()] + " "
            + (date.getDate()).toString().padStart(2, "0") + ", "
            + date.getFullYear()
    }
</script>

{#if Post != null}
    <div class="category-box">
        <section id="blarb-post" data-category-name="" data-icon="ri:speak-line">
            <div>
                <h1>
                    {Post.metadata.title}
                </h1>
                <time>
                    Posted {printDate(new Date(+params.year, +params.month - 1, +params.day))}
                </time>
                <div class="blarb-box">
                    <Post.default />
                </div>
            </div>
        </section>
    </div>
{/if}

<style>
    h1 {
        font-size: 2em;
        margin-top: 2em;
        margin-bottom: 0.5em;
    }

    time {
        font-style: italic;
        white-space: nowrap;
    }

    .blarb-box {
        background: black;
        border: 2px solid #abf;
        padding: 2em 2em;
        margin-top: 2em;
        margin-inline: -2em;
    }

    .blarb-box :global(:is(h1, h2, h3):not(:first-child)) {
        margin-top: 1.5rem;
    }
    .blarb-box :global(:is(p):not(:first-child)) {
        line-height: 1.5;
        margin-top: 1rem;
    }
    
    .blarb-box :global(:is(video, img, picture)) {
        max-width: 100%;
    }

    @media (max-width: 49.999em) {
        h1 {
            margin-top: -2em;
        }

        .blarb-box {
            padding: 2em;
            margin-inline: -2em;
            margin-top: 2em;
        }

        #blarb-post {
            width: 100dvw;
            flex: 0 0 100dvw;
            padding-inline: 4em;
            overflow: visible;
        }

        #blarb-post > div {
            max-height: 100dvh;
            overflow: auto;
            transform: translateX(calc(-1em - 1px));
            margin: -10em -4em -6em -4em;
            padding: 10em 3em 6em 3em;
        }
    }

    @media (min-width: 50em) {
        .category-box {
            display: flex;
            margin-top: 2em;
            flex-flow: column;
            width: 50em;
            padding-inline: 5em;
            padding-bottom: 5em;
        }
    }

    @media (min-width: 70em) {
        .category-box {
            width: 70em;
            padding-inline: 15em;
        }
    }
</style>
