import type { VecOpSGVNV, VecOpSVNV } from "./api";
import { defOpS } from "./compile/emit";
import { ARGS_VVN, MATH2_N, SARGS_VV } from "./compile/templates";

export const [submNS, submNS2, submNS3, submNS4] = defOpS<
    VecOpSGVNV,
    VecOpSVNV
>(MATH2_N("-", "*"), ARGS_VVN, SARGS_VV);
