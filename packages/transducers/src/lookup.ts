/**
 * Returns function accepting a single index arg used to
 * lookup value in given array. No bounds checks are done.
 *
 * @example
 * ```ts
 * import { lookup1d, map } from "@thi.ng/transducers";
 *
 * [...map(lookup1d([10, 20, 30]), [2,0,1])]
 * // [ 30, 10, 20 ]
 * ```
 *
 * @param src - source data
 */
export const lookup1d =
	<T>(src: T[]) =>
	(i: number) =>
		src[i];

/**
 * Returns function accepting a single `[x, y]` index tuple, used to
 * lookup value in given array. Useful for transducers processing 2D
 * data.
 *
 * @remarks
 * The source data MUST be in row major linearized format, i.e. 1D
 * representation of 2D data (pixel buffer). No bounds checks are done.
 *
 * @example
 * ```ts
 * import { lookup2d, map, range, range2d } from "@thi.ng/transducers";
 *
 * [...map(lookup2d([...range(9)], 3), range2d(2, -1, 0, 3))]
 * // [ 2, 1, 0, 5, 4, 3, 8, 7, 6 ]
 * ```
 *
 * @param src - source data
 * @param width - number of items along X (columns)
 */
export const lookup2d =
	<T>(src: T[], width: number) =>
	(i: number[]) =>
		src[i[0] + i[1] * width];

/**
 * Same as {@link lookup2d}, but for 3D data. The index ordering of the
 * source data MUST be in Z, Y, X order (i.e. a stack of row major 2D slices).
 * No bounds checks are done.
 *
 * @param src - source data
 * @param width - number of items along X (columns)
 * @param height - number of items along Y (rows)
 */
export const lookup3d = <T>(src: T[], width: number, height: number) => {
	const stridez = width * height;
	return (i: number[]) => src[i[0] + i[1] * width + i[2] * stridez];
};
