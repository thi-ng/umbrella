import type { MultiVecOpVN, VecOpVN } from "./api";
import { ARGS_VN, defOp } from "./internal/codegen";
import { FN_N } from "./internal/templates";

export const [powN, powN2, powN3, powN4] = defOp<MultiVecOpVN, VecOpVN>(
    FN_N("Math.pow"),
    ARGS_VN
);
