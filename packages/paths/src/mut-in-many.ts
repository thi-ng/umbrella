import { illegalArgs } from "@thi.ng/errors";
import { mutInT } from "./mut-in";

/**
 * Similar to {@link mutIn}, but takes any number of path-value pairs as
 * args and applies them in sequence using `mutIn()`. All key paths must
 * already be present in the given data structure until their
 * penultimate key.
 *
 * @remarks
 * Unlike {@link mutIn}, this function does not use type checked paths.
 *
 * @example
 * ```ts
 * mutInMany(
 *   { a: { b: 1 }, x: { y: { z: 2 } } },
 *   "a.b", 10,
 *   "x.y.z", 20
 * )
 * // { a: { b: 10 }, x: { y: { z: 20 } } }
 * ```
 *
 * @param state -
 * @param pairs -
 */
export const mutInMany = (state: any, ...pairs: any[]) => {
    const n = pairs.length;
    n & 1 && illegalArgs(`require even number of args (got ${pairs.length})`);
    for (let i = 0; i < n && state; i += 2) {
        state = mutInT(state, pairs[i], pairs[i + 1]);
    }
    return state;
};
