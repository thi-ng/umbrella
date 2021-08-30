import type { VecOpSGVNV, VecOpSVNV } from "./api";
import { ARGS_VNV, defOpS, SARGS_VV } from "./internal/codegen";
import { MATH2A_N } from "./internal/templates";

export const [maddNS, maddNS2, maddNS3, maddNS4] = defOpS<
    VecOpSGVNV,
    VecOpSVNV
>(MATH2A_N("*", "+"), ARGS_VNV, SARGS_VV);
