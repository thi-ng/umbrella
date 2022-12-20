import type { GridIterOpts } from "./api.js";
import { __opts } from "./utils.js";

/**
 * Filtered version of {@link rows2d}, only including end points of
 * each row.
 *
 * @param opts -
 */
export function* rowEnds2d(opts: GridIterOpts) {
	let { cols, rows, tx } = __opts(opts);
	cols--;
	for (let y = 0; y < rows; y++) {
		yield tx(0, y);
		yield tx(cols, y);
	}
}
