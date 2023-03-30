import type { GridIterOpts2D } from "./api.js";
import { diagonal2d } from "./diagonal.js";
import { __opts } from "./utils.js";

/**
 * Filtered version of {@link diagonal2d}, only including end points of the
 * diagonals. Unless `all` option is enabled (default: false), the very first
 * and last points are skipped, i.e. `[0,0]` and `[cols-1, rows-1]`.
 *
 * @remarks
 * `cols` and `rows` MUST be both >= 2.
 *
 * @param opts -
 */
export function* diagonalEnds2d(opts: GridIterOpts2D & { all?: boolean }) {
	const { cols, rows, tx } = __opts(opts);
	const num = cols * rows - 1;
	const maxX = cols - 1;
	const maxY = rows - 1;
	const check = opts.all ? (i: number) => i > 0 && i < num : () => true;
	let i = 0;
	for (let p of diagonal2d({ cols, rows })) {
		if (check(i)) {
			const [x, y] = p;
			if (x === 0 || x === maxX || y === 0 || y === maxY) yield tx(x, y);
		}
		i++;
	}
}
