/**
 * Returns true if given string contains only digits, and optionally, a sign
 * prefix.
 *
 * @param x -
 */
export const isNumericInt = (x: string) => /^[-+]?\d+$/.test(x);

/**
 * Returns true if given string only contains an integer or floating point
 * number, optionally in scientific notiation (e.g. `-123.45e-6`).
 *
 * @param x -
 */
export const isNumericFloat = (x: string) =>
	/^[-+]?\d*\.?\d+(e[-+]?\d+)?$/i.test(x);
