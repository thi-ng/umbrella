import type { Fn3, TypedArray } from "@thi.ng/api";

/**
 * Selectively copies all non-`mask` values from `src` into `dest` starting from
 * destination position `dx`. Returns `dest`.
 *
 * @remarks
 * Where `src` values are the same as `mask`, the corresponding `dest` values
 * will be left unchanged. Performs region clipping, i.e. `dx` can be outside
 * the [0..dest.length) interval.
 *
 * @example
 * ```ts
 * import { blit1d } from "@thi.ng/arrays";
 *
 * blit1d(
 *    // dest array
 *    [1, 1, 1, 1, 1, 1, 1, 1, 1],
 *    // paste from index 2
 *    2,
 *    // source array
 *    [2, 3, 2, 3, 2],
 *    // mask value
 *    3
 * )
 * //[1, 1, 2, 1, 2, 1, 2, 1, 1]
 * ```
 *
 * @param dest
 * @param src
 * @param dx
 * @param mask
 */
export function blit1d<T extends TypedArray>(
	dest: T,
	dx: number,
	src: ArrayLike<number>,
	mask: number
): T;
export function blit1d<T>(
	dest: T[],
	dx: number,
	src: ArrayLike<T>,
	mask: T
): T[];
export function blit1d(dest: any[], x: number, src: ArrayLike<any>, mask: any) {
	const [sx, sw, dx, dw] = __clip(0, src.length, x, dest.length);
	if (sw < 1 || dx >= dw) return dest;
	for (let i = 0; i < sw; i++) {
		const val = src[sx + i];
		val !== mask && (dest[dx + i] = val);
	}
	return dest;
}

/**
 * Similar to {@link blit1d}, but uses a predicate function to
 * determine/transform copied values. The predicate is called with the src, and
 * dest item values and src index. The result of that function is written to the
 * `dest` array. If the predicate returns `undefined`, no value will be written.
 *
 * @param dest
 * @param dx
 * @param src
 * @param pred
 */
export function blitPred1d<T extends TypedArray>(
	dest: T,
	dx: number,
	src: ArrayLike<number>,
	pred: Fn3<number, number, number, number | undefined>
): T;
export function blitPred1d<T>(
	dest: T[],
	dx: number,
	src: ArrayLike<T>,
	pred: Fn3<T, T, number, T | undefined>
): T[];
export function blitPred1d(
	dest: any[],
	x: number,
	src: ArrayLike<any>,
	pred: any
) {
	const [sx, sw, dx, dw] = __clip(0, src.length, x, dest.length);
	if (sw < 1 || dx >= dw) return dest;
	for (let i = 0; i < sw; i++) {
		const val = pred(src[sx + i], dest[dx + i], sx + i);
		val !== undefined && (dest[dx + i] = val);
	}
	return dest;
}

/**
 * 2D version of {@link blit1d} (also with region clipping). Positions and sizes
 * are given as 2D vectors.
 *
 * @param dest
 * @param dpos
 * @param dsize
 * @param src
 * @param ssize
 * @param mask
 */
export function blit2d<T extends TypedArray>(
	dest: T,
	dpos: ArrayLike<number>,
	dsize: ArrayLike<number>,
	src: ArrayLike<number>,
	ssize: ArrayLike<number>,
	mask: number
): T;
export function blit2d<T>(
	dest: T[],
	dpos: ArrayLike<number>,
	dsize: ArrayLike<number>,
	src: ArrayLike<T>,
	ssize: ArrayLike<number>,
	mask: T
): T[];
export function blit2d(
	dest: any[],
	dpos: ArrayLike<number>,
	dsize: ArrayLike<number>,
	src: ArrayLike<any>,
	ssize: ArrayLike<number>,
	mask: any
) {
	const [sx, sw, dx, dw] = __clip(0, ssize[0], dpos[0], dsize[0]);
	const [sy, sh, dy, dh] = __clip(0, ssize[1], dpos[1], dsize[1]);
	if (sw < 1 || sh < 1 || dx >= dw || dy >= dh) return dest;
	const sstride = ssize[0];
	const dstride = dsize[0];
	for (let y = 0; y < sh; y++) {
		for (
			let x = 0,
				soff = (sy + y) * sstride + sx,
				doff = (dy + y) * dstride + dx;
			x < sw;
			x++
		) {
			const val = src[soff + x];
			val !== mask && (dest[doff + x] = val);
		}
	}
	return dest;
}

const __clip = (sx: number, sw: number, dx: number, dw: number) => {
	if (dx < 0) {
		sx -= dx;
		sw += dx;
		dx = 0;
	} else if (dx + sw > dw) {
		sw = dw - dx;
	}
	return [sx, sw, dx, dw];
};
