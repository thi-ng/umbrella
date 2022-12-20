import type { GridIterOpts } from "./api.js";
import { __opts } from "./utils.js";

/**
 * Similar to {@link diagonal2d}, but yields 2D grid coordinates in zigzag
 * diagonal order starting at [0,0] and using given `cols` and `rows`.
 *
 * @param opts -
 */
export function* zigzagDiagonal2d(opts: GridIterOpts) {
	const { cols, rows, tx } = __opts(opts);
	const num = cols * rows - 1;
	for (
		let x = 0, y = 0, ny = 0, dx = -1, dy = 1, d = 0, down = true, i = 0;
		i <= num;
		i++
	) {
		yield tx(x, y);
		if (i !== num) {
			do {
				if (y === ny) {
					if (down) {
						y++;
						d++;
						ny = 0;
					} else {
						x++;
						ny = ++d;
					}
					down = !down;
					dx *= -1;
					dy *= -1;
				} else {
					x += dx;
					y += dy;
				}
			} while (x >= cols || y >= rows);
		}
	}
}
