import type { DistanceFn } from "./api.js";

/**
 * Normalized Hamming distance between `a` and `b`, i.e. number of differing
 * components divided by vector size.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Hamming_distance
 *
 * @param a
 * @param b
 */
export const distHamming: DistanceFn = (a, b) => {
    let delta = 0;
    for (let i = a.length; --i >= 0; ) {
        a[i] !== b[i] && delta++;
    }
    return delta / a.length;
};
