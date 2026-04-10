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
</script>

{#if Post != null}
    <div class="category-box">
        <section id="blarb-post" data-category-name="" data-icon="lucide:message-circle">
            <h1>
                {Post.metadata.title}
            </h1>
            <div class="blarb-box box">
                <Post.default />
            </div>
        </section>
    </div>
{/if}

<style>
    h1 {
        margin-top: -2em;
        margin-bottom: 0.5em;
    }
    
    .blarb-box :global(:is(video, img, picture)) {
        max-width: 100%;
    }

    @media (max-width: 49.999em) {
        .category-box :global(h2) {
            overflow: hidden;
            width: 0.0001px;
            height: 0.0001px;
            margin: 0 0 -0.0001px 0;
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
            display: flex;
            margin-top: 2em;
            flex-flow: column;
            width: 70em;
            padding-inline: 5em;
            padding-bottom: 5em;
        }
    }
</style>
