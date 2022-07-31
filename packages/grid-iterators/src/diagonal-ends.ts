import { asInt } from "@thi.ng/api/typedarray";
import { diagonal2d } from "./diagonal.js";

/**
 * Filtered version of {@link diagonal2d}, only including end points of
 * the diagonals, apart from the very first and last points: `[0,0]` and
 * `[cols-1, rows-1]`.
 *
 * @remarks
 * `cols` and `rows` MUST be both >= 2.
 *
 * @param cols -
 * @param rows -
 */
export function* diagonalEnds2d(cols: number, rows = cols) {
	[cols, rows] = asInt(cols, rows);
	const num = cols * rows - 1;
	const maxX = cols - 1;
	const maxY = rows - 1;
	let i = 0;
	for (let p of diagonal2d(cols, rows)) {
		if (i > 0 && i < num) {
			const [x, y] = p;
			if (x === 0 || x === maxX || y === 0 || y === maxY) yield p;
		}
		i++;
	}
}
