import { VecOpV } from "./api";

/**
 * Produces a perpendicular vector to `v`, i.e. `[-y,x]`.
 *
 * @param out
 * @param v
 */
export const perpendicularLeft2: VecOpV =
    (out, a) => {
        !out && (out = a);
        const x = a[0];
        out[0] = -a[1];
        out[1] = x;
        return out;
    };

/**
 * Produces a perpendicular vector to `v`, i.e. `[y,-x]`.
 *
 * @param out
 * @param v
 */
export const perpendicularRight2: VecOpV =
    (out, a) => {
        !out && (out = a);
        const x = -a[0];
        out[0] = a[1];
        out[1] = x;
        return out;
    };
