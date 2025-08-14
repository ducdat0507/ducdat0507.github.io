<script lang="ts">
  import Icon from "@iconify/svelte";
  import BlueskyStat from "../components/stat/BlueskyStat.svelte";
  import DiscordInviteStat from "../components/stat/DiscordInviteStat.svelte";
  import GitHubStat from "../components/stat/GitHubStat.svelte";
  import GalaxyIcon from "../components/icons/GalaxyIcon.svelte";
  import NewgroundsTankIcon from "../components/icons/NewgroundsTankIcon.svelte";
  import VorkedLarfleezeIcon from "../components/icons/VorkedLarfleezeIcon.svelte";
  import StatusCafeStat from "../components/stat/StatusCafeStat.svelte";

</script>

<svelte:head>
  <title>duducat's website!</title>
</svelte:head>

<div class="category-box">
  <div id="socials" data-category-name="socials">
    <section class="">
      <h2>find me on:</h2>
      <div class="widget-box live-tiles">
        <div class="link-tile">
          <a href="https://github.com/ducdat0507" rel="me">
              <Icon icon="cib:github" />
              <span>github</span>
              <GitHubStat />
          </a>
        </div>
        <div class="link-tile">
          <a href="https://bsky.app/profile/duducat.moe" rel="me">
              <Icon icon="bi:bluesky" />
              <span>bluesky</span>
              <BlueskyStat />
          </a>
        </div>
        <div class="link-tile">
          <a href="https://galaxy.click/@ducdat0507" rel="me">
              <GalaxyIcon />
              <span>galaxy.click</span>
          </a>
        </div>
        <div class="link-tile">
          <a href="https://mastodon.gamedev.place/@ducdat0507" rel="me">
              <Icon icon="bi:mastodon" />
              <span>mastodon</span>
          </a>
        </div>
        <div class="link-tile" style="--col: 2">
          <a href="https://status.cafe/users/duducat" rel="me">
              <span>status.cafe</span>
              <StatusCafeStat />
          </a>
        </div>
        <div class="link-tile">
          <a href="https://ducdat0507.newgrounds.com" rel="me">
              <NewgroundsTankIcon />
              <span>newgrounds</span>
          </a>
        </div>
        <div class="link-tile">
          <a href="https://mspfa.com/user/?u=109574176547777339810" rel="me">
              <VorkedLarfleezeIcon />
              <span>mspfa</span>
          </a>
        </div>
      </div>
    </section>

    <section>
      <h2>keep in touch:</h2>
      <div class="widget-box live-tiles">
        <div class="link-tile" style="--col: 2; --row: 1">
          <a href="https://discord.gg/vXJTPFQBHm" rel="me">
              <Icon icon="bi:discord" />
              <span>fff40 studios<br/>discord server</span>
              <DiscordInviteStat invite="vXJTPFQBHm" />
          </a>
        </div>
        <div class="link-tile" style="--col: 2; --row: 1">
          <a href="https://galaxy.click/discord" rel="me">
              <Icon icon="bi:discord" />
              <span>galaxy (+ego)<br/>discord server</span>
              <DiscordInviteStat invite="6FD2bYMqV9" />
          </a>
        </div>
        <div class="link-tile" style="--col: 2; --row: 1">
          <a href="https://duducat.atabook.org" rel="me">
              <Icon icon="hugeicons:pen-tool-03" />
              <span>sign the guestbook!</span>
          </a>
        </div>
        <div class="link-tile button-snagger" style="--col: 2; --row: 1">
          <div>
            <img src="/index/res/buttons/duducat.svg" alt='"duducat&amp;s website" button' />
            <span>snag this button!</span>
            <div class="button-links">
              <div class="link-tile">
                <a href="/index/res/buttons/duducat.svg" aria-label="download .svg" download="duducat.svg">
                  <Icon icon="iconoir:arrow-down" />
                  <span>.svg</span>
                </a>
              </div>
              <div class="link-tile">
                <a href="/index/res/buttons/duducat.gif" aria-label="download .gif" download="duducat.gif">
                  <Icon icon="iconoir:arrow-down" />
                  <span>.gif</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2>throw me some money for no reason at all:</h2>
      <div class="widget-box live-tiles">
        <div class="link-tile" style="--col: 2; --row: 1">
          <a href="https://en.liberapay.com/ducdat0507" rel="me">
              <Icon icon="simple-icons:liberapay" />
              <span>liberapay</span>
          </a>
        </div>
      </div>
    </section>
  </div>

  <div id="widgets" data-category-name="widgets">
    <section>
      <h2>boxes of numbers going up:</h2>
      <div class="widget-box live-tiles">
        <!-- FC2 Counter -->
        <div style="--col: 3; --row: 1">
          <div class="x2">
            <div>
              <div class="fc2-counter">
                <script id="fc2-counter" type="text/javascript" src="//counter1.fc2.com/counter.php?id=40236645&amp;lang=1&amp;main=1"></script>
              </div>
            </div>
          </div>
        </div>
        <!-- Increment button -->
        <div style="--col: 2; --row: 1">
          <div class="x2">
            <div>
              <iframe src="//incr.easrng.net/badge?key=duducat" style="background: url(//incr.easrng.net/bg.gif);display:block" 
                title="increment badge" width="88" height="31" frameborder="0"></iframe>
            </div>
          </div>
        </div>
        <!-- Internet button -->
        <div style="--col: 1; --row: 1">
          <div class="center-child">
            <a href='http://internetometer.com/give/50959' style="width:90%;height:90%" class="image-link" target="_blank" title="the infamous internet button">
              <img src='http://internetometer.com/imagesmall/50959.png' style="width:100%;height:100%;object-fit:cover" alt="the infamous internet button"/>
            </a>
          </div>
        </div>
        <!-- FC2 Clap -->
        <div style="--col: 1; --row: 1">
          <div class="center-child" style="image-rendering: pixelated">
            <a href="//clap.fc2.com/post/duducat/?url=https%3A%2F%2Fduducat.moe" class="image-link" target="_blank" title="Web Clap by FC2">
              <img src="//clap.fc2.com/images/button/white/duducat?url=https%3A%2F%2Fduducat.moe&lang=en" alt="Web Clap by FC2" style="border:none;" />
              <img src="//clap.fc2.com/images/button/black/duducat?url=https%3A%2F%2Fduducat.moe&lang=en" alt="Web Clap by FC2" style="border:none;" />
              <img src="//clap.fc2.com/images/button/blue/duducat?url=https%3A%2F%2Fduducat.moe&lang=en" alt="Web Clap by FC2" style="border:none;" />
              <img src="//clap.fc2.com/images/button/pink/duducat?url=https%3A%2F%2Fduducat.moe&lang=en" alt="Web Clap by FC2" style="border:none;" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2>random internet widgets go:</h2>
      <div class="widget-box live-tiles">
        <div style="--col: 2; --row: 2">
          <a href="https://tamanotchi.world/25353c" class="center-child">
            <img src="https://tamanotchi.world/i2/25353" alt="It's tamaNOTchi! Click to feed!">
          </a>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  section h2 {
    display: block;
    background: white;
    color: black;
    text-align: start;
    line-height: 1.15;
    padding: .15em .3em;
    margin-block: 0 8px;
    font-size: 1em;
  }
  .widget-box {
    position: relative;
    padding-bottom: 1em;
  }
  .x2 {
    display: inline-block;
    max-width: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .x2 > div {
    transform: scale(2);
    transform-origin: 50% 50%;
    image-rendering: pixelated;
  }
  .x2 > div :global(img) {
    image-rendering: pixelated;
  }

  .fc2-counter :global(nobr) {
    display: flex;
    justify-content: end;
    margin: 0 -2px 3px 0;
  }

  .center-child {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-link, .image-link > img {
    display: block;
  }

  .button-snagger {
    text-align: end;
  }
  .button-snagger img {
    margin: 0.5em;
  }
  .button-snagger > * > span {
    text-align: start;
    padding-right: 7em;
    display: block;
  }

  .button-links {
    position: absolute;
    inset: auto -.3em -.3em auto;
    min-width: calc(100%);
    display: flex;
    flex-flow: row;
    justify-content: end;
    gap: 4px;
  }
  .button-links > .link-tile {
    flex: 0 0 2.4em;
    aspect-ratio: 1;
  }
  .button-links > .link-tile span {
    line-height: 1;
    bottom: .4em;
  }
  .button-links > .flex-space {
    flex: 1;
  }
  .button-links .link-tile > a {
    display: block;
    width: 100%;
    height: 100%;
    border: 2px solid white;
    background: black;
    color: white;
    padding: 0.5em;
  }

  @media (min-width: 800px) {
    .category-box {
      display: flex;
      flex-direction: column;
      width: 22em;
    }
  }

  @media (min-width: 1184px) {
    .category-box {
      flex-direction: row;
      gap: 1em;
      width: 45em;
    }
    .category-box > * {
      flex: 0 0 22em;
    }
  }
</style>