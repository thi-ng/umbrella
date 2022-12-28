import { map, normRange } from "@thi.ng/transducers";
import { cartesian2, ReadonlyVec } from "@thi.ng/vectors";
import type { DrawCommand } from "./api.js";

/**
 * Generates a {@link DrawCommand} sequence to draw a registration mark
 * (crosshair + circle) centered around `pos`.
 *
 * @example
 * ```ts
 * axi.draw(registrationMark([20, 20]))
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
	["m", [x - size, y]],
	["d"],
	["m", [x + size, y]],
	["u"],
	// vertical
	["m", [x, y - size]],
	["d"],
	["m", [x, y + size]],
	["u"],
	// circle
	["m", [x + r, y]],
	["d"],
	...map(
		(t) => <DrawCommand>["m", cartesian2([], [r, t * Math.PI * 2], [x, y])],
		normRange(40)
	),
	["u"],
	["m", [x, y]],
];
