import { EPS } from "@thi.ng/math";
import type { VecOpVO } from "./api";
import { mag } from "./mag";
import { mulN } from "./muln";
import { set } from "./set";

/**
 * Normalizes vector to given (optional) length (default: 1). If `out`
 * is null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const normalize: VecOpVO<number> = (out, v, n = 1) => {
    !out && (out = v);
    const m = mag(v);
    return m >= EPS ? mulN(out, v, n / m) : out !== v ? set(out, v) : out;
};
