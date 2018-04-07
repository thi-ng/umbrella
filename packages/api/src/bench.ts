/**
 * Calls function `fn` without args, prints elapsed time and returns
 * fn's result.
 *
 * @param fn
 */
export function timed<T>(fn: () => T) {
    const t0 = Date.now();
    const res = fn();
    console.log(Date.now() - t0);
    return res;
}

/**
 * Executes given function `n` times, prints elapsed time to console and
 * returns last result from fn.
 *
 * @param fn
 * @param n
 */
export function bench<T>(fn: () => T, n = 1e6) {
    let res: T;
    return timed(() => {
        while (n-- > 0) {
            res = fn();
        }
        return res;
    });
}
