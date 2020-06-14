import { VecOpSVN } from "./api";
import { ARGS_V, ARGS_VN, defOpS, SARGS_V } from "./internal/codegen";
import { MATH_N } from "./internal/templates";

export const [addNS2, addNS3, addNS4] = defOpS<VecOpSVN>(
    MATH_N("+"),
    `${ARGS_VN},${SARGS_V}`,
    ARGS_V
);
