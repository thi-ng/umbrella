import type { VecOpSGVNV, VecOpSVNV } from "./api";
import { defOpS } from "./compile/emit";
import { ARGS_VNV, MATH2A_N, SARGS_VV } from "./compile/templates";

export const [msubNS, msubNS2, msubNS3, msubNS4] = defOpS<
    VecOpSGVNV,
    VecOpSVNV
>(MATH2A_N("*", "-"), ARGS_VNV, SARGS_VV);
