import { powN3 } from "@thi.ng/vectors";
import type { ColorOp } from "./api";
import { OKLAB_CONE_LMS, OKLAB_M2 } from "./constants";
import { mulV33 } from "./internal/matrix-ops";

/**
 * @remarks
 * Reference: https://bottosson.github.io/posts/oklab/
 *
 * @param out
 * @param src
 */
export const rgbaOklab: ColorOp = (out, src) =>
    mulV33(
        out,
        OKLAB_M2,
        powN3(null, mulV33([], OKLAB_CONE_LMS, src), 1 / 3),
        false
    );
