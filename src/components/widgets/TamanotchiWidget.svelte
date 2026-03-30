<script lang="ts">
  const {
    id
  } : {
    id: number
  } = $props();

  let imageLoaded = $state(false);

  function handleImageLoaded() {
    imageLoaded = true;
  }
</script>

<li style="--col: 1; --row: 1" aria-label="It's tamaNOTchi! Click to feed!">
  <a class="tamanotchi" href={`https://tamanotchi.world/${id}c`} class:image-loaded={imageLoaded}>

    <span class="tamanotchi-feed-me-box" role="presentation">
      feed me!
    </span>
    <svg viewBox="0 0 50 2" class="tamanotchi-bar-mask" preserveAspectRatio="none">
      <defs>
        <filter id="bar-quantize-mask">
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 5 -2"/>
        </filter>
      </defs>
      <image href={`https://tamanotchi.world/i2/${id}`} width={50} height={100000} y={-99000} preserveAspectRatio="none" filter="url(#bar-quantize-mask)"/>
    </svg>

    <img class="tamanotchi-img" src={`https://tamanotchi.world/i2/${id}`} alt="It's tamaNOTchi! Click to feed!" onload={handleImageLoaded} />

    <svg viewBox="0 0 50 2" class="tamanotchi-bar" preserveAspectRatio="none">
      <defs>
        <filter id="bar-quantize">
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 5 -2"/>
        </filter>
      </defs>
      <image href={`https://tamanotchi.world/i2/${id}`} width={50} height={100000} y={-99000} preserveAspectRatio="none" filter="url(#bar-quantize)"/>
    </svg>
  </a>
</li>

<style>
  .center-child {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
  .tamanotchi {
    font-size: 0.7em;
    text-align: center;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    image-rendering: crisp-edges;
  }
  .tamanotchi-img {
    display: inline-block;
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.3s;
  }
  .tamanotchi-bar {
    position: absolute;
    inset: 0 0 auto 0;
    width: 100%;
  }
  .tamanotchi-bar-mask {
    position: absolute;
    inset: 0 auto 0 -28000%;
    height: 100%;
    width: 100000%;
  }
  .tamanotchi-feed-me-box {
    display: inline-block;
    border: 2px solid #abf;
    padding: 0.15em 0.3em;
    margin-top: 1em;
    inline-size: 1;
    font-style: italic;
    animation: tamanotchi-feed-me-box-bounce 1s infinite; 
  }
  :not(.image-loaded) > .tamanotchi-feed-me-box {
    display: none;
  }
  .tamanotchi:hover > .tamanotchi-img {
    bottom: -15px;
    filter: drop-shadow(0 2px 4px #0007);
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  @keyframes tamanotchi-feed-me-box-bounce {
    from {
      transform: translateY(0px);
      animation-timing-function: ease-out;
    } 50% {
      transform: translateY(-5px);
      animation-timing-function: ease-in;
    } to {
      transform: translateY(0px);
    }
  }
</style>