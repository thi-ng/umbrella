import { MatOpM } from "./api";
import { mat44to33 } from "./m44-m33";
import { invert33 } from "./invert";
import { transpose33 } from "./transpose";

/**
 * Converts given M44 to a M33 normal matrix, i.e. the transposed
 * inverted version of its upper-left 3x3 region.
 *
 * @param out
 * @param m
 */
export const normal44: MatOpM = (out, m) =>
    transpose33(null, invert33(null, mat44to33(out, m)));
