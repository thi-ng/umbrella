/**
 * Calls function `fn` without args, prints elapsed time and returns
 * fn's result. The optional `prefix` will be displayed with the output,
 * allowing to label different measurements.
 *
 * @param fn
 * @param prefix
 */
export function timed<T>(fn: () => T, prefix = "") {
    const t0 = Date.now();
    const res = fn();
    console.log(prefix + (Date.now() - t0) + "ms");
    return res;
}

/**
 * Executes given function `n` times, prints elapsed time to console and
 * returns last result from fn. The optional `prefix` will be displayed
 * with the output, allowing to label different measurements.
 *
 * @param fn
 * @param n
 */
export function bench<T>(fn: () => T, n = 1e6, prefix = "") {
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
}
