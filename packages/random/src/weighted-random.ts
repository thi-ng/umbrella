import { assert } from "@thi.ng/api";
import type { IRandom } from "./api";
import { SYSTEM } from "./system";

/**
 * Returns a no-arg function which produces a random choice of given weighted
 * `choices` and using given {@link IRandom} instance (default {@link SYSTEM}.
 * If `weights` are given, it must be the same size as `choices`. If omitted,
 * each choice will have same probability.
 *
 * @remarks
 * Throws an error if the `choices` array is empty (requires at least 1 item).
 * If the total sum of `weights` is <= 0 a warning is printed to the console and
 * the resulting function will only ever return the first `choice`.
 *
 * Based on:
 * {@link https://www.electricmonk.nl/log/2009/12/23/weighted-random-distribution/}
 *
 * @param choices -
 * @param weights - optional weights
 */
export const weightedRandom = <T>(
    choices: Array<T>,
    weights?: ArrayLike<number>,
    rnd: IRandom = SYSTEM
) => {
    const n = choices.length;
    assert(n > 0, "no choices given");
    const opts = weights
        ? choices
              .map((x, i) => <[T, number]>[x, weights[i]])
              .sort((a, b) => b[1] - a[1])
        : choices.map((x) => <[T, number]>[x, 1]);
    const total = opts.reduce((acc, o) => acc + o[1], 0);
    total <= 0 && console.warn("total weights <= 0");
    return () => {
        const r = rnd.float(total);
        let sum = total;
        for (let i = 0; i < n; i++) {
            sum -= opts[i][1];
            if (sum <= r) {
                return opts[i][0];
            }
        }
        return <never>undefined;
    };
};
