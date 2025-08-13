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
  <title>about duducat</title>
</svelte:head>

<div class="category-box">
  <div id="about-me" data-category-name="about me">
    <section class="box big about-me-main">
      <h1>about me</h1>
      <p>
        I'm <TextSplitter text="ducdat0507" />, but due to some events I now go by <TextSplitter text="duducat" /> instead. 
      </p>
      <p>
        I make random things on the interwebz. 
        I'm well-known for my incremental games, though I'm currently getting myself into other genre of games as well.
      </p>
    </section>
    <section class="box about-me-tech">
      <h2>tech haystack</h2>
      <TechStackBox items={techStack}/>
    </section>
    <section class="box about-me-tech">
      <h2>creative stack</h2>
      <p>TBA</p>
    </section>
  </div>
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

  @media (width < 50em) {

    #about-me > :not(:first-child) {
      margin-top: 1em;
    }
  }

  @media (width >= 50em) {
    .category-box {
      display: grid;
      margin-top: 2em;
      width: 50em;
      padding-inline: 5em;
      padding-bottom: 5em;
    }

    #about-me {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1em;
    }

    .about-me-main {
      grid-column: span 2;
    }
  }


  @media (width >= 70em) {
    .category-box {
      width: 70em;
    }

    #about-me {
      grid-template-columns: repeat(3, 1fr);
    }

    .about-me-main {
      grid-column: span 3;
    }
  }

  .category-box :global(splitted-text span) {
    animation: rainbow-text 2s calc(-0.05s * var(--index)) linear infinite;
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
</style>