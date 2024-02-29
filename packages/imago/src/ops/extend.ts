import type { ExtendSpec, Processor } from "../api.js";
import { coerceColor, computeMargins } from "../units.js";

export const extendProc: Processor = async (spec, input, ctx) => {
	const { bg, border, mode, ref, unit } = <ExtendSpec>spec;
	const sides = computeMargins(border, ctx.size, ref, unit);
	const [left, right, top, bottom] = sides;
	return [
		input.extend({
			left,
			right,
			top,
			bottom,
			background: coerceColor(bg || "#0000"),
			extendWith: mode,
		}),
		true,
	];
};
