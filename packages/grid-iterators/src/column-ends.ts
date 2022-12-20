import type { GridIterOpts } from "./api.js";
import { __opts } from "./utils.js";

/**
 * Filtered version of {@link columns2d}, only including end points of
 * each column.
 *
 * @param opts -
 */
export function* columnEnds2d(opts: GridIterOpts) {
	let { cols, rows, tx } = __opts(opts);
	rows--;
	for (let x = 0; x < cols; x++) {
		yield tx(x, 0);
		yield tx(x, rows);
	}
}
