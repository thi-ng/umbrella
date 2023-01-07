import { fit, fitClamped } from "@thi.ng/math/fit";
import { mix } from "@thi.ng/math/mix";
import { FloatFormat, Lane } from "../api.js";
import { __luminanceABGR } from "../internal/utils.js";

/**
 * Higher order, single channel float pixel format using provided [min..max]
 * value range, instead of usual [0..1] interval.
 *
 * @param min
 * @param max
 */
export const FLOAT_GRAY_RANGE = (min: number, max: number): FloatFormat => {
	return {
		__float: true,
		alpha: false,
		gray: true,
		channels: [Lane.RED],
		shift: { 3: 0 },
		size: 1,
		getNormalized: (val) => {
			return fitClamped(val, min, max, 0, 1);
		},
		fromABGR: (src) => [mix(min, max, __luminanceABGR(src) / 255)],
		toABGR: (src) =>
			((fit(src[0], min, max, 0, 255) | 0) * 0x010101) | 0xff000000,
	};
};
