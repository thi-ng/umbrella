import { isNumber } from "@thi.ng/checks";
import { GRAVITY_POSITION, type Processor, type ResizeSpec } from "../api.js";
import { coerceColor, computeSize } from "../units.js";

export const resizeProc: Processor = async (spec, input, ctx) => {
	const { bg, filter, fit, gravity, ref, size, unit } = <ResizeSpec>spec;
	const aspect = ctx.size[0] / ctx.size[1];
	let $size = size;
	let width: number, height: number;
	if (isNumber($size) && unit !== "%") {
		$size = aspect > 1 ? [$size, $size / aspect] : [$size * aspect, $size];
	}
	[width, height] = computeSize($size, ctx.size, ref, unit);
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
