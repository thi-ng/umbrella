import type { FnU2 } from "@thi.ng/api";

/**
 * Syntax sugar for `map(fn, range2d(cols, rows))`. Returns iterator yielding
 * values of given 2-arg function `fn` which is called repeatedly with `x` and
 * `y` grid coordinates. The iteration order is always row-major.
 *
 * @example
 * ```ts
 * [...repeatedly2d((x, y) => [(x + 1) * 10, (y + 1) * 100], 2, 3)]
 * // [
 * //   [ 10, 100 ], [ 20, 100 ],
 * //   [ 10, 200 ], [ 20, 200 ],
 * //   [ 10, 300 ], [ 20, 300 ]
 * // ]
 * ```
 *
 * @param fn - value producer
 * @param cols - number of columns
 * @param rows - number of rows
 */
export function* repeatedly2d<T>(
	fn: FnU2<number, T>,
	cols: number,
	rows: number
) {
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			yield fn(x, y);
		}
	}
}
