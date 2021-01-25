import type { ColorOp } from "./api";
import { mulV33 } from "./internal/matrix-ops";

const LMS_CONE = [
    4.0767245293,
    -1.2681437731,
    -0.0041119885,
    -3.3072168827,
    2.6093323231,
    -0.7034763098,
    0.2307590544,
    -0.341134429,
    1.7068625689,
];

/**
 * @remarks
 * Reference: https://bottosson.github.io/posts/oklab/
 *
 * @param out
 * @param src
 */
export const oklabRgb: ColorOp = (out, { 0: l, 1: a, 2: b, 3: alpha }) =>
    mulV33(out, LMS_CONE, [
        (l + 0.3963377774 * a + 0.2158037573 * b) ** 3,
        (l - 0.1055613458 * a - 0.0638541728 * b) ** 3,
        (l - 0.0894841775 * a - 1.291485548 * b) ** 3,
        alpha,
    ]);
