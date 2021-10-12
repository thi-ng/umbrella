import type { ColorOp } from "../api";
import { BRADFORD_D50_D65, BRADFORD_D65_D50 } from "../api/constants";
import { __mulV33 } from "../internal/matrix-ops";

export const xyzXyzD65_50: ColorOp = (out, src) =>
    __mulV33(out, BRADFORD_D65_D50, src);

export const xyzXyzD50_65: ColorOp = (out, src) =>
    __mulV33(out, BRADFORD_D50_D65, src);
