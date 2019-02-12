import { IRandom, SYSTEM } from "@thi.ng/random";
import { repeat } from "../iter/repeat";
import { zip } from "../iter/zip";

/**
 * Returns a no-arg function which produces a random choice of given
 * weighted `choices`. If `weights` are given, it must be the same size
 * as `choices`. If omitted, each choice will have same probability.
 *
 * https://www.electricmonk.nl/log/2009/12/23/weighted-random-distribution/
 *
 * @param choices
 * @param weights
 */
export const weightedRandom = <T>(
    choices: ArrayLike<T> & Iterable<T>,
    weights?: ArrayLike<number> & Iterable<number>,
    rnd: IRandom = SYSTEM
) => {
    const n = choices.length;
    const opts = [...zip(choices, weights || repeat(1))].sort((a, b) => b[1] - a[1]);
    let total = 0, i, r, sum;
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
