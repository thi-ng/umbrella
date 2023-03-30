import { assert } from "@thi.ng/errors/assert";
import type { GridIterOpts2D } from "./api.js";
import { __opts } from "./utils.js";

interface DiagonalSlopeOpts extends GridIterOpts2D {
	/**
	 * Diagonal slope / step size
	 */
	slope: number;
}

/**
 * Similar to {@link diagonalSlopeX}. Yields sequence of 2D grid coordinates in
 * diagonal order with configurable slope, starting at [0,0]. Each diagonal
 * starts at y=0 and progresses in +y direction and every `step` steps, one
 * step in -x direction.
 *
 * @example
 * ```ts
 * // iterate grid in diagonals of 1:3 ratio (x:y)
 * [...diagonalSlopeY({ cols: 5, step: 3 })]
 * // [
 * //   [0, 0], [0, 1 ], [0, 2 ],
 * //   [1, 0], [1, 1 ], [1, 2 ],
 * //   [0, 3], [0, 4 ], [2, 0 ],
 * //   [2, 1], [2, 2 ], [1, 3 ],
 * //   [1, 4], [3, 0 ], [3, 1 ],
 * //   [3, 2], [2, 3 ], [2, 4 ],
 * //   [4, 0], [4, 1 ], [4, 2 ],
 * //   [3, 3], [3, 4 ], [4, 3 ],
 * //   [4, 4]
 * // ]
 * ```
 *
 * @param opts -
 */
export function* diagonalSlopeY(opts: DiagonalSlopeOpts) {
	const { cols, rows, tx } = __opts(opts);
	const maxX = cols - 1;
	const slope = opts.slope | 0;
	assert(slope > 0, "slope must be > 0");
	const num = cols * rows - 1;
	let x = 0;
	let y = 0;
	let nx = Math.min(1, maxX);
	let ny = nx > 0 ? 0 : slope;
	let n = slope;
	const reset = () => {
		n = slope;
		x = nx;
		y = ny;
		if (nx < maxX) nx++;
		else ny += slope;
	};
	for (let i = 0; i <= num; i++) {
		yield tx(x, y);
		if (--n > 0) {
			y++;
			if (y >= rows) reset();
		} else {
			x--;
			y++;
			if (x < 0 || y >= rows) reset();
			else n = slope;
		}
	}
}

/**
 * Similar to {@link diagonalSlopeY}. Yields sequence of 2D grid coordinates in
 * diagonal order with configurable slope, starting at [step-1,0]. Each
 * diagonal starts at y=0 and progresses in -x direction and every `step`
 * steps, one step in +y direction.
 *
 * @param opts -
 */
export function* diagonalSlopeX(opts: DiagonalSlopeOpts) {
	const { cols, rows, tx } = __opts(opts);
	const maxX = cols - 1;
	const slope = opts.slope | 0;
	assert(slope > 0, "slope must be > 0");
	const num = cols * rows - 1;
	let x = Math.min(slope - 1, maxX);
	let y = 0;
	let n = x + 1;
	let nx = Math.min(x + slope, maxX);
	let ny = nx > 0 ? 0 : slope;
	const reset = () => {
		x = nx;
		y = ny;
		if (nx < maxX) {
			nx = Math.min(nx + slope, maxX);
			n = slope;
		} else {
			ny++;
			n = (x % slope) + 1;
		}
	};
	for (let i = 0; i <= num; i++) {
		yield tx(x, y);
		if (--n > 0) {
			x--;
			if (x < 0) reset();
		} else {
			x--;
			y++;
			if (x < 0 || y >= rows) reset();
			else n = slope;
		}
	}
}
