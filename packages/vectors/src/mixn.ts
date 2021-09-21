import type { MultiVecOpVVN, VecOpVVN } from "./api";
import { defOp } from "./compile/emit";
import { ARGS_VVN, MIX_N } from "./compile/templates";

export const [mixN, mixN2, mixN3, mixN4] = defOp<MultiVecOpVVN, VecOpVVN>(
    MIX_N,
    ARGS_VVN
);
