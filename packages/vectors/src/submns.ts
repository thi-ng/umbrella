import type { VecOpSGVNV, VecOpSVNV } from "./api";
import { ARGS_VVN, defOpS, SARGS_VV } from "./internal/codegen";
import { MATH2_N } from "./internal/templates";

export const [submNS, submNS2, submNS3, submNS4] = defOpS<
    VecOpSGVNV,
    VecOpSVNV
>(MATH2_N("-", "*"), ARGS_VVN, SARGS_VV);
