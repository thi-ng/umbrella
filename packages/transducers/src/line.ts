import { map } from "./map";
import { normRange } from "./norm-range";

/**
 * Iterator yielding `steps` + 1 interpolated values on a line in the
 * closed `[start .. end]` interval.
 *
 * @remarks
 * This is similar to {@link range}, but potentially provides more
 * precise values (by avoiding the accumulation of floating point errors
 * during iteration).
 *
 * Similar functionality (w/ more options) is availble here:
 * {@link @thi.ng/dsp#line}.
 *
 * @example
 * ```ts
 * [...line(50, 100, 10)]
 * // [
 * //    50, 55, 60, 65, 70,
 * //    75, 80, 85, 90, 95,
 * //   100
 * // ]
 * ```
 *
 * @param start -
 * @param end -
 * @param steps -
 */
export const line = (start: number, end: number, steps = 10) => {
    const delta = end - start;
    return map((t) => start + delta * t, normRange(steps));
};
