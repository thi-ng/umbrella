import type { GridIterOpts2D } from "./api.js";
import { __opts } from "./utils.js";

/**
 * Yields sequence of 2D grid coordinates in diagonal order starting at [0,0]
 * and using given `cols` and `rows`. Each diagonal starts at y=0 and progresses
 * in -x,+y direction.
 *
 * Ported & modified from original Java code by Christopher Kulla.
 * https://sourceforge.net/p/sunflow/code/HEAD/tree/trunk/src/org/sunflow/core/bucket/DiagonalBucketOrder.java
 *
 * @param opts -
 */
export function* diagonal2d(opts: GridIterOpts2D) {
	const { cols, rows, tx } = __opts(opts);
	const num = cols * rows - 1;
	for (let x = 0, y = 0, nx = 1, ny = 0, i = 0; i <= num; i++) {
		yield tx(x, y);
		if (i !== num) {
			do {
				if (y === ny) {
					y = 0;
					x = nx;
					ny++;
					nx++;
				} else {
					x--;
					y++;
				}
			} while (y >= rows || x >= cols);
		}
	}
}
