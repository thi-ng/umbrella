import type { IRandom } from "../api.js";
import { SYSTEM } from "../system.js";

/**
 * HOF. Returns zero-arg function, yielding uniformly distributed values in the
 * `[min,max)` interval (default: `[0,1)`).
 *
 * @remarks
 * This function is syntax sugar for `rnd.minmax()`.
 *
 * @param rnd - 
 * @param min - 
 * @param max - 
 */
export const uniform =
    (rnd: IRandom = SYSTEM, min = 0, max = 1) =>
    () =>
        rnd.minmax(min, max);
