import type { FnU3 } from "@thi.ng/api";

/**
 * Syntax sugar for `map(fn, range3d(cols, rows, slices))`. Returns iterator yielding
 * values of given 3-arg function `fn` which is called repeatedly with `x`, `y` and
 * `z` grid coordinates. The iteration order is always slice major, then row-major.
 *
 * @example
 * ```ts
 * import { repeatedly3d } from "@thi.ng/transducers";
 *
 * [...repeatedly3d((x, y, z) => [(x+1)*10, (y+1)*100, (z+1)*1000], 2, 2, 2)]
 * // [
 * //   [ 10, 100, 1000 ], [ 20, 100, 1000 ], [ 10, 200, 1000 ], [ 20, 200, 1000 ],
 * //   [ 10, 100, 2000 ], [ 20, 100, 2000 ], [ 10, 200, 2000 ], [ 20, 200, 2000 ]
 * // ]
 * ```
 *
 * @param fn - value producer
 * @param cols - number of columns
 * @param rows - number of rows
 * @param slices - number of slices
 */
export function* repeatedly3d<T>(
	fn: FnU3<number, T>,
	cols: number,
	rows: number,
	slices: number
) {
	for (let z = 0; z < slices; z++) {
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				yield fn(x, y, z);
			}
		}
	}
}
