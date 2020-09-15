import type { MultiVecOpVVN, VecOpVVN } from "./api";
import { ARGS_VVN, defOp } from "./internal/codegen";
import { MIX_N } from "./internal/templates";

export const [mixN, mixN2, mixN3, mixN4] = defOp<MultiVecOpVVN, VecOpVVN>(
    MIX_N,
    ARGS_VVN
);
