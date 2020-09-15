import type { VecOpSVNV } from "./api";
import { ARGS_VVN, defOpS, SARGS_VV } from "./internal/codegen";
import { MATH2_N } from "./internal/templates";

export const [addmNS2, addmNS3, addmNS4] = defOpS<VecOpSVNV>(
    MATH2_N("+", "*"),
    `${ARGS_VVN},${SARGS_VV}`
);
