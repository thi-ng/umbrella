import type { VecOpSGVN, VecOpSVN } from "./api";
import { defOpS } from "./compile/emit";
import { ARGS_V, ARGS_VN, MATH_N, SARGS_V } from "./compile/templates";

export const [subNS, subNS2, subNS3, subNS4] = defOpS<VecOpSGVN, VecOpSVN>(
    MATH_N("-"),
    ARGS_VN,
    SARGS_V,
    ARGS_V
);
