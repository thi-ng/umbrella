import type { ReadonlyVec } from "./api.js";

/**
 * @remarks
 * The Minkowski power `p` MUST be > 0.
 *
 * Reference: https://en.wikipedia.org/wiki/Minkowski_distance
 *
 * @param a - 
 * @param b - 
 * @param p - 
 */
export const distMinkowski = (a: ReadonlyVec, b: ReadonlyVec, p: number) => {
    let delta = 0;
    for (let i = a.length; i-- > 0; ) {
        delta += Math.abs(a[i] - b[i]) ** p;
    }
    return delta ** (1 / p);
};
