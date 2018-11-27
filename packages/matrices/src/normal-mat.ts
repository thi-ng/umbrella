import { MatOpM } from "./api";
import { mat44to33 } from "./convert";
import { invert33 } from "./invert";
import { transpose33 } from "./transpose";

/**
 * Converts given M44 to a M33 normal matrix, i.e. the transposed
 * inverted version of its upper-left 3x3 region.
 *
 * @param out
 * @param m
 */
export const normal44: MatOpM =
    (out, m) =>
        transpose33(out, invert33(out, mat44to33(out, m)));
