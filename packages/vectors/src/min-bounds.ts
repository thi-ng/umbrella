import type { ReadonlyVec, Vec } from "./api";
import { __ensureInputs } from "./internal/ensure";
import { min } from "./min";
import { setN } from "./setn";
import { vecOf } from "./vec-of";

/**
 * Takes an array of vectors and computes componentwise minimum. Writes result
 * to `out` (or a new vector).
 *
 * @param out
 * @param src
 */
export const minBounds = (out: Vec | null, src: ReadonlyVec[]) => {
    __ensureInputs(src);
    out = out ? setN(out, Infinity) : vecOf(src[0].length, Infinity);
    for (let i = src.length; --i >= 0; ) min(out, out, src[i]);
    return out;
};
