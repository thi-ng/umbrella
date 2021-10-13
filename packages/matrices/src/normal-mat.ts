import type { MatOpMU } from "./api.js";
import { invert33, invert44 } from "./invert.js";
import { mat44to33 } from "./m44-m33.js";
import { transpose33, transpose44 } from "./transpose.js";

/**
 * Converts given 4x4 matrix to a 3x3 normal matrix, i.e. the transposed
 * inverse of its upper-left 3x3 region. If `out` is null a new result
 * matrix will be created. Returns `undefined` if matrix inversion
 * failed.
 *
 * @param out -
 * @param m -
 */
export const normal33: MatOpMU = (out, m) => {
    out = invert33(null, mat44to33(out, m))!;
    return out ? transpose33(null, out) : undefined;
};

/**
 * Converts given 4x4 matrix to a 4x4 matrix normal matrix, i.e. the
 * transposed inverse. Writes results to `m` if `out` is null. Returns
 * `undefined` if matrix inversion failed.
 *
 * @param out -
 * @param m -
 */
export const normal44: MatOpMU = (out, m) => {
    out = invert44(out, m)!;
    return out ? transpose44(null, out) : undefined;
};
