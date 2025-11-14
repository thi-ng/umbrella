// SPDX-License-Identifier: Apache-2.0
import type { TypedArray } from "@thi.ng/api";

/**
 * Returns index of `needle` sequence in a larger buffer or -1 if unsuccessful.
 * Search only starts at given `start` index.
 *
 * @remarks
 * TODO Also add Boyer-Moore implementation as alternative for longer sequences
 * (but with more overhead).
 *
 * @example
 * ```ts tangle:../export/find-seq.ts
 * import { findSequence } from "@thi.ng/arrays";
 *
 * console.log(
 *   findSequence([1, 2, 3, 1, 2, 3, 4], [1, 2, 3, 4])
 * );
 * // 3
 * ```
 *
 * @param buf
 * @param needle
 * @param start
 */
export function findSequence<T>(
	buf: Array<T>,
	needle: ArrayLike<T>,
	start?: number
): number;
export function findSequence(
	buf: TypedArray,
	needle: ArrayLike<number>,
	start?: number
): number;
export function findSequence(
	buf: any[] | TypedArray,
	needle: ArrayLike<any>,
	start = 0
) {
	const m = buf.length;
	const n = needle.length;
	const max = m - n;
	if (!n || max < 0) return -1;
	while (start < m) {
		const idx = buf.indexOf(needle[0], start);
		if (idx < 0 || idx > max) return -1;
		let j = n;
		while (j-- > 1) {
			if (buf[idx + j] !== needle[j]) {
				start = idx + 1;
				break;
			}
		}
		if (j === 0) return idx;
	}
	return -1;
}

/**
 * Similar to {@link findSequence}, but searches backwards, starting form given
 * `start` index (default: end of `buf` array). Returns index of `needle` in
 * `buf` or -1 if unsuccessful.
 *
 * @param buf
 * @param needle
 * @param start
 */
export function findLastSequence<T>(
	buf: Array<T>,
	needle: ArrayLike<T>,
	start?: number
): number;
export function findLastSequence(
	buf: TypedArray,
	needle: ArrayLike<number>,
	start?: number
): number;
export function findLastSequence(
	buf: any[] | TypedArray,
	needle: ArrayLike<any>,
	start = buf.length - 1
) {
	const m = buf.length;
	const n = needle.length;
	if (!n || n > m) return -1;
	start = Math.min(start, m - n);
	let j;
	for (let i = start; i >= 0; i--) {
		for (j = n; j-- > 0; ) {
			if (buf[i + j] !== needle[j]) break;
		}
		if (j < 0) return i;
	}
	return -1;
}
