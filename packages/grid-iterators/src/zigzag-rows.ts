import type { GridIterOpts2D } from "./api.js";
import { __opts } from "./utils.js";

/**
 * Yields sequence of 2D grid coordinates in zigzag row order starting from
 * [0,0], given `cols` and `rows`.
 *
 * Ported & modified from original Java code by Christopher Kulla.
 * https://sourceforge.net/p/sunflow/code/HEAD/tree/trunk/src/org/sunflow/core/bucket/SpiralBucketOrder.java
 *
 * @param opts -
 */
export function* zigzagRows2d(opts: GridIterOpts2D) {
	const { cols, rows, tx } = __opts(opts);
	const num = cols * rows;
	for (let i = 0; i < num; i++) {
		let x = i % cols;
		const y = (i / cols) | 0;
		y & 1 && (x = cols - 1 - x);
		yield tx(x, y);
	}
}
