<script lang="ts">
  import Icon from "@iconify/svelte";
  import BlueskyStat from "../components/stat/BlueskyStat.svelte";
  import DiscordInviteStat from "../components/stat/DiscordInviteStat.svelte";
  import GitHubStat from "../components/stat/GitHubStat.svelte";
  import GalaxyIcon from "../components/icons/GalaxyIcon.svelte";
  import NewgroundsTankIcon from "../components/icons/NewgroundsTankIcon.svelte";
  import VorkedLarfleezeIcon from "../components/icons/VorkedLarfleezeIcon.svelte";
  import StatusCafeStat from "../components/stat/StatusCafeStat.svelte";
  import Tooltip from "../components/utils/Tooltip.svelte";
  import type { Action } from "svelte/action";
  import { setPopup } from "../components/utils/PopupDisplayer.svelte";
  import { onMount } from "svelte";

  let count: number = $state(0);
  let graphURL: string = $state("");
  let setupInterval: number = 0;
  let hasSetup = false;

  let showInactiveSocials = $state(false);
  let isTwitterX = $state(false);
  let isTwitterXTimeout = 0;
  let isTwitterXAudio: Audio | null = null;

  const setupCounter: Action = (elm: Element) => {
    setupInterval = setInterval(() => {
      let link = elm.querySelector("a");
      console.log(...elm.children);
      if (!link) return;

      let images = [...elm.querySelectorAll("img")];

      count = +images.map(img => img.src.charAt(img.src.length - 5)).filter(x => !Number.isNaN(+x)).join("");
      let id = link.getAttribute("onmouseover")?.match(/_FC2COUNTER(.*)_\d/)![1];
      graphURL = `https://counter1-cdn-ssl.fc2.com/popup.php?id=${id}&main=1&lang=1`;

      // Decimal point
      let decimalPointIndex = 0;
      let digits = [...images];
      digits.reverse(); digits.pop(); digits.shift();
      for (let img of digits) {
        decimalPointIndex++;
        if (decimalPointIndex == 4) {
          let decimalPoint = new Image();
          decimalPoint.src = "/index/res/images/counter/decimal.png";
          img.insertAdjacentElement("afterend", decimalPoint);
          decimalPointIndex = 1;
        }
      }

      link.prepend(elm.querySelector("x-tooltip")!);
      link.removeAttribute("onmouseover");
      link.removeAttribute("onmouseout");
      images.forEach(img => img.removeAttribute("title"));
      link.ariaLabel = `FC2 Counter - ${count.toLocaleString("en-US")} visitors`
      elm.querySelector("nobr")!.ariaHidden = "true";

      hasSetup = true;
      clearInterval(setupInterval);
    }, 30);
    setTimeout(() => {
      if (!hasSetup) elm.parentElement?.parentElement?.classList.add("broken");
      clearInterval(setupInterval)
    }, 5000)

    return {
      destroy() {
        clearInterval(setupInterval);
      }
    }
  }

  function toggleInactiveSocials() {
    showInactiveSocials = !showInactiveSocials;
  }

  function handleMelonlandForum(e: Event) {
    let now = new Date();
    now.setHours(now.getHours() - 1);
    if (now.getDay() == 1) {
      e.preventDefault();
      setPopup("heads up", `
        <span>
          <p><i>Melonland Forum</i> periodically closes on Mondays (GMT+1).</p>
          <p>Do you still wish to proceed?</p>
        </span>
      `, [
        { name: "nevermind", icon: "iconoir:arrow-left" },
        null,
        { name: "continue", icon: "iconoir:arrow-right", href: "https://forum.melonland.net/index.php?action=profile;u=2958" },
      ])
    }
  }

  function handleTwitterX(e: Event) {
    e.preventDefault();
    if (isTwitterXTimeout) clearTimeout(isTwitterXTimeout);
    isTwitterX = true;
    if (isTwitterXAudio) {
      isTwitterXAudio.currentTime = 0;
      isTwitterXAudio.play();
    }
    isTwitterXTimeout = setTimeout(() => {
      isTwitterX = false;
    }, 1000)
  }

  onMount(() => {
    isTwitterXAudio = new Audio("/index/res/sounds/x.mp3");
  })
</script>

<svelte:head>
  <title>duducat's website!</title>
</svelte:head>

