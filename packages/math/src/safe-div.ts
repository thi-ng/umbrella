import type { FnN2 } from "@thi.ng/api";

/**
 * Returns `a` divided by `b` or zero if `b = 0`.
 *
 * @param a - 
 * @param b - 
 */
export const safeDiv: FnN2 = (a, b) => (b !== 0 ? a / b : 0);
