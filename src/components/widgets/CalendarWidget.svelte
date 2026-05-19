<script lang="ts">
    import { onMount } from "svelte";

    import { GANS, GANS_PINYIN, getLunarDate, getLunarDateGanzhi, ZHIS, ZHIS_PINYIN, type LunarDateGanzhi } from "$lib/lunisolar";
    import Tooltip from "../utils/Tooltip.svelte";

    const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function ordinalize(num: number): string {
        const s = ["th", "st", "nd", "rd"];
        const v = num % 100;
        return num + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    let calendarCanvas: HTMLCanvasElement;

    let time = $state(0);
    let delta = 0;
    let date = "";
    let lunarDate: LunarDateGanzhi = $state(getLunarDateGanzhi(new Date(), 7));

    let timeText = $state("");

    let dayText = $state(""), monthText = $state(""), yearText = $state("");

    let tickHandle = 0;

    function tick () {
        var now = new Date();
        delta = +now - time;
        time = +now;
        if (now.toDateString() != date) {
            lunarDate = getLunarDateGanzhi(now, 7);
            yearText = `${GANS_PINYIN[lunarDate.yearGanzhi[0]]} ${ZHIS_PINYIN[lunarDate.yearGanzhi[1]]}`;
            monthText = `${GANS_PINYIN[lunarDate.monthGanzhi[0]]} ${ZHIS_PINYIN[lunarDate.monthGanzhi[1]]}`;
            dayText = `${GANS_PINYIN[lunarDate.dayGanzhi[0]]} ${ZHIS_PINYIN[lunarDate.dayGanzhi[1]]}`;
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

<li style="--col: 1; --row: 1" aria-label={`The date is: ${yearText} Year, ${monthText} Month, ${dayText} Day`}>
    <span class="calendar-widget">
        <Tooltip hideOnClick={false}>
            <div class="not-table">
                <div class="not-tr">
                    <span>{yearText}</span>
                    <span>Year</span>
                    <small>({lunarDate.year})</small>
                </div>
                <div class="not-tr">
                    <span>{monthText}</span>
                    <span>Month</span>
                    <small>({lunarDate.isInLeapMonth ? "Leap " : ""}{MONTH_NAMES[lunarDate.month - 1]})</small>
                </div>
                <div class="not-tr">
                    <span>{dayText}</span>
                    <span>Day</span>
                    <small>({ordinalize(lunarDate.day)})</small>
                </div>
            </div>
            <small>
                (GMT+07:00)
            </small>
        </Tooltip>
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
    }
</style>


