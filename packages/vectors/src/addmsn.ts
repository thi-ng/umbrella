import { VecOpSVNV } from "./api";
import { ARGS_VVN, defOpS, SARGS_VV } from "./internal/codegen";
import { MATH2_N } from "./internal/templates";

export const [addmSN2, addmSN3, addmSN4] = defOpS<VecOpSVNV>(
    MATH2_N("+", "*"),
    `${ARGS_VVN},${SARGS_VV}`
);
