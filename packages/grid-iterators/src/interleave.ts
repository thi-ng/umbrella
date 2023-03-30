import { map } from "@thi.ng/transducers/map";
import { range2d } from "@thi.ng/transducers/range2d";
import type { GridIterOpts2D } from "./api.js";
import { __opts } from "./utils.js";

interface InterleaveOpts2D extends GridIterOpts2D {
	/**
	 * Row or column stride.
	 *
	 * @defaultValue 2
	 */
	step?: number;
}

/**
 * Yields 2D grid coordinates in the order of interleaved columns with
 * configurable `step` size (default: 2).
 *
 * @remarks
 * Returns columns in this order:
 *
 * - 0, step, 2 * step, 3 * step...
 * - 1, 2 * step + 1, 3 * step + 1...
 * - etc.
 *
 * Also see {@link interleaveRows2d}.
 *
 * @param opts -
 */
export function* interleaveColumns2d(opts: InterleaveOpts2D) {
	const { cols, rows, tx } = __opts(opts);
	const step = (opts.step != null ? opts.step : 2) | 0;
	for (let j = 0; j < step; j++) {
		yield* map((p) => tx(p[1], p[0]), range2d(0, rows, j, cols, 1, step));
	}
}

/**
 * Similar to {@link interleaveColumns2d}, but yields 2D grid coordinates in
 * the order of interleaved rows with configurable `step` size (default:
 * 2).
 *
 * @remarks
 * Returns rows in this order:
 *
 * - 0, step, 2 * step, 3 * step...
 * - 1, 2 * step + 1, 3 * step + 1...
 * - etc.
 *
 * @param opts -
 */
export function* interleaveRows2d(opts: InterleaveOpts2D) {
	const { cols, rows, tx } = __opts(opts);
	const step = (opts.step != null ? opts.step : 2) | 0;
	for (let j = 0; j < step; j++) {
		yield* map((p) => tx(p[0], p[1]), range2d(0, cols, j, rows, 1, step));
	}
}
