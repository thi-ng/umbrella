// thing:no-export
import { GRAVITY_POSITION, type Processor, type ResizeSpec } from "../api.js";
import { coerceColor, computeSize } from "../units.js";

export const resizeProc: Processor = async (spec, input, ctx) => {
	const { bg, filter, fit, gravity, size, unit } = <ResizeSpec>spec;
	const [width, height] = computeSize(size, ctx.size, unit);
	return [
		input.resize({
			width,
			height,
			fit,
			kernel: filter,
			position: gravity ? GRAVITY_POSITION[gravity] : undefined,
			background: bg ? coerceColor(bg) : undefined,
		}),
		true,
	];
};
