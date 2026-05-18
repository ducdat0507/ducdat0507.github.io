export function toJulianDate(date: number | Date): number {
    return +date / 86400000 + 2440587.5
}