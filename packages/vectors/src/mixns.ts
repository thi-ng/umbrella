import type { VecOpSVVN } from "./api";
import { ARGS_VVN, defOpS, SARGS_VV } from "./internal/codegen";
import { MIX_N } from "./internal/templates";

export const [mixNS2, mixNS3, mixNS4] = defOpS<VecOpSVVN>(
    MIX_N,
    `${ARGS_VVN},${SARGS_VV}`
);
