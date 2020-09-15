import type { VecOpSVNV } from "./api";
import { ARGS_VNV, defOpS, SARGS_VV } from "./internal/codegen";
import { MATH2A_N } from "./internal/templates";

export const [maddNS2, maddNS3, maddNS4] = defOpS<VecOpSVNV>(
    MATH2A_N("*", "+"),
    `${ARGS_VNV},${SARGS_VV}`
);
