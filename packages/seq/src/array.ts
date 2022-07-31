import type { ISeq, Nullable } from "@thi.ng/api";

/**
 * Returns a zero-copy {@link @thi.ng/api#ISeq} for the given array and
 * optionally for defined index range only.
 *
 * @remarks
 * If given, `start` MUST be < `end`. The latter defaults to the end of
 * the array (`.length`). Also see {@link @thi.ng/arrays#arrayIterator}
 * for related functionality.
 *
 * @param buf - array
 * @param start - start index
 * @param end - end index (excluded)
 */
export const aseq = <T>(
	buf: Nullable<ArrayLike<T>>,
	start = 0,
	end?: number
): ISeq<T> | undefined => {
	if (!buf) return;
	end === undefined && (end = buf.length);
	return start < end!
		? {
				first() {
					return buf[start];
				},
				next() {
					return aseq<T>(buf, start + 1, end);
				},
		  }
		: undefined;
};

/**
 * Similar to {@link aseq}, returns a zero-copy {@link @thi.ng/api#ISeq}
 * for the given array, though in reverse order and optionally for
 * defined index range only.
 *
 * @remarks
 * If given, `start` MUST be > `end`. The latter defaults to beginning
 * of the array (-1). Also see {@link @thi.ng/arrays#arrayIterator} for
 * related functionality.
 *
 * @param buf - array
 * @param start - start index
 * @param end - end index (excluded)
 */
export const rseq = <T>(
	buf: Nullable<ArrayLike<T>>,
	start?: number,
	end = -1
): ISeq<T> | undefined => {
	if (!buf) return;
	start === undefined && (start = buf.length - 1);
	return start > end
		? {
				first() {
					return buf[start!];
				},
				next() {
					return rseq<T>(buf, start! - 1, end);
				},
		  }
		: undefined;
};
