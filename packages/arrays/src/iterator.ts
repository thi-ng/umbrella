import type { Nullable } from "@thi.ng/api";

/**
 * Returns iterator of nullable array w/ optional index range support
 * and/or reverse iteration order. The default range covers the entire
 * array.
 *
 * @remarks
 * If `start` > `end`, yields values in reverse order. No bounds
 * checking is performed.
 *
 * @param buf - array or null
 * @param start - start index
 * @param end - end index (excluded)
 */
export function* arrayIterator<T>(
	buf: Nullable<ArrayLike<T>>,
	start = 0,
	end?: number
) {
	if (!buf) return;
	start = start;
	end === undefined && (end = buf.length);
	const step = start <= end ? 1 : -1;
	for (; start !== end; start += step) {
		yield buf[start];
	}
}
