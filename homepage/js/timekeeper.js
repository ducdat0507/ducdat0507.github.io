let activeTimekeeper = null;
let activeTimezone = null;
const timekeepers = {
    1: [
        {
            name: "Swatch Internet Time",
            interval: 864,
            setup(elm, zone) {
                activeTimezone = "+01:00";
                zone.innerText = "BMT (+01:00)";
            },
            update(elm) {
                let beats = ((Date.now() / 3600 + 1000) / 24) % 1000;
                let str = beats.toFixed(2).split(".");
                elm.innerHTML = "@" + str[0] + "<small>." + str[1] + "</small>";
            }
        },
    ],
    2: [
        {
            name: "24-Hour Clock",
            interval: 1000,
            setup(elm, zone) {
                useDefaultTimezones(zone);
            },
            update(elm) {
                let time = new Date();
                elm.innerHTML = time.toLocaleString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: activeTimezone,
                })
            },
        },
        {
            name: "12-Hour Clock",
            interval: 1000,
            setup(elm, zone) {
                useDefaultTimezones(zone);
            },
            update(elm) {
                let time = new Date();
                let text = time.toLocaleString("en-US", {
                    hour12: true,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hourCycle: "h12",
                    timeZone: activeTimezone,
                }).split(" ");
                elm.innerHTML = text[0] + "<small> " + text[1] + "</small>"
            },
        },
    ],
    3: [
        {
            name: "Binary Clock (true binary)",
            interval: 60000 * 60 * 24 / (2 << 15),
            setup(elm, zone) {
                useDefaultTimezones(zone);

                elm.classList.add("binary-clock");
                elm.$bits = [];
                for (let a = 0; a < 16; a++) {
                    let bit = document.createElement("div");
                    bit.style.gridRow = Math.floor(a / 4) + 1;
                    bit.style.gridColumn = a % 4 + 1;
                    elm.$bits.push(bit);
                    elm.append(bit);
                }
            },
            update(elm) {
                let time = new Date();
                let [hour, min, sec] = time.toLocaleString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: activeTimezone,
                }).split(":")
                let dayFrac = (((Date.now() / 1000 % 1 + +sec) / 60 + +min) / 60 + +hour) / 24;
                console.log(hour, min, sec, dayFrac);
                for (let a = 0; a < 16; a++) {
                    let frac = 2 << a;
                    elm.$bits[a].classList.toggle("active", Math.floor(dayFrac * frac % 2));
                }
            },
        },
        {
            name: "Binary Clock (H:M:S)",
            interval: 1000,
            setup(elm, zone) {
                useDefaultTimezones(zone);

                elm.classList.add("binary-clock");
                function makeGroup(id, len) {
                    let array = [];
                    for (let a = 0; a < len; a++) {
                        let bit = document.createElement("div");
                        bit.style.gridRow = id;
                        bit.style.gridColumn = 6 - a;
                        array.push(bit);
                        elm.append(bit);
                    }
                    return array;
                }
                elm.$hour = makeGroup(1, 5); 
                elm.$min = makeGroup(2, 6); 
                elm.$sec = makeGroup(3, 6);
            },
            update(elm) {
                let time = new Date();
                let [hour, min, sec] = time.toLocaleString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: activeTimezone,
                }).split(":")
                function updateGroup(array, num) {
                    for (let a = 0; a < array.length; a++) {
                        let frac = 1 << a;
                        array[a].classList.toggle("active", Math.floor(num / frac % 2));
                    }
                }
                updateGroup(elm.$hour, +hour);
                updateGroup(elm.$min, +min);
                updateGroup(elm.$sec, +sec);
            },
        },
        {
            name: "Binary Clock (HH:MM:SS)",
            interval: 1000,
            setup(elm, zone) {
                useDefaultTimezones(zone);

                elm.classList.add("binary-clock");
                function makeGroup(id, len) {
                    let array = [];
                    for (let a = 0; a < len; a++) {
                        let bit = document.createElement("div");
                        bit.style.gridRow = 4 - a;
                        bit.style.gridColumn = id;
                        array.push(bit);
                        elm.append(bit);
                    }
                    return array;
                }
                elm.$hour0 = makeGroup(1, 2); 
                elm.$hour1 = makeGroup(2, 4); 
                elm.$min0 = makeGroup(3, 3); 
                elm.$min1 = makeGroup(4, 4); 
                elm.$sec0 = makeGroup(5, 3);
                elm.$sec1 = makeGroup(6, 4);
            },
            update(elm) {
                let time = new Date();
                let [hour, min, sec] = time.toLocaleString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: activeTimezone,
                }).split(":")
                function updateGroup(array, num) {
                    for (let a = 0; a < array.length; a++) {
                        let frac = 1 << a;
                        array[a].classList.toggle("active", Math.floor(num / frac % 2));
                    }
                }
                updateGroup(elm.$hour0, +hour[0]);
                updateGroup(elm.$hour1, +hour[1]);
                updateGroup(elm.$min0, +min[0]);
                updateGroup(elm.$min1, +min[1]);
                updateGroup(elm.$sec0, +sec[0]);
                updateGroup(elm.$sec1, +sec[1]);
            },
        },
    ],
    4: [
        {
            name: "Analog 12-Hour Clock",
            interval: 200,
            setup(elm, zone) {
                useDefaultTimezones(zone);
                elm.classList.add("analog-clock-holder");

                let svg = makeAnalogClock();
                elm.append(svg);
                let faceHolder = svg.querySelector(".face-holder");
                for (let a = 1; a <= 12; a++) {
                    addAnalogFaceNumber(faceHolder, 360 / 12 * a, a);
                }
                let handHolder = svg.querySelector(".hand-holder");
                handHolder.innerHTML = `
                    <g class="hour-hand">
                        <rect x="48.5%" y="30%" width="3%" height="25%" stroke="#fff" stroke-width="1" />
                    </g>
                    <g class="minute-hand">
                        <rect x="48.5%" y="22%" width="3%" height="35%" stroke="#fff" stroke-width="1" />
                    </g>
                    <g class="second-hand">
                        <rect x="50%" y="10%" width="0.01%" height="45%" stroke="#fff" stroke-width="2" />
                    </g>
                `
                elm.$hour = handHolder.querySelector(".hour-hand");
                elm.$min = handHolder.querySelector(".minute-hand");
                elm.$sec = handHolder.querySelector(".second-hand");
            },
            update(elm) {
                let time = new Date();
                let [hour, min, sec] = time.toLocaleString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: activeTimezone,
                }).split(":")
                let msec = (Date.now() / 1000) % 1;
                sec = +sec + msec;
                elm.$sec.style.setProperty("--rotate", 360 / 60 * sec + "deg");
                min = +min + sec / 60;
                elm.$min.style.setProperty("--rotate", 360 / 60 * min + "deg");
                hour = +hour + min / 60;
                elm.$hour.style.setProperty("--rotate", 360 / 12 * hour + "deg");
            },
        },
        {
            name: "Analog 24-Hour Clock",
            interval: 200,
            setup(elm, zone) {
                useDefaultTimezones(zone);
                elm.classList.add("analog-clock-holder");

                let svg = makeAnalogClock();
                elm.append(svg);
                let faceHolder = svg.querySelector(".face-holder");
                for (let a = 1; a <= 12; a++) {
                    addAnalogFaceNumber(faceHolder, 360 / 12 * a, a * 2);
                }
                let handHolder = svg.querySelector(".hand-holder");
                handHolder.innerHTML = `
                    <g class="hour-hand">
                        <rect x="48.5%" y="30%" width="3%" height="25%" stroke="#fff" stroke-width="1" />
                    </g>
                    <g class="minute-hand">
                        <rect x="48.5%" y="22%" width="3%" height="35%" stroke="#fff" stroke-width="1" />
                    </g>
                    <g class="second-hand">
                        <rect x="50%" y="10%" width="0.01%" height="45%" stroke="#fff" stroke-width="2" />
                    </g>
                `
                elm.$hour = handHolder.querySelector(".hour-hand");
                elm.$min = handHolder.querySelector(".minute-hand");
                elm.$sec = handHolder.querySelector(".second-hand");
            },
            update(elm) {
                let time = new Date();
                let [hour, min, sec] = time.toLocaleString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: activeTimezone,
                }).split(":")
                let msec = (Date.now() / 1000) % 1;
                sec = +sec + msec;
                elm.$sec.style.setProperty("--rotate", 360 / 60 * sec + "deg");
                min = +min + sec / 60;
                elm.$min.style.setProperty("--rotate", 360 / 60 * min + "deg");
                hour = +hour + min / 60;
                elm.$hour.style.setProperty("--rotate", 360 / 24 * hour + "deg");
            },
        },
        {
            name: "Analog 6-Hour Clock",
            interval: 200,
            setup(elm, zone) {
                useDefaultTimezones(zone);
                elm.classList.add("analog-clock-holder");

                let svg = makeAnalogClock();
                elm.append(svg);
                let faceHolder = svg.querySelector(".face-holder");
                for (let a = 1; a <= 6; a++) {
                    addAnalogFaceNumber(faceHolder, 360 / 6 * a, a);
                }
                let handHolder = svg.querySelector(".hand-holder");
                handHolder.innerHTML = `
                    <g class="hour-hand">
                        <rect x="48.5%" y="30%" width="3%" height="25%" stroke="#fff" stroke-width="1" />
                    </g>
                    <g class="minute-hand">
                        <rect x="48.5%" y="22%" width="3%" height="35%" stroke="#fff" stroke-width="1" />
                    </g>
                    <g class="second-hand">
                        <rect x="50%" y="10%" width="0.01%" height="45%" stroke="#fff" stroke-width="2" />
                    </g>
                `
                elm.$hour = handHolder.querySelector(".hour-hand");
                elm.$min = handHolder.querySelector(".minute-hand");
                elm.$sec = handHolder.querySelector(".second-hand");
            },
            update(elm) {
                let time = new Date();
                let [hour, min, sec] = time.toLocaleString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: activeTimezone,
                }).split(":")
                let msec = (Date.now() / 1000) % 1;
                sec = +sec + msec;
                elm.$sec.style.setProperty("--rotate", 360 / 60 * sec + "deg");
                min = +min + sec / 60;
                elm.$min.style.setProperty("--rotate", 360 / 60 * min + "deg");
                hour = +hour + min / 60;
                elm.$hour.style.setProperty("--rotate", 360 / 6 * hour + "deg");
            },
        },
        {
            name: "Analog Decimal Clock",
            interval: 200,
            setup(elm, zone) {
                useDefaultTimezones(zone, {
                    "+01:00": "CET (+01:00)"
                })
                elm.classList.add("analog-clock-holder");

                let svg = makeAnalogClock();
                elm.append(svg);
                let faceHolder = svg.querySelector(".face-holder");
                for (let a = 1; a <= 10; a++) {
                    addAnalogFaceNumber(faceHolder, 360 / 10 * a, a);
                }
                let handHolder = svg.querySelector(".hand-holder");
                handHolder.innerHTML = `
                    <g class="hour-hand">
                        <rect x="48.5%" y="30%" width="3%" height="25%" stroke="#fff" stroke-width="1" />
                    </g>
                    <g class="minute-hand">
                        <rect x="48.5%" y="22%" width="3%" height="35%" stroke="#fff" stroke-width="1" />
                    </g>
                    <g class="second-hand">
                        <rect x="50%" y="10%" width="0.01%" height="45%" stroke="#fff" stroke-width="2" />
                    </g>
                `
                elm.$hour = handHolder.querySelector(".hour-hand");
                elm.$min = handHolder.querySelector(".minute-hand");
                elm.$sec = handHolder.querySelector(".second-hand");
            },
            update(elm) {
                let time = new Date();
                let [hour, min, sec] = time.toLocaleString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: activeTimezone,
                }).split(":")
                let msec = (Date.now() / 1000) % 1;
                let dayFrac = (((msec + +sec) / 60 + +min) / 60 + +hour) / 24;
                elm.$sec.style.setProperty("--rotate", 360 * 10 * 100 * dayFrac + "deg");
                elm.$min.style.setProperty("--rotate", 360 * 10 * dayFrac + "deg");
                elm.$hour.style.setProperty("--rotate", 360 * dayFrac + "deg");
            },
        },
        {
            name: "Analog New Earth Time",
            interval: 100,
            setup(elm, zone) {
                activeTimezone = "+00:00";
                zone.innerText = "UTC (+00:00)";
                elm.classList.add("analog-clock-holder");

                let svg = makeAnalogClock();
                elm.append(svg);
                let faceHolder = svg.querySelector(".face-holder");
                for (let a = 1; a <= 10; a++) {
                    addAnalogFaceNumber(faceHolder, 360 / 10 * a, a * 6);
                }
                let handHolder = svg.querySelector(".hand-holder");
                handHolder.innerHTML = `
                    <g class="hour-hand">
                        <rect x="48.5%" y="30%" width="3%" height="25%" stroke="#fff" stroke-width="1" />
                    </g>
                    <g class="minute-hand">
                        <rect x="48.5%" y="22%" width="3%" height="35%" stroke="#fff" stroke-width="1" />
                    </g>
                    <g class="second-hand">
                        <rect x="50%" y="10%" width="0.01%" height="45%" stroke="#fff7" stroke-width="2" />
                    </g>
                `
                elm.$hour = handHolder.querySelector(".hour-hand");
                elm.$min = handHolder.querySelector(".minute-hand");
                elm.$sec = handHolder.querySelector(".second-hand");
            },
            update(elm) {
                let time = new Date();
                let [hour, min, sec] = time.toLocaleString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: activeTimezone,
                }).split(":")
                let msec = (Date.now() / 1000) % 1;
                let dayFrac = (((msec + +sec) / 60 + +min) / 60 + +hour) / 24;
                elm.$sec.style.setProperty("--rotate", 360 * 360 * 60 * dayFrac + "deg");
                elm.$min.style.setProperty("--rotate", 360 * 360 * dayFrac + "deg");
                elm.$hour.style.setProperty("--rotate", 360 * dayFrac + "deg");
            },
        },
        {
            name: "Analog Hex Time",
            interval: 200,
            setup(elm, zone) {
                useDefaultTimezones(zone);
                elm.classList.add("analog-clock-holder");

                let svg = makeAnalogClock();
                elm.append(svg);
                let faceHolder = svg.querySelector(".face-holder");
                for (let a = 0; a < 16; a++) {
                    addAnalogFaceNumber(faceHolder, 360 / 16 * a, a.toString(16).toUpperCase());
                }
                let handHolder = svg.querySelector(".hand-holder");
                handHolder.innerHTML = `
                    <g class="hour-hand">
                        <rect x="48.5%" y="30%" width="3%" height="25%" stroke="#fff" stroke-width="1" />
                    </g>
                    <g class="minute-hand">
                        <rect x="50%" y="30%" width="0.01%" height="20%" stroke="#fff" stroke-width="2" />
                    </g>
                    <g class="minute2-hand">
                        <rect x="50%" y="28%" width="0.01%" height="20%" stroke="#fff7" stroke-width="2" />
                        <rect x="50%" y="10%" width="0.01%" height="18%" stroke="#fff" stroke-width="2" />
                    </g>
                    <g class="second-hand">
                        <rect x="50%" y="10%" width="0.01%" height="45%" stroke="#fff7" stroke-width="2" />
                    </g>
                `
                elm.$hour = handHolder.querySelector(".hour-hand");
                elm.$min = handHolder.querySelector(".minute-hand");
                elm.$min2 = handHolder.querySelector(".minute2-hand");
                elm.$sec = handHolder.querySelector(".second-hand");
            },
            update(elm) {
                let time = new Date();
                let [hour, min, sec] = time.toLocaleString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: activeTimezone,
                }).split(":")
                let msec = (Date.now() / 1000) % 1;
                let dayFrac = (((msec + +sec) / 60 + +min) / 60 + +hour) / 24;
                elm.$sec.style.setProperty("--rotate", 360 * 16 * 256 * dayFrac + "deg");
                elm.$min2.style.setProperty("--rotate", 360 * 16 * 16 * dayFrac + "deg");
                elm.$min.style.setProperty("--rotate", 360 * 16 * dayFrac + "deg");
                elm.$hour.style.setProperty("--rotate", 360 * dayFrac + "deg");
            },
        },
    ],
    5: [
        {
            name: "Decimal Clock",
            interval: 60000 * 60 * 24 / 100000,
            setup(elm, zone) {
                useDefaultTimezones(zone, {
                    "+01:00": "CET (+01:00)"
                })
            },
            update(elm) {
                let time = new Date();
                let [hour, min, sec] = time.toLocaleString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: activeTimezone,
                }).split(":")
                let msec = (Date.now() / 1000) % 1;
                let dayFrac = (((msec + +sec) / 60 + +min) / 60 + +hour) / 24;
                elm.innerHTML = 
                    Math.floor(dayFrac * 10).toFixed(0) + "<sup>h</sup> "
                    + Math.floor(dayFrac * 1000 % 100).toFixed(0) + "<sup>m</sup> "
                    + Math.floor(dayFrac * 100000 % 100).toFixed(0) + "<sup>s</sup>"
            },
        },
        {
            name: "Hex Clock",
            interval: 60000 * 60 * 24 / 65536,
            setup(elm, zone) {
                useDefaultTimezones(zone)
            },
            update(elm) {
                let time = new Date();
                let [hour, min, sec] = time.toLocaleString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: activeTimezone,
                }).split(":")
                let msec = (Date.now() / 1000) % 1;
                let dayFrac = (((msec + +sec) / 60 + +min) / 60 + +hour) / 24;
                elm.innerHTML = 
                    Math.floor(dayFrac * 16).toString(16).toUpperCase() + "_"
                    + Math.floor(dayFrac * 4096 % 256).toString(16).toUpperCase().padStart(2, "0") + "_"
                    + Math.floor(dayFrac * 65536 % 16).toString(16).toUpperCase()
            },
        },
    ],
    6: [
        {
            name: "Progress Bar",
            interval: 1000,
            setup(elm, zone) {
                useDefaultTimezones(zone);
                elm.classList.add("time-bar");
                let fill = document.createElement("span");
                elm.$fill = fill;
                elm.append(fill);
            },
            update(elm) {
                let time = new Date();
                let [hour, min, sec] = time.toLocaleString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: activeTimezone,
                }).split(":")
                let msec = (Date.now() / 1000) % 1;
                let dayFrac = (((msec + +sec) / 60 + +min) / 60 + +hour) / 24;
                elm.style.setProperty("--fill", dayFrac * 100 + "%");
            },
        },
    ],
}

