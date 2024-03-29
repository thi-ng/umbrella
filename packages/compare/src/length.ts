import type { Comparator, ILength } from "@thi.ng/api";

/**
 * Length comparator (ascending order)
 *
 * @param a -
 * @param b -
 */
export const compareLengthAsc: Comparator<ILength> = (a, b) =>
	a.length - b.length;

/**
 * Length comparator (descending order)
 *
 * @param a -
 * @param b -
 */
export const compareLengthDesc: Comparator<ILength> = (a, b) =>
	b.length - a.length;
