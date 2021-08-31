import type { DistanceFn } from "./api";

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Canberra_distance
 *
 * @param a
 * @param b
 */
export const distCanberra: DistanceFn = (a, b) => {
    let delta = 0;
    for (let i = a.length; --i >= 0; ) {
        const aa = a[i];
        const bb = b[i];
        const d = Math.abs(aa) + Math.abs(bb);
        d > 0 && (delta += Math.abs(aa - bb) / d);
    }
    return delta;
};