timekeepers[0] = [].concat(...Object.values(timekeepers));

let activeDatekeeper = null;
const datekeepers = [
    {
        name: "Gregorian Calendar",
        setup(elm) {},
        update(elm) {
            let time = new Date();
            let [month, day, year] = time.toLocaleString("en-US", {
                day: "2-digit",
                month: "numeric",
                year: "numeric",
                calendar: "gregory",
                timeZone: activeTimezone,
            }).split("/");
            elm.innerHTML = day + " "
                + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1] + " "
                + year
        },
    },
    {
        name: "Chinese Calendar",
        setup(elm) {},
        update(elm) {
            let time = new Date();
            let [month, day, year] = time.toLocaleString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                calendar: "chinese",
                timeZone: activeTimezone,
            }).split("/");
            elm.innerHTML = year + "<small>年</small>"
                + month + "<small>月</small>"
                + day + "<small>日</small>"
        },
    },
    {
        name: "Thai Solar Calendar",
        setup(elm) {},
        update(elm) {
            let time = new Date();
            let [month, day, year, era] = time.toLocaleString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                calendar: "buddhist",
                timeZone: activeTimezone,
            }).split(/[\/ ]/);
            elm.innerHTML = day + "/"
                + month + "/"
                + year + "<small> " + era + "</small>"
        },
    },
    {
        name: "Human Era Calendar",
        setup(elm) {},
        update(elm) {
            let time = new Date();
            let [month, day, year] = time.toLocaleString("en-US", {
                day: "2-digit",
                month: "numeric",
                year: "numeric",
                calendar: "gregory",
                timeZone: activeTimezone,
            }).split("/");
            year = (+year + 10000).toString();
            elm.innerHTML = day + " "
                + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1] + " "
                + year
        },
    },
]

