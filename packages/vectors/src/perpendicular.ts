import { VecOpV } from "./api";
import { setC2 } from "./setc";

/**
 * Produces a perpendicular vector to `v`, i.e. `[-y,x]`.
 *
 * @param out
 * @param v
 */
export const perpendicularLeft2: VecOpV = (out, a) =>
    setC2(out || a, -a[1], a[0]);

/**
 * Produces a perpendicular vector to `v`, i.e. `[y,-x]`.
 *
 * @param out
 * @param v
 */
export const perpendicularRight2: VecOpV = (out, a) =>
    setC2(out || a, a[1], -a[0]);
