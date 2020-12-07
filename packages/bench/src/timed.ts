import type { TimingResult } from "./api";
import { now } from "./now";

/**
 * Calls function `fn` without args, prints elapsed time and returns
 * fn's result. The optional `prefix` will be displayed with the output,
 * allowing to label different measurements.
 *
 * @param fn - function to time
 * @param prefix - log prefix
 */
export const timed = <T>(fn: () => T, prefix = "") => {
    const [res, t] = timedResult(fn);
    console.log(`${prefix} ${t.toFixed(2)}ms`);
    return res;
};

/**
 * Similar to {@link timed}, but produces no output and instead returns
 * tuple of `fn`'s result and the time measurement (in milliseconds).
 *
 * @param fn - function to time
 */
export const timedResult = <T>(fn: () => T): TimingResult<T> => {
    const t0 = now();
    const res = fn();
    const t1 = now();
    return [
        res,
        (typeof BigInt !== "undefined"
            ? Number(<bigint>t1 - <bigint>t0)
            : <number>t1 - <number>t0) * 1e-6,
    ];
};
