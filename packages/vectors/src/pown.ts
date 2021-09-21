import type { MultiVecOpVN, VecOpVN } from "./api";
import { defOp } from "./compile/emit";
import { ARGS_VN, FN_N } from "./compile/templates";

export const [powN, powN2, powN3, powN4] = defOp<MultiVecOpVN, VecOpVN>(
    FN_N("Math.pow"),
    ARGS_VN
);
