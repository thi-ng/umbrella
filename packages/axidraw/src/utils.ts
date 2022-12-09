import type { ReadonlyVec } from "@thi.ng/vectors";
import { DOWN, DrawCommand, START, STOP, UP } from "./api.js";

/**
 * Takes an array of 2D points and yields an iterable of {@link DrawCommand}s.
 * The optional `speed` factor can be used to control draw speed (default: 1).
 *
 * @remarks
 * Unless `onlyGeo` is explicitly enabled (default: false), the resulting
 * command sequence **will** also contain necessary pen up/down commands.
 *
 * @param pts
 * @param speed
 * @param onlyGeo
 */
export function* polyline(
	pts: ReadonlyVec[],
	speed = 1,
	onlyGeo = false
): IterableIterator<DrawCommand> {
	if (!pts.length) return;
	if (onlyGeo) {
		for (let p of pts) yield ["m", p, speed];
	} else {
		yield UP;
		yield ["m", pts[0]];
		yield DOWN;
		for (let i = 1, n = pts.length; i < n; i++) yield ["m", pts[i], speed];
		yield UP;
	}
}

/**
 * Syntax sugar. Takes an iterable of draw commands, adds {@link START} as
 * prefix and {@link STOP} as suffix. I.e. it creates a "complete" drawing...
 *
 * @example
 * ```ts
 * [...complete([ ["m", [0, 0]] ])]
 * // [ ["start"], ["m", [0, 0]], ["stop"] ]
 * ```
 *
 * @param commands
 */
export function* complete(commands: Iterable<DrawCommand>) {
	yield START;
	yield* commands;
	yield STOP;
}
