import { DAYS_IN_MONTH, EpochIterator } from "./api";
import { dateParts } from "./utils";

/**
 * Yields iterator of UTC timestamps in given semi-open interval in daily
 * precision (each timestamp is at midnight/beginning of each day).
 *
 * @param from
 * @param to
 */
export function days([from, to]: number[]): EpochIterator;
export function days(from: number, to: number): EpochIterator;
export function* days(...xs: any[]): EpochIterator {
    const [from, to] = xs.length > 1 ? xs : xs[0];
    let [y, m, d] = dateParts(from);
    let epoch = from;
    while (epoch < to) {
        epoch = Date.UTC(y, m, d);
        if (epoch >= from && epoch < to) yield epoch;
        if (++d > DAYS_IN_MONTH[m]) {
            d = 1;
            if (++m > 11) {
                m = 0;
                ++y;
            }
        }
    }
}
