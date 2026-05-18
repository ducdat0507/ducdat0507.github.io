<script lang="ts">
    import { onMount } from "svelte";

    import { GANS, GANS_PINYIN, getLunarDate, getLunarDateGanzhi, ZHIS, ZHIS_PINYIN, type LunarDateGanzhi } from "$lib/lunisolar";
    import Tooltip from "../utils/Tooltip.svelte";

    const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let calendarCanvas: HTMLCanvasElement;

    let time = $state(0);
    let delta = 0;
    let date = new Date().toDateString();
    let lunarDate: LunarDateGanzhi = $state(getLunarDateGanzhi(new Date(), 7));

    let timeText = $state("");

    let tickHandle = 0;

    function tick () {
        var now = new Date();
        delta = +now - time;
        time = +now;
        if (now.toDateString() != date) {
            lunarDate = getLunarDateGanzhi(now, 7);
        }
        setTimeout(tick, 1000);
    }

    $effect(() => {
        time;

        let w = calendarCanvas.clientWidth;
        let h = calendarCanvas.clientHeight;
        let s = devicePixelRatio;
        calendarCanvas.width = w * s;
        calendarCanvas.height = h * s;

        let ctx = calendarCanvas.getContext("2d")!;
        ctx.setTransform(s, 0, 0, s, 0, 0);

        calendarCanvas.style.fontFamily = "'MS Mincho', 'sans-serif'";
        calendarCanvas.style.fontWeight = "700";
        calendarCanvas.style.fontSize = (h / 3 - 8) + "px";
        ctx.font = getComputedStyle(calendarCanvas).font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(GANS[lunarDate.yearGanzhi[0]]  + ZHIS[lunarDate.yearGanzhi[1] ] + "年", h / 2, h * 0.16667 + 6, h - 10);
        ctx.fillText(GANS[lunarDate.monthGanzhi[0]] + ZHIS[lunarDate.monthGanzhi[1]] + "月", h / 2, h * 0.5,         h - 10);
        ctx.fillText(GANS[lunarDate.dayGanzhi[0]]   + ZHIS[lunarDate.dayGanzhi[1]  ] + "日", h / 2, h * 0.83333 - 6, h - 10);

    })

    onMount(() => {
        tick();
        console.log(tickHandle);
        return () => {
            clearTimeout(tickHandle);
        }
    })

</script>

<li style="--col: 1; --row: 1" aria-label={"The date is: " + timeText}>
    <Tooltip>
        <div class="not-table">
            <div class="not-tr">
                <span>{GANS_PINYIN[lunarDate.yearGanzhi[0]]} {ZHIS_PINYIN[lunarDate.yearGanzhi[1]]}</span>
                <span>Year</span>
                <span>({lunarDate.year})</span>
            </div>
            <div class="not-tr">
                <span>{GANS_PINYIN[lunarDate.monthGanzhi[0]]} {ZHIS_PINYIN[lunarDate.monthGanzhi[1]]}</span>
                <span>Month</span>
                <span>({lunarDate.isInLeapMonth ? "Leap " : ""}{MONTH_NAMES[lunarDate.month - 1]})</span>
            </div>
            <div class="not-tr">
                <span>{GANS_PINYIN[lunarDate.dayGanzhi[0]]} {ZHIS_PINYIN[lunarDate.dayGanzhi[1]]}</span>
                <span>Day</span>
                <span>({lunarDate.day})</span>
            </div>
        </div>
        <small>
            (GMT+07:00)
        </small>
    </Tooltip>
    <span class="calendar-widget">
        <canvas bind:this={calendarCanvas}></canvas>
    </span>
</li>

<style>
    .calendar-widget {
        position: relative;
    }

    .calendar-widget > canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    .not-table {
        display: table-row-group;
    }
    .not-tr {
        display: table-row;
    }
    .not-tr > * {
        text-align: start;
        display: table-cell;
    }
    .not-tr > :first-child {
        text-align: end;
        padding-inline-end: 1ch;
    }
    .not-tr > :last-child {
        padding-inline-start: 1ch;
        opacity: 0.5;
    }

    small {
        font-size: 1em;
        opacity: 0.5;
    }
</style>


