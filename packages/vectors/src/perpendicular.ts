import type { VecOpV } from "./api";
import { setC2 } from "./setc";

/**
 * 2D only. Produces a perpendicular vector to `v`, i.e. `[-y,x]`.
 * Assumes positive Y-up.
 *
 * @param out -
 * @param v -
 */
export const perpendicularCCW: VecOpV = (out, a) =>
    setC2(out || a, -a[1], a[0]);

/**
 * 2D only. Produces a clockwise perpendicular vector to `v`, i.e.
 * `[y,-x]`. Assumes positive Y-up.
 *
 * @param out -
 * @param v -
 */
export const perpendicularCW: VecOpV = (out, a) => setC2(out || a, a[1], -a[0]);
