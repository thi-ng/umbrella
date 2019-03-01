import { IRandom } from "./api";
import { SYSTEM } from "./system";

/**
 * Returns a no-arg function which produces a random choice of given
 * weighted `choices` and using given `IRandom` instance (default:
 * `SYSTEM`). If `weights` are given, it must be the same size as
 * `choices`. If omitted, each choice will have same probability.
 *
 * https://www.electricmonk.nl/log/2009/12/23/weighted-random-distribution/
 *
 * @param choices
 * @param weights
 */
export const weightedRandom = <T>(
    choices: Array<T>,
    weights?: ArrayLike<number>,
    rnd: IRandom = SYSTEM
) => {
    const opts = choices
        .map(
            weights
                ? (x, i) => <[T, number]>[x, weights[i]]
                : (x) => <[T, number]>[x, 1]
        )
        .sort((a, b) => b[1] - a[1]);
    const n = choices.length;
    let total = 0,
        i: number,
        r: number,
        sum: number;
    for (i = 0; i < n; i++) {
        total += opts[i][1];
    }
    return () => {
        r = rnd.float(total);
        sum = total;
        for (i = 0; i < n; i++) {
            sum -= opts[i][1];
            if (sum <= r) {
                return opts[i][0];
            }
        }
    };
};
