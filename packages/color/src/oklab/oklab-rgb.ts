import type { ColorOp } from "../api.js";
import { __mulV33 } from "../internal/matrix-ops.js";

/**
 * @remarks
 * Reference:
 * - https://bottosson.github.io/posts/oklab/#converting-from-linear-srgb-to-oklab
 *
 * @internal
 */
// prettier-ignore
const LMS_CONE = [
	4.0767416621, -1.2684380046, -0.0041960863,
	-3.307711591, 2.6097574011, -0.7034186147,
	0.2309699292, -0.3413193965, 1.707614701,
];

/**
 * @remarks
 * Reference: https://bottosson.github.io/posts/oklab/
 *
 * @param out -
 * @param src -
 */
export const oklabRgb: ColorOp = (out, { 0: l, 1: a, 2: b, 3: alpha }) =>
	__mulV33(out, LMS_CONE, [
		(l + 0.3963377774 * a + 0.2158037573 * b) ** 3,
		(l - 0.1055613458 * a - 0.0638541728 * b) ** 3,
		(l - 0.0894841775 * a - 1.291485548 * b) ** 3,
		alpha,
	]);
