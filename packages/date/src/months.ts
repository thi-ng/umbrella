import type { EpochIterator } from "./api";
import { dateParts } from "./utils";

/**
 * Yields iterator of UTC timestamps in given semi-open interval in monthly
 * precision (each timestamp is at beginning of each month).
 *
 * @param from
 * @param to
 */
export function months([from, to]: number[]): EpochIterator;
export function months(from: number, to: number): EpochIterator;
export function* months(...xs: any[]): EpochIterator {
    const [from, to] = xs.length > 1 ? xs : xs[0];
    let [y, m] = dateParts(from);
    let epoch = from;
    while (epoch < to) {
        epoch = Date.UTC(y, m);
        if (epoch >= from && epoch < to) yield epoch;
        if (++m > 11) {
            m = 0;
            ++y;
        }
    }
}
