// SPDX-License-Identifier: Apache-2.0
import { isFunction } from "@thi.ng/checks/is-function";
import type { Stringer } from "@thi.ng/strings";
import { float, floatFixedWidth } from "@thi.ng/strings/float";

export interface ToStringOpts {
	/**
	 * Number of fractional digits
	 *
	 * @defaultValue 3
	 */
	prec: number;
	/**
	 * If given, each formatted vector component will be padded to given number
	 * of characters.
	 */
	width: number;
	/**
	 * Inter-component delimiter.
	 *
	 * @defaultValue ", "
	 */
	delim: string;
	/**
	 * Prefix/suffix wrapper strings.
	 *
	 * @defaultValue "[" and "]"
	 */
	wrap: ArrayLike<string>;
}

/**
 * Returns a new generic vector formatter for given options (all optional). The
 * returned function accepts a single vector(like) value and returns its
 * formatted string representation.
 *
 * @remarks
 * See {@link ToStringOpts} for further details. Also see {@link FORMATTER} and
 * {@link setFormat} to set default formatter.
 *
 * @example
 * ```ts tangle:../export/def-format.ts
 * import { defFormat } from "@thi.ng/vec-api";
 *
 * console.log(
 *   defFormat()([1, -2, 3])
 * );
 * // [1.000, -2.000, 3.000]
 *
 * console.log(
 *   defFormat({ width: 10, wrap: "||", delim: "|\n|" })([1, -2, 3])
 * );
 * // |     1.000|
 * // |    -2.000|
 * // |     3.000|
 *
 * console.log(
 *   defFormat({ prec: 5, delim: " " })([1, -2, 3])
 * );
 * // [1.00000 -2.00000 3.00000]
 * ```
 *
 * @param prec -
 * @param width -
 */
export const defFormat = (
	opts: Partial<ToStringOpts> = {}
): Stringer<Iterable<number>> => {
	const { prec = 3, delim = ", ", wrap = "[]", width } = opts;
	const fmt = width ? floatFixedWidth(width, prec) : float(prec);
	return (src) => {
		let res: string[] = [];
		for (let x of src) res.push(fmt(x));
		return `${wrap[0]}${res.join(delim)}${wrap[1]}`;
	};
};

/**
 * Sets package-wide default vector formatter. See {@link defFormat},
 * {@link FORMATTER}.
 *
 * @param fmt -
 */
export const setFormat = (
	fmt: Stringer<Iterable<number>> | Partial<ToStringOpts>
) => {
	FORMATTER = isFunction(fmt) ? fmt : defFormat(fmt);
};

/**
 * Package-wide default vector formatter.
 */
export let FORMATTER: Stringer<Iterable<number>> = defFormat();
