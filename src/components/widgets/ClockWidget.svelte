<script lang="ts">
    import { onMount } from "svelte";

    let clockCanvas: HTMLCanvasElement;

    let time = $state(0);

    let tickHandle = 0;

    function tick () {
        time = Date.now();
        tickHandle = setTimeout(tick, 100);
    }

    $effect(() => {
        let w = clockCanvas.clientWidth;
        let h = clockCanvas.clientHeight;
        let s = devicePixelRatio;
        clockCanvas.width = w * s;
        clockCanvas.height = h * s;

        let ctx = clockCanvas.getContext("2d")!;

        ctx.setTransform(s, 0, 0, s, 0, 0);
        
        clockCanvas.style.fontWeight = "bold";
        clockCanvas.style.fontSize = "1em";
        ctx.font = getComputedStyle(clockCanvas).font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";

        ctx.lineCap = "round";

        let secondHand = (time / 3600000 + 1) / 24 * 1000 % 1;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#fff8";
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, w / 2 - 18.5, -0.5 * Math.PI, (secondHand * 2 - 0.5) * Math.PI);
        ctx.stroke();

        let minuteHand = (time / 3600000 + 1) / 24 * 10 % 1;
        ctx.lineWidth = 6;
        ctx.strokeStyle = "#fffb";
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, w / 2 - 25, -0.5 * Math.PI, (minuteHand * 2 - 0.5) * Math.PI);
        ctx.stroke();

        let hourHand = (time / 3600000 + 1) / 24 % 1;
        ctx.lineWidth = 18;
        ctx.strokeStyle = "#ffff";
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, w / 2 - 40, -0.5 * Math.PI, (hourHand * 2 - 0.5) * Math.PI);
        ctx.stroke();

        let swatchInternetTime = (time / 86400 + 1000 / 24) % 1000;
        ctx.fillText("@" + swatchInternetTime.toFixed(2), w / 2, h / 2);
    })

    onMount(() => {
        tickHandle = setTimeout(tick, 100);
        console.log(tickHandle);
        return () => {
            cancelAnimationFrame(tickHandle);
        }
    })

</script>

<li style="--col: 2; --row: 2" aria-label="Clock widget">
    <div class="clock-widget">
        <canvas bind:this={clockCanvas}></canvas>
    </div>
</li>

<style>
    .clock-widget {
        position: relative;
    }

    .clock-widget > canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }
</style>