let dailyRandom = null;
function sfc32(a, b, c, d) {
    function random() {
        a |= 0; b |= 0; c |= 0; d |= 0;
        let t = (a + b | 0) + d | 0;
        d = d + 1 | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = (c << 21 | c >>> 11);
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    }
    for (let x = 0; x < 10; x++) random();
    return random;
}

function getTimezoneOffset() {
    let offset = -(new Date().getTimezoneOffset());
    return (offset < 0 ? "-" : "+")
        + Math.floor(Math.abs(offset) / 60).toFixed(0).padStart(2, "0")
        + ":" + (Math.abs(offset) % 60).toFixed(0).padStart(2, "0")
}
function useDefaultTimezones(zone, extraZones = {}) {
    let zones = ["UTC", "local", ...Object.keys(extraZones)];
    activeTimezone = zones[Math.floor(dailyRandom() * zones.length)];
    zone.innerText = {
        UTC: "UTC (+00:00)",
        local: "local timezone (" + getTimezoneOffset() + ")",
        ...extraZones
    }[activeTimezone];
    if (activeTimezone == "local") activeTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
}
function makeAnalogClock() {
    let svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("xmlns", svgNS);
    svg.setAttributeNS(svgNS, "width", "5em");
    svg.setAttributeNS(svgNS, "height", "5em");
    svg.classList.add("analog-clock");
    svg.innerHTML = `
        <circle cx="50%" cy="50%" r="45%" stroke="#fff3" stroke-width="2" />
        <g class="face-holder" />
        <g class="hand-holder" />
        <circle cx="50%" cy="50%" r="5%" fill="#fff" />
    `
    return svg;
}
function addAnalogFaceNumber(holder, degrees, text) {
    let upsideDown = degrees >= 90 && degrees < 270;
    holder.innerHTML += `
        <g style="--rotate: ${degrees - (upsideDown ? 180 : 0)}deg">
            <rect x="50%" y="${upsideDown ? 90 : 5}%" width="1" height="5%" stroke="#fff3" />
            <text x="50%" y="${upsideDown ? 85 : 15}%">${text}</text>
        </g>
    `
}


