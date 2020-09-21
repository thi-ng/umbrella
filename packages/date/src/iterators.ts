import type { Fn } from "@thi.ng/api";
import type { EpochIterator, EpochIteratorConstructor, Precision } from "./api";
import { DateTime } from "./datetime";

export const defIterator = (
    prec: Precision,
    tick: Fn<DateTime, void>
): EpochIteratorConstructor => {
    return function* (...xs: any[]): EpochIterator {
        let [from, to] = (<number[]>(xs.length > 1 ? xs : xs[0])).map((x) =>
            new DateTime(x).getTime()
        );
        let state = new DateTime(from, prec);
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
 * precision (each timestamp is at beginning of each month).
 *
 * @param from
 * @param to
 */
export const months = defIterator("M", (d) => d.incMonth());

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
