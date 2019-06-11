import { MatOpMU } from "./api";
import { invert33 } from "./invert";
import { mat44to33 } from "./m44-m33";
import { transpose33 } from "./transpose";

/**
 * Converts given M44 to a M33 normal matrix, i.e. the transposed
 * inverted version of its upper-left 3x3 region.
 *
 * @param out
 * @param m
 */
export const normal44: MatOpMU = (out, m) => {
    const _out = invert33(null, mat44to33(out, m));
    return _out ? transpose33(null, _out) : _out;
};