window.addEventListener("DOMContentLoaded", (e) => {
    let date = new Date();
    dailyRandom = sfc32(
        date.getUTCDate() * 31415926 % (2 ** 32),
        date.getUTCMonth() * 420691337 % (2 ** 32),
        date.getUTCFullYear() * 271828 % (2 ** 32),
        date.getUTCDay() * 1234567890 % (2 ** 32),
    );

    let timekeeperList = timekeepers[date.getUTCDay()];
    activeTimekeeper = timekeeperList[Math.floor(dailyRandom() * timekeeperList.length)];
    activeDatekeeper = datekeepers[Math.floor(dailyRandom() * datekeepers.length)];

    let timeDiv = document.querySelector("#timekeeper");
    timeDiv.innerHTML = `
        <h4>timekeeper:</h4>
        <span class="content"></span>
        <span class="name">${activeTimekeeper.name}</span>
    `
    let timeContainer = timeDiv.querySelector(".content");

    let dateDiv = document.querySelector("#datekeeper");
    dateDiv.innerHTML = `
        <h4>datekeeper:</h4>
        <span class="content"></span>
        <span class="name">${activeDatekeeper.name}</span>
    `
    let dateContainer = dateDiv.querySelector(".content");

    let zoneDiv = document.querySelector("#timezone");
    zoneDiv.innerHTML = `
        <h4>time zone:</h4>
        <span class="name"></span>
    `
    let zoneContainer = zoneDiv.querySelector(".name");

    activeTimekeeper.setup(timeContainer, zoneContainer);
    activeTimekeeper.update(timeContainer);
    activeDatekeeper.setup(dateContainer);
    activeDatekeeper.update(dateContainer);

    setInterval(() => {
        activeTimekeeper?.update(timeContainer);
        activeDatekeeper?.update(dateContainer);
    }, activeTimekeeper.interval)
});

  