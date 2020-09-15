import type { FnN2 } from "@thi.ng/api";

/**
 * Numeric comparator (ascending order)
 *
 * @param a -
 * @param b -
 */
export const compareNumAsc: FnN2 = (a, b) => a - b;

/**
 * Numeric comparator (descending order)
 *
 * @param a -
 * @param b -
 */
export const compareNumDesc: FnN2 = (a, b) => b - a;
