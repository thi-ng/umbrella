import { Add } from "./add.js";

/**
 * Timebased version of {@link add}. Creates a new `Add` gen based on
 * given `start` (default: 0) and `end` (default: 1) positions and
 * tracing a line over `num` steps.
 *
 * @remarks
 * Unless `skipFirst` is true, the `end` value is only reached at `num +
 * 1` steps. The line will NOT stop at `end` but continue indefinitely
 * if more than `n + 1` values are requested from the generator.
 *
 * @example
 * ```ts
 * line(0, 1, 5).take(7)
 * // [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2 ]
 * ```
 *
 * @param start - start value
 * @param end - end value
 * @param num - num steps (default: 10)
 * @param skipFirst - true to skip start value (default: false)
 * @param clampEnd - true to clamp curve at end value (default: false)
 */
export const line = (
    start = 0,
    end = 1,
    num = 10,
    skipFirst = false,
    clampEnd = false
) => {
    const dt = (end - start) / num;
    return new Add(
        dt,
        skipFirst ? start + dt : start,
        clampEnd ? end : undefined
    );
};
