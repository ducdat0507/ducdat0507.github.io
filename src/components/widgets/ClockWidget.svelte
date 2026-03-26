<script lang="ts">
    import { onMount } from "svelte";

    let clockCanvas: HTMLCanvasElement;

    const modes = ["standard", "swatch-internet-time"] as const

    let time = $state(0);
    let mode = $state(modes[0]) as typeof modes[number];
    let timeText = $state("");
    let timeTextDisplay = $state("");

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

        let hourHand, minuteHand, secondHand, timeSubtext;
        switch (mode) {
            case "standard": {
                let timeZone = -new Date().getTimezoneOffset();
                let normalizedTime = time / 86400000 + timeZone / 24 / 60;

                secondHand = normalizedTime * 24 * 60 % 1;
                minuteHand = normalizedTime * 24 % 1;
                hourHand = normalizedTime % 1;

                timeText = timeTextDisplay = 
                            Math.floor(hourHand * 24).toFixed(0).padStart(2, "0")     // h
                    + ":" + Math.floor(minuteHand * 60).toFixed(0).padStart(2, "0")   // m
                    + ":" + Math.floor(secondHand * 60).toFixed(0).padStart(2, "0");  // s
                timeSubtext = 
                    "24h GMT" + (timeZone < 0 ? "-" : "+")
                          + Math.floor(Math.abs(timeZone) / 60).toFixed(0).padStart(2, "0")   // h
                    + ":" + Math.floor(Math.abs(timeZone) % 60).toFixed(0).padStart(2, "0");  // m
            } break;
            case "swatch-internet-time": {
                let normalizedTime = (time / 86400 + 1000 / 24) % 1000;

                secondHand = normalizedTime % 1;
                minuteHand = normalizedTime / 100 % 1;
                hourHand = normalizedTime / 1000 % 1;

                timeText = "@" + (Math.floor(normalizedTime * 100) / 100).toFixed(2);
                timeTextDisplay = "@" + (Math.floor(normalizedTime * 100) / 100).toFixed(2).padStart(7, " ");
                timeSubtext = 
                    "INTERNET TIME";
            } break;
        }

        ctx.lineCap = "round";

        ctx.lineWidth = 8;
        ctx.strokeStyle = "#fff8";
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, w / 2 - 20, -0.5 * Math.PI, (secondHand * 2 - 0.5) * Math.PI);
        ctx.stroke();

        ctx.lineWidth = 8;
        ctx.strokeStyle = "#fffb";
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, w / 2 - 30, -0.5 * Math.PI, (minuteHand * 2 - 0.5) * Math.PI);
        ctx.stroke();

        ctx.lineWidth = 8;
        ctx.strokeStyle = "#ffff";
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, w / 2 - 40, -0.5 * Math.PI, (hourHand * 2 - 0.5) * Math.PI);
        ctx.stroke();

        clockCanvas.style.fontFamily = "'MS Gothic', 'M PLUS 1 Code', 'Menlo', 'Meslo', monospace";
        clockCanvas.style.fontSize = "1.5em";
        ctx.font = getComputedStyle(clockCanvas).font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(timeTextDisplay, w / 2, h / 2 - 5, w - 110);

        clockCanvas.style.fontSize = "0.5em";
        ctx.font = getComputedStyle(clockCanvas).font;
        ctx.fillText(timeSubtext, w / 2, h / 2 + 13);
    })

    onMount(() => {
        tickHandle = setTimeout(tick, 100);
        console.log(tickHandle);
        return () => {
            cancelAnimationFrame(tickHandle);
        }
    })

    function toggleMode() {
        mode = modes[(modes.indexOf(mode) + 1) % modes.length];
    }

</script>

<li style="--col: 2; --row: 2" aria-label={"The time is: " + timeText}>
    <button class="clock-widget" aria-label="(press to change time format)" onclick={toggleMode}>
        <canvas bind:this={clockCanvas}></canvas>
    </button>
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


