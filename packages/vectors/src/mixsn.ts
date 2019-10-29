import { VecOpSVVN } from "./api";
import { ARGS_VVN, defOpS, SARGS_VV } from "./internal/codegen";
import { MIX_N } from "./internal/templates";

export const [mixSN2, mixSN3, mixSN4] = defOpS<VecOpSVVN>(
    MIX_N,
    `${ARGS_VVN},${SARGS_VV}`
);
