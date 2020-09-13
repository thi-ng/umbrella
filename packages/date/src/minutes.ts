import { DAYS_IN_MONTH, EpochIterator } from "./api";
import { dateParts } from "./utils";

/**
 * Yields iterator of UTC timestamps in given semi-open interval in minute
 * precision.
 *
 * @param from
 * @param to
 */
export function minutes([from, to]: number[]): EpochIterator;
export function minutes(from: number, to: number): EpochIterator;
export function* minutes(...xs: any[]): EpochIterator {
    const [from, to] = xs.length > 1 ? xs : xs[0];
    let [y, m, d, h, mm] = dateParts(from);
    let epoch = from;
    while (epoch < to) {
        epoch = Date.UTC(y, m, d, h, mm);
        if (epoch >= from && epoch < to) yield epoch;
        if (++mm > 59) {
            mm = 0;
            if (++h > 23) {
                h = 0;
                if (++d > DAYS_IN_MONTH[m]) {
                    d = 1;
                    if (++m > 11) {
                        m = 0;
                        ++y;
                    }
                }
            }
        }
    }
}
