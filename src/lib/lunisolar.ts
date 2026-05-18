
export const GANS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
export const GANS_PINYIN = ["Jiǎ", "Yǐ", "Bǐng", "Dīng", "Wù", "Jǐ", "Gēng", "Xīn", "Rén", "Guǐ"] as const;
export const ZHIS = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;
export const ZHIS_PINYIN = ["Zǐ", "Chǒu", "Yín", "Mǎo", "Chén", "Sì", "Wǔ", "Wèi", "Shēn", "Yǒu", "Xū", "Hài"] as const;

export function toJulianDate(year: number, month: number, day: number): number {
    const a = Math.floor((14 - month) / 12);
    const y = year+4800-a;
    const m = month+12*a-3;
    return day + Math.floor((153*m+2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045
}

export function queryNewMoonDay(index: number, timeZone: number): number {
    const T = index / 1236.85; // 1900 Jan 1 12:00:00 GMT epoch
    const T2 = T * T;
    const T3 = T2 * T;
    const degree = Math.PI / 180;

    let baseDate 
        = 2415020.75933 + 29.53058868 * index + 0.0001178 * T2 - 0.000000155 * T3
        + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * degree);

    const M   = (359.2242 +  29.10535608 * index - 0.0000333 * T2 - 0.00000347 * T3) * degree
    const Mpr = (306.0253 + 385.81691806 * index + 0.0107306 * T2 + 0.00001236 * T3) * degree
    const F   = ( 21.2964 + 390.67050646 * index - 0.0016528 * T2 - 0.00000239 * T3) * degree

    baseDate +=
         (0.1734 - 0.000393 * T) * Math.sin(M) 
        + 0.0021                 * Math.sin(2*M)
        - 0.4068                 * Math.sin(Mpr) 
        + 0.0161                 * Math.sin(2*Mpr)
        - 0.0004                 * Math.sin(3*Mpr)
        + 0.0104                 * Math.sin(2*F) 
        - 0.0051                 * Math.sin(M+Mpr)
        - 0.0074                 * Math.sin(M-Mpr) 
        + 0.0004                 * Math.sin(2*F+M)
        - 0.0004                 * Math.sin(2*F-M) 
        - 0.0006                 * Math.sin(2*F+Mpr)
        + 0.0010                 * Math.sin(2*F-Mpr) 
        + 0.0005                 * Math.sin(2*Mpr+M)

    if (T < -11) {
        baseDate -= 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
    } else {
        baseDate -= -0.000278 + 0.000265 * T + 0.000262 * T2;
    };

    baseDate += 0.5 + timeZone / 24;

    return baseDate;
}

export function querySunLongitude(julianDate: number, timeZone: number): number {
    const T = (julianDate - 2451545.5 - timeZone / 24) / 36525; // 2000 Jan 1 12:00:00 GMT epoch
    const T2 = T * T;
    const degree = Math.PI / 180;
    
    const M = (357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2) * degree;

    let longitude = 
         280.46645 + 36000.76983 * T + 0.0003032 * T2
      + ( 1.914600 -    0.004817 * T -  0.000014 * T2) * Math.sin(M)
      + ( 0.019993 -    0.000101 * T)                  * Math.sin(2*M)
      +   0.000290                                     * Math.sin(3*M);

    longitude *= degree;
    longitude = modulo(longitude, Math.PI * 2);

    return longitude;
}

export function querySunDodecant(julianDate: number, timeZone: number): number {
    return Math.floor(querySunLongitude(julianDate, timeZone) / Math.PI * 6);
}

export function queryWinterSolsticeMonth(year: number, timeZone: number): number {
    const T = toJulianDate(year, 12, 31) - 2415021; // 2000 Jan 1 12:00:00 GMT epoch

    const newMoonIndex = Math.floor(T / 29.530588853);
    let newMoonDay = queryNewMoonDay(newMoonIndex, timeZone);
    if (querySunDodecant(newMoonDay, timeZone) >= 9) {
        newMoonDay = queryNewMoonDay(newMoonIndex - 1, timeZone);
    }
    return newMoonDay;
}

export function queryLeapMonth(winterSolsticeDay: number, timeZone: number): number {
    const k = Math.floor((winterSolsticeDay - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;
    let arc = querySunDodecant(Math.floor(queryNewMoonDay(k+i, timeZone)), timeZone);
    while (i <= 14) {
        last = arc;
        i++;
        arc = querySunDodecant(Math.floor(queryNewMoonDay(k+i, timeZone)), timeZone);
        if (last == arc) return i - 1;
    }
    return -1;
}

export function getLunarDate(date: Date, timeZone: number): LunarDate {
    const zonedDate = new Date(date);
    zonedDate.setMinutes(date.getMinutes() + timeZone * 60);
    const year = zonedDate.getUTCFullYear(), month = zonedDate.getUTCMonth() + 1, day = zonedDate.getUTCDate();
    let lunarDay = 0, lunarMonth = 0, lunarYear = 0, isInLeapMonth = false

    const jdn = Math.floor(toJulianDate(year, month, day));
    const monthIndex = Math.floor((jdn - 2415021.076998695) / 29.530588853);
    let monthStartDay = Math.floor(queryNewMoonDay(monthIndex + 1, timeZone));
    if (monthStartDay > jdn) {
        monthStartDay = Math.floor(queryNewMoonDay(monthIndex, timeZone));
    }

    let wsBefore = Math.floor(queryWinterSolsticeMonth(year, timeZone));
    let wsAfter = wsBefore;
    if (wsBefore >= monthStartDay) {
        lunarYear = year;
        wsBefore = Math.floor(queryWinterSolsticeMonth(year - 1, timeZone));
    } else {
        lunarYear = year + 1;
        wsAfter = Math.floor(queryWinterSolsticeMonth(year + 1, timeZone));
    }

    lunarDay = jdn - monthStartDay + 1;
    let diff = Math.floor((monthStartDay - wsBefore) / 29);

    lunarMonth = diff + 11;
    if (wsAfter - wsBefore > 365) {
        let leapMonthDiff = queryLeapMonth(wsBefore, timeZone);
        if (diff >= leapMonthDiff) {
            lunarMonth = diff + 10;
            if (diff == leapMonthDiff) {
                isInLeapMonth = true;
            }
        }
    }

    if (lunarMonth > 12) {
        lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
        lunarYear -= 1;
    }  

    return { day: lunarDay, month: lunarMonth, year: lunarYear, isInLeapMonth }
}

export function getLunarDateGanzhi(date: Date, timeZone: number): LunarDateGanzhi {
    const zonedDate = new Date(date);
    zonedDate.setMinutes(date.getMinutes() + timeZone * 60);
    const jdn = toJulianDate(zonedDate.getUTCFullYear(), zonedDate.getUTCMonth() + 1, zonedDate.getUTCDate());
    const { day, month, year, isInLeapMonth } = getLunarDate(date, timeZone);
    return {
        day, month, year, isInLeapMonth,
        yearGanzhi: [
            modulo(year + 6, 10),
            modulo(year + 8, 12),
        ],
        monthGanzhi: [
            modulo(month + year * 2 + 3, 10),
            modulo(month + 1, 12),
        ],
        dayGanzhi: [
            modulo(jdn + 9, 10),
            modulo(jdn + 1, 12),
        ],
    }
}

export type LunarDate = {
    day: number,
    month: number,
    year: number,
    isInLeapMonth: boolean,
}

export type LunarDateGanzhi = LunarDate & {
    dayGanzhi: [number, number],
    monthGanzhi: [number, number],
    yearGanzhi: [number, number],
}

function modulo(a: number, b: number): number { 
    return ((a % b) + b) % b
}