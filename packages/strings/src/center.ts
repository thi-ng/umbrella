import { memoizeJ } from "@thi.ng/memoize/memoizej";
import type { Stringer } from "./api.js";
import { repeat } from "./repeat.js";
import { truncate } from "./truncate.js";

/**
 * Returns stringer which pads given input with `ch` (default: space) on
 * both sides and returns fixed width string of given `lineWidth`.
 * Returns string of only pad characters for any `null` or `undefined`
 * values. If the string version of an input is > `lineWidth`, no
 * centering is performed, but the string will be truncated to
 * `lineWidth`.
 *
 * Note: The padding string can contain multiple characters.
 *
 * @example
 * ```ts
 * center(20, "<>")(wrap(" ")("thi.ng"))
 * // "<><><> thi.ng <><><>"
 * ```
 *
 * @param lineWidth - target length
 * @param pad - pad character(s)
 */
export const center: (
	lineWidth: number,
	pad?: string | number
) => Stringer<any> = memoizeJ<
	number,
	string | number | undefined,
	Stringer<any>
>((n, pad = " ") => {
	const buf = repeat(String(pad), n);
	return (x: any) => {
		if (x == null) return buf;
		x = x.toString();
		const r = (n - x.length) / 2;
		return x.length < n
			? buf.substring(0, r) +
					x +
					buf.substring(0, r + ((n & 1) === (x.length & 1) ? 0 : 1))
			: truncate(n)(x);
	};
});
