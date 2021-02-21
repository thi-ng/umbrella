import { powN3 } from "@thi.ng/vectors";
import type { ColorOp } from "../api";
import { OKLAB_M1, OKLAB_M2 } from "../api/constants";
import { mulV33 } from "../internal/matrix-ops";

export const xyzOklab: ColorOp = (out, src) =>
    mulV33(null, OKLAB_M2, powN3(null, mulV33(out, OKLAB_M1, src), 1 / 3));
