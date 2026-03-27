<script lang="ts">
    import { onMount } from "svelte";

    let clockCanvas: HTMLCanvasElement;

    const modes = ["24-hour", "12-hour", "swatch-internet-time"] as const

    let time = $state(0);
    let delta = 0;
    let mode = $state(modes[0]) as typeof modes[number];

    let timeText = $state("");

    let timeTextDisplay = "";
    let hourHandStart = 0, minuteHandStart = 0, secondHandStart = 0;
    let hourHandEnd = 0, minuteHandEnd = 0, secondHandEnd = 0;
    let animOffset = 0;

    let tickHandle = 0;

    function tick () {
        var now = Date.now();
        delta = now - time;
        time = now;
        if (animOffset > 1e-3) {
            tickHandle = setTimeout(tick, 1);
        } else {
            tickHandle = setTimeout(tick, 100);
        }
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
            case "24-hour": {
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
            case "12-hour": {
                let timeZone = -new Date().getTimezoneOffset();
                let normalizedTime = time / 86400000 + timeZone / 24 / 60;

                secondHand = normalizedTime * 24 * 60 % 1;
                minuteHand = normalizedTime * 24 % 1;
                hourHand = normalizedTime * 2 % 1;
                let isPm = (normalizedTime % 1) >= 0.5;

                timeTextDisplay = 
                            Math.floor(hourHand * 12 || 12).toFixed(0).padStart(2, "0")  // h
                    + ":" + Math.floor(minuteHand * 60).toFixed(0).padStart(2, "0")      // m
                    + ":" + Math.floor(secondHand * 60).toFixed(0).padStart(2, "0");     // s
                timeText = timeTextDisplay + " " + (isPm ? "PM" : "AM");
                timeSubtext = 
                        (isPm ? "PM" : "AM")
                    + "  GMT" + (timeZone < 0 ? "-" : "+")
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

        if (hourHandStart > hourHand) {
            hourHandStart -= 1;
            hourHandEnd -= 1;
        }
        if (minuteHandStart > minuteHand) {
            minuteHandStart -= 1;
            minuteHandEnd -= 1;
        }
        if (secondHandStart > secondHand) {
            secondHandStart -= 1;
            secondHandEnd -= 1;
        }
        
        var lerpDelta = 1 - 1e-5 ** (delta / 1000);
        animOffset = 0;
        animOffset += Math.abs(hourHand - hourHandStart);
        hourHandStart += (hourHand - hourHandStart) * lerpDelta;
        animOffset += Math.abs(hourHandEnd);
        hourHandEnd += (0 - hourHandEnd) * lerpDelta;
        animOffset += Math.abs(minuteHand - minuteHandStart);
        minuteHandStart += (minuteHand - minuteHandStart) * lerpDelta;
        animOffset += Math.abs(minuteHandEnd);
        minuteHandEnd += (0 - minuteHandEnd) * lerpDelta;
        animOffset += Math.abs(secondHand - secondHandStart);
        secondHandStart += (secondHand - secondHandStart) * lerpDelta;
        animOffset += Math.abs(secondHandEnd);
        secondHandEnd += (0 - secondHandEnd) * lerpDelta;
        animOffset /= delta;


        ctx.lineCap = "round";

        ctx.lineWidth = 6;
        ctx.strokeStyle = "#79da";
        ctx.beginPath();
        ctx.arc(w / 2, w / 2, w / 2 - 10, (secondHandEnd * 2 - 0.5) * Math.PI, (secondHandStart * 2 - 0.5) * Math.PI);
        ctx.stroke();

        ctx.lineWidth = 6;
        ctx.strokeStyle = "#abf";
        ctx.beginPath();
        ctx.arc(w / 2, w / 2, w / 2 - 18, (minuteHandEnd * 2 - 0.5) * Math.PI, (minuteHandStart * 2 - 0.5) * Math.PI);
        ctx.stroke();

        ctx.lineWidth = 6;
        ctx.strokeStyle = "#ffff";
        ctx.beginPath();
        ctx.arc(w / 2, w / 2, w / 2 - 26, (hourHandEnd * 2 - 0.5) * Math.PI, (hourHandStart * 2 - 0.5) * Math.PI);
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
        ctx.fillText(timeSubtext, w / 2, h / 2 + 13, w - 120);
    })

    onMount(() => {
        tick();
        console.log(tickHandle);
        return () => {
            clearTimeout(tickHandle);
        }
    })

    function toggleMode() {
        mode = modes[(modes.indexOf(mode) + 1) % modes.length];
    }

</script>

<li style="--col: 1; --row: 1" aria-label={"The time is: " + timeText}>
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


