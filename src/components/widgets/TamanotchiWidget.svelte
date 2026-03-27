
<li style="--col: 1; --row: 1" aria-label="It's tamaNOTchi! Click to feed!">
    <a class="tamanotchi" href="https://tamanotchi.world/25572c">
        <img class="tamanotchi-img" src="https://tamanotchi.world/i2/25572" alt="It's tamaNOTchi! Click to feed!">
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
  }
  .tamanotchi-img {
    display: inline-block;
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.3s
  }
  .tamanotchi:hover > .tamanotchi-img {
    bottom: -15px;
    filter: drop-shadow(0 2px 4px #0007);
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
</style>