import type { EpochIterator } from "./api";

/**
 * Yields iterator of UTC timestamps in given semi-open interval in yearly
 * precision (each timestamp is at beginning of each year).
 *
 * @param from
 * @param to
 */
export function years([from, to]: number[]): EpochIterator;
export function years(from: number, to: number): EpochIterator;
export function* years(...xs: any[]): EpochIterator {
    const [from, to] = xs.length > 1 ? xs : xs[0];
    const d1 = new Date(from);
    const d2 = new Date(to);
    for (
        let y1 = d1.getUTCFullYear(), y2 = d2.getUTCFullYear();
        y1 <= y2;
        y1++
    ) {
        const epoch = Date.UTC(y1, 0);
        if (epoch >= from) yield epoch;
    }
}
