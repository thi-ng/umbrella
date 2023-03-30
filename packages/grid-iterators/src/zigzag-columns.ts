import type { GridIterOpts2D } from "./api.js";
import { __opts } from "./utils.js";

/**
 * Yields sequence of 2D grid coordinates in zigzag column order starting from
 * [0,0], given `cols` and `rows`.
 *
 * Ported & modified from original Java code by Christopher Kulla.
 * https://sourceforge.net/p/sunflow/code/HEAD/tree/trunk/src/org/sunflow/core/bucket/SpiralBucketOrder.java
 *
 * @param opts -
 */
export function* zigzagColumns2d(opts: GridIterOpts2D) {
	const { cols, rows, tx } = __opts(opts);
	const num = cols * rows;
	for (let i = 0; i < num; i++) {
		const x = (i / rows) | 0;
		let y = i % rows;
		x & 1 && (y = rows - 1 - y);
		yield tx(x, y);
	}
}
