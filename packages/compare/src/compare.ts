// SPDX-License-Identifier: Apache-2.0
/**
 * Generic comparator (for arbitrary types) with support for
 * [ICompare](https://docs.thi.ng/umbrella/api/interfaces/ICompare.html)
 * implementations and using the rules described below. Returns standard
 * comparator result, i.e. a negative value if `a < b`, a positive value if `a >
 * b` and zero otherwise.
 *
 * @remarks
 * Special handling for the following case, in the given order:
 *
 * `a === b` => 0
 *
 * | a        | b        | result        |
 * |----------|----------|--------------:|
 * | null     | null     | 0             |
 * | null     | non-null | -1            |
 * | non-null | null     | 1             |
 * | ICompare | any      | a.compare(b)  |
 * | any      | ICompare | -b.compare(a) |
 *
 * Note: `null` here also includes `undefined`
 *
 * @param a
 * @param b
 * @returns
 */
export const compare = (a: any, b: any): number => {
	if (a === b) {
		return 0;
	}
	if (a == null) {
		return b == null ? 0 : -1;
	}
	if (b == null) {
		return a == null ? 0 : 1;
	}
	if (typeof a.compare === "function") {
		return a.compare(b);
	}
	if (typeof b.compare === "function") {
		return -b.compare(a);
	}
	return a < b ? -1 : a > b ? 1 : 0;
};
