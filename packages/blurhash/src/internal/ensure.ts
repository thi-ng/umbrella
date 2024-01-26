import { assert } from "@thi.ng/errors/assert";
import { inRange } from "@thi.ng/math/interval";

export const __ensureDetail = (detailX: number, detailY: number) =>
	assert(
		inRange(detailX, 1, 9) && inRange(detailY, 1, 9),
		"detail must be in [1,9] range"
	);

export const __ensureSize = (
	pixels: Uint32Array,
	width: number,
	height: number
) =>
	assert(
		width * height === pixels.length,
		"width & height must match number of pixels"
	);
