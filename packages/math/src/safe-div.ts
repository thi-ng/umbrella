/**
 * Returns `a` divided by `b` or zero if `b = 0`.
 * TODO add to thi.ng/math
 *
 * @param a
 * @param b
 */
export const safeDiv = (a: number, b: number) => (b !== 0 ? a / b : 0);