<div class="category-box">
  <div id="socials" data-category-name="socials">
    <section class="">
      <h2>find me on:</h2>
      <ul class="widget-box live-tiles" style="grid-auto-flow: row">
        <li class="link-tile" aria-label="github">
          <a class="pop-out-btn" href="https://github.com/ducdat0507" rel="me">
            <Tooltip>
              <p>@ducdat0507</p>
              <p class="tooltip-action touch-only">(click again to view profile)</p>
            </Tooltip>
            <Icon icon="cib:github" />
            <h3>github</h3>
            <GitHubStat />
          </a>
        </li>
        <li class="link-tile" aria-label="bluesky">
          <a class="pop-out-btn" href="https://bsky.app/profile/duducat.moe" rel="me">
            <Tooltip>
              <p>@duducat.moe</p>
              <p class="tooltip-action touch-only">(click again to view profile)</p>
            </Tooltip>
            <Icon icon="bi:bluesky" />
            <h3>bluesky</h3>
            <BlueskyStat />
          </a>
        </li>
        <li class="link-tile" aria-label="galaxy.click">
          <a class="pop-out-btn" href="https://galaxy.click/@ducdat0507" rel="me">
            <Tooltip>
              <p>@duducat.moe</p>
              <p class="tooltip-action touch-only">(click again to view profile)</p>
            </Tooltip>
            <GalaxyIcon />
            <h3>galaxy.click</h3>
          </a>
        </li>
        <li class="link-tile" aria-label="mastodon">
          <a class="pop-out-btn" href="https://mastodon.gamedev.place/@ducdat0507" rel="me">
            <Tooltip>
              <p>@ducdat0507@mastodon.gamedev.place</p>
              <p class="tooltip-action touch-only">(click again to view profile)</p>
            </Tooltip>
            <Icon icon="bi:mastodon" />
            <h3>mastodon</h3>
          </a>
        </li>
        <li class="link-tile" style="--col: 2" aria-label="status.cafe">
          <a class="pop-out-btn" href="https://status.cafe/users/duducat" rel="me">
            <Tooltip>
              <p>@duducat</p>
              <p class="tooltip-action touch-only">(click again to view profile)</p>
            </Tooltip>
            <h3>status.cafe</h3>
            <StatusCafeStat />
          </a>
        </li>
        <li class="link-tile" class:active={showInactiveSocials} aria-label={showInactiveSocials ? "hide inactive links" : "show inactive links"}>
          <button class="pop-out-btn" onclick={() => toggleInactiveSocials()}>
            <Icon icon={showInactiveSocials ? "tabler:chevron-down" : "tabler:chevron-left"} />
            <h3>other links...</h3>
          </button>
        </li>
        <li class="inactive-links live-tiles-folder" class:active={showInactiveSocials} aria-label="inactive links">
          <ul class="widget-box live-tiles" style="width: 100%" >
            <li class="link-tile" aria-label="newgrounds">
              <a class="pop-out-btn" href="https://ducdat0507.newgrounds.com" rel="me">
                <Tooltip>
                  <p>@ducdat0507</p>
                  <p class="tooltip-action touch-only">(click again to view profile)</p>
                </Tooltip>
                <NewgroundsTankIcon />
                <h3>newgrounds</h3>
              </a>
            </li>
            <li class="link-tile" aria-label="mspfa">
              <a class="pop-out-btn" href="https://mspfa.com/user/?u=109574176547777339810" rel="me">
                <Tooltip>
                  <p>@ducdat0507</p>
                  <p class="tooltip-action touch-only">(click again to view profile)</p>
                </Tooltip>
                <VorkedLarfleezeIcon />
                <h3>mspfa</h3>
              </a>
            </li>
            <li class="link-tile" aria-label="melonland forum">
              <a class="pop-out-btn" href="https://forum.melonland.net/index.php?action=profile;u=2958" rel="me"
                onclick={handleMelonlandForum}>
                <Tooltip>
                  <p>@duducat</p>
                  <p class="tooltip-action touch-only">(click again to view profile)</p>
                </Tooltip>
                <img class="icon" alt="" src="/index/res/icons/melonland-forum.png" />
                <h3>melonland forum</h3>
              </a>
            </li>
            <li class="link-tile" class:twitter-x={isTwitterX} aria-label="melonland forum">
              <a class="pop-out-btn" href="https://twitter.com/ducdat0507" rel="me noindex nofollow"
                onclick={handleTwitterX}>
                <Tooltip>
                  <p>@ducdat0507</p>
                  <p class="tooltip-action touch-only">(click again to view profile)</p>
                </Tooltip>
                <Icon icon={isTwitterX ? "bi:twitter-x" : "bi:twitter"} />
                <h3>{isTwitterX ? "❌".repeat(100) : "twitter"}</h3>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </section>

    <section>
      <h2>keep in touch:</h2>
      <ul class="widget-box live-tiles">
        <li class="link-tile" style="--col: 2; --row: 1" aria-label="fff40 studios discord server">
          <a class="pop-out-btn" href="https://discord.gg/vXJTPFQBHm" rel="me">
            <Tooltip>
              <p>
                @duducat<br/>
                (my rhythm game studio)
              </p>
              <p class="tooltip-action touch-only">(click again to join server)</p>
            </Tooltip>
            <Icon icon="bi:discord" />
            <h3>fff40 studios<br/>discord server</h3>
            <DiscordInviteStat invite="vXJTPFQBHm" />
          </a>
        </li>
        <li class="link-tile" style="--col: 2; --row: 1" aria-label="galaxy (+ego) discord server">
          <a class="pop-out-btn" href="https://galaxy.click/discord" rel="me">
            <Tooltip>
              <p>
                @duducat<br/>
                (for incremental game related stuff)<br/>
                (note: not my server)
              </p>
              <p class="tooltip-action touch-only">(click again to join server)</p>
            </Tooltip>
            <Icon icon="bi:discord" />
            <h3>galaxy (+ego)<br/>discord server</h3>
            <DiscordInviteStat invite="6FD2bYMqV9" />
          </a>
        </li>
        <li class="link-tile" style="--col: 2; --row: 1" aria-label="sign the guestbook">
          <a class="pop-out-btn" href="https://duducat.atabook.org" rel="me">
            <Tooltip>
              <p>(note: I don't check this very often)</p>
              <p class="tooltip-action touch-only">(click again to enter)</p>
            </Tooltip>
            <Icon icon="hugeicons:pen-tool-03" />
            <h3>sign the guestbook!</h3>
          </a>
        </li>
        <li class="link-tile button-snagger" style="--col: 2; --row: 1">
          <div>
            <img src="/index/res/buttons/duducat.svg" alt='"duducat&#39;s website" button' />
            <h3>snag this button!</h3>
            <div class="links">
              <div class="link-tile">
                <a class="pop-out-btn" href="/index/res/buttons/duducat.svg" aria-label="download .svg" download="duducat.svg">
                  <Tooltip>
                    <p>(&infin; resolution, &infin; frame rate, though with less than ideal support)</p>
                    <p class="tooltip-action touch-only">(click again to download)</p>
                  </Tooltip>
                  <Icon icon="iconoir:arrow-down" />
                  <span>.svg</span>
                </a>
              </div>
              <div class="link-tile">
                <a class="pop-out-btn" href="/index/res/buttons/duducat.gif" aria-label="download .gif" download="duducat.gif">
                  <Tooltip>
                    <p>(88&times;31 pixels, 12.5fps, is more likely to be played correctly by your OS's image viewer)</p>
                    <p class="tooltip-action touch-only">(click again to download)</p>
                  </Tooltip>
                  <Icon icon="iconoir:arrow-down" />
                  <span>.gif</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <section>
      <h2>throw me some money for no reason at all:</h2>
      <ul class="widget-box live-tiles">
        <li class="link-tile" style="--col: 2; --row: 1" aria-label="liberapay">
          <a class="pop-out-btn" href="https://en.liberapay.com/ducdat0507" rel="me">
            <Tooltip>
              <p>@ducdat0507</p>
              <p class="tooltip-action touch-only">(click again to view profile)</p>
            </Tooltip>
            <Icon icon="simple-icons:liberapay" />
            <h3>liberapay</h3>
          </a>
        </li>
        <li class="link-tile" style="--col: 2; --row: 1" aria-label="liberapay">
          <a class="pop-out-btn" href="https://ko-fi.com/duducat" rel="me">
            <Tooltip>
              <p>@duducat</p>
              <p class="tooltip-action touch-only">(click again to view profile)</p>
            </Tooltip>
            <Icon icon="simple-icons:kofi" />
            <h3>ko-fi</h3>
          </a>
        </li>
      </ul>
    </section>
  </div>

  <div id="widgets" data-category-name="widgets">
    <section>
      <h2>boxes of numbers going up:</h2>
      <ul class="widget-box live-tiles">
        <!-- FC2 Counter -->
        <li style="--col: 3; --row: 1" aria-label="FC2 Counter">
          <div class="x2">
            <div>
              <div use:setupCounter class="fc2-counter">
                <Tooltip>
                  <p>
                    FC2 Counter<br/>
                    (is the number saying {count.toLocaleString("en-US")}?)
                  </p>
                  <img src={graphURL} alt="" style="margin-left:32px" aria-hidden="true" />
                  <p class="tooltip-action touch-only">(click again to navigate)</p>
                </Tooltip>
                <script id="fc2-counter" type="text/javascript" src="//counter1.fc2.com/counter.php?id=40236645&amp;lang=1&amp;main=1"></script>
              </div>
            </div>
          </div>
        </li>
        <!-- Increment button -->
        <li style="--col: 2; --row: 1" aria-label="increment badge">
          <div class="x2">
            <div>
              <iframe src="//incr.easrng.net/badge?key=duducat" style="background: url(//incr.easrng.net/bg.gif);display:block" 
                title="increment badge" width="88" height="31" frameborder="0"></iframe>
            </div>
          </div>
        </li>
        <!-- Internet button -->
        <li style="--col: 1; --row: 1" aria-label="the internetometer">
          <div class="center-child">
            <a href='https://internetometer.com/give/50959' style="width:90%;height:90%" class="image-link" target="_blank" aria-label="the internetometer">
              <Tooltip>
                <p>the internetometer</p>
                <p class="tooltip-action touch-only">(click again to give an internet)</p>
              </Tooltip>
              <img src='https://internetometer.com/imagesmall/50959.png' style="width:100%;height:100%;object-fit:cover" alt="the internetometer"/>
            </a>
          </div>
        </li>
        <!-- FC2 Clap -->
        <li style="--col: 1; --row: 1" aria-label="Web Clap by FC2">
          <div class="center-child" style="image-rendering: pixelated">
            <a href="//clap.fc2.com/post/duducat/?url=https%3A%2F%2Fduducat.moe" class="image-link" target="_blank" aria-label="Web Clap by FC2">
              <Tooltip>
                <p>Web Clap by FC2</p>
                <p class="tooltip-action touch-only">(click again to clap)</p>
              </Tooltip>
              <img src="//clap.fc2.com/images/button/white/duducat?url=https%3A%2F%2Fduducat.moe&lang=en" alt="Web Clap by FC2" style="border:none;" />
              <img src="//clap.fc2.com/images/button/black/duducat?url=https%3A%2F%2Fduducat.moe&lang=en" alt="Web Clap by FC2" style="border:none;" />
              <img src="//clap.fc2.com/images/button/blue/duducat?url=https%3A%2F%2Fduducat.moe&lang=en" alt="Web Clap by FC2" style="border:none;" />
              <img src="//clap.fc2.com/images/button/pink/duducat?url=https%3A%2F%2Fduducat.moe&lang=en" alt="Web Clap by FC2" style="border:none;" />
            </a>
          </div>
        </li>
      </ul>
    </section>

    <section>
      <h2>random internet widgets go:</h2>
      <ul class="widget-box live-tiles">
        <li style="--col: 2; --row: 2" aria-label="It's tamaNOTchi! Click to feed!">
          <a href="https://tamanotchi.world/25572c" class="center-child">
            <img src="https://tamanotchi.world/i2/25572" alt="It's tamaNOTchi! Click to feed!">
          </a>
        </li>
      </ul>
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
  .live-tiles-folder > .widget-box {
    padding-block: 0px;
  }
  .x2 {
    max-width: 100%;
    display: flex !important;
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
    display: flex !important;
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
  .button-snagger > * > h3 {
    text-align: start;
    padding-right: 7em;
    display: block;
  }

  .links {
    position: absolute;
    inset: auto -.3em -.3em auto;
    min-width: calc(100%);
    display: flex;
    flex-flow: row;
    justify-content: end;
    gap: 4px;
  }
  .links > .link-tile {
    flex: 0 0 2.4em;
    aspect-ratio: 1;
  }
  .links > .link-tile span {
    line-height: 1;
    bottom: .4em;
  }
  .links > .flex-space {
    flex: 1;
  }
  .links .link-tile > a {
    display: block;
    width: 100%;
    height: 100%;
    border: 2px solid white;
    background: black;
    color: white;
    padding: 0.5em;
  }

  @media (min-width: 50em) {
    .category-box {
      display: flex;
      flex-direction: column;
      width: 22em;
    }
  }

  @media (min-width: 74em) {
    .category-box {
      flex-direction: row;
      gap: 1em;
      width: 45em;
    }
    .category-box > * {
      flex: 0 0 22em;
    }
  }

  .link-tile.active > :first-child { 
    background: white;
    color: black;
  }
  .inactive-links {
    display: none;
  }
  .inactive-links.active {
    display: block;
  }

  .twitter-x {
    animation: twitter-x-shaking 0.1s linear infinite;
  }
  .twitter-x > :first-child {
    background: red;
    color: black;
  }

  @keyframes twitter-x-shaking {
    from {
      transform: translate(-0.1em, -0.1em) rotate(1deg);
    } 25% {
      transform: translate(0.1em, 0.1em) rotate(-1deg);
    } 50% {
      transform: translate(-0.1em, 0.1em) rotate(0deg);
    } 75% {
      transform: translate(0.1em, -0.1em) rotate(2deg);
    } to {
      transform: translate(-0.1em, -0.1em) rotate(-2deg);
    }
  }
</style>
