import type { VecOpSGVN, VecOpSVN } from "./api";
import { defOpS } from "./compile/emit";
import { ARGS_V, ARGS_VN, MATH_N, SARGS_V } from "./compile/templates";

export const [addNS, addNS2, addNS3, addNS4] = defOpS<VecOpSGVN, VecOpSVN>(
    MATH_N("+"),
    ARGS_VN,
    SARGS_V,
    ARGS_V
);
