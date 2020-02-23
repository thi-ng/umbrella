/**
 * Returns `a` divided by `b` or zero if `b = 0`.
 *
 * @param a
 * @param b
 */
export const safeDiv = (a: number, b: number) => (b !== 0 ? a / b : 0);
