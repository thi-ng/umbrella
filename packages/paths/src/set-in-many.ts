import { illegalArgs } from "@thi.ng/errors";
import { setInT } from "./set-in";

/**
 * Similar to {@link setIn}, but takes any number of path-value pairs as
 * args and applies them in sequence by calling `setIn()` for each.
 *
 * @remarks
 * Any key paths missing in the data structure will be created. Does
 * *not* mutate original (instead use {@link mutInMany} for this
 * purpose).
 *
 * Unlike {@link setIn}, this function does not use type checked paths.
 *
 * ```
 * setInMany({}, "a.b", 10, "x.y.z", 20)
 * // { a: { b: 10 }, x: { y: { z: 20 } } }
 * ```
 *
 * @param state -
 * @param pairs -
 */
export const setInMany = (state: any, ...pairs: any[]) => {
    const n = pairs.length;
    n & 1 &&
        illegalArgs(`require even number of KV args (got ${pairs.length})`);
    for (let i = 0; i < n; i += 2) {
        state = setInT(state, pairs[i], pairs[i + 1]);
    }
    return state;
};
