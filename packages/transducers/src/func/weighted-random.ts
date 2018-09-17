import { repeat } from "../iter/repeat";
import { tuples } from "../iter/tuples";

/**
 * If `weights` are given, it must be the same size as `choices`. If omitted,
 * each choice will have same probability.
 *
 * https://www.electricmonk.nl/log/2009/12/23/weighted-random-distribution/
 *
 * @param choices
 * @param weights
 */
export function weightedRandom<T>(choices: ArrayLike<T> & Iterable<T>, weights?: ArrayLike<number> & Iterable<number>) {
    const n = choices.length;
    const opts = [...tuples(choices, weights || repeat(1))].sort((a, b) => b[1] - a[1]);
    let total = 0, i, r, sum;
    for (i = 0; i < n; i++) {
        total += weights[i];
    }
    return () => {
        r = Math.random() * total;
        sum = total;
        for (i = 0; i < n; i++) {
            sum -= opts[i][1];
            if (sum <= r) {
                return opts[i][0];
            }
        }
    };
}