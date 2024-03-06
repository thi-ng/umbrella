import type { TypedArray } from "@thi.ng/api";

/**
 * Fills given array with values in [start .. end) interval from `index`
 * and with optional `step` size.
 *
 * @remarks
 * `start` and `end` default to 0 and array length, `step` defaults to 1
 * or -1 (depending on range). Returns array.
 *
 * @example
 * ```ts tangle:../export/fill-range.ts
 * import { fillRange } from "@thi.ng/arrays";
 *
 * console.log(
 *   fillRange(new Array(5))
 * );
 * // [ 0, 1, 2, 3, 4 ]
 *
 * console.log(
 *   fillRange(fillRange([], 0, 10, 20, 2), 5, 20, 8, -2)
 * );
 * // [ 10, 12, 14, 16, 18, 20, 18, 16, 14, 12, 10 ]
 * ```
 *
 * @param buf -
 * @param index -
 * @param start -
 * @param end -
 * @param step -
 */
export const fillRange = <T extends number[] | TypedArray>(
	buf: T,
	index = 0,
	start = 0,
	end = buf.length,
	step = end > start ? 1 : -1
) => {
	if (step > 0) {
		for (; start < end; start += step) buf[index++] = start;
	} else {
		for (; start > end; start += step) buf[index++] = start;
	}
	return buf;
};
