import { EPS } from "@thi.ng/math/api";
import { VecOpVO } from "./api";
import { mag } from "./mag";
import { mulN } from "./muln";

/**
 * Normalizes vector to given (optional) length (default: 1). If `out`
 * is null, modifies `v` in place.
 *
 * @param out
 * @param v
 * @param n
 */
export const normalize: VecOpVO<number> =
    (out, v, n = 1) => {
        let m = mag(v);
        return m >= EPS ? mulN(out || v, v, n / m) : v;
    };
