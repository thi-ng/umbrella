import { add } from "./add";
import type { ReadonlyVec, Vec } from "./api";
import { ensureInputs } from "./internal/ensure";
import { mulN } from "./muln";
import { set } from "./set";

/**
 * Takes an array of vectors (of uniform dimensions) and computes the
 * componentwise mean. Writes result to `out` (or a new vector).
 *
 * @remarks
 * Also see {@link median}.
 *
 * @example
 * ```ts
 * mean([], [[3, 10, 400], [4, 30, 100], [1, 40, 200], [2, 20, 300]])
 * // [ 2.5, 25, 250 ]
 * ```
 *
 * @param out
 * @param src
 */
export const mean = (out: Vec | null, src: ReadonlyVec[]) => {
    ensureInputs(src);
    out = set(out || [], src[0]);
    for (let i = src.length; --i >= 1; ) {
        add(out, out, src[i]);
    }
    return mulN(out, out, 1 / src.length);
};
