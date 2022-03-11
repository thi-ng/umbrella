import type { VecOpVVV } from "./api.js";

/**
 * Combines elements from given vectors `a` and `b` into vector `out` using
 * `mask` vector to select the source of each element. If `mask[i] != 0` the
 * source is `b[i]`, else `a[i]`. If `out` is null writes result into `a`.
 *
 * @remarks
 * All 3 input vectors MUST be of same size.
 *
 * @param out - 
 * @param a - 
 * @param b - 
 * @param mask - 
 */
export const select: VecOpVVV = (out, a, b, mask) => {
    out = out || a;
    for (let i = a.length; i-- > 0; ) {
        out[i] = mask[i] ? b[i] : a[i];
    }
    return out;
};
