import type { VecOpSVVV } from "./api";
import { ARGS_VVV, defOpS, SARGS_VVV } from "./internal/codegen";
import { MATH2 } from "./internal/templates";

export const [maddS2, maddS3, maddS4] = defOpS<VecOpSVVV>(
    MATH2("*", "+"),
    `${ARGS_VVV},${SARGS_VVV}`,
    ARGS_VVV
);
