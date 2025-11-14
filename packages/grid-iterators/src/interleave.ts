// SPDX-License-Identifier: Apache-2.0
import { map } from "@thi.ng/transducers/map";
import { range2d } from "@thi.ng/transducers/range2d";
import type { GridIterOpts2D } from "./api.js";
import { __opts } from "./utils.js";

export interface InterleaveOpts2D extends GridIterOpts2D {
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
export const interleaveColumns2d = (opts: InterleaveOpts2D) =>
	__interleave(opts, [0, 1], [1, 0]);

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
export const interleaveRows2d = (opts: InterleaveOpts2D) =>
	__interleave(opts, [1, 0], [0, 1]);

export function* __interleave(
	opts: InterleaveOpts2D,
	order: [number, number],
	[x, y]: [number, number]
) {
	const { cols, rows, tx } = __opts(opts);
	const step = (opts.step ?? 2) | 0;
	const [outer, inner] = order.map((x) => [cols, rows][x]);
	for (let j = 0; j < step; j++) {
		yield* map((p) => tx(p[x], p[y]), range2d(0, inner, j, outer, 1, step));
	}
}
