// thing:no-export
import { illegalArgs } from "@thi.ng/errors";
import type { CropSpec, Processor } from "../api.js";
import {
	computeMargins,
	computeSize,
	gravityPosition,
	positionOrGravity,
} from "../units.js";

export const cropProc: Processor = async (spec, input, ctx) => {
	const { border, gravity, pos, size, ref, unit } = <CropSpec>spec;
	if (border == null && size == null)
		illegalArgs("require `border` or `size` option");
	if (border != null) {
		const sides = computeMargins(border, ctx.size, ref, unit);
		const [left, right, top, bottom] = sides;
		return [
			input.extract({
				left,
				top,
				width: ctx.size[0] - left - right,
				height: ctx.size[1] - top - bottom,
			}),
			true,
		];
	}
	const $size = computeSize(size!, ctx.size, unit);
	let left = 0,
		top = 0;
	if (pos) {
		({ left = 0, top = 0 } =
			positionOrGravity(pos, gravity, $size, ctx.size, unit) || {});
	} else {
		[left, top] = gravityPosition(gravity || "c", $size, ctx.size);
	}
	return [
		input.extract({
			left,
			top,
			width: $size[0],
			height: $size[1],
		}),
		true,
	];
};
