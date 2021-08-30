import type { VecOpSGVVN, VecOpSVVN } from "./api";
import { ARGS_VVN, defOpS, SARGS_VV } from "./internal/codegen";
import { MIX_N } from "./internal/templates";

export const [mixNS, mixNS2, mixNS3, mixNS4] = defOpS<VecOpSGVVN, VecOpSVVN>(
    MIX_N,
    ARGS_VVN,
    SARGS_VV
);
