import type { ColorOp } from "./api";
import { OKLAB_LMS_CONE } from "./constants";
import { mulV33 } from "./internal/matrix-ops";

/**
 * @remarks
 * Reference: https://bottosson.github.io/posts/oklab/
 *
 * @param out
 * @param src
 */
export const oklabRgba: ColorOp = (out, [l, a, b, alpha]) =>
    mulV33(out, OKLAB_LMS_CONE, [
        (l + 0.3963377774 * a + 0.2158037573 * b) ** 3,
        (l - 0.1055613458 * a - 0.0638541728 * b) ** 3,
        (l - 0.0894841775 * a - 1.291485548 * b) ** 3,
        alpha,
    ]);
