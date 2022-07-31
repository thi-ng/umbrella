import { range2d } from "@thi.ng/transducers/range2d";
import { map } from "@thi.ng/transducers/map";
import { swapxy } from "./utils.js";

/**
 * Yields 2D grid coordinates in the order of interleaved columns with
 * configurable `step` size (default: 2). I.e. returns columns in this
 * order:
 *
 * - 0, step, 2 * step, 3 * step...
 * - 1, 2 * step + 1, 3 * step + 1...
 * - etc.
 *
 * {@link interleaveRows2d}
 *
 * @param cols -
 * @param rows -
 * @param step - column stride
 */
export function* interleaveColumns2d(cols: number, rows = cols, step = 2) {
	for (let j = 0; j < step; j++) {
		yield* map(swapxy, range2d(0, rows | 0, j, cols | 0, 1, step | 0));
	}
}

/**
 * Similar to {@link interleaveColumns2d}, but yields 2D grid coordinates in
 * the order of interleaved rows with configurable `step` size (default:
 * 2). I.e. returns rows in this order:
 *
 * - 0, step, 2 * step, 3 * step...
 * - 1, 2 * step + 1, 3 * step + 1...
 * - etc.
 *
 * {@link interleaveColumns2d}
 *
 * @param cols -
 * @param rows -
 * @param step - row stride
 */
export function* interleaveRows2d(cols: number, rows = cols, step = 2) {
	for (let j = 0; j < step; j++) {
		yield* range2d(0, cols | 0, j, rows | 0, 1, step | 0);
	}
}
