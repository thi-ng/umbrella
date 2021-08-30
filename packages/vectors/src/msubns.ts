import type { VecOpSGVNV, VecOpSVNV } from "./api";
import { ARGS_VNV, defOpS, SARGS_VV } from "./internal/codegen";
import { MATH2A_N } from "./internal/templates";

export const [msubNS, msubNS2, msubNS3, msubNS4] = defOpS<
    VecOpSGVNV,
    VecOpSVNV
>(MATH2A_N("*", "-"), ARGS_VNV, SARGS_VV);
