import { MatOpM } from "./api";
import { invert33, invert44 } from "./invert";
import { mat44to33 } from "./m44-m33";
import { transpose33, transpose44 } from "./transpose";

/**
 * Converts given M44 to a M33 normal matrix, i.e. the transposed
 * inverse of its upper-left 3x3 region.
 *
 * @param out
 * @param m
 */
export const normal33: MatOpM = (out, m) =>
    transpose33(null, invert33(null, mat44to33(out, m)));

/**
 * Converts given M44 to a M44 normal matrix, i.e. the transposed
 * inverse.
 *
 * @param out
 * @param m
 */
export const normal44: MatOpM = (out, m) => transpose44(null, invert44(out, m));
