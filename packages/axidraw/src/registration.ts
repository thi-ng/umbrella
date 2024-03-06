import { map } from "@thi.ng/transducers/map";
import { normRange } from "@thi.ng/transducers/norm-range";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { cartesian2 } from "@thi.ng/vectors/cartesian";
import type { DrawCommand } from "./api.js";
import { DOWN, MOVE, UP } from "./commands.js";

/**
 * Generates a {@link DrawCommand} sequence to draw a registration mark
 * (crosshair + circle) centered around `pos`.
 *
 * @example
 * ```ts tangle:../export/registration.ts
 * import { AxiDraw, registrationMark } from "@thi.ng/axidraw";
 *
 * const axi = new AxiDraw();
 *
 * // draw registration mark @ 20,20 with radius 10
 * axi.draw(registrationMark([20, 20], 10))
 * ```
 *
 * @param pos
 * @param size
 * @param r
 */
export const registrationMark = (
	[x, y]: ReadonlyVec,
	size = 5,
	r = size * 0.75
): DrawCommand[] => [
	// crosshair
	// horizontal
	MOVE([x - size, y]),
	DOWN(),
	MOVE([x + size, y]),
	UP(),
	// vertical
	MOVE([x, y - size]),
	DOWN(),
	MOVE([x, y + size]),
	UP(),
	// circle
	MOVE([x + r, y]),
	DOWN(),
	...map(
		(t) => MOVE(cartesian2([], [r, t * Math.PI * 2], [x, y])),
		normRange(40)
	),
	UP(),
	MOVE([x, y]),
];
