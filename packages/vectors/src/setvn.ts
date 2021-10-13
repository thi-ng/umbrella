import type { VecOpVN } from "./api.js";
import { setC3, setC4 } from "./setc.js";

/**
 * Sets `out` to `[a.x, a.y, n]`
 *
 * @param out -
 * @param a -
 * @param n -
 */
export const setVN3: VecOpVN = (out, a, n) => setC3(out, a[0], a[1], n);

/**
 * Sets `out` to `[a.x, a.y, a.z, n]`
 *
 * @param out -
 * @param a -
 * @param n -
 */
export const setVN4: VecOpVN = (out, a, n) => setC4(out, a[0], a[1], a[2], n);
