import type { VecOpSGVNV, VecOpSVNV } from "./api";
import { defOpS } from "./compile/emit";
import { ARGS_VNV, MATH2A_N, SARGS_VV } from "./compile/templates";

export const [maddNS, maddNS2, maddNS3, maddNS4] = defOpS<
    VecOpSGVNV,
    VecOpSVNV
>(MATH2A_N("*", "+"), ARGS_VNV, SARGS_VV);
