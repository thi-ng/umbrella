import type { Fn } from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import type {
    EpochIterator,
    EpochIteratorConstructor,
    Precision,
} from "./api.js";
import { DateTime } from "./datetime.js";
import { floorQuarter, floorWeek } from "./round.js";

/**
 * Higher-order epoch iterator factory. Returns iterator with configured
 * precision and `tick` fn.
 *
 * @param prec
 * @param tick
 */
export const defIterator = (
    prec: Precision | Fn<number, DateTime>,
    tick: Fn<DateTime, void>
): EpochIteratorConstructor => {
    return function* (...xs: any[]): EpochIterator {
        let [from, to] = (<number[]>(xs.length > 1 ? xs : xs[0])).map((x) =>
            new DateTime(x).getTime()
        );
        let state = isString(prec) ? new DateTime(from, prec) : prec(from);
        let epoch = from;
        while (epoch < to) {
            epoch = state.getTime();
            if (epoch >= from && epoch < to) yield epoch;
            tick(state);
        }
    };
};

/**
 * Yields iterator of UTC timestamps in given semi-open interval in yearly
 * precision (each timestamp is at beginning of each year).
 *
 * @param from
 * @param to
 */
export const years = defIterator("y", (d) => d.incYear());

/**
 * Yields iterator of UTC timestamps in given semi-open interval in monthly
 * precision (each timestamp is at beginning of a month), but spaced at 3 month
 * intervals.
 *
 * @param from
 * @param to
 */
export const quarters = defIterator(
    (from) => new DateTime(floorQuarter(from)),
    (d) => d.incQuarter()
);

/**
 * Yields iterator of UTC timestamps in given semi-open interval in monthly
 * precision (each timestamp is at beginning of each month).
 *
 * @param from
 * @param to
 */
export const months = defIterator("M", (d) => d.incMonth());

/**
 * Yields iterator of UTC timestamps in given semi-open interval in daily
 * precision (each timestamp is 7 days apart). As per ISO8601, weeks start on
 * Mondays.
 *
 * @param from
 * @param to
 */
export const weeks = defIterator(
    (from) => new DateTime(floorWeek(from)),
    (d) => d.incWeek()
);

/**
 * Yields iterator of UTC timestamps in given semi-open interval in daily
 * precision (each timestamp is at midnight/beginning of each day).
 *
 * @param from
 * @param to
 */
export const days = defIterator("d", (d) => d.incDay());

/**
 * Yields iterator of UTC timestamps in given semi-open interval in hourly
 * precision.
 *
 * @param from
 * @param to
 */
export const hours = defIterator("h", (d) => d.incHour());

/**
 * Yields iterator of UTC timestamps in given semi-open interval in minute
 * precision.
 *
 * @param from
 * @param to
 */
export const minutes = defIterator("m", (d) => d.incMinute());

/**
 * Yields iterator of UTC timestamps in given semi-open interval in second
 * precision.
 *
 * @param from
 * @param to
 */
export const seconds = defIterator("s", (d) => d.incSecond());

/**
 * Yields iterator of UTC timestamps in given semi-open interval in millisecond
 * precision.
 *
 * @param from
 * @param to
 */
export const milliseconds = defIterator("t", (d) => d.incMillisecond());
