<script lang="ts">
  import type { TechStackItem } from "../../../components/physics/TechStackBox.svelte";
  import TechStackBox from "../../../components/physics/TechStackBox.svelte";
  import TextSplitter from "../../../components/TextSplitter.svelte";

  let techStack: TechStackItem[] = [
    {
      name: "HTML",
      color: "#f1662a",
      iconName: "flowbite:html-solid",
      priority: 3.5,
    },
    {
      name: "CSS",
      color: "rebeccapurple",
      iconName: "vscode-icons:file-type-css",
      iconStyle: "width: 100%; height: 100%",
      priority: 3.5,
    },
    {
      name: "JavaScript",
      color: "#f5de19",
      iconName: "vscode-icons:file-type-js-official",
      iconStyle: "width: 100%; height: 100%",
      priority: 3.5,
    },
    {
      name: "TypeScript",
      color: "#007acc",
      iconName: "logos:typescript-icon",
      iconStyle: "width: 90%; height: 90%",
      priority: 3.5,
    },
    {
      name: "C#",
      iconName: "vscode-icons:file-type-csharp2",
      priority: 3.5,
    },
    {
      name: "Python",
      iconName: "material-icon-theme:python",
      priority: 3.5,
    },
    {
      name: "Svelte",
      iconName: "vscode-icons:file-type-svelte",
      priority: 3,
    },
    {
      name: "Astro",
      iconName: "vscode-icons:file-type-astro",
      priority: 3,
    },
    {
      name: "Unity",
      iconName: "bi:unity",
      iconStyle: "width: 75%; height: 75%",
      priority: 3,
    },
    {
      name: "MongoDB",
      iconName: "devicon:mongodb",
      priority: 3,
    },
    {
      name: "MySQL",
      iconName: "lineicons:mysql",
      priority: 3,
    },
    {
      name: "MariaDB",
      iconName: "logos:mariadb-icon",
      priority: 3,
    },
    {
      name: "Git",
      iconName: "devicon:git",
      iconStyle: "width: 75%; height: 75%",
      priority: 3,
    },
  ]

</script>

<svelte:head>
  <title>about duducat - duducat's website!</title>
</svelte:head>

<div class="category-box">
  <div id="about-me" data-category-name="about me">
    <section class="box big about-me-main">
      <h2 class="hide-if-mobile">about me</h2>
      <p>
        I'm <TextSplitter text="duducat" />, but you can see me go by my old display name <TextSplitter text="ducdat0507" />. 
      </p>
      <p>
        I make random things on the interwebz. 
        I'm well-known for my incremental games, though I'm currently getting myself into other genre of games as well.
      </p>
    </section>
    <section class="box about-me-tech">
      <h3>tech haystack</h3>
      <TechStackBox items={techStack}/>
    </section>
    <section class="box about-me-tech">
      <h3>creative stack</h3>
      <p>TBA</p>
    </section>
  </div>
  <!-- <div id="about-site" data-category-name="about my site">
    <section class="box big about-site-main">
      <h2 class="hide-if-mobile">about my site</h2>
      <p>
        This website hosts some of my stuff, you can check them out with the menu on the left!
      </p>
      <p>
        This iteration of the index page is built with <a href="https://svelte.dev/">SvelteKit</a>!
      </p>
    </section>
  </div> -->
</div>

<style>

  .about-me-tech {
    position: relative;
    overflow: hidden;
  }

  .about-me-tech :global(.tech-stack) {
    height: 20em;
    margin: -1em;
  }

  @media (max-width: 49.999em) {
    .hide-if-mobile {
      display: none;
    }
    :is(#about-me, #about-site) > :not(:first-child) {
      margin-top: 1em;
    }
    :is(.about-me-main, .about-site-main) > :nth-child(2) {
      margin-top: 0;
    }
  }

  @media (min-width: 50em) {
    .category-box {
      display: grid;
      margin-top: 2em;
      width: 50em;
      padding-inline: 5em;
      padding-bottom: 5em;
    }

    #about-me, #about-site {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1em;
    }

    .about-me-main, .about-site-main {
      grid-column: span 2;
    }

    #about-site {
      margin-top: 3em;
    }

    h2 {
      font-size: 2em;
    }
    h3 {
      font-size: 1.5em;
    }
  }


  @media (min-width: 70em) {
    .category-box {
      width: 70em;
    }

    #about-me, #about-site {
      grid-template-columns: repeat(3, 1fr);
    }

    .about-me-main, .about-site-main {
      grid-column: span 3;
    }
  }

  .category-box :global(splitted-text span) {
    display: inline-block;
    animation: rainbow-text 2s calc(-0.05s * var(--index)) linear infinite;
  }
  .category-box :global(splitted-text:hover span) {
    animation: 
      rainbow-text 2s calc(-0.05s * var(--index)) linear infinite,
      wavy-text 0.5s calc(-0.1s * var(--index)) ease-in-out alternate infinite,
      wavy-start 0.3s cubic-bezier(0, 10, 0, 1);
  }

  @keyframes rainbow-text {
    from {
      color: hsl(0deg, 100%, 75%);
    } 12.5% {
      color: hsl(45deg, 100%, 75%);
    } 25% {
      color: hsl(90deg, 100%, 75%);
    } 37.5% {
      color: hsl(135deg, 100%, 75%);
    } 50% {
      color: hsl(180deg, 100%, 75%);
    } 62.5% {
      color: hsl(225deg, 100%, 75%);
    } 75% {
      color: hsl(270deg, 100%, 75%);
    } 87.5% {
      color: hsl(315deg, 100%, 75%);
    } to {
      color: hsl(360deg, 100%, 75%);
    }
  }

  @keyframes wavy-text {
    from {
      transform: translateY(-.25em);
    } to {
      transform: translateY(.25em);
    }
  }

  @keyframes wavy-start {
    10% {
      transform: translateY(0) scaleY(0.1) scaleX(1.2);
    }
  }
</style>