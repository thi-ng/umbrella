import { powN3 } from "@thi.ng/vectors";
import type { ColorOp } from "./api";
import { OKLAB_M1, OKLAB_M2 } from "./constants";
import { mulV33 } from "./internal/matrix-ops";

export const xyzOklab: ColorOp = (out, src) =>
    mulV33(
        out || src,
        OKLAB_M2,
        powN3(null, mulV33([], OKLAB_M1, src, false), 1 / 3),
        false
    );
