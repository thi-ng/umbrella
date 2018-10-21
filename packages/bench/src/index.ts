export type TimingResult<T> = [T, number];

/**
 * Calls function `fn` without args, prints elapsed time and returns
 * fn's result. The optional `prefix` will be displayed with the output,
 * allowing to label different measurements.
 *
 * @param fn
 * @param prefix
 */
export const timed = <T>(fn: () => T, prefix = "") => {
    const t0 = Date.now();
    const res = fn();
    console.log(prefix + (Date.now() - t0) + "ms");
    return res;
};

/**
 * Similar to `timed()`, but produces no output and instead returns
 * tuple of `fn`'s result and the time measurement.
 *
 * @param fn
 */
export const timedResult = <T>(fn: () => T): TimingResult<T> => {
    const t0 = Date.now();
    const res = fn();
    return [res, Date.now() - t0];
};

/**
 * Executes given function `n` times, prints elapsed time to console and
 * returns last result from fn. The optional `prefix` will be displayed
 * with the output, allowing to label different measurements.
 *
 * @param fn
 * @param n
 */
export const bench = <T>(fn: () => T, n = 1e6, prefix = "") => {
    let res: T;
    return timed(
        () => {
            while (n-- > 0) {
                res = fn();
            }
            return res;
        },
        prefix
    );
};

/**
 * Similar to `bench()`, but produces no output and instead returns
 * tuple of `fn`'s last result and the grand total time measurement.
 *
 * @param fn
 * @param n
 */
export const benchResult = <T>(fn: () => T, n = 1e6): TimingResult<T> => {
    let res: T;
    return timedResult(
        () => {
            while (n-- > 0) {
                res = fn();
            }
            return res;
        }
    );
};
